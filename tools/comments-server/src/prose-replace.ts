import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export interface ReplaceResult {
  filePath: string;
  replacements: number;
  preview: string[];
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Preserve the case pattern of the original match when substituting.
 * ALL CAPS -> ALL CAPS, Title Case -> Title Case, otherwise as-given.
 */
function preserveCase(original: string, replacement: string): string {
  if (original === original.toUpperCase()) return replacement.toUpperCase();
  if (original[0] === original[0].toUpperCase() && original.slice(1) === original.slice(1).toLowerCase()) {
    return replacement[0].toUpperCase() + replacement.slice(1);
  }
  return replacement;
}

/**
 * Replace a term in markdown prose files with word-boundary matching.
 * Skips code blocks (``` fences). Preserves case (ALL CAPS, Title Case, or as-given).
 * Only writes files that actually changed. Returns only changed files.
 */
export async function replaceInMarkdownFiles(
  rootDir: string,
  oldTerm: string,
  newTerm: string,
  filePaths: string[],
): Promise<ReplaceResult[]> {
  const pattern = new RegExp('\\b' + escapeRegExp(oldTerm) + '\\b', 'gi');
  const results: ReplaceResult[] = [];

  for (const relPath of filePaths) {
    const absPath = resolve(rootDir, relPath);
    let content: string;
    try {
      content = await readFile(absPath, 'utf-8');
    } catch {
      continue; // file may have been deleted
    }

    const lines = content.split('\n');
    let inCodeBlock = false;
    let totalReplacements = 0;
    const preview: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trimStart().startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        continue;
      }
      if (inCodeBlock) continue;

      const line = lines[i];
      let replaced = line;
      let lineHits = 0;

      replaced = line.replace(pattern, (match) => {
        lineHits++;
        return preserveCase(match, newTerm);
      });

      if (lineHits > 0) {
        totalReplacements += lineHits;
        preview.push(`line ${i + 1}: ${line.trim()} -> ${replaced.trim()}`);
        lines[i] = replaced;
      }
    }

    if (totalReplacements > 0) {
      await writeFile(absPath, lines.join('\n'), 'utf-8');
      results.push({ filePath: relPath, replacements: totalReplacements, preview });
    }
  }

  return results;
}
