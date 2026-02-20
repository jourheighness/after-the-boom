# DESIGN NOTES: D&D DRIFT FOR MONDAS

*Analysis of what to keep, what to break, and what to build.*

---

## THE CREATIVE PLAY PROBLEM (RESOLVED)

D&D 5e punishes creative play. Mondas solves it with **SURGE** — a unified system for spending drain to go beyond the rules. Added to MECHANICS.md.

### What SURGE Does

Three uses, one system:

- **STRIKE:** Spend +1 to +4 drain on a thaumic attack for narrative effects + situational damage (quick GM reference table included — damage and effect per drain level, pick and go)
- **BOOST:** Spend 1-3 drain on any skill check for +1d4 per drain. Proficiency in the skill + a description that connects = d4s upgrade to d6s.
- **RESIST:** Same as BOOST but for saving throws. The cryptic beast example: spend 2 drain, describe channeling static through your mind using RESONANCE proficiency → +2d6 on the save.

### Why This Works

1. **Grounded.** Channel through thaumatech or your own body. Nothing else. No magic chairs.
2. **Rewards character.** Proficiency connection means Brian is dangerous in a factory, Max is dangerous in a chase, Murph is dangerous in a conversation. The system rewards who they ARE.
3. **Rewards description.** No description = no surge. Good description = creativity discount. The table leans forward or it doesn't happen.
4. **Consequences are real.** Surge +3/+4 strains gear or hurts your body. Natural 1 = backfire. Miss = drain gone, energy went somewhere bad. Players feel the cost.
5. **GM gets a fast reference.** Damage + effect table for strike. Dice math for boost/resist. No calculation needed mid-session.

---

## SPELL CONVERSION: WHAT FITS, WHAT DOESN'T

### The Filter

Every D&D spell should pass through three questions:

1. **Can this exist as physical technology?** (Shield = air pressure. Fireball = incendiary grenade. Teleportation = ?)
2. **Does it fit the 1992 industrial aesthetic?** (Healing Word = field injection. Fly = ?)
3. **Does it break the setting's power structure?** (If anyone could teleport, the DPA couldn't contain anyone.)

### TIER 1: Converts Cleanly

These spells have obvious thaumatech or ammunition equivalents. Keep them.

| Spell | Conversion | Notes |
|-------|------------|-------|
| Mage Armor | Barrier Rig (mesh) | Already done |
| Shield | Barrier Rig (reactive) | Already done |
| Detect Magic | Scanner | Already done |
| Mage Hand | Grip-Field | Already done |
| Fog Cloud | Smoke Canister | Already done |
| Shatter | Resonance Charge | Already done |
| Cure Wounds | MED-KIT (thaumic injection) | Accelerated tissue repair. Painful. |
| Healing Word | STIM-PEN | Quick-deploy field stimulant. 1 bonus action. |
| Thunderwave | CONCUSSION MINE | Directional blast. Clears a room. |
| Hold Person | NEURAL LOCK | Channeled. Targets nervous system. Terrifying. |
| Darkness | BLACKOUT CANISTER | Dense thaumic fog. Absorbs light. |
| Silence | DEAD-ZONE EMITTER | Kills sound in an area. DPA interrogation tool. |
| Sleep | SUPPRESSOR | Gas-based. Low-tier. Cops use them. |
| Guidance | FOCUS AMP | Headband device. Sharpens concentration. |
| Light | GLOW-ROD | Chemical stick. Everyone has these. |
| Prestidigitation | Utility Kit | Minor tricks. Cleaning, warming, flavoring. Blue-collar thaumatech. |
| Message | COMM-SET | Already covered. Radio + thaumic. |
| Minor Illusion | MIRAGE PLATE | Projects a static image. Grainy. Like a bad hologram but physical. |
| Disguise Self | FACE-SHIFT MASK | Contact-plate mask. Changes your features. Deeply unsettling to watch. |
| Invisibility | VEIL CLOAK | Light-bending fabric. Nausea-inducing. |
| Misty Step | BLINK DRIVE | Short-range displacement. Feels like being pulled through a keyhole. |
| Feather Fall | BRAKE HARNESS | Arrests momentum. Slows you down. Emergency gear for high-rise workers. |
| Comprehend Languages | CIPHER PLUG | Earpiece. Translates in real-time. Slight delay. |
| Identify | ANALYZER PROBE | Handheld scanner. Reads thaumic signatures. |
| Enhance Ability | BOOST INJECTOR | Chemical + thaumic stimulant. One attribute, limited time. |
| Heroism | COURAGE SHOT | Military-grade stimulant. Temporary hit points. Known to be addictive. |

### TIER 2: Converts With Adjustment

These need re-flavoring or mechanical modification but can work.

| Spell | Problem | Solution |
|-------|---------|----------|
| Fireball | Too flashy, too powerful for civilian tech | Military-only. INCENDIARY MORTAR. 3rd level = 7 drain. Extremely illegal for civilians. |
| Lightning Bolt | Same — line AOE nuke | TESLA LANCE. Military channeled weapon. Illegal. |
| Web | Magical spider webs don't fit | TANGLER GRENADES. Quick-hardening resin. Industrial adhesive repurposed. |
| Entangle | Magical vines? | GRIP-FOAM. Expanding sealant. Building supply repurposed as crowd control. |
| Fly | Extremely setting-breaking if common | JUMP HARNESS only. Short-range vertical boost, not sustained flight. 1 round, 30 ft vertical. |
| Haste | "You move faster" is too clean | OVERDRIVE INJECTION. Military stimulant. Extra action but 1d6 drain when it wears off. Addictive. Known to cause heart failure. |
| Counterspell | Too abstract | DISRUPTOR. Channeled burst that destabilizes another device's field. Requires opposed check. |
| Dispel Magic | Same | PURGE PULSE. Area disruption. Shuts down active thaumatech. Indiscriminate — kills YOUR gear too. |
| Protection from Evil | "Evil" doesn't map | WARD GENERATOR. Creates interference field vs specific entity types. DPA uses these. |
| Spiritual Weapon | Floating weapon is too fantasy | DRONE. Small remote-operated thaumic projector. Channeled. |

### TIER 3: Exclude or Heavily Restrict

These spells break the setting's logic, power structure, or tone. Either exclude them entirely or make them so rare/dangerous that they're plot devices, not player tools.

| Spell | Why It Doesn't Fit |
|-------|-------------------|
| **Teleportation Circle / Teleport** | If teleportation exists, the DPA can't contain anyone. Borders are meaningless. The entire setting collapses. |
| **Plane Shift** | The barrier between planes IS the central plot. This can't be a spell you cast. |
| **Resurrection / Raise Dead / Revivify** | Death must matter. If resurrection exists, the stakes evaporate. |
| **True Polymorph / Shapechange** | Complete transformation undermines identity, which is a core theme. |
| **Wish** | Obviously no. |
| **Scrying** | Wait — Grimsson built one. This exists but it's experimental, dangerous, and the DPA confiscated it. Not a standard spell. |
| **Greater Restoration** | Permanent consequences (burnout, tap-out recovery) must stay permanent. This spell deletes consequences. |
| **Remove Curse** | Curses should require narrative solutions, not spell slots. |
| **Sending** | Already covered by COMM-SET. The spell version is too easy — no equipment, no trace. |
| **Animate Dead** | Undead don't fit the industrial magic tone. If they exist, they're abominations, not tools. |
| **Conjure Elemental / Summon spells** | Summoning creatures from nothing is too fantasy. CTEs exist but they're contained, industrial. Not conjured on demand. |
| **Wall of Force / Forcecage** | Hard-light constructs break the "no visible energy" aesthetic rule. |
| **Globe of Invulnerability** | Absolute immunity doesn't fit a gritty, consequence-driven setting. |
| **Time Stop** | Time manipulation at this scale breaks everything. |

### TIER 4: Plot Devices Only

These exist in the setting but are NOT player-accessible spells. They're narrative elements.

| Concept | In Mondas |
|---------|-----------|
| Teleportation | The leyline network *might* allow it. Military black projects. The aboleth can do it. Players can't. |
| Resurrection | The Chairman might offer it. The price is your soul (literally — infernal contract). Not a spell. A deal. |
| Planar travel | The Breach at Meridian Station. The dimensional bleed. These are setting-level events, not abilities. |
| Scrying | Grimsson proved it works. The DPA took his gear. Rebuilding it is a plot thread, not a cantrip. |

---

## CONVERSION AESTHETIC: THE "TOO SCI-FI" PROBLEM

Your instinct that some conversions felt "too sci-fi or fantasy" is real. Here's the spectrum:

```
TOO FANTASY ←——— MONDAS SWEET SPOT ———→ TOO SCI-FI

Glowing runes       Copper contact plates     Holographic displays
Floating weapons     Duct-taped field gear     Sleek chrome devices
Energy beams         Pressure changes          Laser grids
Spectral hands       Things feeling wrong       Nanobots
```

### The Rule

**If a player or NPC would describe the effect using words like "beam," "field," "energy," or "projection" — it's too sci-fi.**

**If they'd use words like "glow," "rune," "aura," or "spectral" — it's too fantasy.**

**Mondas effects should be described with words like:**
- "The air thickened"
- "Something shifted"
- "It felt wrong"
- "The pressure changed"
- "My ears popped"
- "The needle spiked"
- "The metal tasted like copper"
- "Something absorbed the impact"

### Fixing Specific Conversions

The SCANNER is the best example in the current rules — it's a clicker that ticks faster near thaumic activity. Physical. Grounded. Sensory.

The BLINK DRIVE is borderline — "short-range displacement" could go either way. Better description: "Your stomach drops. The world smears. You're somewhere else. Tastes like pennies and bile."

The BARRIER RIG is perfect — mesh undershirt with contact plates. Impact diffusion described as "hitting water." Physical, uncomfortable, industrial.

---

## WHAT MONDAS KEEPS FROM D&D

Not everything needs to change. D&D gives you:

1. **The d20 core** — roll + modifier vs DC. Simple, intuitive, scalable. Keep it.
2. **Advantage/disadvantage** — Brilliant binary. Keep it.
3. **Proficiency bonus** — Clean scaling. Keep it.
4. **Hit points** — Abstract but functional. Keep it.
5. **Action economy** — Action, bonus, reaction, movement. Keep it (but see creative actions above).
6. **Saving throws** — Six stats, roll to resist. Keep it.
7. **Ability scores + modifiers** — The renamed attributes work perfectly.
8. **Skills** — Your renamed + new skills (WHEELS, RESONANCE) are great additions.

### What Mondas Replaces

| D&D Mechanic | Mondas Replacement | Why |
|-------------|-------------------|-----|
| Spell slots | Drain track | Per-encounter tension vs daily conservation |
| Spell levels | Drain costs | Simpler, more visceral |
| Class features | Thaumatech + training | Equipment-based, not identity-based |
| Magical healing everywhere | Healing is real, limited, and painful | Consequences stick |
| Long rest = full reset | Tap-out recovery = story-based | Character growth, not just sleep |
| Alignment | Faction loyalty + personal values | Moral choices, not cosmic labels |
| Inspiration (rarely used) | Creativity Bonus (-2 to -4 DC) | Built into the system, always available |

---

## OPEN QUESTIONS FOR YOU

1. **3rd Level Drain — 7 or 9?** MECHANICS.md says 7 (makes sense in the 1→2→5→7→9 progression). The PDF says 9. I went with 7. Confirm?

2. **Drain Recovery — Short rest for all zones?** MECHANICS.md says yes (all clear on short rest). The PDF says YELLOW/RED need long rest. The short-rest version creates the "push to 9, rest, reset" gameplay loop you described. I went with short rest. Confirm?

3. **Creative Action rules above — too formal?** They could be a one-page addition to the player reference. Or they could stay as GM guidance. Your call.

4. **Spell exclusion list — too aggressive?** I cut teleportation, resurrection, and summoning entirely. If any of these should be rare-but-available, let me know.

5. **The character sheet PNG** (`Character sheet 01.png`) — keep it as art reference, or remove?

---

*This document is for discussion. Nothing here is final until you say so.*
