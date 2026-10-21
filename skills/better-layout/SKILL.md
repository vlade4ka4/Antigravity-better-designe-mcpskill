---
name: better-layout
description: Improves spatial grouping, alignment, reading order, logical CSS properties, RTL mirroring, container queries, and resilience to text growth and resizing.
---

# Better Layout

Structures responsive, defensive, and RTL-ready spatial layouts.

## Rules
- **Whitespace Grouping**: Outer gap between groups `>= 2x` inner gap inside a group.
- **RTL Logical Properties**: Use `margin-inline-start`, `padding-inline-end`, `inset-inline-start`, `text-align: start`. See `./grouping-and-alignment.md`.
- **DOM & Tab Order**: Visual order must match DOM order (no CSS `order` or `row-reverse` reordering interactive elements).
- **Defensive Sizing**: `width: 100%` (never `100vw`), `min-height: 100dvh` (never `100vh`), `minmax(0, 1fr)` on grid tracks, `min-width: 0` on flex children. See `./spacing-and-adaptivity.md`.
