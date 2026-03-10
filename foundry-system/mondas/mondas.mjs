// mondas.mjs — MONDAS system entry point
import { CharacterData } from "./module/data-models/character.mjs";
import { MondasCharacterSheet } from "./module/sheets/character-sheet.mjs";
import { registerHandlebarsHelpers } from "./module/helpers/handlebars.mjs";
import { bindRollCard } from "./module/rolls/chat-gambits.mjs";

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

  // Preload Handlebars templates
  loadTemplates([
    "systems/mondas/templates/actor/header.hbs",
    "systems/mondas/templates/actor/tabs.hbs",
    "systems/mondas/templates/actor/sheet.hbs",
    "systems/mondas/templates/actor/notes.hbs",
    "systems/mondas/templates/rolls/roll-dialog.hbs",
    "systems/mondas/templates/rolls/roll-chat.hbs",
    "systems/mondas/templates/dialogs/add-edge.hbs",
    "systems/mondas/templates/dialogs/add-weapon.hbs",
    "systems/mondas/templates/dialogs/add-equipment.hbs",
  ]);
});

Hooks.on("renderChatMessage", (message, html) => {
  const el = html instanceof HTMLElement ? html : html[0] ?? html;
  bindRollCard(message, el);
});
