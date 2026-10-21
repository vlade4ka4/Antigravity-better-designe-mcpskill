---
name: break
description: Renders a chosen UI component under every worst-case scenario on a temporary page and stress-tests it visually. User-invoked workflow: run ONLY when explicitly invoked via /break or asked to stress-test a component.
---

# Break (Component Stress-Testing)

Renders a chosen component under extreme worst-case conditions on a temporary test workbench page.

## Workflow
1. **Select Component**: Target exactly 1 component.
2. **Select Stress Axes**: Pick applicable test axes from `./scenarios.md`.
3. **Create Throwaway Route**: Create a temporary page (e.g. `app/test-break/page.tsx`) importing the component with unaltered styling.
4. **Inspect in Browser**: Render scenarios in a single column.
5. **Report Table**: Output `Scenario | Observed | Owner Skill`.
6. **Cleanup**: Remove temporary route only after user reviews and approves.
