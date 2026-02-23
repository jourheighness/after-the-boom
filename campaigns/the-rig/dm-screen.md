# DM Screen — The Rig

## How Combat Actually Works

### Players Attack (their turn)

Attacks **auto-hit**. Player rolls their weapon dice. Highest die = damage dealt. They can sacrifice any die showing 4+ for a Gambit instead of damage.

**Example:** Jack swings a crowbar (1d8) at a thrall. Rolls a 6. That's 6 damage. The thrall has Guard 4, no Armor. 6 - 0 = 6. Guard drops from 4 to 0 (Staggered) with 2 overflow. Overflow 1–2 = Harm L1 (Hurt). The thrall is down (mooks drop at first Harm).

**How much can enemies take?**
- **Mooks (T0–T1):** One Harm drops them. Guard breaks → any overflow and they're done. A street tough with 2 Guard goes down to a single solid hit.
- **Elites (T2):** Can take Hurt and keep fighting. Wounded (L2) puts them down or forces retreat. The precursor spawn flees at Staggered; the brute gets desperate.
- **Bosses / Named NPCs:** Use the Behavior and Staggered lines. They shift tactics, escalate, or break — the fiction decides when they're out. Riley doesn't drop from one wound. Holt surrenders when cornered.

### Enemies Attack (GM turn)

You don't roll. Every enemy has a flat **Damage** number. The player rolls defense.

1. **Pick who the enemy attacks** (follow their Behavior line)
2. **Player chooses how to respond:** Sharp (dodge), Grit (tank), Nerve (will)
3. **Threat imposes Snags:** Threat 1 = -1d, Threat 2 = -2d, Threat 3 = -3d off their defense pool
4. **Player rolls**, highest die is their result:

| Roll | What happens |
|-|-|
| **6 or crit** | No damage. Clean dodge/block. Crit = Boon on next action. |
| **4–5** | Half the enemy's damage (round up). |
| **1–3** | Full damage. |

5. **Subtract player's Armor** from whatever damage landed
6. **Remainder hits Guard**, overflow becomes Harm

**Example:** A JSOT Operator (Threat 2, Damage 5) fires at Brenor. Brenor has Sharp 3, so he rolls 3d6 to dodge — but Threat 2 means -2d, leaving him 1d6. He rolls a 4. Partial: half of 5 = 3 (round up). Brenor has Armor 0, Guard 5. Guard drops from 5 to 2. He's fine, but rattled. If he'd rolled 1–3: full 5 damage, Guard drops to 0, Staggered + Scar.

### Guard & Harm (both sides)

**Guard** = readiness buffer. Not health. When it hits 0 you're not hurt yet — you're *exposed*. The first real injury is the overflow.

- **PC Guard** = 2 + highest stat (Jack with Grit 3 = Guard 5)
- **Enemy Guard** = listed on stat block
- Guard **refreshes** in genuine safety. If the scene is still tense, it stays down.

**Harm** (overflow past Guard):

| Overflow | Level | What it means |
|-|-|-|
| 1–2 | **Hurt** | Minor. -1d when relevant. Clears after scene. |
| 3–4 | **Wounded** | Serious. -1d on ALL rolls. Needs treatment + downtime. |
| 5+ | **Critical** | Must Push to act at all. Hospital, healer, long recovery. |

Two slots per level. If both slots at a level are full, bumps up. Both L3 slots full + more Harm = **dead** (or permanent consequence — table decides).

### Push (safety valve)

4 boxes. Spend 1 to: **+1d** on any roll, **-2 damage** after a defense roll, or **act while Critical**. One Push per roll. Recovers in downtime.

### Quick Numbers

| Weapon tier | Player dice | Enemy flat damage |
|-|-|-|
| Improvised (chair, wrench) | 1d4 | 2 |
| Light (knife, pistol) | 1d6 | 4 |
| Standard (rifle, crowbar) | 1d8 | 5 |
| Heavy (shotgun, sledge) | 2d6 | 7 |
| Devastating (mounted gun) | 2d8 | 9 |

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

**Gambit threshold:** Sacrifice a die showing 4+ for a tactical effect. Strong gambits need 8+ (d8+ weapons only).

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

### Precursor Spawn
*Six-limbed, eyeless, the size of a large dog. Moves on walls and ceilings. Drools constantly.*

| Threat | Guard | Armor | Damage | Morale |
|-|-|-|-|-|
| 2 | 6 | 1 (slick hide) | 5 (tentacle slam) or 4 (venomous bite) | Yes (flees when Staggered) |

Behavior: Ambush, grab, drag. → [Staggered] Flees into vents. Returns 1d6 rounds later from a different direction. Kill requires cornering or destroying escape route.

- **Venomous Bite.** On damage past Guard: Harm L1 *and* **Grit save.** Fail: Stunned 1 round. Partial: Snag on Grit for scene.
- **Wall Crawler.** Ignores positioning. Attacks from any angle. Snag on defense unless spotted in advance.
- **Mucus Carrier.** Anyone held more than 1 round: coated. **Grit save at Snag.** Same as thrall mucus but stronger.
- **Vulnerability:** Bright light — floods or flares drive it to cover. Fire to the slick hide deals +4 damage.

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

## Encounter Pacing

| Phase | Enemies | Tone |
|-|-|-|
| Logic collapse (now) | Breach tendrils, 1–2 fresh thralls (Riley) | Confusion. Can we trust anyone? |
| Escalation | 2–3 thralls, precursor spawn returns, JSOT locks down areas | Paranoia, faction conflict |
| Manifestation | Thrall swarm, Holt's bad orders, precursor brute, aboleth manifests | Survival horror, costly choices |
| Resolution | Whatever's left standing | Who's still human? |

### Danger Clock: "The Breach Widens" (6 segments)

**Tick when:**
- Thralls succeed at rig sabotage
- JSOT pushes more energy into the anomaly
- Time passes without containment action
- A precursor spawn successfully converts a crew member

**At 6:** Full manifestation. The aboleth rises through the breach.

### Conversion Clock: Per-NPC (4 segments)

Track individually for key NPCs (Wrench, Vosslin, Grumman, operators). Tick when:
- They witness something that breaks their understanding
- The aboleth focuses on them in dreams (between scenes)
- They have physical contact with mucus
- They're isolated from allies

**At 4:** They turn. Dream-turned or mucus-turned depending on how the ticks accumulated.

**Wrench is immune to the dream clock.** He hasn't had the dreams. He doesn't know why. (The aboleth can't reach him — investigate why if the PCs care.)

---

## Session 3: Finding Meredith

Sessions 1–2 established: logic collapse, Riley's turn, combat with Moray and feeder creatures. The brothers survived. Reality is holding, badly. Meredith Vosslin is somewhere on this rig. The clock is fresh.

---

### "It Escapes" Clock (8 sections)

Fresh 8-section clock. Visible to players. Track on paper at the table.

**Tick when:**
- Thralls complete a sabotage action (power, containment, comms)
- JSOT equipment runs — Holt's machines feed the breach
- A full scene passes without PCs acting against the breach
- A precursor spawn converts a crew member
- PCs trigger a loud or destructive action near the breach

**Hold when (no tick for that scene):**
- PCs shut down JSOT equipment or reroute power
- Wrench repairs containment infrastructure
- PCs contain or neutralize a thrall without killing them
- Pavel applies countermeasures to the breach

**Milestones:**

| Sections | What Happens |
|-|-|
| **2 — Pressure** | Spatial anomalies spread beyond the research wing. Corridors loop. Temperature drops rig-wide. Breach tendrils appear in new areas. |
| **4 — Fracture** | The rig groans. Power flickers station-wide. Thralls coordinate — Riley gives orders. Holt activates "Capture Protocol." JSOT treats PCs as potential threats. |
| **6 — Manifestation** | The aboleth's psychic pressure hits everyone. **Nerve save** every scene or lose an action to intrusive thoughts. Thrall swarms form. The breach is visible from the exterior — purple light on the water. |
| **8 — It Escapes** | Full manifestation. The aboleth rises through the breach. Not a combat — a catastrophe. Run, seal, or bargain. See The Aboleth stat block. |

---

### NPC Piece Map

Five NPCs the PCs can find, use, or lose. Each one changes the equation.

#### Dr. Meredith Vosslin — The Objective

**Location:** Medical bay, barricaded. She sealed herself in when the dreams got worse. Not hiding — working. Her research terminal is running models on the breach.

**What she offers:** Breach data. She mapped the convergence pattern before everything broke. Her models predict where the aboleth will push through next — and how to choke the breach using the rig's own siphon array. This is the path to containment.

**Clock impact:** Finding Meredith and getting her data to Wrench or Pavel = hold the clock for two scenes. If she reaches the siphon controls, the clock can be reversed by 1.

**Complication:** Dream-compromised. The aboleth has been in her head for weeks. She's fighting it — her caution and precision kept her from cracking, but she's close. Conversations with Meredith slip. She'll answer a question, then say something that isn't hers. A name she shouldn't know. A memory of deep water. **Nerve save** for Meredith each scene she's with the PCs. Fail: the aboleth speaks through her for one exchange — truthful, but designed to manipulate. She snaps back. Doesn't remember what she said.

**Finding her:** Medical bay is two zones from the research wing, through crew quarters (logic collapse active). She won't open the barricade for voices she doesn't recognize. Brenor's name works. So does her research passphrase: "Atlantic Margin, authorization Vosslin."

#### Hal "Wrench" Morrison — The Ally

**Location:** Engineering, lower deck. Keeping the generators alive. The only thing between the rig and total blackout.

**What he offers:** He knows every inch of the rig. Safe routes, maintenance tunnels, sealed compartments. If the PCs need to get somewhere, Wrench knows how. He can also repair containment systems — each repair holds the clock.

**Clock impact:** Each scene Wrench spends on containment repair = hold. If he's pulled away to escort or fight, containment degrades.

**Complication:** Immune to dreams, but that makes him a target. The aboleth can't reach him psychically, so it sends thralls physically. Wrench is being hunted. Every time PCs leave him alone, roll d6: 1–2 = thralls found him, he had to relocate, lose one scene finding him again.

**Finding him:** Engineering is accessible but not safe. Breach tendrils in the lower corridors. Wrench's radio works intermittently — static, then his voice, then something that sounds like his voice but isn't.

#### Pavel Smoroski — The Wildcard

**Location:** JSOT operations room. Still at his station. Still running calculations. The machines are doing things he didn't program, and he's trying to understand what.

**What he offers:** The science to understand what the breach actually is and how to close it. Combined with Meredith's data, he could devise a controlled shutdown. He also has JSOT override codes — he can shut Holt's equipment down remotely.

**Clock impact:** Pavel using the override codes = immediate hold + removes a tick source. Pavel + Meredith's data together = the path to reversing the clock entirely.

**Complication:** Loyal to knowledge, not Holt, not the PCs. He won't help unless convinced the breach is beyond salvage as research. Show him Meredith's models or a thrall up close and he'll flip. Without proof, he'll insist on "one more reading." Every reading ticks the clock.

**Finding him:** JSOT ops is in the military section. Getting there means passing through JSOT-controlled corridors. Grumman's operators are posted. If the PCs haven't flipped Grumman, this is hostile territory.

#### Brent Grumman — The Potential Flip

**Location:** Roaming. Running patrols with his squad. Trying to keep order while Holt's orders get stranger.

**What he offers:** Neutralize JSOT as a threat. If Grumman flips, his operators stand down. No more hostile patrols, no more locked zones, no more detention risk. He can also escort the PCs through military sections safely.

**Clock impact:** Flipping Grumman doesn't directly affect the clock, but it removes the single biggest obstacle to reaching Pavel and shutting down Holt's equipment.

**Complication:** Needs proof. His stat block says **Nerve roll** — 6: flips, 4–5: demands more evidence. Each piece of evidence (Holt's encrypted comms, a witnessed lapse, a thralled operator, Riley giving Holt orders he obeys) gives **+1d** to the Nerve roll. Without evidence, he's following orders. He doesn't like it, but the chain of command is all he has.

**Finding him:** He's mobile. The PCs will run into him. The question is whether it's a confrontation or a conversation.

#### Major David Holt — The Obstacle

**Location:** Command center, upper deck. Issuing orders. Refusing to evacuate. Getting worse.

**What he offers:** Nothing the PCs want. But he controls rig systems, has authority over Jack (Good Soldier edge), and can order detention, lockdown, or "Capture Protocol" — which means hunting the PCs.

**Clock impact:** Every scene Holt's equipment runs = tick. Every order he executes that serves the aboleth (and he can't tell the difference anymore) = tick. Removing Holt from command is the single most impactful clock action.

**Complication:** He has authority. Jack's Good Soldier edge means **Nerve save** to disobey direct orders, and Holt will issue them. "Secure the research wing." "Bring Vosslin to me." "Detain the dwarf — he's compromised." Each piece of evidence against Holt gives **+1d** to the save. If Jack disobeys without evidence, it costs: Snag on all rolls for the scene (guilt, identity crisis).

**Confronting him:** Holt won't fight. He'll order others to fight. Cornering him alone = panic, contradictory orders, the aboleth's voice bleeding through. This is evidence for Grumman.

---

### Logic Collapse Hazard Table

Roll when PCs transition between rig zones. Every area beyond engineering and the command center is affected.

| d6 | Hazard | Effect |
|-|-|-|
| **1 — Spatial Loop** | The corridor ahead leads back to where they started. Same scuff marks, same dripping pipe. Takes a scene action to find the real path. Brenor's Leyline Sense or Pattern Reader bypasses it. |
| **2 — Time Slip** | The lights cycle from emergency red to normal white and back. For thirty seconds, the rig sounds operational — voices, coffee machine, an intercom announcement from last Tuesday. Then silence. No mechanical effect, but deeply wrong. **Nerve save** or Shaken (scene). |
| **3 — Gravity Leak** | A section of corridor where gravity tilts 30 degrees. Water pools on the wall. Walking through requires **Grit save** — fail: Prone, take 2 damage (tumble). Partial: slow, lose initiative next scene. |
| **4 — Sound Bleed** | Sounds from elsewhere on the rig bleed into this corridor. Meredith's voice asking for help — from the wrong direction. Wrench cursing — two decks away. Holt giving an order that hasn't happened yet. Unreliable for navigation. May lure PCs off course. |
| **5 — Temperature Crash** | The air drops below freezing in a ten-meter section. Breath visible. Exposed metal burns cold. Moving through without protection: 1 automatic damage (ignores Armor). Covering up or moving fast = no damage but Snag on Sharp for the next scene (numbed). |
| **6 — Breach Seep** | Purple-grey membrane across the passage. Thin. Translucent. Something moves behind it. Pushing through: **Grit save.** Fail: coated in mucus (same as thrall contact — **Grit save** again or Shaken). Pass: through clean but the membrane reforms behind you. The way back is different now. |

---

### Roaming Encounters

Not a random table — pick what fits the pace. These happen during the search.

**Solo Thrall (Ambush).** A crew member the PCs knew. White eyes. Stumbling. Not aggressive until the PCs get close. Trying to smear, not kill. If the PCs knew them, **Still in There** applies — reaching the person inside costs a round but might yield intel. "She's in medical. She locked the door. It's angry about that."

**Sabotage in Progress.** Thralls working a junction box, a valve, a door mechanism. Methodical. Aboleth-directed. Interrupting them holds the clock. Ignoring them ticks it. If the PCs watch, they see something unsettling: the thralls work in perfect synchrony, hands moving identically, like one mind with six arms.

**Riley Appears.** She doesn't attack. She watches. From the end of a corridor, through a window, on a camera feed. Then she's gone. If PCs pursue, she leads them somewhere — maybe toward Meredith (the aboleth wants the breach data too), maybe into a thrall ambush (the aboleth wants them converted). Use her Flicker: one sentence of real Riley surfaces. "Don't trust Holt's comms. It's listening."

**Breach Tendrils in New Areas.** Not combat unless the PCs engage. Tendrils reaching through wall seams, floor grates, ceiling panels. The breach is spreading. Brenor's Leyline Sense can read the direction of spread — toward the siphon array. The aboleth wants the siphons.

**Dr. Park (Half-Transformed).** Elliott Park, the first victim. Found in a storage room, curled up, talking to himself. Two voices — his and something deeper. His human side has information: he saw Meredith head for medical, he knows the mucus is the accelerant, he knows the dreams are the foundation. His other side wants the PCs closer. **Grit save** if they stay more than one exchange — mucus drips from Park like sweat. He can't control it. He's sorry.

**JSOT Checkpoint.** Two operators blocking a corridor. "This section is restricted by order of Major Holt." Not hostile, but firm. Options: talk through (Nerve), find another route, show evidence of Holt's compromise, or force it (they'll fight, but they'll radio Grumman first).

---

### Story Beats: The Search

#### Opening — After the Break

The session begins in the aftermath of session 2. The research wing is partially collapsed. Breach tendrils in the walls. The brothers are alive. What they choose to do first sets the tone.

**If they go for Meredith:** The direct path. Through crew quarters (logic collapse active, roll hazard table), past potential thrall encounters. Medical bay is sealed. Getting in requires Brenor's identity or the passphrase. Meredith is inside, working, exhausted, dream-compromised but functional.

**If they go for Wrench:** The practical choice. Engineering is below. Maintenance tunnels avoid the worst collapse but they're tight and dark (Brenor's Lone Fieldwork negates Snags). Wrench is running out of options — generators failing, containment patched with literal duct tape. He has a route to medical mapped out but can't leave his post.

**If they try to deal with Holt:** The bold choice. Command center is up. Getting there means JSOT-controlled corridors. If they haven't found evidence yet, Grumman's in the way. If they have evidence, they can try flipping Grumman en route.

**If they try to contact the mainland:** Comms are down. Riley saw to that. The backup transmitter is in the radio room — thralls have been spotted there. Restoring comms doesn't tick or hold the clock, but it opens an evacuation option for the endgame.

#### The Search — Multiple Paths

**Path A: Crew Quarters → Medical Bay (Meredith)**
- 2 hazard table rolls
- 1 roaming encounter (solo thrall or Park)
- Arrive at barricaded medical bay
- Getting Meredith out = clock hold for two scenes

**Path B: Engineering → Maintenance Tunnels → Medical Bay (via Wrench)**
- 1 hazard table roll (tunnels partially shielded from collapse)
- Breach tendrils in the tunnels — environmental hazard, not combat
- Wrench gives them the safe route and a maintenance radio
- Safer but slower — tick the clock once for the extra scene

**Path C: Military Section → JSOT Ops (via Grumman → Pavel)**
- JSOT checkpoint encounter
- Grumman encounter (confrontation or conversation)
- If Grumman flipped: access to Pavel, override codes
- If Grumman hostile: combat with operators, then Pavel is frightened and harder to convince

**Path D: Command Center → Holt (Confrontation)**
- JSOT-controlled corridors, 1–2 checkpoints
- Holt won't fight — he'll order Jack to stand down, Brenor to be detained
- Cornering Holt alone = evidence (his lapses are visible)
- Does NOT solve the breach — still need Meredith/Pavel for that

#### NPC Interactions — How the Pieces Connect

**Meredith + Wrench:** She has the models, he has the tools. Together they can target the siphon array to choke the breach. This is the containment path.

**Meredith + Pavel:** She has the data, he has the theory. Together they can design a controlled shutdown. This is the reversal path — but it requires Holt's equipment to stay running in a specific configuration, which means convincing Pavel to reprogram rather than destroy.

**Grumman + evidence:** Each piece of evidence makes flipping Grumman easier. Sources: Holt's encrypted comms (command center terminal), a witnessed lapse (corner Holt alone), a thralled operator (any JSOT soldier who turns during a scene), Riley giving Holt orders (surveillance footage from security office, if accessible).

**Jack + Holt:** The Good Soldier tension. Every direct order from Holt is a Nerve save for Jack. Disobeying without evidence = Snag on all rolls for the scene. This is the character drama — Jack's identity is built on following orders, and the orders are coming from something wearing his commander's face.

#### Escalation — Clock Consequences During the Search

As the PCs move through the rig, the clock ticks. The milestone effects layer onto whatever they're doing.

**At 2 (Pressure):** Hazard table results get worse. Spatial loops block previously clear routes. Thralls appear in areas that were safe one scene ago.

**At 4 (Fracture):** Holt activates Capture Protocol. JSOT operators are now actively searching for the PCs. Grumman is following orders but hating it. Riley coordinates thralls with military precision. The rig's power flickers — Wrench is losing the fight.

**At 6 (Manifestation):** Psychic pressure hits everyone. The aboleth's voice is audible — not words, a vibration in the bones. Thrall swarms form in the lower decks. The breach is visible from outside — purple light on the water. If Meredith is still in medical, she goes silent. Her terminal keeps running.

---

### Cliffhanger Endings

Pick the one that fits where the session lands. Each sets up Session 4.

#### "The Voice"

**Trigger:** PCs find Meredith. She's been working. She has the data. She turns to Brenor and starts explaining the breach model — and then her voice changes. Deeper. Older. The aboleth speaks through her: "I've been waiting for you, Brenor. Your maps are beautiful. You've been drawing me for fifteen years."

Meredith's eyes go white. Then she blinks, and she's back. Gasping. "It knows what I know. We have to move. Now."

**What it sets up:** The race. The aboleth has Meredith's breach data. It knows what the PCs know. Session 4 is a countdown — seal the breach before the aboleth uses Meredith's own research to widen it.

#### "The Lockdown"

**Trigger:** Holt discovers the PCs are moving against him (evidence gathered, Grumman wavering, or they were spotted in the military section). He triggers full lockdown. Blast doors seal. The rig segments into isolated zones. The PCs are trapped in whatever section they're in — with whatever is in there with them.

His voice on the intercom, calm and wrong: "All personnel, shelter in place. Containment breach in sectors four through seven. Security teams, execute Capture Protocol. The civilians are compromised."

**What it sets up:** Escape and faction war. Session 4 opens with the PCs sealed in, Grumman forced to choose sides, and the clock still ticking behind closed doors.

#### "The Choice"

**Trigger:** Grumman's squad finds the PCs. Weapons up. Grumman steps forward. He's seen things — operators acting strange, Holt's contradictory orders, the breach spreading. He doesn't point his gun. "I need you to tell me what the hell is happening on my rig. And I need the truth. Because if you lie to me, we do this the other way."

The PCs have what they've gathered. If it's enough, Grumman lowers his weapon and says, "What do you need from me?" If it's not, he says, "Then you're coming with us. Hands where I can see them."

**What it sets up:** Alliance or captivity. Either Grumman is the PCs' most powerful ally going into Session 4, or they're in JSOT custody with the clock ticking and Holt in charge.

#### "The Breach"

**Trigger:** The clock hits 8. The aboleth manifests. Not fully — a presence. The lights go purple. The floor is wet. The air tastes like salt and copper. Through the breach, something enormous moves. A tendril the width of a corridor reaches through and wraps around the siphon array. The rig shudders.

Then silence. The tendril retreats. The breach is still open. And from somewhere deep in the rig, the thralls start humming in unison. The same note. The same rhythm. The aboleth isn't attacking. It's *settling in.*

**What it sets up:** Containment is no longer the question. The aboleth is here. Session 4 is survival, evacuation, or the terrible deal — what does an ancient intelligence want badly enough to negotiate for?
