# MONDAS Core Rules Engine v0.2

## In Two Minutes

You have three stats: **Grit** (body), **Sharp** (senses), **Nerve** (will). Each rated 1-4.

When you do something risky, roll d6s equal to your stat. Read the highest die: **6** you do it, **4-5** you do it with a cost, **1-3** things go sideways. Before you roll, the GM tells you what's at stake. After you roll, you can sacrifice dice showing 4+ for guaranteed side effects called **Gambits**: trip someone, pocket a key, read a person's intent. Even when you fail, you get one free. The GM sets the stakes. Gambits are where you negotiate for more.

**Guard** keeps you on your feet. **Push** fuels willpower and devices. When either empties, something breaks.

---

## The Roll

When the outcome is uncertain and the stakes matter, a player rolls.

**Roll d6s equal to the relevant stat. Read the single highest die.**

| Highest Die | Result |
|-|-|
| **6** | Full success. No strings. |
| **4-5** | Partial success. Cost, complication, or reduced effect. |
| **1-3** | Consequence. The GM makes a move. |
| **Two or more 6s** | Critical. Full success, plus a bonus effect. In combat: free tactical side effect on attacks, or a Boon on defense. Details in Attacking and Defense. |

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

Boons and Snags cancel 1-for-1. Only the net result applies. Maximum pool: **5d** (stat 4 + Boon). Minimum: **0d** (roll 2d6 take lowest).

**On attack rolls:** Boons and Snags modify the weapon dice pool instead of the stat pool. The Attacking section covers how.

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

### Stakes in Combat

Standard attacks don't negotiate stakes. You roll weapon dice and deal damage directly (the Attacking section covers this).

But non-attack actions in a fight follow two paths:

**Trivial:** Kick a table over, shout a warning, draw a weapon. Just do it. No roll.

**Risky:** Climb a fire escape under fire, sprint across an open lot, hack a terminal while alarms blare. The GM states what goes wrong on failure. Roll the appropriate stat. You can spend Push for +1d (see Guard & Push). The raise/safe negotiation doesn't apply in combat. The GM sets terms once, you roll or change approach.

If a risky action creates an advantage, the GM tells you what: a Boon on your next action, or a tactical side effect on your next attack.

> **Example (borderline):** Brian wants to grab a fire extinguisher off the wall and spray it at a DPA agent during a fight. Is this an attack? No, it deals no damage. It's a risky action: Sharp roll to grab it under fire, and if he succeeds, the spray breaks line of sight (the GM treats it like the Obscure effect). He's using his Act for a tactical move, not an attack. If he wanted to swing the extinguisher as a weapon AND blind someone, that's an attack with a Gambit sacrifice.

**If you're attacking AND want a tactical effect, that's a Gambit.** Sacrifice a die from your attack roll (explained in the Gambits section). If you're skipping your attack entirely, use the risky action path above.

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

**Starting Guard = 2 + your highest stat** (starting range 3-6). A tough character (Grit 3) has Guard 5 because they absorb hits. A quick character (Sharp 3) has Guard 5 because they dodge. A composed character (Nerve 3) has Guard 5 because they read threats early. Guard can grow past 6 through Scars (see Taking Damage), up to a **maximum of 10**.

Guard is **not HP.** When Guard drops, you haven't been hurt. You've been pushed, rattled, forced into worse positions. The first real injury comes when Guard breaks.

**Recovery:** Guard refreshes when genuine safety occurs. If the characters would feel safe enough to sit down and breathe, Guard refreshes. Routine scenes (shopping, travel, safe conversation) always refresh. A tense social scene where violence is possible does not. Continuous threats (combat follows a negotiation, chase follows a break-in) do not refresh between them.

### Push

When the dice aren't enough, you dig deep.

**Push track: 4 boxes.** Spend 1 Push to:
- **Add +1d** to any roll (before rolling). One Push per roll.
- **Reduce incoming damage by 2** (after a defense roll).
- **Act despite a Critical injury** (when you'd normally be incapacitated).
- **Activate a device gambit**: use a thaumatech device for something dice can't produce. A deadfield rod kills all thaumatech in the room (every contact plate goes dark). A BTC scanner locks onto a shaper's thaumic signature so your team can track them through walls. A ward projector throws a barrier across a doorway that nothing crosses until it burns out. These aren't rolls. They just work. The GM sets the Push cost based on how hard you're pushing the device. See `rules/THAUMATECH.md`.

Device gambits are separate activations and can cost multiple Push. You can Push a roll (+1d) and activate a device gambit in the same turn, but both draw from the same 4-box track.

Four boxes go fast. Spending Push for +1d on an attack means you can't spend it to reduce damage later. Every Push is a bet: invest now or save it for when things get worse. And things always get worse. When in doubt: save Push for defense. A -2 damage reduction when you're about to Scar is worth more than +1d on an attack you might already land.

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

### The Split

Guard absorbs enemy attacks and innate shaping drain. Push fuels voluntary effort and device gambits. Two tracks, clear domains. Neither replaces the other.

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

**Staggered.** Enemies only. Guard broke. The enemy takes a **Snag on all actions** and the GM checks Morale (see Enemies). They stumble, panic, expose a vulnerability. Signals the fight is turning.

---

## Combat: Turns & Positioning

### Out of Combat

No turn order. Players act when it makes sense. The GM calls for rolls when risk arises.

### In Combat

**Round structure:**
1. **Players act** in any order they choose. Each player gets one turn.
2. **GM responds.** Enemies act, the environment shifts, countdown clocks tick (see Clocks).
3. Repeat.

**On your turn:**
- **Move** one range band (Close ↔ Near ↔ Far), or reposition at the same range (behind cover, toward a different target)
- **Act:** attack, use an ability, interact with the environment, help an ally

Move and Act happen in either order.

**Assisting:** Instead of Acting, describe how you help another player's roll. They get a **Boon**. You must be positioned to help.

> **Example Round:** Three PCs face two DPA agents in a warehouse. **Max** (Sharp 3, Near) shoots Agent A with a pistol (1d6): rolls 5, keeps it for damage. 5 minus Armor 1 = 4 to Guard. **Brian** (Grit 3, Close to Agent B) swings a wrench (1d8): rolls 6. 6 damage, minus Armor 1 = 5 to Guard. Agent B's Guard was 5, hits 0: Agent B is **Staggered**. **Oliver** assists Max, giving him a Boon for his next roll. **GM responds:** Agent A fires at Max (Damage 4). Max rolls Sharp defense (3d): gets a 5 (partial), takes half damage = 2. Agent B, Staggered, stumbles back and calls for backup. The countdown clock ticks from 3 to 4 out of 6. Reinforcements are getting closer.

### No Initiative

Players coordinate freely. The fiction determines who acts when.

**Surprise:** If enemies catch players off guard, the GM acts first. Players roll Sharp to act in the first round (failure = freeze, out of position, drop something).

**Fast enemies:** The GM may interrupt between player turns if an enemy is narratively faster. Judgment call, not a mechanic.

### Positioning

Three abstract ranges describing relationships between people, not positions on a grid.

| Range | What It Means |
|-|-|
| **Close** | Arms' reach. Melee, grappling, whispered threats. |
| **Near** | Across a room. Pistol range, thrown objects, a shouted warning. |
| **Far** | Across a parking lot. Rifle range, rooftop to street. |

Move shifts one range band. Lateral repositioning (behind cover, toward a different target) works when the fiction supports it.

**Disengaging:** Moving away from an enemy at Close costs your Move. If the enemy hasn't acted yet this round, the GM may have them respond: pursue, attack, or grab. If they already acted, you leave clean. Several Gambits and Edges let you disengage without provoking.

Ranges are always relative. You can be Close to one enemy and Far from another. The GM describes the space, players describe movement, ranges follow.

### Cover

**Partial cover** (low wall, car hood, doorframe): **+1 Armor** against ranged attacks.

**Full cover** (solid wall, heavy barricade, around a corner): **+2 Armor** against ranged attacks. Can't be targeted unless the attacker repositions or the cover is destroyed.

Cover does not help against Close-range attacks. Powerful attacks can destroy cover (see Strong Gambits under Gambits).

### Flanking

Two allies at Close range with the same enemy from different angles: both get a **Boon** on attacks. The GM judges "different angles" from the fiction. Breaks when the target Repositions or Moves away.

### Ambush

Attack from concealment. Roll Sharp to set up (before combat). On 6: Boon on opening attack. On 4-5: attack normally. On 1-3: spotted, combat starts on their terms. Ambushing characters act first. Target gets no defense roll against the first attack.

### Retreat

Spend your Move, leave. Enemies may pursue.

### De-escalation

Spend your Act, roll Nerve. On 6: one enemy stops fighting. On 4-5: they hesitate, lose next action. On 1-3: they ignore you, next attack targets you specifically. Only works on enemies with Morale. You must be visible and audible.

---

## Attacking

Attacks auto-hit. No roll to see *if* you connect. The question is *how well* and *what else* you accomplish.

### Attack Procedure

1. Roll all your weapon dice, plus any Boon dice (see below)
2. **Choose:** keep dice for damage, or sacrifice dice showing 4+ for Gambits (tactical side effects: shove, trip, disarm, create cover. Full list in the Gambits section)
3. Highest remaining die = damage dealt
4. Subtract target's Armor
5. Apply remainder to target's Guard, overflow to Harm

You always deal at least the highest die you kept. Sacrifice all dice = 0 damage but pure tactical effects.

**Attack criticals (two or more 6s):** Full damage from your highest die, plus one **free Strong Gambit**. No die sacrifice needed. It lands at full effect regardless of the target's Threat level. This is the attack-roll reward for rolling exceptionally well.

> **Example:** Brian swings a heavy wrench (2d6) at a DPA agent pinning Max to the ground. He rolls 5 and 4. He could keep the 5 for damage. Instead he sacrifices both: the 5 for a Shove (knock the agent off Max) and the 4 for a Trip (agent goes prone). Zero damage, but Max is free and the agent is on the ground. Sometimes the board state matters more than the hit.

### Boons & Snags on Attacks

A **Boon** on an attack adds **+1d6** to the weapon pool (always d6, regardless of weapon type). Push also adds +1d6. Multiple Boons each add a d6.

A **Snag** on an attack replaces your entire weapon pool with **1d4**. You still auto-hit, but damage drops to improvised level and you lose all Gambit access. A Boon cancels a Snag (back to base weapon). Multiple Snags don't stack: it's already 1d4.

Boons matter most for light weapons. A knife (1d6) with a Boon becomes 2d6: same pool as a heavy weapon, with more Gambit fuel. That's the light weapon path: setup, positioning, flanking, then strike with options. Heavy weapons start with a bigger pool but gain less per Boon. Every Boon is another d6 in the pool, another option on the table.

### Weapon Dice

| Category | Dice | Examples |
|-|-|-|
| Unarmed / Improvised | 1d4 | Fists, bottle, chair leg |
| Light | 1d6 | Knife, baton, small pistol |
| Standard | 1d8 | Sword, shotgun, rifle |
| Heavy | 2d6 | Two-handed weapon, high-caliber |
| Devastating | 2d8 | Vehicle ram, explosion, major thaumic discharge |

### Weapon Properties

Tags that change how a weapon interacts with positioning and combat.

| Property | Effect |
|-|-|
| **Ranged** | Attacks at Near and Far. Snag at Close. |
| **Sidearm** | Attacks at Close and Near. Snag at Far. Pistols, shotguns, compact weapons. |
| **Thrown** | Can attack at Near. Weapon lost unless recovered. |
| **Long** | Attacks at Close and Near. Boon at Near vs Close-only attacker (reach). |
| **Loud** | Heard at Far. Ticks attention/heat clocks. |
| **Brutal** | On a critical (two+ 6s in your pool): damage = sum of the two 6s (12), not just the single highest (6). Only matters with 2+ dice in your pool. |
| **Subtle** | Concealable. Drawing doesn't raise alarms. |
| **Slow** | Cannot attack and Move in the same turn. |

Properties stack. A hunting rifle is Ranged, Loud, Slow. A switchblade is Subtle. A grenade is Thrown, Loud, Brutal. Full weapon catalog in `rules/EQUIPMENT.md`.

### Dual Wielding

**Light weapons only.** Roll dice from both weapons simultaneously. Allocate all dice freely between damage and Gambits. Two knives (1d6 + 1d6) gives you a 2d6 pool, the same size as a heavy weapon, but capped at 6 max damage.

**Cost: Snag on all defense rolls** until your next turn. You're committed to aggression over self-preservation.

Works with any combination of light or sidearm weapons: two knives, two pistols, knife and pistol. Each weapon keeps its properties.

### Consumables

Single-use items with the Thrown property. Use your Act, spend the item. Thrown range is Near. Using explosives at Close range catches you in the blast (GM sets consequence).

**Environmental effect (no targets):** Just works. Smoke breaks line of sight, caltrops cover ground. No roll.

**Damage to an area:** Roll once. Same damage to everyone in the blast.

**Condition without damage:** Forces a save. Enemies roll the named stat against the same result table players use (6 = resist, 4-5 = partial, 1-3 = full effect). The GM rolls for the enemy.

| Item | Dice | Properties | Resolution |
|-|-|-|-|
| Flashbang | — | Thrown, Loud | Sharp save or Snag on next action |
| Smoke grenade | — | Thrown | Breaks line of sight at Near. Lasts until end of next round. |
| Molotov | 1d6 | Thrown, Loud | Damage to all at Near + area alight |
| Frag grenade | 1d8 | Thrown, Loud, Brutal | Damage to all at Close of impact |
| Concussion charge | — | Thrown, Loud | Nerve save or lose next Act |

Some gear unlocks Gambit effects (Flash, Obscure, Restrain). Two ways to use them: sacrifice a die 4+ during an attack to trigger the effect alongside your damage, or skip your attack and use the item as your Act (no roll needed, item consumed). Full gear catalog in `rules/EQUIPMENT.md`, full Gambit catalog in `rules/GAMBITS.md`.

---

## Defense

When an enemy attacks on the GM's turn, the targeted player rolls to respond.

**Choose your stat based on your response:**
- Dodging, ducking, reflexes: **Sharp**
- Taking the hit, powering through: **Grit**
- Holding steady, seeing it coming, being in the right place: **Nerve** (thaumic effects, intimidation, standing your ground when instinct says run)

The fiction determines the stat. If multiple stats could apply, the player picks one and describes how. The GM judges whether the description fits. No tiebreaker formula: if "I dodge" is Sharp and "I tank it" is Grit, the player's narration decides.

> **Example (physical):** An enforcer swings a pipe at you. You could dodge (Sharp 3, rolling 3d) or brace and absorb it (Grit 1, rolling 1d). Sharp 3 means you're likely taking no damage. Grit 1 means you're probably eating the full hit. The stat choice IS the defense.
>
> **Example (thaumic):** A shaper hits you with a wave of raw fear. You can't dodge fear. You resist with Nerve (composure, willpower). If you have Nerve 1, that's 1d against a Threat 2 shaper: you're rolling at 0d after Snags. But a Grit specialist has options too: break line of sight, tackle the shaper before the effect lands. A Sharp specialist might read the Tell and act first. Every stat spread has different answers, not no answers.

**Enemy Threat** imposes Snags on your defense roll:

| Threat | Snag | Examples |
|-|-|-|
| 0 (Mook) | None | Untrained, panicked |
| 1 (Tough) | -1d | Trained, equipped |
| 2 (Dangerous) | -2d | Elite, tactical, enhanced |
| 3 (Lethal) | -3d | Apex predator, war machine, major entity |

**Result:**

| Roll | Damage Taken |
|-|-|
| **6** | None. Clean dodge, clean block. |
| **Critical (two+ 6s)** | None, and you gain a Boon on your next action. |
| **4-5** | Half the enemy's damage (round up). |
| **1-3** | Full damage. |

Then apply Armor, Guard, Harm as normal.

**Multiple attackers:** Roll defense separately against each. If identical mooks attack together, the GM may combine them: one defense roll, total their damage on a consequence. Three Threat 0 mooks dealing 2 each = one defense roll against 6 combined damage.

Your defense roll IS your reaction. There is no separate React action.

---

## Gambits

The GM sets the stakes. You roll. Then you look at your dice and decide: is the result enough, or do I want more?

Gambits are the player's leverage. After rolling, any die showing **4+** can be sacrificed for a guaranteed side effect from the Gambit list. The GM doesn't set the terms on this part. You see what you rolled, you pick a Gambit, and it happens. It's the one moment in the system where the player negotiates: "I'll give up this die if I also get this."

**The fiction filter.** A Gambit has to follow from what you're doing, how you're doing it, and where you are. You can't Trip someone with a rifle across a parking lot. You can Shove them (suppressive fire forces them back through a doorway). The GM vetoes anything that doesn't make sense with your weapon, position, and approach.

### Why Gambits Are Worth It

**In combat,** spare dice below your highest are free fuel. They weren't contributing to damage anyway. Spend them on side effects at no cost. The hard choice only comes when you spend your best die: board control vs. damage.

**On a basic roll,** Gambits work three ways:

**Free pickup.** Dice below your highest weren't helping your result. Spend them for a side effect that the situation makes possible. You were already succeeding. Now you succeed and grab something extra.

**Softening the blow.** You roll 4-5, the GM names the cost, and you spend a spare die to dodge the worst part. Escape the grab. Stall the alarm. The partial still lands, but you edited the consequences.

**The bargain.** This is the big one. You look at your dice and realize: what if I let this go sideways? The GM already told you what failure looks like. Sometimes failure changes the scene in ways success never would. Security gets called. A fight breaks out. People start running. And in that chaos, there's an opening. You sacrifice a die, accept the worse result, and grab something from the wreckage. You got arrested, but you palmed the evidence into his pocket on the way out. You lost the negotiation, but you clocked every exit and face in the room. That's not a failed roll. That's a heist.

**When a sacrifice drops your result a full tier, the GM should match the Gambit's scope to the cost.** Same Gambit name, wider reach. A Gather that costs nothing learns one detail. A Gather that cost you the whole roll learns the full picture.

### Fail Gambit

When your final result is 1-3, whether you chose it or rolled it, you get one free Gambit. No die cost. The fiction of the failure creates one opening you grab on the way down. The fiction filter still applies: the situation has to make it possible.

This keeps every roll alive. A character with 1d6 who rolls a 2 didn't just fail. They failed and noticed something, pocketed something, set something up. The scene gave them a window. They took it.

### The Mechanics

Sacrifice a die showing **4+** for a Gambit. This works on **any roll**, combat or otherwise. You see the dice first, then decide. One Gambit per die sacrificed. Multiple dice, multiple Gambits. No duplicates per roll.

In combat, you trade damage for effect. On any other roll, you trade outcome quality for effect.

> **Example 1 (the free ride):** Brian swings a heavy wrench (2d6) at a DPA agent pinning Max to the ground. Rolls 6 and 4. The 6 is damage. The 4 was doing nothing for him anyway, so he spends it on Trip: the wrench connects and Brian kicks the agent's legs out from under him. 6 damage AND prone. The Trip cost him zero damage because the 4 was below his highest die.
>
> **Example 2 (the hard trade):** Murph stabs a guard with a knife (1d6). Rolls a 5. He wants Pin: hold the guard in place so Max can get past. But the 5 is his only die. If he spends it, he deals 0 damage. If he keeps it, 5 damage but the guard stays mobile. Murph spends it. Sometimes board state matters more than the hit.
>
> **Example 3 (softening the blow):** Max is sprinting across an open hallway. Grit 2, rolls 5 and 4. Partial success: he makes it across, but the GM says "the guard at the far end grabs you as you come through." Max spends the 4 on Escape. "I duck under his arm and keep moving." The grab doesn't land. He still took the partial (he's across but the guard saw him, he's not hidden), but the worst part of the cost is gone.
>
> **Example 4 (the bargain):** Oliver is fast-talking a receptionist to let them into a restricted floor. Nerve 3, rolls 5, 3, 3. Partial success: she's not buying it, but she hasn't called security yet. Then Oliver spots the keycard on her desk. He sacrifices the 5 for Conceal: "While she's lecturing me about clearance protocols, I palm the keycard." His highest die drops to 3. Full failure. She calls security. But Oliver has the keycard. He chose that trade: the conversation was a bust, but he walks away with access to the floor.
>
> **Example 5 (the fail Gambit):** Brian tries to hold a door shut against a DPA agent (Grit 1, rolls 3). The door bursts open. Brian's on the floor. But: free Fail Gambit. "As the guy barrels through, I clock his face. I've seen him before. Gather: where do I know him from?" The GM answers: "He was at the professor's office last Tuesday. He's not regular DPA." Brian lost the door. He gained a thread.

### Gambit Sources

Your available Gambits come from three places that stack:

1. **Base list** (below). Available to everyone, every roll. 15 Gambits across four categories.
2. **Weapon Gambits** (1 per weapon, listed in `rules/EQUIPMENT.md`).
3. **Property-category Gambits** (from `rules/GAMBITS.md`). Any Melee weapon gets all Melee Gambits, any Ranged weapon gets all Ranged Gambits, etc.

If the same Gambit name appears in multiple sources, you have it once, not twice.

### Strong Gambits

Require a die showing **6**. Any weapon d6 or larger can access them, but you're spending your best die. Strong Gambits:
- Work against **any Threat level**
- Produce **greater effect:** destroy cover, break a weapon, hurl someone across the room, punch through a wall

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

### Gambit Potency

Your stat shapes how Gambits land. The description determines the stat, the stat determines potency.

- **Grit** breaks and overwhelms. You don't shove, you drive them into the wall.
- **Sharp** redirects and finds gaps. You don't disarm, you cut the strap.
- **Nerve** pressures and holds. You don't pin, you press the blade where they feel it and hold eye contact.

| Stat | Potency |
|-|-|
| **1** | Reduced. The Shove is a stumble. The Pin is a moment. |
| **2** | Standard. Works as written. |
| **3+** | Enhanced. Ignore one level of Threat resistance. |

**Strong + Enhanced:** Full effect AND an additional fictional consequence. The disarm leaves them exposed. The shove knocks them prone. The GM names the extra from the fiction.

Potency applies to **Fight Gambits only**. Other categories land based on the fiction.

### Gambit Resistance

How well targets absorb Gambits depends on Threat level.

| Threat | Standard (4+) | Strong (6) |
|-|-|-|
| 0 (Mook) | Full effect | Full effect + bonus |
| 1 (Tough) | Full effect | Full effect |
| 2 (Dangerous) | Reduced (brief, partial) | Full effect |
| 3 (Lethal) | No effect unless fiction justifies | Full effect |

> **Example:** Bex (Grit 3) attacks a CSS Operator (Threat 2) with a shotgun, rolls 6 and 4. Keeps 6 for damage, spends 4 on Shove. Standard Gambit (4+) against Threat 2 normally lands at reduced effect: a stumble, not a real shove. But Enhanced potency (Grit 3) ignores one Threat level. The Operator resists as Threat 1 instead: full effect. He goes flying.
>
> If Asa (Grit 1) tried the same Shove: Reduced potency against Threat 2. It barely registers.

### Gear Gambits

Specific equipment unlocks Gambits beyond the base list. Sacrifice a die 4+ during your attack to get the gear effect alongside damage, or use the item as your Act without attacking. Either way, the item is consumed or needs recovery after use.

During a gear-up scene, players choose loadout. If the enemy relies on sight, bring flashbangs. If you expect a chase, bring caltrops. Preparation matters, and you can't carry everything. Full gear catalog in `rules/EQUIPMENT.md`, full Gambit catalog in `rules/GAMBITS.md`.

### Thaumatech Device Gambits

Different from gear gambits. Device gambits cost **Push** (not a sacrificed die), auto-succeed, and do things dice can't. See `rules/THAUMATECH.md` for device gambit and device risk rules.

---

## Enemies

The GM doesn't roll dice. Enemies have static profiles:

- **Threat** (0-3): Snags on player defense rolls
- **Damage** (2-10): Flat damage dealt
- **Guard** (0-8): Buffer against player attacks
- **Armor** (0-3): Flat damage reduction
- **Morale** (yes/no): Can they be de-escalated or broken?
- **Behavior:** Priority list for GM decisions

When an enemy's Guard breaks, they're **Staggered**. When they take enough Harm, they're out: dead, fled, surrendered, or incapacitated.

### Morale

When an enemy is Staggered, Wounded (Harm 2+), or half their group is down, the GM checks their Behavior line. This is a judgment call, not a roll. Most enemies break: flee, surrender, negotiate. Only fanatics, cornered animals, and entities fight to the death. When in doubt, they run.

### Behavior

A priority list that tells the GM what an enemy does. Reduces cognitive load.

> *"Enforcer: Close distance, target isolated PC, fall back if Wounded."*

### Example Stat Blocks

**Street Tough**
Threat 0 | Damage 3 | Guard 2 | Armor 0 | Morale: yes
*Knife (1d6, Subtle) or bat (1d6)*
Behavior: Threaten first. Flee if Hurt. Won't fight alone.

**DPA Field Agent**
Threat 1 | Damage 4 | Guard 5 | Armor 1 | Morale: yes
*Service pistol (1d6, Sidearm, Loud), thaumatech scanner*
Behavior: Contain and call backup. Withdraw if outgunned. Never engages a confirmed shaper alone.

**CSS Kill-Team Operator**
Threat 2 | Damage 6 | Guard 6 | Armor 2 | Morale: yes (on signal)
*Assault rifle (1d8, Ranged, Loud, Brutal), combat knife (1d6, Subtle)*
Behavior: Eliminate primary target. Suppress others. Retreat on signal only.

**Unbound Thaumic Entity**
Threat 3 | Damage 8 | Guard 8 | Armor 0 | Morale: no
*Thaumic discharge (2d8, ignores mundane Armor)*
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
Roll [stat]d6, read highest. 6 = full, 4-5 = partial, 1-3 = consequence. Crit (two 6s) = full + free Strong Gambit.

### Stats
Grit (body), Sharp (senses), Nerve (will). Rated 1-4. Sum = 6.

### Modifiers
Boon = +1d. Snag = -1d. Cancel 1-for-1. Max 5d, min 0d (2d6 take lowest). On attacks: Boon/Push = +1d6, Snag = replace pool with 1d4 (Boon cancels).

### Stakes
GM declares consequences. Raise (+1d, worse stakes), play safe (-1d, softer), change approach, back off. Combat: trivial actions just happen, risky ones get a stat roll.

### Guard & Push
Guard = 2 + highest stat (cap 10). Recovers in genuine safety. Push = 4 boxes (+1d, -2 dmg, act while Critical, device gambit). Crack when empty.

### Damage Pipeline
Damage → Armor → Guard → overflow = Harm. Guard hits 0 = Scar (+1 max Guard, once/session).

### Harm
L1 Hurt (Snag when relevant), L2 Wounded (Snag all), L3 Critical (Push to act). Overflow: 1-2 = L1, 3-4 = L2, 5+ = L3.

### Conditions
Stunned = can't act, 0d defense. Shaken = Snag all, clears end of scene. Prone = stand costs Move. Staggered = enemies only, Guard broke, Snag all + Morale check.

### Positioning
Close (melee), Near (room), Far (field). Move = one band. Cover: partial +1, full +2 Armor (ranged only). Flanking = Boon. Ambush = Sharp roll for Boon on opener.

### Attacking
Auto-hit. Roll weapon dice. Sacrifice 4+ for Gambits. Highest remaining = damage. Dual wield: light weapons only, both dice, Snag on defense.

### Defense
Roll [stat]d6. 6 = none, 4-5 = half, 1-3 = full damage. Threat imposes Snags (0 to -3d).

### Gambits
Sacrifice die 4+ for effect on any roll. Fail (1-3) = one free Gambit, no die cost. Tier drop = GM scales scope to match cost. Strong = 6 (d6+ weapons). Categories: Maneuver, Assess, Influence, Fight. Potency (Fight only): stat 1 reduced, 2 standard, 3+ ignore one Threat level.

### Weapons
1d4 improvised, 1d6 light, 1d8 standard, 2d6 heavy, 2d8 devastating. Properties: Ranged, Sidearm, Thrown, Long, Loud, Brutal, Subtle, Slow.
