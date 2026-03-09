// mondas.mjs — MONDAS system entry point
import { CharacterData } from "./module/data-models/character.mjs";
import { MondasCharacterSheet } from "./module/sheets/character-sheet.mjs";
import { registerHandlebarsHelpers } from "./module/helpers/handlebars.mjs";

Hooks.once("init", () => {
  console.log("MONDAS | Initializing After the Boom system");

  // Register data models
  Object.assign(CONFIG.Actor.dataModels, {
    character: CharacterData,
  });

  // Register sheets
  DocumentSheetConfig.registerSheet(Actor, "mondas", MondasCharacterSheet, {
    types: ["character"],
    makeDefault: true,
    label: "MONDAS.ActorType.character",
  });

  // Register Handlebars helpers
  registerHandlebarsHelpers();
});

Hooks.on("renderChatMessage", (message, html) => {
  import("./module/rolls/chat-gambits.mjs").then((m) => {
    const el = html instanceof HTMLElement ? html : html[0] ?? html;
    m.bindRollCard(message, el);
  });
});
