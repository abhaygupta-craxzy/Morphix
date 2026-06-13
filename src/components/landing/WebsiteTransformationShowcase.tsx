"use client";

import { useState, useRef, useEffect } from "react";
import { Zap, Sparkles, Sliders, ChevronLeft, ChevronRight, ShoppingBag, Briefcase, Layout, Globe } from "lucide-react";

const showcaseCategories = [
  { id: "ecommerce", label: "Ecommerce Website", beforeTitle: "Legacy Store (2012)", afterTitle: "Remixed Stripe Style", icon: ShoppingBag },
  { id: "portfolio", label: "Creator Portfolio", beforeTitle: "Basic HTML (2008)", afterTitle: "Minimalist Apple Style", icon: Briefcase },
  { id: "dashboard", label: "SaaS Dashboard", beforeTitle: "Cluttered Metrics", afterTitle: "Developer Linear Style", icon: Layout },
  { id: "agency", label: "Digital Agency", beforeTitle: "Text Heavy Layout", afterTitle: "Premium Modern SaaS", icon: Globe }
];

export default function WebsiteTransformationShowcase() {
  const [activeCategory, setActiveCategory] = useState("ecommerce");
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Drag handlers for comparison slider
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleTouchStart = () => {
    isDragging.current = true;
  };

  useEffect(() => {
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      handleMove(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      if (e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchend", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <section id="transformation-showcase" className="py-24 bg-[#070B14] relative overflow-hidden border-t border-white/5">
      {/* Background orbs */}
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] orb-indigo blur-3xl opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#14B8A6] bg-[#14B8A6]/10 border border-[#14B8A6]/20 mb-4">
            <Sliders className="w-3.5 h-3.5" /> Visual Transformation Proof
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-white leading-tight">
            Drag to See the <span className="bg-gradient-to-r from-[#5B7FFF] to-[#7C5CFF] text-transparent bg-clip-text">Transformation</span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg">
            Hover and slide to inspect how Morphix restructures cluttered legacy code into industry-standard UI aesthetics.
          </p>
        </div>

        {/* Category Toggles */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {showcaseCategories.map((cat) => {
            const Icon = cat.icon;
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSliderPos(50);
                }}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all border ${
                  active
                    ? "bg-[#111827] border-[#5B7FFF] text-white shadow-lg shadow-indigo-500/10"
                    : "bg-[#111827]/40 border-white/5 text-white/50 hover:text-white/80 hover:border-white/10"
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Interactive Comparison Canvas Wrapper */}
        <div
          ref={containerRef}
          className="relative w-full max-w-4xl mx-auto h-[450px] rounded-3xl border border-white/10 overflow-hidden bg-[#111827] shadow-[0_20px_50px_rgba(0,0,0,0.6)] select-none"
        >
          {/* Label Before */}
          <div className="absolute left-6 top-6 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-[10px] font-bold text-white/70 uppercase tracking-widest z-30">
            {showcaseCategories.find((c) => c.id === activeCategory)?.beforeTitle}
          </div>

          {/* Label After */}
          <div className="absolute right-6 top-6 bg-[#5B7FFF]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 text-[10px] font-bold text-white uppercase tracking-widest z-30">
            {showcaseCategories.find((c) => c.id === activeCategory)?.afterTitle}
          </div>

          {/* Canvas #1: Before (Cluttered Old Site, full width at background) */}
          <div className="absolute inset-0 w-full h-full bg-slate-950 p-8 pt-20 flex flex-col justify-between select-none">
            {activeCategory === "ecommerce" && (
              <div className="space-y-6 flex flex-col justify-between h-full font-serif text-[#070B14]">
                <div className="flex items-center justify-between border-b-2 border-slate-700/50 pb-4">
                  <span className="font-extrabold text-[#991b1b] text-xl">UglyWidgets Inc.</span>
                  <div className="flex gap-4 text-xs text-blue-500 underline">
                    <span>Products Catalog</span>
                    <span>Shopping Cart</span>
                    <span>Contact details</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 my-auto">
                  {[1, 2, 3].map((id) => (
                    <div key={id} className="border border-slate-400 bg-slate-100 p-3 flex flex-col gap-2 rounded">
                      <div className="h-24 bg-slate-300 border border-slate-400 flex items-center justify-center font-sans text-xs text-slate-500">Image Place-Holder</div>
                      <div className="font-bold text-xs">Standard Widget {id}</div>
                      <div className="text-[10px] text-slate-600 font-sans">Made of plastic. Direct shipping. $12.50</div>
                      <button className="bg-slate-300 border border-slate-400 text-slate-800 text-[10px] py-1 rounded">Buy Now</button>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-400 pt-4 flex justify-between items-center text-xs">
                  <span>© 2012 UglyWidgets Inc. All rights reserved.</span>
                  <span className="text-blue-500 underline">Terms and Conditions</span>
                </div>
              </div>
            )}

            {activeCategory === "portfolio" && (
              <div className="space-y-6 flex flex-col justify-between h-full font-mono text-[#070B14]">
                <div className="border-2 border-black p-4 bg-yellow-100/50">
                  <h1 className="text-2xl font-bold text-center underline">Abhay PORTFOLIO SITE</h1>
                  <p className="text-center text-xs mt-1">Updated last on: October 2008</p>
                </div>
                <div className="flex gap-4 flex-1 items-center justify-center">
                  <div className="w-1/3 bg-slate-200 border border-black p-3 space-y-2 text-[10px]">
                    <div className="font-bold underline">NAV LINKS</div>
                    <div>- Home Page</div>
                    <div>- My Projects</div>
                    <div>- Contact Form</div>
                  </div>
                  <div className="flex-1 bg-white border border-black p-4 space-y-2">
                    <h3 className="font-bold underline">Welcome to my home on the web!</h3>
                    <p className="text-[10px] leading-relaxed">
                      I write code in C++ and Java. In my free time, I maintain a collection of website templates. Contact me at my hotmail address below.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeCategory === "dashboard" && (
              <div className="space-y-4 flex flex-col justify-between h-full text-slate-300 font-sans">
                <div className="bg-slate-800 border border-slate-700 p-2 flex items-center justify-between text-xs font-bold text-white rounded">
                  <span>METRICS_CONSOL_V4</span>
                  <div className="flex gap-2">
                    <span className="bg-red-900 px-2 py-0.5 border border-red-500">STOP</span>
                    <span className="bg-green-900 px-2 py-0.5 border border-green-500">RUNNING</span>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2 my-auto">
                  {["ERRS: 54", "CPU: 92%", "CONN: 2400", "MEM: 12GB"].map((metric) => (
                    <div key={metric} className="bg-slate-900 border border-slate-700 p-3 text-center text-xs font-bold font-mono">
                      {metric}
                    </div>
                  ))}
                </div>
                <div className="border border-slate-700 bg-slate-900/60 p-4 rounded h-36 flex items-center justify-center text-xs text-slate-500">
                  [Graph showing chaotic raw values compiled every 1 hour]
                </div>
              </div>
            )}

            {activeCategory === "agency" && (
              <div className="space-y-6 flex flex-col justify-between h-full font-serif text-[#070B14]">
                <div className="text-center py-6">
                  <h1 className="text-3xl font-bold">DIGITAL CREATIVE CONSULTANTS LTD</h1>
                  <h3 className="text-xs italic text-slate-600 mt-2"> We deliver synergy across corporate branding structures </h3>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs font-sans text-slate-700">
                  <div>
                    <h4 className="font-bold text-slate-900 font-serif mb-1">Our Core Philosophies</h4>
                    <p className="leading-relaxed">
                      We optimize operations, engage in interactive brainstorm sessions, design brochures, and help businesses scale their local presence through television and radio slots.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 font-serif mb-1">Our Deliverables</h4>
                    <p className="leading-relaxed">
                      Detailed consultation reports, PDF style assets, graphic design blueprints, and legacy HTML table codes matching all desktop screen margins.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Canvas #2: After (Transformed, slider width clip boundary) */}
          <div
            className="absolute inset-y-0 left-0 h-full overflow-hidden border-r-2 border-white z-10 transition-all select-none"
            style={{ width: `${sliderPos}%` }}
          >
            {/* Inner frame has full original width to align layers correctly */}
            <div className="absolute inset-y-0 left-0 w-[894px] h-full bg-[#0a0e1a] p-8 pt-20 flex flex-col justify-between">
              {activeCategory === "ecommerce" && (
                <div className="space-y-6 flex flex-col justify-between h-full font-sans text-white">
                  {/* Stripe Navbar */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-xl bg-gradient-to-br from-[#5B7FFF] to-[#7C5CFF] flex items-center justify-center">
                        <Zap className="w-2.5 h-2.5 text-white fill-current" />
                      </div>
                      <span className="font-extrabold tracking-tight text-white text-base">Morphix Store</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-medium text-white/50">
                      <span>Products</span>
                      <span>Pricing</span>
                      <span>Developers</span>
                      <button className="bg-white/10 text-white font-bold px-3 py-1.5 rounded-xl hover:bg-white/20 transition-all">Launch Dashboard</button>
                    </div>
                  </div>

                  {/* Stripe Ecommerce Layout */}
                  <div className="grid grid-cols-3 gap-4 my-auto">
                    {[
                      { id: 1, name: "Premium Widget 01", desc: "Constructed of surgical-grade aerospace alloy.", price: "$49/mo" },
                      { id: 2, name: "Enterprise Hub Pro", desc: "Direct real-time streaming pipeline.", price: "$129/mo" },
                      { id: 3, name: "AI Core Controller", desc: "Adaptive neural-net processing unit.", price: "$199/mo" }
                    ].map((item) => (
                      <div key={item.id} className="glass-card p-4 flex flex-col justify-between border border-white/10 rounded-2xl bg-[#111827]/40 hover:border-[#5B7FFF]/30 transition-all min-h-[170px]">
                        <div className="space-y-1.5">
                          <div className="h-20 bg-gradient-to-br from-[#5B7FFF]/10 to-[#7C5CFF]/10 rounded-xl flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-[#5B7FFF] animate-pulse-glow" />
                          </div>
                          <div className="font-bold text-xs text-white">{item.name}</div>
                          <div className="text-[9px] text-white/40 leading-normal">{item.desc}</div>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs font-bold text-[#14B8A6]">{item.price}</span>
                          <button className="bg-[#5B7FFF] text-white text-[9px] font-bold px-3 py-1.5 rounded-lg">Buy Now</button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="border-t border-white/5 pt-4 flex justify-between items-center text-[10px] text-white/30">
                    <span>© 2026 Morphix Store. Secure transactions by Stripe.</span>
                    <span className="text-[#5B7FFF]">Terms · Privacy System</span>
                  </div>
                </div>
              )}

              {activeCategory === "portfolio" && (
                <div className="space-y-6 flex flex-col justify-between h-full font-sans text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#14B8A6] uppercase tracking-widest bg-[#14B8A6]/10 px-2 py-0.5 rounded">Apple Minimalist style</span>
                    <span className="text-xs text-white/50">Curator Portfolio</span>
                  </div>
                  <div className="space-y-4 my-auto max-w-xl">
                    <h1 className="text-3xl font-black tracking-tight leading-none text-white">
                      Designing digital frameworks with surgical precision.
                    </h1>
                    <p className="text-white/60 text-xs leading-relaxed font-light">
                      Senior design engineer modeling high-fidelity frontends in React, WebGL, and custom shaders. Crafting premium SaaS templates for creators.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-white/5 bg-white/3 p-4 rounded-2xl flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">Apple Style Presets</div>
                        <div className="text-[9px] text-white/40">Clean geometry & rich typography</div>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping-slow" />
                    </div>
                    <div className="border border-white/5 bg-white/3 p-4 rounded-2xl flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">Direct Export</div>
                        <div className="text-[9px] text-white/40">Clean Tailwind source code</div>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                  </div>
                </div>
              )}

              {activeCategory === "dashboard" && (
                <div className="space-y-5 flex flex-col justify-between h-full text-white font-sans">
                  {/* Linear Header */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#7C5CFF]" />
                      <span className="font-mono text-xs text-white/70">linear-metrics-studio</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/5 border border-white/8 px-2 py-0.5 rounded text-[8px] font-mono text-[#7C5CFF]">
                      <span className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse-dot" />
                      <span>Live Synced</span>
                    </div>
                  </div>

                  {/* Linear Bento metrics */}
                  <div className="grid grid-cols-4 gap-3 my-auto">
                    {[
                      { l: "ERRORS REDUCED", v: "0.02%", diff: "-98%" },
                      { l: "CPU UTILITY", v: "24.5%", diff: "Optimized" },
                      { l: "CONNECTIONS", v: "48.2K", diff: "+240%" },
                      { l: "MEM SCALE", v: "1.4GB", diff: "-84%" }
                    ].map((item) => (
                      <div key={item.l} className="bg-[#111827]/40 border border-white/10 p-3.5 rounded-2xl space-y-1 text-left">
                        <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">{item.l}</span>
                        <div className="text-base font-black text-white">{item.v}</div>
                        <span className="text-[8px] text-[#14B8A6] font-bold bg-[#14B8A6]/10 px-1 rounded">{item.diff}</span>
                      </div>
                    ))}
                  </div>

                  {/* Graph */}
                  <div className="border border-white/10 bg-[#111827]/60 rounded-2xl p-4 h-36 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[9px] text-white/40">
                      <span>Live stream optimization cycle</span>
                      <span>Target: Stripe API</span>
                    </div>
                    <div className="flex items-end gap-1 h-20 pt-4">
                      {[30, 45, 35, 60, 50, 75, 90, 85, 100, 95, 110, 105, 120].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-[#7C5CFF] to-[#5B7FFF] rounded-sm hover:from-[#14B8A6] hover:to-[#14B8A6] transition-colors"
                          style={{ height: `${h / 1.5}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeCategory === "agency" && (
                <div className="space-y-6 flex flex-col justify-between h-full font-sans text-white">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-white to-white/70 text-transparent bg-clip-text">MORPHIX CREATIVE</span>
                    <button className="bg-gradient-to-r from-[#5B7FFF] to-[#7C5CFF] text-white text-[9px] font-bold px-3 py-1.5 rounded-xl">Scale Project</button>
                  </div>
                  <div className="my-auto space-y-4 max-w-xl">
                    <span className="text-[8px] font-bold text-[#14B8A6] uppercase tracking-widest bg-[#14B8A6]/10 px-2 py-0.5 rounded">Digital agency style</span>
                    <h1 className="text-3xl font-black leading-tight tracking-tight">
                      Scaling digital interfaces into business revenue engines.
                    </h1>
                    <p className="text-white/50 text-xs leading-relaxed font-light">
                      We optimize application logic, apply clean design DNA patterns, design unified components, and help startups scale core engineering frameworks directly on GitHub.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-white/40">
                    <span>✓ Automated Design DNA Extraction</span>
                    <span>✓ Complete Style Transformation presets</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Slider comparison controller bar/handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_15px_rgba(255,255,255,0.8)]"
            style={{ left: `${sliderPos}%` }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg border border-slate-200">
              <ChevronLeft className="w-3.5 h-3.5 text-slate-700 flex-shrink-0" />
              <ChevronRight className="w-3.5 h-3.5 text-slate-700 flex-shrink-0 -ml-1" />
            </div>
          </div>
        </div>

        {/* Below drag tip */}
        <div className="text-center mt-6 text-xs text-white/30 font-medium">
          Drag the sliding button left or right to inspect transformed structural CSS grids.
        </div>
      </div>
    </section>
  );
}
