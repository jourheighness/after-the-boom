#!/usr/bin/env npx tsx
/**
 * Import concepts from concept-system.md into the database.
 * Populates concept types, definitions, and typed relations.
 *
 * Usage: npx tsx src/import-concepts.ts
 */
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { openDb, upsertConcept, upsertConceptRelation } from './db.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = resolve(__dirname, '../../comments.db');
const CONCEPT_FILE = resolve(__dirname, '../../concept-system.md');

const HEADING_TO_CATEGORY: Record<string, string> = {
  'Stats': 'stat',
  'Resources': 'resource',
  'Roll Modifiers': 'modifier',
  'Boon Sources': 'boon_source',
  'Range Bands': 'range',
  'Action Economy': 'action',
  'Weapon Properties': 'weapon_property',
  'Harm Levels': 'harm_level',
  'PC Conditions': 'pc_condition',
  'Enemy Conditions': 'enemy_condition',
  'Combat Gambits': 'combat_gambit',
  'Shaping Gambits': 'shaping_gambit',
  'Clocks': 'clock',
  'Magic Concepts': 'magic',
  'Character Concepts': 'character',
  'Enemy Mechanics': 'enemy_mechanic',
  'Universal Axioms': 'axiom',
  'The Sacrifice Trade': 'sacrifice_trade',
  'Scope and Boundaries': 'scope_rule',
  'Design Laws': 'design_law',
  'Content Flow': 'content_pattern',
  'Edge Design Taxonomy': 'edge_design',
  'Procedures': 'procedure',
};

const db = openDb(DB_PATH);
const content = readFileSync(CONCEPT_FILE, 'utf-8');
const lines = content.split('\n');

// --- Types ---

interface ParsedConcept {
  name: string;
  definition: string;
  type: 'mechanic' | 'subsystem' | 'principle';
  subcategory: string;
  category: string;
  connectsTo: string[];
}

interface ParsedRelation {
  source: string;
  relation: string;
  targets: { name: string; description: string | null }[];
}

// --- Parse document ---

let currentLayer: 'mechanic' | 'subsystem' | 'principle' = 'mechanic';
let currentSubcategory = '';
let inRelationMap = false;
let inCodeBlock = false;
let inTable = false;
let tableHeaders: string[] = [];
let currentRelationSource = '';

const concepts: ParsedConcept[] = [];
const relations: ParsedRelation[] = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmed = line.trim();

  // Track code blocks
  if (trimmed.startsWith('```')) {
    inCodeBlock = !inCodeBlock;
    continue;
  }
  // Skip code blocks unless we're in the relation map
  if (inCodeBlock && !inRelationMap) continue;

  // Track layer from ## headings
  if (trimmed.startsWith('## Layer 1')) { currentLayer = 'mechanic'; inRelationMap = false; inTable = false; continue; }
  if (trimmed.startsWith('## Layer 2')) { currentLayer = 'subsystem'; currentSubcategory = 'Procedures'; inRelationMap = false; inTable = false; continue; }
  if (trimmed.startsWith('## Layer 3')) { currentLayer = 'principle'; inRelationMap = false; inTable = false; continue; }
  if (trimmed.startsWith('## Relation Map')) { inRelationMap = true; inTable = false; continue; }
  if (trimmed.startsWith('## ') && inRelationMap) { inRelationMap = false; inTable = false; continue; }

  // Track subcategory from ### headings
  if (trimmed.startsWith('### ')) {
    currentSubcategory = trimmed.slice(4).replace(/\s*\([^)]*\)\s*$/, '').trim();
    inTable = false;
    continue;
  }

  // Parse relation map (inside code block)
  if (inRelationMap && inCodeBlock) {
    // Empty lines separate concept blocks
    if (!trimmed) continue;

    // Root concept: no leading whitespace, no tree characters
    if (line.length > 0 && !line.startsWith(' ') && !/^[├└│\s]/.test(line[0])) {
      // Strip parentheticals: "Shaping (innate magic)" -> "Shaping"
      currentRelationSource = trimmed.replace(/\s*\(.*\)$/, '').trim();
      continue;
    }

    // Relation line: ├── TYPE: targets or └── TYPE: targets
    const relMatch = trimmed.match(/^[├└]──\s+([A-Z_]+):\s+(.+)$/);
    if (relMatch && currentRelationSource) {
      relations.push({
        source: currentRelationSource,
        relation: relMatch[1],
        targets: parseRelationTargets(relMatch[2]),
      });
    }
    continue;
  }

  // Parse markdown tables
  if (trimmed.startsWith('|') && !inRelationMap) {
    const cells = trimmed.split('|').slice(1, -1).map(c => c.trim());

    // Separator row (|-|-|)
    if (cells.every(c => /^[-:]+$/.test(c))) continue;

    // Header row (first | line after non-table)
    if (!inTable) {
      tableHeaders = cells;
      inTable = true;
      continue;
    }

    // Data row
    const nameIdx = tableHeaders.findIndex(h => /^name$/i.test(h));
    const defIdx = tableHeaders.findIndex(h => /^definition$/i.test(h));
    const connectsIdx = tableHeaders.findIndex(h => /^connects to$/i.test(h));

    if (nameIdx >= 0 && cells[nameIdx]) {
      const rawName = cells[nameIdx].replace(/\*\*/g, '').trim();
      const definition = defIdx >= 0 ? (cells[defIdx]?.replace(/\*\*/g, '').trim() || '') : '';

      // Skip references like "(see Magic Concepts)"
      if (rawName.startsWith('(') || !rawName) continue;

      const connectsTo = connectsIdx >= 0 && cells[connectsIdx]
        ? splitConceptList(cells[connectsIdx])
        : [];

      concepts.push({
        name: rawName,
        definition,
        type: currentLayer,
        subcategory: currentSubcategory,
        category: HEADING_TO_CATEGORY[currentSubcategory] || currentSubcategory.toLowerCase().replace(/\s+/g, '_'),
        connectsTo,
      });
    }
    continue;
  }

  // End table on non-table line
  if (inTable && !trimmed.startsWith('|')) {
    inTable = false;
  }
}

// --- Helpers ---

function splitConceptList(str: string): string[] {
  return str.split(',')
    .map(s => s.replace(/\*\*/g, '').trim())
    .filter(s => s && !s.startsWith('('));
}

function parseRelationTargets(str: string): { name: string; description: string | null }[] {
  const targets: { name: string; description: string | null }[] = [];
  let current = '';
  let depth = 0;

  for (const ch of str) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ',' && depth === 0) {
      const t = parseTarget(current.trim());
      if (t) targets.push(t);
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) {
    const t = parseTarget(current.trim());
    if (t) targets.push(t);
  }
  return targets;
}

function parseTarget(s: string): { name: string; description: string | null } | null {
  if (!s) return null;
  const match = s.match(/^(.+?)\s*\((.+)\)$/);
  if (match) {
    return { name: match[1].trim(), description: match[2].trim() };
  }
  return { name: s, description: null };
}

// --- Import ---

console.log(`Parsed ${concepts.length} concepts, ${relations.length} relation groups\n`);

// Build name -> id map
const conceptIds = new Map<string, number>();

const importConcepts = db.transaction(() => {
  for (const c of concepts) {
    const id = upsertConcept(db, c.name, {
      curated: true,
      type: c.type,
      layer: c.type,
      category: c.category,
      definition: c.definition,
    });
    db.prepare('UPDATE concepts SET approved = 1, curated = 1 WHERE id = ?').run(id);
    conceptIds.set(c.name, id);
  }
});
importConcepts();
console.log(`Imported ${conceptIds.size} concepts`);

// Resolve concept name to ID with fallbacks
function resolveConceptId(name: string): number | null {
  if (conceptIds.has(name)) return conceptIds.get(name)!;

  // DB lookup (case-insensitive, might exist from prior indexing)
  const row = db.prepare('SELECT id, name FROM concepts WHERE name = ? COLLATE NOCASE')
    .get(name) as { id: number; name: string } | undefined;
  if (row) {
    conceptIds.set(row.name, row.id);
    return row.id;
  }

  // Strip parentheticals: "Push (gambit)" -> "Push"
  const stripped = name.replace(/\s*\(.*\)$/, '').trim();
  if (stripped !== name) return resolveConceptId(stripped);

  return null;
}

const importRelations = db.transaction(() => {
  let typed = 0;
  let generic = 0;
  let skipped = 0;

  // Typed relations from Relation Map (higher priority)
  for (const rel of relations) {
    const sourceId = resolveConceptId(rel.source);
    if (!sourceId) {
      console.log(`  skip: source "${rel.source}" not found`);
      skipped++;
      continue;
    }

    for (const t of rel.targets) {
      const targetId = resolveConceptId(t.name);
      if (!targetId) {
        skipped++;
        continue;
      }
      upsertConceptRelation(db, sourceId, targetId, rel.relation, t.description);
      typed++;
    }
  }

  // Generic RELATES_TO from table "Connects to" columns (lower priority)
  for (const c of concepts) {
    const sourceId = conceptIds.get(c.name);
    if (!sourceId || c.connectsTo.length === 0) continue;

    for (const target of c.connectsTo) {
      const targetId = resolveConceptId(target);
      if (!targetId) { skipped++; continue; }

      // Don't add generic if a typed relation already exists between this pair
      const existing = db.prepare(
        "SELECT 1 FROM concept_relations WHERE source_id = ? AND target_id = ? AND relation != 'RELATES_TO'"
      ).get(sourceId, targetId);
      if (!existing) {
        upsertConceptRelation(db, sourceId, targetId, 'RELATES_TO');
        generic++;
      }
    }
  }

  console.log(`Relations: ${typed} typed, ${generic} generic, ${skipped} skipped`);
});
importRelations();

// Summary
const totalConcepts = (db.prepare('SELECT COUNT(*) as cnt FROM concepts WHERE curated = 1').get() as { cnt: number }).cnt;
const totalRelations = (db.prepare('SELECT COUNT(*) as cnt FROM concept_relations').get() as { cnt: number }).cnt;
const byType = db.prepare(
  "SELECT COALESCE(type, 'untyped') as type, COUNT(*) as cnt FROM concepts WHERE curated = 1 GROUP BY type"
).all() as { type: string; cnt: number }[];
const byRelation = db.prepare(
  "SELECT relation, COUNT(*) as cnt FROM concept_relations GROUP BY relation ORDER BY cnt DESC"
).all() as { relation: string; cnt: number }[];

console.log(`\nDone:`);
console.log(`  ${totalConcepts} curated concepts (${byType.map(t => `${t.cnt} ${t.type}`).join(', ')})`);
console.log(`  ${totalRelations} relations (${byRelation.map(r => `${r.cnt} ${r.relation}`).join(', ')})`);
