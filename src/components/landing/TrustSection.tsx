"use client";

import { useEffect, useRef, useState } from "react";
import { Zap, Globe, Wand2, Sparkles, ArrowRight } from "lucide-react";

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

function AnimatedCounter({ end, suffix = "", prefix = "", duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const steps = 60;
          const increment = end / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  {
    value: 10000,  suffix: "+",  prefix: "",
    label: "Components Available",
    desc: "Production-ready, copy-paste code",
    icon: Wand2,
    color: "text-blue-600",
    ring: "ring-blue-100",
    bg: "bg-blue-50",
    glow: "shadow-blue-100",
  },
  {
    value: 50000,  suffix: "+",  prefix: "",
    label: "Websites Transformed",
    desc: "Across 40+ industries worldwide",
    icon: Globe,
    color: "text-violet-600",
    ring: "ring-violet-100",
    bg: "bg-violet-50",
    glow: "shadow-violet-100",
  },
  {
    value: 200000, suffix: "+",  prefix: "",
    label: "Designs Generated",
    desc: "By AI, reviewed by designers",
    icon: Sparkles,
    color: "text-teal-600",
    ring: "ring-teal-100",
    bg: "bg-teal-50",
    glow: "shadow-teal-100",
  },
  {
    value: 1000000,suffix: "+",  prefix: "",
    label: "Lines of Code Exported",
    desc: "Clean, typed, production-ready",
    icon: Zap,
    color: "text-amber-600",
    ring: "ring-amber-100",
    bg: "bg-amber-50",
    glow: "shadow-amber-100",
  },
];

export default function TrustSection() {
  return (
    <section id="trust" className="py-20 lg:py-28 bg-slate-900 relative overflow-hidden">
      {/* Background dot grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Glow orbs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-blue-500/8 blur-3xl pointer-events-none"/>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-violet-500/8 blur-3xl pointer-events-none"/>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/8 border border-white/10 rounded-full text-sm font-semibold text-white/80 mb-6">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-dot"/>
            Trusted by 50,000+ teams worldwide
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Morphix in numbers
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Real metrics from real teams building real products.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className={`group relative bg-white/5 hover:bg-white/8 border border-white/10 hover:border-white/20 rounded-3xl p-7 transition-all duration-500 cursor-default hover:-translate-y-1 hover:shadow-2xl ${stat.glow}`}
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-2xl ${stat.bg} ring-1 ${stat.ring} flex items-center justify-center mb-5`}>
                  <Icon className={`w-5 h-5 ${stat.color}`}/>
                </div>

                {/* Counter */}
                <div className={`text-4xl lg:text-5xl font-black ${stat.color} mb-2 tabular-nums`}>
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} prefix={stat.prefix}/>
                </div>

                {/* Label */}
                <div className="text-base font-bold text-white mb-1">{stat.label}</div>
                <div className="text-sm text-slate-400">{stat.desc}</div>

                {/* Subtle divider bar */}
                <div className={`mt-5 h-0.5 rounded-full bg-gradient-to-r ${
                  i===0?"from-blue-500 to-blue-400/0":
                  i===1?"from-violet-500 to-violet-400/0":
                  i===2?"from-teal-500 to-teal-400/0":
                  "from-amber-500 to-amber-400/0"
                } opacity-50 group-hover:opacity-100 transition-opacity`}/>
              </div>
            );
          })}
        </div>

        {/* Logos row (simulated) */}
        <div className="mt-14 text-center">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">Used by teams at</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {["Vercel","Stripe","Linear","Figma","Notion","Framer","Loom","Raycast"].map(name => (
              <div key={name} className="text-slate-500 font-bold text-sm hover:text-slate-300 transition-colors cursor-default">
                {name}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <a href="#" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-blue-500/25 hover:-translate-y-1 transition-all text-base">
            <Sparkles className="w-5 h-5"/> Join 50,000+ Builders
            <ArrowRight className="w-4 h-4"/>
          </a>
        </div>
      </div>
    </section>
  );
}
