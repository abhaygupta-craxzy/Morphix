"use client";

import { useState } from "react";
import { Zap, Sparkles, Check, Monitor, Tablet, Smartphone, Globe, Wand2, Search } from "lucide-react";

/* ── 6 infinite scrolling columns with REAL component previews ── */

const THEMES = ["Apple","Stripe","Linear","Framer","SaaS"] as const;
type Theme = typeof THEMES[number];

const THEME_STYLES: Record<Theme, { nav: string; bg: string; btn: string; accent: string; text: string }> = {
  Apple:  { nav: "bg-zinc-950",    bg: "bg-zinc-900",   btn: "bg-zinc-700",    accent: "#f5f5f7", text: "text-white" },
  Stripe: { nav: "bg-indigo-700",  bg: "bg-indigo-950", btn: "bg-indigo-500",  accent: "#5B7FFF", text: "text-white" },
  Linear: { nav: "bg-purple-950",  bg: "bg-slate-900",  btn: "bg-purple-600",  accent: "#7C5CFF", text: "text-white" },
  Framer: { nav: "bg-sky-600",     bg: "bg-sky-950",    btn: "bg-sky-500",     accent: "#0ea5e9", text: "text-white" },
  SaaS:   { nav: "bg-blue-700",    bg: "bg-blue-950",   btn: "bg-blue-500",    accent: "#14B8A6", text: "text-white" },
};

/* ── Component preview renderers ── */
function NavbarPreview({ t }: { t: Theme }) {
  const s = THEME_STYLES[t];
  return (
    <div className={`w-full h-full ${s.bg} flex flex-col`}>
      <div className={`${s.nav} px-3 py-2 flex items-center justify-between`}>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-lg bg-white/20 flex items-center justify-center">
            <Zap className="w-2.5 h-2.5 text-white/80" />
          </div>
          <div className="w-10 h-1.5 rounded bg-white/40" />
        </div>
        <div className="flex items-center gap-2">
          {[0,1,2].map(i => <div key={i} className="w-5 h-1 rounded bg-white/25" />)}
          <div className={`w-12 h-4 rounded-lg ${s.btn} flex items-center justify-center`}>
            <div className="w-5 h-1 rounded bg-white/80" />
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center text-[8px] text-white/20 font-bold uppercase tracking-widest">
        {t} Nav
      </div>
    </div>
  );
}

function HeroPreview({ t }: { t: Theme }) {
  const s = THEME_STYLES[t];
  return (
    <div className={`w-full h-full ${s.bg} flex flex-col`}>
      <div className={`${s.nav} h-4 flex items-center px-2 gap-1`}>
        <div className="w-3 h-3 rounded bg-white/20" />
        <div className="w-8 h-1 rounded bg-white/25 ml-1" />
        <div className="ml-auto w-6 h-2 rounded bg-white/15" />
      </div>
      <div className="flex-1 p-3 flex flex-col justify-between">
        <div className="space-y-1">
          <div className="w-2/3 h-2.5 rounded-lg bg-white/25" />
          <div className="w-full h-1.5 rounded bg-white/15" />
          <div className="w-4/5 h-1.5 rounded bg-white/15" />
          <div className={`w-14 h-4 rounded-xl ${s.btn} mt-1.5`} />
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[0,1,2].map(i => <div key={i} className="h-6 rounded-lg bg-white/8 border border-white/5" />)}
        </div>
      </div>
    </div>
  );
}

function DashboardPreview({ t }: { t: Theme }) {
  const s = THEME_STYLES[t];
  const heights = [35,62,48,75,55,70,85,60];
  return (
    <div className={`w-full h-full ${s.bg} flex`}>
      {/* sidebar */}
      <div className={`${s.nav} w-8 flex flex-col items-center py-2 gap-1.5`}>
        <div className="w-4 h-4 rounded-lg bg-white/20" />
        {[0,1,2,3].map(i => (
          <div key={i} className={`w-4 h-3 rounded ${i===1 ? s.btn : "bg-white/10"}`} />
        ))}
      </div>
      {/* content */}
      <div className="flex-1 p-2 flex flex-col gap-1.5">
        <div className="grid grid-cols-3 gap-1">
          {["bg-blue-500/20","bg-violet-500/20","bg-teal-500/20"].map((c,i) => (
            <div key={i} className={`${c} rounded-lg p-1`}>
              <div className="w-4 h-0.5 rounded bg-white/30 mb-0.5" />
              <div className="text-[7px] font-bold text-white/70">{["24K","89%","2.4s"][i]}</div>
            </div>
          ))}
        </div>
        <div className="flex-1 bg-white/5 rounded-lg p-1.5 flex items-end gap-0.5">
          {heights.map((h,i) => (
            <div key={i} className={`flex-1 rounded-sm ${s.btn}`} style={{ height: `${h}%`, opacity: 0.7 + i*0.03 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PricingPreview({ t }: { t: Theme }) {
  const s = THEME_STYLES[t];
  return (
    <div className={`w-full h-full ${s.bg} p-2 flex items-center gap-1.5`}>
      {["Starter","Pro","Team"].map((tier, i) => (
        <div key={tier} className={`flex-1 rounded-xl ${i===1 ? s.nav : "bg-white/5"} ${i===1 ? "ring-1 ring-white/20 shadow-lg scale-105" : ""} p-1.5 flex flex-col items-center gap-0.5`}>
          <div className="text-[7px] font-bold text-white/80">{tier}</div>
          <div className="text-[9px] font-black text-white">{["Free","$29","$79"][i]}</div>
          {[0,1,2].map(j => <div key={j} className="w-full h-0.5 rounded bg-white/15 mt-0.5" />)}
          <div className={`w-full h-3 rounded-lg ${s.btn} mt-1`} />
        </div>
      ))}
    </div>
  );
}

function FormPreview({ t }: { t: Theme }) {
  const s = THEME_STYLES[t];
  return (
    <div className={`w-full h-full ${s.bg} flex items-center justify-center p-3`}>
      <div className="w-full bg-white/5 border border-white/10 rounded-xl p-3 space-y-2">
        <div className="text-[8px] font-bold text-white/60 text-center">Sign Up</div>
        {[0,1].map(i => <div key={i} className="h-4 rounded-lg border border-white/10 bg-white/5" />)}
        <div className={`h-5 rounded-xl ${s.btn} flex items-center justify-center`}>
          <div className="text-[7px] font-bold text-white">Create Account</div>
        </div>
      </div>
    </div>
  );
}

function FooterPreview({ t }: { t: Theme }) {
  const s = THEME_STYLES[t];
  return (
    <div className={`w-full h-full ${s.nav} p-2 flex flex-col justify-between`}>
      <div className="grid grid-cols-3 gap-1.5">
        {[0,1,2].map(col => (
          <div key={col} className="space-y-1">
            <div className="h-1.5 w-8 rounded bg-white/40" />
            {[0,1,2].map(row => <div key={row} className="h-1 rounded bg-white/20" />)}
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 pt-1.5 flex items-center justify-between">
        <div className="h-1 w-16 rounded bg-white/20" />
        <div className="flex gap-1">
          {[0,1,2].map(i => <div key={i} className="w-3 h-3 rounded-lg bg-white/15" />)}
        </div>
      </div>
    </div>
  );
}

const COLUMN_CONFIG = [
  { label: "Navbars",    Component: NavbarPreview,    speed: "animate-marquee-y-u-slow", count: 5 },
  { label: "Heroes",     Component: HeroPreview,      speed: "animate-marquee-y-d-med",  count: 5 },
  { label: "Dashboards", Component: DashboardPreview, speed: "animate-marquee-y-u-fast", count: 5 },
  { label: "Pricing",    Component: PricingPreview,   speed: "animate-marquee-y-d-slow", count: 5 },
  { label: "Forms",      Component: FormPreview,      speed: "animate-marquee-y-u-med",  count: 5 },
  { label: "Footers",    Component: FooterPreview,    speed: "animate-marquee-y-d-fast", count: 5 },
];

function Column({ col, activeTheme }: { col: typeof COLUMN_CONFIG[0]; activeTheme: Theme }) {
  const { Component, speed, label, count } = col;
  const items = Array.from({ length: count }, (_, i) => ({ theme: THEMES[i % THEMES.length] }));

  return (
    <div className="flex flex-col gap-1.5 flex-shrink-0 text-center">
      <div className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-1">{label}</div>
      <div className="h-[420px] overflow-hidden relative rounded-2xl">
        {/* gradient masks top & bottom */}
        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#f9fafb] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#f9fafb] to-transparent z-10 pointer-events-none" />
        <div className={`${speed} flex flex-col gap-2`} style={{ width: "100%" }}>
          {[...items, ...items].map((item, i) => (
            <div
              key={i}
              className={`w-[140px] h-[100px] rounded-xl border overflow-hidden transition-all duration-500 flex-shrink-0 ${
                item.theme === activeTheme
                  ? "border-[#5B7FFF]/50 shadow-[0_0_12px_rgba(91,127,255,0.2)]"
                  : "border-slate-200"
              }`}
            >
              <Component t={item.theme} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Theme mutation sandbox ── */
function ThemeSandbox({ activeTheme, setActiveTheme }: {
  activeTheme: Theme;
  setActiveTheme: (t: Theme) => void;
}) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl shadow-slate-200/50">
      <div className="text-center mb-6">
        <div className="text-[10px] font-bold text-[#5B7FFF] uppercase tracking-widest mb-2">Theme Mutation Engine</div>
        <div className="text-xl font-black text-[#070B14]">
          Same component. <span className="text-[#7C5CFF]">Any style.</span>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap justify-center mb-6">
        {THEMES.map(t => (
          <button
            key={t}
            onClick={() => setActiveTheme(t)}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
              activeTheme === t
                ? "bg-[#5B7FFF] text-white border-[#5B7FFF] shadow-md shadow-indigo-200"
                : "bg-white text-slate-700 border-slate-200 hover:border-[#5B7FFF]/40 hover:text-[#5B7FFF]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Multi device preview of active theme */}
      <div className="flex gap-4 justify-center flex-wrap">
        {[
          { label: "Desktop",  icon: Monitor,    scale: 1,    w: 220, h: 132 },
          { label: "Tablet",   icon: Tablet,     scale: 0.85, w: 160, h: 110 },
          { label: "Mobile",   icon: Smartphone, scale: 0.7,  w: 90,  h: 140 },
        ].map(({ label, icon: Icon, scale, w, h }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1 text-[9px] text-slate-400 font-bold">
              <Icon className="w-3 h-3" />{label}
            </div>
            <div
              className="border-2 border-slate-200 rounded-xl overflow-hidden shadow-lg transition-all duration-500"
              style={{ width: w, height: h }}
            >
              {label === "Mobile"
                ? <FormPreview t={activeTheme} />
                : label === "Tablet"
                  ? <PricingPreview t={activeTheme} />
                  : <DashboardPreview t={activeTheme} />
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ComponentIntelligenceSection() {
  const [activeTheme, setActiveTheme] = useState<Theme>("Stripe");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All","Navbars","Heroes","Dashboards","Pricing","Forms","Footers","Sidebars","Settings","Auth"];

  return (
    <section id="component-intelligence" className="py-24 section-light-soft border-t border-slate-100/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-300/50 bg-indigo-50 text-xs font-bold text-indigo-600 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-violet-500" /> Component Intelligence Engine
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            10,000+ Components.{" "}
            <span className="gradient-text-violet">
              Any Style.
            </span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Browse production-ready components that instantly adapt to Apple, Stripe, Linear, Framer, or your custom style preset.
          </p>
        </div>

        {/* Search + filter */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-8 shadow-sm">
          <div className="flex gap-3 mb-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search 10,000+ components…"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B7FFF]/20 focus:border-[#5B7FFF] transition-all"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-[#5B7FFF] to-[#7C5CFF] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Infinite scrolling columns */}
        <div className="overflow-hidden mb-16">
          <div className="flex gap-4 justify-center">
            {COLUMN_CONFIG.map((col, i) => (
              <Column key={i} col={col} activeTheme={activeTheme} />
            ))}
          </div>
        </div>

        {/* Theme Mutation Sandbox */}
        <ThemeSandbox activeTheme={activeTheme} setActiveTheme={setActiveTheme} />

        {/* Bottom stats */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-10">
          {[
            { n: "10,000+", l: "Components",      c: "text-[#5B7FFF]" },
            { n: "50+",     l: "Categories",       c: "text-[#7C5CFF]" },
            { n: "10",      l: "Style Presets",    c: "text-[#14B8A6]" },
            { n: "Weekly",  l: "New Additions",    c: "text-slate-700"  },
          ].map(s => (
            <div key={s.l} className="text-center">
              <div className={`text-2xl font-black ${s.c}`}>{s.n}</div>
              <div className="text-sm text-slate-500 font-medium mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
