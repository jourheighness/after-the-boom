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
  const statLabel = flags.stat ? game.i18n.localize(`MONDAS.Stat.${flags.stat}`) : "";
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

  // Mark the die that produced the highest result (first match among non-sacrificed)
  if (flags.phase === "resolved") {
    const available = diceDisplay.filter((d) => !d.sacrificed);
    const compareFn = flags.isZeroPool ? Math.min : Math.max;
    const bestValue = compareFn(...available.map((d) => d.value));
    const best = available.find((d) => d.value === bestValue);
    if (best) best.isHighest = true;
  }

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
    stat: flags.stat,
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

  const diceGambits = {};
  let selectedDieIndex = null;
  let useSetupDie = false;
  const tray = html.querySelector(".gambit-tray");

  // Helper: update tray pills to reflect current state
  function refreshTray() {
    if (!tray) return;
    const usedKeys = new Set();
    for (const [idx, g] of Object.entries(diceGambits)) {
      if (Number(idx) !== selectedDieIndex && g) usedKeys.add(g.key);
    }
    const currentKey = diceGambits[selectedDieIndex]?.key;

    tray.innerHTML = (flags.availableGambits || []).map((g) => {
      const isActive = currentKey === g.key;
      const isTaken = !isActive && usedKeys.has(g.key);
      const cls = [
        "gambit-pill",
        isActive ? "active" : "",
        isTaken ? "taken" : "",
      ].filter(Boolean).join(" ");
      return `<span class="${cls}" data-gambit-key="${g.key}">${g.label}</span>`;
    }).join("");
  }

  // Helper: tag a die with its gambit name (updates the .die-label below the die)
  function tagDie(index, label) {
    const die = html.querySelector(`.die-result[data-index="${index}"]`);
    if (!die) return;
    die.classList.add("sacrificed");
    const slot = die.closest(".die-slot");
    const labelEl = slot?.querySelector(".die-label");
    if (labelEl) labelEl.textContent = label;
  }

  // Helper: clear tag from a die
  function untagDie(index) {
    const die = html.querySelector(`.die-result[data-index="${index}"]`);
    if (!die) return;
    die.classList.remove("sacrificed");
    const slot = die.closest(".die-slot");
    const labelEl = slot?.querySelector(".die-label");
    // Restore original label (weapon die type or empty)
    const dieData = flags.dice.find((d) => d.index === index);
    if (labelEl) labelEl.textContent = dieData?.isWeapon ? (flags.weapon?.die || "") : "";
  }

  // Click eligible die → select it, show pill tray
  html.querySelectorAll(".die-result.gambit-eligible").forEach((die) => {
    die.addEventListener("click", () => {
      const index = Number(die.dataset.index);

      // If already has a gambit assigned, clear it
      if (diceGambits[index]) {
        delete diceGambits[index];
        untagDie(index);
        die.classList.remove("selected");
        if (selectedDieIndex === index) {
          selectedDieIndex = null;
          if (tray) tray.hidden = true;
        }
        _updateOutcomePreview(html, flags, new Set(Object.keys(diceGambits).map(Number)), useSetupDie);
        return;
      }

      // Deselect previous
      html.querySelectorAll(".die-result.selected").forEach((d) => d.classList.remove("selected"));
      selectedDieIndex = index;
      die.classList.add("selected");

      // Show tray
      if (tray) {
        tray.hidden = false;
        refreshTray();
      }
    });
  });

  // Click a gambit pill → assign to selected die
  if (tray) {
    tray.addEventListener("click", (e) => {
      const pill = e.target.closest(".gambit-pill");
      if (!pill || selectedDieIndex === null) return;
      if (pill.classList.contains("taken")) return;

      const gambitKey = pill.dataset.gambitKey;
      const gambit = (flags.availableGambits || []).find((g) => g.key === gambitKey);
      if (!gambit) return;

      // Toggle off if clicking the active gambit
      if (diceGambits[selectedDieIndex]?.key === gambitKey) {
        delete diceGambits[selectedDieIndex];
        untagDie(selectedDieIndex);
      } else {
        diceGambits[selectedDieIndex] = { ...gambit };
        const label = gambit.isSetup
          ? `Setup → ${gambit.setupTargets?.[0]?.label || "Self"}`
          : gambit.label;
        tagDie(selectedDieIndex, label);
      }

      // Deselect die, hide tray
      html.querySelector(`.die-result[data-index="${selectedDieIndex}"]`)?.classList.remove("selected");
      selectedDieIndex = null;
      tray.hidden = true;

      _updateOutcomePreview(html, flags, new Set(Object.keys(diceGambits).map(Number)), useSetupDie);
    });
  }

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

/**
 * Compute weapon damage from the dice array.
 * Damage = highest value among all non-sacrificed dice (stat + weapon).
 * Returns {value, forfeited} or null if no weapon.
 */
function _weaponDamage(flags, diceDisplay) {
  if (!flags.weapon) return null;
  const brutal = (flags.weapon.properties || []).includes("brutal");
  const remaining = diceDisplay.filter((d) => !d.sacrificed);
  if (remaining.length === 0) return { value: 0, forfeited: true, brutal };
  return { value: Math.max(...remaining.map((d) => d.value)), forfeited: false, brutal };
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
 * Bind setup die toggle — click the ghost die in the dice grid to toggle it.
 */
function _bindSetupDieToggle(html, flags, onToggle) {
  const die = html.querySelector(".die-setup");
  if (!die || !flags.setupDie) return;
  die.addEventListener("click", () => {
    const active = onToggle();
    die.classList.toggle("active", active);
    die.classList.toggle("ghost", !active);
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

  // Live-update damage banner for combat
  if (flags.rollType === "combat" && flags.weapon) {
    const resultBox = html.querySelector(".result-box");
    if (resultBox) {
      const remaining = flags.dice.filter((d) => !sacrificedSet.has(d.index));
      if (remaining.length === 0) {
        resultBox.querySelector("span").textContent = "No damage — all dice used";
      } else {
        const dmg = Math.max(...remaining.map((d) => d.value));
        resultBox.querySelector("span").textContent = `${flags.weapon.name}: ${dmg} damage`;
      }
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
        const updates = {
          "system.setupDie.active": true,
          "system.setupDie.value": dieValue,
          "system.setupDie.source": actor?.name || "Unknown",
        };
        // Route through GM socket if we don't own the target
        if (target.isOwner) {
          await target.update(updates);
        } else {
          game.socket.emit("system.mondas", {
            action: "updateActor",
            actorId: target.id,
            updates,
          });
        }
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
      const brutal = btn.dataset.brutal === "true";
      const targets = game.user.targets;

      // If tokens are targeted, apply to their actors
      if (targets.size > 0) {
        for (const token of targets) {
          await applyDamage(token.actor, damage, coverArmor, brutal);
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
