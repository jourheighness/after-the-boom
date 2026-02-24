# MONDAS Gambit Design Principles

This document defines how gambits work beyond the base 15, and the rules for creating property-category, defensive, act replacement, and shaping gambits. The catalogs in `rules/GAMBITS.md` are built from these principles. Follow every rule here before writing catalog entries.

---

## Gambit Sources

Gambits come from three stacking sources: the 15 base gambits (in `rules/CORE.md`, available to everyone), weapon-specific gambits (on weapon entries in `rules/EQUIPMENT.md`), and the property-category and special gambits cataloged in `rules/GAMBITS.md`. Everything stacks. A knife that's Subtle gets: base gambits + knife weapon gambits + all Subtle-category gambits + all Melee-category gambits.

---

## What Makes a Good Gambit

A gambit is one die for one effect. The effect is specific, immediate, and resolved at the table in one sentence. If the GM has to make three rulings to resolve a gambit, it's too complicated. If the gambit is "something good happens," it's too vague.

**Gambits never deal damage.** Damage comes from weapon dice. Gambits change the situation: positioning, status effects, battlefield control, information, influence. Shove, trip, suppress, blind, pin, conceal, stall. Never "+1 damage" or "+2 damage." If a player wants to deal more damage, they keep more dice. If they want to change the fight, they sacrifice dice for gambits. That's the trade. No hybrid. This applies to all gambit sources: base, weapon-specific, property-category, defensive, device, and shaping gambits.

**The sacrifice test:** Would a player agonize over whether to sacrifice this die? If the gambit is so good that it's always worth the die, it's too strong. If it's never worth the die, it's pointless. The sweet spot is situational: devastating in the right moment, wasteful in the wrong one.

**The uniqueness test:** Does this gambit produce an effect that no other gambit produces? If it overlaps with a base gambit, it should be an Edge extension of that base gambit, not a new entry. If it overlaps with another property-category gambit, cut one.

**The fiction test:** Can you describe this gambit happening in a scene? "You sacrifice a die to apply a -1 penalty" is math. "You sacrifice a die to slam the stock into his chest and drive him into the wall" is a moment. Gambits should produce moments.

---

## Property-Category Gambit Rules

Property-category gambits are available to any weapon with that property. They represent what the property enables, not what a specific weapon does.

1. **One property, one gambit list.** Each property has 3-6 gambits that define what that property lets you do in a fight.
2. **Property gambits complement, not replace, base gambits.** A Ranged weapon still has access to all base gambits. The property adds options, not substitutions.
3. **Same cost structure.** Standard (4+) or Strong (8+). One die, one effect. Same resistance rules (Threat table in `rules/CORE.md`).
4. **Range restrictions match the property.** Ranged gambits work at Near/Far. Melee gambits work at Close. If a gambit breaks this, state the exception explicitly.

---

## Defensive Gambit Rules

Defensive gambits protect you instead of affecting the enemy. They're declared on your turn during your attack. The effect persists until the start of your next turn.

1. **Trade offense for defense.** You sacrifice a die from your attack roll. Less damage dealt, more protection received.
2. **Duration: until your next turn.** Not permanent, not per-round. One turn of protection.
3. **No stacking same-name defensive gambits.** You can use Parry and Guard Stance on the same turn (two different gambits), but not Parry twice.

---

## Act Replacement Rules

Act replacements give up your attack entirely for a specific effect. No dice rolled, no damage dealt.

1. **Replace the Act, not the Move.** You can still Move on your turn.
2. **The effect should be worth skipping an entire attack.** If the effect is comparable to a single sacrificed die, it should be a standard gambit, not an act replacement.
3. **Not a gambit cost.** You don't sacrifice a die. You skip your Act. Different economy.

---

## Shaping Gambit Rules

Shaping gambits are unlocked by the thaumic spectrum. Sparked characters get the base three. Shapers get the full list. Character-specific shaping gambits come from Shaper Edges.

1. **Trade effect for control.** The weapon user trades damage for battlefield effects. The shaper trades shaping quality for operational survival (hiding from the DPA, containing bleed, managing heat).
2. **Same die cost.** Sacrifice a die 4+ from your shaping roll.
3. **Shaping gambits don't appear on mundane or thaumatech rolls.** They require innate shaping. Thaumatech has its own gambits through gear and weapon entries.

---

## Extension Model

Edges and equipment extend the gambit system in three ways:

1. **New trigger.** Use a base gambit in a situation it doesn't normally cover. (An Edge that lets De-escalation work on machines.)
2. **Modified effect.** A base gambit does something additional or different. (A weapon gambit that turns Shove into Shove + Prone.)
3. **Changed threshold.** Reduce cost (4+ becomes free) or increase potency. (An Edge that makes Disarm count as Strong against a specific enemy type.)

Every extension must name which gambit it modifies. "This Edge grants an enhanced Shove" not "this Edge pushes enemies." If it doesn't reference a gambit by name, it's not a gambit extension. See `rules/DESIGN-EDGES.md`.

---

## Cost Structure

| Cost | Requirement | What It Buys |
|-|-|-|
| Standard (4+) | Die showing 4 or higher | One tactical effect. Resistance applies by Threat level. |
| Strong (8+) | Die showing 8 or higher (d8+ weapons only) | Greater effect. Works against any Threat level. |
| Act Replacement | Skip your attack | A specific effect worth an entire attack. |

## Potency (Fight Gambits Only)

| Stat | Potency |
|-|-|
| 1 | Reduced. Barely works. |
| 2 | Standard. Works as written. |
| 3+ | Enhanced. Ignore one Threat level of resistance. |

## Resistance (by Target Threat)

| Threat | Standard (4+) | Strong (8+) |
|-|-|-|
| 0 (Mook) | Full effect | Full + bonus |
| 1 (Tough) | Full effect | Full effect |
| 2 (Dangerous) | Reduced | Full effect |
| 3 (Lethal) | No effect (usually) | Full effect |

---

## Design Decisions

These decisions are canonical. They are recorded in the Master Decision Log in `rules/DESIGN.md`.

| # | Decision | Answer | Laws |
|-|-|-|-|
| D30 | Gambit sources | Three stacking layers: base (15) + weapon-specific + property-category. | P6, P9 |
| D34 | Gambit unification | Gambits extended to all rolls. 15 base across four output-based categories. | P6, P9, P15 |
| D41 | Four categories | Maneuver, Assess, Influence, Fight. By output type, not context. | P6, P15, P16 |
| D42 | Base list locked | 15 entries. Extensions must name which base gambit they modify. | P6, P14 |
| D15 | Gambit resistance | Explicit table by Threat level. Standard reduced at 2+, Strong always works. | P6 |
| D22 | Gambit potency | Stat from description sets potency. 1 = reduced, 2 = standard, 3+ = enhanced. | P2, P6, P14 |
| D36 | Crit = Strong Gambit | Double 6 grants one free Strong-tier Gambit. | P4, P6, P9 |

### Open Questions

- Property-category gambit catalog: full entries for all 9 weapon properties.
- Defensive gambit catalog: how many, which effects.
- Act replacement catalog: how many, threshold for "worth an attack."
- Thaumatech-specific gambits: should thaumatech weapons have their own property-like category? Current lean: thaumatech gambits live on individual device entries in `rules/EQUIPMENT.md`, same as weapon gambits.
- Shaping gambit extensions from Shaper Edges: how many character-specific gambits is too many? Current lean: 1-2 per Shaper Edge, tied to obsession.

### Design Notes

**Why gambits are split across three files:** Base gambits are part of the core rules engine (CORE.md) because every player needs them at every table. Weapon-specific gambits are part of equipment (EQUIPMENT.md) because they're inseparable from the weapon. Everything else — property-category, defensive, act replacement, shaping — lives in the catalog because it's the extended content that builds on the base.

**Why property-category gambits exist:** Weapon-specific gambits make each weapon unique. Property-category gambits make each weapon *type* unique. A knife and a switchblade are different weapons with different gambits, but they're both Subtle, so they share the Subtle category gambits. This creates a layer of tactical identity between "every weapon is the same" and "every weapon is a unique snowflake."

**Gambits are the convergence point:** Equipment defines available gambits (weapons, gear, properties). Edges modify how gambits work (extensions, new gambits). Magic unlocks shaping gambits (spectrum progression). Everything the player has — their loadout, their training, their thaumic tier — shows up at the table as choices about what to do with a die showing 4+. The gambit system is where all the character's investments pay off simultaneously.

**Shaping gambits as survival tools:** Combat gambits are aggressive — they change the battlefield. Shaping gambits are defensive — they manage the fallout of doing something dangerous. Muffle hides you. Anchor disguises your Tell. Contain suppresses the bleed. This is intentional. The shaper's tactical problem is not "how do I deal more damage" but "how do I use my power without the world ending me for it." The gambit system reflects this by offering operational survival tools, not bigger explosions.
