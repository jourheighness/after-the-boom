/**
 * Comment cards — persistent cards in the right margin of the editor,
 * vertically aligned with their highlighted text.
 * Cards stack with spacing when they would overlap.
 *
 * All innerHTML uses lucide-static SVG constants (not user input).
 */

import { Check, MoreHorizontal, Pencil, Trash2 } from 'lucide-static';

// ── Types ──

export interface CommentCard {
  id: string;
  selectedText: string;
  comment: string;
  author: string;
  timestamp: string;
}

export interface CardCallbacks {
  onResolve?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

// ── State per editor container ──

const containerCards = new WeakMap<HTMLElement, Map<string, HTMLElement>>();
const containerCallbacks = new WeakMap<HTMLElement, CardCallbacks>();

function getCardMap(container: HTMLElement): Map<string, HTMLElement> {
  let map = containerCards.get(container);
  if (!map) { map = new Map(); containerCards.set(container, map); }
  return map;
}

// ── Icon helper (avoids innerHTML, creates from SVG string via parser) ──

const svgParser = new DOMParser();
function svgIcon(svg: string): Element {
  return svgParser.parseFromString(svg, 'image/svg+xml').documentElement;
}

// ── Card DOM ──

function createCardEl(card: CommentCard): HTMLElement {
  const el = document.createElement('div');
  el.className = 'comment-card';
  el.dataset.commentId = card.id;

  const header = document.createElement('div');
  header.className = 'comment-card-header';

  const avatar = document.createElement('div');
  avatar.className = 'comment-card-avatar';
  avatar.textContent = card.author.charAt(0).toUpperCase();

  const meta = document.createElement('div');
  meta.className = 'comment-card-meta';
  const name = document.createElement('span');
  name.className = 'comment-card-name';
  name.textContent = card.author;
  const time = document.createElement('span');
  time.className = 'comment-card-time';
  time.textContent = card.timestamp;
  meta.append(name, time);

  // Action buttons (visible on card hover)
  const actions = document.createElement('div');
  actions.className = 'comment-card-actions';

  const resolveBtn = document.createElement('button');
  resolveBtn.className = 'comment-card-btn';
  resolveBtn.type = 'button';
  resolveBtn.title = 'Resolve';
  resolveBtn.appendChild(svgIcon(Check));

  const moreBtn = document.createElement('button');
  moreBtn.className = 'comment-card-btn';
  moreBtn.type = 'button';
  moreBtn.title = 'More';
  moreBtn.appendChild(svgIcon(MoreHorizontal));

  // More dropdown
  const dropdown = document.createElement('div');
  dropdown.className = 'comment-card-dropdown';
  dropdown.style.display = 'none';

  const editBtn = document.createElement('button');
  editBtn.className = 'comment-card-dropdown-item';
  editBtn.type = 'button';
  editBtn.appendChild(svgIcon(Pencil));
  const editLabel = document.createElement('span');
  editLabel.textContent = 'Edit';
  editBtn.appendChild(editLabel);

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'comment-card-dropdown-item comment-card-dropdown-danger';
  deleteBtn.type = 'button';
  deleteBtn.appendChild(svgIcon(Trash2));
  const deleteLabel = document.createElement('span');
  deleteLabel.textContent = 'Delete';
  deleteBtn.appendChild(deleteLabel);

  dropdown.append(editBtn, deleteBtn);

  moreBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const showing = dropdown.style.display !== 'none';
    dropdown.style.display = showing ? 'none' : 'flex';
    if (!showing) {
      const close = (ev: MouseEvent) => {
        if (!dropdown.contains(ev.target as Node) && ev.target !== moreBtn) {
          dropdown.style.display = 'none';
          document.removeEventListener('mousedown', close, true);
        }
      };
      setTimeout(() => document.addEventListener('mousedown', close, true), 0);
    }
  });

  resolveBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const c = el.closest('.editor-container') as HTMLElement;
    containerCallbacks.get(c)?.onResolve?.(card.id);
  });
  editBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.style.display = 'none';
    const c = el.closest('.editor-container') as HTMLElement;
    containerCallbacks.get(c)?.onEdit?.(card.id);
  });
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.style.display = 'none';
    const c = el.closest('.editor-container') as HTMLElement;
    containerCallbacks.get(c)?.onDelete?.(card.id);
  });

  actions.append(resolveBtn, moreBtn, dropdown);
  header.append(avatar, meta, actions);

  const body = document.createElement('div');
  body.className = 'comment-card-body';
  body.textContent = card.comment;

  el.append(header, body);
  return el;
}

// ── Positioning with stack avoidance ──

const CARD_GAP = 8;

function positionCard(cardEl: HTMLElement, container: HTMLElement) {
  const id = cardEl.dataset.commentId;
  const highlight = container.querySelector(`.comment-hl[data-comment-id="${id}"]`);
  if (!highlight) { cardEl.style.display = 'none'; return; }
  cardEl.style.display = '';
  const hlRect = highlight.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  (cardEl as any)._idealTop = hlRect.top - containerRect.top;
}

function repositionAll(container: HTMLElement) {
  const map = getCardMap(container);
  const cards = Array.from(map.values());

  for (const c of cards) positionCard(c, container);
  const visible = cards.filter(c => c.style.display !== 'none');
  visible.sort((a, b) => ((a as any)._idealTop || 0) - ((b as any)._idealTop || 0));

  let lastBottom = -Infinity;
  for (const c of visible) {
    const ideal = (c as any)._idealTop || 0;
    const top = Math.max(ideal, lastBottom + CARD_GAP);
    c.style.top = `${top}px`;
    lastBottom = top + c.offsetHeight;
  }
}

// ── Hover linking ──

// Highlight hover uses a dynamic <style> element instead of class toggling.
// ProseMirror owns the decoration spans and may re-render them at any time —
// adding classes directly causes re-render loops. A style rule is stable.

function getHoverStyle(container: HTMLElement): HTMLStyleElement {
  let el = container.querySelector('.comment-hover-style') as HTMLStyleElement;
  if (!el) {
    el = document.createElement('style');
    el.className = 'comment-hover-style';
    container.appendChild(el);
  }
  return el;
}

function activateHover(container: HTMLElement, id: string) {
  // Highlight: inject CSS rule (doesn't touch ProseMirror DOM)
  getHoverStyle(container).textContent =
    `[data-comment-id="${id}"].comment-hl { background: rgba(255, 190, 30, 0.35) !important; border-bottom-color: rgba(200, 160, 32, 0.6) !important; }`;
  // Card: class toggle is safe (we own these elements)
  getCardMap(container).get(id)?.classList.add('comment-card-hover');
}

function deactivateHover(container: HTMLElement, id: string) {
  getHoverStyle(container).textContent = '';
  getCardMap(container).get(id)?.classList.remove('comment-card-hover');
}

// Debounced deactivation — prevents stuck hover when mouse moves between
// card body and absolutely-positioned dropdown (which extends outside card box).
const hoverTimers = new Map<string, ReturnType<typeof setTimeout>>();

function scheduleDeactivate(container: HTMLElement, id: string) {
  clearDeactivateTimer(id);
  hoverTimers.set(id, setTimeout(() => {
    deactivateHover(container, id);
    hoverTimers.delete(id);
  }, 80));
}

function clearDeactivateTimer(id: string) {
  const t = hoverTimers.get(id);
  if (t) { clearTimeout(t); hoverTimers.delete(id); }
}

/** Attach hover listeners to a card element. Uses debounce for dropdown gap. */
function attachCardHover(cardEl: HTMLElement, container: HTMLElement) {
  const id = cardEl.dataset.commentId!;
  cardEl.addEventListener('mouseenter', () => {
    clearDeactivateTimer(id);
    activateHover(container, id);
  });
  cardEl.addEventListener('mouseleave', () => scheduleDeactivate(container, id));
}

/** Track active highlight hover per container to avoid stale state. */
const activeHighlightId = new WeakMap<HTMLElement, string | null>();

function setupHighlightHover(container: HTMLElement) {
  const pm = container.querySelector('.ProseMirror');
  if (!pm) return;

  pm.addEventListener('pointerover', (e) => {
    const target = (e.target as HTMLElement).closest?.('[data-comment-id]:not(.comment-card)');
    if (!target) return;
    const id = (target as HTMLElement).dataset.commentId;
    if (!id) return;

    // Clean up previous highlight before activating new one
    const prev = activeHighlightId.get(container);
    if (prev && prev !== id) deactivateHover(container, prev);

    activeHighlightId.set(container, id);
    activateHover(container, id);
  });

  pm.addEventListener('pointerout', (e) => {
    // Only deactivate if pointer left the ProseMirror area entirely,
    // or moved to a non-highlight element
    const related = (e as PointerEvent).relatedTarget as HTMLElement | null;
    const nextHl = related?.closest?.('[data-comment-id]:not(.comment-card)');
    if (nextHl) return; // Moving to another highlight — pointerover will handle swap

    const current = activeHighlightId.get(container);
    if (current) {
      deactivateHover(container, current);
      activeHighlightId.set(container, null);
    }
  });
}

// ── Observer setup ──

const observedContainers = new WeakSet<HTMLElement>();

function ensureObservers(container: HTMLElement) {
  if (observedContainers.has(container)) return;
  observedContainers.add(container);

  const reposition = () => repositionAll(container);
  window.addEventListener('scroll', reposition, { passive: true });
  window.addEventListener('resize', reposition, { passive: true });

  const observer = new MutationObserver(reposition);
  const pm = container.querySelector('.ProseMirror');
  if (pm) observer.observe(pm, { childList: true, subtree: true, characterData: true });

  setupHighlightHover(container);
}

// ── Public API ──

export function addCommentCard(
  container: HTMLElement, card: CommentCard, callbacks?: CardCallbacks,
) {
  container.style.position = 'relative';
  if (callbacks) containerCallbacks.set(container, callbacks);
  ensureObservers(container);

  const map = getCardMap(container);
  map.get(card.id)?.remove();

  const cardEl = createCardEl(card);
  container.appendChild(cardEl);
  map.set(card.id, cardEl);
  attachCardHover(cardEl, container);

  requestAnimationFrame(() => repositionAll(container));
}

export function removeCommentCard(container: HTMLElement, id: string) {
  const map = getCardMap(container);
  map.get(id)?.remove();
  map.delete(id);
  repositionAll(container);
}

/** Get occupied Y ranges for all cards in a container (for collision avoidance). */
export function getCardRanges(container: HTMLElement): Array<{ top: number; bottom: number }> {
  const map = getCardMap(container);
  const ranges: Array<{ top: number; bottom: number }> = [];
  for (const card of map.values()) {
    if (card.style.display === 'none') continue;
    const top = parseFloat(card.style.top) || 0;
    ranges.push({ top, bottom: top + card.offsetHeight });
  }
  return ranges.sort((a, b) => a.top - b.top);
}
