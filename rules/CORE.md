# CORE

<br />

Core Rules Engine v0.3

## In Two Minutes

You have three stats: **Grit** (body), **Sharp** (senses), **Nerve** (will). Each rated 1-4.

When you do something risky, roll d6s equal to your stat. Read the highest die: **6** you do it, **4-5** you do it with a cost, **1-3** things go sideways. After you roll, you can sacrifice dice showing 4+ for guaranteed side effects called **Gambits**: push someone back, pin them in place, read a weakness, create cover.

In combat, attacks auto-hit. Roll your weapon die for damage. Boons from flanking, setup, or allies add d6s to the pool. Extra dice are gambit fuel: sacrifice them to change the battlefield. One die = damage or effect, pick one. More dice = both. **Drain** spends willpower for +1d when you need it most. **Guard** keeps you standing. When either empties, something breaks.

***

## Status

**Grit:** Strength, toughness, endurance, physical presence. Kicking down a door, taking a punch, hauling someone to safety.

**Sharp:** Awareness, reflexes, precision, analytical thinking. Spotting danger, dodging a swing, picking a lock, working through a problem, connecting dots.

**Nerve:** Willpower, composure, influence, courage. Keeping cool under pressure, lying convincingly, resisting a thaumic intrusion.

Each stat is rated **1-4**.

1. **Weak**. One die and a prayer.
2. **Average**. Partial success is your life.
3. **Strong**. Misses are rare.
4. **Exceptional**. The best in the room.

> Starting characters distribute 6 points across three stats (minimum 1 each). Common spreads: 3/2/1 (specialist), 2/2/2 (generalist).

### Which Stat?

The player describes what they do. The description determines the stat.

"I shove past him" = Grit. "I slip past when he looks away" = Sharp. "I talk my way through" = Nerve.

Different approaches to the same problem use different stats, different odds. The approach must make sense in the situation. The GM judges stakes based on how well it fits.

### Edges

**Edges** are what make your character yours. Special training, innate talents, connections, knacks. Each Edge gives a specific mechanical benefit: bonus dice in certain situations, new tactical options, access to thaumic abilities, or a narrative capability.

Characters start with **3 Edges** (positives) or **4 Edges** (zeroes, who compensate for lack of thaumic access with broader training). Edges are gained through play, roughly 1 every 2-3 sessions. See `rules/CHARACTER.md` for creation details. The full Edge catalog is in `rules/EDGES.md`.

***

## The Roll

When the outcome is uncertain and the stakes matter, a player rolls.

**Roll d6s equal to the relevant stat. Read the single highest die.**

| Highest Die | Result                                                  |
| ----------- | ------------------------------------------------------- |
| **6**       | Full success. No strings.                               |
| **4-5**     | Partial success. Cost, complication, or reduced effect. |
| **1-3**     | Consequence. The GM makes a move.                       |

**Zero dice:** When modifiers reduce your pool below 1, roll 2d6 and take the **lowest**.

The GM never calls for a roll when there's no risk. Safe actions just happen. Impossible actions just fail.

***

## Stakes

Before any roll, the GM states what's at risk.

**The GM tells the player two things:**

1. **On a partial (4-5):** What complication, cost, or reduced effect comes with success?
2. **On a consequence (1-3):** What goes wrong?

Stakes must be **specific and grounded.** Not "you take damage" but "the guard draws his weapon." Not "reduced effect" but "you get through the door but they hear you."

The player hears the stakes. Then they can:

* **Build the pool.** Does your Background apply? Do you have the right gear? Are you in an advantageous position? Is your approach creative? Is an ally helping? Does an Edge apply? Each yes is a Boon. Drain for +1d if you need it. The player advocates, the GM confirms.

* **Change approach.** Different action, new stakes, possibly different stat.

* **Back off.** No roll, no consequence.

***

## Boons & Snags

Modifiers that add or remove dice from the pool.

**Boon (+1d):** Something works in your favor. Training, good gear, environmental advantage, ally assistance, clever approach.

**Snag (-1d):** Something works against you. Injury, poor positioning, enemy capability, bad conditions, improvised tools.

Boons and Snags cancel 1-for-1. Only the net result applies. Minimum: **0d** (roll 2d6 take lowest). Attack pools work differently; see Attacking.

### Sources of Boons

* **Background:** Relevant expertise for the situation.

* **Gear:** The right tool for the job.

* **Creative approach:** Using the environment, exploiting a weakness, leveraging preparation. Max 1 Boon from creativity per roll.

* **Ally assist:** Another character helps. They describe how. Costs their Act (in combat) or exposes them to risk (out of combat).

* **Edges:** Some Edges grant situational Boons.

### Sources of Snags

* **Injury:** Wounds apply Snags when the injury interferes (see Taking Damage).

* **Enemy Threat:** Powerful enemies impose Snags on your defense rolls based on their Threat level (0 to -3d).

* **Environment:** Darkness, smoke, unstable ground.

* **Improvisation:** Using the wrong tool.

***

## Gambits

Two things are always true:

1. **Any roll, any context:** sacrifice a die showing 4+ for a gambit.
2. **Any roll, any context:** spend Drain before rolling for +1d.

<br />

Every roll is either a **combat roll** (dealing damage) or a **stakes roll** (everything else, including defense, saves, and non-attack actions mid-fight). Both have the same question: what did I get, and what can I trade?

Gambits are the player's leverage. The GM controls stakes, consequences, and enemy behavior. You see the dice and decide to spend one. The GM honors it if the fiction allows.

### Stakes Gambits

On any stakes roll (social, exploration, investigation, setup, doing something crazy mid-fight), sacrifice a die showing 4+ to grab something extra from the moment. Sacrifice a 6 for something big. Name it in one sentence. Something concrete the action made possible. It adds to the scene. It never erases what happened.

| You're...                 | You could gambit to...                                                  |
| ------------------------- | ----------------------------------------------------------------------- |
| **Forcing something**     | create cover, block a path, control the approach, break something free  |
| **Talking to someone**    | read a tell, plant an idea, establish a reputation, create an alibi     |
| **Reading the situation** | spot a detail, sense a shift, connect two facts, anticipate what's next |
| **Working an angle**      | lift something, plant something, leave a false trail, time a pattern    |

### Sizing Gambits

See `rules/GM.md` for sizing guidance, narrative authority, temptation technique, and worked examples.

### Thaumatech

Using a thaumatech device is a stakes roll. The GM puts Drain in the stakes based on how far past rated function you're pushing it. Simple use might cost nothing on a 6, but there's always a risk. Stretching costs more. Way past spec risks the device itself. See `rules/THAUMATECH.md` for the full framework.

***

## Guard & Drain

A **scene** is a continuous stretch of action in one situation. When the situation changes, the scene ends. **Downtime** is unstructured time between dangerous situations: hours or days where characters rest, recover, and pursue personal goals.

### Guard

Your readiness: awareness, positioning, luck, the instinct that keeps you alive.

**Starting Guard = 2 + your highest stat** (range 3-6, max 10 through Scars).

When Guard drops, you haven't been hurt yet. You've been pushed, rattled, forced into worse positions. The first real injury comes when Guard breaks.

**Recovery:** Guard refreshes when genuine safety occurs. If the characters would feel safe enough to sit down and breathe, Guard refreshes. Routine scenes (shopping, travel, safe conversation) always refresh. A tense social scene where violence is possible does not. Continuous threats (combat follows a negotiation, chase follows a break-in) do not refresh between them.

### Drain

When the dice aren't enough, you dig deep. Drain is willpower. Everyone has it, zero or positive.

**Drain track: 4 boxes.** Spend 1 Drain to:

* **Add +1d** to any roll (before rolling). One Drain per roll.

* **Act despite a Critical injury** (when you'd normally be incapacitated).

* **Thaumatech use** (positives only) puts Drain in the stakes. The GM sizes the cost based on how hard you're pushing the device. See `rules/THAUMATECH.md`.

Zeroes dig deep on guts alone. Positives split the same 4 boxes between guts and gear.

**Cracking:** When your Drain track empties, you **Crack**. Something breaks inside. The player names what it is and plays it. **Snag on all rolls until the Crack clears.** Every roll, every action, until the character deals with what broke.

Examples (the player picks or invents):

* *Reckless:* you stop caring about safety. You walk into gunfire because it doesn't matter.

* *Paranoid:* you trust no one. You check every room twice. You sleep with your back to the wall.

* *Numb:* nothing reaches you. Not pain, not fear, not the people who need you to feel something.

* *Volatile:* your temper is a lit fuse. Every frustration is a fight. Every slight is personal.

* *Dissociated:* you're watching yourself from the outside. Actions feel automatic, disconnected.

* *Obsessive:* you fixate on one thing: a detail, a face, a sound. You can't let it go.

* *Hollow:* the work ate something you can't name. You do the motions. The meaning is gone.

Cracks clear through significant narrative moments, not rest. A conversation that reaches you. A choice that proves something. A moment where the character confronts what broke and decides who they are now.

**Cracked + Critical + 0 Drain = incapacitated.** You're out of the fight. Same as two full Critical slots. The character is done until someone helps them.

**Recovery:** Drain recovers during **downtime** by:

* Spending time with someone who matters

* Doing something that reminds you who you are

* Getting proper rest in a safe place

* Indulging a vice or habit (quick but the GM may complicate)

***

## Taking Damage

When damage hits you, it flows through the **Damage Pipeline**:

```
Damage → subtract Armor → subtract Guard → overflow = Harm
                                              ↓
                                     Guard hits 0? → Scar
```

**Step by step:**

1. **Armor** reduces damage (flat 0-3)
2. Remainder hits **Guard**
3. If Guard reaches **0** (exact or overflow): take a **Scar**
4. Overflow past Guard becomes **Harm**

> **Example:** A DPA agent hits you for 4 damage. You have Armor 1, Guard 3. Armor absorbs 1 (leaving 3). Guard absorbs 3 (reaching 0). Guard broke: take a Scar. No overflow, so no Harm.
>
> Same hit, Guard was already at 1: Armor absorbs 1 (leaving 3). Guard absorbs 1 (reaching 0). Overflow: 2. Scar + Level 1 Harm.
>
> A CSS Operator hits you for 6 damage. Armor 1, Guard 2. Armor absorbs 1 (leaving 5). Guard absorbs 2 (reaching 0). Overflow: 3. Scar + Level 2 Harm (Wounded). You now have a Snag on all rolls until you get treatment.

### Armor

| Rating | Protection | Examples                                               |
| ------ | ---------- | ------------------------------------------------------ |
| 0      | None       | Street clothes                                         |
| 1      | Light      | Padded coat, leather, minor ward                       |
| 2      | Moderate   | Tactical vest, reinforced gear, shielding charm        |
| 3      | Heavy      | Full ballistic plate, heavy plating. Rare, conspicuous |

Heavy or conspicuous armor may impose Snags (Sharp for bulk, Nerve for looking like you expect a fight). Details in `rules/EQUIPMENT.md`.

### Harm

When damage overflows Guard, you take real injuries. The Harm track has 3 levels, 2 slots each:

| Level | Name         | Effect                                    | Example                       |
| ----- | ------------ | ----------------------------------------- | ----------------------------- |
| 1     | **Hurt**     | Snag when the injury is directly relevant | Grazed arm, twisted ankle     |
| 2     | **Wounded**  | Snag on all rolls                         | Cracked ribs, deep laceration |
| 3     | **Critical** | Must Drain to act at all                  | Gut shot, shattered leg       |

**Overflow determines Harm level:**

| Overflow | Harm Level         |
| -------- | ------------------ |
| 1-2      | Level 1 (Hurt)     |
| 3-4      | Level 2 (Wounded)  |
| 5+       | Level 3 (Critical) |

Each Harm is **named**. Player and GM agree on the injury based on the fiction. The name determines when the Hurt penalty applies and how recovery works.

If both slots at a level are full, new Harm bumps up to the next level. If both Level 3 slots are full and you take more: **you're dead**, or suffer a permanent campaign-altering consequence (lost limb, captured). The table decides.

### Scars

When Guard drops to 0, something changes permanently.

The player describes the Scar: a physical mark (split lip, burn scar), a psychological one (flinch at loud noises, can't sleep with lights off), or a material loss (weapon cracked, something precious broken).

**Scars are permanent but not punishing.** They make your character more defined, not less capable.

**Guard Growth:** The first Scar in a session increases your maximum Guard by 1 (cap 10). Getting hurt teaches you to protect yourself.

### Recovery

| Level            | Clears when...                                                               |
| ---------------- | ---------------------------------------------------------------------------- |
| **Hurt** (1)     | Scene ends. A bandage kit clears it mid-scene (1 Act).                       |
| **Wounded** (2)  | Healing clock fills (4 segments). Needs treatment.                           |
| **Critical** (3) | Healing clock fills (6 segments, drops to Wounded). Needs serious treatment. |

A healing clock is a progress track divided into segments. Treatment fills it. (Clocks as a general mechanic: see the Clocks section.)

Three ways to help someone:

**Consumables.** Spend your Act, use the item. Automatic. A stim shot restores 3 Guard mid-scene. A stabilizer dose grants a Boon that cancels the wound Snag for the rest of the scene. You're still injured, still need treatment, but you can function. At Critical, the stabilizer cancels the Snag but you're still immobile.

Thauma-pharmaceuticals need ambient magic to work. Inert in dead zones. Thaumatech devices run on operator Drain and work anywhere.

**Treatment.** Stakes roll. Describe the work, GM sets stakes. Ticks the healing clock: full success = 2 ticks, partial = 1. Gear (first-aid kit, surgical tools) gives a Boon.

Anyone can treat Wounded. Critical needs training: a relevant Edge or Background. Without training you can stabilize (consumable), not heal.

One treatment attempt per patient per scene. Consumables don't count as attempts.

**Thaumatech devices.** Treatment roll powered by the operator's Drain. Connect the patient, activate, roll. Standard thaumatech stakes apply (GM sizes the Drain cost). A trauma station handles Critical without an Edge but needs a power source and doesn't travel.

**Drain** recovers during downtime through narrative beats: rest, connection, purpose, vice. Between scenes, a nerve stim (thauma-pharmaceutical, restricted) recovers 1 Drain with a Snag on the next roll. Requires 10 minutes of rest. Nothing recovers Drain mid-fight.

**Cracks** clear through significant narrative moments. No item fixes a Crack.

Full catalog in `rules/EQUIPMENT.md`.

***

## Conditions

### PC Conditions

**Stunned.** Can't act. No Move, no Act, no reaction. Defense at 0d (2d6, take lowest). Clears at the end of your next turn unless stated otherwise.

**Shaken.** Rattled, panicked, or reeling. Snag on all rolls until cleared. Clears at end of scene, or earlier through intervention (ally help, comparable action the GM accepts).

**Prone.** On the ground. Standing costs your Move. Melee attacks against you get a Boon. Ranged attacks against you get a Snag. Your melee attacks get a Snag. Can crawl at Close range without standing.

### Enemy Conditions

Enemies don't roll dice. Their conditions affect flat numbers.

**Impaired.** Compromised form, broken stance, shaking hands. **-2 damage dealt.** Clears after their next turn.

**Exposed.** Cracked open, off-balance, guard down. **+2 damage taken.** Clears after their next turn.

**Prone.** On the ground. Standing costs their Move. Melee attacks against them get a Boon. Ranged attacks against them get a Snag.

**Pinned.** Can't reposition. Costs Act to escape (Strong: Act + Move).

**Staggered.** Guard broke. The GM checks Morale (see Enemies). Most enemies break here.

**Stacking.** Conditions don't stack. Applying Impaired to an already Impaired enemy refreshes the duration (one more turn), not the intensity. Different conditions combine: an enemy can be Impaired AND Prone at the same time.

***

## Saves

When an effect forces you to resist, roll the specified stat. "Grit save" means roll Grit. "Nerve save" means roll Nerve. Same result table: 6 = resist fully, 4-5 = partial, 1-3 = full effect.

The triggering effect defines the consequences, not the GM. If an enemy ability says "Nerve save or stunned," the consequence is built in. On a partial (4-5), the effect lands at reduced intensity: stunned for one action instead of until end of next turn, forced movement goes half distance, a Snag applies to your very next roll only.

Saves use normal Boon/Snag rules. Powerful enemies impose Snags on defense rolls (see Defense), but **not on saves**. Saves stand on their own.

> **Default partial:** When a partial save feels ambiguous, the effect applies to the target's very next action only, or the target takes a Snag on their next roll.

***

## Combat

### Setup Phase

When you see a threat coming (expected combat, an ambush you're laying, a hostile situation you're walking into aware), each player gets one setup roll before the first round. Describe your preparation: take cover, line up a shot, flank wide, ready a device, lay an ambush. Roll the relevant stat.

| Result  | Effect                                                     |
| ------- | ---------------------------------------------------------- |
| **6**   | Boon on your first attack.                                 |
| **4-5** | In position. Nothing extra.                                |
| **1-3** | Complication. Spotted early, bad angle, dropped something. |

This is a stakes roll. Stakes gambits apply: sacrifice a 4+ die to grab something extra from the preparation (spot the alarm panel, clock the exit route, palm a weapon, get into cover).

**From ambush or concealment:** The GM sets higher stakes. On a 6 the GM may grant: no defense roll on the opening attack, enemies act last in round one, or a Boon on top of the setup Boon. On a 1-3 the ambush fails and combat starts on their terms. The fiction determines the scale. A prepared ambush earns more than walking in ready.

**No setup?** If you're ambushed or a previous stakes roll went badly enough to trigger combat, there is no setup roll. Enemies act first. You're reacting from round one.

### Round Structure

Each round:

1. **Players act** in any order. Each player gets one turn.
2. **Enemies act.** The GM plays each enemy according to its Behavior line.
3. **Environment.** Clocks tick, fires spread, structures shift.

Repeat until the fight ends.

### Three Lanes

Everything in combat falls into one of three lanes:

**Hurting an enemy?** Combat roll. Roll your weapon die, deal damage. Gambits come from the combat list.

**Changing the battlefield?** Gambits. Sacrifice a die from your combat roll for a guaranteed side effect. Anything that shifts the tactical situation costs a die.

**Doing something else entirely?** Stakes roll. Hack a terminal, barricade a door, hotwire a van, call for backup, talk an enemy down, flee under fire, seal a breach, jury-rig a broken device. GM sets stakes, you roll the relevant stat. Not an attack, doesn't use weapon dice. Stakes gambits apply: sacrifice a 4+ die to name a side effect. Setup works here too.

### Your Turn

You get a **Move** and an **Act**, in either order. You can skip either.

* **Move:** Reposition one range band (Close ↔ Near ↔ Far), or move within the same band (behind cover, toward a different target).

* **Act:** Attack, use a device, interact with the environment, or Assist.

**Assist:** Instead of attacking, describe how you help another player. They get a **Boon** on their next roll. You must be positioned to help.

### Attacking

Attacks auto-hit. You never roll to see *if* you connect. The roll determines *how hard* and *what else* happens.

**Procedure:**

1. Declare your target and weapon
2. Declare Drain (+1d6) if spending it. Must be before the roll.
3. Roll: weapon die + Boon d6s + Drain d6
4. **Choose:** keep dice for damage, or sacrifice dice showing 4+ for Gambits
5. Highest remaining die = damage
6. Subtract target's Armor
7. Apply to Guard, overflow to Harm

Sacrifice all dice = 0 damage, pure Gambit effects. One die with no Boons or Drain = damage OR Gambit, pick one.

**Snags on attacks** remove bonus dice first (Boons, Drain). If no bonus dice remain, the weapon die is removed and you're at 0d. A Wounded character attacking without Boons or Drain is at 0d. Wounded means you need help: Drain, an ally's Assist, or flanking.

**At 0d** (weapon die removed by Snags): roll 2d6. Your damage is the lower die. Either die can be sacrificed for a gambit if it shows 4+. If you sacrifice the lower die, your damage becomes the higher die instead.

### Defense

Defense is a stakes roll. The stakes are incoming damage: 6 = none, 4-5 = half, 1-3 = full. The GM doesn't need to state them. They're always the same.

**Pick your stat from the fiction:**

* **Sharp:** dodge, duck, dive behind something, reflexes

* **Grit:** rip a door off for cover, shoulder through to a better position, body-block someone behind you

* **Nerve:** hold steady under fire, resist a thaumic intrusion, stand your ground when everything says run

Roll \[stat]d6, minus Snags from enemy Threat (see Enemies). Drain for +1d before rolling.

| Roll    | Damage Taken     |
| ------- | ---------------- |
| **6**   | None.            |
| **4-5** | Half (round up). |
| **1-3** | Full.            |

Then apply Armor → Guard → Harm as normal.

Gambits apply. The combat gambit list is the menu: Push the attacker back, Cover yourself, Read a weakness, find an exit. Open clause for anything of similar scope. A banked die from Setup can be added post-roll.

**Multiple attackers:** Defend separately against each. The GM may combine identical mooks into one roll at combined damage.

### Combat Gambits

Seven verbs. Every player has access to these. On combat rolls, this is the list. On defense and other stakes rolls, it's a menu of known options alongside stakes gambits. Character gambits (from Edges, equipment, backgrounds) add capabilities the base list can't express.

Sacrifice a die showing **4+** for a standard gambit. Sacrifice a die showing **6+** for a strong gambit. On d6 pool dice, only a 6 qualifies. Weapon dice (d8, d10, d12) can roll higher, making heavier weapons better gambit fuel.

| Gambit    | Standard (4-5)                                                                                                                                                       | Strong (6)                                               |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| **Push**  | Push target one range band.                                                                                                                                          | Push + **Prone.**                                        |
| **Pull**  | Pull target one range band toward you.                                                                                                                               | Pull + **Boon** on your next action against them.        |
| **Pin**   | **Pinned.** Can't reposition. Act to escape.                                                                                                                         | Pinned + can't attack. **Act + Move** to escape.         |
| **Read**  | **Detail.** Learn one hidden thing.                                                                                                                                  | Detail + **Boon** from what you learned.                 |
| **Break** | **Impaired.** Target deals -2 damage, one turn.                                                                                                                      | **Exposed.** Target takes +2 damage, one turn.           |
| **Cover** | **+1 Armor** until you move.                                                                                                                                         | **+2 Armor** until you move.                             |
| **Setup** | **Bank the die** (keep its value) for yourself or an **ally.** Add to any roll post-roll or spend on a gambit. One banked die max per person. Gone at end of combat. | Bank for yourself **and** an ally. Same value, two dice. |

**Plus the open clause:** anything of similar scope. You describe it, GM approves.

**Banked dice timing.** A banked die is not in the pool. Build pool (weapon + Boons + Drain), apply Snags, roll, then choose to add the banked die to your results. Snags can't remove what isn't there yet. The banked die is always guaranteed.

**Gambit resistance.** Strong gambits go through at any Threat level. Standard gambits land on Threat 0-1 enemies. Threat 2+ enemies resist standard gambits *that target them* unless the fiction justifies it. If resisted, the die is still spent. The gambit fails but doesn't revert to damage. Gambits that target you (Cover, Setup) or the environment always land.

> **When does fiction justify it?** The question is: could your character plausibly do this while doing what they're already doing?
>
> **Good:** A sniper Reads from a rooftop. She's watching through a scope, observation is the whole approach. A brawler Pushes while throwing a haymaker. The shove is built into the swing. A soldier Covers behind a flipped table. He's already near it and the flip is one motion.
>
> **Bad:** A knife-fighter Reads an enemy's thaumic signature. Nothing in the fiction gives him that information. A character at Far range Pins someone. You can't pin from across a field. A character Breaks an enemy's weapon by shooting it. Stylish, but Break means compromised form, not trick shots.

### Positioning

Three abstract ranges. Relative to entities, not a grid.

| Range     | Scale                                           |
| --------- | ----------------------------------------------- |
| **Close** | Arms' reach. Melee, grappling.                  |
| **Near**  | Across a room. Pistol range, thrown objects.    |
| **Far**   | Across a field. Rifle range, rooftop to street. |

**Cover:** Partial +1 Armor, Full +2 Armor, ranged attacks only. Melee ignores cover. A barricade at Close is an obstacle (costs Move to get around), not cover. Strong Gambits can destroy cover.

**Flanking:** Two allies at Close from different angles. Both get a Boon. Breaks when the target moves.

**Grappling:** A stakes roll at Close. Grit to hold, Sharp to escape, Nerve to resist. The GM sets stakes. It's not a special system.

***

## Weapons & Gear

| Category    | Die | Examples                                        |
| ----------- | --- | ----------------------------------------------- |
| Light       | d6  | Fists, knife, bottle, pool cue, brass knuckles  |
| Standard    | d8  | Pistol, machete, baseball bat, rifle            |
| Heavy       | d10 | Shotgun, sledgehammer, high-caliber             |
| Devastating | d12 | Vehicle ram, explosion, major thaumic discharge |

**Properties** change how a weapon interacts with positioning and combat. They stack.

| Property         | Effect                                                                                                                      |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Ranged**       | Attacks at Near and Far. Snag at Close.                                                                                     |
| **Sidearm**      | Attacks at Close and Near. Snag at Far.                                                                                     |
| **Thrown**       | Adds Near to the weapon's ranges. Single target. Lost unless recovered.                                                     |
| **Area (range)** | Hits all targets within the stated range of the impact point. Roll once, apply to each. At Close range, you're in the area. |
| **Long**         | Attacks at Close and Near. Boon at Near vs Close-only attacker.                                                             |
| **Loud**         | Heard at Far. Ticks attention/heat clocks.                                                                                  |
| **Brutal**       | +2 overflow when damage breaks Guard. Heavy weapons wreck what's behind the defense.                                        |
| **Subtle**       | Concealable. Drawing doesn't raise alarms.                                                                                  |
| **Slow**         | Cannot attack and Move in the same turn.                                                                                    |

**Area adjudication.** You aim at a group or point, not a specific target. The GM declares who's within the Area range based on the fiction. Area (Close) is a tight cluster. Area (Near) is a room. Area (Far) is a building or block. The throw auto-lands; if placement is difficult (through a window, into a moving vehicle), the GM calls for a stakes roll. Gambits from Area attacks target one enemy of your choice in the blast.

Full weapon catalog in `rules/EQUIPMENT.md`.

### Common Area Weapons

Single-use. Use your Act, spend the item.

| Item              | Die | Properties                         | Damage     | Effect                                                    |
| ----------------- | --- | ---------------------------------- | ---------- | --------------------------------------------------------- |
| Flashbang         | —   | Thrown, Area (Close), Loud         | —          | Enemies: Impaired. PCs: Sharp save or Impaired.           |
| Smoke grenade     | —   | Thrown, Area (Close)               | —          | Breaks line of sight until end of next round              |
| Molotov           | d6  | Thrown, Area (Close), Loud         | Per target | Sustained d6 fire                                         |
| Frag grenade      | d8  | Thrown, Area (Close), Loud, Brutal | Per target | —                                                         |
| Concussion charge | —   | Thrown, Area (Close), Loud         | —          | Enemies: lose next Act. PCs: Nerve save or lose next Act. |

### Sustained Effects

Some damage keeps going: fire, acid, thaumic bleed, psychic intrusion. The GM assigns a die based on severity: d4 (embers, minor splash), d6 (molotov, chemical burn), d8 (industrial fire, concentrated acid), d10 (catastrophic, unbound entity contact). At the start of your turn, roll the die. That's damage through the normal pipeline. On a 1, it burns out on its own. Otherwise, the fiction decides how you end it: spend your Act (smother flames, scrape off acid), spend your Move (get out of the reactor, break line of sight), or make a save if the source demands it (Nerve save to look away from the deep one, Grit save to push through the radiation).

You don't want this continuing. Spend your Act, your Move, or make a save. Whatever the fiction demands to end it.

Multiple sustained effects each roll separately. One Act clears one effect.

**Enemies burn too.** When an enemy is affected, the player who caused it rolls the die at the start of that enemy's turn. Armor reduces it as normal.

### Consumables

Single-use items applied to yourself or someone at Close. Use your Act, spend the item. See `rules/EQUIPMENT.md` for the full catalog.

***

## Enemies

The GM never rolls dice. Enemies are static profiles that act through fiction and flat numbers.

* **Threat** (0-3): Snags on player defense rolls

* **Damage**: Flat damage dealt on the GM's turn

* **Guard**: Buffer against player attacks. When it hits 0, the enemy is **Staggered**

* **Armor** (0-3): Flat damage reduction

* **Harm Threshold**: How much damage past Guard before they're out

* **Morale** (yes/no): Can they break?

* **Behavior:** Priority list for GM decisions

Enemies get Move + Act like PCs. The Behavior line tells the GM how to use them.

### Taking Damage

Player damage → subtract Armor → subtract Guard. When Guard hits 0: enemy is **Staggered** (fighting hurt, losing composure). Damage past Guard accumulates as Harm.

When Harm reaches the enemy's **Harm Threshold**, they're **out**: dead, incapacitated, fled, or surrendered. The fiction and the killing blow determine which.

No wound levels. Enemies are up, Staggered, or out. Gambits can impose conditions (Impaired, Exposed, Prone, Pinned) that last one turn or until cleared. See Enemy Conditions.

### Threat Levels

| Threat        | Defense Snag | Profile                              | Examples                                     |
| ------------- | ------------ | ------------------------------------ | -------------------------------------------- |
| 0 (Mook)      | None         | Low Guard, low damage, threshold 1-2 | Untrained, panicked, civilian                |
| 1 (Tough)     | -1d          | Moderate Guard, trained              | Soldiers, agents, experienced fighters       |
| 2 (Dangerous) | -2d          | High Guard, high damage              | Elite operators, enhanced, tactical teams    |
| 3 (Lethal)    | -3d          | Massive Guard, devastating damage    | Apex predators, war machines, major entities |

Threat only affects defense. It does not change how enemies take damage.

### Morale

When an enemy is Staggered or half their group is down, the GM checks Behavior. This is a judgment call, not a roll. Most enemies break: flee, surrender, negotiate. Only fanatics, cornered animals, and entities fight to the death. When in doubt, they run.

### Behavior

A priority list that tells the GM what an enemy does. Reduces cognitive load.

> *"Enforcer: Close distance, target isolated PC, fall back if Staggered."*

### Example Stat Blocks

**Street Tough**
Threat 0 | Damage 3 | Guard 2 | Harm 2 | Armor 0 | Morale: yes
Behavior: Threaten first. Flee if Staggered. Won't fight alone.

**DPA Field Agent**
Threat 1 | Damage 4 | Guard 5 | Harm 4 | Armor 1 | Morale: yes
Behavior: Contain and call backup. Withdraw if outgunned. Never engages a confirmed shaper alone.

**CSS Kill-Team Operator**
Threat 2 | Damage 6 | Guard 6 | Harm 6 | Armor 2 | Morale: yes (command signal only)
Behavior: Eliminate primary target. Suppress others. Will not break or flee independently. Retreats only on command signal from handler.

**Unbound Thaumic Entity**
Threat 3 | Damage 8 | Guard 8 | Harm 10 | Armor 0 | Morale: no
Behavior: Drawn to highest BTC source. Passes through mundane obstacles. Retreats from sustained suppression. Does not negotiate.

***

## Clocks

### Danger Clocks

Fights don't stay static. A **Danger Clock** is a circle divided into segments (4, 6, or 8). At the end of each round, tick 1 segment. When it fills, something bad happens:

* Reinforcements arrive

* The structure collapses

* Authorities respond

* An enemy activates something dangerous

The GM reveals the clock and its consequence at the start of combat. Players can see the countdown. Specific events may tick extra segments.

### General Clocks

Clocks track any complex situation with measurable progress:

* **Healing clock:** fill to recover from Wounded/Critical

* **Investigation clock:** piece together a mystery

* **Heat clock:** unwanted attention accumulates

* **Project clock:** long-term goals (build a device, establish a safehouse)

**Segments:** 4 (straightforward), 6 (complex), 8 (daunting).

**Ticking from rolls:** Full success = 2 ticks. Partial = 1. Consequences may tick enemy or threat clocks instead.

Clocks are visible to all players. No hidden progress.

***

## Work a Lead

When players have something concrete to go on, they can **Work a Lead**. A lead is a name, an address, a document, a device, a contact, a rumor, a thaumic signature. Something specific that points somewhere.

The player names the lead. The GM states what working it costs: time, exposure, risk. Then the player rolls.

**Stat from fiction:** Sharp (analyze, search, connect dots), Nerve (lean on contacts, bluff past a desk clerk), Grit (stake out, dig through wreckage, endure a hostile source).

| Highest Die | Result                                                   |
| ----------- | -------------------------------------------------------- |
| **6**       | Clear answer. Ask a follow-up question for free.         |
| **4-5**     | You get it, but: incomplete, costly, or someone noticed. |
| **1-3**     | Dead end, wrong conclusion, or the GM makes a move.      |

Background applies if the domain is even adjacent. Knacks fire if the obsession intersects. Thaumatech can open leads that don't exist for mundanes: a scanner reads residue, a tap plays back a conversation, a tracer follows a signature.

No lead? No roll. Either the PC already knows (Background, Knack, common knowledge) or they need to find a lead first. That's a scene, not a mechanic.

### Projects

When the answer is too big for one lead: mapping a conspiracy, tracing a supply chain, decoding a dead language. The GM starts a **clock** (4, 6, or 8 segments). Each lead ticks it: 1 on a partial, 2 on a full. When full, the PC gets the full picture.

Each lead costs time and may carry its own stakes. A partial might tick the clock *and* alert someone.

***

## Group Checks

When the whole group faces something together, use a **Group Check**.

### Weakest Link

In a **Weakest Link** check, everyone rolls. The **worst result** is the group result.

**Cover:** Before rolling, a PC can cover for someone who'd be the weak link. The covering PC takes a **Snag**. The covered PC skips, folded into the cover. One cover per PC, must be plausible in fiction.

Use for: sneaking past a checkpoint, crossing a collapsing bridge, talking through a DPA sweep.

### Group Effort

In a **Group Effort**, everyone rolls individually. The GM sets a **clock** (4, 6, or 8). Each roll ticks it: 1 on a partial, 2 on a full. A miss ticks nothing and may trigger a complication. When full, the group succeeds.

If the clock isn't full after everyone rolls, the GM decides: another round (with escalating stakes) or partial success based on progress.

Use for: searching a building, fortifying a position, fleeing through a crowd, performing a group ritual.

***

## Quick Reference

### Stakes Roll

Roll \[stat]d6, read highest. 6 = full, 4-5 = partial, 1-3 = consequence.

### Stats

Grit (body), Sharp (senses), Nerve (will). Rated 1-4. Sum = 6.

### Modifiers

Boon = +1d. Snag = -1d. Cancel 1-for-1. Min 0d (2d6 take lowest). On attacks: Snags remove bonus dice first, then weapon die. 0d = 2d6 take lowest, both dice spendable for Gambits.

### Two Roll Types

**Combat roll:** weapon die, deal damage, combat gambit list. **Stakes roll:** stat die, everything else (defense, saves, social, exploration, third lane in combat). Stakes gambits: sacrifice 4+ to name a side effect (6 = strong). Combat gambit list available as menu on defense. Setup crosses both.

### Guard & Drain

Guard = 2 + highest stat (cap 10). Recovers in genuine safety. Drain = 4 boxes (+1d before rolling, act while Critical, thaumatech stakes). Crack when empty = Snag on all rolls.

### Damage Pipeline

Damage → Armor → Guard → overflow = Harm. Guard hits 0 = Scar (+1 max Guard, once/session).

### Harm

L1 Hurt (Snag when relevant), L2 Wounded (Snag all), L3 Critical (Drain to act). Overflow: 1-2 = L1, 3-4 = L2, 5+ = L3.

### Recovery & Healing

Hurt: clears after scene, or bandage kit (1 Act). Wounded: healing clock (4 segments), treatment roll ticks it (full = 2, partial = 1). Critical: healing clock (6 segments, drops to Wounded), needs Edge/Background to treat. Consumable = 1 Act, auto (stim: 3 Guard; stabilizer: Boon cancels wound Snag). Treatment = stakes roll, gear gives Boon, 1 attempt per patient per scene. Thaumatech device = treatment roll + Drain (GM sizes cost). Trauma station treats Critical without Edge. Thauma-pharmaceuticals need ambient magic; devices need operator Drain. Drain: narrative downtime only. Cracks: narrative moments only. Catalog in `rules/EQUIPMENT.md`.

### Conditions

PC: Stunned (can't act, 0d defense), Shaken (Snag all, clears end of scene), Prone (stand costs Move, melee attacks by you get Snag).
Enemy: Impaired (-2 damage, one turn), Exposed (+2 damage taken, one turn), Prone, Pinned (Act to escape), Staggered (Guard broke, Morale check).

### Enemies

GM never rolls. Static profiles: Threat (defense Snags 0-3), Damage (flat), Guard (buffer), Harm Threshold (damage past Guard to drop), Armor, Morale. Guard breaks = Staggered (Morale check). Harm fills = out.

### Positioning

Close (melee), Near (room), Far (field). Move = one band. Cover: partial +1, full +2 Armor (ranged only). Flanking = Boon. Setup phase = stat roll before round 1 (6 = Boon, 1-3 = complication, gambits apply). Ambush = stakes roll, skips setup.

### Combat Roll (Attacking)

Auto-hit. Roll weapon die (+ Boon d6s + Drain d6). Sacrifice 4+ for gambits. Highest remaining = damage. 0d = 2d6 take lowest, both dice spendable.

### Stakes Roll (Defense)

Roll \[stat]d6. 6 = none, 4-5 = half, 1-3 = full damage. Threat imposes Snags (0 to -3d). Combat gambit list as menu + stakes gambits. Banked die from Setup adds post-roll.

### Stakes Gambit Prompts

Forcing: cover, block, control approach. Talking: read a tell, plant idea, create alibi. Reading: spot detail, connect facts, anticipate. Working an angle: lift, plant, false trail, time a pattern.

### Combat Gambits

Sacrifice 4+ = standard, 6+ = strong (weapon dice count). Push (one band / Strong: + Prone), Pull (one band toward / Strong: + Boon), Pin (can't move, Act to escape / Strong: Act + Move), Read (detail / Strong: + Boon), Break (Impaired -2 dmg / Strong: Exposed +2 dmg taken), Cover (+1 Armor / Strong: +2), Setup (bank for self or ally, post-roll / Strong: self AND ally). Open clause: similar scope, GM approves. Banked dice added post-roll, immune to Snags. Strong through all Threat.

### Weapons

d6 light, d8 standard, d10 heavy, d12 devastating. Properties: Ranged, Sidearm, Thrown, Area (range), Long, Loud, Brutal, Subtle, Slow.

***

