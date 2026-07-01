"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";



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

interface CTASectionProps { onOpen?: () => void; }

export default function CTASection({ onOpen }: CTASectionProps) {
  const { ref, inView } = useInView(0.2);
  const [hovered, setHovered] = useState(false);

  return (
    <section
      ref={ref as any}
      id="cta"
      className="relative border-t"
      style={{
        background: "#050816",
        borderColor: "rgba(255,255,255,0.06)",
        paddingTop: "10rem",
        paddingBottom: "10rem",
      }}
    >
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(59,130,246,0.04) 0%, transparent 70%)",
      }} />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Label */}
        <div
          className="inline-flex items-center gap-2 text-xs font-medium mb-10"
          style={{
            color: "rgba(147,197,253,0.50)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 600ms ease, transform 600ms cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#4ade80", animation: "pulseGreen 2s ease-in-out infinite" }} />
          Morphix Is Ready
        </div>

        {/* Headline */}
        <h2
          className="text-white tracking-tight mb-6 leading-[0.92]"
          style={{
            fontSize: "clamp(2.8rem,7vw,5.5rem)",
            fontWeight: 300,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 600ms ease 100ms, transform 600ms cubic-bezier(0.16,1,0.3,1) 100ms",
          }}
        >
          Ready To Start?
        </h2>

        {/* Subheadline */}
        <p
          className="text-lg mb-12 max-w-md mx-auto leading-relaxed font-light"
          style={{
            color: "rgba(255,255,255,0.35)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 600ms ease 200ms, transform 600ms cubic-bezier(0.16,1,0.3,1) 200ms",
          }}
        >
          Create, customize, and launch websites — all inside one AI workspace.
        </p>

        {/* Actions */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 600ms ease 360ms, transform 600ms cubic-bezier(0.16,1,0.3,1) 360ms",
          }}
        >
          <button
            onClick={onOpen}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="flex items-center gap-2.5 px-8 py-3.5 text-black text-base font-semibold rounded-full transition-all duration-200"
            style={{
              background: "#ffffff",
              transform: hovered ? "translateY(-1px)" : "translateY(0)",
              boxShadow: hovered
                ? "0 8px 32px rgba(255,255,255,0.14), inset 0 0 0 1px rgba(255,255,255,0.20)"
                : "none",
            }}
          >
            Open Workspace
            <ArrowRight className={`w-4 h-4 transition-transform duration-200 ${hovered ? "translate-x-0.5" : ""}`} />
          </button>

          <a
            href="/login"
            className="flex items-center gap-2 px-7 py-3.5 text-base font-medium rounded-full transition-all duration-200"
            style={{ color: "rgba(147,197,253,0.70)", border: "1px solid rgba(59,130,246,0.22)", background: "rgba(59,130,246,0.05)" }}
            onMouseEnter={e => {
              e.currentTarget.style.color = "rgba(147,197,253,1)";
              e.currentTarget.style.borderColor = "rgba(59,130,246,0.45)";
              e.currentTarget.style.background = "rgba(59,130,246,0.10)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = "rgba(147,197,253,0.70)";
              e.currentTarget.style.borderColor = "rgba(59,130,246,0.22)";
              e.currentTarget.style.background = "rgba(59,130,246,0.05)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Sign Up Free →
          </a>
        </div>
      </div>

      <style>{`
        @keyframes pulseGreen { 0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(16,185,129,0.4); } 50% { opacity: 0.75; box-shadow: 0 0 0 5px rgba(16,185,129,0); } }
      `}</style>
    </section>
  );
}
