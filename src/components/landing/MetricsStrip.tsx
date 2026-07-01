"use client";

import { useEffect, useRef, useState } from "react";



const METRICS = [
  { number: 10000, suffix: "+", label: "Components", isCount: true },
  { number: 10000, suffix: "+", label: "Projects",   isCount: true },
  { number: 1.4,   suffix: "s", label: "Avg Build",  isCount: false, display: "1.4s" },
  { number: 0,     suffix: "",  label: "React + Tailwind", isCount: false, display: "Export" },
];

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function CountUpNumber({ target, suffix, duration = 1800 }: { target: number; suffix: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);

  return <>{val.toLocaleString()}{suffix}</>;
}

export default function MetricsStrip() {
  const { ref, inView } = useInView(0.2);

  return (
    <section
      ref={ref as any}
      className="relative border-t border-b"
      style={{
        background: "#050816",
        borderColor: "rgba(255,255,255,0.06)",
        paddingTop: "4rem",
        paddingBottom: "4rem",
      }}
    >
      {/* Blue top shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.35) 50%, transparent 100%)" }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className="flex flex-col items-center text-center relative"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 600ms ease ${i * 100}ms, transform 600ms cubic-bezier(0.16,1,0.3,1) ${i * 100}ms`,
              }}
            >
              {/* Divider */}
              {i < METRICS.length - 1 && (
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-px hidden lg:block transition-all"
                  style={{
                    background: "rgba(59,130,246,0.15)",
                    opacity: inView ? 1 : 0,
                    transition: `opacity 600ms ease ${i * 100 + 200}ms`,
                  }}
                />
              )}
              <div
                className="text-white mb-1.5 transition-all"
                style={{
                  fontSize: "clamp(2.5rem,5vw,3.5rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  background: "linear-gradient(135deg, #fff 0%, rgba(147,197,253,0.90) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {m.display ? m.display : inView ? <CountUpNumber target={m.number} suffix={m.suffix} /> : `0${m.suffix}`}
              </div>
              <div
                className="text-sm font-medium tracking-wide"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blue bottom shimmer line */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.20) 50%, transparent 100%)" }} />
    </section>
  );
}
