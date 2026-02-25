# Concept Classification Task

You are classifying auto-detected terms from a TTRPG rules system (MONDAS). Each candidate was found as a **bold term** or heading in rules markdown files.

## Already Confirmed Concepts
These are approved game mechanics. Use them as reference for what "counts":
Assist, BTC, Boon, Break, Break State, Combat Roll, Condition, Cover, Crack, Device Gambit, Drain, Edge, Flair, Gambit, Grit, Guard, Harm, Knack, Leyline, Mundane, Nerve, Pin, Prone, Pull, Push, Read, Resonance, Save, Scar, Setup, Shaken, Shaper, Sharp, Siphon, Snag, Sparked, Stakes Roll, Stunned, Tell, Temporary Edge, Threat, Untapped Potential

## Classification Rules
- **APPROVE**: A named game mechanic, resource, condition, action type, weapon property, character option, or system term that players/GM would reference by name at the table.
- **REJECT**: Generic English, section headers used for document structure, formatting artifacts, or terms that are descriptive but not game-mechanical.
- **MERGE**: If the candidate is a plural/variant of an already-confirmed concept, note which one it should merge into.

## Candidates (ranked by likelihood score)

For each, I give: name, score, signals (rules files it appears in, total mentions, definition-pattern hits, co-occurrence with confirmed concepts), and up to 3 context snippets from rules files.

### Boon domain (score: 25)
Files: 5 | Mentions: 15 | Definitions: 2 | Co-occurs with: 15 confirmed concepts
Context:
  > - Three stats (6 points, minimum 1 each)
- A Background (one sentence, maps to a Boon domain)
- 3 or 4 Edges (depending on your thaumic tier)
- 2-3 Bonds
- Starting gear

---
  > The Background maps to a **Boon domain**: when you attempt something that falls within your Background's expertise, you get a Boon
  > **Who are you:** Name, species, age, look, Background (one sentence, Boon domain)

### Gear (score: 25)
Files: 11 | Mentions: 74 | Definitions: 4 | Co-occurs with: 37 confirmed concepts
Context:
  > Training, good gear, environmental advantage, ally assistance, clever approach
  > - **Gear:** The right tool for the job
  > Do you have the right gear

### At the table (score: 25)
Files: 4 | Mentions: 17 | Definitions: 2 | Co-occurs with: 25 confirmed concepts
Context:
  > They are narrative Clocks that live on the character sheet instead of the GM's notes, with mechanical teeth so the player interacts with them at the table
  > Something the player feels at the table
  > The effect is specific, immediate, and resolved at the table in one sentence

### Edges (score: 23)
Files: 12 | Mentions: 90 | Definitions: 3 | Co-occurs with: 36 confirmed concepts
Context:
  > Separate from Edges
  > Edges:** Backgrounds are narrative identity
  > Separate from Edges

### Behavior (score: 22.8)
Files: 5 | Mentions: 24 | Definitions: 2 | Co-occurs with: 29 confirmed concepts
Context:
  > - **P6 (Enemies):** Behavior lines prevent identical enemy tactics
  > If you have to invent a new behavior, the connection is forced
  > The structural shaper weakening glass (adjacent to metal/concrete, different material behavior)

### Thaumatech (score: 22)
Files: 10 | Mentions: 95 | Definitions: 1 | Co-occurs with: 35 confirmed concepts
Context:
  > This document defines how to create equipment entries: weapons, armor, gear, and thaumatech devices
  > Thaumatech is detectable
  > Thaumatech devices follow the rules in `rules/THAUMATECH.md`:

- **Personal thaumatech** operates through contact plates

### Sidearm (score: 21.3)
Files: 6 | Mentions: 21 | Definitions: 1 | Co-occurs with: 26 confirmed concepts
Context:
  > Ranged/Long/Sidearm interact with positioning
  > | P13, P15 |
| D10 | Weapon properties | 8 tags (Ranged, Sidearm, Thrown, Long, Loud, Brutal, Subtle, Slow)
  > |
| Sidearm | Attacks at Close and Near

### Exposed (score: 19.8)
Files: 4 | Mentions: 11 | Definitions: 1 | Co-occurs with: 27 confirmed concepts
Context:
  > **Result:** Strong Break lands: breach is structurally Exposed (+2 vulnerability to sealing)
  > He fires at the Exposed breach to try to seal it
  > | **Exposed.** +2 damage taken, one turn

### Impaired (score: 19.2)
Files: 4 | Mentions: 4 | Definitions: 1 | Co-occurs with: 18 confirmed concepts
Context:
  > Strong (6): target is Impaired (-2 damage) AND loses next Move.
  > |
| **Break** | **Impaired.** -2 damage dealt, one turn
  > | Effect | Mechanic | Duration |
|-|-|-|
| **Impaired** | -2 damage dealt | One turn |
| **Exposed** | +2 damage taken | One turn |
| **Prone** | Stand costs Move

### Gambits (score: 19)
Files: 12 | Mentions: 99 | Definitions: 0 | Co-occurs with: 39 confirmed concepts
Context:
  > - **P6, P9 (Gambits):** Gambits make every attack a tactical decision, producing cinematic moments through mechanical choices
  > | P11 |
| D3 | Action economy | Move + Act per turn; React on enemy turns; no initiative | P6, P11, P15 |
| D4 | Success granularity | Three tiers + critical (6 / 4-5 / 1-3 / double 6) | P1, P4 |
| - 
  > | P6, P9 |
| D14 | Gear Gambits | 12 gear-unlocked Gambits across 3 categories (Sensory, Movement, Disruption)

### Stakes (score: 19)
Files: 7 | Mentions: 72 | Definitions: 0 | Co-occurs with: 37 confirmed concepts
Context:
  > - **P1, P6 (Stakes):** Stakes replace difficulty classes and position/effect
  > | P11 |
| D3 | Action economy | Move + Act per turn; React on enemy turns; no initiative | P6, P11, P15 |
| D4 | Success granularity | Three tiers + critical (6 / 4-5 / 1-3 / double 6) | P1, P4 |
| - 
  > GM sets damage in stakes by scale

### Move (score: 19)
Files: 10 | Mentions: 99 | Definitions: 0 | Co-occurs with: 35 confirmed concepts
Context:
  > | P11 |
| D3 | Action economy | Move + Act per turn; React on enemy turns; no initiative | P6, P11, P15 |
| D4 | Success granularity | Three tiers + critical (6 / 4-5 / 1-3 / double 6) | P1, P4 |
| - 
  > Heavy weapons prevent Move+Act
  > |
| Slow | Cannot attack and Move in the same turn

### Act (score: 19)
Files: 11 | Mentions: 88 | Definitions: 0 | Co-occurs with: 39 confirmed concepts
Context:
  > | P11 |
| D3 | Action economy | Move + Act per turn; React on enemy turns; no initiative | P6, P11, P15 |
| D4 | Success granularity | Three tiers + critical (6 / 4-5 / 1-3 / double 6) | P1, P4 |
| - 
  > **Full shaping Gambits (unlocked at Shaper, in addition to Sparked base):**

- **Thread.** Sustain a previous shaping effect for one more round without spending your Act
  > The modifications follow the same five Edge shapes:

- **Unlock:** "You can now shape in a way others can't." (Adjacent-scope access, sustained shaping without Act cost, shaping under conditions that 

### Positioning (score: 19)
Files: 9 | Mentions: 20 | Definitions: 0 | Co-occurs with: 34 confirmed concepts
Context:
  > - **P6, P15 (Positioning):** Three ranges, not a grid
  > | # | Decision | Answer | Laws |
|-|-|-|-|
| D8 | Positioning model | Three abstract ranges (Close/Near/Far), not zones or grid
  > The categories:

| Category | What it covers |
|-|-|
| **Combat** | Fighting, weapons, tactical positioning |
| **Survival** | Endurance, navigation, environmental resilience |
| **Social** | Persuasi

### Close (score: 19)
Files: 9 | Mentions: 109 | Definitions: 0 | Co-occurs with: 38 confirmed concepts
Context:
  > | # | Decision | Answer | Laws |
|-|-|-|-|
| D8 | Positioning model | Three abstract ranges (Close/Near/Far), not zones or grid
  > **Close the door.** The character decides they never want to go there again
  > - A perception shaper's Edge might grant **Echo**: sacrifice a die to sense everything within Close range for one round, no line of sight required

### Near (score: 19)
Files: 8 | Mentions: 81 | Definitions: 0 | Co-occurs with: 37 confirmed concepts
Context:
  > | # | Decision | Answer | Laws |
|-|-|-|-|
| D8 | Positioning model | Three abstract ranges (Close/Near/Far), not zones or grid
  > A Knack character near a DPA scanner is flagged
  > Weapons use the dice categories from `rules/CORE.md`:

| Category | Dice | Examples |
|-|-|-|
| Unarmed / Improvised | 1d4 | Fists, bottle, chair leg |
| Light | 1d6 | Knife, baton, small pistol |
| M

### Far (score: 19)
Files: 8 | Mentions: 49 | Definitions: 0 | Co-occurs with: 38 confirmed concepts
Context:
  > | # | Decision | Answer | Laws |
|-|-|-|-|
| D8 | Positioning model | Three abstract ranges (Close/Near/Far), not zones or grid
  > Weapons use the dice categories from `rules/CORE.md`:

| Category | Dice | Examples |
|-|-|-|
| Unarmed / Improvised | 1d4 | Fists, bottle, chair leg |
| Light | 1d6 | Knife, baton, small pistol |
| M
  > - **Device gambits cost Push.** GM sizes the cost from the fiction based on how far past rated function you're stretching

### Weapons (score: 19)
Files: 9 | Mentions: 83 | Definitions: 0 | Co-occurs with: 32 confirmed concepts
Context:
  > WS6 assigns to specific weapons
  > The categories:

| Category | What it covers |
|-|-|
| **Combat** | Fighting, weapons, tactical positioning |
| **Survival** | Endurance, navigation, environmental resilience |
| **Social** | Persuasi
  > This document defines how to create equipment entries: weapons, armor, gear, and thaumatech devices

### Properties (score: 19)
Files: 7 | Mentions: 26 | Definitions: 0 | Co-occurs with: 26 confirmed concepts
Context:
  > - **P6 (Weapon Properties):** Tags create tactical differentiation without a wargame
  > | P13, P15 |
| D10 | Weapon properties | 8 tags (Ranged, Sidearm, Thrown, Long, Loud, Brutal, Subtle, Slow)
  > Weapons use the dice categories from `rules/CORE.md`:

| Category | Dice | Examples |
|-|-|-|
| Unarmed / Improvised | 1d4 | Fists, bottle, chair leg |
| Light | 1d6 | Knife, baton, small pistol |
| M

### Loud (score: 19)
Files: 7 | Mentions: 37 | Definitions: 0 | Co-occurs with: 32 confirmed concepts
Context:
  > Loud interacts with clocks
  > | P13, P15 |
| D10 | Weapon properties | 8 tags (Ranged, Sidearm, Thrown, Long, Loud, Brutal, Subtle, Slow)
  > Loud weapons tick clocks

### Shaping Gambits (score: 19)
Files: 4 | Mentions: 16 | Definitions: 0 | Co-occurs with: 29 confirmed concepts
Context:
  > This document defines how gambits work beyond the base 15, and the rules for creating property-category, defensive, act replacement, and shaping gambits
  > This applies to all gambit sources: base, weapon-specific, property-category, defensive, device, and shaping gambits
  > Shaping gambits are unlocked by the thaumic spectrum

### Body (score: 19)
Files: 7 | Mentions: 57 | Definitions: 0 | Co-occurs with: 37 confirmed concepts
Context:
  > Innate drain = Guard (body)
  > | # | Decision | Answer | Laws |
|-|-|-|-|
| D5 | Magic cost model | Innate drain = Guard (body cost, overflow to Harm)
  > |
| P13 | Complementary Tracks | Guard handles damage (body)

### Combat (score: 19)
Files: 10 | Mentions: 85 | Definitions: 0 | Co-occurs with: 38 confirmed concepts
Context:
  > - Trained Tactics (Edge-gated combat actions: Suppressing Fire, Tactical Retreat, Covering, Holding Ground): live in Edges or in a tactics subsection
  > **Shaping gambits as survival tools:** Combat gambits are aggressive — they change the battlefield
  > Push adds a fifth: the same 4-box track fuels combat, shaping, and survival

### Survival (score: 19)
Files: 7 | Mentions: 35 | Definitions: 0 | Co-occurs with: 27 confirmed concepts
Context:
  > The shaper trades shaping quality for operational survival (hiding from the DPA, containing bleed, managing heat)
  > **Shaping gambits as survival tools:** Combat gambits are aggressive — they change the battlefield
  > **Three innate costs (Guard in stakes, heat clock, escalated stakes):** Each creates a different pressure: survival cost, accumulating attention, narrative weight

### The Roll (score: 18.9)
Files: 7 | Mentions: 34 | Definitions: 0 | Co-occurs with: 32 confirmed concepts
Context:
  > - **P1, P4 (The Roll):** Every roll produces a result
  > The Knack is the roll
  > The GM sets consequences before the roll, same as any other stakes declaration

### Subtle (score: 18.9)
Files: 10 | Mentions: 33 | Definitions: 0 | Co-occurs with: 35 confirmed concepts
Context:
  > | P13, P15 |
| D10 | Weapon properties | 8 tags (Ranged, Sidearm, Thrown, Long, Loud, Brutal, Subtle, Slow)
  > - **Anchor.** The Tell stays subtle
  > Subtle weapons do less damage

### Physical (score: 18.9)
Files: 5 | Mentions: 45 | Definitions: 0 | Co-occurs with: 34 confirmed concepts
Context:
  > What's your Tell doing?"

If they describe something concrete and physical (pressing both palms against the wall, breathing into the lighter flame, holding eye contact while counting under their breat
  > | Axis | What it covers |
|-|-|
| Expertise | Drilled until automatic |
| Experience | Survived and carry forward |
| Relationship | Who they are to others |
| Perception | Read situations differently
  > | Category | Scope |
|-|-|
| Combat | Fighting, weapons, tactical positioning |
| Survival | Endurance, navigation, environmental resilience |
| Social | Persuasion, deception, reading people |
| Prof

### Progression (score: 18.6)
Files: 6 | Mentions: 17 | Definitions: 0 | Co-occurs with: 25 confirmed concepts
Context:
  > | P10, P17 |
| D21 | Progression model | No XP, no levels
  > Guard growth creates natural progression
  > | P10, P17 |
| D21 | Progression model | No XP, no levels

### Ranged (score: 18.3)
Files: 9 | Mentions: 53 | Definitions: 0 | Co-occurs with: 33 confirmed concepts
Context:
  > Ranged/Long/Sidearm interact with positioning
  > | P6, P15 |
| D9 | Cover | +1/+2 Armor vs ranged (partial/full)
  > Weapons use the dice categories from `rules/CORE.md`:

| Category | Dice | Examples |
|-|-|-|
| Unarmed / Improvised | 1d4 | Fists, bottle, chair leg |
| Light | 1d6 | Knife, baton, small pistol |
| M

### Long (score: 18.3)
Files: 8 | Mentions: 87 | Definitions: 0 | Co-occurs with: 34 confirmed concepts
Context:
  > Ranged/Long/Sidearm interact with positioning
  > | P13, P15 |
| D10 | Weapon properties | 8 tags (Ranged, Sidearm, Thrown, Long, Loud, Brutal, Subtle, Slow)
  > A conversation pauses for a beat too long

### Examples (score: 18.3)
Files: 4 | Mentions: 33 | Definitions: 0 | Co-occurs with: 28 confirmed concepts
Context:
  > Weapons use the dice categories from `rules/CORE.md`:

| Category | Dice | Examples |
|-|-|-|
| Unarmed / Improvised | 1d4 | Fists, bottle, chair leg |
| Light | 1d6 | Knife, baton, small pistol |
| M
  > | Device Stat | Device Types | Examples |
|-|-|-|
| Sharp | Precision instruments, scanners, targeting | BTC scanner, signature reader, channeling rifle |
| Nerve | Channeling, wards, medical, control
  > | Value | Level | Examples |
|-|-|-|
| 0 | No protection | Street clothes |
| 1 | Light | Padded coat, leather, minor ward |
| 2 | Moderate | Tactical vest, reinforced gear, shielding charm |
| 3 | He

### Hurt (score: 18)
Files: 4 | Mentions: 27 | Definitions: 0 | Co-occurs with: 32 confirmed concepts
Context:
  > A consequence might cost the full attempt plus L1 Hurt
  > - **Costs must hurt.** 1 Guard for base use is a real resource in a system where Guard is your survival buffer
  > Guard cost approaches Scar territory (3-4 on success, L1 Hurt on partial, death or L2+ on consequence)

### Thrown (score: 18)
Files: 6 | Mentions: 30 | Definitions: 0 | Co-occurs with: 33 confirmed concepts
Context:
  > | P13, P15 |
| D10 | Weapon properties | 8 tags (Ranged, Sidearm, Thrown, Long, Loud, Brutal, Subtle, Slow)
  > |
| Thrown | Can attack at Near
  > | P13, P15 |
| D10 | Weapon properties | 8 tags (Ranged, Sidearm, Thrown, Long, Loud, Brutal, Subtle, Slow)

### Loss (score: 17.7)
Files: 5 | Mentions: 18 | Definitions: 0 | Co-occurs with: 26 confirmed concepts
Context:
  > Channel loss produces a Temporary Edge (pending decision), not a punishment
  > Channel loss produces Temporary Edge
  > Nosebleed, burst capillaries, nerve pain, temporary blindness, loss of fine motor control

### Social (score: 17.7)
Files: 5 | Mentions: 33 | Definitions: 0 | Co-occurs with: 32 confirmed concepts
Context:
  > Every point of Armor above 1 should have a social or tactical cost.
  > Social acceptance
  > | File | Domain | Contains | Status |
|-|-|-|-|
| `DESIGN.md` | Global | Design laws, universal generation principles, cross-references, GM guidance, master decision log | This document |
| `CORE.md` 

### Redirect (score: 17.6)
Files: 3 | Mentions: 17 | Definitions: 1 | Co-occurs with: 36 confirmed concepts
Context:
  > Gear Gambits (defined in `rules/CORE.md`) fall into three categories:

| Category | Gambits |
|-|-|
| Sensory Denial | Flash, Obscure, Deafen, Mark |
| Movement Control | Restrain, Slow, Barrier, Pull
  > **Redirect.** On a partial or consequence, choose where the thaumic side effect goes
  > - A structural shaper's Edge might extend **Redirect** to work on incoming physical attacks, not just thaumic side effects

### Saves (score: 17.4)
Files: 6 | Mentions: 48 | Definitions: 0 | Co-occurs with: 35 confirmed concepts
Context:
  > | # | Decision | Answer | Laws |
|-|-|-|-|
| D28 | Saves | Roll specified stat, same table
  > It has mechanical teeth: Boon on Nerve saves against thaumic effects while active
  > Boon on Nerve saves against thaumic effects while this Edge is active

### Perception (score: 17.4)
Files: 5 | Mentions: 17 | Definitions: 0 | Co-occurs with: 30 confirmed concepts
Context:
  > The perception shaper reading the room
  > | Axis | What it covers |
|-|-|
| Expertise | Drilled until automatic |
| Experience | Survived and carry forward |
| Relationship | Who they are to others |
| Perception | Read situations differently
  > You shaped the perception alongside the effect

### Total (score: 17.1)
Files: 5 | Mentions: 22 | Definitions: 0 | Co-occurs with: 29 confirmed concepts
Context:
  > | Tier | Edges | Trait |
|-|-|-|
| Zero (Mundane) | 4 free | Thaumic Null |
| Knack | 1 Knack + 2 free (3 total) | |
| Sparked | 1 Knack + 1 Sparked + 1 free (3 total) | |
| Shaper | 1 Knack + 1 Spark
  > - **Total: 100-150 Edges.** Enough range for diverse characters
  > | Type | Target |
|-|-|
| Named chains | 8-12 |
| Standalone Edges | 80-120 |
| Total | 100-150 |

### Zeroes (score: 17.1)
Files: 6 | Mentions: 13 | Definitions: 0 | Co-occurs with: 19 confirmed concepts
Context:
  > Characters start with **3 Edges** (positives) or **4 Edges** (zeroes, who compensate for lack of thaumic access with broader training)
  > **Zero balance philosophy:** Zeroes get more breadth (4 Edges vs 3) and stealth (Thaumic Null)
  > | P17 |
| D20 | Zero/positive balance | Zeroes: 4 Edges + Thaumic Null

### Slow (score: 17.1)
Files: 6 | Mentions: 44 | Definitions: 0 | Co-occurs with: 30 confirmed concepts
Context:
  > | P13, P15 |
| D10 | Weapon properties | 8 tags (Ranged, Sidearm, Thrown, Long, Loud, Brutal, Subtle, Slow)
  > |
| Slow | Cannot attack and Move in the same turn
  > Gear Gambits (defined in `rules/CORE.md`) fall into three categories:

| Category | Gambits |
|-|-|
| Sensory Denial | Flash, Obscure, Deafen, Mark |
| Movement Control | Restrain, Slow, Barrier, Pull

### Relationship (score: 17.1)
Files: 5 | Mentions: 18 | Definitions: 0 | Co-occurs with: 26 confirmed concepts
Context:
  > **Relationship to the Ambush tactic:** The Ambush tactic in `rules/CORE.md` covers planned ambushes (Sharp roll to set up, ambushing characters act first, no defense roll on the opening attack)
  > Prior relationship and reputation do mechanical work that isn't fully captured in stats
  > | Axis | What it covers |
|-|-|
| Expertise | Drilled until automatic |
| Experience | Survived and carry forward |
| Relationship | Who they are to others |
| Perception | Read situations differently

### Stats (score: 17)
Files: 6 | Mentions: 39 | Definitions: 0 | Co-occurs with: 32 confirmed concepts
Context:
  > **Fixed stats:** Stat growth creates convergence
  > | P13, P14, P15 |
| D18 | Stat permanence | Stats fixed at creation
  > - **P2 (Stats):** Creativity rewarded by letting players choose approach, which determines stat

### Armor (score: 17)
Files: 7 | Mentions: 90 | Definitions: 0 | Co-occurs with: 38 confirmed concepts
Context:
  > - **P13 (Cover):** Armor bonus, not attacker Snag
  > | P6, P15 |
| D9 | Cover | +1/+2 Armor vs ranged (partial/full)
  > This document defines how to create equipment entries: weapons, armor, gear, and thaumatech devices

### Critical (score: 17)
Files: 6 | Mentions: 48 | Definitions: 0 | Co-occurs with: 33 confirmed concepts
Context:
  > | P11 |
| D3 | Action economy | Move + Act per turn; React on enemy turns; no initiative | P6, P11, P15 |
| D4 | Success granularity | Three tiers + critical (6 / 4-5 / 1-3 / double 6) | P1, P4 |
| - 
  > |
| Brutal | On a critical: damage = sum of two highest dice
  > A field patch stabilizes a Critical injury

### Positives (score: 16.9)
Files: 9 | Mentions: 28 | Definitions: 0 | Co-occurs with: 31 confirmed concepts
Context:
  > Characters start with **3 Edges** (positives) or **4 Edges** (zeroes, who compensate for lack of thaumic access with broader training)
  > Positives get depth (thaumic access, magic system)
  > Positives: 3 Edges + thaumic access

### Recovery (score: 16.8)
Files: 4 | Mentions: 15 | Definitions: 0 | Co-occurs with: 22 confirmed concepts
Context:
  > - **P12 (Push):** Push recovery is narrative, not mechanical
  > | P11 |
| D3 | Action economy | Move + Act per turn; React on enemy turns; no initiative | P6, P11, P15 |
| D4 | Success granularity | Three tiers + critical (6 / 4-5 / 1-3 / double 6) | P1, P4 |
| - 
  > |
| P12 | Narrative Progression | Recovery, Push refill, Guard growth, Scars

### Your Turn (score: 16.8)
Files: 4 | Mentions: 15 | Definitions: 0 | Co-occurs with: 30 confirmed concepts
Context:
  > They're declared on your turn during your attack
  > **Replace the Act, not the Move.** You can still Move on your turn
  > Sacrifice a die 4+ from your attack roll on your turn

### Brutal (score: 16.8)
Files: 5 | Mentions: 27 | Definitions: 0 | Co-occurs with: 30 confirmed concepts
Context:
  > | P13, P15 |
| D10 | Weapon properties | 8 tags (Ranged, Sidearm, Thrown, Long, Loud, Brutal, Subtle, Slow)
  > |
| Brutal | On a critical: damage = sum of two highest dice
  > Standard roll with brutal stakes

### Experience (score: 16.8)
Files: 4 | Mentions: 18 | Definitions: 0 | Co-occurs with: 26 confirmed concepts
Context:
  > It's the system acknowledging that experience is real, and it shows up at the table as a die
  > Handle this as a Boon when:
- The target has direct prior experience of the character's capability
- The character's reputation in this specific context precedes them and is relevant to the Influence 
  > | Axis | What it covers |
|-|-|
| Expertise | Drilled until automatic |
| Experience | Survived and carry forward |
| Relationship | Who they are to others |
| Perception | Read situations differently

### Conditions (score: 16.5)
Files: 4 | Mentions: 14 | Definitions: 0 | Co-occurs with: 31 confirmed concepts
Context:
  > | P4, P15 |
| D29 | Conditions | Four named conditions (Stunned, Shaken, Prone, Staggered) with mechanical definitions
  > The modifications follow the same five Edge shapes:

- **Unlock:** "You can now shape in a way others can't." (Adjacent-scope access, sustained shaping without Act cost, shaping under conditions that 
  > | P4, P15 |
| D29 | Conditions | Four named conditions (Stunned, Shaken, Prone, Staggered) with mechanical definitions

### Edges. (score: 16)
Files: 8 | Mentions: 15 | Definitions: 0 | Co-occurs with: 28 confirmed concepts
Context:
  > The full Edge catalog is in `rules/EDGES.md`
  > | WS | Content | Status |
|-|-|-|
| WS1 | Core Rules Engine | Complete (`rules/CORE.md`) |
| WS2 | Character Creation | Complete (`rules/CHARACTER.md`) |
| WS3 | Magic & Drain | Complete (`rules/MAGIC
  > `rules/DESIGN-EDGES.md`

### Wounded (score: 15.5)
Files: 3 | Mentions: 27 | Definitions: 0 | Co-occurs with: 27 confirmed concepts
Context:
  > **Hollow Nerve** *(Body + Loss, Situational Boon)*
Boon on Nerve saves when you're already at L2 Wounded or worse
  > Guard damage from innate shaping follows the same overflow rules as combat damage:

| Overflow | Harm Level |
|-|-|
| 1-2 | Level 1 (Hurt): nosebleed, shaking hands, ringing ears |
| 3-4 | Level 2 (Wo
  > **Harm, minimum Level 2.** All Guard overflow becomes Harm as normal, with a floor of Level 2 (Wounded)

### Danger Clock (score: 15.3)
Files: 1 | Mentions: 9 | Definitions: 2 | Co-occurs with: 21 confirmed concepts
Context:
  > **Danger Clock:** 6 segments
  > Miss: full lash damage + Danger Clock +2
  > Danger Clock: 1/6

### Scars (score: 14.6)
Files: 3 | Mentions: 12 | Definitions: 0 | Co-occurs with: 18 confirmed concepts
Context:
  > Growth comes from new options (Edges), resilience (Guard from Scars), and narrative change
  > Growth through Edges, Scars, narrative
  > - **P12 (Scars):** Narrative anchors, not a penalty table

### Personal thaumatech (score: 14.6)
Files: 3 | Mentions: 11 | Definitions: 0 | Co-occurs with: 25 confirmed concepts
Context:
  > | P14, P17 |
| - | Contact plate system | Personal thaumatech through contact plates
  > Cannot operate personal thaumatech (contact plates read nothing, the device stays inert in your hands)
  > No personal thaumatech

### Starting Guard (score: 14.2)
Files: 4 | Mentions: 4 | Definitions: 0 | Co-occurs with: 6 confirmed concepts
Context:
  > **Starting Guard = 2 + your highest stat** (range 3-6, max 10 through Scars)
  > | P2, P14 |
| D17 | Starting Guard | 2 + highest stat (range 3-6)
  > | P2, P14 |
| D17 | Starting Guard | 2 + highest stat (range 3-6)

### Staggered (score: 14)
Files: 3 | Mentions: 20 | Definitions: 0 | Co-occurs with: 28 confirmed concepts
Context:
  > | P4, P15 |
| D29 | Conditions | Four named conditions (Stunned, Shaken, Prone, Staggered) with mechanical definitions
  > | P4, P15 |
| D29 | Conditions | Four named conditions (Stunned, Shaken, Prone, Staggered) with mechanical definitions
  > If Staggered, phase through the nearest wall and re-approach from a different angle next round

### Shaper Edges (score: 14)
Files: 3 | Mentions: 6 | Definitions: 0 | Co-occurs with: 20 confirmed concepts
Context:
  > Character-specific shaping gambits come from Shaper Edges
  > - Shaping gambit extensions from Shaper Edges: how many character-specific gambits is too many
  > Granted by Shaper Edges

### Thaumic Null (score: 13.7)
Files: 3 | Mentions: 9 | Definitions: 0 | Co-occurs with: 18 confirmed concepts
Context:
  > **Zero balance philosophy:** Zeroes get more breadth (4 Edges vs 3) and stealth (Thaumic Null)
  > | P17 |
| D20 | Zero/positive balance | Zeroes: 4 Edges + Thaumic Null
  > | P17 |
| D20 | Zero/positive balance | Zeroes: 4 Edges + Thaumic Null

### Combat Gambits (score: 13.7)
Files: 3 | Mentions: 4 | Definitions: 0 | Co-occurs with: 12 confirmed concepts
Context:
  > These Gambits represent the same trade as combat Gambits: sacrifice outcome quality for operational control
  > The principle: combat Gambits change the battlefield
  > **Shaping gambits as survival tools:** Combat gambits are aggressive — they change the battlefield

### Gambit Extension (score: 13.7)
Files: 3 | Mentions: 4 | Definitions: 0 | Co-occurs with: 14 confirmed concepts
Context:
  > "This Edge grants an enhanced Shove" not "this Edge pushes enemies." If it doesn't reference a gambit by name, it's not a gambit extension
  > They come in five shapes: Unlock, Situational Boon, Resource Trade, Gambit Extension, and New Gambit
  > | Shape | Pattern |
|-|-|
| Unlock | "You can now do X." |
| Situational Boon | "Boon on [stat] when [trigger]." |
| Resource Trade | "Spend [cost] to get [benefit]." |
| Gambit Extension | Modifies a

### Scale Tiers (score: 13.6)
Files: 2 | Mentions: 3 | Definitions: 1 | Co-occurs with: 19 confirmed concepts
Context:
  > - **Scale tiers:** Trivial (1 Guard, no roll) / Moderate / Ambitious / Extreme / Beyond (Break only)
  > This is the same fiction-first sizing as shaping scale tiers, not a rigid table

### The Mechanics (score: 13.4)
Files: 3 | Mentions: 5 | Definitions: 0 | Co-occurs with: 18 confirmed concepts
Context:
  > It happens when the fiction closes a door the mechanics left open
  > The mechanics are working correctly
  > The channel doesn't change the mechanics

### Melee (score: 13.4)
Files: 3 | Mentions: 41 | Definitions: 0 | Co-occurs with: 28 confirmed concepts
Context:
  > Available to any weapon used at Close range (all melee weapons, plus Sidearm weapons at Close)
  > **Haymaker** (Combat/Expertise, New Gambit) — New melee gambit: **Stagger.** Sacrifice 4+: target loses their next Move
  > Melee Boon / Ranged Snag against them

### Design Principles (score: 11.9)
Files: 3 | Mentions: 4 | Definitions: 0 | Co-occurs with: 7 confirmed concepts
Context:
  > Design principles, generation rules, and all tests live in `rules/DESIGN-EDGES.md`
  > Design principles, generation rules, and all tests live in `rules/DESIGN-EQUIPMENT.md`
  > Design principles and generation rules live in `rules/DESIGN-GAMBITS.md`

### New Gambit (score: 11.5)
Files: 2 | Mentions: 6 | Definitions: 0 | Co-occurs with: 19 confirmed concepts
Context:
  > They come in five shapes: Unlock, Situational Boon, Resource Trade, Gambit Extension, and New Gambit
  > |
| New Gambit | Adds a Gambit not on the base list
  > **Haymaker** (Combat/Expertise, New Gambit) — New melee gambit: **Stagger.** Sacrifice 4+: target loses their next Move

### Design Decisions (score: 11.2)
Files: 4 | Mentions: 4 | Definitions: 0 | Co-occurs with: 0 confirmed concepts
Context:
  > This document records the design decisions and rationale behind character creation
  > This document records the design decisions, rationale, and probability math behind the core rules engine
  > This document records the design decisions, rationale, and philosophy behind the magic system

### Expertise (score: 11.2)
Files: 2 | Mentions: 14 | Definitions: 0 | Co-occurs with: 23 confirmed concepts
Context:
  > | Axis | What it covers |
|-|-|
| Expertise | Drilled until automatic |
| Experience | Survived and carry forward |
| Relationship | Who they are to others |
| Perception | Read situations differently
  > **Haymaker** (Combat/Expertise, New Gambit) — New melee gambit: **Stagger.** Sacrifice 4+: target loses their next Move
  > **Spotter** (Combat/Expertise, Gambit Extension) — Your Read gambit on ranged attacks also grants Boon on the next attack against that target (you or an ally), in addition to the detail

### Pressure (score: 11.2)
Files: 2 | Mentions: 35 | Definitions: 0 | Co-occurs with: 35 confirmed concepts
Context:
  > The person who knows their tools treats them better under pressure.
  > **Knack: Pressure Reader** (Knack/Perception) — Feel structural stress in objects and walls at Close
  > Knack Boon (Pressure Reader, structural stress)

### Attacking (score: 10.9)
Files: 2 | Mentions: 15 | Definitions: 0 | Co-occurs with: 30 confirmed concepts
Context:
  > You perform the action instead of attacking
  > | Source | Where Defined | Available To |
|-|-|-|
| Base (15) | `rules/CORE.md` | Everyone, every roll |
| Weapon/gear-specific | `rules/EQUIPMENT.md` | Anyone wielding that weapon or carrying that ge
  > - **Reposition:** After attacking, may phase one band in any direction (including through walls)

### Danger Clocks (score: 10.9)
Files: 2 | Mentions: 4 | Definitions: 0 | Co-occurs with: 12 confirmed concepts
Context:
  > - **P3 (Danger Clocks):** Mechanical urgency
  > | P11 |
| D3 | Action economy | Move + Act per turn; React on enemy turns; no initiative | P6, P11, P15 |
| D4 | Success granularity | Three tiers + critical (6 / 4-5 / 1-3 / double 6) | P1, P4 |
| - 
  > Danger Clocks tick

### Shift (score: 10.9)
Files: 2 | Mentions: 32 | Definitions: 0 | Co-occurs with: 29 confirmed concepts
Context:
  > **Delia, the night-shift nurse.** Thirty years of other people's pain
  > Player and GM collaborate on what it is, based on what the magic was doing:
   - Physical: eyes shift color, skin marks where the energy flowed, temperature around you is always wrong
   - Sensory: yo
  > "Drain the scanner deeper." "Override the safety." "We don't have time for the rated procedure." Every shift, a few more Drain boxes flip

### Tier (score: 10.9)
Files: 2 | Mentions: 11 | Definitions: 0 | Co-occurs with: 21 confirmed concepts
Context:
  > Sacrifices one 5 for **Push.** Other 5 still highest, no tier drop
  > **Sacrifice-tier-drop is the core drama.** Every decision to sacrifice a highest die produced the best moments
  > Result drops a tier

### Bonds (score: 10.6)
Files: 2 | Mentions: 4 | Definitions: 0 | Co-occurs with: 17 confirmed concepts
Context:
  > MONDAS characters get broader (more Edges), tougher (Guard growth), and more connected (Bonds), but they never outscale the world
  > | File | Domain | Contains | Status |
|-|-|-|-|
| `DESIGN.md` | Global | Design laws, universal generation principles, cross-references, GM guidance, master decision log | This document |
| `CORE.md` 

### Act + Move (score: 10.6)
Files: 2 | Mentions: 2 | Definitions: 0 | Co-occurs with: 19 confirmed concepts
Context:
  > Lasts until combat ends or target spends Act + Move to snap it
  > **Act + Move** to escape

### Bank the die (score: 10.6)
Files: 2 | Mentions: 2 | Definitions: 0 | Co-occurs with: 12 confirmed concepts
Context:
  > **D66: Setup for ally is standard.** Standard Setup (4+): bank the die for yourself OR hand it to an ally
  > |
| **Setup** | **Bank the die** (keep its value)

### Enemies (score: 10.6)
Files: 2 | Mentions: 45 | Definitions: 0 | Co-occurs with: 33 confirmed concepts
Context:
  > - **P6 (Enemies):** Behavior lines prevent identical enemy tactics
  > "This Edge grants an enhanced Shove" not "this Edge pushes enemies." If it doesn't reference a gambit by name, it's not a gambit extension

### Professional (score: 10.6)
Files: 2 | Mentions: 14 | Definitions: 0 | Co-occurs with: 23 confirmed concepts
Context:
  > Background check or professional certification
  > | Category | Scope |
|-|-|
| Combat | Fighting, weapons, tactical positioning |
| Survival | Endurance, navigation, environmental resilience |
| Social | Persuasion, deception, reading people |
| Prof

### Mental (score: 10.6)
Files: 2 | Mentions: 8 | Definitions: 0 | Co-occurs with: 18 confirmed concepts
Context:
  > | Category | Scope |
|-|-|
| Combat | Fighting, weapons, tactical positioning |
| Survival | Endurance, navigation, environmental resilience |
| Social | Persuasion, deception, reading people |
| Prof
  > | Layer | Thaumatech | Innate Shaping |
|-|-|-|
| Scope | Determined by device | Shaped by obsession, agreed with GM |
| Technique | Contact plates, rated function | Tell: personal, observable, blocka

## Output Format
Respond with a markdown table:
| Name | Verdict | Notes |
|-|-|-|
| Example | APPROVE | Weapon property for ranged attacks |
| Example2 | REJECT | Just a section header |
| Example3 | MERGE:Guard | Plural of existing concept |
