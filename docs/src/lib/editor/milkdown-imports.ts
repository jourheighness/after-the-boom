/**
 * Lazily-loaded Milkdown imports — cached after first editor mounts.
 * Avoids pulling heavy ProseMirror modules into the initial bundle.
 */

export interface MilkdownImports {
  commandsCtx: any;
  editorViewCtx: any;
  parserCtx: any;
  turnIntoTextCommand: any;
  wrapInHeadingCommand: any;
  headingSchema: any;
  // Block conversion
  clearTextInCurrentBlockCommand: any;
  setBlockTypeCommand: any;
  wrapInBlockTypeCommand: any;
  addBlockTypeCommand: any;
  // ProseMirror lift (unwrap from wrapper nodes)
  lift: any;
  // Schema types for block detection
  paragraphSchema: any;
  blockquoteSchema: any;
  codeBlockSchema: any;
  bulletListSchema: any;
  orderedListSchema: any;
  hrSchema: any;
  listItemSchema: any;
}

let mk: MilkdownImports | null = null;

export function getMk(): MilkdownImports | null {
  return mk;
}

export async function ensureMilkdownImports(): Promise<MilkdownImports> {
  if (mk) return mk;
  const [cm, core, proseCmd] = await Promise.all([
    import('@milkdown/kit/preset/commonmark'),
    import('@milkdown/kit/core'),
    import('@milkdown/kit/prose/commands'),
  ]);
  mk = {
    commandsCtx: core.commandsCtx,
    editorViewCtx: core.editorViewCtx,
    parserCtx: core.parserCtx,
    turnIntoTextCommand: cm.turnIntoTextCommand,
    wrapInHeadingCommand: cm.wrapInHeadingCommand,
    headingSchema: cm.headingSchema,
    clearTextInCurrentBlockCommand: cm.clearTextInCurrentBlockCommand,
    setBlockTypeCommand: cm.setBlockTypeCommand,
    wrapInBlockTypeCommand: cm.wrapInBlockTypeCommand,
    addBlockTypeCommand: cm.addBlockTypeCommand,
    paragraphSchema: cm.paragraphSchema,
    blockquoteSchema: cm.blockquoteSchema,
    codeBlockSchema: cm.codeBlockSchema,
    bulletListSchema: cm.bulletListSchema,
    orderedListSchema: cm.orderedListSchema,
    hrSchema: cm.hrSchema,
    listItemSchema: cm.listItemSchema,
    lift: proseCmd.lift,
  };
  return mk;
}
