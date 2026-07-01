"use client";

import { useState, useEffect, useRef } from "react";
import { Globe, Sparkles, Check, Search } from "lucide-react";


/* ── In-view hook ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── Explore card preview ── */
function ExplorePreview() {
  const [activeIdx, setActiveIdx] = useState(0);
  const items = ["Gradient Hero", "Glass Navbar", "Pricing Table", "Auth Form", "Dashboard", "Bento Grid"];
  const cats = ["All", "Heroes", "Navbars", "Cards"];

  useEffect(() => {
    const t = setInterval(() => setActiveIdx(i => (i + 1) % items.length), 1800);
    return () => clearInterval(t);
  }, [items.length]);

  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#07090E" }}>
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b" style={{ borderColor: "rgba(59,130,246,0.10)", background: "rgba(0,0,0,0.35)" }}>
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-2.5 h-2.5" style={{ color: "rgba(59,130,246,0.45)" }} />
          <div className="w-full pl-6 pr-2 py-1 rounded-lg text-[8px] font-mono" style={{ background: "rgba(59,130,246,0.05)", border: "1px solid rgba(59,130,246,0.12)", color: "rgba(147,197,253,0.50)" }}>
            Search 10,000+ components...
          </div>
        </div>
        <div className="flex gap-1">
          {cats.map((c, i) => (
            <div key={c} className="px-1.5 py-0.5 rounded text-[7px] font-bold transition-all"
              style={i === 0
                ? { background: "#3B82F6", color: "#fff" }
                : { background: "rgba(59,130,246,0.06)", color: "rgba(147,197,253,0.45)", border: "1px solid rgba(59,130,246,0.12)" }}>
              {c}
            </div>
          ))}
        </div>
      </div>
      {/* Grid */}
      <div className="flex-1 p-2 grid grid-cols-3 gap-1.5 overflow-hidden">
        {items.map((name, i) => (
          <div key={name}
            className="rounded-lg overflow-hidden transition-all cursor-pointer"
            style={{
              border: activeIdx === i ? "1px solid rgba(59,130,246,0.45)" : "1px solid rgba(255,255,255,0.06)",
              background: activeIdx === i ? "rgba(59,130,246,0.08)" : "rgba(255,255,255,0.02)",
              transform: activeIdx === i ? "scale(1.02)" : "scale(1)",
              boxShadow: activeIdx === i ? "0 0 12px rgba(59,130,246,0.20)" : "none",
              transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
            }}>
            <div className="h-10 relative overflow-hidden" style={{ background: i % 2 === 0 ? "#0D0F14" : "#090B12" }}>
              {activeIdx === i && (
                <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.10) 0%, transparent 70%)" }} />
              )}
            </div>
            <div className="px-1 py-0.5" style={{ background: "rgba(0,0,0,0.40)" }}>
              <div className="text-[6.5px] font-bold truncate" style={{ color: activeIdx === i ? "rgba(147,197,253,0.80)" : "rgba(255,255,255,0.35)" }}>{name}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-3 py-1.5 border-t flex items-center justify-between" style={{ borderColor: "rgba(59,130,246,0.10)", background: "rgba(0,0,0,0.30)" }}>
        <span className="text-[7px] font-mono" style={{ color: "rgba(147,197,253,0.40)" }}>10,000+ components</span>
        <span className="text-[7px] font-bold" style={{ color: "rgba(59,130,246,0.65)" }}>Browse →</span>
      </div>
    </div>
  );
}

/* ── Transform card preview ── */
function TransformPreview() {
  const [pipelineStep, setPipelineStep] = useState(0);
  const steps = [
    { label: "Crawling layout nodes" },
    { label: "Extracting design DNA" },
    { label: "Matching components" },
    { label: "Generating report" },
  ];

  useEffect(() => {
    const t = setInterval(() => setPipelineStep(s => (s + 1) % (steps.length + 1)), 1400);
    return () => clearInterval(t);
  }, [steps.length]);

  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#07090E" }}>
      {/* URL bar */}
      <div className="px-3 py-2 border-b" style={{ borderColor: "rgba(59,130,246,0.10)", background: "rgba(0,0,0,0.35)" }}>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg" style={{ background: "rgba(59,130,246,0.04)", border: "1px solid rgba(59,130,246,0.14)" }}>
          <Globe className="w-2.5 h-2.5 flex-shrink-0" style={{ color: "rgba(59,130,246,0.55)" }} />
          <span className="text-[8px] font-mono flex-1" style={{ color: "rgba(255,255,255,0.38)" }}>https://oldcorp-widgets.com</span>
          <span className="px-1.5 py-0.5 text-[7px] font-bold rounded" style={{ background: "#3B82F6", color: "#fff" }}>Analyze</span>
        </div>
      </div>
      {/* Pipeline */}
      <div className="flex-1 p-2.5 flex flex-col gap-1.5">
        {steps.map((s, i) => {
          const done = i < pipelineStep;
          const active = i === pipelineStep;
          return (
            <div key={s.label} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full flex-shrink-0 flex items-center justify-center transition-all"
                style={{
                  background: done ? "rgba(59,130,246,0.18)" : active ? "rgba(59,130,246,0.06)" : "rgba(255,255,255,0.03)",
                  border: done ? "1px solid rgba(59,130,246,0.45)" : active ? "1px solid rgba(59,130,246,0.28)" : "1px solid rgba(255,255,255,0.07)",
                  transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                }}>
                {done && <Check className="w-1.5 h-1.5" style={{ color: "#93C5FD" }} />}
                {active && <span className="w-1 h-1 rounded-full inline-block" style={{ background: "#3B82F6", animation: "pulse 1.5s ease-in-out infinite" }} />}
              </div>
              <div className="flex-1">
                <div className="text-[8px] transition-all" style={{ color: done ? "rgba(255,255,255,0.45)" : active ? "rgba(255,255,255,0.80)" : "rgba(255,255,255,0.22)" }}>{s.label}</div>
                <div className="h-0.5 rounded-full mt-0.5 overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
                  <div className="h-full rounded-full transition-all" style={{
                    width: done ? "100%" : active ? "60%" : "0%",
                    background: "#3B82F6",
                    transition: "width 0.8s cubic-bezier(0.16,1,0.3,1)",
                  }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* DNA strip */}
      <div className="px-3 py-2 border-t" style={{ borderColor: "rgba(59,130,246,0.10)", background: "rgba(0,0,0,0.30)" }}>
        <div className="text-[7px] font-bold uppercase tracking-wider mb-1" style={{ color: "rgba(147,197,253,0.40)" }}>Design DNA</div>
        <div className="flex gap-1">
          {["#1a1a2e", "#0f3460", "#16213e", "#1e40af", "#3B82F6"].map(c => (
            <div key={c} className="w-4 h-4 rounded transition-all hover:scale-110" style={{ backgroundColor: c, border: "1px solid rgba(59,130,246,0.18)" }} />
          ))}
          <span className="ml-auto text-[7px] self-center" style={{ color: "rgba(147,197,253,0.35)" }}>Score: 8.4</span>
        </div>
      </div>
    </div>
  );
}

/* ── Create card preview ── */
function CreatePreview() {
  const [buildStep, setBuildStep] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const steps = ["Analyzing prompt", "Selecting components", "Building layout", "Applying theme"];

  useEffect(() => {
    const t = setInterval(() => setBuildStep(s => (s + 1) % (steps.length + 1)), 1600);
    return () => clearInterval(t);
  }, [steps.length]);

  useEffect(() => {
    const t = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#07090E" }}>
      {/* Prompt input */}
      <div className="p-3 border-b" style={{ borderColor: "rgba(59,130,246,0.10)", background: "rgba(0,0,0,0.35)" }}>
        <div className="flex items-start gap-2 mb-2">
          <Sparkles className="w-2.5 h-2.5 flex-shrink-0 mt-0.5" style={{ color: "rgba(59,130,246,0.60)" }} />
          <div className="text-[8px] leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            &ldquo;Dark SaaS landing page with bento features...
            <span style={{ opacity: cursorVisible ? 1 : 0, transition: "opacity 0.1s", color: "#3B82F6" }}>|</span>
            &rdquo;
          </div>
        </div>
        <div className="flex gap-1">
          {["Screenshot", "Figma", "Prompt"].map((m, i) => (
            <div key={m} className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[7px] font-semibold transition-all"
              style={i === 2
                ? { background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.28)", color: "rgba(147,197,253,0.85)" }
                : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.28)" }}>
              {m}
            </div>
          ))}
        </div>
      </div>
      {/* Build steps */}
      <div className="flex-1 p-2.5 flex flex-col gap-1.5">
        {steps.map((s, i) => {
          const done = i < buildStep;
          const active = i === buildStep;
          return (
            <div key={s} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full flex-shrink-0 flex items-center justify-center transition-all"
                style={{
                  background: done ? "rgba(59,130,246,0.18)" : active ? "rgba(59,130,246,0.06)" : "rgba(255,255,255,0.02)",
                  border: done ? "1px solid rgba(59,130,246,0.45)" : active ? "1px solid rgba(59,130,246,0.28)" : "1px solid rgba(255,255,255,0.06)",
                  transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                }}>
                {done && <Check className="w-1.5 h-1.5" style={{ color: "#93C5FD" }} />}
                {active && <span className="w-1 h-1 rounded-full inline-block" style={{ background: "#3B82F6", animation: "pulse 1.5s ease-in-out infinite" }} />}
              </div>
              <span className="text-[8px] transition-all" style={{ color: done ? "rgba(255,255,255,0.40)" : active ? "rgba(255,255,255,0.80)" : "rgba(255,255,255,0.18)" }}>
                {s}
              </span>
            </div>
          );
        })}
      </div>
      {/* Generated preview strip */}
      {buildStep >= 2 && (
        <div className="mx-3 mb-2.5 rounded-lg overflow-hidden h-12 transition-all"
          style={{ background: "#0D0F14", border: "1px solid rgba(59,130,246,0.18)", opacity: buildStep >= 3 ? 1 : 0.5, transition: "opacity 0.6s ease" }}>
          <div className="p-2 flex flex-col gap-1">
            <div className="flex justify-between">
              <div className="h-1.5 w-10 rounded" style={{ background: "rgba(255,255,255,0.25)" }} />
              <div className="h-3 w-8 rounded" style={{ background: "rgba(59,130,246,0.25)", border: "1px solid rgba(59,130,246,0.30)" }} />
            </div>
            <div className="h-2 w-2/3 rounded" style={{ background: "rgba(255,255,255,0.08)" }} />
          </div>
        </div>
      )}
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }`}</style>
    </div>
  );
}

const CARDS = [
  {
    id: "explore",
    emoji: "🧩",
    label: "Explore",
    copy: "Browse components, templates, and design systems.",
    badge: "10,000+ components",
    Preview: ExplorePreview,
  },
  {
    id: "transform",
    emoji: "🌐",
    label: "Transform",
    copy: "Import any website and customize every detail with AI.",
    badge: "Powered by 10,000+ components.",
    Preview: TransformPreview,
  },
  {
    id: "create",
    emoji: "✨",
    label: "Create",
    copy: "Build entirely new websites from scratch.",
    badge: "Powered by 10,000+ components.",
    Preview: CreatePreview,
  },
];

interface ChooseStartingPointProps {
  onCardClick?: (tab: "explore" | "transform" | "create") => void;
}

export default function ChooseStartingPoint({ onCardClick }: ChooseStartingPointProps) {
  const { ref, inView } = useInView(0.15);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section
      ref={ref as any}
      id="starting-points"
      className="relative border-t"
      style={{ background: "#050816", borderColor: "rgba(255,255,255,0.06)", paddingTop: "7rem", paddingBottom: "7rem" }}
    >
      {/* Subtle blue top glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 30% at 50% 0%, rgba(59,130,246,0.04) 0%, transparent 65%)",
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Section header */}
        <div
          className="text-center max-w-2xl mx-auto mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 600ms cubic-bezier(0.16,1,0.3,1), transform 600ms cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <h2
            className="text-white tracking-tight mb-4 leading-tight"
            style={{ fontSize: "clamp(2.2rem,5vw,3.5rem)", fontWeight: 300 }}
          >
            Choose Your Starting Point
          </h2>
          <p className="text-base sm:text-lg" style={{ color: "rgba(255,255,255,0.38)", fontWeight: 400 }}>
            Three ways to enter Morphix. One evolving workspace.
          </p>
        </div>

        {/* Three cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {CARDS.map((card, cardIdx) => {
            const isHovered = hoveredCard === card.id;
            const Preview = card.Preview;
            return (
              <div
                key={card.id}
                onClick={() => onCardClick?.(card.id as "explore" | "transform" | "create")}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative rounded-2xl overflow-hidden cursor-pointer flex flex-col"
                style={{
                  background: isHovered
                    ? "linear-gradient(145deg, rgba(11,16,32,1) 0%, rgba(9,13,26,1) 100%)"
                    : "#0B1020",
                  border: isHovered ? "1px solid rgba(59,130,246,0.30)" : "1px solid rgba(255,255,255,0.06)",
                  transform: isHovered ? "translateY(-3px)" : "translateY(0)",
                  transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                  boxShadow: isHovered
                    ? "0 20px 60px rgba(0,0,0,0.50), 0 0 0 1px rgba(59,130,246,0.10), 0 0 40px rgba(59,130,246,0.08)"
                    : "0 4px 16px rgba(0,0,0,0.30)",
                  opacity: inView ? 1 : 0,
                  transitionDelay: inView ? `${cardIdx * 80}ms` : "0ms",
                }}
              >
                {/* Blue top edge accent on hover */}
                <div
                  style={{
                    position: "absolute",
                    top: 0, left: "10%", right: "10%",
                    height: "1px",
                    background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.50), transparent)",
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.25s ease",
                  }}
                />

                {/* Visual — preview area */}
                <div
                  className="rounded-xl overflow-hidden mx-4 mt-4 transition-all duration-300"
                  style={{
                    height: "240px",
                    border: isHovered ? "1px solid rgba(59,130,246,0.18)" : "1px solid rgba(255,255,255,0.06)",
                    boxShadow: isHovered ? "0 0 20px rgba(59,130,246,0.10) inset" : "none",
                  }}
                >
                  <Preview />
                </div>

                {/* Label + copy */}
                <div className="px-5 py-5 mt-auto flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{card.emoji}</span>
                    <div
                      className="tracking-tight"
                      style={{ fontSize: "1.15rem", fontWeight: 500, color: isHovered ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.88)", transition: "color 0.2s ease" }}
                    >
                      {card.label}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.40)", fontWeight: 400 }}>
                    {card.copy}
                  </p>
                  {/* Bottom badge */}
                  <div className="mt-1 pt-3 border-t flex items-center justify-between" style={{ borderColor: "rgba(59,130,246,0.08)" }}>
                    <span className="text-[10px] font-mono" style={{ color: isHovered ? "rgba(147,197,253,0.55)" : "rgba(255,255,255,0.22)", transition: "color 0.2s ease" }}>
                      {card.badge}
                    </span>
                    <span
                      className="text-[11px] font-semibold transition-all duration-200"
                      style={{
                        color: isHovered ? "#3B82F6" : "rgba(255,255,255,0.22)",
                        transform: isHovered ? "translateX(2px)" : "translateX(0)",
                      }}
                    >
                      Open →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
