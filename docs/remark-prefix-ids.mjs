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
      // rehype-slug hasn't run yet at this point, so we need to work with
      // the hProperties that will be used by rehype-slug
      if (!node.data) node.data = {};
      if (!node.data.hProperties) node.data.hProperties = {};

      // If rehype-slug already set an id, prefix it
      if (node.data.hProperties.id) {
        node.data.hProperties.id = `${prefix}-${node.data.hProperties.id}`;
      } else {
        // Set a custom id attribute that rehype-slug will respect
        // We need to compute the slug ourselves
        const text = getTextContent(node);
        const slug = slugify(text);
        node.data.hProperties.id = `${prefix}-${slug}`;
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
