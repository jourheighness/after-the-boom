# MONDAS Core Rules Engine v0.2

## In Two Minutes

You have three stats: **Grit** (body), **Sharp** (senses), **Nerve** (will). Each rated 1-4.

When you do something risky, roll d6s equal to your stat. Read the highest die.
- **6:** You do it.
- **4-5:** You do it, but there's a cost.
- **1-3:** Things go sideways. The GM tells you how.

Before you roll, the GM tells you what's at stake. You can push harder (accept worse stakes for +1d) or play it safe (accept a Snag for softer stakes).

In a fight, everything happens at three ranges: Close, Near, Far. Attacks auto-hit. You roll your weapon dice and choose: keep your highest die for damage, or sacrifice dice for tactical effects (shove, disarm, create cover, reposition). When an enemy comes at you, you roll your stat to see how much you can mitigate.

**Guard** keeps you on your feet. When it breaks, real injuries start. A few bad hits and you're done.

---

## The Roll

When the outcome is uncertain and the stakes matter, a player rolls.

**Roll d6s equal to the relevant stat. Read the single highest die.**

| Highest Die | Result | What Happens |
|-|-|-|
| **6** | Full success | You get what you want. No strings. |
| **4-5** | Partial success | You get it, but with a cost, complication, or reduced effect. |
| **1-3** | Consequence | You don't get it, or you get it at a serious price. The GM makes a move. |
| **Two or more 6s** | Critical | Full success, plus a bonus: extra effect, unexpected advantage, or narrative flourish. |

**Zero dice:** When Snags reduce your pool below 1, roll 2d6 and take the **lowest**. Criticals are impossible at 0d.

The GM never calls for a roll when there's no risk. If it's safe, you just do it. If it's impossible, no roll helps.

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
- **Pushing harder:** Accept worse stakes from the GM in exchange for +1d (see *Stakes*).

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
- **Push harder.** "What if I go louder, kick it in instead of picking it?" The GM raises the consequence but grants a **Boon (+1d)**. More risk, better odds.
- **Play it safe.** "What if I take my time and go careful?" The GM softens the consequence but imposes a **Snag (-1d)**. Less risk, worse odds.
- **Change approach.** "Forget the door, I'm going through the window." New stakes, possibly a different stat.
- **Back off.** "Never mind. We find another way." No roll, no consequence.

No labels to memorize, no categories to assess. The GM describes what's at risk. The player decides how much risk they want.

### Default Combat Stakes

In combat, standard attacks use default stakes: partial = half effect, consequence = full enemy damage + a complication. The GM only calls out custom stakes when something unusual is on the table (environmental hazard, collateral risk, device failure). This keeps combat rounds fast.

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

Guard refreshes when the danger has passed and you have a moment to collect yourself. If threats are continuous (combat follows a tense negotiation, a chase follows a break-in), Guard does not refresh between them. The GM determines when a genuine moment of safety occurs. If in doubt: if the characters would feel safe enough to sit down and breathe, Guard refreshes.

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

## Social Plays

When a conversation has stakes, these are your options. Not special abilities. Just the things anyone can try when words matter. Pick one, describe how, roll the stat. The GM sets stakes like any other roll. Edges and Backgrounds add Boons when they apply.

| Play | Stat | What Happens |
|-|-|-|
| **Pressure** | Nerve | Force a decision now. Partial: they comply but you burn goodwill. |
| **Read** | Sharp | Study someone. GM reveals one truth about them. Partial: they notice you watching. |
| **Endure** | Grit | Outlast the interrogation, the argument, the sales pitch. Partial: you hold but concede something small. |
| **Deflect** | Nerve | Redirect attention off yourself or an ally. Partial: they let it go but will circle back. |
| **Appeal** | Nerve | Make a case through their values. Only works if you know what they care about. Partial: they hear you but need more. |
| **Stonewall** | Grit | Refuse to engage. They can't progress without escalating. Partial: they find a crack in your composure. |
| **Undercut** | Sharp | Say something that pulls the floor out. They lose momentum. Partial: you reveal something about yourself too. |
| **Leak** | Sharp | Plant specific information. GM tells you who heard it within a day. Partial: it travels, but so does the fact that you planted it. |

On a consequence (1-3), the GM's stakes apply as usual. You pushed and they pushed back harder. You read wrong and tipped your hand. You stonewalled and they escalated to something you can't handle sitting down.

Social Plays combine naturally. Read someone first, learn what they care about, then Appeal to it. Two rolls, two sets of stakes, but the second one hits because you did the work.

---

## Positioning

Combat uses three abstract ranges. These describe relationships between people, not positions on a grid. The GM states who is Close, Near, or Far when a fight starts. Everything else follows from the fiction.

| Range | What It Means |
|-|-|
| **Close** | Arms' reach. Melee, grappling, whispered threats. |
| **Near** | Across a room. Pistol range, thrown objects, a shouted warning. |
| **Far** | Across a parking lot. Rifle range, rooftop to street, out of easy reach. |

Movement shifts you one range band per Move: Close to Near, Near to Far, or the reverse. You can also reposition laterally at the same range (behind cover, toward a different target, out of a doorway) when the fiction supports it.

Ranges are always relative. You can be Close to one enemy and Far from another. There is no shared map to argue about. The GM describes the space, players describe their movement, and the ranges follow.

### Cover

If something solid stands between you and a ranged attacker, you have cover.

**Partial cover** (low wall, car hood, doorframe, overturned table): **+1 Armor** against ranged attacks.

**Full cover** (solid wall, heavy barricade, around a corner): **+2 Armor** against ranged attacks. You can't be targeted by ranged attacks at all unless the attacker repositions to get an angle or the cover is destroyed.

Cover does not help against Close-range attacks. If they're in your face, the wall behind you doesn't matter.

A **Strong Gambit** (8+) can destroy cover: punch through the drywall, blow the barricade apart, shatter the window someone is hiding behind. This gives heavy weapons a tactical role beyond raw damage.

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

Any die showing **4 or higher** can be sacrificed for a tactical effect instead of contributing to damage. Each sacrificed die = one Gambit.

**Standard Gambits (die 4+):**
- **Bolster:** +1 to total damage per die spent. Any range. Always works.
- **Reposition:** you move one range band after the attack, even if you already moved. Any range.
- **Create Cover:** flip a table, kick over a dumpster, shoot out a support to topple something. Creates partial cover (+1 Armor vs ranged) at your position or an adjacent ally's. Must make fictional sense. Any range, but the cover is always at your position, not the target's.
- **Shove:** push the target one range band away. Close only.
- **Trip:** knock the target down (they spend movement to recover). Close only.
- **Disarm:** force them to drop something. Close only.
- **Pin:** prevent them from moving next turn. Close only.
- **Suppress:** keep the target's head down. They take a Snag on their next action. Near or Far only.

**Improvised Gambits:** Players can always propose a Gambit not on this list. State what you want, the GM judges whether it's plausible given your weapon, range, and the fiction. A few examples:
- *Blind:* throw dust, splash a drink, aim for the eyes. Target gets Snag on next action. Close or Near.
- *Destroy:* target an object instead of a person. Smash a control panel, shoot out a tire, cut a rope. Any range.
- *Distract:* ricochet shot, thrown debris, feint. An ally gets a Boon on their next action against that target. Any range.
- *Pull:* yank someone toward you or drag yourself to them. Close, or any range with the right gear (grappling hook, cable).

The principle: if it costs you a die and produces a single tactical effect of similar weight to the standard list, it's probably a fair Gambit.

**Weapon Gambits:** Your weapon comes with 1-3 Gambits specific to it, listed on the weapon entry in `rules/EQUIPMENT.md`. A sawed-off can fire both barrels. A crowbar can pry a door. A hunting rifle can hold an overwatch position. Same rule: sacrifice a die 4+ (or 8+ for Strong effects) to trigger the Gambit instead of dealing damage with that die. Custom weapons get custom Gambits (see Equipment: Make Your Own).

**Strong Gambits (die 8+, only possible with d8+ weapons):**
- Work against **any Threat level**
- **Greater effect:** destroy cover, break a weapon, hurl them across the room, punch through a wall

### Gear Gambits

Specific equipment unlocks Gambits beyond the standard list. Mundane gear and thaumatech alike. What you bring to a fight defines what you can do in it.

During a gear-up scene, players choose their loadout. If you know the enemy relies on sight for a special attack, bring flashbangs. If you're raiding a thaumatech-heavy site, bring an EMP rod. If you expect a chase, bring caltrops. Preparation is a tactical advantage, and since you can't carry everything, your choices matter.

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
| **Overload** | Suppress all thaumatech within Close range for 1 round | Close | EMP rod, pulse emitter, surge grenade |
| **Redirect** | Change a sustained thaumic effect's target | Near | Resonance tuner, thaumic scanner |
| **Dampen** | Reduce target's damage output by 2 for 1 round | Near | Ward projector, dampener field |
| **Jam** | Block communications and remote signals in the area for 1 round | Near | Signal scrambler, thaumic jammer, white noise generator |

The full gear catalog with costs, legality, and availability is in WS6 (Equipment). GMs can create new Gear Gambits for custom items. The principle: one die, one tactical effect, requires a specific piece of kit.

### Gambit Potency

When you perform a Gambit, your stat determines how hard it lands. Describe what you do. The description picks the stat, same as any other action.

"I shove him back" = Grit. "I cut the strap on his holster" = Sharp. "I hold the blade where he can see it" = Nerve.

| Stat | Potency |
|-|-|
| **1** | Reduced. The Shove is a stumble. The Suppress is a flinch. It works, barely. |
| **2** | Standard. The Gambit works as written. |
| **3+** | Enhanced. Against Threat 2+ targets, ignore one level of Threat resistance. |

This means your stats shape HOW you fight. A character with Grit 1 / Sharp 3 doesn't shove people. They cut straps, sever tendons, pin sleeves to walls. A character with Grit 3 / Sharp 1 doesn't do precision work. They throw people, break things, slam doors on arms. Same weapons, different person, different Gambits light up.

You don't pick a fighting style from a list. It emerges from your stats, your weapon, and the way you describe your actions. A knife in the hands of a Sharp 3 character is a scalpel. In the hands of a Nerve 3 character, it's a threat. In the hands of a Grit 3 character, it's a pry bar with an edge.

### Gambit Resistance

The target's side. How well they absorb or resist a Gambit depends on their Threat level.

| Threat | Standard Gambit (4+) | Strong Gambit (8+) |
|-|-|-|
| 0 (Mook) | Full effect | Full effect + bonus (destroy equipment, send them flying) |
| 1 (Tough) | Full effect | Full effect |
| 2 (Dangerous) | Reduced effect (brief, partial) | Full effect |
| 3 (Lethal) | No effect unless the fiction justifies it | Full effect |

"Reduced effect" means: the shove moves them one step instead of across the room, the pin lasts one action instead of a full turn, the disarm loosens their grip but doesn't fully remove the weapon. The GM narrates the degree based on the fiction.

Potency and Resistance combine. A Grit 3 character's Shove against a Threat 2 enemy: Enhanced potency drops the resistance by one step (Threat 2 becomes Threat 1 for this Gambit), so it lands at full effect instead of reduced. A Grit 1 character's Shove against the same enemy: Reduced potency meets Threat 2 resistance. It barely registers.

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

- **Threat** (0–3): Imposes Snags on defense rolls.
- **Damage** (2–10): Flat damage dealt on their attacks.
- **Guard** (0–8): Buffer against player attacks.
- **Armor** (0–3): Flat damage reduction.
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
Threat 0 | Damage 3 | Guard 2 | Armor 0
*Weapon: Knife (1d6, Subtle) or bat (1d6)*
Behavior: Threaten first. Flee if Hurt. Won't fight alone.

**DPA Field Agent**
Threat 1 | Damage 4 | Guard 5 | Armor 1
*Weapon: Service pistol (1d6, Sidearm, Loud), thaumatech scanner*
Behavior: Contain and call backup. Identify targets. Withdraw if outgunned. Never engages a confirmed shaper alone.

**CSS Kill-Team Operator**
Threat 2 | Damage 6 | Guard 6 | Armor 2
*Weapon: Assault rifle (1d8, Ranged, Loud, Brutal), combat knife (1d6, Subtle)*
Behavior: Eliminate primary target. Suppress others. Ignore wounded. Retreat on signal only.

**Unbound Thaumic Entity**
Threat 3 | Damage 8 | Guard 8 | Armor 0
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
Roll [stat]d6, read highest. 6 = full, 4-5 = partial, 1-3 = consequence. Double 6 = critical.

### Stats
Grit (body), Sharp (senses), Nerve (will). Rated 1-4.

### Modifiers
Boon = +1d. Snag = -1d. Cancel 1-for-1. Max 5d, min 0d (2d6 take lowest).

### Stakes
GM states consequences before any roll. Player can push harder (+1d, worse stakes) or play safe (-1d, softer stakes).

### Social Plays
Pressure (Nerve), Read (Sharp), Endure (Grit), Deflect (Nerve), Appeal (Nerve), Stonewall (Grit), Undercut (Sharp), Leak (Sharp). Same roll rules. Edges and Backgrounds add Boons.

### Positioning
Close (melee), Near (across a room), Far (across a lot). Move = shift one band. Cover: partial +1 Armor, full +2 Armor (ranged only).

### Attacking
Auto-hit. Roll weapon dice. Sacrifice dice 4+ for Gambits. Highest remaining die = damage. Strong Gambits need 8+. Dual wield: both weapons' dice, Snag on defense.

### Weapon Properties
Ranged (Near/Far, Snag at Close), Sidearm (Close/Near, Snag at Far), Thrown (Near, lost), Long (Close+Near, Boon at reach), Loud (ticks clocks), Brutal (crit = two dice), Subtle (concealable), Slow (no Move+attack).

### Gambits
Standard (4+): Bolster, Reposition, Create Cover (any range). Shove, Trip, Disarm, Pin (Close). Suppress (Near/Far). Weapon Gambits (1-3 per weapon, see equipment entry). Gear Gambits (requires kit): Flash, Obscure, Deafen, Mark, Restrain, Slow, Barrier, Pull, Overload, Redirect, Dampen, Jam. Strong (8+): greater effect, destroys cover. Potency: stat 1 = reduced, stat 2 = standard, stat 3+ = ignore one Threat level of resistance.

### Defense
Roll [stat]d6 vs. enemy attack. 6 = no damage, 4-5 = half, 1-3 = full. Enemy Threat imposes Snags.

### Damage Flow
Damage, subtract Armor, subtract Guard, overflow = Harm.

### Harm Levels
1 (Hurt, -1d relevant), 2 (Wounded, -1d all), 3 (Critical, Push to act), Death.

### Push
4 boxes. Spend 1 for: +1d, or -2 damage, or act while Critical. Empty = Crack.

---

## Design Appendix

### Decisions Made (WS1)

| # | Decision | Answer | Laws |
|-|-|-|-|
| D1 | Dice system | d6 pool for rolls; weapon dice for attacks | P4, P15, P16 |
| D2 | Who rolls | Player-facing only. No exceptions. | P11 |
| D3 | Action economy | Move + Act per turn; React on enemy turns; no initiative | P6, P11, P15 |
| D4 | Success granularity | Three tiers + critical (6 / 4-5 / 1-3 / double 6) | P1, P4 |
| - | Stat count | 3 (Grit, Sharp, Nerve), rated 1-4 | P14, P17 |
| - | Attack model | Auto-hit, weapon dice, Gambits for tactical choice | P4, P6, P9 |
| - | GM framing | Stakes (state consequences, push harder / play safe trade) | P1, P2, P6 |
| - | Damage system | Guard buffer + 3-level Harm track + Scars | P3, P8, P12 |
| - | Tension mechanic | Danger Clocks (tick each round) | P3, P6 |
| - | Push resource | 4-box track, narrative recovery, Crack on empty | P12, P15 |

### Decisions Made (WS4)

| # | Decision | Answer | Laws |
|-|-|-|-|
| D8 | Positioning model | Three abstract ranges (Close/Near/Far), not zones or grid. Relative to entities, not a map. | P6, P15 |
| D9 | Cover | +1/+2 Armor vs ranged (partial/full). No effect at Close. Strong Gambit destroys cover. | P13, P15 |
| D10 | Weapon properties | 8 tags (Ranged, Sidearm, Thrown, Long, Loud, Brutal, Subtle, Slow). WS6 assigns to specific weapons. | P6, P17 |
| D11 | Dual wielding | Roll both weapons' dice. Snag on defense until next turn. | P6, P9 |
| D12 | Shields | Dropped. Setting is 1992, not medieval. Armor handles protection, Cover handles positioning. | P17 |
| D13 | Create Cover Gambit | Standard Gambit (4+). Flip table, kick dumpster. Creates partial cover. Needs fictional justification. | P6, P9 |
| D14 | Gear Gambits | 12 gear-unlocked Gambits across 3 categories (Sensory, Movement, Disruption). Mundane and thaumic gear alike. Loadout = tactical identity. | P6, P17 |
| - | Ranged Gambits | Gambits tagged by range. Suppress (Near/Far) fills ranged gap. Improvised Gambits with examples replace vague "Other." | P6, P9 |
| D15 | Gambit resistance | Explicit table by Threat level. Standard reduced/blocked at Threat 2+. Strong always works. | P6 |
| D22 | Gambit potency | Attacker's stat (from description) sets potency: 1 = reduced, 2 = standard, 3+ = ignore one Threat level. Zero extra rolls. Fighting style emerges from stat spread. | P2, P6, P14 |
| D23 | Weapon Gambits | Each weapon carries 1-3 specific Gambits on its entry. Loadout = tactical identity. | P6, P17 |
| D24 | Social Plays | 8 structured social actions (Pressure, Read, Endure, Deflect, Appeal, Stonewall, Undercut, Leak) with stat and outcome. Not Gambits. Same roll system. | P1, P6 |

### Decisions Made (WS2)

| # | Decision | Answer | Laws |
|-|-|-|-|
| D16 | Background system | Universal Boon domain from Background. Separate from Edges. | P2, P14 |
| D17 | Starting Guard | Grit + 2 (range 3-6) | P13, P15 |
| D18 | Stat permanence | Fixed at creation. No stat growth. | P14 |
| D19 | Species mechanics | Purely narrative. No stat bonuses. | P17 |
| D20 | Zero/positive balance | Zeroes: 4 Edges + Thaumic Null. Positives: 3 Edges + thaumic access. | P10, P17 |
| D21 | Progression model | No XP, no levels. Edges through play. Guard from Scars. | P12, P14 |

### Open Questions for Future Workstreams

- **WS3 (Magic):** Complete. See `rules/MAGIC.md`. Nerve caps innate shaping pool. Device overcharge capped by device-specific stat (Sharp/Nerve/Grit).
- **WS4 (Combat):** Complete. Integrated into this document.
- **WS2 (Creation):** Complete. See `rules/CHARACTER.md`. Guard = Grit + 2 (range 3-6). Backgrounds as Boon domains. Zeroes: 4 Edges + Thaumic Null. Positives: 3 Edges. No XP, no levels, no stat growth.
- **WS5 (Edges):** Edges that grant bonus attack dice, modify Gambits, add new Gambit options, change stat usage, or interact with Push. "Fortifier" Edge (Create Cover produces full cover). Thaumatech ward-barrier Edge. Weapon property interaction Edges (e.g., "Quick Draw" removes Slow).
- **WS6 (Equipment):** Full weapon catalog with properties. Thaumatech device catalog. Armor items. Legality tiers, costs, availability.

### Design Principles Index

Notes moved here from body text. Each principle tag (P1, P2, etc.) references the Design Laws in the master plan.

- **P1, P4 (The Roll):** Every roll produces a result. No "nothing happens" outcome. A consequence on 1-3 is a complication, not a dead end.
- **P2 (Stats):** Creativity rewarded by letting players choose approach, which determines stat. Bounded by fictional plausibility.
- **P2 (Boons):** Creativity Boons capped at 1 per roll to prevent description stacking.
- **P1, P6 (Stakes):** Stakes replace difficulty classes and position/effect. Push harder / play safe trade gives agency over risk.
- **P12 (Push):** Push recovery is narrative, not mechanical. A real moment, not a rest timer.
- **P8 (Harm):** No HP to chip. Named injuries with mechanical bite create a desperate spiral.
- **P12 (Scars):** Narrative anchors, not a penalty table. Guard growth creates natural progression.
- **P12 (Recovery):** Every point of healing has a story attached.
- **P6, P11 (Turns):** No initiative rolls. Players coordinate freely. All dice stay on the player side.
- **P6, P9 (Gambits):** Gambits make every attack a tactical decision, producing cinematic moments through mechanical choices.
- **P6 (Enemies):** Behavior lines prevent identical enemy tactics. Forces player adaptation.
- **P3 (Danger Clocks):** Mechanical urgency. Standing around trading blows is punished by escalating threat.
- **P6, P15 (Positioning):** Three ranges, not a grid. Fiction determines space. Ranges are relational, not positional.
- **P13 (Cover):** Armor bonus, not attacker Snag. Lives on the defender where it belongs. No cognitive load inversion.
- **P6 (Weapon Properties):** Tags create tactical differentiation without a wargame. Ranged/Long/Sidearm interact with positioning. Loud interacts with clocks.
- **P9 (Dual Wielding):** Bigger dice pool for more Gambit options, defense Snag for vulnerability. Aggressive playstyle with a real cost.
- **P6, P9 (Create Cover):** Trades offense for defense mid-fight. Requires fictional justification. Keeps the environment as a tactical resource.
- **P17 (No Shields):** The setting is 1992 industrial, not medieval. Kevlar and thaumic wards are Armor. Barricades and furniture are Cover.

### Probability Reference (Core Roll)

| Pool | Consequence (1-3) | Partial (4-5) | Full (6) | Crit (6,6+) |
|-|-|-|-|-|
| 0d | 75% | 22% | 3% | 0% |
| 1d | 50% | 33% | 17% | 0% |
| 2d | 25% | 44% | 31% | 3% |
| 3d | 13% | 46% | 42% | 7% |
| 4d | 6% | 42% | 52% | 13% |
| 5d | 3% | 37% | 60% | 20% |

Sweet spot: **2d** (average stat). Partial success is the most common result. The game lives in "yes, but..."
