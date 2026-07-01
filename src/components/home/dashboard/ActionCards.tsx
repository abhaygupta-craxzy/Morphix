"use client";

import { useState, useRef } from "react";
import Link from "next/link";

  
const CARDS = [
  {
    id: "create",
    href: "/create",
    emoji: "✨",
    title: "Create",
    subtitle: "Build with AI",
    description: "Describe any website and watch it appear — from landing pages to full SaaS products.",
    cta: "Start creating",
    /* Glass palette — Blue */
    glassBg:     "rgba(37,99,235,0.10)",
    glassBorder: "rgba(59,130,246,0.22)",
    glow:        "rgba(59,130,246,0.18)",
    glowHover:   "rgba(59,130,246,0.40)",
    ambientGlow: "rgba(59,130,246,0.12)",       /* behind the card */
    ambientGlowHover: "rgba(59,130,246,0.22)",
    iconBg:      "rgba(59,130,246,0.16)",
    iconBorder:  "rgba(59,130,246,0.30)",
    iconColor:   "#93C5FD",
    tagBg:       "rgba(59,130,246,0.12)",
    tagColor:    "rgba(147,197,253,0.90)",
    ctaGradient: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
    ctaBorder:   "rgba(59,130,246,0.45)",
    ctaShadow:   "rgba(59,130,246,0.35)",
    animation: "create",
  },
  {
    id: "transform",
    href: "/transform",
    emoji: "🔄",
    title: "Transform",
    subtitle: "Reimagine any site",
    description: "Paste a URL and redesign it completely — new layout, style, and identity in seconds.",
    cta: "Paste a URL",
    /* Glass palette — Purple */
    glassBg:     "rgba(109,40,217,0.10)",
    glassBorder: "rgba(124,58,237,0.22)",
    glow:        "rgba(124,58,237,0.16)",
    glowHover:   "rgba(124,58,237,0.36)",
    ambientGlow: "rgba(124,58,237,0.10)",
    ambientGlowHover: "rgba(124,58,237,0.20)",
    iconBg:      "rgba(124,58,237,0.16)",
    iconBorder:  "rgba(124,58,237,0.28)",
    iconColor:   "#C4B5FD",
    tagBg:       "rgba(124,58,237,0.12)",
    tagColor:    "rgba(196,181,253,0.90)",
    ctaGradient: "linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%)",
    ctaBorder:   "rgba(124,58,237,0.45)",
    ctaShadow:   "rgba(124,58,237,0.35)",
    animation: "transform",
  },
  {
    id: "explore",
    href: "/explore",
    emoji: "🧩",
    title: "Explore",
    subtitle: "Browse components",
    description: "10,000+ production-ready UI components. Search, preview, customize, and export instantly.",
    cta: "Browse library",
    /* Glass palette — Emerald */
    glassBg:     "rgba(5,150,105,0.09)",
    glassBorder: "rgba(16,185,129,0.20)",
    glow:        "rgba(16,185,129,0.14)",
    glowHover:   "rgba(16,185,129,0.30)",
    ambientGlow: "rgba(16,185,129,0.09)",
    ambientGlowHover: "rgba(16,185,129,0.18)",
    iconBg:      "rgba(16,185,129,0.14)",
    iconBorder:  "rgba(16,185,129,0.26)",
    iconColor:   "#6EE7B7",
    tagBg:       "rgba(16,185,129,0.10)",
    tagColor:    "rgba(110,231,183,0.90)",
    ctaGradient: "linear-gradient(135deg, #065f46 0%, #10b981 100%)",
    ctaBorder:   "rgba(16,185,129,0.40)",
    ctaShadow:   "rgba(16,185,129,0.30)",
    animation: "explore",
  },
] as const;

/* ─────────────────────────────────────────
   Micro-animation: Create canvas
   Blocks softly fading in / building
───────────────────────────────────────── */
function CreateAnimation({ hovered }: { hovered: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="flex flex-col gap-1.5 w-full" style={{ opacity: hovered ? 1 : 0.55, transition: "opacity 400ms ease" }}>
        {/* Top bar (nav mock) */}
        <div className="flex gap-1.5 items-center">
          <div className="h-2 rounded-sm" style={{ width: 32, background: "rgba(147,197,253,0.35)", animation: "pulse 2.5s ease-in-out infinite" }} />
          <div className="h-2 rounded-sm" style={{ width: 20, background: "rgba(147,197,253,0.20)", animation: "pulse 2.5s ease-in-out infinite 0.2s" }} />
          <div className="h-2 rounded-sm" style={{ width: 20, background: "rgba(147,197,253,0.20)", animation: "pulse 2.5s ease-in-out infinite 0.4s" }} />
          <div className="ml-auto h-2 w-8 rounded-sm" style={{ background: "rgba(59,130,246,0.50)", animation: "pulse 2.5s ease-in-out infinite 0.6s" }} />
        </div>
        {/* Hero block */}
        <div
          className="rounded-lg"
          style={{
            width: "100%",
            height: 28,
            background: hovered ? "rgba(59,130,246,0.22)" : "rgba(59,130,246,0.14)",
            border: `1px solid rgba(59,130,246,${hovered ? 0.30 : 0.18})`,
            transition: "all 350ms cubic-bezier(0.23,1,0.32,1)",
            transform: hovered ? "scaleX(1)" : "scaleX(0.92)",
            transformOrigin: "left",
            boxShadow: hovered ? "0 0 16px rgba(59,130,246,0.20)" : "none",
          }}
        />
        {/* Two column grid — builds in on hover */}
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-lg flex-1"
              style={{
                height: 16,
                background: `rgba(147,197,253,${hovered ? 0.16 : 0.08})`,
                border: `1px solid rgba(147,197,253,${hovered ? 0.18 : 0.10})`,
                transition: `all 350ms ${i * 80}ms cubic-bezier(0.23,1,0.32,1)`,
                opacity: hovered ? 1 : 0.5,
                transform: hovered ? "scaleY(1)" : "scaleY(0.7)",
              }}
            />
          ))}
        </div>
        {/* CTA row */}
        <div className="flex gap-1.5 items-center">
          <div className="rounded-sm" style={{ width: 40, height: 8, background: "rgba(255,255,255,0.12)" }} />
          <div
            className="rounded-sm ml-auto"
            style={{
              height: 8,
              background: hovered ? "rgba(59,130,246,0.70)" : "rgba(59,130,246,0.45)",
              transition: "width 300ms ease, background 300ms ease",
              width: hovered ? 36 : 24,
              boxShadow: hovered ? "0 0 8px rgba(59,130,246,0.40)" : "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Micro-animation: Transform before → after
───────────────────────────────────────── */
function TransformAnimation({ hovered }: { hovered: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="flex items-center gap-2 w-full">
        {/* Before: old dull site */}
        <div
          className="flex-1 rounded-lg p-1.5 flex flex-col gap-1"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            transition: "all 400ms cubic-bezier(0.23,1,0.32,1)",
            opacity: hovered ? 0.4 : 0.85,
            transform: hovered ? "scale(0.88) translateX(-4px)" : "scale(1)",
            filter: hovered ? "grayscale(0.5)" : "none",
          }}
        >
          <div className="rounded" style={{ height: 6, width: "70%", background: "rgba(255,255,255,0.15)" }} />
          <div className="rounded" style={{ height: 4, width: "90%", background: "rgba(255,255,255,0.08)" }} />
          <div className="rounded" style={{ height: 4, width: "60%", background: "rgba(255,255,255,0.08)" }} />
          <div className="rounded mt-0.5" style={{ height: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.06)" }} />
        </div>

        {/* Animated arrow */}
        <div
          style={{
            color: "rgba(196,181,253,0.80)",
            fontSize: 14,
            fontWeight: 700,
            transition: "transform 350ms cubic-bezier(0.23,1,0.32,1), color 300ms ease",
            transform: hovered ? "scale(1.4) translateX(2px)" : "scale(1)",
            textShadow: hovered ? "0 0 12px rgba(196,181,253,0.60)" : "none",
          }}
        >
          →
        </div>

        {/* After: transformed site */}
        <div
          className="flex-1 rounded-lg p-1.5 flex flex-col gap-1"
          style={{
            background: hovered ? "rgba(124,58,237,0.18)" : "rgba(124,58,237,0.10)",
            border: `1px solid rgba(124,58,237,${hovered ? 0.38 : 0.22})`,
            transition: "all 400ms cubic-bezier(0.23,1,0.32,1)",
            transform: hovered ? "scale(1.08) translateX(4px)" : "scale(0.96)",
            boxShadow: hovered ? "0 4px 24px rgba(124,58,237,0.40)" : "none",
          }}
        >
          <div className="rounded" style={{ height: 6, width: "80%", background: `rgba(196,181,253,${hovered ? 0.60 : 0.40})` }} />
          <div className="rounded" style={{ height: 4, width: "90%", background: `rgba(196,181,253,${hovered ? 0.25 : 0.15})` }} />
          <div className="rounded" style={{ height: 4, width: "55%", background: `rgba(196,181,253,${hovered ? 0.25 : 0.15})` }} />
          <div className="rounded mt-0.5" style={{ height: 10, background: `rgba(124,58,237,${hovered ? 0.40 : 0.22})`, border: `1px solid rgba(124,58,237,${hovered ? 0.50 : 0.30})` }} />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Micro-animation: Explore component grid
───────────────────────────────────────── */
function ExploreAnimation({ hovered }: { hovered: boolean }) {
  const items = [
    { cols: "col-span-2", h: 22, delay: "0ms",   featured: true  },
    { cols: "",           h: 22, delay: "40ms",   featured: false },
    { cols: "",           h: 14, delay: "80ms",   featured: false },
    { cols: "",           h: 14, delay: "120ms",  featured: false },
    { cols: "",           h: 14, delay: "160ms",  featured: false },
    { cols: "",           h: 14, delay: "200ms",  featured: false },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="grid grid-cols-3 gap-1.5 w-full">
        {items.map((item, i) => (
          <div
            key={i}
            className={`rounded-lg ${item.cols}`}
            style={{
              height: item.h,
              background: item.featured
                ? `rgba(16,185,129,${hovered ? 0.32 : 0.16})`
                : `rgba(110,231,183,${hovered ? 0.10 : 0.06})`,
              border: item.featured
                ? `1px solid rgba(16,185,129,${hovered ? 0.50 : 0.24})`
                : `1px solid rgba(110,231,183,${hovered ? 0.14 : 0.08})`,
              transition: `all 320ms ${item.delay} cubic-bezier(0.23,1,0.32,1)`,
              transform: hovered
                ? item.featured ? "scale(1.04)" : "scale(1.01)"
                : "scale(1)",
              boxShadow: item.featured && hovered ? "0 4px 20px rgba(16,185,129,0.30)" : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Single Card
───────────────────────────────────────── */
function ActionCard({ card }: { card: (typeof CARDS)[number] }) {
  const [hovered, setHovered] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    /* Wrapper includes the ambient glow behind the card */
    <div
      className="relative"
      style={{
        /* Depth: coloured ambient glow lives here, behind the card */
        filter: hovered
          ? `drop-shadow(0 0 40px ${card.ambientGlowHover})`
          : `drop-shadow(0 0 20px ${card.ambientGlow})`,
        transition: "filter 400ms ease",
      }}
    >
      <Link
        ref={linkRef}
        href={card.href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex flex-col rounded-2xl overflow-hidden outline-none"
        style={{
          background: card.glassBg,
          border: `1px solid ${hovered ? card.glassBorder : "rgba(255,255,255,0.07)"}`,
          boxShadow: hovered
            ? `0 0 0 1px ${card.glassBorder}, 0 24px 64px ${card.glowHover}, inset 0 1px 0 rgba(255,255,255,0.10)`
            : `0 4px 24px ${card.glow}, inset 0 1px 0 rgba(255,255,255,0.05)`,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          transform: hovered ? "translateY(-5px)" : "translateY(0)",
          transition: "all 300ms cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        {/* Ambient glow layer inside card */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${card.glow} 0%, transparent 70%)`,
            opacity: hovered ? 1 : 0.5,
            transition: "opacity 350ms ease",
          }}
        />

        {/* Top reflection shimmer */}
        <div
          aria-hidden
          className="absolute top-0 left-6 right-6 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, rgba(255,255,255,${hovered ? 0.20 : 0.08}), transparent)`,
            transition: "opacity 300ms ease",
          }}
        />

        {/* Spotlight cursor glow (static centered) */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(circle 120px at 50% 30%, ${card.glow} 0%, transparent 70%)`,
            opacity: hovered ? 0.6 : 0,
            transition: "opacity 400ms ease",
          }}
        />

        {/* ── Micro-animation canvas ── */}
        <div
          className="relative mx-5 mt-5 rounded-xl overflow-hidden"
          style={{
            height: 72,
            background: "rgba(0,0,0,0.18)",
            border: "1px solid rgba(255,255,255,0.06)",
            padding: "10px 12px",
          }}
        >
          {card.animation === "create"    && <CreateAnimation    hovered={hovered} />}
          {card.animation === "transform" && <TransformAnimation hovered={hovered} />}
          {card.animation === "explore"   && <ExploreAnimation   hovered={hovered} />}
        </div>

        {/* ── Content ── */}
        <div className="relative px-5 pt-4 pb-5 flex flex-col flex-1">
          {/* Header row */}
          <div className="flex items-start justify-between mb-2.5">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                {/* Icon pill */}
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                  style={{
                    background: card.iconBg,
                    border: `1px solid ${card.iconBorder}`,
                    transition: "box-shadow 300ms ease",
                    boxShadow: hovered ? `0 0 12px ${card.iconColor}44` : "none",
                  }}
                >
                  {card.emoji}
                </div>

                {/* Title */}
                <span
                  className="text-base font-bold leading-tight"
                  style={{
                    color: hovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.95)",
                    letterSpacing: "-0.02em",
                    transition: "color 200ms ease",
                  }}
                >
                  {card.title}
                </span>
              </div>

              {/* Subtitle tag */}
              <span
                className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                style={{
                  background: card.tagBg,
                  color: card.tagColor,
                }}
              >
                {card.subtitle}
              </span>
            </div>

            {/* Arrow */}
            <span
              style={{
                color: hovered ? card.iconColor : "rgba(255,255,255,0.25)",
                fontSize: 16,
                transition: "transform 250ms cubic-bezier(0.23,1,0.32,1), color 250ms ease",
                transform: hovered ? "translate(3px, -3px)" : "translate(0,0)",
              }}
            >
              ↗
            </span>
          </div>

          {/* Description */}
          <p
            className="text-[12.5px] leading-relaxed mb-4 flex-1"
            style={{
              color: hovered ? "rgba(255,255,255,0.50)" : "rgba(255,255,255,0.38)",
              transition: "color 250ms ease",
            }}
          >
            {card.description}
          </p>

          {/* CTA */}
          <div
            className="flex items-center justify-center gap-2 py-2 rounded-xl text-[13px] font-semibold transition-all duration-250"
            style={{
              background: hovered ? card.ctaGradient : "rgba(255,255,255,0.05)",
              border: hovered ? `1px solid ${card.ctaBorder}` : "1px solid rgba(255,255,255,0.08)",
              color: hovered ? "#fff" : "rgba(255,255,255,0.45)",
              boxShadow: hovered ? `0 6px 24px ${card.ctaShadow}` : "none",
              transform: hovered ? "scale(1.01)" : "scale(1)",
              transition: "all 250ms cubic-bezier(0.23,1,0.32,1)",
            }}
          >
            {card.cta}
            <span
              style={{
                display: "inline-block",
                transform: hovered ? "translateX(2px)" : "translateX(-4px)",
                opacity: hovered ? 1 : 0,
                transition: "transform 250ms ease, opacity 200ms ease",
              }}
            >
              →
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

/* ─────────────────────────────────────────
   ActionCards — exported component
───────────────────────────────────────── */
export default function ActionCards() {
  return (
    <section aria-label="Action cards">
      {/* Three glass cards — no header, straight into the cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CARDS.map((card) => (
          <div key={card.id} className="action-card-wrapper">
            <ActionCard card={card} />
          </div>
        ))}
      </div>
    </section>
  );
}