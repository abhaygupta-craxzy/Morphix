"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Laptop,
  Tablet,
  Smartphone,
  Eye,
  Lock,
  Loader2,
  CheckCircle,
  AlertCircle,
  Zap,
} from "lucide-react";
import { ProjectData, GenerationStatus, GeneratedSection, DesignTokens } from "@/app/create/page";

interface CentreProps {
  steps: { id: string; icon: string; label: string; status: string }[];
  projectData: ProjectData;
  generationStatus: GenerationStatus;
  generatedSections: GeneratedSection[];
  designTokens: DesignTokens | null;
  errorMessage: string;
}

export default function Centre({
  steps,
  projectData,
  generationStatus,
  generatedSections,
  designTokens,
  errorMessage,
}: CentreProps) {
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom as sections appear
  useEffect(() => {
    if (generatedSections.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [generatedSections.length]);

  const currentStep = steps.find((s) => s.status === "generating");
  const primaryColor = designTokens?.primaryColor || "#3B82F6";
  const themeLabel = designTokens
    ? `${designTokens.primaryColor.toUpperCase()}`
    : "GLASS THEME";

  const maxWidth =
    previewDevice === "desktop"
      ? "100%"
      : previewDevice === "tablet"
      ? "768px"
      : "390px";

  return (
    <div className="flex-1 flex flex-col h-full bg-[#090B11] relative overflow-hidden z-10">

      {/* Mesmerizing Background Grid & Radial Spotlight */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px"
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.12] transition-all duration-1000"
          style={{
            backgroundImage: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)`,
            filter: "blur(80px)"
          }}
        />
      </div>

      {/* Main Canvas Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 pt-1.5 flex flex-col items-center z-10" style={{ scrollbarWidth: "none" }}>
        
        {/* Floating build toolbar (Figma / Linear style) — Inline to prevent overlapping on scroll */}
        <div className="flex items-center gap-7 px-12 py-1.5 rounded-full border border-white/[0.06] bg-black/45 backdrop-blur-lg shadow-[0_12px_32px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-white/[0.1] hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] mb-3 mx-auto flex-shrink-0 z-20">
          {/* Title */}
          <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#93C5FD]">
            <Eye size={11} />
            <span>Canvas</span>
          </div>

          <div className="h-3 w-px bg-white/[0.08]" />

          {/* Live Step status */}
          {generationStatus === "generating" && currentStep && (
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#34D399]">
              <span className="w-1 h-1 rounded-full bg-[#34D399] animate-ping" />
              <span>Building {currentStep.label}</span>
              <div className="h-3 w-px bg-white/[0.08] ml-1.5" />
            </div>
          )}

          {generationStatus === "completed" && (
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#34D399]">
              <span>✓ Complete</span>
              <div className="h-3 w-px bg-white/[0.08] ml-1.5" />
            </div>
          )}

          {/* Device selection */}
          <div className="flex items-center gap-1 bg-white/[0.015] border border-white/[0.05] p-1 rounded-xl">
            {(["desktop", "tablet", "mobile"] as const).map((device) => {
              const Icon = device === "desktop" ? Laptop : device === "tablet" ? Tablet : Smartphone;
              const isSelected = previewDevice === device;

              // Custom gradient/borders/color per device
              const activeColors = {
                desktop: {
                  bg: "linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(52,211,153,0.15) 100%)",
                  border: "rgba(16,185,129,0.35)",
                  color: "#34D399"
                },
                tablet: {
                  bg: "linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(251,191,36,0.15) 100%)",
                  border: "rgba(245,158,11,0.35)",
                  color: "#FBBF24"
                },
                mobile: {
                  bg: "linear-gradient(135deg, rgba(236,72,153,0.15) 0%, rgba(244,114,182,0.15) 100%)",
                  border: "rgba(236,72,153,0.35)",
                  color: "#F472B6"
                }
              }[device];

              return (
                <button
                  key={device}
                  onClick={() => setPreviewDevice(device)}
                  className="p-1.5 rounded-lg transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: isSelected ? activeColors.bg : "transparent",
                    border: isSelected ? `1px solid ${activeColors.border}` : "1px solid transparent",
                    color: isSelected ? activeColors.color : "rgba(255,255,255,0.45)",
                    cursor: "pointer",
                  }}
                  title={device}
                >
                  <Icon size={14} />
                </button>
              );
            })}
          </div>

          <div className="h-3 w-px bg-white/[0.08]" />

          {/* Theme indicator */}
          <span
            className="text-[8px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded-md"
            style={{
              color: primaryColor,
              background: `${primaryColor}15`,
              border: `1px solid ${primaryColor}25`,
            }}
          >
            {themeLabel}
          </span>
        </div>
        <div
          className="w-full flex-1 flex flex-col rounded-2xl border overflow-hidden transition-all duration-500"
          style={{
            maxWidth,
            background: "#080b14",
            borderColor: "rgba(255,255,255,0.05)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.7), 0 0 1px rgba(255,255,255,0.05)",
            minHeight: "600px",
          }}
        >
          {/* Browser Bar */}
          <div
            className="px-4 py-2 bg-white/[0.02] border-b border-white/[0.04] flex items-center justify-between rounded-t-2xl flex-shrink-0"
          >
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
            </div>
            <div
              className="flex-1 max-w-xs mx-4 px-3 py-0.5 rounded-lg flex items-center justify-center gap-1.5 text-[9px] font-mono"
              style={{
                background: "rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.25)",
              }}
            >
              <Lock size={8} />
              <span>
                {projectData.projectName
                  ? projectData.projectName.toLowerCase().replace(/\s+/g, "-") + ".morphix.app"
                  : "localhost:3000/preview"}
              </span>
            </div>
            <div className="text-[9px] font-bold text-white/20 tracking-widest uppercase">
              {generatedSections.length > 0
                ? `${generatedSections.length} sections`
                : "ready"}
            </div>
          </div>

          {/* Canvas Content */}
          <div
            className="flex-1 overflow-y-auto relative"
            style={{
              background: designTokens?.bgColor || "#03060f",
              scrollbarWidth: "none",
            }}
          >
            {/* ── Idle State ── */}
            {generationStatus === "idle" && (
              <div className="flex flex-col items-center justify-center h-full min-h-[500px] gap-4 px-8 text-center">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl"
                  style={{
                    background: "rgba(59,130,246,0.08)",
                    border: "1px solid rgba(59,130,246,0.18)",
                  }}
                >
                  🧠
                </div>
                <h4 className="text-sm font-bold text-white/70">AI Build Canvas Ready</h4>
                <p className="text-xs text-white/30 max-w-xs leading-relaxed">
                  Describe your website in the prompt panel and click{" "}
                  <span className="text-blue-400 font-semibold">Generate Website</span> to begin
                  progressive assembly — section by section.
                </p>
              </div>
            )}

            {/* ── Error State ── */}
            {generationStatus === "error" && (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-4 px-8 text-center">
                <AlertCircle size={36} className="text-red-400/70" />
                <h4 className="text-sm font-bold text-red-400">Generation Failed</h4>
                <p className="text-xs text-white/40 max-w-xs leading-relaxed">{errorMessage}</p>
                <p className="text-[10px] text-white/25">Check your API key and try again.</p>
              </div>
            )}

            {/* ── Generating / Completed: Sections ── */}
            {(generationStatus === "generating" || generationStatus === "completed") && (
              <div className="flex flex-col">
                {/* Rendered sections as iframes */}
                {generatedSections.map((section) => (
                  <SectionIframe
                    key={section.id}
                    section={section}
                    primaryColor={designTokens?.primaryColor || "#3B82F6"}
                  />
                ))}

                {/* Currently generating placeholder */}
                {generationStatus === "generating" && currentStep && (
                  <BuildingPlaceholder
                    icon={currentStep.icon}
                    label={currentStep.label}
                    primaryColor={designTokens?.primaryColor || "#3B82F6"}
                  />
                )}

                {/* Scroll anchor */}
                <div ref={bottomRef} className="h-4" />
              </div>
            )}
          </div>
        </div>

        {/* Stats bar when complete */}
        {generationStatus === "completed" && (
          <div
            className="mt-4 flex items-center gap-4 px-5 py-3 rounded-xl text-xs w-full"
            style={{
              maxWidth,
              background: "rgba(52,211,153,0.04)",
              border: "1px solid rgba(52,211,153,0.15)",
            }}
          >
            <CheckCircle size={14} className="text-[#34D399] flex-shrink-0" />
            <span className="text-[#34D399] font-bold">Generation Complete</span>
            <span className="text-white/40 ml-auto">
              {generatedSections.length} sections built
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Section Iframe Component ──────────────────────────────────────────────

function SectionIframe({
  section,
  primaryColor,
}: {
  section: GeneratedSection;
  primaryColor: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(200);
  const [loaded, setLoaded] = useState(false);

  const updateHeight = () => {
    try {
      const doc = iframeRef.current?.contentDocument;
      if (doc?.body) {
        const h = doc.documentElement.scrollHeight || doc.body.scrollHeight;
        if (h > 0) setHeight(h);
      }
    } catch {
      // cross-origin; use default
    }
  };

  return (
    <div className="relative group animate-fadeIn" style={{ animationDuration: "0.4s" }}>
      {/* Section label badge */}
      <div
        className="absolute top-2 right-2 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `${primaryColor}20`,
          border: `1px solid ${primaryColor}40`,
          color: primaryColor,
          backdropFilter: "blur(8px)",
        }}
      >
        <Zap size={9} />
        {section.label}
      </div>

      {!loaded && (
        <div
          className="flex items-center justify-center py-8"
          style={{ background: "rgba(255,255,255,0.01)", minHeight: "80px" }}
        >
          <Loader2 size={16} className="text-blue-400/50 animate-spin" />
        </div>
      )}

      <iframe
        ref={iframeRef}
        srcDoc={section.html}
        style={{
          width: "100%",
          height: `${height}px`,
          border: "none",
          display: loaded ? "block" : "none",
          background: "transparent",
        }}
        onLoad={() => {
          setLoaded(true);
          updateHeight();
          // Re-measure after images/fonts load
          setTimeout(updateHeight, 300);
        }}
        scrolling="no"
        title={section.label}
      />

      {/* Thin divider between sections */}
      <div style={{ height: "1px", background: "rgba(255,255,255,0.04)" }} />
    </div>
  );
}

// ── Building Placeholder ──────────────────────────────────────────────────

function BuildingPlaceholder({
  icon,
  label,
  primaryColor,
}: {
  icon: string;
  label: string;
  primaryColor: string;
}) {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const t = setInterval(
      () => setDots((d) => (d.length >= 3 ? "." : d + ".")),
      400
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="mx-4 my-3 p-5 rounded-xl relative overflow-hidden"
      style={{
        background: `${primaryColor}06`,
        border: `1px solid ${primaryColor}25`,
      }}
    >
      {/* Animated shimmer */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(90deg, transparent 0%, ${primaryColor}10 50%, transparent 100%)`,
          animation: "shimmer 1.8s infinite",
          backgroundSize: "200% 100%",
        }}
      />

      <div className="flex items-center gap-3 relative">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-lg animate-pulse"
          style={{ background: `${primaryColor}12`, border: `1px solid ${primaryColor}30` }}
        >
          {icon}
        </div>
        <div>
          <div className="text-xs font-bold" style={{ color: primaryColor }}>
            Building {label}{dots}
          </div>
          <div className="text-[10px] text-white/35 mt-0.5 font-medium">
            AI is designing your {label.toLowerCase()} section
          </div>
        </div>
        <div className="ml-auto">
          <Loader2 size={14} className="animate-spin" style={{ color: primaryColor }} />
        </div>
      </div>

      {/* Progress skeleton lines */}
      <div className="mt-4 space-y-2">
        {[90, 70, 55].map((w, i) => (
          <div
            key={i}
            className="h-2 rounded-full animate-pulse"
            style={{
              width: `${w}%`,
              background: `${primaryColor}15`,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
