# MONDAS Design Bible v0.2

## Purpose

This document is the global design authority for the MONDAS rules system. Every rules file references the Design Laws defined here. Every design decision traces back to them. When two files disagree, this document wins.

**What this document does:**
- Defines the 17 Design Laws that govern all mechanical decisions
- Maps the file architecture and cross-references
- Establishes generation principles that apply across all content types
- Contains GM guidance for adjudication and play
- Records the master decision log

**What this document does not do:**
- Define specific rules mechanics (see `CORE.md`)
- Contain catalog entries (see domain files)
- Replace domain-specific design principles (each file has its own)

---

## The 17 Design Laws

These laws govern every mechanical decision in MONDAS. When evaluating changes, check against this list. A change that violates a law needs exceptional justification.

| Law | Name | Rule |
|-|-|-|
| P1 | No Dead Air | Every roll produces a result. Consequence (1-3) is a complication, never "nothing happens." |
| P2 | Player Creativity | Approach determines stat. Fictional plausibility bounds creativity. Creativity Boons capped at 1 per roll. |
| P3 | Escalation | Standing still is punished. Danger Clocks tick. Heat accumulates. Situations worsen without action. |
| P4 | Clean Resolution | Three tiers plus critical (6 / 4-5 / 1-3 / double 6). No ambiguous middle ground. |
| P5 | Fictional First | Mechanics follow fiction, not the reverse. If it doesn't make sense in the story, it doesn't happen at the table. |
| P6 | Meaningful Choice | Every mechanical decision point must present a genuine trade-off. No dominant strategies. No false choices. |
| P7 | Dangerous World | Gear fails. Magic costs. The environment bites back. Consequences are real. |
| P8 | Injuries Matter | No HP to chip away. Named injuries with mechanical bite. A spiral, not a countdown. |
| P9 | Cinematic Mechanics | Gambits, Breaks, Scars produce moments worth telling stories about. Mechanics serve drama. |
| P10 | Everyone Contributes | Every thaumic tier, every stat spread, every background has something to bring to every scene. |
| P11 | Player-Facing Dice | Players roll. GM never touches dice. Enemy threat is expressed through Stakes, Snags, and consequences. |
| P12 | Narrative Progression | Recovery, Push refill, Guard growth, Scars. Every mechanical shift is a story beat, not a timer. |
| P13 | Complementary Tracks | Guard handles damage (body). Push handles voluntary effort and device drain (will). Cover is Armor. Two existing tracks, clear domains. No new parallel tracks. |
| P14 | Differentiation | Stats are fixed. No convergence. Character identity is permanent. Growth is lateral (new options), not vertical (bigger numbers). |
| P15 | Speed | Fewer rolls, faster resolution. Three ranges not a grid. No initiative. Streamline always. |
| P16 | Constrained Freedom | Free-form within boundaries. Obsession scope, not spell lists. Background domains, not skill lists. |
| P17 | Setting-Authentic | 1992 industrial, not medieval. No shields, no swords. Kevlar and thaumic wards. The world shapes the rules. |

### Hard Boundaries

- Never add a mechanic that only one stat spread can use
- Never create a dominant strategy (if one option is always best, the design is broken)
- Never introduce a third resource track (Guard and Push have clear domains: body and will)
- Never add GM-side dice rolls
- Never reference real-world place names (use Mondas concordance)

---

## File Architecture

### File Map

| File | Domain | Contains | Status |
|-|-|-|-|
| `DESIGN.md` | Global | Design laws, universal generation principles, cross-references, GM guidance, master decision log | This document |
| `CORE.md` | Core Rules | Rules engine, combat, base gambit list (locked at 15), positioning, clocks | Complete |
| `DESIGN-CORE.md` | Core Principles | Principles index, probability reference, all decision tables (WS1, WS4, Mesh Pass, WS2, WS5), workstream status | Complete |
| `MAGIC.md` | Magic | Thaumic spectrum, channels, shaping, drain, break, thaumatech rules | Complete |
| `DESIGN-MAGIC.md` | Magic Principles | Design philosophy, principles index, WS3 decisions, open questions | Complete |
| `CHARACTER.md` | Characters | Creation process, stats, derived values, bonds, gear, progression | Complete |
| `DESIGN-CHARACTER.md` | Character Principles | Design philosophy, WS2 decisions, workstream order | Complete |
| `EDGES.md` | Edge Catalog | Edge entries by category (Combat, Social, Knack, Sparked, Shaper, etc.) | Catalog in progress |
| `DESIGN-EDGES.md` | Edge Principles | Five shapes, chain rules, seven axes, Knack/Sparked/Shaper design rules, tests | Complete |
| `EQUIPMENT.md` | Equipment Catalog | Mundane weapons, thaumatech, armor, gear entries | Catalog in progress |
| `DESIGN-EQUIPMENT.md` | Equipment Principles | Weapon/armor/gear/thaumatech generation rules, tests, legality tiers | Complete |
| `GAMBITS.md` | Gambit Catalog | Property-category, defensive, act replacement, shaping gambit entries | Catalog in progress |
| `DESIGN-GAMBITS.md` | Gambit Principles | Property-category, defensive, act replacement, shaping gambit design rules | Complete |
| `BACKGROUNDS.md` | Backgrounds | Background catalog (194 entries) | Complete |
| `DESIGN-BACKGROUNDS.md` | Background Principles | Format, quality guidance, player creation rules, examples from play | Complete |

### Canonical File Template

Every rules file follows this structure. Sections may be empty but the order is fixed.

```
# MONDAS [Domain] vX.Y

## In Two Minutes
[2-3 paragraph summary. What, why, how it connects.]

---

## Design Principles
[Domain-specific generation rules. What makes a good entry.
 Tests, boundaries, examples. Exists before the catalog.]

---

## [Content Sections]
[Rules text or catalog entries. The actual game content.]

---

## Quick Reference
[Summary tables. The cheat sheet.]

---

## Design Appendix

### Decisions Made
[Table: #, Decision, Answer, Laws]

### Open Questions
[Unresolved for this domain]

### Design Notes
[Rationale, commentary, abandoned approaches]
```

### Cross-Reference Matrix

When editing one file, check these dependencies.

| If you edit... | Also check... | Because... |
|-|-|-|
| CORE.md (base gambits) | GAMBITS.md, DESIGN-GAMBITS.md, EQUIPMENT.md | Extensions reference base gambits by name |
| CORE.md (combat/damage) | DESIGN-EQUIPMENT.md, EQUIPMENT.md, GAMBITS.md | Weapon dice, properties, damage flow |
| CORE.md (stats/guard) | CHARACTER.md, MAGIC.md | Derived values, drain costs |
| MAGIC.md (spectrum tiers) | DESIGN-EDGES.md (Knack/Sparked/Shaper) | Edge chain mirrors spectrum tiers |
| MAGIC.md (shaping rules) | DESIGN-GAMBITS.md, GAMBITS.md | Shaping gambits reference shaping mechanics |
| MAGIC.md (thaumatech rules) | DESIGN-EQUIPMENT.md, EQUIPMENT.md | Device rules govern thaumatech entries |
| DESIGN-EDGES.md (principles) | EDGES.md, all catalog files | Edge shapes constrain what content can do |
| DESIGN-EDGES.md (gambit rules) | DESIGN-GAMBITS.md, GAMBITS.md | Edge-granted gambits must reference base gambits |
| DESIGN-EQUIPMENT.md (principles) | EQUIPMENT.md | Generation rules govern catalog entries |
| DESIGN-GAMBITS.md (principles) | GAMBITS.md | Design rules govern catalog entries |
| EQUIPMENT.md (weapons) | GAMBITS.md | Each weapon carries 1-3 gambits |
| EQUIPMENT.md (thaumatech) | MAGIC.md | Device stat, contact plates, failure stakes |
| GAMBITS.md (base reference) | CORE.md | Base list is locked in CORE.md (D42) |
| CHARACTER.md (creation) | EDGES.md, BACKGROUNDS.md | Starting edge count, background selection |
| BACKGROUNDS.md (catalog) | CHARACTER.md | Background scope test |

### Content Flow

How content types feed into each other at the table:

```
BACKGROUNDS ──Boon domain──→ Rolls
EDGES ──────Boon/Unlock/Trade──→ Rolls + Gambits
EQUIPMENT ──Weapon dice + Properties──→ Attack rolls
EQUIPMENT ──Gear──→ Gear Gambits
GAMBITS ←──Extensions──── EDGES
GAMBITS ←──Weapon-specific──── EQUIPMENT
GAMBITS ←──Property-category──── EQUIPMENT (properties)
GAMBITS ←──Shaping──── MAGIC (spectrum tier)
```

**Gambits are the convergence point.** Equipment defines what gambits are available (through weapons, gear, properties). Edges modify how gambits work (extensions, new gambits). Magic unlocks shaping gambits (through spectrum progression). Everything flows into what choices the player has when they sacrifice a die.

---

## Universal Generation Principles

These apply to ALL content creation across all domain files. Domain-specific principles live in their respective files.

### One Trigger, One Effect

Every piece of game content (Edge, weapon gambit, equipment entry, background domain) does one thing. One sentence to describe the trigger. One sentence to describe the effect. If it takes a paragraph, it's two things. Split it.

### Fiction First, Mechanic Second

Start with who the character is or what the object does in the world. Then find the mechanic that captures it. Never start with a mechanical gap and invent fiction to fill it. If you can't describe the entry without referencing game terms, start over.

### The Redundancy Test

Before creating anything, search the existing catalog for overlap. If the new entry occupies the same fictional space as an existing one, either cut one or differentiate them until they serve clearly different characters or situations.

### The Dominant Strategy Test

If every reasonable character would take this option, it's too strong. The best content is perfect for some characters and irrelevant for others. Broad utility is a warning sign. Narrow utility with high payoff is the target.

### Setting-Authentic Detail

Every entry should feel like it exists in 1992 Mondas. A weapon comes from a pawn shop, military surplus store, or union hall, not a fantasy armory. A thaumatech device has a contact plate, a model number, and a manufacturer. Equipment has wear, provenance, and a reason someone owns it. Backgrounds are specific jobs, not genres.

### The Three-Way Interaction

The best content creates interactions across three systems simultaneously. A weapon with the Loud property interacts with damage (CORE), heat clocks (MAGIC), and tactical gambits (GAMBITS). A Knack Edge interacts with the thaumic spectrum (MAGIC), background domains (BACKGROUNDS), and gambit triggers (GAMBITS). Design for these intersections.

### Cost Must Hurt

If the cost of using something is ignorable, the choice isn't real. Guard spent on shaping is Guard not available for defense. A Push box spent on a desperate action is one fewer for survival. Equipment that's Loud ticks attention clocks. Every benefit has a price the player feels.

### Catalog Balance Targets

Content volume should reflect fictional frequency:

| Domain | Target Size | Rationale |
|-|-|-|
| Backgrounds | 150-200 | Broad coverage of Mondas working lives |
| Edges (standalone) | 80-120 | Enough range, not a shopping list |
| Edges (chains) | 8-12 named chains | Character arcs the system supports |
| Equipment (weapons) | 40-60 entries | Covers the 1992 arsenal without bloat |
| Equipment (gear/thaumatech) | 30-50 entries | Loadout variety without analysis paralysis |
| Gambits (beyond base 15) | 40-60 entries | Property-category, defensive, weapon-specific, shaping |

---

## GM Guidance

These are not rules. They are design principles and guidance that emerged from playtesting. They explain why the system works the way it does and how to run it well.

---

### Background is Mechanical, Not Decorative

When a character's Background directly explains why a situation is familiar territory, give a Boon. Don't ask for justification. Don't negotiate. The Background already made the case.

A former DPA auditor walking into a corporate lobby has done this a hundred times. A CSS riot veteran closing on a dissenter knows exactly how bodies move under pressure. The Boon isn't a reward. It's the system acknowledging that experience is real, and it shows up at the table as a die.

The rule: if you can finish the sentence "she's done this before because" with something on the character sheet, give the Boon. If you're reaching, don't.

This is also your spotlight tool. Saying "your audit background makes this routine, take a Boon" tells the whole table who this character is. The mechanic creates the character moment. You don't need to narrate it separately.

---

### Ambush Has No Defense Roll

If a character walks into an attack they had no fictional basis to anticipate, the hit lands. No reaction roll. No defense. Apply damage to Guard and describe it.

This is not punishing inattention. It's making information matter. If the player had a reason to be cautious and didn't take it, the fiction answers. If they had no way to know, the fiction answers differently.

The Assess category exists precisely for this. A Scout or Read Gambit before committing to a move is the mechanical expression of situational awareness. Players who invest in Assess avoid ambushes. Players who don't, don't.

Don't soften this. The hit landing is what makes the Assess category feel worth the die cost.

**Relationship to the Ambush tactic:** The Ambush tactic in `rules/CORE.md` covers planned ambushes (Sharp roll to set up, ambushing characters act first, no defense roll on the opening attack). This guidance covers the broader principle: any attack with no fictional basis to anticipate bypasses defense. The tactic is a specific, player-initiated case of this principle.

---

### When They Already Know You

Prior relationship and reputation do mechanical work that isn't fully captured in stats. A Nerve 2 character threatening someone who has seen them put an orc through a wall is a different roll than a Nerve 2 stranger making the same threat.

Handle this as a Boon when:
- The target has direct prior experience of the character's capability
- The character's reputation in this specific context precedes them and is relevant to the Influence attempt

Handle this as a Snag when:
- The target has prior reason to distrust or resist the character specifically
- The character's reputation works against them in this context

This is GM discretion, not a separate mechanic. The fiction earns the modifier. An Edge built around reputation ("people who know your record treat Pressure as Strong") is the right place to make this mechanical and portable across characters.

---

### What Happens When the Threat Walks Away

The system handles the moment cleanly. It doesn't automatically handle what the moment costs you afterward.

When a threat leaves the scene unresolved (Misha running with information, a guard who clocked your face, a contact who now owes you a complicated favor), open a Clock. Name it specifically. "Misha's gang finds Rask" is a Clock. "DPA runs Marta's credentials" is a Clock. Give it a number based on how urgent the fiction feels.

The Stall Gambit delays. The Clock tracks what was delayed. Between-scene consequences live on Clocks, not in GM memory.

This is the connective tissue between scenes. A session is not a series of isolated encounters. It's a set of Clocks the players are racing, some of which they created themselves with their Gambit choices.

---

### Gambits Tell You What Happens Next

When a player sacrifices a die for a Gambit, they are not just resolving the current moment. They are telling you what matters to them and what the story should do next.

A Scout Gambit in a corporate corridor says: there is an exit, and I want to use it. Now there is a kitchen. A Stall Gambit against an incoming threat says: I need one more beat with this person. Now the threat has a shape and a timing.

You didn't invent those. The player's choice surfaced them. Your job is to answer honestly (what does Scout actually find, what does Stall actually buy) and then follow the thread.

The Gambits are the players writing the next scene. The stakes you set before the roll are the constraints. Everything inside those constraints belongs to the table.

This is why consequences on the table before the roll matter so much. You're not revealing the stakes after the fact. You're giving the players the information they need to make meaningful Gambit decisions. The tension is built in advance. The fiction emerges from the choices.

---

### When Players Spam Gambits, the Scene Needs More Problems

Gambit spam (one character burning through dice on a single target while others watch) is not a rules problem. The mechanics are working correctly. The scene isn't giving everyone enough to do.

The fix is never a rule. It's a scene design instinct.

**Before the scene, ask:**
- Who is at the table?
- What does each character's stats want to do?
- Is there a pressure point sized for each of them?

If the answer is no, add one before play starts. A scene with one threat and enough dice to solve it cleanly produces Gambit spam. A scene with multiple simultaneous pressure points produces a session people talk about afterward.

The design principle: **every character should have a problem only they can solve well.**

Rask is built for the orc. Marta is built for Misha. If both are in the same alley and the GM only puts the orc on the table, Rask solos it while Marta watches. That's one character's game, not a shared table.

Split the pressure. Rask takes the orc. Marta rounds a corner and runs straight into Misha sprinting the other direction. Now she has a Sharp/Nerve problem while Rask has a Grit problem and both are happening at the same time. Neither can solve the other's situation. Both are the protagonist of their own moment.

**When spam happens mid-scene:**

It's information. The scene lost its teeth. The players are comfortable and the world should have kept moving while they were comfortable.

Don't punish. Don't retcon. Just introduce the next pressure point immediately and honestly:

- Misha got his phone out while Rask was busy with the orc
- A light went on in a window above the alley
- The orc recovered faster than expected
- Something on the other side of that door just changed

The world doesn't pause for Gambit sequences. If the players are deep in one problem, something else is ticking. Find it and put it on the table.

**The deeper principle:**

Mondas scenes are not encounters with a win condition. They are situations with multiple moving parts, some of which the players created themselves with earlier Gambit choices. A good scene has enough pressure points that splitting focus is always a real question.

If every scene has that, Gambit spam becomes impossible. There's always somewhere better to spend the die.

---

### Adjudicating Shaping

When a character with Knack, Sparked, or Shaper abilities declares an effect, you need to size it before you set stakes. This section gives you the tools to do that quickly and consistently.

#### Scale Tiers

Every shaping declaration falls into one of five tiers. Name the tier before you set stakes. The player should know how ambitious their attempt is before they decide to roll.

**Trivial.** The base expression. Within the character's comfortable, practiced output. Lighting a cigarette. Chilling a drink. Feeling the fault line. No roll. 1 Guard. Always works. This is daily-life shaping: small, controlled, routine.

**Moderate.** A focused, single-target effect clearly within obsession scope. Standard roll. Reasonable Guard cost in the stakes (1-2 on success). Heating a gun barrel until it's too hot to hold. Weakening a single weld. Reading the structural integrity of a wall and finding the crack. This is the bread and butter of shaping in play.

**Ambitious.** Area effect, multiple targets, sustained duration, or pushing toward scope boundaries. Standard roll. Steep Guard cost (2-3 on success, 4+ on partial). Guaranteed thaumic side effects even on a full success, because effects this size leave marks on the environment. Force burst across a room. Reshaping a locked door. Pulling heat from a corridor until frost forms on the walls. These are the moments that get reported to the DPA.

**Extreme.** Rewriting something fundamental about the immediate environment. Standard roll with brutal stakes. Guard cost approaches Scar territory (3-4 on success, L1 Hurt on partial, death or L2+ on consequence). The character is forcing their obsession past anything they've done before. Collapsing a wall section. Redirecting a leyline feed. Superheating the air in a room until everyone drops. These are the moments that create Thaumic Marks even without a Break.

**Beyond.** The player is asking for something that exceeds what their obsession can channel through a standard roll. Your answer: "The only way to do that is to Break." Break is voluntary, declared by the player, with guaranteed success and guaranteed catastrophic cost. You never push a player toward a Break. You name it as the price and let them decide.

#### The Four Sentences

When a player declares a shaping effect, respond with one of these:

- "That's trivial. 1 Guard, it just works."
- "That's moderate. Let me set the stakes."
- "That's ambitious. The stakes are steep and there will be side effects even on a 6."
- "That's extreme. Death is on the table if this goes wrong. Still want to roll?"

If the effect is beyond all four: "That's a Break. Do you want to Break?"

These are not rules. They are language. The specific Guard costs and consequences are yours to set based on the fiction. The tiers tell the player where they are on the risk curve before they commit.

#### Scope Zones

The character's obsession defines three zones. Know them before the session starts.

**Core.** Directly within the obsession. No scope negotiation needed. The fire shaper heating things. The structural shaper feeling weak points. The perception shaper reading the room. If the effect is clearly inside the obsession, approve it and size the tier.

**Adjacent.** Related but stretching. The fire shaper cauterizing a wound (adjacent to biological work). The structural shaper weakening glass (adjacent to metal/concrete, different material behavior). Adjacent effects cost more: bump the tier up by one, or add +1 Guard to the stakes across all consequence levels. The character is working outside their comfort zone. The fiction should reflect it: messier execution, less precise results, more side effects.

**Outside.** Not related to the obsession. Not possible through normal shaping. The fire shaper trying to read minds. The structural shaper trying to heal wounds. No amount of Guard changes this. Only Break transcends scope, and even then the effect is shaped by who the character is, not by what they want.

The scope conversation should happen during character creation and early sessions. By session three, you and the player should have a shared understanding of core, adjacent, and outside. Write it down. Refer to it when declarations get ambitious.

#### The "What Does It Look Like" Test

Before setting stakes, ask the player: "What does that look like? Where are you standing? What's your Tell doing?"

If they describe something concrete and physical (pressing both palms against the wall, breathing into the lighter flame, holding eye contact while counting under their breath), the effect is probably sized right.

If they describe something abstract or cinematic ("I reach out with my power and crush the supports"), they need to ground it. Not to punish them. Because the Tell is physical and the shaping has to flow through it. Making them describe the physical act keeps the effect honest.

This test also catches scope creep. "I heat the room" is vague and could mean anything. "I put my hands on the radiator and push heat through the pipes until the air shimmers" is grounded, specific, and you can size it (ambitious: area effect through existing infrastructure, creative use of core scope, steep Guard cost but plausible).

#### Consequences for Shaping

Shaping consequences are not generic failure. They are thaumic. The energy went somewhere. When you set stakes for a 4-5 or 1-3, draw from these:

**Body consequences.** The channeling hurt. Nosebleed, burst capillaries, nerve pain, temporary blindness, loss of fine motor control. These are the precursors to Break damage. A character who keeps getting body consequences is feeling the wall.

**Scope consequences.** The effect went past its intended boundaries. The fire caught the curtains. The structural weakening spread to the next room. The emotional read pulled in everyone at the table instead of the target. The obsession has a mind of its own.

**Exposure consequences.** The DPA noticed. A scanner spiked. A Sensitive across the street felt it. A witness saw the Tell and knows what it means. The Heat clock ticks. The file gets thicker.

**Backlash consequences.** The thaumic environment responded. A leyline surged. An entity stirred. The BTC in the area spiked for an hour. The shaper attracted something. These are rare and should be reserved for ambitious and extreme tiers.

Mix and match. A partial success (4-5) might include the effect landing at reduced intensity plus a body consequence. A full consequence (1-3) might include scope blowout plus exposure. The worse the roll, the more categories you draw from.

#### Shaping in Combat

A shaper in combat is doing something specific and immediate. Size it the same way you'd size any shaping effect, using the scale tiers.

The key difference from weapon attacks: shaping does not auto-hit. It's a standard roll. The GM sets damage as part of the stakes. This is already established (D31, D57). The practical implication: a weapon user is reliable. A shaper is flexible. The shaper can do things no weapon can do, but they might fail, and the failure has thaumic consequences on top of the tactical ones.

When a shaper declares a combat shaping effect, set the stakes with both combat and thaumic consequences:

- **6:** The effect works. Guard cost as stated. Heat ticks as stated.
- **4-5:** Reduced damage or reduced tactical effect. Higher Guard cost. A body or exposure consequence.
- **1-3:** The shaping fails or goes wrong. Guard cost hits anyway. A scope or backlash consequence. The enemy is still standing and now they know what you are.

Shapers can sacrifice dice for shaping Gambits on combat shaping rolls. This creates their tactical decision space: do I keep this die for effect quality, or spend it on Muffle to keep the Heat down? The weapon user trades damage for battlefield control. The shaper trades effect for operational survival. Both are real choices every round.

---

## Master Decision Log

All canonical design decisions. Each decision is recorded once here. Individual file appendixes reference decisions by number but this is the source of truth.

### WS1: Core Rules

| # | Decision | Answer | Laws |
|-|-|-|-|
| D1 | Dice system | d6 pool for rolls; weapon dice for attacks | P4, P15, P16 |
| D2 | Who rolls | Player-facing only. No exceptions. | P11 |
| D3 | Action economy | Move + Act per turn; React on enemy turns; no initiative | P6, P11, P15 |
| D4 | Success granularity | Three tiers + critical (6 / 4-5 / 1-3 / double 6) | P1, P4 |

### WS2: Character Creation

| # | Decision | Answer | Laws |
|-|-|-|-|
| D16 | Background system | Universal Boon domain from one-sentence Background. GM confirms scope. Separate from Edges. | P2, P14 |
| D17 | Starting Guard | 2 + highest stat (range 3-6). Guard reflects best survival instinct. | P13, P14, P15 |
| D18 | Stat permanence | Stats fixed at creation. Growth through Edges, Scars, narrative. No convergence. | P14 |
| D19 | Species mechanics | Purely narrative. No stat bonuses. Displaced face social systems, not mechanical ones. | P17 |
| D20 | Zero/positive balance | Zeroes: 4 Edges + Thaumic Null. Positives: 3 Edges + thaumic access. Asymmetric but viable. | P10, P17 |
| D21 | Progression model | No XP, no levels. Edges earned through play (~1 per 2-3 sessions). Guard growth from Scars. | P12, P14 |

### WS3: Magic & Drain

| # | Decision | Answer | Laws |
|-|-|-|-|
| D5 | Magic cost model | Innate drain = Guard (body cost, overflow to Harm). Device drain = Push (will cost, empty = Crack). Two domains, two existing tracks. | P13, P17 |
| D6 | Thaumatech vs Innate | Different risk profiles. Thaumatech: base free, device gambits cost Push (GM sizes from fiction), auto-succeed, device risk roll (2d6) when quality vs. stretch warrants it. Innate: standard roll, Guard in stakes, Tell mandatory, Heat ticks, escalated stakes. Operators crack. Shapers scar. | P10, P12 |
| D7 | How shaping works | Free-form within obsession scope, constrained by Tell. Standard roll, Guard in GM's stakes. Shaping Gambits for tactical layer. | P2, P16 |
| D57 | Thaumic Channels | Five channels (Innate, Bestowed, Sworn, Inherited, Learned). Same mechanics, different fiction and Break consequences. Channel emerges from play. Loss produces Temporary Edge. | P10, P14, P17 |
| D58 | Push consolidation | Push is universal +1d across all rolls AND device gambit fuel. 4-box track handles voluntary effort, device activations, and survival (act while Critical, reduce damage). One per roll for +1d; device gambits are separate activations (can cost multiple Push). Replaces overcharge-costs-Guard, careful-channeling-for-Boon, and over-spec-as-separate-subsystem. | P12, P15 |
| D59 | Shaping scale tiers | Five tiers (Trivial/Moderate/Ambitious/Extreme/Beyond). GM language to size declarations. Only Break transcends scope. | P1, P6, P15 |

### WS4: Combat

| # | Decision | Answer | Laws |
|-|-|-|-|
| D8 | Positioning model | Three abstract ranges (Close/Near/Far), relative to entities, not a map. | P6, P15 |
| D9 | Cover | +1/+2 Armor vs ranged (partial/full). No effect at Close. Strong Gambit destroys cover. | P13, P15 |
| D10 | Weapon properties | 8 tags (Ranged, Sidearm, Thrown, Long, Loud, Brutal, Subtle, Slow). | P6, P17 |
| D11 | Dual wielding | Roll both weapons' dice. Snag on defense until next turn. | P6, P9 |
| D12 | Shields | Dropped. Setting is 1992. Armor and Cover handle protection. | P17 |
| D13 | Create Cover Gambit | Standard Gambit (4+). Creates partial cover. Needs fictional justification. | P6, P9 |
| D14 | Gear Gambits | 12 gear-unlocked Gambits across 3 categories. Loadout = tactical identity. | P6, P17 |
| D15 | Gambit resistance | Explicit table by Threat level. Standard reduced/blocked at Threat 2+. Strong always works. | P6 |
| D22 | Gambit potency | Attacker's stat sets potency: 1 = reduced, 2 = standard, 3+ = ignore one Threat level. | P2, P6, P14 |
| D23 | Weapon Gambits | Each weapon carries 1-3 specific Gambits. Loadout = tactical identity. | P6, P17 |
| D24 | Social Gambits | 8 named social forms across Influence, Assess, Maneuver. Social applications of base Gambits. | P1, P6 |

### Mesh Pass

| # | Decision | Answer | Laws |
|-|-|-|-|
| D28 | Saves | Roll specified stat, same table. Triggering effect defines consequence. Partial = reduced intensity. Threat does not impose Snags on saves. | P4, P15 |
| D29 | Conditions | Four named conditions (Stunned, Shaken, Prone, Staggered) with mechanical definitions. | P4, P6 |
| D30 | Gambit sources | Three stacking layers: base list (15), weapon-specific, property-category. | P6, P9 |
| D31 | Shaping effect output | Standard roll, not auto-hit. GM sets damage in stakes by scale. | P10, P16 |
| D32 | Tactics | Seven tactical options: Universal (4) and Trained (4, Edge required). | P6, P9 |
| D33 | Guard = highest stat | Guard changed from Grit+2 to 2+highest stat. All stat builds viable. | P13, P14 |
| D34 | Gambit unification | Gambits extended to all rolls. 15 base across four categories. | P6, P9, P15 |
| D35 | Potency as fighter identity | Description determines stat, stat determines potency. Same Gambit, different fighter. | P2, P6, P14 |
| D36 | Crit = Strong Gambit | Double 6 grants one free Strong-tier Gambit. | P4, P6, P9 |
| D37 | Strong + Enhanced stacking | Full effect plus additional fictional consequence. | P2, P6, P14 |
| D38 | Tactics split | Universal (instinct) vs Trained (Edge required). | P2, P6, P17 |
| D39 | Edges modify Gambits | Any Edge can modify a Gambit's trigger, effect, or threshold. | P2, P6, P14 |
| D40 | Edge design axes | Seven axes as forcing function against clustering. | P2, P14, P17 |
| D41 | Four Gambit categories | Maneuver, Assess, Influence, Fight. Organized by output type. | P6, P15, P16 |
| D42 | Base Gambit list locked | 4+3+3+5 = 15. Extensions must reference a base Gambit by name. | P6, P14 |
| D64 | Gambits never deal damage | Damage comes from weapon dice only. Gambits change the situation: positioning, status, control, information. No "+X damage" gambits. Keep dice for damage, sacrifice dice for effects. | P6, P9 |
| D43 | Scene granularity | Scene is GM's framing unit. Consequence-before-roll eliminates disputes. | P1, P5, P15 |
| D44 | Background as Boon | Background directly → Boon without negotiation. Spotlight tool. | P2, P9, P15 |
| D45 | Ambush bypasses defense | No fictional basis to anticipate = no defense roll. | P4, P6, P9 |
| D46 | Unresolved threats → Clocks | Threat leaves unresolved = named Clock. Stall delays, Clock tracks. | P3, P9, P15 |
| D47 | Gambits as scene generation | Player Gambit choices surface the next scene. | P5, P9, P16 |
| D48 | Gambit spam = scene design signal | Multiple pressure points, not rules patches. | P9, P15, P17 |

### WS5: Edges

| # | Decision | Answer | Laws |
|-|-|-|-|
| D51 | Edge width vs depth | No stat gates. Max one prereq per Edge, max three deep. Wide vs deep emerges from player choice. | P2, P12, P14 |
| D52 | Chains replace stat gates | Stats shape odds, not options. Edge prereqs gate on play, not creation. | P2, P12, P14, P17 |
| D53 | Sensitive → Sparked | Sparked is where sensing becomes doing. Tell originates here. 1 Guard base, desperate push with stakes. | P2, P10, P12 |
| D54 | Break as Shaper gate | Narrative event, not mechanical prereq. Untapped Potential → Shaper or refusal Edge. | P2, P12, P14 |
| D55 | Shaping stat from fiction | Nerve cap removed. Stat matches approach. All builds shape through their approach. | P2, P14, P15 |
| D56 | Temporary Edges | Pending decisions with mechanical teeth. Resolution condition + at least two outcomes. | P2, P12, P15 |

### WS6: Equipment

| # | Decision | Answer | Laws |
|-|-|-|-|
| D60 | Device gambits cost Push | Device gambits cost Push (GM sizes from fiction), not Guard. Auto-succeed. Base use free. Operators crack, shapers scar. | P6, P7, P13 |
| D61 | Device risk | GM declares device at risk based on quality vs. Push stretch. Roll 2d6 read highest: 6 = fine, 4-5 = breaks (repairable), 1-3 = catastrophic (breaks + feedback). Push the roll for +1d. Boons apply. | P5, P6, P7 |
| D62 | Gear is character | Devices accumulate history. Repair in downtime scenes. Destruction is narrative (like PC death), not mechanical. Quality is fictional positioning for risk threshold, not a dice modifier. | P5, P9, P12 |
| D63 | Thaumatech survival principle | Encounters should include elements that require device gambits. Mundane approaches insufficient. Gear is essential, not optional. | P7, P10 |

### WS8: Backgrounds

| # | Decision | Answer | Laws |
|-|-|-|-|
| - | Background format | Job title + Boon domain (2-3 areas) + example uses (2-3). Specific job, not genre. | P2, P16, P17 |

---

## Open Questions

- **WS6 (Equipment):** Thaumatech device catalog. Legality tiers. Black-market gear. Device quality as fictional modifier to Stakes.
- **WS7 (Player Materials):** Character sheet, reference cards, one-pagers. Pending.
- **Gambit catalog completeness:** Property-category gambits, defensive gambits, and shaping gambits need full catalog entries.
- **Edge catalog completeness:** 212+ entries exist in v1 but need redesign under new principles.
