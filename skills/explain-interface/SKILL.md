---
name: explain-interface
description: Explains how a website, visual effect, or animation was built from a live URL or screenshot. User-invoked workflow: run when invoked via /explain-interface or when explicitly asked how an external UI or effect is built.
---

# Explain Interface

Deconstructs visual effects, component hierarchies, and animations into paint order and CSS recipes.

## Workflow
1. **Analyze System**: Extract typography, colors, borders, and layout. See `./read-the-system.md`.
2. **Trace Effect**: Deconstruct in paint order (background -> shadows -> borders -> pseudo-elements -> content -> overlays). See `./find-the-effect.md`.
3. **Evidence Levels**: Classify data as `Measured` (computed style), `Derived` (deduced from relationship), or `Inferred` (educated reconstruction).
4. **Offline / Image Analysis**: Use `./no-browser.md` or `./from-an-image.md` when live browser inspection is not possible.
