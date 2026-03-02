# Graph Visualizer for MONDAS Concept Graph

## Overview

Interactive force-directed graph visualization of ATB's 149 curated game concepts and 272 relations. Integrated into the Astro docs site as a dev-only page. Ported from the lattice project's workgraph visualizer, adapted to ATB's warm monospace theme and TTRPG domain.

## Architecture

### Data Pipeline

1. `tools/graph-viz/export-graph.ts` reads `tools/comments.db`, writes `docs/src/data/graph-data.json`
2. `tools/graph-viz/watch-and-export.ts` watches `comments.db` (+ WAL/SHM), debounced re-export (1.5s)
3. `docs/src/pages/graph.astro` imports the JSON, renders full-viewport cytoscape canvas
4. Astro HMR picks up JSON file changes — free live reload during dev

### File Structure

```
tools/
  graph-viz/
    export-graph.ts       # SQLite -> JSON export
    watch-and-export.ts   # DB file watcher, debounced re-export
docs/
  src/
    data/
      graph-data.json     # Generated, gitignored
    pages/
      graph.astro         # Full-viewport cytoscape page
```

### Dependencies

- cytoscape.js via CDN (no npm dep in docs/)
- chokidar for watcher (already in comments-server deps, share it or add to graph-viz)
- better-sqlite3 for export (already in comments-server deps)

## Visual Design

### Theme (matching docs site)

| Token | Value | Source |
|-------|-------|--------|
| Background | `#f5f0eb` | global.css `--bg` |
| Surface | `#fff` | global.css `--card` |
| Text | `#2d2a26` | global.css `--text` |
| Text muted | `#6b6560` | global.css `--text-muted` |
| Accent | `#8b7355` | global.css `--accent` |
| Border | `#d5cdc4` | global.css `--border` |
| Font | SF Mono, Menlo, Monaco, Consolas, monospace | global.css body |

### Node Encoding

- **Shape = Layer:** ellipse (mechanic), diamond (subsystem), hexagon (principle)
- **Color = Category:** 22 categories, warm earth-tone palette derived from FILE_COLORS
- **Size = Mentions:** log-scaled, range 24-60px
- **Border:** 1px `#d5cdc4` default, 3px `#8b7355` selected

### Edge Encoding

- **Color:** per relation type, muted tones
- **Style:** solid for structural (CONTAINS, ENABLES, GOVERNED_BY), dotted for loose (RELATES_TO, VARIANT_OF)
- **Width:** weighted by semantic relation strength
- **Arrow:** vee target arrow

### Panels

- **Controls (top-left):** white card, search input, layer checkboxes, relation checkboxes with colored dots, node/edge count
- **Detail (right slide-in):** white card, concept name + layer/category tags, definition, collapsible relations list (clickable navigation), source files

## Feature Scope

### In Scope (v1)

- Cytoscape cose force-directed layout
- Custom force simulation on drag (repulsion, spring attraction, gravity, damping)
- Layer filter checkboxes (mechanic/subsystem/principle)
- Relation type filter checkboxes (with colored indicator dots)
- Click-to-select: neighborhood highlight, non-neighbors dimmed
- Detail panel: name, tags, definition, grouped relations, source files
- Search bar: fuzzy match on name/aliases/definition, highlight + zoom
- Animated entrance (staggered node fade-in)
- Live reload via watch-and-export + Astro HMR
- Dev-only nav tab (hidden in prod, same pattern as DM Screen)

### Out of Scope

- Narrative/subway pathfinding
- Argumentative topology (evidence/synthesis/bridge roles)
- Evidence gauges and confidence scoring
- Embedding-based semantic search
- Priority borders (no priority axis in ATB concepts)

## Relation Types

ATB uses domain-specific relation types. The export handles whatever is in the DB. Pre-defined visual encoding for known types, gray fallback for unknown:

| Relation | Color | Style | Weight |
|----------|-------|-------|--------|
| CONTAINS | slate | solid | 1.0 |
| GOVERNED_BY | brown | solid | 0.9 |
| ENABLES | olive | solid | 0.85 |
| PRODUCES | green | solid | 0.7 |
| COSTS | red-brown | solid | 0.7 |
| MODIFIED_BY | teal | solid | 0.6 |
| VARIANT_OF | purple | dotted | 0.45 |
| RELATES_TO | light gray | dotted | 0.25 |
| (unknown) | gray | dotted | 0.3 |

## Category Color Palette

22 categories need distinct but harmonious muted tones. Grouped by domain:

- **Stats/resources:** warm browns/ambers (stat, resource, harm_level)
- **Combat/actions:** slate blues/greens (action, combat_gambit, shaping_gambit, enemy_mechanic, enemy_condition)
- **Character:** olive/sage (character, edge_design, boon_source)
- **Design/rules:** muted purples/grays (axiom, design_law, scope_rule, procedure, content_pattern)
- **Magic/tech:** dusty rose/mauve (magic, weapon_property, modifier)
- **Other:** neutral tones (sacrifice_trade, clock, range)

Exact hex values TBD during implementation — will derive from FILE_COLORS warm palette.

## Navigation Integration

Add "Graph" tab to `RulesLayout.astro` header nav, dev-only:

```astro
{!import.meta.env.PROD && (
  <a href={`${base}/graph`} class={currentTab === 'graph' ? 'active' : ''}>Graph</a>
)}
```

The graph page uses a minimal layout (just header nav, no sidebar/filterbar/comments).

## Reference

Ported from: `../lattice/tools/workgraph/` and `../lattice/tools/graph-viz/`
Source DB: `tools/comments.db` (same as comments-server MCP)
