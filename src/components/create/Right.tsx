"use client";

import React, { useState, useRef } from "react";
import {
  Sparkles,
  Link2,
  Upload,
  RefreshCw,
  ChevronRight,
  Clock,
  Layers,
  CheckCircle,
  Layout,
  Wand2,
} from "lucide-react";
import Link from "next/link";
import { ProjectData, GenerationStatus } from "@/app/create/page";

interface RightProps {
  projectData: ProjectData;
  setProjectData: React.Dispatch<React.SetStateAction<ProjectData>>;
  generationStatus: GenerationStatus;
  onGenerate: () => void;
  onGenerateAgain: () => void;
  timeTaken: number;
  sectionsCount: number;
  setIsPromptFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

// Quick-fill example prompts
const EXAMPLE_PROMPTS = [
  { label: "Amazon clone", prompt: "Create a modern Amazon-style marketplace. Dark theme. Large search bar. Product grid. Categories sidebar. Minimal animations. Professional and responsive." },
  { label: "SaaS Landing", prompt: "Create a modern SaaS landing page with glassmorphism. Dark theme. Blue and purple gradients. Hero section, features grid, pricing plans, and footer." },
  { label: "Portfolio", prompt: "Create a minimal developer portfolio. Dark background. Hero with name and role, skills section, featured projects grid, and contact form. Clean and modern." },
  { label: "Fintech App", prompt: "Create a premium fintech dashboard landing page. Dark green and black theme. Hero with stats, feature cards with icons, and a clean pricing section." },
  { label: "E-commerce Store", prompt: "Create a modern electronics e-commerce store. Dark theme. Hero banner with deals, product category grid, featured products section, and newsletter footer." },
];

export default function Right({
  projectData,
  setProjectData,
  generationStatus,
  onGenerate,
  onGenerateAgain,
  timeTaken,
  sectionsCount,
  setIsPromptFocused,
}: RightProps) {
  const [activeTab, setActiveTab] = useState<"prompt" | "references" | "components" | "brief" >("prompt");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setProjectData((prev) => ({ ...prev, logo: e.target.files![0] }));
    }
  };

  const handleRemoveComponent = (name: string) => {
    setProjectData((prev) => ({
      ...prev,
      selectedComponents: prev.selectedComponents.filter((c) => c !== name),
    }));
  };

  const isCompleted = generationStatus === "completed";
  const isGenerating = generationStatus === "generating";
  const isIdle = generationStatus === "idle";
  const isError = generationStatus === "error";

  const canGenerate = !!projectData.prompt.trim() && !isGenerating;

  const TABS = ["prompt", "references", "components", "brief"] as const;
  const TAB_LABELS: Record<typeof TABS[number], string> = {
    prompt: "Prompt",
    references: "Refs",
    components: "Parts",
    brief: "Brief",
  };

  return (
    <aside
      className="w-[280px] flex flex-col h-full bg-[#0C0F18] z-10 relative flex-shrink-0"
      style={{ borderLeft: "1px solid rgba(255, 255, 255, 0.03)" }}
    >
      {/* Tab header */}
      <div
        className="grid grid-cols-4 gap-1 p-2 border-b border-white/[0.03] bg-white/[0.01]"
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="py-2 text-[9px] font-bold uppercase tracking-wider rounded-lg transition-all"
            style={{
              background: activeTab === tab ? "rgba(59,130,246,0.06)" : "transparent",
              color: activeTab === tab ? "#93C5FD" : "rgba(255,255,255,0.3)",
              border: activeTab === tab ? "1px solid rgba(59,130,246,0.12)" : "1px solid transparent",
              cursor: "pointer",
            }}
          >
            {TAB_LABELS[tab]}
          </button>
        ))}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs" style={{ scrollbarWidth: "none" }}>

        {/* ── PROMPT TAB ── */}
        {activeTab === "prompt" && (
          <div className="space-y-3.5 flex flex-col h-full">
            <label className="text-[9px] text-white/35 uppercase tracking-widest font-extrabold flex items-center gap-1.5">
              <Wand2 size={10} className="text-blue-400" />
              Describe Your Idea
            </label>

            <textarea
              rows={8}
              value={projectData.prompt}
              onChange={(e) => setProjectData({ ...projectData, prompt: e.target.value })}
              onFocus={() => setIsPromptFocused(true)}
              onBlur={() => setIsPromptFocused(false)}
              placeholder="E.g. Create a modern Amazon-style marketplace. Dark theme. Large search bar. Product grid with categories. Minimal animations. Professional and responsive."
              className="w-full rounded-xl p-3 text-xs text-white placeholder-white/20 focus:outline-none transition-all resize-none font-medium leading-relaxed"
              style={{
                background: "rgba(255,255,255,0.015)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.4)"
              }}
            />

            {/* Character count */}
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-white/20">
                {projectData.prompt.length} chars
              </span>
              {projectData.prompt.length > 20 && (
                <span className="text-[9px] text-[#34D399] font-bold">✓ Ready to generate</span>
              )}
            </div>

            {/* Example prompts */}
            <div className="space-y-2 mt-1">
              <p className="text-[9px] text-white/25 uppercase tracking-widest font-extrabold">
                Quick Examples
              </p>
              <div className="space-y-1.5">
                {EXAMPLE_PROMPTS.map((ex) => (
                  <button
                    key={ex.label}
                    onClick={() => setProjectData({ ...projectData, prompt: ex.prompt })}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl transition-all group"
                    style={{
                      background: "rgba(255,255,255,0.015)",
                      border: "1px solid rgba(255,255,255,0.04)",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(59,130,246,0.06)";
                      e.currentTarget.style.borderColor = "rgba(59,130,246,0.18)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.015)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)";
                    }}
                  >
                    <Sparkles size={9} className="text-blue-400/60 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold text-white/50 group-hover:text-white/80 transition-colors flex-1">
                      {ex.label}
                    </span>
                    <ChevronRight size={10} className="text-white/20 group-hover:text-blue-400/60 transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* Hint */}
            <div
              className="p-3 rounded-xl text-[10px] leading-relaxed text-white/35"
              style={{
                background: "rgba(59,130,246,0.02)",
                border: "1px solid rgba(59,130,246,0.08)",
              }}
            >
              💡 Be specific about theme, style, and features. Morphix will understand your intent and build accordingly.
            </div>
          </div>
        )}

        {/* ── REFERENCES TAB ── */}
        {activeTab === "references" && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[9px] text-white/35 uppercase tracking-widest font-extrabold flex items-center gap-1.5">
                <Link2 size={10} />
                Reference Website URL
              </label>
              <input
                type="text"
                value={projectData.referenceUrl}
                onChange={(e) => setProjectData({ ...projectData, referenceUrl: e.target.value })}
                placeholder="https://example.com"
                className="w-full px-3 py-2.5 text-xs text-white placeholder-white/20 rounded-xl focus:outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.015)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              />
              {projectData.referenceUrl && (
                <p className="text-[9px] text-green-400/70 font-semibold">✓ Reference saved</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] text-white/35 uppercase tracking-widest font-extrabold flex items-center gap-1.5">
                <Upload size={10} />
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
                className="border border-dashed rounded-xl p-5 flex flex-col items-center gap-2 transition-all hover:border-blue-500/30"
                style={{
                  borderColor: projectData.logo ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.08)",
                  background: projectData.logo ? "rgba(52,211,153,0.03)" : "rgba(255,255,255,0.01)",
                  cursor: "pointer",
                }}
              >
                <span className="text-xl">{projectData.logo ? "✅" : "📁"}</span>
                <span className="text-[10px] font-bold text-white/45">
                  {projectData.logo ? projectData.logo.name : "Upload Brand Logo"}
                </span>
                <span className="text-[9px] text-white/20">SVG, PNG, JPG (Max 2MB)</span>
              </div>
            </div>
          </div>
        )}

        {/* ── COMPONENTS TAB ── */}
        {activeTab === "components" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-[9px] text-white/35 uppercase tracking-widest font-extrabold flex items-center gap-1.5">
                <Layers size={10} />
                Hint Components
              </label>
              <span
                className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(59,130,246,0.08)",
                  color: "#93C5FD",
                  border: "1px solid rgba(59,130,246,0.18)",
                }}
              >
                {projectData.selectedComponents.length} Active
              </span>
            </div>

            <div
              className="p-3 rounded-xl text-[10px] leading-relaxed text-white/35"
              style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.04)" }}
            >
              Hint the AI which components to prefer. Open the{" "}
              <button
                className="text-blue-400 font-semibold hover:text-blue-300 transition-colors"
                style={{ cursor: "pointer", background: "none", border: "none" }}
                onClick={() => {}}
              >
                Library tab
              </button>{" "}
              in the Build Panel to browse and add components.
            </div>

            {projectData.selectedComponents.length === 0 ? (
              <div className="text-center py-8 text-white/20 italic text-xs">
                No components selected yet
              </div>
            ) : (
              <div className="space-y-2">
                {projectData.selectedComponents.map((c) => (
                  <div
                    key={c}
                    className="p-2.5 rounded-xl flex items-center justify-between"
                    style={{
                      background: "rgba(59,130,246,0.03)",
                      border: "1px solid rgba(59,130,246,0.12)",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle size={10} className="text-blue-400" />
                      <span className="text-xs font-bold text-white/70">{c}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveComponent(c)}
                      className="text-red-400/50 hover:text-red-400 transition-colors font-bold px-1"
                      style={{ cursor: "pointer", background: "none", border: "none" }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── BRIEF TAB ── */}
        {activeTab === "brief" && (
          <div className="space-y-3">
            <label className="text-[9px] text-white/35 uppercase tracking-widest font-bold">
              Project Summary
            </label>

            <div
              className="rounded-xl overflow-hidden"
              style={{ border: "1px solid rgba(255, 255, 255, 0.04)" }}
            >
              {[
                ["Project Name", projectData.projectName || "—"],
                ["Website Type", projectData.websiteType],
                ["Prompt", projectData.prompt ? "✓ Configured" : "✗ Empty"],
                ["Reference URL", projectData.referenceUrl ? "✓ Configured" : "✗ Empty"],
                ["Logo", projectData.logo ? `✓ ${projectData.logo.name}` : "✗ None"],
                ["Components", `${projectData.selectedComponents.length} selected`],
              ].map(([key, val], i, arr) => (
                <div
                  key={key}
                  className="grid grid-cols-2 px-3 py-2.5"
                  style={{
                    borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none",
                    background: i % 2 === 0 ? "rgba(255,255,255,0.005)" : "transparent",
                  }}
                >
                  <span className="text-white/40 font-medium text-[10px]">{key}</span>
                  <span
                    className="text-right font-bold text-[10px] truncate"
                    style={{ color: val?.startsWith("✓") ? "#34D399" : val?.startsWith("✗") ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.7)" }}
                  >
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom Action Area ── */}
      <div
        className="p-4 border-t border-white/[0.04] space-y-3 flex-shrink-0"
        style={{ background: "rgba(0,0,0,0.15)" }}
      >
        {/* Completed stats */}
        {isCompleted && (
          <div
            className="p-3 rounded-xl space-y-1.5"
            style={{
              background: "rgba(52,211,153,0.03)",
              border: "1px solid rgba(52,211,153,0.12)",
            }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle size={12} className="text-[#34D399]" />
              <span className="text-[10px] font-bold text-[#34D399]">Version 1 Ready</span>
            </div>
            <div className="flex items-center justify-between text-[9px] text-white/35">
              <span className="flex items-center gap-1"><Layers size={8} /> {sectionsCount} Sections</span>
              <span className="flex items-center gap-1"><Clock size={8} /> {timeTaken}s</span>
            </div>
          </div>
        )}

        {/* Generate Again / Generate button */}
        {isCompleted && (
          <button
            onClick={onGenerateAgain}
            className="w-full py-2.5 rounded-xl text-[10px] font-extrabold transition-all hover:-translate-y-0.5 active:translate-y-0 text-white border btn-premium-shimmer"
            style={{
              background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
              borderColor: "rgba(255,255,255,0.12)",
              boxShadow: "0 4px 20px rgba(59, 130, 246, 0.45), inset 0 1px 0 rgba(255,255,255,0.2)",
              cursor: "pointer",
            }}
          >
            <RefreshCw size={10} className="inline mr-1.5 animate-spin" style={{ animationDuration: "3s" }} />
            Generate Again
          </button>
        )}
        {!isCompleted && (
          <button
            onClick={onGenerate}
            disabled={!canGenerate}
            className="w-full py-3 rounded-xl text-[10px] font-bold text-white transition-all flex items-center justify-center gap-2 disabled:opacity-40 hover:-translate-y-0.5 active:translate-y-0"
            style={{
              background: canGenerate
                ? "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)"
                : "rgba(255,255,255,0.03)",
              boxShadow: canGenerate ? "0 4px 18px rgba(59,130,246,0.25)" : "none",
              border: canGenerate
                ? "1px solid rgba(59,130,246,0.35)"
                : "1px solid rgba(255,255,255,0.05)",
              cursor: canGenerate ? "pointer" : "not-allowed",
            }}
          >
            {isGenerating ? (
              <>
                <span
                  className="w-2.5 h-2.5 border-2 border-t-transparent rounded-full animate-spin"
                  style={{ borderColor: "rgba(255,255,255,0.5)", borderTopColor: "transparent" }}
                />
                <span>AI Generating...</span>
              </>
            ) : isError ? (
              <>
                <Sparkles size={11} />
                <span>Retry Generation</span>
              </>
            ) : (
              <>
                <Sparkles size={11} />
                <span>Generate Website</span>
              </>
            )}
          </button>
        )}

        {isIdle && !projectData.prompt.trim() && (
          <p className="text-center text-[8px] text-white/20 uppercase tracking-widest font-bold">
            Enter prompt above
          </p>
        )}
      </div>
    </aside>
  );
}
