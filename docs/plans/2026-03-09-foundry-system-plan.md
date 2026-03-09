# MONDAS Foundry VTT System — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a Foundry VTT v13 custom system for After the Boom's MONDAS rules engine — character sheet with clickable stat rolls, gambit workflow, and damage pipeline.

**Architecture:** Plain ES6 modules + Handlebars + CSS. No build step. Single actor type (character) with inline arrays for edges/weapons/equipment. Roll workflow uses ApplicationV2 dialogs. Targets Foundry v13 on The Forge.

**Tech Stack:** Foundry VTT v13 API (ApplicationV2, ActorSheetV2, HandlebarsApplicationMixin, TypeDataModel), Handlebars templates, CSS

**Design doc:** `docs/plans/2026-03-09-foundry-system-design.md`

---

### Task 1: Scaffold — system.json + entry point

**Files:**
- Create: `foundry-system/mondas/system.json`
- Create: `foundry-system/mondas/mondas.mjs`
- Create: `foundry-system/mondas/lang/en.json`

**Step 1: Create system.json**

```json
{
  "id": "mondas",
  "title": "MONDAS — After the Boom",
  "description": "Custom system for the MONDAS Core Rules Engine. D6 dice pools, gambits, guard/drain economy.",
  "version": "0.1.0",
  "compatibility": {
    "minimum": "13",
    "verified": "13.341"
  },
  "authors": [
    {
      "name": "Johannes",
      "flags": {}
    }
  ],
  "esmodules": ["mondas.mjs"],
  "styles": ["styles/mondas.css"],
  "languages": [
    {
      "lang": "en",
      "name": "English",
      "path": "lang/en.json"
    }
  ],
  "documentTypes": {
    "Actor": {
      "character": {}
    },
    "Item": {}
  },
  "grid": {
    "type": 1,
    "distance": 5,
    "units": "ft"
  },
  "primaryTokenAttribute": "guard",
  "secondaryTokenAttribute": "drain"
}
```

**Step 2: Create lang/en.json**

```json
{
  "MONDAS.ActorType.character": "Character",
  "MONDAS.Stat.grit": "Grit",
  "MONDAS.Stat.sharp": "Sharp",
  "MONDAS.Stat.nerve": "Nerve",
  "MONDAS.Guard": "Guard",
  "MONDAS.Drain": "Drain",
  "MONDAS.Armor": "Armor",
  "MONDAS.Harm.hurt": "Hurt",
  "MONDAS.Harm.wounded": "Wounded",
  "MONDAS.Harm.critical": "Critical",
  "MONDAS.Condition.stunned": "Stunned",
  "MONDAS.Condition.shaken": "Shaken",
  "MONDAS.Condition.prone": "Prone",
  "MONDAS.Roll.stakes": "Stakes Roll",
  "MONDAS.Roll.combat": "Combat Roll",
  "MONDAS.Roll.fullSuccess": "Full Success",
  "MONDAS.Roll.partial": "Partial — Cost",
  "MONDAS.Roll.consequence": "Consequence",
  "MONDAS.Boon": "Boon",
  "MONDAS.Snag": "Snag",
  "MONDAS.Gambit": "Gambit",
  "MONDAS.SpendDrain": "Spend Drain (+1d)",
  "MONDAS.Edge.effect.boon": "Boon",
  "MONDAS.Edge.effect.gambit": "Gambit",
  "MONDAS.Edge.effect.thaumic": "Thaumic",
  "MONDAS.Edge.effect.narrative": "Narrative",
  "MONDAS.Weapon.die.d6": "d6 (Light)",
  "MONDAS.Weapon.die.d8": "d8 (Standard)",
  "MONDAS.Weapon.die.d10": "d10 (Heavy)",
  "MONDAS.Weapon.die.d12": "d12 (Devastating)",
  "MONDAS.Weapon.property.ranged": "Ranged",
  "MONDAS.Weapon.property.sidearm": "Sidearm",
  "MONDAS.Weapon.property.thrown": "Thrown",
  "MONDAS.Weapon.property.area": "Area",
  "MONDAS.Weapon.property.long": "Long",
  "MONDAS.Weapon.property.loud": "Loud",
  "MONDAS.Weapon.property.brutal": "Brutal",
  "MONDAS.Weapon.property.subtle": "Subtle",
  "MONDAS.Weapon.property.slow": "Slow",
  "MONDAS.AddEdge": "+ Add Edge",
  "MONDAS.AddWeapon": "+ Add Weapon",
  "MONDAS.AddEquipment": "+ Add Equipment",
  "MONDAS.ApplyDamage": "Apply Damage",
  "MONDAS.Scars": "Scars",
  "MONDAS.Background": "Background",
  "TYPES": {
    "Actor": {
      "character": "Character"
    }
  }
}
```

**Step 3: Create mondas.mjs entry point**

```javascript
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
```

**Step 4: Create empty CSS file**

Create `foundry-system/mondas/styles/mondas.css` with a comment placeholder.

**Step 5: Commit**

```bash
git add foundry-system/
git commit -m "feat(foundry): scaffold mondas system — manifest, entry point, i18n"
```

---

### Task 2: Character data model

**Files:**
- Create: `foundry-system/mondas/module/data-models/character.mjs`

**Step 1: Implement CharacterData**

```javascript
const fields = foundry.data.fields;

function harmSlot() {
  return new fields.SchemaField({
    filled: new fields.BooleanField({ initial: false }),
    text: new fields.StringField({ initial: "" }),
  });
}

export class CharacterData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      // Stats (1-4, sum = 6)
      stats: new fields.SchemaField({
        grit: new fields.NumberField({ required: true, initial: 1, min: 1, max: 4, integer: true }),
        sharp: new fields.NumberField({ required: true, initial: 1, min: 1, max: 4, integer: true }),
        nerve: new fields.NumberField({ required: true, initial: 1, min: 1, max: 4, integer: true }),
      }),

      // Guard
      guard: new fields.SchemaField({
        value: new fields.NumberField({ required: true, initial: 4, min: 0, integer: true }),
        max: new fields.NumberField({ required: true, initial: 4, min: 0, max: 10, integer: true }),
      }),

      // Drain (4 boxes)
      drain: new fields.SchemaField({
        value: new fields.NumberField({ required: true, initial: 4, min: 0, max: 4, integer: true }),
      }),

      // Harm tracks (2 slots each)
      harm: new fields.SchemaField({
        hurt: new fields.SchemaField({ slot1: harmSlot(), slot2: harmSlot() }),
        wounded: new fields.SchemaField({ slot1: harmSlot(), slot2: harmSlot() }),
        critical: new fields.SchemaField({ slot1: harmSlot(), slot2: harmSlot() }),
      }),

      // Conditions
      conditions: new fields.SchemaField({
        stunned: new fields.BooleanField({ initial: false }),
        shaken: new fields.BooleanField({ initial: false }),
        prone: new fields.BooleanField({ initial: false }),
      }),

      // Armor
      armor: new fields.NumberField({ required: true, initial: 0, min: 0, max: 3, integer: true }),

      // Scars
      scars: new fields.NumberField({ required: true, initial: 0, min: 0, integer: true }),

      // Background
      background: new fields.StringField({ initial: "" }),

      // Edges — inline array
      edges: new fields.ArrayField(new fields.SchemaField({
        name: new fields.StringField({ initial: "" }),
        description: new fields.StringField({ initial: "" }),
        effect: new fields.StringField({ initial: "boon", choices: ["boon", "gambit", "thaumic", "narrative"] }),
      })),

      // Weapons — inline array
      weapons: new fields.ArrayField(new fields.SchemaField({
        name: new fields.StringField({ initial: "" }),
        description: new fields.StringField({ initial: "" }),
        die: new fields.StringField({ initial: "d8", choices: ["d6", "d8", "d10", "d12"] }),
        properties: new fields.ArrayField(new fields.StringField({
          choices: ["ranged", "sidearm", "thrown", "area", "long", "loud", "brutal", "subtle", "slow"],
        })),
      })),

      // Equipment — inline array
      equipment: new fields.ArrayField(new fields.SchemaField({
        name: new fields.StringField({ initial: "" }),
        description: new fields.StringField({ initial: "" }),
        quantity: new fields.NumberField({ initial: 1, min: 0, integer: true }),
      })),
    };
  }

  /** Derived data: guard max, cracked state */
  prepareDerivedData() {
    const stats = this.stats;
    const highestStat = Math.max(stats.grit, stats.sharp, stats.nerve);
    this.guard.max = 2 + highestStat + this.scars;
    this.cracked = this.drain.value === 0;
  }
}
```

**Step 2: Commit**

```bash
git add foundry-system/mondas/module/data-models/
git commit -m "feat(foundry): character data model — stats, guard, drain, harm, edges, weapons, equipment"
```

---

### Task 3: Handlebars helpers

**Files:**
- Create: `foundry-system/mondas/module/helpers/handlebars.mjs`

**Step 1: Implement helpers**

```javascript
export function registerHandlebarsHelpers() {
  // Repeat a block N times
  Handlebars.registerHelper("times", function (n, block) {
    let result = "";
    for (let i = 0; i < n; i++) {
      result += block.fn(i);
    }
    return result;
  });

  // Check equality
  Handlebars.registerHelper("eq", function (a, b) {
    return a === b;
  });

  // Check if array includes value
  Handlebars.registerHelper("includes", function (arr, val) {
    return Array.isArray(arr) && arr.includes(val);
  });

  // Localize an edge effect
  Handlebars.registerHelper("effectLabel", function (key) {
    return game.i18n.localize(`MONDAS.Edge.effect.${key}`);
  });

  // Localize a weapon die
  Handlebars.registerHelper("dieLabel", function (key) {
    return game.i18n.localize(`MONDAS.Weapon.die.${key}`);
  });

  // Localize a weapon property
  Handlebars.registerHelper("propertyLabel", function (key) {
    return game.i18n.localize(`MONDAS.Weapon.property.${key}`);
  });

  // Subtract
  Handlebars.registerHelper("subtract", function (a, b) {
    return a - b;
  });
}
```

**Step 2: Commit**

```bash
git add foundry-system/mondas/module/helpers/
git commit -m "feat(foundry): handlebars helpers — times, eq, includes, label helpers"
```

---

### Task 4: Character sheet class

**Files:**
- Create: `foundry-system/mondas/module/sheets/character-sheet.mjs`

**Step 1: Implement MondasCharacterSheet**

```javascript
const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;

export class MondasCharacterSheet extends HandlebarsApplicationMixin(ActorSheetV2) {

  static DEFAULT_OPTIONS = {
    classes: ["mondas", "sheet", "actor", "character"],
    position: { width: 680, height: 720 },
    actions: {
      rollStat: MondasCharacterSheet.#onRollStat,
      addEdge: MondasCharacterSheet.#onAddEdge,
      removeEdge: MondasCharacterSheet.#onRemoveEdge,
      addWeapon: MondasCharacterSheet.#onAddWeapon,
      removeWeapon: MondasCharacterSheet.#onRemoveWeapon,
      addEquipment: MondasCharacterSheet.#onAddEquipment,
      removeEquipment: MondasCharacterSheet.#onRemoveEquipment,
      toggleHarm: MondasCharacterSheet.#onToggleHarm,
      toggleCondition: MondasCharacterSheet.#onToggleCondition,
      adjustGuard: MondasCharacterSheet.#onAdjustGuard,
      adjustDrain: MondasCharacterSheet.#onAdjustDrain,
    },
    form: {
      submitOnChange: true,
    },
    window: {
      resizable: true,
    },
  };

  static PARTS = {
    sheet: {
      template: "systems/mondas/templates/actor/character.hbs",
    },
  };

  /** Prepare data for rendering */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const system = this.actor.system;

    context.system = system;
    context.systemFields = system.schema.fields;

    // Stat data for clickable blocks
    context.stats = ["grit", "sharp", "nerve"].map((key) => ({
      key,
      label: game.i18n.localize(`MONDAS.Stat.${key}`),
      value: system.stats[key],
    }));

    // Guard/Drain display
    context.guard = system.guard;
    context.drain = system.drain;
    context.cracked = system.cracked;
    context.armor = system.armor;
    context.scars = system.scars;

    // Harm
    context.harm = system.harm;
    context.conditions = system.conditions;

    // Lists
    context.edges = system.edges;
    context.weapons = system.weapons;
    context.equipment = system.equipment;

    // Dropdown options
    context.effectOptions = {
      boon: game.i18n.localize("MONDAS.Edge.effect.boon"),
      gambit: game.i18n.localize("MONDAS.Edge.effect.gambit"),
      thaumic: game.i18n.localize("MONDAS.Edge.effect.thaumic"),
      narrative: game.i18n.localize("MONDAS.Edge.effect.narrative"),
    };

    context.dieOptions = {
      d6: game.i18n.localize("MONDAS.Weapon.die.d6"),
      d8: game.i18n.localize("MONDAS.Weapon.die.d8"),
      d10: game.i18n.localize("MONDAS.Weapon.die.d10"),
      d12: game.i18n.localize("MONDAS.Weapon.die.d12"),
    };

    context.propertyOptions = [
      "ranged", "sidearm", "thrown", "area", "long", "loud", "brutal", "subtle", "slow",
    ];

    context.background = system.background;

    return context;
  }

  /* ---------------------------------------- */
  /*  Action Handlers                         */
  /* ---------------------------------------- */

  /** Click a stat block to open roll dialog */
  static async #onRollStat(event, target) {
    const stat = target.dataset.stat;
    const { MondasRollDialog } = await import("../rolls/stat-roll.mjs");
    MondasRollDialog.create(this.actor, stat);
  }

  /** Add a blank edge */
  static async #onAddEdge(event, target) {
    const edges = [...this.actor.system.edges, { name: "", description: "", effect: "boon" }];
    await this.actor.update({ "system.edges": edges });
  }

  /** Remove edge by index */
  static async #onRemoveEdge(event, target) {
    const index = Number(target.dataset.index);
    const edges = this.actor.system.edges.filter((_, i) => i !== index);
    await this.actor.update({ "system.edges": edges });
  }

  /** Add a blank weapon */
  static async #onAddWeapon(event, target) {
    const weapons = [...this.actor.system.weapons, { name: "", description: "", die: "d8", properties: [] }];
    await this.actor.update({ "system.weapons": weapons });
  }

  /** Remove weapon by index */
  static async #onRemoveWeapon(event, target) {
    const index = Number(target.dataset.index);
    const weapons = this.actor.system.weapons.filter((_, i) => i !== index);
    await this.actor.update({ "system.weapons": weapons });
  }

  /** Add blank equipment */
  static async #onAddEquipment(event, target) {
    const equipment = [...this.actor.system.equipment, { name: "", description: "", quantity: 1 }];
    await this.actor.update({ "system.equipment": equipment });
  }

  /** Remove equipment by index */
  static async #onRemoveEquipment(event, target) {
    const index = Number(target.dataset.index);
    const equipment = this.actor.system.equipment.filter((_, i) => i !== index);
    await this.actor.update({ "system.equipment": equipment });
  }

  /** Toggle a harm slot */
  static async #onToggleHarm(event, target) {
    const { level, slot } = target.dataset;
    const path = `system.harm.${level}.${slot}.filled`;
    const current = foundry.utils.getProperty(this.actor, path);
    await this.actor.update({ [path]: !current });
  }

  /** Toggle a condition */
  static async #onToggleCondition(event, target) {
    const condition = target.dataset.condition;
    const path = `system.conditions.${condition}`;
    const current = foundry.utils.getProperty(this.actor, path);
    await this.actor.update({ [path]: !current });
  }

  /** Adjust guard +/- */
  static async #onAdjustGuard(event, target) {
    const delta = Number(target.dataset.delta);
    const newVal = Math.clamp(this.actor.system.guard.value + delta, 0, this.actor.system.guard.max);
    await this.actor.update({ "system.guard.value": newVal });
  }

  /** Adjust drain +/- */
  static async #onAdjustDrain(event, target) {
    const delta = Number(target.dataset.delta);
    const newVal = Math.clamp(this.actor.system.drain.value + delta, 0, 4);
    await this.actor.update({ "system.drain.value": newVal });
  }
}
```

**Step 2: Commit**

```bash
git add foundry-system/mondas/module/sheets/
git commit -m "feat(foundry): character sheet class — actions, context prep, stat rolls"
```

---

### Task 5: Character sheet template (Handlebars)

**Files:**
- Create: `foundry-system/mondas/templates/actor/character.hbs`

**Step 1: Build the template**

The template renders the single-page character sheet layout. Key sections:

- **Header:** actor name + background text input
- **Stats:** three clickable blocks (data-action="rollStat" data-stat="grit" etc.)
- **Resource bar:** Guard (value/max with +/- buttons), Drain (4 boxes, clickable), Armor (number input)
- **Harm track:** 6 checkboxes (2 per level), condition toggles
- **Edges list:** repeating rows with name input, description input, effect dropdown, remove button
- **Weapons list:** repeating rows with name input, description input, die dropdown, property multi-select checkboxes, remove button
- **Equipment list:** repeating rows with name input, description input, quantity number input, remove button
- **Add buttons** for each list

Template uses `data-action` attributes for all clickable elements (Foundry v13 action pattern). Form fields use `name="system.stats.grit"` etc. for auto-submission.

Arrays use `{{#each edges}}` with `name="system.edges.{{@index}}.name"` pattern.

**Step 2: Commit**

```bash
git add foundry-system/mondas/templates/
git commit -m "feat(foundry): character sheet template — full layout with all sections"
```

---

### Task 6: CSS styling

**Files:**
- Create: `foundry-system/mondas/styles/mondas.css`

**Step 1: Style the sheet**

Core styles needed:
- `.mondas.sheet` — base layout, grid
- `.stat-block` — clickable stat display (large number, label below, hover effect, cursor pointer)
- `.resource-bar` — guard/drain/armor row, flexbox
- `.guard-track` — filled/empty segments
- `.drain-track` — 4 circular boxes (filled = solid, empty = outline)
- `.harm-section` — grid for hurt/wounded/critical rows
- `.harm-slot` — checkbox styling
- `.condition-toggle` — small labeled checkbox, active state highlight
- `.edges-list`, `.weapons-list`, `.equipment-list` — compact rows with inputs
- `.property-tags` — inline tag-style checkboxes for weapon properties
- `.add-button` — styled + button for adding list entries
- `.remove-button` — small X button per row

Design direction: clean, utilitarian, slightly gritty. Dark header area, light body. Sans-serif. Minimal color — accent color for stat blocks and active states.

**Step 2: Commit**

```bash
git add foundry-system/mondas/styles/
git commit -m "feat(foundry): character sheet CSS — layout, stats, tracks, lists"
```

---

### Task 7: Stat roll dialog (Phase 1 core)

**Files:**
- Create: `foundry-system/mondas/module/rolls/stat-roll.mjs`
- Create: `foundry-system/mondas/templates/rolls/roll-dialog.hbs`
- Create: `foundry-system/mondas/templates/rolls/gambit-dialog.hbs`
- Create: `foundry-system/mondas/templates/rolls/roll-chat.hbs`

**Step 1: Implement MondasRollDialog**

This is an ApplicationV2 dialog (not a sheet — it extends `HandlebarsApplicationMixin(ApplicationV2)` directly).

Flow:
1. **Roll dialog** opens. Shows stat name, base pool, roll type radio (stakes/combat), boon/snag counters, drain checkbox, pool preview. If combat: weapon selector dropdown (populated from actor's weapons). [Roll] button.
2. On Roll: execute `new Roll("Xd6")` (or `2d6kl` for 0-pool). Display results.
3. **If any die >= 4:** open gambit dialog. Show all dice, highlight 4+. Player clicks to select sacrificed dice. Text input for gambit description. [Confirm] / [Skip].
4. **Chat message:** post to chat with roll results, outcome, gambits. If combat: also roll weapon die, show [Apply Damage] button.

The dialog manages state internally (not persisted). Each phase replaces the dialog content.

**Step 2: Implement roll-dialog.hbs**

Template for Phase 1 of the dialog: stat display, roll type, modifiers, roll button.

**Step 3: Implement gambit-dialog.hbs**

Template for Phase 2: dice display with selectable 4+ dice, gambit text input.

**Step 4: Implement roll-chat.hbs**

Chat card template: roll info, color-coded dice, outcome line, gambits, optional [Apply Damage] button for combat rolls.

**Step 5: Commit**

```bash
git add foundry-system/mondas/module/rolls/stat-roll.mjs foundry-system/mondas/templates/rolls/
git commit -m "feat(foundry): stat roll dialog — pool builder, gambit selection, chat output"
```

---

### Task 8: Damage pipeline (Phase 2)

**Files:**
- Create: `foundry-system/mondas/module/rolls/damage-roll.mjs`

**Step 1: Implement damage application**

The `applyDamage(actor, rawDamage)` function:

1. Subtract from guard: `newGuard = Math.max(0, guard.value - rawDamage)`
2. Calculate overflow: `overflow = rawDamage - guard.value` (min 0)
3. If guard hit 0 from above 0: flag scar event
4. Subtract armor from overflow: `overflow = Math.max(0, overflow - armor)`
5. Route overflow to harm slots:
   - Try to fill hurt slots first (if overflow >= 1)
   - If both hurt full: fill wounded slots (if overflow >= 3)
   - If both wounded full: fill critical slots (if overflow >= 5)
   - If level is full, bump up
6. Update actor with new guard, harm state
7. Post result to chat

Also: wire the [Apply Damage] chat button. Register a global chat message hook that listens for clicks on `.mondas-apply-damage` buttons. The button stores the damage value and optionally a target actor ID.

**Step 2: Add chat hook to mondas.mjs**

In the entry point, add:

```javascript
Hooks.on("renderChatMessage", (message, html) => {
  html.querySelectorAll("[data-action='applyDamage']").forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      const { applyDamage } = await import("./module/rolls/damage-roll.mjs");
      const damage = Number(btn.dataset.damage);
      // Get selected token or prompt
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
```

**Step 3: Commit**

```bash
git add foundry-system/mondas/module/rolls/damage-roll.mjs
git commit -m "feat(foundry): damage pipeline — guard/armor/harm overflow, chat integration"
```

---

### Task 9: Integration testing + polish

**Step 1: Verify system loads in Foundry**

Instructions for manual testing on The Forge:
1. Zip `foundry-system/mondas/` folder contents (system.json at root of zip)
2. Upload to The Forge as a custom system
3. Create a world using the MONDAS system
4. Create a character actor
5. Verify: sheet opens, stats display, fields editable, arrays add/remove

**Step 2: Test roll workflow**

1. Click a stat → roll dialog opens
2. Set boons, snags, toggle drain
3. Roll → dice display correctly
4. Gambit dialog appears for 4+ dice
5. Chat message posts with correct format

**Step 3: Test damage pipeline**

1. Make a combat roll with weapon selected
2. Weapon die rolls alongside stat roll
3. Click [Apply Damage] with target selected
4. Target's guard decreases, harm fills on overflow

**Step 4: Fix any issues found in testing**

**Step 5: Final commit**

```bash
git add -A foundry-system/mondas/
git commit -m "feat(foundry): mondas system v0.1.0 — character sheet, rolls, damage pipeline"
```
