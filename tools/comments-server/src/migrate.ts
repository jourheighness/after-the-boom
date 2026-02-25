import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { openDb, upsertComment, type Comment } from './db.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const JSON_PATH = resolve(__dirname, '../../comments.json');
const DB_PATH = resolve(__dirname, '../../comments.db');

interface JsonComment {
  id: string;
  selectedText: string;
  contextBefore: string;
  contextAfter: string;
  comment: string;
  sectionId: string;
  sourceFile: string;
  filePath?: string;
  nearestHeadingLine?: number;
  sourceLine?: number;
  paragraphIndex?: number;
  status: 'open' | 'resolved' | 'dismissed';
  resolution: string | null;
  resolvedText?: string;
  resolvedAt?: string | null;
  createdAt: string;
  _orphaned?: boolean;
  _userReopened?: boolean;
}

const raw = readFileSync(JSON_PATH, 'utf-8');
const data = JSON.parse(raw);
const jsonComments: JsonComment[] = data.comments || data;

const db = openDb(DB_PATH);

let count = 0;
for (const jc of jsonComments) {
  const comment: Comment = {
    id: jc.id,
    selectedText: jc.selectedText,
    contextBefore: jc.contextBefore || '',
    contextAfter: jc.contextAfter || '',
    comment: jc.comment,
    sectionId: jc.sectionId,
    sourceFile: jc.sourceFile,
    filePath: jc.filePath ?? null,
    nearestHeadingLine: jc.nearestHeadingLine ?? null,
    sourceLine: jc.sourceLine ?? null,
    paragraphIndex: jc.paragraphIndex ?? null,
    status: jc.status,
    resolution: jc.resolution ?? null,
    resolvedText: jc.resolvedText ?? null,
    resolvedAt: jc.resolvedAt ?? null,
    createdAt: jc.createdAt,
    orphaned: jc._orphaned ? 1 : 0,
  };
  upsertComment(db, comment);
  count++;
}

db.close();
console.log(`Migrated ${count} comments to ${DB_PATH}`);
