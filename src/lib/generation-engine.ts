/**
 * Morphix Generation Engine v2 — Bespoke Site Generator
 * ──────────────────────────────────────────────────────
 * Architecture:
 *   1. Design System Pass (GPT-4o-mini) — locks tokens for entire session
 *   2. Retrieval-Grounded Section Matching — checks library before generating
 *   3. Explicit Layout Variant Selection — prevents statistical sameness
 *   4. TSX-Only Generation (Gemini Flash) — single source of truth
 *   5. Server-Side Compile → renderToStaticMarkup → Tailwind CDN preview
 *   6. Self-Correction Retry Loop — compile error fed back to LLM
 *   7. Gated Persistent Registry — only validated components are saved
 */

import { findComponent, registerGeneratedComponent } from "@/lib/component-registry";
import path from "path";
import fs from "fs";
import * as ts from "typescript";
import * as LucideIcons from "lucide-react";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

// ── API Helpers ────────────────────────────────────────────────────────────

async function callOpenAI(prompt: string, jsonMode = true): Promise<string> {
  const res = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 4096,
      ...(jsonMode ? { response_format: { type: "json_object" } } : {}),
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    let friendlyMsg = `OpenAI API error (${res.status})`;
    try {
      const errJson = JSON.parse(errText);
      friendlyMsg = errJson?.error?.message || friendlyMsg;
    } catch { /* keep friendly fallback */ }
    throw new Error(friendlyMsg);
  }

  const data = await res.json();
  return (data?.choices?.[0]?.message?.content ?? "").trim();
}

async function callGemini(prompt: string): Promise<string> {
  const res = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.85,
        maxOutputTokens: 8192,
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error (${res.status}): ${errText.slice(0, 200)}`);
  }

  const data = await res.json();
  return (data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "").trim();
}

function parseJSON<T>(raw: string): T {
  const cleaned = raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
  return JSON.parse(cleaned) as T;
}

function hexToRgb(hex: string): string {
  const clean = hex.replace("#", "");
  if (clean.length < 6) return "59,130,246";
  const r = parseInt(clean.substring(0, 2), 16) || 0;
  const g = parseInt(clean.substring(2, 4), 16) || 0;
  const b = parseInt(clean.substring(4, 6), 16) || 0;
  return `${r},${g},${b}`;
}

// ── Types ──────────────────────────────────────────────────────────────────

export interface DesignSystem {
  primaryColor: string;
  primaryRgb: string;
  secondaryColor: string;
  accentColor: string;
  bgColor: string;
  cardBgColor: string;
  textColor: string;
  mutedColor: string;
  headingFont: string;
  bodyFont: string;
  fontWeights: { normal: string; medium: string; bold: string; black: string };
  typeScale: { h1: string; h2: string; h3: string; h4: string; body: string; small: string };
  spacing: { xs: string; sm: string; md: string; lg: string; xl: string; "2xl": string };
  borderRadius: { sm: string; md: string; lg: string; xl: string };
  shadows: { sm: string; md: string; lg: string; glow: string };
  motion: { easing: string; duration: string };
}

export interface Intent {
  websiteType: string;
  industry: string;
  theme: string;
  style: string;
  animation: string;
  primaryColor: string;
  bgColor: string;
  pages: string[];
  keywords: string[];
}

export interface BlueprintSection {
  id: string;
  label: string;
  type: string;
  layoutVariant: string;
}

export interface Blueprint {
  siteName: string;
  sections: BlueprintSection[];
  designTokens: {
    primaryColor: string;
    bgColor: string;
    fontFamily: string;
    borderRadius: string;
  };
}

export interface GeneratedSection {
  id: string;
  label: string;
  componentId: string;
  html: string;
  tsx: string;
}

// ── Layout Variant Map ─────────────────────────────────────────────────────

const LAYOUT_VARIANTS: Record<string, string[]> = {
  hero: [
    "centered-gradient",
    "split-image-left",
    "split-image-right",
    "asymmetric-offset",
    "full-bleed-dark",
    "diagonal-cut",
    "minimal-text-only",
    "bento-hero",
  ],
  features: [
    "icon-grid-3col",
    "icon-grid-4col",
    "alternating-image-rows",
    "bento-grid",
    "numbered-steps",
    "side-by-side-tabs",
    "timeline-steps",
    "card-hover-reveal",
  ],
  navbar: [
    "inline-links-dark",
    "minimal-logo-center",
    "glass-blur-sticky",
    "transparent-overlay",
    "pill-links",
  ],
  pricing: [
    "cards-3col",
    "comparison-table",
    "toggle-billing-period",
    "featured-center-highlight",
    "horizontal-tiers",
  ],
  footer: [
    "columns-4",
    "minimal-centered",
    "split-brand-links",
    "newsletter-left-links-right",
  ],
  testimonials: [
    "quote-grid-3col",
    "carousel-single",
    "masonry-cards",
    "avatar-list",
  ],
  cta: [
    "centered-gradient-band",
    "split-image-cta",
    "floating-card-cta",
    "email-signup-inline",
  ],
  faq: ["accordion-split", "two-col-grid", "numbered-accordion"],
  stats: ["horizontal-4-stats", "grid-with-icons", "counter-cards"],
  team: ["card-grid-3col", "horizontal-list", "avatar-bubble-grid"],
  gallery: ["masonry-grid", "full-bleed-carousel", "lightbox-grid"],
};

function getVariantsForType(sectionType: string): string[] {
  return (
    LAYOUT_VARIANTS[sectionType.toLowerCase()] ||
    LAYOUT_VARIANTS["features"] || // default fallback list
    ["default"]
  );
}

// ── Step 1: Intent Engine ─────────────────────────────────────────────────

export async function runIntentEngine(
  userPrompt: string,
  websiteType: string,
  projectName: string
): Promise<Intent> {
  const prompt = `You are the Intent Engine of Morphix, an AI website builder.

Analyze this user request and return a JSON object:

User Prompt: "${userPrompt}"
Website Type: "${websiteType}"
Project Name: "${projectName}"

Return JSON with this exact shape:
{
  "websiteType": "ecommerce | saas | portfolio | blog | landing-page | marketplace | dashboard",
  "industry": "marketplace | fintech | healthcare | education | retail | tech | agency | creative",
  "theme": "dark | light | glass | colorful",
  "style": "amazon-inspired | minimal | bold | glassmorphism | corporate | playful | luxury | brutalist | neo-noir",
  "animation": "none | minimal | moderate | rich",
  "primaryColor": "#hex — accent color matching the brand vibe",
  "bgColor": "#hex — dark/light background color",
  "pages": ["page names needed, e.g. Home, Product, Cart"],
  "keywords": ["key style/feature words"]
}`;

  const raw = await callOpenAI(prompt, true);
  return parseJSON<Intent>(raw);
}

// ── Step 2: Design System Pass ─────────────────────────────────────────────

export async function runDesignSystemPass(
  intent: Intent,
  userPrompt: string,
  siteName: string
): Promise<DesignSystem> {
  const prompt = `You are the Design System Engine of Morphix, a premium AI website builder.

Generate a complete, cohesive design system for this website. This design system will be used VERBATIM by every section, ensuring pixel-perfect consistency throughout the site.

Website context:
- Type: ${intent.websiteType}
- Industry: ${intent.industry}
- Style: ${intent.style}
- Theme: ${intent.theme}
- Site name: ${siteName}
- User prompt: "${userPrompt}"

Requirements:
- primaryColor MUST match the brand vibe (vibrant, not generic)
- If theme is "dark", bgColor must be very dark (#050811, #080b14, etc.)
- If theme is "glass", cardBgColor must be a semi-transparent rgba value
- headingFont and bodyFont must be real Google Fonts names
- Choose fonts that match the site's personality (e.g. "Space Grotesk" for tech, "Playfair Display" for luxury)
- shadows.glow must be a colored glow matching primaryColor
- Choose completely different font pairings for different site styles

Return a JSON object with EXACTLY this shape (all fields required):
{
  "primaryColor": "#hex",
  "primaryRgb": "r,g,b (no rgba, just comma-separated numbers)",
  "secondaryColor": "#hex",
  "accentColor": "#hex",
  "bgColor": "#hex",
  "cardBgColor": "#hex or rgba(...)",
  "textColor": "#hex",
  "mutedColor": "#hex or rgba(...)",
  "headingFont": "Font Name (exact Google Fonts name)",
  "bodyFont": "Font Name (exact Google Fonts name)",
  "fontWeights": { "normal": "400", "medium": "500", "bold": "700", "black": "900" },
  "typeScale": { "h1": "clamp(40px,6vw,80px)", "h2": "clamp(28px,4vw,48px)", "h3": "24px", "h4": "18px", "body": "16px", "small": "13px" },
  "spacing": { "xs": "8px", "sm": "16px", "md": "24px", "lg": "48px", "xl": "80px", "2xl": "120px" },
  "borderRadius": { "sm": "6px", "md": "12px", "lg": "20px", "xl": "32px" },
  "shadows": { "sm": "0 2px 8px rgba(0,0,0,0.15)", "md": "0 8px 32px rgba(0,0,0,0.25)", "lg": "0 24px 64px rgba(0,0,0,0.4)", "glow": "0 0 40px rgba(R,G,B,0.35)" },
  "motion": { "easing": "cubic-bezier(0.25, 0.46, 0.45, 0.94)", "duration": "0.3s" }
}`;

  const raw = await callOpenAI(prompt, true);
  const ds = parseJSON<DesignSystem>(raw);

  // Ensure primaryRgb is always computed correctly
  ds.primaryRgb = hexToRgb(ds.primaryColor);
  ds.shadows.glow = ds.shadows.glow.replace(
    /rgba\(.*?\)/,
    `rgba(${ds.primaryRgb},0.35)`
  );

  return ds;
}

// ── Step 3: Blueprint Engine ──────────────────────────────────────────────

export async function runBlueprintEngine(
  intent: Intent,
  userPrompt: string,
  designSystem: DesignSystem
): Promise<Blueprint> {
  const variantExamples = Object.entries(LAYOUT_VARIANTS)
    .slice(0, 5)
    .map(([type, variants]) => `  ${type}: [${variants.slice(0, 3).join(", ")}]`)
    .join("\n");

  const prompt = `You are the Blueprint Engine of Morphix, an AI website builder.

Design the page section structure for this website.

Intent: ${JSON.stringify(intent, null, 2)}
Original prompt: "${userPrompt}"
Primary color: ${designSystem.primaryColor}
Background: ${designSystem.bgColor}

Rules:
- Pick 5–8 sections. ALWAYS include navbar and footer.
- Section types allowed: navbar | hero | features | pricing | footer | testimonials | cta | faq | stats | team | gallery | custom
- Each section MUST have a layoutVariant chosen from realistic options. Examples:
${variantExamples}
- Make the layoutVariant descriptive and specific (e.g. "split-image-right", not just "split")
- siteName should be a real, creative brand name derived from the prompt (e.g. "NexaFlow" not "My Website")

Return JSON:
{
  "siteName": "CreativeBrandName",
  "sections": [
    { "id": "navbar", "label": "Navbar", "type": "navbar", "layoutVariant": "glass-blur-sticky" },
    { "id": "hero", "label": "Hero", "type": "hero", "layoutVariant": "split-image-right" },
    { "id": "features", "label": "Features", "type": "features", "layoutVariant": "bento-grid" },
    { "id": "pricing", "label": "Pricing", "type": "pricing", "layoutVariant": "cards-3col" },
    { "id": "footer", "label": "Footer", "type": "footer", "layoutVariant": "columns-4" }
  ],
  "designTokens": {
    "primaryColor": "${designSystem.primaryColor}",
    "bgColor": "${designSystem.bgColor}",
    "fontFamily": "${designSystem.headingFont}",
    "borderRadius": "${designSystem.borderRadius.md}"
  }
}`;

  const raw = await callOpenAI(prompt, true);
  return parseJSON<Blueprint>(raw);
}

// ── Step 4: TSX Generation (single artifact) ──────────────────────────────

interface SectionContext {
  id: string;
  label: string;
  tailwindPatterns: string[];
}

async function generateTSXComponent(
  section: BlueprintSection,
  intent: Intent,
  blueprint: Blueprint,
  designSystem: DesignSystem,
  userPrompt: string,
  previousSections: SectionContext[],
  compilerError?: string
): Promise<string> {
  const variantsForType = getVariantsForType(section.type);
  const contextSummary =
    previousSections.length > 0
      ? `Already-generated sections (match their styling conventions):
${previousSections.map((s) => `- ${s.label}: uses [${s.tailwindPatterns.slice(0, 5).join(", ")}]`).join("\n")}`
      : "This is the first section.";

  const errorContext = compilerError
    ? `\n⚠️ PREVIOUS ATTEMPT FAILED with this TypeScript error — fix it:\n${compilerError}\n`
    : "";

  const prompt = `You are a world-class React/Tailwind UI engineer building sections for a premium website using Morphix, an AI website builder.
${errorContext}
Your task: Generate a COMPLETE, stunning React/TSX component for the "${section.label}" section.

## Site Context
- Site name: ${blueprint.siteName}
- Type: ${intent.websiteType} | Industry: ${intent.industry}
- Style: ${intent.style} | Theme: ${intent.theme}
- Original prompt: "${userPrompt}"

## Design System (follow EXACTLY — these values are law for this entire site)
\`\`\`json
${JSON.stringify(designSystem, null, 2)}
\`\`\`

## Section Spec
- Section: ${section.label} (id: "${section.id}", type: "${section.type}")
- Layout Variant: **${section.layoutVariant}** — implement this exact layout pattern
- Available variants for this type: ${variantsForType.join(", ")}

## Context from Previous Sections
${contextSummary}

## Generation Rules
1. Output ONLY a valid TypeScript/React component — no explanations, no markdown fences, just the TSX code
2. The component must be a pure presentational component — NO useState, NO useEffect, NO useRef, NO browser APIs
3. Import ONLY from "lucide-react" and "react" — NO other external imports
4. Use Tailwind CSS classes throughout. Use arbitrary values for exact design token values (e.g. bg-[#0a0d1a], text-[${designSystem.primaryColor}])
5. Use inline style only for CSS variables, complex gradients, or keyframe animations not expressible in Tailwind
6. The component must export a default function named exactly: ${toPascalCase(section.id)}Section
7. Use lucide-react icons — pick appropriate, specific icons (e.g. Zap, Shield, Globe, ArrowRight, etc.)
8. Write REAL, specific copy tied to: ${blueprint.siteName} — ${intent.industry} — "${userPrompt}"
9. ABSOLUTELY NO lorem ipsum, "Feature One", "Lorem Ipsum", placeholder text, or generic copy
10. Make it visually stunning — this is a PREMIUM product. Use glassmorphism, gradients, glows, hover effects
11. The component must be FULLY self-contained and render correctly with no props required
12. Include smooth CSS transitions on interactive elements (hover states, card lifts, etc.)

## Design Token Values to Use
- Primary: ${designSystem.primaryColor} / rgba(${designSystem.primaryRgb}, 0.X)
- Background: ${designSystem.bgColor}
- Card bg: ${designSystem.cardBgColor}
- Text: ${designSystem.textColor}
- Muted: ${designSystem.mutedColor}
- Heading font: "${designSystem.headingFont}"
- Body font: "${designSystem.bodyFont}"
- Border radius (md): ${designSystem.borderRadius.md}
- Glow shadow: ${designSystem.shadows.glow}

Generate the complete TSX component now. Start directly with the import statement.`;

  const raw = await callGemini(prompt);

  // Strip any markdown fences if present
  return raw
    .replace(/^```tsx?\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
}

function toPascalCase(str: string): string {
  return str
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

// ── Step 5: TSX Compilation & Preview Rendering ────────────────────────────

function validateAndCompileTSX(tsxCode: string): {
  success: boolean;
  error?: string;
  jsCode?: string;
} {
  try {
    const result = ts.transpileModule(tsxCode, {
      compilerOptions: {
        jsx: ts.JsxEmit.React,
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2017,
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        strict: false,
        skipLibCheck: true,
      },
      reportDiagnostics: false,
    });

    return { success: true, jsCode: result.outputText };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "TypeScript compilation failed",
    };
  }
}

function renderTSXToHTML(jsCode: string): string | null {
  try {
    // Dynamic imports to avoid Turbopack treating this as a client component
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const React = require("react") as typeof import("react");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { renderToStaticMarkup } = require("react-dom/server") as typeof import("react-dom/server");
    // Clean up CommonJS require statements and replace with injected deps
    let cleaned = jsCode
      .replace(/"use strict";\s*/g, "")
      .replace(/Object\.defineProperty\(exports,\s*"__esModule"[^;]+;\s*/g, "")
      .replace(
        /const\s+(\w+)\s*=\s*require\("react"\);?/g,
        'const $1 = __React;'
      )
      .replace(
        /const\s+(\w+)\s*=\s*require\("lucide-react"\);?/g,
        'const $1 = __LucideIcons;'
      )
      .replace(/require\("[^"]+"\)/g, "({})")
      .replace(/exports\.default\s*=/, "__componentExport =");

    // Add exports.default fallback for different export patterns
    if (!cleaned.includes("__componentExport =")) {
      cleaned = cleaned.replace(
        /function\s+(\w+Section)\s*\(/,
        '__componentExport = function $1('
      );
    }

    // Create the lucide proxy: maps any property access to the real icon or a fallback span
    const lucideProxy = new Proxy(LucideIcons as Record<string, unknown>, {
      get: (target, name: string) => {
        if (name in target) return target[name];
        // Fallback: return a simple span component
        return ({ size = 16 }: { size?: number }) =>
          React.createElement("span", {
            style: {
              display: "inline-block",
              width: size,
              height: size,
              background: "currentColor",
              borderRadius: "2px",
              opacity: 0.6,
            },
          });
      },
    });

    let componentExport: React.ComponentType | null = null;

    // eslint-disable-next-line no-new-func
    const fn = new Function(
      "__React",
      "__LucideIcons",
      "exports",
      "module",
      `
      let __componentExport = null;
      ${cleaned}
      return __componentExport || (typeof exports !== 'undefined' ? exports.default : null);
    `
    );

    componentExport = fn(React, lucideProxy, {}, { exports: {} }) as React.ComponentType;

    if (!componentExport || typeof componentExport !== "function") {
      return null;
    }

    const html = renderToStaticMarkup(React.createElement(componentExport));
    return html;
  } catch {
    return null;
  }
}

function wrapForPreview(
  renderedHTML: string,
  designSystem: DesignSystem,
  siteName: string
): string {
  const headingFontParam = designSystem.headingFont.replace(/\s+/g, "+");
  const bodyFontParam = designSystem.bodyFont.replace(/\s+/g, "+");
  const sameFont = headingFontParam === bodyFontParam;

  const fontUrl = sameFont
    ? `https://fonts.googleapis.com/css2?family=${headingFontParam}:wght@400;500;600;700;800;900&display=swap`
    : `https://fonts.googleapis.com/css2?family=${headingFontParam}:wght@400;600;700;800;900&family=${bodyFontParam}:wght@400;500;600&display=swap`;

  const tailwindConfig = JSON.stringify({
    theme: {
      extend: {
        colors: {
          primary: designSystem.primaryColor,
          secondary: designSystem.secondaryColor,
          accent: designSystem.accentColor,
        },
        fontFamily: {
          heading: [`'${designSystem.headingFont}'`, "sans-serif"],
          body: [`'${designSystem.bodyFont}'`, "sans-serif"],
          sans: [`'${designSystem.bodyFont}'`, "sans-serif"],
        },
        borderRadius: {
          DEFAULT: designSystem.borderRadius.md,
          sm: designSystem.borderRadius.sm,
          lg: designSystem.borderRadius.lg,
          xl: designSystem.borderRadius.xl,
        },
      },
    },
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${siteName}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/>
<link rel="stylesheet" href="${fontUrl}"/>
<script src="https://cdn.tailwindcss.com"></script>
<script>
  window.addEventListener('load', function() {
    if (window.tailwind) {
      window.tailwind.config = ${tailwindConfig};
    }
  });
</script>
<style>
  :root {
    --primary: ${designSystem.primaryColor};
    --primary-rgb: ${designSystem.primaryRgb};
    --secondary: ${designSystem.secondaryColor};
    --accent: ${designSystem.accentColor};
    --bg: ${designSystem.bgColor};
    --card-bg: ${designSystem.cardBgColor};
    --text: ${designSystem.textColor};
    --muted: ${designSystem.mutedColor};
    --heading-font: '${designSystem.headingFont}', sans-serif;
    --body-font: '${designSystem.bodyFont}', sans-serif;
    --radius-sm: ${designSystem.borderRadius.sm};
    --radius-md: ${designSystem.borderRadius.md};
    --radius-lg: ${designSystem.borderRadius.lg};
    --shadow-glow: ${designSystem.shadows.glow};
    --duration: ${designSystem.motion.duration};
    --easing: ${designSystem.motion.easing};
  }
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: var(--body-font);
    background: var(--bg);
    color: var(--text);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h1, h2, h3, h4, h5, h6 { font-family: var(--heading-font); }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: var(--shadow-glow); }
    50% { box-shadow: none; }
  }
  .animate-fade-in-up { animation: fadeInUp 0.6s var(--easing) forwards; }
</style>
</head>
<body>
${renderedHTML}
</body>
</html>`;
}

// ── Full Section Renderer ─────────────────────────────────────────────────

async function renderSection(
  section: BlueprintSection,
  intent: Intent,
  blueprint: Blueprint,
  designSystem: DesignSystem,
  userPrompt: string,
  previousSections: SectionContext[]
): Promise<GeneratedSection> {
  // Attempt 1: Generate TSX
  let tsxCode = await generateTSXComponent(
    section, intent, blueprint, designSystem, userPrompt, previousSections
  );

  // Compile attempt 1
  const compile1 = validateAndCompileTSX(tsxCode);

  let finalTsx = tsxCode;
  let jsCode = compile1.jsCode;

  // Self-correction: if compilation failed, retry once with error context
  if (!compile1.success || !compile1.jsCode) {
    console.warn(`[Section ${section.id}] Compile error — retrying with error context:`, compile1.error);

    const correctedTsx = await generateTSXComponent(
      section, intent, blueprint, designSystem, userPrompt,
      previousSections,
      compile1.error || "TypeScript/JSX syntax error in generated code"
    );

    const compile2 = validateAndCompileTSX(correctedTsx);

    if (compile2.success && compile2.jsCode) {
      finalTsx = correctedTsx;
      jsCode = compile2.jsCode;
    } else {
      // Both attempts failed — fall back to the static template
      console.warn(`[Section ${section.id}] Retry also failed — using static template fallback`);
      return renderStaticFallback(section, intent, blueprint, designSystem);
    }
  }

  // Render TSX to HTML via renderToStaticMarkup
  const renderedHTML = jsCode ? renderTSXToHTML(jsCode) : null;

  let previewHTML: string;

  if (renderedHTML) {
    previewHTML = wrapForPreview(renderedHTML, designSystem, blueprint.siteName);
  } else {
    // renderToStaticMarkup failed (hooks, browser APIs etc.) — fall back to static
    console.warn(`[Section ${section.id}] SSR render failed — using static template fallback`);
    return renderStaticFallback(section, intent, blueprint, designSystem);
  }

  // Extract Tailwind class patterns for cohesion context
  const tailwindPatterns = extractTailwindPatterns(finalTsx);

  // Register component in library (gated — only validated components)
  const newId = `${section.type}_ai_${Date.now()}`;
  registerGeneratedComponent(
    {
      metadata: {
        id: newId,
        name: `AI ${section.label} — ${blueprint.siteName}`,
        category: section.type,
        style: [intent.style, intent.theme],
        industries: [intent.industry],
        tags: [section.type, section.layoutVariant, "ai-generated", intent.industry],
        description: `AI-generated ${section.label} (${section.layoutVariant}) for ${intent.industry}`,
        supports: [section.layoutVariant],
      },
      schema: {},
      templatePath: "",
      tsxCode: finalTsx,
    },
    true // validated = true, eligible for persistence
  );

  return {
    id: section.id,
    label: section.label,
    componentId: newId,
    html: previewHTML,
    tsx: finalTsx,
  };
}

function extractTailwindPatterns(tsxCode: string): string[] {
  const classMatches = tsxCode.match(/className="([^"]+)"/g) || [];
  const patterns: Set<string> = new Set();

  for (const match of classMatches) {
    const classes = match
      .replace(/className="/, "")
      .replace(/"$/, "")
      .split(/\s+/);
    for (const cls of classes) {
      // Extract meaningful pattern prefixes (bg-, text-, border-, rounded-, etc.)
      const pattern = cls.split("-")[0] + "-" + cls.split("-")[1];
      if (pattern && pattern.length > 3) patterns.add(pattern);
    }
  }

  return Array.from(patterns).slice(0, 20);
}

// ── Static Template Fallback ──────────────────────────────────────────────

function readTemplate(templatePath: string): string {
  const fullPath = path.join(
    process.cwd(),
    "src",
    "lib",
    "component-library",
    templatePath
  );
  return fs.readFileSync(fullPath, "utf-8");
}

async function renderStaticFallback(
  section: BlueprintSection,
  intent: Intent,
  blueprint: Blueprint,
  designSystem: DesignSystem
): Promise<GeneratedSection> {
  const component = findComponent(section.type);

  if (!component) {
    // Ultimate fallback: generate a simple placeholder section
    const placeholderHtml = wrapForPreview(
      `<section style="padding:80px 40px;text-align:center;background:${designSystem.bgColor};color:${designSystem.textColor}">
        <h2 style="font-size:32px;margin-bottom:16px;color:${designSystem.primaryColor}">${section.label}</h2>
        <p style="opacity:0.6">Section content</p>
      </section>`,
      designSystem,
      blueprint.siteName
    );
    return {
      id: section.id,
      label: section.label,
      componentId: "placeholder",
      html: placeholderHtml,
      tsx: `export default function ${toPascalCase(section.id)}Section() { return <section className="py-20 text-center"><h2>${section.label}</h2></section>; }`,
    };
  }

  const template = readTemplate(component.templatePath);

  // Use the existing template renderers as fallback
  let html = template;
  const tokens = {
    primaryColor: designSystem.primaryColor,
    bgColor: designSystem.bgColor,
    fontFamily: designSystem.headingFont,
    borderRadius: designSystem.borderRadius.md,
  };

  const props: Record<string, unknown> = {
    primaryColor: designSystem.primaryColor,
    bgColor: designSystem.bgColor,
    logo: blueprint.siteName,
    theme: intent.theme,
    links: ["Home", "Features", "Pricing"],
    ctaText: "Get Started",
    headline: `${blueprint.siteName} — ${intent.websiteType}`,
    subheadline: `Built for ${intent.industry}`,
    primaryCta: "Get Started",
    badge: intent.industry,
    sectionTitle: "Features",
    sectionSubtitle: "Everything you need",
    features: [
      { icon: "⚡", title: "Fast", description: "Lightning-fast performance" },
      { icon: "🔒", title: "Secure", description: "Enterprise-grade security" },
      { icon: "📈", title: "Scalable", description: "Grows with your business" },
    ],
    plans: [
      { name: "Free", price: "$0", period: "/mo", features: ["Basic access"], ctaText: "Start Free", highlighted: false },
      { name: "Pro", price: "$29", period: "/mo", features: ["All features", "Priority support"], ctaText: "Get Pro", highlighted: true },
    ],
    brandName: blueprint.siteName,
    tagline: `The future of ${intent.industry}`,
    linkColumns: [{ heading: "Product", links: ["Features", "Pricing"] }],
    copyright: `© ${new Date().getFullYear()} ${blueprint.siteName}. All rights reserved.`,
  };

  switch (component.metadata.category) {
    case "navbar":
      html = renderNavbar(template, props, tokens);
      break;
    case "hero":
      html = renderHero(template, props, tokens);
      break;
    case "features":
      html = renderFeatures(template, props, tokens);
      break;
    case "pricing":
      html = renderPricing(template, props, tokens);
      break;
    case "footer":
      html = renderFooter(template, props, tokens);
      break;
  }

  return {
    id: section.id,
    label: section.label,
    componentId: component.metadata.id,
    html,
    tsx: "",
  };
}

// ── Legacy Template Renderers (used only as static fallback) ──────────────

function hexToRgba(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex);
  return `rgba(${rgb},${alpha})`;
}

function renderNavbar(
  template: string,
  props: Record<string, unknown>,
  tokens: Blueprint["designTokens"]
): string {
  const primary = (props.primaryColor as string) || tokens.primaryColor;
  const bg = (props.bgColor as string) || tokens.bgColor;
  const navBg =
    props.theme === "glass"
      ? "rgba(10,10,20,0.85)"
      : props.theme === "light"
      ? "rgba(255,255,255,0.95)"
      : "#0a0d1a";
  const links = (props.links as string[]) || ["Home", "Features", "Pricing"];
  const navLinksHtml = links
    .map((l) => `<li><a href="#">${l}</a></li>`)
    .join("\n");
  const logo = (props.logo as string) || "Brand";
  const initial = logo.charAt(0).toUpperCase();
  const searchBtn = props.showSearch
    ? `<div class="search-btn">🔍</div>`
    : "";
  const cartBtn = props.showCart ? `<div class="cart-btn">🛒</div>` : "";
  const primaryGlow = hexToRgba(primary, 0.4);

  return template
    .replace(/{{BG_COLOR}}/g, bg)
    .replace(/{{NAV_BG}}/g, navBg)
    .replace(/{{BORDER_COLOR}}/g, "rgba(255,255,255,0.07)")
    .replace(/{{PRIMARY_COLOR}}/g, primary)
    .replace(/{{PRIMARY_GLOW}}/g, primaryGlow)
    .replace(/{{LOGO_INITIAL}}/g, initial)
    .replace(/{{LOGO}}/g, logo)
    .replace(/{{NAV_LINKS}}/g, navLinksHtml)
    .replace(/{{SEARCH_BTN}}/g, searchBtn)
    .replace(/{{CART_BTN}}/g, cartBtn)
    .replace(/{{CTA_TEXT}}/g, (props.ctaText as string) || "Get Started");
}

function renderHero(
  template: string,
  props: Record<string, unknown>,
  tokens: Blueprint["designTokens"]
): string {
  const primary = (props.primaryColor as string) || tokens.primaryColor;
  const bg = (props.bgColor as string) || tokens.bgColor;
  const primaryGlow = hexToRgba(primary, 0.25);
  const badgeHtml = props.badge
    ? `<div class="badge">${props.badge}</div>`
    : "";
  const secondaryCtaHtml = props.secondaryCta
    ? `<button class="btn-secondary">${props.secondaryCta}</button>`
    : "";
  const rawHeadline =
    (props.headline as string) || "Build Something Amazing";
  const words = rawHeadline.split(" ");
  const highlighted =
    words.length > 2
      ? words.slice(0, 2).join(" ") +
        ` <span>${words.slice(2).join(" ")}</span>`
      : `<span>${rawHeadline}</span>`;

  return template
    .replace(/{{BG_COLOR}}/g, bg)
    .replace(/{{PRIMARY_COLOR}}/g, primary)
    .replace(/{{PRIMARY_GLOW}}/g, primaryGlow)
    .replace(/{{BADGE_HTML}}/g, badgeHtml)
    .replace(/{{HEADLINE}}/g, highlighted)
    .replace(/{{SUBHEADLINE}}/g, (props.subheadline as string) || "")
    .replace(/{{PRIMARY_CTA}}/g, (props.primaryCta as string) || "Get Started")
    .replace(/{{SECONDARY_CTA_HTML}}/g, secondaryCtaHtml);
}

function renderFeatures(
  template: string,
  props: Record<string, unknown>,
  tokens: Blueprint["designTokens"]
): string {
  const primary = (props.primaryColor as string) || tokens.primaryColor;
  const bg = (props.bgColor as string) || tokens.bgColor;
  const features = (
    props.features as Array<{ icon: string; title: string; description: string }>
  ) || [];
  const cardsHtml = features
    .map(
      (f) => `
    <div class="card">
      <div class="icon">${f.icon}</div>
      <h3>${f.title}</h3>
      <p>${f.description}</p>
    </div>`
    )
    .join("\n");

  return template
    .replace(/{{BG_COLOR}}/g, bg)
    .replace(/{{PRIMARY_COLOR}}/g, primary)
    .replace(
      /{{SECTION_TITLE}}/g,
      (props.sectionTitle as string) || "Why Choose Us"
    )
    .replace(/{{SECTION_SUBTITLE}}/g, (props.sectionSubtitle as string) || "")
    .replace(/{{FEATURE_CARDS}}/g, cardsHtml);
}

function renderPricing(
  template: string,
  props: Record<string, unknown>,
  tokens: Blueprint["designTokens"]
): string {
  const primary = (props.primaryColor as string) || tokens.primaryColor;
  const bg = (props.bgColor as string) || tokens.bgColor;
  type Plan = {
    name: string;
    price: string;
    period: string;
    features: string[];
    ctaText: string;
    highlighted: boolean;
  };
  const plans = (props.plans as Plan[]) || [];
  const cardsHtml = plans
    .map(
      (p) => `
    <div class="card ${p.highlighted ? "highlighted" : ""}">
      ${p.highlighted ? '<div class="recommended">Most Popular</div>' : ""}
      <div class="plan-name">${p.name}</div>
      <div class="price-row"><span class="price">${p.price}</span><span class="period">${p.period}</span></div>
      <div class="divider"></div>
      <ul class="feature-list">
        ${(p.features || []).map((f) => `<li>${f}</li>`).join("\n")}
      </ul>
      <button class="cta-btn">${p.ctaText}</button>
    </div>`
    )
    .join("\n");

  return template
    .replace(/{{BG_COLOR}}/g, bg)
    .replace(/{{PRIMARY_COLOR}}/g, primary)
    .replace(/{{SECTION_TITLE}}/g, (props.sectionTitle as string) || "Pricing")
    .replace(/{{SECTION_SUBTITLE}}/g, (props.sectionSubtitle as string) || "")
    .replace(/{{PRICING_CARDS}}/g, cardsHtml);
}

function renderFooter(
  template: string,
  props: Record<string, unknown>,
  tokens: Blueprint["designTokens"]
): string {
  const primary = (props.primaryColor as string) || tokens.primaryColor;
  const bg = (props.bgColor as string) || tokens.bgColor;
  const columns = (
    props.linkColumns as Array<{ heading: string; links: string[] }>
  ) || [];
  const colsHtml = columns
    .map(
      (col) => `
    <div class="col">
      <h4>${col.heading}</h4>
      <ul>${(col.links || [])
        .map((l) => `<li><a href="#">${l}</a></li>`)
        .join("")}</ul>
    </div>`
    )
    .join("\n");
  const copyright = (
    (props.copyright as string) || "© {{YEAR}} Brand. All rights reserved."
  ).replace("{{YEAR}}", new Date().getFullYear().toString());

  return template
    .replace(/{{BG_COLOR}}/g, bg)
    .replace(/{{PRIMARY_COLOR}}/g, primary)
    .replace(/{{BRAND_NAME}}/g, (props.brandName as string) || "Brand")
    .replace(/{{TAGLINE}}/g, (props.tagline as string) || "")
    .replace(/{{LINK_COLUMNS}}/g, colsHtml)
    .replace(/{{COPYRIGHT}}/g, copyright);
}

// ── Event Types ───────────────────────────────────────────────────────────

export type GenerationEvent =
  | { type: "design_system"; data: DesignSystem }
  | { type: "intent"; data: Intent }
  | { type: "blueprint"; data: Blueprint }
  | { type: "section_start"; data: { id: string; label: string; variant: string } }
  | { type: "section_html"; data: { id: string; label: string; html: string; tsx: string } }
  | { type: "section_complete"; data: { id: string } }
  | { type: "done"; data: { totalSections: number; timeTaken: number } }
  | { type: "error"; data: { message: string } };

// ── Main Pipeline ─────────────────────────────────────────────────────────

export async function* runGenerationPipeline(
  userPrompt: string,
  websiteType: string,
  projectName: string
): AsyncGenerator<GenerationEvent> {
  const start = Date.now();

  try {
    // Step 1: Intent
    const intent = await runIntentEngine(userPrompt, websiteType, projectName);
    yield { type: "intent", data: intent };

    // Step 2: Design System Pass (GPT-4o-mini, one call, quality compounds)
    const siteName = projectName.trim() || "Morphix Site";
    const designSystem = await runDesignSystemPass(intent, userPrompt, siteName);
    yield { type: "design_system", data: designSystem };

    // Step 3: Blueprint (with layout variants)
    const blueprint = await runBlueprintEngine(intent, userPrompt, designSystem);
    yield { type: "blueprint", data: blueprint };

    // Step 4–N: Generate sections (Gemini Flash, per-section, free)
    const previousSections: SectionContext[] = [];

    for (const section of blueprint.sections) {
      yield {
        type: "section_start",
        data: { id: section.id, label: section.label, variant: section.layoutVariant },
      };

      const generated = await renderSection(
        section, intent, blueprint, designSystem, userPrompt, previousSections
      );

      // Accumulate context for next sections (lightweight — patterns only, not raw CSS)
      previousSections.push({
        id: section.id,
        label: section.label,
        tailwindPatterns: extractTailwindPatterns(generated.tsx),
      });

      yield {
        type: "section_html",
        data: { id: section.id, label: section.label, html: generated.html, tsx: generated.tsx },
      };
      yield { type: "section_complete", data: { id: section.id } };
    }

    yield {
      type: "done",
      data: {
        totalSections: blueprint.sections.length,
        timeTaken: Math.round((Date.now() - start) / 1000),
      },
    };
  } catch (err) {
    console.warn("Generation pipeline failed — activating local fallback:", err);
    yield* runLocalPipeline(userPrompt, websiteType, projectName, start);
  }
}

// ── Per-Section Edit Pipeline ─────────────────────────────────────────────

export async function* runSectionEditPipeline(
  sectionId: string,
  sectionLabel: string,
  sectionType: string,
  editInstruction: string,
  previousTsx: string,
  designSystem: DesignSystem,
  intent: Intent,
  blueprint: Blueprint
): AsyncGenerator<GenerationEvent> {
  const editSection: BlueprintSection = {
    id: sectionId,
    label: sectionLabel,
    type: sectionType,
    layoutVariant: "keep-existing",
  };

  yield {
    type: "section_start",
    data: { id: sectionId, label: sectionLabel, variant: "edit" },
  };

  const prompt = `You are editing an existing React/TSX component for Morphix.

Edit instruction: "${editInstruction}"

Existing component code:
\`\`\`tsx
${previousTsx}
\`\`\`

Design system (maintain these tokens exactly):
${JSON.stringify(designSystem, null, 2)}

Rules:
1. Apply ONLY the requested change — do not redesign the whole section
2. Keep all Tailwind classes and design tokens consistent with the design system
3. Output the complete updated TSX component only — no explanations
4. The component must remain a pure presentational component (no hooks, no browser APIs)
5. Maintain the same export name

Output the complete updated TSX now:`;

  const raw = await callGemini(prompt);
  const updatedTsx = raw
    .replace(/^```tsx?\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  const compile = validateAndCompileTSX(updatedTsx);
  if (!compile.success || !compile.jsCode) {
    yield { type: "error", data: { message: `Edit compile failed: ${compile.error}` } };
    return;
  }

  const renderedHTML = renderTSXToHTML(compile.jsCode);
  if (!renderedHTML) {
    yield { type: "error", data: { message: "Edit SSR failed" } };
    return;
  }

  const previewHTML = wrapForPreview(renderedHTML, designSystem, blueprint.siteName);

  yield {
    type: "section_html",
    data: { id: sectionId, label: sectionLabel, html: previewHTML, tsx: updatedTsx },
  };
  yield { type: "section_complete", data: { id: sectionId } };
}

// ── Local Fallback Pipeline ────────────────────────────────────────────────

async function* runLocalPipeline(
  userPrompt: string,
  websiteType: string,
  projectName: string,
  startTime: number
): AsyncGenerator<GenerationEvent> {
  const lowerPrompt = userPrompt.toLowerCase();
  const isAmazon =
    lowerPrompt.includes("amazon") ||
    lowerPrompt.includes("marketplace") ||
    lowerPrompt.includes("shop");
  const isSaaS =
    lowerPrompt.includes("saas") ||
    lowerPrompt.includes("software") ||
    lowerPrompt.includes("fintech") ||
    lowerPrompt.includes("dashboard");
  const isPortfolio =
    lowerPrompt.includes("portfolio") ||
    lowerPrompt.includes("resume") ||
    lowerPrompt.includes("cv");

  const siteName =
    projectName.trim() ||
    (isAmazon ? "AmzMarket" : isSaaS ? "SaaSify" : isPortfolio ? "MyPortfolio" : "MorphixStudio");

  const intent: Intent = {
    websiteType: isAmazon
      ? "marketplace"
      : isSaaS
      ? "saas"
      : isPortfolio
      ? "portfolio"
      : "landing-page",
    industry: isAmazon
      ? "retail"
      : isSaaS
      ? "tech"
      : isPortfolio
      ? "creative"
      : "agency",
    theme: lowerPrompt.includes("light") ? "light" : "dark",
    style: isAmazon
      ? "amazon-inspired"
      : isSaaS
      ? "glassmorphism"
      : "minimal",
    animation: "minimal",
    primaryColor: isAmazon ? "#FF9900" : isSaaS ? "#6366F1" : "#3B82F6",
    bgColor: lowerPrompt.includes("light")
      ? "#F8FAFC"
      : isAmazon
      ? "#0F1111"
      : "#050813",
    pages: ["Home"],
    keywords: ["local-fallback"],
  };

  yield { type: "intent", data: intent };

  // Minimal fallback design system
  const fallbackDS: DesignSystem = {
    primaryColor: intent.primaryColor,
    primaryRgb: hexToRgb(intent.primaryColor),
    secondaryColor: "#818CF8",
    accentColor: "#34D399",
    bgColor: intent.bgColor,
    cardBgColor: "rgba(255,255,255,0.04)",
    textColor: "#FFFFFF",
    mutedColor: "rgba(255,255,255,0.5)",
    headingFont: "Inter",
    bodyFont: "Inter",
    fontWeights: { normal: "400", medium: "500", bold: "700", black: "900" },
    typeScale: { h1: "clamp(40px,6vw,72px)", h2: "clamp(28px,4vw,48px)", h3: "24px", h4: "18px", body: "16px", small: "13px" },
    spacing: { xs: "8px", sm: "16px", md: "24px", lg: "48px", xl: "80px", "2xl": "120px" },
    borderRadius: { sm: "6px", md: "12px", lg: "20px", xl: "32px" },
    shadows: { sm: "0 2px 8px rgba(0,0,0,0.15)", md: "0 8px 32px rgba(0,0,0,0.25)", lg: "0 24px 64px rgba(0,0,0,0.4)", glow: `0 0 40px rgba(${hexToRgb(intent.primaryColor)},0.35)` },
    motion: { easing: "cubic-bezier(0.25,0.46,0.45,0.94)", duration: "0.3s" },
  };

  yield { type: "design_system", data: fallbackDS };
  await new Promise((r) => setTimeout(r, 400));

  const blueprint: Blueprint = {
    siteName,
    sections: [
      { id: "navbar", label: "Navbar", type: "navbar", layoutVariant: "glass-blur-sticky" },
      { id: "hero", label: "Hero", type: "hero", layoutVariant: "centered-gradient" },
      { id: "features", label: "Features", type: "features", layoutVariant: "icon-grid-3col" },
      { id: "pricing", label: "Pricing", type: "pricing", layoutVariant: "cards-3col" },
      { id: "footer", label: "Footer", type: "footer", layoutVariant: "columns-4" },
    ],
    designTokens: {
      primaryColor: intent.primaryColor,
      bgColor: intent.bgColor,
      fontFamily: "Inter",
      borderRadius: "12px",
    },
  };

  yield { type: "blueprint", data: blueprint };
  await new Promise((r) => setTimeout(r, 400));

  for (const section of blueprint.sections) {
    yield {
      type: "section_start",
      data: { id: section.id, label: section.label, variant: section.layoutVariant },
    };
    await new Promise((r) => setTimeout(r, 500));

    const fallback = await renderStaticFallback(section, intent, blueprint, fallbackDS);

    yield {
      type: "section_html",
      data: { id: section.id, label: section.label, html: fallback.html, tsx: fallback.tsx },
    };
    yield { type: "section_complete", data: { id: section.id } };
    await new Promise((r) => setTimeout(r, 300));
  }

  yield {
    type: "done",
    data: {
      totalSections: blueprint.sections.length,
      timeTaken: Math.round((Date.now() - startTime) / 1000),
    },
  };
}
