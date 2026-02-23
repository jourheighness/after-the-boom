#!/usr/bin/env python3
"""
build-reader.py — MONDAS Rules Reader Builder
Reads .md files from rules/ and generates a self-contained HTML reader.
Run from project root: python tools/build-reader.py
"""

import re
import json
import html as html_mod
from pathlib import Path

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

PROJECT_ROOT = Path(__file__).parent.parent
RULES_DIR = PROJECT_ROOT / "rules"
OUTPUT_FILE = PROJECT_ROOT / "tools" / "rules-reader.html"
COMMENTS_FILE = PROJECT_ROOT / "tools" / "comments.json"

# Ordered list of source files. Missing files are silently skipped.
# To add a new file, just drop it in rules/ — it'll appear at the end.
# To control order, list it explicitly here.
_SOURCE_ORDER = [
    "CORE.md",
    "MAGIC.md",
    "GAMBITS.md",
    "EDGES.md",
    "EQUIPMENT.md",
    "CHARACTER.md",
    "BACKGROUNDS.md",
    "DESIGN.md",
]

def _discover_sources():
    """Return ordered source files. Explicit order first, then any new .md files found in rules/."""
    ordered = [f for f in _SOURCE_ORDER if (RULES_DIR / f).exists()]
    known = set(_SOURCE_ORDER)
    extras = sorted(f.name for f in RULES_DIR.glob("*.md") if f.name not in known and not f.name.startswith("_"))
    return ordered + extras

SOURCE_FILES = _discover_sources()

FILE_COLORS = {
    "CORE":        "#8b7355",
    "MAGIC":       "#7a5c7a",
    "GAMBITS":     "#5c7a5c",
    "EDGES":       "#5c6a7a",
    "EQUIPMENT":   "#7a5c5c",
    "CHARACTER":   "#7a7a5c",
    "BACKGROUNDS": "#5c7a7a",
    "DESIGN":      "#6a5c7a",
}

# ---------------------------------------------------------------------------
# Markdown to HTML
# ---------------------------------------------------------------------------

def esc(text):
    return html_mod.escape(text, quote=False)

def inline_md(text):
    """Convert inline markdown: bold, italic, code spans."""
    text = re.sub(r'`([^`]+)`', lambda m: f'<code>{esc(m.group(1))}</code>', text)
    text = re.sub(r'\*\*\*(.+?)\*\*\*', r'<strong><em>\1</em></strong>', text)
    text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
    text = re.sub(r'\*([^*\n]+?)\*', r'<em>\1</em>', text)
    text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', text)
    return text

def slugify(text):
    return re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')

def md_to_html(text, source):
    """Convert a markdown string to HTML. Returns (html, toc_entries).
    toc_entries: list of (level, id, title)
    """
    lines = text.splitlines()
    out = []
    toc = []
    slug_counts = {}
    i = 0

    def make_id(title):
        base = slugify(f"{source}-{title}")
        n = slug_counts.get(base, 0)
        slug_counts[base] = n + 1
        return base if n == 0 else f"{base}-{n}"

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # Skip blank lines
        if not stripped:
            i += 1
            continue

        # Horizontal rule
        if re.match(r'^---+\s*$', stripped):
            out.append('<hr>')
            i += 1
            continue

        # Headings
        hm = re.match(r'^(#{1,4})\s+(.+)', stripped)
        if hm:
            level = len(hm.group(1))
            title = hm.group(2).strip()
            sid = make_id(title)
            tag = f'h{level}'
            css_class = f'heading-{level}'
            out.append(f'<{tag} id="{sid}" class="{css_class}">{inline_md(esc(title))}</{tag}>')
            if level <= 3:
                toc.append((level, sid, title))
            i += 1
            continue

        # Table
        if stripped.startswith('|') and i + 1 < len(lines) and re.match(r'^\s*\|[-| :]+\|?\s*$', lines[i+1]):
            table_lines = []
            while i < len(lines) and lines[i].strip().startswith('|'):
                table_lines.append(lines[i].strip())
                i += 1
            out.append(render_table(table_lines))
            continue

        # Unordered list
        if re.match(r'^[-*]\s', stripped):
            items = []
            while i < len(lines) and re.match(r'^\s*[-*]\s', lines[i]):
                items.append(re.sub(r'^\s*[-*]\s+', '', lines[i]).strip())
                i += 1
            out.append('<ul>' + ''.join(f'<li>{inline_md(esc(it))}</li>' for it in items) + '</ul>')
            continue

        # Ordered list
        if re.match(r'^\d+[.)]\s', stripped):
            items = []
            while i < len(lines) and re.match(r'^\s*\d+[.)]\s', lines[i]):
                items.append(re.sub(r'^\s*\d+[.)]\s+', '', lines[i]).strip())
                i += 1
            out.append('<ol>' + ''.join(f'<li>{inline_md(esc(it))}</li>' for it in items) + '</ol>')
            continue

        # Regular paragraph
        para = []
        while i < len(lines) and lines[i].strip() and not lines[i].strip().startswith('#') and not lines[i].strip().startswith('|') and not re.match(r'^---+\s*$', lines[i].strip()) and not re.match(r'^[-*]\s', lines[i].strip()) and not re.match(r'^\d+[.)]\s', lines[i].strip()):
            para.append(lines[i].strip())
            i += 1
        if para:
            out.append(f'<p>{inline_md(esc(" ".join(para)))}</p>')

    return '\n'.join(out), toc

def render_table(table_lines):
    rows = []
    for line in table_lines:
        if re.match(r'^\|[-| :]+\|?$', line):
            continue
        cells = [c.strip() for c in re.split(r'(?<!\\)\|', line)]
        cells = [c for c in cells if c != '']
        if cells:
            rows.append(cells)
    if not rows:
        return ''
    parts = ['<div class="table-wrap"><table>']
    parts.append('<thead><tr>' + ''.join(f'<th>{inline_md(esc(c))}</th>' for c in rows[0]) + '</tr></thead>')
    parts.append('<tbody>')
    for row in rows[1:]:
        parts.append('<tr>' + ''.join(f'<td>{inline_md(esc(c))}</td>' for c in row) + '</tr>')
    parts.append('</tbody></table></div>')
    return '\n'.join(parts)

# ---------------------------------------------------------------------------
# Build
# ---------------------------------------------------------------------------

def load_comments():
    if not COMMENTS_FILE.exists():
        return []
    data = json.loads(COMMENTS_FILE.read_text(encoding='utf-8'))
    return data.get('comments', [])

def build():
    print("Building MONDAS Rules Reader...")
    print(f"  Source: {RULES_DIR}")
    print(f"  Output: {OUTPUT_FILE}")

    all_sections = []  # (source, html, toc)

    for fname in SOURCE_FILES:
        fpath = RULES_DIR / fname
        if not fpath.exists():
            print(f"  WARNING: {fname} not found, skipping")
            continue
        print(f"  Parsing {fname}...")
        source = fpath.stem
        text = fpath.read_text(encoding='utf-8')
        html_content, toc = md_to_html(text, source)
        all_sections.append((source, html_content, toc))

    # Build sidebar nav
    nav_html = []
    for source, _, toc in all_sections:
        color = FILE_COLORS.get(source, '#666')
        nav_html.append(f'<div class="nav-group">')
        nav_html.append(f'<div class="nav-source" style="border-left:3px solid {color}">{source}</div>')
        for level, sid, title in toc:
            indent = 'nav-h3' if level == 3 else 'nav-h2'
            nav_html.append(f'<a class="nav-link {indent}" href="#{sid}">{esc(title)}</a>')
        nav_html.append('</div>')
    nav_str = '\n'.join(nav_html)

    # Build main content
    content_html = []
    for source, html_content, _ in all_sections:
        color = FILE_COLORS.get(source, '#666')
        content_html.append(f'<section class="file-section" data-source="{source}">')
        content_html.append(html_content)
        content_html.append('</section>')
    content_str = '\n'.join(content_html)

    # Filter buttons
    filter_btns = []
    for source, _, _ in all_sections:
        color = FILE_COLORS.get(source, '#666')
        filter_btns.append(f'<button class="filter-btn active" data-source="{source}" style="--btn-color:{color}" onclick="toggleFilter(this)">{source}</button>')
    filter_str = '\n'.join(filter_btns)

    # Count stats
    total_sections = sum(len(t) for _, _, t in all_sections)

    comments_data = load_comments()
    print(f"  Comments: {len(comments_data)} embedded")

    page = HTML_TEMPLATE.replace('{{NAV}}', nav_str)
    page = page.replace('{{FILTERS}}', filter_str)
    page = page.replace('{{CONTENT}}', content_str)
    page = page.replace('{{COMMENTS_DATA}}', json.dumps(comments_data))

    OUTPUT_FILE.write_text(page, encoding='utf-8')
    size_kb = OUTPUT_FILE.stat().st_size / 1024
    print(f"\n  Done.")
    print(f"  Sections: {total_sections}")
    print(f"  Output size: {size_kb:.1f} KB")
    print(f"  Open: file://{OUTPUT_FILE}")

# ---------------------------------------------------------------------------
# HTML Template
# ---------------------------------------------------------------------------

HTML_TEMPLATE = r'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>MONDAS Rules Reader</title>
<style>
:root {
  --bg: #f5f0eb;
  --card: #fff;
  --text: #2d2a26;
  --text-muted: #6b6560;
  --heading: #4a4540;
  --accent: #8b7355;
  --border: #d5cdc4;
  --sidebar-w: 260px;
  --header-h: 52px;
}
* { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior: smooth; scroll-padding-top: calc(var(--header-h) + 16px); }
body {
  font-family: 'SF Mono', 'Menlo', 'Monaco', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: var(--text);
  background: var(--bg);
}

/* Header */
.header {
  position: fixed; top:0; left:0; right:0; z-index:100;
  height: var(--header-h);
  background: var(--heading);
  color: #f5f0eb;
  display: flex; align-items: center;
  padding: 0 16px;
  gap: 12px;
}
.header-title {
  font-size: 15px; font-weight: 700;
  white-space: nowrap;
  font-family: system-ui, -apple-system, sans-serif;
}
.search-box {
  flex: 1; max-width: 400px;
  position: relative;
}
.search-box input {
  width: 100%;
  padding: 6px 10px 6px 30px;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 4px;
  background: rgba(255,255,255,0.1);
  color: #f5f0eb;
  font-family: inherit; font-size: 13px;
  outline: none;
}
.search-box input::placeholder { color: rgba(245,240,235,0.5); }
.search-box input:focus { border-color: var(--accent); background: rgba(255,255,255,0.15); }
.search-icon {
  position: absolute; left: 8px; top: 50%; transform: translateY(-50%);
  color: rgba(245,240,235,0.5); font-size: 14px;
}
.search-count { color: rgba(245,240,235,0.6); font-size: 11px; white-space: nowrap; }
.filter-bar { display: flex; gap: 4px; flex-wrap: wrap; }
.filter-btn {
  padding: 3px 8px; border: none; border-radius: 3px;
  font-family: inherit; font-size: 11px; cursor: pointer;
  background: var(--btn-color); color: #f5f0eb; opacity: 1;
  transition: opacity 0.15s;
}
.filter-btn:not(.active) { opacity: 0.35; }
.hamburger {
  display: none; background: none; border: none; color: #f5f0eb;
  font-size: 22px; cursor: pointer; padding: 4px;
}

/* Sidebar */
.sidebar {
  position: fixed; top: var(--header-h); left: 0; bottom: 0;
  width: var(--sidebar-w);
  overflow-y: auto;
  background: #eae5df;
  border-right: 1px solid var(--border);
  padding: 12px 0;
  z-index: 50;
}
.nav-group { margin-bottom: 8px; }
.nav-source {
  padding: 4px 12px;
  font-size: 11px; font-weight: 700; text-transform: uppercase;
  color: var(--text-muted); letter-spacing: 0.5px;
}
.nav-link {
  display: block; padding: 2px 12px 2px 16px;
  color: var(--text); text-decoration: none;
  font-size: 12px; line-height: 1.4;
  border-left: 2px solid transparent;
  transition: background 0.1s;
}
.nav-link:hover { background: rgba(0,0,0,0.04); }
.nav-link.active { border-left-color: var(--accent); font-weight: 600; }
.nav-h3 { padding-left: 28px; font-size: 11px; color: var(--text-muted); }

/* Main */
.main {
  margin-left: var(--sidebar-w);
  margin-top: var(--header-h);
  padding: 24px 32px 80px;
  max-width: 900px;
}

/* Typography */
h1 { font-family: system-ui, sans-serif; font-size: 22px; color: var(--heading); margin: 32px 0 12px; font-weight: 700; }
h2 { font-family: system-ui, sans-serif; font-size: 18px; color: var(--heading); margin: 28px 0 10px; padding-top: 20px; border-top: 2px solid var(--border); font-weight: 700; }
h3 { font-family: system-ui, sans-serif; font-size: 15px; color: var(--heading); margin: 20px 0 8px; font-weight: 600; }
h4 { font-size: 13px; color: var(--heading); margin: 16px 0 6px; font-weight: 600; }
p { margin: 8px 0; }
ul, ol { margin: 6px 0 6px 20px; }
li { margin: 2px 0; }
code { background: rgba(0,0,0,0.06); padding: 1px 4px; border-radius: 2px; font-size: 12px; }
hr { border: none; border-top: 1px solid var(--border); margin: 20px 0; }
strong { font-weight: 700; }
em { font-style: italic; }

/* Tables */
.table-wrap { overflow-x: auto; margin: 10px 0; }
table { border-collapse: collapse; width: 100%; font-size: 12px; }
th { background: #eae5df; font-weight: 600; text-align: left; padding: 6px 10px; border: 1px solid var(--border); }
td { padding: 5px 10px; border: 1px solid var(--border); vertical-align: top; }
tr:nth-child(even) td { background: rgba(0,0,0,0.02); }

/* Search highlights */
.search-hit { background: #ffd54f; border-radius: 2px; padding: 0 1px; }
.file-section.hidden { display: none; }

/* Mobile */
@media (max-width: 768px) {
  .sidebar { transform: translateX(-100%); transition: transform 0.2s; width: 280px; }
  .sidebar.open { transform: translateX(0); }
  .main { margin-left: 0; padding: 16px; }
  .hamburger { display: block; }
  .header-title { font-size: 13px; }
  .filter-bar { display: none; }
  .search-box { max-width: 200px; }
}

/* Comment highlights */
.commented-text {
  background: rgba(255, 200, 50, 0.25);
  border-bottom: 1.5px dashed #c8a020;
  cursor: pointer;
  transition: background 0.15s;
}
.commented-text:hover { background: rgba(255, 200, 50, 0.4); }
.commented-text.resolved {
  background: rgba(100, 180, 100, 0.15);
  border-bottom: 1.5px solid #5a9a5a;
}
.commented-text.resolved:hover { background: rgba(100, 180, 100, 0.3); }
.commented-text.orphaned { opacity: 0.5; }

/* Comment floating button */
.comment-float-btn {
  position: absolute; z-index: 200;
  background: var(--heading); color: #f5f0eb;
  border: none; border-radius: 4px;
  padding: 4px 10px; font-family: inherit; font-size: 11px;
  cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  display: none;
}
.comment-float-btn:hover { background: var(--accent); }

/* Comment popover */
.comment-popover {
  position: absolute; z-index: 300;
  background: var(--card); border: 1px solid var(--border);
  border-radius: 6px; box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  padding: 12px; width: 320px;
  font-size: 12px; display: none;
}
.comment-popover .popover-selected {
  font-size: 11px; color: var(--text-muted);
  margin-bottom: 8px; max-height: 40px; overflow: hidden;
  font-style: italic;
}
.comment-popover textarea {
  width: 100%; min-height: 60px; padding: 6px 8px;
  border: 1px solid var(--border); border-radius: 4px;
  font-family: inherit; font-size: 12px; resize: vertical;
  background: var(--bg); color: var(--text);
}
.comment-popover textarea:focus { outline: none; border-color: var(--accent); }
.comment-popover .popover-actions {
  display: flex; gap: 6px; margin-top: 8px; justify-content: flex-end;
}
.comment-popover .popover-actions button {
  padding: 4px 12px; border: 1px solid var(--border); border-radius: 3px;
  font-family: inherit; font-size: 11px; cursor: pointer;
  background: var(--bg); color: var(--text);
}
.comment-popover .popover-actions button.primary {
  background: var(--heading); color: #f5f0eb; border-color: var(--heading);
}
.comment-popover .popover-actions button:hover { opacity: 0.85; }
.comment-popover .resolution-note {
  margin-top: 8px; padding: 6px 8px;
  background: rgba(100,180,100,0.1); border-left: 3px solid #5a9a5a;
  border-radius: 0 4px 4px 0; font-size: 11px; color: var(--text);
}
.comment-popover .comment-meta {
  font-size: 10px; color: var(--text-muted); margin-top: 6px;
}

/* Comments panel (right sidebar) */
.comments-panel {
  position: fixed; top: var(--header-h); right: 0; bottom: 0;
  width: 320px; background: var(--card);
  border-left: 1px solid var(--border);
  overflow-y: auto; z-index: 80;
  transform: translateX(100%); transition: transform 0.2s;
  padding: 12px;
}
.comments-panel.open { transform: translateX(0); }
.comments-panel-header {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid var(--border);
}
.comments-panel-header h3 {
  font-family: system-ui, sans-serif; font-size: 14px; font-weight: 600;
  color: var(--heading); margin: 0;
}
.sync-indicator {
  font-size: 10px; margin-left: 6px; transition: opacity 0.3s;
}
.sync-ok { color: #5a9a5a; }
.sync-err { color: #a04040; }
.panel-group-label {
  font-size: 10px; font-weight: 700; text-transform: uppercase;
  color: var(--text-muted); letter-spacing: 0.5px;
  margin: 12px 0 4px; padding: 2px 0;
  border-bottom: 1px solid var(--border);
}
.panel-comment {
  padding: 6px 8px; margin: 4px 0; border-radius: 4px;
  cursor: pointer; transition: background 0.1s;
  border-left: 3px solid transparent;
}
.panel-comment:hover { background: rgba(0,0,0,0.04); }
.panel-comment.status-open { border-left-color: #c8a020; }
.panel-comment.status-resolved { border-left-color: #5a9a5a; }
.panel-comment.status-orphaned { border-left-color: #d47a20; }
.panel-comment .panel-selected-text {
  font-size: 11px; color: var(--text-muted); font-style: italic;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.panel-comment .panel-comment-text {
  font-size: 12px; color: var(--text); margin-top: 2px;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.panel-comment .panel-comment-footer {
  display: flex; align-items: center; justify-content: space-between; margin-top: 4px;
}
.panel-comment .panel-status {
  display: inline-block; padding: 1px 6px; border-radius: 8px;
  font-size: 9px; font-weight: 600; text-transform: uppercase;
}
.panel-actions { display: flex; gap: 6px; }
.panel-action {
  font-size: 10px; color: var(--accent); cursor: pointer;
  text-decoration: underline; text-underline-offset: 2px;
}
.panel-action:hover { color: var(--heading); }
.panel-action-danger { color: #a04040; }
.panel-action-danger:hover { color: #c03030; }
.panel-status.pill-open { background: rgba(255,200,50,0.3); color: #8a6800; }
.panel-status.pill-resolved { background: rgba(100,180,100,0.25); color: #2d6a2d; }
.panel-status.pill-orphaned { background: rgba(212,122,32,0.25); color: #8a4a00; }

/* Header comment toggle */
.comment-toggle-btn {
  padding: 3px 10px; border: none; border-radius: 3px;
  font-family: inherit; font-size: 11px; cursor: pointer;
  background: rgba(255,255,255,0.15); color: #f5f0eb;
  white-space: nowrap; position: relative;
}
.comment-toggle-btn:hover { background: rgba(255,255,255,0.25); }
.comment-badge {
  display: inline-block; min-width: 16px; height: 16px;
  line-height: 16px; text-align: center;
  background: #c8a020; color: #fff; border-radius: 8px;
  font-size: 10px; font-weight: 700; margin-left: 4px;
  padding: 0 4px;
}
.comment-badge.zero { background: rgba(255,255,255,0.2); }

/* Print */
@media print {
  .header, .sidebar, .comments-panel, .comment-float-btn, .comment-popover { display: none; }
  .main { margin: 0; padding: 10px; max-width: none; }
  .commented-text { background: none; border: none; }
  h2 { page-break-before: always; }
}

/* Mobile comments */
@media (max-width: 768px) {
  .comments-panel { width: 100%; }
}
</style>
</head>
<body>

<div class="header">
  <button class="hamburger" onclick="toggleSidebar()">&#9776;</button>
  <div class="header-title">MONDAS Rules Reader</div>
  <div class="search-box">
    <span class="search-icon">&#x1F50D;</span>
    <input type="text" id="searchInput" placeholder="Search... (Ctrl+K)" oninput="doSearch(this.value)">
  </div>
  <span class="search-count" id="searchCount"></span>
  <div class="filter-bar">
    {{FILTERS}}
  </div>
  <button class="comment-toggle-btn" onclick="toggleCommentsPanel()">
    Comments <span class="comment-badge zero" id="commentBadge">0</span>
  </button>
</div>

<nav class="sidebar" id="sidebar">
  {{NAV}}
</nav>

<main class="main" id="main">
  {{CONTENT}}
</main>

<div class="comments-panel" id="commentsPanel"></div>
<button class="comment-float-btn" id="commentFloatBtn" onclick="showCreatePopover()">+ Comment</button>
<div class="comment-popover" id="commentPopover"></div>

<script>window.__EMBEDDED_COMMENTS = {{COMMENTS_DATA}};</script>
<script>
// --- Sidebar toggle (mobile) ---
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}
document.getElementById('main').addEventListener('click', function() {
  document.getElementById('sidebar').classList.remove('open');
});

// --- Source filters ---
const activeFilters = new Set(document.querySelectorAll('.filter-btn').length ?
  Array.from(document.querySelectorAll('.filter-btn')).map(b => b.dataset.source) : []);

function toggleFilter(btn) {
  const src = btn.dataset.source;
  if (activeFilters.has(src)) {
    activeFilters.delete(src);
    btn.classList.remove('active');
  } else {
    activeFilters.add(src);
    btn.classList.add('active');
  }
  applyFilters();
}

function applyFilters() {
  document.querySelectorAll('.file-section').forEach(sec => {
    sec.classList.toggle('hidden', !activeFilters.has(sec.dataset.source));
  });
}

// --- Search ---
let searchTimeout = null;
function doSearch(query) {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => executeSearch(query), 150);
}

function executeSearch(query) {
  // Clear previous highlights
  document.querySelectorAll('.search-hit').forEach(el => {
    const parent = el.parentNode;
    parent.replaceChild(document.createTextNode(el.textContent), el);
    parent.normalize();
  });

  const countEl = document.getElementById('searchCount');
  if (!query || query.length < 2) {
    countEl.textContent = '';
    return;
  }

  const regex = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
  let count = 0;
  let firstHit = null;

  // Walk text nodes in main content
  const main = document.getElementById('main');
  const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, null, false);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  for (const node of nodes) {
    if (!regex.test(node.textContent)) continue;
    regex.lastIndex = 0;

    const frag = document.createDocumentFragment();
    let lastIdx = 0;
    let match;
    while ((match = regex.exec(node.textContent)) !== null) {
      if (match.index > lastIdx) {
        frag.appendChild(document.createTextNode(node.textContent.slice(lastIdx, match.index)));
      }
      const mark = document.createElement('span');
      mark.className = 'search-hit';
      mark.textContent = match[1];
      frag.appendChild(mark);
      count++;
      if (!firstHit) firstHit = mark;
      lastIdx = regex.lastIndex;
    }
    if (lastIdx < node.textContent.length) {
      frag.appendChild(document.createTextNode(node.textContent.slice(lastIdx)));
    }
    node.parentNode.replaceChild(frag, node);
  }

  countEl.textContent = count > 0 ? count + ' matches' : 'No matches';
  if (firstHit) firstHit.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// --- Keyboard shortcuts ---
document.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    document.getElementById('searchInput').focus();
  }
  if (e.key === 'Escape') {
    const input = document.getElementById('searchInput');
    if (document.activeElement === input) {
      input.value = '';
      doSearch('');
      input.blur();
    }
    document.getElementById('sidebar').classList.remove('open');
  }
});

// --- Scroll spy ---
let spyTimeout = null;
window.addEventListener('scroll', function() {
  clearTimeout(spyTimeout);
  spyTimeout = setTimeout(updateScrollSpy, 100);
});

function updateScrollSpy() {
  const links = document.querySelectorAll('.nav-link');
  const scrollY = window.scrollY + 80;
  let active = null;
  for (const link of links) {
    const target = document.getElementById(link.getAttribute('href').slice(1));
    if (target && target.offsetTop <= scrollY) active = link;
  }
  links.forEach(l => l.classList.remove('active'));
  if (active) {
    active.classList.add('active');
    // Scroll sidebar to keep active link visible
    const sidebar = document.getElementById('sidebar');
    const rect = active.getBoundingClientRect();
    const sidebarRect = sidebar.getBoundingClientRect();
    if (rect.top < sidebarRect.top || rect.bottom > sidebarRect.bottom) {
      active.scrollIntoView({ block: 'nearest' });
    }
  }
}
updateScrollSpy();

// =========================================================================
// COMMENT SYSTEM
// =========================================================================

const STORAGE_KEY = 'mondas-reader-comments';
let comments = [];
let pendingSelection = null; // {text, contextBefore, contextAfter, sectionId, sourceFile, range}

// --- Data Layer ---
function loadComments() {
  let stored = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) stored = JSON.parse(raw);
  } catch(e) { stored = []; }
  const embedded = window.__EMBEDDED_COMMENTS || [];

  // Merge: index stored by id
  const byId = {};
  for (const c of stored) byId[c.id] = c;
  for (const c of embedded) {
    if (byId[c.id]) {
      // Merge: localStorage status wins, embedded resolution overwrites null
      if (c.resolution && !byId[c.id].resolution) byId[c.id].resolution = c.resolution;
      if (c.resolvedAt && !byId[c.id].resolvedAt) byId[c.id].resolvedAt = c.resolvedAt;
      // If embedded says resolved but local says open, keep local (user may have reopened)
      // If embedded says resolved and local has no override, take embedded status
      if (c.status === 'resolved' && byId[c.id].status === 'open' && !byId[c.id]._userReopened) {
        byId[c.id].status = 'resolved';
      }
    } else {
      byId[c.id] = { ...c };
    }
  }
  comments = Object.values(byId);
  comments.sort((a, b) => (a.createdAt || '').localeCompare(b.createdAt || ''));
}

function saveComments() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  updateBadge();
  syncToServer();
}

function syncToServer() {
  // Auto-save to server (tools/comments.json) if dev server is running
  const data = { version: 1, comments: comments };
  fetch('/api/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => {
    const ind = document.getElementById('syncIndicator');
    if (ind) {
      ind.textContent = r.ok ? 'saved' : 'error';
      ind.className = 'sync-indicator ' + (r.ok ? 'sync-ok' : 'sync-err');
      clearTimeout(ind._timer);
      ind._timer = setTimeout(() => { ind.textContent = ''; ind.className = 'sync-indicator'; }, 2000);
    }
  }).catch(() => {
    // Server not running (file:// mode) — silent, localStorage still works
  });
}

function updateBadge() {
  const badge = document.getElementById('commentBadge');
  const openCount = comments.filter(c => c.status === 'open').length;
  badge.textContent = openCount;
  badge.classList.toggle('zero', openCount === 0);
}

function generateId() {
  return 'c_' + Date.now() + '_' + Math.random().toString(36).slice(2, 5);
}

// --- Text Anchoring ---
function findSectionForNode(node) {
  let el = node.nodeType === 3 ? node.parentElement : node;
  while (el && el.id !== 'main') {
    if (el.id && !el.id.startsWith('comment')) return el.id;
    // Walk up to find a heading-based section id
    el = el.parentElement;
  }
  return null;
}

function findClosestHeadingId(node) {
  // Walk backwards through previous siblings and parent's previous siblings to find heading
  let el = node.nodeType === 3 ? node.parentElement : node;
  while (el && el.id !== 'main') {
    // Check if this element is a heading with id
    if (/^H[1-4]$/.test(el.tagName) && el.id) return el.id;
    // Check previous siblings
    let sib = el.previousElementSibling;
    while (sib) {
      if (/^H[1-4]$/.test(sib.tagName) && sib.id) return sib.id;
      sib = sib.previousElementSibling;
    }
    el = el.parentElement;
  }
  return null;
}

function getSourceForSection(sectionId) {
  // Walk up from the element to find .file-section data-source
  const el = document.getElementById(sectionId);
  if (!el) return 'UNKNOWN';
  const sec = el.closest('.file-section');
  return sec ? sec.dataset.source : 'UNKNOWN';
}

function getSectionContentElements(headingEl) {
  // Collect all sibling elements after a heading until the next heading of same/higher level
  const level = parseInt(headingEl.tagName[1]);
  const elements = [headingEl];
  let sib = headingEl.nextElementSibling;
  while (sib) {
    const m = sib.tagName.match(/^H(\d)$/);
    if (m && parseInt(m[1]) <= level) break;
    elements.push(sib);
    sib = sib.nextElementSibling;
  }
  return elements;
}

function collectTextNodes(elements) {
  // Collect all text nodes across multiple elements in document order
  // Returns {nodes: [{node, start, end}], full: concatenated string}
  const entries = [];
  let pos = 0;
  for (const el of elements) {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while (node = walker.nextNode()) {
      const len = node.textContent.length;
      entries.push({ node, start: pos, end: pos + len });
      pos += len;
    }
  }
  const full = entries.map(e => e.node.textContent).join('');
  return { entries, full };
}

function mapOffsetToNode(entries, offset) {
  // Map a character offset in concatenated text back to a specific text node + local offset
  for (const e of entries) {
    if (offset >= e.start && offset < e.end) {
      return { node: e.node, offset: offset - e.start };
    }
  }
  // Offset at very end
  const last = entries[entries.length - 1];
  return { node: last.node, offset: last.node.textContent.length };
}

function findTextInElements(elements, text, ctxBefore, ctxAfter) {
  // Concatenate all text nodes, search in the combined string, then map back
  const { entries, full } = collectTextNodes(elements);
  if (entries.length === 0) return null;

  // 1. Exact match
  let matches = findAllOccurrences(full, text);

  // 2. Normalized whitespace match
  if (matches.length === 0) {
    const normFull = full.replace(/\s+/g, ' ');
    const normText = text.replace(/\s+/g, ' ');
    const normMatches = findAllOccurrences(normFull, normText);
    // Map normalized offsets back (approximate: works for collapsed whitespace)
    if (normMatches.length > 0) {
      matches = normMatches;
      // Use normalized full for offset mapping below
    }
  }

  // 3. Fuzzy: find best substring match (for minor source edits)
  if (matches.length === 0 && text.length >= 10) {
    const best = fuzzyFind(full, text);
    if (best) matches = [best.offset];
  }

  if (matches.length === 0) return null;

  // Pick best match using context
  let bestIdx = matches[0];
  if (matches.length > 1 && (ctxBefore || ctxAfter)) {
    for (const idx of matches) {
      const before = full.slice(Math.max(0, idx - 20), idx);
      const after = full.slice(idx + text.length, idx + text.length + 20);
      if ((ctxBefore && before.endsWith(ctxBefore)) || (ctxAfter && after.startsWith(ctxAfter))) {
        bestIdx = idx;
        break;
      }
    }
  }

  // Map back to node + offset
  const startMap = mapOffsetToNode(entries, bestIdx);

  // Check if match spans multiple nodes
  const endOffset = bestIdx + text.length;
  const endMap = mapOffsetToNode(entries, endOffset - 1);

  if (startMap.node === endMap.node) {
    // Single node match
    return { node: startMap.node, offset: startMap.offset, length: text.length };
  } else {
    // Multi-node: return range info
    return { startNode: startMap.node, startOffset: startMap.offset,
             endNode: endMap.node, endOffset: endMap.offset + 1, multiNode: true };
  }
}

function findAllOccurrences(haystack, needle) {
  const results = [];
  let idx = haystack.indexOf(needle);
  while (idx !== -1) {
    results.push(idx);
    idx = haystack.indexOf(needle, idx + 1);
  }
  return results;
}

function fuzzyFind(haystack, needle) {
  // Try progressively shorter prefixes of needle (minimum 60% length)
  const minLen = Math.max(10, Math.floor(needle.length * 0.6));
  // First try: case-insensitive exact
  const lowerH = haystack.toLowerCase();
  const lowerN = needle.toLowerCase();
  let idx = lowerH.indexOf(lowerN);
  if (idx !== -1) return { offset: idx };
  // Second: find longest matching prefix
  for (let len = needle.length - 1; len >= minLen; len--) {
    const sub = needle.slice(0, len);
    idx = haystack.indexOf(sub);
    if (idx !== -1) return { offset: idx };
  }
  // Third: find longest matching suffix
  for (let len = needle.length - 1; len >= minLen; len--) {
    const sub = needle.slice(needle.length - len);
    idx = haystack.indexOf(sub);
    if (idx !== -1) return { offset: idx };
  }
  return null;
}

function applyHighlights() {
  // Remove existing comment highlights first
  document.querySelectorAll('.commented-text').forEach(span => {
    const parent = span.parentNode;
    while (span.firstChild) parent.insertBefore(span.firstChild, span);
    parent.removeChild(span);
    parent.normalize();
  });

  for (const c of comments) {
    if (c.status === 'dismissed') continue;

    // Find section element - try exact id, then walk from closest heading
    let sectionEl = document.getElementById(c.sectionId);
    if (!sectionEl) {
      // Try to find within main
      sectionEl = document.getElementById('main');
    }
    if (!sectionEl) { c._orphaned = true; continue; }

    // Check if section is inside a hidden file-section
    const fileSec = sectionEl.closest('.file-section');
    if (fileSec && fileSec.classList.contains('hidden')) continue;

    // Get content elements: heading + following siblings until next heading
    const contentEls = /^H[1-4]$/.test(sectionEl.tagName)
      ? getSectionContentElements(sectionEl)
      : [sectionEl];
    const match = findTextInElements(contentEls, c.selectedText, c.contextBefore, c.contextAfter);
    if (!match) { c._orphaned = true; continue; }
    c._orphaned = false;

    // Wrap matched text in highlight span
    try {
      const range = document.createRange();
      if (match.multiNode) {
        range.setStart(match.startNode, match.startOffset);
        range.setEnd(match.endNode, match.endOffset);
      } else {
        range.setStart(match.node, match.offset);
        range.setEnd(match.node, match.offset + (match.length || c.selectedText.length));
      }
      const span = document.createElement('span');
      span.className = 'commented-text' + (c.status === 'resolved' ? ' resolved' : '');
      span.dataset.commentId = c.id;
      range.surroundContents(span);
    } catch(e) {
      // surroundContents fails if range crosses element boundaries in complex ways
      // Fallback: just mark the first node
      if (match.multiNode && match.startNode) {
        const sn = match.startNode;
        const so = match.startOffset;
        const r2 = document.createRange();
        r2.setStart(sn, so);
        r2.setEnd(sn, sn.textContent.length);
        const span = document.createElement('span');
        span.className = 'commented-text' + (c.status === 'resolved' ? ' resolved' : '');
        span.dataset.commentId = c.id;
        try { r2.surroundContents(span); } catch(e2) { c._orphaned = true; }
      } else {
        c._orphaned = true;
      }
    }
  }
}

// --- Selection & Creation ---
document.getElementById('main').addEventListener('mouseup', function(e) {
  // Delay slightly so selection is finalized
  setTimeout(() => handleSelection(e), 10);
});

function handleSelection(e) {
  const sel = window.getSelection();
  const floatBtn = document.getElementById('commentFloatBtn');

  if (!sel || sel.isCollapsed || sel.toString().trim().length < 3) {
    floatBtn.style.display = 'none';
    pendingSelection = null;
    return;
  }

  // Don't trigger in inputs
  const anchor = sel.anchorNode;
  if (anchor) {
    const el = anchor.nodeType === 3 ? anchor.parentElement : anchor;
    if (el.closest('input, textarea, .comment-popover, .comments-panel')) return;
  }

  const text = sel.toString().trim();
  const range = sel.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  // Get context from the surrounding text nodes
  const startNode = range.startContainer;
  const endNode = range.endContainer;
  const ctxBefore = startNode.textContent.slice(Math.max(0, range.startOffset - 20), range.startOffset);
  const afterStart = range.endOffset;
  const ctxAfter = endNode.textContent.slice(afterStart, afterStart + 20);

  // Find section
  const sectionId = findClosestHeadingId(range.startContainer) || 'unknown';
  const sourceFile = getSourceForSection(sectionId);

  pendingSelection = { text, contextBefore: ctxBefore, contextAfter: ctxAfter, sectionId, sourceFile, range };

  // Position float button
  floatBtn.style.display = 'block';
  floatBtn.style.left = (rect.left + window.scrollX + rect.width / 2 - 40) + 'px';
  floatBtn.style.top = (rect.bottom + window.scrollY + 4) + 'px';
}

function showCreatePopover() {
  if (!pendingSelection) return;
  const popover = document.getElementById('commentPopover');
  const floatBtn = document.getElementById('commentFloatBtn');
  floatBtn.style.display = 'none';

  const preview = pendingSelection.text.length > 60
    ? pendingSelection.text.slice(0, 57) + '...'
    : pendingSelection.text;

  popover.innerHTML = `
    <div class="popover-selected">"${escHtml(preview)}"</div>
    <textarea id="commentInput" placeholder="Your comment..."></textarea>
    <div class="popover-actions">
      <button onclick="closePopover()">Cancel</button>
      <button class="primary" onclick="saveNewComment()">Save</button>
    </div>
  `;

  // Position near selection
  const rect = pendingSelection.range.getBoundingClientRect();
  popover.style.display = 'block';
  let left = rect.left + window.scrollX;
  let top = rect.bottom + window.scrollY + 8;
  // Clamp to viewport
  if (left + 320 > window.innerWidth) left = window.innerWidth - 330;
  if (left < 10) left = 10;
  popover.style.left = left + 'px';
  popover.style.top = top + 'px';

  setTimeout(() => document.getElementById('commentInput').focus(), 50);
}

function saveNewComment() {
  if (!pendingSelection) return;
  const input = document.getElementById('commentInput');
  const text = input ? input.value.trim() : '';
  if (!text) return;

  const c = {
    id: generateId(),
    selectedText: pendingSelection.text,
    contextBefore: pendingSelection.contextBefore,
    contextAfter: pendingSelection.contextAfter,
    comment: text,
    sectionId: pendingSelection.sectionId,
    sourceFile: pendingSelection.sourceFile,
    status: 'open',
    resolution: null,
    createdAt: new Date().toISOString(),
    resolvedAt: null
  };
  comments.push(c);
  saveComments();
  closePopover();
  window.getSelection().removeAllRanges();
  applyHighlights();
  renderCommentsPanel();
}

// --- Hover: show popover card ---
let _hoverTimeout = null;
document.getElementById('main').addEventListener('mouseover', function(e) {
  const span = e.target.closest('.commented-text');
  if (!span) return;
  clearTimeout(_hoverTimeout);
  const cid = span.dataset.commentId;
  const c = comments.find(x => x.id === cid);
  if (!c) return;
  _hoverTimeout = setTimeout(() => showViewPopover(c, span), 200);
});
document.getElementById('main').addEventListener('mouseout', function(e) {
  const span = e.target.closest('.commented-text');
  if (!span) return;
  clearTimeout(_hoverTimeout);
  // Hide popover after a short delay (unless mouse enters popover)
  _hoverTimeout = setTimeout(() => {
    const popover = document.getElementById('commentPopover');
    if (!popover.matches(':hover')) closePopover();
  }, 300);
});
// Keep popover open while hovering it
document.getElementById('commentPopover').addEventListener('mouseenter', function() {
  clearTimeout(_hoverTimeout);
});
document.getElementById('commentPopover').addEventListener('mouseleave', function() {
  _hoverTimeout = setTimeout(closePopover, 300);
});

// --- Click: open panel ---
document.getElementById('main').addEventListener('click', function(e) {
  const span = e.target.closest('.commented-text');
  if (!span) return;
  const panel = document.getElementById('commentsPanel');
  panel.classList.add('open');
  renderCommentsPanel();
});

function showViewPopover(c, span) {
  const popover = document.getElementById('commentPopover');
  const rect = span.getBoundingClientRect();

  let actions = '';
  if (c.status === 'open') {
    actions = `
      <button onclick="editComment('${c.id}')">Edit</button>
      <button onclick="deleteComment('${c.id}')">Delete</button>
    `;
  } else if (c.status === 'resolved') {
    actions = `
      <button onclick="reopenComment('${c.id}')">Reopen</button>
      <button class="primary" onclick="dismissComment('${c.id}')">Dismiss</button>
    `;
  }

  const resolutionHtml = c.resolution
    ? `<div class="resolution-note"><strong>Resolution:</strong> ${escHtml(c.resolution)}</div>`
    : '';

  popover.innerHTML = `
    <div class="popover-selected">"${escHtml(c.selectedText.slice(0, 60))}"</div>
    <div style="margin:6px 0;font-size:12px;">${escHtml(c.comment)}</div>
    ${resolutionHtml}
    <div class="comment-meta">${c.status} &middot; ${new Date(c.createdAt).toLocaleDateString()}</div>
    <div class="popover-actions">${actions}</div>
  `;

  popover.style.display = 'block';
  let left = rect.left + window.scrollX;
  let top = rect.bottom + window.scrollY + 8;
  if (left + 320 > window.innerWidth) left = window.innerWidth - 330;
  if (left < 10) left = 10;
  popover.style.left = left + 'px';
  popover.style.top = top + 'px';
}

function editComment(id) {
  const c = comments.find(x => x.id === id);
  if (!c) return;
  const popover = document.getElementById('commentPopover');
  popover.innerHTML = `
    <div class="popover-selected">"${escHtml(c.selectedText.slice(0, 60))}"</div>
    <textarea id="commentInput">${escHtml(c.comment)}</textarea>
    <div class="popover-actions">
      <button onclick="closePopover()">Cancel</button>
      <button class="primary" onclick="saveEditComment('${c.id}')">Save</button>
    </div>
  `;
  setTimeout(() => document.getElementById('commentInput').focus(), 50);
}

function saveEditComment(id) {
  const c = comments.find(x => x.id === id);
  if (!c) return;
  const input = document.getElementById('commentInput');
  if (input) c.comment = input.value.trim();
  saveComments();
  closePopover();
  renderCommentsPanel();
}

function deleteComment(id) {
  comments = comments.filter(x => x.id !== id);
  saveComments();
  closePopover();
  applyHighlights();
  renderCommentsPanel();
}

function reopenComment(id) {
  const c = comments.find(x => x.id === id);
  if (!c) return;
  c.status = 'open';
  c._userReopened = true;
  c.resolution = null;
  c.resolvedAt = null;
  saveComments();
  closePopover();
  applyHighlights();
  renderCommentsPanel();
}

function dismissComment(id) {
  const c = comments.find(x => x.id === id);
  if (!c) return;
  c.status = 'dismissed';
  saveComments();
  closePopover();
  applyHighlights();
  renderCommentsPanel();
}

function closePopover() {
  const popover = document.getElementById('commentPopover');
  popover.style.display = 'none';
  popover.innerHTML = '';
  const floatBtn = document.getElementById('commentFloatBtn');
  floatBtn.style.display = 'none';
  pendingSelection = null;
}

function escHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

// --- Comments Panel ---
function toggleCommentsPanel() {
  document.getElementById('commentsPanel').classList.toggle('open');
  renderCommentsPanel();
}

function renderCommentsPanel() {
  const panel = document.getElementById('commentsPanel');
  const active = comments.filter(c => c.status !== 'dismissed');

  let html = `
    <div class="comments-panel-header">
      <h3>Comments</h3>
      <span id="syncIndicator" class="sync-indicator"></span>
    </div>
  `;

  if (active.length === 0) {
    html += '<p style="color:var(--text-muted);font-size:12px;">No comments yet. Select text and press <kbd>c</kbd> or click "+ Comment" to add one.</p>';
    panel.innerHTML = html;
    return;
  }

  // Orphaned first
  const orphaned = active.filter(c => c._orphaned);
  if (orphaned.length > 0) {
    html += '<div class="panel-group-label">Orphaned</div>';
    for (const c of orphaned) html += renderPanelComment(c, 'orphaned');
  }

  // Group by sourceFile
  const grouped = {};
  for (const c of active.filter(x => !x._orphaned)) {
    const key = c.sourceFile || 'UNKNOWN';
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(c);
  }
  for (const [src, items] of Object.entries(grouped)) {
    html += `<div class="panel-group-label">${escHtml(src)}</div>`;
    for (const c of items) html += renderPanelComment(c, c.status);
  }

  panel.innerHTML = html;
}

function renderPanelComment(c, statusClass) {
  const pill = statusClass === 'orphaned' ? 'pill-orphaned'
    : c.status === 'resolved' ? 'pill-resolved' : 'pill-open';
  const label = statusClass === 'orphaned' ? 'orphaned' : c.status;

  let actions = '';
  if (c.status === 'open' || statusClass === 'orphaned') {
    actions = `<span class="panel-action" onclick="event.stopPropagation();editCommentFromPanel('${c.id}')">Edit</span>
      <span class="panel-action panel-action-danger" onclick="event.stopPropagation();deleteComment('${c.id}')">Delete</span>`;
  } else if (c.status === 'resolved') {
    actions = `<span class="panel-action" onclick="event.stopPropagation();reopenComment('${c.id}')">Reopen</span>
      <span class="panel-action" onclick="event.stopPropagation();dismissComment('${c.id}')">Dismiss</span>`;
  }

  return `
    <div class="panel-comment status-${statusClass}" onclick="scrollToComment('${c.id}')">
      <div class="panel-selected-text">"${escHtml(c.selectedText.slice(0, 50))}"</div>
      <div class="panel-comment-text">${escHtml(c.comment)}</div>
      <div class="panel-comment-footer">
        <span class="panel-status ${pill}">${label}</span>
        <span class="panel-actions">${actions}</span>
      </div>
    </div>
  `;
}

function editCommentFromPanel(id) {
  const c = comments.find(x => x.id === id);
  if (!c) return;
  // Show edit inline in panel
  const panel = document.getElementById('commentsPanel');
  const entry = event.target.closest('.panel-comment');
  if (!entry) return;
  entry.innerHTML = `
    <div class="panel-selected-text">"${escHtml(c.selectedText.slice(0, 50))}"</div>
    <textarea id="panelEditInput" style="width:100%;min-height:50px;padding:4px 6px;border:1px solid var(--border);border-radius:3px;font-family:inherit;font-size:11px;resize:vertical;margin:4px 0;">${escHtml(c.comment)}</textarea>
    <div style="display:flex;gap:4px;justify-content:flex-end;">
      <button onclick="renderCommentsPanel()" style="padding:2px 8px;border:1px solid var(--border);border-radius:3px;font-size:10px;cursor:pointer;background:var(--bg);">Cancel</button>
      <button onclick="savePanelEdit('${c.id}')" style="padding:2px 8px;border:1px solid var(--heading);border-radius:3px;font-size:10px;cursor:pointer;background:var(--heading);color:#f5f0eb;">Save</button>
    </div>
  `;
  entry.onclick = null;
  const ta = document.getElementById('panelEditInput');
  if (ta) ta.focus();
}

function savePanelEdit(id) {
  const c = comments.find(x => x.id === id);
  if (!c) return;
  const ta = document.getElementById('panelEditInput');
  if (ta && ta.value.trim()) c.comment = ta.value.trim();
  saveComments();
  renderCommentsPanel();
}

function scrollToComment(id) {
  const span = document.querySelector(`.commented-text[data-comment-id="${id}"]`);
  if (span) {
    span.scrollIntoView({ behavior: 'smooth', block: 'center' });
    span.style.outline = '2px solid var(--accent)';
    span.style.outlineOffset = '2px';
    setTimeout(() => { span.style.outline = ''; span.style.outlineOffset = ''; }, 2000);
    return;
  }
  // Fallback: scroll to section heading for orphaned comments
  const c = comments.find(x => x.id === id);
  if (c && c.sectionId) {
    const heading = document.getElementById(c.sectionId);
    if (heading) heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// --- Hot Reload (dev server mode) ---
let _hotReloadVersion = 0;
function pollForReload() {
  fetch('/api/version').then(r => r.json()).then(data => {
    if (_hotReloadVersion === 0) {
      _hotReloadVersion = data.v;
    } else if (data.v > _hotReloadVersion) {
      // Save scroll position, reload
      sessionStorage.setItem('mondas-scroll-y', window.scrollY);
      location.reload();
    }
    setTimeout(pollForReload, 1000);
  }).catch(() => {
    // Server not running — stop polling
    setTimeout(pollForReload, 5000);
  });
}
pollForReload();

// Restore scroll position after hot reload
const savedScroll = sessionStorage.getItem('mondas-scroll-y');
if (savedScroll) {
  sessionStorage.removeItem('mondas-scroll-y');
  setTimeout(() => window.scrollTo(0, parseInt(savedScroll)), 100);
}

// --- Keyboard: 'c' for comment ---
document.addEventListener('keydown', function(e) {
  if (e.key === 'c' && !e.ctrlKey && !e.metaKey && !e.altKey) {
    const el = document.activeElement;
    if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return;
    const sel = window.getSelection();
    if (sel && !sel.isCollapsed && sel.toString().trim().length >= 3) {
      e.preventDefault();
      // Trigger selection capture then show popover
      handleSelection(e);
      if (pendingSelection) showCreatePopover();
    }
  }
  if (e.key === 'Escape') {
    const popover = document.getElementById('commentPopover');
    if (popover.style.display === 'block') {
      closePopover();
      e.stopPropagation();
    }
    const panel = document.getElementById('commentsPanel');
    if (panel.classList.contains('open')) {
      panel.classList.remove('open');
    }
  }
});

// Close panel on outside click
document.addEventListener('mousedown', function(e) {
  const popover = document.getElementById('commentPopover');
  if (popover.style.display === 'block' && !popover.contains(e.target) && !e.target.closest('.commented-text') && !e.target.closest('.comment-float-btn')) {
    closePopover();
  }
  const panel = document.getElementById('commentsPanel');
  if (panel.classList.contains('open') && !panel.contains(e.target) && !e.target.closest('.comment-toggle-btn') && !e.target.closest('.commented-text')) {
    panel.classList.remove('open');
  }
});

// Re-apply highlights when filters change
const origApplyFilters = applyFilters;
applyFilters = function() {
  origApplyFilters();
  applyHighlights();
};

// --- Server sync: poll for Claude's resolutions ---
let _serverAvailable = false;
function pollServerComments() {
  fetch('/api/comments').then(r => r.json()).then(serverComments => {
    _serverAvailable = true;
    if (!serverComments || serverComments.length === 0) {
      setTimeout(pollServerComments, 3000);
      return;
    }
    const byId = {};
    for (const c of comments) byId[c.id] = c;
    let changed = false;
    for (const c of serverComments) {
      if (!byId[c.id]) {
        // New comment from server (e.g. Claude added one)
        byId[c.id] = c;
        changed = true;
      } else {
        const local = byId[c.id];
        // Server status/resolution always wins unless user explicitly reopened
        if (c.status !== local.status && !local._userReopened) {
          local.status = c.status;
          changed = true;
        }
        if (c.resolution !== local.resolution) {
          local.resolution = c.resolution;
          local.resolvedAt = c.resolvedAt;
          changed = true;
        }
        // Clear reopen flag if server also says open (Claude acknowledged)
        if (c.status === 'open' && local._userReopened) {
          delete local._userReopened;
        }
      }
    }
    if (changed) {
      comments = Object.values(byId);
      comments.sort((a, b) => (a.createdAt || '').localeCompare(b.createdAt || ''));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
      applyHighlights();
      updateBadge();
      if (document.getElementById('commentsPanel').classList.contains('open')) {
        renderCommentsPanel();
      }
    }
    setTimeout(pollServerComments, 3000);
  }).catch(() => {
    setTimeout(pollServerComments, 5000);
  });
}

// --- Init ---
function initComments() {
  loadComments();
  applyHighlights();
  updateBadge();
  pollServerComments();
}
initComments();
</script>
</body>
</html>
'''

# ---------------------------------------------------------------------------
# Dev Server
# ---------------------------------------------------------------------------

def serve(port=8919):
    import http.server
    import socketserver
    import threading
    import time

    build_version = [1]  # mutable so threads can share
    file_mtimes = {}

    def get_mtimes():
        mtimes = {}
        for fname in SOURCE_FILES:
            fpath = RULES_DIR / fname
            if fpath.exists():
                mtimes[str(fpath)] = fpath.stat().st_mtime
        return mtimes

    file_mtimes.update(get_mtimes())

    class Handler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=str(OUTPUT_FILE.parent), **kwargs)

        def do_GET(self):
            if self.path == '/api/comments':
                data = load_comments()
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps(data).encode())
            elif self.path == '/api/version':
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'v': build_version[0]}).encode())
            else:
                super().do_GET()

        def do_POST(self):
            if self.path == '/api/comments':
                length = int(self.headers.get('Content-Length', 0))
                body = self.rfile.read(length)
                try:
                    data = json.loads(body)
                    out = {'version': 1, 'comments': data if isinstance(data, list) else data.get('comments', [])}
                    COMMENTS_FILE.write_text(json.dumps(out, indent=2), encoding='utf-8')
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(b'{"ok":true}')
                except Exception as e:
                    self.send_response(400)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({'error': str(e)}).encode())
            else:
                self.send_response(404)
                self.end_headers()

        def do_OPTIONS(self):
            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()

        def log_message(self, format, *args):
            # Suppress routine request logs, only show errors
            if args and '404' in str(args[0]):
                super().log_message(format, *args)

    def watch_and_rebuild():
        nonlocal file_mtimes
        while True:
            time.sleep(1)
            new_mtimes = get_mtimes()
            if new_mtimes != file_mtimes:
                changed = [p for p in new_mtimes if new_mtimes.get(p) != file_mtimes.get(p)]
                print(f"\n  Changed: {', '.join(Path(p).name for p in changed)}")
                file_mtimes.update(new_mtimes)
                try:
                    build()
                    build_version[0] += 1
                    print(f"  Build v{build_version[0]} ready — browser will reload")
                except Exception as e:
                    print(f"  Build error: {e}")

    # Initial build
    build()

    # Start file watcher
    watcher = threading.Thread(target=watch_and_rebuild, daemon=True)
    watcher.start()

    # Start server
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", port), Handler) as httpd:
        print(f"\n  Dev server: http://localhost:{port}/rules-reader.html")
        print(f"  Watching rules/*.md for changes (auto-rebuild + hot-reload)")
        print(f"  Comments auto-save to tools/comments.json")
        print(f"  Ctrl+C to stop\n")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n  Server stopped.")

if __name__ == '__main__':
    import sys
    if '--serve' in sys.argv:
        port = 8919
        for arg in sys.argv:
            if arg.startswith('--port='):
                port = int(arg.split('=')[1])
        serve(port)
    else:
        build()
