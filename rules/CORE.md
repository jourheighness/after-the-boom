# MONDAS Core Rules Engine v0.2

## In Two Minutes

You have three stats: **Grit** (body), **Sharp** (senses), **Nerve** (will). Each rated 1-4.

When you do something risky, roll d6s equal to your stat. Read the highest die.
- **6:** You do it.
- **4-5:** You do it, but there's a cost.
- **1-3:** Things go sideways. The GM tells you how.

Before you roll, the GM tells you what's at stake. You can raise the stakes (accept worse stakes for +1d) or play it safe (accept a Snag for softer stakes). Boons and Snags modify any roll, whether you're picking a lock, talking down a guard, or swinging a wrench at someone's head. They always work the same way: +1d or -1d, cancel each other out.

On any roll, you can sacrifice dice before reading your result to buy side effects — called **Gambits**. Shove someone, create a distraction, pocket a key while you're picking the lock. You give up the die to get the effect. Fewer dice means worse odds on the main roll, so it's always a trade.

In a fight, the core roll changes. Attacks auto-hit, so you roll your weapon's dice instead of a stat. Keep your highest die for damage, sacrifice the rest for Gambits. When an enemy comes at you, you roll your stat to mitigate. Everything happens at three ranges: Close, Near, Far.

**Guard** keeps you on your feet. When it breaks, real injuries start. A few bad hits and you're done.

---

## The Roll

When the outcome is uncertain and the stakes matter, a player rolls.

**Roll d6s equal to the relevant stat. Read the single highest die.** Before reading your result, you may sacrifice one or more dice to pay for **Gambits** — tactical side effects like pocketing a key, creating a distraction, or slamming a door shut behind you. Each sacrificed die buys one Gambit. Fewer dice means worse odds on the main roll.

| Highest Die | Result | What Happens |
|-|-|-|
| **6** | Full success | You get what you want. No strings. |
| **4-5** | Partial success | You get it, but with a cost, complication, or reduced effect. |
| **1-3** | Consequence | You don't get it, or you get it at a serious price. The GM makes a move. |
| **Two or more 6s** | Critical | Full success, plus one free Strong-tier Gambit. Choose any Gambit available to you. It lands at full effect regardless of the target's Threat level. No die cost. This is the stat-roll equivalent of a weapon die showing 8+: the exceptional threshold that punches through resistance. |

**Zero dice:** When Snags reduce your pool below 1, roll 2d6 and take the **lowest**. Criticals are impossible at 0d.

The GM never calls for a roll when there's no risk. If it's safe, you just do it. If it's impossible, no roll helps.

### Saves

When an effect forces you to resist, roll the specified stat. "Grit save" means roll Grit. "Nerve save" means roll Nerve. Read the highest die on the same table: 6 = you resist fully, 4-5 = partial (reduced effect), 1-3 = the full effect hits you.

The triggering effect defines the consequences, not the GM. If a Gambit says "target makes a Nerve save or is stunned for 1 round," the consequence is built in. On a partial (4-5), the effect lands at reduced intensity: stunned for one action instead of a full round, forced movement goes half distance, a Snag lasts one action instead of a turn.

Saves use the same Boon and Snag rules as any other roll. Threat level does not impose Snags on saves (Threat affects defense rolls, not saves).

When a partial save result feels ambiguous, default to: the effect lasts one action instead of a full round, or the target resists but is momentarily distracted (Snag on their very next roll).

---

## Stats

**Grit:** Strength, toughness, endurance, physical presence. Kicking down a door, taking a punch, hauling someone to safety, holding a line through sheer force.

**Sharp:** Awareness, reflexes, precision, instinct. Spotting danger, dodging a swing, threading a needle, reading a room, picking a lock, fast hands.

**Nerve:** Willpower, composure, influence, courage. Keeping your cool under pressure, lying convincingly, talking down a volatile situation, resisting a thaumic intrusion, holding your ground when everything says run.

Each stat is rated **1-4**.
- **1:** Weak. You're rolling one die and praying.
- **2:** Average. Most people, most stats. Partial success is your life.
- **3:** Strong. You're good at this. Misses are rare.
- **4:** Exceptional. The best in the room. You still fail sometimes.

Starting characters distribute **6 points** across three stats (minimum 1 each). Common spreads: 3/2/1 (specialist), 2/2/2 (generalist).

### Edges

**Edges** are the things that make your character yours. Special training, innate talents, connections, knacks. Each Edge gives a specific mechanical benefit: a Boon in certain situations, a new Gambit option, access to thaumic abilities, or a narrative capability. Characters start with **3 Edges** (positives) or **4 Edges** (zeroes, who compensate for lack of thaumic access with broader training). Edges are gained through play, roughly 1 every 2-3 sessions. See `rules/CHARACTER.md` for creation details and the Edge allocation table. The full Edge catalog is in WS5.

### Which Stat?

The player describes what they do. The description determines the stat.

"I shove past him" → Grit. "I slip past when he looks away" → Sharp. "I talk my way through" → Nerve.

Different approaches to the same problem use different stats, which means different odds. You get to roll your best stat if you think about how to approach the problem. The approach must make sense in the situation, and the GM judges stakes based on how well it fits.

---

## Boons & Snags

Modifiers that add or remove dice from the pool.

**Boon (+1d):** Something works in your favor. Training, good gear, environmental advantage, ally assistance, clever approach.

**Snag (−1d):** Something works against you. Injury, poor positioning, enemy capability, bad conditions, improvised tools.

Boons and Snags cancel 1-for-1. Only the net result applies. Maximum pool is **5d** (stat 4 + Boon). Minimum is **0d** (roll 2d6 take lowest).

### Sources of Boons
- **Training/Background:** You have relevant expertise for the situation.
- **Gear:** The right tool for the job. Lockpicks for a lock. A scope for a long shot.
- **Creative approach:** The player describes something that uses the environment, exploits a weakness, or leverages preparation. Max 1 Boon from creativity per roll.
- **Ally assist:** Another character helps. They describe how. This costs their Act for the turn (in combat) or exposes them to risk (out of combat).
- **Raising the stakes:** Accept worse consequences from the GM in exchange for +1d (see *Stakes*).

### Sources of Snags
- **Injury:** Active Harm conditions apply Snags when relevant (or always, for serious injuries).
- **Enemy Threat:** Powerful enemies impose Snags on your defense rolls (see *Defense*).
- **Environment:** Darkness, smoke, unstable ground, rain.
- **Improvisation:** Using the wrong tool. Attacking with a chair instead of a weapon.
- **Playing it safe:** Accept -1d to negotiate softer stakes with the GM (see *Stakes*).

---

## Stakes

Before any roll, the GM states what's at risk.

**The GM tells the player two things:**
1. **On a partial (4-5):** What complication, cost, or reduced effect comes with success?
2. **On a consequence (1-3):** What goes wrong?

The stakes must be **specific and grounded.** Not "you take damage" but "the guard draws his weapon." Not "reduced effect" but "you get through the door but it takes long enough that they hear you."

### The Negotiation

The player hears the stakes. Then they can:

- **Accept and roll.** Most of the time.
- **Raise the stakes.** "What if I go louder, kick it in instead of picking it?" The GM raises the consequence but grants a **Boon (+1d)**. More risk, better odds.
- **Play it safe.** "What if I take my time and go careful?" The GM softens the consequence but imposes a **Snag (-1d)**. Less risk, worse odds.
- **Change approach.** "Forget the door, I'm going through the window." New stakes, possibly a different stat.
- **Back off.** "Never mind. We find another way." No roll, no consequence.

No labels to memorize, no categories to assess. The GM describes what's at risk. The player decides how much risk they want.

### Stakes in Combat

Combat has its own resolution for attacks and defense (see Attacking and Defense below). The stakes model doesn't apply to standard attacks. You don't negotiate consequences before swinging a pipe wrench. You swing it and deal with what happens.

But combat isn't only attacks. When a PC wants to do something in a fight that isn't hitting someone, the GM decides:

**It's trivial.** Kick a table over, shout a warning, draw a weapon, toss your keys to an ally. Just do it. No roll. Some actions cost your Act but need no roll either. Trained Tactics (Suppressing Fire, Covering an Ally, Holding Ground) trade your attack for a guaranteed effect but require a relevant Edge. Universal Tactics (Flanking, Retreat, De-escalation) are available to everyone. See Tactics.

**It's risky.** Climb a fire escape under fire, sprint across an open lot, hack a security terminal while the alarm blares. The GM states what goes wrong on a failure. Roll the appropriate stat (same rules as any other stat roll: 6 = clean, 4-5 = partial, 1-3 = consequence). Push still works (spend a box for +1d). The push-harder and play-safe trades from the standard stakes model don't apply in combat. The GM sets terms once, you roll or change approach. If the action creates an advantage on success, the GM tells you what you gain: a Boon on your next action, or a free Gambit effect on your next attack.

**If you're attacking *and* want a tactical effect, that's a Gambit.** Sacrifice a die from your attack roll. If you're skipping your attack entirely to do something else, use the categories above.

The boundary: **trying to hurt someone? Roll weapon dice. Everything else? Roll stat dice, or just do it.**

---

## Gather Information

When a PC wants to learn something specific, the GM picks one of three paths.

### You Just Know

The answer falls inside your Background's Boon domain, or is common knowledge for someone in your position. The GM tells you. No roll. A leyline researcher knows what a logic collapse is. A longshoreman doesn't. A Knack fires the same way — if the obsession intersects with the question, the GM volunteers the information.

### You Can Find Out

The answer exists but getting it has a cost — time, exposure, or risk. The GM states stakes like any other roll.

**Which stat?** Sharp (searching, observing, connecting dots), Nerve (interrogating, persuading, reading someone), Grit (enduring something unpleasant to get the information — staking out in the cold, digging through wreckage).

| Highest Die | Result |
|-|-|
| **6** | Clear, complete answer. Ask a follow-up question. |
| **4-5** | You get the answer, but it's incomplete, it cost you something, or someone noticed you asking. |
| **1-3** | You don't get it, or you get it and the GM makes a move — wrong conclusion, exposed, tipped someone off. |

Background Boon applies if the domain is even adjacent. Knacks fire if the obsession intersects. Normal Boon/Snag rules.

### It's a Project

The answer is too big for one roll — mapping a conspiracy, tracing a supply chain, decoding a dead language. The GM starts a **clock** (4, 6, or 8 segments depending on complexity). Each attempt to gather information ticks it on success: 1 tick on a partial, 2 on a full, 3 on a critical. When the clock fills, the PC gets the full picture and can ask the GM several detailed questions about the subject.

Each attempt costs time (hours, days — GM's call) and may carry its own stakes. A partial might tick the clock *and* alert someone.

---

## Push

When the dice aren't enough, you dig deep.

Each character has a **Push track** of 4 boxes. Spend 1 Push to:
- **Add +1d** to any roll (before rolling)
- **Reduce incoming damage by 2** (after a defense roll)
- **Act despite a Critical injury** (when you'd normally be incapacitated)

One Push per roll. You can't stack them.

### Cracking

When your Push track empties, you **Crack**: take a lasting condition that reflects how the pressure broke you.
- *Reckless:* you stop caring about safety (yours or others')
- *Paranoid:* you trust no one, flinch at shadows
- *Numb:* nothing reaches you, including the people who need you
- *Volatile:* your temper is a lit fuse

A Crack is a roleplaying condition with occasional mechanical weight (GM may impose Snags when the Crack would realistically interfere). Cracks clear through significant narrative moments, not rest.

### Recovery

Push recovers during **downtime**, the time between dangerous situations. It doesn't recover on a timer. You recover Push by:
- Spending time with someone who matters to you
- Doing something that reminds you who you are
- Getting proper rest in a safe place
- Indulging a vice or habit (quick recovery, but the GM may complicate)

---

## Guard

**Guard** is your readiness: awareness, positioning, luck, the instinct that keeps you alive. It's a small number (typically 3-8) that absorbs incoming damage before it touches you.

**Starting Guard = 2 + your highest stat.** A tough character (Grit 3) has Guard 5 because they absorb hits. A quick character (Sharp 3) has Guard 5 because they dodge and reposition. A composed character (Nerve 3) has Guard 5 because they read threats before they arrive. Your Guard reflects your best survival instinct, whatever form it takes.

Guard refreshes when the danger has passed and you have a moment to collect yourself. If threats are continuous (combat follows a tense negotiation, a chase follows a break-in), Guard does not refresh between them. The GM determines when a genuine moment of safety occurs. If in doubt: if the characters would feel safe enough to sit down and breathe, Guard refreshes. Routine scenes (shopping, travel, conversation in a safe place) always refresh Guard. A tense social scene where violence is possible does not.

Guard is **not HP.** It doesn't represent health. When your Guard drops, you haven't been hurt. You've been pushed, rattled, forced into worse positions. The first real injury comes when Guard breaks.

### Taking Damage

When you take damage:
1. Subtract **Armor** (flat reduction, typically 0-3)
2. Apply the remainder to **Guard**
3. If Guard reaches **0** (whether exactly or through overflow): you're **Marked**, take a Scar (see below)
4. If damage exceeds Guard, the overflow becomes **Harm** (see below). You get the Scar AND take the overflow Harm.

---

## Harm

When damage overflows Guard, you take real injuries.

The Harm track has 3 levels, 2 slots each:

| Level | Name | Effect | Example |
|-|-|-|-|
| 1 | **Hurt** | -1d when the injury is directly relevant | Grazed arm, ringing ears, twisted ankle |
| 2 | **Wounded** | -1d on all rolls | Cracked ribs, concussion, deep laceration |
| 3 | **Critical** | Must Push to act at all | Gut shot, shattered leg, collapsed lung |

**Harm level from overflow:**

| Overflow | Harm Level |
|-|-|
| 1-2 | Level 1 (Hurt) |
| 3-4 | Level 2 (Wounded) |
| 5+ | Level 3 (Critical) |

Each Harm is **named**. The player and GM agree on what the injury is, based on the fiction. "Cracked ribs" isn't the same as "slashed forearm," even though both are Level 2. The name determines when the Hurt penalty applies (Level 1) and how recovery works.

If both slots at a level are full, new Harm at that level bumps up to the next. If both Level 3 slots are full and you take more Harm: **you're dead**, or suffer a permanent campaign-altering consequence (lost limb, permanent disability, captured). The table decides based on the fiction.

---

## Armor

Some protection reduces incoming damage before it touches Guard.

**Armor** is a flat number (0–3) subtracted from damage before it hits Guard.

- **0:** No protection.
- **1:** Light protection (padded coat, leather, minor ward).
- **2:** Moderate protection (reinforced gear, tactical vest, shielding charm).
- **3:** Heavy protection (full ballistic plate, heavy plating). Rare and conspicuous.

Armor that's heavy or conspicuous may impose Snags (Sharp penalty for bulky gear, Nerve penalty for looking like you expect a fight). Details in WS6 (Equipment).

---

## Scars

When your Guard drops to **0** from damage (whether exactly or through overflow), you're **Marked**. Something changes. A close call that leaves a permanent trace.

The player describes the Scar: a physical mark (split lip, burn scar, white-knuckle grip), a psychological one (flinch at loud noises, can't sleep with the lights off), or a material loss (weapon cracked, gear ruined, something precious broken).

**Scars are permanent but not punishing.** They're the marks of survival. Over time, they make your character *more* defined, not less capable.

**Guard Growth:** The first time you take a Scar in a session, increase your maximum Guard by 1 (to a cap of 10). Getting hurt teaches you to protect yourself. Veterans are harder to rattle because they've been rattled before.

---

## Recovery

Harm doesn't clear on a timer.

| Level | Recovery |
|-|-|
| **Hurt** (1) | Clears after the scene. A breather, a bandage, catching your breath. |
| **Wounded** (2) | Needs treatment and a stretch of downtime. A session, medical attention, a few days off. |
| **Critical** (3) | Serious intervention. Hospital, skilled healer, magical aid, long recovery arc. |

Recovery is a **scene**, not a mechanic. The fiction determines what healing looks like and how long it takes.

---

## Conditions

Some effects impose named conditions. When a condition is referenced (by a Gambit, weapon effect, or thaumic consequence), use these definitions.

**Stunned.** You can't act. No Move, no Act, no reaction. Lasts for the stated duration (usually 1 round). On your turn you do nothing. Attacks against you still trigger your defense roll, but you roll 0d (2d6, take lowest). Ends at the start of your next turn after the duration expires.

**Shaken.** Rattled, panicked, or reeling. Snag on all rolls until the condition clears. Shaken is imposed by certain Psychological Gambits and thaumic effects. It clears at the end of the scene, or earlier through an ally's help (Presence Anchor Gambit, Adrenaline Shot, or any comparable intervention the GM accepts).

**Prone.** On the ground. Standing up costs your Move for the turn. Melee attacks against you get a Boon. Ranged attacks against you get a Snag. You can crawl at Close range on your turn without standing.

**Staggered.** Applies to enemies when their Guard breaks. Something changes: they stumble, panic, shift tactics, or expose a vulnerability. The GM describes the shift based on the fiction and the enemy's Behavior line. Staggered is not mechanical for players. It signals that the enemy is now fighting hurt, and the fight is turning.

---

## Turns

### Out of Combat

No turn order. Players act when it makes sense. The GM calls for rolls when risk arises. Time flows naturally.

### In Combat

**Round structure:**
1. **Players act** in any order they choose. Each player gets one turn.
2. **GM responds.** Enemies act, the environment shifts, Danger Clocks tick.
3. Repeat.

**On your turn, you can:**
- **Move** one range band closer or farther from a target, or reposition at the same range (behind cover, toward a different target, out of a doorway)
- **Act:** attack, use an ability, interact with the environment, help an ally

Move and Act happen in either order.

**Assisting:** Instead of Acting, you can assist another player's attack or roll: describe how you help, and they get a **Boon**. You must be positioned to help.

### No Initiative

Players discuss and coordinate freely. There is no initiative roll. The fiction determines who acts when.

**Surprise:** If enemies catch the players off guard, the GM acts first. Players must roll Sharp to act in the first round (consequence on failure = you freeze, you're out of position, you drop something).

**Fast enemies:** The GM may interrupt between player turns if an enemy is narratively faster or more dangerous. This is a judgment call, not a mechanic.

---

## Positioning

Combat uses three abstract ranges. These describe relationships between people, not positions on a grid. The GM states who is Close, Near, or Far when a fight starts. Everything else follows from the fiction.

| Range | What It Means |
|-|-|
| **Close** | Arms' reach. Melee, grappling, whispered threats. |
| **Near** | Across a room. Pistol range, thrown objects, a shouted warning. |
| **Far** | Across a parking lot. Rifle range, rooftop to street, out of easy reach. |

Movement shifts you one range band per Move: Close to Near, Near to Far, or the reverse. You can also reposition laterally at the same range (behind cover, toward a different target, out of a doorway) when the fiction supports it.

**Disengaging:** Moving away from an enemy at Close costs your Move. If the enemy hasn't acted yet this round, the GM may have them respond: pursue, attack, or grab. If the enemy already acted, you leave clean. Several Gambits and Edges let you disengage without provoking this response.

Ranges are always relative. You can be Close to one enemy and Far from another. There is no shared map to argue about. The GM describes the space, players describe their movement, and the ranges follow.

### Cover

If something solid stands between you and a ranged attacker, you have cover.

**Partial cover** (low wall, car hood, doorframe, overturned table): **+1 Armor** against ranged attacks.

**Full cover** (solid wall, heavy barricade, around a corner): **+2 Armor** against ranged attacks. You can't be targeted by ranged attacks at all unless the attacker repositions to get an angle or the cover is destroyed.

Cover does not help against Close-range attacks. If they're in your face, the wall behind you doesn't matter.

A **Strong Gambit** (8+) can destroy cover: punch through the drywall, blow the barricade apart, shatter the window someone is hiding behind. This gives heavy weapons a tactical role beyond raw damage.

### Universal Tactics

Available to everyone. No Edge required. These are instinct, not doctrine. Things any person does when a situation turns dangerous.

**Flanking.** When two allies are at Close range with the same enemy from different angles, both attackers get a **Boon** on attacks against that target. The GM judges "different angles" from the fiction, not a grid. Flanking breaks when the target Repositions (Gambit) or Moves away. You don't need to spend anything to flank. Just get two people on opposite sides of someone.

**Ambush.** Attack from concealment or surprise. Roll Sharp to set it up (before combat starts). On a 6: perfect position, Boon on your opening attack. On 4-5: you're in place, attack normally. On 1-3: they spotted you, no ambush, combat starts on their terms. When the ambush triggers, ambushing characters act first (before the GM's turn) and the target does not get a defense roll against the first attack. After the opening round, combat proceeds normally.

**Retreat.** Spend your Move, leave the situation. Enemies may pursue depending on the fiction.

**De-escalation.** Spend your Act to try to end the fight. Roll Nerve. On a 6: one enemy stops fighting (drops weapon, backs off, surrenders). On 4-5: they hesitate, lose their next action, but their allies keep going. On 1-3: they ignore you, and their next attack targets you specifically. Only works on enemies with Morale. Fanatics, machines, and entities don't listen. You must be visible and audible. This is the civilian option, the "nobody needs to die here" play, and sometimes it's the smartest move in the room.

### Trained Tactics

Require a relevant Edge. These represent doctrine and muscle memory. Not things civilians improvise under fire.

**Suppressing Fire.** Spend your Act firing at an area (Near or Far) instead of a target. No damage. Every enemy in that area who moves or acts before your next turn takes a **Snag**. Requires a Ranged or Sidearm weapon. Uses ammunition. Requires a military, law enforcement, or security Edge.

**Tactical Retreat.** Spend your Act to withdraw safely. Move **two range bands** instead of one, and enemies at Close do not get a response. You deal no damage this turn. The controlled version of Retreat. Requires a military, law enforcement, or security Edge.

**Covering an Ally.** Spend your Act to protect a specific ally you can see (Near or closer). Until your next turn, when that ally is attacked, the attacker takes a **Snag** on damage. Deliberate protective positioning. Requires a military, law enforcement, or security Edge.

**Holding Ground.** Spend your Act to brace at your current position. Until your next turn, gain **+1 Armor** and you cannot be Shoved or Tripped. Disciplined choke point defense. Requires a military, law enforcement, or security Edge.

A former CSS operator and a union organizer both know how to run. Only one knows how to run while keeping the exit covered and their team intact. Trained Tactics are not more powerful. They are more structured. The civilian toolkit is fully viable. It just looks different.

### Edges and Gambits

Edges don't just unlock Trained Tactics. Any Edge can modify how a Gambit works when the fiction supports it, changing its trigger, its effect, or its threshold.

The modification takes one of three forms:
- Change the trigger: this Gambit works in a situation it normally wouldn't
- Change the effect: this Gambit produces something different or additional
- Change the threshold: this Gambit counts as Strong against a specific target type

A war journalist De-escalates differently than a hostage negotiator. A trauma surgeon's Secure Gambit covers a downed ally mid-fight. A competitive climber's Reposition covers two bands on vertical terrain. The Edge makes the Gambit yours.

When a player proposes an Edge-Gambit interaction not in the catalog, the GM defaults to yes if it's grounded in the fiction. One clear effect, one die, same rules as any Gambit.

---

## Attacking

Attacks auto-hit. There is no roll to see *if* you connect. The question is *how well* and *what else* you accomplish.

When you attack, **roll your weapon's damage dice.**

### Weapon Dice

Every weapon has one or more damage dice:

| Category | Dice | Examples |
|-|-|-|
| Unarmed / Improvised | 1d4 | Fists, bottle, chair leg |
| Light | 1d6 | Knife, baton, small pistol |
| Medium | 1d8 | Sword, shotgun, rifle |
| Heavy | 2d6 | Two-handed weapon, high-caliber |
| Devastating | 2d8 | Vehicle ram, explosion, major thaumic discharge |

Detailed weapon lists in WS6 (Equipment).

### Weapon Properties

Weapons have properties that change how they interact with positioning and combat. A knife is a light weapon (1d6). A knife that's Subtle and Thrown is a different tool entirely.

| Property | Effect |
|-|-|
| **Ranged** | Attacks at Near and Far. Snag at Close (too unwieldy to aim). Cannot attack at Close without the Snag. |
| **Sidearm** | Attacks at Close and Near without Snag. Snag at Far (too short-ranged for that distance). Pistols, sawed-off shotguns. |
| **Thrown** | Can attack at Near. Weapon is lost after the attack unless recovered. |
| **Long** | Attacks at Close and Near. At Near range against a Close-only attacker, the Long weapon gets a Boon (reach advantage). |
| **Loud** | Heard at Far. Ticks attention clocks, heat clocks, or both. |
| **Brutal** | On a critical: damage equals the sum of the two highest dice, not just the single highest. |
| **Subtle** | Concealable. Drawing it in a social situation doesn't raise alarms. |
| **Slow** | Cannot attack and Move in the same turn. Sniper rifles, heavy emplacements. |

Properties are tags, not categories. A weapon can have several. A hunting rifle might be Ranged, Loud, and Slow. A switchblade is Subtle. A grenade is Thrown, Loud, and Brutal. The full weapon catalog with properties assigned is in WS6 (Equipment).

### Consumables

Single-use items with the Thrown property. Flashbangs, smoke grenades, molotovs, frag grenades. Use your Act, spend the item.

**Environmental effect (no targets).** It just works. Smoke breaks line of sight, caltrops cover the ground, an oil flask makes the floor slick. No roll.

**Damage to an area.** Roll the item's dice against each target in the area separately. A frag grenade (1d8, Thrown, Loud, Brutal) rolls 1d8 per target at Close of the detonation.

**Condition without damage.** The item forces a save. The item names the stat and the consequence. A flashbang (Thrown, Loud) forces a **Sharp save** — on failure, Snag on the target's next action. On a partial (4-5), reduced duration or intensity.

| Item | Dice | Properties | Resolution |
|-|-|-|-|
| Flashbang | — | Thrown, Loud | Sharp save or Snag on next action |
| Smoke grenade | — | Thrown | Breaks line of sight at Near, 2 rounds |
| Molotov | 1d6 | Thrown, Loud | Damage per target + area alight |
| Frag grenade | 1d8 | Thrown, Loud, Brutal | Damage per target at Close |
| Concussion charge | — | Thrown, Loud | Nerve save or lose next Act |

Consumables interact with Gear Gambits: if you're already attacking and sacrifice a die 4+ for a Gear Gambit (Flash, Obscure, Deafen), you get the effect alongside your damage without spending the item as a separate Act. Using the item standalone — throwing just the flashbang — costs your Act and the item, but requires no attack roll and no die sacrifice.

### The Attack Roll

1. Roll all your weapon dice (plus any bonus dice from Edges, allies, or situation)
2. Choose: **keep dice for damage** or **sacrifice dice for Gambits** (see below)
3. The **highest remaining die** = damage dealt to the target
4. Add +1 for each die sacrificed to **Bolster** (a specific Gambit)
5. Subtract target's **Armor**
6. Apply remainder to target's **Guard**, overflow to **Harm**

You always deal at least the highest die you kept. If you sacrifice ALL your dice to Gambits, you deal 0 damage but get pure tactical effects.

### Dual Wielding

Fighting with a weapon in each hand gives you a bigger dice pool at the cost of defense.

Roll dice from **both weapons** simultaneously. Allocate all dice freely between damage and Gambits. The larger pool means more options: more dice showing 4+ for Gambits, more flexibility in what you keep for damage.

The cost: **Snag (-1d) on all defense rolls** until your next turn. In melee, you have no free hand to guard or brace. At range, you're spraying instead of aiming from cover. Either way, you're committed to aggression over self-preservation.

This works with any combination: two knives, two pistols, a knife and a pistol. Two knives (1d6 + 1d6) rolls the same dice as a heavy weapon (2d6), but the dual wielder pays for it on defense. Two pistols at Near range is the classic action-movie spray. Each weapon still follows its own properties (a pistol still has the Sidearm tag, a knife is still Close-only).

### Gambits

Any die showing 4 or higher can be sacrificed for a tactical effect instead of contributing to your result. This works on any roll, combat or otherwise.

The cost is real. You sacrifice before reading your result. The highest remaining die is your outcome. Spending your only 6 to get a side effect might drop you from a full success to a partial. That's the choice.

One Gambit per die sacrificed. Multiple dice, multiple Gambits. No duplicates: each Gambit can only be used once per roll.

In combat you're trading damage for effect. On any other roll you're trading outcome height for effect. Same system, different currency.

**Gambit Sources:** Your available Gambits come from three places that all stack:

1. **Base list** (below). Available to everyone, every roll. 15 Gambits across four categories.
2. **Weapon Gambits** (1-3 per weapon, listed on its entry in `rules/EQUIPMENT.md`).
3. **Property-category Gambits** (from `rules/GAMBITS.md`). Any weapon with the Melee property gets all Melee Gambits, any Ranged weapon gets all Ranged Gambits, etc.

A knife that's Subtle gets: the base Gambits + its weapon-specific Gambits + all Subtle-category and Melee-category Gambits. In practice, range and situation narrow your options to a handful. If the same Gambit name appears in both your weapon entry and a property category, you have it once, not twice.

<!-- BASE GAMBIT LIST — LOCKED. 15 entries across 4 categories.
     Edges and equipment EXTEND (new trigger, modified effect, changed threshold).
     They do not add base Gambits. To modify this list, update the count and commit. -->

#### Maneuver

Output: positioning, access, protection. No confrontation required.

- **Position:** Boon on your next related roll. You set something up.
- **Escape:** Break contact. Disengage without triggering a response.
- **Conceal:** Hide yourself, an object, or a trail from detection.
- **Stall:** Buy time. An impending consequence doesn't resolve yet. You get one action before it hits. Also tick a relevant clock forward or back by one. *GM note: name the consequence when it's delayed. It returns on the next action unless the player addresses it directly. Stall is not escape. It's borrowed time with a visible price tag. The player should always know what's coming back.*

#### Assess

Output: information only. You learn something. The situation does not change.

- **Gather:** Learn one specific detail beyond what the roll gives you.
- **Read:** Reveal one true thing about a person's state, intent, or vulnerability.
- **Scout:** Map the space. Exits, threats, numbers, opportunities.

#### Influence

Output: changes people or institutions. Somebody's position shifts.

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

**Extension Model:** Edges and equipment can expand the base list in three ways:

1. **New trigger.** Use a base Gambit in a situation it doesn't normally cover.
2. **Modified effect.** A base Gambit does something additional or different.
3. **Changed threshold.** Reduce cost (4+ becomes free) or increase potency.

Every extension must name which base Gambit it modifies. "This Edge grants an enhanced Shove" not "this Edge pushes enemies." If it doesn't reference a base Gambit, it's not a Gambit extension. See `rules/EDGES.md` for examples.

Strong Gambits require 8+ and only work with d8+ weapons. In combat, Strong Gambits work against any Threat level.

Weapon-specific, property-category, Defensive, Act Replacement, and Gear Gambits remain exactly as written in their respective sections below and in `rules/GAMBITS.md`.

### Social Gambits

When the roll is a conversation and the target is a person, the base Gambits take specific social forms. These are not a separate system. They show what Influence, Assess, and Maneuver look like when words are the weapon.

| Name | Category | Stat | Effect |
|-|-|-|-|
| **Pressure** | Influence | Nerve | They make a decision now they'd rather defer. |
| **Appeal** | Influence | Nerve | They move toward your position because it aligns with something they care about. |
| **Deflect** | Maneuver | Nerve | Attention moves off you or an ally. |
| **Read** | Assess | Sharp | GM reveals one true thing about them. |
| **Undercut** | Influence | Sharp | They lose momentum. Their next move costs more. |
| **Leak** | Influence | Sharp | Specific information travels. GM tells you where it lands. |
| **Endure** | Maneuver | Grit | You hold your position through something that should break it. |
| **Stonewall** | Influence | Grit | They can't progress without escalating. |

Using a Social Gambit on a combat roll is possible if the fiction supports it. GM judges whether the category fits.

**Improvised Gambits:** Players can always propose a Gambit not on this list. State what you want, the GM judges whether it's plausible given your weapon, range, and the fiction. A few examples:
- *Blind:* throw dust, splash a drink, aim for the eyes. Target gets Snag on next action. Close or Near.
- *Destroy:* target an object instead of a person. Smash a control panel, shoot out a tire, cut a rope. Any range.
- *Distract:* ricochet shot, thrown debris, feint. An ally gets a Boon on their next action against that target. Any range.
- *Pull:* yank someone toward you or drag yourself to them. Close, or any range with the right gear (grappling hook, cable).

The principle: if it costs you a die and produces a single tactical effect of similar weight to the base list, it's probably a fair Gambit.

**Defensive Gambits:** Some Gambits protect you instead of affecting the enemy. Sacrifice a die 4+ from your attack roll on your turn. The defensive effect persists until the start of your next turn. You're trading offense for protection. See `rules/GAMBITS.md` for the full list (Parry, Guard Stance, Brace for Impact, etc.).

**Act Replacements:** A few special actions replace your attack entirely rather than costing a sacrificed die. You give up your attack for the round and gain the stated effect. These are marked in the Gambit catalog.

**Weapon Gambits:** Your weapon comes with 1-3 Gambits specific to it, listed on the weapon entry in `rules/EQUIPMENT.md`. A sawed-off can fire both barrels. A crowbar can pry a door. A hunting rifle can hold an overwatch position. Same rule: sacrifice a die 4+ (or 8+ for Strong effects) to trigger the Gambit instead of dealing damage with that die. Custom weapons get custom Gambits (see Equipment: Make Your Own).

**Strong Gambits (die 8+, only possible with d8+ weapons):**
- Work against **any Threat level**
- **Greater effect:** destroy cover, break a weapon, hurl them across the room, punch through a wall

### Gear Gambits

Specific equipment unlocks Gambits beyond the base list. Mundane gear and thaumatech alike. What you bring to a fight defines what you can do in it.

During a gear-up scene, players choose their loadout. If you know the enemy relies on sight for a special attack, bring flashbangs. If you're raiding a thaumatech-heavy site, bring a deadfield rod. If you expect a chase, bring caltrops. Preparation is a tactical advantage, and since you can't carry everything, your choices matter.

Gear Gambits follow the same rule: sacrifice a die showing 4+ during your attack to get the effect alongside your damage. You can also use the item as your Act without attacking (throw just the smoke grenade, deploy just the barricade). Either way, the item is consumed or needs recovery/reloading after use.

**Sensory Denial**

| Gambit | Effect | Range | Example Gear |
|-|-|-|-|
| **Flash** | Target blinded, Snag on their next action | Close/Near | Flashbang, flare gun, thaumic discharge rod |
| **Obscure** | Break line of sight in a small area for 1 round | Near | Smoke grenade, thaumic fog emitter, fire extinguisher |
| **Deafen** | Target can't hear for 1 round. Breaks vocalization Tells, disrupts coordination. | Close/Near | Concussion charge, sonic pulse device, blank-fire round |
| **Mark** | Tag a target. They can't hide from you this scene. | Any | Tracer rounds, luminescent paint, thaumic beacon |

**Movement Control**

| Gambit | Effect | Range | Example Gear |
|-|-|-|-|
| **Restrain** | Upgraded Pin: target must spend an Act to break free, not just movement | Close | Zip ties, bolas, adhesive charge, thaumic binding cuffs |
| **Slow** | Create difficult ground in an area. Crossing costs an extra Move. | Close/Near | Caltrops, oil flask, thaumic friction pad |
| **Barrier** | Create full cover (+2 Armor vs ranged) at your position. Sturdier than improvised Create Cover. | Close | Deployable barricade, riot barrier, thaumic ward projector |
| **Pull** | Yank a target one range band toward you, or pull yourself toward a surface | Any (with gear) | Grappling hook, magnetic cable, tow line |

**Disruption**

| Gambit | Effect | Range | Example Gear |
|-|-|-|-|
| **Overload** | Suppress all thaumatech within Close range for 1 round | Close | Deadfield rod, heavy discharge rig, surge grenade |
| **Redirect** | Change a sustained thaumic effect's target | Near | Frequency tuner, thaumic scanner |
| **Dampen** | Reduce target's damage output by 2 for 1 round | Near | Ward projector, dampener field |
| **Jam** | Block communications and remote signals in the area for 1 round | Near | Signal scrambler, thaumic jammer, white noise generator |

The full gear catalog with costs, legality, and availability is in WS6 (Equipment). GMs can create new Gear Gambits for custom items. The principle: one die, one tactical effect, requires a specific piece of kit.

### Gambit Potency

Your stat shapes how your Gambits land, what they look like, and how hard they stick.

The player describes what they do. That description determines the stat. The stat determines potency. A Grit character and a Sharp character both carrying knives fight completely differently:

- **Grit** breaks and overwhelms. You don't disarm, you break their grip. You don't shove, you drive them into the wall with your weight. You don't pin, you put them on the ground and stay there.
- **Sharp** redirects and finds gaps. You don't shove, you slip inside the guard and use their momentum. You don't disarm, you cut the strap. You don't pin, you put the blade exactly where moving would be stupid.
- **Nerve** pressures and holds. You don't pin, you press the blade where they can feel it and hold eye contact until moving feels wrong. You don't disarm, you make them choose to drop it.

Same Gambit name. Completely different fighter. The description earns the stat. The stat determines how hard it lands.

| Stat | Potency |
|-|-|
| **1** | Reduced. The Shove is a stumble. The Pin is a moment, not a hold. It works, barely. |
| **2** | Standard. The Gambit works as written. |
| **3+** | Enhanced. Against Threat 2+ targets, ignore one level of Threat resistance. |

**Strong Gambit + Enhanced potency together:** When a Strong Gambit (die 8+, or a free Crit Gambit) combines with Enhanced potency (stat 3+), the Gambit works at full effect AND leaves an additional consequence the GM names from the fiction. Not a bigger number, something extra sticks. The disarm also leaves them exposed. The shove also knocks them prone. The pin also leaves them Shaken. The GM describes what that looks like based on how the player described the action.

Potency applies to Fight Gambits only. Other categories land based on the fiction. The GM narrates the degree, not a table.

### Gambit Resistance

The target's side. How well they absorb or resist a Gambit depends on their Threat level.

| Threat | Standard Gambit (4+) | Strong Gambit (8+) |
|-|-|-|
| 0 (Mook) | Full effect | Full effect + bonus (destroy equipment, send them flying) |
| 1 (Tough) | Full effect | Full effect |
| 2 (Dangerous) | Reduced effect (brief, partial) | Full effect |
| 3 (Lethal) | No effect unless the fiction justifies it | Full effect |

"Reduced effect" means: the shove moves them one step instead of across the room, the pin lasts one action instead of a full turn, the disarm loosens their grip but doesn't fully remove the weapon. The GM narrates the degree based on the fiction.

Potency and Resistance combine.

**Example:** Bex (Grit 3) attacks a CSS Operator (Threat 2) with a shotgun, rolls 2d6 and gets 6, 4. She keeps the 6 for damage and spends the 4 on a Shove. "I slam the stock into his chest and drive him back." That's Grit, so her potency is Enhanced (Grit 3+). The Operator is Threat 2, which normally reduces Standard Gambits. But Enhanced potency ignores one Threat level: Threat 2 drops to Threat 1 for this Gambit. Full effect. He goes flying.

If Asa (Grit 1) tried the same Shove: Reduced potency meets Threat 2 resistance. It barely registers. The Operator doesn't move.

---

## Defense

When an enemy attacks on the GM's turn, the targeted player rolls to respond.

**Choose your stat based on your response:**
- Dodging, ducking, reflexes: **Sharp**
- Taking the hit, powering through: **Grit**
- Standing your ground, force of will: **Nerve** (for mental/magical attacks)

**Enemy Threat** imposes Snags on your defense roll:

| Threat | Snag | Examples |
|-|-|-|
| 0 (Mook) | None | Untrained, panicked, improvised |
| 1 (Tough) | -1d | Trained, equipped, experienced |
| 2 (Dangerous) | -2d | Elite, tactical, enhanced |
| 3 (Lethal) | -3d | Apex predator, war machine, major thaumic entity |

**Result:**

| Roll | Damage Taken |
|-|-|
| **6 / Critical** | None. You handle it clean. On a crit, gain a Boon on your next action. |
| **4-5** | Half the enemy's damage (round up). |
| **1-3** | Full damage. |

Then apply Armor, Guard, Harm as normal.

**Multiple attackers:** If multiple enemies attack you in the same round, roll defense separately against each. If a group of identical mooks attacks together, the GM may combine them: one defense roll, combined damage on a consequence.

### React

When an enemy attacks you, your defense roll IS your reaction. There is no separate React action. You respond to incoming attacks by rolling your stat to mitigate damage.

---

## Enemies

The GM doesn't roll dice. Enemies have static profiles:

- **Threat** (0-3): Imposes Snags on defense rolls.
- **Damage** (2-10): Flat damage dealt on their attacks.
- **Guard** (0-8): Buffer against player attacks.
- **Armor** (0-3): Flat damage reduction.
- **Morale** (yes/no): Whether they can be de-escalated or will break when losing. Most enemies: yes. Fanatics, machines, entities: no.
- **Behavior:** Priority list telling the GM what the enemy does.

When an enemy's Guard breaks, they're **Staggered**: something changes (they stumble, panic, shift tactics). When they take enough Harm, they're out: dead, fled, surrendered, or incapacitated depending on the fiction.

### Morale

Enemies aren't suicidal. When an enemy is Wounded (Harm 2+), or when half their group is down, the GM checks their Behavior line. Most enemies break: they flee, surrender, or try to negotiate. Only fanatics, cornered animals, and entities without self-preservation fight to the death.

### Enemy Behavior

Each stat block includes a **Behavior** line, a simple priority list that tells the GM what the enemy does.

Example: *"Enforcer: Close distance, target isolated PC, fall back if Wounded."*

This reduces GM cognitive load. The behavior tells you what the enemy wants; the fiction tells you how they pursue it.

### Example Stat Blocks

**Street Tough**
Threat 0 | Damage 3 | Guard 2 | Armor 0 | Morale: yes
*Weapon: Knife (1d6, Subtle) or bat (1d6)*
Behavior: Threaten first. Flee if Hurt. Won't fight alone.

**DPA Field Agent**
Threat 1 | Damage 4 | Guard 5 | Armor 1 | Morale: yes
*Weapon: Service pistol (1d6, Sidearm, Loud), thaumatech scanner*
Behavior: Contain and call backup. Identify targets. Withdraw if outgunned. Never engages a confirmed shaper alone.

**CSS Kill-Team Operator**
Threat 2 | Damage 6 | Guard 6 | Armor 2 | Morale: yes (on signal)
*Weapon: Assault rifle (1d8, Ranged, Loud, Brutal), combat knife (1d6, Subtle)*
Behavior: Eliminate primary target. Suppress others. Ignore wounded. Retreat on signal only.

**Unbound Thaumic Entity**
Threat 3 | Damage 8 | Guard 8 | Armor 0 | Morale: no
*Attack: Thaumic discharge (2d8, ignores mundane Armor)*
Behavior: Drawn to the highest BTC source. Passes through mundane obstacles. Retreats from sustained thaumatech suppression. Does not negotiate.

---

## Danger Clocks

Fights don't stay static. The longer combat runs, the worse things get.

A **Danger Clock** is a circle divided into segments (4, 6, or 8). At the end of each round (after the GM's turn), tick 1 segment. When it fills, something bad happens:

- Reinforcements arrive
- The structure starts collapsing
- Authorities respond
- An enemy activates something dangerous
- A fire reaches something volatile

The GM reveals the clock and its consequence at the start of combat. Players can see the countdown. The urgency is the point.

**Multiple clocks** can run simultaneously. A fight might have a Danger Clock and a Progress Clock. Players choose between fighting and completing objectives.

**Ticking:** Clocks tick 1 segment per round by default. Specific events might tick extra segments (an explosion ticks the collapse clock by 2).

---

## Clocks (General)

Clocks aren't just for combat. They track any complex situation with measurable progress:

- **Healing clock:** fill to recover from Wounded/Critical
- **Investigation clock:** fill to piece together a mystery
- **Heat clock:** fills as you draw unwanted attention
- **Project clock:** long-term goals (build a device, establish a safehouse)

**Segments:** 4 (straightforward), 6 (complex), 8 (daunting).

**Ticking from rolls:** On a full success, tick 2. On a partial, tick 1. On a critical, tick 3. Consequences may tick enemy or threat clocks instead.

Clocks are visible to all players. They exist on the table, drawn on paper or index cards. No hidden progress.

---

## Quick Reference

### The Roll (non-combat & defense)
Roll [stat]d6, read highest. 6 = full, 4-5 = partial, 1-3 = consequence. **Crit (double 6):** Full success + one free Strong-tier Gambit, full effect regardless of Threat level.

### Saves
Roll the specified stat, same table. Effect defines the consequence. Partial = reduced intensity. Threat does not impose Snags on saves.

### Conditions
Stunned = can't act, defense at 0d. Shaken = Snag on all rolls, clears end of scene or by intervention. Prone = stand costs Move, melee Boon against, ranged Snag against. Staggered = enemies only, Guard broke, fight is turning.

### Stats
Grit (body), Sharp (senses), Nerve (will). Rated 1-4.

### Modifiers
Boon = +1d. Snag = -1d. Cancel 1-for-1. Max 5d, min 0d (2d6 take lowest).

### Stakes
GM states consequences before any roll. Player can raise the stakes (+1d, worse stakes), play safe (-1d, softer stakes), change approach, or back off. In combat: trivial non-attack actions just happen, risky ones get a stat roll (GM sets terms, no back-and-forth). Attacks use weapon dice, not the stakes model. Tactical effects during attacks = Gambits.

### Positioning
Close (melee), Near (across a room), Far (across a lot). Move = shift one band. Cover: partial +1 Armor, full +2 Armor (ranged only).

### Tactics
**Universal Tactics (anyone):** Flanking, Ambush, Retreat, De-escalation. **Trained Tactics (Edge required):** Suppressing Fire, Tactical Retreat, Covering an Ally, Holding Ground.

### Attacking
Auto-hit. Roll weapon dice. Sacrifice dice 4+ for Gambits. Highest remaining die = damage. Strong Gambits need 8+. Dual wield: both weapons' dice, Snag on defense.

### Weapon Properties
Ranged (Near/Far, Snag at Close), Sidearm (Close/Near, Snag at Far), Thrown (Near, lost), Long (Close+Near, Boon at reach), Loud (ticks clocks), Brutal (crit = two dice), Subtle (concealable), Slow (no Move+attack).

### Gambits
**Gambits:** Any die 4+ sacrificed for effect on ANY roll. Four categories by output: **Maneuver** (Position, Escape, Conceal, Stall [delay consequence + tick clock ±1]), **Assess** (Gather, Read, Scout), **Influence** (Shift, Pressure, De-escalate), **Fight** (Shove, Trip, Disarm, Pin, Create Cover). 15 base, extended by Edges/equipment (must name which base Gambit they modify). Social forms: Pressure/Appeal/Deflect (Nerve), Read/Undercut/Leak (Sharp), Endure/Stonewall (Grit). Potency (Fight only): stat 1 = reduced, stat 2 = standard, stat 3+ = ignore one Threat level. Strong + Enhanced = full effect + additional fictional consequence.

### Defense
Roll [stat]d6 vs. enemy attack. 6 = no damage, 4-5 = half, 1-3 = full. Enemy Threat imposes Snags.

### Damage Flow
Damage, subtract Armor, subtract Guard, overflow = Harm.

### Harm Levels
1 (Hurt, -1d relevant), 2 (Wounded, -1d all), 3 (Critical, Push to act), Death.

### Push
4 boxes. Spend 1 for: +1d, or -2 damage, or act while Critical. Empty = Crack.

