# MONDAS Character Creation Design Principles

This document records the design decisions and rationale behind character creation. The creation process itself lives in `rules/CHARACTER.md`. This is the "why" behind the "what."

***

## Design Philosophy

**Background vs. Edges:** Backgrounds are narrative identity. Edges are mechanical benefits. A factory electrician's Background gives Boons on electrical work. Their "Thaumatech Certified" Edge gives Boons on professional devices. Overlapping? Sometimes. But the Background is who you were. Edges are what you can do. Keeping them separate means a character's history always matters mechanically, and Edges don't have to carry narrative weight.

**Zero balance philosophy:** Zeroes get more breadth (4 Edges vs 3) and stealth (Thaumic Null). Positives get depth (thaumic access, magic system). This is asymmetric balance: zeroes aren't worse positives with compensation. They're a fundamentally different kind of character who excels in situations where thaumic potential is a liability. In a world of surveillance, being invisible is powerful.

**Fixed stats:** Stat growth creates convergence. Given enough time, every character hits 4/4/4 and differentiation collapses. Fixed stats mean your character's fundamental capabilities are set at creation. Growth comes from new options (Edges), resilience (Guard from Scars), and narrative change. A 1-Nerve character who faces their fears doesn't get Nerve 2. They get an Edge that reflects what they learned.

**Species as narrative:** Stat bonuses for species create optimization puzzles ("dwarf fighter for the Grit bonus") that undermine character-driven creation. On Mondas, being Displaced matters politically and socially, not mechanically. An elf doesn't get better senses. An elf gets processed at border checkpoints, tracked by federal databases, and welcomed by Displaced solidarity networks. That's more interesting than +1 Sharp.

**No XP, no levels:** Levels create power curves that break the grounded feel. A Level 10 character in a Level 1 world is a superhero. MONDAS characters get broader (more Edges), tougher (Guard growth), and more connected (Bonds), but they never outscale the world. A veteran with ten Scars and eight Edges still goes down to a well-placed rifle shot. That's the point.

***

## Design Decisions

### WS2: Character Creation

| #   | Decision                  | Answer                                                                                                                 | Laws          |
| --- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------- |
| D16 | Background system         | Universal Boon domain from one-sentence Background. GM confirms scope. Separate from Edges.                            | P2, P14       |
| D17 | Starting Guard            | 2 + highest stat (range 3-6). Guard reflects best survival instinct: toughness, reflexes, or composure.                | P13, P14, P15 |
| D18 | Stat permanence           | Stats fixed at creation. Growth through Edges, Scars, narrative. No convergence to max.                                | P14           |
| D19 | Species mechanics         | Purely narrative. No stat bonuses. Displaced face social systems, not mechanical ones.                                 | P17           |
| D20 | Zero/positive balance     | Zeroes: 4 Edges + Thaumic Null. Positives: 3 Edges + thaumic access. Asymmetric but viable.                            | P10, P17      |
| D21 | Progression model         | No XP, no levels. Edges earned through play (\~1 per 2-3 sessions). Guard growth from Scars. Bond evolution.           | P12, P14      |
| D22 | Contact plate restriction | Personal thaumatech requires positive operator. Contact plates draw thaumic potential from skin. Zeroes read as inert. | P10, P17      |
| D23 | Thaumic Null trait        | Zeroes invisible to thaumic detection, BTC scans, wards, thaumic targeting. Baseline trait, not an Edge.               | P10, P12      |

### Workstream Order

| WS  | Content            | Status                                                                 |
| --- | ------------------ | ---------------------------------------------------------------------- |
| WS1 | Core Rules Engine  | Complete (`rules/CORE.md`)                                             |
| WS2 | Character Creation | Complete (`rules/CHARACTER.md`)                                        |
| WS3 | Magic & Drain      | Complete (`rules/MAGIC.md`)                                            |
| WS4 | Combat             | Complete (integrated into `rules/CORE.md`)                             |
| WS5 | Edges              | Principles: `rules/DESIGN-EDGES.md`. Catalog: `rules/EDGES.md`         |
| WS6 | Equipment          | Principles: `rules/DESIGN-EQUIPMENT.md`. Catalog: `rules/EQUIPMENT.md` |
| WS7 | Player Materials   | Pending                                                                |
| WS8 | Backgrounds        | Complete (`rules/BACKGROUNDS.md`, 194 entries)                         |

