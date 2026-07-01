"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowRight, Check, Globe, Sparkles } from "lucide-react";


type WsState = "explore" | "transform" | "create";
const WS_STATES: WsState[] = ["explore", "transform", "create"];

/* ── Browse items for Explore state ── */
const BROWSE_ITEMS = [
  {
    id: 1, name: "Gradient Hero", cat: "Hero",
    preview: (
      <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 p-2" style={{ background: "#0D0F14" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 65%)" }} />
        <div className="w-16 h-1.5 rounded-full relative z-10" style={{ background: "rgba(59,130,246,0.35)" }} />
        <div className="w-20 h-3 rounded relative z-10" style={{ background: "rgba(255,255,255,0.30)" }} />
        <div className="w-12 h-0.5 rounded relative z-10" style={{ background: "rgba(255,255,255,0.10)" }} />
        <div className="h-4 w-14 rounded-full flex items-center justify-center mt-0.5 relative z-10" style={{ background: "#3B82F6" }}>
          <div className="h-1 w-8 rounded" style={{ background: "rgba(255,255,255,0.60)" }} />
        </div>
      </div>
    ),
  },
  {
    id: 2, name: "Glass Navbar", cat: "Navbar",
    preview: (
      <div className="w-full h-full flex flex-col" style={{ background: "#090B0F" }}>
        <div className="flex items-center justify-between px-2 py-1.5 border-b" style={{ background: "rgba(59,130,246,0.06)", backdropFilter: "blur(8px)", borderColor: "rgba(59,130,246,0.12)" }}>
          <div className="w-2.5 h-2.5 rounded" style={{ background: "rgba(59,130,246,0.70)" }} />
          <div className="flex gap-1.5">
            <div className="w-3 h-0.5 rounded" style={{ background: "rgba(255,255,255,0.22)" }} />
            <div className="w-3 h-0.5 rounded" style={{ background: "rgba(255,255,255,0.18)" }} />
          </div>
          <div className="h-2.5 w-8 rounded-full" style={{ background: "rgba(59,130,246,0.30)", border: "1px solid rgba(59,130,246,0.35)" }} />
        </div>
        <div className="flex-1 p-2">
          <div className="h-2 w-3/4 rounded" style={{ background: "rgba(255,255,255,0.12)" }} />
        </div>
      </div>
    ),
  },
  {
    id: 3, name: "Pricing", cat: "Pricing",
    preview: (
      <div className="w-full h-full p-1 flex gap-0.5 items-stretch" style={{ background: "#090B0F" }}>
        {[false, true, false].map((a, i) => (
          <div key={i} className="flex-1 h-full rounded flex flex-col items-center gap-0.5 p-0.5"
            style={a
              ? { background: "rgba(59,130,246,0.10)", border: "1px solid rgba(59,130,246,0.30)" }
              : { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="text-[5px] font-bold" style={{ color: a ? "rgba(147,197,253,0.85)" : "rgba(255,255,255,0.40)" }}>{["Starter", "Pro", "Team"][i]}</div>
            <div className="text-[7px] font-black text-white">$29</div>
            {a && <div className="h-2.5 w-full rounded-sm mt-auto" style={{ background: "#3B82F6" }} />}
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 4, name: "Auth Form", cat: "Auth",
    preview: (
      <div className="w-full h-full flex items-center justify-center" style={{ background: "#090B0F" }}>
        <div className="w-20 rounded p-1.5 space-y-1" style={{ background: "rgba(13,20,40,0.85)", border: "1px solid rgba(59,130,246,0.18)" }}>
          <div className="text-[6px] font-bold text-center" style={{ color: "rgba(147,197,253,0.75)" }}>Sign in</div>
          <div className="h-2 rounded" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(59,130,246,0.12)" }} />
          <div className="h-2 rounded" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(59,130,246,0.12)" }} />
          <div className="h-3 rounded flex items-center justify-center" style={{ background: "#3B82F6" }}>
            <div className="text-[5px] font-black" style={{ color: "#fff" }}>Sign In</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 5, name: "Dashboard", cat: "Dashboard",
    preview: (
      <div className="w-full h-full p-1 flex flex-col gap-0.5" style={{ background: "#090B0F" }}>
        <div className="grid grid-cols-3 gap-0.5">
          {[["24K", "rgba(59,130,246,0.12)"], ["89%", "rgba(255,255,255,0.05)"], ["1.4s", "rgba(255,255,255,0.04)"]].map(([v, bg]) => (
            <div key={v} className="rounded p-0.5" style={{ background: bg }}>
              <div className="text-[5px] font-bold" style={{ color: "rgba(255,255,255,0.60)" }}>{v}</div>
            </div>
          ))}
        </div>
        <div className="flex-1 rounded p-0.5 flex items-end gap-0.5" style={{ background: "rgba(255,255,255,0.03)" }}>
          {[35, 60, 45, 80, 55, 70, 90].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: h > 70 ? "#3B82F6" : "rgba(255,255,255,0.16)" }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 6, name: "Bento Grid", cat: "Hero",
    preview: (
      <div className="w-full h-full p-1 grid grid-cols-3 grid-rows-2 gap-0.5" style={{ background: "#090B0F" }}>
        {[{ span: "col-span-2", blue: true }, { span: "" }, { span: "" }, { span: "col-span-2", blue: false }].map((f, i) => (
          <div key={i} className={`${f.span} rounded`}
            style={{
              background: f.blue ? "rgba(59,130,246,0.08)" : "rgba(255,255,255,0.04)",
              border: f.blue ? "1px solid rgba(59,130,246,0.15)" : "1px solid rgba(255,255,255,0.07)"
            }} />
        ))}
      </div>
    ),
  },
];

/* ── Explore workspace ── */
function ExploreWS({ selectedIdx, setSelectedIdx }: { selectedIdx: number; setSelectedIdx: (i: number) => void }) {
  const cats = ["All", "Heroes", "Navbars", "Cards", "Auth", "Dashboard", "Pricing"];
  return (
    <div className="flex" style={{ height: "100%" }}>
      {/* Sidebar */}
      <div className="flex flex-col gap-0.5 p-3 border-r flex-shrink-0" style={{ width: "140px", background: "rgba(0,0,0,0.45)", borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.18)" }}>Categories</div>
        {cats.map((c, i) => (
          <div key={c}
            className="px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer"
            style={i === 0
              ? { color: "rgba(147,197,253,0.90)", background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.22)" }
              : { color: "rgba(255,255,255,0.35)" }}
            onMouseEnter={e => { if (i !== 0) { (e.currentTarget as HTMLDivElement).style.color = "rgba(255,255,255,0.70)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(59,130,246,0.05)"; } }}
            onMouseLeave={e => { if (i !== 0) { (e.currentTarget as HTMLDivElement).style.color = "rgba(255,255,255,0.35)"; (e.currentTarget as HTMLDivElement).style.background = "transparent"; } }}
          >
            {c}
          </div>
        ))}
        <div className="mt-auto pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="text-[9px]" style={{ color: "rgba(147,197,253,0.35)" }}>10,000+ components</div>
        </div>
      </div>
      {/* Grid */}
      <div className="flex-1 p-3 grid grid-cols-2 gap-2 overflow-hidden content-start" style={{ background: "rgba(0,0,0,0.20)" }}>
        {BROWSE_ITEMS.map((item, i) => (
          <div key={item.id} onClick={() => setSelectedIdx(i)}
            className="rounded-xl overflow-hidden cursor-pointer transition-all flex flex-col relative"
            style={{
              border: selectedIdx === i ? "1px solid rgba(59,130,246,0.40)" : "1px solid rgba(255,255,255,0.07)",
              background: selectedIdx === i ? "rgba(59,130,246,0.06)" : "rgba(0,0,0,0.30)",
              transform: selectedIdx === i ? "scale(1.01)" : "scale(1)",
              boxShadow: selectedIdx === i ? "0 0 16px rgba(59,130,246,0.15)" : "none",
              transition: "all 0.30s cubic-bezier(0.16,1,0.3,1)",
            }}>
            <div className="relative overflow-hidden" style={{ height: "110px", background: "#0A0C12" }}>
              <div className="absolute inset-0">{item.preview}</div>
              {selectedIdx === i && (
                <div className="absolute top-1.5 right-1.5 text-[8px] font-bold px-1.5 py-0.5 rounded-md"
                  style={{ background: "#3B82F6", color: "#fff" }}>Selected</div>
              )}
            </div>
            <div className="px-2.5 py-2 flex items-center justify-between" style={{ background: "rgba(0,0,0,0.40)" }}>
              <div>
                <div className="text-[10px] font-semibold" style={{ color: "rgba(255,255,255,0.75)" }}>{item.name}</div>
                <div className="text-[9px]" style={{ color: "rgba(255,255,255,0.30)" }}>{item.cat}</div>
              </div>
              <div className="text-[9px] font-mono" style={{ color: "rgba(59,130,246,0.55)" }}>↗</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Transform workspace ── */
function TransformWS({ step }: { step: number }) {
  const steps = [
    { l: "Crawling layout nodes", pct: 100, done: true },
    { l: "Extracting design DNA", pct: 100, done: step >= 1 },
    { l: "AI component analysis", pct: step >= 2 ? 75 : 0, active: step === 2 },
    { l: "Generating report", pct: 0, pending: step < 3 },
  ];
  const dnaColors = ["#1a1a2e", "#16213e", "#0f3460", "#1e40af", "#3B82F6"];
  return (
    <div className="flex" style={{ height: "100%" }}>
      <div className="flex flex-col gap-0.5 p-3 border-r flex-shrink-0" style={{ width: "140px", background: "rgba(0,0,0,0.45)", borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.18)" }}>Import Source</div>
        {["Website URL", "GitHub Repo", "Screenshot", "Figma File", "Prompt"].map((s, i) => (
          <div key={s}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10.5px] transition-all cursor-pointer"
            style={i === 0
              ? { color: "rgba(147,197,253,0.90)", background: "rgba(59,130,246,0.10)", border: "1px solid rgba(59,130,246,0.22)" }
              : { color: "rgba(255,255,255,0.28)" }}>
            <span className="text-[10px]">{["🌐", "⑂", "📷", "✦", "✨"][i]}</span>
            <span>{s}</span>
          </div>
        ))}
      </div>
      <div className="flex-1 p-4 flex flex-col gap-3" style={{ background: "rgba(0,0,0,0.20)" }}>
        <div className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: "rgba(59,130,246,0.04)", border: "1px solid rgba(59,130,246,0.14)" }}>
          <Globe className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "rgba(59,130,246,0.55)" }} />
          <span className="text-[11px] font-mono flex-1 truncate" style={{ color: "rgba(255,255,255,0.40)" }}>https://oldcorp-widgets.com</span>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg" style={{ background: "#3B82F6", color: "#fff" }}>Analyze →</span>
        </div>
        <div className="flex flex-col gap-2.5 px-1">
          {steps.map((s, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                style={s.done ? { background: "rgba(59,130,246,0.18)", border: "1px solid rgba(59,130,246,0.45)" }
                  : s.active ? { background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.28)" }
                  : { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {s.done && <Check className="w-2 h-2" style={{ color: "#93C5FD" }} />}
                {s.active && <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#3B82F6", animation: "pulse 1.5s ease-in-out infinite" }} />}
              </div>
              <div className="flex-1">
                <div className="text-[11px] font-medium" style={{ color: s.done ? "rgba(255,255,255,0.50)" : s.active ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.22)" }}>{s.l}</div>
                <div className="h-0.5 rounded-full mt-1.5 overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
                  <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: "rgba(59,130,246,0.70)", transition: "width 0.8s cubic-bezier(0.16,1,0.3,1)" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-auto rounded-xl p-3" style={{ background: "rgba(59,130,246,0.04)", border: "1px solid rgba(59,130,246,0.12)" }}>
          <div className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(147,197,253,0.40)" }}>Design DNA Extracted</div>
          <div className="flex items-center gap-2">
            {dnaColors.map(c => (
              <div key={c} className="rounded-lg" style={{ width: "24px", height: "24px", backgroundColor: c, border: "1px solid rgba(59,130,246,0.15)" }} />
            ))}
            <span className="ml-auto text-[9px] font-mono" style={{ color: "rgba(147,197,253,0.40)" }}>Score: 8.4 / 10</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Create workspace ── */
function CreateWS({ buildStep }: { buildStep: number }) {
  const steps = ["Analyzing prompt", "Selecting components", "Building layout", "Applying theme"];
  return (
    <div className="flex" style={{ height: "100%" }}>
      <div className="flex flex-col gap-0.5 p-3 border-r flex-shrink-0" style={{ width: "140px", background: "rgba(0,0,0,0.45)", borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.18)" }}>Create From</div>
        {["AI Prompt", "Screenshot", "Figma", "Inspiration"].map((s, i) => (
          <div key={s}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10.5px] transition-all cursor-pointer"
            style={i === 0
              ? { color: "rgba(147,197,253,0.90)", background: "rgba(59,130,246,0.10)", border: "1px solid rgba(59,130,246,0.22)" }
              : { color: "rgba(255,255,255,0.28)" }}>
            <span className="text-[10px]">{["✨", "📷", "✦", "💡"][i]}</span>
            <span>{s}</span>
          </div>
        ))}
      </div>
      <div className="flex-1 p-4 flex flex-col gap-4" style={{ background: "rgba(0,0,0,0.20)" }}>
        <div className="rounded-xl p-3" style={{ background: "rgba(59,130,246,0.04)", border: "1px solid rgba(59,130,246,0.12)" }}>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5" style={{ color: "rgba(147,197,253,0.60)" }} />
            <span className="text-[10px] font-bold" style={{ color: "rgba(147,197,253,0.60)" }}>AI Prompt</span>
          </div>
          <div className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>&ldquo;Dark SaaS landing page with bento feature grid, minimal typography, and a hero workspace demo...&rdquo;</div>
        </div>
        <div className="flex flex-col gap-3 px-1">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                style={i < buildStep ? { background: "rgba(59,130,246,0.18)", border: "1px solid rgba(59,130,246,0.45)" }
                  : i === buildStep ? { background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.28)" }
                  : { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {i < buildStep && <Check className="w-2 h-2" style={{ color: "#93C5FD" }} />}
                {i === buildStep && <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#3B82F6", animation: "pulse 1.5s ease-in-out infinite" }} />}
              </div>
              <span className="text-[11px] font-medium" style={{ color: i < buildStep ? "rgba(255,255,255,0.40)" : i === buildStep ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.20)" }}>
                {s}
              </span>
            </div>
          ))}
        </div>
        {buildStep >= 2 && (
          <div className="mt-auto rounded-xl overflow-hidden" style={{ background: "#0D0F14", border: "1px solid rgba(59,130,246,0.18)", opacity: buildStep >= 3 ? 1 : 0.5, transition: "opacity 0.6s ease" }}>
            <div className="px-3 py-2 flex items-center justify-between border-b" style={{ borderColor: "rgba(59,130,246,0.10)" }}>
              <div className="h-2 w-12 rounded" style={{ background: "rgba(255,255,255,0.28)" }} />
              <div className="h-5 w-16 rounded-full" style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.28)" }} />
            </div>
            <div className="p-3 space-y-2">
              <div className="h-3 w-2/3 rounded" style={{ background: "rgba(255,255,255,0.10)" }} />
              <div className="h-2 w-1/2 rounded" style={{ background: "rgba(255,255,255,0.06)" }} />
              <div className="h-6 w-24 rounded-full mt-3" style={{ background: "#3B82F6" }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type ExploreTab = "explore" | "transform" | "create";
interface HeroSectionProps { onPillClick?: (tab: ExploreTab) => void; }

export default function HeroSection({ onPillClick }: HeroSectionProps) {
  const [wsState, setWsState] = useState<WsState>("explore");
  const [transitioning, setTrans] = useState(false);
  const [paused, setPaused] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [transformStep, setTransformStep] = useState(0);
  const [buildStep, setBuildStep] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Entrance animation trigger */
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  /* Idle micro-animations inside workspace */
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (wsState === "explore") {
      t = setInterval(() => setSelectedIdx(i => (i + 1) % BROWSE_ITEMS.length), 2200);
    } else if (wsState === "transform") {
      t = setInterval(() => setTransformStep(s => (s + 1) % 4), 1200);
    } else {
      t = setInterval(() => setBuildStep(s => (s + 1) % 4), 1400);
    }
    return () => clearInterval(t);
  }, [wsState]);

  const cycleState = useCallback(() => {
    setTrans(true);
    setTimeout(() => {
      setWsState(p => {
        const i = WS_STATES.indexOf(p);
        const next = WS_STATES[(i + 1) % WS_STATES.length];
        setTransformStep(0);
        setBuildStep(0);
        return next;
      });
      setTrans(false);
    }, 400);
  }, []);

  useEffect(() => {
    if (paused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(cycleState, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, cycleState]);

  function handleMouseEnter() {
    setPaused(true);
    if (resumeRef.current) clearTimeout(resumeRef.current);
  }

  function handleMouseLeave() {
    if (resumeRef.current) clearTimeout(resumeRef.current);
    resumeRef.current = setTimeout(() => setPaused(false), 3000);
  }

  const WS_META = {
    explore:   { label: "Exploring components",  breadcrumb: "Heroes",      status: "12 selected · 10k+ library" },
    transform: { label: "Transforming website",  breadcrumb: "Website URL", status: "4 steps · avg 1.4s" },
    create:    { label: "Creating project",      breadcrumb: "AI Prompt",   status: "Generated in 2.1s" },
  };
  const meta = WS_META[wsState];

  const HEADLINE_WORDS = ["Build", "Anything.", "Transform", "Everything."];

  return (
    <section
      id="hero"
      style={{ background: "#050816", paddingTop: "84px", position: "relative", overflow: "hidden" }}
    >
      {/* ── Ambient drift orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Orb 1 — blue, top-left */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "-5%",
            width: "60vw",
            height: "60vw",
            maxWidth: "700px",
            maxHeight: "700px",
            background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 65%)",
            animation: "drift1 18s ease-in-out infinite",
            willChange: "transform",
          }}
        />
        {/* Orb 2 — purple, bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: "-5%",
            right: "-5%",
            width: "50vw",
            height: "50vw",
            maxWidth: "600px",
            maxHeight: "600px",
            background: "radial-gradient(circle, rgba(124,92,255,0.05) 0%, transparent 65%)",
            animation: "drift2 22s ease-in-out infinite alternate",
            willChange: "transform",
          }}
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(59,130,246,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.025) 1px,transparent 1px)",
        backgroundSize: "80px 80px",
        maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 20%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 20%, transparent 80%)",
      }} />

      {/* ── Hero text ── */}
      <div className="relative z-10 text-center px-4 pt-20 pb-10">

        {/* Announcement pill */}
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium mb-8"
          style={{
            background: "rgba(59,130,246,0.08)",
            border: "1px solid rgba(59,130,246,0.22)",
            color: "rgba(147,197,253,0.75)",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "scale(1)" : "scale(0.95)",
            transition: "opacity 400ms ease, transform 400ms ease",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#4ade80", animation: "pulseGreen 2s ease-in-out infinite" }} />
          Morphix Workspace — Now in Beta
        </div>

        {/* Headline — word-by-word reveal */}
        <h1
          className="tracking-tight text-white leading-[0.92] mb-6"
          style={{ fontSize: "clamp(3rem,7.5vw,6rem)", fontWeight: 300 }}
        >
          {HEADLINE_WORDS.map((word, i) => (
            <span
              key={word + i}
              className="inline-block mr-[0.25em]"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 700ms cubic-bezier(0.16,1,0.3,1) ${i * 60 + 100}ms, transform 700ms cubic-bezier(0.16,1,0.3,1) ${i * 60 + 100}ms`,
              }}
            >
              {word === "Transform" || word === "Everything." ? (
                <span style={{
                  background: "linear-gradient(135deg, #93C5FD 0%, #3B82F6 50%, #60A5FA 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  {word}
                </span>
              ) : word}
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <p
          className="max-w-lg mx-auto leading-relaxed mb-10 font-light text-base sm:text-lg"
          style={{
            color: "rgba(255,255,255,0.42)",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 500ms ease 400ms, transform 500ms ease 400ms",
          }}
        >
          Explore components, transform existing websites,<br />
          or create entirely new experiences inside Morphix.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap justify-center gap-3"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 500ms ease 600ms, transform 500ms ease 600ms",
          }}
        >
          <a href="#explore"
            className="flex items-center gap-2 px-7 py-2.5 text-sm font-semibold rounded-full transition-all duration-200"
            style={{ background: "#ffffff", color: "#000000" }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 6px 24px rgba(255,255,255,0.18), inset 0 0 0 1px rgba(255,255,255,0.2)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Open Workspace <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <a href="#starting-points"
            className="flex items-center gap-2 px-7 py-2.5 text-sm font-medium rounded-full transition-all duration-200"
            style={{ color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.10)" }}
            onMouseEnter={e => {
              e.currentTarget.style.color = "rgba(255,255,255,0.80)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.20)";
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = "rgba(255,255,255,0.45)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            See It In Action
          </a>
        </div>
      </div>

      {/* ── Workspace chrome ── */}
      <div
        className="relative z-10 px-4 pb-16 max-w-[1160px] mx-auto"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 900ms ease 400ms, transform 900ms cubic-bezier(0.16,1,0.3,1) 400ms",
        }}
      >
        {/* State indicator dots — pill style */}
        <div className="flex justify-center items-center gap-2 mb-5">
          {WS_STATES.map(s => (
            <button key={s} onClick={() => { setWsState(s); setTrans(false); setBuildStep(0); setTransformStep(0); }}
              className="rounded-full transition-all"
              style={{
                width: wsState === s ? "22px" : "5px",
                height: "5px",
                background: wsState === s ? "#3B82F6" : "rgba(255,255,255,0.16)",
                boxShadow: wsState === s ? "0 0 8px rgba(59,130,246,0.5)" : "none",
                transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                border: "none",
                cursor: "pointer",
              }} />
          ))}
        </div>

        {/* Chrome window */}
        <div className="rounded-2xl overflow-hidden" style={{
          background: "#080B14",
          border: "1px solid rgba(59,130,246,0.12)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.70), 0 8px 24px rgba(0,0,0,0.40), 0 0 0 1px rgba(59,130,246,0.06)",
        }}>
          {/* Title bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b" style={{ background: "rgba(0,0,0,0.55)", borderColor: "rgba(59,130,246,0.08)" }}>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28ca41" }} />
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-md" style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.12)" }}>
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#4ade80", animation: "pulseGreen 2s ease-in-out infinite" }} />
              <span className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.30)" }}>
                studio.morphix.ai — {wsState}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.28)" }}>
                {meta.label}
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded font-mono" style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)", color: "rgba(147,197,253,0.45)" }}>⌘K</span>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center gap-1 px-5 py-1.5 border-b" style={{ background: "rgba(0,0,0,0.38)", borderColor: "rgba(255,255,255,0.04)" }}>
            <span className="text-[8.5px] font-mono" style={{ color: "rgba(255,255,255,0.16)" }}>Workspace</span>
            <span className="text-[8.5px] mx-0.5" style={{ color: "rgba(255,255,255,0.10)" }}>/</span>
            <span className="text-[8.5px] font-mono capitalize" style={{ color: "rgba(255,255,255,0.16)" }}>{wsState}</span>
            <span className="text-[8.5px] mx-0.5" style={{ color: "rgba(255,255,255,0.10)" }}>/</span>
            <span className="text-[8.5px] font-mono" style={{ color: "rgba(147,197,253,0.45)" }}>{meta.breadcrumb}</span>
          </div>

          {/* Workspace body */}
          <div style={{
            height: "520px",
            display: "flex",
            flexDirection: "column",
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? "scale(0.990) translateY(6px)" : "scale(1) translateY(0)",
            transition: "opacity 0.40s cubic-bezier(0.16,1,0.3,1), transform 0.40s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <div style={{ flex: 1, minHeight: 0 }}>
              {wsState === "explore"   && <ExploreWS selectedIdx={selectedIdx} setSelectedIdx={setSelectedIdx} />}
              {wsState === "transform" && <TransformWS step={transformStep} />}
              {wsState === "create"    && <CreateWS buildStep={buildStep} />}
            </div>
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between px-5 py-1.5 border-t" style={{ background: "rgba(0,0,0,0.48)", borderColor: "rgba(59,130,246,0.08)" }}>
            <div className="flex items-center gap-3 font-mono" style={{ fontSize: "8px", color: "rgba(255,255,255,0.18)" }}>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full inline-block" style={{ background: "#4ade80", animation: "pulseGreen 2s ease-in-out infinite" }} />
                studio.morphix.ai
              </span>
              <span style={{ color: "rgba(255,255,255,0.10)" }}>·</span>
              <span>{meta.status}</span>
              <span style={{ color: "rgba(255,255,255,0.10)" }}>·</span>
              <span>v2.4.1</span>
            </div>
            <span className="font-mono" style={{ fontSize: "8px", color: "rgba(255,255,255,0.12)" }}>
              {paused ? "paused" : "auto-cycling"}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom footnote */}
      <div className="relative z-10 text-center pb-8 font-mono" style={{ fontSize: "10px", color: "rgba(255,255,255,0.13)" }}>
        ↓ No credit card · Free plan · Export React + Tailwind + Next.js
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes pulseGreen { 0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(16,185,129,0.4); } 50% { opacity: 0.75; box-shadow: 0 0 0 5px rgba(16,185,129,0); } }
        @keyframes drift1 { 0%,100%{ transform: translate(0,0) scale(1); } 33%{ transform: translate(40px,-30px) scale(1.05); } 66%{ transform: translate(-20px,40px) scale(0.97); } }
        @keyframes drift2 { 0%,100%{ transform: translate(0,0) scale(1); } 50%{ transform: translate(-50px,30px) scale(1.03); } }
      `}</style>
    </section>
  );
}
