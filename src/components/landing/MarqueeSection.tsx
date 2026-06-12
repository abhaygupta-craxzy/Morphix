"use client";

import { Zap, Globe, Wand2, LayoutGrid, Sparkles } from "lucide-react";

const marqueeItems = [
  { from:"Local Business",    to:"Modern SaaS",       color:"from-blue-600 to-violet-600" },
  { from:"Corporate Site",    to:"Product Landing",   color:"from-violet-600 to-purple-700" },
  { from:"Basic Portfolio",   to:"Framer Style",      color:"from-teal-500 to-emerald-600" },
  { from:"Legacy Dashboard",  to:"Linear Dark",       color:"from-slate-700 to-indigo-900" },
  { from:"Startup MVP",       to:"Stripe Polish",     color:"from-indigo-600 to-blue-700" },
  { from:"Blog Template",     to:"Modern Editorial",  color:"from-amber-500 to-orange-600" },
  { from:"E-commerce Store",  to:"Apple Minimal",     color:"from-gray-700 to-gray-900" },
  { from:"Agency Website",    to:"Bold Creative",     color:"from-rose-500 to-pink-600" },
];

const capabilities = [
  { icon:Globe,      label:"Transform Website",    color:"text-blue-600",   bg:"bg-blue-50" },
  { icon:Wand2,      label:"Extract Design DNA",   color:"text-violet-600", bg:"bg-violet-50" },
  { icon:LayoutGrid, label:"Browse Components",    color:"text-amber-600",  bg:"bg-amber-50" },
  { icon:Sparkles,   label:"Generate From Scratch",color:"text-teal-600",   bg:"bg-teal-50" },
];

/* Duplicate for seamless loop */
const doubled = [...marqueeItems, ...marqueeItems];

export default function MarqueeSection() {
  return (
    <div className="relative py-10 overflow-hidden bg-white border-y border-slate-100">
      {/* Fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"/>
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"/>

      {/* Row 1 — right scroll */}
      <div className="flex gap-3 mb-3" style={{animation:"marquee-left 35s linear infinite"}}>
        {doubled.map((item, i) => (
          <div
            key={i}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r ${item.color} text-white shadow-md`}
          >
            <span className="text-xs font-semibold opacity-75 line-through decoration-white/50">{item.from}</span>
            <Zap className="w-3 h-3 opacity-70 flex-shrink-0"/>
            <span className="text-xs font-bold">{item.to}</span>
          </div>
        ))}
      </div>

      {/* Row 2 — left scroll */}
      <div className="flex gap-3" style={{animation:"marquee-right 28s linear infinite"}}>
        {doubled.reverse().map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="text-xs font-medium text-slate-500">{item.from}</span>
            <span className="w-4 h-px bg-gradient-to-r from-slate-300 to-blue-400 rounded"/>
            <span className="text-xs font-bold text-slate-800">{item.to}</span>
          </div>
        ))}
      </div>

      {/* Capability pills */}
      <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
        {capabilities.map(c => {
          const Icon = c.icon;
          return (
            <div key={c.label} className={`flex items-center gap-2 px-4 py-2 ${c.bg} rounded-full border border-slate-200`}>
              <Icon className={`w-4 h-4 ${c.color}`}/>
              <span className="text-xs font-semibold text-slate-700">{c.label}</span>
            </div>
          );
        })}
      </div>

      {/* Inline style for marquee keyframes */}
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
