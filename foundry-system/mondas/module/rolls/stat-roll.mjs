/**
 * MONDAS Stat Roll Dialog
 *
 * Multi-phase roll workflow:
 *   Phase 1 — Pool builder (stat + boons/snags + drain)
 *   Phase 2 — Gambit selection (sacrifice 4+ dice for side effects)
 *   Phase 3 — Chat card output
 */

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
      toggleDie: MondasRollDialog.#onToggleDie,
      confirmGambits: MondasRollDialog.#onConfirmGambits,
      skipGambits: MondasRollDialog.#onSkipGambits,
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
    this.phase = "config";
    this.rollResults = null;
    this.sacrificedDice = new Set();
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

    context.phase = this.phase;
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

    // Gambit phase data
    if (this.phase === "gambit") {
      context.rollResults = this.rollResults;
      context.dice = this.rollResults.dice.map((d, i) => ({
        value: d,
        index: i,
        isGambitEligible: d >= 4,
        isSacrificed: this.sacrificedDice.has(i),
        colorClass: d === 6 ? "die-success" : d >= 4 ? "die-partial" : "die-fail",
      }));
      context.highestDie = this.rollResults.highest;
      context.outcome = this.rollResults.outcome;
      context.outcomeClass = this.rollResults.outcomeClass;
      context.hasGambitDice = this.rollResults.dice.some(d => d >= 4);
    }

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
    const statValue = this.actor.system.stats[this.stat];
    const drainBonus = this.spendDrain ? 1 : 0;
    const pool = Math.max(0, statValue + this.boons - this.snags + drainBonus);

    // Spend drain if used
    if (this.spendDrain) {
      await this.actor.update({ "system.drain.value": this.actor.system.drain.value - 1 });
    }

    // Execute roll
    let roll;
    let dice;
    let highest;

    if (pool === 0) {
      roll = new Roll("2d6");
      await roll.evaluate();
      dice = roll.terms[0].results.map(r => r.result);
      highest = Math.min(...dice);
    } else {
      roll = new Roll(`${pool}d6`);
      await roll.evaluate();
      dice = roll.terms[0].results.map(r => r.result);
      highest = Math.max(...dice);
    }

    // Determine outcome
    let outcome, outcomeClass;
    if (highest >= 6) {
      outcome = game.i18n.localize("MONDAS.Roll.fullSuccess");
      outcomeClass = "outcome-success";
    } else if (highest >= 4) {
      outcome = game.i18n.localize("MONDAS.Roll.partial");
      outcomeClass = "outcome-partial";
    } else {
      outcome = game.i18n.localize("MONDAS.Roll.consequence");
      outcomeClass = "outcome-consequence";
    }

    this.rollResults = { roll, dice, highest, outcome, outcomeClass, pool };
    this.sacrificedDice = new Set();

    // Check for gambit-eligible dice
    const hasGambitDice = dice.some(d => d >= 4);

    if (hasGambitDice) {
      this.phase = "gambit";
      this.render();
    } else {
      await this.#postChatMessage([]);
      this.close();
    }
  }

  static #onToggleDie(event, target) {
    const index = Number(target.dataset.index);
    const dieValue = this.rollResults.dice[index];
    if (dieValue < 4) return;

    if (this.sacrificedDice.has(index)) {
      this.sacrificedDice.delete(index);
    } else {
      this.sacrificedDice.add(index);
    }
    this.render();
  }

  static async #onConfirmGambits(event, target) {
    const form = this.element.querySelector("form") || this.element;
    const gambitText = form.querySelector("input[name='gambitText']")?.value || "";

    const gambits = Array.from(this.sacrificedDice).map(i => ({
      value: this.rollResults.dice[i],
      description: gambitText,
    }));

    // Recalculate outcome from remaining (non-sacrificed) dice
    const remainingDice = this.rollResults.dice.filter((_, i) => !this.sacrificedDice.has(i));
    if (remainingDice.length > 0) {
      const newHighest = this.rollResults.pool === 0
        ? Math.min(...remainingDice)
        : Math.max(...remainingDice);

      if (newHighest >= 6) {
        this.rollResults.outcome = game.i18n.localize("MONDAS.Roll.fullSuccess");
        this.rollResults.outcomeClass = "outcome-success";
      } else if (newHighest >= 4) {
        this.rollResults.outcome = game.i18n.localize("MONDAS.Roll.partial");
        this.rollResults.outcomeClass = "outcome-partial";
      } else {
        this.rollResults.outcome = game.i18n.localize("MONDAS.Roll.consequence");
        this.rollResults.outcomeClass = "outcome-consequence";
      }
      this.rollResults.highest = newHighest;
    }

    await this.#postChatMessage(gambits);
    this.close();
  }

  static async #onSkipGambits(event, target) {
    await this.#postChatMessage([]);
    this.close();
  }

  /* ---------------------------------------- */
  /*  Chat Message                            */
  /* ---------------------------------------- */

  async #postChatMessage(gambits) {
    const system = this.actor.system;
    const statLabel = game.i18n.localize(`MONDAS.Stat.${this.stat}`);
    const rollTypeLabel = game.i18n.localize(`MONDAS.Roll.${this.rollType}`);

    // Build pool description
    const statValue = system.stats[this.stat];
    const poolParts = [`Base ${statValue}`];
    if (this.boons > 0) poolParts.push(`+${this.boons} Boon${this.boons > 1 ? "s" : ""}`);
    if (this.snags > 0) poolParts.push(`-${this.snags} Snag${this.snags > 1 ? "s" : ""}`);
    if (this.spendDrain) poolParts.push("+1 Drain");
    const poolDesc = poolParts.join(" ");

    // Dice display data
    const sacrificedIndices = new Set(gambits.map((_, gi) => Array.from(this.sacrificedDice)[gi]));
    const diceDisplay = this.rollResults.dice.map((d, i) => ({
      value: d,
      colorClass: d === 6 ? "die-success" : d >= 4 ? "die-partial" : "die-fail",
      sacrificed: this.sacrificedDice.has(i),
    }));

    // Weapon roll for combat
    let weaponResult = null;
    if (this.rollType === "combat" && system.weapons?.length > 0) {
      const weapon = system.weapons[this.selectedWeaponIndex] || system.weapons[0];
      const weaponRoll = new Roll(`1${weapon.die}`);
      await weaponRoll.evaluate();
      weaponResult = {
        name: weapon.name || "Weapon",
        die: weapon.die,
        damage: weaponRoll.total,
      };
    }

    const templateData = {
      statLabel,
      rollTypeLabel,
      poolDesc,
      poolLabel: this.rollResults.pool === 0 ? "2d6 take lowest" : `${this.rollResults.pool}d6`,
      dice: diceDisplay,
      highest: this.rollResults.highest,
      outcome: this.rollResults.outcome,
      outcomeClass: this.rollResults.outcomeClass,
      gambits: gambits.filter(g => g.description),
      hasGambits: gambits.length > 0 && gambits.some(g => g.description),
      isCombat: this.rollType === "combat",
      weapon: weaponResult,
    };

    const content = await renderTemplate(
      "systems/mondas/templates/rolls/roll-chat.hbs",
      templateData,
    );

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      content,
      rolls: [this.rollResults.roll],
      type: CONST.CHAT_MESSAGE_STYLES.OTHER,
    });
  }
}
