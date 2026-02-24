# MONDAS Gambit Catalog

## In Two Minutes

Gambits are the system's tactical layer. Any die showing 4+ can be sacrificed from any roll to buy a side effect. Your available gambits come from three stacking sources: the 15 base gambits (in `rules/CORE.md`), weapon-specific gambits (1 per weapon, in `rules/EQUIPMENT.md`), and the property-category and special gambits in this file.

Design principles and generation rules live in `rules/DESIGN-GAMBITS.md`. Read that before creating entries here.

---

## Base Gambits (Reference)

The 15 base gambits are defined and locked in `rules/CORE.md` (D42). Listed here for reference. Do not modify; changes go through CORE.md.

**Maneuver (4):** Position, Escape, Conceal, Stall
**Assess (3):** Gather, Read, Scout
**Influence (3):** Shift, Pressure, De-escalate
**Fight (5):** Shove, Trip, Disarm, Pin, Create Cover

See `rules/CORE.md` for full definitions and resistance rules.

### Social Applications

The base gambits work in social scenes. Same dice, same sacrifice. The fiction changes the flavor:

- **Pressure** becomes leveraging a deadline. **Shift** becomes persuasion. **De-escalate** becomes defusing tension.
- **Read** becomes reading body language. **Gather** becomes extracting information mid-conversation.
- **Stonewall** (Grit): you hold your position through something that should break it. **Endure** isn't separate; it's how Grit expresses any Maneuver gambit socially.

No separate social gambit list. The base 15 cover it. If a player describes a social effect that maps to a base gambit, it works.

### Improvised Gambits

Players can propose effects not on any list. The GM judges plausibility. The principle: one die, one tactical effect of similar weight to the base list. Examples: blind (throw dust, Snag on next action), destroy (target an object), distract (feint, ally gets Boon).

### Defensive Gambits

Sacrifice a die 4+ from your attack roll on your turn. The effect persists until your next turn. You're trading offense for protection.

*Catalog in progress.*

### Act Replacements

Replace your attack entirely for a specific effect. No dice rolled, no damage dealt. You can still Move. The effect should be worth skipping an entire attack.

*Catalog in progress.*

---

## Property-Category Gambits

Available to any weapon with the matching property. If the same gambit name appears on both a weapon entry and a property category, you have it once, not twice.

### Melee

Available to any weapon used at Close range (all melee weapons, plus Sidearm weapons at Close).

<!-- Catalog entries follow this format:
**[Name].** [Standard/Strong (8+)] [Effect.] [Range.] [Requirements if any.]
-->

*Catalog in progress. See `rules/archive/GAMBITS-v1.md` for draft entries pending redesign.*

### Ranged

Available to any weapon with the Ranged property.

*Catalog in progress.*

### Sidearm

Available to any weapon with the Sidearm property.

*Catalog in progress.*

### Subtle

Available to any weapon with the Subtle property.

*Catalog in progress.*

### Brutal

Available to any weapon with the Brutal property.

*Catalog in progress.*

### Long

Available to any weapon with the Long property.

*Catalog in progress.*

### Thrown

Available to any weapon with the Thrown property.

*Catalog in progress.*

### Loud

Available to any weapon with the Loud property.

*Catalog in progress.*

### Slow

Available to any weapon with the Slow property.

*Catalog in progress.*

---

## Defensive Gambits

Declared on your turn as part of your attack. Sacrifice a die 4+ as normal. The defensive effect persists until the start of your next turn.

*Catalog in progress.*

---

## Act Replacements

Replace your attack entirely. No dice rolled. You perform the action instead of attacking. You can still Move.

*Catalog in progress.*

---

## Shaping Gambits

### Sparked Base

Unlocked when a character takes a Sparked Edge. Available on desperate push rolls (standard shaping rolls).

**Muffle.** Reduce Heat ticks by 1 for this expression. You pulled the energy inward. The DPA scanner gets static instead of a spike.

**Anchor.** The Tell stays subtle. Observers need a Sharp roll to identify it as thaumic instead of mundane. You made the gesture look casual.

**Contain.** The bleed stays in your body instead of leaking into the environment. No flickering lights, no temperature drop, no ambient unease. The room stays normal. You feel it instead.

### Shaper Full

Unlocked at Shaper tier (requires Sparked + Break). Available in addition to the Sparked base gambits.

**Thread.** Sustain a previous shaping effect for one more round without spending your Act. You wove it into the current shaping.

**Redirect.** On a partial or consequence, choose where the thaumic side effect goes. It still happens, but you aim it. The backfire hits the empty hallway, not your ally.

**Siphon.** Recover 1 Guard from the ambient thaumic field. Only works in elevated-BTC environments. You took some back.

**Veil.** The shaping effect is invisible to mundane observers. Sensitives and scanners still detect it. You shaped the perception alongside the effect.

**Split.** Divide the effect across two targets at reduced intensity. One die, two outcomes, neither at full strength.

### Character-Specific Shaping Gambits

Granted by Shaper Edges. Each reflects the character's obsession, Tell, and relationship to the thaumic. Examples (not a catalog — these come from individual Edges):

- A fire shaper's Edge might grant **Banked Heat**: sacrifice a die to store the energy. Release next round as a free Boon on a fire-related roll.
- A structural shaper's Edge might extend **Redirect** to work on incoming physical attacks, not just thaumic side effects.
- A perception shaper's Edge might grant **Echo**: sacrifice a die to sense everything within Close range for one round, no line of sight required.

See `rules/DESIGN-EDGES.md` for Shaper Edge design rules.

---

## Quick Reference

### Gambit Sources (All Stack)

| Source | Where Defined | Available To |
|-|-|-|
| Base (15) | `rules/CORE.md` | Everyone, every roll |
| Weapon-specific (1 per weapon) | `rules/EQUIPMENT.md` | Anyone wielding that weapon |
| Property-category | This file | Any weapon with that property |
| Defensive | This file | Anyone attacking (trade offense for defense) |
| Act Replacements | This file | Anyone (replaces attack entirely) |
| Gear Gambits | `rules/EQUIPMENT.md` | Anyone carrying the gear |
| Sparked shaping (3) | This file | Sparked+ characters on shaping rolls |
| Shaper shaping (5) | This file | Shaper characters on shaping rolls |
| Edge-granted | `rules/DESIGN-EDGES.md` | Characters with the specific Edge |
