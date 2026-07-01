"use client";

import React, { useState } from "react";
import { 
  Laptop, 
  Tablet, 
  Smartphone, 
  Eye, 
  Lock,
  Loader2,
  Check
} from "lucide-react";
import { ProjectData, GenerationStatus } from "@/app/create/page";

interface CentreProps {
  steps: { id: string; icon: string; label: string; status: string }[];
  projectData: ProjectData;
  generationStatus: GenerationStatus;
  currentProgressIndex: number;
  sectionPercent: number;
}

export default function Centre({ 
  steps, 
  projectData, 
  generationStatus,
  currentProgressIndex,
  sectionPercent,
}: CentreProps) {
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  // Helper to check section status
  const getStepStatus = (id: string) => {
    return steps.find((s) => s.id === id)?.status || "pending";
  };

  const currentTheme = "Glass";
  const brandColor = "#3B82F6";

  // Build the ASCII progress bar dynamically
  const getProgressBar = (percent: number) => {
    const totalBlocks = 20;
    const filledBlocks = Math.round((percent / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    return "█".repeat(filledBlocks) + "░".repeat(emptyBlocks);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#050813] relative overflow-hidden z-10">
      
      {/* Visual Canvas Sub-Header */}
      <div 
        className="px-6 py-3 border-b flex items-center justify-between bg-white/[0.01]"
        style={{ borderColor: "rgba(255, 255, 255, 0.05)" }}
      >
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide text-[#93C5FD] bg-blue-500/10 border border-blue-500/20">
            <Eye size={13} />
            AI Build Canvas
          </span>
        </div>

        {/* Device Switcher */}
        <div className="flex items-center gap-1 bg-white/[0.02] border border-white/[0.06] p-1 rounded-xl">
          <button
            onClick={() => setPreviewDevice("desktop")}
            className={`p-1.5 rounded-lg transition-all ${
              previewDevice === "desktop" ? "bg-white/[0.06] text-blue-400" : "text-white/40 hover:text-white"
            }`}
            style={{ cursor: "pointer" }}
          >
            <Laptop size={14} />
          </button>
          <button
            onClick={() => setPreviewDevice("tablet")}
            className={`p-1.5 rounded-lg transition-all ${
              previewDevice === "tablet" ? "bg-white/[0.06] text-blue-400" : "text-white/40 hover:text-white"
            }`}
            style={{ cursor: "pointer" }}
          >
            <Tablet size={14} />
          </button>
          <button
            onClick={() => setPreviewDevice("mobile")}
            className={`p-1.5 rounded-lg transition-all ${
              previewDevice === "mobile" ? "bg-white/[0.06] text-blue-400" : "text-white/40 hover:text-white"
            }`}
            style={{ cursor: "pointer" }}
          >
            <Smartphone size={14} />
          </button>
        </div>
      </div>

      {/* Main Canvas Scroll Area (Growing Website Dominates 100%) */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-start relative">
        
        {/* Visual Preview Window */}
        <div 
          className="w-full flex-1 flex flex-col transition-all duration-500 rounded-2xl border"
          style={{
            maxWidth: previewDevice === "desktop" ? "100%" : previewDevice === "tablet" ? "768px" : "375px",
            background: "#080b14",
            borderColor: "rgba(255, 255, 255, 0.08)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.5)"
          }}
        >
          {/* Browser Header Bar */}
          <div className="px-4 py-3 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between rounded-t-2xl">
            {/* Window dots */}
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
            </div>

            {/* URL Address Input Mock */}
            <div className="w-1/2 max-w-sm px-3 py-1 rounded-lg bg-black/40 border border-white/[0.06] flex items-center justify-center gap-1.5 text-[10px] text-white/35 font-mono">
              <Lock size={9} />
              <span>localhost:3000/preview</span>
            </div>

            <div className="text-[10px] font-bold text-blue-400/80 tracking-wide uppercase">
              {currentTheme} theme
            </div>
          </div>

          {/* Generated Page Content */}
          <div className="flex-1 overflow-y-auto bg-[#03060f] p-6 space-y-6 relative" style={{ scrollbarWidth: "none" }}>
            
            {/* Overlay for pending planning */}
            {generationStatus === "idle" && (
              <div className="h-full flex flex-col items-center justify-center gap-3 py-24">
                <span className="text-2xl animate-pulse">🧠</span>
                <h4 className="text-sm font-semibold text-white/70">AI Build Canvas Ready</h4>
                <p className="text-xs text-white/30 max-w-xs text-center leading-relaxed">
                  Provide instructions in the AI Architect control center and click Generate Website to begin progressive assembly.
                </p>
              </div>
            )}

            {/* 1. PLANNING BLOCK */}
            {getStepStatus("planning") !== "pending" && (
              <div className="animate-dashFadeUp">
                {getStepStatus("planning") === "generating" ? (
                  <GrowingPlaceholder 
                    icon="🧠"
                    label="Planning" 
                    desc="Mapping layout structure and layout grids..." 
                    percent={sectionPercent}
                    progressBar={getProgressBar(sectionPercent)}
                    theme={currentTheme}
                  />
                ) : null /* Do not show logs or technical planning details on final growing website */}
              </div>
            )}

            {/* 2. DESIGN SYSTEM / THEME BLOCK */}
            {getStepStatus("design_system") !== "pending" && (
              <div className="animate-dashFadeUp">
                {getStepStatus("design_system") === "generating" ? (
                  <GrowingPlaceholder 
                    icon="🎨"
                    label="Theme" 
                    desc="Configuring theme classes and spacing rules..." 
                    percent={sectionPercent}
                    progressBar={getProgressBar(sectionPercent)}
                    theme={currentTheme}
                  />
                ) : null /* Strip design logs on final site */}
              </div>
            )}

            {/* 3. NAVBAR SECTION */}
            {getStepStatus("navbar") !== "pending" && (
              <div className="animate-dashFadeUp">
                {getStepStatus("navbar") === "generating" ? (
                  <GrowingPlaceholder 
                    icon="🧩"
                    label="Navbar" 
                    desc="Configuring responsive menus and logo wrappers..." 
                    percent={sectionPercent}
                    progressBar={getProgressBar(sectionPercent)}
                    theme={currentTheme}
                  />
                ) : (
                  <div 
                    className="px-5 py-4 rounded-xl border flex items-center justify-between transition-all duration-300 hover:scale-[1.01]"
                    style={{
                      background: currentTheme === "Glass" ? "rgba(255, 255, 255, 0.02)" : "#080c18",
                      borderColor: currentTheme === "Glass" ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.04)",
                      backdropFilter: currentTheme === "Glass" ? "blur(12px)" : "none"
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center font-bold text-blue-400 text-xs">M</div>
                      <span className="text-xs font-bold text-white tracking-tight">Morphix Studio</span>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] text-white/50 font-bold uppercase tracking-wider">
                      <span className="hover:text-white cursor-pointer transition-colors">Features</span>
                      <span className="hover:text-white cursor-pointer transition-colors">Pricing</span>
                      <span className="hover:text-white cursor-pointer transition-colors">Documentation</span>
                    </div>
                    <button 
                      className="text-[10px] px-3.5 py-1.5 rounded-lg text-white font-bold transition-all"
                      style={{ background: brandColor }}
                    >
                      Get Started
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 4. HERO SECTION */}
            {getStepStatus("hero") !== "pending" && (
              <div className="animate-dashFadeUp">
                {getStepStatus("hero") === "generating" ? (
                  <GrowingPlaceholder 
                    icon="🖼"
                    label="Hero" 
                    desc="Polishing layout, content typography, and background glows..." 
                    percent={sectionPercent}
                    progressBar={getProgressBar(sectionPercent)}
                    theme={currentTheme}
                  />
                ) : (
                  <div 
                    className="p-8 rounded-2xl border text-center relative overflow-hidden flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.01]"
                    style={{
                      background: currentTheme === "Glass" ? "rgba(255, 255, 255, 0.01)" : "#080c18",
                      borderColor: currentTheme === "Glass" ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.04)",
                    }}
                  >
                    {/* Glowing background accent */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${brandColor}22 0%, transparent 70%)`,
                        filter: "blur(24px)"
                      }}
                    />

                    <span className="text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border mb-4"
                      style={{
                        background: `${brandColor}12`,
                        borderColor: `${brandColor}30`,
                        color: brandColor
                      }}
                    >
                      AI Website creation workspace
                    </span>

                    <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight max-w-lg">
                      Build Your Brand Progressive System
                    </h3>
                    
                    <p className="text-[12px] text-white/40 mt-3 max-w-sm leading-relaxed">
                      {projectData.prompt ? projectData.prompt.slice(0, 120) + "..." : "Adaptive website layouts built section-by-section live in front of you."}
                    </p>

                    <div className="flex gap-2.5 mt-6">
                      <button className="text-[11px] font-bold px-4 py-2 rounded-lg text-white" style={{ background: brandColor }}>
                        Start Project
                      </button>
                      <button className="text-[11px] font-bold px-4 py-2 rounded-lg border border-white/[0.08] hover:bg-white/[0.02] text-white/80 transition-all">
                        Documentation
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 5. FEATURES SECTION */}
            {getStepStatus("features") !== "pending" && (
              <div className="animate-dashFadeUp">
                {getStepStatus("features") === "generating" ? (
                  <GrowingPlaceholder 
                    icon="📦"
                    label="Features" 
                    desc="Mapping dynamic layouts and visual details..." 
                    percent={sectionPercent}
                    progressBar={getProgressBar(sectionPercent)}
                    theme={currentTheme}
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { title: "Dynamic Flow", icon: "⚡", desc: "Watch the blueprint render section-by-section." },
                      { title: "Translucent Cards", icon: "💎", desc: "Frosted designs with glowing hover lines." },
                      { title: "Handover Ready", icon: "🚀", desc: "Instantly open the editor workspace when done." }
                    ].map((item) => (
                      <div 
                        key={item.title} 
                        className="p-5 rounded-xl border bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 hover:scale-[1.02]"
                        style={{
                          borderColor: currentTheme === "Glass" ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.04)"
                        }}
                      >
                        <span className="text-xl">{item.icon}</span>
                        <h4 className="text-xs font-bold text-white/90 mt-3">{item.title}</h4>
                        <p className="text-[10.5px] text-white/35 mt-1.5 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 6. PRICING SECTION */}
            {getStepStatus("pricing") !== "pending" && (
              <div className="animate-dashFadeUp">
                {getStepStatus("pricing") === "generating" ? (
                  <GrowingPlaceholder 
                    icon="💳"
                    label="Pricing" 
                    desc="Writing standard grids and pricing tables..." 
                    percent={sectionPercent}
                    progressBar={getProgressBar(sectionPercent)}
                    theme={currentTheme}
                  />
                ) : (
                  <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.01]">
                    <h4 className="text-xs font-bold text-center text-white/80 mb-4">Simple, Transparent Pricing</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-black/40 border border-white/[0.04] text-center">
                        <span className="text-[9px] text-white/40 uppercase font-bold tracking-wider">Hobby Plan</span>
                        <div className="text-xl font-extrabold text-white mt-1">$0/mo</div>
                        <p className="text-[10px] text-white/30 mt-1">Single page layout output</p>
                      </div>
                      <div className="p-4 rounded-lg text-center border relative overflow-hidden"
                        style={{
                          background: `${brandColor}06`,
                          borderColor: `${brandColor}30`
                        }}
                      >
                        <span className="text-[9px] uppercase font-bold tracking-wider" style={{ color: brandColor }}>Creator Pass</span>
                        <div className="text-xl font-extrabold text-white mt-1">$39/mo</div>
                        <p className="text-[10px] text-white/40 mt-1">Unlimited section builds</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 7. FOOTER SECTION */}
            {getStepStatus("footer") !== "pending" && (
              <div className="animate-dashFadeUp">
                {getStepStatus("footer") === "generating" ? (
                  <GrowingPlaceholder 
                    icon="📞"
                    label="Footer" 
                    desc="Generating navigation columns, socials, and legal links..." 
                    percent={sectionPercent}
                    progressBar={getProgressBar(sectionPercent)}
                    theme={currentTheme}
                  />
                ) : (
                  <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-white/30 font-medium">
                    <span>&copy; {new Date().getFullYear()} Morphix AI Architect Inc.</span>
                    <div className="flex gap-4">
                      <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
                      <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// Animated Growing Section Placeholder Block
// ─────────────────────────────────────────
interface PlaceholderProps {
  icon: string;
  label: string;
  desc: string;
  percent: number;
  progressBar: string;
  theme: string;
}

function GrowingPlaceholder({ icon, label, desc, percent, progressBar, theme }: PlaceholderProps) {
  return (
    <div 
      className="p-6 rounded-xl border relative overflow-hidden bg-[#070b15]/80 border-blue-500/20"
      style={{
        boxShadow: "0 8px 32px rgba(59,130,246,0.05), inset 0 1px 0 rgba(255,255,255,0.02)"
      }}
    >
      {/* Glowing progress line at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-[#3B82F6]" style={{ width: `${percent}%`, transition: "width 100ms ease" }} />

      <div className="flex items-start gap-4">
        {/* Rotating architect core */}
        <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-lg animate-pulse">
          {icon}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest">Designing {label}</h4>
            <span className="text-[10px] text-blue-400/80 font-mono font-bold">{percent}%</span>
          </div>

          {/* Evolving progress bar */}
          <div className="text-[10px] font-mono text-blue-400/50 mt-1 select-none whitespace-pre overflow-hidden">
            {progressBar}
          </div>

          <p className="text-[10px] text-white/40 mt-2 font-medium">{desc}</p>
        </div>
      </div>

      <div className="h-px bg-white/[0.05] my-4" />

      {/* Structured AI Goal Matrix */}
      <div className="space-y-1.5 pl-1 bg-white/[0.01] p-3 rounded-lg border border-white/[0.03]">
        <div className="text-[10px] text-white/50 font-bold mb-1 flex items-center gap-1.5">
          <span>🧠</span> AI is currently designing your {label} section...
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-[10px] text-white/40 font-medium">
          <div className="flex items-center gap-1.5">
            <Check size={11} className="text-[#34D399]" />
            <span>Modern Layout</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check size={11} className="text-[#34D399]" />
            <span>Responsive Grid</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check size={11} className="text-[#34D399]" />
            <span>Translucent {theme} Styling</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check size={11} className="text-[#34D399]" />
            <span>Typography Alignment Scale</span>
          </div>
        </div>
      </div>
    </div>
  );
}
