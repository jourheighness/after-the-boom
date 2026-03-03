/**
 * Autosave logic — polls for content changes, saves to disk via API,
 * detects external file changes on window focus.
 * Supports compare-and-swap with three-way auto-merge on the server.
 */

import { contentHash } from './content-hash';
import { applyMergedContent } from './doc-diff';
import { getMk } from './milkdown-imports';

export interface EditorState {
  crepe: any;
  container: HTMLDivElement;
  indicator: HTMLSpanElement;
  lastSavedMarkdown: string;
  lastKnownHash: string | null;
  autosaveInterval: ReturnType<typeof setInterval> | null;
}

export type SaveResult = 'saved' | 'merged' | 'conflict' | 'noop' | 'error';

export function showIndicator(
  el: HTMLSpanElement,
  status: 'saving' | 'saved' | 'merged' | 'error' | 'conflict',
) {
  el.className = `save-indicator ${status}`;
  const labels: Record<string, string> = {
    saving: 'Saving...', saved: 'Saved', merged: 'Merged',
    error: 'Save failed', conflict: 'Conflict',
  };
  el.textContent = labels[status] || status;
  // Conflict persists until resolved; others auto-clear
  if (status !== 'saving' && status !== 'conflict') {
    setTimeout(() => { el.textContent = ''; el.className = 'save-indicator'; }, 1500);
  }
}

export async function trySave(
  section: Element,
  editors: Map<Element, EditorState>,
  onSaved?: () => void,
): Promise<SaveResult> {
  const state = editors.get(section);
  if (!state) return 'noop';

  let currentMd: string;
  try {
    currentMd = state.crepe.getMarkdown();
  } catch {
    return 'noop';
  }

  if (currentMd === state.lastSavedMarkdown) return 'noop';

  const collection = section.getAttribute('data-collection');
  const entry = section.getAttribute('data-entry-id');
  if (!collection || !entry) return 'noop';

  showIndicator(state.indicator, 'saving');

  try {
    const res = await fetch('/api/editor/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        collection, entry, content: currentMd,
        expectedHash: state.lastKnownHash,
        baseContent: state.lastSavedMarkdown,
      }),
    });

    const data = await res.json();

    if (res.status === 409) {
      // Real conflict — overlapping edits
      console.log(`[editor] Conflict in ${collection}/${entry}`);
      state.lastKnownHash = data.diskHash;
      showIndicator(state.indicator, 'conflict');
      return 'conflict';
    }

    if (!res.ok) throw new Error(data.error || 'Save failed');

    if (data.merged) {
      // Server auto-merged non-overlapping changes — apply via block diff
      console.log(`[editor] Auto-merged ${collection}/${entry}`);
      const mk = getMk();
      if (mk) {
        try {
          state.crepe.editor.action((ctx: any) => {
            applyMergedContent(ctx, data.content, mk.parserCtx, mk.editorViewCtx);
          });
        } catch (e) {
          // Fallback: full replace if diff application fails
          console.warn('[editor] Block diff failed, falling back to setMarkdown', e);
          state.crepe.setMarkdown(data.content);
        }
      }
      state.lastSavedMarkdown = data.content;
      state.lastKnownHash = data.hash;
      showIndicator(state.indicator, 'merged');
      onSaved?.();
      return 'merged';
    }

    // Normal save
    state.lastSavedMarkdown = currentMd;
    state.lastKnownHash = data.hash;
    showIndicator(state.indicator, 'saved');
    onSaved?.();
    return 'saved';
  } catch (err) {
    console.error('[editor] Save error:', err);
    showIndicator(state.indicator, 'error');
    return 'error';
  }
}

/**
 * Resolve a conflict by choosing a version.
 * 'mine' = force-save editor content (bypass CAS).
 * 'disk' = load disk content into editor.
 */
export async function resolveConflict(
  section: Element,
  editors: Map<Element, EditorState>,
  choice: 'mine' | 'disk',
  onSaved?: () => void,
): Promise<void> {
  const state = editors.get(section);
  if (!state) return;

  const collection = section.getAttribute('data-collection');
  const entry = section.getAttribute('data-entry-id');
  if (!collection || !entry) return;

  if (choice === 'mine') {
    // Force save without CAS check
    let currentMd: string;
    try { currentMd = state.crepe.getMarkdown(); } catch { return; }
    showIndicator(state.indicator, 'saving');
    try {
      const res = await fetch('/api/editor/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collection, entry, content: currentMd }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');
      state.lastSavedMarkdown = currentMd;
      state.lastKnownHash = data.hash;
      showIndicator(state.indicator, 'saved');
      onSaved?.();
    } catch (err) {
      console.error('[editor] Force save error:', err);
      showIndicator(state.indicator, 'error');
    }
  } else {
    // Load disk content
    try {
      const res = await fetch(`/api/editor/read?collection=${collection}&entry=${entry}`);
      if (!res.ok) return;
      const { content: diskContent, hash } = await res.json();
      // Use block diff for smooth update
      const mk = getMk();
      if (mk) {
        try {
          state.crepe.editor.action((ctx: any) => {
            applyMergedContent(ctx, diskContent, mk.parserCtx, mk.editorViewCtx);
          });
        } catch {
          state.crepe.setMarkdown(diskContent);
        }
      } else {
        state.crepe.setMarkdown(diskContent);
      }
      state.lastSavedMarkdown = diskContent;
      state.lastKnownHash = hash;
      showIndicator(state.indicator, 'saved');
      state.indicator.textContent = 'Reloaded';
    } catch {}
  }
}

export async function checkForExternalChanges(editors: Map<Element, EditorState>) {
  for (const [section, state] of editors) {
    const collection = section.getAttribute('data-collection');
    const entry = section.getAttribute('data-entry-id');
    if (!collection || !entry) continue;

    try {
      const res = await fetch(`/api/editor/read?collection=${collection}&entry=${entry}`);
      if (!res.ok) continue;
      const { content: diskContent, hash } = await res.json();

      if (diskContent === state.lastSavedMarkdown) continue;

      // Disk changed externally
      let editorContent: string;
      try { editorContent = state.crepe.getMarkdown(); } catch { continue; }

      if (editorContent === state.lastSavedMarkdown) {
        // User hasn't edited — safe to reload silently via block diff
        console.log(`[editor] External change in ${collection}/${entry}, reloading`);
        const mk = getMk();
        if (mk) {
          try {
            state.crepe.editor.action((ctx: any) => {
              applyMergedContent(ctx, diskContent, mk.parserCtx, mk.editorViewCtx);
            });
          } catch {
            state.crepe.setMarkdown(diskContent);
          }
        } else {
          state.crepe.setMarkdown(diskContent);
        }
        state.lastSavedMarkdown = diskContent;
        state.lastKnownHash = hash;
        showIndicator(state.indicator, 'saved');
        state.indicator.textContent = 'Reloaded';
      } else {
        // User has unsaved edits AND disk changed — conflict
        console.log(`[editor] Conflict: unsaved edits + external change in ${collection}/${entry}`);
        state.lastKnownHash = hash;
        showIndicator(state.indicator, 'conflict');
      }
    } catch {}
  }
}
