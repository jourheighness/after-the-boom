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
  scoreCandidates,
  type Comment,
} from './db.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = resolve(__dirname, '../../comments.db');
const db = openDb(DB_PATH);

const server = new McpServer({
  name: 'comments',
  version: '1.0.0',
});

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

server.tool(
  'list_concepts',
  'List known game concepts. Use scored=true for ranked unapproved candidates.',
  { curated_only: z.boolean().optional(), unapproved: z.boolean().optional(), scored: z.boolean().optional(), limit: z.number().optional() },
  async ({ curated_only, unapproved, scored, limit }) => {
    if (scored) {
      const candidates = scoreCandidates(db, limit || 50);
      return { content: [{ type: 'text', text: JSON.stringify(candidates, null, 2) }] };
    }
    const concepts = getConcepts(db, {
      curatedOnly: curated_only || false,
      unapproved: unapproved || false,
    });
    return { content: [{ type: 'text', text: JSON.stringify(concepts, null, 2) }] };
  }
);

server.tool(
  'approve_concept',
  'Approve or reject an auto-detected concept',
  { name: z.string(), approved: z.boolean() },
  async ({ name, approved }) => {
    const result = db.prepare('UPDATE concepts SET approved = ? WHERE name = ?').run(approved ? 1 : 0, name);
    if (result.changes === 0) {
      return { content: [{ type: 'text', text: `Concept not found: ${name}` }], isError: true };
    }
    return { content: [{ type: 'text', text: `${name}: approved=${approved}` }] };
  }
);

// --- Start ---

const transport = new StdioServerTransport();
await server.connect(transport);
