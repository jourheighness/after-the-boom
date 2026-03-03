/**
 * Block-level ProseMirror document diff.
 * Compares two documents at the top-level block boundary,
 * finds the minimal differing range, and applies it as a
 * single transaction — preserving cursor, undo history, and scroll.
 */

/**
 * Compare two ProseMirror docs by their top-level children.
 * Returns the range in the old doc to replace and the slice from the new doc,
 * or null if the documents are identical.
 */
export function computeBlockDiff(
  oldDoc: any,
  newDoc: any,
): { from: number; to: number; slice: any } | null {
  const oldCount = oldDoc.childCount;
  const newCount = newDoc.childCount;

  // Find first differing block from the start
  let startIdx = 0;
  while (
    startIdx < oldCount &&
    startIdx < newCount &&
    oldDoc.child(startIdx).eq(newDoc.child(startIdx))
  ) {
    startIdx++;
  }

  // Find last differing block from the end
  let oldEndIdx = oldCount;
  let newEndIdx = newCount;
  while (
    oldEndIdx > startIdx &&
    newEndIdx > startIdx &&
    oldDoc.child(oldEndIdx - 1).eq(newDoc.child(newEndIdx - 1))
  ) {
    oldEndIdx--;
    newEndIdx--;
  }

  // Identical documents
  if (startIdx === oldEndIdx && startIdx === newEndIdx) return null;

  // Compute position range in old doc
  let from = 0;
  for (let i = 0; i < startIdx; i++) from += oldDoc.child(i).nodeSize;
  let to = from;
  for (let i = startIdx; i < oldEndIdx; i++) to += oldDoc.child(i).nodeSize;

  // Compute position range in new doc for the replacement slice
  let newFrom = 0;
  for (let i = 0; i < startIdx; i++) newFrom += newDoc.child(i).nodeSize;
  let newTo = newFrom;
  for (let i = startIdx; i < newEndIdx; i++) newTo += newDoc.child(i).nodeSize;

  return { from, to, slice: newDoc.slice(newFrom, newTo) };
}

/**
 * Apply merged markdown content to an editor using minimal block-level diffs.
 * Preserves cursor position, undo history, selection, and scroll.
 *
 * @param ctx - Milkdown editor context (from editor.action callback)
 * @param mergedMarkdown - The merged markdown string to apply
 * @param parserCtx - Milkdown's parserCtx slice key
 * @param editorViewCtx - Milkdown's editorViewCtx slice key
 * @returns true if changes were applied, false if docs were identical
 */
export function applyMergedContent(
  ctx: any,
  mergedMarkdown: string,
  parserCtx: any,
  editorViewCtx: any,
): boolean {
  const parser = ctx.get(parserCtx);
  const view = ctx.get(editorViewCtx);
  const oldDoc = view.state.doc;
  const newDoc = parser(mergedMarkdown);

  const diff = computeBlockDiff(oldDoc, newDoc);
  if (!diff) return false;

  const tr = view.state.tr.replace(diff.from, diff.to, diff.slice);
  view.dispatch(tr);
  return true;
}
