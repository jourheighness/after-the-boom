# Harm, Weapons & Armor Automation — Design Spec

## Goal

Add automation logic to the MONDAS Foundry system so that harm levels, conditions, armor, and weapon selection have mechanical consequences that auto-apply but can be overridden. Narrative effects (hurt snag, cover) remain soft reminders or roll-time choices.

## Design Direction

- **Auto-apply, overridable**: Wounded/Shaken/Cracked auto-add snags to the roll dialog. Player can dismiss individual snags per roll.
- **Soft reminders**: Critical/Incapacitated show banners. Hurt shows nothing (fiction-governed).
- **Armor derived from equipment**: No manual armor field. Equipment with `armorValue > 0` contributes.
- **Cover in roll dialog**: Defense rolls get a None/Partial/Full cover picker.

## 1. Data Model (`character.mjs`)

### New stored fields

**Weapons** — add:
- `gambitName` (StringField, initial: "")
- `gambitDesc` (StringField, initial: "")
- `thaumic` (BooleanField, initial: false)

**Equipment** — add:
- `armorValue` (NumberField, initial: 0, min: 0, max: 3)

**Root** — add:
- `lastWeaponIndex` (NumberField, initial: -1)

### Removed stored fields

- `armor` (NumberField) — becomes derived

### Derived values (`prepareDerivedData`)

```
armor        = min(3, sum of equipment[].armorValue)
wounded      = harm.wounded.slot1.filled || harm.wounded.slot2.filled
critical     = harm.critical.slot1.filled || harm.critical.slot2.filled
incapacitated = wounded && drain.value === 0
mustSpendDrain = critical
cracked      = drain.value === 0  (already exists)

autoSnags = []
  if wounded:  push {source: "Wounded", applies: "all"}
  if shaken:   push {source: "Shaken", applies: "all"}
  if cracked:  push {source: "Cracked", applies: "all"}
  if prone:    push {source: "Prone", applies: "combat"}

autoReminders = []
  if critical:      push {message: "Must spend Drain to act", severity: "critical"}
  if incapacitated: push {message: "Incapacitated — cannot act", severity: "critical"}

weaponChoices = [UNARMED, ...weapons sorted by die desc]
  UNARMED = {name: "Unarmed", die: "d6", properties: [], thaumic: false, gambitName: "", gambitDesc: ""}
  Sort order: d12 > d10 > d8 > d6
```

## 2. Roll Dialog (`stat-roll.mjs`)

### Auto-snag pills

On construction, read `actor.system.autoSnags`. Filter by rollType:
- `applies: "all"` → always included
- `applies: "combat"` → only if rollType is "combat"

Display as removable pills above the manual Boons/Snags controls:
```
[Wounded ✕] [Cracked ✕]
Snags: [−] 0 [+]    Boons: [−] 0 [+]
```

Clicking ✕ removes that auto-snag for this roll only (override). The total snag count = auto-snags remaining + manual snags.

### Weapon pill selector (combat only)

Replace `<select>` dropdown with horizontal pill row:
```
[Unarmed d6] [Knife d8] [Rifle d10]
```

Active pill highlighted. Default selection:
1. If `lastWeaponIndex >= 0` and weapon exists → select it
2. Else → select first (highest die)

After roll executes, update `system.lastWeaponIndex` on the actor.

### Cover selector (defense only)

Three-pill row, visible only when `rollType === "defense"`:
```
Cover: [None] [Partial +1] [Full +2]
```

Selected cover value stored in roll flags as `coverArmor` (0, 1, or 2). Damage calculation adds this to base armor.

### Warning banners

- If `critical && !spendDrain`: amber banner "Critical — must spend Drain to act"
- If `incapacitated`: red banner "Incapacitated — cannot act"
- Neither blocks the roll (GM override).

## 3. Equipment Dialog

Add between Description and Quantity:
```
Armor Value: [0-3 number input]
```

When saving, `armorValue` stored on the equipment entry.

## 4. Weapon Dialog

Add after Properties:
```
[x] Thaumatech
--- Weapon Gambit (optional) ---
Gambit Name: [_______]
Gambit Effect: [_______]
```

Thaumatech checkbox and gambit fields independent (non-thaumic weapons can still have gambits).

## 5. Chat Gambits Integration (`chat-gambits.mjs`)

`buildAvailableGambits(actor)` currently scans edges and equipment. Add:
- Scan `actor.system.weapons` for entries with `gambitName`
- Include weapon gambits in the gambit picker
- Thaumic gambits (weapon or equipment with `thaumic: true` or tag "thaumatech") show "(costs Drain)" label

## 6. Sheet Template (`character.hbs`)

### Status banners

New block below header, above stats:
```html
<div class="status-banners">
  {{#if incapacitated}}<div class="banner banner-critical">INCAPACITATED</div>{{/if}}
  {{#if critical}}<div class="banner banner-critical">CRITICAL — must spend Drain</div>{{/if}}
  {{#if wounded}}<div class="banner banner-wounded">WOUNDED — Snag on all rolls</div>{{/if}}
  {{#if cracked}}<div class="banner banner-cracked">CRACKED — Snag on all rolls</div>{{/if}}
</div>
```

### Armor display

Armor in resources row becomes read-only display (not an input):
```html
<span class="armor-value">{{armor}}</span>
```

### Equipment cards

Cards with `armorValue > 0` show a shield badge: `🛡 2`

### Weapon cards

Thaumic weapons show `⚡ Thaumatech` badge. Gambit shown inline (same pattern as edges/equipment).

## 7. Stylesheet (`mondas.css`)

New styles needed:
- `.status-banners` — stack of full-width banners
- `.banner` base + `.banner-critical` (red), `.banner-wounded` (amber), `.banner-cracked` (dark purple)
- `.snag-pills` — horizontal pill row with ✕ dismiss
- `.weapon-pills` — horizontal pill row with active state
- `.cover-pills` — three-option pill row
- `.armor-badge` — shield icon on equipment cards
- `.thaumatech-badge` — on weapon cards
- `.roll-warning` — inline warning in roll dialog

## File Change Summary

| File | Changes |
|-|-|
| `character.mjs` | +weapon gambit/thaumic, +equipment armorValue, +lastWeaponIndex, armor→derived, new derived values |
| `stat-roll.mjs` | auto-snag pills, weapon pills, cover pills, critical/incapacitated warnings, lastWeaponIndex update |
| `roll-dialog.hbs` | weapon pills, snag pills, cover selector, warning banners |
| `character.hbs` | status banners, read-only armor, equipment armor badge, weapon thaumatech/gambit display |
| `mondas.css` | pill styles, banner styles, badge styles, warning styles |
| `add-weapon.hbs` | +thaumatech checkbox, +gambit fieldset |
| `add-equipment.hbs` | +armorValue field |
| `character-sheet.mjs` | pass new fields to dialogs |
| `chat-gambits.mjs` | scan weapons for gambits, drain cost label |
