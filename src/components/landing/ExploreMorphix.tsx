"use client";

import { useState, useEffect, useRef, forwardRef } from "react";
import {
  Search, Code2, Download, Globe, GitBranch,
  Camera, FileText, Sparkles, Palette, Type,
  TrendingUp, AlertTriangle, Star, Check, RefreshCw, Zap
} from "lucide-react";

/* ─── Types ─── */
type TabId = "explore" | "transform" | "create";

interface ExploreMorphixProps {
  activeTab?: TabId;
  onTabChange?: (tab: TabId) => void;
}


const COMPONENTS = [
  { id:"c1", name:"Gradient Hero", cat:"Heroes", rating:4.9, uses:"12.4k", colors:["#F59E0B","#0D0F1A"],
    preview:
      <div className="w-full h-full relative overflow-hidden" style={{background:"#08090F"}}>
        <div className="absolute inset-0" style={{background:"radial-gradient(ellipse 80% 55% at 50% -5%, rgba(245,158,11,0.18) 0%, transparent 60%)"}}/>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-2">
          <div className="h-2 w-16 rounded-full bg-white/20"/>
          <div className="h-4 w-24 rounded bg-white/40"/>
          <div className="h-1.5 w-12 rounded bg-white/15"/>
          <div className="h-4 w-14 rounded-full bg-[#F59E0B] mt-0.5 flex items-center justify-center">
            <div className="h-1 w-8 rounded bg-black/40"/>
          </div>
        </div>
      </div>
  },
  { id:"c2", name:"Glass Navbar", cat:"Navbars", rating:4.8, uses:"9.1k", colors:["#0D0F1A","#F59E0B"],
    preview:
      <div className="w-full h-full flex flex-col" style={{background:"#08090F"}}>
        <div className="flex items-center justify-between px-3 py-2 border-b border-white/5"
          style={{background:"rgba(13,15,26,0.7)",backdropFilter:"blur(8px)"}}>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-[#F59E0B]/70"/>
            <div className="w-8 h-1 rounded bg-white/40"/>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-0.5 rounded bg-white/25"/><div className="w-4 h-0.5 rounded bg-white/25"/>
          </div>
          <div className="h-3 w-10 rounded-full bg-[#F59E0B]/80"/>
        </div>
        <div className="flex-1 p-2 space-y-1">
          <div className="h-2 w-3/4 rounded bg-white/20"/>
          <div className="h-1.5 w-full rounded bg-white/10"/>
        </div>
      </div>
  },
  { id:"c3", name:"3-Tier Pricing", cat:"Pricing", rating:4.9, uses:"6.8k", colors:["#0D0F1A","#F59E0B"],
    preview:
      <div className="w-full h-full p-1 flex gap-0.5 items-stretch" style={{background:"#08090F"}}>
        {[false,true,false].map((active,i)=>(
          <div key={i} className="flex-1 rounded border flex flex-col items-center gap-0.5 p-0.5"
            style={active?{background:"rgba(245,158,11,0.10)",border:"1px solid rgba(245,158,11,0.30)"}:{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)"}}>
            <div className="text-[5px] font-bold text-white/60">{["Starter","Pro","Team"][i]}</div>
            <div className="text-[8px] font-black text-white">$29</div>
            <div className="w-full h-0.5 rounded bg-white/8 my-0.5"/>
            {active&&<div className="h-3 w-full rounded bg-[#F59E0B]"/>}
          </div>
        ))}
      </div>
  },
  { id:"c4", name:"Analytics Dashboard", cat:"Dashboard", rating:4.7, uses:"5.2k", colors:["#F59E0B","#0D0F1A"],
    preview:
      <div className="w-full h-full p-1.5 flex flex-col gap-1" style={{background:"#08090F"}}>
        <div className="grid grid-cols-3 gap-0.5">
          {[["24K","bg-[#F59E0B]/15"],["89%","bg-white/8"],["1.4s","bg-white/5"]].map(([v,c])=>(
            <div key={v} className={`${c} rounded p-0.5`}><div className="text-[6px] font-bold text-white/70">{v}</div></div>
          ))}
        </div>
        <div className="flex-1 bg-white/4 rounded p-0.5 flex items-end gap-0.5">
          {[35,60,45,80,55,70,90].map((h,i)=>(
            <div key={i} className="flex-1 rounded-sm" style={{height:`${h}%`,background:i===3||i===6?"#F59E0B":"rgba(255,255,255,0.15)"}}/>
          ))}
        </div>
      </div>
  },
  { id:"c5", name:"Auth Form", cat:"Auth", rating:4.6, uses:"8.9k", colors:["#0D0F1A","#F59E0B"],
    preview:
      <div className="w-full h-full flex items-center justify-center" style={{background:"#08090F"}}>
        <div className="w-20 rounded border border-white/8 p-1.5 space-y-1"
          style={{background:"rgba(13,15,26,0.85)",backdropFilter:"blur(8px)"}}>
          <div className="text-[6px] font-bold text-white/60 text-center">Sign in</div>
          <div className="h-2 rounded border border-white/8 bg-white/4"/>
          <div className="h-2 rounded border border-white/8 bg-white/4"/>
          <div className="h-3 rounded bg-[#F59E0B] flex items-center justify-center">
            <div className="text-[5px] font-black text-black">Sign In</div>
          </div>
        </div>
      </div>
  },
  { id:"c6", name:"Bento Features", cat:"Heroes", rating:4.8, uses:"7.3k", colors:["#F59E0B","#0D0F1A"],
    preview:
      <div className="w-full h-full p-1 grid grid-cols-3 grid-rows-2 gap-0.5" style={{background:"#08090F"}}>
        {[
          {c:"bg-[#F59E0B]/8 border-[#F59E0B]/15",span:"col-span-2"},
          {c:"bg-white/5 border-white/8",span:""},
          {c:"bg-white/4 border-white/6",span:""},
          {c:"bg-white/5 border-white/8",span:"col-span-2"},
        ].map((f,i)=>(
          <div key={i} className={`${f.span} ${f.c} rounded border flex items-start p-0.5 gap-0.5`}>
            {i===0&&<div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] flex-shrink-0"/>}
            <div className="h-0.5 w-full rounded bg-white/20 mt-0.5"/>
          </div>
        ))}
      </div>
  },
];

const CATEGORIES = ["Navbars","Heroes","Pricing","Cards","Auth","Dashboard","Forms","Modals","Tables","Footers"];
const COLOR_TOKENS = ["#F59E0B","#FBBF24","#FCD34D","#0f172a","#1e293b","#334155","#64748b","#94a3b8"];

/* ─── Explore Tab ─── */
function ExploreTab() {
  const [selectedCat, setSelectedCat] = useState("Heroes");
  const [selectedComp, setSelectedComp] = useState(COMPONENTS[0]);
  const [search, setSearch] = useState("");
  const [showCode, setShowCode] = useState(false);
  const filtered = COMPONENTS.filter(c => (selectedCat==="All"||c.cat===selectedCat) && c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex h-full" style={{minHeight:"480px"}}>
      {/* Sidebar */}
      <div className="w-48 shrink-0 border-r border-white/6 flex flex-col overflow-y-auto"
        style={{background:"rgba(4,4,8,0.70)",backdropFilter:"blur(12px)"}}>
        <div className="p-3 border-b border-white/6">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-white/25"/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..."
              className="w-full pl-7 pr-2 py-1.5 rounded-lg text-[11px] text-white placeholder:text-white/22 focus:outline-none transition-all"
              style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)"}}
              onFocus={e=>{e.target.style.border="1px solid rgba(255,255,255,0.25)";}}
              onBlur={e=>{e.target.style.border="1px solid rgba(255,255,255,0.08)";}}
            />
          </div>
        </div>
        <div className="p-2 flex-1">
          <div className="text-[9px] font-bold text-white/22 uppercase tracking-widest px-2 mb-2">Categories</div>
          {["All",...CATEGORIES].map(cat=>(
            <button key={cat} onClick={()=>setSelectedCat(cat)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all mb-0.5 ${
                selectedCat===cat ? "text-white" : "text-white/38 hover:text-white/65 hover:bg-white/4"
              }`}
              style={selectedCat===cat?{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.15)"}:{}}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Component grid */}
      <div className="w-64 border-r border-white/6 flex flex-col overflow-hidden"
        style={{background:"rgba(6,6,10,0.60)",backdropFilter:"blur(12px)"}}>
        <div className="flex items-center justify-between px-3 py-2 border-b border-white/6">
          <span className="text-[9px] font-bold text-white/28 uppercase tracking-widest">Gallery</span>
          <span className="text-[9px]" style={{color:"rgba(255,255,255,0.38)"}}>{filtered.length} components</span>
        </div>
        <div className="flex-1 overflow-y-auto p-2 grid grid-cols-2 gap-2">
          {(filtered.length>0?filtered:COMPONENTS).map(comp=>(
            <div key={comp.id} onClick={()=>setSelectedComp(comp)}
              className="rounded-lg border overflow-hidden cursor-pointer transition-all"
              style={selectedComp.id===comp.id
                ?{border:"1px solid rgba(255,255,255,0.28)",boxShadow:"0 0 12px rgba(255,255,255,0.06)"}
                :{border:"1px solid rgba(255,255,255,0.07)"}}>
              <div className="h-14 relative overflow-hidden" style={{background:"#07080C"}}>
                <div className="absolute inset-0">{comp.preview}</div>
              </div>
              <div className="p-1.5" style={{background:"rgba(10,11,16,0.80)"}}>
                <div className="text-[9px] font-bold text-white/65 truncate">{comp.name}</div>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-2 h-2 fill-white text-white"/>
                  <span className="text-[8px] text-white/38">{comp.rating}</span>
                  <span className="ml-auto text-[8px] text-white/22">{comp.uses}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview / Code panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-white/6">
          <button onClick={()=>setShowCode(false)}
            className={`text-[11px] font-bold px-2.5 py-1 rounded-md transition-all ${!showCode?"text-black":"text-white/30 hover:text-white/55"}`}
            style={!showCode?{background:"#ffffff",border:"1px solid #ffffff"}:{}}>
            Preview
          </button>
          <button onClick={()=>setShowCode(true)}
            className={`text-[11px] font-bold px-2.5 py-1 rounded-md transition-all ${showCode?"text-black":"text-white/30 hover:text-white/55"}`}
            style={showCode?{background:"#ffffff",border:"1px solid #ffffff"}:{}}>
            <Code2 className="w-3 h-3 inline mr-1"/>Code
          </button>
          <div className="ml-auto flex items-center gap-1.5">
            <button className="flex items-center gap-1 px-2.5 py-1 text-black text-[10px] font-bold rounded-lg hover:opacity-90 transition-all"
              style={{background:"#ffffff"}}>
              <Download className="w-2.5 h-2.5"/>Export
            </button>
          </div>
        </div>

        {!showCode ? (
          <div className="flex-1 p-4 flex flex-col gap-3">
            {/* Large preview — glass panel, dark neutral */}
            <div className="flex-1 rounded-xl overflow-hidden relative border border-white/7"
              style={{background:"#08090F",boxShadow:"inset 0 1px 0 rgba(255,255,255,0.04)"}}>
              {/* Realistic full-panel view */}
              <div className="absolute inset-0 flex flex-col">
                {/* Mini browser bar */}
                <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5"
                  style={{background:"rgba(13,15,26,0.60)",backdropFilter:"blur(8px)"}}>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500/60"/><div className="w-2 h-2 rounded-full bg-amber-400/60"/><div className="w-2 h-2 rounded-full bg-green-500/60"/>
                  </div>
                  <div className="flex-1 mx-2 px-2 py-0.5 rounded bg-white/5 border border-white/6 text-[9px] text-white/25 font-mono">preview.morphix.ai</div>
                </div>
                {/* Component preview at full scale */}
                <div className="flex-1 relative overflow-hidden">
                  <div className="absolute inset-0 scale-[0.85] origin-top">{selectedComp.preview}</div>
                </div>
              </div>
            </div>

            {/* Metadata row */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-white">{selectedComp.name}</div>
                <div className="text-[11px] text-white/32">{selectedComp.cat} · {selectedComp.uses} uses</div>
              </div>
              <div className="flex gap-1.5">
                {selectedComp.colors.map(c=>(
                  <div key={c} className="w-5 h-5 rounded-md border border-white/10" style={{backgroundColor:c}}/>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 p-4 overflow-auto">
            <div className="rounded-xl p-4 font-mono text-[11px] leading-relaxed border border-white/7"
              style={{background:"rgba(4,5,8,0.80)"}}>
              <div className={`text-[9px] font-bold text-white/38 uppercase tracking-widest mb-2`}>
                // {selectedComp.name}
              </div>
              <div><span className="text-white/60">export default</span> <span className="text-white/45">function</span> <span className="text-white/70">{selectedComp.name.replace(/\s/g,"")}</span><span className="text-white/35">{"() {"}</span></div>
              <div className="pl-4 text-white/40">  <span className="text-white/55">return</span> <span className="text-white/35">(</span></div>
              <div className="pl-8 text-white/55">{"<section className=\"...\">"}</div>
              <div className="pl-12 text-white/25">{"// Morphix Component"}</div>
              <div className="pl-8 text-white/55">{"</section>"}</div>
              <div className="pl-4 text-white/60">{")"}</div>
              <div className="text-white/40">{"}"}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Transform Tab ─── */
function TransformTab() {
  const [activeSource, setActiveSource] = useState("url");
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);

  function startAnalysis() {
    if (running||done) return;
    setRunning(true); setActiveStep(0);
    [0,1,2,3,4].forEach((s,i)=>{
      setTimeout(()=>{
        setActiveStep(s);
        if(i===4) setTimeout(()=>{setRunning(false);setDone(true);},700);
      },i*700);
    });
  }
  function reset(){setRunning(false);setDone(false);setActiveStep(-1);}

  const sources=[
    {id:"url",label:"Website URL",icon:Globe},{id:"github",label:"GitHub Repo",icon:GitBranch},
    {id:"screenshot",label:"Screenshot",icon:Camera},{id:"figma",label:"Figma File",icon:FileText},
    {id:"prompt",label:"Prompt",icon:Sparkles},
  ];
  const steps=[
    {label:"Import & Crawl",    done:done||(running&&activeStep>0), active:running&&activeStep===0},
    {label:"AI Analysis",       done:done||(running&&activeStep>1), active:running&&activeStep===1},
    {label:"Extract DNA",       done:done||(running&&activeStep>2), active:running&&activeStep===2},
    {label:"Generate Report",   done:done||(running&&activeStep>3), active:running&&activeStep===3},
    {label:"Transform",         done:done,                          active:running&&activeStep===4},
  ];

  return (
    <div className="flex h-full" style={{minHeight:"480px"}}>
      {/* Sidebar */}
      <div className="w-48 shrink-0 border-r border-white/6 flex flex-col p-3 gap-2"
        style={{background:"rgba(4,4,8,0.70)",backdropFilter:"blur(12px)"}}>
        <div className="text-[9px] font-bold text-white/22 uppercase tracking-widest mb-1">Import Source</div>
        {sources.map(src=>{
          const Icon=src.icon;
          return (
            <button key={src.id} onClick={()=>setActiveSource(src.id)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] font-medium text-left transition-all ${
                activeSource===src.id?"text-black":"text-white/38 hover:text-white/65 hover:bg-white/4"
              }`}
              style={activeSource===src.id?{background:"rgba(255,255,255,1)",border:"1px solid rgba(255,255,255,1)"}:{}}>
              <Icon className="w-3.5 h-3.5 flex-shrink-0"/>{src.label}
            </button>
          );
        })}
        <div className="mt-auto pt-3 border-t border-white/6 space-y-2">
          {steps.map((s,i)=>(
            <div key={i} className="flex items-center gap-2">
              <div className={`w-3.5 h-3.5 rounded-full flex-shrink-0 flex items-center justify-center transition-all ${
                s.done?"bg-white/15 border border-white/30"
                :s.active?"bg-white/8 border border-white/20 animate-border-pulse"
                :"bg-white/4 border border-white/8"
              }`}>
                {s.done&&<Check className="w-2 h-2 text-white"/>}
                {s.active&&<span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-dot"/>}
              </div>
              <span className={`text-[10px] ${s.done?"text-white/50":s.active?"text-white font-semibold":"text-white/22"}`}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden border-r border-white/6">
        <div className="p-4 border-b border-white/6">
          {/* URL Input */}
          <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 mb-3"
            style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)"}}>
            <Globe className="w-3.5 h-3.5 text-white/22 flex-shrink-0"/>
            <span className="text-[11px] font-mono text-white/38 flex-1 truncate">
              {activeSource==="github"?"github.com/user/legacy-corp-site":"https://oldcorp-widgets.com"}
            </span>
            <button onClick={startAnalysis} disabled={running}
              className="px-3 py-1 text-black text-[10px] font-bold rounded-lg transition-all disabled:opacity-50"
              style={{background:"#ffffff"}}>
              {running?<RefreshCw className="w-3 h-3 animate-spin inline"/>:"Analyze"}
            </button>
          </div>

          {/* Before / After */}
          <div className="grid grid-cols-2 gap-2 h-28">
            <div className="rounded-lg overflow-hidden border border-white/7 relative">
              <div className="absolute top-1 left-1.5 text-[8px] font-bold text-white/25 bg-[#030304]/80 px-1.5 py-0.5 rounded z-10">Before</div>
              <div className="w-full h-full flex flex-col bg-slate-200">
                <div className="bg-slate-700 px-2 py-1 flex items-center justify-between">
                  <span className="font-bold text-white text-[7px]">OLDCORP™</span>
                  <div className="flex gap-1.5 text-[5px] text-blue-300 underline"><span>Home</span><span>Prod</span></div>
                </div>
                <div className="flex-1 p-1.5 space-y-1">
                  <div className="text-[7px] font-serif font-bold text-slate-800">Best Products Since 1998</div>
                  <div className="h-1 w-full rounded bg-slate-300"/><div className="h-1 w-2/3 rounded bg-slate-300"/>
                  <div className="h-3 w-10 bg-slate-500 rounded text-[4px] text-white flex items-center justify-center font-bold">VIEW</div>
                </div>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border border-white/7 relative">
              <div className="absolute top-1 left-1.5 text-[8px] font-bold text-white/25 bg-[#030304]/80 px-1.5 py-0.5 rounded z-10">After</div>
              {done ? (
                <div className="w-full h-full flex flex-col" style={{background:"#08090F"}}>
                  <div className="px-2 py-1 flex items-center justify-between"
                    style={{background:"#ffffff"}}>
                    <span className="font-bold text-black text-[7px]">MORPHIX</span>
                    <div className="h-2.5 w-8 rounded-full bg-black/20"/>
                  </div>
                  <div className="flex-1 p-1.5 space-y-1">
                    <div className="text-[7px] font-black text-white">Redefine digital presence.</div>
                    <div className="h-1 w-full rounded bg-white/15"/><div className="h-1 w-2/3 rounded bg-white/10"/>
                    <div className="h-3 w-10 rounded bg-white text-[4px] text-black flex items-center justify-center font-black">Start</div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{background:"#08090F"}}>
                  {running?<RefreshCw className="w-4 h-4 text-white animate-spin"/>:<Sparkles className="w-4 h-4 text-white/10"/>}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 flex items-center justify-center">
          {!running&&!done&&(
            <div className="text-center">
              <button onClick={startAnalysis}
                className="flex items-center gap-2 px-5 py-2.5 text-black text-sm font-bold rounded-xl hover:opacity-90 transition-all shadow-lg"
                style={{background:"#ffffff"}}>
                <Zap className="w-4 h-4"/> Run Analysis
              </button>
              <div className="text-[10px] text-white/22 mt-2">Click to see the transformation pipeline</div>
            </div>
          )}
          {done&&(
            <div className="flex flex-col items-center gap-2 animate-morph-in-up">
              <div className="w-8 h-8 rounded-full bg-white/15 border border-white/30 flex items-center justify-center">
                <Check className="w-4 h-4 text-white"/>
              </div>
              <div className="text-sm font-bold text-white">Analysis Complete</div>
              <div className="text-[10px] text-white/30">Transformed in 1.4s · AI Score: 8.4/10</div>
              <button onClick={reset} className="text-[10px] text-white/28 hover:text-white/55 border border-white/10 px-3 py-1 rounded-full transition-colors mt-1">
                Run again ↺
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Design DNA inspector */}
      <div className="w-52 shrink-0 flex flex-col overflow-hidden">
        <div className="px-4 py-2 border-b border-white/6">
          <span className="text-[9px] font-bold text-white/28 uppercase tracking-widest">Design DNA Output</span>
        </div>
        <div className="flex-1 p-3 space-y-4 overflow-y-auto">
          <div className={`transition-all duration-500 ${done?"opacity-100":"opacity-20"}`}>
            <div className="flex items-center gap-1.5 mb-2">
              <Palette className="w-3 h-3 text-white"/>
              <span className="text-[9px] font-bold text-white/38 uppercase tracking-wider">Colors</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {COLOR_TOKENS.map(c=>(
                <div key={c} className="w-5 h-5 rounded-md border border-white/10 hover:scale-125 transition-transform cursor-pointer" style={{backgroundColor:c}}/>
              ))}
            </div>
          </div>

          <div className={`transition-all duration-500 delay-100 ${done?"opacity-100":"opacity-20"}`}>
            <div className="flex items-center gap-1.5 mb-2">
              <Type className="w-3 h-3 text-white"/>
              <span className="text-[9px] font-bold text-white/38 uppercase tracking-wider">Typography</span>
            </div>
            <div className="space-y-1.5">
              {[{s:"text-lg font-black",l:"Heading XL"},{s:"text-sm font-bold",l:"Heading MD"},{s:"text-xs font-medium",l:"Body"}].map(t=>(
                <div key={t.l} className="flex items-center justify-between py-0.5 border-b border-white/5">
                  <span className={`${t.s} text-white/55`}>Inter</span>
                  <span className="text-[8px] text-white/22">{t.l}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`transition-all duration-500 delay-200 ${done?"opacity-100":"opacity-20"}`}>
            <div className="flex items-center gap-1.5 mb-2">
              <TrendingUp className="w-3 h-3 text-white"/>
              <span className="text-[9px] font-bold text-white/38 uppercase tracking-wider">AI Report</span>
            </div>
            <div className="space-y-1.5">
              {[{label:"Fix spacing consistency",sev:"high"},{label:"Update CTA buttons",sev:"medium"},{label:"Modernize hero layout",sev:"high"}].map((item,i)=>(
                <div key={i} className={`flex items-center gap-1.5 p-1.5 rounded-lg border text-[9px] ${item.sev==="high"?"bg-white/5 border-white/12 text-white/55":"bg-white/3 border-white/7 text-white/35"}`}>
                  <AlertTriangle className="w-2.5 h-2.5 flex-shrink-0 mt-0.5"/>{item.label}
                </div>
              ))}
            </div>
          </div>

          {done&&(
            <button className="w-full flex items-center justify-center gap-1.5 py-2 text-black text-[10px] font-bold rounded-lg hover:opacity-90 transition-all animate-morph-in-up"
              style={{background:"#ffffff"}}>
              <Download className="w-2.5 h-2.5"/> Export DNA
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Create Tab ─── */
function CreateTab() {
  const [inputMode, setInputMode] = useState("prompt");
  const [prompt, setPrompt] = useState("");
  const [building, setBuilding] = useState(false);
  const [built, setBuilt] = useState(false);
  const [buildStep, setBuildStep] = useState(0);

  const inputModes=[
    {id:"prompt",label:"Prompt",icon:Sparkles},{id:"screenshot",label:"Screenshot",icon:Camera},
    {id:"figma",label:"Figma",icon:FileText},{id:"inspiration",label:"Inspiration",icon:Palette},
  ];
  const examples=["Dark SaaS landing page with bento features","Fintech dashboard with analytics charts","AI startup site with gradient hero","Developer tool with code previews"];

  function startBuilding(){
    if(!prompt&&inputMode==="prompt"){setPrompt(examples[0]);return;}
    if(building||built) return;
    setBuilding(true); setBuildStep(0);
    [0,1,2,3].forEach((s,i)=>{
      setTimeout(()=>{setBuildStep(s);if(i===3)setTimeout(()=>{setBuilding(false);setBuilt(true);},600);},i*800);
    });
  }

  return (
    <div className="flex h-full" style={{minHeight:"480px"}}>
      {/* Sidebar */}
      <div className="w-48 shrink-0 border-r border-white/6 flex flex-col p-3 gap-2"
        style={{background:"rgba(4,4,8,0.70)",backdropFilter:"blur(12px)"}}>
        <div className="text-[9px] font-bold text-white/22 uppercase tracking-widest mb-1">Create From</div>
        {inputModes.map(m=>{
          const Icon=m.icon;
          return (
            <button key={m.id} onClick={()=>setInputMode(m.id)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] font-medium text-left transition-all ${
                inputMode===m.id?"text-black":"text-white/38 hover:text-white/65 hover:bg-white/4"
              }`}
              style={inputMode===m.id?{background:"rgba(255,255,255,1)",border:"1px solid rgba(255,255,255,1)"}:{}}>
              <Icon className="w-3.5 h-3.5 flex-shrink-0"/>{m.label}
            </button>
          );
        })}
        <div className="mt-4 pt-3 border-t border-white/6">
          <div className="text-[9px] font-bold text-white/22 uppercase tracking-widest mb-2">Build Steps</div>
          {["Analyze input","Select components","Build layout","Apply theme"].map((s,i)=>(
            <div key={i} className="flex items-center gap-2 mb-1.5">
              <div className={`w-3 h-3 rounded-full flex-shrink-0 flex items-center justify-center ${
                (built||(building&&buildStep>i))?"bg-white/12 border border-white/25"
              :(building&&buildStep===i)?"bg-white/8 border border-white/15 animate-border-pulse"
              :"bg-white/4 border border-white/8"
            }`}>
              {(built||(building&&buildStep>i))&&<Check className="w-2 h-2 text-white"/>}
              {(building&&buildStep===i)&&<span className="w-1 h-1 rounded-full bg-white animate-pulse-dot"/>}
              </div>
              <span className={`text-[10px] ${built||(building&&buildStep>i)?"text-white/45":(building&&buildStep===i)?"text-white":"text-white/18"}`}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Input area */}
      <div className="flex-1 flex flex-col overflow-hidden border-r border-white/6">
        <div className="p-4 border-b border-white/6 flex-1 flex flex-col gap-3">
          {inputMode==="prompt" ? (
            <>
              <div className="text-[10px] font-bold text-white/28 uppercase tracking-widest">Describe your project</div>
              <textarea value={prompt} onChange={e=>setPrompt(e.target.value)}
                placeholder="A dark SaaS landing page with gradient hero, bento features grid, and pricing section..."
                rows={4}
                className="w-full px-3 py-2.5 rounded-xl text-[11px] text-white placeholder:text-white/18 focus:outline-none resize-none leading-relaxed transition-all"
                style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)"}}
                onFocus={e=>{e.target.style.border="1px solid rgba(255,255,255,0.35)"}}
                onBlur={e=>{e.target.style.border="1px solid rgba(255,255,255,0.08)"}}
              />
              <div className="flex flex-wrap gap-1.5">
                {examples.map(ex=>(
                  <button key={ex} onClick={()=>setPrompt(ex)} className="px-2 py-1 rounded-lg text-[9px] font-medium text-white/32 hover:text-white/55 hover:border-white/15 transition-all"
                    style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)"}}>
                    {ex.substring(0,28)}...
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl cursor-pointer transition-colors"
              style={{background:"rgba(255,255,255,0.02)",borderColor:"rgba(255,255,255,0.08)"}}>
              {inputMode==="screenshot"&&<Camera className="w-8 h-8 text-white/15"/>}
              {inputMode==="figma"&&<FileText className="w-8 h-8 text-white/15"/>}
              {inputMode==="inspiration"&&<Palette className="w-8 h-8 text-white/15"/>}
              <div className="text-sm font-bold text-white/28">Drop {inputMode} here</div>
              <div className="text-[10px] text-white/18">or click to browse</div>
            </div>
          )}
        </div>
        <div className="p-4">
          <button onClick={startBuilding} disabled={building}
            className="w-full flex items-center justify-center gap-2 py-3 text-black text-sm font-bold rounded-xl disabled:opacity-50 hover:opacity-90 transition-all"
            style={{background:"#ffffff"}}>
            {building?<><RefreshCw className="w-4 h-4 animate-spin"/> Building...</>
            :built?<><Check className="w-4 h-4"/> Built! Build again</>
            :<><Sparkles className="w-4 h-4"/> Build with AI</>}
          </button>
        </div>
      </div>

      {/* Generated preview */}
      <div className="w-64 shrink-0 flex flex-col overflow-hidden">
        <div className="px-4 py-2 border-b border-white/6 flex items-center justify-between">
          <span className="text-[9px] font-bold text-white/28 uppercase tracking-widest">Preview</span>
          {built&&<span className="text-[9px] text-white font-bold">✓ Ready</span>}
        </div>
        <div className="flex-1 p-3">
          {!built&&!building ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Sparkles className="w-8 h-8 text-white/10 mx-auto mb-2"/>
                <div className="text-[10px] text-white/20">Preview will appear here</div>
              </div>
            </div>
          ) : (
            <div className={`h-full rounded-xl overflow-hidden border transition-all duration-700 ${built?"opacity-100":"opacity-40"}`}
              style={{background:"linear-gradient(145deg,#111111 0%,#0a0a0a 100%)",border:"1px solid rgba(255,255,255,0.12)"}}>
              <div className="h-full p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-white/70"/>
                    <div className="w-8 h-1.5 rounded bg-white/20"/>
                  </div>
                  <div className="h-4 w-10 rounded-full bg-white/10 border border-white/10"/>
                </div>
                <div className="space-y-1.5">
                  <div className="h-4 w-3/4 rounded bg-gradient-to-r from-white/20 to-white/10"/>
                  <div className="h-2.5 w-full rounded bg-white/8"/><div className="h-2 w-2/3 rounded bg-white/6"/>
                  <div className="flex gap-1.5 mt-1">
                    <div className="h-5 w-14 rounded-full bg-white border border-white/30"/>
                    <div className="h-5 w-12 rounded-full bg-white/6 border border-white/10"/>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1.5 flex-1">
                  {[0,1,2,3].map(i=>(
                    <div key={i} className="rounded-lg border border-white/8 p-1.5" style={{background:"rgba(255,255,255,0.04)"}}>
                      <div className="w-4 h-4 rounded-md bg-white/10 mb-1"/>
                      <div className="h-1 w-full rounded bg-white/12"/><div className="h-1 w-2/3 rounded bg-white/8 mt-0.5"/>
                    </div>
                  ))}
                </div>
                {built&&(
                  <button className="flex items-center justify-center gap-1 py-1.5 rounded-lg text-[9px] font-bold text-black hover:opacity-90 transition-all"
                    style={{background:"#ffffff"}}>
                    <Download className="w-2.5 h-2.5"/> Export Code
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── InView hook ─── */
function useInView(threshold=0.1){
  const ref=useRef<HTMLDivElement>(null);
  const [inView,setInView]=useState(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setInView(true);},{threshold});
    if(ref.current)obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[threshold]);
  return {ref,inView};
}

const TABS:{id:TabId;label:string;emoji:string}[]=[
  {id:"explore",label:"Explore",emoji:"🧩"},
  {id:"transform",label:"Transform",emoji:"🌐"},
  {id:"create",label:"Create",emoji:"✨"},
];

/* ─── Main component with forwardRef ─── */
const ExploreMorphix = forwardRef<HTMLElement, ExploreMorphixProps>(
  function ExploreMorphix({ activeTab: externalTab, onTabChange }, ref) {
    const {ref:visRef, inView} = useInView(0.08);
    const [internalTab, setInternalTab] = useState<TabId>("explore");
    const [transitioning, setTransitioning] = useState(false);
    const activeTab = externalTab ?? internalTab;

    function switchTab(id: TabId) {
      if (id===activeTab) return;
      setTransitioning(true);
      setTimeout(()=>{
        if (onTabChange) onTabChange(id);
        else setInternalTab(id);
        setTransitioning(false);
      },250);
    }

    return (
      <section id="explore" ref={ref as any} className="relative overflow-hidden border-t"
        style={{background:"#050816", borderColor:"rgba(255,255,255,0.06)", paddingTop:"7rem", paddingBottom:"7rem"}}>

        <div ref={visRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ${inView?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
            <h2 className="text-white tracking-tight mb-0 leading-tight"
              style={{fontSize:"clamp(2.2rem,5vw,3.5rem)", fontWeight:300}}>
              One Workspace. Three Workflows.
            </h2>
          </div>

          {/* Tab switcher — pill style with blue indicator */}
          <div className={`flex justify-center mb-8 transition-all duration-700 delay-100 ${inView?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}>
            <div className="inline-flex items-center gap-1 p-1 rounded-xl"
              style={{background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)"}}>
              {TABS.map((tab)=>(
                <button key={tab.id} onClick={()=>switchTab(tab.id)}
                  className="relative flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-all"
                  style={{
                    color: activeTab===tab.id ? "rgba(255,255,255,0.95)" : "rgba(148,163,184,0.70)",
                    background: activeTab===tab.id ? "#1d4ed8" : "transparent",
                    boxShadow: activeTab===tab.id ? "0 0 16px rgba(59,130,246,0.40), inset 0 1px 0 rgba(255,255,255,0.10)" : "none",
                    border: activeTab===tab.id ? "1px solid rgba(59,130,246,0.40)" : "1px solid transparent",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                    outline: "none",
                  }}
                  onMouseEnter={e=>{ if(activeTab!==tab.id){ (e.currentTarget as HTMLButtonElement).style.color="rgba(255,255,255,0.85)"; (e.currentTarget as HTMLButtonElement).style.background="rgba(255,255,255,0.05)"; } }}
                  onMouseLeave={e=>{ if(activeTab!==tab.id){ (e.currentTarget as HTMLButtonElement).style.color="rgba(148,163,184,0.70)"; (e.currentTarget as HTMLButtonElement).style.background="transparent"; } }}
                >
                  <span>{tab.emoji}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Workspace chrome */}
          <div className={`transition-all duration-700 delay-200 ${inView?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`}
            style={{borderRadius:"1rem", overflow:"hidden", border:"1px solid rgba(59,130,246,0.12)", boxShadow:"0 40px 100px rgba(0,0,0,0.60), 0 0 0 1px rgba(59,130,246,0.05)"}}>

            {/* Title bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b"
              style={{background:"rgba(0,0,0,0.55)", borderColor:"rgba(255,255,255,0.06)"}}>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{background:"#ff5f57"}}/>
                <div className="w-2.5 h-2.5 rounded-full" style={{background:"#ffbd2e"}}/>
                <div className="w-2.5 h-2.5 rounded-full" style={{background:"#28ca41"}}/>
              </div>
              <div className="flex items-center gap-2 rounded-lg px-3 py-1"
                style={{background:"rgba(59,130,246,0.06)",border:"1px solid rgba(59,130,246,0.12)"}}>
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{background:"#4ade80", animation:"pulseGreen 2s ease-in-out infinite"}}/>
                <span className="text-[11px] font-mono" style={{color:"rgba(255,255,255,0.30)"}}>studio.morphix.ai — {activeTab}</span>
              </div>
              <span className="text-[10px] font-mono" style={{color:"rgba(147,197,253,0.40)"}}>
                {activeTab === "explore" ? "Exploring components" : activeTab === "transform" ? "Transforming website" : "Creating project"}
              </span>
            </div>

            {/* Tab content */}
            <div style={{minHeight:"750px",opacity:transitioning?0:1,transform:transitioning?"scale(0.993) translateY(4px)":"scale(1) translateY(0)",transition:"opacity 0.28s ease, transform 0.28s cubic-bezier(0.16,1,0.3,1)"}}>
              {activeTab==="explore"   && <ExploreTab/>}
              {activeTab==="transform" && <TransformTab/>}
              {activeTab==="create"    && <CreateTab/>}
            </div>
          </div>

          <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.35}} @keyframes pulseGreen{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(16,185,129,0.4)}50%{opacity:0.75;box-shadow:0 0 0 5px rgba(16,185,129,0)}}`}</style>
        </div>
      </section>
    );
  }
);

export default ExploreMorphix;
