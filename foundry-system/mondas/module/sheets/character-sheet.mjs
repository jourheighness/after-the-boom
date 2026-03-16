import { EQUIPMENT_TAGS, PROPERTY_OPTIONS, DIE_OPTIONS } from "../constants.mjs";
import { getDialogForm } from "../helpers/dialog.mjs";

const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;

export class MondasCharacterSheet extends HandlebarsApplicationMixin(ActorSheetV2) {

  /** Track active tab across renders */
  _activeTab = "play";

  static DEFAULT_OPTIONS = {
    classes: ["mondas", "character-sheet"],
    position: { width: 740, height: 820 },
    actions: {
      rollStat: MondasCharacterSheet.#onRollStat,
      addEdge: MondasCharacterSheet.#onAddEdge,
      editEdge: MondasCharacterSheet.#onEditEdge,
      removeEdge: MondasCharacterSheet.#onRemoveEdge,
      addWeapon: MondasCharacterSheet.#onAddWeapon,
      editWeapon: MondasCharacterSheet.#onEditWeapon,
      removeWeapon: MondasCharacterSheet.#onRemoveWeapon,
      attackWeapon: MondasCharacterSheet.#onAttackWeapon,
      addEquipment: MondasCharacterSheet.#onAddEquipment,
      editEquipment: MondasCharacterSheet.#onEditEquipment,
      removeEquipment: MondasCharacterSheet.#onRemoveEquipment,
      toggleHarm: MondasCharacterSheet.#onToggleHarm,
      toggleCondition: MondasCharacterSheet.#onToggleCondition,
      toggleGuardBox: MondasCharacterSheet.#onToggleGuardBox,
      toggleDrainBox: MondasCharacterSheet.#onToggleDrainBox,
      showEdge: MondasCharacterSheet.#onShowEdge,
      showWeapon: MondasCharacterSheet.#onShowWeapon,
      showEquipment: MondasCharacterSheet.#onShowEquipment,
      editBackground: MondasCharacterSheet.#onEditBackground,
      addScar: MondasCharacterSheet.#onAddScar,
      removeScar: MondasCharacterSheet.#onRemoveScar,
      openDamageDialog: MondasCharacterSheet.#onOpenDamageDialog,
      addTrackedDie: MondasCharacterSheet.#onAddTrackedDie,
      rollTrackedDie: MondasCharacterSheet.#onRollTrackedDie,
      removeTrackedDie: MondasCharacterSheet.#onRemoveTrackedDie,
      clearSetupDie: MondasCharacterSheet.#onClearSetupDie,
      switchTab: MondasCharacterSheet.#onSwitchTab,
    },
    form: {
      submitOnChange: true,
    },
    window: {
      resizable: true,
    },
  };

  static PARTS = {
    header:    { template: "systems/mondas/templates/actor/header.hbs" },
    tabs:      { template: "systems/mondas/templates/actor/tabs.hbs" },
    play:      { template: "systems/mondas/templates/actor/sheet.hbs",
                 scrollable: [""] },
    gear:      { template: "systems/mondas/templates/actor/gear.hbs",
                 scrollable: [""] },
    character: { template: "systems/mondas/templates/actor/character.hbs",
                 scrollable: [""] },
    notes:     { template: "systems/mondas/templates/actor/notes.hbs",
                 scrollable: [""] },
  };

  /* ---- Tooltip (shared DOM element, escapes overflow) ---- */

  _onRender(context, options) {
    super._onRender(context, options);
    MondasCharacterSheet.#initTooltip(this.element);
  }

  static #tipEl = null;

  static #initTooltip(root) {
    // Create shared tooltip element once
    if (!MondasCharacterSheet.#tipEl) {
      const el = document.createElement("div");
      el.id = "mondas-tip";
      document.body.appendChild(el);
      MondasCharacterSheet.#tipEl = el;
    }
    const tip = MondasCharacterSheet.#tipEl;

    root.querySelectorAll("[data-tip]").forEach((node) => {
      node.addEventListener("pointerenter", (e) => {
        const text = node.getAttribute("data-tip");
        if (!text) return;
        tip.textContent = text;
        tip.style.display = "block";
        tip.style.left = "0";
        tip.style.top = "0";
        const rect = node.getBoundingClientRect();
        const tipRect = tip.getBoundingClientRect();
        let left = rect.left;
        let top = rect.bottom + 6;
        // Clamp to viewport edges
        if (left + tipRect.width > window.innerWidth - 8) left = window.innerWidth - tipRect.width - 8;
        if (left < 8) left = 8;
        if (top + tipRect.height > window.innerHeight - 8) top = rect.top - tipRect.height - 6;
        tip.style.left = `${left}px`;
        tip.style.top = `${top}px`;
        requestAnimationFrame(() => tip.classList.add("visible"));
      });
      node.addEventListener("pointerleave", () => {
        tip.classList.remove("visible");
        tip.style.display = "none";
      });
    });
  }

  /** Prepare data for rendering */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.actor = this.actor;
    const system = this.actor.system;

    context.system = system;
    context.systemFields = system.schema.fields;

    // Stat data for clickable blocks
    context.stats = ["grit", "sharp", "nerve"].map((key) => ({
      key,
      label: game.i18n.localize(`MONDAS.Stat.${key}`),
      value: system.stats[key],
    }));

    // Guard/Drain display — remaining = max - value (checked boxes = spent)
    context.guard = system.guard;
    context.drain = system.drain;
    context.guardRemaining = system.guard.max - system.guard.value;
    context.drainRemaining = system.drain.max - system.drain.value;
    context.armor = system.armor;
    context.scars = system.scars;

    // Harm
    context.harm = system.harm;
    context.conditions = system.conditions;

    // Derived harm states — compute directly for reliability
    context.wounded = system.harm.wounded.slot1.filled || system.harm.wounded.slot2.filled;
    context.critical = system.harm.critical.slot1.filled || system.harm.critical.slot2.filled;
    context.cracked = system.drain.value >= system.drain.max;
    context.incapacitated = context.wounded && context.cracked;
    context.mustSpendDrain = context.critical;

    // Any active condition or sustained-self die? Hide panel if empty
    const hasTrackedSelf = (system.trackedDice ?? []).some((d) => d.type === "sustained-self");
    context.hasConditions = system.conditions.stunned || system.conditions.shaken || system.conditions.prone || system.conditions.pinned
      || context.cracked || context.wounded || context.critical || hasTrackedSelf;

    // Setup die
    context.setupDie = system.setupDie;

    // Lists
    context.weapons = (system.weapons ?? []).map((w) => {
      const isSustained = w.die.startsWith("s");
      const tipLines = [];
      if (w.description) tipLines.push(w.description);
      if (w.properties?.length) tipLines.push(w.properties.join(", "));
      if (w.gambitName) tipLines.push(`\u2680 ${w.gambitName}${w.gambitDesc ? " — " + w.gambitDesc : ""}`);
      return {
        ...w,
        isThrown: (w.properties ?? []).includes("thrown"),
        isSustained,
        dieBadge: isSustained ? w.die.slice(1) : w.die,
        tip: tipLines.join("\n"),
      };
    });
    context.edges = (system.edges ?? []).map((e) => {
      const tipLines = [];
      if (e.mechanical) tipLines.push(e.mechanical);
      if (e.gambitName) tipLines.push(`\u2680 ${e.gambitName}${e.gambitDesc ? " — " + e.gambitDesc : ""}`);
      return { ...e, tip: tipLines.join("\n") };
    });
    context.equipment = (system.equipment ?? []).map((eq) => {
      const tipLines = [];
      if (eq.description) tipLines.push(eq.description);
      if (eq.gambitName) tipLines.push(`\u2680 ${eq.gambitName}${eq.gambitDesc ? " — " + eq.gambitDesc : ""}`);
      return { ...eq, tip: tipLines.join("\n") };
    });

    // Tracked dice — split into outgoing (tracking) and incoming (on you)
    const tracked = system.trackedDice ?? [];
    context.trackedOut = tracked
      .map((d, i) => ({ ...d, realIndex: i }))
      .filter((d) => d.type === "sustained-enemy");
    context.trackedSelf = tracked
      .map((d, i) => ({ ...d, realIndex: i }))
      .filter((d) => d.type === "sustained-self");

    // Notes (enriched for ProseMirror)
    context.enrichedNotes = await foundry.applications.ux.TextEditor.implementation.enrichHTML(system.notes, {
      secrets: this.actor.isOwner,
      rollData: this.actor.getRollData?.(),
    });
    context.editable = this.isEditable;

    // Tab state
    context.activeTab = this._activeTab;

    context.background = system.background;

    return context;
  }

  /* ---------------------------------------- */
  /*  Action Handlers                         */
  /* ---------------------------------------- */

  /** Click a stat roll button — reads rollType from the button */
  static async #onRollStat(event, target) {
    const stat = target.dataset.stat;
    const rollType = target.dataset.rollType;
    const { MondasRollDialog } = await import("../rolls/stat-roll.mjs");
    MondasRollDialog.create(this.actor, stat, rollType);
  }

  /** Toggle guard box — clicking box N fills up to N+1 or unfills from N */
  static async #onToggleGuardBox(event, target) {
    const index = Number(target.dataset.index);
    const current = this.actor.system.guard.value;
    const newVal = (index < current) ? index : index + 1;
    await this.actor.update({ "system.guard.value": Math.clamp(newVal, 0, this.actor.system.guard.max) });
  }

  /** Toggle drain box */
  static async #onToggleDrainBox(event, target) {
    const index = Number(target.dataset.index);
    const current = this.actor.system.drain.value;
    const newVal = (index < current) ? index : index + 1;
    await this.actor.update({ "system.drain.value": Math.clamp(newVal, 0, this.actor.system.drain.max) });
  }

  /** Add a scar */
  static async #onAddScar(event, target) {
    const scars = [...this.actor.system.toObject().scars, ""];
    await this.actor.update({ "system.scars": scars });
  }

  /** Remove a scar */
  static async #onRemoveScar(event, target) {
    const index = Number(target.dataset.index);
    const scars = this.actor.system.toObject().scars.filter((_, i) => i !== index);
    await this.actor.update({ "system.scars": scars });
  }

  /* ---- Edge dialogs ---- */

  static async #openEdgeDialog(title, label, data = {}) {
    const content = await renderTemplate(
      "systems/mondas/templates/dialogs/add-edge.hbs",
      { name: data.name || "", mechanical: data.mechanical || "", gambitName: data.gambitName || "", gambitDesc: data.gambitDesc || "" },
    );
    return foundry.applications.api.DialogV2.prompt({
      classes: ["mondas-dialog"],
      window: { title },
      position: { width: 480 },
      content,
      ok: {
        label,
        callback: (event, button, dialog) => {
          const form = getDialogForm(event, button);
          if (!form) return null;
          const fd = new FormDataExtended(form);
          const d = fd.object;
          return { name: d.name || "", mechanical: d.mechanical || "", gambitName: d.gambitName || "", gambitDesc: d.gambitDesc || "" };
        },
      },
      rejectClose: false,
    });
  }

  static async #onAddEdge(event, target) {
    const result = await MondasCharacterSheet.#openEdgeDialog("Add Edge", "Add");
    if (!result) return;
    const edges = [...this.actor.system.toObject().edges, result];
    await this.actor.update({ "system.edges": edges });
  }

  static async #onEditEdge(event, target) {
    const index = Number(target.dataset.index);
    const existing = this.actor.system.edges[index];
    if (!existing) return;
    const result = await MondasCharacterSheet.#openEdgeDialog("Edit Edge", "Save", existing);
    if (!result) return;
    const edges = this.actor.system.toObject().edges;
    edges[index] = result;
    await this.actor.update({ "system.edges": edges });
  }

  /** Remove edge by index */
  static async #onRemoveEdge(event, target) {
    const index = Number(target.dataset.index);
    const edges = this.actor.system.toObject().edges.filter((_, i) => i !== index);
    await this.actor.update({ "system.edges": edges });
  }

  /* ---- Weapon dialogs ---- */

  static async #openWeaponDialog(title, label, data = {}) {
    const content = await renderTemplate(
      "systems/mondas/templates/dialogs/add-weapon.hbs",
      {
        name: data.name || "", description: data.description || "",
        die: data.die || "d8",
        allProperties: [...(data.properties || []), ...(data.thaumic ? ["thaumatech"] : [])],
        dieOptions: DIE_OPTIONS, propertyOptions: PROPERTY_OPTIONS,
        quantity: data.quantity ?? 1,
        gambitName: data.gambitName || "", gambitDesc: data.gambitDesc || "",
      },
    );
    return foundry.applications.api.DialogV2.prompt({
      classes: ["mondas-dialog"],
      window: { title },
      position: { width: 480 },
      content,
      ok: {
        label,
        callback: (event, button, dialog) => {
          const form = getDialogForm(event, button);
          if (!form) return null;
          const fd = new FormDataExtended(form);
          const d = fd.object;
          const allProps = [];
          form.querySelectorAll("input[name='property']:checked").forEach((cb) => allProps.push(cb.value));
          const thaumic = allProps.includes("thaumatech");
          const properties = allProps.filter((p) => p !== "thaumatech");
          return {
            name: d.name || "", description: d.description || "",
            die: d.die || "d8", properties, thaumic,
            quantity: Math.max(0, parseInt(d.quantity, 10) || 1),
            gambitName: d.gambitName || "", gambitDesc: d.gambitDesc || "",
          };
        },
      },
      rejectClose: false,
    });
  }

  static async #onAddWeapon(event, target) {
    const result = await MondasCharacterSheet.#openWeaponDialog("Add Weapon", "Add");
    if (!result) return;
    const weapons = [...this.actor.system.toObject().weapons, result];
    await this.actor.update({ "system.weapons": weapons });
  }

  static async #onEditWeapon(event, target) {
    const index = Number(target.dataset.index);
    const existing = this.actor.system.weapons[index];
    if (!existing) return;
    const result = await MondasCharacterSheet.#openWeaponDialog("Edit Weapon", "Save", existing);
    if (!result) return;
    const weapons = this.actor.system.toObject().weapons;
    weapons[index] = result;
    await this.actor.update({ "system.weapons": weapons });
  }

  /** Remove weapon by index */
  static async #onRemoveWeapon(event, target) {
    const index = Number(target.dataset.index);
    const weapons = this.actor.system.toObject().weapons.filter((_, i) => i !== index);
    await this.actor.update({ "system.weapons": weapons });
  }

  /** Attack with a weapon — open roll dialog for boons/snags/drain, then roll */
  static async #onAttackWeapon(event, target) {
    const index = Number(target.dataset.index);
    const weapon = this.actor.system.weapons?.[index];
    if (!weapon) return;

    // Thrown: bail if spent
    if ((weapon.properties ?? []).includes("thrown") && weapon.quantity <= 0) return;

    const { MondasRollDialog } = await import("../rolls/stat-roll.mjs");
    MondasRollDialog.create(this.actor, null, "combat", {
      weapon: { ...weapon, weaponIndex: index },
    });
  }

  /* ---- Equipment dialogs ---- */

  static async #openEquipmentDialog(title, label, data = {}) {
    const existingTags = data.tags || [];
    const presetSet = new Set(EQUIPMENT_TAGS);
    const customTags = existingTags.filter((t) => !presetSet.has(t)).join(", ");
    const content = await renderTemplate(
      "systems/mondas/templates/dialogs/add-equipment.hbs",
      {
        tags: EQUIPMENT_TAGS,
        name: data.name || "", description: data.description || "",
        quantity: data.quantity ?? 1,
        armorValue: data.armorValue ?? 0,
        gambitName: data.gambitName || "", gambitDesc: data.gambitDesc || "",
        checkedTags: existingTags,
        customTags,
      },
    );
    return foundry.applications.api.DialogV2.prompt({
      classes: ["mondas-dialog"],
      window: { title },
      position: { width: 480 },
      content,
      ok: {
        label,
        callback: (event, button, dialog) => {
          const form = getDialogForm(event, button);
          if (!form) return null;
          const fd = new FormDataExtended(form);
          const d = fd.object;
          const tags = [];
          form.querySelectorAll("input[name='tag']:checked").forEach((cb) => tags.push(cb.value));
          const customRaw = (d.customTags || "").split(",").map((t) => t.trim().toLowerCase()).filter(Boolean);
          for (const ct of customRaw) { if (!tags.includes(ct)) tags.push(ct); }
          return {
            name: d.name || "", description: d.description || "",
            quantity: Number(d.quantity) || 1, tags,
            armorValue: Number(d.armorValue) || 0,
            gambitName: d.gambitName || "", gambitDesc: d.gambitDesc || "",
          };
        },
      },
      rejectClose: false,
    });
  }

  static async #onAddEquipment(event, target) {
    const result = await MondasCharacterSheet.#openEquipmentDialog("Add Equipment", "Add");
    if (!result) return;
    const equipment = [...this.actor.system.toObject().equipment, result];
    await this.actor.update({ "system.equipment": equipment });
  }

  static async #onEditEquipment(event, target) {
    const index = Number(target.dataset.index);
    const existing = this.actor.system.equipment[index];
    if (!existing) return;
    const result = await MondasCharacterSheet.#openEquipmentDialog("Edit Equipment", "Save", existing);
    if (!result) return;
    const equipment = this.actor.system.toObject().equipment;
    equipment[index] = result;
    await this.actor.update({ "system.equipment": equipment });
  }

  /** Remove equipment by index */
  static async #onRemoveEquipment(event, target) {
    const index = Number(target.dataset.index);
    const equipment = this.actor.system.toObject().equipment.filter((_, i) => i !== index);
    await this.actor.update({ "system.equipment": equipment });
  }

  /* ---- Show in Chat ---- */

  static #chatCard(body) {
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      content: `<div class="mondas-item-card">${body}</div>`,
      style: CONST.CHAT_MESSAGE_STYLES.OTHER,
    });
  }

  static async #onShowEdge(event, target) {
    const edge = this.actor.system.edges[Number(target.dataset.index)];
    if (!edge?.name) return;
    let html = `<div class="card-chat-header">${edge.name}</div>`;
    if (edge.mechanical) html += `<p class="card-chat-desc">${edge.mechanical}</p>`;
    if (edge.gambitName) html += `<div class="card-chat-tags"><span class="tag"><i class="fa-solid fa-dice-four"></i> ${edge.gambitName}</span></div>${edge.gambitDesc ? `<p class="card-chat-desc">${edge.gambitDesc}</p>` : ""}`;
    await MondasCharacterSheet.#chatCard.call(this, html);
  }

  static async #onShowWeapon(event, target) {
    const w = this.actor.system.weapons[Number(target.dataset.index)];
    if (!w?.name) return;
    let html = `<div class="card-chat-header">${w.name} <span class="card-chat-die">${w.die}</span></div>`;
    if (w.description) html += `<p class="card-chat-desc">${w.description}</p>`;
    if (w.properties?.length) html += `<div class="card-chat-tags">${w.properties.map((p) => `<span class="tag">${p}</span>`).join("")}</div>`;
    if (w.gambitName) html += `<div class="card-chat-tags"><span class="tag"><i class="fa-solid fa-dice-four"></i> ${w.gambitName}</span></div>${w.gambitDesc ? `<p class="card-chat-desc">${w.gambitDesc}</p>` : ""}`;
    await MondasCharacterSheet.#chatCard.call(this, html);
  }

  static async #onShowEquipment(event, target) {
    const eq = this.actor.system.equipment[Number(target.dataset.index)];
    if (!eq?.name) return;
    let html = `<div class="card-chat-header">${eq.name} <span class="card-chat-qty">×${eq.quantity}</span></div>`;
    if (eq.description) html += `<p class="card-chat-desc">${eq.description}</p>`;
    if (eq.tags?.length) html += `<div class="card-chat-tags">${eq.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>`;
    if (eq.gambitName) html += `<div class="card-chat-tags"><span class="tag"><i class="fa-solid fa-dice-four"></i> ${eq.gambitName}</span></div>${eq.gambitDesc ? `<p class="card-chat-desc">${eq.gambitDesc}</p>` : ""}`;
    await MondasCharacterSheet.#chatCard.call(this, html);
  }

  /* ---- Background ---- */

  static async #onEditBackground(event, target) {
    const current = this.actor.system.background || "";
    const result = await foundry.applications.api.DialogV2.prompt({
      classes: ["mondas-dialog"],
      window: { title: "Background" },
      content: `<div class="mondas-dialog-body"><textarea name="background" rows="10" placeholder="2-4 sentences..." autofocus>${current}</textarea></div>`,
      ok: {
        label: "Save",
        callback: (event, button) => {
          const form = getDialogForm(event, button);
          if (!form) return null;
          return new FormDataExtended(form).object.background ?? "";
        },
      },
      rejectClose: false,
    });
    if (result === null || result === undefined) return;
    await this.actor.update({ "system.background": result });
  }

  /* ---- Other toggles ---- */

  /** Toggle a harm slot */
  static async #onToggleHarm(event, target) {
    event.preventDefault();
    const { level, slot } = target.dataset;
    const path = `system.harm.${level}.${slot}.filled`;
    const current = foundry.utils.getProperty(this.actor, path);
    await this.actor.update({ [path]: !current });
  }

  /** Toggle a condition */
  static async #onToggleCondition(event, target) {
    event.preventDefault();
    const condition = target.dataset.condition;
    const path = `system.conditions.${condition}`;
    const current = foundry.utils.getProperty(this.actor, path);
    await this.actor.update({ [path]: !current });
  }

  /* ---- Damage Dialog ---- */

  static async #onOpenDamageDialog(event, target) {
    const conditions = this.actor.system.conditions;
    const defaultLabel = MondasCharacterSheet.#nextLabel(this.actor.system.trackedDice, "sustained-self");
    const content = `<form class="mondas-dialog-body damage-dialog">
      <div class="form-group">
        <label>Damage</label>
        <input type="number" name="damage" min="0" value="" placeholder="—" autofocus>
      </div>
      <div class="tag-toggles damage-conditions">
        <label class="tag-toggle"><input type="checkbox" name="stunned" ${conditions.stunned ? "checked" : ""}> Stunned</label>
        <label class="tag-toggle"><input type="checkbox" name="shaken" ${conditions.shaken ? "checked" : ""}> Shaken</label>
        <label class="tag-toggle"><input type="checkbox" name="prone" ${conditions.prone ? "checked" : ""}> Prone</label>
        <label class="tag-toggle"><input type="checkbox" name="pinned" ${conditions.pinned ? "checked" : ""}> Pinned</label>
      </div>
      <fieldset>
        <legend>Add Sustained Die</legend>
        <div class="form-group">
          <label>Die</label>
          <select name="sustainedDie">
            <option value="">None</option>
            <option value="d4s">d4s</option>
            <option value="d6s">d6s</option>
            <option value="d8s">d8s</option>
            <option value="d10s">d10s</option>
          </select>
        </div>
        <div class="form-group">
          <label>Label</label>
          <input type="text" name="sustainedLabel" placeholder="${defaultLabel}" maxlength="24">
        </div>
      </fieldset>
    </form>`;

    const result = await foundry.applications.api.DialogV2.prompt({
      classes: ["mondas-dialog"],
      window: { title: "Damage" },
      position: { width: 400 },
      content,
      ok: {
        label: "Apply",
        callback: (event, button) => {
          const form = getDialogForm(event, button);
          if (!form) return null;
          const fd = new FormDataExtended(form);
          const d = fd.object;
          return {
            damage: parseInt(d.damage, 10) || 0,
            stunned: !!d.stunned,
            shaken: !!d.shaken,
            prone: !!d.prone,
            pinned: !!d.pinned,
            sustainedDie: d.sustainedDie || "",
            sustainedLabel: d.sustainedLabel || "",
          };
        },
      },
      rejectClose: false,
    });

    if (!result) return;

    // Apply conditions
    const updates = {
      "system.conditions.stunned": result.stunned,
      "system.conditions.shaken": result.shaken,
      "system.conditions.prone": result.prone,
      "system.conditions.pinned": result.pinned,
    };

    // Add sustained die if selected
    if (result.sustainedDie) {
      const label = result.sustainedLabel || MondasCharacterSheet.#nextLabel(this.actor.system.trackedDice, "sustained-self");
      const dice = [...this.actor.system.toObject().trackedDice, {
        die: result.sustainedDie,
        label,
        type: "sustained-self",
      }];
      updates["system.trackedDice"] = dice;
    }

    await this.actor.update(updates);

    // Apply damage through pipeline if > 0
    if (result.damage > 0) {
      const { applyDamage } = await import("../rolls/damage-roll.mjs");
      await applyDamage(this.actor, result.damage);
    }
  }

  /* ---- Tracked Dice ---- */

  static async #onAddTrackedDie(event, target) {
    const dtype = target.dataset.dtype;

    // "On You" panel — go straight to sustained-self
    if (dtype === "sustained-self") {
      return MondasCharacterSheet.#openSustainedDialog.call(this, dtype);
    }

    // "Tracking" panel — choose Setup Die or Sustained Die first
    const hasSetup = this.actor.system.setupDie?.active;
    const content = `<div class="mondas-dialog-body track-chooser">
      <p class="track-chooser-prompt">What are you tracking?</p>
    </div>`;
    const choice = await foundry.applications.api.DialogV2.wait({
      classes: ["mondas-dialog", "track-chooser-dialog"],
      window: { title: "Add Tracked Die" },
      position: { width: 320 },
      content,
      buttons: [
        { action: "setup", label: "Setup Die", disabled: hasSetup },
        { action: "sustained", label: "Sustained Die" },
      ],
      rejectClose: false,
    });

    if (choice === "setup") {
      return MondasCharacterSheet.#openSetupDialog.call(this);
    } else if (choice === "sustained") {
      return MondasCharacterSheet.#openSustainedDialog.call(this, dtype);
    }
  }

  /** Dialog: add a Setup Die (max 1) */
  static async #openSetupDialog() {
    if (this.actor.system.setupDie?.active) {
      ui.notifications.warn("Already have a setup die. Clear the existing one first.");
      return;
    }
    const content = `<form class="mondas-dialog-body">
      <div class="form-group">
        <label>Value (1–6)</label>
        <input type="number" name="value" min="1" max="6" value="4" autofocus>
      </div>
      <div class="form-group">
        <label>Source</label>
        <input type="text" name="source" placeholder="Setup gambit" maxlength="24">
      </div>
    </form>`;
    const result = await foundry.applications.api.DialogV2.prompt({
      classes: ["mondas-dialog"],
      window: { title: "Add Setup Die" },
      position: { width: 320 },
      content,
      ok: {
        label: "Add",
        callback: (event, button) => {
          const form = getDialogForm(event, button);
          if (!form) return null;
          const fd = new FormDataExtended(form);
          const d = fd.object;
          return { value: Math.clamp(parseInt(d.value, 10) || 4, 1, 6), source: d.source || "" };
        },
      },
      rejectClose: false,
    });
    if (!result) return;
    await this.actor.update({
      "system.setupDie": { active: true, value: result.value, source: result.source },
    });
  }

  /** Generate next default label for a tracked die type */
  static #nextLabel(trackedDice, dtype) {
    const prefix = dtype === "sustained-enemy" ? "TRGT" : "SUST";
    const existing = (trackedDice ?? []).filter((d) => d.type === dtype);
    let n = existing.length + 1;
    const usedLabels = new Set(existing.map((d) => d.label));
    while (usedLabels.has(`${prefix}${n}`)) n++;
    return `${prefix}${n}`;
  }

  /** Dialog: add a Sustained Die */
  static async #openSustainedDialog(dtype) {
    const defaultLabel = MondasCharacterSheet.#nextLabel(this.actor.system.trackedDice, dtype);
    const content = `<form class="mondas-dialog-body">
      <div class="form-group">
        <label>Die</label>
        <select name="die" autofocus>
          <option value="d4s">d4s</option>
          <option value="d6s" selected>d6s</option>
          <option value="d8s">d8s</option>
          <option value="d10s">d10s</option>
        </select>
      </div>
      <div class="form-group">
        <label>Label</label>
        <input type="text" name="label" value="${defaultLabel}" maxlength="24">
      </div>
    </form>`;
    const result = await foundry.applications.api.DialogV2.prompt({
      classes: ["mondas-dialog"],
      window: { title: "Add Sustained Die" },
      position: { width: 320 },
      content,
      ok: {
        label: "Add",
        callback: (event, button) => {
          const form = getDialogForm(event, button);
          if (!form) return null;
          const fd = new FormDataExtended(form);
          const d = fd.object;
          return { die: d.die || "d6s", label: d.label || defaultLabel };
        },
      },
      rejectClose: false,
    });
    if (!result) return;
    const dice = [...this.actor.system.toObject().trackedDice, { ...result, type: dtype }];
    await this.actor.update({ "system.trackedDice": dice });
  }

  static async #onRollTrackedDie(event, target) {
    // Don't trigger if the × close button was clicked
    if (event.target.closest(".die-close")) return;
    const index = Number(target.dataset.index);
    const dice = this.actor.system.toObject().trackedDice;
    const tracked = dice[index];
    if (!tracked) return;

    // Parse die — strip the "s" suffix for the roll formula
    const dieType = tracked.die.replace(/s$/, "");
    const roll = await new Roll(`1${dieType}`).evaluate();
    const value = roll.total;
    const burnedOut = value === 1;

    // Build chat content
    const label = tracked.label || `sustained ${dieType}`;
    const isSelf = tracked.type === "sustained-self";
    let resultText;
    if (burnedOut) {
      resultText = `<strong>Burned out!</strong> ${label} — rolled 1, effect ends.`;
    } else {
      resultText = `<strong>${value} damage</strong> — ${label} (${dieType})`;
    }

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      content: `<div class="mondas-item-card">${resultText}</div>`,
      rolls: [roll],
    });

    // Apply damage to self if sustained-self
    if (isSelf && !burnedOut) {
      const { applyDamage } = await import("../rolls/damage-roll.mjs");
      await applyDamage(this.actor, value);
    }

    // Remove on burnout
    if (burnedOut) {
      const updated = dice.filter((_, i) => i !== index);
      await this.actor.update({ "system.trackedDice": updated });
    }
  }

  static async #onRemoveTrackedDie(event, target) {
    event.stopPropagation();
    const index = Number(target.dataset.index);
    const dice = this.actor.system.toObject().trackedDice.filter((_, i) => i !== index);
    await this.actor.update({ "system.trackedDice": dice });
  }

  static async #onClearSetupDie(event, target) {
    event.stopPropagation();
    await this.actor.update({ "system.setupDie": { active: false, value: 0, source: "" } });
  }

  /** Switch tabs */
  static #onSwitchTab(event, target) {
    this._activeTab = target.dataset.tab;
    this.render();
  }
}
