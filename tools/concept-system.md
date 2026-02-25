# MONDAS Concept System

## What This Is

A complete inventory of every named concept in the MONDAS TTRPG rules engine, organized for storage in a vector database with semantic search and explicit relations between concepts.

The system has ~130 concepts across three layers:
1. **Mechanics** - Named things players and GMs reference at the table (resources, conditions, actions, properties)
2. **Subsystems** - Named procedures and processes with defined steps (Setup Phase, Work a Lead, Damage Pipeline)
3. **Principles** - Systemic axioms and design laws that govern how mechanics interact (Fiction Determines Stat, Cost Must Hurt, Gambit Universality)

Each concept has: a unique name, a one-sentence definition, a type classification, and explicit relations to other concepts.

## Why These Three Layers

A rules engine isn't just nouns. "Guard" is meaningless without "Damage Pipeline" (which tells you when Guard matters) and "Cost Must Hurt" (which tells you WHY Guard costs are set where they are). Semantic search needs all three layers to answer questions like:

- "What happens when I take damage?" (follows the Damage Pipeline through Armor, Guard, Harm, Scar)
- "How does shaping work?" (connects Obsession, Scope Zones, Scale Tiers, Tell, Guard-as-cost, Heat Clock)
- "Why can't I just spam gambits?" (links to Cost Must Hurt, The Sacrifice Trade, Escalation, Gambit Resistance)

## Relation Types

| Relation | Meaning | Example |
|-|-|-|
| COSTS | Using A spends B | Drain COSTS Drain Track |
| PRODUCES | A creates/triggers B | Guard reaching 0 PRODUCES Scar |
| MODIFIES | A changes how B works | Boon MODIFIES The Roll |
| GATES | A is required for B | Sparked GATES Shaper |
| CONTAINS | A is a parent category of B | Harm CONTAINS Hurt, Wounded, Critical |
| OPPOSES | A and B cancel or counteract | Boon OPPOSES Snag |
| ENABLES | A makes B possible | Edge ENABLES Gambit Extension |
| GOVERNS | Principle A constrains mechanic B | No Dead Air GOVERNS The Roll |
| VARIANT_OF | A is the same concept in a different context | Defense VARIANT_OF Stakes Roll |

---

## Layer 1: Mechanics

### Stats (3)

| Name | Definition | Connects to |
|-|-|-|
| Grit | Stat (1-4): strength, toughness, endurance, physical presence. | The Roll, Fiction Determines Stat |
| Sharp | Stat (1-4): awareness, reflexes, precision, analytical thinking. | The Roll, Fiction Determines Stat |
| Nerve | Stat (1-4): willpower, composure, influence, courage. | The Roll, Fiction Determines Stat |

### Resources (5)

| Name | Definition | Connects to |
|-|-|-|
| Guard | Readiness buffer (2 + highest stat, cap 10). Not HP. Absorbs damage after Armor. Refreshes in genuine safety. | Damage Pipeline, Scar, Starting Guard, Recovery |
| Drain | Willpower track (4 boxes). Spend for: +1d any roll, -2 incoming damage, act while Critical, device gambits. | Crack, Device Gambit, Drain as Universal +1d |
| Armor | Flat damage reduction (0-3). First step of Damage Pipeline. Heavy armor may impose Snags. | Damage Pipeline, Cover (positioning) |
| Starting Guard | Derived stat: 2 + highest stat (range 3-6). | Guard, Character Creation |
| Harm Threshold | Enemy stat: damage accumulated past Guard before the enemy is out. | Staggered, Morale, Enemy stat blocks |

### Roll Modifiers (2)

| Name | Definition | Connects to |
|-|-|-|
| Boon | +1d to the pool. Sources: Background, Gear, creative approach, Assist, Edges, Flanking, Setup. | Snag (opposes), The Roll, Boon domain |
| Snag | -1d from the pool. Sources: injury, enemy Threat, environment, improvisation. On attacks, eats bonus dice first, then weapon die. | Boon (opposes), Threat, Zero Dice |

### Boon Sources (3)

| Name | Definition | Connects to |
|-|-|-|
| Boon domain | Background-derived area of expertise. When your Background applies, you get a Boon. | Background, Boon |
| Flanking | Two allies at Close from different angles. Both get a Boon. Breaks when target moves. | Boon, Close, Positioning |
| Assist | Spend your Act to give an ally a Boon on their next roll. Must be positioned to help. | Boon, Act |

### Range Bands (3)

| Name | Definition | Connects to |
|-|-|-|
| Close | Range band: arms' reach. Melee, grappling. | Move, Flanking, weapon properties |
| Near | Range band: across a room. Pistol range, thrown objects. | Move, Sidearm, Thrown |
| Far | Range band: across a field. Rifle range, rooftop to street. | Move, Ranged, Loud |

### Action Economy (2)

| Name | Definition | Connects to |
|-|-|-|
| Move | Action type: reposition one range band, or reposition at same range (behind cover, toward different target). | Close, Near, Far, Slow |
| Act | Action type: attack, use a device, interact with the environment, or Assist. | Assist, Device Gambit, Stunned |

### Weapon Properties (9)

| Name | Definition | Connects to |
|-|-|-|
| Ranged | Attacks at Near and Far. Snag at Close. | Close, Near, Far, Cover (positioning) |
| Sidearm | Attacks at Close and Near. Snag at Far. | Close, Near |
| Thrown | Adds Near to the weapon's ranges. Single target. Lost unless recovered. | Near |
| Area | Hits all targets within the stated range of the impact point. Roll once, apply to each. | Positioning, Gambits |
| Long | Attacks at Close and Near. Boon at Near vs Close-only attacker. | Close, Near, Boon |
| Loud | Heard at Far. Ticks attention/heat clocks. | Heat Clock, Escalation |
| Brutal | Weapon property. Open design question: previous crit-dependent effect removed. | (pending redesign) |
| Subtle | Concealable. Drawing doesn't raise alarms. | Stealth, social contexts |
| Slow | Cannot attack and Move in the same turn. | Move, Act |

### Harm Levels (3)

| Name | Definition | Connects to |
|-|-|-|
| Hurt | Harm Level 1 (overflow 1-2). Snag when the specific injury is directly relevant. Clears after the scene. | Harm, Snag, Damage Pipeline |
| Wounded | Harm Level 2 (overflow 3-4). Snag on ALL rolls. Requires treatment and downtime. | Harm, Snag, Healing Clock |
| Critical | Harm Level 3 (overflow 5+). Must spend Drain to act at all. Requires serious intervention. | Harm, Drain, Damage Pipeline |

### PC Conditions (3 + already confirmed)

Already confirmed: Stunned, Shaken, Prone. These are referenced via the confirmed list.

### Enemy Conditions (4)

| Name | Definition | Connects to |
|-|-|-|
| Impaired | Enemy condition: -2 damage dealt, one turn. Created by Break gambit (standard). | Break gambit, Enemy stat blocks |
| Exposed | Enemy condition: +2 damage taken, one turn. Created by Break gambit (strong). | Break gambit, Enemy stat blocks |
| Staggered | Enemy condition: Guard broke. Triggers Morale check. Most enemies break here. | Morale, Guard, Harm Threshold |
| Pinned | Enemy condition: can't reposition. Costs Act to escape (Strong: Act + Move). Created by Pin gambit. | Pin gambit, Act, Move |

### Combat Gambits (7 base verbs)

Already confirmed as a single concept "Gambit." The individual verbs:

| Name | Definition | Standard (4+) | Strong (6) |
|-|-|-|-|
| Push (gambit) | Force target one range band. | One band. | + Prone. |
| Pull (gambit) | Draw target toward you. | One band toward. | + Boon on next action against them. |
| Pin (gambit) | Immobilize target. | Can't reposition, Act to escape. | Act + Move to escape. |
| Read (gambit) | Learn hidden information. | One detail. | + Boon from what you learned. |
| Break (gambit) | Compromise target's capability or defense. | Impaired (-2 damage). | Exposed (+2 damage taken). |
| Cover (gambit) | Protect yourself. | +1 Armor until you move. | +2 Armor until you move. |
| Setup (gambit) | Bank a die for later use. | Bank for self or ally (one die, keeps its value, post-roll). | Bank for self AND ally. |

### Shaping Gambits (8 named)

| Name | Definition | Tier required | Connects to |
|-|-|-|-|
| Muffle | Reduce Heat ticks by 1 on this shaping. | Sparked | Heat Clock, Tell |
| Anchor | Tell stays subtle; observers need Sharp roll to notice. | Sparked | Tell, Exposure |
| Contain | Bleed stays in your body, not leaking out. | Sparked | Bleed, Detection |
| Thread | Sustain a previous shaping effect for one more round without spending Act. | Shaper | Sustained Effects, Act |
| Redirect | Choose where the thaumic side effect goes. | Shaper | Scope consequences, Shaping |
| Siphon | Recover 1 Guard in high-BTC areas. | Shaper | Guard, BTC |
| Veil | Invisible to mundane observers while shaping. | Shaper | Stealth, Shaping |
| Split | Divide shaping effect across two targets. | Shaper | Shaping, Scope |

### Clocks (5 types)

| Name | Definition | Connects to |
|-|-|-|
| Danger Clock | Combat urgency. 4/6/8 segments, ticks 1 per round end. When full, bad thing happens. Visible. | Escalation, Combat |
| Heat Clock | Thaumic attention tracker. Ticked by visible shaping, Loud weapons, public incidents. | Loud, Bleed, Muffle, Escalation |
| Healing Clock | Fill to recover from Wounded or Critical. | Wounded, Critical, Recovery |
| Investigation Clock | Piece together a mystery. Full success = 2 ticks, partial = 1. | Work a Lead |
| Project Clock | Long-term goal tracker. Each lead ticks it. When full, full picture. | Projects, Work a Lead |

### Magic Concepts (10)

| Name | Definition | Connects to |
|-|-|-|
| Thaumatech | Magic-technology device subsystem. Contact plates, rated function, device gambits. | Device Gambit, Contact Plates, Drain |
| Personal thaumatech | Contact-plate devices gated by thaumic tier. Zeroes can't operate them. | Contact Plates, Thaumic Null |
| Contact Plates | Skin-contact interface that reads thaumic potential. Positives only. | Personal thaumatech, Thaumic Null |
| Rated Function | What a device is built to do. Base use within rated function is free. | Device Gambit, Device Risk Roll |
| Device Risk Roll | 2d6 read highest when device pushed past spec. 6=fine, 4-5=breaks, 1-3=catastrophic. | Rated Function, Drain |
| Bleed | Involuntary thaumic leakage from Knack or shaping. Detectable. Never goes away. | Heat Clock, Contain, Detection |
| Thaumic Mark | Permanent change from a Break (physical, sensory, relational, or capability). Accumulates. | Break, Scar |
| Thaumic Null | Zero-tier trait: invisible to thaumic detection, scanners, wards, targeting. | Mundane, Personal thaumatech |
| Channel | How obsession connects to thaumic resonance: Innate, Bestowed, Sworn, Inherited, Learned. Same mechanics, different Break consequences. | Break, Tell, Obsession |
| Sustained Effects | Persisting thaumic effects cost Act each round. Nerve save if you take Harm while sustaining. | Act, Thread, Nerve |

### Character Concepts (4)

| Name | Definition | Connects to |
|-|-|-|
| Background | One sentence of pre-story life. Maps to a Boon domain for relevant rolls. | Boon domain, Boon |
| Bonds | 2-3 relationship sentences (1+ PC, 1+ NPC). Evolve through play. No mechanical triggers. | Character creation, narrative |
| Thaumic Null | (see Magic Concepts) | |
| Starting Guard | (see Resources) | |

### Enemy Mechanics (3)

| Name | Definition | Connects to |
|-|-|-|
| Threat | Enemy stat (0-3): imposes Snags on player defense rolls. Does NOT affect saves. | Snag, Defense, Gambit Resistance |
| Morale | GM judgment call when enemy is Staggered or half group is down. Most enemies break. | Staggered, Behavior |
| Behavior | Priority list on enemy stat block telling GM what enemy does. Reduces cognitive load. | Morale, Threat |

---

## Layer 2: Subsystems (Named Procedures)

These are multi-step processes with defined rules. They reference Layer 1 mechanics.

| Name | Definition | Steps/Rules | Connects to |
|-|-|-|-|
| The Roll | Core resolution: roll [stat]d6, read highest. 6=full, 4-5=partial, 1-3=consequence. | Stat selection, pool building, reading highest | Fiction Determines Stat, Boon, Snag |
| Combat Roll | Roll weapon die + Boon d6s + Drain d6. Auto-hit. Sacrifice 4+ for gambits. Highest remaining = damage. | Declare target, Drain, roll, sacrifice or keep, apply damage | Attacks Auto-Hit, Gambits, Damage Pipeline |
| Stakes Roll | Roll [stat]d6 for non-damage resolution. GM declares consequences beforehand. Includes defense, saves, social, investigation. | GM states stakes, player builds pool or backs off, roll, resolve | Stakes Before Rolling, Fiction Determines Stat |
| Defense | A stakes roll with fixed stakes: 6=none, 4-5=half damage, 1-3=full damage. Threat imposes Snags. | Pick stat from fiction, roll minus Threat Snags, apply result to incoming damage | Stakes Roll, Threat, Armor |
| Save | Roll specified stat against a triggered effect. Same table. Triggering effect defines consequences, not GM. Threat does NOT impose Snags on saves. | Effect names stat, roll, 6=resist, 4-5=reduced, 1-3=full effect | The Roll, Conditions |
| Damage Pipeline | Damage -> Armor -> Guard -> overflow = Harm. Guard hits 0 -> Scar. | Subtract Armor, subtract Guard, check for Scar trigger, calculate overflow, assign Harm level | Armor, Guard, Scar, Hurt, Wounded, Critical |
| Setup Phase | Pre-combat stat roll. 6=Boon on first attack, 4-5=positioned, 1-3=complication. Gambits apply. | Describe preparation, roll relevant stat, apply result | Boon, Gambits, Ambush |
| Ambush | Stakes roll replacing Setup Phase. Planned attacks from concealment. On hit: no defense on opening attack, enemies act last, or Boon. | Sharp roll to set up, on miss combat starts on enemy terms | Setup Phase, Stakes Roll |
| Work a Lead | Named investigation mechanic. PC has something concrete, names it, GM states cost, player rolls. No lead = no roll. | Name lead, GM states cost (time/exposure/risk), roll stat from fiction | Background, Knack, Project Clock |
| Projects | Clock-based long investigation. When the answer is too big for one lead. Each lead ticks the clock. | GM starts clock (4/6/8), each lead = 1 tick (partial) or 2 (full), when full = answer | Work a Lead, Project Clock |
| Weakest Link | Group check: everyone rolls, worst result is the group result. One PC can Cover (take Snag, covered PC skips). | Everyone rolls, take worst, optional cover mechanic | Snag, Group checks |
| Group Effort | Group check: everyone rolls individually, ticks a clock. Full=2, partial=1, miss=nothing+complication. | Set clock, everyone rolls, tally ticks, resolve | Clocks, Group checks |
| Gambit Resistance | Strong gambits land at any Threat. Standard gambits land on Threat 0-1. Threat 2+ resists standard gambits targeting them unless fiction justifies it. Self/environment gambits always land. | Check Threat level, check if gambit targets enemy, check if Strong, apply fiction test | Threat, Gambits, Strong/Standard distinction |
| Zero Dice (0d) | When pool drops below 1: roll 2d6 take lowest. On attacks, both dice are live for gambit sacrifice. | Roll 2d6, take lowest for result, but both available for gambits | Snag, Boon/Snag cancellation, Gambits |
| Dual Wielding | Roll both weapons' dice. Snag on defense until your next turn. | Declare both weapons, roll both dice, take Snag penalty | Weapons, Snag, Defense |
| Open Clause | Gambit safety valve: anything of similar scope to the base seven. Player describes, GM approves. | Player proposes effect, GM checks scope against base gambits, approve or veto | Gambits, Constrained Freedom |
| Device Gambit | Binary capability beyond rated function. Costs Drain (GM-sized from fiction). Auto-succeeds. Does things dice can't. | Declare action, GM sizes Drain cost, spend Drain, effect happens | Drain, Rated Function, Crack |
| Device Risk Roll | 2d6 read highest when device pushed past spec. 6=fine, 4-5=breaks (repairable), 1-3=catastrophic (breaks + bites). Can Drain for +1d. | GM declares risk, roll 2d6, read highest, apply result | Device Gambit, Drain, Thaumatech |
| Break (shaping) | Voluntary transcendence. Guaranteed success, no roll. Min L2 Harm, Thaumic Mark, days unconscious. Only way to exceed scope or reach Beyond tier. | Player declares Break, effect succeeds absolutely, apply consequences | Untapped Potential, Thaumic Mark, Shaper progression |

---

## Layer 3: Systemic Principles

These don't have a single mechanic. They're rules about rules, patterns that connect everything else. They answer "why" and "how" questions that pure mechanic lookups can't.

### Universal Axioms

| Name | Definition | Governs |
|-|-|-|
| Fiction Determines Stat | The player describes what they do. The description determines the stat. Different approach = different stat = different odds. | All rolls: combat defense, shaping, social, exploration |
| Attacks Auto-Hit | You never roll to see IF you connect. The roll determines how hard and what else happens. | All combat rolls, weapon interactions, damage math |
| Stakes Before Rolling | GM declares consequences for 4-5 and 1-3 before dice touch the table. Player can build pool, change approach, or back off. | All stakes rolls, shaping scale tiers, informed consent |
| Gambit Universality | Two axioms: (1) any roll, any context, sacrifice 4+ for a gambit; (2) any roll, any context, spend Drain for +1d. No exceptions. | Every roll in the game |
| Setup Crosses Both | Banked die moves between combat rolls and stakes rolls. No context. Just a die with a number. | Setup gambit, tactical bridge between roll types |
| Boon/Snag Cancellation | Cancel 1-for-1, only net applies. On attacks, Snags eat bonus dice first, then weapon die. Minimum 0d. | All modifier algebra |
| Drain as Universal +1d | One Drain box = +1d to any roll (before rolling), one per roll. Same box also does -2 damage, act while Critical, device gambits. | Drain economy, desperation math |

### The Sacrifice Trade

| Name | Definition | Governs |
|-|-|-|
| The Sacrifice Trade | THE core tactical decision: after rolling, keep dice for damage/result quality, or sacrifice them for guaranteed side effects (gambits). | Every attack, every roll with spare dice |
| Free Fuel | Spare dice below your highest don't affect the result. Gambit costs nothing. Natural reward for pool investment. | Pool building incentives, Boon stacking |
| Softening | Partial success (4-5). Spend a spare die to edit the consequence. Partial still lands, but you shaped it. | Consequence negotiation |
| The Bargain | Sacrifice your best die. Result drops a full tier. You grab something from the wreckage. GM matches scope of complication to scope of gain. | High-stakes gambit decisions, dramatic moments |

### Scope and Boundaries

| Name | Definition | Governs |
|-|-|-|
| Scope Zones | Shaper's obsession defines three zones: Core (approved, size the tier), Adjacent (stretching, +1 tier or +1 Guard), Outside (impossible without Break). | All shaping adjudication, magic flexibility |
| Scale Tiers | Five levels: Trivial (no roll, 1 Guard), Moderate (standard), Ambitious (steep cost, guaranteed side effects), Extreme (death on table), Beyond (Break only). | Shaping cost structure, GM language |
| Constrained Freedom | Free-form within boundaries. Obsession scope not spell lists. Background domains not skill lists. Open clause not unlimited gambits. | Magic system, backgrounds, gambit flexibility |
| Three Lanes | Everything in combat is one of: hurting an enemy (combat roll), changing the battlefield (gambits), or doing something else entirely (stakes roll). | Combat action structure |

### Design Laws (table-visible)

| Name | Definition | Table expression |
|-|-|-|
| No Dead Air | Every roll produces a result. 1-3 is a complication, never "nothing happens." | Players expect consequences. GMs invoke this on misses. |
| Escalation | Standing still is punished. Danger Clocks tick. Heat accumulates. Situations worsen without action. | The reason inaction feels dangerous. Drives scene pacing. |
| Player-Facing Dice | Players roll. GM never touches dice. Enemy power = flat numbers + stakes + Snags. | Enemies are static profiles. Players control all randomness. |
| Cost Must Hurt | If the cost is ignorable, the choice isn't real. Guard for shaping = Guard not for defense. Drain for +1d = one fewer for survival. | Why resource costs are set where they are. Pricing principle. |
| Lateral Growth | No XP, no levels. Stats fixed. Growth = more options (Edges), more resilience (Guard from Scars), more connections (Bonds). Wider, not taller. | Why characters don't outscale the world. |
| No Convergence | Character identity is permanent. Stats don't change. A Grit 1 character never becomes a Grit 3. | Why stat selection at creation matters forever. |
| Meaningful Choice | Every mechanical decision point presents a genuine trade-off. No dominant strategies. No false choices. | Governs all content design: edges, weapons, gambits. |
| No Stat Gates | Stats shape odds, not options. No Edge requires minimum stat. | Why any character can attempt anything. |

### Content Flow

| Name | Definition | Governs |
|-|-|-|
| Gambits as Convergence | Equipment defines available gambits. Edges modify how gambits work. Magic unlocks shaping gambits. Everything flows into what choices you have when you sacrifice a die. | System architecture. Why gambits are the center. |
| One Trigger One Effect | Every piece of game content does one thing. One sentence trigger, one sentence effect. If it takes a paragraph, it's two things. | All content creation: Edges, equipment, backgrounds. |
| Three-Way Interaction | The best content creates interactions across three systems simultaneously. | Content quality bar. Why good entries feel interconnected. |
| Background is Mechanical | When Background explains why a situation is familiar, give a Boon. No negotiation. The system acknowledging experience is real. | GM adjudication of Boons. Spotlight tool. |

### Edge Design Taxonomy

| Name | Definition | Used in |
|-|-|-|
| Five Edge Shapes | Unlock, Situational Boon, Resource Trade, Gambit Extension, New Gambit. Every Edge fits exactly one. | Edge creation, catalog organization |
| Seven Axes | Expertise, Experience, Relationship, Perception, Body, Institution, Loss. Forcing function against clustering. | Edge diversity, preventing all-Combat catalogs |
| Edge Categories | Combat, Survival, Social, Professional, Criminal, Connections, Physical, Mental, Knack, Sparked, Shaper, Thaumatech. | Edge catalog organization |
| Chain Rules | Named prerequisite sequences. Max depth 3. Max 1 prerequisite per Edge. 8-12 chains target. | Edge progression paths |
| Knack/Sparked/Shaper Gates | Knack = passive sense + Bleed. Sparked = one verb expression + Tell + cost. Shaper = modifies shaping engine. Each tier gates the next. | Thaumic Edge design |

---

## Relation Map (key connections)

```
The Roll
  ├── MODIFIED_BY: Boon, Snag, Drain
  ├── GOVERNED_BY: Fiction Determines Stat, No Dead Air
  ├── VARIANT: Combat Roll, Stakes Roll, Save, Defense
  └── PRODUCES: Gambit opportunity (via sacrifice)

Combat Roll
  ├── GOVERNED_BY: Attacks Auto-Hit, Three Lanes
  ├── FEEDS_INTO: Damage Pipeline
  ├── MODIFIED_BY: Boon, Snag, weapon die, Drain
  └── ENABLES: Combat Gambits (7 verbs + Open Clause)

Stakes Roll
  ├── GOVERNED_BY: Stakes Before Rolling, Fiction Determines Stat
  ├── VARIANT: Defense, Save, Work a Lead, Setup Phase
  └── ENABLES: Open Gambits (negotiated with GM)

Damage Pipeline
  ├── SEQUENCE: Damage -> Armor -> Guard -> overflow -> Harm
  ├── PRODUCES: Scar (Guard hits 0), Harm level (overflow amount)
  └── GOVERNED_BY: Cost Must Hurt

Guard
  ├── COSTS: Innate shaping (body cost)
  ├── PRODUCES: Scar (at 0), Staggered (enemies at 0)
  ├── DERIVED_FROM: Starting Guard (2 + highest stat)
  └── GROWS_VIA: Scar (+1 max per session, cap 10)

Drain
  ├── COSTS: +1d any roll, -2 damage, act while Critical, Device Gambits
  ├── PRODUCES: Crack (at 0)
  └── GOVERNED_BY: Cost Must Hurt, Complementary Tracks

Gambits
  ├── GOVERNED_BY: Gambit Universality, The Sacrifice Trade, Constrained Freedom
  ├── GATED_BY: Gambit Resistance (Threat level)
  ├── EXTENDED_BY: Edges (Gambit Extension shape), Equipment (weapon-specific)
  ├── UNLOCKED_BY: Magic tier (Shaping Gambits)
  └── CENTER_OF: Gambits as Convergence (all content flows here)

Shaping (innate magic)
  ├── GOVERNED_BY: Scope Zones, Scale Tiers, Constrained Freedom
  ├── COSTS: Guard (body), Heat Clock ticks
  ├── REQUIRES: Obsession (scope), Tell (technique)
  ├── GATED_BY: Knack -> Sparked -> Shaper progression
  ├── ENABLES: Shaping Gambits (Muffle, Anchor, Redirect, etc.)
  └── EXTREME: Break (transcends all limits, guaranteed cost)

Thaumatech
  ├── COSTS: Drain (device gambits)
  ├── REQUIRES: Contact Plates (thaumic tier gate)
  ├── GATED_BY: Rated Function (free) vs Device Gambit (costs Drain)
  ├── RISK: Device Risk Roll (2d6 when pushing past spec)
  └── GOVERNED_BY: Complementary Tracks (operators crack, shapers scar)

Edges
  ├── SHAPED_BY: Five Edge Shapes, Seven Axes, Edge Categories
  ├── MODIFIES: Gambits (Extension, New Gambit), Rolls (Situational Boon)
  ├── GATED_BY: Knack/Sparked/Shaper for thaumic Edges
  └── GOVERNED_BY: No Stat Gates, Lateral Growth, No Convergence

Escalation
  ├── EXPRESSED_THROUGH: Danger Clock, Heat Clock, Morale
  ├── DRIVES: Scene pacing, tactical urgency
  └── SUPPORTED_BY: Loud (ticks clocks), Bleed (ticks Heat), standing still = punished
```

---

## Notes for Vector DB / Semantic Search / Relations Evaluation

### What should be searchable

1. **Direct lookup**: "What is Guard?" -> Guard definition + all relations
2. **Semantic query**: "How does magic hurt you?" -> finds Guard-as-shaping-cost, Scar, Break, Harm levels, Drain/Crack path
3. **Relation traversal**: "What does Break connect to?" -> Untapped Potential, Thaumic Mark, Shaper progression, Scope Zones (Beyond tier)
4. **Principle query**: "Why are weapon costs designed this way?" -> Cost Must Hurt, Meaningful Choice, Three-Way Interaction
5. **Cross-cutting query**: "What uses Drain?" -> Device Gambits, +1d any roll, -2 damage, act while Critical (four uses, one track)

### Embedding strategy considerations

- **Layer 1 concepts** have concrete, short definitions. They embed cleanly and return precise matches.
- **Layer 2 subsystems** have procedural definitions (step 1, step 2...). They need to embed as both the summary AND the procedure.
- **Layer 3 principles** are abstract and connect to many things. They need rich relation metadata because their definitions alone may not surface on concrete queries like "what happens when I take 6 damage" (which needs Damage Pipeline, not Cost Must Hurt).

### Relation graph considerations

- This is a directed graph with typed edges. Not everything connects to everything.
- The gambit system is the highest-connectivity hub (Gambits as Convergence). Any graph query tool should handle its centrality.
- Principles GOVERN mechanics but don't appear in the same query space. A "why" query needs to traverse the GOVERNS edge type. A "what" query stays in Layer 1-2.
- The thaumic progression (Mundane -> Knack -> Sparked -> Shaper) is a strict chain. GATES relations should enforce ordering.

### Total concept count

| Layer | Count | Type |
|-|-|-|
| Stats | 3 | Mechanic |
| Resources | 5 | Mechanic |
| Roll modifiers | 2 | Mechanic |
| Boon sources | 3 | Mechanic |
| Range bands | 3 | Mechanic |
| Action economy | 2 | Mechanic |
| Weapon properties | 9 | Mechanic |
| Harm levels | 3 | Mechanic |
| Enemy conditions | 4 | Mechanic |
| Combat gambits | 7 | Mechanic |
| Shaping gambits | 8 | Mechanic |
| Clocks | 5 | Mechanic |
| Magic concepts | 10 | Mechanic |
| Character concepts | 4 | Mechanic |
| Enemy mechanics | 3 | Mechanic |
| Already confirmed (prev.) | 43 | Mechanic |
| **Layer 1 subtotal** | **~114** | |
| Named subsystems | 18 | Subsystem |
| **Layer 2 subtotal** | **18** | |
| Universal axioms | 7 | Principle |
| Sacrifice trade | 4 | Principle |
| Scope/boundaries | 4 | Principle |
| Design laws | 8 | Principle |
| Content flow | 4 | Principle |
| Edge taxonomy | 5 | Principle |
| **Layer 3 subtotal** | **32** | |
| **Total** | **~164** | |
