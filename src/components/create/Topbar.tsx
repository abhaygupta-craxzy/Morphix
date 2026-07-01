"use client";

import React from "react";
import Link from "next/link";
import { 
  Play, 
  Pause, 
  X, 
  Layout, 
  ArrowLeft, 
  Menu,
  Activity
} from "lucide-react";
import { GenerationStatus } from "@/app/create/page";

interface TopbarProps {
  projectName: string;
  generationStatus: GenerationStatus;
  activeSection: string;
  sectionPercent: number;
  estimatedSecs: number;
  onPause: () => void;
  onResume: () => void;
  onCancel: () => void;
}

export default function Topbar({
  projectName,
  generationStatus,
  activeSection,
  sectionPercent,
  estimatedSecs,
  onPause,
  onResume,
  onCancel,
}: TopbarProps) {
  return (
    <header
      className="flex items-center justify-between px-6 border-b z-30 relative"
      style={{
        height: 64,
        background: "#080d1e",
        borderColor: "rgba(255, 255, 255, 0.06)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Left side: Hamburger menu & Back button */}
      <div className="flex items-center gap-4">
        <button 
          className="p-1.5 rounded-lg hover:bg-white/[0.05] border border-transparent hover:border-white/[0.08] transition-all text-white/60 hover:text-white"
          style={{ cursor: "pointer" }}
        >
          <Menu size={18} />
        </button>

        <Link
          href="/home"
          className="flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-white bg-white/[0.03] border border-white/[0.06] rounded-xl px-3.5 py-2 transition-all hover:bg-white/[0.06]"
        >
          <ArrowLeft size={13} />
          <span>Dashboard</span>
        </Link>

        <div className="h-4 w-px bg-white/[0.08] mx-1" />

        <div className="flex flex-col">
          <span className="text-[10px] text-white/30 uppercase tracking-widest font-semibold">Active Blueprint</span>
          <span className="text-sm font-bold text-white tracking-tight">{projectName}</span>
        </div>
      </div>

      {/* Middle: Alive Progress & Percentage Status */}
      <div className="flex items-center gap-3">
        <div 
          className="flex items-center gap-3 px-4 py-2 rounded-full border transition-all duration-300"
          style={{
            background: "rgba(59, 130, 246, 0.03)",
            borderColor: generationStatus === "generating" 
              ? "rgba(59, 130, 246, 0.25)" 
              : generationStatus === "paused"
                ? "rgba(245, 158, 11, 0.25)"
                : "rgba(16, 185, 129, 0.25)",
          }}
        >
          {generationStatus === "generating" && (
            <Activity size={13} className="text-blue-400 animate-pulse" />
          )}
          
          <div className="flex flex-col text-left">
            <span 
              className="text-xs font-bold tracking-wide uppercase"
              style={{
                color: generationStatus === "generating"
                  ? "#93C5FD"
                  : generationStatus === "paused"
                    ? "#F59E0B"
                    : generationStatus === "completed"
                      ? "#34D399"
                      : "rgba(255, 255, 255, 0.4)",
              }}
            >
              {generationStatus === "generating" && `Building ${activeSection}... ${sectionPercent}%`}
              {generationStatus === "paused" && "Generation Paused"}
              {generationStatus === "completed" && "Website Generated!"}
              {generationStatus === "idle" && "Idle"}
            </span>

            {generationStatus === "generating" && (
              <span className="text-[9px] text-white/35 font-medium tracking-wide">
                Estimated {estimatedSecs}s remaining
              </span>
            )}
          </div>

          {generationStatus === "generating" && (
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
          )}
        </div>

        {/* Play/Pause/Cancel controls */}
        {generationStatus !== "completed" && generationStatus !== "idle" && (
          <div className="flex items-center gap-1.5 bg-white/[0.02] border border-white/[0.06] p-1 rounded-xl">
            {generationStatus === "generating" ? (
              <button
                onClick={onPause}
                title="Pause Architect"
                className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.05] transition-all"
                style={{ cursor: "pointer" }}
              >
                <Pause size={14} fill="currentColor" />
              </button>
            ) : (
              <button
                onClick={onResume}
                title="Resume Architect"
                className="p-1.5 rounded-lg text-blue-400 hover:text-blue-300 hover:bg-white/[0.05] transition-all animate-pulse"
                style={{ cursor: "pointer" }}
              >
                <Play size={14} fill="currentColor" />
              </button>
            )}

            <button
              onClick={onCancel}
              title="Cancel Generation"
              className="p-1.5 rounded-lg text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all"
              style={{ cursor: "pointer" }}
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Right side: Open Workspace button */}
      <div className="flex items-center gap-3">
        <Link
          href={generationStatus === "completed" ? "/home" : "#"}
          className={`flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl transition-all ${
            generationStatus === "completed"
              ? "text-white hover:scale-[1.02] active:scale-[0.98]"
              : "text-white/20 pointer-events-none"
          }`}
          style={{
            background: generationStatus === "completed"
              ? "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)"
              : "rgba(255, 255, 255, 0.03)",
            border: generationStatus === "completed"
              ? "1px solid rgba(59, 130, 246, 0.45)"
              : "1px solid rgba(255, 255, 255, 0.05)",
            boxShadow: generationStatus === "completed"
              ? "0 4px 16px rgba(59, 130, 246, 0.3)"
              : "none",
          }}
        >
          <Layout size={14} />
          <span>Open Workspace</span>
        </Link>
      </div>
    </header>
  );
}
