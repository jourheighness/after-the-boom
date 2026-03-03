# Player Guide Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Write `rules/PLAYER-GUIDE.md` — a player-facing teaching document covering Core rules + Thaumatech in ~460 lines.

**Architecture:** Single markdown file, 9 sections. Each section opens with a narrative beat using one of 6 recurring characters, teaches mechanics through that beat, closes with a compact reference box. Progressive disclosure — reads as a learning document, functions as a table reference.

**Source of Truth:** `rules/CORE.md` and `rules/THAUMATECH.md` for all mechanical accuracy. Design doc at `docs/plans/2026-03-03-player-guide-design.md` for structure, cast, and voice decisions.

---

## Prerequisites

Before starting any task:
1. Read the design doc: `docs/plans/2026-03-03-player-guide-design.md`
2. Read the full rules: `rules/CORE.md` (770 lines) and `rules/THAUMATECH.md` (114 lines)
3. Checkpoint: `git add -A && git commit -m "checkpoint: pre-player-guide"`

## Voice Guide

- **Narrative beats:** Specific sensory details. "The static itch crawled under his skin." Not "he felt the drain." Show the cost through the body.
- **Rules prose:** Direct, conversational. "Roll d6s equal to your stat. Read the highest." Not "the player rolls a number of d6 dice equivalent to..."
- **Decision trees:** Second person. "You rolled four dice. Your highest is a 5. One die shows a 4. Keep it for damage, or sacrifice it to Push the target back a band?"
- **Reference boxes:** Compact. Tables and one-liners. No narrative. Markdown blockquote with bold header.
- **No GM-facing content.** No enemy internals, no sizing guidance, no Threat tables, no Behavior lines. Players experience enemies through the fiction.
- **No meta-commentary.** No "this is the core mechanic" or "this system uses..." — just teach it.

## Cast Quick Reference

| Name | Species | Positive? | Stats | Role | Location |
|-|-|-|-|-|-|
| Niv | Goblin (Displaced) | Zero | S3/N2/G1 | Courier | Free Marches |
| Luka Stević | Human | Positive | G2/S2/N2 | Siphon tech | Rheinmark |
| Dr. Emeka Osei | Human | Positive | S3/N2/G1 | Harmonics inspector | Concordat field |
| Mae Dalton | Human | Zero | G2/S2/N2 | DPA desk sergeant | DPA field office |
| Hakim al-Rashidi | Human | Positive | G3/S2/N1 | Private contractor | Various |
| Élodie Marchetti | Elf (Displaced) | Positive | N3/S2/G1 | Customs clerk | Free Marches/Concordat |

---

### Task 0: Checkpoint and file scaffold

**Files:**
- Create: `rules/PLAYER-GUIDE.md`

**Step 1: Checkpoint**
```bash
git add -A && git commit -m "checkpoint: pre-player-guide"
```

**Step 2: Create scaffold**
Create `rules/PLAYER-GUIDE.md` with the document header and section headings only:
```markdown
# Player Guide

MONDAS Core Rules — Player Reference v0.1

***

## How This Works

## The Roll

## Gambits

## Getting Hurt

## Guard & Drain

## Your Gear

## Fighting

## Between Fights

## Quick Reference
```

**Step 3: Commit scaffold**
```bash
git add rules/PLAYER-GUIDE.md && git commit -m "scaffold: player guide section headings"
```

---

### Task 1: How This Works (~40 lines)

**Files:**
- Modify: `rules/PLAYER-GUIDE.md` (section 1)
- Reference: `rules/CORE.md:1-46` (In Two Minutes, Status, Edges)

**Characters:** Élodie (opener), then introduce the full cast.

**Content spec:**
1. Cold open: Élodie at the customs desk. A Form 27-exception for necro-parts import. The BTC spikes — her clicker ticks from green to amber. She feels it: the old authority, the silver-taste language, something vast stirring behind her eyes. She stamps the form. Files it. The clicker settles. Tuesday.
2. "This is a game about people like Élodie." One paragraph: you have a character, you describe what they do, dice determine what happens.
3. **Stats:** Grit (body), Sharp (senses), Nerve (will). Rated 1-4. Distribute 6 points (min 1 each). Common spreads: 3/2/1 specialist, 2/2/2 generalist. One sentence each for what they cover.
4. **Edges:** What makes your character yours. 3 Edges (positives) or 4 (zeroes). One sentence — they give mechanical benefits (bonus dice, new options, thaumic abilities).
5. **The cast:** Introduce all six in one line each. Name, what they do, why they matter to the reader. "You'll meet them throughout this guide."

**Validation:**
- Stats sum to 6, min 1 each ✓
- Edge counts match CORE.md (3 for positives, 4 for zeroes) ✓
- No GM-facing content ✓
- Opens with narrative, not rules ✓
- ~40 lines ✓

**Commit:** `feat(player-guide): section 1 — how this works`

---

### Task 2: The Roll (~50 lines)

**Files:**
- Modify: `rules/PLAYER-GUIDE.md` (section 2)
- Reference: `rules/CORE.md:48-118` (The Roll, Stakes, Boons & Snags)

**Characters:** Mae (main), Niv (zero dice example)

**Content spec:**
1. Mae's scene: Night shift. A name in a file doesn't match the intake log. She pulls the original Yellow Slip. Something's wrong. She's going to dig. GM says: "On a partial, you find it but the database flags the query. On a miss, the file's been redacted — and now your name's on the access log."
2. **The roll:** Roll d6s equal to your stat. Mae rolls Sharp (2d6). Read the highest. Table: 6 = full success, 4-5 = partial (cost/complication), 1-3 = consequence.
3. **Building the pool:** Before rolling, look for advantages. Background relevant? (+1d Boon). Right gear? (+1d). Creative approach? (+1d, max 1 from creativity). Ally helping? (+1d, costs their action). Edge applies? (+1d). Boons and Snags cancel 1-for-1.
4. **Decision tree:** Mae has Sharp 2. Her background (DPA procedures) applies: +1d Boon. She's rolling 3d6. Walk through each outcome with the stated stakes.
5. **Zero dice:** Niv at a Free Marches border checkpoint. Sharp 3, but two Snags (darkness, forged papers flagged). Net: 1d6. If one more Snag hit, she'd be at 0d — roll 2d6, take the lowest. The worst odds in the game. Niv's been there before.
6. **Stakes:** Before any roll, the GM tells you two things: what happens on a partial, what happens on a miss. You hear the stakes, then decide: roll, change approach, or back off.

**Reference box:**
> **The Roll:** [stat]d6, read highest. 6 = full, 4-5 = partial + cost, 1-3 = consequence. Boon = +1d, Snag = -1d, cancel 1:1. Min 0d = 2d6 take lowest. GM states stakes before you roll. You can always back off.

**Validation:**
- Roll results match CORE.md table exactly ✓
- Boon/Snag sources match CORE.md:97-117 ✓
- Zero dice rule correct (2d6 take lowest) ✓
- Stakes described from player perspective, not GM perspective ✓
- ~50 lines ✓

**Commit:** `feat(player-guide): section 2 — the roll`

---

### Task 3: Gambits (~60 lines)

**Files:**
- Modify: `rules/PLAYER-GUIDE.md` (section 3)
- Reference: `rules/CORE.md:121-477` (Gambits, Combat Gambits)

**Characters:** Hakim (combat gambits), Élodie (stakes gambits)

**Content spec:**
1. Hakim's scene: Three hostiles, a cargo container, bad angles. He fires — rolls his d8 sidearm + 1d6 Boon from flanking. Gets a 5, 5, 4. Three dice, two above threshold. He could keep all three for damage (highest = 5). Or sacrifice the 4 to Push one hostile into the open. Or sacrifice a 5 for a strong Push — target goes back a band AND hits the ground.
2. **The rule:** After any roll, you can sacrifice dice showing 4+ for guaranteed side effects. That's a gambit. One die = one effect. The die is gone — it doesn't count for damage or your result anymore.
3. **Decision tree:** "You have dice showing 4+. For each one: keep it (damage/result), or sacrifice it (effect). Sacrifice a 4-5 for a standard effect. Sacrifice a 6 for a strong effect."
4. **Combat gambits table:** The seven verbs (Push, Pull, Pin, Read, Break, Cover, Setup) with standard and strong effects. Plus the open clause: "You can always pitch something else of similar scope."
5. Élodie's scene: Customs negotiation going sideways. She rolls Nerve to talk down a smuggler. Gets a 6 and a 4. Full success — AND she sacrifices the 4 to Read a tell. The smuggler's hand went to his pocket when she mentioned Grid 12. Now she knows where the shipment is. Stakes gambits: sacrifice a 4+ to name something concrete the moment made possible.
6. **Two kinds of gambits:** Combat gambits (the seven-verb list, used on attack and defense rolls). Stakes gambits (anything, used on every other roll — social, exploration, thaumatech, doing something crazy mid-fight).

**Reference box:**
> **Gambits:** Sacrifice a die showing 4+ for an effect. 4-5 = standard, 6 = strong. Combat: Push, Pull, Pin, Read, Break, Cover, Setup (+ open clause). Stakes: name something concrete the action made possible. Both types available on defense rolls.

**Validation:**
- Seven combat gambits match CORE.md:457-466 exactly ✓
- Standard vs strong threshold correct (4+ standard, 6+ strong) ✓
- Stakes gambit description matches CORE.md:134-144 ✓
- No mention of gambit resistance (GM-facing) ✓
- ~60 lines ✓

**Commit:** `feat(player-guide): section 3 — gambits`

---

### Task 4: Getting Hurt (~50 lines)

**Files:**
- Modify: `rules/PLAYER-GUIDE.md` (section 4)
- Reference: `rules/CORE.md:217-311` (Taking Damage, Armor, Harm, Scars, Recovery)

**Characters:** Hakim (damage pipeline + Scars), Luka (Harm levels)

**Content spec:**
1. Hakim's scene: A CSS contractor catches him in the open. 6 damage. Hakim has Armor 1 (tactical vest) and Guard 4. Walk through the pipeline step by step:
   - Armor absorbs 1 → 5 remaining
   - Guard absorbs 4 → Guard hits 0 → take a Scar
   - Overflow: 1 → Level 1 Harm (Hurt)
2. **The pipeline:** Damage → Armor → Guard → overflow = Harm. Show it as a flow, not a list. "Every hit follows the same path."
3. **Armor:** 0 (nothing), 1 (padded coat, minor ward), 2 (tactical vest, shielding charm), 3 (full plate, rare).
4. **Harm:** Three levels, two slots each. Hurt (Snag when the injury interferes), Wounded (Snag on all rolls), Critical (must spend Drain to act at all). Overflow determines level: 1-2 = Hurt, 3-4 = Wounded, 5+ = Critical. Both slots full → bumps up. Both Critical slots full → you're done.
5. **Scars:** When Guard drops to 0, something changes permanently. Hakim's three: the shrapnel scar on his neck (physical), the ringing in his left ear when BTC spikes (sensory), the thing in his sleep (psychological). "Scars make your character more defined, not less capable." First Scar per session: +1 max Guard (cap 10).
6. Luka's shift gone wrong: siphon feedback. 3 damage, no armor. Guard absorbs 2 (hits 0 → Scar). Overflow 1 = Hurt. Next surge: 4 damage. Guard is already 0. All 4 overflows = Level 2 Wounded. Now everything is harder.

**Reference box:**
> **Damage Pipeline:** Damage → Armor (0-3) → Guard → overflow = Harm. Guard hits 0 = Scar (+1 max Guard, cap 10). Harm: L1 Hurt (Snag when relevant), L2 Wounded (Snag all), L3 Critical (Drain to act). Overflow: 1-2 = L1, 3-4 = L2, 5+ = L3. Both slots full → bumps up. Both L3 full = done.

**Validation:**
- Pipeline matches CORE.md:219-225 ✓
- Armor ratings match CORE.md:242-248 ✓
- Harm levels and overflow match CORE.md:253-271 ✓
- Scar rules match CORE.md:275-281 ✓
- ~50 lines ✓

**Commit:** `feat(player-guide): section 4 — getting hurt`

---

### Task 5: Guard & Drain (~50 lines)

**Files:**
- Modify: `rules/PLAYER-GUIDE.md` (section 5)
- Reference: `rules/CORE.md:155-215` (Guard & Drain)

**Characters:** Hakim (Guard), Luka (Drain + Cracking)

**Content spec:**
1. **Guard:** Your readiness. Starting Guard = 2 + highest stat (range 3-6, max 10 through Scars). When Guard drops, you haven't been hurt yet — you've been pushed, rattled, forced into worse positions. Refreshes in genuine safety ("if you'd feel safe enough to sit down and breathe").
2. **Drain:** Willpower. 4 boxes. Three uses: spend 1 to add +1d before any roll, spend 1 to act despite a Critical injury, or it's in the stakes when you use thaumatech. "Zeroes dig deep on guts alone. Positives split the same 4 boxes between guts and gear."
3. Luka's scene: End of a bad shift. He's at 1 Drain. Management wants one more extraction pass. He pushes the siphon tap past rated function — the GM puts 2 Drain in the stakes. He rolls, gets a partial. 2 Drain spent. He's at 0.
4. **Cracking:** When Drain empties, something breaks. Luka names it: *Numb.* Nothing reaches him. Not pain, not fear, not the people who need him to feel something. Snag on all rolls until it clears. Cracks clear through significant narrative moments — a conversation that reaches you, a choice that proves something. Not rest. Not items.
5. **Decision tree:** "When do you spend Drain?" → Need to guarantee a roll: +1d. → Critical injury but you have to move: spend 1 to act. → Using thaumatech: the GM puts it in the stakes. → At 1 Drain left: is this worth Cracking over?
6. Drain recovery: downtime. Spending time with someone who matters. Doing something that reminds you who you are. Proper rest. Indulging a vice (quick but the GM may complicate).

**Reference box:**
> **Guard:** 2 + highest stat (cap 10). Refreshes in genuine safety. **Drain:** 4 boxes. +1d before rolling (1/roll), act while Critical, thaumatech stakes. Empty = Crack (Snag all rolls). Crack clears through narrative, not rest. Drain recovers in downtime.

**Validation:**
- Starting Guard formula matches CORE.md:163 ✓
- Drain uses match CORE.md:173-179 ✓
- Crack rules match CORE.md:183-201 ✓
- Recovery matches CORE.md:205-213 ✓
- ~50 lines ✓

**Commit:** `feat(player-guide): section 5 — guard & drain`

---

### Task 6: Your Gear (~60 lines)

**Files:**
- Modify: `rules/PLAYER-GUIDE.md` (section 6)
- Reference: `rules/THAUMATECH.md:1-113`, `rules/CORE.md:497-548` (Weapons & Gear, Consumables)

**Characters:** Niv (no thaumatech), Luka (working-class thaumatech), Dr. Osei (high-end), Hakim (weapon gambit)

**Content spec:**
1. Open with contrast: Niv doesn't carry thaumatech. Her clicker reads 0.00. She carries two knives (d6 each, Subtle), three passports, and a reputation for arriving on time. The knives are light weapons — d6 damage, concealable, no questions.
2. **Weapons table:** Light (d6), Standard (d8), Heavy (d10), Devastating (d12). Key properties in one line each: Ranged, Sidearm, Brutal, Slow, Subtle. Not the full list — just what players encounter most.
3. **Thaumatech — the deal:** A device draws from your thaumic potential through contact plates on the skin. The device enables the action. You roll your stat based on your approach. The GM puts Drain in the stakes based on how hard you're pushing.
4. **Three tiers through three characters:**
   - Luka: Simple use. The siphon tap does what it's rated for. 6 = free, 4-5 = 1 Drain, 1-3 = 1 Drain + complication.
   - Luka on a bad day: Stretching. The tap reads through a wall it wasn't built for. 6 = 1 Drain, 4-5 = 2 Drain, 1-3 = 2 Drain + device at risk.
   - Dr. Osei: Way past spec. The stabilization rig suppresses a leyline breach. 6 = 2 Drain, 4-5 = 3 Drain + device at risk, 1-3 = 3 Drain + device breaks.
5. **Device at risk:** Snag on all rolls using this device until you spend an Act to fix it. If strained again before fixing → it breaks. Breaks = offline until downtime repair.
6. **Quality is positioning:** Osei's military-spec rig doing breach suppression? The GM might call that stretching, not way-past-spec. Luka's industrial tap doing the same? Way past spec, immediately. Better gear = lower stakes.
7. **Thaumatech weapons in combat:** Hakim's sidearm. Three modes. Thumb off plate: normal attack, weapon die, no Drain. Thumb on plate: damage + the weapon's listed thaumatech effect, 1 Drain. Past spec: you want it to do something the listed effect can't — that's a stakes roll with Drain.
8. **Consumables:** Single-use, 1 Act. Stim shot (3 Guard), stabilizer dose (Boon cancels wound Snag for the scene). Note: thauma-pharmaceuticals need ambient magic. Thaumatech devices run on operator Drain and work anywhere.

**Reference box:**
> **Weapons:** d6 light, d8 standard, d10 heavy, d12 devastating. **Thaumatech tiers:** Simple (6=free, 4-5=1 Drain, 1-3=1 Drain+complication), Stretching (6=1, 4-5=2, 1-3=2+at risk), Way Past Spec (6=2, 4-5=3+at risk, 1-3=3+breaks). Device at risk = Snag until fixed (1 Act). **Combat:** Thumb off = free. Thumb on = 1 Drain + weapon effect. Past spec = stakes roll.

**Validation:**
- Thaumatech tier tables match THAUMATECH.md:22-47 exactly ✓
- Device at risk matches THAUMATECH.md:69-76 ✓
- Weapon categories match CORE.md:499-504 ✓
- Combat modes match THAUMATECH.md:82-98 ✓
- Consumable details match CORE.md:293-311 ✓
- ~60 lines ✓

**Commit:** `feat(player-guide): section 6 — your gear`

---

### Task 7: Fighting (~80 lines)

**Files:**
- Modify: `rules/PLAYER-GUIDE.md` (section 7)
- Reference: `rules/CORE.md:357-494` (Combat)

**Characters:** Hakim (setup, attacking), Niv (defense)

**Content spec:**
1. Hakim's scene: Warehouse. Three hostiles. He sees them coming — setup phase.
2. **Setup phase:** When you see a fight coming, one roll before round 1. Describe your prep (take cover, line up a shot, ready a device). 6 = Boon on first attack, 4-5 = in position, 1-3 = complication. Stakes gambits apply. No setup if ambushed — enemies act first.
3. **Round structure:** Players act (any order), then enemies, then environment. Each turn: Move + Act, either order, skip either.
   - Move: one range band (Close ↔ Near ↔ Far) or reposition within a band.
   - Act: attack, use a device, interact with environment, or Assist (+1d Boon to an ally's next roll).
4. **Three lanes decision tree:** "It's your turn. What are you doing?"
   - Hurting someone → combat roll (next section)
   - Changing the battlefield → gambit (sacrifice from your combat roll, section 3)
   - Anything else → stakes roll (hack a terminal, barricade a door, talk someone down)
5. **Attacking:** Auto-hit. You never roll to see IF — the roll determines HOW HARD and WHAT ELSE. Procedure: declare target + weapon, declare Drain if spending, roll (weapon die + Boon d6s + Drain d6), choose: keep dice for damage or sacrifice 4+ for gambits, highest remaining = damage, subtract armor, apply to Guard/Harm.
6. Hakim attacks: d8 sidearm + 1d6 (flanking Boon). Rolls 7, 4. He could keep both (damage = 7) or sacrifice the 4 for a Read gambit (learn something about the target). He keeps both — 7 damage, minus target's armor.
7. **Defense:** Stakes roll. Pick your stat from the fiction: Sharp (dodge), Grit (rip a door off for cover), Nerve (hold steady under fire). 6 = no damage, 4-5 = half (round up), 1-3 = full. Then armor → Guard → Harm as normal. Gambits apply on defense too — the combat list is your menu.
8. Niv's defense: caught at a checkpoint. Guard fires. She's Sharp 3 but has a Snag (caught off-guard). 2d6. Rolls 4, 2. Partial — half damage. She dives behind the customs barrier, already planning the exit. No magic. Just reflexes and a lifetime of close calls.
9. **Positioning:** Close (arms' reach, melee), Near (across a room, pistols), Far (across a field, rifles). Cover: partial +1 Armor, full +2 (ranged only). Flanking: two allies at Close from different angles, both get a Boon.

**Reference box:**
> **Setup:** Stat roll before round 1. 6=Boon, 4-5=position, 1-3=complication. **Turn:** Move (one band) + Act (attack/device/interact/Assist). **Attack:** Auto-hit. Weapon die + Boon d6s + Drain d6. Sacrifice 4+ for gambits. Highest remaining = damage. **Defense:** [stat]d6. 6=none, 4-5=half, 1-3=full. Gambits apply. **Range:** Close (melee), Near (room), Far (field). Cover: +1/+2 Armor (ranged).

**Validation:**
- Setup phase matches CORE.md:359-373 ✓
- Round structure matches CORE.md:375-403 ✓
- Attack procedure matches CORE.md:405-423 ✓
- Defense matches CORE.md:425-450 ✓
- Positioning matches CORE.md:479-493 ✓
- No enemy Threat tables (GM-facing) — just "the GM may tell you to subtract dice" if needed ✓
- ~80 lines ✓

**Commit:** `feat(player-guide): section 7 — fighting`

---

### Task 8: Between Fights (~40 lines)

**Files:**
- Modify: `rules/PLAYER-GUIDE.md` (section 8)
- Reference: `rules/CORE.md:283-311` (Recovery), `rules/CORE.md:657-701` (Work a Lead, Group Checks)

**Characters:** Mae (Work a Lead), Luka (Crack recovery)

**Content spec:**
1. **Recovery summary:**
   - Guard: refreshes in genuine safety (sit down and breathe).
   - Hurt: clears when the scene ends. Bandage kit mid-scene (1 Act).
   - Wounded: healing clock (4 segments). Treatment rolls tick it (full = 2, partial = 1). Needs treatment — gear gives a Boon.
   - Critical: healing clock (6 segments, drops to Wounded). Needs training (relevant Edge/Background) or a thaumatech trauma station.
   - Drain: downtime. Time with someone who matters, rest, purpose, vice.
   - Crack: narrative moments only. No item fixes a Crack.
2. **Clocks:** Quick explanation — circle divided into segments (4, 6, or 8). Treatment, investigation, projects all use them. Full success = 2 ticks, partial = 1.
3. Mae's scene: Working a Lead. The false-bottom filing cabinet. She has a name — a positive who came in for registration nine years ago and never came out the other side. She rolls Sharp to cross-reference the intake log against discharge records. The GM says: "On a partial, you find the discrepancy but the night audit catches the query." 6 = clear answer + a follow-up question free. 4-5 = you get it, but. 1-3 = dead end or worse.
4. **Work a Lead:** You need something concrete — a name, an address, a document, a device. Stat from fiction (Sharp to analyze, Nerve to lean on contacts, Grit to dig through wreckage). No lead = no roll. Find one first.
5. Luka recovering from Crack: He's been Numb for three days. Nothing reaches him. Then his daughter calls. She's failing thaumic safety at school — the same class he aced twenty years ago. He stays on the phone for an hour, walking her through the contact plate diagrams. Something loosens. The Crack doesn't vanish. It just becomes something he can carry. "Cracks clear through moments, not mechanics."

**Reference box:**
> **Recovery:** Guard = genuine safety. Hurt = scene ends (or bandage, 1 Act). Wounded = healing clock 4 segments. Critical = healing clock 6 (needs training or trauma station). Drain = downtime. Crack = narrative moment. **Work a Lead:** Need something concrete. [stat] roll. 6 = answer + follow-up, 4-5 = answer + cost, 1-3 = dead end or worse.

**Validation:**
- Recovery timelines match CORE.md:285-311 ✓
- Work a Lead matches CORE.md:657-678 ✓
- Clock segments match CORE.md:621-653 ✓
- ~40 lines ✓

**Commit:** `feat(player-guide): section 8 — between fights`

---

### Task 9: Quick Reference (~30 lines)

**Files:**
- Modify: `rules/PLAYER-GUIDE.md` (section 9)
- Reference: `rules/CORE.md:705-771` (Quick Reference)

**Content spec:**
Compact tables only. No prose. No narrative. This is the at-table cheat sheet.

Tables to include:
1. **Stats:** Grit (body), Sharp (senses), Nerve (will). 1-4. Sum = 6.
2. **The Roll:** [stat]d6, read highest. 6/4-5/1-3. Boon +1d, Snag -1d. 0d = 2d6 lowest.
3. **Damage Pipeline:** Damage → Armor → Guard → Harm. Guard breaks = Scar.
4. **Harm:** L1 Hurt / L2 Wounded / L3 Critical with effects and overflow ranges.
5. **Guard & Drain:** Starting values, recovery conditions.
6. **Combat Gambits:** All seven verbs, standard + strong, one row each.
7. **Weapons:** d6/d8/d10/d12 with categories.
8. **Thaumatech Tiers:** Simple/Stretching/Way Past Spec results table.
9. **Conditions:** PC conditions (Stunned, Shaken, Prone) — one line each.

**Validation:**
- Every number matches CORE.md and THAUMATECH.md ✓
- No narrative, no examples ✓
- Scannable at the table ✓
- ~30 lines ✓

**Commit:** `feat(player-guide): section 9 — quick reference`

---

### Task 10: Consistency review

**Files:**
- Review: `rules/PLAYER-GUIDE.md` (full file)
- Cross-reference: `rules/CORE.md`, `rules/THAUMATECH.md`

**Checklist:**
- [ ] All mechanical numbers match source of truth
- [ ] Characters are consistent (stats, details, names) across all sections
- [ ] No GM-facing content leaked in (no Threat tables, no Behavior, no sizing)
- [ ] Each section has a reference box
- [ ] Progressive disclosure works — no forward references to unexplained concepts
- [ ] Total length ~400-500 lines
- [ ] Voice is consistent (conversational narrative + clean rules + compact reference)
- [ ] Decision trees are second person and actually help decisions
- [ ] No real-world names (Mondas only)

**Commit:** `fix(player-guide): consistency review pass`

**Final commit:** `feat: add player guide (Core + Thaumatech)`
