/**
 * Rehype plugin that adds data-line attributes to block-level HTML elements.
 * This enables the comment system to store exact source line numbers,
 * giving Claude precise file:line locations for each comment.
 */
import { visit } from 'unist-util-visit';

const BLOCK_TAGS = new Set(['p', 'table', 'ul', 'ol', 'blockquote', 'pre', 'hr', 'li']);

export default function rehypeSourceLines() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (BLOCK_TAGS.has(node.tagName) && node.position?.start?.line) {
        if (!node.properties) node.properties = {};
        node.properties['dataLine'] = node.position.start.line;
      }
    });
  };
}
