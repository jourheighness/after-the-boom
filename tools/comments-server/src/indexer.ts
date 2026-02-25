import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import { glob } from 'node:fs/promises';
import type Database from 'better-sqlite3';
import {
  upsertSection,
  getConcepts,
  linkConceptToSection,
  upsertConcept,
  deleteStaleSections,
  upsertEmbedding,
} from './db.ts';
import { seedConcepts, detectConcepts, autoDetectNewConcepts } from './concepts.ts';
import type { EmbeddingProvider } from './embeddings.ts';

interface ParsedSection {
  heading: string | null;
  headingLevel: number | null;
  content: string;
  lineStart: number;
  lineEnd: number;
}

function hashContent(content: string): string {
  return createHash('sha256').update(content).digest('hex').slice(0, 16);
}

/** Parse a markdown file into sections split on headings. */
function parseSections(content: string): ParsedSection[] {
  const lines = content.split('\n');
  const sections: ParsedSection[] = [];
  let current: ParsedSection | null = null;
  const contentLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const headingMatch = line.match(/^(#{1,4})\s+(.+)/);

    if (headingMatch) {
      // Flush previous section
      if (current) {
        current.content = contentLines.join('\n').trim();
        current.lineEnd = i - 1;
        if (current.content) sections.push(current);
      }
      contentLines.length = 0;

      current = {
        heading: headingMatch[2].trim(),
        headingLevel: headingMatch[1].length,
        content: '',
        lineStart: i + 1, // 1-based
        lineEnd: i + 1,
      };
    } else {
      contentLines.push(line);
    }
  }

  // Flush last section
  if (current) {
    current.content = contentLines.join('\n').trim();
    current.lineEnd = lines.length;
    if (current.content) sections.push(current);
  } else if (contentLines.join('\n').trim()) {
    // Content before any heading
    sections.push({
      heading: null,
      headingLevel: null,
      content: contentLines.join('\n').trim(),
      lineStart: 1,
      lineEnd: lines.length,
    });
  }

  return sections;
}

/** Index a single file: parse sections, extract concepts, generate embeddings. */
export async function indexFile(
  db: Database.Database,
  relPath: string,
  content: string,
  embedder?: EmbeddingProvider | null,
): Promise<{ sections: number; concepts: number; embeddings: number }> {
  const parsed = parseSections(content);
  const validHashes: string[] = [];
  let sectionCount = 0;
  let conceptCount = 0;
  let embeddingCount = 0;

  // Get existing concept names for detection
  const allConcepts = getConcepts(db);
  const conceptNames = allConcepts.map((c) => c.name);
  const conceptNameSet = new Set(conceptNames);
  const conceptNameToId = new Map(allConcepts.map((c) => [c.name, c.id]));

  for (const section of parsed) {
    const contentHash = hashContent(section.content);
    validHashes.push(contentHash);

    // Upsert section
    const sectionId = upsertSection(db, {
      filePath: relPath,
      heading: section.heading,
      headingLevel: section.headingLevel,
      content: section.content,
      lineStart: section.lineStart,
      lineEnd: section.lineEnd,
      contentHash,
      indexedAt: null,
    });
    sectionCount++;

    // Detect known concepts in this section
    const found = detectConcepts(section.content, conceptNames);
    for (const name of found) {
      const conceptId = conceptNameToId.get(name);
      if (conceptId !== undefined) {
        // Extract surrounding context (first sentence containing the concept)
        const sentences = section.content.split(/[.!?]\s+/);
        const contextSentence = sentences.find((s) =>
          new RegExp('\\b' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i').test(s),
        );
        linkConceptToSection(db, sectionId, conceptId, contextSentence?.slice(0, 200) ?? null);
        conceptCount++;
      }
    }

    // Auto-detect new concept candidates from headings and bold terms
    const newCandidates = autoDetectNewConcepts(section.heading || '', section.content, conceptNameSet);
    for (const candidate of newCandidates) {
      upsertConcept(db, candidate, undefined, false); // curated=false, approved=0 by default
    }

    // Generate embedding if provider available
    if (embedder) {
      const textToEmbed = (section.heading ? section.heading + '\n' : '') + section.content;
      const embedding = await embedder.embed(textToEmbed);
      if (embedding) {
        upsertEmbedding(db, sectionId, embedding, embedder.model);
        embeddingCount++;
      }
    }
  }

  // Delete stale sections for this file
  deleteStaleSections(db, relPath, validHashes);

  return { sections: sectionCount, concepts: conceptCount, embeddings: embeddingCount };
}

/** Index all markdown files in the project. */
export async function indexAll(
  db: Database.Database,
  rootDir: string,
  embedder?: EmbeddingProvider | null,
): Promise<void> {
  // Seed curated concepts first
  seedConcepts(db);

  const patterns = ['rules/**/*.md', 'campaigns/**/*.md'];
  let totalSections = 0;
  let totalConcepts = 0;
  let totalEmbeddings = 0;

  for (const pattern of patterns) {
    const fullPattern = resolve(rootDir, pattern);
    for await (const filePath of glob(fullPattern)) {
      const relPath = relative(rootDir, filePath);
      const content = await readFile(filePath, 'utf-8');
      const result = await indexFile(db, relPath, content, embedder);
      totalSections += result.sections;
      totalConcepts += result.concepts;
      totalEmbeddings += result.embeddings;
    }
  }

  const conceptCount = getConcepts(db).length;
  console.log(
    `Indexed ${totalSections} sections, ${conceptCount} concepts (${totalConcepts} mentions), ${totalEmbeddings} embeddings`,
  );
}
