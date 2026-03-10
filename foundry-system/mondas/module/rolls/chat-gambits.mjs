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
];

/**
 * Build the full gambit list for an actor (base + equipment + edges).
 */
export function buildAvailableGambits(actor) {
  const gambits = [...COMBAT_GAMBITS];

  // Setup gambit — single entry with target picker
  const pcs = game.actors.filter((a) => a.type === "character" && a.hasPlayerOwner);
  const setupTargets = [
    { id: actor.id, label: "Self" },
    ...pcs
      .filter((a) => a.id !== actor.id)
      .map((a) => ({ id: a.id, label: a.name })),
  ];
  gambits.push({
    key: "setup",
    label: "Setup",
    desc: "Bank this die for a future roll",
    source: "base",
    isSetup: true,
    setupTargets,
    setupTargetId: actor.id, // default to self
  });

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
 * Return the highest die value not used for gambits/sacrifice.
 * Zero-pool takes lowest instead of highest. Returns 0 if nothing remains.
 * @param {Array<{value: number, index: number}>} dice - rolled dice
 * @param {Set<number>} usedIndices - indices consumed by gambits/sacrifice
 * @param {boolean} isZeroPool - true if zero-pool (take lowest)
 * @param {{value: number}|null} setupDie - banked setup die, if any
 * @param {boolean} useSetupDie - whether the setup die is toggled on
 * @returns {number}
 */
export function highestAvailable(dice, usedIndices, isZeroPool = false, setupDie = null, useSetupDie = false) {
  const values = dice.filter((d) => !usedIndices.has(d.index)).map((d) => d.value);
  if (useSetupDie && setupDie) values.push(setupDie.value);
  if (values.length === 0) return 0;
  return isZeroPool ? Math.min(...values) : Math.max(...values);
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
    isWeapon: d.isWeapon || false,
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
      // Setup gambits with different targets are separate entries
      const groupKey = gambit.setupTargetId ? `${gambit.key}-${gambit.setupTargetId}` : gambit.key;
      if (!grouped[groupKey]) grouped[groupKey] = { ...gambit, diceCount: 0 };
      grouped[groupKey].diceCount++;
    }
    for (const g of Object.values(grouped)) {
      let label = g.label;
      // Enrich setup label with target name
      if (g.setupTargetId) {
        const targetActor = game.actors.get(g.setupTargetId);
        const targetName = g.setupTargetId === flags.actorId ? "Self" : (targetActor?.name || "?");
        label = `Setup → ${targetName}`;
      }
      gambitEntries.push({
        label,
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
    weaponDamage: _weaponDamage(flags, diceDisplay),
    isZeroPool: flags.isZeroPool,
    coverArmor: flags.coverArmor || 0,
    defenseResult: isDefense ? _defenseLabel(flags.highest) : null,
    setupDie: flags.setupDie || null,
    usedSetupDie: flags.usedSetupDie || false,
    setupDieColorClass: flags.setupDie
      ? (flags.setupDie.value === 6 ? "die-success" : flags.setupDie.value >= 4 ? "die-partial" : "die-fail")
      : "",
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
    } else if (flags.rollType === "combat" || flags.rollType === "defense") {
      _bindGambitControls(message, html, flags);
    } else {
      // Setup-die-only pending (no gambits, no stakes)
      _bindStakesControls(message, html, flags);
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
  let useSetupDie = false;

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
      _updateOutcomePreview(html, flags, sacrificedSet, useSetupDie);
    });
  });

  // Setup die toggle
  _bindSetupDieToggle(html, flags, () => {
    useSetupDie = !useSetupDie;
    _updateOutcomePreview(html, flags, sacrificedSet, useSetupDie);
    return useSetupDie;
  });

  const confirmBtn = html.querySelector(".gambit-confirm-btn");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", async () => {
      confirmBtn.disabled = true;
      const skipBtn = html.querySelector(".gambit-skip-btn");
      if (skipBtn) skipBtn.disabled = true;
      await _resolveStakes(message, flags, sacrificedSet, useSetupDie);
    });
  }

  const skipBtn = html.querySelector(".gambit-skip-btn");
  if (skipBtn) {
    skipBtn.addEventListener("click", async () => {
      skipBtn.disabled = true;
      if (confirmBtn) confirmBtn.disabled = true;
      await _resolveStakes(message, flags, new Set(), useSetupDie);
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
  let useSetupDie = false;

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
        _renderGambitList(gambitList, flags.availableGambits, diceGambits[index], diceGambits, index);
      }
    });
  });

  // Delegate click on gambit list items
  if (gambitList) {
    gambitList.addEventListener("click", (e) => {
      // Handle setup target pill click
      const targetPill = e.target.closest(".setup-target");
      if (targetPill && selectedDieIndex !== null) {
        const targetId = targetPill.dataset.targetId;
        const current = diceGambits[selectedDieIndex];
        if (current?.key === "setup") {
          current.setupTargetId = targetId;
          // Update die label
          const die = html.querySelector(`.die-result[data-index="${selectedDieIndex}"]`);
          const setupGambit = (flags.availableGambits || []).find((g) => g.key === "setup");
          const targetLabel = setupGambit?.setupTargets?.find((t) => t.id === targetId)?.label || "Setup";
          const label = die?.querySelector(".die-tag");
          if (label) label.textContent = `Setup → ${targetLabel}`;
        }
        _renderGambitList(gambitList, flags.availableGambits, diceGambits[selectedDieIndex], diceGambits, selectedDieIndex);
        return;
      }

      const item = e.target.closest(".gambit-option");
      if (!item || selectedDieIndex === null) return;

      const gambitKey = item.dataset.gambitKey;
      const gambits = flags.availableGambits || [];
      const gambit = gambits.find((g) => g.key === gambitKey);

      // Block if this gambit type is already used by another die
      const takenByOther = Object.entries(diceGambits).some(
        ([idx, g]) => Number(idx) !== selectedDieIndex && g?.key === gambitKey,
      );
      if (takenByOther) return;

      // Toggle: if already assigned this gambit, clear it
      if (diceGambits[selectedDieIndex]?.key === gambitKey) {
        delete diceGambits[selectedDieIndex];
        // Un-mark die
        const die = html.querySelector(`.die-result[data-index="${selectedDieIndex}"]`);
        if (die) {
          die.classList.remove("sacrificed");
          die.querySelector(".die-tag")?.remove();
        }
      } else {
        // Clone gambit so each die gets its own target state
        diceGambits[selectedDieIndex] = { ...gambit };
        // Mark die as sacrificed + label
        const die = html.querySelector(`.die-result[data-index="${selectedDieIndex}"]`);
        if (die) {
          die.classList.add("sacrificed");
          let label = die.querySelector(".die-tag");
          if (!label) {
            label = document.createElement("span");
            label.classList.add("die-tag");
            die.appendChild(label);
          }
          const displayLabel = gambit.isSetup
            ? `Setup → ${gambit.setupTargets?.[0]?.label || "Self"}`
            : gambit.label;
          label.textContent = displayLabel;
        }
      }

      _renderGambitList(gambitList, flags.availableGambits, diceGambits[selectedDieIndex], diceGambits, selectedDieIndex);
      _updateOutcomePreview(html, flags, new Set(Object.keys(diceGambits).map(Number)), useSetupDie);
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
        die.querySelector(".die-tag")?.remove();
      }
      _updateOutcomePreview(html, flags, new Set(Object.keys(diceGambits).map(Number)), useSetupDie);
    });
  });

  // Setup die toggle
  _bindSetupDieToggle(html, flags, () => {
    useSetupDie = !useSetupDie;
    _updateOutcomePreview(html, flags, new Set(Object.keys(diceGambits).map(Number)), useSetupDie);
    return useSetupDie;
  });

  // Confirm
  const confirmBtn = html.querySelector(".gambit-confirm-btn");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", async () => {
      confirmBtn.disabled = true;
      const skipBtn = html.querySelector(".gambit-skip-btn");
      if (skipBtn) skipBtn.disabled = true;
      await _resolveGambits(message, flags, diceGambits, useSetupDie);
    });
  }

  // Skip
  const skipBtn = html.querySelector(".gambit-skip-btn");
  if (skipBtn) {
    skipBtn.addEventListener("click", async () => {
      skipBtn.disabled = true;
      if (confirmBtn) confirmBtn.disabled = true;
      await _resolveGambits(message, flags, {}, useSetupDie);
    });
  }
}

function _renderGambitList(container, gambits, currentGambit, diceGambits = {}, selectedDieIndex = null) {
  if (!container) return;

  // Collect gambit keys already used by other dice
  const usedKeys = new Set();
  for (const [idx, g] of Object.entries(diceGambits)) {
    if (Number(idx) !== selectedDieIndex && g) usedKeys.add(g.key);
  }

  container.innerHTML = gambits.map((g) => {
    const isSelected = currentGambit?.key === g.key;
    const isTaken = !isSelected && usedKeys.has(g.key);
    const selected = isSelected ? "selected" : "";
    const takenClass = isTaken ? "gambit-taken" : "";
    const sourceClass = `gambit-source-${g.source}`;
    const drainLabel = g.source === "thaumatech" ? ' <span class="gambit-drain-cost">(costs Drain)</span>' : "";

    // Setup gambit: show target picker when selected
    let targetPicker = "";
    if (g.isSetup && isSelected) {
      const activeTargetId = currentGambit.setupTargetId || g.setupTargets[0]?.id;
      const pills = g.setupTargets.map((t) => {
        const active = t.id === activeTargetId ? "active" : "";
        return `<span class="setup-target ${active}" data-target-id="${t.id}">${t.label}</span>`;
      }).join("");
      targetPicker = `<div class="setup-target-picker">${pills}</div>`;
    }

    return `<div class="gambit-option ${selected} ${takenClass} ${sourceClass}" data-gambit-key="${g.key}">
      <strong>${g.label}</strong> <span class="gambit-desc">${g.desc}</span>${drainLabel}
      <span class="gambit-source-tag">${g.source}</span>
      ${targetPicker}
    </div>`;
  }).join("");
}

/**
 * Compute weapon damage from the dice array.
 * If the weapon die wasn't sacrificed, its value is the damage.
 * If it was sacrificed, the highest remaining non-weapon die is the damage.
 * Returns {value, forfeited} or null if no weapon.
 */
function _weaponDamage(flags, diceDisplay) {
  if (!flags.weapon) return null;
  const weaponDie = diceDisplay.find((d) => d.isWeapon);
  if (!weaponDie) return null;
  if (!weaponDie.sacrificed) return { value: weaponDie.value, forfeited: false };
  // Weapon die sacrificed — highest remaining non-weapon stat die is damage
  const remaining = diceDisplay.filter((d) => !d.isWeapon && !d.sacrificed);
  if (remaining.length === 0) return { value: 0, forfeited: true };
  return { value: Math.max(...remaining.map((d) => d.value)), forfeited: false };
}

/**
 * Defense outcome label from highest die.
 */
function _defenseLabel(highest) {
  if (highest >= 6) return "No damage";
  if (highest >= 4) return "Half damage";
  return "Full damage";
}

/**
 * Bind setup die toggle button in the chat card.
 */
function _bindSetupDieToggle(html, flags, onToggle) {
  const btn = html.querySelector(".setup-die-toggle");
  if (!btn || !flags.setupDie) return;
  btn.addEventListener("click", () => {
    const active = onToggle();
    btn.classList.toggle("active", active);
    // Toggle setup die visibility in the dice grid
    const setupDie = html.querySelector(".die-setup");
    if (setupDie) setupDie.classList.toggle("active", active);
  });
}

/**
 * Live preview — update outcome line without DB write.
 * @param {boolean} useSetupDie — whether the setup die is toggled on
 */
function _updateOutcomePreview(html, flags, sacrificedSet, useSetupDie = false) {
  const highest = highestAvailable(flags.dice, sacrificedSet, flags.isZeroPool, flags.setupDie, useSetupDie);
  const { outcome, outcomeClass } = resolveOutcome(highest);

  const outcomeLine = html.querySelector(".outcome-line");
  if (outcomeLine) {
    if (flags.rollType === "combat") {
      outcomeLine.textContent = `Highest: ${highest}`;
      outcomeLine.className = "outcome-line";
    } else if (flags.rollType === "defense") {
      outcomeLine.textContent = _defenseLabel(highest);
      outcomeLine.className = `outcome-line ${outcomeClass}`;
    } else {
      outcomeLine.textContent = `Highest: ${highest} — ${outcome}`;
      outcomeLine.className = `outcome-line ${outcomeClass}`;
    }
  }
}

/**
 * Finalize stakes (simple sacrifice, no named gambits).
 */
async function _resolveStakes(message, flags, sacrificedSet, useSetupDie = false) {
  const highest = highestAvailable(flags.dice, sacrificedSet, flags.isZeroPool, flags.setupDie, useSetupDie);
  const { outcome, outcomeClass } = resolveOutcome(highest);

  // Consume setup die if used
  if (useSetupDie && flags.setupDie) {
    const actor = game.actors.get(flags.actorId);
    if (actor) {
      await actor.update({ "system.setupDie.active": false, "system.setupDie.value": 0, "system.setupDie.source": "" });
    }
  }

  const resolvedFlags = {
    ...flags,
    phase: "resolved",
    sacrificedIndices: Array.from(sacrificedSet),
    diceGambits: {},
    highest,
    outcome,
    outcomeClass,
    usedSetupDie: useSetupDie,
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
async function _resolveGambits(message, flags, diceGambits, useSetupDie = false) {
  const sacrificedSet = new Set(Object.keys(diceGambits).map(Number));
  const highest = highestAvailable(flags.dice, sacrificedSet, flags.isZeroPool, flags.setupDie, useSetupDie);
  const { outcome, outcomeClass } = resolveOutcome(highest);

  // Consume setup die if used
  if (useSetupDie && flags.setupDie) {
    const actor = game.actors.get(flags.actorId);
    if (actor) {
      await actor.update({ "system.setupDie.active": false, "system.setupDie.value": 0, "system.setupDie.source": "" });
    }
  }

  const resolvedFlags = {
    ...flags,
    phase: "resolved",
    sacrificedIndices: Array.from(sacrificedSet),
    diceGambits,
    highest,
    outcome,
    outcomeClass,
    usedSetupDie: useSetupDie,
  };

  const content = await renderTemplate(
    "systems/mondas/templates/rolls/roll-chat.hbs",
    buildTemplateData(resolvedFlags),
  );

  await message.update({
    content,
    "flags.mondas": resolvedFlags,
  });

  // Apply Setup die to target actors — bank the sacrificed die's value
  const actor = game.actors.get(flags.actorId);
  for (const [dieIdx, gambit] of Object.entries(diceGambits)) {
    if (gambit?.setupTargetId) {
      const dieValue = flags.dice.find((d) => d.index === Number(dieIdx))?.value || 0;
      const target = game.actors.get(gambit.setupTargetId);
      if (target) {
        await target.update({
          "system.setupDie.active": true,
          "system.setupDie.value": dieValue,
          "system.setupDie.source": actor?.name || "Unknown",
        });
      }
    }
  }
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
      const coverArmor = Number(btn.dataset.cover || 0);
      const targets = game.user.targets;

      // If tokens are targeted, apply to their actors
      if (targets.size > 0) {
        for (const token of targets) {
          await applyDamage(token.actor, damage, coverArmor);
        }
        return;
      }

      // No token — just show the raw damage card in chat
      const armorNote = coverArmor > 0 ? ` (cover armor ${coverArmor})` : "";
      await ChatMessage.create({
        content: `<div class="mondas-damage-report"><strong>Damage: ${damage}</strong>${armorNote}</div>`,
        style: CONST.CHAT_MESSAGE_STYLES.OTHER,
      });
    });
  });
}
