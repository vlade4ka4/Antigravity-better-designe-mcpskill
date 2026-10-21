---
name: build-design
description: Builds UI from a Figma file or design screenshot so it matches the design using the project's existing tokens and components. Use when given a Figma link or mockup image to implement.
---

# Build Design

Implements Figma designs or mockup screenshots with strict token mapping and fidelity.

## Workflow
1. **Extract Specs**: Retrieve design tokens, frames, and assets via Figma MCP or analyze mockup image. See `./figma.md`.
2. **Strict Token Mapping**: Map colors, spacing, and radii to project's existing design system tokens. (Rule: if rounding deviation > 2px, ask user before hardcoding arbitrary values).
3. **Build Target**: Implement only the designated component/view without modifying unrelated files.
4. **Side-by-Side Verification**: Verify built layout against original mockup.
5. **Output**: Deliver `Element | Design | Built | Status` summary.
