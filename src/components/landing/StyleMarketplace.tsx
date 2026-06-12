"use client";

import { useState } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";

const styleCards = [
  {
    id:"apple",      name:"Apple",      
    bg:"from-gray-900 to-gray-800",  text:"text-white",
    tagBg:"bg-white/10 text-white/70",
    desc:"Ultra-minimal. Clean space. Premium.",
    accent:"#f5f5f7", secondary:"#1d1d1f",
    preview:{nav:"bg-gray-900", hero:"bg-gray-50", btn:"bg-gray-900", cards:["bg-white","bg-white","bg-white"]},
  },
  {
    id:"stripe",     name:"Stripe",     
    bg:"from-indigo-700 to-violet-800",  text:"text-white",
    tagBg:"bg-white/10 text-white/70",
    desc:"Professional. Bold typography. Financial.",
    accent:"#635bff", secondary:"#0a2540",
    preview:{nav:"bg-indigo-700", hero:"bg-gradient-to-br from-indigo-50 to-violet-50", btn:"bg-indigo-600", cards:["bg-indigo-50","bg-violet-50","bg-purple-50"]},
  },
  {
    id:"linear",     name:"Linear",     
    bg:"from-slate-800 to-indigo-950",  text:"text-white",
    tagBg:"bg-white/10 text-white/70",
    desc:"Developer-first. Dark & precise.",
    accent:"#5e6ad2", secondary:"#1c1c2e",
    preview:{nav:"bg-slate-900", hero:"bg-slate-900", btn:"bg-indigo-500", cards:["bg-slate-800","bg-slate-800","bg-slate-800"]},
  },
  {
    id:"framer",     name:"Framer",     
    bg:"from-blue-500 to-cyan-400",  text:"text-white",
    tagBg:"bg-white/15 text-white/80",
    desc:"Playful. Animated. Modern.",
    accent:"#0099ff", secondary:"#002244",
    preview:{nav:"bg-gradient-to-r from-blue-500 to-cyan-400", hero:"bg-gradient-to-br from-blue-50 to-cyan-50", btn:"bg-blue-500", cards:["bg-sky-50","bg-cyan-50","bg-blue-50"]},
  },
  {
    id:"fintech",    name:"Fintech",    
    bg:"from-emerald-600 to-teal-600",  text:"text-white",
    tagBg:"bg-white/10 text-white/70",
    desc:"Trustworthy. Data-driven. Green.",
    accent:"#10b981", secondary:"#064e3b",
    preview:{nav:"bg-emerald-700", hero:"bg-gradient-to-br from-emerald-50 to-teal-50", btn:"bg-emerald-600", cards:["bg-emerald-50","bg-teal-50","bg-cyan-50"]},
  },
  {
    id:"healthcare", name:"Healthcare", 
    bg:"from-rose-500 to-pink-600",  text:"text-white",
    tagBg:"bg-white/10 text-white/70",
    desc:"Caring. Accessible. Warm.",
    accent:"#f43f5e", secondary:"#881337",
    preview:{nav:"bg-rose-600", hero:"bg-gradient-to-br from-rose-50 to-pink-50", btn:"bg-rose-500", cards:["bg-rose-50","bg-pink-50","bg-red-50"]},
  },
  {
    id:"notion",     name:"Notion",     
    bg:"from-slate-700 to-slate-600",  text:"text-white",
    tagBg:"bg-white/10 text-white/70",
    desc:"Document-first. Clean. Focused.",
    accent:"#000000", secondary:"#37352f",
    preview:{nav:"bg-white border-b border-slate-200", hero:"bg-white", btn:"bg-slate-900", cards:["bg-slate-50","bg-slate-50","bg-slate-50"]},
  },
  {
    id:"saas",       name:"Modern SaaS", 
    bg:"from-blue-600 to-violet-600",  text:"text-white",
    tagBg:"bg-white/15 text-white/80",
    desc:"Balanced. Polished. Convert-focused.",
    accent:"#2563eb", secondary:"#7c3aed",
    preview:{nav:"bg-gradient-to-r from-blue-600 to-violet-600", hero:"bg-gradient-to-br from-blue-50 to-violet-50", btn:"bg-gradient-to-r from-blue-600 to-violet-600", cards:["bg-blue-50","bg-violet-50","bg-teal-50"]},
  },
  {
    id:"enterprise", name:"Enterprise", 
    bg:"from-sky-700 to-blue-900",  text:"text-white",
    tagBg:"bg-white/10 text-white/70",
    desc:"Structured. Formal. Scalable.",
    accent:"#0369a1", secondary:"#082f49",
    preview:{nav:"bg-sky-800", hero:"bg-sky-50", btn:"bg-sky-700", cards:["bg-sky-50","bg-blue-50","bg-slate-50"]},
  },
  {
    id:"startup",    name:"Startup",    
    bg:"from-violet-600 to-fuchsia-600",  text:"text-white",
    tagBg:"bg-white/10 text-white/70",
    desc:"Bold. Energetic. Growth-stage.",
    accent:"#7c3aed", secondary:"#4c1d95",
    preview:{nav:"bg-gradient-to-r from-violet-600 to-fuchsia-600", hero:"bg-gradient-to-br from-violet-50 to-fuchsia-50", btn:"bg-gradient-to-r from-violet-600 to-fuchsia-600", cards:["bg-violet-50","bg-fuchsia-50","bg-purple-50"]},
  },
];

function StylePreview({ style }: { style: typeof styleCards[0] }) {
  const p = style.preview;
  return (
    <div className="w-full bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
      {/* Nav */}
      <div className={`h-8 ${p.nav} flex items-center px-3 gap-2`}>
        <div className="w-4 h-4 rounded-lg bg-white/20"/>
        <div className="w-10 h-1.5 rounded bg-white/30 ml-1"/>
        <div className="ml-auto flex gap-2">
          <div className="w-5 h-1 rounded bg-white/25"/>
          <div className="w-5 h-1 rounded bg-white/25"/>
          <div className="w-12 h-4 rounded-lg bg-white/25"/>
        </div>
      </div>
      {/* Hero */}
      <div className={`${p.hero} p-4 space-y-2.5`}>
        <div className="w-32 h-3.5 rounded-xl bg-slate-300/50"/>
        <div className="w-48 h-2.5 rounded bg-slate-200/60"/>
        <div className="w-24 h-2 rounded bg-slate-200/50"/>
        <div className={`w-20 h-7 rounded-2xl ${p.btn} shadow-md mt-1`}/>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-3 gap-2 p-3 bg-white">
        {p.cards.map((c,i)=>(
          <div key={i} className={`h-12 rounded-2xl ${c} border border-slate-100`}/>
        ))}
      </div>
    </div>
  );
}

export default function StyleMarketplace() {
  const [selected, setSelected] = useState("saas");
  const active = styleCards.find(s=>s.id===selected)!;

  return (
    <section id="styles" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="badge badge-purple mb-4"><Sparkles className="w-3.5 h-3.5"/> Style Marketplace</div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
              Transform into
              <span className="gradient-text-blue-purple"> any style</span>
            </h2>
            <p className="text-lg text-slate-600">Click any style card to preview how your website transforms instantly.</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left: style cards grid */}
          <div className="lg:w-auto flex-shrink-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2.5">
              {styleCards.map(style => (
                <button
                  key={style.id}
                  onClick={()=>setSelected(style.id)}
                  className={`relative flex flex-col items-start p-4 rounded-2xl bg-gradient-to-br ${style.bg} ${style.text} text-left transition-all duration-300 cursor-pointer group ${
                    selected===style.id
                      ? "ring-2 ring-offset-2 ring-blue-400 scale-[1.02] shadow-xl"
                      : "hover:scale-[1.02] hover:shadow-lg"
                  }`}
                  style={{minWidth:"140px"}}
                >
                  {selected===style.id && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-md">
                      <Check className="w-3 h-3 text-blue-600"/>
                    </div>
                  )}
                  <div className={`text-sm font-black mb-0.5`}>{style.name}</div>
                  <div className={`text-[10px] ${style.tagBg.split(" ").includes("text-white/70")?"opacity-70":"opacity-80"} leading-tight`}>{style.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: live preview */}
          <div className="flex-1 min-w-0">
            <div className="sticky top-24">
              {/* Style info header */}
              <div className={`bg-gradient-to-r ${active.bg} rounded-2xl p-5 mb-4 text-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold opacity-70 uppercase tracking-wider mb-1">Style Selected</div>
                    <div className="text-2xl font-extrabold">{active.name}</div>
                    <div className="text-sm opacity-80 mt-0.5">{active.desc}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <div className="flex gap-1.5">
                      <div className="w-5 h-5 rounded-lg shadow-md" style={{backgroundColor:active.accent}}/>
                      <div className="w-5 h-5 rounded-lg shadow-md" style={{backgroundColor:active.secondary}}/>
                    </div>
                    <div className="text-xs opacity-60">Signature colors</div>
                  </div>
                </div>
              </div>

              {/* Website preview */}
              <div className="animate-scale-in">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse-dot"/>
                  <span className="text-xs font-semibold text-slate-500">Live preview — {active.name} style</span>
                </div>
                <StylePreview style={active}/>
              </div>

              <div className="flex gap-3 mt-4">
                <button className={`flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r ${active.bg} text-white font-bold rounded-2xl hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm`}>
                  Apply {active.name} Style <ArrowRight className="w-4 h-4"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
