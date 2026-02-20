# THAUMATECH CONVERSION RULES
## D&D Spells → Mondas Equipment

*Last updated: February 2026*
*See also: MECHANICS.md for core rules reference*

---

## CORE PRINCIPLES

### 1. Magic is Infrastructure, Not Spectacle
Thaumatech doesn't glow. It doesn't project. It doesn't look cool. It looks like field equipment from the 80s — chunky, worn, held together with copper wire and duct tape. Contact plates show skin-oil buildup. Cables are frayed. Labels are faded.

### 2. Effects are Physical, Not Visual
A Shield spell isn't a glowing barrier. It's the air thickening with pressure. Your ears pop. The attacker's blow lands but something *absorbs* it — they feel like they punched a wall of compressed nothing. Uncomfortable. Wrong. Effective.

Mage Armor isn't a force field. It's a mesh undershirt that makes impacts diffuse weirdly, like hitting water instead of flesh. The wearer feels a constant low hum against their skin.

### 3. Cost Creates Meaning
If magic is cheap, it's spam. If it's costly, every use matters. Players should think before they channel. "Do I really need this right now, or am I burning capacity I might need later?"

---

## DRAIN COSTS

| Spell Level | Channeled Drain | Ammunition Drain |
|-------------|-----------------|------------------|
| Cantrip | 1 | 1 |
| 1st Level | 2 | 1 |
| 2nd Level | 5 | 2 |
| 3rd Level | 7 | 3 |
| 4th+ | 9+ | — (industrial only) |

---

## THREE TYPES: AMMUNITION vs CHANNELED vs INNATE

### AMMUNITION (Pre-Loaded Consumables)

Mass-produced, standardized, "good enough." Someone at a factory designed the effect, loaded it into a canister, and that's what you get.

| Property | Value |
|----------|-------|
| Drain cost | Spell level (1/1/2/3) |
| Save DC | **Fixed 10** |
| Effect | **Two tiers down** |
| Overdrive | No |
| Shaping | No |

**Two tiers down:**

| Original | → Two Tiers |
|----------|-------------|
| d12 | d8 |
| d10 | d6 |
| d8 | d4 |
| d6 | d4 (min) |
| 20 ft area | 10 ft |
| 1 minute | 1 round |
| 3 targets | 1 target |

**Uses per full drain track:**
- 1st level: 10 uses
- 2nd level: 5 uses
- 3rd level: 3 uses

**When to convert a spell to ammunition:**
- Area effects (smoke, explosions, zones)
- Effects that don't need concentration
- "Throw and forget" items
- Things that make sense as grenades, canisters, injectors

---

### CHANNELED (Thaumatech Devices)

You're doing the work through the device in real-time. The device is a tool, not a pre-packaged solution.

| Property | Value |
|----------|-------|
| Drain cost | Full (1/2/5/7) |
| Save DC | 8 + proficiency + SMARTS |
| Effect | As written |
| Overdrive | Yes |
| Shaping | No |

**Uses per full drain track:**
- 1st level: 5 uses
- 2nd level: 2 uses
- 3rd level: 1 use (+3 remaining)

**When to keep a spell as channeled device:**
- Personal buffs (armor, shields, enhancements)
- Sustained effects requiring concentration
- Things tied to the user's senses (detection, communication)
- Effects where precision/power matters

---

### INNATE (Raw Manifestation)

Bypasses devices entirely. No drain, but generates HEAT.

| Property | Value |
|----------|-------|
| Drain cost | None |
| Heat | +1 to +3 |
| Save DC | 8 + proficiency + SENSE |
| Effect | As written |
| Overdrive | No |
| Shaping | Yes |

**When something should be innate:**
- Racial/species abilities that feel *part of the person*
- Effects that manifest under stress without conscious control
- Abilities triggered by trauma
- Anything the character can't turn off

---

## COMBINED DEVICES

Related spells become **modes** on a single device. This reduces inventory bloat and makes loadouts feel like actual equipment kits.

### Combination Logic

Group by **function**, not school:

| Function | Spells | Combined Device |
|----------|--------|-----------------|
| Personal defense | Mage Armor + Shield | BARRIER RIG |
| Detection | Detect Magic + Detect Thoughts | SCANNER |
| Communication | Message + Sending | COMM-SET |
| Movement | Misty Step + Dimension Door | BLINK HARNESS |
| Stealth | Invisibility + Pass Without Trace | VEIL KIT |
| Crowd control | Sleep + Hold Person | SUPPRESSOR |

### Example: BARRIER RIG

*Combines: Mage Armor + Shield*

A mesh undershirt with contact plates at the sternum and a wrist-mounted emergency trigger. The passive mode diffuses impacts across the mesh. The reactive mode dumps a surge of pressure into the air when triggered.

| MODE | EFFECT | TIME | DRAIN |
|------|--------|------|-------|
| PASSIVE | AC 13 + DEX, 8 hours | 1A | 2 |
| REACTIVE | +5 AC vs one attack | 1R | 2 |

---

## AESTHETIC GUIDELINES

### What Thaumatech Looks Like

- **Chunky.** Not sleek. Think field radios, oscilloscopes, medical equipment from 1985.
- **Worn.** Scuffed cases, faded labels, cables wrapped in electrical tape.
- **Contact-driven.** Copper plates that touch skin. Thumb switches. Palm grips.
- **Industrial.** Safety warnings. Serial numbers. "PROPERTY OF [ORGANIZATION]" stamps.
- **Analog displays.** Needle gauges, LED bars, clicking counters. Not screens.

### What Effects Look Like

**DO:**
- Air pressure changes (ears pop, hair stands up)
- Temperature shifts (sudden cold, heat shimmer)
- Static electricity (skin prickles, metal taste)
- Physical displacement (shoved, compressed, stretched)
- Sensory distortion (smell of ozone, copper taste, vision blur)
- Things feeling *wrong* (too heavy, too light, time skipping)

**DON'T:**
- Glowing runes or circles
- Hard-light projections
- Hexagonal shield effects
- Visible energy beams (except obvious things like fire)
- Holographic anything
- Sci-fi force fields

### Example Descriptions

**Shield (bad):** "A glowing barrier of blue energy appears in front of you."

**Shield (good):** "The air in front of you thickens. Your ears pop. The blade hits something that isn't there — the attacker stumbles like they swung into a wall. For a second, you can see the compression in the air, like heat shimmer off asphalt. Then it's gone."

**Detect Magic (bad):** "You see auras of magical energy around the objects."

**Detect Magic (good):** "The clicker starts ticking faster. You pan it across the room — faster near the desk, slower by the window. The drawer. Something in the drawer is hot. The needle's jumping."

**Invisibility (bad):** "Light bends around you, rendering you completely invisible."

**Invisibility (good):** "You pull the cloak tight and feel the drain hit. Your skin crawls — something's wrong with how light's touching you. You look down at your hands and they're... not there. Not invisible exactly. Your brain just refuses to register them. You feel nauseous."

---

## ITEM CARD FORMAT

Based on the CREWLINK example:

```
[ITEM NAME]
[Type/Category]

[Flavor text: origin, who uses it, context, what it feels like]

| MODE | EFFECT | TIME | DRAIN |
|------|--------|------|-------|
| MODE 1 | Effect description | Cast time | Cost |
| MODE 2 | Effect description | Cast time | Cost |
```

### Required Elements

1. **Name:** Industrial/technical. Not fantasy. (BARRIER RIG, not "Arcane Shield Device")
2. **Type:** What category? (Personal Defense, Detection, Communication, etc.)
3. **Flavor:** 2-4 sentences. Where's it from? Who uses it? What does it feel like?
4. **Mode table:** Clear, scannable, includes all mechanical info.

### Optional Elements

- **Restrictions:** Legal status, required permits, who's watching
- **Quality notes:** Military-grade vs surplus vs black market
- **Quirks:** What's wrong with this specific unit?

---

## CONVERSION CHECKLIST

When converting a D&D character:

- [ ] **Identify spell list** — What spells do they know/prepare?
- [ ] **Sort by type** — What's ammunition? What's channeled? What's innate?
- [ ] **Group by function** — Which spells combine into single devices?
- [ ] **Apply ammunition penalties** — DC 10, two tiers down
- [ ] **Calculate loads** — How many uses per consumable type?
- [ ] **Write flavor** — What does each device look like? Feel like?
- [ ] **Flag restrictions** — What's legal? What's sketchy? What's illegal?
- [ ] **Add narrative hooks** — Where'd they get this? Who knows?

---

## EXAMPLE CONVERSIONS

### Fog Cloud → SMOKE CANISTER (Ammunition)

*1st level, Drain 1, 10 per load*

Heavy metal canister, about the size of a soda can. Pull the pin, throw, count to three. Grey-white smoke billows out. Chemical smell — not quite tear gas, but not pleasant.

**Two tiers down:** 20 ft sphere → 10 ft sphere, 1 minute → 1 round

| MODE | EFFECT | TIME | DRAIN |
|------|--------|------|-------|
| DEPLOY | 10 ft sphere, heavily obscured, 1 round | 1A (throw) | 1 |

*10 canisters per bandolier. Standard tactical equipment.*

---

### Shatter → RESONANCE CHARGE (Ammunition)

*2nd level, Drain 2, 5 per load*

Grenade-sized device. Twist the cap, throw, cover your ears. Emits a brutal sonic burst that cracks concrete and ruptures eardrums.

**Two tiers down:** 3d8 → 1d8, 10 ft sphere → 5 ft sphere

| MODE | EFFECT | TIME | DRAIN |
|------|--------|------|-------|
| DETONATE | 1d8 thunder, 5 ft sphere, DC 10 CON half | 1A (throw) | 2 |

*5 charges per case. Industrial demolition grade.*

---

### Mage Armor + Shield → BARRIER RIG (Channeled, Combined)

*1st level effects, Drain 2 each*

Mesh undershirt woven with thaumatreated copper threads. Contact plates at the sternum. Wrist-mounted emergency trigger on the dominant hand.

PASSIVE mode keeps a low-level diffusion field running — impacts spread weird, like hitting water. REACTIVE mode dumps pressure into the air when you're about to get hit.

| MODE | EFFECT | TIME | DRAIN |
|------|--------|------|-------|
| PASSIVE | AC 13 + DEX, 8 hours | 1A | 2 |
| REACTIVE | +5 AC vs triggering attack | 1R | 2 |

*Standard protective equipment for field operators. UBAEW safety minimum.*

---

### Detect Magic + Detect Thoughts → SCANNER (Channeled, Combined)

*1st and 2nd level, Drain 2 and 5*

Handheld unit the size of a thick paperback. Needle gauge on top, contact grip on the side. SURFACE mode clicks faster near thaumic activity — standard BTC detection. DEEP mode requires the headset attachment and gets you into someone's head.

| MODE | EFFECT | TIME | DRAIN |
|------|--------|------|-------|
| SURFACE | Detect thaumic presence, 30 ft, 10 min | 1A + conc | 2 |
| DEEP | Read thoughts, 30 ft, 1 min, WIS save | 1A + conc | 5 |

*SURFACE mode is standard issue. DEEP mode is DPA-restricted. Having the headset without papers is a felony.*

---

### Mage Hand → GRIP-FIELD (Channeled)

*Cantrip, Drain 1*

A leather work glove with copper threading woven into the palm. Fingertips have contact plates. When you channel through it, you can manipulate objects at a distance — not a floating hand, just... pressure. Things move. You feel resistance through the glove like you're actually touching them.

Used in labs, workshops, anywhere you need to handle something without touching it.

| MODE | EFFECT | TIME | DRAIN |
|------|--------|------|-------|
| MANIPULATE | Move object up to 30 ft, 10 lb limit | 1A | 1 |

---

## INNATE ABILITY CONVERSION

Innate abilities are NOT thaumatech. They bypass devices entirely.

### When Something Must Be Innate

- Racial spell-like abilities that feel *part of the person*
- Sorcerer origin features
- Warlock patron manifestations
- "Always on" passives that can't be turned off
- Anything triggered by trauma or awakening

### Innate Conversion Table

| D&D Source | Heat Generated | Notes |
|------------|----------------|-------|
| Racial cantrip | +1 | Minor manifestation |
| Racial 1/day spell | +2 | Noticeable event |
| Transformation ability | +3 | Major manifestation, definitely noticed |
| "Always on" passive | Ongoing attention risk | DPA screening would detect |

### The Danger

Innate abilities make you a target. The DPA tracks manifestations. High heat means surveillance, investigation, potentially disappearance.

A character with innate abilities has choices:
1. **Suppress it** — Stabil-Tabs, careful control, never use it.
2. **Hide it** — Use it but cover tracks. Risky.
3. **Accept it** — Use it openly. Powerful but hunted.

---

*This document is a living reference. Update as conversions reveal edge cases.*
