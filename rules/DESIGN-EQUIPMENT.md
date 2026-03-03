# MONDAS Equipment Design Principles

This document defines how to create equipment entries: weapons, armor, gear, and thaumatech devices. The catalogs in `rules/EQUIPMENT.md` are built from these principles. Follow every rule here before writing catalog entries.

***

## What Makes Good Equipment

Every equipment entry earns its place by creating a choice the player feels. A weapon that's strictly better than another weapon in the same category has failed. A piece of gear that every character would carry has failed. Equipment succeeds when it makes some characters more effective in some situations, at the cost of being less effective in others.

**The identity test:** Could you describe a character just from their loadout? A hunting rifle, binoculars, and a first-aid kit is a different person than a switchblade, lockpicks, and a pager. Equipment is character expression in object form.

**The trade-off test:** Every advantage has a cost. Loud weapons tick clocks. Heavy weapons prevent Move+Act. Subtle weapons do less damage. Thaumatech is detectable. If an item has no downside, add one or cut it.

***

## Weapon Design

Weapons use the dice categories from `rules/CORE.md`:

| Category             | Dice | Examples                                        |
| -------------------- | ---- | ----------------------------------------------- |
| Unarmed / Improvised | 1d4  | Fists, bottle, chair leg                        |
| Light                | 1d6  | Knife, baton, small pistol                      |
| Medium               | 1d8  | Sword, shotgun, rifle                           |
| Heavy                | 2d6  | Two-handed weapon, high-caliber                 |
| Devastating          | 2d8  | Vehicle ram, explosion, major thaumic discharge |

**Properties** (defined in `rules/CORE.md`) create tactical differentiation:

| Property | Effect                                                                |
| -------- | --------------------------------------------------------------------- |
| Ranged   | Attacks at Near and Far. Snag at Close.                               |
| Sidearm  | Attacks at Close and Near. Snag at Far.                               |
| Thrown   | Can attack at Near. Weapon is lost after the attack unless recovered. |
| Long     | Attacks at Close and Near. Boon at Near vs Close-only attacker.       |
| Loud     | Heard at Far. Ticks attention/heat clocks.                            |
| Brutal   | On a critical: damage = sum of two highest dice.                      |
| Subtle   | Concealable. Drawing doesn't raise alarms.                            |
| Slow     | Cannot attack and Move in the same turn.                              |

**Weapon gambits:** Each weapon carries 1-3 specific gambits listed on its entry. These are the weapon's personality. A crowbar pries doors. A blackjack knocks people out. A sawed-off fires both barrels. The gambit should emerge from what the weapon physically does, not from a design spreadsheet.

### Weapon Generation Rules

1. **Start with the object.** What is it? Where did it come from? Who carries one? The fiction determines the dice and properties.
2. **Assign dice category.** One category per weapon. If the object could arguably fit two categories, pick the one that matches its primary use on Mondas.
3. **Assign properties.** 0-3 properties per weapon. Most weapons have 1-2. More than 3 is a Swiss army knife, not a weapon.
4. **Write 1-3 gambits.** Each gambit: one die (4+ Standard, 8+ Strong), one effect. The effect should be something only this weapon can do. If any weapon could do it, it belongs in the base gambit list or a property-category list, not here.
5. **Name it like Mondas.** A pipe wrench, not a "steel mace." A discharge rod, not a "lightning wand." The name tells you where it came from and who uses it.

### The Weapon Test

Before finalizing a weapon entry, ask:

1. Does this weapon play differently from every other weapon in its dice category? If not, one of them is redundant.
2. Would a player choose this over a "better" weapon in some situations? If the answer is never, the weapon needs a niche.
3. Do the gambits flow from what the object physically does? If you have to stretch the fiction, the gambit belongs elsewhere.
4. Does the weapon feel like 1992 Mondas? If it feels like fantasy or sci-fi, rename it or cut it.

***

## Thaumatech Design

Thaumatech devices follow the rules in `rules/THAUMATECH.md`:

* **Personal thaumatech** operates through contact plates. Positives only. Detectable by sensitives (Close) and scanners (Near).

* **Grid-powered thauma-ware** uses buttons and switches. Anyone operates. Powered by the thaumic grid, not the user.

* **Base use is free.** Roll your stat as normal. The device enables the action. Push for +1d from Push track.

* **Device gambits cost Push.** GM sizes the cost from the fiction based on how far past rated function you're stretching. Auto-succeed.

* **Device risk.** GM declares a device at risk when quality vs. Push stretch warrants it. Roll 2d6, read highest. 6 = fine, 4-5 = breaks (repairable in downtime), 1-3 = catastrophic (breaks + feedback to user). Push the roll for +1d. Boons apply.

* **Quality is fictional positioning.** Determines when the GM calls for a risk roll, not a dice modifier. Military devices tolerate more stretch before risk. Jury-rigged devices are at risk sooner.

* **Gear is character.** Devices accumulate history through play. Repair is a downtime scene, not a replacement. Destruction is narrative only.

| Device Stat | Device Types                               | Examples                                           |
| ----------- | ------------------------------------------ | -------------------------------------------------- |
| Sharp       | Precision instruments, scanners, targeting | BTC scanner, signature reader, channeling rifle    |
| Nerve       | Channeling, wards, medical, control        | Ward projector, dampening field, field patch       |
| Grit        | Brute-force emitters, heavy hardware       | Heavy discharge rig, gravity clamp, reactive armor |

### Thaumatech Generation Rules

1. **Function first.** What does the device do? One function per device. A scanner scans. A ward wards.
2. **Assign device stat.** Which stat governs base use? Precision = Sharp. Sustained channeling = Nerve. Brute force = Grit.
3. **Write device gambits.** Each device gets 1-3 device gambits: binary capabilities that do things dice can't. These are the extraordinary uses that cost Push. The device gambit should answer: "What does this device do that saves the day?" A ward projector negates a hit. A discharge rod suppresses an entity. A field patch stabilizes a Critical injury. If the device gambit is just "+1d" or "a Boon," it's not worth Push. Make it categorical.
4. **Set quality tier.** Jury-rigged, Standard, or Military/Artisan. Quality determines when the GM calls for a device risk roll. Higher quality tolerates more Push stretch before risk triggers. This is fictional positioning, not a number.
5. **Name the manufacturer or origin.** Even a line. "Kessler-Brandt Model 7" or "CSS surplus, serial filed." Provenance is worldbuilding. Gear is character.
6. **Contact plate or grid?** Personal thaumatech has a plate (positives only, detectable). Grid-powered has switches (anyone, no detection). This is a meaningful choice.

***

## Armor Design

Armor is a flat number (0-3) subtracted from damage before it hits Guard.

| Value | Level         | Examples                                                   |
| ----- | ------------- | ---------------------------------------------------------- |
| 0     | No protection | Street clothes                                             |
| 1     | Light         | Padded coat, leather, minor ward                           |
| 2     | Moderate      | Tactical vest, reinforced gear, shielding charm            |
| 3     | Heavy         | Full ballistic plate, heavy plating. Rare and conspicuous. |

Heavy or conspicuous armor may impose Snags (Sharp for bulky gear, Nerve for looking like you expect a fight). Every point of Armor above 1 should have a social or tactical cost.

### Armor Generation Rules

1. **Armor value 0-3.** Most characters have 0-1. Armor 2 is serious equipment. Armor 3 is military hardware.
2. **Name the trade-off.** What does wearing this cost you? Mobility? Concealment? Social acceptance?
3. **Mundane or thaumatech?** Mundane armor is passive and invisible to scanners. Thaumatech armor has a contact plate, is detectable, and may have active effects but requires a positive operator.

***

## Gear Design

Gear enables gambits, provides passive benefits, or creates fictional permissions. The gear itself is the character's preparation made tangible.

Gear Gambits (defined in `rules/CORE.md`) fall into three categories:

| Category         | Gambits                         |
| ---------------- | ------------------------------- |
| Sensory Denial   | Flash, Obscure, Deafen, Mark    |
| Movement Control | Restrain, Slow, Barrier, Pull   |
| Disruption       | Overload, Redirect, Dampen, Jam |

### Gear Generation Rules

1. **One function.** A flashbang blinds. A smoke grenade obscures. A deadfield rod suppresses thaumatech. If the item does two things, it's two items.
2. **Consumed or recovered.** Grenades are consumed. Ropes are recovered. State which.
3. **Legality.** Would carrying this in public cause problems? See Legality tiers.
4. **Setting-authentic.** 1992 hardware. A zip tie, not a magic rope. A signal scrambler, not a "jammer crystal."

***

## Legality Tiers

Equipment on Mondas exists in a legal framework. What you carry says something about who you are and how much risk you're willing to accept.

| Tier             | Description                                                                                           | Examples                                                                                    | Consequence of Discovery                  |
| ---------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------- |
| **Legal**        | Available to civilians. No permit required.                                                           | Kitchen knife, flashlight, binoculars, hand tools                                           | None                                      |
| **Licensed**     | Legal with proper documentation. Background check or professional certification.                      | Hunting rifle, thaumatech scanner, medical supplies                                         | Fine, confiscation if unlicensed          |
| **Restricted**   | Law enforcement, military, or DPA personnel only. Civilians with these items are in serious trouble.  | Service pistol, tactical vest, ward projector, suppressed weapons                           | Arrest, federal charges                   |
| **Prohibited**   | Illegal for everyone outside classified programs. Possession is a felony.                             | Automatic weapons, military thaumatech, deadfield devices, unregistered personal thaumatech | Federal prison, DPA black site            |
| **Black Market** | Doesn't officially exist. Jury-rigged, stolen, or imported through channels that don't leave records. | Modified thaumatech, CSS surplus, bootleg devices                                           | Whatever the seller's competition decides |

Legality creates choices. A hunting rifle is legal but Loud. A suppressed pistol is quiet but Restricted. A thaumatech scanner is useful but Licensed and detectable. The loadout is also a statement about how the character relates to the law.

***

## Design Decisions

These decisions are canonical. They are recorded in the Master Decision Log in `rules/DESIGN.md`.

| #   | Decision          | Answer                                                             | Laws    |
| --- | ----------------- | ------------------------------------------------------------------ | ------- |
| D10 | Weapon properties | 8 tags. Assigned per weapon in this catalog.                       | P6, P17 |
| D14 | Gear Gambits      | 12 gear-unlocked Gambits across 3 categories. Mundane and thaumic. | P6, P17 |
| D23 | Weapon Gambits    | Each weapon carries 1-3 specific Gambits.                          | P6, P17 |

### Open Questions

* Thaumatech device catalog: individual entries with device stats, device gambits, and quality tiers.

* Black-market gear: pricing, availability, quality trade-offs. Better quality = fewer risk rolls = worth the felony.

* Ammunition tracking: abstract or counted? Current lean: abstract (you have it until the fiction says you don't).

* Currency and economy: how much things cost, whether money matters mechanically.

### Design Notes

**Why mundane and thaumatech in the same catalog:** Equipment is a loadout decision. A character choosing between a hunting rifle (mundane, legal, reliable, no signature) and a channeling rifle (thaumatech, restricted, detectable, Push-compatible) needs to see both options in the same place. Splitting them by power source would hide the comparison.

**Why weapon gambits live on weapons, not in GAMBITS.md:** Weapon gambits are the weapon's identity. A crowbar without "Pry Open" is just a medium weapon. The gambit is inseparable from the object. Property-category and defensive gambits, which apply across many weapons, live in `rules/GAMBITS.md`.

**Why legality matters:** Gear choices in most TTRPGs are purely tactical. On Mondas, carrying a restricted weapon is a character statement. It means you've decided the law doesn't apply to you, or that the law already decided you don't matter. Legality makes the loadout scene a roleplaying moment, not a shopping trip.
