#!/usr/bin/env node
import readline from "node:readline";

const CHECKLISTS = {
  ui: [
    "Concentric radius: R_outer = R_inner + padding + border (when padding <= 24px).",
    "Optical alignment: -2px padding on icon side of buttons; shift play triangle toward tip.",
    "Elevation vs structure: layered transparent box-shadow for elevation + border: 1px solid transparent for forced-colors.",
    "Image outlines: 1px solid oklch(0 0 0 / 0.1) light / oklch(1 0 0 / 0.1) dark, outline-offset: -1px.",
    "Active button press: scale(0.96) over 150ms ease-out, always excluding :disabled.",
    "High-frequency interactions (row hover, tab switch, keystroke): 0ms or <=150ms opacity/bg transition only.",
    "Staggered entrance: 100ms delay between semantic chunks, 300ms ease-out, opacity 0->1, blur(4px)->0, translateY(12px)->0.",
    "Exit animation: 150ms ease-out, opacity 0, blur(4px), fixed translateY(-12px).",
    "Contextual icon swap: scale 0.25->1, opacity 0->1, blur 4px->0px, 300ms cubic-bezier(0.2, 0, 0, 1) or spring(0.3s, bounce: 0).",
    "Never use transition: all or will-change: all. Wrap hover in @media (hover: hover). Set overscroll-behavior: contain on overlays."
  ],
  typography: [
    "Weight floor: >= 400 below 18px; weights 100-300 only at 28px+.",
    "Use CSS properties (font-weight, font-variant-numeric: tabular-nums, font-optical-sizing: auto) over raw OpenType tags.",
    "Unitless line-height: 1.1 display, 1.2-1.3 headings, 1.5-1.6 body, >= 1.4 for 3+ lines.",
    "Letter-spacing in em: -0.01em to -0.02em for >=24px headings, 0.05em for <=14px uppercase, 0 for body.",
    "Measure: 60-75ch max-width. text-wrap: balance on headings (<=6 lines), text-wrap: pretty on paragraphs.",
    "Numeric data: tabular-nums on timers, prices, counters, table columns.",
    "Mobile inputs: >= 16px font-size on <input>/<select>/<textarea> to prevent iOS Safari zoom.",
    "Root smoothing only: -webkit-font-smoothing: antialiased on html/body only."
  ],
  colors: [
    "Token hierarchy: Primitives (--blue-600) never in components; Semantic tokens (--color-bg-surface, --color-text-secondary, --color-accent-solid) only.",
    "One primary filled accent action per view; white text on Tailwind 500 usually fails 4.5:1 -> use 600+.",
    "Status hues must stay >= 15 degrees away from accent hue in OKLCH.",
    "Dark mode: lower accent chroma, widen dark surface steps, re-verify contrast.",
    "Wide gamut: declare sRGB fallback before @media (color-gamut: p3). Default gradients to 'in oklab'."
  ],
  layout: [
    "Group with whitespace first: gap between groups >= 2x gap inside group.",
    "Logical CSS properties for RTL: margin-inline-start, padding-inline-end, inset-inline-start, text-align: start.",
    "DOM order must match visual order (never reorder interactive elements with CSS order or row-reverse).",
    "Defensive sizing: width: 100% (never 100vw), min-height: 100dvh (never 100vh on mobile), minmax(0, 1fr) on grid tracks, min-width: 0 on flex children.",
    "Component responsiveness: @container queries on parent with definite width. scroll-padding-block-start = sticky header height."
  ],
  accessibility: [
    "Native elements first: <button>, <a href>, <dialog> with showModal(). Never <div onClick>.",
    "Focus ring: :focus-visible with >= 3:1 contrast against adjacent surface.",
    "Hit targets: >= 24x24px WCAG AA minimum (aim for 44x44px touch, 40x40px desktop). Provide single-pointer alternative for drag.",
    "Forms: visible <label>, autocomplete, inputmode, validate on submit (keep submit enabled), aria-invalid='true' + aria-describedby.",
    "Live regions: pre-mounted role='status' for toasts/counts, role='alert' only for urgent errors.",
    "Motion & zoom: @media (prefers-reduced-motion: no-preference), survive 320px width and 200% zoom, never user-scalable=no."
  ],
  writing: [
    "Buttons start with a verb ('Delete project', never 'OK' or 'Yes'). Links name destination ('Read billing docs', never 'Click here').",
    "Sentence case by default. Settings toggles describe the ON state ('Send read receipts', never 'Don't send...').",
    "Errors state what failed and how to recover without 'Oops', blame, or '!'.",
    "Prefer immediate Undo for frequent reversible actions; require explicit confirmation ('Delete <Name>?') for destructive ones.",
    "Empty states explain the view and offer one primary next action. Use whole ICU plural strings and Intl formatting."
  ]
};

function parseHexToRgb(hex) {
  const clean = hex.replace(/^#/, "").trim();
  const full = clean.length === 3
    ? clean.split("").map((c) => c + c).join("")
    : clean;
  const num = parseInt(full, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function relativeLuminance([r, g, b]) {
  const [rs, gs, bs] = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function calculateContrast(hex1, hex2) {
  const l1 = relativeLuminance(parseHexToRgb(hex1));
  const l2 = relativeLuminance(parseHexToRgb(hex2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
}

function generateOklchRamp(hue, peakChroma = 0.16) {
  const steps = [
    { step: 50, l: 0.97, cFactor: 0.12, role: "App / subtle background" },
    { step: 100, l: 0.93, cFactor: 0.22, role: "Subtle component fill / hover" },
    { step: 200, l: 0.88, cFactor: 0.38, role: "Active / selected subtle fill" },
    { step: 300, l: 0.80, cFactor: 0.58, role: "Subtle border / separator" },
    { step: 400, l: 0.71, cFactor: 0.82, role: "Stronger border / focus ring" },
    { step: 500, l: 0.62, cFactor: 1.00, role: "Pure vivid accent (check contrast with white)" },
    { step: 600, l: 0.53, cFactor: 0.95, role: "Primary solid button fill (passes 4.5:1 with white)" },
    { step: 700, l: 0.45, cFactor: 0.82, role: "Solid button hover" },
    { step: 800, l: 0.37, cFactor: 0.65, role: "Low-contrast text / icon on light surface" },
    { step: 900, l: 0.28, cFactor: 0.45, role: "High-contrast secondary text" },
    { step: 950, l: 0.19, cFactor: 0.28, role: "Primary heading / body text" }
  ];
  return steps.map((s) => ({
    step: s.step,
    oklch: `oklch(${s.l.toFixed(2)} ${(peakChroma * s.cFactor).toFixed(3)} ${hue})`,
    role: s.role
  }));
}

const TOOLS = [
  {
    name: "measure_wcag_contrast",
    description: "Calculates exact WCAG 2.2 contrast ratio between foreground and background hex colors and checks AA/AAA thresholds (better-colors & better-accessibility).",
    inputSchema: {
      type: "object",
      properties: {
        foregroundHex: { type: "string", description: "Foreground hex color, e.g. #ffffff" },
        backgroundHex: { type: "string", description: "Background hex color, e.g. #2563eb" }
      },
      required: ["foregroundHex", "backgroundHex"]
    }
  },
  {
    name: "compute_concentric_radius",
    description: "Computes exact concentric outer border-radius from inner radius, padding, and border width per better-ui rules (cutoff at 24px padding).",
    inputSchema: {
      type: "object",
      properties: {
        innerRadiusPx: { type: "number", description: "Inner element border-radius in px" },
        paddingPx: { type: "number", description: "Even inset padding between parent and child in px" },
        borderWidthPx: { type: "number", description: "Outer border width in px (default 0)" }
      },
      required: ["innerRadiusPx", "paddingPx"]
    }
  },
  {
    name: "generate_oklch_ramp",
    description: "Generates an 11-step OKLCH color ramp (50-950) with constant hue, tight 0.04-0.05 L light steps, and semantic role mappings per better-colors.",
    inputSchema: {
      type: "object",
      properties: {
        hue: { type: "number", description: "OKLCH hue angle from 0 to 360" },
        peakChroma: { type: "number", description: "Peak chroma at step 500 (default 0.16)" }
      },
      required: ["hue"]
    }
  },
  {
    name: "get_design_checklist",
    description: "Returns the exact design engineering rules and 'Before you finish' checklist for a specific domain (ui, typography, colors, layout, accessibility, writing, or all).",
    inputSchema: {
      type: "object",
      properties: {
        domain: {
          type: "string",
          enum: ["ui", "typography", "colors", "layout", "accessibility", "writing", "all"]
        }
      },
      required: ["domain"]
    }
  }
];

const rl = readline.createInterface({ input: process.stdin, terminal: false });

function sendResponse(id, result) {
  process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id, result }) + "\n");
}

function sendError(id, code, message) {
  process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id, error: { code, message } }) + "\n");
}

rl.on("line", (line) => {
  if (!line.trim()) return;
  let req;
  try {
    req = JSON.parse(line);
  } catch {
    return;
  }
  const { id, method, params } = req;

  if (method === "initialize") {
    return sendResponse(id, {
      protocolVersion: "2024-11-05",
      capabilities: { tools: {} },
      serverInfo: { name: "interfaces-design-mcp", version: "1.0.0" }
    });
  }
  if (method === "notifications/initialized") return;
  if (method === "tools/list") {
    return sendResponse(id, { tools: TOOLS });
  }
  if (method === "tools/call") {
    const toolName = params?.name;
    const args = params?.arguments || {};

    if (toolName === "measure_wcag_contrast") {
      const ratio = calculateContrast(args.foregroundHex, args.backgroundHex);
      const result = {
        foreground: args.foregroundHex,
        background: args.backgroundHex,
        contrastRatio: `${ratio}:1`,
        passesNormalTextAA_4_5: ratio >= 4.5,
        passesLargeTextAndUIBoundariesAA_3_0: ratio >= 3.0,
        passesEnhancedAAA_7_0: ratio >= 7.0,
        remediationHint: ratio < 4.5
          ? "Adjust OKLCH Lightness (L) channel — never shift hue to fix contrast. For white text on a 500 fill, move fill to step 600."
          : "Contrast passes WCAG 2.2 AA requirements."
      };
      return sendResponse(id, { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] });
    }

    if (toolName === "compute_concentric_radius") {
      const inner = Number(args.innerRadiusPx);
      const pad = Number(args.paddingPx);
      const border = Number(args.borderWidthPx || 0);
      const isSeparateSurface = pad > 24;
      const result = isSeparateSurface
        ? {
            concentricApplies: false,
            reason: "Padding exceeds 24px cutoff. Treat inner and outer containers as separate surfaces and use standard radius tokens."
          }
        : {
            concentricApplies: true,
            outerRadiusPx: inner + pad + border,
            formula: `${inner}px (inner) + ${pad}px (padding) + ${border}px (border) = ${inner + pad + border}px`,
            css: `border-radius: ${inner + pad + border}px;`
          };
      return sendResponse(id, { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] });
    }

    if (toolName === "generate_oklch_ramp") {
      const ramp = generateOklchRamp(Number(args.hue), Number(args.peakChroma || 0.16));
      return sendResponse(id, { content: [{ type: "text", text: JSON.stringify(ramp, null, 2) }] });
    }

    if (toolName === "get_design_checklist") {
      const dom = args.domain || "all";
      const data = dom === "all" ? CHECKLISTS : { [dom]: CHECKLISTS[dom] };
      return sendResponse(id, { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] });
    }

    return sendError(id, -32601, `Unknown tool: ${toolName}`);
  }

  if (id !== undefined) {
    sendResponse(id, {});
  }
});
