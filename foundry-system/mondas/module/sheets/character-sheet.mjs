const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;

/** Tags available for equipment */
const EQUIPMENT_TAGS = ["thaumatech", "licensed", "restricted", "prohibited", "black-market", "mundane"];

export class MondasCharacterSheet extends HandlebarsApplicationMixin(ActorSheetV2) {

  /** Track active tab across renders */
  _activeTab = "sheet";

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
      toggleGuardBox: MondasCharacterSheet.#onToggleGuardBox,
      toggleDrainBox: MondasCharacterSheet.#onToggleDrainBox,
      toggleProperty: MondasCharacterSheet.#onToggleProperty,
      addScar: MondasCharacterSheet.#onAddScar,
      removeScar: MondasCharacterSheet.#onRemoveScar,
      showEdge: MondasCharacterSheet.#onShowEdge,
      showEquipment: MondasCharacterSheet.#onShowEquipment,
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

    // Lists
    context.edges = system.edges;
    context.weapons = system.weapons;
    context.equipment = system.equipment;

    // Notes
    context.notes = system.notes;

    // Tab state
    context.activeTab = this._activeTab;

    // Dropdown options
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
    // If clicking the last filled box, unfill it; otherwise fill up to clicked+1
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

  /** Add a blank edge */
  static async #onAddEdge(event, target) {
    const edges = [...this.actor.system.toObject().edges, { name: "", mechanical: "", gambitName: "", gambitDesc: "" }];
    await this.actor.update({ "system.edges": edges });
  }

  /** Remove edge by index */
  static async #onRemoveEdge(event, target) {
    const index = Number(target.dataset.index);
    const edges = this.actor.system.toObject().edges.filter((_, i) => i !== index);
    await this.actor.update({ "system.edges": edges });
  }

  /** Show edge as chat card */
  static async #onShowEdge(event, target) {
    const index = Number(target.dataset.index);
    const edge = this.actor.system.edges[index];
    if (!edge?.name) return;
    const content = `<div class="mondas-item-card"><strong>${edge.name}</strong>`
      + (edge.mechanical ? `<p class="item-card-mechanical">${edge.mechanical}</p>` : "")
      + `</div>`;
    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      content,
      style: CONST.CHAT_MESSAGE_STYLES.OTHER,
    });
  }

  /** Add a blank weapon */
  static async #onAddWeapon(event, target) {
    const weapons = [...this.actor.system.toObject().weapons, { name: "", description: "", die: "d8", properties: [] }];
    await this.actor.update({ "system.weapons": weapons });
  }

  /** Remove weapon by index */
  static async #onRemoveWeapon(event, target) {
    const index = Number(target.dataset.index);
    const weapons = this.actor.system.toObject().weapons.filter((_, i) => i !== index);
    await this.actor.update({ "system.weapons": weapons });
  }

  /** Add equipment via dialog */
  static async #onAddEquipment(event, target) {
    const dialogContent = await renderTemplate(
      "systems/mondas/templates/dialogs/add-equipment.hbs",
      { tags: EQUIPMENT_TAGS },
    );

    const result = await foundry.applications.api.DialogV2.prompt({
      window: { title: "Add Equipment" },
      content: dialogContent,
      ok: {
        label: "Add Equipment",
        callback: (event, button, dialog) => {
          const form = button.closest(".dialog-content")?.querySelector("form")
            || dialog.querySelector("form")
            || button.form;
          if (!form) return null;
          const fd = new FormDataExtended(form);
          const data = fd.object;
          // Collect checked tags
          const tags = [];
          form.querySelectorAll("input[name='tag']:checked").forEach((cb) => tags.push(cb.value));
          return {
            name: data.name || "",
            description: data.description || "",
            quantity: Number(data.quantity) || 1,
            tags,
            gambitName: data.gambitName || "",
            gambitDesc: data.gambitDesc || "",
          };
        },
      },
      rejectClose: false,
    });

    if (!result) return;
    const equipment = [...this.actor.system.toObject().equipment, result];
    await this.actor.update({ "system.equipment": equipment });
  }

  /** Remove equipment by index */
  static async #onRemoveEquipment(event, target) {
    const index = Number(target.dataset.index);
    const equipment = this.actor.system.toObject().equipment.filter((_, i) => i !== index);
    await this.actor.update({ "system.equipment": equipment });
  }

  /** Show equipment as chat card */
  static async #onShowEquipment(event, target) {
    const index = Number(target.dataset.index);
    const item = this.actor.system.equipment[index];
    if (!item?.name) return;
    let content = `<div class="mondas-item-card"><strong>${item.name}</strong>`;
    if (item.description) content += `<p class="item-card-desc">${item.description}</p>`;
    if (item.tags?.length) {
      content += `<div class="item-card-tags">${item.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>`;
    }
    content += `</div>`;
    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      content,
      style: CONST.CHAT_MESSAGE_STYLES.OTHER,
    });
  }

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

  /** Toggle a weapon property */
  static async #onToggleProperty(event, target) {
    const weaponIndex = Number(target.dataset.weaponIndex);
    const property = target.dataset.property;
    const weapons = this.actor.system.toObject().weapons;
    const props = weapons[weaponIndex].properties;
    if (props.includes(property)) {
      weapons[weaponIndex].properties = props.filter((p) => p !== property);
    } else {
      weapons[weaponIndex].properties = [...props, property];
    }
    await this.actor.update({ "system.weapons": weapons });
  }

  /** Switch between Sheet and Notes tabs */
  static #onSwitchTab(event, target) {
    this._activeTab = target.dataset.tab;
    this.render();
  }
}
