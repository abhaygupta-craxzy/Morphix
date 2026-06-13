"use client";

import { useState } from "react";
import { Globe, Wand2, Sparkles, ArrowRight, Upload, FileCode2, Layers, Grid3X3, Database } from "lucide-react";

export default function ChooseStartingPoint() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section id="starting-points" className="py-24 bg-[#FAFBFC] relative border-t border-slate-100">
      <div className="absolute inset-0 dot-grid-light opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#5B7FFF] bg-[#5B7FFF]/10 border border-[#5B7FFF]/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" /> Workflow Starting Points
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#070B14] tracking-tight mb-4">
            Choose Your <span className="bg-gradient-to-r from-[#5B7FFF] to-[#7C5CFF] text-transparent bg-clip-text">Starting Point</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Whether you want to redesign an existing site, extract style from design mockups, or start fresh with AI layout engines.
          </p>
        </div>

        {/* Bento grid of 3 Premium Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: Existing Website */}
          <div
            onMouseEnter={() => setActiveCard(0)}
            onMouseLeave={() => setActiveCard(null)}
            className="group rounded-3xl border border-slate-200 bg-white p-7 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#5B7FFF]/10 border border-[#5B7FFF]/20 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Globe className="w-5 h-5 text-[#5B7FFF]" />
              </div>
              <h3 className="text-xl font-bold text-[#070B14] mb-2">Existing Website</h3>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Connect your live website domain or GitHub codebase. Analyze layout issues and apply a fully unified design style in clicks.
              </p>
            </div>

            {/* Mini Workspace Preview */}
            <div className="bg-[#F5F7FA] rounded-2xl p-4 border border-slate-200/60 space-y-3 relative overflow-hidden">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <div className="h-5 flex-1 bg-white border border-slate-200 rounded-lg flex items-center px-2 text-[8px] font-mono text-slate-400">
                  https://myoldsite.com
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 bg-white border border-slate-200 rounded-xl p-2.5 space-y-1">
                  <div className="h-2 w-3/4 rounded bg-slate-200" />
                  <div className="h-1.5 w-full rounded bg-slate-100" />
                  <div className="h-1.5 w-1/2 rounded bg-slate-100" />
                </div>
                <div className="w-16 bg-[#5B7FFF] text-white text-[8px] font-bold rounded-xl flex items-center justify-center p-2 text-center shadow-sm">
                  Analyze URL
                </div>
              </div>
              <div className="flex items-center justify-between text-[8px] font-bold text-slate-400 border-t border-slate-200/60 pt-2">
                <span className="flex items-center gap-1 text-[#5B7FFF]"><FileCode2 className="w-2.5 h-2.5" /> github-importer</span>
                <span>Active</span>
              </div>
            </div>

            <button className="mt-6 w-full flex items-center justify-center gap-1.5 py-3 border border-slate-200 rounded-xl text-xs font-bold text-[#070B14] hover:bg-slate-50 transition-colors cursor-pointer">
              Launch URL Redesigner <ArrowRight className="w-3.5 h-3.5 text-[#5B7FFF]" />
            </button>
          </div>

          {/* Card 2: Design Inspiration */}
          <div
            onMouseEnter={() => setActiveCard(1)}
            onMouseLeave={() => setActiveCard(null)}
            className="group rounded-3xl border border-slate-200 bg-white p-7 hover:shadow-2xl hover:shadow-purple-500/5 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#7C5CFF]/10 border border-[#7C5CFF]/20 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Wand2 className="w-5 h-5 text-[#7C5CFF]" />
              </div>
              <h3 className="text-xl font-bold text-[#070B14] mb-2">Design Inspiration</h3>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Upload layout screenshots or link Figma files directly. Morphix automatically extracts design tokens, shadows, and spacing layers.
              </p>
            </div>

            {/* Mini Workspace Preview */}
            <div className="bg-[#F5F7FA] rounded-2xl p-4 border border-slate-200/60 space-y-3 relative overflow-hidden">
              <div className="border border-dashed border-slate-300 rounded-xl p-4 flex flex-col items-center justify-center text-center bg-white">
                <Upload className="w-5 h-5 text-slate-400 mb-1" />
                <span className="text-[9px] font-bold text-slate-700">Figma URL or Screenshot</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {["#7C5CFF", "#14B8A6", "#070B14"].map((color) => (
                  <div key={color} className="h-6 rounded-lg flex items-center justify-center text-[7px] font-mono text-white" style={{ backgroundColor: color }}>
                    {color}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between text-[8px] text-slate-400 font-medium">
                <span>Radius: 12px</span>
                <span>Font: Inter</span>
              </div>
            </div>

            <button className="mt-6 w-full flex items-center justify-center gap-1.5 py-3 border border-slate-200 rounded-xl text-xs font-bold text-[#070B14] hover:bg-slate-50 transition-colors cursor-pointer">
              Launch DNA Extractor <ArrowRight className="w-3.5 h-3.5 text-[#7C5CFF]" />
            </button>
          </div>

          {/* Card 3: Start From Scratch */}
          <div
            onMouseEnter={() => setActiveCard(2)}
            onMouseLeave={() => setActiveCard(null)}
            className="group rounded-3xl border border-slate-200 bg-white p-7 hover:shadow-2xl hover:shadow-[#14B8A6]/5 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#14B8A6]/10 border border-[#14B8A6]/20 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-[#14B8A6]" />
              </div>
              <h3 className="text-xl font-bold text-[#070B14] mb-2">Start From Scratch</h3>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Describe the target layout structure in human text. Select modern template wireframes and build custom pages block-by-block.
              </p>
            </div>

            {/* Mini Workspace Preview */}
            <div className="bg-[#F5F7FA] rounded-2xl p-4 border border-slate-200/60 space-y-3 relative overflow-hidden">
              <div className="h-10 bg-white border border-slate-200 rounded-xl p-2 flex items-center">
                <span className="text-[8px] text-slate-700 font-medium leading-tight line-clamp-2">
                  "Build a SaaS hero panel with dark gradient background and a dual CTA button group..."
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="h-5 flex-1 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-[7px] font-bold text-[#14B8A6]">
                  Generate Preset
                </div>
                <div className="h-5 w-12 bg-slate-200 rounded-lg flex items-center justify-center text-[7px] font-semibold text-slate-500">
                  Wireframes
                </div>
              </div>
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-4 flex-1 bg-white border border-slate-200/60 rounded flex items-center justify-center text-[6px] text-slate-400 font-bold">
                    Block {i + 1}
                  </div>
                ))}
              </div>
            </div>

            <button className="mt-6 w-full flex items-center justify-center gap-1.5 py-3 border border-slate-200 rounded-xl text-xs font-bold text-[#070B14] hover:bg-slate-50 transition-colors cursor-pointer">
              Launch AI Blueprint <ArrowRight className="w-3.5 h-3.5 text-[#14B8A6]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
