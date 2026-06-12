"use client";

import { useState } from "react";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

const transformations = [
  {
    id: "local-biz",
    label: "Local Business",
    arrow: "Modern SaaS Design",
    tag: "SaaS",
    tagColor: "badge-blue",
    cardColor: "from-blue-600 to-indigo-700",
    before: {
      nav: "bg-gray-800",
      hero: "bg-gray-100",
      accent: "bg-gray-600",
      cards: ["bg-gray-200", "bg-gray-200", "bg-gray-200"],
    },
    after: {
      nav: "bg-gradient-to-r from-blue-600 to-indigo-700",
      hero: "bg-gradient-to-br from-blue-50 to-indigo-50",
      accent: "bg-gradient-to-r from-blue-600 to-indigo-600",
      cards: ["bg-blue-50 border border-blue-100", "bg-indigo-50 border border-indigo-100", "bg-violet-50 border border-violet-100"],
    },
  },
  {
    id: "landing",
    label: "Basic Landing Page",
    arrow: "Framer Style",
    tag: "Framer",
    tagColor: "badge-purple",
    cardColor: "from-violet-600 to-purple-700",
    before: {
      nav: "bg-white border-b border-gray-200",
      hero: "bg-gray-50",
      accent: "bg-gray-800",
      cards: ["bg-gray-100", "bg-gray-100", "bg-gray-100"],
    },
    after: {
      nav: "bg-white border-b border-violet-100",
      hero: "bg-gradient-to-br from-violet-50 to-purple-50",
      accent: "bg-gradient-to-r from-violet-600 to-purple-600",
      cards: ["bg-violet-50 border border-violet-100", "bg-purple-50 border border-purple-100", "bg-fuchsia-50 border border-fuchsia-100"],
    },
  },
  {
    id: "dashboard",
    label: "Legacy Dashboard",
    arrow: "Linear Style",
    tag: "Linear",
    tagColor: "badge-teal",
    cardColor: "from-slate-700 to-slate-900",
    before: {
      nav: "bg-blue-800",
      hero: "bg-gray-200",
      accent: "bg-blue-700",
      cards: ["bg-gray-300", "bg-gray-300", "bg-gray-300"],
    },
    after: {
      nav: "bg-slate-900",
      hero: "bg-slate-800",
      accent: "bg-indigo-500",
      cards: ["bg-slate-700", "bg-slate-700", "bg-slate-700"],
    },
  },
  {
    id: "corporate",
    label: "Corporate Website",
    arrow: "Modern Product",
    tag: "Product",
    tagColor: "badge-amber",
    cardColor: "from-teal-600 to-emerald-600",
    before: {
      nav: "bg-navy-900 bg-blue-900",
      hero: "bg-slate-100",
      accent: "bg-blue-800",
      cards: ["bg-slate-200", "bg-slate-200", "bg-slate-200"],
    },
    after: {
      nav: "bg-gradient-to-r from-teal-600 to-emerald-600",
      hero: "bg-gradient-to-br from-teal-50 to-emerald-50",
      accent: "bg-gradient-to-r from-teal-600 to-emerald-600",
      cards: ["bg-teal-50 border border-teal-100", "bg-emerald-50 border border-emerald-100", "bg-cyan-50 border border-cyan-100"],
    },
  },
];

function MiniWebsite({ site, isAfter }: { site: typeof transformations[0]["before"]; isAfter?: boolean }) {
  return (
    <div className="w-full h-full bg-white rounded-lg overflow-hidden border border-slate-200/60 shadow-sm">
      {/* Nav */}
      <div className={`h-5 ${site.nav} flex items-center px-2 gap-1.5`}>
        <div className="w-3 h-3 rounded-md bg-white/20" />
        <div className="w-8 h-1 rounded bg-white/30" />
        <div className="ml-auto flex gap-1.5">
          <div className="w-4 h-1 rounded bg-white/20" />
          <div className="w-4 h-1 rounded bg-white/20" />
          {isAfter && <div className="w-6 h-2.5 rounded-md bg-white/30" />}
        </div>
      </div>
      {/* Hero */}
      <div className={`${site.hero} p-2 flex flex-col gap-1.5`}>
        <div className="w-20 h-2 rounded bg-slate-300/60" />
        <div className="w-28 h-1.5 rounded bg-slate-200/60" />
        <div className={`w-10 h-3.5 rounded-lg ${site.accent} mt-0.5`} />
      </div>
      {/* Cards */}
      <div className="grid grid-cols-3 gap-1 p-1.5">
        {site.cards.map((c, i) => (
          <div key={i} className={`h-7 rounded-lg ${c}`} />
        ))}
      </div>
    </div>
  );
}

export default function LiveShowcase() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  const t = transformations[active];

  return (
    <section id="showcase" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="badge badge-blue mb-4 mx-auto">
            <Zap className="w-3.5 h-3.5" /> See Morphix In Action
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Instant website{" "}
            <span className="gradient-text-blue-purple">transformations</span>
          </h2>
          <p className="text-lg text-slate-600">
            Watch any website get redesigned in seconds. Click a style to see the magic.
          </p>
        </div>

        {/* Tab selectors */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {transformations.map((tr, i) => (
            <button
              key={tr.id}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                active === i
                  ? `bg-gradient-to-r ${tr.cardColor} text-white shadow-lg`
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tr.label}
              <ArrowRight className="w-3.5 h-3.5 opacity-70" />
              <span className={active === i ? "text-white/80 text-xs" : "text-slate-400 text-xs"}>{tr.arrow}</span>
            </button>
          ))}
        </div>

        {/* Main showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Before */}
          <div
            className="relative group cursor-pointer"
            onMouseEnter={() => setHovered(0)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="absolute -top-3 left-4 z-10">
              <div className="px-3 py-1 bg-slate-700 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                Before
              </div>
            </div>
            <div className="h-52 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden p-4 relative">
              <MiniWebsite site={t.before} />
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 rounded-2xl transition-all" />
            </div>
            <p className="mt-2 text-center text-sm font-semibold text-slate-500">{t.label}</p>
          </div>

          {/* Arrow */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${t.cardColor} flex items-center justify-center shadow-xl`}>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* After */}
          <div
            className="relative group cursor-pointer"
            onMouseEnter={() => setHovered(1)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="absolute -top-3 left-4 z-10">
              <div className={`px-3 py-1 bg-gradient-to-r ${t.cardColor} text-white text-[10px] font-bold rounded-full uppercase tracking-wider`}>
                After Morphix
              </div>
            </div>
            <div className={`h-52 rounded-2xl border-2 overflow-hidden p-4 relative shadow-xl bg-gradient-to-br ${
              t.id === "dashboard" ? "from-slate-900 to-slate-800 border-slate-600" : "from-white to-slate-50 border-blue-200"
            }`}>
              <MiniWebsite site={t.after} isAfter />
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-2xl transition-all" />
            </div>
            <p className="mt-2 text-center text-sm font-semibold text-blue-600">{t.arrow}</p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-2xl hover:shadow-xl hover:shadow-blue-200/50 hover:-translate-y-0.5 transition-all text-sm"
          >
            Transform Your Website Now <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
