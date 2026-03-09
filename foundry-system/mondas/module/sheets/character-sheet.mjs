const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;

/** Tags available for equipment */
const EQUIPMENT_TAGS = ["thaumatech", "licensed", "restricted", "prohibited", "black-market", "mundane"];

/** Weapon property options */
const PROPERTY_OPTIONS = ["ranged", "sidearm", "thrown", "area", "long", "loud", "brutal", "subtle", "slow"];

/** Die options for weapons */
const DIE_OPTIONS = { d6: "d6", d8: "d8", d10: "d10", d12: "d12" };

/**
 * Extract form data from a DialogV2 callback.
 * Foundry v13 DialogV2 passes (event, button, dialog) — the form lives
 * inside the dialog element, not as a parent of the button.
 */
function getDialogForm(event, button) {
  return button.form;
}

export class MondasCharacterSheet extends HandlebarsApplicationMixin(ActorSheetV2) {

  /** Track active tab across renders */
  _activeTab = "sheet";

  static DEFAULT_OPTIONS = {
    classes: ["mondas", "sheet", "actor", "character"],
    position: { width: 680, height: 720 },
    actions: {
      rollStat: MondasCharacterSheet.#onRollStat,
      addEdge: MondasCharacterSheet.#onAddEdge,
      editEdge: MondasCharacterSheet.#onEditEdge,
      removeEdge: MondasCharacterSheet.#onRemoveEdge,
      addWeapon: MondasCharacterSheet.#onAddWeapon,
      editWeapon: MondasCharacterSheet.#onEditWeapon,
      removeWeapon: MondasCharacterSheet.#onRemoveWeapon,
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
      addScar: MondasCharacterSheet.#onAddScar,
      removeScar: MondasCharacterSheet.#onRemoveScar,
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
    sheet: {
      template: "systems/mondas/templates/actor/character.hbs",
    },
  };

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

    // Guard/Drain display
    context.guard = system.guard;
    context.drain = system.drain;
    context.cracked = system.cracked;
    context.armor = system.armor;
    context.scars = system.scars;

    // Harm
    context.harm = system.harm;
    context.conditions = system.conditions;

    // Derived harm states
    context.wounded = system.wounded;
    context.critical = system.critical;
    context.incapacitated = system.incapacitated;
    context.mustSpendDrain = system.mustSpendDrain;

    // Lists
    context.edges = system.edges;
    context.weapons = system.weapons;
    context.equipment = system.equipment;

    // Notes
    context.notes = system.notes;

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
      window: { title },
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
        die: data.die || "d8", properties: data.properties || [],
        dieOptions: DIE_OPTIONS, propertyOptions: PROPERTY_OPTIONS,
        thaumic: data.thaumic || false,
        gambitName: data.gambitName || "", gambitDesc: data.gambitDesc || "",
      },
    );
    return foundry.applications.api.DialogV2.prompt({
      window: { title },
      content,
      ok: {
        label,
        callback: (event, button, dialog) => {
          const form = getDialogForm(event, button);
          if (!form) return null;
          const fd = new FormDataExtended(form);
          const d = fd.object;
          const properties = [];
          form.querySelectorAll("input[name='property']:checked").forEach((cb) => properties.push(cb.value));
          return {
            name: d.name || "", description: d.description || "",
            die: d.die || "d8", properties,
            thaumic: !!form.querySelector("input[name='thaumic']")?.checked,
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

  /* ---- Equipment dialogs ---- */

  static async #openEquipmentDialog(title, label, data = {}) {
    const content = await renderTemplate(
      "systems/mondas/templates/dialogs/add-equipment.hbs",
      {
        tags: EQUIPMENT_TAGS,
        name: data.name || "", description: data.description || "",
        quantity: data.quantity ?? 1,
        armorValue: data.armorValue ?? 0,
        gambitName: data.gambitName || "", gambitDesc: data.gambitDesc || "",
        checkedTags: data.tags || [],
      },
    );
    return foundry.applications.api.DialogV2.prompt({
      window: { title },
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
    if (edge.gambitName) html += `<div class="card-chat-gambit"><span class="gambit-icon">⚡</span> <strong>${edge.gambitName}</strong>${edge.gambitDesc ? ` — ${edge.gambitDesc}` : ""}</div>`;
    await MondasCharacterSheet.#chatCard.call(this, html);
  }

  static async #onShowWeapon(event, target) {
    const w = this.actor.system.weapons[Number(target.dataset.index)];
    if (!w?.name) return;
    let html = `<div class="card-chat-header">${w.name} <span class="card-chat-die">${w.die}</span></div>`;
    if (w.description) html += `<p class="card-chat-desc">${w.description}</p>`;
    if (w.properties?.length) html += `<div class="card-chat-tags">${w.properties.map((p) => `<span class="tag">${p}</span>`).join("")}</div>`;
    await MondasCharacterSheet.#chatCard.call(this, html);
  }

  static async #onShowEquipment(event, target) {
    const eq = this.actor.system.equipment[Number(target.dataset.index)];
    if (!eq?.name) return;
    let html = `<div class="card-chat-header">${eq.name} <span class="card-chat-qty">×${eq.quantity}</span></div>`;
    if (eq.description) html += `<p class="card-chat-desc">${eq.description}</p>`;
    if (eq.tags?.length) html += `<div class="card-chat-tags">${eq.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>`;
    if (eq.gambitName) html += `<div class="card-chat-gambit"><span class="gambit-icon">⚡</span> <strong>${eq.gambitName}</strong>${eq.gambitDesc ? ` — ${eq.gambitDesc}` : ""}</div>`;
    await MondasCharacterSheet.#chatCard.call(this, html);
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

  /** Switch between Sheet and Notes tabs */
  static #onSwitchTab(event, target) {
    this._activeTab = target.dataset.tab;
    this.render();
  }
}
