# MONDAS Foundry VTT System — Design

**Date:** 2026-03-09
**Scope:** Phases 1 & 2 — character sheet + roll workflow + damage pipeline
**Target:** Foundry v13 (13.341+), The Forge hosting
**System ID:** `mondas`

## Architecture

- Plain ES6 modules, Handlebars templates, CSS. No build step.
- Lives in `foundry-system/mondas/` within the project repo.
- Upload as custom system to The Forge.

## Folder Structure

```
foundry-system/mondas/
├── system.json
├── mondas.mjs
├── module/
│   ├── data-models/
│   │   └── character.mjs
│   ├── sheets/
│   │   └── character-sheet.mjs
│   ├── rolls/
│   │   ├── stat-roll.mjs
│   │   └── damage-roll.mjs
│   └── helpers/
│       └── handlebars.mjs
├── templates/
│   ├── actor/
│   │   └── character.hbs
│   └── rolls/
│       ├── roll-dialog.hbs
│       ├── gambit-dialog.hbs
│       └── roll-chat.hbs
├── styles/
│   └── mondas.css
└── lang/
    └── en.json
```

No Item documents. Edges, weapons, equipment are inline arrays on the actor.

## Data Model — Character

```
stats.grit          Number 1-4
stats.sharp         Number 1-4
stats.nerve         Number 1-4

guard.value         Number          current guard
guard.max           Number          derived: 2 + highest stat + scars

drain.value         Number 0-4      boxes remaining
drain.cracked       Boolean         derived: true when value = 0

harm.hurt           Array[2]        {filled: bool, text: string}
harm.wounded        Array[2]
harm.critical       Array[2]

conditions.stunned  Boolean
conditions.shaken   Boolean
conditions.prone    Boolean

armor               Number 0-3
scars               Number          +1 max Guard per scar
background          String

edges               Array of {name, description, effect}
                    effect: picker — Boon | Gambit | Thaumic | Narrative

weapons             Array of {name, description, properties, die}
                    properties: multi-select — Ranged, Sidearm, Thrown, Area,
                                Long, Loud, Brutal, Subtle, Slow
                    die: picker — d6 | d8 | d10 | d12

equipment           Array of {name, description, quantity}
                    quantity: number spinner
```

## Sheet Layout

Single-page, no tabs.

```
┌─ Header: Name, Background ─────────────────┐
│                                             │
│  [GRIT: 3]   [SHARP: 2]   [NERVE: 1]      │  ← clickable, trigger roll
│                                             │
│  Guard: ████░░ (4/6)  Drain: ●●●○  Armor:2 │
│                                             │
│  ── Harm ──────────────────────────────     │
│  Hurt:     [_] [_]    Wounded: [_] [_]      │
│  Critical: [_] [_]    Conditions: ○S ○S ○P  │
│                                             │
│  ── Edges ─────────    ── Weapons ───────── │
│  name / desc / [eff▾]  name / desc /[d▾][p] │
│  [+ Add Edge]          [+ Add Weapon]       │
│                                             │
│  ── Equipment ──────────────────────────    │
│  name / desc / [qty ↕]                      │
│  [+ Add Equipment]                          │
└─────────────────────────────────────────────┘
```

## Roll Workflow (Phase 1)

### Step 1: Roll Dialog
Triggered by clicking a stat block. ApplicationV2 dialog.

- Stat name + base pool displayed
- Roll type: Stakes / Combat (radio)
- Boons: +/- counter (net bonus dice)
- Snags: +/- counter (net penalty dice)
- Spend Drain: checkbox (+1d, grayed if drain=0)
- Final pool preview (warns at 0d: "2d6 take lowest")
- [Roll] button

### Step 2: Roll Execution
- Pool >= 1: roll Xd6, read highest
- Pool = 0: roll 2d6, take lowest
- Results shown in Gambit Dialog

### Step 3: Gambit Dialog
Only appears if any die shows 4+.

- All dice displayed, 4+ highlighted as selectable
- Player clicks dice to sacrifice
- Text field: describe the gambit
- [Confirm] / [Skip] buttons

### Step 4: Chat Message
Posted to Foundry chat:
- Roll type, stat used, pool composition
- All dice results (color: green=6, yellow=4-5, red=1-3)
- Outcome line: "Full Success" / "Partial — cost" / "Consequence"
- Gambits sacrificed (die value + description)

## Damage Pipeline (Phase 2)

### Combat Roll Flow
1. Player makes combat roll (stat roll with type=combat)
2. Weapon die rolled automatically (from selected weapon)
3. Total damage = weapon die result
4. Chat message includes [Apply Damage] button

### Apply Damage (click target token or chat button)
1. Subtract from Guard
2. If Guard hits 0: Scar event (prompt +1 max Guard, gain Edge flag)
3. Remaining damage - Armor = overflow
4. Overflow routes to Harm:
   - 1-2 overflow: fill Hurt slots
   - 3-4 overflow: fill Wounded slots
   - 5+ overflow: fill Critical slots
5. If both slots at a level are full: bump to next level
6. Conditions auto-applied based on harm state

### Weapon Selection
- Weapon picker in combat roll dialog (dropdown of character's weapons)
- Die determined by weapon entry
- Properties shown as tags (informational)

## Decisions

- **No Item documents.** Everything is arrays on the actor. Simpler. Can migrate later.
- **No NPC sheet.** Phase 4 concern.
- **No build step.** Plain JS/Handlebars for easy Forge deployment.
- **Gambits are descriptive.** Player types what they do. Fiction-first.
- **Damage application is semi-manual.** Click button, system does math, GM confirms.
- **Pickers over free text** for effect, damage die, weapon properties, quantity.
