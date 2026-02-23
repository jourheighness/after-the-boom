# Reference Card Manifest

## Loading Rules

**Always load:** `principles.md` (~3K tokens)

**Load by sourceFile match:**

| sourceFile | Cards |
|-|-|
| CORE.md | combat.md |
| MAGIC.md | magic.md |
| CHARACTER.md | archetypes.md |
| EDGES.md | archetypes.md |
| EQUIPMENT.md | combat.md |
| GAMBITS.md | combat.md |
| BACKGROUNDS.md | archetypes.md |

**Load by keyword scan** (scan comment text, union with sourceFile results):

| Keywords | Card |
|-|-|
| thaumic, drain, shaping, knack, sensitive, Break, obsession, Tell, spectrum, BTC, heat, overcharge | magic.md |
| gambit, Guard, Grit, Nerve, Boon, Snag, weapon, condition, Harm, Scar, Push, combat, attack, armor, cover, range | combat.md |
| edge, archetype, character, advancement, progression, background, zero, positive, species, displaced, stat | archetypes.md |
| tone, flavor, naming, lexicon, setting, 1992, rust-belt, displaced, Boom, DPA, Federal Union | tone.md |

**Max typical load:** principles.md + 2 topic cards (~7K tokens total)

## Token Budgets

| Card | Budget | Split Strategy |
|-|-|-|
| principles.md | ~3K | If exceeds: split to principles-mechanical.md + principles-design.md |
| magic.md | ~2K | No split needed |
| combat.md | ~2K | No split needed |
| archetypes.md | ~2K | No split needed |
| tone.md | ~1K | No split needed |

## Large Reference Files

These files are too large for inline reading. Always delegate to subagent:

| File | Size | Use When |
|-|-|-|
| rules/reference/bitd-srd.md | ~195K | Stakes/position design questions |
| rules/reference/mythic-bastionland.md | ~86K | Combat/auto-hit model questions |
| rules/reference/vagabond.md | ~64K | Catalog structure, equipment design |

## Card Maintenance

Cards reflect locked decisions from MEMORY.md and Design Appendixes. Update cards when:
- A decision is formally changed by the designer
- A new workstream is completed
- Mesh pass produces new locked decisions

Do not update cards based on individual comment resolutions. Cards are reference, not living documents.
