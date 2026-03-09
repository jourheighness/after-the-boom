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
