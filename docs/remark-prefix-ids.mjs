/**
 * Remark plugin that prefixes all heading IDs with the source filename.
 * This prevents ID collisions when multiple markdown files are rendered
 * on the same page (e.g., both CORE.md and MAGIC.md have "Quick Reference").
 */
import { visit } from 'unist-util-visit';

/** @type {() => import('unified').Plugin} */
export default function remarkPrefixIds() {
  return (tree, file) => {
    // Extract source name from the file path
    const filePath = file.history?.[0] || file.path || '';
    const match = filePath.match(/([^/]+)\.md$/i);
    if (!match) return;
    const prefix = match[1].toLowerCase();

    const seen = new Map();

    visit(tree, 'heading', (node) => {
      if (!node.data) node.data = {};
      if (!node.data.hProperties) node.data.hProperties = {};

      let id;
      if (node.data.hProperties.id) {
        id = `${prefix}-${node.data.hProperties.id}`;
      } else {
        const text = getTextContent(node);
        const slug = slugify(text);
        id = `${prefix}-${slug}`;
      }

      // Deduplicate: append -1, -2, etc. for repeated IDs
      const count = seen.get(id) || 0;
      seen.set(id, count + 1);
      if (count > 0) id = `${id}-${count}`;

      node.data.hProperties.id = id;

      if (node.position?.start?.line) {
        node.data.hProperties['data-line'] = node.position.start.line;
      }
    });
  };
}

function getTextContent(node) {
  if (node.type === 'text') return node.value;
  if (node.children) return node.children.map(getTextContent).join('');
  return '';
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
