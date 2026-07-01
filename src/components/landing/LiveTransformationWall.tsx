"use client";

import { useState, useEffect } from "react";
import { Zap, Sparkles } from "lucide-react";



/* mini website cards — neutral palette, no purple */
const SITES = [
  { from:{name:"Shopify Store",  navBg:"bg-[#96bf48]",   heroBg:"bg-[#f8f9fa]",  accent:"#96bf48"},
    to:  {name:"Stripe Style",   navBg:"bg-slate-800",    heroBg:"bg-slate-950",   accent:"#F59E0B"} },
  { from:{name:"Portfolio 2010", navBg:"bg-slate-700",    heroBg:"bg-slate-100",   accent:"#64748b"},
    to:  {name:"Apple Style",    navBg:"bg-zinc-950",     heroBg:"bg-zinc-900",    accent:"#f5f5f7"} },
  { from:{name:"Metrics Panel",  navBg:"bg-red-800",      heroBg:"bg-red-950",     accent:"#ef4444"},
    to:  {name:"Linear Style",   navBg:"bg-neutral-900",  heroBg:"bg-neutral-950", accent:"#FBBF24"} },
  { from:{name:"Agency Site",    navBg:"bg-amber-700",    heroBg:"bg-amber-50",    accent:"#f59e0b"},
    to:  {name:"Modern SaaS",    navBg:"bg-slate-800",    heroBg:"bg-slate-950",   accent:"#94A3B8"} },
  { from:{name:"Blog 2014",      navBg:"bg-green-800",    heroBg:"bg-green-50",    accent:"#22c55e"},
    to:  {name:"Framer Style",   navBg:"bg-neutral-800",  heroBg:"bg-neutral-950", accent:"#F59E0B"} },
  { from:{name:"E-Commerce",     navBg:"bg-rose-700",     heroBg:"bg-rose-50",     accent:"#f43f5e"},
    to:  {name:"Fintech Style",  navBg:"bg-slate-900",    heroBg:"bg-slate-950",   accent:"#FBBF24"} },
  { from:{name:"Corp Website",   navBg:"bg-gray-600",     heroBg:"bg-gray-100",    accent:"#9ca3af"},
    to:  {name:"Startup Style",  navBg:"bg-zinc-900",     heroBg:"bg-zinc-950",    accent:"#F59E0B"} },
  { from:{name:"Event Page",     navBg:"bg-teal-700",     heroBg:"bg-teal-50",     accent:"#14b8a6"},
    to:  {name:"Enterprise SaaS",navBg:"bg-slate-800",    heroBg:"bg-slate-950",   accent:"#94A3B8"} },
  { from:{name:"Recipe Blog",    navBg:"bg-orange-700",   heroBg:"bg-orange-50",   accent:"#f97316"},
    to:  {name:"Minimal Clean",  navBg:"bg-slate-50",     heroBg:"bg-white",       accent:"#1e293b"} },
  { from:{name:"Legal Firm",     navBg:"bg-neutral-700",  heroBg:"bg-neutral-100", accent:"#737373"},
    to:  {name:"Notion Style",   navBg:"bg-white",        heroBg:"bg-slate-50",    accent:"#000000"} },
];

function MiniCard({ site, phase, delay }: { site: typeof SITES[0]; phase:"before"|"transforming"|"after"; delay:number }) {
  const s = phase==="after" ? site.to : site.from;
  const isTransforming = phase==="transforming";
  return (
    <div
      className={`rounded-xl overflow-hidden border bg-[#0D0F1A] transition-all duration-700 shrink-0 w-36 h-[108px] ${
        isTransforming ? "border-[#F59E0B]/40 shadow-[0_0_15px_rgba(245,158,11,0.15)]" : "border-white/7"
      }`}
      style={{animationDelay:`${delay}ms`}}>
      {/* mini nav */}
      <div className={`${s.navBg} h-5 flex items-center px-2 gap-1`}>
        <div className="w-2.5 h-2.5 rounded-md bg-white/30"/>
        <div className="w-8 h-1 rounded bg-white/25"/>
        <div className="ml-auto w-5 h-2 rounded bg-white/20"/>
      </div>
      {/* mini body */}
      <div className={`${s.heroBg} p-2 space-y-1.5 relative overflow-hidden`} style={{height:"calc(100% - 20px)"}}>
        {isTransforming && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#030304]/70 z-10">
            <div className="flex flex-col items-center gap-1">
              <Zap className="w-4 h-4 text-[#F59E0B] animate-pulse-glow"/>
              <div className="w-12 h-0.5 bg-[#0D0F1A] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] animate-shimmer w-1/2"/>
              </div>
            </div>
          </div>
        )}
        <div className="h-1.5 w-2/3 rounded bg-white/20"/>
        <div className="h-1 w-full rounded bg-white/10"/>
        <div className="h-1 w-4/5 rounded bg-white/10"/>
        <div className="h-3 w-10 rounded-lg mt-0.5" style={{backgroundColor:s.accent==="#f5f5f7"?"#555":s.accent+"99"}}/>
        <div className="grid grid-cols-3 gap-0.5">
          {[0,1,2].map(i=><div key={i} className="h-3 rounded bg-white/8 border border-white/5"/>)}
        </div>
      </div>
    </div>
  );
}

function TransformRow({ sites, rowDelay=0, reverse=false }: { sites:typeof SITES; rowDelay?:number; reverse?:boolean }) {
  const [phases, setPhases] = useState<("before"|"transforming"|"after")[]>(sites.map(()=>"before"));
  useEffect(()=>{
    let i=0;
    const cycle=()=>{
      const idx=i%sites.length;
      setPhases(prev=>{const n=[...prev]; n[idx]="transforming"; return n;});
      setTimeout(()=>setPhases(prev=>{const n=[...prev]; n[idx]="after"; return n;}),800);
      i++;
    };
    const iv=setInterval(cycle,1400);
    const t=setTimeout(()=>cycle(),rowDelay);
    return ()=>{clearInterval(iv); clearTimeout(t);};
  },[sites.length,rowDelay]);

  return (
    <div className={`flex gap-4 ${reverse?"animate-marquee-r":"animate-marquee-l"}`} style={{width:"max-content"}}>
      {[...sites,...sites].map((site,i)=>(
        <div key={i} className="flex flex-col gap-1.5">
          <MiniCard site={site} phase={phases[i%sites.length]} delay={i*80}/>
          <div className="text-center text-[8px] text-white/28 font-mono truncate w-36">
            {phases[i%sites.length]==="after"?site.to.name:site.from.name}
            {phases[i%sites.length]==="after"&&<span className="text-[#F59E0B] ml-1">✓</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function LiveTransformationWall() {
  return (
    <section className="relative py-16 overflow-hidden border-t border-white/5"
      style={{background:"#030304"}}>
      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-[0.07] pointer-events-none"/>
      {/* Very subtle warm glow in center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[100px] opacity-20 pointer-events-none"
        style={{background:"radial-gradient(ellipse,rgba(245,158,11,0.25) 0%,transparent 70%)"}}/>

      {/* Gradient masks */}
      <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#030304] to-transparent z-10 pointer-events-none"/>
      <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#030304] to-transparent z-10 pointer-events-none"/>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto px-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
            style={{background:"rgba(245,158,11,0.07)",border:"1px solid rgba(245,158,11,0.20)",color:"rgba(253,230,138,0.80)"}}>
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]"/>
            <span className="text-xs font-bold">Live · Continuous · Real-Time</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            See Morphix{" "}
            <span className="text-transparent bg-clip-text"
              style={{backgroundImage:"linear-gradient(135deg,#FBBF24,#F59E0B,#FCD34D)",backgroundSize:"200% 100%",animation:"shimmerText 3.5s linear infinite"}}>
              In Motion.
            </span>
          </h2>
          <p className="text-white/35 text-base sm:text-lg">
            Every card is a real website being transformed. This is what Morphix does.
          </p>
        </div>

        {/* Three rows */}
        <div className="space-y-5 overflow-hidden">
          <TransformRow sites={SITES} rowDelay={0}/>
          <TransformRow sites={[...SITES].reverse()} rowDelay={700} reverse/>
          <TransformRow sites={SITES.slice(3).concat(SITES.slice(0,3))} rowDelay={350}/>
        </div>

        {/* Stat strip */}
        <div className="text-center mt-14 px-4">
          <div className="inline-flex items-center gap-8 rounded-2xl px-8 py-4 backdrop-blur-xl"
            style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)"}}>
            {[{n:"50,000+",l:"Sites Transformed"},{n:"1.4s",l:"Avg. Transform Time"},{n:"10+",l:"Style Presets"},{n:"100%",l:"Export Ready"}].map(s=>(
              <div key={s.l} className="text-center">
                <div className="text-lg font-black text-white">{s.n}</div>
                <div className="text-[10px] text-white/38 font-medium">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes shimmerText{0%{background-position:0% 50%}100%{background-position:200% 50%}}`}</style>
    </section>
  );
}
