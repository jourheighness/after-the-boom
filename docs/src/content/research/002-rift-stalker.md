# Playtest 002: Rift Stalker Combat

**Date:** 2026-02-25
**Focus:** Full combat encounter with character builds, gambits, stakes rolls, device gambits, and enemy phasing.
**System version:** MONDAS Core Rules Engine v0.2

***

## Characters

### Kael Rosvik — "The Dockhand"

Grit 3 / Sharp 2 / Nerve 1 | Guard 5 | Drain 4 | Armor 1 (padded work coat)
Background: Dockworker, Ostreon waterfront.

**Weapon:** Boiler Wrench (d8, Long)
**Gear:** 2x Frag Grenade (d8, Thrown, Area Close, Loud), rope, flashlight

**Edges:**

1. **Knack: Pressure Reader** (Knack/Perception) — Feel structural stress in objects and walls at Close. Boon on Grit rolls to break, force, or damage objects.
2. **Iron Gut** (Survival/Body, Situational Boon) — Boon on Grit defense rolls when you have any Harm on your track.
3. **Haymaker** (Combat/Expertise, New Gambit) — New melee gambit: **Stagger.** Sacrifice 4+: target loses their next Move. Strong (6): target is Impaired (-2 damage) AND loses next Move.

### Nessa "Sparrow" Lin — "The Scout"

Grit 1 / Sharp 3 / Nerve 2 | Guard 5 | Drain 4 | Armor 1 (tactical vest, licensed)
Background: Army scout, discharged.

**Weapon:** Hunting Rifle (d8, Ranged, Loud)
**Sidearm:** Revolver (d8, Sidearm, Loud)
**Gear:** 2x Smoke Grenade (Thrown, Area Close, breaks line of sight 1 round), binoculars

**Edges:**

1. **Knack: Thread Sight** (Knack/Perception) — See thaumic residue and active signatures within Near. Boon on Sharp rolls to identify or track thaumic sources.
2. **Spotter** (Combat/Expertise, Gambit Extension) — Your Read gambit on ranged attacks also grants Boon on the next attack against that target (you or an ally), in addition to the detail.
3. **Fieldcraft** (Survival/Experience, Situational Boon) — Boon on Sharp rolls for positioning, finding cover, and scouting in outdoor or ruined environments.

### Tomasz Bruk — "The Operator"

Grit 1 / Sharp 2 / Nerve 3 | Guard 5 | Drain 4 | Armor 0 (work coveralls)
Background: Union thaumatech repairman.

**Weapon:** Kessler-Brandt KD-7 Discharge Rod (d6, Sidearm, thaumatech, contact plate)

* Device Gambit: **Suppress** (1 Drain) — Target entity or thaumatech device is disabled for 1 round. Auto-succeed.

* Device Gambit: **Overcharge** (2 Drain) — Next attack deals d12 instead of d6. Device at risk after.

**Backup:** Pipe Wrench (d6, Subtle)
**Gear:** 1x Concussion Charge (Thrown, Area Close, Loud, Nerve save or lose Act), 2x Ward Patch (consumable: +2 Armor vs thaumic damage, one hit)

**Edges:**

1. **Knack: Resonance Ear** (Knack/Perception) — Hear thaumic frequency shifts in devices and entities at Near. Boon on Nerve rolls when diagnosing or operating thaumatech.
2. **Field Technician** (Thaumatech/Expertise, Situational Boon) — Boon on device risk rolls.
3. **Tether** (Thaumatech/Expertise, New Gambit) — New gambit on discharge weapon attacks: sacrifice 4+: create a thaumic tether. Target can't benefit from concealment or phasing and you always know its position. Lasts until combat ends or target spends Act + Move to snap it. Strong (6): one ally also benefits.

***

## Enemy

### Rift Stalker — Leyline Breach Predator (Tier 3)

Threat 3 | Damage 8 | Guard 10 | Harm 10 | Armor 0 | Morale: no

**Behavior:** Phase toward the highest-BTC positive. Attack the isolated target. If two PCs are adjacent, target the one with lower Guard. If Staggered, phase through the nearest wall and re-approach from a different angle next round. Does not negotiate. Does not flee.

**Abilities:**

* **Phase:** Passes through mundane walls and obstacles. Thaumatech barriers block it. Tether gambit prevents phasing.

* **BTC Sense:** Knows the location of all positives within Far. Cannot detect zeroes.

* **Incorporeal Lash:** Attacks at Close or Near. 8 flat damage. Mundane armor: half value (round down). Thaumatech armor: full value.

* **Reposition:** After attacking, may phase one band in any direction (including through walls).

**Weakness (Read reveals):** Anchored to the leyline breach. If driven Far from anchor: Threat drops to 2, damage drops to 6. Breach can be destabilized or sealed through thaumatech/stakes rolls.

***

## The Scene

Abandoned switching station off Route 9, outside Oakview. Thaumic grid relay went dark three days ago. Union dispatch sent Tomasz to check it. He brought friends.

Concrete building, one story, open floor plan. Dead relay racks. A crack in the floor runs NW to center, pulsing blue. The breach.

**Ranges:** Main floor is one big Near zone. Breach is NW corner. Entrance is SE. Outside is Far from breach.
**Danger Clock:** 6 segments. When full, the breach widens. A second entity comes through.

***

## Setup Phase

**Kael** — positions at relay rack, wrench ready. Grit 3. Rolls `[5, 5, 5]` = **5 (partial).** In position. Sacrifices one 5 for **Setup** (banks a 5 for later).

**Sparrow** — hangs back at entrance, rifle shouldered. Sharp 3. Rolls `[4, 6, 1]` = **6 (full success).** Boon on first attack. Sacrifices the 4 for **Read**: *"What's the entity's relationship to the crack?"* GM reveals the breach anchors the entity. Distance weakens it.

**Tomasz** — crouches behind transformer, discharge rod ready. Nerve 3. Rolls `[3, 2, 2]` = **3 (complication).** The rod spikes, the entity is alerted. The stalker materializes from the breach and targets Tomasz. It acts first in Round 1.

***

## Round 1

### Rift Stalker

Attacks Tomasz from Near. Incorporeal Lash, 8 damage.

**Tomasz defends:** Nerve 3 - Threat 3 = 0d. Spends 1 Drain (+1d) = 1d6. Rolls `[4]` = **partial.** Half damage = 4. Armor 0. Guard 5 drops to 1. No Harm.

Stalker repositions to Close with Kael.

### Sparrow

Attacks with rifle (d8) + setup Boon (d6). Rolls `d8[7], d6[5]`. Keeps 7 for damage. Sacrifices 5 for **Read** (+ Spotter edge: next attack vs target gets Boon). GM reveals: dense core is the weak point, tendrils are display, it flinches from thaumatech.

**Damage:** 7. Guard 10 drops to **3.**

### Kael

Attacks with wrench (d8) + banked 5 from setup. Rolls `d8[1]` + banked `[5]`. Wants gambit fuel, spends 1 Drain. Drain d6 rolls `[3]`. Pool: \[1, 5, 3]. Highest 5. No spare dice showing 4+ (only the 5 itself). Keeps 5 for damage.

**Damage:** 5. Guard 3 drops to **0. Staggered.** Overflow 2 = **Harm 2/10.**

### Tomasz

Sparrow shouted the intel: it's anchored to the breach. Tomasz turns away from the stalker and fires his discharge rod at the breach. **Stakes roll.**

**GM stakes:** Nerve roll (sustained channeling). Hit: breach destabilizes, entity's Threat drops by 1. Partial: breach weakens but cost (stalker lashes him as part of the stakes, half damage on partial). Miss: full lash damage + Danger Clock +2.

Nerve 3 + Knack Boon (Resonance Ear) = 4d6. Rolls `[4, 4, 3, 3]` = **4 (partial).** Sacrifices one 4 for **Setup** (bank for Kael, value 4).

**Partial result:** Breach destabilizes. **Entity Threat drops to 2.** Partial cost: stalker lash as stakes consequence at half = 4 damage. Guard 1 drops to 0. **Scar** (burn across shoulder blades, +1 max Guard). No overflow, no Harm. Danger Clock ticks +1.

### End of Round 1

| PC      | Guard    | Drain | Harm | Banked          |
| ------- | -------- | ----- | ---- | --------------- |
| Kael    | 5        | 3     | —    | 4 (from Tomasz) |
| Sparrow | 5        | 4     | —    | —               |
| Tomasz  | 0 (Scar) | 3     | —    | —               |

Entity: Guard 0 (Staggered), Harm 2/10, Threat 2.
Danger Clock: 1/6.

**Behavior:** Staggered + Morale: no. Stalker phases through west wall. Gone. Will re-enter next round from a different angle.

***

## Round 2

Stalker is gone. Players have a window to reposition and act on the breach.

### Sparrow

Moves from Far to Near (into main room). Uses Act to **Assist Tomasz**: slaps a ward patch on his back. Tomasz gains +2 Armor vs thaumic damage for one hit. No attack this round.

### Kael

Runs to the NW corner (Move). Swings the wrench into the breach. **Stakes roll.**

**GM stakes:** Grit roll (brute force). Knack Boon (Pressure Reader, structural stress). Grit 3 + Boon = 4d6. Full: collapse concrete around breach, entity Threat drops further. Partial: partial collapse, Clock +1. Miss: breach pulses through wrench, thaumic feedback damage, Clock +2.

Rolls `[3, 6, 3, 2]` = **6 (full).** Sacrifices the 6 for **Break (Strong)** on the breach. **Highest drops to 3 = consequence.** The bargain.

**Result:** Strong Break lands: breach is structurally Exposed (+2 vulnerability to sealing). Entity Threat drops to **1.** But consequence: thaumic feedback surges through the wrench. 4 damage to Kael. Armor doesn't apply (leyline energy). Guard 5 drops to **1.**

### Tomasz

Guard 0, Drain 3. Rod still working. He fires at the Exposed breach to try to seal it. **Stakes roll.**

**GM stakes:** Nerve roll (sustained channeling). Knack Boon (Resonance Ear). But Boon + no Snag = Nerve 3 + Boon = 4d6. Full: breach sealed, entity loses anchor (Threat 0, damage 4, begins dissipating). Partial: partially sealed, Clock stops but anchor holds. Miss: beam rebounds, feedback damage, Clock +2.

Rolls `[5, 3, 2, 3]` = **5 (partial).** Sacrifices the 5 for **Read.** **Highest drops to 3 = consequence.** The bargain.

**Read reveals:** Sealing the breach doesn't dissipate the entity. It gets trapped on this side. No anchor = no weakness, but no reinforcement either. A contained problem, not an escalating one.

**Consequence:** Seal attempt fails. Breach surges back. Danger Clock ticks +2. Feedback through the rod. **Device at risk.**

Device risk roll: 2d6 + Field Technician Boon = 3d6. Rolls `[2, 4, 4]` = **4. Breaks.** Rod offline until repaired. Feedback burns his hands: 1 damage straight to Harm (Guard 0). Overflow 1 = **Wounded** (Snag all rolls).

### End of Round 2

| PC      | Guard    | Drain | Harm               | Notes                         |
| ------- | -------- | ----- | ------------------ | ----------------------------- |
| Kael    | 1        | 3     | —                  | At breach, hurt               |
| Sparrow | 5        | 4     | —                  | Center, untouched             |
| Tomasz  | 0 (Scar) | 3     | Wounded (Snag all) | Rod broken, ward patch active |

Entity: Guard 0, Harm 2/10, Threat 1. Phased out, circling building.
Danger Clock: 3/6. Frozen by partial seal? No, seal failed on consequence. Clock is hot.

**Stalker re-enters** from the east wall at end of round, heading for Kael.

***

## Round 3

Stalker phases through the north wall, ambushing Kael at the breach. It was gone a full round; it acts first.

### Rift Stalker

Lashes Kael at Close. 8 damage.

**Kael defends:** Grit 3 - Threat 1 = 2d6. Rolls `[5, 5]` = **5 (partial).** Half damage = 4. Sacrifices one 5 for **Push.** Other 5 still highest, no tier drop. Shoves stalker from Close to Near.

**Damage:** 4. Mundane armor half vs incorporeal = 0. Guard 1 absorbs 1. Overflow 3 = Level 2 Harm: **Wounded** (Snag all). Guard hits 0 = **Scar** (cracked ribs, +1 max Guard = 7 future).

Stalker is pushed to center of room. Close to Sparrow, Near to Kael and Tomasz.

### Sparrow

Switches to revolver (d8, Sidearm). Spotter Boon still live. d8 + Boon d6.

Rolls `d8[2], d6[1]`. Highest **2.** No gambit fuel. Spends 1 Drain. Drain d6 rolls `[4]`. Updated pool: \[2, 1, 4]. Highest 4.

Entity needs 8 more Harm to hit threshold. 4 damage would be 6 total (not enough). But 3 damage (if she sacrifices) would be 5 total (also not enough).

Keeps 4 for damage. **4 Harm.** Total: **6/10.**

### Kael

Wounded (Snag all). Guard 0. Has one frag grenade and banked 4 from Tomasz.

Throws frag grenade: d8, Thrown, Area Close. Banked 4 added post-roll (immune to Snags, per new ruling). Wounded Snag has nothing to eat (no other bonus dice in pool). Just d8.

Rolls `d8[6]` + banked `[4]` post-roll. Pool: \[6, 4].

Keeps 6 for damage. Sacrifices 4 for **Push.** Blast shoves stalker one band away.

**Damage:** 6. **Harm: 6 + 6 = 12/10. Exceeds threshold?** No, 6 + 6 = 12 but total was 6/10 entering this roll. 6 more = **12/10. That's only if Sparrow's damage is counted.** Sparrow dealt 4 this round, Kael deals 6. Running total: 2 (R1) + 4 (Sparrow R3) + 6 (Kael R3) = **12/10. Exceeds threshold. But wait:** only 2 Harm entered R3. Sparrow adds 4 = 6. Kael adds 6 = 12. **12/10. Over. But they act in sequence.**

After Sparrow: 6/10. After Kael: 12/10. **Not dead yet after Sparrow. Dead after Kael.** But Tomasz hasn't gone.

Actually, 6 + 6 = 12 > 10. The stalker is **out** after Kael's grenade.

But Tomasz had already committed to acting. Let's see what he would have done if the grenade didn't finish it.

### Tomasz (moot, but played out)

Wounded (Snag all). Guard 0. Drain 3. Rod broken. Has pipe wrench and a broken rod with one capacitor charge. **Stakes roll: jury-rig the broken rod into a thrown discharge.**

Nerve 3 + Knack Boon - Wounded Snag = net 3d6. Full: d8 thaumic damage. Partial: d6 damage + feedback (1 damage to Tomasz). Miss: capacitor detonates in hands.

Rolls `[2, 5, 1]` = **5 (partial).** Keeps the 5 (sacrificing would drop to consequence = capacitor in face). Partial: d6 damage + 1 feedback to Tomasz.

Rolled `d6[4]` for damage. 4 Harm to stalker. Would have brought total to 10/10 exactly (threshold). Also kills it.

Feedback: 1 damage to Tomasz at Guard 0 = overflow 1 = Level 1 Hurt.

**The stalker was already dead from Kael's grenade. Tomasz's throw hits a dissolving corpse.**

### Resolution

The frag grenade detonates under the stalker. The dense core shatters. Blue light fragments spray across the relay racks and dissolve. The room goes quiet except for the faint crackle of the half-sealed breach and Tomasz's ragged breathing.

***

## Final State

| PC      | Guard       | Drain | Harm           | Resources Spent                                                |
| ------- | ----------- | ----- | -------------- | -------------------------------------------------------------- |
| Kael    | 0 (Scar x2) | 3     | Wounded        | 1 Drain, 2 frag grenades, banked die                           |
| Sparrow | 5           | 3     | —              | 1 Drain, Spotter Boon                                          |
| Tomasz  | 0 (Scar)    | 3     | Wounded + Hurt | 2 Drain (if throw counted), rod destroyed, 1 ward patch unused |

**Entity:** Dead. 12/10 Harm.
**Breach:** Half-open, glowing faint. Needs a proper crew.
**Danger Clock:** 3/6. Frozen if breach partially sealed; ticking if not.

**Intel from Read gambits:**

1. Entity is anchored to the breach. Distance weakens it.
2. Sealing traps it on this side, doesn't kill it.
3. The relay shutdown was deliberate. Tool marks on the housing. Someone manufactured this breach.

***

## Design Observations

### What worked

**Sacrifice-tier-drop is the core drama.** Every decision to sacrifice a highest die produced the best moments. Kael sacrificing a 6 to Break the breach and eating thaumic feedback. Tomasz sacrificing a 5 for Read and losing his rod. The bargain pattern is the beating heart of the gambit system.

**Three lanes are real and distinct.** Attacks (grenades, rifle, revolver), gambits (Push, Read, Break, Setup), and stakes rolls (shoot the breach, smash the floor, jury-rig the rod). Stakes rolls produced the most dramatic moments.

**Threat degradation as fight arc.** Players went Threat 3 to 2 to 1 through creative action, not just damage. The fight had strategic shape.

**Drain pressure scaled correctly.** Every box mattered differently for each character. Tomasz's Drain was life-or-death. Sparrow's was fishing for gambit fuel.

**Setup phase defined the fight.** Tomasz's botched 3 gave the entity initiative. Sparrow's 6 + Read gave the party the strategy. Kael's banked 5 saved a terrible attack roll.

### What needs attention

**Wounded Snag eating bonus dice is devastating.** A Wounded character with one Boon is functionally identical to one with no Boon. Recovery pacing between encounters is the balance lever.

**New Gambit edges (Haymaker, Tether) never fired.** The fight went sideways before they could activate. Need longer fights or different encounters to test.

**Gambit resistance (Threat 2+) barely tested.** Threat dropped fast enough that standard gambits always landed.

**Weapon properties didn't drive decisions.** Interesting moments came from stakes rolls and device gambits, not Long/Ranged/Sidearm.

### Design decisions from this playtest

**D65: Setup timing.** Banked dice are added post-roll, after Snags resolve. They are not in the pool when Snags remove dice. This makes Setup immune to Snag removal by timing, not by exemption.

**D66: Setup for ally is standard.** Standard Setup (4+): bank the die for yourself OR hand it to an ally. Strong Setup (6): bank for yourself AND an ally (same value, two dice). Assist remains as a separate Act (give up your turn for +1d6 to an ally, pre-roll, in-pool).

**D67: Assist vs Setup distinction.** Assist: costs your whole Act, gives a random d6 in the ally's pool (pre-roll, Snag-vulnerable). Setup for ally: costs a 4+ die from your own roll, known value, post-roll injection, Snag-immune. Assist is the reliable floor (no roll needed). Setup is the opportunistic reward.
