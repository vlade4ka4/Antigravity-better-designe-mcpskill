# Design Engineering & Interface System (Antigravity Rules)

Follow these design engineering specifications whenever creating, styling, refactoring, or reviewing user interfaces. Write all styles and components in the target project's existing idiom (Tailwind CSS, CSS Modules, plain CSS, or CSS-in-JS) and reuse existing project tokens before introducing new ones.

## 1. Non-Negotiable Quality Floor (Escalation Triggers)

Every interface you build or review must clear these 13 non-negotiable criteria:
1. Every interactive control has an accessible name (`<label>`, visible text, or `aria-label`).
2. Every keyboard-reachable control has a visible `:focus-visible` indicator (minimum 3:1 contrast against adjacent surfaces).
3. Every action reachable by pointer is reachable by keyboard (`<button>`, `<a href>`, or full ARIA APG keyboard handlers).
4. All movement, scale, and blur animations respect `@media (prefers-reduced-motion: no-preference)`.
5. Zero content or controls clip, overlap, or become unreachable at `320px` viewport width or `200%` browser zoom.
6. Rendered text and control boundaries pass WCAG 2.2 AA contrast (`4.5:1` normal text, `3:1` large text >=24px or >=18.67px bold, `3:1` UI boundaries/focus rings). Use MCP tool `measure_wcag_contrast` to verify.
7. State or meaning is never conveyed by color alone (always pair color with an icon, text label, or underline).
8. Destructive actions always provide either immediate Undo (for frequent reversible actions) or an explicit confirmation dialog naming the action and target object.
9. Any truncated text (`truncate` / `line-clamp-*`) provides a keyboard-accessible way to reach the full value.
10. Off-screen or collapsed content provides a visible cue (16–32px scroll peek or explicit disclosure control).
11. Every error message states what went wrong and exactly how the user can recover next to the affected field.
12. Semantic colors are never used against their meaning (never use danger/red hues on non-destructive actions).
13. State changes are never carried by motion alone; a static color, icon, or label change must remain when motion does not run.

## 2. Remediation Hierarchy (Cheapest Fix First)

When improving or fixing UI, prefer solutions in this strict order:
1. **Delete**: Remove redundant separator lines where whitespace suffices, remove animations on high-frequency interactions, and strip redundant ARIA attributes on native HTML elements.
2. **Use the platform**: Prefer native `<button>`, `<a href>`, `<dialog>` (`showModal()`), and native browser focus rings over custom div rebuilds.
3. **Reuse project tokens**: Map spacing, radii, colors, and easing to the project's existing variables before inventing new ones.
4. **Correct exact values**: Replace arbitrary approximations with the exact values specified below.
5. **Add**: Introduce a new token, wrapper, media query, or ARIA attribute only when steps 1–4 cannot solve the problem.

## 3. UI Surfaces, Icons, and Motion (`better-ui`)

* **Concentric border radius**: Where nested surfaces share an even visible inset (`<= 24px`), calculate outer radius as `R_outer = R_inner + padding + border_width` (use `compute_concentric_radius` tool). Beyond `24px` padding, treat layers as independent surfaces.
* **Optical alignment**: Reduce button padding by `2px` on the icon side, shift play triangles slightly toward their tip inside circles.
* **Shadows for elevation, borders for structure**: Use layered transparent `box-shadow` for depth/elevation; keep `border: 1px solid transparent` alongside shadow rings so Windows High Contrast (`forced-colors`) preserves the edge.
* **Image outlines**: Give content images a `1px` inset outline (`outline: 1px solid oklch(0 0 0 / 0.1); outline-offset: -1px` in light; `oklch(1 0 0 / 0.1)` in dark).
* **Button press feedback (`0.96`)**: Scale active buttons to `0.96` over `150ms ease-out`, excluding disabled buttons (`:not(:disabled):active`).
* **Zero animation on high-frequency interactions**: Keystrokes, table row hovers, command palettes, and tab switches must respond instantly or use `<= 150ms` opacity/background transitions.
* **Contextual icon swaps**: Cross-fade with `scale: 0.25 -> 1`, `opacity: 0 -> 1`, `blur(4px) -> blur(0px)` over `300ms` with cubic-bezier or spring (bounce: 0).
* **Performance**: Never use `transition: all` or `will-change: all`. Gate hover behind `@media (hover: hover)`. Add `overscroll-behavior: contain` to scrollable modals and drawers.

## 4. Typography System (`better-typography`)

* **Font discipline**: At most 2–3 font families. Below `18px`, weight must be `>= 400` (weights 100–300 restricted to `28px+`).
* **Native CSS properties**: Use `font-weight`, `font-variant-numeric: tabular-nums`, `font-optical-sizing: auto` instead of raw OpenType tags.
* **Unitless line-height**: `1.1` display, `1.2–1.3` headings, `1.5–1.6` body copy, `>= 1.4` for 3+ lines.
* **Letter-spacing in em**: `-0.01em` to `-0.02em` for headings `>= 24px`, `0.05em` for uppercase `<= 14px`, `0` for body copy.
* **Measure & wrapping**: Max width `60–75ch`. `text-wrap: balance` for headings (<=6 lines), `text-wrap: pretty` for paragraphs.
* **Tabular numbers**: Apply `font-variant-numeric: tabular-nums` to timers, prices, counters, table columns.
* **Mobile inputs**: Font size `>= 16px` on inputs/selects/textareas to prevent iOS Safari auto-zoom on focus.

## 5. Color Architecture (`better-colors`)

* **OKLCH & tokens**: Separate Primitive tokens (`--blue-600`) from Semantic tokens (`--color-bg-surface`, `--color-text-secondary`, `--color-accent-solid`). Primitives never appear directly in component CSS.
* **Ramp construction**: Constant hue, peak chroma in middle, tight lightness steps (`0.04–0.05` L) on light end (50–200). Use `generate_oklch_ramp` tool.
* **Contrast**: At most one primary accent action per view. White text on Tailwind 500 usually fails 4.5:1 -> use step 600 or darker. Status hues must stay `>= 15°` away from accent hue in OKLCH.

## 6. Spatial Layout & Adaptivity (`better-layout`)

* **Whitespace grouping**: Outer gap between groups `>= 2x` inner gap within a group.
* **Logical properties**: Use `margin-inline-start`, `padding-inline-end`, `inset-inline-start`, `text-align: start` for automatic RTL compatibility.
* **DOM order**: DOM order must strictly match visual order (no CSS `order` or `row-reverse` reordering interactive elements).
* **Defensive CSS**: `width: 100%` (never `100vw`), `min-height: 100dvh` (never `100vh` on mobile), `minmax(0, 1fr)` on grid tracks, `min-width: 0` on flex children. Sticky header height matched with `scroll-padding-block-start`.

## 7. Accessibility (`better-accessibility`)

* **Semantics**: Native `<button>`, `<a href>`, `<dialog>` with `showModal()`. Never `<div onClick>`.
* **Focus**: `:focus-visible` with `>= 3:1` contrast against adjacent surface.
* **Hit targets**: `>= 24x24px` WCAG AA minimum, aiming for `44x44px` touch, `40x40px` desktop. Provide single-pointer alternative for drag-and-drop.
* **Forms**: Visible `<label>`, validate on submit (keep submit enabled), `aria-invalid="true"` + `aria-describedby`.

## 8. Product Copy & UX Writing (`better-writing`)

* **Actionable controls**: Buttons start with a verb (`Delete project`, never `OK` or `Yes`). Links describe destination (`Read billing docs`, never `Click here`).
* **Tone**: Sentence case by default. Positive phrasing for ON toggles (`Send read receipts`). Clear error recovery without exclamation marks or blame.
