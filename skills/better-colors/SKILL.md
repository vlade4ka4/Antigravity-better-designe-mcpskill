---
name: better-colors
description: Builds and audits color systems using OKLCH ramps, semantic token tiers, gamut fallbacks, and rendered-pair contrast measurement. Use when designing palettes, dark mode, or fixing color tokens.
---

# Better Colors

Creates robust, accessible OKLCH color systems with verified WCAG contrast.

## Rules
- **Token Hierarchy**: Separate Primitives (`--blue-600`) from Semantics (`--color-bg-surface`, `--color-accent-solid`). See `./token-naming.md`.
- **Ramp Construction**: Constant hue, peak chroma in middle, tight steps (`0.04-0.05 L`) on light end (50-200). Use `generate_oklch_ramp` tool. See `./palette-generation.md`.
- **Accent & Status**: Status hues must stay `>= 15°` away from accent in OKLCH. Exactly 1 filled primary action per view. See `./color-usage.md`.
- **Contrast Verification**: Never eyeball contrast. Call MCP tool `measure_wcag_contrast`. White text on Tailwind 500 fails -> use step 600. See `./contrast.md`.
