"use client";

import React, { useState } from "react";
import {
  History,
  Layers,
  CheckCircle2,
  Loader2,
  Search,
  Check,
  Star,
  Sparkles,
} from "lucide-react";
import { ProjectData, Intent } from "@/app/create/page";

interface SidebarProps {
  steps: { id: string; icon: string; label: string; status: string }[];
  projectData: ProjectData;
  setProjectData: React.Dispatch<React.SetStateAction<ProjectData>>;
  intent: Intent | null;
}

// ── Real component library cards (matches the actual component-library folder)
const LIBRARY_COMPONENTS = [
  {
    id: "navbar_001",
    name: "Modern Dark Navbar",
    category: "Navbar",
    tags: ["dark", "sticky", "search", "cart"],
    desc: "Sleek dark navbar with logo, links, search, cart & CTA",
    recommended: ["ecommerce", "marketplace", "saas"],
    color: "#3B82F6",
  },
  {
    id: "hero_001",
    name: "Gradient Hero Section",
    category: "Hero",
    tags: ["dark", "gradient", "bold", "glow"],
    desc: "Full-width hero with badge, headline, subheadline & dual CTAs",
    recommended: ["saas", "landing-page", "portfolio"],
    color: "#8B5CF6",
  },
  {
    id: "features_001",
    name: "Feature Cards Grid",
    category: "Features",
    tags: ["grid", "cards", "3-column", "icons"],
    desc: "Responsive 3-col grid of feature cards with icon + title + desc",
    recommended: ["saas", "product", "agency"],
    color: "#06B6D4",
  },
  {
    id: "pricing_001",
    name: "Pricing Cards",
    category: "Pricing",
    tags: ["plans", "highlighted", "features list"],
    desc: "2–3 pricing plan cards, middle card highlighted as recommended",
    recommended: ["saas", "subscription", "agency"],
    color: "#10B981",
  },
  {
    id: "footer_001",
    name: "Dark Footer",
    category: "Footer",
    tags: ["dark", "columns", "copyright", "minimal"],
    desc: "Clean dark footer with brand, multi-column links & copyright",
    recommended: ["ecommerce", "saas", "landing-page"],
    color: "#F59E0B",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Navbar: "#3B82F6",
  Hero: "#8B5CF6",
  Features: "#06B6D4",
  Pricing: "#10B981",
  Footer: "#F59E0B",
};

const ALL_CATEGORIES = ["All", "Navbar", "Hero", "Features", "Pricing", "Footer"];

export default function Sidebar({ steps, projectData, setProjectData, intent }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<"timeline" | "library">("timeline");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const handleUseComponent = (id: string) => {
    if (!projectData.selectedComponents.includes(id)) {
      setProjectData((prev) => ({
        ...prev,
        selectedComponents: [...prev.selectedComponents, id],
      }));
    }
  };

  const handleRemoveComponent = (id: string) => {
    setProjectData((prev) => ({
      ...prev,
      selectedComponents: prev.selectedComponents.filter((c) => c !== id),
    }));
  };

  // Filter & sort: recommended first if intent exists
  const filteredLibrary = LIBRARY_COMPONENTS.filter((c) => {
    const matchCat = activeCategory === "All" || c.category === activeCategory;
    const query = searchQuery.toLowerCase();
    const matchSearch =
      !query ||
      c.name.toLowerCase().includes(query) ||
      c.category.toLowerCase().includes(query) ||
      c.tags.some((t) => t.includes(query)) ||
      c.desc.toLowerCase().includes(query);
    return matchCat && matchSearch;
  }).sort((a, b) => {
    if (!intent) return 0;
    const aRec = a.recommended.some((r) =>
      intent.websiteType?.toLowerCase().includes(r) ||
      intent.industry?.toLowerCase().includes(r)
    );
    const bRec = b.recommended.some((r) =>
      intent.websiteType?.toLowerCase().includes(r) ||
      intent.industry?.toLowerCase().includes(r)
    );
    return Number(bRec) - Number(aRec);
  });

  const completedCount = steps.filter((s) => s.status === "completed").length;
  const totalCount = steps.length;

  return (
    <aside
      className="w-[260px] flex flex-col h-full bg-[#0B0D15] z-10 relative flex-shrink-0"
      style={{ borderRight: "1px solid rgba(255,255,255,0.03)" }}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/[0.03]">
        <h2
          className="text-xs font-extrabold bg-clip-text text-transparent"
          style={{ backgroundImage: "linear-gradient(135deg, #60A5FA, #818CF8, #93C5FD)" }}
        >
          Build Panel
        </h2>
        <p className="text-[9px] text-white/25 uppercase tracking-widest font-bold mt-0.5">
          Website Blueprint
        </p>
      </div>

      {/* Tabs */}
      <div className="flex p-2 border-b border-white/[0.03] gap-1 bg-white/[0.005]">
        {(["timeline", "library"] as const).map((tab) => {
          const isActive = activeTab === tab;
          const Icon = tab === "timeline" ? History : Layers;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all hover:scale-[1.01]"
              style={{
                background: isActive ? "rgba(59,130,246,0.08)" : "rgba(255,255,255,0.01)",
                color: isActive ? "#93C5FD" : "rgba(255,255,255,0.6)",
                border: isActive 
                  ? "1px solid rgba(59,130,246,0.18)" 
                  : "1px solid rgba(255,255,255,0.04)",
                cursor: "pointer",
              }}
            >
              <Icon size={12} className={isActive ? "text-blue-400" : "text-white/40"} />
              {tab === "timeline" ? "Timeline" : "Library"}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>

        {/* ── Timeline Tab ── */}
        {activeTab === "timeline" && (
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest">
                AI Generation Progress
              </p>
              {totalCount > 0 && (
                <span
                  className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(52,211,153,0.08)",
                    color: "#34D399",
                    border: "1px solid rgba(52,211,153,0.2)",
                  }}
                >
                  {completedCount}/{totalCount}
                </span>
              )}
            </div>

            <div className="space-y-1.5 mt-1">
              {steps.map((s, i) => (
                <TimelineItem key={s.id} step={s} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* ── Library Tab ── */}
        {activeTab === "library" && (
          <div className="p-3 space-y-3">
            {/* Search */}
            <div className="relative">
              <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs text-white placeholder-white/20 rounded-xl focus:outline-none font-medium transition-all"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-1.5 flex-wrap">
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="text-[9px] font-bold px-2.5 py-1 rounded-full transition-all"
                  style={{
                    cursor: "pointer",
                    background:
                      activeCategory === cat
                        ? `${CATEGORY_COLORS[cat] || "#3B82F6"}20`
                        : "rgba(255,255,255,0.03)",
                    color:
                      activeCategory === cat
                        ? CATEGORY_COLORS[cat] || "#3B82F6"
                        : "rgba(255,255,255,0.4)",
                    border:
                      activeCategory === cat
                        ? `1px solid ${CATEGORY_COLORS[cat] || "#3B82F6"}40`
                        : "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* AI Recommended banner */}
            {intent && (
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-semibold"
                style={{
                  background: "rgba(139,92,246,0.06)",
                  border: "1px solid rgba(139,92,246,0.2)",
                  color: "rgba(196,181,253,0.8)",
                }}
              >
                <Sparkles size={11} className="text-purple-400" />
                <span>Sorted for <strong>{intent.websiteType}</strong> · {intent.theme} theme</span>
              </div>
            )}

            {/* Component Cards */}
            <div className="space-y-2">
              {filteredLibrary.map((comp) => {
                const isSelected = projectData.selectedComponents.includes(comp.id);
                const isRecommended = intent
                  ? comp.recommended.some(
                      (r) =>
                        intent.websiteType?.toLowerCase().includes(r) ||
                        intent.industry?.toLowerCase().includes(r)
                    )
                  : false;

                return (
                  <ComponentCard
                    key={comp.id}
                    comp={comp}
                    isSelected={isSelected}
                    isRecommended={isRecommended}
                    onUse={() => handleUseComponent(comp.id)}
                    onRemove={() => handleRemoveComponent(comp.id)}
                  />
                );
              })}

              {filteredLibrary.length === 0 && (
                <div className="text-center py-8 text-white/25 text-xs italic">
                  No components match your search
                </div>
              )}
            </div>

            {/* Selected components summary */}
            {projectData.selectedComponents.length > 0 && (
              <div className="mt-2 pt-3 border-t border-white/[0.05]">
                <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest mb-2">
                  Selected for Blueprint
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {projectData.selectedComponents.map((id) => {
                    const comp = LIBRARY_COMPONENTS.find((c) => c.id === id);
                    return (
                      <span
                        key={id}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold"
                        style={{
                          background: `${comp?.color || "#3B82F6"}12`,
                          border: `1px solid ${comp?.color || "#3B82F6"}30`,
                          color: comp?.color || "#93C5FD",
                        }}
                      >
                        {comp?.name.split(" ")[0] || id}
                        <button
                          onClick={() => handleRemoveComponent(id)}
                          className="hover:text-red-400 ml-0.5 font-bold"
                          style={{ cursor: "pointer" }}
                        >
                          ×
                        </button>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}

// ── Timeline Item ─────────────────────────────────────────────────────────

function TimelineItem({
  step,
  index,
}: {
  step: { id: string; icon: string; label: string; status: string };
  index: number;
}) {
  const isCompleted = step.status === "completed";
  const isGenerating = step.status === "generating";
  const isPending = step.status === "pending";

  return (
    <div
      className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all duration-300 ${
        isCompleted ? "animate-complete-pulse" : ""
      }`}
      style={{
        background: isGenerating
          ? "rgba(59,130,246,0.05)"
          : isCompleted
          ? "rgba(52,211,153,0.03)"
          : "transparent",
        borderColor: isGenerating
          ? "rgba(59,130,246,0.3)"
          : isCompleted
          ? "rgba(52,211,153,0.25)"
          : "rgba(255,255,255,0.04)",
      }}
    >
      {/* Icon */}
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm relative flex-shrink-0"
        style={{
          background: isGenerating
            ? "rgba(59,130,246,0.12)"
            : isCompleted
            ? "rgba(52,211,153,0.08)"
            : "rgba(255,255,255,0.02)",
          border: isGenerating
            ? "1px solid rgba(59,130,246,0.4)"
            : isCompleted
            ? "1px solid rgba(52,211,153,0.25)"
            : "1px solid rgba(255,255,255,0.06)",
          opacity: isPending ? 0.35 : 1,
        }}
      >
        {step.icon}
        {isCompleted && (
          <span
            className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] font-black"
            style={{ background: "#34D399", border: "1.5px solid #080c18", color: "#000" }}
          >
            ✓
          </span>
        )}
      </div>

      {/* Label + status */}
      <div className="flex-1 min-w-0">
        <div
          className="text-xs font-bold tracking-tight"
          style={{
            color: isCompleted
              ? "rgba(255,255,255,0.85)"
              : isGenerating
              ? "#60A5FA"
              : "rgba(255,255,255,0.25)",
          }}
        >
          {step.label}
        </div>
        <div className="text-[9px] font-medium mt-0.5" style={{ color: "rgba(255,255,255,0.25)" }}>
          {isCompleted && "✓ Done"}
          {isGenerating && "Building..."}
          {isPending && `Step ${index + 1}`}
        </div>
      </div>

      {/* Spinner */}
      {isGenerating && (
        <Loader2 size={12} className="text-blue-400 animate-spin flex-shrink-0" />
      )}
    </div>
  );
}

// ── Component Card ────────────────────────────────────────────────────────

function ComponentCard({
  comp,
  isSelected,
  isRecommended,
  onUse,
  onRemove,
}: {
  comp: (typeof LIBRARY_COMPONENTS)[0];
  isSelected: boolean;
  isRecommended: boolean;
  onUse: () => void;
  onRemove: () => void;
}) {
  return (
    <div
      className="p-3 rounded-xl border transition-all duration-200"
      style={{
        background: isSelected
          ? `${comp.color}08`
          : "rgba(255,255,255,0.02)",
        borderColor: isSelected
          ? `${comp.color}35`
          : "rgba(255,255,255,0.06)",
      }}
    >
      {/* Top row: name + recommended badge + category */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-white/85 leading-tight">{comp.name}</span>
            {isRecommended && (
              <span
                className="flex items-center gap-0.5 text-[8px] font-black px-1.5 py-0.5 rounded-full"
                style={{
                  background: "rgba(251,191,36,0.12)",
                  color: "#FCD34D",
                  border: "1px solid rgba(251,191,36,0.25)",
                }}
              >
                <Star size={7} fill="currentColor" />
                AI Pick
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 mt-1 flex-wrap">
            <span
              className="text-[8px] font-bold px-1.5 py-0.5 rounded-full"
              style={{
                background: `${comp.color}15`,
                color: comp.color,
                border: `1px solid ${comp.color}30`,
              }}
            >
              {comp.category}
            </span>
            {comp.tags.slice(0, 2).map((t) => (
              <span
                key={t}
                className="text-[8px] px-1.5 py-0.5 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  color: "rgba(255,255,255,0.3)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="text-[10px] text-white/35 leading-snug mb-3">{comp.desc}</p>

      {/* Use / Used button */}
      <button
        onClick={isSelected ? onRemove : onUse}
        className="w-full py-1.5 rounded-lg text-[10px] font-bold transition-all"
        style={{
          cursor: "pointer",
          background: isSelected ? `${comp.color}15` : `${comp.color}12`,
          color: isSelected ? comp.color : comp.color,
          border: `1px solid ${comp.color}${isSelected ? "50" : "30"}`,
        }}
      >
        {isSelected ? (
          <span className="flex items-center justify-center gap-1">
            <Check size={9} />
            Added to Blueprint
          </span>
        ) : (
          "Use Component"
        )}
      </button>
    </div>
  );
}
