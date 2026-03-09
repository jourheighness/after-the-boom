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
  html.querySelectorAll(".mondas-apply-damage").forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      event.preventDefault();
      const { applyDamage } = await import("./module/rolls/damage-roll.mjs");
      const damage = Number(btn.dataset.damage);
      const targets = game.user.targets;
      if (targets.size === 0) {
        ui.notifications.warn("Select a target token first.");
        return;
      }
      for (const token of targets) {
        await applyDamage(token.actor, damage);
      }
    });
  });
});
