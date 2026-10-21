# Interface Review Format

## 1. Scope & Coverage
| Domain | Status | Key Focus |
| :--- | :--- | :--- |
| Accessibility | Inspected | Keyboard focus, ARIA, hit areas (24x24 AA min) |
| Layout | Inspected | Whitespace grouping, RTL logical properties, 100dvh |
| Writing | Inspected | Verb-first buttons, actionable errors, sentence case |
| Typography | Inspected | Scale, unitless line-height, tabular-nums, 16px mobile input |
| Colors | Inspected | Contrast ratios (4.5:1 / 3:1), semantic tokens |
| UI Polish | Inspected | Concentric radii, optical alignment, button 0.96 feedback |

## 2. Findings Table
| Severity | Domain | Location | Before | After | Why |
| :--- | :--- | :--- | :--- | :--- | :--- |
| HIGH | a11y | `Button.tsx:14` | `<div onClick=...>` | `<button type="button">` | Native keyboard focus & APG compliance |

## 3. Verdict
- **BLOCK**: If any HIGH finding exists.
- **APPROVE**: Only when all HIGH findings are resolved.
