---
name: better-accessibility
description: Reviews and fixes keyboard navigation, focus states, semantic HTML, ARIA, forms, screen-reader announcements, hit areas, motion, and zoom against WCAG 2.2 AA.
---

# Better Accessibility

Guarantees full WCAG 2.2 Level AA compliance across all components and flows.

## Rules
- **Native Elements**: `<button>` for actions, `<a href>` for links. Never `<div onClick>`. See `./semantics-and-aria.md`.
- **Focus Rings**: `:focus-visible` with `>= 3:1` contrast against surface. Roving tabindex for composites. See `./focus-and-keyboard.md`.
- **Hit Targets**: `>= 24x24px` WCAG AA minimum; target `44x44px` touch, `40x40px` desktop. Provide pointer alternatives for drag. See `./hit-areas.md`.
- **Forms**: Visible `<label>`, validate on submit (keep submit button enabled), `aria-invalid="true"` + `aria-describedby`. See `./forms.md`.
- **Reflow & Motion**: Must survive 320px width and 200% zoom without horizontal scroll. Respect `prefers-reduced-motion`. See `./motion-and-zoom.md`.
- **Screen Readers**: Pre-mounted `role="status"` for toasts; `role="alert"` strictly for urgent errors. Meaningful alt texts. See `./screen-readers.md`.
