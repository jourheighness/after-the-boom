/**
 * Sidebar rebuild logic — regenerates the table of contents
 * from heading elements in the ProseMirror editors.
 * Uses fingerprinting to skip no-op rebuilds.
 */

export interface EditorEntry {
  section: Element;
}

let lastFingerprint = '';
let queued = false;

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function doRebuild(editors: Map<Element, any>) {
  queued = false;
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  const fpParts: string[] = [];
  const sectionData: Array<{
    source: string;
    headings: Array<{ level: number; text: string; el: Element }>;
  }> = [];

  for (const [section] of editors) {
    const pm = section.querySelector('.ProseMirror');
    if (!pm) continue;
    const source = section.getAttribute('data-source') || '';
    const headings: typeof sectionData[0]['headings'] = [];

    for (const h of pm.querySelectorAll('h1, h2, h3')) {
      const text = h.textContent?.trim() || '';
      headings.push({ level: parseInt(h.tagName[1]), text, el: h });
      fpParts.push(h.tagName[1] + text);
    }
    sectionData.push({ source, headings });
  }

  const fingerprint = fpParts.join('\n');
  if (fingerprint === lastFingerprint) return;
  lastFingerprint = fingerprint;

  // Cache colors from existing sidebar before clearing
  const colorCache = new Map<string, string>();
  for (const group of sidebar.querySelectorAll('.nav-group')) {
    const src = group.getAttribute('data-source');
    const title = group.querySelector('a.nav-source') as HTMLElement | null;
    if (src && title?.style.borderLeftColor) colorCache.set(src, title.style.borderLeftColor);
  }

  // Build off-DOM in a fragment — single repaint
  const frag = document.createDocumentFragment();

  for (const { source, headings } of sectionData) {
    const group = document.createElement('div');
    group.className = 'nav-group';
    group.dataset.source = source;

    const prefix = slugify(source);
    const color = colorCache.get(source) || '#666';
    let groupTitle: string | null = null;
    let groupTitleId: string | null = null;

    for (const { level, text, el } of headings) {
      const id = `${prefix}-${slugify(text)}`;
      el.id = id;

      if (level === 1) {
        groupTitle = text;
        groupTitleId = id;
        continue;
      }

      const link = document.createElement('a');
      link.className = level === 3 ? 'nav-link nav-h3' : 'nav-link nav-h2';
      link.href = `#${id}`;
      link.textContent = text;
      group.appendChild(link);
    }

    const titleEl = document.createElement('a');
    titleEl.className = 'nav-source';
    titleEl.style.borderLeft = `3px solid ${color}`;
    titleEl.href = groupTitleId ? `#${groupTitleId}` : '#';
    titleEl.textContent = groupTitle || source;
    group.prepend(titleEl);

    frag.appendChild(group);
  }

  sidebar.textContent = '';
  sidebar.appendChild(frag);
}

/** Schedule a sidebar rebuild at idle time. */
export function rebuildSidebar(editors: Map<Element, any>) {
  if (queued) return;
  queued = true;
  (window.requestIdleCallback || ((cb: Function) => setTimeout(cb, 16)))(() => doRebuild(editors));
}
