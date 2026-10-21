---
name: variant
description: Builds 3 to 5 distinct design variants of a UI component directly inside the real page behind a live picker so you can compare tradeoffs and promote one. User-invoked workflow: run ONLY when invoked via /variant or asked to explore design variants.
---

# Variant (Design Exploration)

Explores 3 to 5 distinct design directions for a component directly inside the real application page.

## Workflow
1. **Select Component & Axis**: Pick a single UI block and one primary axis of variation (`Density`, `Structure`, `Emphasis`, `Typography`, or `Voice`).
2. **Design Variants**: Build 3 to 5 variants given meaningful names (e.g. `Quiet`, `Editorial`, `Compact`).
3. **Fulfill Quality Floor**: Every variant must pass the 13 escalation triggers of `better-interface`.
4. **Live In-Page Picker**: Render variants inside the actual page controlled via `?__variant=...` and the floating picker from `./picker.md`.
5. **Tradeoff Table**: Present an objective `Variant | Axis Position | Best When | Tradeoffs` matrix.
6. **Promote Winner**: Once the user chooses, promote the winning variant into main component and remove temporary variants and picker.
