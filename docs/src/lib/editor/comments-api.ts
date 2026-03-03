/**
 * Client-side wrapper for the comments HTTP API.
 * Handles CRUD operations and SSE streaming for real-time updates.
 */

import type { CommentRange } from './comments-plugin';

// ── Types matching the API ──

export interface ApiComment {
  id: string;
  selected_text: string;
  context_before: string;
  context_after: string;
  comment: string;
  category: string;
  section_id: string;
  source_file: string;
  file_path: string | null;
  nearest_heading_line: number | null;
  source_line: number | null;
  paragraph_index: number | null;
  status: string;
  resolution: string | null;
  resolved_text: string | null;
  resolved_at: string | null;
  created_at: string;
  orphaned: number;
}

// ── API calls ──

export async function fetchComments(status?: string): Promise<ApiComment[]> {
  const url = status ? `/api/comments?status=${status}` : '/api/comments';
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function createComment(comment: {
  selectedText: string;
  comment: string;
  category?: string;
  sectionId: string;
  sourceFile: string;
}): Promise<string> {
  const id = `c_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  await fetch('/api/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id,
      selectedText: comment.selectedText,
      contextBefore: '',
      contextAfter: '',
      comment: comment.comment,
      category: comment.category || 'note',
      sectionId: comment.sectionId,
      sourceFile: comment.sourceFile,
      filePath: null,
      nearestHeadingLine: null,
      sourceLine: null,
      paragraphIndex: null,
      status: 'open',
      resolution: null,
      resolvedText: null,
      resolvedAt: null,
      createdAt: new Date().toISOString(),
    }),
  });
  return id;
}

export async function resolveComment(id: string): Promise<void> {
  await fetch(`/api/comments/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'resolved', resolution: 'Resolved from editor' }),
  });
}

export async function deleteComment(id: string): Promise<void> {
  await fetch(`/api/comments/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
}

// ── SSE stream ──

export type CommentEvent =
  | { type: 'upsert'; comment: ApiComment }
  | { type: 'status_change'; id: string; status: string }
  | { type: 'delete'; id: string }
  | { type: 'bulk_update' };

export function subscribeToComments(
  onEvent: (event: CommentEvent) => void,
): () => void {
  const es = new EventSource('/api/comments/stream');
  es.addEventListener('update', (e) => {
    try {
      onEvent(JSON.parse(e.data));
    } catch {}
  });
  return () => es.close();
}

// ── Conversion ──

const CATEGORY_CLASS: Record<string, string> = {
  note: 'comment-hl comment-hl-note',
  copy: 'comment-hl comment-hl-copy',
  clarify: 'comment-hl comment-hl-clarify',
  design: 'comment-hl comment-hl-design',
  bug: 'comment-hl comment-hl-bug',
  todo: 'comment-hl comment-hl-todo',
};

/** Convert an API comment to a CommentRange for the ProseMirror plugin. */
export function toCommentRange(c: ApiComment): CommentRange {
  return {
    id: c.id,
    selectedText: c.selected_text,
    className: CATEGORY_CLASS[c.category] || 'comment-hl',
    category: c.category,
  };
}

/** Format a timestamp for display. */
export function formatTime(iso: string): string {
  const d = new Date(iso);
  const now = Date.now();
  const diff = now - d.getTime();
  if (diff < 60_000) return 'Just now';
  if (diff < 3600_000) return `${Math.floor(diff / 60_000)}m`;
  if (diff < 86400_000) return `${Math.floor(diff / 3600_000)}h`;
  return d.toLocaleDateString();
}
