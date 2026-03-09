/**
 * MONDAS Chat Gambit Controls
 *
 * Handles all interactive gambit UI within chat messages.
 * State lives in message.flags.mondas — this module reads flags,
 * binds listeners, and updates flags on resolve.
 */

/**
 * Resolve an outcome label + CSS class from a highest-die value.
 */
export function resolveOutcome(highest) {
  if (highest >= 6) {
    return {
      outcome: game.i18n.localize("MONDAS.Roll.fullSuccess"),
      outcomeClass: "outcome-success",
    };
  } else if (highest >= 4) {
    return {
      outcome: game.i18n.localize("MONDAS.Roll.partial"),
      outcomeClass: "outcome-partial",
    };
  } else {
    return {
      outcome: game.i18n.localize("MONDAS.Roll.consequence"),
      outcomeClass: "outcome-consequence",
    };
  }
}

/**
 * Convert flags → template context for roll-chat.hbs.
 */
export function buildTemplateData(flags) {
  const statLabel = game.i18n.localize(`MONDAS.Stat.${flags.stat}`);
  const rollTypeLabel = game.i18n.localize(`MONDAS.Roll.${flags.rollType}`);

  const sacrificedSet = new Set(flags.sacrificedIndices ?? []);
  const diceDisplay = flags.dice.map((d) => ({
    value: d.value,
    index: d.index,
    colorClass: d.value === 6 ? "die-success" : d.value >= 4 ? "die-partial" : "die-fail",
    isGambitEligible: d.value >= 4,
    sacrificed: sacrificedSet.has(d.index),
  }));

  const gambits = flags.gambitText
    ? sacrificedSet.size > 0
      ? [{ count: sacrificedSet.size, description: flags.gambitText }]
      : []
    : [];

  return {
    phase: flags.phase,
    statLabel,
    rollTypeLabel,
    poolDesc: flags.poolDesc,
    poolLabel: flags.poolLabel,
    dice: diceDisplay,
    highest: flags.highest,
    outcome: flags.outcome,
    outcomeClass: flags.outcomeClass,
    hasGambitDice: flags.hasGambitDice,
    hasGambits: gambits.length > 0,
    gambits,
    isCombat: flags.rollType === "combat",
    weapon: flags.weapon,
    isZeroPool: flags.isZeroPool,
  };
}

/**
 * Main entry — called from renderChatMessage hook.
 * Binds interactivity to a mondas roll chat card.
 */
export function bindRollCard(message, html) {
  const card = html.querySelector?.(".mondas-roll-chat") ?? html;
  if (!card) return;

  const flags = message.flags?.mondas;
  if (!flags) {
    // Legacy card or non-mondas message — just bind Apply Damage
    _bindApplyDamage(html);
    return;
  }

  if (flags.phase === "pending") {
    _bindGambitControls(message, html, flags);
  }

  _bindApplyDamage(html);
}

/* ---------------------------------------- */
/*  Internal — Gambit Controls              */
/* ---------------------------------------- */

function _bindGambitControls(message, html, flags) {
  // Permission check: only actor owner can interact
  const actor = game.actors.get(flags.actorId);
  if (!actor?.isOwner) {
    // Hide controls for non-owners
    html.querySelectorAll(".gambit-controls").forEach((el) => (el.style.display = "none"));
    return;
  }

  const sacrificedSet = new Set();

  // Bind dice toggles
  html.querySelectorAll(".die-result.gambit-eligible").forEach((die) => {
    die.addEventListener("click", () => {
      const index = Number(die.dataset.index);
      if (sacrificedSet.has(index)) {
        sacrificedSet.delete(index);
        die.classList.remove("sacrificed");
      } else {
        sacrificedSet.add(index);
        die.classList.add("sacrificed");
      }
      _updateOutcomePreview(html, flags, sacrificedSet);
    });
  });

  // Bind Confirm
  const confirmBtn = html.querySelector(".gambit-confirm-btn");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", async () => {
      confirmBtn.disabled = true;
      const skipBtn = html.querySelector(".gambit-skip-btn");
      if (skipBtn) skipBtn.disabled = true;

      const gambitText = html.querySelector("input[name='gambitText']")?.value || "";
      await _resolveGambits(message, flags, sacrificedSet, gambitText);
    });
  }

  // Bind Skip
  const skipBtn = html.querySelector(".gambit-skip-btn");
  if (skipBtn) {
    skipBtn.addEventListener("click", async () => {
      skipBtn.disabled = true;
      if (confirmBtn) confirmBtn.disabled = true;

      await _resolveGambits(message, flags, new Set(), "");
    });
  }
}

/**
 * Live preview — update outcome line without DB write.
 */
function _updateOutcomePreview(html, flags, sacrificedSet) {
  const remaining = flags.dice.filter((d) => !sacrificedSet.has(d.index));
  let highest;
  if (remaining.length === 0) {
    highest = 0;
  } else if (flags.isZeroPool) {
    highest = Math.min(...remaining.map((d) => d.value));
  } else {
    highest = Math.max(...remaining.map((d) => d.value));
  }

  const { outcome, outcomeClass } = resolveOutcome(highest);

  const outcomeLine = html.querySelector(".outcome-line");
  if (outcomeLine) {
    outcomeLine.textContent = `Highest: ${highest} — ${outcome}`;
    outcomeLine.className = `outcome-line ${outcomeClass}`;
  }
}

/**
 * Finalize gambit selection — update flags + re-render content.
 */
async function _resolveGambits(message, flags, sacrificedSet, gambitText) {
  const remaining = flags.dice.filter((d) => !sacrificedSet.has(d.index));
  let highest;
  if (remaining.length === 0) {
    highest = 0;
  } else if (flags.isZeroPool) {
    highest = Math.min(...remaining.map((d) => d.value));
  } else {
    highest = Math.max(...remaining.map((d) => d.value));
  }

  const { outcome, outcomeClass } = resolveOutcome(highest);

  const resolvedFlags = {
    ...flags,
    phase: "resolved",
    sacrificedIndices: Array.from(sacrificedSet),
    gambitText,
    highest,
    outcome,
    outcomeClass,
  };

  const content = await renderTemplate(
    "systems/mondas/templates/rolls/roll-chat.hbs",
    buildTemplateData(resolvedFlags),
  );

  await message.update({
    content,
    "flags.mondas": resolvedFlags,
  });
}

/* ---------------------------------------- */
/*  Internal — Apply Damage                 */
/* ---------------------------------------- */

function _bindApplyDamage(html) {
  html.querySelectorAll(".mondas-apply-damage").forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      event.preventDefault();
      const { applyDamage } = await import("./damage-roll.mjs");
      const damage = Number(btn.dataset.damage);
      const targets = game.user.targets;
      if (targets.size === 0) {
        ui.notifications.warn("Select a target token first.");
        return;
      }
      for (const token of targets) {
        await applyDamage(token.actor, damage);
      }
    });
  });
}
