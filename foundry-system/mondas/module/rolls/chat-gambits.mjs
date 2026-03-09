/**
 * MONDAS Chat Gambit Controls
 *
 * Handles all interactive gambit UI within chat messages.
 * State lives in message.flags.mondas — this module reads flags,
 * binds listeners, and updates flags on resolve.
 */

/** The 7 base combat gambits available to all characters */
export const COMBAT_GAMBITS = [
  { key: "push", label: "Push", desc: "Push 1 range band / Push + Prone", source: "base" },
  { key: "pull", label: "Pull", desc: "Pull 1 range band / Pull + Boon", source: "base" },
  { key: "pin", label: "Pin", desc: "Target can't move for 1 round", source: "base" },
  { key: "read", label: "Read", desc: "Learn target's intent or weakness", source: "base" },
  { key: "break", label: "Break", desc: "Destroy cover or equipment", source: "base" },
  { key: "cover", label: "Cover", desc: "Grant cover to self or ally", source: "base" },
  { key: "setup", label: "Setup", desc: "Give an ally +1 Boon on next roll", source: "base" },
];

/**
 * Build the full gambit list for an actor (base + equipment + edges).
 */
export function buildAvailableGambits(actor) {
  const gambits = [...COMBAT_GAMBITS];

  // Thaumatech gambits from equipment
  for (const item of actor.system.equipment ?? []) {
    if (item.gambitName) {
      gambits.push({
        key: `equip-${item.name}`,
        label: item.gambitName,
        desc: item.gambitDesc || "",
        source: "thaumatech",
      });
    }
  }

  // Edge gambits
  for (const edge of actor.system.edges ?? []) {
    if (edge.gambitName) {
      gambits.push({
        key: `edge-${edge.name}`,
        label: edge.gambitName,
        desc: edge.gambitDesc || "",
        source: "edge",
      });
    }
  }

  return gambits;
}

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
    assignedGambit: flags.diceGambits?.[d.index] || null,
  }));

  // Build resolved gambit list from diceGambits map
  const gambitEntries = [];
  if (flags.diceGambits) {
    const grouped = {};
    for (const [idx, gambit] of Object.entries(flags.diceGambits)) {
      if (!gambit) continue;
      const key = gambit.key;
      if (!grouped[key]) grouped[key] = { ...gambit, diceCount: 0 };
      grouped[key].diceCount++;
    }
    for (const g of Object.values(grouped)) {
      gambitEntries.push({
        label: g.label,
        desc: g.desc,
        diceCount: g.diceCount,
        tier: g.diceCount >= 2 ? "Strong" : "Standard",
      });
    }
  }

  const isCombat = flags.rollType === "combat";
  const isDefense = flags.rollType === "defense";
  const isStakes = flags.rollType === "stakes";
  const sacrificedCount = diceDisplay.filter((d) => d.sacrificed).length;

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
    hasGambits: gambitEntries.length > 0,
    gambits: gambitEntries,
    isCombat,
    isDefense,
    isStakes,
    showGambitPanel: isCombat || isDefense,
    availableGambits: flags.availableGambits || [],
    sacrificedCount,
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
    _bindApplyDamage(html);
    return;
  }

  if (flags.phase === "pending") {
    if (flags.rollType === "stakes") {
      _bindStakesControls(message, html, flags);
    } else {
      _bindGambitControls(message, html, flags);
    }
  }

  _bindApplyDamage(html);
}

/* ---------------------------------------- */
/*  Internal — Stakes Controls (simple)     */
/* ---------------------------------------- */

function _bindStakesControls(message, html, flags) {
  const actor = game.actors.get(flags.actorId);
  if (!actor?.isOwner) {
    html.querySelectorAll(".gambit-controls").forEach((el) => (el.style.display = "none"));
    return;
  }

  const sacrificedSet = new Set();

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

  const confirmBtn = html.querySelector(".gambit-confirm-btn");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", async () => {
      confirmBtn.disabled = true;
      const skipBtn = html.querySelector(".gambit-skip-btn");
      if (skipBtn) skipBtn.disabled = true;
      await _resolveStakes(message, flags, sacrificedSet);
    });
  }

  const skipBtn = html.querySelector(".gambit-skip-btn");
  if (skipBtn) {
    skipBtn.addEventListener("click", async () => {
      skipBtn.disabled = true;
      if (confirmBtn) confirmBtn.disabled = true;
      await _resolveStakes(message, flags, new Set());
    });
  }
}

/* ---------------------------------------- */
/*  Internal — Combat/Defense Gambit Controls */
/* ---------------------------------------- */

function _bindGambitControls(message, html, flags) {
  const actor = game.actors.get(flags.actorId);
  if (!actor?.isOwner) {
    html.querySelectorAll(".gambit-controls").forEach((el) => (el.style.display = "none"));
    return;
  }

  // Track which die index → selected gambit (or null)
  const diceGambits = {};
  let selectedDieIndex = null;

  const gambitPanel = html.querySelector(".gambit-panel");
  const gambitList = html.querySelector(".gambit-list");

  // Click a die to select it → show gambit list
  html.querySelectorAll(".die-result.gambit-eligible").forEach((die) => {
    die.addEventListener("click", () => {
      const index = Number(die.dataset.index);

      // If already selected, deselect
      if (selectedDieIndex === index) {
        selectedDieIndex = null;
        die.classList.remove("selected");
        if (gambitPanel) gambitPanel.hidden = true;
        return;
      }

      // Deselect previous
      html.querySelectorAll(".die-result.selected").forEach((d) => d.classList.remove("selected"));
      selectedDieIndex = index;
      die.classList.add("selected");

      // Show gambit panel
      if (gambitPanel) {
        gambitPanel.hidden = false;
        _renderGambitList(gambitList, flags.availableGambits, diceGambits[index]);
      }
    });
  });

  // Delegate click on gambit list items
  if (gambitList) {
    gambitList.addEventListener("click", (e) => {
      const item = e.target.closest(".gambit-option");
      if (!item || selectedDieIndex === null) return;

      const gambitKey = item.dataset.gambitKey;
      const gambits = flags.availableGambits || [];
      const gambit = gambits.find((g) => g.key === gambitKey);

      // Toggle: if already assigned this gambit, clear it
      if (diceGambits[selectedDieIndex]?.key === gambitKey) {
        delete diceGambits[selectedDieIndex];
        // Un-mark die
        const die = html.querySelector(`.die-result[data-index="${selectedDieIndex}"]`);
        if (die) {
          die.classList.remove("sacrificed");
          die.querySelector(".die-gambit-label")?.remove();
        }
      } else {
        diceGambits[selectedDieIndex] = gambit;
        // Mark die as sacrificed + label
        const die = html.querySelector(`.die-result[data-index="${selectedDieIndex}"]`);
        if (die) {
          die.classList.add("sacrificed");
          let label = die.querySelector(".die-gambit-label");
          if (!label) {
            label = document.createElement("span");
            label.classList.add("die-gambit-label");
            die.appendChild(label);
          }
          label.textContent = gambit.label;
        }
      }

      _renderGambitList(gambitList, flags.availableGambits, diceGambits[selectedDieIndex]);
      _updateOutcomePreview(html, flags, new Set(Object.keys(diceGambits).map(Number)));
    });
  }

  // Clear gambit from a die
  html.querySelectorAll(".die-clear-gambit").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const index = Number(btn.dataset.index);
      delete diceGambits[index];
      const die = html.querySelector(`.die-result[data-index="${index}"]`);
      if (die) {
        die.classList.remove("sacrificed");
        die.querySelector(".die-gambit-label")?.remove();
      }
      _updateOutcomePreview(html, flags, new Set(Object.keys(diceGambits).map(Number)));
    });
  });

  // Confirm
  const confirmBtn = html.querySelector(".gambit-confirm-btn");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", async () => {
      confirmBtn.disabled = true;
      const skipBtn = html.querySelector(".gambit-skip-btn");
      if (skipBtn) skipBtn.disabled = true;
      await _resolveGambits(message, flags, diceGambits);
    });
  }

  // Skip
  const skipBtn = html.querySelector(".gambit-skip-btn");
  if (skipBtn) {
    skipBtn.addEventListener("click", async () => {
      skipBtn.disabled = true;
      if (confirmBtn) confirmBtn.disabled = true;
      await _resolveGambits(message, flags, {});
    });
  }
}

function _renderGambitList(container, gambits, currentGambit) {
  if (!container) return;
  container.innerHTML = gambits.map((g) => {
    const selected = currentGambit?.key === g.key ? "selected" : "";
    const sourceClass = `gambit-source-${g.source}`;
    return `<div class="gambit-option ${selected} ${sourceClass}" data-gambit-key="${g.key}">
      <strong>${g.label}</strong> <span class="gambit-desc">${g.desc}</span>
      <span class="gambit-source-tag">${g.source}</span>
    </div>`;
  }).join("");
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
 * Finalize stakes (simple sacrifice, no named gambits).
 */
async function _resolveStakes(message, flags, sacrificedSet) {
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
    diceGambits: {},
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

/**
 * Finalize combat/defense gambits — with named gambit assignments.
 */
async function _resolveGambits(message, flags, diceGambits) {
  const sacrificedSet = new Set(Object.keys(diceGambits).map(Number));
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
    diceGambits,
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
