# Healing & Recovery Items — Design Document

**Date:** 2026-03-03
**Status:** Draft

## Problem

Players will ask: "My friend is down — what can I do?" The rules define wound tiers and healing clocks but provide no items, no consumable catalog, and no codified treatment procedure. This design fills that gap with a generative framework that covers combat emergencies, between-scene patching, and long-term care.

## Design Principles

From the MONDAS design constraints:

1. **No special cases.** The framework must generate items, not enumerate exceptions.
2. **One mechanic, one verb.** Each effect type does one thing everywhere.
3. **Fiction first.** The player describes what they do; the item confirms whether it works.
4. **Fewer moving parts.** Reuse existing mechanics (consumables, stakes rolls, Device Strain, Boons, healing clocks).
5. **Desperate, not dead.** Even without supplies, a player should have one move to make.

## The Framework

Any healing item is: **delivery method + effect + constraints.**

This framework is for **item design** (between sessions, catalog building). At the table, players use the Quick Reference lookup. GMs use the framework to improvise new items when players ask "could I find something that does X?"

### Effects (what an item does)

Six effect types. An item has one.

| Effect | Definition |
|-|-|
| **Restore Guard** | Give back [N] Guard points. |
| **Clear wound tier** | Remove Hurt instantly, or tick a healing clock toward clearing Wounded/Critical. |
| **Suppress penalties** | Grants a Boon that cancels the wound-tier Snag. Still injured, still needs treatment. **Critical: Snag cancelled but still immobile** — you need someone to move you. |
| **Recover Drain** | Give back [N] Drain boxes. |
| **Diagnose** | Reveal hidden conditions — physical (internal bleeding, poison) or magical (curse, thaumic contamination). |
| **Clear effect** | Spend your Act; the item ends one sustained effect on the target (fire, acid, thaumic feedback, etc.). Valuable for effects that resist normal clearing or to clear an ally's effect. |

### Delivery Methods (how it works)

Three methods. Each has a defined speed and cost.

| Method | Speed | Cost |
|-|-|-|
| **Consumable** | 1 Act, auto-effect | Item is spent. |
| **Treatment** | Stakes roll | Time + risk of failure. Gear provides Boons. |
| **Device** | Stakes roll + Drain | Device Strain (standard thaumatech stakes). Extended scene. |

Delivery method does NOT define range or target. Those are properties of specific items — a bandage is Close, a dart injector is Short range, a trauma station requires the patient to be connected.

### Constraints (what limits it)

| Constraint | Examples |
|-|-|
| **Legality tier** | Legal, Licensed, Restricted, Prohibited, Black Market |
| **BTC requirement** | Thauma-pharmaceuticals need ambient magic (BTC > 1) |
| **Edge/Background gate** | Serious treatment requires training |
| **Portable / stationary** | Some devices need a power source and can't be carried |
| **Scene / downtime only** | Some items can't be used mid-combat |

## Thauma-Pharmaceuticals vs. Thaumatech Devices

Two distinct sources of thaumatech healing, with different power sources and implications.

**Thauma-pharmaceuticals** are consumables that draw from ambient BTC. They're chemicals or compounds infused with thaumic reagents. They don't require the user to channel anything — the environment provides the power.

- Require BTC > 1 in the area. Inert in dead zones.
- Work on Zeros. A Zero's body doesn't generate magic, but it still responds to it. The pharmaceutical pulls from the field, not the patient.
- Narratively more effective on positive-Background targets. A mage's wound practically hums shut; a Zero's closes clinically, efficiently, without the resonance. Same mechanical effect, different fiction.
- Cheap, accessible (Licensed tier), no Drain cost. The tradeoff is environmental dependency.

**Thaumatech devices** are powered by the operator's Drain. You dump your own energy into the machine.

- Work anywhere, on anyone. You are the power source — no ambient BTC needed.
- Cost Drain via Device Strain (standard thaumatech stakes framework). The GM sizes the cost.
- More powerful but personally costly. A medic burning through their Drain to save a friend is the system working as intended.

| Source | Power | Requires | Works on Zero? | Dead zone? | Cost |
|-|-|-|-|-|-|
| **Thauma-pharmaceutical** | Ambient BTC | BTC > 1 | Yes (base effect, fiction reflects reduced resonance) | No — inert | Item spent |
| **Thaumatech device** | Operator's Drain | Drain to activate | Yes (device is the power source) | Yes — Drain is personal | Drain (Device Strain) |

This distinction matters for the setting. Thauma-pharma is the democratized option — cheap, widely available, works on anyone who's standing in a magic field. Devices are the serious option — expensive, licensed, and they cost you something real. The class divide shows up here too: a Zero gets the same numbers from the patch, but the fiction reminds everyone that magic wasn't built for them.

## Wound Treatment Rules

### Who Can Treat What

| Wound tier | Consumable (auto) | Treatment (stakes roll) |
|-|-|-|
| **Hurt** | Anyone. Bandage clears it. | No roll needed. |
| **Wounded** | Consumables suppress or stabilize. | Anyone can attempt. Ticks healing clock. |
| **Critical** | Consumables suppress or stabilize. | Requires Edge (Field Medicine, Trauma Surgery) or relevant Background (military medic, paramedic). Without training, you can only suppress, not heal. |

A thaumatech device (field medkit, trauma station) can substitute for training — the device compensates. This is the value of expensive, licensed gear: it lets an untrained operator attempt what normally requires an Edge.

**One treatment attempt per patient per scene.** Consumables don't count as treatment attempts — they're instant. But you can't make multiple treatment rolls on the same person in the same scene. This prevents clock-rushing and creates "we need to get to safety" pressure.

### Healing Clocks (existing mechanic, restated)

- **Wounded:** 4-segment clock. Full success = 2 ticks. Partial = 1 tick. Failure = 0 ticks, possible complication.
- **Critical:** 6-segment clock. Clears to Wounded when full (then start a 4-segment Wounded clock).

### Suppress Penalties — How It Works

A stabilizer dose (or similar suppress-effect item) grants a Boon that cancels the wound-tier Snag. Mechanically, this uses existing Boon/Snag cancellation — no new state.

**Example:** You're Wounded. Wounded imposes a Snag on all rolls. You pop a stabilizer dose. The Snag is cancelled by the Boon for the rest of the scene. You're still Wounded — the healing clock is still ticking, you still need treatment — but you can function.

**Critical is different.** The stabilizer cancels the Snag, but **you are still immobile.** You cannot move under your own power. Someone has to carry or drag you. The stabilizer keeps you conscious and functional (you can shoot, talk, use items) but it doesn't fix the fact that your body is broken.

### Drain Recovery

Drain is personal — psychological, spiritual, physical exhaustion. The baseline recovery is narrative: spend time with someone who matters, do something that reminds you who you are, rest somewhere safe, indulge a vice.

Thaumatech can touch Drain, but it's dangerous and costly:

- **Nerve stim (thauma-pharmaceutical, downtime only):** Recover 1 Drain. Snag on your next roll. Requires 10 minutes of rest — cannot be administered during a scene with active stakes. This is a between-scene recovery accelerator, not a combat fix.
- **Rejuvenator (device, black market):** Spend 2 of your own Drain to restore 1 of the target's Drain. Mandatory Crack risk on the user. Net loss always. Last resort.

### Cracks

No item can fix a Crack. Cracks clear through significant narrative moments — a conversation, a choice, a confrontation. This is a hard design boundary.

## Example Catalog

Built from the framework. Each item is delivery + effect + constraints.

### Consumables

| Item | Effect | Constraint | Description |
|-|-|-|-|
| **Bandage kit** | Clear wound tier (Hurt) | Legal | Gauze, tape, antiseptic. Clears Hurt mid-scene. |
| **Stim shot** | Restore Guard (3; 4 in BTC > 1) | Licensed | Thauma-pharmaceutical. Adrenaline cocktail with thaumic reagents. 3 Guard baseline. In a thaumic zone, the reagents activate — 4 Guard. |
| **Stabilizer dose** | Suppress penalties | Licensed | Painkiller/coagulant combo. Grants Boon that cancels wound Snag until end of scene. Still injured. Critical: Snag cancelled, still immobile. |
| **Nerve stim** | Recover Drain (1) | Restricted, BTC > 1, downtime only | Thauma-pharmaceutical auto-injector. Recover 1 Drain. Snag on next roll. Requires 10 minutes of rest. |
| **Foam canister** | Clear effect | Legal | Chemical suppressant. Spend your Act to end one sustained effect on the target. |

### Treatment Gear (reusable)

| Gear | Bonus | Constraint | Description |
|-|-|-|-|
| **First-aid kit** | Boon on Wounded treatment | Legal | Standard field kit. Bandages, splints, tools. |
| **Surgical tools** | Boon on Critical treatment | Licensed, requires Edge | Scalpels, clamps, sutures. Useless without training. |
| **Thaumatech scanner** | Boon on any treatment + Diagnose | Licensed, BTC > 1 | Nerve device. Reveals hidden conditions — physical or magical. |

### Thaumatech Devices

| Device | Effect | Constraint | Description |
|-|-|-|-|
| **Field medkit** | Clear wound tier (treatment roll + Device Strain) | Licensed, Nerve device | Portable unit. Connect patient, activate, make treatment roll. Standard thaumatech stakes — GM sets Drain cost. Can treat Wounded without Edge. |
| **Trauma station** | Clear wound tier (treatment roll + Device Strain) | Restricted, Nerve device, stationary | Hospital-grade unit. Standard thaumatech stakes. Can treat Critical without Edge. Needs power source. Not portable. |
| **Rejuvenator** | Recover Drain (1 on target) | Prohibited (black market) | Spend 2 of your Drain to restore 1 of theirs. Mandatory Crack risk on user. Thaumically sketchy — pushing life force through unlicensed hardware. |

## Quick Reference (Player-Facing)

**"My friend is hurt — what do I do?"**

| What's wrong | Instant (1 Act) | Treatment (stakes roll) | Device (roll + Drain) |
|-|-|-|-|
| **Lost Guard** | Stim shot (3 Guard; 4 in BTC > 1) | — | — |
| **Hurt** | Bandage kit (clears it) | — | — |
| **Wounded** | Stabilizer (cancels Snag, still injured) | Stakes roll. First-aid kit = Boon. Ticks healing clock. | Field medkit: roll + Drain. Treats without Edge. |
| **Critical** | Stabilizer (cancels Snag, **still immobile**) | Stakes roll. Needs Edge/Background. Surgical tools = Boon. | Trauma station: roll + Drain. Treats without Edge. Not portable. |
| **Sustained effect** | Foam canister (ends one effect) | — | — |
| **Drained** | — | — | Nerve stim (downtime only, 1 Drain back, Snag). Rejuvenator (2 Drain cost, 1 restored, Crack risk). |
| **Cracked** | Nothing. Narrative recovery only. | — | — |

## Open Questions

1. **Patch Expert Edge interaction:** "+1 Guard when using healing consumables on others." Stim becomes 4/5 on others, which approaches a full Guard bar for low-Guard characters. Monitor in play — may need to cap at "restore to max - 1" if it trivializes Guard damage.
2. **Treatment roll frequency beyond 1/scene:** The current cap is 1 treatment attempt per patient per scene. Should there be a way to push past this (e.g., spending Drain for a second attempt)?
3. **Consumable carry limits:** Handled by fiction and the GM, or explicit inventory slots? Current design leaves this to the table.
4. **Stim shot BTC scaling:** The merged stim (3 base, 4 in BTC > 1) replaces the separate stim/patch items. Does a single item with a BTC toggle feel clean, or should they stay separate for clarity at the table?
