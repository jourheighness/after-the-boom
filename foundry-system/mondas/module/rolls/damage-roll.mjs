/**
 * Apply damage to an actor through the MONDAS damage pipeline.
 * Pipeline: Raw Damage → Guard → (Brutal +2) → Armor → Harm overflow
 *
 * @param {Actor} actor - The target actor
 * @param {number} rawDamage - Raw damage value from weapon die
 * @param {number} coverArmor - Additional armor from cover
 * @param {boolean} brutal - If true, +2 overflow when damage breaks Guard
 */
export async function applyDamage(actor, rawDamage, coverArmor = 0, brutal = false) {
  const system = actor.system;
  const updates = {};
  const messages = [];
  let pivotal = false;

  let remaining = rawDamage;

  // Step 1: Subtract from Guard (value = boxes spent, remaining = max - value)
  const guardRemaining = system.guard.max - system.guard.value;
  const guardAbsorbed = Math.min(guardRemaining, remaining);
  remaining -= guardAbsorbed;
  const newGuardValue = system.guard.value + guardAbsorbed;
  updates["system.guard.value"] = newGuardValue;

  if (guardAbsorbed > 0) {
    const newRemaining = system.guard.max - newGuardValue;
    messages.push(`Guard absorbs ${guardAbsorbed} (${guardRemaining} → ${newRemaining})`);
  }

  // Step 2: Check for Guard break
  if (guardRemaining > 0 && newGuardValue >= system.guard.max) {
    messages.push("⚠ Guard broken!");

    // Brutal: +2 overflow when damage breaks Guard
    if (brutal) {
      remaining += 2;
      messages.push("Brutal: +2 overflow damage");
    }
  }

  // Step 3: Subtract Armor from overflow (base + cover)
  if (remaining > 0) {
    const totalArmor = system.armor + coverArmor;
    const armorReduction = Math.min(remaining, totalArmor);
    remaining -= armorReduction;
    if (armorReduction > 0) {
      messages.push(`Armor absorbs ${armorReduction} (${system.armor} base${coverArmor > 0 ? ` + ${coverArmor} cover` : ""})`);
    }
  }

  // Step 4: Route overflow to Harm slots
  if (remaining > 0) {
    const harm = foundry.utils.deepClone(system.harm);
    let overflow = remaining;
    messages.push(`${overflow} damage overflows to Harm`);

    // Determine target level based on overflow amount
    // Rules: 1-2 → Hurt, 3-4 → Wounded, 5+ → Critical
    // If both slots at a level are full, bump to next
    let targetLevel;
    if (overflow >= 5) targetLevel = "critical";
    else if (overflow >= 3) targetLevel = "wounded";
    else targetLevel = "hurt";

    const levels = ["hurt", "wounded", "critical"];
    let levelIndex = levels.indexOf(targetLevel);
    let placed = false;

    while (levelIndex < levels.length && !placed) {
      const level = levels[levelIndex];
      if (!harm[level].slot1.filled) {
        harm[level].slot1.filled = true;
        harm[level].slot1.text = `${rawDamage} damage`;
        messages.push(`→ ${level.charAt(0).toUpperCase() + level.slice(1)} slot 1 filled`);
        placed = true;
      } else if (!harm[level].slot2.filled) {
        harm[level].slot2.filled = true;
        harm[level].slot2.text = `${rawDamage} damage`;
        messages.push(`→ ${level.charAt(0).toUpperCase() + level.slice(1)} slot 2 filled`);
        placed = true;
      } else {
        messages.push(`${level.charAt(0).toUpperCase() + level.slice(1)} full, bumping up`);
        levelIndex++;
      }
    }

    if (!placed) {
      messages.push("⚠ All Harm slots full — character is incapacitated!");
    }

    // Detect critical state after placement
    const criticalCount = (harm.critical.slot1.filled ? 1 : 0) + (harm.critical.slot2.filled ? 1 : 0);
    const criticalBefore = (system.harm.critical.slot1.filled ? 1 : 0) + (system.harm.critical.slot2.filled ? 1 : 0);

    if (criticalCount === 1 && criticalBefore === 0) {
      messages.push("⚠ Critical injury — consider a Scar");
    }

    updates["system.harm"] = harm;

    // Two critical slots filled — pivotal moment
    if (criticalCount >= 2 && criticalBefore < 2) {
      pivotal = true;
    }
  }

  // Apply all updates
  await actor.update(updates);

  // Post damage report to chat
  const content = `
    <div class="mondas-damage-report">
      <h4>Damage Applied to ${actor.name}</h4>
      <p class="damage-total">Raw Damage: ${rawDamage}</p>
      <ul>${messages.map(m => `<li>${m}</li>`).join("")}</ul>
    </div>
  `;

  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content,
    style: CONST.CHAT_MESSAGE_STYLES.OTHER,
  });

  // Dramatic message when both critical slots are filled
  if (pivotal) {
    const pivotalContent = `
      <div class="mondas-roll-chat mondas-pivotal">
        <div class="result-box pivotal-box">
          ${actor.name}
        </div>
        <div class="pivotal-skull">
          <span class="pivotal-raster">DEATH</span>
          <i class="fa-solid fa-skull pivotal-raster"></i>
          <span class="pivotal-raster">AWAITS</span>
        </div>
        <div class="pivotal-body">
          <p>Both critical slots filled. This is a pivotal moment.</p>
          <p>The table decides: grievous wound, dramatic death, or something worse. How does this story end?</p>
        </div>
      </div>
    `;
    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content: pivotalContent,
      style: CONST.CHAT_MESSAGE_STYLES.OTHER,
    });
  }
}
