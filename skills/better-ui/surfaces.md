# Surfaces & Radii
- **Concentric Radius Formula**: `R_outer = R_inner + padding + border_width` (up to 24px padding). Above 24px, treat containers as independent surfaces.
- **Image Outlines**: 1px inset outline (`oklch(0 0 0 / 0.1)` in light, `oklch(1 0 0 / 0.1)` in dark) with `outline-offset: -1px`.
- **Optical Offset**: Compensate asymmetric icons by shifting 1-2px visually.
