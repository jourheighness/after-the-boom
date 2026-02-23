# MONDAS Core Rules Design Principles

This document records the design decisions, rationale, and probability math behind the core rules engine. The rules themselves live in `rules/CORE.md`. This is the "why" behind the "what."

---

## Design Principles Index

Each principle tag (P1, P2, etc.) references the Design Laws in `rules/DESIGN.md`.

- **P1, P4 (The Roll):** Every roll produces a result. No "nothing happens" outcome. A consequence on 1-3 is a complication, not a dead end.
- **P2 (Stats):** Creativity rewarded by letting players choose approach, which determines stat. Bounded by fictional plausibility.
- **P2 (Boons):** Creativity Boons capped at 1 per roll to prevent description stacking.
- **P1, P6 (Stakes):** Stakes replace difficulty classes and position/effect. Raise the stakes / play safe trade gives agency over risk.
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

---

## Probability Reference (Core Roll)

| Pool | Consequence (1-3) | Partial (4-5) | Full (6) | Crit (6,6+) |
|-|-|-|-|-|
| 0d | 75% | 22% | 3% | 0% |
| 1d | 50% | 33% | 17% | 0% |
| 2d | 25% | 44% | 31% | 3% |
| 3d | 13% | 46% | 42% | 7% |
| 4d | 6% | 42% | 52% | 13% |
| 5d | 3% | 37% | 60% | 20% |

Sweet spot: **2d** (average stat). Partial success is the most common result. The game lives in "yes, but..."

---

## Design Decisions

### WS1: Core Rules

| # | Decision | Answer | Laws |
|-|-|-|-|
| D1 | Dice system | d6 pool for rolls; weapon dice for attacks | P4, P15, P16 |
| D2 | Who rolls | Player-facing only. No exceptions. | P11 |
| D3 | Action economy | Move + Act per turn; React on enemy turns; no initiative | P6, P11, P15 |
| D4 | Success granularity | Three tiers + critical (6 / 4-5 / 1-3 / double 6) | P1, P4 |
| - | Stat count | 3 (Grit, Sharp, Nerve), rated 1-4 | P14, P17 |
| - | Attack model | Auto-hit, weapon dice, Gambits for tactical choice | P4, P6, P9 |
| - | GM framing | Stakes (state consequences, raise the stakes / play safe trade) | P1, P2, P6 |
| - | Damage system | Guard buffer + 3-level Harm track + Scars | P3, P8, P12 |
| - | Tension mechanic | Danger Clocks (tick each round) | P3, P6 |
| - | Push resource | 4-box track, narrative recovery, Crack on empty | P12, P15 |

### WS4: Combat

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
| D24 | Social Gambits | 8 named social forms categorized across Influence, Assess, and Maneuver. Social applications of base Gambits, not a separate tier. | P1, P6 |

### Mesh Pass

| # | Decision | Answer | Laws |
|-|-|-|-|
| D28 | Saves | Roll specified stat, same table. Triggering effect defines consequence. Partial = reduced intensity. Threat does not impose Snags on saves. | P4, P15 |
| D29 | Conditions | Four named conditions (Stunned, Shaken, Prone, Staggered) with mechanical definitions. | P4, P6 |
| D30 | Gambit sources | Three stacking layers: base list (15), weapon-specific, property-category. | P6, P9 |
| D31 | Shaping effect output | Standard roll, not auto-hit. GM sets damage in stakes by scale. | P10, P16 |
| D32 | Tactics | Seven tactical options: Universal (4) and Trained (4, Edge required). | P6, P9 |
| D33 | Guard = highest stat | Guard from Grit+2 to 2+highest stat. All stat builds viable. | P13, P14 |
| D34 | Gambit unification | Gambits extended to all rolls. 15 base across four categories. | P6, P9, P15 |
| D35 | Potency as fighter identity | Description determines stat, stat determines potency. Same Gambit, different fighter. | P2, P6, P14 |
| D36 | Crit = Strong Gambit | Double 6 grants one free Strong-tier Gambit. | P4, P6, P9 |
| D37 | Strong + Enhanced stacking | Full effect plus additional fictional consequence. | P2, P6, P14 |
| D38 | Tactics split | Universal (instinct) vs Trained (Edge required). | P2, P6, P17 |
| D39 | Edges modify Gambits | Any Edge can modify a Gambit's trigger, effect, or threshold. | P2, P6, P14 |
| D40 | Edge design axes | Seven axes as forcing function against clustering. | P2, P14, P17 |
| D41 | Four Gambit categories | Maneuver, Assess, Influence, Fight. Organized by output type. | P6, P15, P16 |
| D42 | Base Gambit list locked | 4+3+3+5 = 15. Extensions must reference a base Gambit by name. | P6, P14 |
| D43 | Scene granularity | Scene is GM's framing unit. Consequence-before-roll eliminates disputes. | P1, P5, P15 |
| D44 | Background as Boon | Background directly → Boon without negotiation. Spotlight tool. | P2, P9, P15 |
| D45 | Ambush bypasses defense | No fictional basis to anticipate = no defense roll. | P4, P6, P9 |
| D46 | Unresolved threats → Clocks | Threat leaves unresolved = named Clock. Stall delays, Clock tracks. | P3, P9, P15 |
| D47 | Gambits as scene generation | Player Gambit choices surface the next scene. | P5, P9, P16 |
| D48 | Gambit spam = scene design signal | Multiple pressure points, not rules patches. | P9, P15, P17 |

### WS2: Character Creation

| # | Decision | Answer | Laws |
|-|-|-|-|
| D16 | Background system | Universal Boon domain from Background. Separate from Edges. | P2, P14 |
| D17 | Starting Guard | 2 + highest stat (range 3-6). | P13, P14, P15 |
| D18 | Stat permanence | Fixed at creation. No stat growth. | P14 |
| D19 | Species mechanics | Purely narrative. No stat bonuses. | P17 |
| D20 | Zero/positive balance | Zeroes: 4 Edges + Thaumic Null. Positives: 3 Edges + thaumic access. | P10, P17 |
| D21 | Progression model | No XP, no levels. Edges through play. Guard from Scars. | P12, P14 |

### WS5: Edges

| # | Decision | Answer | Laws |
|-|-|-|-|
| D51 | Edge width vs depth | No stat gates. Max one prereq, max three deep. Wide vs deep from player choice. | P2, P12, P14 |
| D52 | Chains replace stat gates | Stats shape odds, not options. Edge prereqs gate on play, not creation. | P2, P12, P14, P17 |
| D53 | Sparked replaces Sensitive | Sparked = doing, not just sensing. Tell originates here. 1 Guard base. | P2, P10, P12 |
| D54 | Break as Shaper gate | Narrative event, not mechanical prereq. Untapped Potential → Shaper or refusal. | P2, P12, P14 |
| D55 | Shaping stat from fiction | No Nerve cap. Stat matches approach. All builds shape. | P2, P14, P15 |
| D56 | Temporary Edges | Pending decisions with mechanical teeth. Resolution condition + two outcomes. | P2, P12, P15 |
| D57 | Shaping is a standard roll | No separate dice engine. GM sets Guard cost in stakes as consequence tiers. | P4, P14, P15 |
| D58 | Shaping Gambits | Sparked base (Muffle, Anchor, Contain) + Shaper full (Thread, Redirect, Siphon, Veil, Split). | P6, P9, P10 |
| D59 | Shaping scale tiers | Five tiers (Trivial/Moderate/Ambitious/Extreme/Beyond). Only Break transcends scope. | P1, P6, P15 |

---

## Workstream Status

- **WS1 (Core):** Complete. `rules/CORE.md`.
- **WS2 (Creation):** Complete. `rules/CHARACTER.md`.
- **WS3 (Magic):** Complete. `rules/MAGIC.md`.
- **WS4 (Combat):** Complete. Integrated into `rules/CORE.md`.
- **WS5 (Edges):** Principles complete. `rules/DESIGN-EDGES.md`. Catalog in progress. `rules/EDGES.md`.
- **WS6 (Equipment):** Principles complete. `rules/DESIGN-EQUIPMENT.md`. Catalog in progress. `rules/EQUIPMENT.md`.
- **WS7 (Player Materials):** Pending. Character sheet, reference cards, one-pagers.
- **WS8 (Backgrounds):** Complete. `rules/BACKGROUNDS.md` (194 entries).
