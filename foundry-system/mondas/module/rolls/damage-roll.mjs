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

  let remaining = rawDamage;

  // Step 1: Subtract from Guard
  const guardBefore = system.guard.value;
  const guardAfter = Math.max(0, guardBefore - remaining);
  const guardAbsorbed = guardBefore - guardAfter;
  remaining -= guardAbsorbed;
  updates["system.guard.value"] = guardAfter;

  if (guardAbsorbed > 0) {
    messages.push(`Guard absorbs ${guardAbsorbed} (${guardBefore} → ${guardAfter})`);
  }

  // Step 2: Check for Guard break (scar event)
  let scarEvent = false;
  if (guardBefore > 0 && guardAfter === 0) {
    scarEvent = true;
    messages.push("⚠ Guard broken! Scar gained (+1 max Guard)");
    updates["system.scars"] = [...system.toObject().scars, `Guard broken (${rawDamage} damage)`];

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

    updates["system.harm"] = harm;
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
}
