"use client";

import {
  Wand2,
  Dna,
  RefreshCw,
  LayoutGrid,
  Zap,
  Monitor,
  Eye,
  GitBranch,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    id: "ai-design-transformation",
    icon: Wand2,
    iconBg: "from-blue-500 to-indigo-600",
    badge: "Core AI",
    badgeClass: "badge-blue",
    title: "AI Design Transformation",
    description:
      "Intelligently transform any website's visual identity — colors, typography, layout — into a fresh modern design without losing functionality.",
    highlight: "Powered by multimodal AI",
  },
  {
    id: "design-dna-engine",
    icon: Dna,
    iconBg: "from-violet-500 to-purple-600",
    badge: "Extraction",
    badgeClass: "badge-purple",
    title: "Design DNA Engine",
    description:
      "Extract complete design systems from screenshots, Figma files, or live websites. Capture colors, spacing, typography, shadows, and motion patterns.",
    highlight: "7 design tokens extracted",
  },
  {
    id: "website-remix-engine",
    icon: RefreshCw,
    iconBg: "from-teal-500 to-emerald-500",
    badge: "Remix",
    badgeClass: "badge-teal",
    title: "Website Remix Engine",
    description:
      "Apply any design system to your existing website. Remix entire sites into one consistent, production-ready design language.",
    highlight: "Consistent design system output",
  },
  {
    id: "component-library",
    icon: LayoutGrid,
    iconBg: "from-amber-500 to-orange-500",
    badge: "Library",
    badgeClass: "badge-amber",
    title: "Component Library",
    description:
      "Browse thousands of production-ready components across every category. Filter by style, industry, and complexity. Swap any component instantly.",
    highlight: "10,000+ components",
  },
  {
    id: "animation-engine",
    icon: Zap,
    iconBg: "from-pink-500 to-rose-500",
    badge: "Motion",
    badgeClass: "badge-blue",
    title: "Animation Engine",
    description:
      "Add professional animations and interactions to any element. Choose from a curated motion library or define custom transitions.",
    highlight: "Framer Motion integration",
  },
  {
    id: "responsive-ai",
    icon: Monitor,
    iconBg: "from-cyan-500 to-blue-500",
    badge: "Responsive",
    badgeClass: "badge-teal",
    title: "Responsive AI",
    description:
      "Automatically optimize layouts for mobile, tablet, and desktop. AI detects breakpoint issues and suggests smart responsive fixes.",
    highlight: "5 breakpoints optimized",
  },
  {
    id: "live-preview-studio",
    icon: Eye,
    iconBg: "from-indigo-500 to-violet-500",
    badge: "Preview",
    badgeClass: "badge-purple",
    title: "Live Preview Studio",
    description:
      "See every change instantly in a real browser environment. Compare original vs transformed side-by-side with live interaction.",
    highlight: "Zero-latency preview",
  },
  {
    id: "github-integration",
    icon: GitBranch,
    iconBg: "from-slate-700 to-slate-900",
    badge: "DevOps",
    badgeClass: "badge-blue",
    title: "GitHub Integration",
    description:
      "Export production-ready code or create pull requests directly from Morphix. Seamless integration with your existing development workflow.",
    highlight: "One-click PR creation",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-24 lg:py-32 section-gradient relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-blue-50/60 to-violet-50/40 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-teal-50/50 to-blue-50/30 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="badge badge-purple mb-4 mx-auto">
            <span>Core Capabilities</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-5">
            Everything you need to{" "}
            <span className="gradient-text-blue-purple">build better</span>
          </h2>
          <p className="text-lg text-slate-600">
            A complete AI-powered design engineering platform — from inspiration
            to production-ready code.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                id={feature.id}
                className="morphix-card p-6 group"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                {/* Icon */}
                <div
                  className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${feature.iconBg} flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>

                {/* Badge */}
                <span className={`badge ${feature.badgeClass} text-[10px] py-0.5 mb-3`}>
                  {feature.badge}
                </span>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-900 mb-2 leading-tight">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Highlight */}
                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-blue-600">
                    {feature.highlight}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
