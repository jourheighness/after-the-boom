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

  // Setup gambit — filter targets by who can receive a setup die
  const pcs = game.actors.filter((a) => a.type === "character");
  const actorHasSetup = actor.system.setupDie?.active;
  const setupTargets = [];
  // Self: only if you don't already have a setup die
  if (!actorHasSetup) setupTargets.push({ id: actor.id, label: "Self" });
  // Others: only if they don't already have a setup die
  for (const pc of pcs) {
    if (pc.id === actor.id) continue;
    if (!pc.system.setupDie?.active) setupTargets.push({ id: pc.id, label: pc.name });
  }
  // Only add setup gambit if there are valid targets
  if (setupTargets.length > 0) {
    gambits.push({
      key: "setup",
      label: "Setup",
      desc: "Bank this die for a future roll",
      source: "base",
      isSetup: true,
      setupTargets,
      setupTargetId: setupTargets[0].id,
    });
  }

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
  const remaining = dice.filter((d) => !usedIndices.has(d.index));
  if (remaining.length === 0 && !(useSetupDie && setupDie)) return 0;

  // Zero-pool: take lowest of stat dice only, then compare against weapon/setup normally
  if (isZeroPool) {
    const statDice = remaining.filter((d) => !d.isWeapon).map((d) => d.value);
    const weaponDice = remaining.filter((d) => d.isWeapon).map((d) => d.value);
    const candidates = [...weaponDice];
    if (statDice.length > 0) candidates.push(Math.min(...statDice));
    if (useSetupDie && setupDie) candidates.push(setupDie.value);
    return candidates.length > 0 ? Math.max(...candidates) : 0;
  }

  const values = remaining.map((d) => d.value);
  if (useSetupDie && setupDie) values.push(setupDie.value);
  return Math.max(...values);
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

  // In 0d mode, find the lowest die — it's the result die and can't be sacrificed
  let zeroPoolResultIndex = -1;
  if (flags.isZeroPool) {
    const statDice = flags.dice.filter((d) => !d.isWeapon);
    if (statDice.length > 0) {
      const minVal = Math.min(...statDice.map((d) => d.value));
      zeroPoolResultIndex = statDice.find((d) => d.value === minVal).index;
    }
  }

  const diceDisplay = flags.dice.map((d) => ({
    value: d.value,
    index: d.index,
    isWeapon: d.isWeapon || false,
    colorClass: d.value === 6 ? "die-success" : d.value >= 4 ? "die-partial" : "die-fail",
    isGambitEligible: d.value >= 4 && d.index !== zeroPoolResultIndex,
    sacrificed: sacrificedSet.has(d.index),
    assignedGambit: flags.diceGambits?.[d.index] || null,
  }));

  // Mark the die that produced the highest result (first match among non-sacrificed)
  let setupDieIsHighest = false;
  if (flags.phase === "resolved") {
    const available = diceDisplay.filter((d) => !d.sacrificed);
    const values = available.map((d) => d.value);
    const usedSetup = flags.usedSetupDie && flags.setupDie;
    if (usedSetup) values.push(flags.setupDie.value);
    if (values.length > 0) {
      const compareFn = flags.isZeroPool ? Math.min : Math.max;
      const bestValue = compareFn(...values);
      // Check if setup die is the best
      if (usedSetup && flags.setupDie.value === bestValue) {
        setupDieIsHighest = true;
      } else {
        const best = available.find((d) => d.value === bestValue);
        if (best) best.isHighest = true;
      }
    }
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
    setupDieGambit: _enrichSetupGambit(flags),
    setupDieIsHighest,
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

  // Helper: dismiss any stuck tooltip before DOM changes
  function dismissTip() {
    const tip = document.getElementById("mondas-tip");
    if (tip) { tip.classList.remove("visible"); tip.style.display = "none"; }
  }

  // Helper: update tray pills to reflect current state
  function refreshTray() {
    if (!tray) return;
    dismissTip();
    const usedKeys = new Set();
    for (const [idx, g] of Object.entries(diceGambits)) {
      if (Number(idx) !== selectedDieIndex && g) usedKeys.add(g.key);
    }
    const currentKey = diceGambits[selectedDieIndex]?.key;

    tray.innerHTML = (flags.availableGambits || []).filter((g) => {
      // Can't use Setup gambit with the setup die itself (circular)
      if (selectedDieIndex === "setup" && g.isSetup) return false;
      return true;
    }).map((g) => {
      const isActive = currentKey === g.key;
      const isTaken = !isActive && usedKeys.has(g.key);
      const cls = [
        "gambit-pill",
        isActive ? "active" : "",
        isTaken ? "taken" : "",
      ].filter(Boolean).join(" ");
      const tip = g.desc ? ` data-tip="${g.desc.replace(/"/g, '&quot;')}"` : "";
      return `<span class="${cls}" data-gambit-key="${g.key}"${tip}>${g.label}</span>`;
    }).join("");

    // Bind tooltips on the new pills
    _bindTipListeners(tray);
  }

  // Helper: update setup die label + data-label for hover
  function tagSetupDie(label) {
    const slot = setupDieEl?.closest(".die-slot");
    const lbl = slot?.querySelector(".die-label");
    if (lbl) lbl.textContent = label;
    if (slot) slot.dataset.label = label;
  }

  // Helper: tag a die with its gambit name (updates label + data-label for hover)
  function tagDie(index, label) {
    const die = html.querySelector(`.die-result[data-index="${index}"]`);
    if (!die) return;
    die.classList.add("sacrificed");
    const slot = die.closest(".die-slot");
    const labelEl = slot?.querySelector(".die-label");
    if (labelEl) labelEl.textContent = label;
    if (slot) slot.dataset.label = label;
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
    const origLabel = dieData?.isWeapon ? (flags.weapon?.die || "") : "";
    if (labelEl) labelEl.textContent = origLabel;
    if (slot) { if (origLabel) slot.dataset.label = origLabel; else delete slot.dataset.label; }
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
          if (tray) tray.innerHTML = "";
        }
        _getSacrificedAndUpdate();
        return;
      }

      // Deselect previous
      html.querySelectorAll(".die-result.selected").forEach((d) => d.classList.remove("selected"));
      selectedDieIndex = index;
      die.classList.add("selected");

      // Show tray
      if (tray) {
        refreshTray();
      }
    });
  });

  // Click a gambit pill → assign to selected die (or show target picker for Setup)
  if (tray) {
    tray.addEventListener("click", (e) => {
      // Handle setup target sub-pill click
      const targetPill = e.target.closest(".setup-target-pill");
      if (targetPill && selectedDieIndex !== null) {
        const targetId = targetPill.dataset.targetId;
        const targetLabel = targetPill.textContent;
        const setupGambit = (flags.availableGambits || []).find((g) => g.isSetup);
        if (!setupGambit) return;
        diceGambits[selectedDieIndex] = { ...setupGambit, setupTargetId: targetId };
        const label = `Setup → ${targetLabel}`;
        if (selectedDieIndex === "setup") {
          setupDieEl?.classList.add("sacrificed");
          tagSetupDie(label);
        } else {
          tagDie(selectedDieIndex, label);
        }
        // Deselect + hide
        _deselectDie();
        _getSacrificedAndUpdate();
        return;
      }

      const pill = e.target.closest(".gambit-pill");
      if (!pill || selectedDieIndex === null) return;
      if (pill.classList.contains("taken")) return;

      const gambitKey = pill.dataset.gambitKey;
      const gambit = (flags.availableGambits || []).find((g) => g.key === gambitKey);
      if (!gambit) return;

      // Toggle off if clicking the active gambit
      if (diceGambits[selectedDieIndex]?.key === gambitKey) {
        delete diceGambits[selectedDieIndex];
        if (selectedDieIndex === "setup") {
          setupDieEl?.classList.remove("sacrificed");
          tagSetupDie("Setup");
        } else {
          untagDie(selectedDieIndex);
        }
        _getSacrificedAndUpdate();
        return;
      }

      // Setup gambit → show target picker instead of immediate assign
      if (gambit.isSetup) {
        const targets = gambit.setupTargets || [];
        if (targets.length === 1) {
          // Only one valid target — assign directly
          diceGambits[selectedDieIndex] = { ...gambit, setupTargetId: targets[0].id };
          const label = `Setup → ${targets[0].label}`;
          if (selectedDieIndex === "setup") {
            setupDieEl?.classList.add("sacrificed");
            tagSetupDie(label);
          } else {
            tagDie(selectedDieIndex, label);
          }
          _deselectDie();
          _getSacrificedAndUpdate();
        } else {
          // Show target sub-pills inside the tray
          dismissTip();
          tray.innerHTML = targets.map((t) =>
            `<span class="gambit-pill setup-target-pill" data-target-id="${t.id}">${t.label}</span>`
          ).join("");
        }
        return;
      }

      // Normal gambit — assign directly
      diceGambits[selectedDieIndex] = { ...gambit };
      if (selectedDieIndex === "setup") {
        setupDieEl?.classList.add("sacrificed");
        tagSetupDie(gambit.label);
      } else {
        tagDie(selectedDieIndex, gambit.label);
      }
      _deselectDie();
      _getSacrificedAndUpdate();
    });
  }

  // Helper: deselect current die and hide tray
  function _deselectDie() {
    dismissTip();
    if (selectedDieIndex === "setup") {
      setupDieEl?.classList.remove("selected");
    } else if (selectedDieIndex !== null) {
      html.querySelector(`.die-result[data-index="${selectedDieIndex}"]`)?.classList.remove("selected");
    }
    selectedDieIndex = null;
    if (tray) tray.innerHTML = "";
  }

  // Setup die — integrated: activate for damage OR sacrifice for gambit
  const setupDieEl = html.querySelector(".die-setup");
  const setupGambitEligible = flags.setupDie && flags.setupDie.value >= 4;

  if (setupDieEl && flags.setupDie) {
    setupDieEl.addEventListener("click", () => {
      // If has gambit assigned, clear it
      if (diceGambits["setup"]) {
        delete diceGambits["setup"];
        setupDieEl.classList.remove("sacrificed");
        tagSetupDie("Setup");
        // Stay active (still in pool for damage)
        if (selectedDieIndex === "setup") {
          selectedDieIndex = null;
          if (tray) tray.innerHTML = "";
        }
        _getSacrificedAndUpdate();
        return;
      }

      if (!useSetupDie) {
        // Activate
        useSetupDie = true;
        setupDieEl.classList.add("active");
        setupDieEl.classList.remove("ghost");
        // If gambit-eligible, select it for tray
        if (setupGambitEligible) {
          html.querySelectorAll(".die-result.selected").forEach((d) => d.classList.remove("selected"));
          selectedDieIndex = "setup";
          setupDieEl.classList.add("selected");
          if (tray) { refreshTray(); }
        }
      } else if (selectedDieIndex === "setup") {
        // Already selected — deselect (stay active for damage)
        setupDieEl.classList.remove("selected");
        selectedDieIndex = null;
        if (tray) tray.innerHTML = "";
      } else if (setupGambitEligible) {
        // Active but not selected — select for gambit
        html.querySelectorAll(".die-result.selected").forEach((d) => d.classList.remove("selected"));
        selectedDieIndex = "setup";
        setupDieEl.classList.add("selected");
        if (tray) { refreshTray(); }
      } else {
        // Not gambit eligible — deactivate
        useSetupDie = false;
        setupDieEl.classList.remove("active");
        setupDieEl.classList.add("ghost");
      }
      _getSacrificedAndUpdate();
    });
  }

  // Helper: compute effective state and update preview
  function _getSacrificedAndUpdate() {
    const sacrificedSet = new Set(
      Object.keys(diceGambits).filter((k) => k !== "setup").map(Number),
    );
    // Setup die with gambit → sacrificed for gambit, not for damage
    const effectiveUseSetup = useSetupDie && !diceGambits["setup"];
    _updateOutcomePreview(html, flags, sacrificedSet, effectiveUseSetup);
  }

  // Patch existing die click and gambit pill handlers to use _getSacrificedAndUpdate
  // (re-bind the outcome update to use the helper)

  // Confirm
  const confirmBtn = html.querySelector(".gambit-confirm-btn");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", async () => {
      confirmBtn.disabled = true;
      const skipBtn = html.querySelector(".gambit-skip-btn");
      if (skipBtn) skipBtn.disabled = true;
      // Separate setup gambit from dice gambits for resolution
      const setupGambit = diceGambits["setup"] || null;
      const realDiceGambits = { ...diceGambits };
      delete realDiceGambits["setup"];
      const effectiveUseSetup = useSetupDie && !setupGambit;
      await _resolveGambits(message, flags, realDiceGambits, effectiveUseSetup, setupGambit);
    });
  }

  // Skip — resolve with no gambits, don't consume setup die
  const skipBtn = html.querySelector(".gambit-skip-btn");
  if (skipBtn) {
    skipBtn.addEventListener("click", async () => {
      skipBtn.disabled = true;
      if (confirmBtn) confirmBtn.disabled = true;
      await _resolveGambits(message, flags, {}, false);
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
  const values = remaining.map((d) => d.value);
  if (flags.usedSetupDie && flags.setupDie) values.push(flags.setupDie.value);
  if (values.length === 0) return { value: 0, forfeited: true, brutal };
  const value = flags.isZeroPool ? Math.min(...values) : Math.max(...values);
  return { value, forfeited: false, brutal };
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
      outcomeLine.textContent = flags.isZeroPool ? `Lowest: ${highest}` : `Highest: ${highest}`;
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
      const values = remaining.map((d) => d.value);
      if (useSetupDie && flags.setupDie) values.push(flags.setupDie.value);
      if (values.length === 0) {
        resultBox.querySelector("span").textContent = "No damage — all dice used";
      } else {
        const dmg = flags.isZeroPool ? Math.min(...values) : Math.max(...values);
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
async function _resolveGambits(message, flags, diceGambits, useSetupDie = false, setupGambit = null) {
  const sacrificedSet = new Set(Object.keys(diceGambits).map(Number));
  const highest = highestAvailable(flags.dice, sacrificedSet, flags.isZeroPool, flags.setupDie, useSetupDie);
  const { outcome, outcomeClass } = resolveOutcome(highest);

  // Consume setup die if used (for damage OR for gambit)
  if ((useSetupDie || setupGambit) && flags.setupDie) {
    const actor = game.actors.get(flags.actorId);
    if (actor) {
      await actor.update({ "system.setupDie.active": false, "system.setupDie.value": 0, "system.setupDie.source": "" });
    }
  }

  // Merge setup gambit into diceGambits for display (use string key "setup")
  const allGambits = { ...diceGambits };
  if (setupGambit) allGambits["setup"] = setupGambit;

  const resolvedFlags = {
    ...flags,
    phase: "resolved",
    sacrificedIndices: Array.from(sacrificedSet),
    diceGambits: allGambits,
    highest,
    outcome,
    outcomeClass,
    usedSetupDie: useSetupDie,
    setupDieGambit: setupGambit,
  };

  const content = await renderTemplate(
    "systems/mondas/templates/rolls/roll-chat.hbs",
    buildTemplateData(resolvedFlags),
  );

  await message.update({
    content,
    "flags.mondas": resolvedFlags,
  });

  // Apply Setup gambit to target actors — bank the sacrificed die's value
  const actor = game.actors.get(flags.actorId);

  async function _bankSetupDie(targetId, dieValue) {
    const target = game.actors.get(targetId);
    if (!target) return;
    const updates = {
      "system.setupDie.active": true,
      "system.setupDie.value": dieValue,
      "system.setupDie.source": actor?.name || "Unknown",
    };
    if (target.isOwner) {
      await target.update(updates);
    } else {
      game.socket.emit("system.mondas", { action: "updateActor", actorId: target.id, updates });
    }
  }

  // From regular dice sacrificed for Setup gambit
  for (const [dieIdx, gambit] of Object.entries(diceGambits)) {
    if (gambit?.setupTargetId) {
      const dieValue = flags.dice.find((d) => d.index === Number(dieIdx))?.value || 0;
      await _bankSetupDie(gambit.setupTargetId, dieValue);
    }
  }

  // From setup die sacrificed for Setup gambit (re-banking to another target)
  if (setupGambit?.setupTargetId && flags.setupDie) {
    await _bankSetupDie(setupGambit.setupTargetId, flags.setupDie.value);
  }
}

/* ---------------------------------------- */
/*  Internal — Apply Damage                 */
/* ---------------------------------------- */

/**
 * Bind mondas-tip tooltips on [data-tip] elements within a container.
 * Reuses the shared #mondas-tip element created by the character sheet.
 */
function _bindTipListeners(root) {
  const tip = document.getElementById("mondas-tip");
  if (!tip) return;
  root.querySelectorAll("[data-tip]").forEach((node) => {
    node.addEventListener("pointerenter", () => {
      const text = node.getAttribute("data-tip");
      if (!text) return;
      tip.textContent = text;
      tip.style.display = "block";
      tip.style.left = "0";
      tip.style.top = "0";
      const rect = node.getBoundingClientRect();
      const tipRect = tip.getBoundingClientRect();
      let left = rect.left;
      let top = rect.bottom + 6;
      if (left + tipRect.width > window.innerWidth - 8) left = window.innerWidth - tipRect.width - 8;
      if (left < 8) left = 8;
      if (top + tipRect.height > window.innerHeight - 8) top = rect.top - tipRect.height - 6;
      tip.style.left = `${left}px`;
      tip.style.top = `${top}px`;
      requestAnimationFrame(() => tip.classList.add("visible"));
    });
    node.addEventListener("pointerleave", () => {
      tip.classList.remove("visible");
      tip.style.display = "none";
    });
  });
}

/**
 * Enrich setup die gambit with target name for display.
 */
function _enrichSetupGambit(flags) {
  const g = flags.setupDieGambit;
  if (!g) return null;
  if (g.setupTargetId) {
    const targetActor = game.actors.get(g.setupTargetId);
    const targetName = g.setupTargetId === flags.actorId ? "Self" : (targetActor?.name || "?");
    return { ...g, label: `Setup → ${targetName}` };
  }
  return g;
}

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
