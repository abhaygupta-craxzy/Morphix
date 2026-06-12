"use client";

import { useState, useEffect, useRef } from "react";
import {
  Globe, Wand2, LayoutGrid, Sparkles, ArrowRight, Zap,
  Check, Download, Eye, Code2, Plus, Search, Upload, FileImage,
  Type, Layers, Palette, ChevronRight
} from "lucide-react";

/* ══════════════════════════════════════
   CONSTANTS
══════════════════════════════════════ */
const cycleWords = ["Transform", "Redesign", "Remix", "Reimagine", "Rebuild"];

const styles = [
  { id:"saas",   label:"SaaS",    bg:"from-blue-600 to-violet-600" },
  { id:"stripe", label:"Stripe",  bg:"from-indigo-700 to-blue-800" },
  { id:"linear", label:"Linear",  bg:"from-slate-800 to-indigo-900" },
  { id:"apple",  label:"Apple",   bg:"from-gray-900 to-gray-700" },
  { id:"framer", label:"Framer",  bg:"from-blue-500 to-cyan-400" },
  { id:"fin",    label:"Fintech", bg:"from-emerald-600 to-teal-500" },
  { id:"health", label:"Health",  bg:"from-rose-500 to-pink-500" },
  { id:"custom", label:"Custom",  bg:"from-violet-600 to-fuchsia-600" },
];

const tabs = [
  { id:"transform", icon:Globe,      label:"Transform Website" },
  { id:"dna",       icon:Wand2,      label:"Design Inspiration" },
  { id:"scratch",   icon:Sparkles,   label:"Start From Scratch" },
  { id:"browse",    icon:LayoutGrid, label:"Browse Components" },
];

/* ══════════════════════════════════════
   FLOATING CARDS (decorative background)
══════════════════════════════════════ */
function FloatingCard({ className, style, children }: { className?: string; style?: React.CSSProperties; children: React.ReactNode }) {
  return (
    <div
      className={`absolute hidden lg:block pointer-events-none select-none ${className}`}
      style={style}
    >
      <div className="glass-card p-3 rounded-2xl border border-white/10 shadow-2xl shadow-black/40 backdrop-blur-xl">
        {children}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MINI WEBSITE PREVIEW
══════════════════════════════════════ */
function MiniSite({ s }: { s: typeof styles[0] }) {
  return (
    <div className="w-full h-full bg-white rounded-xl overflow-hidden border border-slate-100">
      <div className={`h-5 bg-gradient-to-r ${s.bg} flex items-center px-2 gap-1`}>
        <div className="w-3 h-3 rounded-md bg-white/25"/><div className="w-6 h-1 rounded bg-white/35 ml-1"/>
        <div className="ml-auto w-6 h-2 rounded-lg bg-white/25"/>
      </div>
      <div className="p-2.5 space-y-1.5">
        <div className="h-2.5 w-2/3 rounded-lg bg-gradient-to-r from-slate-200 to-slate-100"/>
        <div className="h-1.5 w-full bg-slate-100 rounded"/><div className="h-1.5 w-4/5 bg-slate-100 rounded"/>
        <div className={`h-4 w-14 rounded-xl bg-gradient-to-r ${s.bg} shadow-sm`}/>
        <div className="grid grid-cols-3 gap-1 mt-1">
          {[0,1,2].map(i=><div key={i} className="h-6 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/60"/>)}
        </div>
      </div>
    </div>
  );
}

function OldSite() {
  return (
    <div className="w-full h-full bg-slate-200 rounded-xl overflow-hidden border border-slate-300">
      <div className="h-5 bg-slate-600 flex items-center px-2 gap-1.5"><div className="w-6 h-1 rounded bg-white/20"/></div>
      <div className="p-2.5 space-y-1.5">
        <div className="h-2.5 w-3/4 bg-slate-300 rounded"/><div className="h-1.5 w-full bg-slate-200 rounded"/>
        <div className="h-4 w-14 bg-slate-500 rounded"/>
        <div className="grid grid-cols-3 gap-1 mt-1">{[0,1,2].map(i=><div key={i} className="h-6 bg-slate-200 rounded"/>)}</div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   TAB PANELS
══════════════════════════════════════ */
function TransformPanel() {
  const [url, setUrl]     = useState("");
  const [style, setStyle] = useState("saas");
  const [phase, setPhase] = useState<"idle"|"loading"|"done">("idle");
  const sel = styles.find(s=>s.id===style)!;

  function run() {
    if (!url) setUrl("https://yourwebsite.com");
    setPhase("loading");
    setTimeout(() => setPhase("done"), 1800);
  }

  return (
    <div className="flex flex-col lg:flex-row gap-5 p-5 animate-scale-in min-h-[300px]">
      <div className="lg:w-64 flex-shrink-0 space-y-4">
        <div>
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Website URL</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/>
            <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://yoursite.com"
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-400 transition-all"/>
          </div>
        </div>
        <div>
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">Target Style</label>
          <div className="grid grid-cols-2 gap-1.5">
            {styles.map(s=>(
              <button key={s.id} onClick={()=>{setStyle(s.id);setPhase("idle");}}
                className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  style===s.id ? `bg-gradient-to-r ${s.bg} text-white shadow-md` : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}>
                {style===s.id && <Check className="w-3 h-3 flex-shrink-0"/>}
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <button onClick={run} className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-indigo-300/30 hover:-translate-y-0.5 transition-all text-sm">
          {phase==="loading" ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Transforming…</> : <><Zap className="w-4 h-4"/>Transform</>}
        </button>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500"><div className="w-2 h-2 rounded-full bg-slate-400"/>Before</div>
          <div className="h-40"><OldSite/></div>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600"><div className={`w-2 h-2 rounded-full bg-gradient-to-r ${sel.bg} ${phase==="loading"?"animate-pulse-dot":""}`}/>{phase==="done"?"Morphix Version":"AI Preview"}</div>
          <div className={`h-40 transition-opacity duration-700 ${phase==="loading"?"opacity-40":""}`}>
            {phase==="done" ? <MiniSite s={sel}/> : (
              <div className={`w-full h-full rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 bg-slate-50 ${phase==="loading"?"":"hover:border-indigo-300"} transition-all`}>
                {phase==="loading" ? <><div className="w-7 h-7 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"/><p className="text-xs text-indigo-500 font-semibold">AI generating…</p></> : <><Wand2 className="w-5 h-5 text-slate-300"/><p className="text-xs text-slate-400 text-center px-4">Choose a style and transform</p></>}
              </div>
            )}
          </div>
        </div>
        {phase==="done" && (
          <div className="col-span-2 flex gap-2 animate-slide-in-up">
            <button className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition-colors"><Download className="w-3.5 h-3.5"/>Export Code</button>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-200 transition-colors"><Eye className="w-3.5 h-3.5"/>Live Preview</button>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-200 transition-colors"><Code2 className="w-3.5 h-3.5"/>Studio</button>
          </div>
        )}
      </div>
    </div>
  );
}

function DNAPanel() {
  const [phase, setPhase] = useState<"idle"|"loading"|"done">("idle");
  const steps = ["Analyzing structure…","Extracting colors…","Detecting typography…","Building tokens…"];
  const [step, setStep] = useState(0);
  const colorTokens = ["#6366f1","#a855f7","#ec4899","#14b8a6","#f59e0b","#10b981"];

  function run() {
    setPhase("loading"); setStep(0);
    const iv = setInterval(()=>setStep(s=>{
      if(s>=steps.length-1){clearInterval(iv);setPhase("done");return s;}
      return s+1;
    }),500);
  }

  return (
    <div className="p-5 animate-scale-in">
      {phase==="idle" && (
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[{icon:FileImage,label:"Upload Screenshot",color:"text-violet-500",bg:"bg-violet-50 border-violet-200"},
            {icon:Globe,    label:"Paste Website URL",color:"text-blue-500",  bg:"bg-blue-50 border-blue-200"},
            {icon:Upload,   label:"Import Figma",     color:"text-teal-500",  bg:"bg-teal-50 border-teal-200"}].map(opt=>{
            const Icon=opt.icon;
            return(<button key={opt.label} onClick={run} className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 ${opt.bg} hover:shadow-lg transition-all group`}>
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Icon className={`w-5 h-5 ${opt.color}`}/>
              </div>
              <div className="text-xs font-bold text-slate-800 text-center">{opt.label}</div>
            </button>);
          })}
        </div>
      )}
      {phase==="loading" && (
        <div className="space-y-3 mb-4 animate-fade-in">
          {steps.map((s,i)=>(
            <div key={i} className="flex items-center gap-3">
              {i<step?<Check className="w-4 h-4 text-green-500 flex-shrink-0"/>:i===step?<div className="w-4 h-4 border-2 border-violet-300 border-t-violet-600 rounded-full animate-spin flex-shrink-0"/>:<div className="w-4 h-4 rounded-full border border-slate-200 flex-shrink-0"/>}
              <span className={`text-sm ${i<=step?"text-slate-800 font-medium":"text-slate-400"}`}>{s}</span>
            </div>
          ))}
        </div>
      )}
      {phase==="done" && (
        <div className="animate-scale-in space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-green-400"/><span className="text-sm font-bold text-slate-700">Design System Extracted</span>
            <span className="badge badge-teal py-0 text-[9px] ml-auto">6 tokens</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2"><Palette className="w-3.5 h-3.5 text-violet-500"/><span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Color Palette</span></div>
            <div className="flex gap-2 flex-wrap">
              {colorTokens.map(c=><div key={c} className="w-7 h-7 rounded-xl hover:scale-125 transition-transform cursor-pointer shadow-md" style={{backgroundColor:c}}/>)}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[{icon:Type,label:"Typography",v:"Inter 800/600"},{icon:Layers,label:"Spacing",v:"4px scale"},{icon:Layers,label:"Radius",v:"12px · 8px"},{icon:Zap,label:"Motion",v:"Ease 200ms"}].map(t=>{
              const Icon=t.icon;
              return(<div key={t.label} className="bg-slate-50 rounded-xl border border-slate-100 p-2.5"><div className="flex items-center gap-1.5 mb-1"><Icon className="w-3.5 h-3.5 text-violet-500"/><span className="text-[9px] font-bold text-slate-400 uppercase">{t.label}</span></div><div className="text-xs font-semibold text-slate-700">{t.v}</div></div>);
            })}
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs font-bold rounded-xl hover:shadow-lg transition-all"><Download className="w-3.5 h-3.5"/>Export Tokens</button>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-200 transition-colors">Apply to Website</button>
          </div>
        </div>
      )}
    </div>
  );
}

function ScratchPanel() {
  const [prompt, setPrompt] = useState("");
  const [phase, setPhase]   = useState<"idle"|"generating"|"done">("idle");
  const examples = ["SaaS dashboard for a healthcare startup","Fintech landing page with dark mode","AI productivity platform homepage","E-commerce store for premium sneakers"];
  function run() { if(!prompt)return; setPhase("generating"); setTimeout(()=>setPhase("done"),2000); }

  return (
    <div className="p-5 animate-scale-in">
      <div className="relative mb-4">
        <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} rows={3} placeholder="Describe what you want to build…"
          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-400 transition-all resize-none leading-relaxed pr-32"/>
        <button onClick={run} disabled={!prompt}
          className="absolute bottom-3 right-3 flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-bold rounded-xl hover:shadow-lg disabled:opacity-40 transition-all">
          {phase==="generating"?<><div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin"/>Generating…</>:<><Sparkles className="w-3.5 h-3.5"/>Generate</>}
        </button>
      </div>
      {phase==="idle" && (
        <div className="flex flex-wrap gap-2">
          {examples.map(ex=>(
            <button key={ex} onClick={()=>setPrompt(ex)} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-medium rounded-xl hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all">
              <Plus className="w-3 h-3 opacity-50"/>{ex}
            </button>
          ))}
        </div>
      )}
      {(phase==="generating"||phase==="done") && (
        <div className={`bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden ${phase==="generating"?"opacity-60":""} transition-opacity`}>
          <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-200 bg-white">
            <div className="flex gap-1"><div className="w-2.5 h-2.5 rounded-full bg-red-400/70"/><div className="w-2.5 h-2.5 rounded-full bg-amber-400/70"/><div className="w-2.5 h-2.5 rounded-full bg-green-400/70"/></div>
            <div className="text-[10px] text-slate-400 font-medium ml-1">AI Generated Preview</div>
            {phase==="done"&&<div className="ml-auto badge badge-blue py-0 text-[9px]">Ready</div>}
          </div>
          <div className="p-3 space-y-2">
            <div className="h-5 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg"/>
            <div className="h-14 bg-gradient-to-br from-blue-50 to-violet-50 rounded-xl border border-blue-100 flex flex-col items-center justify-center gap-1">
              <div className="w-32 h-2.5 rounded bg-blue-200"/><div className="w-20 h-1.5 rounded bg-slate-200"/>
              <div className="flex gap-1.5 mt-1"><div className="w-14 h-3 rounded-lg bg-blue-600"/><div className="w-14 h-3 rounded-lg border border-blue-300"/></div>
            </div>
            <div className="grid grid-cols-3 gap-1.5">{[0,1,2].map(i=><div key={i} className="h-10 rounded-xl bg-white border border-slate-200 shimmer-box"/>)}</div>
          </div>
        </div>
      )}
      {phase==="done" && (
        <div className="flex gap-2 mt-3 animate-slide-in-up">
          <button className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-bold rounded-xl hover:shadow-lg transition-all"><Eye className="w-3.5 h-3.5"/>Open in Studio</button>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-200 transition-colors"><Code2 className="w-3.5 h-3.5"/>Export Code</button>
        </div>
      )}
    </div>
  );
}

function BrowsePanel() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("All");
  const chips = ["All","Navbar","Hero","Pricing","Dashboard","Forms","Footer","Auth"];
  const items = [
    {name:"Gradient Hero",cat:"Hero",preview:<div className="w-full h-full bg-gradient-to-br from-blue-600 to-violet-700 flex items-center justify-center"><div className="space-y-1 text-center"><div className="w-20 h-2 rounded bg-white/60 mx-auto"/><div className="w-14 h-1.5 rounded bg-white/40 mx-auto"/></div></div>},
    {name:"Glass Navbar",cat:"Navbar",preview:<div className="w-full h-full bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col"><div className="h-5 bg-white/80 border-b border-slate-100 flex items-center px-2 gap-1"><div className="w-3 h-3 rounded bg-blue-600"/><div className="ml-auto w-6 h-3 rounded-lg bg-blue-600"/></div></div>},
    {name:"3-Tier Pricing",cat:"Pricing",preview:<div className="w-full h-full bg-slate-50 p-1.5 flex gap-1 items-center">{[0,1,2].map(i=><div key={i} className={`flex-1 ${i===1?"bg-gradient-to-b from-blue-600 to-violet-600":"bg-white"} rounded-xl p-1.5 flex flex-col gap-0.5 ${i===1?"ring-1 ring-blue-400 shadow-md":""}`}><div className={`text-[7px] font-bold ${i===1?"text-white":"text-slate-700"} text-center`}>{["Free","Pro","Team"][i]}</div></div>)}</div>},
    {name:"Analytics",cat:"Dashboard",preview:<div className="w-full h-full bg-slate-900 p-1.5 flex flex-col gap-1"><div className="grid grid-cols-3 gap-0.5">{["bg-blue-500/20","bg-violet-500/20","bg-teal-500/20"].map((c,i)=><div key={i} className={`${c} rounded p-1`}/>)}</div><div className="flex-1 bg-slate-800 rounded p-1 flex items-end gap-0.5">{[35,60,45,75,55,70,85].map((h,i)=><div key={i} className="flex-1 bg-blue-500 rounded-sm" style={{height:`${h}%`}}/>)}</div></div>},
    {name:"Auth Form",cat:"Auth",preview:<div className="w-full h-full bg-slate-50 flex items-center justify-center"><div className="w-20 bg-white rounded-xl border border-slate-200 p-2 shadow space-y-1.5"><div className="text-[7px] font-bold text-slate-800 text-center">Sign in</div>{[0,1].map(i=><div key={i} className="h-3.5 rounded-lg border border-slate-200"/>)}<div className="h-4 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600"/></div></div>},
    {name:"Bento Features",cat:"Hero",preview:<div className="w-full h-full bg-white p-1 grid grid-cols-3 grid-rows-2 gap-0.5">{[{s:"col-span-2",b:"from-blue-50 to-violet-50"},{s:"",b:"from-teal-50 to-emerald-50"},{s:"",b:"from-amber-50 to-orange-50"},{s:"col-span-2",b:"from-violet-50 to-pink-50"}].map((f,i)=><div key={i} className={`${f.s} bg-gradient-to-br ${f.b} rounded-lg`}/>)}</div>},
  ];
  const shown = items.filter(c=>(active==="All"||c.cat===active)&&c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-4 animate-scale-in">
      <div className="flex gap-2 mb-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400"/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search 10,000+ components…"
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"/>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {chips.map(c=>(
          <button key={c} onClick={()=>setActive(c)} className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${active===c?"bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-sm":"bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{c}</button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {(shown.length>0?shown:items).slice(0,6).map((c,i)=>(
          <div key={i} className="group rounded-xl border border-slate-200 overflow-hidden hover:border-blue-200 hover:shadow-lg transition-all cursor-pointer">
            <div className="h-16 relative overflow-hidden bg-slate-50">{c.preview}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-end justify-center pb-2">
                <div className="bg-white text-[8px] font-bold text-slate-800 px-2 py-0.5 rounded-lg">Use</div>
              </div>
            </div>
            <div className="px-2 py-1.5 bg-white"><div className="text-[10px] font-semibold text-slate-700 truncate">{c.name}</div></div>
          </div>
        ))}
      </div>
      <div className="text-center mt-3">
        <button className="flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-bold rounded-xl hover:shadow-lg transition-all mx-auto">
          Browse All 10,000+ <ArrowRight className="w-3.5 h-3.5"/>
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN HERO
══════════════════════════════════════ */
export default function HeroSection() {
  const [wordIdx,    setWordIdx]    = useState(0);
  const [activeTab,  setActiveTab]  = useState("transform");

  useEffect(() => {
    const iv = setInterval(() => setWordIdx(i => (i + 1) % cycleWords.length), 2400);
    return () => clearInterval(iv);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden hero-dark pt-20 pb-16">
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid pointer-events-none opacity-80" />

      {/* Glow orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] orb-indigo blur-3xl opacity-60 pointer-events-none animate-pulse-glow" />
      <div className="absolute top-40 left-10 w-80 h-80 orb-purple blur-3xl opacity-30 pointer-events-none animate-pulse-glow delay-1000" />
      <div className="absolute top-60 right-10 w-60 h-60 orb-teal blur-3xl opacity-20 pointer-events-none animate-pulse-glow delay-500" />
      <div className="absolute bottom-20 left-1/4 w-60 h-60 orb-pink blur-3xl opacity-15 pointer-events-none animate-drift-left" />

      {/* Floating decorative cards */}
      <FloatingCard className="top-32 left-8 animate-float-slow" style={{zIndex:1}}>
        <div className="flex items-center gap-2 min-w-[150px]">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4 text-white"/>
          </div>
          <div>
            <div className="text-xs font-bold text-white">Style Applied</div>
            <div className="text-[10px] text-white/50">SaaS · 2.3s</div>
          </div>
        </div>
      </FloatingCard>

      <FloatingCard className="top-48 right-8 animate-float-medium delay-700" style={{zIndex:1}}>
        <div className="space-y-1.5 min-w-[160px]">
          <div className="text-[10px] font-bold text-white/50 uppercase">Colors Extracted</div>
          <div className="flex gap-1.5">
            {["#6366f1","#a855f7","#14b8a6","#f59e0b","#ec4899"].map(c=>(
              <div key={c} className="w-5 h-5 rounded-lg shadow-md" style={{backgroundColor:c}}/>
            ))}
          </div>
        </div>
      </FloatingCard>

      <FloatingCard className="bottom-48 left-4 animate-drift-right delay-300" style={{zIndex:1}}>
        <div className="flex items-center gap-2 min-w-[140px]">
          <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center">
            <Check className="w-3.5 h-3.5 text-green-400"/>
          </div>
          <div>
            <div className="text-xs font-bold text-white">Code Exported</div>
            <div className="text-[10px] text-white/50">React + Tailwind</div>
          </div>
        </div>
      </FloatingCard>

      <FloatingCard className="bottom-32 right-6 animate-float-slow delay-1000" style={{zIndex:1}}>
        <div className="space-y-1.5 min-w-[130px]">
          <div className="text-[10px] font-bold text-white/50">10,000+ Components</div>
          <div className="grid grid-cols-3 gap-1">
            {["from-blue-500 to-violet-500","from-teal-500 to-emerald-500","from-pink-500 to-rose-500",
              "from-amber-500 to-orange-500","from-indigo-500 to-blue-500","from-purple-500 to-pink-500"].map((g,i)=>(
              <div key={i} className={`h-5 rounded-lg bg-gradient-to-br ${g}`}/>
            ))}
          </div>
        </div>
      </FloatingCard>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <div className="text-center mb-10">
          <div className="badge badge-glow mb-6 mx-auto inline-flex">
            <Sparkles className="w-3.5 h-3.5" /> AI Website Transformation Studio
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-5">
            <span key={wordIdx} className="gradient-text-white animate-scale-in inline-block">
              {cycleWords[wordIdx]}
            </span>{" "}
            <span className="text-white">any website</span>
            <br />
            <span className="gradient-text">with AI</span>
          </h1>

          <p className="text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
            Transform, remix, browse 10K+ components, extract design systems & export production-ready code.
          </p>

          <div className="flex items-center justify-center gap-6 mt-6 text-sm">
            {[{n:"10K+",l:"Components"},{n:"50K",l:"Transforms"},{n:"Free",l:"to start"}].map(s=>(
              <div key={s.l} className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400"/>
                <span className="font-semibold text-white">{s.n}</span>
                <span className="text-white/40">{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* The Studio */}
        <div className="workspace-chrome overflow-hidden">
          {/* Chrome bar */}
          <div className="flex items-center gap-3 px-5 py-3 border-b border-white/8 bg-white/3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70"/>
              <div className="w-3 h-3 rounded-full bg-amber-500/70"/>
              <div className="w-3 h-3 rounded-full bg-green-500/70"/>
            </div>
            <div className="flex-1 max-w-xs mx-auto bg-white/6 border border-white/8 rounded-lg h-7 flex items-center px-3 gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-dot"/>
              <span className="text-xs text-white/40 font-mono">app.morphix.ai</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 ml-auto">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-dot"/>
              <span className="text-xs text-white/50 font-medium">Live Studio</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/6 bg-white/2 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold transition-all duration-200 border-b-2 flex-shrink-0 ${
                    activeTab===tab.id
                      ? "border-indigo-500 text-white bg-white/5"
                      : "border-transparent text-white/40 hover:text-white/70 hover:bg-white/3"
                  }`}>
                  <Icon className="w-4 h-4"/>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Panel on white bg for readability */}
          <div className="bg-white/98 min-h-[300px]">
            {activeTab==="transform" && <TransformPanel/>}
            {activeTab==="dna"       && <DNAPanel/>}
            {activeTab==="scratch"   && <ScratchPanel/>}
            {activeTab==="browse"    && <BrowsePanel/>}
          </div>
        </div>

        {/* Below workspace hint */}
        <div className="flex items-center justify-center gap-2 mt-5 text-xs text-white/30">
          <ChevronRight className="w-3.5 h-3.5"/>
          <span>Start free · No credit card · Export React + Tailwind + Next.js</span>
        </div>
      </div>
    </section>
  );
}
