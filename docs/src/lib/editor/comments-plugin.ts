/**
 * ProseMirror plugin for comment highlighting in the Milkdown editor.
 *
 * Architecture:
 * - Comments are stored externally (SQLite via MCP server)
 * - This plugin creates inline Decorations for visual highlighting
 * - DecorationSet.map() auto-tracks positions through edits
 * - Text search uses prosemirror-utils for cross-node walking
 *
 * Does NOT modify the document model or markdown serialization.
 */

import { Plugin, PluginKey } from '@milkdown/kit/prose/state';
import { Decoration, DecorationSet } from '@milkdown/kit/prose/view';
import { $prose } from '@milkdown/kit/utils';
import { findTextNodes } from 'prosemirror-utils';

// ── Types ──

export interface CommentRange {
  /** Unique comment ID (from external store) */
  id: string;
  /** The text that was selected when the comment was created */
  selectedText: string;
  /** CSS class for the highlight (e.g. 'comment-highlight', 'comment-highlight-note') */
  className: string;
  /** Optional: category for styling variants */
  category?: string;
}

export interface CommentPluginState {
  decorations: DecorationSet;
  comments: CommentRange[];
}

// ── Text search ──

interface TextChunk {
  text: string;
  pos: number; // ProseMirror position of the start of this text node
}

/**
 * Build a flat text representation of the document with position mapping.
 * Each entry maps a substring to its ProseMirror position.
 */
function buildTextMap(doc: any): TextChunk[] {
  const nodes = findTextNodes(doc, true);
  return nodes.map(({ node, pos }) => ({
    text: node.textContent,
    pos,
  }));
}

/**
 * Find the ProseMirror position range for a text string in the document.
 * Handles text that spans multiple nodes (e.g., across bold/italic boundaries).
 * Returns the first match, or null if not found.
 */
function findTextRange(
  doc: any,
  searchText: string,
): { from: number; to: number } | null {
  if (!searchText) return null;

  const chunks = buildTextMap(doc);
  if (chunks.length === 0) return null;

  // Build concatenated text with position breakpoints
  let flat = '';
  const posMap: Array<{ flatIdx: number; pmPos: number }> = [];

  for (const chunk of chunks) {
    posMap.push({ flatIdx: flat.length, pmPos: chunk.pos });
    flat += chunk.text;
  }

  // Search in the flat text
  const idx = flat.indexOf(searchText);
  if (idx === -1) return null;

  const endIdx = idx + searchText.length;

  // Map flat indices back to ProseMirror positions
  const from = flatToPm(idx, posMap);
  const to = flatToPm(endIdx, posMap);

  return { from, to };
}

/**
 * Map a flat text index to a ProseMirror position.
 */
function flatToPm(
  flatIdx: number,
  posMap: Array<{ flatIdx: number; pmPos: number }>,
): number {
  // Find the chunk that contains this flat index
  let chunk = posMap[0];
  for (let i = 1; i < posMap.length; i++) {
    if (posMap[i].flatIdx > flatIdx) break;
    chunk = posMap[i];
  }
  return chunk.pmPos + (flatIdx - chunk.flatIdx);
}

// ── Plugin ──

export const commentsPluginKey = new PluginKey<CommentPluginState>('comments');

/**
 * Create decorations from comment ranges.
 */
function buildDecorations(doc: any, comments: CommentRange[]): DecorationSet {
  const decorations: Decoration[] = [];

  for (const comment of comments) {
    const range = findTextRange(doc, comment.selectedText);
    if (!range) continue;

    decorations.push(
      Decoration.inline(range.from, range.to, {
        class: comment.className,
        'data-comment-id': comment.id,
      }),
    );
  }

  return DecorationSet.create(doc, decorations);
}

/**
 * Create the comments ProseMirror plugin.
 * Pass initial comments; update later via setComments().
 */
export function createCommentsPlugin(initialComments: CommentRange[] = []) {
  return new Plugin<CommentPluginState>({
    key: commentsPluginKey,

    state: {
      init(_, state) {
        return {
          comments: initialComments,
          decorations: buildDecorations(state.doc, initialComments),
        };
      },

      apply(tr, prev, _oldState, newState) {
        // Check for explicit comment updates via metadata
        const newComments = tr.getMeta(commentsPluginKey);
        if (newComments) {
          // Full rebuild with new comments
          return {
            comments: newComments,
            decorations: buildDecorations(newState.doc, newComments),
          };
        }

        // If doc changed, map existing decorations through the transaction
        if (tr.docChanged) {
          return {
            comments: prev.comments,
            decorations: prev.decorations.map(tr.mapping, tr.doc),
          };
        }

        return prev;
      },
    },

    props: {
      decorations(state) {
        return commentsPluginKey.getState(state)?.decorations ?? DecorationSet.empty;
      },
    },
  });
}

// ── Public API for updating comments ──

/**
 * Update the set of highlighted comments in an editor.
 * Call this when comments are loaded, created, or resolved.
 */
export function setComments(view: any, comments: CommentRange[]) {
  const tr = view.state.tr.setMeta(commentsPluginKey, comments);
  view.dispatch(tr);
}

/**
 * Get the current comment at a given position, if any.
 */
export function getCommentAtPos(view: any, pos: number): string | null {
  const state = commentsPluginKey.getState(view.state);
  if (!state) return null;

  const decos = state.decorations.find(pos, pos);
  for (const deco of decos) {
    const id = (deco as any).type?.attrs?.['data-comment-id'];
    if (id) return id;
  }
  return null;
}

// ── Milkdown integration ──

/**
 * Milkdown-compatible plugin wrapping the ProseMirror comments plugin.
 * Register with `crepe.editor.use(commentsPlugin)` before `crepe.create()`.
 * Then call `setComments(view, comments)` to load/update comment highlights.
 */
export const commentsPlugin = $prose(() => createCommentsPlugin());
