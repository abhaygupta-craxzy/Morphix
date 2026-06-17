"use client";

import { useState } from "react";
import { Grid3X3, Globe, Sparkles, ArrowRight, Check } from "lucide-react";

const paths = [
  {
    id: "components",
    icon: Grid3X3,
    emoji: "🧩",
    label: "Component Library",
    sublabel: "Browse & Use",
    desc: "Explore 10,000+ production-ready components, templates, and design systems.",
    ctaLabel: "Explore Components",
    accentColor: "#6366F1",
    accentRgb: "99,102,241",
    gradientFrom: "#6366F1",
    gradientTo: "#8B5CF6",
    perks: ["10,000+ components", "50+ categories", "Live preview"],
  },
  {
    id: "transform",
    icon: Globe,
    emoji: "🌐",
    label: "Transform Website",
    sublabel: "Analyze & Improve",
    desc: "Import any website or GitHub repo. Get AI analysis, design DNA, and transformation.",
    ctaLabel: "Analyze Website",
    accentColor: "#8B5CF6",
    accentRgb: "139,92,246",
    gradientFrom: "#8B5CF6",
    gradientTo: "#06B6D4",
    perks: ["URL & GitHub import", "AI scoring", "1.4s avg transform"],
    featured: true,
  },
  {
    id: "create",
    icon: Sparkles,
    emoji: "✨",
    label: "Create New Project",
    sublabel: "Idea to Product",
    desc: "Start from a prompt, screenshot, Figma file, or inspiration. Build in minutes.",
    ctaLabel: "Create Project",
    accentColor: "#06B6D4",
    accentRgb: "6,182,212",
    gradientFrom: "#06B6D4",
    gradientTo: "#10B981",
    perks: ["5 input modes", "AI-powered", "Export code"],
  },
];

export default function CTASection() {
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  return (
    <section id="cta" className="py-20 lg:py-28 section-cta-gradient relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-violet-600/12 blur-3xl pointer-events-none animate-pulse-glow delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-purple-600/8 blur-[80px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/6 border border-white/10 rounded-full text-sm font-semibold text-white/70 mb-8 backdrop-blur">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
            Morphix Studio is ready
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-5 leading-tight">
            Choose Your Path{" "}
            <span className="gradient-text-premium">
              Into Morphix
            </span>
          </h2>
          <p className="text-lg text-white/45 max-w-2xl mx-auto leading-relaxed">
            Whether you&apos;re exploring components, transforming an existing website, or building a new
            project — Morphix adapts to your workflow.
          </p>
        </div>

        {/* Three Premium Gateway Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-14">
          {paths.map(path => {
            const Icon = path.icon;
            const isHovered = hoveredPath === path.id;

            return (
              <div
                key={path.id}
                onMouseEnter={() => setHoveredPath(path.id)}
                onMouseLeave={() => setHoveredPath(null)}
                className="entry-card-dark group flex flex-col cursor-pointer relative"
                style={{
                  boxShadow: isHovered
                    ? `0 32px 80px rgba(${path.accentRgb},0.3), 0 8px 24px rgba(0,0,0,0.5)`
                    : undefined,
                  borderColor: isHovered ? `rgba(${path.accentRgb},0.4)` : undefined,
                }}
              >
                {/* Featured badge */}
                {path.featured && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black text-white whitespace-nowrap"
                    style={{ background: `linear-gradient(135deg, ${path.gradientFrom}, ${path.gradientTo})` }}
                  >
                    Most Popular
                  </div>
                )}

                <div className="p-7 flex-1 flex flex-col">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg mb-5 transition-transform duration-400 group-hover:scale-110"
                    style={{ background: `linear-gradient(135deg, ${path.gradientFrom}, ${path.gradientTo})`, boxShadow: isHovered ? `0 8px 32px rgba(${path.accentRgb},0.5)` : `0 4px 16px rgba(${path.accentRgb},0.3)` }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Text */}
                  <div className="mb-2">
                    <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: path.accentColor }}>
                      {path.sublabel}
                    </div>
                    <h3 className="text-xl font-black text-white mb-2 leading-tight">{path.label}</h3>
                    <p className="text-sm text-white/45 leading-relaxed">{path.desc}</p>
                  </div>

                  {/* Perks */}
                  <div className="space-y-1.5 mt-4 flex-1">
                    {path.perks.map(perk => (
                      <div key={perk} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: path.accentColor }} />
                        <span className="text-xs text-white/50">{perk}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold transition-all duration-400 cursor-pointer"
                    style={{
                      background: isHovered
                        ? `linear-gradient(135deg, ${path.gradientFrom}, ${path.gradientTo})`
                        : `rgba(${path.accentRgb}, 0.1)`,
                      color: path.accentColor,
                      border: `1.5px solid rgba(${path.accentRgb}, ${isHovered ? 0 : 0.25})`,
                      boxShadow: isHovered ? `0 8px 24px rgba(${path.accentRgb},0.4)` : "none",
                      ...(isHovered ? { color: "#ffffff" } : {}),
                    }}
                  >
                    {path.ctaLabel}
                    <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom trust strip */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-white/30">
          {[
            { icon: Check, text: "Free plan available" },
            { icon: Check, text: "No credit card required" },
            { icon: Check, text: "Export clean React + Tailwind" },
            { icon: Check, text: "Ship in minutes" },
          ].map(item => (
            <div key={item.text} className="flex items-center gap-2">
              <item.icon className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
