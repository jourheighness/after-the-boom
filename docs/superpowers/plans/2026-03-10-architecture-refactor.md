# Architecture Refactor Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorganize the MONDAS Foundry system code into v13 PARTS architecture with split CSS and shared modules — zero behavior change.

**Architecture:** Split monolithic character sheet template into 4 PARTS (header, tabs, sheet, notes). Split monolithic CSS into 8 component files via @import barrel. Extract shared constants and dialog utilities into their own modules.

**Tech Stack:** Foundry VTT v13, HandlebarsApplicationMixin + ActorSheetV2, Handlebars templates, CSS @import

**Spec:** `docs/superpowers/specs/2026-03-10-architecture-refactor-design.md`

---

## Chunk 1: Foundation (checkpoint, constants, helpers)

### Task 1: Git Checkpoint

- [ ] **Step 1: Create rollback checkpoint**

```bash
git add -A && git commit -m "checkpoint: pre-architecture-refactor"
```

This is the rollback point if anything goes wrong.

---

### Task 2: Extract Constants Module

**Files:**
- Create: `foundry-system/mondas/module/constants.mjs`
- Modify: `foundry-system/mondas/module/sheets/character-sheet.mjs`

- [ ] **Step 1: Create constants module**

Create `foundry-system/mondas/module/constants.mjs`:

```javascript
/** Tags available for equipment */
export const EQUIPMENT_TAGS = ["thaumatech", "licensed", "restricted", "prohibited", "black-market", "mundane"];

/** Weapon property options */
export const PROPERTY_OPTIONS = ["ranged", "sidearm", "thrown", "area", "long", "loud", "brutal", "subtle", "slow"];

/** Die options for weapons */
export const DIE_OPTIONS = { d6: "d6", d8: "d8", d10: "d10", d12: "d12" };
```

- [ ] **Step 2: Update character-sheet.mjs imports**

At top of `foundry-system/mondas/module/sheets/character-sheet.mjs`, replace the three const declarations (lines 4-11) with:

```javascript
import { EQUIPMENT_TAGS, PROPERTY_OPTIONS, DIE_OPTIONS } from "../constants.mjs";
```

Remove lines 4-11 (the old const declarations).

---

### Task 3: Extract Dialog Helper

**Files:**
- Create: `foundry-system/mondas/module/helpers/dialog.mjs`
- Modify: `foundry-system/mondas/module/sheets/character-sheet.mjs`

- [ ] **Step 1: Create dialog helper module**

Create `foundry-system/mondas/module/helpers/dialog.mjs`:

```javascript
/**
 * Extract form data from a DialogV2 callback.
 * Foundry v13 DialogV2 passes (event, button, dialog) — the form lives
 * inside the dialog element, not as a parent of the button.
 */
export function getDialogForm(event, button) {
  return button.form;
}
```

- [ ] **Step 2: Update character-sheet.mjs**

Replace the `getDialogForm` function declaration (lines 13-20 after constants removal) with:

```javascript
import { getDialogForm } from "../helpers/dialog.mjs";
```

Remove the old function definition.

- [ ] **Step 3: Commit**

```bash
git add foundry-system/mondas/module/constants.mjs foundry-system/mondas/module/helpers/dialog.mjs foundry-system/mondas/module/sheets/character-sheet.mjs
git commit -m "refactor: extract constants and dialog helper into shared modules"
```

---

## Chunk 2: CSS Split

### Task 4: Split CSS into Component Files

All paths relative to `foundry-system/mondas/styles/`.

The existing `mondas.css` has clear section headers. Each new file gets the exact content from the corresponding sections. The line ranges below reference the current `mondas.css`.

**Files:**
- Create: `_tokens.css`, `_reset.css`, `_layout.css`, `_components.css`, `_forms.css`, `_rolls.css`, `_chat.css`
- Modify: `mondas.css` (becomes barrel)

- [ ] **Step 1: Create `_tokens.css`**

Extract lines 11-77: the `DESIGN TOKENS` section (the full selector block with all CSS custom properties). Include the opening selector and closing brace.

- [ ] **Step 2: Create `_reset.css`**

Extract lines 79-186: the `FOUNDRY FULL RESET` section.

- [ ] **Step 3: Create `_layout.css`**

Extract lines 188-411: `BASE LAYOUT` + `HEADER` + `BACKGROUND SECTION` + `TABS` + `NOTES TAB` sections.

- [ ] **Step 4: Create `_components.css`**

Extract lines 413-1093: `STATUS BANNERS & PILLS` + `STATS` + `RESOURCES` + `STATUS ROW (Harm + Conditions)` + `SECTION HEADERS` + `SCARS` + `ITEM CARDS` sections.

- [ ] **Step 5: Create `_forms.css`**

Extract lines 1095-1474: `CTRL BUTTONS` + `SHARED INPUTS` + `CHECKBOXES` + `SCROLLBAR` + `DIALOG FORMS` sections.

- [ ] **Step 6: Create `_rolls.css`**

Extract lines 1476-1724: the `ROLL DIALOG` section.

- [ ] **Step 7: Create `_chat.css`**

Extract lines 1726-2256: `DICE & OUTCOMES` + `CHAT CARDS` + `GAMBIT CONTROLS` + `DAMAGE REPORT` + `ITEM CHAT CARDS` sections.

- [ ] **Step 8: Replace `mondas.css` with barrel file**

Replace the entire contents of `mondas.css` with:

```css
/* MONDAS — After the Boom
 * DPA Citizen Registration Form ACK-5/Z
 *
 * Design: 1992 Federal Union government form.
 * IBM Plex Mono. Dark navy. Cream paper. Monochrome.
 * 2px navy borders. Raster fill patterns. No decoration.
 */

@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

@import '_tokens.css';
@import '_reset.css';
@import '_layout.css';
@import '_components.css';
@import '_forms.css';
@import '_rolls.css';
@import '_chat.css';
```

- [ ] **Step 9: Commit**

```bash
git add foundry-system/mondas/styles/
git commit -m "refactor: split monolithic CSS into 8 component files"
```

---

### Task 5: CSS Bug Fixes

**Files:**
- Modify: `foundry-system/mondas/styles/_chat.css`
- Modify: `foundry-system/mondas/styles/_components.css`

- [ ] **Step 1: Fix invisible setup-target border**

In `_chat.css`, find the `.mondas-roll-chat .setup-target` rule. Change:

```css
border: 1px solid var(--paper);
```

to:

```css
border: var(--b-light);
```

- [ ] **Step 2: Add focus-visible outlines**

In `_components.css`, add at the end of the file:

```css
/* ===================================================
 * FOCUS VISIBLE (Accessibility)
 * =================================================== */

.mondas :focus-visible {
  outline: 2px solid var(--navy);
  outline-offset: 1px;
}

.mondas [data-action]:focus-visible,
.mondas button:focus-visible {
  outline: 2px solid var(--navy);
  outline-offset: 1px;
}
```

- [ ] **Step 3: Commit**

```bash
git add foundry-system/mondas/styles/_chat.css foundry-system/mondas/styles/_components.css
git commit -m "fix: invisible setup-target border, add focus-visible outlines"
```

---

## Chunk 3: Template Split & Sheet Class Update

### Task 6: Create Part Templates

All paths relative to `foundry-system/mondas/templates/actor/`.

**Files:**
- Create: `header.hbs`, `tabs.hbs`, `sheet.hbs`, `notes.hbs`

- [ ] **Step 1: Create `header.hbs`**

Content from `character.hbs` lines 4-23 (the header and background section), without the outer `<section>` wrapper:

```handlebars
{{!-- Header --}}
<header class="sheet-header">
  <input type="text" name="name" value="{{actor.name}}" placeholder="Character Name" class="char-name">
</header>

{{!-- Background --}}
<div class="background-section">
  <div class="section-header">
    <h3>Background</h3>
  </div>
  {{#if background}}
  <div class="background-filled">
    <span class="background-text">{{background}}</span>
    <button type="button" class="ctrl-btn" data-action="editBackground" title="Edit Background"><i class="fa-solid fa-pen-to-square"></i></button>
  </div>
  {{else}}
  <div class="background-empty">
    <button type="button" class="background-add-btn" data-action="editBackground">Add Background</button>
  </div>
  {{/if}}
</div>
```

- [ ] **Step 2: Create `tabs.hbs`**

Content from `character.hbs` lines 26-29:

```handlebars
{{!-- Tabs --}}
<nav class="sheet-tabs">
  <button type="button" class="sheet-tab {{#if (eq activeTab 'sheet')}}active{{/if}}" data-action="switchTab" data-tab="sheet">Sheet</button>
  <button type="button" class="sheet-tab {{#if (eq activeTab 'notes')}}active{{/if}}" data-action="switchTab" data-tab="notes">Notes</button>
</nav>
```

- [ ] **Step 3: Create `sheet.hbs`**

Content from `character.hbs` lines 32-246 (the entire sheet tab `<div>` and its contents, including the closing `</div>`):

```handlebars
<div class="tab-content" data-tab="sheet" {{#unless (eq activeTab 'sheet')}}hidden{{/unless}}>

{{!-- Status Pills — incapacitated trumps all --}}
{{#if incapacitated}}
<div class="status-banner banner-critical">INCAPACITATED — cannot act</div>
{{else}}
<div class="status-pills">
  {{#if critical}}<span class="status-pill pill-critical">CRITICAL</span>{{/if}}
  {{#if wounded}}<span class="status-pill pill-wounded">WOUNDED</span>{{/if}}
  {{#if cracked}}<span class="status-pill pill-cracked">CRACKED</span>{{/if}}
  {{#if setupDie.active}}<span class="status-pill pill-setup">SETUP {{setupDie.value}}</span>{{/if}}
</div>
{{/if}}

{{!-- Stats --}}
<div class="stats-row">
  {{#each stats}}
  <div class="stat-block">
    <div class="stat-top">
      <div class="stat-icon-col">
        <span class="stat-icon stat-icon-{{key}}"></span>
        <span class="stat-label">{{label}}</span>
      </div>
      <input type="number" class="stat-value" name="system.stats.{{key}}" value="{{value}}" min="1" max="4">
    </div>
    <div class="stat-roll-buttons">
      <button type="button" data-action="rollStat" data-stat="{{key}}" data-roll-type="combat" title="Combat"><i class="fa-solid fa-crosshairs"></i></button>
      <button type="button" data-action="rollStat" data-stat="{{key}}" data-roll-type="defense" title="Defense"><i class="fa-solid fa-shield-halved"></i></button>
      <button type="button" data-action="rollStat" data-stat="{{key}}" data-roll-type="stakes" title="Stakes"><i class="fa-solid fa-scale-balanced stakes-icon"></i></button>
    </div>
  </div>
  {{/each}}
</div>

{{!-- Resources --}}
<div class="resources-row">
  <div class="track">
    <span class="track-label">Guard</span>
    <div class="track-boxes">
      {{#times guard.max}}
      <span class="track-box guard {{#if (lt this ../guard.value)}}filled{{/if}}" data-action="toggleGuardBox" data-index="{{this}}"></span>
      {{/times}}
    </div>
    <span class="track-counter">{{guardRemaining}}/{{guard.max}}</span>
  </div>
  <div class="track">
    <span class="track-label">Drain</span>
    <div class="track-boxes">
      {{#times drain.max}}
      <span class="track-box drain {{#if (lt this ../drain.value)}}filled{{/if}}" data-action="toggleDrainBox" data-index="{{this}}"></span>
      {{/times}}
    </div>
    <span class="track-counter">{{drainRemaining}}/{{drain.max}}</span>
    {{#if cracked}}<span class="cracked-badge">CRACKED</span>{{/if}}
  </div>
  <div class="track">
    <span class="track-label">Armor</span>
    <span class="armor-value">{{armor}}</span>
  </div>
</div>

{{!-- Harm + Conditions --}}
<div class="status-row">
  <div class="harm-track">
    <div class="harm-group">
      <span class="harm-level">Hurt</span>
      <span class="harm-box {{#if harm.hurt.slot1.filled}}filled{{/if}}" data-action="toggleHarm" data-level="hurt" data-slot="slot1"></span>
      <span class="harm-box {{#if harm.hurt.slot2.filled}}filled{{/if}}" data-action="toggleHarm" data-level="hurt" data-slot="slot2"></span>
    </div>
    <div class="harm-group">
      <span class="harm-level">Wounded</span>
      <span class="harm-box wounded {{#if harm.wounded.slot1.filled}}filled{{/if}}" data-action="toggleHarm" data-level="wounded" data-slot="slot1"></span>
      <span class="harm-box wounded {{#if harm.wounded.slot2.filled}}filled{{/if}}" data-action="toggleHarm" data-level="wounded" data-slot="slot2"></span>
    </div>
    <div class="harm-group">
      <span class="harm-level critical-label">Critical</span>
      <span class="harm-box critical {{#if harm.critical.slot1.filled}}filled{{/if}}" data-action="toggleHarm" data-level="critical" data-slot="slot1"></span>
      <span class="harm-box critical {{#if harm.critical.slot2.filled}}filled{{/if}}" data-action="toggleHarm" data-level="critical" data-slot="slot2"></span>
    </div>
  </div>
  <div class="conditions-bar">
    <label class="condition {{#if conditions.stunned}}active{{/if}}">
      <input type="checkbox" {{#if conditions.stunned}}checked{{/if}} data-action="toggleCondition" data-condition="stunned" hidden>
      Stunned
    </label>
    <label class="condition {{#if conditions.shaken}}active{{/if}}">
      <input type="checkbox" {{#if conditions.shaken}}checked{{/if}} data-action="toggleCondition" data-condition="shaken" hidden>
      Shaken
    </label>
    <label class="condition {{#if conditions.prone}}active{{/if}}">
      <input type="checkbox" {{#if conditions.prone}}checked{{/if}} data-action="toggleCondition" data-condition="prone" hidden>
      Prone
    </label>
  </div>
</div>

{{!-- Edges --}}
<div class="list-section">
  <div class="section-header">
    <h3>Edges</h3>
    <button type="button" class="section-add" data-action="addEdge">+</button>
  </div>
  <div class="card-stack">
    {{#each edges}}
    <div class="item-card">
      <div class="card-top">
        <span class="card-name">{{#if name}}{{name}}{{else}}(unnamed){{/if}}</span>
        <div class="card-controls">
          <button type="button" class="ctrl-btn" data-action="showEdge" data-index="{{@index}}" title="Show in Chat"><i class="fa-solid fa-comment"></i></button>
          <button type="button" class="ctrl-btn" data-action="editEdge" data-index="{{@index}}" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
          <button type="button" class="ctrl-btn danger" data-action="removeEdge" data-index="{{@index}}" title="Delete"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </div>
      {{#if mechanical}}<p class="card-desc">{{mechanical}}</p>{{/if}}
      {{#if gambitName}}
      <div class="card-gambit">
        <i class="fa-solid fa-bolt gambit-icon"></i>
        <span class="gambit-name">{{gambitName}}</span>
        {{#if gambitDesc}}<span class="gambit-effect">— {{gambitDesc}}</span>{{/if}}
      </div>
      {{/if}}
    </div>
    {{/each}}
  </div>
</div>

{{!-- Weapons --}}
<div class="list-section">
  <div class="section-header">
    <h3>Weapons</h3>
    <button type="button" class="section-add" data-action="addWeapon">+</button>
  </div>
  <div class="card-stack">
    {{#each weapons}}
    <div class="item-card weapon-card">
      <div class="card-top">
        <span class="card-name">{{#if name}}{{name}}{{else}}(unnamed){{/if}}</span>
        <span class="die-badge">{{die}}</span>
        {{#if thaumic}}<span class="thaumatech-badge"><i class="fa-solid fa-bolt"></i></span>{{/if}}
        <div class="card-controls">
          <button type="button" class="ctrl-btn" data-action="showWeapon" data-index="{{@index}}" title="Show in Chat"><i class="fa-solid fa-comment"></i></button>
          <button type="button" class="ctrl-btn" data-action="editWeapon" data-index="{{@index}}" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
          <button type="button" class="ctrl-btn danger" data-action="removeWeapon" data-index="{{@index}}" title="Delete"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </div>
      {{#if description}}<p class="card-desc">{{description}}</p>{{/if}}
      {{#if properties.length}}
      <div class="card-tags">
        {{#each properties}}<span class="tag">{{this}}</span>{{/each}}
      </div>
      {{/if}}
      {{#if gambitName}}
      <div class="card-gambit">
        <i class="fa-solid fa-bolt gambit-icon"></i>
        <span class="gambit-name">{{gambitName}}</span>
        {{#if gambitDesc}}<span class="gambit-effect">— {{gambitDesc}}</span>{{/if}}
      </div>
      {{/if}}
    </div>
    {{/each}}
  </div>
</div>

{{!-- Equipment --}}
<div class="list-section">
  <div class="section-header">
    <h3>Equipment</h3>
    <button type="button" class="section-add" data-action="addEquipment">+</button>
  </div>
  <div class="card-stack">
    {{#each equipment}}
    <div class="item-card">
      <div class="card-top">
        <span class="card-name">{{#if name}}{{name}}{{else}}(unnamed){{/if}}</span>
        <span class="qty-badge">×{{quantity}}</span>
        {{#if armorValue}}<span class="armor-badge"><i class="fa-solid fa-shield-halved"></i> {{armorValue}}</span>{{/if}}
        <div class="card-controls">
          <button type="button" class="ctrl-btn" data-action="showEquipment" data-index="{{@index}}" title="Show in Chat"><i class="fa-solid fa-comment"></i></button>
          <button type="button" class="ctrl-btn" data-action="editEquipment" data-index="{{@index}}" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
          <button type="button" class="ctrl-btn danger" data-action="removeEquipment" data-index="{{@index}}" title="Delete"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </div>
      {{#if description}}<p class="card-desc">{{description}}</p>{{/if}}
      {{#if tags.length}}
      <div class="card-tags">
        {{#each tags}}<span class="tag">{{this}}</span>{{/each}}
      </div>
      {{/if}}
      {{#if gambitName}}
      <div class="card-gambit">
        <i class="fa-solid fa-bolt gambit-icon"></i>
        <span class="gambit-name">{{gambitName}}</span>
        {{#if gambitDesc}}<span class="gambit-effect">— {{gambitDesc}}</span>{{/if}}
      </div>
      {{/if}}
    </div>
    {{/each}}
  </div>
</div>

{{!-- Scars --}}
<div class="list-section scars-section">
  <div class="section-header">
    <h3>Scars ({{scars.length}})</h3>
    <button type="button" class="section-add" data-action="addScar">+</button>
  </div>
  {{#each scars}}
  <div class="scar-entry">
    <input type="text" name="system.scars.{{@index}}" value="{{this}}" placeholder="Scar description">
    <button type="button" class="ctrl-btn danger" data-action="removeScar" data-index="{{@index}}"><i class="fa-solid fa-xmark"></i></button>
  </div>
  {{/each}}
</div>

</div>
```

- [ ] **Step 4: Create `notes.hbs`**

Content from `character.hbs` lines 249-251:

```handlebars
<div class="tab-content tab-notes" data-tab="notes" {{#unless (eq activeTab 'notes')}}hidden{{/unless}}>
  {{formInput systemFields.notes value=system.notes name="system.notes"}}
</div>
```

- [ ] **Step 5: Commit template files**

```bash
git add foundry-system/mondas/templates/actor/header.hbs foundry-system/mondas/templates/actor/tabs.hbs foundry-system/mondas/templates/actor/sheet.hbs foundry-system/mondas/templates/actor/notes.hbs
git commit -m "refactor: split character template into 4 PARTS files"
```

---

### Task 7: Update Sheet Class for PARTS

**Files:**
- Modify: `foundry-system/mondas/module/sheets/character-sheet.mjs`

- [ ] **Step 1: Update DEFAULT_OPTIONS classes**

Change `classes` in `static DEFAULT_OPTIONS` from:

```javascript
classes: ["mondas", "sheet", "actor", "character"],
```

to:

```javascript
classes: ["mondas", "character-sheet"],
```

This preserves the `.mondas.character-sheet` compound CSS selector on the app element.

- [ ] **Step 2: Update static PARTS**

Replace the existing `static PARTS` block:

```javascript
static PARTS = {
  sheet: {
    template: "systems/mondas/templates/actor/character.hbs",
  },
};
```

with:

```javascript
static PARTS = {
  header: { template: "systems/mondas/templates/actor/header.hbs" },
  tabs:   { template: "systems/mondas/templates/actor/tabs.hbs" },
  sheet:  { template: "systems/mondas/templates/actor/sheet.hbs",
            scrollable: [".tab-content[data-tab='sheet']"] },
  notes:  { template: "systems/mondas/templates/actor/notes.hbs",
            scrollable: [".tab-notes"] },
};
```

- [ ] **Step 3: Commit**

```bash
git add foundry-system/mondas/module/sheets/character-sheet.mjs
git commit -m "refactor: update sheet class to use 4 PARTS with scroll preservation"
```

---

### Task 8: Delete Old Template

**Files:**
- Delete: `foundry-system/mondas/templates/actor/character.hbs`

- [ ] **Step 1: Remove old monolithic template**

```bash
git rm foundry-system/mondas/templates/actor/character.hbs
git commit -m "refactor: remove old monolithic character template"
```

---

### Task 9: Add Template Preloading

**Files:**
- Modify: `foundry-system/mondas/mondas.mjs`

- [ ] **Step 1: Add loadTemplates call**

In `mondas.mjs`, inside the `Hooks.once("init", ...)` callback, after `registerHandlebarsHelpers();`, add:

```javascript
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
```

- [ ] **Step 2: Commit**

```bash
git add foundry-system/mondas/mondas.mjs
git commit -m "refactor: add template preloading at init"
```

---

## Chunk 4: Verification

### Task 10: Final Verification

- [ ] **Step 1: Check file structure**

Run:
```bash
find foundry-system/mondas -type f \( -name '*.mjs' -o -name '*.hbs' -o -name '*.css' \) | sort
```

Expected new files:
```
foundry-system/mondas/module/constants.mjs
foundry-system/mondas/module/helpers/dialog.mjs
foundry-system/mondas/styles/_chat.css
foundry-system/mondas/styles/_components.css
foundry-system/mondas/styles/_forms.css
foundry-system/mondas/styles/_layout.css
foundry-system/mondas/styles/_reset.css
foundry-system/mondas/styles/_rolls.css
foundry-system/mondas/styles/_tokens.css
foundry-system/mondas/templates/actor/header.hbs
foundry-system/mondas/templates/actor/notes.hbs
foundry-system/mondas/templates/actor/sheet.hbs
foundry-system/mondas/templates/actor/tabs.hbs
```

Expected removed:
```
foundry-system/mondas/templates/actor/character.hbs
```

- [ ] **Step 2: Verify no JavaScript syntax errors**

```bash
node --check foundry-system/mondas/mondas.mjs
node --check foundry-system/mondas/module/constants.mjs
node --check foundry-system/mondas/module/helpers/dialog.mjs
node --check foundry-system/mondas/module/sheets/character-sheet.mjs
```

All should exit 0 with no output.

- [ ] **Step 3: Verify CSS barrel imports resolve**

```bash
head -20 foundry-system/mondas/styles/mondas.css
```

Should show the barrel file with 7 `@import` statements.

```bash
for f in foundry-system/mondas/styles/_*.css; do echo "$f: $(wc -l < "$f") lines"; done
```

All files should exist and have content.

- [ ] **Step 4: Visual verification checklist**

Open Foundry VTT and verify:
1. Character sheet opens at correct size (680×720)
2. Header shows character name input
3. Background section shows/hides correctly
4. Sheet tab: stats, resources, harm, conditions, edges, weapons, equipment, scars all render
5. Notes tab: ProseMirror editor loads
6. Tab switching works
7. Scroll position preserved within sheet tab
8. Roll dialog opens from stat buttons
9. Chat cards render correctly after a roll
10. Dialogs (add edge/weapon/equipment) open and save
11. All hover effects (offset shadow) still work
12. All interactive elements (guard/drain boxes, harm slots, conditions) toggle correctly
