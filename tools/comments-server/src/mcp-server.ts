import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  openDb,
  getComments,
  getComment,
  upsertComment,
  updateStatus,
  deleteComment as dbDeleteComment,
  findMentions,
  findSimilar,
  getConcepts,
  upsertConcept,
  upsertConceptRelation,
  scoreCandidates,
  getConceptGraph,
  renameConcept,
  deprecateConcept,
  mergeConcepts,
  deleteConceptRelation,
  getFilesWithMentions,
  type Comment,
} from './db.ts';
import { readFile } from 'node:fs/promises';
import { relative } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { replaceInMarkdownFiles } from './prose-replace.ts';

const execFileAsync = promisify(execFile);

async function git(...args: string[]): Promise<string> {
  const { stdout } = await execFileAsync('git', args, { cwd: ROOT_DIR });
  return stdout.trim();
}

let sessionBranch: string | null = null;
let sessionBaseBranch: string | null = null;
import { indexFile } from './indexer.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = resolve(__dirname, '../../comments.db');
const db = openDb(DB_PATH);

const ROOT_DIR = resolve(__dirname, '../../..');

async function reindexAllRules(): Promise<number> {
  const { glob } = await import('node:fs/promises');
  let count = 0;
  for await (const filePath of glob(resolve(ROOT_DIR, 'rules/**/*.md'))) {
    const content = await readFile(filePath, 'utf-8');
    const relPath = relative(ROOT_DIR, filePath);
    await indexFile(db, relPath, content);
    count++;
  }
  return count;
}

async function reindexFiles(relPaths: string[]): Promise<number> {
  let count = 0;
  for (const relPath of relPaths) {
    try {
      const content = await readFile(resolve(ROOT_DIR, relPath), 'utf-8');
      await indexFile(db, relPath, content);
      count++;
    } catch { /* file may have been deleted */ }
  }
  return count;
}

const server = new McpServer(
  { name: 'comments', version: '1.1.0' },
  {
    instructions: `MONDAS Concept Graph — knowledge base for a TTRPG rules engine (~164 game concepts).

ROUTING — when discussion produces concept changes, use these tools:
| Change | Tool | Cascade |
| New named thing | create_concept | DB + full mention scan |
| Definition/type change | update_concept | DB only |
| Name change | rename_concept | DB + reindex affected files |
| Connection discovered | link_concepts | DB only |
| Remove connection | unlink_concepts | DB only |
| Thing removed | deprecate_concept | DB + unlink mentions |
| Two things are one | merge_concepts | DB + reindex both |
| Review auto-detected | review_candidates | Read-only |

BEFORE modifying a concept, call trace_concept to see its current state and relations.
AFTER creating concepts, the system auto-reindexes rules files to find mentions. No manual step needed.

TAXONOMY — two axes:
- layer: mechanic (table-level named things), subsystem (multi-step procedures), principle (design axioms)
- category: stat, resource, modifier, gambit, condition, weapon_property, clock, magic, etc.

RELATION TYPES: COSTS, PRODUCES, MODIFIES, GATES, CONTAINS, OPPOSES, ENABLES, GOVERNS, VARIANT_OF, RELATES_TO

Read concepts://taxonomy resource for live counts by layer and category.`,
  }
);

// --- Resources ---

server.registerResource(
  'concept_taxonomy',
  'concepts://taxonomy',
  { description: 'Live concept taxonomy: layers, categories, and counts' },
  async () => {
    const rows = db.prepare(`
      SELECT COALESCE(layer, type, 'unclassified') as lyr,
             COALESCE(category, 'uncategorized') as cat,
             COUNT(*) as cnt
      FROM concepts WHERE curated = 1 AND approved = 1
      GROUP BY lyr, cat ORDER BY lyr, cat
    `).all() as { lyr: string; cat: string; cnt: number }[];

    const taxonomy: Record<string, Record<string, number>> = {};
    for (const r of rows) {
      (taxonomy[r.lyr] ??= {})[r.cat] = r.cnt;
    }
    return {
      contents: [{
        uri: 'concepts://taxonomy',
        text: JSON.stringify(taxonomy, null, 2),
        mimeType: 'application/json',
      }],
    };
  }
);

// --- Comment tools ---

server.tool(
  'list_comments',
  'List comments, optionally filtered by status, file_path, or category',
  { status: z.string().optional(), file_path: z.string().optional(), category: z.string().optional() },
  async ({ status, file_path, category }) => {
    const comments = getComments(db, {
      status: status || undefined,
      filePath: file_path || undefined,
      category: category || undefined,
    });
    return {
      content: [{ type: 'text', text: JSON.stringify(comments, null, 2) }],
    };
  }
);

server.tool(
  'get_comment',
  'Get a single comment by ID (supports suffix matching)',
  { id: z.string() },
  async ({ id }) => {
    try {
      const comment = getComment(db, id);
      if (!comment) {
        return { content: [{ type: 'text', text: `Comment not found: ${id}` }], isError: true };
      }
      return { content: [{ type: 'text', text: JSON.stringify(comment, null, 2) }] };
    } catch (e: unknown) {
      return { content: [{ type: 'text', text: (e as Error).message }], isError: true };
    }
  }
);

server.tool(
  'resolve_comment',
  'Resolve a comment with a resolution description and optional resolved text',
  {
    id: z.string(),
    resolution: z.string(),
    resolved_text: z.string().optional(),
  },
  async ({ id, resolution, resolved_text }) => {
    try {
      updateStatus(db, id, 'resolved', resolution, resolved_text);
      const updated = getComment(db, id);
      return { content: [{ type: 'text', text: JSON.stringify(updated, null, 2) }] };
    } catch (e: unknown) {
      return { content: [{ type: 'text', text: (e as Error).message }], isError: true };
    }
  }
);

server.tool(
  'dismiss_comment',
  'Dismiss a resolved comment (removes from active view)',
  { id: z.string() },
  async ({ id }) => {
    try {
      updateStatus(db, id, 'dismissed');
      return { content: [{ type: 'text', text: `Dismissed: ${id}` }] };
    } catch (e: unknown) {
      return { content: [{ type: 'text', text: (e as Error).message }], isError: true };
    }
  }
);

server.tool(
  'reopen_comment',
  'Reopen a resolved or dismissed comment',
  { id: z.string() },
  async ({ id }) => {
    try {
      const comment = getComment(db, id);
      if (!comment) {
        return { content: [{ type: 'text', text: `Comment not found: ${id}` }], isError: true };
      }
      updateStatus(db, comment.id, 'open');
      // Clear resolution fields
      db.prepare('UPDATE comments SET resolution = NULL, resolved_text = NULL, resolved_at = NULL WHERE id = ?')
        .run(comment.id);
      return { content: [{ type: 'text', text: `Reopened: ${comment.id}` }] };
    } catch (e: unknown) {
      return { content: [{ type: 'text', text: (e as Error).message }], isError: true };
    }
  }
);

server.tool(
  'add_comment',
  'Add a new comment with optional category (note, copy, clarify, design, bug, todo)',
  {
    selected_text: z.string(),
    comment: z.string(),
    section_id: z.string(),
    source_file: z.string(),
    file_path: z.string().optional(),
    context_before: z.string().optional(),
    context_after: z.string().optional(),
    nearest_heading_line: z.number().optional(),
    source_line: z.number().optional(),
    paragraph_index: z.number().optional(),
    category: z.enum(['note', 'copy', 'clarify', 'design', 'bug', 'todo']).optional(),
  },
  async (params) => {
    const id = 'c_' + Date.now() + '_' + Math.random().toString(36).slice(2, 5);
    const comment: Comment = {
      id,
      selectedText: params.selected_text,
      contextBefore: params.context_before || '',
      contextAfter: params.context_after || '',
      comment: params.comment,
      category: params.category || 'note',
      sectionId: params.section_id,
      sourceFile: params.source_file,
      filePath: params.file_path || null,
      nearestHeadingLine: params.nearest_heading_line ?? null,
      sourceLine: params.source_line ?? null,
      paragraphIndex: params.paragraph_index ?? null,
      status: 'open',
      resolution: null,
      resolvedText: null,
      resolvedAt: null,
      createdAt: new Date().toISOString(),
      orphaned: 0,
    };
    upsertComment(db, comment);
    return { content: [{ type: 'text', text: JSON.stringify(comment, null, 2) }] };
  }
);

// --- Knowledge graph tools ---

server.tool(
  'find_mentions',
  'Find all sections that mention a game concept (by name or alias)',
  { concept: z.string() },
  async ({ concept }) => {
    const sections = findMentions(db, concept);
    if (sections.length === 0) {
      return { content: [{ type: 'text', text: `No mentions found for "${concept}"` }] };
    }
    return { content: [{ type: 'text', text: JSON.stringify(sections, null, 2) }] };
  }
);

server.tool(
  'impact_search',
  'Semantic search: find sections similar to a query (requires embeddings)',
  { query: z.string(), limit: z.number().optional() },
  async ({ query, limit }) => {
    // We need an embedding for the query. Try to load the embedder.
    try {
      const { createOllamaProvider } = await import('./embeddings.ts');
      const embedder = createOllamaProvider();
      const queryVec = await embedder.embed(query);
      if (!queryVec) {
        return { content: [{ type: 'text', text: 'Ollama not available for embedding query' }], isError: true };
      }
      const results = findSimilar(db, new Float32Array(queryVec), limit || 10);
      const output = results.map((r) => ({
        score: Math.round(r.score * 1000) / 1000,
        file: r.section.filePath,
        heading: r.section.heading,
        preview: r.section.content.slice(0, 200),
      }));
      return { content: [{ type: 'text', text: JSON.stringify(output, null, 2) }] };
    } catch {
      return {
        content: [{ type: 'text', text: 'Embedding search unavailable. Run `npm run index` first and ensure Ollama is running.' }],
        isError: true,
      };
    }
  }
);

server.registerTool(
  'list_concepts',
  {
    title: 'Browse Concept Graph',
    description: `List game concepts from the MONDAS rules knowledge graph. Three layers:
- mechanic: Named things at the table (Guard, Drain, Boon, Gambit verbs, weapon properties, conditions)
- subsystem: Named procedures with steps (The Roll, Damage Pipeline, Combat Roll, Work a Lead)
- principle: Design axioms governing mechanics (Fiction Determines Stat, Cost Must Hurt, Escalation)
Use layer/category filters to browse. Default output is compact (names grouped by layer/category). Set compact=false for full details.`,
    inputSchema: {
      type: z.enum(['mechanic', 'subsystem', 'principle']).optional().describe('Filter by layer (legacy alias)'),
      layer: z.enum(['mechanic', 'subsystem', 'principle']).optional().describe('Filter by abstraction layer'),
      category: z.string().optional().describe('Filter by functional category'),
      curated_only: z.boolean().optional().describe('Only curated concepts (default true)'),
      unapproved: z.boolean().optional().describe('Show unapproved auto-detected candidates'),
      scored: z.boolean().optional().describe('Rank unapproved candidates by likelihood score'),
      compact: z.boolean().optional().describe('Names only grouped by layer/category (default true). Set false for full JSON with definitions.'),
      limit: z.number().optional().describe('Max results for scored mode'),
    },
    annotations: { readOnlyHint: true },
  },
  async ({ type, layer, category, curated_only, unapproved, scored, compact, limit }) => {
    if (scored) {
      const candidates = scoreCandidates(db, limit || 50);
      return { content: [{ type: 'text', text: JSON.stringify(candidates, null, 2) }] };
    }
    const concepts = getConcepts(db, {
      curatedOnly: curated_only ?? true,
      unapproved: unapproved || false,
      layer: layer || type || undefined,
      category: category || undefined,
    });

    if (compact !== false) {
      const grouped: Record<string, string[]> = {};
      for (const c of concepts) {
        const key = `${c.layer || c.type || 'untyped'}/${c.category || 'uncategorized'}`;
        (grouped[key] ??= []).push(c.name);
      }
      const lines = Object.entries(grouped).map(([k, names]) => `${k} (${names.length}): ${names.join(', ')}`);
      return { content: [{ type: 'text', text: lines.join('\n') }] };
    }

    return { content: [{ type: 'text', text: JSON.stringify(concepts, null, 2) }] };
  }
);

server.registerTool(
  'approve_concept',
  {
    title: 'Approve/Reject Concept',
    description: 'Approve or reject an auto-detected concept candidate',
    inputSchema: {
      name: z.string().describe('Exact concept name'),
      approved: z.boolean().describe('true to approve, false to reject'),
    },
  },
  async ({ name, approved }) => {
    const result = db.prepare('UPDATE concepts SET approved = ? WHERE name = ?').run(approved ? 1 : 0, name);
    if (result.changes === 0) {
      return { content: [{ type: 'text', text: `Concept not found: ${name}` }], isError: true };
    }
    return { content: [{ type: 'text', text: `${name}: approved=${approved}` }] };
  }
);

server.registerTool(
  'trace_concept',
  {
    title: 'Trace Concept Relations',
    description: `Traverse the concept graph: get a concept's definition, type (mechanic/subsystem/principle), and all one-hop relations.
Typed relations: COSTS, PRODUCES, MODIFIES, GATES, CONTAINS, OPPOSES, ENABLES, GOVERNS, VARIANT, RELATES_TO.
Use to answer "what connects to X?", "how does X work?", or "why is X designed this way?" (follow GOVERNS to principles).`,
    inputSchema: {
      name: z.string().describe('Concept name (case-insensitive). Examples: Guard, Damage Pipeline, Cost Must Hurt'),
    },
    outputSchema: {
      name: z.string().describe('Canonical concept name'),
      type: z.string().nullable().describe('mechanic, subsystem, or principle (legacy)'),
      layer: z.string().nullable().describe('mechanic, subsystem, or principle'),
      category: z.string().nullable().describe('Functional category (stat, resource, combat_gambit, etc.)'),
      definition: z.string().nullable().describe('One-sentence definition'),
      aliases: z.string().nullable().describe('Comma-separated aliases'),
      outgoing: z.array(z.object({
        relation: z.string().describe('Relation type (e.g. COSTS, PRODUCES, GOVERNS)'),
        target: z.string().describe('Target concept name'),
        description: z.string().nullable().describe('Context note'),
      })).describe('Relations FROM this concept'),
      incoming: z.array(z.object({
        relation: z.string().describe('Relation type'),
        source: z.string().describe('Source concept name'),
        description: z.string().nullable().describe('Context note'),
      })).describe('Relations TO this concept'),
    },
    annotations: { readOnlyHint: true },
  },
  async ({ name }) => {
    const graph = getConceptGraph(db, name);
    if (!graph) {
      return { content: [{ type: 'text', text: `Concept not found: "${name}"` }], isError: true };
    }

    const structuredContent = {
      name: graph.concept.name,
      type: graph.concept.type,
      layer: graph.concept.layer,
      category: graph.concept.category,
      definition: graph.concept.definition,
      aliases: graph.concept.aliases,
      outgoing: graph.outgoing,
      incoming: graph.incoming,
    };

    // Text fallback for clients without structured output support
    const lines: string[] = [];
    const c = graph.concept;
    lines.push(`## ${c.name} (${c.layer || c.type || '?'}/${c.category || '?'})`);
    if (c.definition) lines.push(c.definition);
    if (c.aliases) lines.push(`Aliases: ${c.aliases}`);
    if (graph.outgoing.length > 0) {
      lines.push('', '### Outgoing');
      for (const r of graph.outgoing) {
        lines.push(`- ${r.relation} -> ${r.target}${r.description ? ` (${r.description})` : ''}`);
      }
    }
    if (graph.incoming.length > 0) {
      lines.push('', '### Incoming');
      for (const r of graph.incoming) {
        lines.push(`- ${r.source} -> ${r.relation}${r.description ? ` (${r.description})` : ''}`);
      }
    }

    return {
      content: [{ type: 'text', text: lines.join('\n') }],
      structuredContent,
    };
  }
);

// --- Concept mutation tools ---

const RELATION_TYPES = [
  'COSTS', 'PRODUCES', 'MODIFIES', 'GATES', 'CONTAINS',
  'OPPOSES', 'ENABLES', 'GOVERNS', 'VARIANT_OF', 'RELATES_TO',
] as const;

server.registerTool(
  'create_concept',
  {
    title: 'Create Concept',
    description: 'Create a new game concept. Triggers full reindex of rules files to find mentions.',
    inputSchema: {
      name: z.string().describe('Concept name (Title Case)'),
      layer: z.enum(['mechanic', 'subsystem', 'principle']),
      category: z.string().describe('Functional category (stat, resource, modifier, combat_gambit, procedure, axiom, design_law, etc.)'),
      definition: z.string().describe('One-sentence definition'),
      aliases: z.string().optional().describe('Comma-separated alternative names'),
      relations: z.array(z.object({
        target: z.string().describe('Target concept name'),
        relation: z.enum(RELATION_TYPES),
        description: z.string().optional(),
      })).optional().describe('Relations to existing concepts'),
    },
  },
  async ({ name, layer, category, definition, aliases, relations }) => {
    const id = upsertConcept(db, name, {
      aliases, curated: true, type: layer, layer, category, definition,
    });
    if (relations) {
      for (const r of relations) {
        const target = db.prepare('SELECT id FROM concepts WHERE name = ? COLLATE NOCASE')
          .get(r.target) as { id: number } | undefined;
        if (target) {
          upsertConceptRelation(db, id, target.id, r.relation, r.description ?? null);
        }
      }
    }
    const filesIndexed = await reindexAllRules();
    return {
      content: [{ type: 'text', text: `Created "${name}" (${layer}/${category}), id=${id}. Reindexed ${filesIndexed} files.` }],
    };
  }
);

server.registerTool(
  'update_concept',
  {
    title: 'Update Concept',
    description: 'Update a concept\'s definition, layer, category, or aliases. DB-only, no reindex needed.',
    inputSchema: {
      name: z.string().describe('Concept name (case-insensitive lookup)'),
      definition: z.string().optional(),
      layer: z.enum(['mechanic', 'subsystem', 'principle']).optional(),
      category: z.string().optional(),
      aliases: z.string().optional().describe('Comma-separated, replaces existing'),
    },
  },
  async ({ name, definition, layer, category, aliases }) => {
    const existing = db.prepare('SELECT id FROM concepts WHERE name = ? COLLATE NOCASE')
      .get(name) as { id: number } | undefined;
    if (!existing) {
      return { content: [{ type: 'text', text: `Concept not found: "${name}"` }], isError: true };
    }
    upsertConcept(db, name, {
      ...(definition !== undefined && { definition }),
      ...(layer !== undefined && { layer, type: layer }),
      ...(category !== undefined && { category }),
      ...(aliases !== undefined && { aliases }),
    });
    return { content: [{ type: 'text', text: `Updated "${name}"` }] };
  }
);

server.registerTool(
  'rename_concept',
  {
    title: 'Rename Concept',
    description: 'Rename a concept. Old name becomes an alias. Reindexes files that mentioned the old name.',
    inputSchema: {
      old_name: z.string(),
      new_name: z.string(),
    },
  },
  async ({ old_name, new_name }) => {
    const conceptId = renameConcept(db, old_name, new_name);
    if (!conceptId) {
      return { content: [{ type: 'text', text: `Concept not found: "${old_name}"` }], isError: true };
    }
    const files = getFilesWithMentions(db, conceptId);
    const replaceResults = await replaceInMarkdownFiles(ROOT_DIR, old_name, new_name, files);
    const reindexed = await reindexFiles(files);
    const replaceSummary = replaceResults.length > 0
      ? `\nProse updated in ${replaceResults.length} file(s): ${replaceResults.map(r => `${r.filePath} (${r.replacements})`).join(', ')}`
      : '\nNo prose replacements needed.';
    return {
      content: [{ type: 'text', text: `Renamed "${old_name}" → "${new_name}". Reindexed ${reindexed} files.${replaceSummary}` }],
    };
  }
);

server.registerTool(
  'link_concepts',
  {
    title: 'Link Concepts',
    description: 'Add a typed relation between two concepts. DB-only.',
    inputSchema: {
      source: z.string().describe('Source concept name'),
      target: z.string().describe('Target concept name'),
      relation: z.enum(RELATION_TYPES),
      description: z.string().optional(),
    },
  },
  async ({ source, target, relation, description }) => {
    const src = db.prepare('SELECT id FROM concepts WHERE name = ? COLLATE NOCASE')
      .get(source) as { id: number } | undefined;
    const tgt = db.prepare('SELECT id FROM concepts WHERE name = ? COLLATE NOCASE')
      .get(target) as { id: number } | undefined;
    if (!src) return { content: [{ type: 'text', text: `Source not found: "${source}"` }], isError: true };
    if (!tgt) return { content: [{ type: 'text', text: `Target not found: "${target}"` }], isError: true };
    upsertConceptRelation(db, src.id, tgt.id, relation, description ?? null);
    return { content: [{ type: 'text', text: `${source} —[${relation}]→ ${target}` }] };
  }
);

server.registerTool(
  'unlink_concepts',
  {
    title: 'Unlink Concepts',
    description: 'Remove a typed relation between two concepts. DB-only.',
    inputSchema: {
      source: z.string(),
      target: z.string(),
      relation: z.enum(RELATION_TYPES),
    },
  },
  async ({ source, target, relation }) => {
    const src = db.prepare('SELECT id FROM concepts WHERE name = ? COLLATE NOCASE')
      .get(source) as { id: number } | undefined;
    const tgt = db.prepare('SELECT id FROM concepts WHERE name = ? COLLATE NOCASE')
      .get(target) as { id: number } | undefined;
    if (!src || !tgt) return { content: [{ type: 'text', text: 'Concept not found' }], isError: true };
    const ok = deleteConceptRelation(db, src.id, tgt.id, relation);
    return { content: [{ type: 'text', text: ok ? `Removed ${relation}` : 'Relation not found' }] };
  }
);

server.registerTool(
  'deprecate_concept',
  {
    title: 'Deprecate Concept',
    description: 'Soft-delete a concept: marks unapproved and removes mention links. Concept row preserved for history.',
    inputSchema: {
      name: z.string(),
    },
  },
  async ({ name }) => {
    const ok = deprecateConcept(db, name);
    if (!ok) return { content: [{ type: 'text', text: `Concept not found: "${name}"` }], isError: true };
    return { content: [{ type: 'text', text: `Deprecated "${name}"` }] };
  }
);

server.registerTool(
  'merge_concepts',
  {
    title: 'Merge Concepts',
    description: 'Merge source into target: moves mentions, relations, aliases. Deletes source. Reindexes affected files.',
    inputSchema: {
      source: z.string().describe('Concept to merge FROM (will be deleted)'),
      target: z.string().describe('Concept to merge INTO (will be kept)'),
    },
  },
  async ({ source, target }) => {
    const srcRow = db.prepare('SELECT id FROM concepts WHERE name = ? COLLATE NOCASE')
      .get(source) as { id: number } | undefined;
    const tgtRow = db.prepare('SELECT id FROM concepts WHERE name = ? COLLATE NOCASE')
      .get(target) as { id: number } | undefined;
    if (!srcRow || !tgtRow) {
      return { content: [{ type: 'text', text: 'Concept not found' }], isError: true };
    }
    const srcFiles = getFilesWithMentions(db, srcRow.id);
    const tgtFiles = getFilesWithMentions(db, tgtRow.id);
    const allFiles = [...new Set([...srcFiles, ...tgtFiles])];

    const result = mergeConcepts(db, source, target);
    if (!result.merged) {
      return { content: [{ type: 'text', text: 'Merge failed' }], isError: true };
    }
    const replaceResults = await replaceInMarkdownFiles(ROOT_DIR, source, target, allFiles);
    const reindexed = await reindexFiles(allFiles);
    const replaceSummary = replaceResults.length > 0
      ? `\nProse updated in ${replaceResults.length} file(s): ${replaceResults.map(r => `${r.filePath} (${r.replacements})`).join(', ')}`
      : '\nNo prose replacements needed.';
    return {
      content: [{ type: 'text', text: `Merged "${source}" → "${target}". Moved ${result.mentionsMoved} mentions. Reindexed ${reindexed} files.${replaceSummary}` }],
    };
  }
);

server.registerTool(
  'review_candidates',
  {
    title: 'Review Concept Candidates',
    description: 'List auto-detected concept candidates ranked by likelihood score. Use to find new terms that appeared in rules files.',
    inputSchema: {
      limit: z.number().optional().describe('Max results (default 20)'),
    },
    annotations: { readOnlyHint: true },
  },
  async ({ limit }) => {
    const candidates = scoreCandidates(db, limit || 20);
    if (candidates.length === 0) {
      return { content: [{ type: 'text', text: 'No unapproved candidates found.' }] };
    }
    const lines = candidates.map(c =>
      `${c.name} (score: ${c.score}) — ${c.signals.rulesFiles} files, ${c.signals.totalMentions} mentions`
    );
    return { content: [{ type: 'text', text: lines.join('\n') }] };
  }
);

// --- Reindex tool ---

server.registerTool(
  'reindex_files',
  {
    title: 'Reindex Files',
    description: 'Reindex rules files to refresh concept mentions and sections. Defaults to all rules files if no paths given.',
    inputSchema: {
      paths: z.array(z.string()).optional().describe('Relative file paths to reindex. Omit for full reindex.'),
    },
  },
  async ({ paths }) => {
    const count = paths && paths.length > 0
      ? await reindexFiles(paths)
      : await reindexAllRules();
    return { content: [{ type: 'text', text: `Reindexed ${count} files.` }] };
  }
);

// --- Session tools ---

server.registerTool(
  'begin_changes',
  {
    title: 'Begin Change Session',
    description: 'Start an isolated git branch for concept edits. All changes happen on this branch until commit or rollback. Only one session at a time.',
    inputSchema: {
      description: z.string().describe('Short description of planned changes (used in branch name)'),
    },
    annotations: { destructiveHint: true },
  },
  async ({ description }) => {
    if (sessionBranch) {
      return { content: [{ type: 'text', text: `Session already active on branch "${sessionBranch}". Commit or rollback first.` }], isError: true };
    }
    const slug = description.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
    const timestamp = Date.now();
    const branchName = `concept-edit/${slug}-${timestamp}`;

    const currentBranch = await git('rev-parse', '--abbrev-ref', 'HEAD');
    await git('add', '-A');
    try {
      await git('commit', '--allow-empty', '-m', `checkpoint: pre-${slug}`);
    } catch { /* nothing to commit is fine */ }
    await git('checkout', '-b', branchName);

    sessionBranch = branchName;
    sessionBaseBranch = currentBranch;

    return { content: [{ type: 'text', text: `Session started on branch "${branchName}" (base: ${currentBranch}). Make edits, then preview_changes or commit_changes.` }] };
  }
);

server.registerTool(
  'preview_changes',
  {
    title: 'Preview Session Changes',
    description: 'Show all changes in the current session: committed diffs, staged, and working tree.',
    inputSchema: {},
    annotations: { readOnlyHint: true },
  },
  async () => {
    if (!sessionBranch || !sessionBaseBranch) {
      return { content: [{ type: 'text', text: 'No active session. Call begin_changes first.' }], isError: true };
    }

    const parts: string[] = [];

    // Committed changes on session branch
    try {
      const committed = await git('diff', `${sessionBaseBranch}...HEAD`);
      if (committed) parts.push('## Committed on session branch\n' + committed);
    } catch { /* no commits yet */ }

    // Staged changes
    const staged = await git('diff', '--cached');
    if (staged) parts.push('## Staged\n' + staged);

    // Working tree changes
    const working = await git('diff');
    if (working) parts.push('## Working tree\n' + working);

    if (parts.length === 0) {
      return { content: [{ type: 'text', text: `Session "${sessionBranch}": no changes yet.` }] };
    }

    return { content: [{ type: 'text', text: parts.join('\n\n') }] };
  }
);

// --- Audit ---

interface AuditReport {
  orphaned: string[];
  uncategorized: string[];
  staleRelations: { source: string; target: string; relation: string }[];
  topCandidates: { name: string; mentions: number }[];
}

function runAudit(auditDb: typeof db, focus?: { layer?: string; category?: string }): AuditReport {
  const layerFilter = focus?.layer;
  const categoryFilter = focus?.category;

  // 1. Orphaned: approved+curated concepts with zero mentions
  let orphanedSql = `
    SELECT c.name FROM concepts c
    LEFT JOIN concept_mentions cm ON cm.concept_id = c.id
    WHERE c.approved = 1 AND c.curated = 1
  `;
  const orphanedParams: unknown[] = [];
  if (layerFilter) { orphanedSql += ' AND (c.layer = ? OR c.type = ?)'; orphanedParams.push(layerFilter, layerFilter); }
  if (categoryFilter) { orphanedSql += ' AND c.category = ?'; orphanedParams.push(categoryFilter); }
  orphanedSql += ' GROUP BY c.id HAVING COUNT(cm.section_id) = 0 ORDER BY c.name';
  const orphaned = (auditDb.prepare(orphanedSql).all(...orphanedParams) as { name: string }[]).map(r => r.name);

  // 2. Uncategorized: approved concepts missing layer or category
  let uncatSql = `
    SELECT c.name FROM concepts c
    WHERE c.approved = 1 AND (c.layer IS NULL OR c.category IS NULL)
  `;
  const uncatParams: unknown[] = [];
  if (layerFilter) { uncatSql += ' AND (c.layer = ? OR c.type = ?)'; uncatParams.push(layerFilter, layerFilter); }
  if (categoryFilter) { uncatSql += ' AND c.category = ?'; uncatParams.push(categoryFilter); }
  uncatSql += ' ORDER BY c.name';
  const uncategorized = (auditDb.prepare(uncatSql).all(...uncatParams) as { name: string }[]).map(r => r.name);

  // 3. Stale relations: relations where either side has zero mentions
  const staleRelations = auditDb.prepare(`
    SELECT cs.name as source, ct.name as target, cr.relation
    FROM concept_relations cr
    JOIN concepts cs ON cs.id = cr.source_id
    JOIN concepts ct ON ct.id = cr.target_id
    WHERE NOT EXISTS (SELECT 1 FROM concept_mentions cm WHERE cm.concept_id = cr.source_id)
       OR NOT EXISTS (SELECT 1 FROM concept_mentions cm WHERE cm.concept_id = cr.target_id)
    ORDER BY cs.name, ct.name
  `).all() as { source: string; target: string; relation: string }[];

  // 4. Top candidates: unapproved concepts by mention count
  const topCandidates = auditDb.prepare(`
    SELECT c.name, COUNT(cm.section_id) as mentions
    FROM concepts c
    JOIN concept_mentions cm ON cm.concept_id = c.id
    WHERE c.approved = 0
    GROUP BY c.id
    ORDER BY mentions DESC
    LIMIT 10
  `).all() as { name: string; mentions: number }[];

  return { orphaned, uncategorized, staleRelations, topCandidates };
}

function formatAudit(report: AuditReport): string {
  const parts: string[] = [];
  if (report.orphaned.length > 0) parts.push(`Orphaned (${report.orphaned.length}): ${report.orphaned.join(', ')}`);
  if (report.uncategorized.length > 0) parts.push(`Uncategorized (${report.uncategorized.length}): ${report.uncategorized.join(', ')}`);
  if (report.staleRelations.length > 0) parts.push(`Stale relations (${report.staleRelations.length}): ${report.staleRelations.map(r => `${r.source} -[${r.relation}]-> ${r.target}`).join(', ')}`);
  if (report.topCandidates.length > 0) parts.push(`Top candidates (${report.topCandidates.length}): ${report.topCandidates.map(c => `${c.name} (${c.mentions})`).join(', ')}`);
  return parts.length > 0 ? parts.join('\n') : 'All clear.';
}

server.registerTool(
  'audit_concepts',
  {
    title: 'Audit Concept Health',
    description: 'Triage report: orphaned concepts (no mentions), uncategorized concepts, stale relations, and top unapproved candidates. Never auto-acts. Present findings for human decision.',
    inputSchema: {
      layer: z.enum(['mechanic', 'subsystem', 'principle']).optional().describe('Focus on one layer'),
      category: z.string().optional().describe('Focus on one category'),
    },
    annotations: { readOnlyHint: true },
  },
  async ({ layer, category }) => {
    const report = runAudit(db, { layer, category });
    return { content: [{ type: 'text', text: formatAudit(report) }] };
  }
);

// --- Session tools (commit + rollback) ---

server.registerTool(
  'commit_changes',
  {
    title: 'Commit Change Session',
    description: 'Commit all session changes: stages everything, merges session branch back into base with --no-ff, reindexes, and runs audit triage.',
    inputSchema: {
      message: z.string().optional().describe('Commit message (auto-generated if omitted)'),
    },
    annotations: { destructiveHint: true },
  },
  async ({ message }) => {
    if (!sessionBranch || !sessionBaseBranch) {
      return { content: [{ type: 'text', text: 'No active session. Call begin_changes first.' }], isError: true };
    }

    const commitMsg = message || `concept-edit: session ${sessionBranch}`;
    await git('add', '-A');
    try {
      await git('commit', '-m', commitMsg);
    } catch { /* nothing to commit */ }

    const branch = sessionBranch;
    const base = sessionBaseBranch;
    await git('checkout', base);
    await git('merge', '--no-ff', branch, '-m', `Merge ${branch}`);
    await git('branch', '-d', branch);

    sessionBranch = null;
    sessionBaseBranch = null;

    const reindexed = await reindexAllRules();
    const audit = runAudit(db);
    const auditText = formatAudit(audit);

    return {
      content: [{ type: 'text', text: `Session merged into ${base}. Reindexed ${reindexed} files.\n\n## Triage\n${auditText}` }],
    };
  }
);

server.registerTool(
  'rollback_changes',
  {
    title: 'Rollback Change Session',
    description: 'Discard all session changes: resets working tree, switches back to base branch, deletes session branch, reindexes to restore DB.',
    inputSchema: {},
    annotations: { destructiveHint: true },
  },
  async () => {
    if (!sessionBranch || !sessionBaseBranch) {
      return { content: [{ type: 'text', text: 'No active session. Nothing to rollback.' }], isError: true };
    }

    const branch = sessionBranch;
    const base = sessionBaseBranch;

    await git('checkout', '--', '.');
    await git('checkout', base);
    await git('branch', '-D', branch);

    sessionBranch = null;
    sessionBaseBranch = null;

    const reindexed = await reindexAllRules();
    return {
      content: [{ type: 'text', text: `Session "${branch}" discarded. Restored to ${base}. Reindexed ${reindexed} files.` }],
    };
  }
);

// --- Start ---

const transport = new StdioServerTransport();
await server.connect(transport);
