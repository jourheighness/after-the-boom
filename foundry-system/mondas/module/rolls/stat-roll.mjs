/**
 * MONDAS Stat Roll Dialog
 *
 * Config-only dialog: pool builder (stat + boons/snags + drain + weapon).
 * On "Roll", evaluates dice, posts chat card, and closes.
 * Gambit selection happens in the chat card (see chat-gambits.mjs).
 */

import { buildTemplateData, resolveOutcome } from "./chat-gambits.mjs";

const { HandlebarsApplicationMixin, ApplicationV2 } = foundry.applications.api;

export class MondasRollDialog extends HandlebarsApplicationMixin(ApplicationV2) {

  static DEFAULT_OPTIONS = {
    id: "mondas-roll-dialog",
    classes: ["mondas", "roll-dialog"],
    tag: "form",
    window: { title: "MONDAS Roll", resizable: false },
    position: { width: 360, height: "auto" },
    actions: {
      adjustBoons: MondasRollDialog.#onAdjustBoons,
      adjustSnags: MondasRollDialog.#onAdjustSnags,
      executeRoll: MondasRollDialog.#onExecuteRoll,
    },
  };

  static PARTS = {
    content: { template: "systems/mondas/templates/rolls/roll-dialog.hbs" },
  };

  /* ---------------------------------------- */
  /*  Construction                            */
  /* ---------------------------------------- */

  constructor(actor, stat, options = {}) {
    super(options);
    this.actor = actor;
    this.stat = stat;
    this.rollType = "stakes";
    this.boons = 0;
    this.snags = 0;
    this.spendDrain = false;
    this.selectedWeaponIndex = 0;
  }

  /**
   * Factory — create and render in one call.
   */
  static create(actor, stat) {
    const dialog = new MondasRollDialog(actor, stat);
    dialog.render(true);
    return dialog;
  }

  get title() {
    const statLabel = game.i18n.localize(`MONDAS.Stat.${this.stat}`);
    return `Roll ${statLabel}`;
  }

  /* ---------------------------------------- */
  /*  Context                                 */
  /* ---------------------------------------- */

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const system = this.actor.system;
    const statValue = system.stats[this.stat];

    context.stat = this.stat;
    context.statLabel = game.i18n.localize(`MONDAS.Stat.${this.stat}`);
    context.statValue = statValue;
    context.rollType = this.rollType;
    context.boons = this.boons;
    context.snags = this.snags;
    context.spendDrain = this.spendDrain;
    context.drainAvailable = system.drain.value > 0;
    context.weapons = system.weapons;
    context.selectedWeaponIndex = this.selectedWeaponIndex;

    // Calculate pool
    const drainBonus = this.spendDrain ? 1 : 0;
    const pool = Math.max(0, statValue + this.boons - this.snags + drainBonus);
    context.pool = pool;
    context.poolZero = pool === 0;
    context.poolLabel = pool === 0 ? "2d6 take lowest" : `${pool}d6`;

    return context;
  }

  /* ---------------------------------------- */
  /*  Action Handlers                         */
  /* ---------------------------------------- */

  static #onAdjustBoons(event, target) {
    const delta = Number(target.dataset.delta);
    this.boons = Math.max(0, this.boons + delta);
    this.render();
  }

  static #onAdjustSnags(event, target) {
    const delta = Number(target.dataset.delta);
    this.snags = Math.max(0, this.snags + delta);
    this.render();
  }

  static async #onExecuteRoll(event, target) {
    // Read current form state
    const form = this.element.querySelector("form") || this.element;
    const rollTypeInput = form.querySelector("input[name='rollType']:checked");
    if (rollTypeInput) this.rollType = rollTypeInput.value;

    const drainCheckbox = form.querySelector("input[name='spendDrain']");
    if (drainCheckbox) this.spendDrain = drainCheckbox.checked;

    const weaponSelect = form.querySelector("select[name='selectedWeapon']");
    if (weaponSelect) this.selectedWeaponIndex = Number(weaponSelect.value);

    // Calculate pool
    const system = this.actor.system;
    const statValue = system.stats[this.stat];
    const drainBonus = this.spendDrain ? 1 : 0;
    const pool = Math.max(0, statValue + this.boons - this.snags + drainBonus);
    const isZeroPool = pool === 0;

    // Spend drain if used
    if (this.spendDrain) {
      await this.actor.update({ "system.drain.value": system.drain.value - 1 });
    }

    // Build pool description
    const poolParts = [`Base ${statValue}`];
    if (this.boons > 0) poolParts.push(`+${this.boons} Boon${this.boons > 1 ? "s" : ""}`);
    if (this.snags > 0) poolParts.push(`-${this.snags} Snag${this.snags > 1 ? "s" : ""}`);
    if (this.spendDrain) poolParts.push("+1 Drain");
    const poolDesc = poolParts.join(" ");
    const poolLabel = isZeroPool ? "2d6 take lowest" : `${pool}d6`;

    // Build and evaluate stat roll
    const statRoll = new Roll(isZeroPool ? "2d6" : `${pool}d6`);
    await statRoll.evaluate();
    const dice = statRoll.terms[0].results.map((r, i) => ({ value: r.result, index: i }));
    const highest = isZeroPool
      ? Math.min(...dice.map((d) => d.value))
      : Math.max(...dice.map((d) => d.value));

    const hasGambitDice = dice.some((d) => d.value >= 4);
    const { outcome, outcomeClass } = resolveOutcome(highest);

    // Weapon roll (combat only)
    let weaponData = null;
    const rolls = [statRoll];
    if (this.rollType === "combat" && system.weapons?.length > 0) {
      const weapon = system.weapons[this.selectedWeaponIndex] || system.weapons[0];
      const weaponRoll = new Roll(`1${weapon.die}`);
      await weaponRoll.evaluate();
      weaponData = {
        name: weapon.name || "Weapon",
        die: weapon.die,
        damage: weaponRoll.total,
      };
      rolls.push(weaponRoll);
    }

    // Build flags — single source of truth
    const flags = {
      phase: hasGambitDice ? "pending" : "resolved",
      actorId: this.actor.id,
      stat: this.stat,
      rollType: this.rollType,
      statValue,
      boons: this.boons,
      snags: this.snags,
      spendDrain: this.spendDrain,
      pool,
      poolLabel,
      poolDesc,
      isZeroPool,
      dice,
      sacrificedIndices: [],
      gambitText: "",
      hasGambitDice,
      highest,
      outcome,
      outcomeClass,
      weapon: weaponData,
    };

    // Render chat card
    const content = await renderTemplate(
      "systems/mondas/templates/rolls/roll-chat.hbs",
      buildTemplateData(flags),
    );

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      content,
      rolls,
      flags: { mondas: flags },
      style: CONST.CHAT_MESSAGE_STYLES.OTHER,
    });

    await this.close();
  }
}
