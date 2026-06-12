"use client";

import {
  Globe,
  GitBranch,
  Upload,
  PenTool,
  Lightbulb,
  LayoutGrid,
  ArrowRight,
  Link2,
  Wand2,
} from "lucide-react";

const entryCards = [
  {
    id: "existing-website",
    badge: "Transform",
    badgeClass: "badge-blue",
    icon: Globe,
    iconBg: "from-blue-500 to-blue-600",
    title: "Existing Website",
    description:
      "Redesign, modernize, or completely transform any live website into a fresh new experience.",
    features: [
      {
        icon: Link2,
        label: "Paste website URL",
        sublabel: "e.g., https://yourwebsite.com",
      },
      {
        icon: GitBranch,
        label: "Connect GitHub Repository",
        sublabel: "Push redesign as a PR",
      },
    ],
    cta: "Import Website",
    gradient: "from-blue-50 to-indigo-50/60",
    border: "border-blue-100 hover:border-blue-300",
    ctaBg: "from-blue-600 to-indigo-600",
  },
  {
    id: "design-inspiration",
    badge: "Extract DNA",
    badgeClass: "badge-purple",
    icon: Wand2,
    iconBg: "from-violet-500 to-purple-600",
    title: "Design Inspiration",
    description:
      "Upload any design and Morphix will extract colors, typography, spacing, shadows, and motion patterns.",
    features: [
      {
        icon: Upload,
        label: "Upload Screenshot",
        sublabel: "PNG, JPG, WebP supported",
      },
      {
        icon: PenTool,
        label: "Import Figma Design",
        sublabel: "Direct Figma integration",
      },
    ],
    cta: "Extract Design DNA",
    gradient: "from-violet-50 to-purple-50/60",
    border: "border-violet-100 hover:border-violet-300",
    ctaBg: "from-violet-600 to-purple-600",
  },
  {
    id: "start-scratch",
    badge: "AI Generate",
    badgeClass: "badge-teal",
    icon: Lightbulb,
    iconBg: "from-teal-500 to-emerald-500",
    title: "Starting From Scratch",
    description:
      "Describe your product idea and let Morphix suggest layouts, sections, components, and themes automatically.",
    features: [
      {
        icon: Wand2,
        label: "Describe your product idea",
        sublabel: "Natural language input",
      },
      {
        icon: LayoutGrid,
        label: "AI generates suggestions",
        sublabel: "Components, layouts & themes",
      },
    ],
    cta: "Start with AI",
    gradient: "from-teal-50 to-emerald-50/60",
    border: "border-teal-100 hover:border-teal-300",
    ctaBg: "from-teal-600 to-emerald-600",
  },
  {
    id: "browse-components",
    badge: "Library",
    badgeClass: "badge-amber",
    icon: LayoutGrid,
    iconBg: "from-amber-500 to-orange-500",
    title: "Browse Components",
    description:
      "Thousands of production-ready components organized into categories with powerful filtering and style transformation.",
    categories: [
      "Navbars",
      "Hero Sections",
      "Pricing",
      "Dashboards",
      "Forms",
      "Footers",
      "Tables",
      "Auth Pages",
    ],
    cta: "Browse Library",
    gradient: "from-amber-50 to-orange-50/60",
    border: "border-amber-100 hover:border-amber-300",
    ctaBg: "from-amber-600 to-orange-600",
  },
];

export default function EntrySection() {
  return (
    <section
      id="entry"
      className="py-24 lg:py-32 bg-white relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="badge badge-blue mb-4 mx-auto">
            <span>Choose Your Starting Point</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-5">
            Every workflow,{" "}
            <span className="gradient-text-blue-purple">one platform</span>
          </h2>
          <p className="text-lg text-slate-600">
            Whether you&apos;re transforming an existing site or building from
            scratch, Morphix has the perfect entry point.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {entryCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                id={card.id}
                className={`morphix-card p-8 bg-gradient-to-br ${card.gradient} border ${card.border} group cursor-pointer flex flex-col`}
              >
                {/* Card header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.iconBg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className={`badge ${card.badgeClass} text-[11px] mb-1`}>
                        {card.badge}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900">
                        {card.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-600 leading-relaxed mb-6">
                  {card.description}
                </p>

                {/* Features or categories */}
                {card.features ? (
                  <div className="space-y-3 mb-8">
                    {card.features.map((feature) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <div
                          key={feature.label}
                          className="flex items-center gap-3 p-3 bg-white/70 rounded-xl border border-white/80 hover:bg-white hover:shadow-sm transition-all duration-200"
                        >
                          <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center justify-center flex-shrink-0">
                            <FeatureIcon className="w-4 h-4 text-slate-600" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-800">
                              {feature.label}
                            </div>
                            <div className="text-xs text-slate-500">
                              {feature.sublabel}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {card.categories?.map((cat) => (
                      <span
                        key={cat}
                        className="px-3 py-1.5 bg-white/80 text-xs font-semibold text-slate-700 rounded-lg border border-white shadow-sm hover:bg-white hover:shadow-md transition-all duration-200 cursor-pointer"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <button
                  className={`mt-auto group/btn w-full flex items-center justify-center gap-2 py-3.5 px-5 bg-gradient-to-r ${card.ctaBg} text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-sm`}
                >
                  {card.cta}
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
