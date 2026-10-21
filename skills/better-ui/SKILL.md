---
name: better-ui
description: Polishes UI surfaces, icons, and motion with exact values for concentric border radius, optical alignment, layered shadows, icon states, and transitions. Use when styling or reviewing UI polish and animations.
---

# Better UI

Polishes surfaces, borders, icons, and motion with exact mathematical constants.

## Key Rules
- **Concentric Radius**: When padding <= 24px, outer radius = `inner + padding + border`. Call MCP tool `compute_concentric_radius`. See `./surfaces.md`.
- **Optical Alignment**: Nudge -2px on icon side of buttons; shift play icon toward tip. See `./surfaces.md`.
- **Shadows vs Borders**: Use layered transparent box-shadow for elevation and `border: 1px solid transparent` for forced-colors.
- **Button Feedback**: `:not(:disabled):active` scale to `0.96` over `150ms ease-out`. See `./animations.md`.
- **Contextual Icons**: Cross-fade with scale `0.25 -> 1`, blur `4px -> 0px`, 300ms cubic-bezier. See `./icon-transitions.md`.
- **Staggered Entry & Fast Exit**: 100ms entry stagger (300ms ease-out), exit 150ms ease-out. See `./enter-exit.md`.
- **Performance**: No `transition: all`, no `will-change: all`. See `./performance.md`.
