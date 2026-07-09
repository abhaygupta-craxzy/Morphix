/**
 * Component Registry
 * ──────────────────────────────────────────────────────────────────────────
 * Loads all component metadata and schemas from the static library.
 * Also loads persisted AI-generated components from dynamic-registry.json.
 *
 * IMPORTANT — Known dev-only limitation:
 * dynamic-registry.json is a filesystem write. This works reliably in local
 * development but will NOT persist across serverless instances or redeploys
 * (e.g. Vercel, Railway). Before any production deploy, migrate persistence
 * to a hosted database (Supabase, PlanetScale, etc.).
 */

import path from "path";
import fs from "fs";

export interface ComponentMetadata {
  id: string;
  name: string;
  category: string;
  style: string[];
  industries: string[];
  tags: string[];
  description: string;
  supports: string[]; // layout variants this component supports
}

export interface ComponentEntry {
  metadata: ComponentMetadata;
  schema: Record<string, unknown>;
  templatePath: string; // relative path for reading the template at runtime (empty for AI-generated)
  tsxCode?: string;     // stored TSX source for AI-generated components
  validated?: boolean;  // true = passed compile check, eligible for persistence
}

// ── Static Registry ────────────────────────────────────────────────────────

import navbarMeta from "@/lib/component-library/navbar/navbar_001/metadata.json";
import navbarSchema from "@/lib/component-library/navbar/navbar_001/schema.json";
import heroMeta from "@/lib/component-library/hero/hero_001/metadata.json";
import heroSchema from "@/lib/component-library/hero/hero_001/schema.json";
import featuresMeta from "@/lib/component-library/features/features_001/metadata.json";
import featuresSchema from "@/lib/component-library/features/features_001/schema.json";
import pricingMeta from "@/lib/component-library/pricing/pricing_001/metadata.json";
import pricingSchema from "@/lib/component-library/pricing/pricing_001/schema.json";
import footerMeta from "@/lib/component-library/footer/footer_001/metadata.json";
import footerSchema from "@/lib/component-library/footer/footer_001/schema.json";

const STATIC_REGISTRY: ComponentEntry[] = [
  {
    metadata: navbarMeta as ComponentMetadata,
    schema: navbarSchema as Record<string, unknown>,
    templatePath: "navbar/navbar_001/template.html",
    validated: true,
  },
  {
    metadata: heroMeta as ComponentMetadata,
    schema: heroSchema as Record<string, unknown>,
    templatePath: "hero/hero_001/template.html",
    validated: true,
  },
  {
    metadata: featuresMeta as ComponentMetadata,
    schema: featuresSchema as Record<string, unknown>,
    templatePath: "features/features_001/template.html",
    validated: true,
  },
  {
    metadata: pricingMeta as ComponentMetadata,
    schema: pricingSchema as Record<string, unknown>,
    templatePath: "pricing/pricing_001/template.html",
    validated: true,
  },
  {
    metadata: footerMeta as ComponentMetadata,
    schema: footerSchema as Record<string, unknown>,
    templatePath: "footer/footer_001/template.html",
    validated: true,
  },
];

// ── Dynamic Registry — load from disk on startup ───────────────────────────

const DYNAMIC_REGISTRY_PATH = path.join(
  process.cwd(),
  "src",
  "lib",
  "dynamic-registry.json"
);

function loadDynamicRegistry(): ComponentEntry[] {
  try {
    if (fs.existsSync(DYNAMIC_REGISTRY_PATH)) {
      const raw = fs.readFileSync(DYNAMIC_REGISTRY_PATH, "utf-8");
      const parsed = JSON.parse(raw) as ComponentEntry[];
      if (Array.isArray(parsed)) {
        console.log(`[Registry] Loaded ${parsed.length} dynamic components from disk.`);
        return parsed;
      }
    }
  } catch (err) {
    console.warn("[Registry] Failed to load dynamic-registry.json:", err);
  }
  return [];
}

// Merge static + dynamic on startup. The dynamic registry can only grow — never shrinks.
const REGISTRY: ComponentEntry[] = [
  ...STATIC_REGISTRY,
  ...loadDynamicRegistry(),
];

// ── Component Lookup ───────────────────────────────────────────────────────

/**
 * Find the best matching component for a given section type.
 * Checks for direct category match, then tag/keyword match.
 * Only returns validated (static or compile-verified) components.
 */
export function findComponent(sectionType: string): ComponentEntry | null {
  const normalized = sectionType.toLowerCase().trim();

  // Direct category match on validated entries only
  const exact = REGISTRY.find(
    (c) => c.metadata.category === normalized && c.validated !== false
  );
  if (exact) return exact;

  // Tag/keyword match
  const tagMatch = REGISTRY.find(
    (c) =>
      c.validated !== false &&
      (c.metadata.tags.some((t) => normalized.includes(t)) ||
        normalized.includes(c.metadata.category))
  );
  return tagMatch ?? null;
}

/** Return all components in the registry (for Library UI) */
export function getAllComponents(): ComponentEntry[] {
  return REGISTRY;
}

/** Return only AI-generated components (for analytics / display) */
export function getDynamicComponents(): ComponentEntry[] {
  return REGISTRY.filter((c) => c.metadata.tags.includes("ai-generated"));
}

/**
 * Register a new AI-generated component.
 *
 * Gated: if validated=true, the component is written to dynamic-registry.json
 * so it persists across server restarts (dev-only — see file header warning).
 * Unvalidated components are held in memory only for the current session.
 */
export function registerGeneratedComponent(
  entry: ComponentEntry,
  validated = false
): void {
  // Avoid duplicates
  const exists = REGISTRY.find((c) => c.metadata.id === entry.metadata.id);
  if (exists) return;

  const entryWithValidation = { ...entry, validated };
  REGISTRY.push(entryWithValidation);

  if (!validated) return;

  // Persist validated component to dynamic-registry.json
  try {
    const existingDynamic = loadDynamicRegistry();
    const alreadyPersisted = existingDynamic.find(
      (c) => c.metadata.id === entry.metadata.id
    );
    if (!alreadyPersisted) {
      const updated = [...existingDynamic, entryWithValidation];
      fs.writeFileSync(
        DYNAMIC_REGISTRY_PATH,
        JSON.stringify(updated, null, 2),
        "utf-8"
      );
      console.log(
        `[Registry] Persisted validated component: ${entry.metadata.id} (total: ${updated.length})`
      );
    }
  } catch (err) {
    console.warn("[Registry] Failed to persist component to disk:", err);
    // Non-fatal — component is still in memory for this session
  }
}
