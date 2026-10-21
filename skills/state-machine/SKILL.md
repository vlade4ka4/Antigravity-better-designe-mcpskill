---
name: state-machine
description: Renders every state of a chosen component on a throwaway workbench page with realistic mock data and a state switcher. User-invoked workflow: run ONLY when invoked via /state-machine or asked to build a state workbench.
---

# State Machine (Workbench)

Generates a dedicated workbench route rendering all states of a component with realistic fixtures.

## Workflow
1. **Extract States**: Identify all states from component props and query hooks (`loading`, `empty`, `error`, `success`, `active`, `disabled`).
2. **Build Mock Fixtures**: Create realistic data fixtures without modifying the component.
3. **Workbench Route**: Create a temporary route (e.g. `app/states/[component]/page.tsx`).
4. **State Switcher**: Add a floating URL-based state switcher (`?__state=...`). See `./switcher.md`.
5. **Inspection & Cleanup**: Verify each state renders cleanly; delete workbench when done.
