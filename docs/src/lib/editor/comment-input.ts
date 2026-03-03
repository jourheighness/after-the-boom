/**
 * Inline comment input — Notion-style popover that appears to the right
 * of selected text when the Comment toolbar button is clicked.
 *
 * Flow: select text -> click Comment -> text highlights -> input appears ->
 * type comment -> submit -> saved + permanent highlight.
 *
 * All innerHTML assignments use lucide-static SVG constants (not user input).
 */

import { ArrowUpCircle } from 'lucide-static';
import { getMk } from './milkdown-imports';
import { commentsPluginKey, setComments, type CommentRange } from './comments-plugin';
import { getCardRanges } from './comment-cards';

// ── State ──

let activePopover: HTMLElement | null = null;
let pendingCleanup: (() => void) | null = null;

/** Close any open comment input. */
export function closeCommentInput() {
  if (activePopover) {
    activePopover.remove();
    activePopover = null;
  }
  if (pendingCleanup) {
    pendingCleanup();
    pendingCleanup = null;
  }
}

// ── DOM ──

function createPopoverEl(): {
  popover: HTMLDivElement;
  input: HTMLInputElement;
} {
  const popover = document.createElement('div');
  popover.className = 'comment-input-popover';

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'comment-input-field';
  input.placeholder = 'Add a comment...';

  const actions = document.createElement('div');
  actions.className = 'comment-input-actions';

  const submitBtn = document.createElement('button');
  submitBtn.className = 'comment-input-icon comment-input-submit';
  submitBtn.type = 'button';
  submitBtn.title = 'Submit';
  const submitIcon = document.createElement('span');
  submitIcon.innerHTML = ArrowUpCircle; // lucide-static SVG constant
  submitBtn.appendChild(submitIcon);
  actions.appendChild(submitBtn);

  popover.append(input, actions);
  return { popover, input };
}

// ── Pending highlight helpers ──

function addPendingHighlight(crepe: any, selectedText: string) {
  const mk = getMk();
  if (!mk) return;
  crepe.editor.action((ctx: any) => {
    const view = ctx.get(mk.editorViewCtx);
    const current = commentsPluginKey.getState(view.state);
    const pending: CommentRange = {
      id: '__pending__',
      selectedText,
      className: 'comment-hl comment-hl-pending',
    };
    setComments(view, [...(current?.comments || []), pending]);
  });
}

function removePendingHighlight(crepe: any) {
  const mk = getMk();
  if (!mk) return;
  try {
    crepe.editor.action((ctx: any) => {
      const view = ctx.get(mk.editorViewCtx);
      const current = commentsPluginKey.getState(view.state);
      const without = (current?.comments || []).filter(
        (c: CommentRange) => c.id !== '__pending__',
      );
      setComments(view, without);
    });
  } catch {}
}

// ── Public API ──

export interface CommentInputOptions {
  crepe: any;
  container: HTMLDivElement;
  /** Called with selected text and comment body on submit */
  onSubmit: (selectedText: string, comment: string) => void;
}

/**
 * Open the comment input for the current text selection.
 * Highlights selected text, shows input to the right.
 */
export function openCommentInput({ crepe, container, onSubmit }: CommentInputOptions) {
  closeCommentInput();

  const mk = getMk();
  if (!mk) return;

  let selectedText = '';
  let selectionTop = 0;

  crepe.editor.action((ctx: any) => {
    const view = ctx.get(mk.editorViewCtx);
    const { from, to, empty } = view.state.selection;
    if (empty) return;

    selectedText = view.state.doc.textBetween(from, to, ' ');

    // Vertical position: align with selection start
    const coords = view.coordsAtPos(from);
    const containerRect = container.getBoundingClientRect();
    selectionTop = coords.top - containerRect.top;
  });

  if (!selectedText) return;

  // Highlight selected text as pending
  addPendingHighlight(crepe, selectedText);

  // Create and position popover, avoiding existing cards
  const { popover, input } = createPopoverEl();
  container.style.position = 'relative';

  const POPOVER_HEIGHT = 44;
  const GAP = 8;
  const ideal = selectionTop;
  const ranges = getCardRanges(container);

  // Check if ideal position overlaps any card
  const overlaps = (y: number) =>
    ranges.some(r => y < r.bottom + GAP && y + POPOVER_HEIGHT + GAP > r.top);

  let top: number;
  if (!overlaps(ideal)) {
    // Ideal position is free
    top = ideal;
  } else {
    // Try above each card that's near the ideal position
    let bestAbove: number | null = null;
    let bestBelow: number | null = null;

    for (const r of ranges) {
      const above = r.top - POPOVER_HEIGHT - GAP;
      if (above >= 0 && !overlaps(above)) {
        if (bestAbove === null || Math.abs(above - ideal) < Math.abs(bestAbove - ideal)) {
          bestAbove = above;
        }
      }
      const below = r.bottom + GAP;
      if (!overlaps(below)) {
        if (bestBelow === null || Math.abs(below - ideal) < Math.abs(bestBelow - ideal)) {
          bestBelow = below;
        }
      }
    }

    // Pick whichever is closest to the ideal position
    if (bestAbove !== null && bestBelow !== null) {
      top = Math.abs(bestAbove - ideal) <= Math.abs(bestBelow - ideal) ? bestAbove : bestBelow;
    } else {
      top = bestAbove ?? bestBelow ?? ideal;
    }
  }

  popover.style.top = `${top}px`;

  container.appendChild(popover);
  activePopover = popover;

  // Focus after toolbar closes
  requestAnimationFrame(() => input.focus());

  // ── Event handlers ──

  const submit = () => {
    const comment = input.value.trim();
    if (!comment) return;
    removePendingHighlight(crepe);
    onSubmit(selectedText, comment);
    closeCommentInput();
  };

  const cancel = () => {
    removePendingHighlight(crepe);
    closeCommentInput();
  };

  popover.querySelector('.comment-input-submit')!.addEventListener('click', (e) => {
    e.preventDefault();
    submit();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); }
    if (e.key === 'Escape') { e.preventDefault(); cancel(); }
  });

  // Outside click closes (delayed to avoid catching toolbar click)
  const onOutside = (e: MouseEvent) => {
    if (!popover.contains(e.target as Node)) cancel();
  };
  setTimeout(() => document.addEventListener('mousedown', onOutside, true), 100);

  pendingCleanup = () => {
    document.removeEventListener('mousedown', onOutside, true);
    removePendingHighlight(crepe);
  };
}
