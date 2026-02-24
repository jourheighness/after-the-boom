# MONDAS Core Rules Engine v0.2

## In Two Minutes

You have three stats: **Grit** (body), **Sharp** (senses), **Nerve** (will). Each rated 1-4.

When you do something risky, roll d6s equal to your stat. Read the highest die: **6** you do it, **4-5** you do it with a cost, **1-3** things go sideways. After you roll, you can sacrifice dice showing 4+ for guaranteed side effects called **Gambits**: trip someone, pocket a key, read a person's intent. Even when you fail, you get one free.

In combat, attacks auto-hit. Roll your weapon die for damage. Boons from setup, flanking, or allies add d6s to the pool. Extra dice are Gambit fuel: sacrifice them to change the battlefield. One die = damage or effect, pick one. More dice = both. **Push** spends willpower for +1d when you need it most. **Guard** keeps you standing. When either empties, something breaks.

---

## The Roll

When the outcome is uncertain and the stakes matter, a player rolls.

**Roll d6s equal to the relevant stat. Read the single highest die.**

| Highest Die | Result |
|-|-|
| **6** | Full success. No strings. |
| **4-5** | Partial success. Cost, complication, or reduced effect. |
| **1-3** | Consequence. The GM makes a move. |
| **Two or more 6s** | Critical. Full success, plus a bonus effect (see Combat for attack/defense criticals). |

**Zero dice:** When modifiers reduce your pool below 1, roll 2d6 and take the **lowest**. Criticals are impossible at 0d.

The GM never calls for a roll when there's no risk. Safe actions just happen. Impossible actions just fail.

---

## Stats

**Grit:** Strength, toughness, endurance, physical presence. Kicking down a door, taking a punch, hauling someone to safety.

**Sharp:** Awareness, reflexes, precision, analytical thinking. Spotting danger, dodging a swing, picking a lock, working through a problem, connecting dots.

**Nerve:** Willpower, composure, influence, courage. Keeping cool under pressure, lying convincingly, resisting a thaumic intrusion.

Each stat is rated **1-4**.
- **1:** Weak. One die and a prayer.
- **2:** Average. Partial success is your life.
- **3:** Strong. Misses are rare.
- **4:** Exceptional. The best in the room.

Starting characters distribute **6 points** across three stats (minimum 1 each). Common spreads: 3/2/1 (specialist), 2/2/2 (generalist).

### Which Stat?

The player describes what they do. The description determines the stat.

"I shove past him" = Grit. "I slip past when he looks away" = Sharp. "I talk my way through" = Nerve.

Different approaches to the same problem use different stats, different odds. The approach must make sense in the situation. The GM judges stakes based on how well it fits.

### Edges

**Edges** are what make your character yours. Special training, innate talents, connections, knacks. Each Edge gives a specific mechanical benefit: bonus dice in certain situations, new tactical options, access to thaumic abilities, or a narrative capability.

Characters start with **3 Edges** (positives) or **4 Edges** (zeroes, who compensate for lack of thaumic access with broader training). Edges are gained through play, roughly 1 every 2-3 sessions. See `rules/CHARACTER.md` for creation details. The full Edge catalog is in `rules/EDGES.md`.

---

## Boons & Snags

Modifiers that add or remove dice from the pool.

**Boon (+1d):** Something works in your favor. Training, good gear, environmental advantage, ally assistance, clever approach.

**Snag (-1d):** Something works against you. Injury, poor positioning, enemy capability, bad conditions, improvised tools.

Boons and Snags cancel 1-for-1. Only the net result applies. Maximum pool: **5d** (stat 4 + Boon). Minimum: **0d** (roll 2d6 take lowest). On attacks, Boons add d6s to the weapon die instead (see Combat).

### Sources of Boons
- **Training/Background:** Relevant expertise for the situation.
- **Gear:** The right tool for the job.
- **Creative approach:** Using the environment, exploiting a weakness, leveraging preparation. Max 1 Boon from creativity per roll.
- **Ally assist:** Another character helps. They describe how. Costs their Act (in combat) or exposes them to risk (out of combat).
- **Raising the stakes:** Accept worse consequences for +1d (see Stakes).

### Sources of Snags
- **Injury:** Wounds apply Snags when the injury interferes (see Taking Damage).
- **Enemy Threat:** Powerful enemies impose Snags on defense rolls (see Defense).
- **Environment:** Darkness, smoke, unstable ground.
- **Improvisation:** Using the wrong tool.
- **Playing it safe:** Accept -1d for softer stakes (see Stakes).

---

## Stakes

Before any roll, the GM states what's at risk.

**The GM tells the player two things:**
1. **On a partial (4-5):** What complication, cost, or reduced effect comes with success?
2. **On a consequence (1-3):** What goes wrong?

Stakes must be **specific and grounded.** Not "you take damage" but "the guard draws his weapon." Not "reduced effect" but "you get through the door but they hear you."

### The Negotiation

The player hears the stakes. Then they can:

- **Accept and roll.** Most of the time.
- **Raise the stakes.** Accept worse consequences, get a **Boon (+1d)**. More risk, better odds.
- **Play it safe.** Accept softer consequences, take a **Snag (-1d)**. Less risk, worse odds.
- **Change approach.** Different action, new stakes, possibly different stat.
- **Back off.** No roll, no consequence.

> **Example (raising):** Lee needs to cross a dark parking lot under sniper observation. The GM says: "Sharp roll. On a 4-5, you make it but the sniper tracks your position. On a 1-3, you take fire crossing open ground." Lee raises: "I sprint flat out." GM: "On a 1-3, you take a hit and they know exactly where you're headed. But take a Boon."
>
> **Example (playing safe):** Oliver needs to talk past a DPA desk clerk. Nerve roll. GM says: "On a 4-5, she lets you through but logs your name. On a 1-3, she calls it in and you're flagged." Oliver has Nerve 2 and the group can't afford being flagged. He plays it safe: "I just ask for directions, keep it casual, don't push." GM: "Snag, but on a 1-3, she just doesn't help. No flag." One die worse, but the floor is survivable. Sometimes the smart play is keeping the stakes low.

---

## Saves

When an effect forces you to resist, roll the specified stat. "Grit save" means roll Grit. "Nerve save" means roll Nerve. Same result table: 6 = resist fully, 4-5 = partial, 1-3 = full effect.

The triggering effect defines the consequences, not the GM. If an enemy ability says "Nerve save or stunned," the consequence is built in. On a partial (4-5), the effect lands at reduced intensity: stunned for one action instead of until end of next turn, forced movement goes half distance, a Snag applies to your very next roll only.

Saves use normal Boon/Snag rules. Powerful enemies impose Snags on defense rolls (see Defense), but **not on saves**. Saves stand on their own.

> **Default partial:** When a partial save feels ambiguous, the effect applies to the target's very next action only, or the target takes a Snag on their next roll.

---

## Guard & Push

Two resource tracks. Guard protects your body. Push fuels your will.

### Guard

Your readiness: awareness, positioning, luck, the instinct that keeps you alive.

**Starting Guard = 2 + your highest stat** (range 3-6, max 10 through Scars).

Guard is **not HP.** When Guard drops, you haven't been hurt yet. You've been pushed, rattled, forced into worse positions. The first real injury comes when Guard breaks.

**Recovery:** Guard refreshes when genuine safety occurs. If the characters would feel safe enough to sit down and breathe, Guard refreshes. Routine scenes (shopping, travel, safe conversation) always refresh. A tense social scene where violence is possible does not. Continuous threats (combat follows a negotiation, chase follows a break-in) do not refresh between them.

### Push

When the dice aren't enough, you dig deep.

**Push track: 4 boxes.** Spend 1 Push to:
- **Add +1d** to any roll (before rolling). One Push per roll.
- **Reduce incoming damage by 2** (after a defense roll).
- **Act despite a Critical injury** (when you'd normally be incapacitated).
- **Activate a device gambit**: thaumatech devices do things dice can't. Auto-succeed. GM sets Push cost from fiction. See `rules/THAUMATECH.md`.

Device gambits can cost multiple Push. You can Push a roll (+1d) and activate a device gambit in the same turn, but both draw from the same 4-box track.

**Cracking:** When your Push track empties, you **Crack**: take a lasting condition that reflects how the pressure broke you.
- *Reckless:* you stop caring about safety
- *Paranoid:* you trust no one
- *Numb:* nothing reaches you
- *Volatile:* your temper is a lit fuse

A Crack has occasional mechanical weight (GM may impose Snags when it interferes). Cracks clear through significant narrative moments, not rest.

**Recovery:** Push recovers during **downtime** by:
- Spending time with someone who matters
- Doing something that reminds you who you are
- Getting proper rest in a safe place
- Indulging a vice or habit (quick but the GM may complicate)

---

## Taking Damage

When damage hits you, follow this pipeline:

```
Damage → subtract Armor → subtract Guard → overflow = Harm
                                              ↓
                                     Guard hits 0? → Scar
```

**Step by step:**
1. **Armor** reduces damage (flat 0-3)
2. Remainder hits **Guard**
3. If Guard reaches **0** (exact or overflow): you're **Marked**, take a **Scar**
4. Overflow past Guard becomes **Harm**

> **Example:** A DPA agent hits you for 4 damage. You have Armor 1, Guard 3. Armor absorbs 1 (leaving 3). Guard absorbs 3 (reaching 0). Guard broke: take a Scar. No overflow, so no Harm.
>
> Same hit, Guard was already at 1: Armor absorbs 1 (leaving 3). Guard absorbs 1 (reaching 0). Overflow: 2. Scar + Level 1 Harm.
>
> A CSS Operator hits you for 6 damage. Armor 1, Guard 2. Armor absorbs 1 (leaving 5). Guard absorbs 2 (reaching 0). Overflow: 3. Scar + Level 2 Harm (Wounded). You now have a Snag on all rolls until you get treatment.

### Armor

| Rating | Protection | Examples |
|-|-|-|
| 0 | None | Street clothes |
| 1 | Light | Padded coat, leather, minor ward |
| 2 | Moderate | Tactical vest, reinforced gear, shielding charm |
| 3 | Heavy | Full ballistic plate, heavy plating. Rare, conspicuous |

Heavy or conspicuous armor may impose Snags (Sharp for bulk, Nerve for looking like you expect a fight). Details in `rules/EQUIPMENT.md`.

### Harm

When damage overflows Guard, you take real injuries. The Harm track has 3 levels, 2 slots each:

| Level | Name | Effect | Example |
|-|-|-|-|
| 1 | **Hurt** | Snag when the injury is directly relevant | Grazed arm, twisted ankle |
| 2 | **Wounded** | Snag on all rolls | Cracked ribs, deep laceration |
| 3 | **Critical** | Must Push to act at all | Gut shot, shattered leg |

**Overflow determines Harm level:**

| Overflow | Harm Level |
|-|-|
| 1-2 | Level 1 (Hurt) |
| 3-4 | Level 2 (Wounded) |
| 5+ | Level 3 (Critical) |

Each Harm is **named**. Player and GM agree on the injury based on the fiction. The name determines when the Hurt penalty applies and how recovery works.

If both slots at a level are full, new Harm bumps up to the next level. If both Level 3 slots are full and you take more: **you're dead**, or suffer a permanent campaign-altering consequence (lost limb, captured). The table decides.

### Scars

When Guard drops to 0, you're Marked. Something changes permanently.

The player describes the Scar: a physical mark (split lip, burn scar), a psychological one (flinch at loud noises, can't sleep with lights off), or a material loss (weapon cracked, something precious broken).

**Scars are permanent but not punishing.** They make your character more defined, not less capable.

**Guard Growth:** The first Scar in a session increases your maximum Guard by 1 (cap 10). Getting hurt teaches you to protect yourself.

### Recovery

| Level | Recovery |
|-|-|
| **Hurt** (1) | Clears after the scene. A breather, a bandage. |
| **Wounded** (2) | Treatment and downtime. Medical attention, a few days off. |
| **Critical** (3) | Serious intervention. Hospital, skilled healer, long recovery arc. |

Recovery is a **scene**, not a mechanic. The fiction determines what healing looks like.

---

## Conditions

Some effects impose named conditions.

**Stunned.** Can't act. No Move, no Act, no reaction. Defense at 0d (2d6, take lowest). Lasts until the end of your next action unless stated otherwise.

**Shaken.** Rattled, panicked, or reeling. Snag on all rolls until cleared. Clears at end of scene, or earlier through intervention (ally help, Presence Anchor Gambit, comparable action the GM accepts).

**Prone.** On the ground. Standing costs your Move. Melee attacks against you get a Boon. Ranged attacks against you get a Snag. Can crawl at Close range without standing.

**Staggered.** Enemies only. Guard broke. The GM checks Morale (see Enemies). The enemy is fighting hurt: stumbling, panicking, exposed. Most enemies break here.

---

## Combat

### Setup Phase

When combat is expected (not an ambush), each player gets one setup roll before the first round. Describe your preparation: take cover, line up a shot, flank wide, ready a device. Roll the relevant stat.

| Result | Effect |
|-|-|
| **6** | Boon on your first attack. |
| **4-5** | In position. Nothing extra. |
| **1-3** | Complication. Spotted early, bad angle, dropped something. |

This is a standard roll. Gambits apply: sacrifice a die showing 4+ for a side effect (Conceal, Scout, Read, Position). A 6 that also has spare dice can earn a Boon AND a Gambit.

Skipped on ambush or surprise. See Ambush below.

### Round Structure

Each round:

1. **Players act** in any order. Each player gets one turn.
2. **Enemies act.** The GM plays each enemy according to its Behavior line.
3. **Environment.** Clocks tick, fires spread, structures shift.

Repeat until the fight ends.

### Three Lanes

Everything in combat falls into one of three lanes:

**Hurting an enemy?** Attack. Roll your weapon die, deal damage.

**Changing the battlefield?** Gambits. Sacrifice a die from your attack roll. Shove, trip, disarm, create cover, blind, pin. Anything that shifts the tactical situation costs a die.

**Doing something else entirely?** Stakes roll. Hack a terminal, barricade a door, hotwire a van, call for backup. GM sets stakes, you roll the relevant stat. Not an attack, doesn't use weapon dice.

### Your Turn

You get a **Move** and an **Act**, in either order.

- **Move:** One range band (Close ↔ Near ↔ Far), or reposition at the same range (behind cover, toward a different target).
- **Act:** Attack, use a device, interact with the environment, or Assist.

**Assist:** Instead of attacking, describe how you help another player. They get a **Boon** on their next roll. You must be positioned to help.

### Attacking

Attacks auto-hit. You never roll to see *if* you connect. The roll determines *how hard* and *what else* happens.

**Procedure:**

1. Declare your target and weapon
2. Declare Push (+1d6) if spending it. Must be before the roll.
3. Roll: weapon die + Boon d6s + Push d6
4. **Choose:** keep dice for damage, or sacrifice dice showing 4+ for Gambits
5. Highest remaining die = damage
6. Subtract target's Armor
7. Apply to Guard, overflow to Harm

Sacrifice all dice = 0 damage, pure Gambit effects. One die with no Boons or Push = damage OR Gambit, pick one.

**Criticals:** Roll the max on your weapon die (6 on d6, 8 on d8, 10 on d10, 12 on d12) and it's a crit. Full damage plus one free Strong Gambit. No sacrifice needed. Works even on a single die.

### Defense

When an enemy attacks, the targeted player rolls to defend. No separate reaction. The defense roll IS your response.

**Pick your stat from the fiction:**
- **Sharp:** dodge, duck, reflexes
- **Grit:** brace, absorb, power through
- **Nerve:** hold steady, resist thaumic effects, stand your ground

Roll [stat]d6, minus Snags from enemy Threat (see Enemies). Push for +1d before rolling.

| Roll | Damage Taken |
|-|-|
| **6** | None. |
| **Critical (two+ 6s on stat dice)** | None, plus Boon on your next action. |
| **4-5** | Half (round up). |
| **1-3** | Full. |

Then apply Armor → Guard → Harm as normal.

**Multiple attackers:** Defend separately against each. The GM may combine identical mooks into one roll at combined damage.

### Boon Sources

Boons add +1d6 to attacks. Multiple Boons stack. Sources:

- **Setup phase:** Roll 6 during setup
- **Flanking:** Two allies at Close with the same enemy from different angles
- **Assist:** An ally spends their Act to help you
- **Position Gambit:** Sacrifice a die to set up for next turn
- **Cover advantage:** Long weapon at Near vs Close-only attacker
- **Edges:** Some Edges grant situational Boons

**Snag on attacks** replaces your weapon die with 1d4. No Gambit access. A Boon cancels a Snag.

### Positioning

Three abstract ranges. Relative to entities, not a grid.

| Range | Scale |
|-|-|
| **Close** | Arms' reach. Melee, grappling. |
| **Near** | Across a room. Pistol range, thrown objects. |
| **Far** | Across a field. Rifle range, rooftop to street. |

**Disengaging:** Moving away from Close costs your Move. If the enemy hasn't acted yet, they may respond (pursue, attack, grab). If they already acted, you leave clean. Some Gambits bypass this.

**Cover:** Partial +1 Armor, Full +2 Armor, ranged attacks only. No effect at Close. Strong Gambits can destroy cover.

**Flanking:** Two allies at Close from different angles. Both get a Boon. Breaks when the target moves.

### Ambush

Attack from concealment. Roll Sharp before combat. On 6: Boon on opening attack. On 4-5: attack normally. On 1-3: spotted, combat starts on their terms. Ambushers act first. Target gets no defense roll against the first attack.

### Retreat

Spend your Move, leave. Enemies may pursue.

### De-escalation

Spend your Act, roll Nerve. On 6: one enemy stops fighting. On 4-5: they hesitate, lose next action. On 1-3: they ignore you, next attack targets you specifically. Only works on enemies with Morale.

### Weapons

| Category | Die | Examples |
|-|-|-|
| Unarmed / Improvised | d4 | Fists, bottle, chair leg |
| Light | d6 | Knife, baton, small pistol |
| Standard | d8 | Sword, shotgun, rifle |
| Heavy | d10 | Two-handed weapon, high-caliber |
| Devastating | d12 | Vehicle ram, explosion, major thaumic discharge |

**Properties** change how a weapon interacts with positioning and combat. They stack.

| Property | Effect |
|-|-|
| **Ranged** | Attacks at Near and Far. Snag at Close. |
| **Sidearm** | Attacks at Close and Near. Snag at Far. |
| **Thrown** | Can attack at Near. Weapon lost unless recovered. |
| **Long** | Attacks at Close and Near. Boon at Near vs Close-only attacker. |
| **Loud** | Heard at Far. Ticks attention/heat clocks. |
| **Brutal** | On a critical: damage = weapon die max + highest Boon die (e.g. d8 crit with a Boon d6 showing 5 = 13). Solo crit = just the max. |
| **Subtle** | Concealable. Drawing doesn't raise alarms. |
| **Slow** | Cannot attack and Move in the same turn. |

Full weapon catalog in `rules/EQUIPMENT.md`.

### Consumables

Single-use items with the Thrown property. Use your Act, spend the item. Range is Near. Using explosives at Close catches you in the blast.

| Item | Die | Properties | Effect |
|-|-|-|-|
| Flashbang | — | Thrown, Loud | Sharp save or Snag on next action |
| Smoke grenade | — | Thrown | Breaks line of sight. Lasts until end of next round. |
| Molotov | d6 | Thrown, Loud | Damage to all at Near + area alight |
| Frag grenade | d8 | Thrown, Loud, Brutal | Damage to all at Close of impact |
| Concussion charge | — | Thrown, Loud | Nerve save or lose next Act |

Gear can also unlock Gambit effects (Flash, Obscure, Restrain). Sacrifice a die 4+ during an attack for the effect alongside damage, or use the item as your Act without attacking. Full gear catalog in `rules/EQUIPMENT.md`, full Gambit catalog in `rules/GAMBITS.md`.

---

## Gambits

The GM sets the stakes. You roll. Then you look at your dice and decide: is the result enough, or do I want more?

Gambits are the player's leverage. After rolling, any die showing **4+** can be sacrificed for a guaranteed side effect from the Gambit list. The GM doesn't set the terms on this part. You see what you rolled, you pick a Gambit, and it happens. It's the one moment in the system where the player negotiates: "I'll give up this die if I also get this."

**The fiction filter.** A Gambit has to follow from what you're doing, how you're doing it, and where you are. You can't Trip someone with a rifle across a parking lot. You can Shove them (suppressive fire forces them back through a doorway). The GM vetoes anything that doesn't make sense with your weapon, position, and approach.

### Why Gambits Are Worth It

**In combat:** spare dice below your highest are free fuel. They weren't helping damage. Spend them on side effects at no cost. The hard choice comes when your only die is your best die: board control vs. damage.

**On any roll, three patterns:**

- **Free pickup.** Spare dice below your highest weren't affecting the result. Spend them for a side effect. You succeed AND grab something extra.
- **Softening the blow.** Roll 4-5, GM names the cost, spend a spare die to dodge the worst part. The partial still lands, but you edited the consequences.
- **The bargain.** Sacrifice your best die, accept the worse result, grab something from the wreckage. Sometimes failure changes the scene in ways success never could.

**When a sacrifice drops your result a full tier, the GM matches the Gambit's scope to the cost.** A Gather that costs nothing learns one detail. A Gather that cost you the whole roll learns the full picture.

### Fail Gambit

When your final result is 1-3, whether you chose it or rolled it, you get one free Gambit. No die cost. The fiction of the failure creates one opening you grab on the way down. The fiction filter still applies: the situation has to make it possible.

Every roll stays alive. You failed and noticed something, pocketed something, set something up.

### The Mechanics

Sacrifice a die showing **4+** for a Gambit. This works on **any roll**, combat or otherwise. You see the dice first, then decide. One Gambit per die sacrificed. Multiple dice, multiple Gambits. No duplicates per roll.

In combat, you trade damage for effect. On any other roll, you trade outcome quality for effect.

> **Example (free ride):** Brian swings a heavy wrench (d10) with a Boon from flanking (+1d6). Rolls 8 and 4. Keeps 8 for damage, spends the 4 on Trip. 8 damage AND prone. The Trip cost zero damage because the 4 was below his best die.
>
> **Example (hard trade):** Murph stabs a guard with a knife (d6). Rolls 5. His only die. Keep it for 5 damage, or sacrifice for Pin (hold the guard so Max can get past). Murph sacrifices. 0 damage. Board state matters more than the hit.
>
> **Example (the bargain):** Oliver fast-talks a receptionist. Nerve 3, rolls 5, 3, 3. Partial: she's not buying it but hasn't called security. He spots a keycard on the desk. Sacrifices the 5 for Conceal: palms it. Highest drops to 3, full failure, she calls security. But Oliver has the keycard.

### Gambit Sources

Your available Gambits come from three places that stack:

1. **Base list** (below). Available to everyone, every roll. 15 Gambits across four categories.
2. **Weapon Gambits** (1 per weapon, listed in `rules/EQUIPMENT.md`).
3. **Property-category Gambits** (from `rules/GAMBITS.md`). Any Melee weapon gets all Melee Gambits, any Ranged weapon gets all Ranged Gambits, etc.

If the same Gambit name appears in multiple sources, you have it once, not twice.

### Strong Gambits

Two ways to get one: sacrifice a die showing **6**, or roll a critical (weapon die max). Strong Gambits:
- Go through resistance at **any Threat level**
- Produce **greater effect:** destroy cover, break a weapon, hurl someone across the room

### Base Gambits

<!-- BASE GAMBIT LIST — LOCKED. 15 entries across 4 categories.
     Edges and equipment EXTEND (new trigger, modified effect, changed threshold).
     They do not add base Gambits. To modify this list, update the count and commit. -->

#### Maneuver
Output: positioning, access, protection.

- **Position:** Boon on your next related roll. You set something up.
- **Escape:** Break contact. Disengage without triggering a response.
- **Conceal:** Hide yourself, an object, or a trail from detection.
- **Stall:** Delay an impending consequence by one action. If the GM is tracking progress toward something (reinforcements, a collapsing building), Stall also nudges that progress by one tick in your favor. *The consequence returns on the next action unless addressed. Stall is borrowed time, not escape.*

#### Assess
Output: information only. The situation does not change.

- **Gather:** Learn one specific detail beyond what the roll gives you.
- **Read:** Reveal one true thing about a person's state, intent, or vulnerability.
- **Scout:** Map the space. Exits, threats, numbers, opportunities.

#### Influence
Output: changes people or institutions.

- **Shift:** An NPC's attitude, behavior, or stance changes in a direction you describe.
- **Pressure:** They make a decision now they'd rather defer.
- **De-escalate:** Reduce hostility one notch. Buy a beat of calm.

#### Fight
Output: physical combat effects. Bodies and objects move.

- **Shove:** Push target one range band or into an obstacle.
- **Trip:** Knock prone. Stand costs Move.
- **Disarm:** Force weapon drop.
- **Pin:** Hold target in place. They spend an Act to break free.
- **Create Cover:** Improvise cover. Flip table, kick dumpster. +1 Armor vs ranged.

<!-- END BASE GAMBIT LIST -->

### Gambit Resistance

Strong Gambits (sacrificed a 6) go through resistance. They land at full effect regardless of Threat level.

Standard Gambits (sacrificed a 4-5) can be resisted by tougher enemies. The GM judges based on Threat: mooks eat everything, dangerous enemies shrug off standard effects unless the fiction justifies it.

### Thaumatech Device Gambits

Different from gear gambits. Device gambits cost **Push** (not a sacrificed die), auto-succeed, and do things dice can't. See `rules/THAUMATECH.md`.

---

## Enemies

The GM never rolls dice. Enemies are static profiles that act through fiction and flat numbers.

- **Threat** (0-3): Snags on player defense rolls
- **Damage**: Flat damage dealt on the GM's turn
- **Guard**: Buffer against player attacks. When it hits 0, the enemy is **Staggered**
- **Armor** (0-3): Flat damage reduction
- **Harm Threshold**: How much damage past Guard before they're out
- **Morale** (yes/no): Can they break?
- **Behavior:** Priority list for GM decisions

### Taking Damage

Player damage → subtract Armor → subtract Guard. When Guard hits 0: enemy is **Staggered** (fighting hurt, losing composure). Damage past Guard accumulates as Harm.

When Harm reaches the enemy's **Harm Threshold**, they're **out**: dead, incapacitated, fled, or surrendered. The fiction and the killing blow determine which.

No wound levels, no conditions, no tracking Snags on enemies. They're either up, Staggered, or out.

### Threat Levels

| Threat | Defense Snag | Profile | Examples |
|-|-|-|-|
| 0 (Mook) | None | Low Guard, low damage, threshold 1-2 | Untrained, panicked, civilian |
| 1 (Tough) | -1d | Moderate Guard, trained | Soldiers, agents, experienced fighters |
| 2 (Dangerous) | -2d | High Guard, high damage | Elite operators, enhanced, tactical teams |
| 3 (Lethal) | -3d | Massive Guard, devastating damage | Apex predators, war machines, major entities |

Threat only affects defense. It does not change how enemies take damage.

### Morale

When an enemy is Staggered or half their group is down, the GM checks Behavior. This is a judgment call, not a roll. Most enemies break: flee, surrender, negotiate. Only fanatics, cornered animals, and entities fight to the death. When in doubt, they run.

### Behavior

A priority list that tells the GM what an enemy does. Reduces cognitive load.

> *"Enforcer: Close distance, target isolated PC, fall back if Staggered."*

### Example Stat Blocks

**Street Tough**
Threat 0 | Damage 3 | Guard 2 | Harm 2 | Armor 0 | Morale: yes
*Knife (d6, Subtle) or bat (d6)*
Behavior: Threaten first. Flee if Staggered. Won't fight alone.

**DPA Field Agent**
Threat 1 | Damage 4 | Guard 5 | Harm 4 | Armor 1 | Morale: yes
*Service pistol (d6, Sidearm, Loud), thaumatech scanner*
Behavior: Contain and call backup. Withdraw if outgunned. Never engages a confirmed shaper alone.

**CSS Kill-Team Operator**
Threat 2 | Damage 6 | Guard 6 | Harm 6 | Armor 2 | Morale: yes (on signal)
*Assault rifle (d8, Ranged, Loud, Brutal), combat knife (d6, Subtle)*
Behavior: Eliminate primary target. Suppress others. Retreat on signal only.

**Unbound Thaumic Entity**
Threat 3 | Damage 8 | Guard 8 | Harm 10 | Armor 0 | Morale: no
*Thaumic discharge (d12, ignores mundane Armor)*
Behavior: Drawn to highest BTC source. Passes through mundane obstacles. Retreats from sustained suppression. Does not negotiate.

---

## Clocks

### Danger Clocks

Fights don't stay static. A **Danger Clock** is a circle divided into segments (4, 6, or 8). At the end of each round, tick 1 segment. When it fills, something bad happens:

- Reinforcements arrive
- The structure collapses
- Authorities respond
- An enemy activates something dangerous

The GM reveals the clock and its consequence at the start of combat. Players can see the countdown. Specific events may tick extra segments.

### General Clocks

Clocks track any complex situation with measurable progress:

- **Healing clock:** fill to recover from Wounded/Critical
- **Investigation clock:** piece together a mystery
- **Heat clock:** unwanted attention accumulates
- **Project clock:** long-term goals (build a device, establish a safehouse)

**Segments:** 4 (straightforward), 6 (complex), 8 (daunting).

**Ticking from rolls:** Full success = 2 ticks. Partial = 1. Critical = 3. Consequences may tick enemy or threat clocks instead.

Clocks are visible to all players. No hidden progress.

---

## Work a Lead

When a PC has something concrete to go on, a **lead**, they can work it. A lead is a name, an address, a document, a device, a contact, a rumor, a thaumic signature. Something specific that points somewhere.

The player names the lead. The GM states what working it costs: time, exposure, risk. Then the player rolls.

**Stat from fiction:** Sharp (analyze, search, connect dots), Nerve (lean on contacts, bluff past a desk clerk), Grit (stake out, dig through wreckage, endure a hostile source).

| Highest Die | Result |
|-|-|
| **6** | Clear answer. Ask a follow-up question for free. |
| **4-5** | You get it, but: incomplete, costly, or someone noticed. |
| **1-3** | Dead end, wrong conclusion, or the GM makes a move. |

Background Boon applies if the domain is even adjacent. Knacks fire if the obsession intersects. Thaumatech can open leads that don't exist for mundanes: a scanner reads residue, a tap plays back a conversation, a tracer follows a signature.

No lead? No roll. Either the PC already knows (Background, Knack, common knowledge) or they need to find a lead first. That's a scene, not a mechanic.

### Projects

When the answer is too big for one lead: mapping a conspiracy, tracing a supply chain, decoding a dead language. The GM starts a **clock** (4, 6, or 8 segments). Each lead ticks it: 1 on a partial, 2 on a full, 3 on a critical. When full, the PC gets the full picture.

Each lead costs time and may carry its own stakes. A partial might tick the clock *and* alert someone.

---

## Group Checks

When the whole group faces something together.

### Weakest Link

Everyone rolls. The **worst result** is the group result.

**Cover:** Before rolling, a PC can cover for someone who'd be the weak link. The covering PC takes a **Snag**. The covered PC skips, folded into the cover. One cover per PC, must be plausible in fiction.

Use for: sneaking past a checkpoint, crossing a collapsing bridge, talking through a DPA sweep.

### Group Effort

Everyone rolls individually. The GM sets a **clock** (4, 6, or 8). Each roll ticks it: 1 on a partial, 2 on a full, 3 on a critical. A miss ticks nothing and may trigger a complication. When full, the group succeeds.

If the clock isn't full after everyone rolls, the GM decides: another round (with escalating stakes) or partial success based on progress.

Use for: searching a building, fortifying a position, fleeing through a crowd, performing a group ritual.

---

## Quick Reference

### The Roll
Roll [stat]d6, read highest. 6 = full, 4-5 = partial, 1-3 = consequence. Crit: two+ 6s on stat rolls, weapon die max on attacks. Free Strong Gambit.

### Stats
Grit (body), Sharp (senses), Nerve (will). Rated 1-4. Sum = 6.

### Modifiers
Boon = +1d. Snag = -1d. Cancel 1-for-1. Max 5d, min 0d (2d6 take lowest). On attacks: Boon/Push = +1d6, Snag = replace weapon die with 1d4 (Boon cancels).

### Stakes
GM declares consequences. Raise (+1d, worse stakes), play safe (-1d, softer), change approach, back off. Combat has three lanes: attack (weapon die), gambit (sacrifice die), stakes roll (everything else).

### Guard & Push
Guard = 2 + highest stat (cap 10). Recovers in genuine safety. Push = 4 boxes (+1d, -2 dmg, act while Critical, device gambit). Crack when empty.

### Damage Pipeline
Damage → Armor → Guard → overflow = Harm. Guard hits 0 = Scar (+1 max Guard, once/session).

### Harm
L1 Hurt (Snag when relevant), L2 Wounded (Snag all), L3 Critical (Push to act). Overflow: 1-2 = L1, 3-4 = L2, 5+ = L3.

### Conditions (PCs)
Stunned = can't act, 0d defense. Shaken = Snag all, clears end of scene. Prone = stand costs Move.

### Enemies
GM never rolls. Static profiles: Threat (defense Snags 0-3), Damage (flat), Guard (buffer), Harm Threshold (damage past Guard to drop), Armor, Morale. Guard breaks = Staggered (Morale check). Harm fills = out.

### Positioning
Close (melee), Near (room), Far (field). Move = one band. Cover: partial +1, full +2 Armor (ranged only). Flanking = Boon. Setup phase = stat roll before round 1 (6 = Boon, 1-3 = complication, Gambits apply). Skipped on ambush.

### Attacking
Auto-hit. Roll weapon die (+ Boon d6s). Sacrifice 4+ for Gambits. Highest remaining = damage.

### Defense
Roll [stat]d6. 6 = none, 4-5 = half, 1-3 = full damage. Threat imposes Snags (0 to -3d).

### Gambits
Sacrifice die 4+ for effect on any roll. Fail (1-3) = one free Gambit, no die cost. Tier drop = GM scales scope to match cost. Strong = 6. Strong Gambits go through resistance. Categories: Maneuver, Assess, Influence, Fight.

### Weapons
d4 improvised, d6 light, d8 standard, d10 heavy, d12 devastating. Properties: Ranged, Sidearm, Thrown, Long, Loud, Brutal, Subtle, Slow.
