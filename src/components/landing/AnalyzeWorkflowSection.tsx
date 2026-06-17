"use client";

import { useEffect, useRef, useState } from "react";
import {
  Globe, GitBranch, Camera, FileText, Sparkles,
  Palette, Type, Layers, Zap, Check, Download,
  AlertTriangle, TrendingUp, MousePointer, Maximize2,
} from "lucide-react";

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── Animated wave bars ── */
function WaveBars({ color = "#6366f1" }: { color?: string }) {
  return (
    <div className="flex items-end gap-0.5 h-5">
      {[45, 75, 55, 90, 60, 80, 50, 95, 70, 85].map((h, i) => (
        <div
          key={i}
          className="w-1.5 rounded-full"
          style={{
            height: `${h}%`,
            backgroundColor: color,
            animation: `wave 1.3s ease-in-out infinite`,
            animationDelay: `${i * 0.1}s`,
            opacity: 0.6 + (i % 3) * 0.13,
          }}
        />
      ))}
    </div>
  );
}

/* ── Color palette swatch ── */
function ColorSwatch({ color, label }: { color: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="rounded-xl shadow-lg transition-all duration-200"
        style={{
          width: 28, height: 28, backgroundColor: color,
          transform: hovered ? "scale(1.5)" : "scale(1)",
          boxShadow: hovered ? `0 4px 16px ${color}80` : undefined,
        }}
      />
      {hovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-[9px] font-mono rounded-lg whitespace-nowrap z-20 animate-fade-in">
          {label}
        </div>
      )}
    </div>
  );
}

/* ── Workflow steps ── */
const STEPS = [
  {
    num: "01",
    label: "Input",
    icon: Globe,
    gradient: "from-blue-500 to-indigo-600",
    glow: "shadow-blue-500/40",
    desc: "Website URL, GitHub repo, screenshot, Figma, or prompt",
    inputs: [
      { icon: Globe,     label: "Website URL",   color: "bg-blue-500/20 text-blue-400 border-blue-500/20" },
      { icon: GitBranch, label: "GitHub Repo",   color: "bg-slate-500/20 text-slate-300 border-slate-500/20" },
      { icon: Camera,   label: "Screenshot",    color: "bg-violet-500/20 text-violet-400 border-violet-500/20" },
      { icon: FileText, label: "Figma File",    color: "bg-pink-500/20 text-pink-400 border-pink-500/20" },
      { icon: Sparkles, label: "Text Prompt",   color: "bg-teal-500/20 text-teal-400 border-teal-500/20" },
    ],
  },
  {
    num: "02",
    label: "AI Analysis",
    icon: Sparkles,
    gradient: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/40",
    desc: "Deep scan of components, colors, layout, spacing, and patterns",
    scanItems: [
      "Components inventory", "Color relationships", "Typography hierarchy",
      "Spacing & grid system", "Responsive behavior", "Animation patterns",
    ],
  },
  {
    num: "03",
    label: "Design DNA",
    icon: Palette,
    gradient: "from-pink-500 to-rose-500",
    glow: "shadow-pink-500/40",
    desc: "Full design token system generated and ready to export",
  },
  {
    num: "04",
    label: "AI Report",
    icon: TrendingUp,
    gradient: "from-amber-500 to-orange-500",
    glow: "shadow-amber-500/40",
    desc: "Actionable improvement recommendations from AI",
    improvements: [
      { icon: AlertTriangle,  text: "Improve spacing consistency",    severity: "high" },
      { icon: MousePointer,   text: "Replace outdated CTA buttons",   severity: "medium" },
      { icon: Maximize2,      text: "Modernize hero section layout",  severity: "high" },
      { icon: TrendingUp,     text: "Improve visual hierarchy",       severity: "medium" },
    ],
  },
  {
    num: "05",
    label: "Transform",
    icon: Zap,
    gradient: "from-teal-500 to-emerald-500",
    glow: "shadow-teal-500/40",
    desc: "Apply improvements and export production-ready code",
  },
];

const colorTokens   = ["#6366f1", "#8b5cf6", "#ec4899", "#06b6d4", "#10b981", "#f59e0b", "#0f172a", "#64748b"];
const spacingTokens = [4, 8, 12, 16, 24, 32, 48];

export default function AnalyzeWorkflowSection() {
  const { ref, inView } = useInView(0.08);
  const [activeStep,  setActiveStep]  = useState(0);
  const [extracting,  setExtracting]  = useState(false);
  const [extracted,   setExtracted]   = useState(false);

  function handleExtract() {
    if (extracting || extracted) return;
    setExtracting(true);
    setActiveStep(0);

    [0, 1, 2, 3, 4].reduce((acc, step) =>
      acc.then(() => new Promise<void>(res => {
        setTimeout(() => { setActiveStep(step); res(); }, step * 650);
      })), Promise.resolve()
    ).then(() => setTimeout(() => { setExtracting(false); setExtracted(true); }, 400));
  }

  function reset() {
    setExtracted(false);
    setExtracting(false);
    setActiveStep(0);
  }

  return (
    <section id="analyze-workflow" className="relative py-20 lg:py-28 section-dark-purple overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
      <div className="absolute top-24 left-8 w-80 h-80 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-24 right-8 w-80 h-80 rounded-full bg-violet-600/12 blur-3xl pointer-events-none animate-pulse-glow delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-600/8 blur-[80px] pointer-events-none" />

      {/* Floating design tokens */}
      <div className="absolute top-20 right-16 animate-float-slow delay-300 pointer-events-none hidden xl:block">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-indigo-500/30 bg-white/5 backdrop-blur-sm">
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">color</span>
          <span className="text-xs font-bold text-white">#6366f1</span>
        </div>
      </div>
      <div className="absolute top-40 right-36 animate-float-medium delay-700 pointer-events-none hidden xl:block">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-violet-500/30 bg-white/5 backdrop-blur-sm">
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">radius</span>
          <span className="text-xs font-bold text-white">12px</span>
        </div>
      </div>
      <div className="absolute bottom-36 left-16 animate-drift-right delay-500 pointer-events-none hidden xl:block">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-teal-500/30 bg-white/5 backdrop-blur-sm">
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">font</span>
          <span className="text-xs font-bold text-white">Inter 800</span>
        </div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-bold text-indigo-300 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            How Morphix Works
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-5 leading-tight text-white">
            Analyze.{" "}
            <span className="gradient-text">Understand.</span>{" "}
            Transform.
          </h2>
          <p className="text-lg text-white/45 leading-relaxed">
            Morphix doesn&apos;t just restyle — it deeply understands your design, extracts its DNA,
            and applies intelligent improvements before transforming.
          </p>
        </div>

        {/* Step pipeline — horizontal on desktop */}
        <div className={`relative mb-14 transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-3 items-start lg:items-center justify-center">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isDone   = extracted || (extracting && i < activeStep);
              const isActive = extracting && i === activeStep;

              return (
                <div key={step.num} className="flex lg:flex-col items-center lg:items-center gap-3 lg:gap-2 flex-1 lg:max-w-[180px]">
                  {/* Icon bubble */}
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center flex-shrink-0 shadow-lg ${step.glow} transition-all duration-500 ${
                      isActive ? "scale-115 animate-pulse-glow" : isDone ? "scale-105" : ""
                    }`}
                  >
                    {isDone && !isActive
                      ? <Check className="w-6 h-6 text-white" />
                      : <Icon className={`w-6 h-6 text-white ${isActive ? "animate-spin-slow" : ""}`} />
                    }
                  </div>

                  {/* Step content */}
                  <div className="lg:text-center flex-1 lg:flex-none">
                    <div className="text-[9px] font-black text-white/25 uppercase tracking-widest mb-0.5">{step.num}</div>
                    <div className={`text-sm font-bold transition-colors ${isDone || isActive ? "text-white" : "text-white/50"}`}>
                      {step.label}
                    </div>
                    {isActive && <div className="text-[10px] text-indigo-400 mt-0.5 animate-pulse-dot">Processing…</div>}
                    {isDone && !isActive && <div className="text-[10px] text-emerald-400 mt-0.5">Done</div>}
                    <div className="text-[10px] text-white/30 mt-1 leading-tight hidden lg:block">{step.desc}</div>
                  </div>

                  {/* Mobile-only desc */}
                  <div className="text-[10px] text-white/30 lg:hidden leading-tight">{step.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main 2-column detail area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* LEFT: Input + step cards */}
          <div className={`space-y-4 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>

            {/* Input card (clickable to start) */}
            <div
              onClick={handleExtract}
              className={`glass-card p-6 group transition-all ${!extracting && !extracted ? "cursor-pointer hover:border-indigo-500/40" : "cursor-default"}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Your Input</div>
                  <div className="text-xs text-white/35">{extracted ? "Analysis complete" : extracting ? "Running AI pipeline…" : "Click to run analysis →"}</div>
                </div>
                {extracted && (
                  <div className="ml-auto w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                    <Check className="w-4 h-4 text-emerald-400" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-5 gap-2 mb-4">
                {STEPS[0].inputs!.map(opt => {
                  const Icon = opt.icon;
                  return (
                    <div key={opt.label} className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border ${opt.color} group-hover:scale-105 transition-transform`}>
                      <Icon className="w-4 h-4" />
                      <span className="text-[8px] font-semibold text-center leading-tight">{opt.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Progress bar */}
              {(extracting || extracted) && (
                <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-1000"
                    style={{ width: extracted ? "100%" : `${(activeStep + 1) * 20}%` }}
                  />
                </div>
              )}
            </div>

            {/* AI scan items */}
            <div className="glass-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span className="text-xs font-bold text-white/60 uppercase tracking-wider">AI Scans</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {STEPS[1].scanItems!.map((item, i) => {
                  const revealed = extracted || (extracting && activeStep >= 1);
                  return (
                    <div key={item} className={`flex items-center gap-2 transition-all duration-300 ${revealed ? "opacity-100" : "opacity-25"}`} style={{ transitionDelay: `${i * 80}ms` }}>
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${revealed ? "bg-violet-400" : "bg-white/15"}`} />
                      <span className="text-[11px] text-white/60">{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Improvement Report */}
            <div className="glass-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white/60 uppercase tracking-wider">AI Improvement Report</span>
              </div>
              <div className="space-y-2">
                {STEPS[3].improvements!.map((item, i) => {
                  const Icon = item.icon;
                  const revealed = extracted || (extracting && activeStep >= 3);
                  return (
                    <div
                      key={item.text}
                      className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all duration-400 ${
                        revealed
                          ? item.severity === "high"
                            ? "bg-amber-500/10 border-amber-500/20"
                            : "bg-white/5 border-white/8"
                          : "bg-white/3 border-white/5 opacity-30"
                      }`}
                      style={{ transitionDelay: `${i * 100}ms` }}
                    >
                      <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${revealed ? item.severity === "high" ? "text-amber-400" : "text-white/50" : "text-white/20"}`} />
                      <span className={`text-[11px] flex-1 ${revealed ? "text-white/70" : "text-white/25"}`}>{item.text}</span>
                      {revealed && (
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${item.severity === "high" ? "bg-amber-500/20 text-amber-300" : "bg-white/10 text-white/40"}`}>
                          {item.severity}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reset button */}
            {extracted && (
              <button
                onClick={reset}
                className="w-full py-2.5 rounded-2xl border border-white/10 text-white/40 text-xs font-semibold hover:text-white/70 hover:border-white/20 transition-all animate-fade-in"
              >
                Run analysis again ↺
              </button>
            )}
          </div>

          {/* RIGHT: Design DNA output */}
          <div className={`transition-all duration-700 delay-400 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <div className="glass-card p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold text-white/35 uppercase tracking-widest mb-1">Design DNA Output</div>
                  <div className="text-sm font-bold text-white">6 Token Categories Extracted</div>
                </div>
                {extracted && (
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all animate-scale-in">
                    <Download className="w-3 h-3" /> Export
                  </button>
                )}
              </div>

              {/* Color palette */}
              <div className={`transition-all duration-500 ${extracted ? "opacity-100" : "opacity-25"}`}>
                <div className="flex items-center gap-2 mb-3">
                  <Palette className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Color Palette</span>
                </div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {colorTokens.map(c => <ColorSwatch key={c} color={c} label={c} />)}
                </div>
              </div>

              {/* Typography */}
              <div className={`transition-all duration-500 delay-100 ${extracted ? "opacity-100" : "opacity-25"}`}>
                <div className="flex items-center gap-2 mb-3">
                  <Type className="w-3.5 h-3.5 text-violet-400" />
                  <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Typography Scale</span>
                </div>
                <div className="space-y-1.5">
                  {[
                    { s: "text-2xl font-black", w: "800", l: "Heading XL" },
                    { s: "text-lg font-bold",   w: "700", l: "Heading MD" },
                    { s: "text-sm font-semibold",w: "600", l: "Body Large" },
                    { s: "text-xs font-medium", w: "500", l: "Caption" },
                  ].map(t => (
                    <div key={t.l} className="flex items-center justify-between py-1 border-b border-white/5">
                      <span className={`${t.s} text-white/70`}>Inter {t.w}</span>
                      <span className="text-[10px] text-white/25">{t.l}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spacing + Radius */}
              <div className={`grid grid-cols-2 gap-4 transition-all duration-500 delay-200 ${extracted ? "opacity-100" : "opacity-25"}`}>
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <Layers className="w-3.5 h-3.5 text-teal-400" />
                    <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Spacing</span>
                  </div>
                  <div className="flex items-end gap-1">
                    {spacingTokens.map(n => (
                      <div
                        key={n}
                        className="bg-gradient-to-t from-indigo-500 to-violet-400 rounded-sm hover:from-teal-400 hover:to-emerald-400 transition-colors"
                        style={{ width: `${Math.min(n / 2, 20)}px`, height: `${n * 1.1}px` }}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <Layers className="w-3.5 h-3.5 text-pink-400" />
                    <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Radius</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {["2px", "6px", "12px", "20px", "999px"].map(r => (
                      <div
                        key={r}
                        className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-violet-500 hover:scale-125 transition-transform cursor-pointer"
                        style={{ borderRadius: r }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Motion */}
              <div className={`transition-all duration-500 delay-300 ${extracted ? "opacity-100" : "opacity-25"}`}>
                <div className="flex items-center gap-2 mb-2.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Motion Tokens</span>
                </div>
                <div className="flex items-center gap-4">
                  <WaveBars color="#6366f1" />
                  <div className="space-y-1">
                    {["Ease Out · 200ms", "Spring · 400ms", "Smooth · 300ms"].map(m => (
                      <div key={m} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span className="text-[10px] text-white/45">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Component inventory */}
              <div className={`transition-all duration-500 delay-400 ${extracted ? "opacity-100" : "opacity-25"}`}>
                <div className="flex items-center gap-2 mb-2.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Component Inventory</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["Navbar × 1", "Hero × 1", "Cards × 6", "Buttons × 12", "Forms × 3", "Footer × 1"].map(c => (
                    <div key={c} className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] text-white/50">
                      {c}
                    </div>
                  ))}
                </div>
              </div>

              {!extracted && (
                <div className="text-center py-2 text-xs text-white/20 font-medium">
                  {extracting ? "AI is extracting design tokens…" : "Run analysis from the left panel to see extracted design DNA"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
