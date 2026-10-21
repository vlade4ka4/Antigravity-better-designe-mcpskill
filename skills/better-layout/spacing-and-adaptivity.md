# Defensive CSS & Sizing
- Avoid `width: 100vw` (causes horizontal scrollbar on Windows/desktop browsers). Use `width: 100%`.
- Avoid `height: 100vh` on mobile (causes toolbar jumps). Use `min-height: 100dvh`.
- Use `min-width: 0` on flex items and `minmax(0, 1fr)` on CSS grids to prevent blowout from long strings.
- Prefer `@container` queries for modular, reusable components.
