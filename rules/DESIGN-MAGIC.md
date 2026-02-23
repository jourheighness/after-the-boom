# MONDAS Magic Design Principles

This document records the design decisions, rationale, and philosophy behind the magic system. The rules themselves live in `rules/MAGIC.md`. This is the "why" behind the "what."

---

## Design Philosophy

**Obsession + Tell vs. spell list:** Spell lists create optimization puzzles. Obsession + Tell grounds magic in character identity. Drain, Stakes, and scope constrain power; the Tell constrains approach.

**Tell limitations:** Limitations create gameplay. "We need stealth but my Tell is singing" is a scene. Tells can be identified and countered, making shapers dangerous to be, not just to face.

**Three innate costs (Guard in stakes, heat clock, escalated stakes):** Each creates a different pressure: survival cost, accumulating attention, narrative weight. Together they make every cast a genuine decision. Shaping Gambits add a fourth pressure: the choice to trade effect quality for operational control. Push adds a fifth: the same 4-box track fuels combat, shaping, and survival. Every Push spent on a shaping roll is one fewer for dodging bullets.

**Break is innate-only:** Thaumatech exists to prevent Breaks. The device is the safety valve. Device fails catastrophically, the device breaks. Shaper fails catastrophically, the person breaks.

**Bargains:** Player choice that Stakes alone don't cover. Stakes are roll-dependent. Bargains are guaranteed. Accepting a Bargain is a character moment, not math.

**Four-tier spectrum:** "Mundane or mage" is a binary that doesn't match the world. Knacks give magical identity without breaking low-magic. Sparked adds one controlled expression with real costs. Progression from Knack through Sparked to Shaper is a character arc gated by narrative events (Break), not build choices.

**Channels over classes:** Pact-makers, oath-swearers, faith-holders, bloodline carriers, and academic shapers all use the same Knack → Sparked → Shaper ladder. The channel is the fictional lens, not a mechanical subsystem. This lets patron characters, oath characters, and devotion characters emerge from play without requiring separate class mechanics. Channel loss produces a Temporary Edge (pending decision), not a punishment. The obsession survives the channel.

---

## Design Principles Index

- **P3, P7 (Device failure):** Dangerous gear means dangerous consequences. The world responds to thaumic violence.
- **P10 (Spectrum):** Every tier has something to contribute in every scene.
- **P12 (Innate magic):** Guard cost in stakes, heat clock, escalated stakes, Tell limitations, shaping Gambits. All fictional events and real tactical choices, not abstract resource management.
- **P13 (Drain):** No drain track. Guard cost lives in the GM's stakes. Push is the same 4-box track used for everything else. No separate magic resource.
- **P6 (Sustained):** Sustaining creates a real tactical choice: keep the ward up or fight back?
- **P3, P9, P12 (Break):** Desperate, cinematic, narrative-embedded. Structure for the moment, not routine use.

---

## Design Decisions

### WS3: Magic & Drain

| # | Decision | Answer | Laws |
|-|-|-|-|
| D5 | Magic cost model | Drain = Guard. No separate track. Overflow to Harm. | P13, P17 |
| D6 | Thaumatech vs Innate | Different risk profiles on the same roll chassis. Thaumatech: base use free (roll stat), Push for +1d. Innate: standard roll, Guard cost in stakes, Tell mandatory, Heat ticks, escalated stakes. | P10, P12 |
| D7 | How shaping works | Free-form within obsession scope, constrained by Tell. Standard roll, Guard cost in GM's stakes. Shaping Gambits for tactical layer. | P2, P16 |
| ~~D25~~ | ~~Nerve caps shaping~~ | **Superseded by D55.** Shaping stat from fiction. No Nerve cap. | |
| ~~D26~~ | ~~Device overcharge stat~~ | **Superseded by D58.** Push is universal +1d. No separate overcharge. | |
| ~~D27~~ | ~~Nerve god-stat mitigation~~ | **Superseded by D55.** No longer relevant. All stats valid for shaping. | |
| - | Thaumic Spectrum | Four tiers (Mundane, Knack, Sparked, Shaper) as Edge chain. Obsession-based. | P10, P17 |
| - | Obsession & Tell | Scope from character obsession, not a list. Tell = technique + vulnerability. | P14, P17 |
| - | Contact plate system | Personal thaumatech through contact plates. Positives only. Grid thauma-ware has switches, anyone operates. | P10, P17 |
| - | Time/odds trade | Extra time = Boon (fictional, GM grants). Not a separate mechanic. | P15 |
| D58 | Push consolidation | Push is universal +1d across all rolls. One per roll from 4-box track. Replaces overcharge-costs-Guard and careful-channeling-for-Boon. | P12, P15 |
| - | Thaumic Bargains | GM offers free +1d for guaranteed consequence. Player can refuse. | P2 |
| - | Heat clock | Subtle 1, Overt 2, Undeniable 3. Thaumatech 0. GM-tracked, table-visible. | P12 |
| - | Sustained effects | Costs Act each round. Nerve save to maintain when hit. | P6 |
| - | Break mechanic | Innate only. Guaranteed success, no roll. Min L2 Harm + Mark + session KO. Death possible. | P3, P9, P12 |
| - | Device failure | Through Stakes, not separate degradation. Scales with gear danger. | P7, P13 |
| - | Spectrum ceiling | GM decides before campaign. Default: knacks only. | P3, P10 |
| D57 | Thaumic Channels | Five channels (Innate, Bestowed, Sworn, Inherited, Learned). Same mechanics, different fiction and Break consequences. Channel loss produces Temporary Edge. | P10, P14, P17 |

### Open Questions

- **WS6 (Equipment):** Thaumatech device catalog. Rated outputs, device-specific effects. See `rules/DESIGN-EQUIPMENT.md`.
