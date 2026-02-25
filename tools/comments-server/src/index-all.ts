import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { openDb } from './db.ts';
import { indexAll } from './indexer.ts';
import { createOllamaProvider } from './embeddings.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = resolve(__dirname, '..', '..', 'comments.db');
const rootDir = resolve(__dirname, '..', '..', '..');

const db = openDb(dbPath);

// Try Ollama; gracefully degrade if not available
const embedder = createOllamaProvider();

// Quick connectivity check
const testEmbed = await embedder.embed('test');
const activeEmbedder = testEmbed ? embedder : null;

if (!activeEmbedder) {
  console.log('[index] Ollama not available. Indexing sections and concepts only (no embeddings).');
}

await indexAll(db, rootDir, activeEmbedder);
