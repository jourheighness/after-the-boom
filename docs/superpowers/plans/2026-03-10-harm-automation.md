# Harm, Weapons & Armor Automation — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add automation logic so harm levels, conditions, and equipment-derived armor auto-apply mechanical consequences (snags, warnings, armor calculation) while remaining overridable at roll time.

**Architecture:** All automation flows from `CharacterData.prepareDerivedData()` which computes derived booleans (`wounded`, `critical`, `incapacitated`), an `autoSnags` array, derived `armor` from equipment, and sorted `weaponChoices`. The roll dialog reads these derived values and pre-fills its UI. Dialogs gain new fields (weapon gambits/thaumic, equipment armorValue). Sheet shows status banners.

**Tech Stack:** Foundry VTT v13, ApplicationV2/HandlebarsApplicationMixin, TypeDataModel, Handlebars templates, vanilla CSS.

**Testing:** No automated test framework — Foundry systems run in-browser. Each task ends with a manual verification step in the running Foundry instance. Hot reload picks up .hbs/.css changes; .mjs changes require a browser refresh (F5).

---

## Chunk 1: Data Layer + Dialogs

### Task 1: Checkpoint

Create a git checkpoint before the multi-file edit pass.

- [ ] **Step 1: Create checkpoint commit**

```bash
git add -A && git commit -m "checkpoint: pre-harm-automation"
```

---

### Task 2: Data Model — Schema Changes

**Files:**
- Modify: `foundry-system/mondas/module/data-models/character.mjs`

- [ ] **Step 1: Add weapon gambit/thaumic fields to weapon schema**

In the weapons ArrayField schema (line 67-74), add after `properties`:

```js
gambitName: new fields.StringField({ initial: "" }),
gambitDesc: new fields.StringField({ initial: "" }),
thaumic: new fields.BooleanField({ initial: false }),
```

- [ ] **Step 2: Add armorValue to equipment schema**

In the equipment ArrayField schema (line 77-84), add after `quantity`:

```js
armorValue: new fields.NumberField({ initial: 0, min: 0, max: 3, integer: true }),
```

- [ ] **Step 3: Add lastWeaponIndex to root schema**

After the `notes` field (line 56), add:

```js
// Last used weapon index for combat roll default (-1 = none yet)
lastWeaponIndex: new fields.NumberField({ initial: -1, integer: true }),
```

- [ ] **Step 4: Remove stored armor field**

Delete the `armor` schema field (line 47). It becomes derived in the next step.

- [ ] **Step 5: Commit**

```bash
git add foundry-system/mondas/module/data-models/character.mjs
git commit -m "feat(data): add weapon gambit/thaumic, equipment armorValue, lastWeaponIndex; remove stored armor"
```

---

### Task 3: Data Model — Derived Data

**Files:**
- Modify: `foundry-system/mondas/module/data-models/character.mjs` (the `prepareDerivedData` method, lines 89-94)

- [ ] **Step 1: Replace prepareDerivedData with full automation logic**

Replace the entire `prepareDerivedData()` method body:

```js
prepareDerivedData() {
  const stats = this.stats;
  const highestStat = Math.max(stats.grit, stats.sharp, stats.nerve);
  this.guard.max = 2 + highestStat + this.scars.length;
  this.cracked = this.drain.value === 0;

  // Armor derived from equipment
  this.armor = Math.min(3,
    (this.equipment ?? []).reduce((sum, e) => sum + (e.armorValue || 0), 0),
  );

  // Harm-level booleans
  this.wounded = this.harm.wounded.slot1.filled || this.harm.wounded.slot2.filled;
  this.critical = this.harm.critical.slot1.filled || this.harm.critical.slot2.filled;
  this.incapacitated = this.wounded && this.drain.value === 0;
  this.mustSpendDrain = this.critical;

  // Auto-snags: array of {source, applies}
  // applies: "all" = every roll, "combat" = combat rolls only
  this.autoSnags = [];
  if (this.wounded) this.autoSnags.push({ source: "Wounded", applies: "all" });
  if (this.conditions.shaken) this.autoSnags.push({ source: "Shaken", applies: "all" });
  if (this.cracked) this.autoSnags.push({ source: "Cracked", applies: "all" });
  if (this.conditions.prone) this.autoSnags.push({ source: "Prone", applies: "combat" });

  // Weapon choices: Unarmed + weapons sorted by die size desc
  const DIE_ORDER = { d12: 4, d10: 3, d8: 2, d6: 1 };
  const unarmed = {
    name: "Unarmed", die: "d6", properties: [],
    thaumic: false, gambitName: "", gambitDesc: "",
    description: "",
  };
  const sorted = [...(this.weapons ?? [])].sort(
    (a, b) => (DIE_ORDER[b.die] || 0) - (DIE_ORDER[a.die] || 0),
  );
  this.weaponChoices = [unarmed, ...sorted];

  // Resolve default weapon selection
  // lastWeaponIndex maps to weaponChoices array (0 = Unarmed, 1+ = real weapons)
  const lastIdx = this.lastWeaponIndex ?? -1;
  if (lastIdx >= 0 && lastIdx < this.weaponChoices.length) {
    this.defaultWeaponIndex = lastIdx;
  } else {
    this.defaultWeaponIndex = 0; // highest die (Unarmed if no weapons, else first sorted)
  }
}
```

- [ ] **Step 2: Verify in Foundry**

Refresh browser (F5). Open a character sheet. Confirm it loads without console errors. The sheet will show armor as empty (the input is gone but the template still references `{{armor}}`). This is expected — template updates come in Task 6.

- [ ] **Step 3: Commit**

```bash
git add foundry-system/mondas/module/data-models/character.mjs
git commit -m "feat(data): derived armor, harm booleans, autoSnags, weaponChoices"
```

---

### Task 4: Weapon Dialog — Thaumic + Gambit Fields

**Files:**
- Modify: `foundry-system/mondas/templates/dialogs/add-weapon.hbs`
- Modify: `foundry-system/mondas/module/sheets/character-sheet.mjs` (weapon dialog methods)

- [ ] **Step 1: Update weapon dialog template**

In `add-weapon.hbs`, after the Properties `</div>` (line 32), add before the closing `</div>`:

```handlebars

  <div class="form-group">
    <label class="tag-toggle thaumic-toggle">
      <input type="checkbox" name="thaumic" {{#if thaumic}}checked{{/if}}>
      <span>Thaumatech</span>
    </label>
  </div>

  <fieldset class="thaumatech-gambit-section">
    <legend>Weapon Gambit (optional)</legend>
    <div class="form-group">
      <label>Gambit Name</label>
      <input type="text" name="gambitName" value="{{gambitName}}" placeholder="Name of the weapon gambit">
    </div>
    <div class="form-group">
      <label>Gambit Effect</label>
      <input type="text" name="gambitDesc" value="{{gambitDesc}}" placeholder="What it does when used">
    </div>
  </fieldset>
```

- [ ] **Step 2: Update `#openWeaponDialog` in character-sheet.mjs**

In `#openWeaponDialog` (line 201-227), update the template data to include new fields and the callback to extract them.

Template data (the object passed to `renderTemplate`, around line 204-208) — add:
```js
thaumic: data.thaumic || false,
gambitName: data.gambitName || "",
gambitDesc: data.gambitDesc || "",
```

Callback return (around line 222) — change to:
```js
return {
  name: d.name || "", description: d.description || "",
  die: d.die || "d8", properties,
  thaumic: !!form.querySelector("input[name='thaumic']")?.checked,
  gambitName: d.gambitName || "", gambitDesc: d.gambitDesc || "",
};
```

- [ ] **Step 3: Verify in Foundry**

Open character sheet → click "+" on Weapons → confirm dialog shows Thaumatech checkbox and Gambit fields. Add a weapon with thaumic + gambit, verify it saves. Edit it, verify fields pre-fill.

- [ ] **Step 4: Commit**

```bash
git add foundry-system/mondas/templates/dialogs/add-weapon.hbs foundry-system/mondas/module/sheets/character-sheet.mjs
git commit -m "feat(weapon): add thaumatech checkbox and gambit fields to weapon dialog"
```

---

### Task 5: Equipment Dialog — Armor Value Field

**Files:**
- Modify: `foundry-system/mondas/templates/dialogs/add-equipment.hbs`
- Modify: `foundry-system/mondas/module/sheets/character-sheet.mjs` (equipment dialog methods)

- [ ] **Step 1: Update equipment dialog template**

In `add-equipment.hbs`, after the Quantity `</div>` (line 16), add before the Tags group:

```handlebars

  <div class="form-group">
    <label>Armor Value</label>
    <input type="number" name="armorValue" value="{{armorValue}}" min="0" max="3" placeholder="0 = not armor">
  </div>
```

- [ ] **Step 2: Update `#openEquipmentDialog` in character-sheet.mjs**

In `#openEquipmentDialog` (line 256-288), update template data to include:
```js
armorValue: data.armorValue ?? 0,
```

Update callback return (around line 279-283) to include:
```js
armorValue: Number(d.armorValue) || 0,
```

- [ ] **Step 3: Verify in Foundry**

Add equipment with armorValue = 2. Confirm it saves. The derived armor should update (visible once the sheet template is updated in Task 6).

- [ ] **Step 4: Commit**

```bash
git add foundry-system/mondas/templates/dialogs/add-equipment.hbs foundry-system/mondas/module/sheets/character-sheet.mjs
git commit -m "feat(equipment): add armorValue field to equipment dialog"
```

---

## Chunk 2: Sheet UI

### Task 6: Character Sheet Template — Banners, Armor, Badges

**Files:**
- Modify: `foundry-system/mondas/templates/actor/character.hbs`
- Modify: `foundry-system/mondas/module/sheets/character-sheet.mjs` (`_prepareContext`)

- [ ] **Step 1: Pass new derived values in `_prepareContext`**

In `character-sheet.mjs` `_prepareContext` (line 67-107), add after `context.armor = system.armor;` (line 86):

```js
context.wounded = system.wounded;
context.critical = system.critical;
context.incapacitated = system.incapacitated;
context.mustSpendDrain = system.mustSpendDrain;
context.autoSnags = system.autoSnags;
context.weaponChoices = system.weaponChoices;
```

- [ ] **Step 2: Add status banners to template**

In `character.hbs`, after the opening `<div class="tab-content"` line (line 16), before the stats row, add:

```handlebars
  {{!-- Status Banners --}}
  {{#if incapacitated}}<div class="status-banner banner-critical">INCAPACITATED — cannot act</div>{{/if}}
  {{#if critical}}<div class="status-banner banner-critical">CRITICAL — must spend Drain to act</div>{{/if}}
  {{#if wounded}}<div class="status-banner banner-wounded">WOUNDED — Snag on all rolls</div>{{/if}}
  {{#if cracked}}<div class="status-banner banner-cracked">CRACKED — Snag on all rolls</div>{{/if}}
```

- [ ] **Step 3: Change armor display to read-only**

In `character.hbs`, replace the armor track (lines 54-57):

```handlebars
    <div class="track">
      <span class="track-label">Armor</span>
      <span class="armor-value">{{armor}}</span>
    </div>
```

- [ ] **Step 4: Add armor badge to equipment cards**

In `character.hbs`, inside the equipment card's `.card-top` div, after the `qty-badge` span (line 179), add:

```handlebars
          {{#if armorValue}}<span class="armor-badge">🛡 {{armorValue}}</span>{{/if}}
```

- [ ] **Step 5: Add thaumatech badge and gambit to weapon cards**

In `character.hbs`, inside the weapon card's `.card-top` div, after the `die-badge` span (line 150), add:

```handlebars
          {{#if thaumic}}<span class="thaumatech-badge">⚡</span>{{/if}}
```

After the weapon card's properties section (after line 162, before closing `</div>`), add:

```handlebars
        {{#if gambitName}}
        <div class="card-gambit">
          <span class="gambit-icon">⚡</span>
          <span class="gambit-name">{{gambitName}}</span>
          {{#if gambitDesc}}<span class="gambit-effect">— {{gambitDesc}}</span>{{/if}}
        </div>
        {{/if}}
```

- [ ] **Step 6: Verify in Foundry**

Refresh browser. Check:
- Toggle a wounded harm box → amber "WOUNDED" banner appears
- Equipment with armorValue shows shield badge, armor value in resources row updates
- Thaumatech weapon shows ⚡ badge and gambit inline

- [ ] **Step 7: Commit**

```bash
git add foundry-system/mondas/templates/actor/character.hbs foundry-system/mondas/module/sheets/character-sheet.mjs
git commit -m "feat(sheet): status banners, derived armor display, equipment/weapon badges"
```

---

### Task 7: CSS — Banners, Badges, Pills

**Files:**
- Modify: `foundry-system/mondas/styles/mondas.css`

- [ ] **Step 1: Add status banner styles**

Add to the sheet section of `mondas.css`:

```css
/* === Status Banners === */
.mondas .status-banner {
  padding: 4px 10px;
  margin-bottom: 4px;
  border-radius: 3px;
  font-size: 0.8rem;
  font-weight: 700;
  text-align: center;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.mondas .banner-critical {
  background: var(--mondas-danger);
  color: #fff;
}
.mondas .banner-wounded {
  background: var(--mondas-wounded-color);
  color: #fff;
}
.mondas .banner-cracked {
  background: var(--mondas-drain-color);
  color: #fff;
}
```

- [ ] **Step 2: Add badge styles**

```css
/* === Card Badges === */
.mondas .armor-badge {
  font-size: 0.75rem;
  padding: 1px 5px;
  border-radius: 3px;
  background: #7a8a7a;
  color: #fff;
}
.mondas .thaumatech-badge {
  font-size: 0.75rem;
  padding: 1px 4px;
  border-radius: 3px;
  background: var(--mondas-drain-color);
  color: #fff;
}
.mondas .armor-value {
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 700;
  min-width: 2rem;
  text-align: center;
}
```

- [ ] **Step 3: Add roll dialog pill styles** (used in Task 8)

```css
/* === Roll Dialog: Pill Selectors === */
.mondas.roll-dialog .pill-row {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin: 4px 0;
}
.mondas.roll-dialog .pill {
  padding: 3px 8px;
  border: 1px solid var(--mondas-border);
  border-radius: 12px;
  font-size: 0.78rem;
  cursor: pointer;
  background: var(--mondas-bg);
  transition: background 0.15s, border-color 0.15s;
}
.mondas.roll-dialog .pill:hover {
  background: var(--mondas-hover-bg);
}
.mondas.roll-dialog .pill.active {
  background: var(--mondas-active-bg);
  color: var(--mondas-active-text);
  border-color: var(--mondas-active-bg);
}
.mondas.roll-dialog .pill .pill-die {
  font-size: 0.7rem;
  opacity: 0.8;
  margin-left: 2px;
}

/* Auto-snag pills */
.mondas.roll-dialog .snag-pill {
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.75rem;
  background: var(--mondas-wounded-color);
  color: #fff;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.mondas.roll-dialog .snag-pill .dismiss {
  cursor: pointer;
  font-weight: 700;
  opacity: 0.7;
}
.mondas.roll-dialog .snag-pill .dismiss:hover {
  opacity: 1;
}

/* Roll dialog warnings */
.mondas.roll-dialog .roll-warning {
  padding: 4px 8px;
  margin: 4px 0;
  border-radius: 3px;
  font-size: 0.78rem;
  font-weight: 600;
  text-align: center;
}
.mondas.roll-dialog .roll-warning.warning-critical {
  background: var(--mondas-danger);
  color: #fff;
}
.mondas.roll-dialog .roll-warning.warning-incapacitated {
  background: #6a1a1a;
  color: #fff;
}
```

- [ ] **Step 4: Verify in Foundry**

Check banners render with correct colors, badges appear on cards, pill base styles load (pills themselves come in Task 8).

- [ ] **Step 5: Commit**

```bash
git add foundry-system/mondas/styles/mondas.css
git commit -m "feat(css): status banners, card badges, roll dialog pill and warning styles"
```

---

## Chunk 3: Roll Dialog Automation

### Task 8: Roll Dialog — Auto-Snags, Weapon Pills, Cover, Warnings

**Files:**
- Modify: `foundry-system/mondas/module/rolls/stat-roll.mjs`
- Modify: `foundry-system/mondas/templates/rolls/roll-dialog.hbs`

- [ ] **Step 1: Update roll dialog constructor and context**

In `stat-roll.mjs`, update the constructor (lines 37-46) to initialize new state:

```js
constructor(actor, stat, rollType, options = {}) {
  super(options);
  this.actor = actor;
  this.stat = stat;
  this.rollType = rollType || "stakes";
  this.boons = 0;
  this.snags = 0;
  this.spendDrain = false;
  this.coverLevel = 0; // 0=none, 1=partial, 2=full

  // Auto-snags from actor state, filtered by roll type
  const allSnags = actor.system.autoSnags ?? [];
  this.activeAutoSnags = allSnags.filter((s) =>
    s.applies === "all" || s.applies === this.rollType,
  );
  this.dismissedSnags = new Set();

  // Weapon selection (combat only)
  this.selectedWeaponIndex = actor.system.defaultWeaponIndex ?? 0;
}
```

- [ ] **Step 2: Add new actions to DEFAULT_OPTIONS**

In the `actions` object (lines 23-26), add:

```js
dismissSnag: MondasRollDialog.#onDismissSnag,
selectWeapon: MondasRollDialog.#onSelectWeapon,
selectCover: MondasRollDialog.#onSelectCover,
```

- [ ] **Step 3: Update `_prepareContext` to pass new data**

Replace `_prepareContext` (lines 67-93) with:

```js
async _prepareContext(options) {
  const context = await super._prepareContext(options);
  const system = this.actor.system;
  const statValue = system.stats[this.stat];

  context.stat = this.stat;
  context.statLabel = game.i18n.localize(`MONDAS.Stat.${this.stat}`);
  context.statValue = statValue;
  context.rollType = this.rollType;
  context.rollTypeLabel = game.i18n.localize(`MONDAS.Roll.${this.rollType}`);
  context.boons = this.boons;
  context.snags = this.snags;
  context.spendDrain = this.spendDrain;
  context.drainAvailable = system.drain.value > 0;
  context.isCombat = this.rollType === "combat";
  context.isDefense = this.rollType === "defense";

  // Auto-snags (with dismiss tracking)
  context.autoSnags = this.activeAutoSnags.map((s, i) => ({
    ...s,
    index: i,
    dismissed: this.dismissedSnags.has(i),
  }));
  const activeAutoSnagCount = this.activeAutoSnags.filter(
    (_, i) => !this.dismissedSnags.has(i),
  ).length;

  // Weapon choices (combat only)
  context.weaponChoices = system.weaponChoices ?? [];
  context.selectedWeaponIndex = this.selectedWeaponIndex;

  // Cover (defense only)
  context.coverLevel = this.coverLevel;

  // Warnings
  context.incapacitated = system.incapacitated;
  context.mustSpendDrain = system.mustSpendDrain;
  context.showDrainWarning = system.mustSpendDrain && !this.spendDrain;

  // Calculate pool: stat + boons - (manual snags + active auto-snags) + drain
  const drainBonus = this.spendDrain ? 1 : 0;
  const totalSnags = this.snags + activeAutoSnagCount;
  const pool = Math.max(0, statValue + this.boons - totalSnags + drainBonus);
  context.pool = pool;
  context.totalSnags = totalSnags;
  context.poolZero = pool === 0;
  context.poolLabel = pool === 0 ? "2d6 take lowest" : `${pool}d6`;

  return context;
}
```

- [ ] **Step 4: Add new action handlers**

After the existing `#onAdjustSnags` handler (line 108), add:

```js
static #onDismissSnag(event, target) {
  const index = Number(target.dataset.index);
  if (this.dismissedSnags.has(index)) {
    this.dismissedSnags.delete(index);
  } else {
    this.dismissedSnags.add(index);
  }
  this.render();
}

static #onSelectWeapon(event, target) {
  this.selectedWeaponIndex = Number(target.dataset.index);
  this.render();
}

static #onSelectCover(event, target) {
  this.coverLevel = Number(target.dataset.cover);
  this.render();
}
```

- [ ] **Step 5: Update `#onExecuteRoll` for new features**

In `#onExecuteRoll` (lines 111-212), make these changes:

Replace pool calculation (lines 121-126) with:
```js
const system = this.actor.system;
const statValue = system.stats[this.stat];
const drainBonus = this.spendDrain ? 1 : 0;
const activeAutoSnagCount = this.activeAutoSnags.filter(
  (_, i) => !this.dismissedSnags.has(i),
).length;
const totalSnags = this.snags + activeAutoSnagCount;
const pool = Math.max(0, statValue + this.boons - totalSnags + drainBonus);
const isZeroPool = pool === 0;
```

Replace pool description (lines 134-139) with:
```js
const poolParts = [`Base ${statValue}`];
if (this.boons > 0) poolParts.push(`+${this.boons} Boon${this.boons > 1 ? "s" : ""}`);
if (totalSnags > 0) poolParts.push(`-${totalSnags} Snag${totalSnags > 1 ? "s" : ""}`);
if (this.spendDrain) poolParts.push("+1 Drain");
const poolDesc = poolParts.join(" ");
const poolLabel = isZeroPool ? "2d6 take lowest" : `${pool}d6`;
```

Replace weapon handling (lines 155-165) with:
```js
let weaponData = null;
const rolls = [statRoll];
if (this.rollType === "combat" && system.weaponChoices?.length > 0) {
  const weapon = system.weaponChoices[this.selectedWeaponIndex] || system.weaponChoices[0];
  const weaponRoll = new Roll(`1${weapon.die}`);
  await weaponRoll.evaluate();
  weaponData = {
    name: weapon.name || "Weapon",
    die: weapon.die,
    damage: weaponRoll.total,
  };
  rolls.push(weaponRoll);

  // Update last used weapon index
  await this.actor.update({ "system.lastWeaponIndex": this.selectedWeaponIndex });
}
```

In the flags object (lines 173-195), add after `weapon: weaponData`:
```js
coverArmor: this.rollType === "defense" ? this.coverLevel : 0,
```

- [ ] **Step 6: Rewrite roll-dialog.hbs template**

Replace the entire `roll-dialog.hbs` with:

```handlebars
{{!-- MONDAS Roll Dialog --}}
<div class="roll-config">
  <div class="stat-header">
    <span class="stat-name">{{statLabel}}</span>
    <span class="stat-base">{{rollTypeLabel}} — Base pool: {{statValue}}</span>
  </div>

  {{!-- Warnings --}}
  {{#if incapacitated}}
  <div class="roll-warning warning-incapacitated">INCAPACITATED — cannot act</div>
  {{/if}}
  {{#if showDrainWarning}}
  <div class="roll-warning warning-critical">CRITICAL — must spend Drain to act</div>
  {{/if}}

  {{!-- Auto-applied Snags --}}
  {{#if autoSnags.length}}
  <div class="modifier-row">
    <span class="modifier-label">Auto</span>
    <div class="pill-row">
      {{#each autoSnags}}
      {{#unless dismissed}}
      <span class="snag-pill" data-action="dismissSnag" data-index="{{index}}">
        {{source}} <span class="dismiss">✕</span>
      </span>
      {{/unless}}
      {{/each}}
    </div>
  </div>
  {{/if}}

  {{!-- Boons --}}
  <div class="modifier-row">
    <span class="modifier-label">Boons</span>
    <button type="button" data-action="adjustBoons" data-delta="-1">−</button>
    <span class="modifier-value">{{boons}}</span>
    <button type="button" data-action="adjustBoons" data-delta="1">+</button>
  </div>

  {{!-- Snags (manual) --}}
  <div class="modifier-row">
    <span class="modifier-label">Snags</span>
    <button type="button" data-action="adjustSnags" data-delta="-1">−</button>
    <span class="modifier-value">{{snags}}</span>
    <button type="button" data-action="adjustSnags" data-delta="1">+</button>
  </div>

  {{!-- Spend Drain --}}
  <div class="modifier-row">
    <label class="drain-toggle">
      <input type="checkbox" name="spendDrain" {{checked spendDrain}} {{#unless drainAvailable}}disabled{{/unless}} />
      Spend Drain (+1d)
    </label>
    {{#unless drainAvailable}}<span class="drain-empty">No drain available</span>{{/unless}}
  </div>

  {{!-- Weapon Selector (combat only) --}}
  {{#if isCombat}}
  <div class="modifier-row">
    <span class="modifier-label">Weapon</span>
    <div class="pill-row">
      {{#each weaponChoices}}
      <span class="pill {{#if (eq @index ../selectedWeaponIndex)}}active{{/if}}"
            data-action="selectWeapon" data-index="{{@index}}">
        {{name}} <span class="pill-die">{{die}}</span>
      </span>
      {{/each}}
    </div>
  </div>
  {{/if}}

  {{!-- Cover Selector (defense only) --}}
  {{#if isDefense}}
  <div class="modifier-row">
    <span class="modifier-label">Cover</span>
    <div class="pill-row">
      <span class="pill {{#if (eq coverLevel 0)}}active{{/if}}" data-action="selectCover" data-cover="0">None</span>
      <span class="pill {{#if (eq coverLevel 1)}}active{{/if}}" data-action="selectCover" data-cover="1">Partial +1</span>
      <span class="pill {{#if (eq coverLevel 2)}}active{{/if}}" data-action="selectCover" data-cover="2">Full +2</span>
    </div>
  </div>
  {{/if}}

  {{!-- Pool Preview --}}
  <div class="pool-preview">
    Rolling <strong>{{poolLabel}}</strong>
  </div>

  {{!-- Roll Button --}}
  <button type="button" class="roll-btn" data-action="executeRoll">Roll</button>
</div>
```

- [ ] **Step 7: Verify in Foundry**

Refresh browser. Test:
1. Set a character as Wounded → open any roll dialog → auto-snag pill "Wounded" shows, pool reduced by 1. Click ✕ to dismiss, pool goes back up.
2. Combat roll → weapon pill row shows Unarmed + any weapons. Click to select.
3. Defense roll → cover pill row shows None/Partial/Full.
4. Set Critical + don't check Drain → warning banner shows.
5. Roll combat → re-open → last weapon is pre-selected.

- [ ] **Step 8: Commit**

```bash
git add foundry-system/mondas/module/rolls/stat-roll.mjs foundry-system/mondas/templates/rolls/roll-dialog.hbs
git commit -m "feat(roll): auto-snag pills, weapon pill selector, cover picker, critical/incapacitated warnings"
```

---

## Chunk 4: Gambit Integration + Polish

### Task 9: Chat Gambits — Weapon Gambits + Drain Cost Label

**Files:**
- Modify: `foundry-system/mondas/module/rolls/chat-gambits.mjs`

- [ ] **Step 1: Add weapon gambits to `buildAvailableGambits`**

In `buildAvailableGambits` (lines 23-51), add after the equipment loop (after line 36) and before the edge loop:

```js
  // Weapon gambits
  for (const weapon of actor.system.weapons ?? []) {
    if (weapon.gambitName) {
      gambits.push({
        key: `weapon-${weapon.name}`,
        label: weapon.gambitName,
        desc: weapon.gambitDesc || "",
        source: weapon.thaumic ? "thaumatech" : "weapon",
      });
    }
  }
```

- [ ] **Step 2: Add drain cost label to thaumatech gambits in chat rendering**

In `_renderGambitList` (lines 334-344), update the HTML to show drain cost:

```js
function _renderGambitList(container, gambits, currentGambit) {
  if (!container) return;
  container.innerHTML = gambits.map((g) => {
    const selected = currentGambit?.key === g.key ? "selected" : "";
    const sourceClass = `gambit-source-${g.source}`;
    const drainLabel = g.source === "thaumatech" ? ' <span class="gambit-drain-cost">(costs Drain)</span>' : "";
    return `<div class="gambit-option ${selected} ${sourceClass}" data-gambit-key="${g.key}">
      <strong>${g.label}</strong> <span class="gambit-desc">${g.desc}</span>${drainLabel}
      <span class="gambit-source-tag">${g.source}</span>
    </div>`;
  }).join("");
}
```

- [ ] **Step 3: Add CSS for drain cost label**

In `mondas.css`, add:

```css
.gambit-drain-cost {
  font-size: 0.7rem;
  color: var(--mondas-drain-color);
  font-style: italic;
}
```

- [ ] **Step 4: Verify in Foundry**

Create a thaumatech weapon with a gambit. Make a combat roll. In the chat card gambit picker, verify the weapon gambit appears with "(costs Drain)" label.

- [ ] **Step 5: Commit**

```bash
git add foundry-system/mondas/module/rolls/chat-gambits.mjs foundry-system/mondas/styles/mondas.css
git commit -m "feat(gambits): weapon gambits in picker, drain cost label for thaumatech"
```

---

### Task 10: Cover Armor in Damage Pipeline

**Files:**
- Modify: `foundry-system/mondas/module/rolls/damage-roll.mjs`

The damage pipeline currently reads `system.armor`. Since armor is now derived from equipment, this already works. But cover armor from defense rolls needs to be applied too.

- [ ] **Step 1: Update `applyDamage` to accept cover armor**

Change function signature (line 8) to:

```js
export async function applyDamage(actor, rawDamage, coverArmor = 0) {
```

In Step 3 (lines 35-41), change:
```js
  if (remaining > 0) {
    const totalArmor = system.armor + coverArmor;
    const armorReduction = Math.min(remaining, totalArmor);
    remaining -= armorReduction;
    if (armorReduction > 0) {
      messages.push(`Armor absorbs ${armorReduction} (${system.armor} base${coverArmor > 0 ? ` + ${coverArmor} cover` : ""})`);
    }
  }
```

- [ ] **Step 2: Update `_bindApplyDamage` to pass cover**

In `_bindApplyDamage` in `chat-gambits.mjs` (lines 448-464), update to read cover from the message flags:

```js
function _bindApplyDamage(html) {
  html.querySelectorAll(".mondas-apply-damage").forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      event.preventDefault();
      const { applyDamage } = await import("./damage-roll.mjs");
      const damage = Number(btn.dataset.damage);
      const coverArmor = Number(btn.dataset.cover || 0);
      const targets = game.user.targets;
      if (targets.size === 0) {
        ui.notifications.warn("Select a target token first.");
        return;
      }
      for (const token of targets) {
        await applyDamage(token.actor, damage, coverArmor);
      }
    });
  });
}
```

Note: The `data-cover` attribute on the apply-damage button needs to be set from the roll flags when the chat card is rendered. This happens in `roll-chat.hbs` — add `data-cover="{{coverArmor}}"` to the apply-damage button there.

- [ ] **Step 3: Verify in Foundry**

Make a defense roll with Partial cover. Apply damage to a targeted token. Confirm damage report shows "Armor absorbs X (Y base + 1 cover)".

- [ ] **Step 4: Commit**

```bash
git add foundry-system/mondas/module/rolls/damage-roll.mjs foundry-system/mondas/module/rolls/chat-gambits.mjs
git commit -m "feat(damage): cover armor in damage pipeline"
```

---

### Task 11: Final Integration Verify

- [ ] **Step 1: Full test pass**

Walk through the complete flow in Foundry:
1. Create character with Grit 3, Sharp 2, Nerve 1
2. Add equipment "Flak Vest" with armorValue=2 → armor shows 2
3. Add weapon "Pistol" d8 sidearm, not thaumic
4. Add weapon "Spell Rod" d6 thaumatech with gambit "Arc Bolt" / "Lightning in a cone"
5. Toggle Wounded harm slot → banner appears, roll dialog shows auto-snag
6. Make combat roll → Unarmed + Pistol + Spell Rod pills, Pistol pre-selected (highest die)
7. Select Spell Rod, roll → next combat roll pre-selects Spell Rod
8. Dismiss Wounded snag in roll dialog → pool goes up by 1
9. Toggle Critical → warning shows in roll dialog
10. Make defense roll → cover pills appear, select Partial
11. Apply damage to target → cover armor included in damage report
12. Check gambit picker → Arc Bolt appears with "(costs Drain)"

- [ ] **Step 2: Final commit**

If any fixes were needed during the test pass, commit them:

```bash
git add -A && git commit -m "fix(automation): integration fixes from test pass"
```
