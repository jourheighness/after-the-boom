import chokidar from 'chokidar';
import { createPatch } from 'diff';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import type Database from 'better-sqlite3';
import {
  getComments,
  insertSnapshot,
  insertFileChange,
  getLatestSnapshot,
  upsertComment,
  toComment,
} from './db.ts';

type BroadcastFn = (event: Record<string, unknown>) => void;

interface IndexerInterface {
  indexFile(
    db: Database.Database,
    relPath: string,
    content: string,
  ): Promise<void>;
}

function hashContent(content: string): string {
  return createHash('sha256').update(content).digest('hex').slice(0, 16);
}

export function startWatcher(
  db: Database.Database,
  rootDir: string,
  broadcast: BroadcastFn,
  indexer?: IndexerInterface,
) {
  const watchPaths = [
    resolve(rootDir, 'rules'),
    resolve(rootDir, 'campaigns'),
    resolve(rootDir, 'research'),
  ];

  const watcher = chokidar.watch(watchPaths, {
    ignored: /node_modules|\.git/,
    ignoreInitial: true,
    awaitWriteFinish: { stabilityThreshold: 500, pollInterval: 100 },
  });

  watcher.on('change', async (filePath: string) => {
    if (!filePath.endsWith('.md')) return;

    try {
      const content = await readFile(filePath, 'utf-8');
      const newHash = hashContent(content);
      const relPath = relative(rootDir, filePath);

      // Check previous snapshot
      const prev = getLatestSnapshot(db, relPath);
      if (prev && prev.contentHash === newHash) return; // No actual change

      // Store new snapshot
      insertSnapshot(db, relPath, content, newHash);

      // Compute diff if we have a previous version
      let diffText: string | null = null;
      if (prev) {
        diffText = createPatch(relPath, prev.content, content, '', '', { context: 2 });
        insertFileChange(db, relPath, prev.contentHash, newHash, diffText);
      }

      // Check open comments on this file for orphaning/reanchoring
      const openComments = getComments(db, { status: 'open' }).filter((c) => {
        // Match by filePath or sourceFile
        if (c.filePath === relPath) return true;
        if (c.filePath === filePath) return true;
        // Match by sourceFile (e.g. "CORE" matches "rules/CORE.md")
        const baseName = relPath.replace(/^.*\//, '').replace(/\.md$/, '');
        return c.sourceFile === baseName;
      });

      let changed = false;
      for (const comment of openComments) {
        const textExists = content.includes(comment.selectedText);
        const wasOrphaned = comment.orphaned === 1;

        if (!textExists && !wasOrphaned) {
          // Text disappeared: mark orphaned
          comment.orphaned = 1;
          upsertComment(db, comment);
          broadcast({ type: 'reanchor', comment: { ...comment, _diffText: diffText } });
          changed = true;
        } else if (textExists && wasOrphaned) {
          // Text returned: un-orphan
          comment.orphaned = 0;
          upsertComment(db, comment);
          broadcast({ type: 'reanchor', comment });
          changed = true;
        }
      }

      if (!changed && openComments.length > 0) {
        // File changed but comments unaffected; still notify for diff display
        broadcast({ type: 'file_changed', filePath: relPath, diffText });
      }

      // Re-index if indexer is available
      if (indexer) {
        await indexer.indexFile(db, relPath, content);
      }
    } catch (err) {
      console.error(`[watcher] Error processing ${filePath}:`, err);
    }
  });

  watcher.on('ready', () => {
    console.log('[watcher] Watching for MD file changes');
  });

  watcher.on('error', (err) => {
    console.error('[watcher] Error:', err);
  });

  return watcher;
}
