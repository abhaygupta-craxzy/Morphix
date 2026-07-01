"use client";

import React, { useState, useRef } from "react";
import { 
  Sparkles, 
  Link2,
  Upload,
  RefreshCw
} from "lucide-react";
import { ProjectData, GenerationStatus } from "@/app/create/page";

interface RightProps {
  projectData: ProjectData;
  setProjectData: React.Dispatch<React.SetStateAction<ProjectData>>;
  generationStatus: GenerationStatus;
  onGenerate: () => void;
}

export default function Right({ 
  projectData, 
  setProjectData, 
  generationStatus,
  onGenerate 
}: RightProps) {
  const [activeTab, setActiveTab] = useState<"prompt" | "references" | "components" | "brief">("prompt");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProjectData((prev) => ({
        ...prev,
        logo: e.target.files![0]
      }));
    }
  };

  const handleRemoveComponent = (name: string) => {
    setProjectData((prev) => ({
      ...prev,
      selectedComponents: prev.selectedComponents.filter((c) => c !== name),
    }));
  };

  const isCompleted = generationStatus === "completed";

  return (
    <aside
      className="w-[330px] border-l flex flex-col h-full bg-[#080c18] z-10 relative flex-shrink-0"
      style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}
    >
      {/* Mini Tabs Header (Clean tab-only layout, no grand header title) */}
      <div className="grid grid-cols-4 gap-1 p-2 border-b border-white/[0.04] bg-white/[0.01]">
        {(["prompt", "references", "components", "brief"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="py-2.5 text-[9px] font-bold uppercase tracking-wider rounded-lg transition-all text-center"
            style={{
              background: activeTab === tab ? "rgba(59,130,246,0.08)" : "transparent",
              color: activeTab === tab ? "#93C5FD" : "rgba(255, 255, 255, 0.35)",
              cursor: "pointer"
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Tab Content Wrapper */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs" style={{ scrollbarWidth: "none" }}>
        
        {/* 1. Prompt Tab */}
        {activeTab === "prompt" && (
          <div className="space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Describe Your Idea</label>
              <textarea
                rows={10}
                value={projectData.prompt}
                onChange={(e) => setProjectData({ ...projectData, prompt: e.target.value })}
                placeholder="E.g. Create a modern AI SaaS landing page. Glass theme. Blue palette. Include Pricing and Testimonials."
                className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 transition-all resize-none font-medium leading-relaxed"
              />
            </div>
            
            <div className="p-3.5 rounded-xl bg-blue-500/[0.02] border border-blue-500/10 text-white/50 text-[11px] leading-relaxed">
              💡 Your prompt directly influences color palettes, copy layout, typography metrics, and spacing systems.
            </div>
          </div>
        )}

        {/* 2. References Tab */}
        {activeTab === "references" && (
          <div className="space-y-4">
            {/* Website URL */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-white/40 uppercase tracking-widest font-bold flex items-center gap-1.5">
                <Link2 size={12} />
                Reference Website URL
              </label>
              <input
                type="text"
                value={projectData.referenceUrl}
                onChange={(e) => setProjectData({ ...projectData, referenceUrl: e.target.value })}
                placeholder="https://example.com"
                className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl px-3 py-2.5 text-xs text-white placeholder-white/25 focus:outline-none focus:border-blue-500/50 transition-all"
              />
            </div>

            {/* Logo Upload */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-white/40 uppercase tracking-widest font-bold flex items-center gap-1.5">
                <Upload size={12} />
                Logo Asset
              </label>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleLogoUpload} 
                className="hidden" 
                accept="image/*"
              />
              
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border border-dashed border-white/[0.08] rounded-xl p-6 flex flex-col items-center justify-center gap-1.5 bg-white/[0.01] hover:bg-white/[0.02] transition-all cursor-pointer"
              >
                <span className="text-lg">📁</span>
                <span className="text-[11px] font-semibold text-white/50">
                  {projectData.logo ? projectData.logo.name : "Upload Brand Logo"}
                </span>
                <span className="text-[9px] text-white/30">SVG, PNG, JPG (Max 2MB)</span>
              </div>
            </div>
          </div>
        )}

        {/* 3. Components Tab */}
        {activeTab === "components" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Selected Components</label>
              <span className="text-[10px] text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded-full">
                {projectData.selectedComponents.length} Active
              </span>
            </div>

            {projectData.selectedComponents.length === 0 ? (
              <div className="text-center py-8 text-white/25 italic">
                No custom components selected from build library
              </div>
            ) : (
              <div className="space-y-2">
                {projectData.selectedComponents.map((c) => (
                  <div 
                    key={c} 
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400">✓</span>
                      <span className="text-xs font-semibold text-white/80">{c}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveComponent(c)}
                      className="text-red-400/70 hover:text-red-400 transition-colors font-bold px-1.5"
                      style={{ cursor: "pointer" }}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 4. Project Brief Tab */}
        {activeTab === "brief" && (
          <div className="space-y-4">
            <label className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Context Summary</label>
            
            <div className="border border-white/[0.05] rounded-xl overflow-hidden bg-white/[0.01]">
              <div className="grid grid-cols-2 border-b border-white/[0.04] p-3">
                <span className="text-white/45 font-medium">Project Name</span>
                <span className="text-white/85 text-right font-bold truncate">{projectData.projectName}</span>
              </div>
              <div className="grid grid-cols-2 border-b border-white/[0.04] p-3">
                <span className="text-white/45 font-medium">Website Type</span>
                <span className="text-white/85 text-right font-bold">{projectData.websiteType}</span>
              </div>
              <div className="grid grid-cols-2 border-b border-white/[0.04] p-3">
                <span className="text-white/45 font-medium">Prompt Input</span>
                <span className="text-white/85 text-right font-bold">
                  {projectData.prompt ? "Configured ✓" : "Empty ✗"}
                </span>
              </div>
              <div className="grid grid-cols-2 border-b border-white/[0.04] p-3">
                <span className="text-white/45 font-medium">Reference URL</span>
                <span className="text-white/85 text-right font-bold">
                  {projectData.referenceUrl ? "Configured ✓" : "Empty ✗"}
                </span>
              </div>
              <div className="grid grid-cols-2 border-b border-white/[0.04] p-3">
                <span className="text-white/45 font-medium">Logo Attached</span>
                <span className="text-white/85 text-right font-bold">
                  {projectData.logo ? "Configured ✓" : "Empty ✗"}
                </span>
              </div>
              <div className="grid grid-cols-2 p-3">
                <span className="text-white/45 font-medium">Selected Lib</span>
                <span className="text-white/85 text-right font-bold">
                  {projectData.selectedComponents.length} component(s)
                </span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Generate Website Action Button (Color-changes to purple when completed) */}
      <div className="p-4 border-t border-white/[0.06] bg-black/35 z-20">
        <button
          onClick={onGenerate}
          disabled={generationStatus === "generating" || !projectData.prompt.trim()}
          className="w-full py-3.5 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center gap-2 disabled:opacity-40 hover:scale-[1.01] active:scale-[0.99]"
          style={{
            background: (generationStatus === "generating" || !projectData.prompt.trim())
              ? "rgba(255, 255, 255, 0.05)"
              : isCompleted
                ? "linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)" // Purple/violet edit theme
                : "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)", // Blue creation theme
            boxShadow: (generationStatus === "generating" || !projectData.prompt.trim())
              ? "none"
              : isCompleted
                ? "0 4px 18px rgba(139, 92, 246, 0.35)"
                : "0 4px 18px rgba(59, 130, 246, 0.35)",
            cursor: (generationStatus === "generating" || !projectData.prompt.trim()) ? "default" : "pointer",
            border: (generationStatus === "generating" || !projectData.prompt.trim())
              ? "1px solid rgba(255,255,255,0.05)"
              : isCompleted
                ? "1px solid rgba(139, 92, 246, 0.45)"
                : "1px solid rgba(59, 130, 246, 0.45)"
          }}
        >
          {generationStatus === "generating" ? (
            <Loader2 size={14} className="animate-spin text-blue-400" />
          ) : isCompleted ? (
            <RefreshCw size={14} className="text-purple-300" />
          ) : (
            <Sparkles size={14} className="text-blue-300" />
          )}
          <span>
            {generationStatus === "generating" 
              ? "AI Generating..." 
              : isCompleted 
                ? "Upgrade Website" 
                : "Generate Website"
            }
          </span>
        </button>
      </div>
    </aside>
  );
}

// Custom Loader2 SVG Icon helper
function Loader2(props: React.SVGProps<SVGSVGElement> & { size?: number }) {
  const size = props.size || 24;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
