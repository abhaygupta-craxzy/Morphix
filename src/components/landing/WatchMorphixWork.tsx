"use client";

import { useState, useEffect, useRef } from "react";


function BeforeWebsite() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#0D1117" }}>
      {/* Dark navbar */}
      <div className="flex items-center justify-between px-5 py-3 border-b"
        style={{ background: "#161B27", borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.25)" }}>
            <span className="text-[10px] font-black" style={{ color: "#93C5FD" }}>GC</span>
          </div>
          <span className="font-bold text-xs tracking-widest" style={{ color: "#F1F5F9", fontFamily: "sans-serif" }}>GLOBALCORP™</span>
        </div>
        <div className="hidden sm:flex gap-4 text-[9px] font-medium" style={{ color: "#64748B" }}>
          {["HOME", "PRODUCTS", "ABOUT US", "CONTACT"].map(l => (
            <span key={l} className="cursor-pointer transition-colors hover:text-slate-300">{l}</span>
          ))}
        </div>
        <div className="text-[8px] px-3 py-1.5 font-semibold rounded-full"
          style={{ background: "rgba(59,130,246,0.12)", color: "#93C5FD", border: "1px solid rgba(59,130,246,0.25)" }}>
          GET QUOTE
        </div>
      </div>

      {/* Dark hero */}
      <div className="px-6 py-5 border-b" style={{ background: "#111827", borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-3xl">
          <div className="text-[8px] font-bold uppercase tracking-widest mb-1" style={{ color: "#64748B" }}>WELCOME TO GLOBALCORP</div>
          <div className="font-bold text-base mb-2 leading-tight" style={{ color: "#F1F5F9" }}>
            Industry-Leading Solutions<br />For Your Business Since 1987
          </div>
          <div className="text-[9px] mb-3 leading-relaxed" style={{ color: "#94A3B8", maxWidth: "320px" }}>
            We provide comprehensive business solutions with over 35 years of proven experience. Our dedicated team of professionals delivers results.
          </div>
          <div className="flex gap-2">
            <div className="text-[8px] px-4 py-2 font-semibold rounded"
              style={{ background: "rgba(59,130,246,0.15)", color: "#93C5FD", border: "1px solid rgba(59,130,246,0.28)" }}>
              LEARN MORE
            </div>
            <div className="text-[8px] px-4 py-2 font-semibold rounded"
              style={{ background: "transparent", color: "#94A3B8", border: "1px solid rgba(255,255,255,0.12)" }}>
              VIEW PRODUCTS
            </div>
          </div>
        </div>
      </div>

      {/* Dark stats strip */}
      <div className="grid grid-cols-3" style={{ background: "#0B1020", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {[
          { title: "35+ Years", sub: "In Business" },
          { title: "500+ Clients", sub: "Worldwide" },
          { title: "24/7 Support", sub: "Available" },
        ].map((s, i) => (
          <div key={s.title} className="flex flex-col items-center justify-center py-3"
            style={{ borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
            <div className="font-bold text-sm" style={{ color: "#F1F5F9" }}>{s.title}</div>
            <div className="text-[8px]" style={{ color: "#64748B" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Dark content */}
      <div className="flex flex-1 gap-0 overflow-hidden">
        <div className="flex-1 p-4">
          <div className="font-bold text-[10px] mb-2" style={{ color: "#94A3B8" }}>OUR PRODUCTS & SERVICES</div>
          <div className="grid grid-cols-2 gap-2">
            {["Product A", "Product B", "Service C", "Support D"].map(p => (
              <div key={p} className="p-2 rounded-lg transition-all cursor-pointer"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(59,130,246,0.20)"}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)"}
              >
                <div className="w-5 h-5 mb-1 rounded-md" style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.18)" }} />
                <div className="text-[8px] font-bold" style={{ color: "#F1F5F9" }}>{p}</div>
                <div className="text-[7px] mt-0.5" style={{ color: "#64748B" }}>Enterprise solution</div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-28 border-l p-3" style={{ background: "#0D1117", borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="font-bold text-[9px] mb-2" style={{ color: "#94A3B8" }}>QUICK LINKS</div>
          {["→ Downloads", "→ FAQ", "→ Support", "→ Partners", "→ Careers"].map(l => (
            <div key={l} className="text-[8px] mb-1.5 cursor-pointer transition-colors"
              style={{ color: "#475569" }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.color = "#94A3B8"}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.color = "#475569"}
            >
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── DNA panel ── */
function DNAPanel({ progress }: { progress: number }) {
  const colors = ["#1a1a2e", "#16213e", "#0f3460", "#1e40af", "#3B82F6", "#93C5FD"];
  const fonts = [
    { name: "Inter", role: "Primary", weight: "400–700" },
    { name: "Inter", role: "Body", weight: "400" },
    { name: "Mono", role: "Code", weight: "400" },
  ];
  const spacing = ["4", "8", "12", "16", "24", "32", "48"];
  const components = ["Navigation", "Hero", "Features", "Pricing", "Footer"];

  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#080B14" }}>
      <div className="px-5 py-3 border-b flex items-center justify-between" style={{ borderColor: "rgba(59,130,246,0.10)", background: "rgba(0,0,0,0.40)" }}>
        <span className="text-xs font-bold tracking-wider" style={{ color: "rgba(147,197,253,0.55)" }}>DESIGN DNA EXTRACTION</span>
        <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.30)" }}>{Math.round(progress * 100)}%</span>
      </div>

      <div className="flex-1 p-5 grid grid-cols-2 gap-5 overflow-hidden">
        {/* Colors */}
        <div style={{ opacity: progress > 0.1 ? 1 : 0.2, transition: "opacity 0.6s ease" }}>
          <div className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(147,197,253,0.40)" }}>Color System</div>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {colors.map((c, i) => (
              <div key={c} className="rounded-lg transition-all" style={{
                width: "28px", height: "28px",
                backgroundColor: c,
                border: "1px solid rgba(59,130,246,0.15)",
                opacity: i / colors.length < progress ? 1 : 0.15,
                transform: i / colors.length < progress ? "scale(1)" : "scale(0.7)",
                transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
              }} />
            ))}
          </div>
          <div className="text-[8px]" style={{ color: "rgba(255,255,255,0.25)" }}>6 tokens extracted</div>
        </div>

        {/* Typography */}
        <div style={{ opacity: progress > 0.3 ? 1 : 0.2, transition: "opacity 0.6s ease 0.2s" }}>
          <div className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(147,197,253,0.40)" }}>Typography</div>
          <div className="space-y-2">
            {fonts.map((f, i) => (
              <div key={f.role} className="flex items-center gap-2 transition-all"
                style={{ opacity: i / fonts.length < progress ? 1 : 0.2, transition: "opacity 0.4s ease" }}>
                <div className="text-xs font-bold text-white" style={{ minWidth: "70px" }}>{f.name}</div>
                <div className="text-[8px]" style={{ color: "rgba(255,255,255,0.28)" }}>{f.weight}</div>
                <div className="text-[8px] ml-auto" style={{ color: "rgba(147,197,253,0.35)" }}>{f.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Spacing */}
        <div style={{ opacity: progress > 0.55 ? 1 : 0.2, transition: "opacity 0.6s ease 0.4s" }}>
          <div className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(147,197,253,0.40)" }}>Spacing Scale</div>
          <div className="flex items-end gap-1.5">
            {spacing.map((s, i) => (
              <div key={s} className="flex flex-col items-center gap-1">
                <div className="rounded-sm transition-all" style={{
                  width: "6px",
                  height: `${Number(s) * 0.9 + 4}px`,
                  background: "rgba(59,130,246,0.55)",
                  opacity: i / spacing.length < progress ? 1 : 0.1,
                  transition: "opacity 0.3s ease",
                }} />
                <div className="text-[5px]" style={{ color: "rgba(255,255,255,0.22)" }}>{s}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Component map */}
        <div style={{ opacity: progress > 0.75 ? 1 : 0.2, transition: "opacity 0.6s ease 0.6s" }}>
          <div className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(147,197,253,0.40)" }}>Components Found</div>
          <div className="space-y-1">
            {components.map((c, i) => (
              <div key={c} className="flex items-center gap-2 transition-all"
                style={{ opacity: i / components.length < progress ? 1 : 0.1, transition: "opacity 0.3s ease" }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#3B82F6" }} />
                <span className="text-[9px]" style={{ color: "rgba(147,197,253,0.65)" }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-5 py-3 border-t" style={{ borderColor: "rgba(59,130,246,0.10)", background: "rgba(0,0,0,0.30)" }}>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] font-mono" style={{ color: "rgba(255,255,255,0.28)" }}>Analysis running</span>
          <span className="text-[9px] font-mono" style={{ color: "rgba(147,197,253,0.55)" }}>{Math.round(progress * 100)}% complete</span>
        </div>
        <div className="h-px w-full rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div className="h-full rounded-full" style={{ width: `${progress * 100}%`, background: "linear-gradient(90deg, #1e40af, #3B82F6)", transition: "width 0.3s ease" }} />
        </div>
      </div>
    </div>
  );
}

/* ── After: transformed modern website ── */
function AfterWebsite() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#050816" }}>
      {/* Modern nav */}
      <div className="flex items-center justify-between px-5 py-3 border-b"
        style={{ borderColor: "rgba(59,130,246,0.10)", background: "rgba(0,0,0,0.45)" }}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.28)" }}>
            <div className="w-2.5 h-2.5 rounded-sm" style={{ background: "#3B82F6" }} />
          </div>
          <span className="font-bold text-xs text-white tracking-tight">GlobalCorp</span>
        </div>
        <div className="hidden sm:flex gap-5 text-[9px] font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>
          {["Product", "Solutions", "Pricing", "Docs"].map(l => (
            <span key={l} className="hover:text-white cursor-pointer transition-colors">{l}</span>
          ))}
        </div>
        <div className="text-[9px] px-3 py-1.5 font-semibold rounded-full" style={{ background: "#3B82F6", color: "#fff" }}>
          Get Started →
        </div>
      </div>

      {/* Modern hero */}
      <div className="px-6 py-8 flex-1 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 40% at 50% -5%, rgba(59,130,246,0.07) 0%, transparent 60%)" }} />
        <div className="relative">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[8px] font-medium mb-4"
            style={{ background: "rgba(59,130,246,0.10)", border: "1px solid rgba(59,130,246,0.22)", color: "rgba(147,197,253,0.75)" }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#4ade80" }} />
            Now transformed by Morphix
          </div>
          <div className="font-light text-white mb-3 leading-tight" style={{ fontSize: "1.2rem" }}>
            The future of business<br />infrastructure.
          </div>
          <div className="text-[9px] mb-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.40)", maxWidth: "280px" }}>
            Modern solutions for modern teams. Built for speed, scale, and simplicity.
          </div>
          <div className="flex gap-2">
            <div className="text-[9px] px-4 py-2 font-semibold rounded-full" style={{ background: "#3B82F6", color: "#fff" }}>
              Start free →
            </div>
            <div className="text-[9px] px-4 py-2 font-medium rounded-full"
              style={{ color: "rgba(255,255,255,0.50)", border: "1px solid rgba(255,255,255,0.10)" }}>
              View docs
            </div>
          </div>
        </div>
      </div>

      {/* Metrics strip */}
      <div className="grid grid-cols-3 border-t" style={{ borderColor: "rgba(59,130,246,0.10)", background: "rgba(0,0,0,0.35)" }}>
        {[
          { n: "35+", l: "Years of experience" },
          { n: "500+", l: "Enterprise clients" },
          { n: "24/7", l: "Global support" },
        ].map((s, i) => (
          <div key={s.n} className="flex flex-col items-center justify-center py-3"
            style={{ borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
            <div className="font-light text-sm text-white">{s.n}</div>
            <div className="text-[8px]" style={{ color: "rgba(255,255,255,0.30)" }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── In-view hook ── */
function useInView() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

type Phase = "before" | "dna" | "after";

export default function WatchMorphixWork() {
  const { ref, inView } = useInView();
  const [phase, setPhase] = useState<Phase>("before");
  const [dnaProgress, setDnaProgress] = useState(0);
  const [started, setStarted] = useState(false);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (inView && !started) {
      const t = setTimeout(() => runSequence(), 800);
      return () => clearTimeout(t);
    }
  }, [inView, started]);

  function runSequence() {
    setStarted(true);
    setPhase("before");
    setDnaProgress(0);
    setTimeout(() => {
      setPhase("dna");
      let p = 0;
      progressRef.current = setInterval(() => {
        p += 0.018;
        setDnaProgress(Math.min(p, 1));
        if (p >= 1) {
          if (progressRef.current) clearInterval(progressRef.current);
          setTimeout(() => setPhase("after"), 600);
        }
      }, 60);
    }, 1800);
  }

  useEffect(() => () => { if (progressRef.current) clearInterval(progressRef.current); }, []);

  const CardLabel = ({ step, title }: { step: string; title: string }) => (
    <div className="flex items-center gap-3 mb-3">
      <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>{step}</div>
      <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
      <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>{title}</div>
    </div>
  );

  const Connector = ({ label, delay }: { label: string; delay: string }) => (
    <div className="flex flex-col items-center py-6" style={{ opacity: inView ? 1 : 0, transition: `opacity 0.6s ease ${delay}` }}>
      <div className="h-8 w-px"
        style={{ background: "linear-gradient(to bottom, rgba(59,130,246,0.10), rgba(59,130,246,0.35))", animation: inView ? "drawLine 0.4s ease forwards" : "none" }} />
      <div className="text-[9px] font-mono px-3 py-1 rounded-full transition-all"
        style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.18)", color: "rgba(147,197,253,0.50)" }}>
        {label}
      </div>
      <div className="h-8 w-px"
        style={{ background: "linear-gradient(to bottom, rgba(59,130,246,0.35), rgba(59,130,246,0.10))" }} />
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
        <path d="M5 6L0 0h10L5 6z" fill="rgba(59,130,246,0.35)" />
      </svg>
    </div>
  );

  return (
    <section
      ref={ref as any}
      className="relative border-t"
      style={{ background: "#050816", borderColor: "rgba(255,255,255,0.06)", paddingTop: "7rem", paddingBottom: "7rem" }}
    >
      {/* Subtle blue glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 50% 30% at 50% 50%, rgba(59,130,246,0.03) 0%, transparent 65%)",
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
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
            Watch Morphix Work
          </h2>
          <p className="text-base" style={{ color: "rgba(255,255,255,0.38)", fontWeight: 400 }}>
            One website. Completely transformed.
          </p>
        </div>

        {/* Transformation flow */}
        <div className="flex flex-col items-center gap-0">

          {/* Step 01 — Original (now DARK) */}
          <div
            className="w-full max-w-4xl"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <CardLabel step="01" title="Original" />
            <div
              className="rounded-2xl overflow-hidden transition-all duration-200"
              style={{
                height: "320px",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.12)"}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)"}
            >
              <BeforeWebsite />
            </div>
          </div>

          <Connector label="Morphix Analysis" delay="0.3s" />

          {/* Step 02 — Design DNA */}
          <div
            className="w-full max-w-4xl"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 700ms cubic-bezier(0.16,1,0.3,1) 200ms, transform 700ms cubic-bezier(0.16,1,0.3,1) 200ms",
            }}
          >
            <CardLabel step="02" title="Design DNA" />
            <div
              className="rounded-2xl overflow-hidden transition-all duration-200"
              style={{
                height: "280px",
                border: "1px solid rgba(59,130,246,0.12)",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(59,130,246,0.25)"}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(59,130,246,0.12)"}
            >
              <DNAPanel progress={phase === "before" ? 0 : phase === "dna" ? dnaProgress : 1} />
            </div>
          </div>

          <Connector label="Transformed" delay="0.5s" />

          {/* Step 03 — After */}
          <div
            className="w-full max-w-4xl"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 700ms cubic-bezier(0.16,1,0.3,1) 300ms, transform 700ms cubic-bezier(0.16,1,0.3,1) 300ms",
            }}
          >
            <CardLabel step="03" title="Transformed" />
            <div
              className="rounded-2xl overflow-hidden transition-all duration-1000"
              style={{
                height: "320px",
                border: phase === "after" ? "1px solid rgba(59,130,246,0.28)" : "1px solid rgba(255,255,255,0.07)",
                opacity: phase === "after" ? 1 : 0.35,
                boxShadow: phase === "after" ? "0 0 30px rgba(59,130,246,0.08)" : "none",
              }}
            >
              <AfterWebsite />
            </div>
          </div>

          {/* Replay */}
          {phase === "after" && (
            <button
              onClick={runSequence}
              className="mt-10 text-xs font-medium transition-all rounded-full px-4 py-2"
              style={{ color: "rgba(255,255,255,0.28)", border: "1px solid rgba(255,255,255,0.07)", background: "transparent", cursor: "pointer" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(147,197,253,0.75)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(59,130,246,0.25)";
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(59,130,246,0.06)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.28)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
            >
              ↺ Watch again
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes drawLine {
          from { transform: scaleY(0); transform-origin: top; }
          to   { transform: scaleY(1); transform-origin: top; }
        }
      `}</style>
    </section>
  );
}
