import Database from 'better-sqlite3';

// --- Types ---

export type CommentCategory = 'note' | 'copy' | 'clarify' | 'design' | 'bug' | 'todo';

export interface Comment {
  id: string;
  selectedText: string;
  contextBefore: string;
  contextAfter: string;
  comment: string;
  category: CommentCategory;
  sectionId: string;
  sourceFile: string;
  filePath: string | null;
  nearestHeadingLine: number | null;
  sourceLine: number | null;
  paragraphIndex: number | null;
  status: 'open' | 'resolved' | 'dismissed';
  resolution: string | null;
  resolvedText: string | null;
  resolvedAt: string | null;
  createdAt: string;
  orphaned: number;
}

export interface Section {
  id: number;
  filePath: string;
  heading: string | null;
  headingLevel: number | null;
  content: string;
  lineStart: number | null;
  lineEnd: number | null;
  contentHash: string | null;
  indexedAt: string | null;
}

export interface Concept {
  id: number;
  name: string;
  aliases: string | null;
  type: string | null;       // legacy — kept in schema, read from layer
  layer: string | null;      // mechanic | subsystem | principle
  category: string | null;   // functional domain (stat, gambit, etc.)
  definition: string | null;
  curated: number;
  approved: number;
}

export interface ConceptMention {
  sectionId: number;
  conceptId: number;
  context: string | null;
}

export interface ConceptRelation {
  sourceId: number;
  targetId: number;
  relation: string;
  description: string | null;
}

// --- Database setup ---

export function openDb(dbPath: string): Database.Database {
  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  createTables(db);
  migrateDb(db);
  return db;
}

function migrateDb(db: Database.Database) {
  // Add category column if missing
  try {
    db.prepare("ALTER TABLE comments ADD COLUMN category TEXT NOT NULL DEFAULT 'note'").run();
  } catch { /* already exists */ }

  // Add concept graph columns (safe: no user input, all static SQL)
  const cols = db.prepare("PRAGMA table_info(concepts)").all() as { name: string }[];
  const colNames = new Set(cols.map(c => c.name));
  if (!colNames.has('type')) {
    db.prepare("ALTER TABLE concepts ADD COLUMN type TEXT").run();
  }
  if (!colNames.has('definition')) {
    db.prepare("ALTER TABLE concepts ADD COLUMN definition TEXT").run();
  }
  if (!colNames.has('layer')) {
    db.prepare("ALTER TABLE concepts ADD COLUMN layer TEXT").run();
  }
  if (!colNames.has('category')) {
    db.prepare("ALTER TABLE concepts ADD COLUMN category TEXT").run();
  }
  // Backfill layer from type for existing data
  db.prepare("UPDATE concepts SET layer = type WHERE layer IS NULL AND type IS NOT NULL").run();
}

function createTables(db: Database.Database) {
  db.exec(`
    -- Comment tables
    CREATE TABLE IF NOT EXISTS comments (
      id TEXT PRIMARY KEY,
      selected_text TEXT NOT NULL,
      context_before TEXT NOT NULL DEFAULT '',
      context_after TEXT NOT NULL DEFAULT '',
      comment TEXT NOT NULL,
      section_id TEXT NOT NULL,
      source_file TEXT NOT NULL,
      file_path TEXT,
      nearest_heading_line INTEGER,
      source_line INTEGER,
      paragraph_index INTEGER,
      category TEXT NOT NULL DEFAULT 'note',
      status TEXT NOT NULL CHECK(status IN ('open', 'resolved', 'dismissed')),
      resolution TEXT,
      resolved_text TEXT,
      resolved_at TEXT,
      created_at TEXT NOT NULL,
      orphaned INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS text_snapshots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      file_path TEXT NOT NULL,
      content TEXT NOT NULL,
      content_hash TEXT NOT NULL,
      captured_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS file_changes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      file_path TEXT NOT NULL,
      old_hash TEXT,
      new_hash TEXT NOT NULL,
      diff_text TEXT,
      changed_at TEXT NOT NULL
    );

    -- Knowledge graph tables
    CREATE TABLE IF NOT EXISTS sections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      file_path TEXT NOT NULL,
      heading TEXT,
      heading_level INTEGER,
      content TEXT NOT NULL,
      line_start INTEGER,
      line_end INTEGER,
      content_hash TEXT,
      indexed_at TEXT
    );

    CREATE TABLE IF NOT EXISTS concepts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      aliases TEXT,
      curated INTEGER NOT NULL DEFAULT 0,
      approved INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS concept_mentions (
      section_id INTEGER NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
      concept_id INTEGER NOT NULL REFERENCES concepts(id) ON DELETE CASCADE,
      context TEXT,
      PRIMARY KEY (section_id, concept_id)
    );

    CREATE TABLE IF NOT EXISTS section_embeddings (
      section_id INTEGER PRIMARY KEY REFERENCES sections(id) ON DELETE CASCADE,
      embedding BLOB NOT NULL,
      model TEXT NOT NULL,
      generated_at TEXT
    );

    CREATE TABLE IF NOT EXISTS concept_relations (
      source_id INTEGER NOT NULL REFERENCES concepts(id) ON DELETE CASCADE,
      target_id INTEGER NOT NULL REFERENCES concepts(id) ON DELETE CASCADE,
      relation TEXT NOT NULL,
      description TEXT,
      PRIMARY KEY (source_id, target_id, relation)
    );

    -- Indexes
    CREATE INDEX IF NOT EXISTS idx_comments_status ON comments(status);
    CREATE INDEX IF NOT EXISTS idx_comments_file_path ON comments(file_path);
    CREATE INDEX IF NOT EXISTS idx_text_snapshots_file ON text_snapshots(file_path);
    CREATE INDEX IF NOT EXISTS idx_sections_file ON sections(file_path);
    CREATE INDEX IF NOT EXISTS idx_sections_hash ON sections(content_hash);
    CREATE INDEX IF NOT EXISTS idx_concept_mentions_concept ON concept_mentions(concept_id);
    CREATE INDEX IF NOT EXISTS idx_concept_relations_source ON concept_relations(source_id);
    CREATE INDEX IF NOT EXISTS idx_concept_relations_target ON concept_relations(target_id);
  `);
}

// --- camelCase <-> snake_case mapping ---

function toRow(c: Comment): Record<string, unknown> {
  return {
    id: c.id,
    selected_text: c.selectedText,
    context_before: c.contextBefore,
    context_after: c.contextAfter,
    comment: c.comment,
    category: c.category || 'note',
    section_id: c.sectionId,
    source_file: c.sourceFile,
    file_path: c.filePath,
    nearest_heading_line: c.nearestHeadingLine,
    source_line: c.sourceLine,
    paragraph_index: c.paragraphIndex,
    status: c.status,
    resolution: c.resolution,
    resolved_text: c.resolvedText,
    resolved_at: c.resolvedAt,
    created_at: c.createdAt,
    orphaned: c.orphaned,
  };
}

export function toComment(row: Record<string, unknown>): Comment {
  return {
    id: row.id as string,
    selectedText: row.selected_text as string,
    contextBefore: (row.context_before as string) ?? '',
    contextAfter: (row.context_after as string) ?? '',
    comment: row.comment as string,
    category: (row.category as CommentCategory) || 'note',
    sectionId: row.section_id as string,
    sourceFile: row.source_file as string,
    filePath: row.file_path as string | null,
    nearestHeadingLine: row.nearest_heading_line as number | null,
    sourceLine: row.source_line as number | null,
    paragraphIndex: row.paragraph_index as number | null,
    status: row.status as Comment['status'],
    resolution: row.resolution as string | null,
    resolvedText: row.resolved_text as string | null,
    resolvedAt: row.resolved_at as string | null,
    createdAt: row.created_at as string,
    orphaned: (row.orphaned as number) ?? 0,
  };
}

function toSection(row: Record<string, unknown>): Section {
  return {
    id: row.id as number,
    filePath: row.file_path as string,
    heading: row.heading as string | null,
    headingLevel: row.heading_level as number | null,
    content: row.content as string,
    lineStart: row.line_start as number | null,
    lineEnd: row.line_end as number | null,
    contentHash: row.content_hash as string | null,
    indexedAt: row.indexed_at as string | null,
  };
}

function toConcept(row: Record<string, unknown>): Concept {
  return {
    id: row.id as number,
    name: row.name as string,
    aliases: row.aliases as string | null,
    type: (row.type as string | null) ?? null,
    layer: (row.layer as string | null) ?? null,
    category: (row.category as string | null) ?? null,
    definition: (row.definition as string | null) ?? null,
    curated: row.curated as number,
    approved: row.approved as number,
  };
}

// --- Comment CRUD ---

export function getComments(
  db: Database.Database,
  filter?: { status?: string; filePath?: string; category?: string }
): Comment[] {
  let sql = 'SELECT * FROM comments';
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (filter?.status) {
    conditions.push('status = ?');
    params.push(filter.status);
  }
  if (filter?.filePath) {
    conditions.push('file_path = ?');
    params.push(filter.filePath);
  }
  if (filter?.category) {
    conditions.push('category = ?');
    params.push(filter.category);
  }
  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }
  sql += ' ORDER BY created_at ASC';

  return db.prepare(sql).all(...params).map((r) => toComment(r as Record<string, unknown>));
}

export function getComment(db: Database.Database, id: string): Comment | null {
  // Exact match first
  const row = db.prepare('SELECT * FROM comments WHERE id = ?').get(id) as Record<string, unknown> | undefined;
  if (row) return toComment(row);

  // Suffix match
  const rows = db.prepare("SELECT * FROM comments WHERE id LIKE '%' || ?").all(id) as Record<string, unknown>[];
  if (rows.length === 1) return toComment(rows[0]);
  if (rows.length > 1) throw new Error(`Ambiguous ID suffix "${id}" matches ${rows.length} comments`);

  return null;
}

export function upsertComment(db: Database.Database, c: Comment): void {
  const row = toRow(c);
  db.prepare(`
    INSERT OR REPLACE INTO comments (
      id, selected_text, context_before, context_after, comment, category,
      section_id, source_file, file_path, nearest_heading_line, source_line,
      paragraph_index, status, resolution, resolved_text, resolved_at,
      created_at, orphaned
    ) VALUES (
      @id, @selected_text, @context_before, @context_after, @comment, @category,
      @section_id, @source_file, @file_path, @nearest_heading_line, @source_line,
      @paragraph_index, @status, @resolution, @resolved_text, @resolved_at,
      @created_at, @orphaned
    )
  `).run(row);
}

export function updateStatus(
  db: Database.Database,
  id: string,
  status: Comment['status'],
  resolution?: string,
  resolvedText?: string
): void {
  const comment = getComment(db, id);
  if (!comment) throw new Error(`Comment not found: ${id}`);

  db.prepare(`
    UPDATE comments
    SET status = ?, resolution = ?, resolved_text = ?, resolved_at = ?
    WHERE id = ?
  `).run(
    status,
    resolution ?? comment.resolution,
    resolvedText ?? comment.resolvedText,
    status === 'resolved' ? new Date().toISOString() : comment.resolvedAt,
    comment.id
  );
}

export function deleteComment(db: Database.Database, id: string): boolean {
  const comment = getComment(db, id);
  if (!comment) return false;
  db.prepare('DELETE FROM comments WHERE id = ?').run(comment.id);
  return true;
}

export function insertSnapshot(
  db: Database.Database,
  filePath: string,
  content: string,
  hash: string
): number {
  const result = db.prepare(`
    INSERT INTO text_snapshots (file_path, content, content_hash, captured_at)
    VALUES (?, ?, ?, ?)
  `).run(filePath, content, hash, new Date().toISOString());
  return Number(result.lastInsertRowid);
}

export function insertFileChange(
  db: Database.Database,
  filePath: string,
  oldHash: string | null,
  newHash: string,
  diff: string | null
): void {
  db.prepare(`
    INSERT INTO file_changes (file_path, old_hash, new_hash, diff_text, changed_at)
    VALUES (?, ?, ?, ?, ?)
  `).run(filePath, oldHash, newHash, diff, new Date().toISOString());
}

// --- Knowledge graph CRUD ---

export function upsertSection(
  db: Database.Database,
  section: Omit<Section, 'id'>
): number {
  const existing = db.prepare(
    'SELECT id FROM sections WHERE file_path = ? AND heading = ? AND line_start = ?'
  ).get(section.filePath, section.heading, section.lineStart) as { id: number } | undefined;

  if (existing) {
    db.prepare(`
      UPDATE sections SET content = ?, content_hash = ?, heading_level = ?,
        line_end = ?, indexed_at = ? WHERE id = ?
    `).run(
      section.content, section.contentHash, section.headingLevel,
      section.lineEnd, new Date().toISOString(), existing.id
    );
    return existing.id;
  }

  const result = db.prepare(`
    INSERT INTO sections (file_path, heading, heading_level, content, line_start, line_end, content_hash, indexed_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    section.filePath, section.heading, section.headingLevel,
    section.content, section.lineStart, section.lineEnd,
    section.contentHash, new Date().toISOString()
  );
  return Number(result.lastInsertRowid);
}

export function getSections(
  db: Database.Database,
  filter?: { filePath?: string; heading?: string }
): Section[] {
  let sql = 'SELECT * FROM sections';
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (filter?.filePath) {
    conditions.push('file_path = ?');
    params.push(filter.filePath);
  }
  if (filter?.heading) {
    conditions.push('heading LIKE ?');
    params.push(`%${filter.heading}%`);
  }
  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }
  sql += ' ORDER BY file_path, line_start';

  return db.prepare(sql).all(...params).map((r) => toSection(r as Record<string, unknown>));
}

export function upsertConcept(
  db: Database.Database,
  name: string,
  opts?: {
    aliases?: string;
    curated?: boolean;
    type?: string;
    layer?: string;
    category?: string;
    definition?: string;
  }
): number {
  const existing = db.prepare('SELECT id FROM concepts WHERE name = ?').get(name) as { id: number } | undefined;
  if (existing) {
    const sets: string[] = [];
    const params: unknown[] = [];
    if (opts?.aliases !== undefined) { sets.push('aliases = ?'); params.push(opts.aliases); }
    if (opts?.curated !== undefined) { sets.push('curated = ?'); params.push(opts.curated ? 1 : 0); }
    if (opts?.type !== undefined) { sets.push('type = ?'); params.push(opts.type); }
    if (opts?.layer !== undefined) { sets.push('layer = ?'); params.push(opts.layer); }
    if (opts?.category !== undefined) { sets.push('category = ?'); params.push(opts.category); }
    if (opts?.definition !== undefined) { sets.push('definition = ?'); params.push(opts.definition); }
    // When layer is set, keep type in sync for backward compat
    if (opts?.layer !== undefined && opts?.type === undefined) {
      sets.push('type = ?'); params.push(opts.layer);
    }
    if (sets.length > 0) {
      params.push(existing.id);
      db.prepare(`UPDATE concepts SET ${sets.join(', ')} WHERE id = ?`).run(...params);
    }
    return existing.id;
  }

  const layer = opts?.layer ?? null;
  const type = opts?.type ?? layer;
  const result = db.prepare(`
    INSERT INTO concepts (name, aliases, curated, approved, type, definition, layer, category)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    name, opts?.aliases ?? null,
    opts?.curated ? 1 : 0, opts?.curated ? 1 : 0,
    type, opts?.definition ?? null,
    layer, opts?.category ?? null
  );
  return Number(result.lastInsertRowid);
}

export function getConcepts(
  db: Database.Database,
  filter?: { curatedOnly?: boolean; unapproved?: boolean; type?: string; layer?: string; category?: string }
): Concept[] {
  let sql = 'SELECT * FROM concepts';
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (filter?.curatedOnly) conditions.push('curated = 1');
  if (filter?.unapproved) conditions.push('approved = 0');
  if (filter?.layer) {
    conditions.push('(layer = ? OR (layer IS NULL AND type = ?))');
    params.push(filter.layer, filter.layer);
  } else if (filter?.type) {
    conditions.push('(layer = ? OR type = ?)');
    params.push(filter.type, filter.type);
  }
  if (filter?.category) { conditions.push('category = ?'); params.push(filter.category); }
  if (conditions.length > 0) sql += ' WHERE ' + conditions.join(' AND ');
  sql += ' ORDER BY name';

  return db.prepare(sql).all(...params).map((r) => toConcept(r as Record<string, unknown>));
}

export interface ScoredCandidate {
  name: string;
  score: number;
  signals: {
    rulesFiles: number;
    totalMentions: number;
    definitionHits: number;
    cooccurrence: number;
  };
  contexts: string[];
}

/**
 * Score unapproved concept candidates based on multiple signals.
 * Higher score = more likely to be a real game concept.
 */
export function scoreCandidates(
  db: Database.Database,
  limit: number = 80,
): ScoredCandidate[] {
  // Get all unapproved concepts with mention counts
  const rows = db.prepare(`
    SELECT
      c.id, c.name,
      COUNT(DISTINCT cm.section_id) as total_mentions,
      COUNT(DISTINCT s.file_path) as total_files,
      COUNT(DISTINCT CASE
        WHEN s.file_path LIKE 'rules/%'
          AND s.file_path NOT LIKE 'rules/reference/%'
          AND s.file_path NOT LIKE 'rules/archive/%'
        THEN s.file_path END) as rules_files,
      COUNT(DISTINCT CASE
        WHEN s.file_path LIKE 'rules/%'
          AND s.file_path NOT LIKE 'rules/reference/%'
          AND s.file_path NOT LIKE 'rules/archive/%'
        THEN cm.section_id END) as rules_mentions
    FROM concepts c
    JOIN concept_mentions cm ON cm.concept_id = c.id
    JOIN sections s ON s.id = cm.section_id
    WHERE c.approved = 0
      AND length(c.name) > 2
      AND c.name NOT GLOB '[0-9]*'
      AND c.name NOT GLOB '*[0-9]-[0-9]*'
      AND substr(c.name, 1, 1) = upper(substr(c.name, 1, 1))
    GROUP BY c.id
    HAVING rules_mentions >= 2
  `).all() as Record<string, unknown>[];

  // Get confirmed concept IDs for co-occurrence scoring
  const confirmedIds = new Set(
    (db.prepare('SELECT id FROM concepts WHERE approved = 1').all() as { id: number }[])
      .map((r) => r.id),
  );

  const candidates: ScoredCandidate[] = [];

  for (const row of rows) {
    const name = row.name as string;
    const id = row.id as number;
    const rulesFiles = row.rules_files as number;
    const rulesMentions = row.rules_mentions as number;
    const totalMentions = row.total_mentions as number;

    // Signal 1: Cross-file presence in rules (0-10)
    const crossFileScore = Math.min(rulesFiles * 2.5, 10);

    // Signal 2: Definition pattern — **Name.** or **Name:** in rules sections
    const defRows = db.prepare(`
      SELECT COUNT(*) as cnt FROM concept_mentions cm
      JOIN sections s ON s.id = cm.section_id
      WHERE cm.concept_id = ?
        AND s.file_path LIKE 'rules/%'
        AND s.file_path NOT LIKE 'rules/reference/%'
        AND s.file_path NOT LIKE 'rules/archive/%'
        AND (s.content LIKE '%**' || ? || '.**%' OR s.content LIKE '%**' || ? || ':**%')
    `).get(id, name, name) as { cnt: number };
    const definitionHits = defRows.cnt;
    const defScore = Math.min(definitionHits * 3, 6);

    // Signal 3: Co-occurrence with confirmed concepts (shared sections)
    const coocRow = db.prepare(`
      SELECT COUNT(DISTINCT cm2.concept_id) as cnt
      FROM concept_mentions cm
      JOIN concept_mentions cm2 ON cm2.section_id = cm.section_id AND cm2.concept_id != cm.concept_id
      WHERE cm.concept_id = ?
        AND cm2.concept_id IN (SELECT id FROM concepts WHERE approved = 1)
    `).get(id) as { cnt: number };
    const cooccurrence = coocRow.cnt;
    const coocScore = Math.min(cooccurrence * 0.5, 5);

    // Signal 4: Mention density in rules (0-4)
    const densityScore = Math.min(rulesMentions * 0.3, 4);

    // Penalties
    let penalty = 0;
    // All lowercase version exists as separate concept (duplicate noise)
    if (name.toLowerCase() !== name) {
      const lowerDup = db.prepare('SELECT id FROM concepts WHERE name = ? AND approved = 0').get(name.toLowerCase());
      if (lowerDup) penalty += 2;
    }
    // Ends with period (formatting artifact)
    if (name.endsWith('.')) penalty += 3;
    // Very short (1-2 chars after trim)
    if (name.trim().length <= 2) penalty += 5;

    const score = Math.max(0, crossFileScore + defScore + coocScore + densityScore - penalty);

    // Get context snippets (up to 3)
    const ctxRows = db.prepare(`
      SELECT cm.context FROM concept_mentions cm
      JOIN sections s ON s.id = cm.section_id
      WHERE cm.concept_id = ?
        AND cm.context IS NOT NULL
        AND s.file_path LIKE 'rules/%'
        AND s.file_path NOT LIKE 'rules/reference/%'
        AND s.file_path NOT LIKE 'rules/archive/%'
      LIMIT 3
    `).all(id) as { context: string }[];

    candidates.push({
      name,
      score: Math.round(score * 10) / 10,
      signals: {
        rulesFiles,
        totalMentions,
        definitionHits,
        cooccurrence,
      },
      contexts: ctxRows.map((r) => r.context),
    });
  }

  candidates.sort((a, b) => b.score - a.score);
  return candidates.slice(0, limit);
}

export function linkConceptToSection(
  db: Database.Database,
  sectionId: number,
  conceptId: number,
  context: string | null
): void {
  db.prepare(`
    INSERT OR REPLACE INTO concept_mentions (section_id, concept_id, context)
    VALUES (?, ?, ?)
  `).run(sectionId, conceptId, context);
}

export function findMentions(db: Database.Database, conceptName: string): Section[] {
  const rows = db.prepare(`
    SELECT s.* FROM sections s
    JOIN concept_mentions cm ON cm.section_id = s.id
    JOIN concepts c ON c.id = cm.concept_id
    WHERE c.name = ? OR (',' || c.aliases || ',') LIKE ('%,' || ? || ',%')
    ORDER BY s.file_path, s.line_start
  `).all(conceptName, conceptName);
  return rows.map((r) => toSection(r as Record<string, unknown>));
}

export function upsertConceptRelation(
  db: Database.Database,
  sourceId: number,
  targetId: number,
  relation: string,
  description?: string | null
): void {
  db.prepare(`
    INSERT OR REPLACE INTO concept_relations (source_id, target_id, relation, description)
    VALUES (?, ?, ?, ?)
  `).run(sourceId, targetId, relation, description ?? null);
}

export function getConceptGraph(
  db: Database.Database,
  conceptName: string
): {
  concept: Concept;
  outgoing: { relation: string; target: string; description: string | null }[];
  incoming: { relation: string; source: string; description: string | null }[];
} | null {
  const row = db.prepare('SELECT * FROM concepts WHERE name = ? COLLATE NOCASE')
    .get(conceptName) as Record<string, unknown> | undefined;
  if (!row) return null;

  const concept = toConcept(row);

  const outgoing = db.prepare(`
    SELECT cr.relation, cr.description, c.name as target_name
    FROM concept_relations cr
    JOIN concepts c ON c.id = cr.target_id
    WHERE cr.source_id = ?
    ORDER BY cr.relation, c.name
  `).all(concept.id) as { relation: string; description: string | null; target_name: string }[];

  const incoming = db.prepare(`
    SELECT cr.relation, cr.description, c.name as source_name
    FROM concept_relations cr
    JOIN concepts c ON c.id = cr.source_id
    WHERE cr.target_id = ?
    ORDER BY cr.relation, c.name
  `).all(concept.id) as { relation: string; description: string | null; source_name: string }[];

  return {
    concept,
    outgoing: outgoing.map(r => ({ relation: r.relation, target: r.target_name, description: r.description })),
    incoming: incoming.map(r => ({ relation: r.relation, source: r.source_name, description: r.description })),
  };
}

export function renameConcept(db: Database.Database, oldName: string, newName: string): number | null {
  const row = db.prepare('SELECT id, aliases FROM concepts WHERE name = ? COLLATE NOCASE')
    .get(oldName) as { id: number; aliases: string | null } | undefined;
  if (!row) return null;
  const existingAliases = row.aliases ? row.aliases.split(',').map(a => a.trim()) : [];
  if (!existingAliases.includes(oldName)) existingAliases.push(oldName);
  db.prepare('UPDATE concepts SET name = ?, aliases = ? WHERE id = ?')
    .run(newName, existingAliases.join(','), row.id);
  return row.id;
}

export function deprecateConcept(db: Database.Database, name: string): boolean {
  const row = db.prepare('SELECT id FROM concepts WHERE name = ? COLLATE NOCASE')
    .get(name) as { id: number } | undefined;
  if (!row) return false;
  db.prepare('UPDATE concepts SET approved = 0 WHERE id = ?').run(row.id);
  db.prepare('DELETE FROM concept_mentions WHERE concept_id = ?').run(row.id);
  return true;
}

export function mergeConcepts(
  db: Database.Database,
  sourceName: string,
  targetName: string
): { merged: boolean; mentionsMoved: number } {
  const src = db.prepare('SELECT id, name, aliases FROM concepts WHERE name = ? COLLATE NOCASE')
    .get(sourceName) as { id: number; name: string; aliases: string | null } | undefined;
  const tgt = db.prepare('SELECT id, name, aliases FROM concepts WHERE name = ? COLLATE NOCASE')
    .get(targetName) as { id: number; name: string; aliases: string | null } | undefined;
  if (!src || !tgt) return { merged: false, mentionsMoved: 0 };

  // Move mentions from source to target (skip duplicates)
  const moved = db.prepare(`
    INSERT OR IGNORE INTO concept_mentions (section_id, concept_id, context)
    SELECT section_id, ?, context FROM concept_mentions WHERE concept_id = ?
  `).run(tgt.id, src.id);

  // Repoint concept_relations
  db.prepare('UPDATE OR IGNORE concept_relations SET source_id = ? WHERE source_id = ?').run(tgt.id, src.id);
  db.prepare('UPDATE OR IGNORE concept_relations SET target_id = ? WHERE target_id = ?').run(tgt.id, src.id);
  // Clean up any self-referencing or duplicate relations
  db.prepare('DELETE FROM concept_relations WHERE source_id = ? OR target_id = ?').run(src.id, src.id);

  // Merge aliases
  const srcAliases = src.aliases ? src.aliases.split(',').map(a => a.trim()) : [];
  srcAliases.push(src.name);
  const tgtAliases = tgt.aliases ? tgt.aliases.split(',').map(a => a.trim()) : [];
  const merged = [...new Set([...tgtAliases, ...srcAliases])].filter(a => a && a !== tgt.name);
  db.prepare('UPDATE concepts SET aliases = ? WHERE id = ?').run(merged.join(','), tgt.id);

  // Delete source
  db.prepare('DELETE FROM concept_mentions WHERE concept_id = ?').run(src.id);
  db.prepare('DELETE FROM concepts WHERE id = ?').run(src.id);

  return { merged: true, mentionsMoved: moved.changes };
}

export function deleteConceptRelation(
  db: Database.Database,
  sourceId: number,
  targetId: number,
  relation: string
): boolean {
  const result = db.prepare(
    'DELETE FROM concept_relations WHERE source_id = ? AND target_id = ? AND relation = ?'
  ).run(sourceId, targetId, relation);
  return result.changes > 0;
}

export function getFilesWithMentions(db: Database.Database, conceptId: number): string[] {
  const rows = db.prepare(`
    SELECT DISTINCT s.file_path FROM sections s
    JOIN concept_mentions cm ON cm.section_id = s.id
    WHERE cm.concept_id = ?
  `).all(conceptId) as { file_path: string }[];
  return rows.map(r => r.file_path);
}

export function upsertEmbedding(
  db: Database.Database,
  sectionId: number,
  embedding: Float32Array,
  model: string
): void {
  const buf = Buffer.from(embedding.buffer, embedding.byteOffset, embedding.byteLength);
  db.prepare(`
    INSERT OR REPLACE INTO section_embeddings (section_id, embedding, model, generated_at)
    VALUES (?, ?, ?, ?)
  `).run(sectionId, buf, model, new Date().toISOString());
}

export function findSimilar(
  db: Database.Database,
  queryEmbedding: Float32Array,
  limit: number = 10
): { section: Section; score: number }[] {
  const rows = db.prepare(`
    SELECT se.embedding, s.* FROM section_embeddings se
    JOIN sections s ON s.id = se.section_id
  `).all() as (Record<string, unknown> & { embedding: Buffer })[];

  const results: { section: Section; score: number }[] = [];
  for (const row of rows) {
    const stored = new Float32Array(
      row.embedding.buffer,
      row.embedding.byteOffset,
      row.embedding.byteLength / 4
    );
    const score = cosineSimilarity(queryEmbedding, stored);
    results.push({ section: toSection(row), score });
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit);
}

function cosineSimilarity(a: Float32Array, b: Float32Array): number {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  const denom = Math.sqrt(magA) * Math.sqrt(magB);
  return denom === 0 ? 0 : dot / denom;
}

export function deleteStaleSections(db: Database.Database, filePath: string, validHashes: string[]): void {
  if (validHashes.length === 0) {
    db.prepare('DELETE FROM sections WHERE file_path = ?').run(filePath);
    return;
  }
  const placeholders = validHashes.map(() => '?').join(',');
  db.prepare(
    `DELETE FROM sections WHERE file_path = ? AND content_hash NOT IN (${placeholders})`
  ).run(filePath, ...validHashes);
}

export function getLatestSnapshot(
  db: Database.Database,
  filePath: string
): { content: string; contentHash: string } | null {
  const row = db.prepare(
    'SELECT content, content_hash FROM text_snapshots WHERE file_path = ? ORDER BY captured_at DESC LIMIT 1'
  ).get(filePath) as { content: string; content_hash: string } | undefined;
  if (!row) return null;
  return { content: row.content, contentHash: row.content_hash };
}
