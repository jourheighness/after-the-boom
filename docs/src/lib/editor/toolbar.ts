/**
 * Custom Notion-style toolbar for the Milkdown Crepe editor.
 * Extends Crepe's built-in toolbar with a "Turn Into" submenu,
 * block type detection, and a Comment button stub.
 *
 * All innerHTML assignments use lucide-static package SVG constants (not user input).
 */

import {
  Bold, Italic, Strikethrough, Code, Link,
  MessageSquareText, ChevronDown, Check,
  Type, Heading1, Heading2, Heading3, Heading4,
  List, ListOrdered, SquareCode, Quote, Minus,
} from 'lucide-static';

import { getMk, ensureMilkdownImports, type MilkdownImports } from './milkdown-imports';
import { openCommentInput } from './comment-input';
import { addCommentCard, removeCommentCard } from './comment-cards';
import { setComments, commentsPluginKey, type CommentRange } from './comments-plugin';
import { createComment, resolveComment, deleteComment as apiDeleteComment, formatTime } from './comments-api';

// ── Crepe toolbar icon overrides (passed to featureConfigs) ──

export const TOOLBAR_ICONS = {
  boldIcon: Bold,
  italicIcon: Italic,
  strikethroughIcon: Strikethrough,
  codeIcon: Code,
  linkIcon: Link,
};

// ── DOM helper ──

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K, cls?: string, attrs?: Record<string, string>,
): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (attrs) for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  return e;
}

// ── ProseMirror helpers ──

function hasAncestorOfType($from: any, nodeType: any): boolean {
  for (let d = $from.depth; d >= 0; d--) {
    if ($from.node(d).type === nodeType) return true;
  }
  return false;
}

/** Lift selection out of blockquote/list wrappers before changing block type. */
function liftFromWrappers(ctx: any) {
  const mk = getMk()!;
  const view = ctx.get(mk.editorViewCtx);
  const wrapperTypes = [
    mk.blockquoteSchema.type(ctx),
    mk.bulletListSchema.type(ctx),
    mk.orderedListSchema.type(ctx),
  ];
  for (let i = 0; i < 5; i++) {
    const { $from } = view.state.selection;
    let inWrapper = false;
    for (let d = $from.depth; d > 0; d--) {
      if (wrapperTypes.some((t: any) => $from.node(d).type === t)) {
        inWrapper = true;
        break;
      }
    }
    if (!inWrapper) break;
    if (!mk.lift(view.state, view.dispatch)) break;
  }
}

// ── Turn Into item definitions ──

type TurnIntoItem = {
  id: string; icon: string; label: string; short: string;
  run: (ctx: any) => void;
  detect: ($from: any, ctx: any) => boolean;
};

function headingItem(level: number, icon: string): TurnIntoItem {
  return {
    id: `h${level}`, icon, label: `Heading ${level}`, short: `H${level}`,
    run: (ctx) => {
      liftFromWrappers(ctx);
      const mk = getMk()!;
      ctx.get(mk.commandsCtx).call(mk.setBlockTypeCommand.key,
        { nodeType: mk.headingSchema.type(ctx), attrs: { level } });
    },
    detect: ($from, ctx) => {
      const mk = getMk()!;
      return $from.parent.type === mk.headingSchema.type(ctx) && $from.parent.attrs.level === level;
    },
  };
}

function wrapperItem(id: string, icon: string, label: string, short: string,
  getSchema: (mk: MilkdownImports) => any): TurnIntoItem {
  return {
    id, icon, label, short,
    run: (ctx) => {
      const mk = getMk()!;
      ctx.get(mk.commandsCtx).call(mk.wrapInBlockTypeCommand.key,
        { nodeType: getSchema(mk).type(ctx) });
    },
    detect: ($from, ctx) => hasAncestorOfType($from, getSchema(getMk()!).type(ctx)),
  };
}

// Order: specific leaf types first, wrappers, text (fallback), non-detectable last
const TURN_INTO_ITEMS: TurnIntoItem[] = [
  headingItem(1, Heading1),
  headingItem(2, Heading2),
  headingItem(3, Heading3),
  headingItem(4, Heading4),
  {
    id: 'code', icon: SquareCode, label: 'Code Block', short: 'Code',
    run: (ctx) => {
      liftFromWrappers(ctx);
      const mk = getMk()!;
      ctx.get(mk.commandsCtx).call(mk.setBlockTypeCommand.key,
        { nodeType: mk.codeBlockSchema.type(ctx) });
    },
    detect: ($from, ctx) => $from.parent.type === getMk()!.codeBlockSchema.type(ctx),
  },
  wrapperItem('quote', Quote, 'Quote', 'Quote', (mk) => mk.blockquoteSchema),
  wrapperItem('bullet', List, 'Bullet List', 'List', (mk) => mk.bulletListSchema),
  wrapperItem('ordered', ListOrdered, 'Numbered List', 'List', (mk) => mk.orderedListSchema),
  {
    id: 'text', icon: Type, label: 'Text', short: 'T',
    run: (ctx) => {
      liftFromWrappers(ctx);
      getMk()!; // guard
      ctx.get(getMk()!.commandsCtx).call(getMk()!.turnIntoTextCommand.key);
    },
    detect: ($from, ctx) => $from.parent.type === getMk()!.paragraphSchema.type(ctx),
  },
  {
    id: 'divider', icon: Minus, label: 'Divider', short: 'T',
    run: (ctx) => {
      const mk = getMk()!;
      ctx.get(mk.commandsCtx).call(mk.addBlockTypeCommand.key,
        { nodeType: mk.hrSchema.type(ctx) });
    },
    detect: () => false,
  },
];

const BLOCK_LABELS = Object.fromEntries(TURN_INTO_ITEMS.map(i => [i.id, i.short]));

// ── Submenu state (global: only one open at a time across all editors) ──

let activeSubmenu: HTMLElement | null = null;
let activeSubmenuCleanup: (() => void) | null = null;

function closeActiveSubmenu() {
  if (activeSubmenu) { activeSubmenu.style.display = 'none'; activeSubmenu = null; }
  if (activeSubmenuCleanup) { activeSubmenuCleanup(); activeSubmenuCleanup = null; }
}

// ── DOM builders ──

function createTurnIntoButton(): { btn: HTMLButtonElement; label: HTMLSpanElement } {
  const btn = el('button', 'toolbar-turn-into', { type: 'button' });
  const label = el('span', 'toolbar-turn-into-label');
  label.textContent = 'T';
  const chevron = el('span', 'toolbar-turn-into-chevron');
  chevron.innerHTML = ChevronDown; // lucide-static SVG constant
  btn.append(label, chevron);
  return { btn, label };
}

function createSubmenuPanel(crepe: any): HTMLDivElement {
  const mk = getMk()!;
  const panel = el('div', 'toolbar-submenu');
  panel.style.display = 'none';

  for (const item of TURN_INTO_ITEMS) {
    const row = el('button', 'toolbar-submenu-item', { type: 'button' });
    row.dataset.blockType = item.id;
    const icon = el('span', 'toolbar-submenu-icon');
    icon.innerHTML = item.icon; // lucide-static SVG constant
    const label = el('span', 'toolbar-submenu-label');
    label.textContent = item.label;
    const check = el('span', 'toolbar-submenu-check');
    row.append(icon, label, check);
    row.addEventListener('mousedown', (e) => {
      e.preventDefault(); e.stopPropagation();
      crepe.editor.action((ctx: any) => {
        item.run(ctx);
        ctx.get(mk.editorViewCtx).focus();
      });
      closeActiveSubmenu();
    });
    panel.appendChild(row);
  }
  return panel;
}

/** Remove a comment's highlight decoration from the editor. */
function removeHighlight(crepe: any, commentId: string) {
  const mk = getMk();
  if (!mk) return;
  crepe.editor.action((ctx: any) => {
    const view = ctx.get(mk.editorViewCtx);
    const current = commentsPluginKey.getState(view.state);
    setComments(view, (current?.comments || []).filter((c: CommentRange) => c.id !== commentId));
  });
}

/** Add a comment's highlight decoration to the editor. */
function addHighlight(crepe: any, id: string, selectedText: string, category?: string) {
  const mk = getMk();
  if (!mk) return;
  const catClass = category ? ` comment-hl-${category}` : '';
  crepe.editor.action((ctx: any) => {
    const view = ctx.get(mk.editorViewCtx);
    const current = commentsPluginKey.getState(view.state);
    const newComment: CommentRange = { id, selectedText, className: `comment-hl${catClass}` };
    setComments(view, [...(current?.comments || []), newComment]);
  });
}

export interface SectionContext {
  sectionId: string;
  sourceFile: string;
}

function createCommentButton(crepe: any, container: HTMLDivElement, section: SectionContext): HTMLButtonElement {
  const btn = el('button', 'toolbar-comment', { type: 'button' });
  const icon = el('span');
  icon.innerHTML = MessageSquareText; // lucide-static SVG constant
  const label = el('span');
  label.textContent = 'Comment';
  btn.append(icon, label);
  btn.addEventListener('mousedown', (e) => {
    e.preventDefault(); e.stopPropagation();
    openCommentInput({
      crepe,
      container,
      onSubmit: async (selectedText, commentText) => {
        // Persist to DB via API
        const id = await createComment({
          selectedText,
          comment: commentText,
          sectionId: section.sectionId,
          sourceFile: section.sourceFile,
        });

        // Add highlight + card
        addHighlight(crepe, id, selectedText);
        addCommentCard(container, {
          id, selectedText, comment: commentText,
          author: 'Johannes', timestamp: 'Just now',
        }, makeCardCallbacks(crepe, container));
      },
    });
  });
  return btn;
}

/** Shared card action callbacks (resolve/edit/delete). */
function makeCardCallbacks(crepe: any, container: HTMLDivElement) {
  return {
    onResolve: async (cid: string) => {
      removeCommentCard(container, cid);
      removeHighlight(crepe, cid);
      await resolveComment(cid);
    },
    onEdit: (cid: string) => console.log('[comment] Edit:', cid),
    onDelete: async (cid: string) => {
      removeCommentCard(container, cid);
      removeHighlight(crepe, cid);
      await apiDeleteComment(cid);
    },
  };
}

function detectBlockType(crepe: any): string {
  const mk = getMk();
  if (!mk) return 'text';
  let blockId = 'text';
  try {
    crepe.editor.action((ctx: any) => {
      const { $from } = ctx.get(mk.editorViewCtx).state.selection;
      for (const item of TURN_INTO_ITEMS) {
        if (item.detect($from, ctx)) { blockId = item.id; break; }
      }
    });
  } catch {}
  return blockId;
}

// ── Public API ──

/** Inject Turn Into button, submenu, and Comment button into Crepe's toolbar. */
export async function injectToolbarExtras(crepe: any, container: HTMLDivElement, section?: SectionContext) {
  await ensureMilkdownImports();
  const toolbar = container.querySelector('.milkdown-toolbar');
  if (!toolbar) return;

  const { btn: turnIntoBtn, label: turnIntoLabel } = createTurnIntoButton();
  const submenu = createSubmenuPanel(crepe);

  // Assemble: [Turn Into] [÷] [Crepe buttons] [÷] [Comment]
  toolbar.prepend(submenu);
  toolbar.prepend(el('span', 'toolbar-divider'));
  toolbar.prepend(turnIntoBtn);
  toolbar.appendChild(el('span', 'toolbar-divider'));
  toolbar.appendChild(createCommentButton(crepe, container,
    section || { sectionId: '', sourceFile: '' }));

  // Submenu toggle
  turnIntoBtn.addEventListener('mousedown', (e) => {
    e.preventDefault(); e.stopPropagation();
    if (activeSubmenu === submenu) { closeActiveSubmenu(); return; }
    closeActiveSubmenu();
    submenu.style.display = 'flex';
    activeSubmenu = submenu;
    updateToolbarState();

    const onOutside = (ev: MouseEvent) => {
      if (!submenu.contains(ev.target as Node) && !turnIntoBtn.contains(ev.target as Node))
        closeActiveSubmenu();
    };
    const onEscape = (ev: KeyboardEvent) => { if (ev.key === 'Escape') closeActiveSubmenu(); };
    document.addEventListener('mousedown', onOutside, true);
    document.addEventListener('keydown', onEscape, true);
    activeSubmenuCleanup = () => {
      document.removeEventListener('mousedown', onOutside, true);
      document.removeEventListener('keydown', onEscape, true);
    };
  });

  // Unified state update: label + checkmarks in one detection pass
  function updateToolbarState() {
    const blockId = detectBlockType(crepe);
    turnIntoLabel.textContent = BLOCK_LABELS[blockId] || 'T';
    if (activeSubmenu === submenu) {
      for (const row of submenu.querySelectorAll('.toolbar-submenu-item') as NodeListOf<HTMLElement>) {
        row.querySelector('.toolbar-submenu-check')!.innerHTML =
          row.dataset.blockType === blockId ? Check : ''; // lucide-static SVG constant
      }
    }
  }

  // React to toolbar show/hide
  new MutationObserver(() => {
    if (toolbar.getAttribute('data-show') === 'true') updateToolbarState();
    else closeActiveSubmenu();
  }).observe(toolbar, { attributes: true, attributeFilter: ['data-show'] });
}
