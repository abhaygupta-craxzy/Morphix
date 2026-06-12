"use client";

import {
  Upload,
  Cpu,
  Dna,
  LayoutGrid,
  Sliders,
  Download,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Upload,
    iconBg: "from-blue-500 to-indigo-600",
    title: "Import Your Source",
    description:
      "Paste a website URL, upload a screenshot, import a Figma file, or describe your product idea in plain language.",
    tags: ["Website URL", "Screenshot", "Figma", "Idea"],
  },
  {
    step: "02",
    icon: Cpu,
    iconBg: "from-violet-500 to-purple-600",
    title: "AI Analysis",
    description:
      "Our multimodal AI analyzes every pixel, component, layout pattern, and design decision of your source.",
    tags: ["Vision AI", "Layout Analysis", "Pattern Recognition"],
  },
  {
    step: "03",
    icon: Dna,
    iconBg: "from-teal-500 to-emerald-500",
    title: "Design DNA Extraction",
    description:
      "Morphix extracts a complete design system — colors, typography, spacing, shadows, border radii, and motion patterns.",
    tags: ["Colors", "Typography", "Spacing", "Motion"],
  },
  {
    step: "04",
    icon: LayoutGrid,
    iconBg: "from-amber-500 to-orange-500",
    title: "Component Suggestions",
    description:
      "Browse AI-curated component recommendations from the library, matched to your design style and content type.",
    tags: ["10,000+ Components", "Style Matching", "AI Curation"],
  },
  {
    step: "05",
    icon: Sliders,
    iconBg: "from-pink-500 to-rose-500",
    title: "Live Customization",
    description:
      "Edit in real-time with live preview. Swap components, adjust tokens, add animations, and optimize responsive behavior.",
    tags: ["Live Preview", "Real-time Editing", "Animations"],
  },
  {
    step: "06",
    icon: Download,
    iconBg: "from-slate-700 to-slate-900",
    title: "Export or Deploy",
    description:
      "Export production-ready React, Next.js, or HTML code. Or create a GitHub pull request directly from Morphix.",
    tags: ["React", "Next.js", "GitHub PR", "Clean Code"],
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-24 lg:py-32 bg-white relative overflow-hidden"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="badge badge-teal mb-4 mx-auto">
            <span>The Morphix Workflow</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-5">
            From idea to code in{" "}
            <span className="gradient-text">6 steps</span>
          </h2>
          <p className="text-lg text-slate-600">
            A systematic, AI-powered workflow that takes you from any starting
            point to production-ready results.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {/* Connection lines (desktop only) */}
          <div className="hidden lg:block absolute top-12 left-[calc(33.33%+0px)] right-[calc(33.33%+0px)] h-0.5 bg-gradient-to-r from-blue-200 via-violet-200 to-teal-200 z-0" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="relative morphix-card p-7 group z-10"
              >
                {/* Step number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center shadow-sm">
                  <span className="text-xs font-bold text-slate-500">
                    {step.step}
                  </span>
                </div>

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.iconBg} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {step.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-2.5 py-1 bg-slate-50 text-slate-600 text-[11px] font-medium rounded-lg border border-slate-100"
                    >
                      <CheckCircle2 className="w-3 h-3 text-blue-500" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Arrow (not on last) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex lg:hidden absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                    <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
