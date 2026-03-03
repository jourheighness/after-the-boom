# DM Screen — The Rig

## How Combat Actually Works

### Players Attack (their turn)

Attacks **auto-hit**. Player rolls their weapon dice. Highest die = damage dealt. They can sacrifice any die showing 4+ for a Gambit instead of damage.

**Example:** Jack swings a crowbar (1d8) at a thrall. Rolls a 6. That's 6 damage. The thrall has Guard 4, no Armor. 6 - 0 = 6. Guard drops from 4 to 0 (Staggered) with 2 overflow. Overflow 1–2 = Harm L1 (Hurt). The thrall is down (mooks drop at first Harm).

**How much can enemies take?**
- **Mooks (T0–T1):** One Harm drops them. Guard breaks → any overflow and they're done. A street tough with 2 Guard goes down to a single solid hit.
- **Elites (T2):** Can take Hurt and keep fighting. Wounded (L2) puts them down or forces retreat. The Herald flees at Staggered (and screams); the brute gets desperate.
- **Bosses / Named NPCs:** Use the Behavior and Staggered lines. They shift tactics, escalate, or break — the fiction decides when they're out. Riley doesn't drop from one wound. Holt surrenders when cornered.

### Enemies Attack (GM turn)

You don't roll. Every enemy has a flat **Damage** number. The player rolls defense.

1. **Pick who the enemy attacks** (follow their Behavior line)
2. **Player chooses how to respond:** Sharp (dodge), Grit (tank), Nerve (will)
3. **Threat imposes Snags:** Threat 1 = -1d, Threat 2 = -2d, Threat 3 = -3d off their defense pool
4. **Player rolls**, highest die is their result:

| Roll | What happens |
|-|-|
| **6** | No damage. Clean dodge/block. |
| **4–5** | Half the enemy's damage (round up). |
| **1–3** | Full damage. |

5. **Subtract player's Armor** from whatever damage landed
6. **Remainder hits Guard**, overflow becomes Harm

**Example:** A JSOT Operator (Threat 2, Damage 5) fires at Brenor. Brenor has Sharp 3, so he rolls 3d6 to dodge — but Threat 2 means -2d, leaving him 1d6. He rolls a 4. Partial: half of 5 = 3 (round up). Brenor has Armor 0, Guard 6. Guard drops from 6 to 3. He's fine, but rattled. If he'd rolled 1–3: full 5 damage, Guard drops to 1.

### Guard & Harm (both sides)

**Guard** = readiness buffer. Not health. When it hits 0 you're not hurt yet — you're *exposed*. The first real injury is the overflow.

- **PC Guard** = 2 + highest stat (Jack: Grit 3 = Guard 5. Brenor: Sharp 3 + Scar = Guard 6)
- **Enemy Guard** = listed on stat block
- Guard **refreshes** in genuine safety. If the scene is still tense, it stays down.

**Harm** (overflow past Guard):

| Overflow | Level | What it means |
|-|-|-|
| 1–2 | **Hurt** | Minor. -1d when relevant. Clears after scene. |
| 3–4 | **Wounded** | Serious. -1d on ALL rolls. Needs treatment + downtime. |
| 5+ | **Critical** | Must spend Drain to act at all. Hospital, healer, long recovery. Scar. |

Two slots per level. If both slots at a level are full, bumps up. Both L3 slots full + more Harm = **dead** (or permanent consequence — table decides).

### Drain (safety valve)

4 boxes. Spend 1 to: **+1d** on any roll (before rolling), or **act while Critical**. One Drain per roll. Recovers in downtime. Empty = **Crack** (Snag all rolls). Cracked + Critical + 0 Drain = incapacitated.

### Quick Numbers

| Weapon tier | Player dice | Enemy flat damage |
|-|-|-|
| Light (knife, pistol, fists) | d6 | 4 |
| Standard (rifle, crowbar) | d8 | 5 |
| Heavy (shotgun, sledge) | d10 | 7 |
| Devastating (mounted gun, explosion) | d12 | 9 |

| Armor | Source |
|-|-|
| 0 | Nothing |
| 1 | Padded coat, tactical vest, minor ward |
| 2 | Plate carrier, reinforced gear |
| 3 | Full ballistic plate (rare, conspicuous) |

| Cover | Bonus |
|-|-|
| Partial (table, car hood) | +1 Armor vs ranged |
| Full (wall, heavy barricade) | +2 Armor vs ranged |

**Gambits:** Sacrifice a die showing 4+ for a tactical effect. 4-5 = standard, 6+ = strong. Threat 2+ resists standard gambits targeting them. Strong always lands.

**Combat Gambits:** Push (one band back / +Prone), Pull (toward / +Boon), Pin (can't reposition / +can't attack), Read (one detail / +Boon), Break (Impaired -2 dmg / Exposed +2 taken), Cover (+1 Armor / +2 Armor), Setup (bank die / bank for self AND ally). Open clause: anything similar, you approve.

**Scars:** Critical Harm only. +1 max Guard (cap 10) + an Edge.

---

## Thralls (Turned Crew)

The aboleth reaches through **dreams first** — weeks of psychic contact, eroding will, planting memories that aren't yours. Some crew turn from the dreams alone: enough sustained contact and the mind cracks open. Others turn through **physical contact with precursor mucus**, which accelerates the process violently. Both paths lead to the same place: white eyes, rictus smile, the aboleth looking out through a borrowed face.

Thralls are still conscious. Still in there. Not in control.

### Freshly Turned Thrall
*White eyes. Rictus smile. Talks in fragments of the aboleth's memory.*

| Threat | Guard | Armor | Damage | Morale |
|-|-|-|-|-|
| 1 | 4 | 0 | 4 (improvised) or grapple | No |

Behavior: Grab and hold, not kill. Smear mucus on exposed skin. → [Staggered] Person surfaces. Begs. Still dangerous.

- **Mucus Smear.** On grapple: **Grit save.** Fail: Shaken (scene). Partial: queasy.
- **Hive Awareness.** Can't be surprised. Shares aboleth's senses at Close.
- **Still in There.** PC who knows them: **Nerve roll.** 6: hesitates one round. 4-5: flinches.
- **Dream vs. Mucus.** Dream-turned drift quietly. Mucus-turned twitch and scream. Same stats.
- **Vulnerability:** Thaumatech suppression disrupts the link. Thrall goes limp for 1 round.

### Riley Chen (Thrall-Lieutenant)
*White eyes. Military bearing intact. The aboleth's field commander on the rig.*

| Threat | Guard | Armor | Damage | Morale |
|-|-|-|-|-|
| 2 | 5 | 1 (tactical vest) | 4 (service pistol) | No |

Behavior: Tactical. Gives orders. Operates rig systems for the aboleth. → [Staggered] Aboleth takes direct control. Erratic, violent. Drops tactical play.

- **Coordinate.** On Riley's turn, one other thrall bumps damage by +2.
- **Mucus Touch.** Deliberate. Targets the most useful PC.
- **Saboteur.** Lock doors, trigger alarms, vent gas, cut power. Knows every override.
- **Flicker.** Once per scene, real Riley surfaces for one sentence. Then gone.
- **Vulnerability:** The real Riley. If reached during a Flicker, she can reveal one piece of the aboleth's plan before being pulled back.

### Thrall Swarm (Late-Game)
*A corridor full of them. Moving in sync. Humming.*

| Threat | Guard | Armor | Damage | Morale |
|-|-|-|-|-|
| 2 | 8 | 0 | 5 (swarm grapple, Blast at Close) | No |

Behavior: Mob. Overwhelm. Drag toward the breach. → [Staggered] Swarm fractures. Individuals peel away crawling. Remaining thralls frantic.

- **Blast.** Hits everyone at Close, each defends separately.
- **Mucus Tide.** The floor is slick. Moving at Close: **Grit save** or Prone.
- **Thin the Herd.** Each 3+ damage in one hit drops a thrall — visibly human again, gasping. Guard doesn't recover, but it costs something.
- **Vulnerability:** Choke points. The swarm can't push through a held doorway more than two at a time. Bottleneck them.

---

## Precursor Spawn (Breach Entities)

Not the aboleth. Smaller things that slip through when the barrier thins. Tentacled, eyeless, wrong. They move like deep-sea creatures in air. Their mucus accelerates thrall conversion — a precursor grabbing a crew member and holding them is how fast-turns happen.

### Breach Tendril (Environmental Hazard)
*Grey-purple flesh extending through a wall seam. Dripping. Reaching.*

| Threat | Guard | Armor | Damage | Morale |
|-|-|-|-|-|
| 1 | 3 | 0 | 4 (lash, Close) | No |

Behavior: Ambush. Grabs from vents, behind doors, through cracks. → [Severed] Retreats into wall. The thing it's attached to is bigger and somewhere else.

- **Grab.** On hit: latches on. **Grit save.** Fail: dragged one band toward breach. Partial: held in place.
- **Poisonous Contact.** 1 automatic damage per round while grabbed (ignores Armor).
- **Vulnerability:** Fire seals the wound. A severed and burned tendril doesn't grow back from that point.

### Herald
*Eyeless. Six-limbed. Size of a large dog but wrong proportions. Moves on walls and ceilings like water running uphill. Where it goes, the air tastes like copper. The aboleth sees through it.*

| Threat | Guard | Armor | Damage | Morale |
|-|-|-|-|-|
| 2 | 6 | 1 (slick hide) | 5 (tentacle lash, Close/Near) | Yes |

**Wants:** to probe, flank, report back. Not trying to kill — testing defenses and marking the PCs for the aboleth.

**[Staggered]:** Screams. Psychic pulse. Every thrall within Far knows where the PCs are. Then it bolts into the nearest vent. Returns d6 rounds later from a different direction. Kill requires cornering it or sealing its escape.

- **Wall Crawler.** Ignores range bands. Attacks from any angle. Snag on defense unless someone spotted it first (Sharp roll, free action).
- **Mucus Trail.** Leaves slick residue where it moves. Anyone crossing at Close: **Grit save** or Prone.
- **Echolocation.** Darkness doesn't help. Can't be hidden from.
- **The Aboleth Watches.** When a herald sees you, the aboleth sees you. Named PCs get targeted in dreams next rest.
- **Vulnerability:** Fire. Bright light (flares, floods) drives it back one band. Fire to the hide deals +2 damage.

### Precursor Brute
*Larger. Slower. A bulk of wet muscle and armored carapace. Blocks corridors.*

| Threat | Guard | Armor | Damage | Morale |
|-|-|-|-|-|
| 2 | 8 | 2 (carapace) | 7 (tentacle crush, Slow) or 4 (acid spit, Near) | No |

Behavior: Hold a chokepoint. Block escape routes. Patient. → [Staggered] Carapace cracks. Armor drops to 0. Damage becomes 9. Desperate.

- **Slow.** Can't move and attack in the same turn.
- **Acid Spit.** On damage past Guard: corrodes one piece of gear (player's choice).
- **Corridor Blocker.** Fills a standard rig corridor. Can't be flanked in tight spaces.
- **Vulnerability:** The cracked carapace. After Guard break, fire and acid deal +2 damage.

---

## JSOT Operators

Professional soldiers. Not thralled (yet). Following Major Holt's increasingly unhinged orders. They become enemies when Holt decides the PCs are in the way — or when containment is "no longer the priority."

### JSOT Operator
*Body armor, thaumic rifle, trained for extraplanar containment. Disciplined. Following orders.*

| Threat | Guard | Armor | Damage | Morale |
|-|-|-|-|-|
| 2 | 5 | 2 (plate carrier) | 5 (thaumic rifle, Ranged) or 4 (sidearm) | Yes |

Behavior: Hold position, cover exits. Won't shoot first unless ordered. → [Staggered] Hesitates. If thralls or spawn visible, may break — potential ally.

- **Covering Fire.** Forfeit attack: Snag on all PCs who move through line of sight this round.
- **Gear.** Zip-cuffs, thauma-dampening cuffs, flares.
- **Breaking Point.** Leader goes down or cut off from squad: may break entirely.
- **Vulnerability:** Isolation. An operator alone with no radio contact is a scared person, not a soldier.

### Brent Grumman (JSOT Squad Leader)
*Orc. Hard face, warm smile. A good soldier doing a bad job.*

| Threat | Guard | Armor | Damage | Morale |
|-|-|-|-|-|
| 2 | 6 | 2 (plate carrier) | 7 (thaumic shotgun, Close/Near) or 4 (combat knife) | Yes |

Behavior: Protects his people first. → [Staggered] Reassesses everything. If Holt's orders got his people hurt, loyalty breaks on the spot.

- **Squad Tactics.** While Grumman active: operators can't be flanked, +1 Armor when adjacent.
- **Call It.** Once per scene: all operators reposition one range band simultaneously.
- **Potential Ally.** Show him the truth — Holt compromised, mission insane. **Nerve roll.** 6: flips. 4-5: demands more proof but won't fire on PCs.
- **Vulnerability:** His people. Threaten an operator's life and Grumman will negotiate. Hurt one and you've made an enemy for life.

---

## Major David Holt (Compromised)

Not thralled. Worse. The aboleth has been whispering to him in dreams about *what a useful weapon it could be.* Holt wants to believe he's still in command. He's not.

| Threat | Guard | Armor | Damage | Morale |
|-|-|-|-|-|
| 2 | 5 | 1 (officer's vest) | 4 (service pistol) | Yes (pride) |

Not a fighter — dangerous because of what he controls.

Behavior: Give orders. Escalate. Refuse to evacuate. "We are NOT leaving without a specimen." → [Staggered] Panics. Contradictory orders. The aboleth's voice bleeds through openly.

- **Authority.** Anyone under his command: **Nerve save** to disobey a direct order. Includes Jack (test Good Soldier edge).
- **Aboleth's Voice.** Occasionally says things he doesn't remember. Commands that serve the aboleth disguised as military logic.
- **Capture Protocol.** Authorization codes for containment equipment. Can order PCs detained as "compromised."
- **Vulnerability:** Evidence. Recordings, witnesses to his lapses. Each piece gives +1d to Nerve saves against his orders.

---

## The Aboleth (Don't Fight This)

Not a combat encounter. A catastrophe with intelligence. If it manifests physically, the PCs should be running, containing, or making terrible deals — not swinging wrenches at it.

| Threat | Guard | Armor | Damage | Morale |
|-|-|-|-|-|
| 3 | — (narrative) | 3 (physical body) | 9 (tentacle swarm, Blast at Close) | No |

Not killable by small arms.

- **Psychic Pressure.** All PCs within Near of breach: **Nerve save.** Fail: intrusive thoughts, lose action. Partial: Snag on all rolls.
- **Enslave.** Direct psychic attack. **Nerve save.** Fail: thralled (NPC control until removed from range). Partial: compelled one round, aware of it. *Use sparingly.*
- **Mucus Field.** Everything near breach is slick. Moving at Close: **Grit save** or Prone. Contact without protection = Shaken.
- **It Knows You.** Names. The bracelet. The Knot. The dog tags. The maintenance log. This isn't a stat — it's the horror.
- **Vulnerability:** The breach itself. Seal it and the aboleth loses its grip. Rig self-destruct, thaumatech overload, or controlled implosion of the convergence point.

---

### Conversion Clock: Per-NPC (4 segments)

Track individually for key NPCs (Wrench, Vosslin, Grumman, operators). Tick when:
- They witness something that breaks their understanding
- The aboleth focuses on them in dreams (between scenes)
- They have physical contact with mucus
- They're isolated from allies

**At 4:** They turn. Dream-turned or mucus-turned depending on how the ticks accumulated.

**Wrench is immune to the dream clock.** He hasn't had the dreams. He doesn't know why. (The aboleth can't reach him — investigate why if the PCs care.)

---

## Session 3: Tonight

### Previously

Sessions 1-2: Arrived, onboarded, dreamed. Riley turned. Logic collapse started. The brothers fought something in the research wing, left Reyes and Mike behind in the mess hall, got out. Now they're face to face with a Herald that Gnorm already damaged, plus two fresh ones.

---

### Opening: Herald Fight

**The scene:** Corridor outside the mess hall. One Herald limping (Gnorm cracked its hide open). Two fresh ones flanking from the walls and ceiling. Mucus trails on the floor. The damaged one recognizes the brothers. It screams.

**The damaged Herald:** Guard 3 (was 6), Armor 0 (hide cracked). Otherwise standard Herald stats. When it screams, thralls in the area start moving toward the sound.

**Two fresh Heralds:** Full stats. They flank from walls. One drops from the ceiling, one comes along the wall from behind.

**Tactical pressure:** The scream. If the damaged Herald is still alive at the end of round 2, its scream has drawn attention. Tick the clock. If they kill it fast, no tick. The fresh ones probe and retreat if staggered. They're testing, not committing.

**Player choices that matter:**
- Fight all three (risky, Drain-expensive, but stops the scream fast)
- Focus the damaged one to shut it up, let the fresh ones probe
- Run (the Heralds follow but won't chase past engineering)
- Use fire/flares (bright light drives Heralds back one band, fire +2 damage)

**After the fight:** The mucus trails lead toward the research wing. Brenor's Leyline Sense reads the flow: the breach is pulling energy toward the siphon array. Whatever is down there wants the siphons.

---

### "It Escapes" Clock (8 segments)

Fresh. Visible to players. Track on paper.

**Tick when:**
- Thralls complete sabotage (power, containment, comms)
- Holt's machines run (JSOT equipment feeds the breach)
- A full scene passes without PCs acting against the breach
- A Herald screams and isn't killed fast
- PCs trigger loud/destructive action near the breach

**Hold when:**
- PCs shut down JSOT equipment or reroute power
- Wrench repairs containment
- PCs contain a thrall without killing them
- Pavel applies countermeasures

| Segments | What changes |
|-|-|
| **2** | Spatial anomalies spread. Corridors loop. Temperature drops. Breach tendrils in new areas. |
| **4** | Power flickers station-wide. Thralls coordinate under Riley. Holt activates Capture Protocol. JSOT treats PCs as threats. |
| **6** | Psychic pressure: **Nerve save** every scene or lose an action. Thrall swarms form. Purple light visible from the water. |
| **8** | Full manifestation. The aboleth rises. Not a combat. A catastrophe. Run, seal, or bargain. |

---

### NPCs This Session

**Gnorm Ericsson** (with them or nearby). Already damaged the Herald. Tough, quiet, knows the rig. If he's with them, he's useful muscle and navigation. If he's separated, finding him again costs a scene.

**Wrench** (Engineering, lower deck). Keeping generators alive. Knows safe routes. Each scene he repairs containment = hold the clock. Being hunted by thralls. If left alone, roll d6: 1-2 = thralls found him, lose a scene finding him again.

**Dr. Meredith Vosslin** (Medical bay, barricaded). Has breach data. Her models show how to choke the breach using the siphon array. Finding her + getting data to Wrench = hold clock for two scenes. Dream-compromised: **Nerve save** each scene she's with PCs. Fail: aboleth speaks through her one exchange. Won't open for strangers. Brenor's name works.

**Riley Chen** (Roaming). Thrall-Lieutenant. Doesn't attack directly. Watches. Leads PCs toward Meredith (aboleth wants the data too) or into ambushes. Flicker: one sentence of real Riley. "Don't trust Holt's comms. It's listening."

**Grumman** (Roaming with squad). Needs proof to flip. Each piece of evidence = +1d on the Nerve roll. 6: flips. 4-5: demands more. Sources: Holt's encrypted comms, a witnessed lapse, a thralled operator, Riley giving Holt orders. If flipped: JSOT stands down, access to Pavel.

**Holt** (Command center). Not thralled. Worse. Aboleth whispers through dreams. Won't evacuate. Controls rig systems. Jack's Desert Vet edge doesn't protect against Holt's authority. **Nerve save** to disobey direct orders. Evidence gives +1d to saves. Cornering him alone = evidence (lapses visible).

**Pavel** (JSOT ops). Has override codes to shut down Holt's equipment. Won't help unless convinced breach is unsalvageable. Show him Meredith's models or a thrall up close and he flips. Without proof, insists on "one more reading." Each reading ticks the clock.

---

### Paths Forward (after the Herald fight)

**Go for Meredith** (direct). Through crew quarters. 2 hazard rolls, 1 roaming encounter. Medical bay sealed. Brenor's name or passphrase "Atlantic Margin, authorization Vosslin" opens it.

**Go for Wrench** (practical). Engineering, below. Maintenance tunnels (tight, dark, Brenor's Lone Fieldwork negates Snags). 1 hazard roll. Wrench has a route to medical but can't leave. Safer but slower: tick the clock for the extra scene.

**Go for Grumman/Pavel** (bold). Through JSOT-controlled corridors. Checkpoint encounter. Grumman confrontation. If flipped: access to Pavel and override codes. If hostile: combat, then frightened Pavel.

**Go for Holt** (reckless). Command center, up. JSOT corridors. Holt won't fight but orders Jack around. Cornering him = evidence. Doesn't solve the breach, still need Meredith/Pavel.

**Fix comms** (practical). Radio room. Thralls spotted there. Restoring comms doesn't affect the clock but opens evacuation for endgame.

---

### Hazard Table (roll when moving between zones)

| d6 | What happens |
|-|-|
| **1** | **Spatial Loop.** Corridor leads back to start. Scene action to find real path. Brenor's Leyline Sense or Pattern Reader bypasses. |
| **2** | **Time Slip.** Thirty seconds of normal rig sounds. Coffee machine, last Tuesday's intercom. Then silence. **Nerve save** or Shaken (scene). |
| **3** | **Gravity Leak.** Tilts 30 degrees. Water on walls. **Grit save.** Fail: Prone + 2 damage. Partial: slow. |
| **4** | **Sound Bleed.** Voices from wrong directions. Meredith asking for help the wrong way. Unreliable for navigation. |
| **5** | **Temperature Crash.** Below freezing, ten meters. No protection: 1 damage (ignores Armor). Cover up: Snag on Sharp next scene. |
| **6** | **Breach Seep.** Purple membrane across passage. **Grit save** to push through. Fail: coated in mucus (Grit save again or Shaken). The way back changes. |

---

### Roaming Encounters (pick what fits)

**Solo Thrall.** Someone they knew. Stumbling. Smear, not kill. Reaching the person: costs a round, might yield intel. "She's in medical. She locked the door. It's angry about that."

**Sabotage in Progress.** Thralls working a junction box in perfect synchrony. Interrupt = hold clock. Ignore = tick.

**Riley Watches.** End of a corridor. Camera feed. Gone when approached. Leading them somewhere. Use the Flicker.

**Breach Tendrils.** Not combat unless engaged. Spreading toward siphon array. Brenor reads the direction.

**Dr. Park.** Storage room. Two voices. Knows Meredith went to medical, knows mucus is the accelerant. **Grit save** if they stay more than one exchange (mucus drips from him). He's sorry.

**JSOT Checkpoint.** Two operators. "Restricted by order of Major Holt." Talk (Nerve), bypass, show evidence, or fight (they radio Grumman first).

---

### Key Combos (how NPCs connect)

**Meredith + Wrench** = containment path. Her models, his tools, target the siphon array.

**Meredith + Pavel** = reversal path. Her data, his theory. Requires Holt's equipment running in a specific config. Pavel reprograms rather than destroys.

**Grumman + evidence** = JSOT stands down. Biggest obstacle removed.

**Jack + Holt** = character drama. Orders vs. conscience. Evidence gives +1d to resist.

---

### Cliffhangers (pick one)

**"The Voice."** Meredith starts explaining the breach model. Her voice changes. The aboleth: "I've been waiting for you, Brenor. Your maps are beautiful. You've been drawing me for fifteen years." Eyes go white. Blinks back. "It knows what I know. We have to move. Now."

**"The Lockdown."** Holt triggers full lockdown. Blast doors seal. "All personnel, shelter in place. Security teams, execute Capture Protocol. The civilians are compromised." PCs trapped with whatever's in their section.

**"The Choice."** Grumman's squad finds them. Weapons up. "I need you to tell me what the hell is happening on my rig. And I need the truth." Enough evidence: alliance. Not enough: custody.

**"The Breach."** Clock hits 8. Purple light. Salt and copper. A tendril the width of a corridor wraps the siphon array. Then silence. The thralls start humming in unison. The aboleth isn't attacking. It's settling in.
