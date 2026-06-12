"use client";

import { useState } from "react";
import {
  Globe, Wand2, LayoutGrid, Monitor, Tablet, Smartphone,
  ArrowRight, Download, Code2, Zap, Eye, Sparkles
} from "lucide-react";

/* Each bento card is a large, colorful, interactive mini-product */

function TransformCard() {
  const [style, setStyle] = useState<"old"|"saas"|"linear"|"framer">("old");
  const styleMap = {
    old:    { nav:"bg-slate-700", hero:"bg-slate-100", btn:"bg-slate-500", cards:"bg-slate-200" },
    saas:   { nav:"bg-gradient-to-r from-blue-600 to-violet-600", hero:"bg-gradient-to-br from-blue-50 to-violet-50", btn:"bg-gradient-to-r from-blue-600 to-violet-600", cards:"bg-blue-50 border border-blue-100" },
    linear: { nav:"bg-slate-900", hero:"bg-slate-800", btn:"bg-indigo-500", cards:"bg-slate-700 text-white" },
    framer: { nav:"bg-gradient-to-r from-blue-500 to-cyan-400", hero:"bg-gradient-to-br from-blue-50 to-cyan-50", btn:"bg-gradient-to-r from-blue-500 to-cyan-500", cards:"bg-sky-50 border border-sky-100" },
  };
  const s = styleMap[style];

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <div className="badge badge-blue mb-3">Transform</div>
        <h3 className="text-2xl font-extrabold text-slate-900 leading-tight mb-2">Turn any website into something remarkable</h3>
        <p className="text-slate-600 text-sm">Paste a URL, pick a style, watch it transform in seconds.</p>
      </div>
      <div className="mt-auto space-y-3">
        {/* Style buttons */}
        <div className="flex flex-wrap gap-1.5">
          {(["old","saas","linear","framer"] as const).map(id => (
            <button key={id} onClick={()=>setStyle(id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${style===id?"bg-slate-900 text-white shadow-md":"bg-white/80 text-slate-600 hover:bg-white border border-slate-200"}`}>
              {id==="old" ? "Original" : id.charAt(0).toUpperCase()+id.slice(1)}
            </button>
          ))}
        </div>
        {/* Mini website */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className={`h-6 ${s.nav} flex items-center px-2.5 gap-1.5`}>
            <div className="w-3 h-3 rounded-md bg-white/25"/><div className="w-8 h-1 rounded bg-white/35"/>
            <div className="ml-auto w-8 h-2.5 rounded-lg bg-white/25"/>
          </div>
          <div className={`${s.hero} p-2.5 space-y-1.5`}>
            <div className="w-24 h-2.5 rounded-lg bg-slate-300/60"/>
            <div className="w-16 h-2 rounded bg-slate-200/60"/>
            <div className={`w-14 h-5 rounded-xl ${s.btn} mt-1 shadow-sm`}/>
          </div>
          <div className="grid grid-cols-3 gap-1.5 p-2">
            {[0,1,2].map(i=><div key={i} className={`h-8 rounded-xl ${s.cards}`}/>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function DNACard() {
  const [hovered, setHovered] = useState<number|null>(null);
  const tokens = [
    { label:"Primary", color:"#2563eb", size:"w-8 h-8" },
    { label:"Accent",  color:"#7c3aed", size:"w-6 h-6" },
    { label:"Success", color:"#0d9488", size:"w-5 h-5" },
    { label:"Warn",    color:"#f59e0b", size:"w-4 h-4" },
    { label:"Text",    color:"#0f172a", size:"w-4 h-4" },
    { label:"Muted",   color:"#64748b", size:"w-3 h-3" },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <div className="badge badge-purple mb-3">Design DNA</div>
        <h3 className="text-2xl font-extrabold text-slate-900 leading-tight mb-2">Extract design systems from anything</h3>
        <p className="text-slate-600 text-sm">Upload a screenshot and get a complete, exportable design token set.</p>
      </div>
      <div className="mt-auto space-y-3">
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Extracted Color Palette</div>
          <div className="flex flex-wrap gap-3 items-end">
            {tokens.map((t,i)=>(
              <div key={t.label} className="flex flex-col items-center gap-1 cursor-pointer"
                onMouseEnter={()=>setHovered(i)} onMouseLeave={()=>setHovered(null)}>
                <div
                  className={`rounded-xl shadow-md transition-all duration-300 ${hovered===i?"scale-125 shadow-xl":""}`}
                  style={{backgroundColor:t.color, width:hovered===i?32:["w-8","w-6","w-5","w-4","w-4","w-3"].includes(t.size)?32:24, height:hovered===i?32:24}}
                />
                {hovered===i && (
                  <div className="text-[9px] font-mono font-bold text-slate-600 bg-white border border-slate-200 px-1.5 rounded-lg shadow-sm animate-fade-in">
                    {t.color}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label:"Typography", value:"Inter 800/600" },
            { label:"Radius",     value:"12px · 8px · 4px" },
            { label:"Spacing",    value:"4px base scale" },
            { label:"Motion",     value:"Ease · 200ms" },
          ].map(t=>(
            <div key={t.label} className="bg-white rounded-xl border border-slate-100 p-2.5 shadow-sm">
              <div className="text-[9px] font-bold text-slate-400 uppercase">{t.label}</div>
              <div className="text-xs font-semibold text-slate-700 mt-0.5">{t.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ComponentCard() {
  const [filter, setFilter] = useState("All");
  const chips = ["All","Hero","Nav","Pricing","Forms"];
  const previews = [
    { name:"Gradient Hero", cat:"Hero",    bg:"from-blue-600 to-violet-700" },
    { name:"Glass Nav",     cat:"Nav",     bg:"from-slate-900 to-slate-700" },
    { name:"Pricing Card",  cat:"Pricing", bg:"from-emerald-500 to-teal-600" },
    { name:"Auth Form",     cat:"Forms",   bg:"from-rose-500 to-pink-600" },
    { name:"Feature Bento", cat:"Hero",    bg:"from-amber-500 to-orange-500" },
    { name:"CTA Section",   cat:"Hero",    bg:"from-violet-600 to-purple-700" },
  ];
  const shown = previews.filter(p=>filter==="All"||p.cat===filter);

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <div className="badge badge-amber mb-3">Components</div>
        <h3 className="text-2xl font-extrabold text-slate-900 leading-tight mb-2">10,000+ production components, one click away</h3>
        <p className="text-slate-600 text-sm">Filter, preview, copy — no fluff, just code-ready pieces.</p>
      </div>
      <div className="mt-auto space-y-3">
        <div className="flex gap-1.5 flex-wrap">
          {chips.map(c=>(
            <button key={c} onClick={()=>setFilter(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${filter===c?"bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow":"bg-white/80 text-slate-600 border border-slate-200 hover:bg-white"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {(shown.length>0?shown:previews).slice(0,6).map((p,i)=>(
            <div key={i} className={`h-14 bg-gradient-to-br ${p.bg} rounded-xl flex items-center justify-center shadow-md hover:scale-105 transition-transform cursor-pointer group relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all rounded-xl flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-bold text-white">Use</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PreviewCard() {
  const [device, setDevice] = useState<"desktop"|"tablet"|"mobile">("desktop");
  const devices = [
    { id:"desktop" as const, icon:Monitor,    w:"w-full" },
    { id:"tablet"  as const, icon:Tablet,     w:"w-3/4" },
    { id:"mobile"  as const, icon:Smartphone, w:"w-2/5" },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <div className="badge badge-teal mb-3">Live Preview</div>
        <h3 className="text-2xl font-extrabold text-slate-900 leading-tight mb-2">See every change instantly across all devices</h3>
        <p className="text-slate-600 text-sm">Toggle between desktop, tablet, and mobile with zero rebuild time.</p>
      </div>
      <div className="mt-auto space-y-3">
        {/* Device switcher */}
        <div className="flex gap-2">
          {devices.map(d=>{
            const Icon = d.icon;
            return (
              <button key={d.id} onClick={()=>setDevice(d.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  device===d.id
                    ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow"
                    : "bg-white/80 text-slate-600 border border-slate-200 hover:bg-white"
                }`}>
                <Icon className="w-3.5 h-3.5"/>{d.id.charAt(0).toUpperCase()+d.id.slice(1)}
              </button>
            );
          })}
        </div>
        {/* Preview container */}
        <div className="bg-white rounded-2xl border border-slate-200 p-2 flex justify-center shadow-inner min-h-[100px]">
          <div className={`${devices.find(d=>d.id===device)!.w} transition-all duration-500 bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm`}>
            <div className="h-4 bg-gradient-to-r from-blue-600 to-violet-600 flex items-center px-1.5 gap-1">
              <div className="w-2 h-2 rounded-md bg-white/25"/>
              <div className="ml-auto w-4 h-1.5 rounded-md bg-white/25"/>
            </div>
            <div className="p-2 space-y-1.5">
              <div className="h-2 bg-gradient-to-r from-blue-100 to-violet-100 rounded w-3/4"/>
              <div className="h-1.5 bg-slate-100 rounded w-full"/>
              <div className="h-1.5 bg-slate-100 rounded w-4/5"/>
              <div className="h-3.5 w-12 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg"/>
              {device !== "mobile" && (
                <div className={`grid gap-1 ${device==="desktop"?"grid-cols-3":"grid-cols-2"}`}>
                  {(device==="desktop"?[0,1,2]:[0,1]).map(i=><div key={i} className="h-6 bg-slate-100 rounded-lg"/>)}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-xs font-bold rounded-xl hover:shadow-lg transition-all">
            <Eye className="w-3.5 h-3.5"/> Open Preview
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-200 transition-colors">
            <Download className="w-3.5 h-3.5"/> Export
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CapabilitiesSection() {
  return (
    <section id="capabilities" className="py-20 lg:py-28 bg-slate-50 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="badge badge-blue mb-4 mx-auto"><Zap className="w-3.5 h-3.5"/> Core Capabilities</div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Everything in one
            <span className="gradient-text"> intelligent studio</span>
          </h2>
          <p className="text-lg text-slate-600">Four powerful tools, one seamless workflow — from inspiration to production code.</p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Card 1 — Transform (tall, blue-left) */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/60 border border-blue-100 hover:border-blue-200 rounded-3xl p-7 hover:shadow-2xl hover:shadow-blue-100/60 transition-all duration-500 group">
            <TransformCard/>
          </div>

          {/* Right column — 2 stacked */}
          <div className="grid grid-rows-2 gap-5">
            {/* Card 2 — DNA */}
            <div className="bg-gradient-to-br from-violet-50 to-purple-50/60 border border-violet-100 hover:border-violet-200 rounded-3xl p-7 hover:shadow-2xl hover:shadow-violet-100/60 transition-all duration-500">
              <DNACard/>
            </div>

            {/* Card 3 — Preview */}
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50/60 border border-teal-100 hover:border-teal-200 rounded-3xl p-7 hover:shadow-2xl hover:shadow-teal-100/60 transition-all duration-500">
              <PreviewCard/>
            </div>
          </div>
        </div>

        {/* Card 4 — Components (full width) */}
        <div className="mt-5 bg-gradient-to-br from-amber-50 to-orange-50/60 border border-amber-100 hover:border-amber-200 rounded-3xl p-7 hover:shadow-2xl hover:shadow-amber-100/60 transition-all duration-500">
          <ComponentCard/>
        </div>

        {/* Bottom CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
          <a href="#" className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-blue-200/50 hover:-translate-y-0.5 transition-all">
            <Sparkles className="w-4 h-4"/> Start Building Free
          </a>
          <a href="#" className="flex items-center gap-2 px-6 py-3.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-2xl hover:border-blue-200 hover:bg-blue-50/30 transition-all text-sm">
            See All Features <ArrowRight className="w-4 h-4"/>
          </a>
        </div>
      </div>
    </section>
  );
}
