/**
 * MONDAS Stat Roll Dialog
 *
 * Config-only dialog: pool builder (stat + boons/snags + drain + weapon).
 * Roll type comes from the sheet button click (combat/defense/stakes).
 * On "Roll", evaluates dice, posts chat card, and closes.
 * Gambit selection happens in the chat card (see chat-gambits.mjs).
 */

import { buildTemplateData, buildAvailableGambits, resolveOutcome } from "./chat-gambits.mjs";

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
      dismissSnag: MondasRollDialog.#onDismissSnag,
      selectWeapon: MondasRollDialog.#onSelectWeapon,
      selectCover: MondasRollDialog.#onSelectCover,
      executeRoll: MondasRollDialog.#onExecuteRoll,
    },
  };

  static PARTS = {
    content: { template: "systems/mondas/templates/rolls/roll-dialog.hbs" },
  };

  /* ---------------------------------------- */
  /*  Construction                            */
  /* ---------------------------------------- */

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

  /**
   * Factory — create and render in one call.
   */
  static create(actor, stat, rollType) {
    const dialog = new MondasRollDialog(actor, stat, rollType);
    dialog.render(true);
    return dialog;
  }

  get title() {
    const statLabel = game.i18n.localize(`MONDAS.Stat.${this.stat}`);
    const rollTypeLabel = game.i18n.localize(`MONDAS.Roll.${this.rollType}`);
    return `${statLabel} — ${rollTypeLabel}`;
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

  static async #onExecuteRoll(event, target) {
    // Read current form state
    const form = this.element.querySelector("form") || this.element;

    const drainCheckbox = form.querySelector("input[name='spendDrain']");
    if (drainCheckbox) this.spendDrain = drainCheckbox.checked;

    // Calculate pool
    const system = this.actor.system;
    const statValue = system.stats[this.stat];
    const drainBonus = this.spendDrain ? 1 : 0;
    const activeAutoSnagCount = this.activeAutoSnags.filter(
      (_, i) => !this.dismissedSnags.has(i),
    ).length;
    const totalSnags = this.snags + activeAutoSnagCount;
    const pool = Math.max(0, statValue + this.boons - totalSnags + drainBonus);
    const isZeroPool = pool === 0;

    // Spend drain if used
    if (this.spendDrain) {
      await this.actor.update({ "system.drain.value": system.drain.value - 1 });
    }

    // Build pool description
    const poolParts = [`Base ${statValue}`];
    if (this.boons > 0) poolParts.push(`+${this.boons} Boon${this.boons > 1 ? "s" : ""}`);
    if (totalSnags > 0) poolParts.push(`-${totalSnags} Snag${totalSnags > 1 ? "s" : ""}`);
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

    // Build available gambits for combat/defense rolls
    const availableGambits = (this.rollType === "combat" || this.rollType === "defense")
      ? buildAvailableGambits(this.actor)
      : [];

    // Build flags — single source of truth
    const flags = {
      phase: hasGambitDice ? "pending" : "resolved",
      actorId: this.actor.id,
      stat: this.stat,
      rollType: this.rollType,
      statValue,
      boons: this.boons,
      snags: totalSnags,
      spendDrain: this.spendDrain,
      pool,
      poolLabel,
      poolDesc,
      isZeroPool,
      dice,
      sacrificedIndices: [],
      diceGambits: {},
      hasGambitDice,
      highest,
      outcome,
      outcomeClass,
      weapon: weaponData,
      availableGambits,
      coverArmor: this.rollType === "defense" ? this.coverLevel : 0,
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
