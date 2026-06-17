"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";

/* ── STYLES ── */
const STYLES = [
  {
    id: "stripe",    name: "Stripe",      gradient: "from-indigo-600 to-violet-700",
    navBg: "bg-indigo-700", heroBg: "#0d0d2e", accent: "#6366f1", tag: "Financial",
  },
  {
    id: "linear",    name: "Linear",      gradient: "from-slate-800 to-indigo-900",
    navBg: "bg-slate-900",  heroBg: "#0d0f1a", accent: "#7c5cf6", tag: "Developer",
  },
  {
    id: "apple",     name: "Apple",       gradient: "from-zinc-800 to-zinc-900",
    navBg: "bg-zinc-950",   heroBg: "#0a0a0a", accent: "#f5f5f7", tag: "Minimal",
  },
  {
    id: "framer",    name: "Framer",      gradient: "from-sky-500 to-cyan-500",
    navBg: "bg-sky-600",    heroBg: "#061825", accent: "#0ea5e9", tag: "Creative",
  },
  {
    id: "saas",      name: "Modern SaaS", gradient: "from-blue-600 to-violet-600",
    navBg: "bg-blue-700",   heroBg: "#060c1f", accent: "#3b82f6", tag: "SaaS",
  },
  {
    id: "fintech",   name: "Fintech",     gradient: "from-emerald-600 to-teal-600",
    navBg: "bg-emerald-700",heroBg: "#071912", accent: "#10b981", tag: "Finance",
  },
  {
    id: "notion",    name: "Notion",      gradient: "from-slate-600 to-slate-700",
    navBg: "bg-white",      heroBg: "#ffffff", accent: "#000000", tag: "Document",
  },
  {
    id: "startup",   name: "Startup",     gradient: "from-violet-600 to-fuchsia-600",
    navBg: "bg-violet-700", heroBg: "#14082a", accent: "#a855f7", tag: "Bold",
  },
];

/* ── WEBSITE TYPES ── */
const SITES = [
  {
    id: "ecommerce", label: "E-Commerce",
    before: {
      nav: { brand: "UglyWidgets Inc.", color: "text-red-700", bg: "bg-white border-b-2 border-gray-400" },
      hero: { bg: "bg-gray-100 font-serif", title: "Products Catalog", subtitle: "Made of plastic. Direct shipping." },
      cards: [
        { title: "Widget #1", price: "$12.50", btnStyle: "bg-gray-200 border border-gray-400 text-gray-800 text-[8px]" },
        { title: "Widget #2", price: "$8.00",  btnStyle: "bg-gray-200 border border-gray-400 text-gray-800 text-[8px]" },
        { title: "Widget #3", price: "$15.00", btnStyle: "bg-gray-200 border border-gray-400 text-gray-800 text-[8px]" },
      ],
    },
  },
  {
    id: "portfolio", label: "Portfolio",
    before: {
      nav: { brand: "PORTFOLIO SITE", color: "text-black font-bold text-center", bg: "bg-yellow-100 border-2 border-black" },
      hero: { bg: "bg-white font-mono", title: "Welcome to my home on the web!", subtitle: "I write code in C++ and Java. Updated last on: October 2008" },
      cards: [
        { title: "HOME PAGE",    price: "", btnStyle: "bg-gray-300 border border-black text-gray-800 text-[8px]" },
        { title: "MY PROJECTS",  price: "", btnStyle: "bg-gray-300 border border-black text-gray-800 text-[8px]" },
        { title: "CONTACT FORM", price: "", btnStyle: "bg-gray-300 border border-black text-gray-800 text-[8px]" },
      ],
    },
  },
  {
    id: "dashboard", label: "Dashboard",
    before: {
      nav: { brand: "METRICS_CONSOL_V4", color: "text-white font-mono text-xs", bg: "bg-slate-800 border border-slate-600" },
      hero: { bg: "bg-slate-950 font-mono", title: "ERRS: 54  CPU: 92%  CONN: 2400", subtitle: "[Graph showing chaotic raw values compiled every 1 hour]" },
      cards: [
        { title: "STOP",    price: "", btnStyle: "bg-red-900 border border-red-500 text-red-300 text-[8px]" },
        { title: "RUNNING", price: "", btnStyle: "bg-green-900 border border-green-500 text-green-300 text-[8px]" },
        { title: "MEMORY",  price: "12GB", btnStyle: "bg-gray-900 border border-gray-700 text-gray-400 text-[8px]" },
      ],
    },
  },
  {
    id: "agency", label: "Agency",
    before: {
      nav: { brand: "DIGITAL CREATIVE CONSULTANTS LTD", color: "text-slate-900 font-serif", bg: "bg-white border-b border-gray-300" },
      hero: { bg: "bg-white font-serif", title: "We deliver synergy across corporate branding structures", subtitle: "Detailed consultation reports, PDF style assets, graphic design blueprints." },
      cards: [
        { title: "Our Philosophies", price: "", btnStyle: "bg-white border border-gray-400 text-gray-700 text-[8px]" },
        { title: "Our Deliverables",  price: "", btnStyle: "bg-white border border-gray-400 text-gray-700 text-[8px]" },
        { title: "Contact Us",        price: "", btnStyle: "bg-white border border-gray-400 text-gray-700 text-[8px]" },
      ],
    },
  },
];

/* ── BEFORE PANEL ── */
function BeforePanel({ site }: { site: typeof SITES[0] }) {
  const { before } = site;
  return (
    <div className="absolute inset-0 flex flex-col">
      {/* Nav */}
      <div className={`${before.nav.bg} px-4 py-2.5 flex items-center justify-between flex-shrink-0`}>
        <span className={`${before.nav.color} text-xs truncate max-w-[60%]`}>{before.nav.brand}</span>
        <div className="flex gap-2">
          {["Products", "Contact", "Cart"].map(l => (
            <span key={l} className="text-[9px] text-blue-600 underline hidden sm:block">{l}</span>
          ))}
        </div>
      </div>
      {/* Hero */}
      <div className={`${before.hero.bg} flex-1 p-4 flex flex-col justify-between overflow-hidden`}>
        <div>
          <div className="text-xs font-bold text-slate-800 mb-1 leading-tight">{before.hero.title}</div>
          <div className="text-[9px] text-slate-500 leading-relaxed">{before.hero.subtitle}</div>
        </div>
        {/* Cards */}
        <div className="grid grid-cols-3 gap-2 mt-2">
          {before.cards.map((card, i) => (
            <div key={i} className="border border-gray-300 bg-gray-50 p-2 rounded flex flex-col gap-1">
              <div className="h-8 bg-gray-200 border border-gray-300 rounded flex items-center justify-center">
                <span className="text-[7px] text-gray-400">IMG</span>
              </div>
              <div className="text-[8px] font-bold text-slate-700 truncate">{card.title}</div>
              {card.price && <div className="text-[7px] text-slate-500">{card.price}</div>}
              <button className={`${card.btnStyle} py-0.5 rounded text-[7px]`}>
                {site.id === "portfolio" ? "Visit" : site.id === "dashboard" ? card.title : "Buy Now"}
              </button>
            </div>
          ))}
        </div>
        {/* Footer */}
        <div className="mt-2 pt-2 border-t border-gray-300 flex justify-between text-[7px] text-gray-400">
          <span>© 2008 {before.nav.brand.split(" ")[0]}. All rights reserved.</span>
          <span className="text-blue-500 underline">Terms</span>
        </div>
      </div>
    </div>
  );
}

/* ── AFTER PANEL (style-aware) ── */
function AfterPanel({ site, style }: { site: typeof SITES[0]; style: typeof STYLES[0] }) {
  const isLight = style.id === "notion";
  const textPrimary   = isLight ? "text-slate-900" : "text-white";
  const textSecondary = isLight ? "text-slate-500" : "text-white/50";
  const cardBg        = isLight ? "bg-slate-50 border border-slate-200" : "bg-white/5 border border-white/10";

  const afterContent = {
    ecommerce: { title: "Premium Products", subtitle: "Crafted with surgical precision. Free shipping worldwide.", items: ["Premium Widget 01", "Enterprise Hub Pro", "AI Core Controller"], prices: ["$49/mo", "$129/mo", "$199/mo"] },
    portfolio:  { title: "Designing digital frameworks with surgical precision.", subtitle: "Senior design engineer. React, WebGL, custom shaders.", items: ["Featured Work", "Case Studies", "Contact"], prices: ["", "", ""] },
    dashboard: { title: "Live Metrics Studio", subtitle: "Optimized performance. Real-time analytics.", items: ["Errors Reduced", "CPU Utility", "Connections"], prices: ["0.02%", "24.5%", "48.2K"] },
    agency:     { title: "Scaling digital interfaces into revenue engines.", subtitle: "Clean design DNA. Applied to real business outcomes.", items: ["Strategy", "Design", "Engineering"], prices: ["", "", ""] },
  }[site.id] || { title: "", subtitle: "", items: [], prices: [] };

  return (
    <div className="absolute inset-0 flex flex-col" style={{ backgroundColor: style.heroBg }}>
      {/* Nav */}
      <div className={`${style.navBg} px-4 py-2.5 flex items-center justify-between flex-shrink-0`}>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-lg flex items-center justify-center" style={{ backgroundColor: style.accent + "33" }}>
            <Sparkles className="w-2.5 h-2.5" style={{ color: style.accent }} />
          </div>
          <span className={`font-bold text-xs tracking-tight ${isLight ? "text-slate-900" : "text-white"}`}>
            Morphix {site.label}
          </span>
        </div>
        <div className={`flex gap-3 items-center text-[9px] font-medium ${textSecondary}`}>
          {["Products", "Pricing", "Docs"].map(l => <span key={l}>{l}</span>)}
          <div className="px-2 py-1 rounded-lg text-[8px] font-bold text-white" style={{ backgroundColor: style.accent }}>
            Launch
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="flex-1 p-4 flex flex-col justify-between overflow-hidden">
        <div className="space-y-2">
          <div
            className="text-[9px] font-bold px-2 py-0.5 rounded-full inline-block"
            style={{ backgroundColor: style.accent + "20", color: style.accent }}
          >
            {style.tag} Style · Morphix AI
          </div>
          <div className={`text-sm font-black leading-tight ${textPrimary}`}>{afterContent.title}</div>
          <div className={`text-[9px] leading-relaxed ${textSecondary}`}>{afterContent.subtitle}</div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-2 mt-2">
          {afterContent.items.map((item, i) => (
            <div key={i} className={`${cardBg} p-2 rounded-xl flex flex-col gap-1`}>
              <div
                className="h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: style.accent + "18" }}
              >
                <Sparkles className="w-3 h-3" style={{ color: style.accent }} />
              </div>
              <div className={`text-[8px] font-bold leading-tight ${textPrimary}`}>{item}</div>
              {afterContent.prices[i] && (
                <div className="text-[8px] font-black" style={{ color: style.accent }}>
                  {afterContent.prices[i]}
                </div>
              )}
              <button
                className="py-0.5 px-1.5 rounded-lg text-[7px] font-bold text-white"
                style={{ backgroundColor: style.accent }}
              >
                View
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="mt-2 pt-2 flex justify-between text-[7px]"
          style={{ borderTop: `1px solid ${style.accent}22`, color: textSecondary.includes("white") ? "rgba(255,255,255,0.25)" : "#94a3b8" }}
        >
          <span>© 2026 Morphix {site.label}. Powered by AI.</span>
          <span style={{ color: style.accent }}>Terms · Privacy</span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════ */
export default function TransformationShowcaseSection() {
  const [activeSite,   setActiveSite]   = useState("ecommerce");
  const [activeStyle,  setActiveStyle]  = useState("stripe");
  const [sliderPos,    setSliderPos]    = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging   = useRef(false);

  const currentSite  = SITES.find(s => s.id === activeSite)!;
  const currentStyle = STYLES.find(s => s.id === activeStyle)!;

  /* drag logic */
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct  = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pct);
  };

  useEffect(() => {
    const onUp    = () => { isDragging.current = false; };
    const onMove  = (e: MouseEvent) => { if (isDragging.current) handleMove(e.clientX); };
    const onTouch = (e: TouchEvent) => { if (isDragging.current && e.touches[0]) handleMove(e.touches[0].clientX); };
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchend", onUp);
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchend", onUp);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return (
    <section id="transformation-showcase" className="py-20 lg:py-28 bg-[#07070f] relative overflow-hidden border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-violet-600/8 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-bold text-indigo-300 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Live Transformation Proof
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            Pick a Style.{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              See the Transformation.
            </span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg">
            Choose a website type, pick a design style, then drag the slider to compare before and after.
          </p>
        </div>

        {/* Controls Row */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Website type selector */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest whitespace-nowrap">Website Type:</span>
            {SITES.map(site => (
              <button
                key={site.id}
                onClick={() => { setActiveSite(site.id); setSliderPos(50); }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 border ${
                  activeSite === site.id
                    ? "bg-white/10 border-white/20 text-white shadow-lg"
                    : "bg-white/3 border-white/8 text-white/40 hover:text-white/70 hover:border-white/15"
                }`}
              >
                {site.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main layout: Styles (left) + Slider (right) */}
        <div className="flex flex-col xl:flex-row gap-6 items-start">

          {/* ── Style Selector (left column) ── */}
          <div className="xl:w-56 flex-shrink-0">
            <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3">Transform Into:</div>
            <div className="grid grid-cols-2 xl:grid-cols-1 gap-2">
              {STYLES.map(style => (
                <button
                  key={style.id}
                  onClick={() => setActiveStyle(style.id)}
                  className={`group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-left transition-all duration-300 ${
                    activeStyle === style.id
                      ? "bg-white/10 border border-white/20 shadow-lg"
                      : "bg-white/3 border border-white/6 hover:bg-white/6 hover:border-white/12"
                  }`}
                >
                  {/* Color swatch */}
                  <div
                    className={`w-5 h-5 rounded-lg flex-shrink-0 bg-gradient-to-br ${style.gradient} transition-transform duration-300 ${activeStyle === style.id ? "scale-110 shadow-md" : "group-hover:scale-105"}`}
                  />
                  <div className="min-w-0">
                    <div className={`text-xs font-bold leading-tight truncate transition-colors ${activeStyle === style.id ? "text-white" : "text-white/50 group-hover:text-white/80"}`}>
                      {style.name}
                    </div>
                    <div className="text-[9px] text-white/30 font-medium">{style.tag}</div>
                  </div>
                  {activeStyle === style.id && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0 animate-pulse-dot" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ── Drag Comparison Canvas (right) ── */}
          <div className="flex-1 min-w-0">
            {/* Labels */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/8">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Before · Legacy</span>
              </div>
              <div className="text-[10px] text-white/25 font-medium">← Drag slider →</div>
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border"
                style={{ backgroundColor: currentStyle.accent + "20", borderColor: currentStyle.accent + "40" }}
              >
                <div className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ backgroundColor: currentStyle.accent }} />
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: currentStyle.accent }}>
                  After · {currentStyle.name}
                </span>
              </div>
            </div>

            {/* Slider container */}
            <div
              ref={containerRef}
              className="relative w-full h-[440px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] select-none cursor-ew-resize"
              style={{ boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(${currentStyle.accent === "#f5f5f7" ? "255,255,255" : "99,102,241"},0.05)` }}
            >
              {/* Before layer (full) */}
              <BeforePanel site={currentSite} />

              {/* After layer (clipped by slider) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden transition-none"
                style={{ width: `${sliderPos}%` }}
              >
                <div className="absolute inset-y-0 left-0" style={{ width: containerRef.current?.offsetWidth ?? 900 }}>
                  <AfterPanel site={currentSite} style={currentStyle} />
                </div>
              </div>

              {/* Slider handle */}
              <div
                className="absolute top-0 bottom-0 w-0.5 z-20 cursor-ew-resize"
                style={{
                  left: `${sliderPos}%`,
                  backgroundColor: currentStyle.accent === "#f5f5f7" ? "#fff" : currentStyle.accent,
                  boxShadow: `0 0 20px ${currentStyle.accent}80`,
                }}
                onMouseDown={() => { isDragging.current = true; }}
                onTouchStart={() => { isDragging.current = true; }}
              >
                {/* Handle pill */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-2xl border-2"
                  style={{ borderColor: currentStyle.accent }}
                >
                  <ChevronLeft className="w-3 h-3 text-slate-600 flex-shrink-0" />
                  <ChevronRight className="w-3 h-3 text-slate-600 flex-shrink-0 -ml-0.5" />
                </div>
              </div>
            </div>

            {/* Bottom info strip */}
            <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-4">
                {[
                  { label: "Design DNA Extracted", icon: "✓" },
                  { label: "Components Mapped",    icon: "✓" },
                  { label: "Export Ready",          icon: "✓" },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-1.5 text-[10px] font-medium text-white/40">
                    <span className="text-emerald-400">{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: `linear-gradient(135deg, ${currentStyle.accent}, ${currentStyle.accent}bb)`,
                  boxShadow: `0 8px 24px ${currentStyle.accent}40`,
                }}
              >
                Apply {currentStyle.name} Style <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-8">
          <div className="flex items-center gap-6 bg-white/4 border border-white/8 rounded-2xl px-8 py-4 backdrop-blur">
            {[
              { n: "50,000+", l: "Websites Transformed" },
              { n: "10+",     l: "Design Styles" },
              { n: "1.4s",    l: "Avg Transform Time" },
              { n: "100%",    l: "Export Ready Code" },
            ].map(s => (
              <div key={s.l} className="text-center">
                <div className="text-lg font-black text-white">{s.n}</div>
                <div className="text-[10px] text-white/35 font-medium">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
