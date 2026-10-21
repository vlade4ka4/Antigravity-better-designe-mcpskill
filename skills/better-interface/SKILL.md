---
name: better-interface
description: Runs a comprehensive cross-discipline interface review across accessibility, layout, UX writing, typography, color, and UI polish. Use when asked to audit, review, or critique a screen, component, flow, or frontend codebase.
---

# Better Interface

Orchestrates comprehensive interface reviews across accessibility, layout, copy, typography, colors, and UI polish.

## Review Protocol

1. **Scope & Tech Stack**: Detect framework, styling paradigm (Tailwind, CSS Modules, etc.), and existing design tokens.
2. **Consult Domain Skills**:
   - Accessibility (`../better-accessibility/SKILL.md`)
   - Layout (`../better-layout/SKILL.md`)
   - UX Writing (`../better-writing/SKILL.md`)
   - Typography (`../better-typography/SKILL.md`)
   - Colors & Contrast (`../better-colors/SKILL.md`)
   - UI Polish & Motion (`../better-ui/SKILL.md`)
3. **Validate 13 Escalation Triggers**: Every trigger violation is classified as **HIGH**.
4. **Remediation Order**:
   `1. Delete -> 2. Use Platform -> 3. Reuse Token -> 4. Correct Exact Value -> 5. Add`
5. **Output**: Produce a consolidated findings table and verdict using `./review-format.md`.
