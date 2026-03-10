# MONDAS Foundry System — Architecture Refactor

**Date:** 2026-03-10
**Scope:** Code organization only. No behavior changes, no rules changes, no new features.

## Overview

Refactor the MONDAS Foundry VTT system to follow v13 best practices:
1. Split the monolithic character sheet template into 4 PARTS
2. Split the monolithic CSS file into 8 component files
3. Add template preloading and extract shared constants

Everything renders identically after the refactor.

## 1. Template Split (4 PARTS)

The single `character.hbs` (253 lines) splits into 4 files. The outer `<section class="mondas character-sheet">` wrapper is removed — those classes move to the app element via `DEFAULT_OPTIONS.classes`.

| Part | File | Contents |
|-|-|-|
| `header` | `templates/actor/header.hbs` | Name input + background section |
| `tabs` | `templates/actor/tabs.hbs` | Tab nav bar (Sheet / Notes) |
| `sheet` | `templates/actor/sheet.hbs` | Status pills, stats, resources, harm, conditions, edges, weapons, equipment, scars |
| `notes` | `templates/actor/notes.hbs` | ProseMirror editor |

### Sheet Class Changes

```javascript
static DEFAULT_OPTIONS = {
  classes: ["mondas", "character-sheet"],  // compound class preserved for CSS
  // ...rest unchanged
};

static PARTS = {
  header: { template: "systems/mondas/templates/actor/header.hbs" },
  tabs:   { template: "systems/mondas/templates/actor/tabs.hbs" },
  sheet:  { template: "systems/mondas/templates/actor/sheet.hbs",
            scrollable: [".tab-content[data-tab='sheet']"] },
  notes:  { template: "systems/mondas/templates/actor/notes.hbs",
            scrollable: [".tab-notes"] },
};
```

Tab visibility keeps the existing `hidden` attribute + `_activeTab` pattern — two tabs don't need the full `static TABS` system.

`_prepareContext()` stays as-is. All parts share the same context.

## 2. CSS Split (8 Files)

The 2,257-line `mondas.css` splits into 8 files. The barrel file keeps the same filename so `system.json` doesn't change.

| File | Contents |
|-|-|
| `mondas.css` | Font import + `@import` for each file below |
| `_tokens.css` | Variables: colors, spacing, fonts, borders, hatches, icons |
| `_reset.css` | Foundry override kills (padding, border-radius, pseudo-elements) |
| `_layout.css` | Sheet structure, header, background, tabs, scrolling, scrollbar |
| `_components.css` | Stats, resources, harm, conditions, pills, item cards, badges, scars |
| `_forms.css` | Inputs, checkboxes, selects, dialog forms |
| `_rolls.css` | Roll dialog, modifiers, weapon/cover pickers, pool preview |
| `_chat.css` | Dice grid, outcomes, gambit panel, damage reports, item chat cards |

Pure reorganization with two bug fixes:
1. `.setup-target` border: `1px solid var(--paper)` → `var(--b-light)` (invisible border)
2. Add `:focus-visible` outline on buttons and interactive elements

## 3. Entry Point & Constants

### Template Preloading

Add to `mondas.mjs` init hook:

```javascript
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

### Extract Shared Code

- `module/constants.mjs` — `EQUIPMENT_TAGS`, `PROPERTY_OPTIONS`, `DIE_OPTIONS` (from character-sheet.mjs)
- `module/helpers/dialog.mjs` — `getDialogForm()` utility (from character-sheet.mjs)

Both are imported where needed.

## File Changes Summary

### New Files
- `templates/actor/header.hbs`
- `templates/actor/tabs.hbs`
- `templates/actor/sheet.hbs`
- `templates/actor/notes.hbs`
- `styles/_tokens.css`
- `styles/_reset.css`
- `styles/_layout.css`
- `styles/_components.css`
- `styles/_forms.css`
- `styles/_rolls.css`
- `styles/_chat.css`
- `module/constants.mjs`
- `module/helpers/dialog.mjs`

### Modified Files
- `mondas.mjs` — add loadTemplates()
- `module/sheets/character-sheet.mjs` — update PARTS/classes, import constants/dialog helper
- `styles/mondas.css` — becomes barrel file with @imports

### Deleted Files
- `templates/actor/character.hbs` — replaced by 4 part templates
