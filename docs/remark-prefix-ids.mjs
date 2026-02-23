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

    visit(tree, 'heading', (node) => {
      if (!node.data) node.data = {};
      if (!node.data.hProperties) node.data.hProperties = {};

      if (node.data.hProperties.id) {
        node.data.hProperties.id = `${prefix}-${node.data.hProperties.id}`;
      } else {
        const text = getTextContent(node);
        const slug = slugify(text);
        node.data.hProperties.id = `${prefix}-${slug}`;
      }

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
