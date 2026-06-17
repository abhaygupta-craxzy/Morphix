"use client";

import { useState } from "react";
import { Globe, Sparkles, ArrowRight, Grid3X3, GitBranch, Camera, FileText, Palette, Wand2, Upload, Code2 } from "lucide-react";

const entryCards = [
  {
    id: "components",
    icon: Grid3X3,
    emoji: "🧩",
    label: "Component Library",
    tagline: "Browse, Preview & Use",
    description: "Explore 10,000+ production-ready components, templates, patterns, and complete design systems across every framework and style.",
    accentColor: "#6366F1",
    accentColorRgb: "99,102,241",
    gradientFrom: "#6366F1",
    gradientTo: "#8B5CF6",
    badgeText: "10,000+ Components",
    badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
    workflow: ["Discover", "Preview", "Inspect", "Use"],
    workflowIcons: [Grid3X3, Sparkles, Code2, ArrowRight],
    ctaLabel: "Explore Components",
    miniPreview: "components",
  },
  {
    id: "transform",
    icon: Globe,
    emoji: "🌐",
    label: "Transform Existing Website",
    tagline: "Analyze, Improve & Transform",
    description: "Import websites or GitHub repositories. Morphix analyzes your codebase, extracts design DNA, and generates AI-powered improvement reports.",
    accentColor: "#8B5CF6",
    accentColorRgb: "139,92,246",
    gradientFrom: "#8B5CF6",
    gradientTo: "#06B6D4",
    badgeText: "GitHub & URL Import",
    badgeBg: "bg-violet-50 text-violet-700 border-violet-200",
    workflow: ["Import", "Analyze", "Improve", "Transform"],
    workflowIcons: [Upload, Wand2, Sparkles, ArrowRight],
    ctaLabel: "Analyze Website",
    miniPreview: "transform",
  },
  {
    id: "create",
    icon: Sparkles,
    emoji: "✨",
    label: "Create New Project",
    tagline: "Idea to Product",
    description: "Start from an idea, screenshot, prompt, Figma file, or design inspiration. Build complete projects with AI in minutes.",
    accentColor: "#06B6D4",
    accentColorRgb: "6,182,212",
    gradientFrom: "#06B6D4",
    gradientTo: "#10B981",
    badgeText: "5 Starting Modes",
    badgeBg: "bg-cyan-50 text-cyan-700 border-cyan-200",
    workflow: ["Idea", "AI", "Components", "Project"],
    workflowIcons: [Sparkles, Wand2, Grid3X3, ArrowRight],
    ctaLabel: "Create Project",
    miniPreview: "create",
  },
];

function ComponentsPreview() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 to-indigo-50/30 p-3 flex flex-col gap-2">
      {/* search bar */}
      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5">
        <div className="w-3 h-3 rounded-full bg-slate-200" />
        <div className="h-1.5 flex-1 rounded bg-slate-200" />
        <div className="h-1.5 w-8 rounded bg-indigo-200" />
      </div>
      {/* category pills */}
      <div className="flex gap-1.5 flex-wrap">
        {["All", "Navbars", "Heroes", "Pricing"].map((cat, i) => (
          <div key={cat} className={`px-2 py-0.5 rounded-lg text-[7px] font-bold ${i === 0 ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-500"}`}>
            {cat}
          </div>
        ))}
      </div>
      {/* component grid */}
      <div className="grid grid-cols-3 gap-1.5 flex-1">
        {[
          { bg: "from-blue-600 to-violet-700", label: "Hero" },
          { bg: "from-slate-50 to-blue-50", label: "Nav", dark: true },
          { bg: "from-indigo-50 to-violet-50", label: "Card", dark: true },
          { bg: "from-teal-50 to-emerald-50", label: "Pricing", dark: true },
          { bg: "from-rose-500 to-pink-600", label: "Auth" },
          { bg: "from-amber-50 to-orange-50", label: "Form", dark: true },
        ].map((c, i) => (
          <div key={i} className={`bg-gradient-to-br ${c.bg} rounded-lg p-1.5 flex flex-col items-center justify-center gap-0.5 border ${c.dark ? "border-slate-200" : "border-transparent"}`}>
            <div className={`h-2.5 w-2/3 rounded ${c.dark ? "bg-slate-300" : "bg-white/50"}`} />
            <div className={`text-[6px] font-bold ${c.dark ? "text-slate-500" : "text-white/80"}`}>{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TransformPreview() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 to-violet-950/80 p-3 flex flex-col gap-2">
      {/* url import bar */}
      <div className="flex items-center gap-1.5 bg-white/8 border border-white/10 rounded-xl px-2.5 py-1.5">
        <GitBranch className="w-2.5 h-2.5 text-white/50 flex-shrink-0" />
        <div className="text-[7px] font-mono text-white/50 flex-1">github.com/mysite</div>
        <div className="px-1.5 py-0.5 bg-violet-600 text-white text-[6px] font-bold rounded-md">Import</div>
      </div>
      {/* analysis progress */}
      <div className="bg-white/5 border border-white/8 rounded-xl p-2 space-y-1.5">
        {["Scanning components", "Extracting colors", "Analyzing layout"].map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${i < 2 ? "bg-violet-400" : "bg-white/20"}`} />
            <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
              <div className={`h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all`} style={{ width: i === 0 ? "100%" : i === 1 ? "70%" : "30%" }} />
            </div>
          </div>
        ))}
      </div>
      {/* design dna output */}
      <div className="flex gap-1.5 flex-1">
        <div className="flex-1 bg-white/5 border border-white/8 rounded-xl p-1.5 flex flex-col gap-1">
          <div className="text-[6px] font-bold text-violet-400 uppercase tracking-wider">Design DNA</div>
          <div className="flex gap-0.5">
            {["#6366F1", "#8B5CF6", "#06B6D4", "#10B981"].map(c => (
              <div key={c} className="flex-1 h-3 rounded" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
        <div className="flex-1 bg-white/5 border border-white/8 rounded-xl p-1.5 flex flex-col gap-1">
          <div className="text-[6px] font-bold text-cyan-400 uppercase tracking-wider">AI Score</div>
          <div className="text-sm font-black text-white">8.4</div>
        </div>
      </div>
    </div>
  );
}

function CreatePreview() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-cyan-50 to-teal-50/40 p-3 flex flex-col gap-2">
      {/* prompt input */}
      <div className="bg-white border border-slate-200 rounded-xl p-2 flex flex-col gap-1">
        <div className="text-[7px] font-bold text-slate-700 leading-tight">
          "Build a SaaS landing page with dark hero and pricing..."
        </div>
        <div className="h-px bg-slate-100" />
        <div className="flex gap-1 flex-wrap">
          {[Camera, FileText, Palette].map((Icon, i) => (
            <div key={i} className="flex items-center gap-0.5 px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded-md">
              <Icon className="w-2 h-2 text-slate-400" />
              <span className="text-[6px] text-slate-500">{["Screenshot", "Figma", "Prompt"][i]}</span>
            </div>
          ))}
        </div>
      </div>
      {/* generated preview */}
      <div className="flex-1 bg-gradient-to-br from-cyan-600 to-teal-600 rounded-xl p-2 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="h-1.5 w-8 rounded bg-white/40" />
          <div className="h-3 w-10 bg-white/20 rounded-md" />
        </div>
        <div className="h-3 w-3/4 rounded bg-white/30" />
        <div className="h-2 w-full rounded bg-white/15" />
        <div className="grid grid-cols-3 gap-1 mt-0.5">
          {[0, 1, 2].map(i => (
            <div key={i} className="h-5 rounded-lg bg-white/10 border border-white/10" />
          ))}
        </div>
      </div>
    </div>
  );
}

const previewMap = {
  components: ComponentsPreview,
  transform: TransformPreview,
  create: CreatePreview,
};

export default function ChooseStartingPoint() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="starting-points" className="py-20 lg:py-28 section-light-soft relative border-t border-slate-100/80">
      <div className="absolute inset-0 dot-grid-subtle opacity-60 pointer-events-none" />

      {/* Decorative orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-indigo-100/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-violet-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            Three Ways to Use Morphix
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
            Choose Your{" "}
            <span className="gradient-text-violet">
              Starting Point
            </span>
          </h2>
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
            Whether you&apos;re exploring components, transforming an existing site, or building from scratch —
            Morphix adapts to your workflow.
          </p>
        </div>

        {/* Three Premium Entry Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {entryCards.map((card) => {
            const PreviewComponent = previewMap[card.miniPreview as keyof typeof previewMap];
            const isHovered = hoveredCard === card.id;

            return (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="entry-card group flex flex-col"
                style={{
                  boxShadow: isHovered
                    ? `0 24px 80px rgba(${card.accentColorRgb},0.2), 0 8px 24px rgba(0,0,0,0.10)`
                    : undefined,
                  borderColor: isHovered ? `rgba(${card.accentColorRgb},0.3)` : undefined,
                }}
              >
                {/* Top section */}
                <div className="p-7 pb-5 flex-1">
                  {/* Icon + Badge row */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `linear-gradient(135deg, ${card.gradientFrom}, ${card.gradientTo})` }}
                    >
                      <card.icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${card.badgeBg}`}>
                      {card.badgeText}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-1.5 leading-tight">{card.label}</h3>
                  <p className="text-xs font-semibold mb-3" style={{ color: card.accentColor }}>{card.tagline}</p>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{card.description}</p>

                  {/* Mini workflow indicator */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {card.workflow.map((step, i) => (
                      <div key={step} className="flex items-center gap-1.5">
                        <div
                          className="px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all duration-300"
                          style={{
                            background: isHovered ? `rgba(${card.accentColorRgb},0.1)` : "#f8f9fa",
                            color: isHovered ? card.accentColor : "#64748b",
                            border: `1px solid ${isHovered ? `rgba(${card.accentColorRgb},0.2)` : "#e8eaef"}`,
                          }}
                        >
                          {step}
                        </div>
                        {i < card.workflow.length - 1 && (
                          <div className="w-3 h-px rounded" style={{ backgroundColor: isHovered ? card.accentColor : "#e2e8f0" }} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mini Preview */}
                <div className="mx-5 mb-5 rounded-2xl overflow-hidden h-[160px] border border-slate-200/80 shadow-sm transition-all duration-300 group-hover:shadow-md"
                  style={{ borderColor: isHovered ? `rgba(${card.accentColorRgb},0.2)` : undefined }}
                >
                  <PreviewComponent />
                </div>

                {/* CTA Button */}
                <div className="px-7 pb-7">
                  <button
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 cursor-pointer group/btn"
                    style={{
                      background: isHovered
                        ? `linear-gradient(135deg, ${card.gradientFrom}, ${card.gradientTo})`
                        : "transparent",
                      color: isHovered ? "#ffffff" : card.accentColor,
                      border: `1.5px solid ${isHovered ? "transparent" : `rgba(${card.accentColorRgb},0.3)`}`,
                      boxShadow: isHovered ? `0 8px 24px rgba(${card.accentColorRgb},0.35)` : "none",
                    }}
                  >
                    {card.ctaLabel}
                    <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom connector text */}
        <div className="text-center mt-12">
          <p className="text-sm text-slate-400 font-medium">
            All three paths lead into the same Morphix workspace
            <span className="mx-2">·</span>
            <span className="text-indigo-500 font-semibold">Switch anytime</span>
          </p>
        </div>
      </div>
    </section>
  );
}
