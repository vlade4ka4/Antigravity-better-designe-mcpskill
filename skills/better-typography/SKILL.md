---
name: better-typography
description: Sets and reviews how text renders across type scales, unitless line-height, tracking, OpenType features, wrapping, truncation, and punctuation. Use when styling or auditing typography.
---

# Better Typography

Establishes typographic hierarchy, line length, OpenType features, and responsive text.

## Rules
- **Weight Floor**: `>= 400` below 18px; thin weights (100-300) only for `28px+`. See `./choosing-fonts.md`.
- **Native CSS Properties**: Use `font-weight`, `font-variant-numeric: tabular-nums`, `font-optical-sizing: auto` instead of raw tags. See `./variable-fonts-and-opentype.md`.
- **Unitless Line-Height**: 1.1 for display, 1.2-1.3 for headings, 1.5-1.6 for body. See `./type-scale-and-hierarchy.md`.
- **Measure**: 60-75ch max-width. `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs. See `./wrapping-and-punctuation.md`.
- **iOS Safari Input Zoom Floor**: Inputs/textareas must be `>= 16px` on mobile screens. See `./details-and-accessibility.md`.
