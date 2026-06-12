"use client";

import { useEffect, useRef, useState } from "react";
import {
  Upload, FileImage, Globe, Check, Download, Palette,
  Type, Layers, Zap, Sparkles
} from "lucide-react";

function useInView(threshold = 0.15) {
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

/* ── Animated Wave Bars (for motion section) ── */
function WaveBars() {
  return (
    <div className="flex items-end gap-0.5 h-6">
      {[40,70,55,85,60,75,50,90,65,80].map((h, i) => (
        <div
          key={i}
          className="w-1.5 rounded-full bg-gradient-to-t from-indigo-500 to-purple-400"
          style={{
            height: `${h}%`,
            animation: `wave 1.2s ease-in-out infinite`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
      <style>{`@keyframes wave { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(0.3)} }`}</style>
    </div>
  );
}

/* ── Floating Token Pill ── */
function TokenPill({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${color} bg-white/5 backdrop-blur-sm`}>
      <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider">{label}</span>
      <span className="text-xs font-bold text-white">{value}</span>
    </div>
  );
}

/* ── Step indicator ── */
const steps = [
  { icon: FileImage, label: "Upload Design",    color: "from-indigo-500 to-purple-500",  glow: "shadow-indigo-500/40" },
  { icon: Sparkles,  label: "AI Analysis",      color: "from-purple-500 to-pink-500",    glow: "shadow-purple-500/40" },
  { icon: Palette,   label: "Token Extraction", color: "from-pink-500 to-rose-500",      glow: "shadow-pink-500/40" },
  { icon: Download,  label: "Export System",    color: "from-teal-500 to-emerald-500",   glow: "shadow-teal-500/40" },
];

/* ── Mini extracted tokens ── */
const colorTokens = ["#6366f1","#a855f7","#ec4899","#14b8a6","#f59e0b","#10b981","#0f172a","#64748b"];
const spacingTokens = [4,8,12,16,24,32,48];

export default function DesignDNASection() {
  const { ref, inView } = useInView(0.1);
  const [activeStep, setActiveStep] = useState(0);
  const [extracting, setExtracting] = useState(false);
  const [extracted, setExtracted] = useState(false);
  const [hoveredColor, setHoveredColor] = useState<number | null>(null);

  function handleExtract() {
    setExtracting(true);
    setActiveStep(0);
    const cycle = [0, 1, 2, 3].reduce((acc, step) => {
      return acc.then(() => new Promise<void>(res => {
        setTimeout(() => { setActiveStep(step); res(); }, step * 600);
      }));
    }, Promise.resolve());
    cycle.then(() => setTimeout(() => { setExtracting(false); setExtracted(true); }, 400));
  }

  return (
    <section id="design-dna" className="relative py-24 lg:py-32 section-dark-purple overflow-hidden">
      {/* Background dot grid */}
      <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />

      {/* Animated orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 orb-indigo blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-80 h-80 orb-purple blur-3xl pointer-events-none animate-pulse-glow delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 orb-teal blur-3xl opacity-20 pointer-events-none" />

      {/* Floating token pills — decorative */}
      <div className="absolute top-16 right-20 animate-float-slow delay-300 pointer-events-none hidden lg:block">
        <TokenPill label="color" value="#6366f1" color="border-indigo-500/30" />
      </div>
      <div className="absolute top-32 right-40 animate-float-medium delay-700 pointer-events-none hidden lg:block">
        <TokenPill label="radius" value="12px" color="border-purple-500/30" />
      </div>
      <div className="absolute bottom-32 left-20 animate-drift-right delay-500 pointer-events-none hidden lg:block">
        <TokenPill label="font" value="Inter 800" color="border-teal-500/30" />
      </div>
      <div className="absolute bottom-16 left-40 animate-float-fast delay-200 pointer-events-none hidden lg:block">
        <TokenPill label="shadow" value="lg · 24px" color="border-pink-500/30" />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="badge badge-glow mb-6 mx-auto">
            <Sparkles className="w-3.5 h-3.5" /> Design DNA Engine
          </div>
          <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-5 leading-tight">
            <span className="text-white">Extract design systems</span>
            <br />
            <span className="gradient-text">from anything</span>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            Point Morphix at any design — screenshot, Figma file, or live website — and watch AI extract a complete, reusable design token system in seconds.
          </p>
        </div>

        {/* Main content: Step flow + Token output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: Step flow */}
          <div className={`space-y-4 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            {/* Upload card */}
            <div
              onClick={!extracting && !extracted ? handleExtract : undefined}
              className={`glass-card p-6 cursor-pointer group transition-all ${!extracting && !extracted ? "hover:border-indigo-500/40" : ""}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <Upload className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Your Design Input</div>
                  <div className="text-xs text-white/40">Click to extract</div>
                </div>
                {extracted && (
                  <div className="ml-auto w-6 h-6 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-green-400" />
                  </div>
                )}
              </div>

              {/* Three input options */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: FileImage, label: "Screenshot", color: "from-violet-600/40 to-purple-600/40", border: "border-violet-500/20" },
                  { icon: Globe,     label: "Website URL", color: "from-blue-600/40 to-indigo-600/40",   border: "border-blue-500/20" },
                  { icon: Upload,    label: "Figma File",  color: "from-pink-600/40 to-rose-600/40",     border: "border-pink-500/20" },
                ].map(opt => {
                  const Icon = opt.icon;
                  return (
                    <div key={opt.label} className={`flex flex-col items-center gap-1.5 p-3 rounded-xl bg-gradient-to-br ${opt.color} border ${opt.border} group-hover:scale-105 transition-transform`}>
                      <Icon className="w-4 h-4 text-white/70" />
                      <span className="text-[9px] font-semibold text-white/60">{opt.label}</span>
                    </div>
                  );
                })}
              </div>

              {!extracting && !extracted && (
                <div className="mt-4 text-center text-xs text-white/30 font-medium group-hover:text-indigo-400 transition-colors">
                  Click to run AI extraction →
                </div>
              )}
            </div>

            {/* Steps */}
            <div className="space-y-2">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const done = extracted || (extracting && i < activeStep);
                const active = extracting && i === activeStep;
                return (
                  <div
                    key={step.label}
                    className={`glass-card p-4 flex items-center gap-4 transition-all duration-500 ${
                      active ? "border-white/20 bg-white/8" : done ? "border-green-500/20" : ""
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 shadow-md ${step.glow} transition-all ${active ? "animate-pulse-glow scale-110" : ""}`}>
                      {done && !active
                        ? <Check className="w-4 h-4 text-white" />
                        : <Icon className={`w-4 h-4 text-white ${active ? "animate-spin-slow" : ""}`} />
                      }
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-bold ${done || active ? "text-white" : "text-white/40"} transition-colors`}>{step.label}</div>
                      {active && <div className="text-xs text-indigo-400 mt-0.5 animate-pulse-dot">Processing…</div>}
                      {done && !active && <div className="text-xs text-green-400 mt-0.5">Complete</div>}
                    </div>
                    <div className={`w-2 h-2 rounded-full transition-all ${active ? "bg-indigo-400 animate-pulse-dot" : done ? "bg-green-400" : "bg-white/10"}`} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Token output */}
          <div className={`transition-all duration-700 delay-400 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <div className="glass-card p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Generated Design System</div>
                  <div className="text-sm font-bold text-white">6 Token Categories</div>
                </div>
                {extracted && (
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all animate-scale-in">
                    <Download className="w-3 h-3" /> Export
                  </button>
                )}
              </div>

              {/* Color tokens */}
              <div className={`transition-all duration-500 ${extracted ? "opacity-100" : "opacity-30"}`}>
                <div className="flex items-center gap-2 mb-2.5">
                  <Palette className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-xs font-bold text-white/60 uppercase tracking-wider">Color Palette</span>
                </div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {colorTokens.map((c, i) => (
                    <div key={c} className="relative group/tok cursor-pointer"
                      onMouseEnter={() => setHoveredColor(i)}
                      onMouseLeave={() => setHoveredColor(null)}>
                      <div
                        className={`rounded-xl shadow-lg transition-all duration-200 ${hoveredColor === i ? "scale-150 shadow-2xl z-10 ring-2 ring-white/30" : ""}`}
                        style={{ width: 28, height: 28, backgroundColor: c }}
                      />
                      {hoveredColor === i && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-[9px] font-mono rounded-lg whitespace-nowrap z-20 animate-fade-in">
                          {c}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography */}
              <div className={`transition-all duration-500 delay-100 ${extracted ? "opacity-100" : "opacity-30"}`}>
                <div className="flex items-center gap-2 mb-2.5">
                  <Type className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-xs font-bold text-white/60 uppercase tracking-wider">Typography Scale</span>
                </div>
                <div className="space-y-1.5">
                  {[{s:"text-2xl font-black",w:"800",l:"Heading XL"},
                    {s:"text-lg font-bold",w:"700",l:"Heading MD"},
                    {s:"text-sm font-semibold",w:"600",l:"Body Large"},
                    {s:"text-xs font-medium",w:"500",l:"Caption"}].map(t => (
                    <div key={t.l} className="flex items-center justify-between py-1 border-b border-white/5">
                      <span className={`${t.s} text-white/80 font-inter`}>Inter {t.w}</span>
                      <span className="text-[10px] text-white/30">{t.l}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spacing + Radius row */}
              <div className={`grid grid-cols-2 gap-4 transition-all duration-500 delay-200 ${extracted ? "opacity-100" : "opacity-30"}`}>
                {/* Spacing */}
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <Layers className="w-3.5 h-3.5 text-teal-400" />
                    <span className="text-[10px] font-bold text-white/60 uppercase tracking-wider">Spacing</span>
                  </div>
                  <div className="flex items-end gap-1">
                    {spacingTokens.map(n => (
                      <div key={n} className="bg-gradient-to-t from-indigo-500 to-purple-400 rounded-sm hover:from-teal-400 hover:to-emerald-400 transition-colors"
                        style={{ width: `${Math.min(n/2, 20)}px`, height: `${n * 1.1}px` }} />
                    ))}
                  </div>
                </div>
                {/* Radius */}
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <Layers className="w-3.5 h-3.5 text-pink-400" />
                    <span className="text-[10px] font-bold text-white/60 uppercase tracking-wider">Radius</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {["2px","6px","12px","20px","999px"].map(r => (
                      <div key={r} className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-500 hover:scale-125 transition-transform cursor-pointer"
                        style={{ borderRadius: r }} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Motion */}
              <div className={`transition-all duration-500 delay-300 ${extracted ? "opacity-100" : "opacity-30"}`}>
                <div className="flex items-center gap-2 mb-2.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-bold text-white/60 uppercase tracking-wider">Motion Patterns</span>
                </div>
                <div className="flex items-center gap-4">
                  <WaveBars />
                  <div className="space-y-1">
                    {["Ease Out · 200ms","Spring · 400ms","Smooth · 300ms"].map(m => (
                      <div key={m} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span className="text-[10px] text-white/50">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {!extracted && (
                <div className="text-center py-2">
                  <div className="text-xs text-white/25 font-medium">
                    {extracting ? "Extracting tokens…" : "Run extraction to see design system"}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
