"use client";

import React from "react";
import Link from "next/link";
import {
  X,
  Layout,
  ArrowLeft,
  Menu,
  Activity,
  CheckCircle,
  AlertCircle,
  Zap,
  Download,
} from "lucide-react";
import { GenerationStatus } from "@/app/create/page";

interface TopbarProps {
  projectName: string;
  generationStatus: GenerationStatus;
  activeSection: string;
  timeTaken: number;
  onCancel: () => void;
  onExport: () => void;
}

export default function Topbar({
  projectName,
  generationStatus,
  activeSection,
  timeTaken,
  onCancel,
  onExport,
}: TopbarProps) {
  const isGenerating = generationStatus === "generating";
  const isCompleted = generationStatus === "completed";
  const isPaused = generationStatus === "paused";
  const isError = generationStatus === "error";
  const isIdle = generationStatus === "idle";

  const statusColor = isGenerating
    ? "#93C5FD"
    : isCompleted
    ? "#34D399"
    : isPaused
    ? "#F59E0B"
    : isError
    ? "#F87171"
    : "rgba(255,255,255,0.3)";

  const statusBorder = isGenerating
    ? "rgba(59,130,246,0.3)"
    : isCompleted
    ? "rgba(52,211,153,0.25)"
    : isPaused
    ? "rgba(245,158,11,0.25)"
    : isError
    ? "rgba(248,113,113,0.25)"
    : "rgba(255,255,255,0.08)";

  const statusBg = isGenerating
    ? "rgba(59,130,246,0.05)"
    : isCompleted
    ? "rgba(52,211,153,0.05)"
    : isPaused
    ? "rgba(245,158,11,0.05)"
    : isError
    ? "rgba(248,113,113,0.05)"
    : "rgba(255,255,255,0.02)";

  return (
    <header
      className="flex items-center justify-between px-5 z-30 relative flex-shrink-0"
      style={{
        height: 52,
        background: "rgba(8, 13, 30, 0.4)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Left: Nav */}
      <div className="flex items-center gap-3">
        <button
          className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/[0.04] border border-white/[0.04] transition-all"
          style={{ cursor: "pointer" }}
        >
          <Menu size={15} />
        </button>

        <Link
          href="/home"
          className="flex items-center gap-1.5 text-[11px] font-bold text-white/80 hover:text-white px-3.5 py-2 rounded-xl border transition-all hover:border-white/[0.12] hover:bg-white/[0.04]"
          style={{
            background: "rgba(255,255,255,0.025)",
            borderColor: "rgba(255,255,255,0.06)",
          }}
        >
          <ArrowLeft size={11} className="text-white/60" />
          Dashboard
        </Link>

        <div className="h-4 w-px bg-white/[0.08]" />

        <div className="flex flex-col">
          <span className="text-[8px] text-white/20 uppercase tracking-widest font-bold">
            Active Blueprint
          </span>
          <span className="text-xs font-bold text-white tracking-tight leading-none mt-0.5">
            {projectName}
          </span>
        </div>
      </div>

      {/* Center: Status pill */}
      <div className="flex items-center gap-2.5">
        <div
          className="flex items-center gap-2 px-3 py-1 rounded-full border transition-all duration-300"
          style={{ background: statusBg, borderColor: statusBorder }}
        >
          {/* Icon */}
          {isGenerating && <Activity size={10} className="animate-pulse" style={{ color: statusColor }} />}
          {isCompleted && <CheckCircle size={10} style={{ color: statusColor }} />}
          {isError && <AlertCircle size={10} style={{ color: statusColor }} />}
          {isIdle && <Zap size={10} style={{ color: statusColor }} />}

          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-wide" style={{ color: statusColor }}>
              {isGenerating && `Building ${activeSection}...`}
              {isCompleted && `Done · ${timeTaken}s`}
              {isPaused && "Generation Paused"}
              {isError && "Generation Failed"}
              {isIdle && "Idle"}
            </span>
          </div>

          {/* Live ping dot */}
          {isGenerating && (
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
            </span>
          )}
        </div>

        {/* Cancel */}
        {isGenerating && (
          <button
            onClick={onCancel}
            title="Cancel Generation"
            className="p-1.5 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
            style={{ cursor: "pointer", background: "none", border: "none" }}
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Right: Workspace + Export */}
      <div className="flex items-center gap-2">
        {/* Export Code button — only visible when completed */}
        {isCompleted && (
          <button
            onClick={onExport}
            className="flex items-center gap-1.5 text-[11px] font-bold px-3.5 py-2 rounded-xl transition-all"
            style={{
              background: "rgba(99,102,241,0.12)",
              border: "1px solid rgba(99,102,241,0.35)",
              color: "#a5b4fc",
              cursor: "pointer",
              boxShadow: "0 2px 12px rgba(99,102,241,0.2)",
            }}
          >
            <Download size={12} />
            Export Code
          </button>
        )}

        <Link
          href={isCompleted ? "/home" : "#"}
          className="flex items-center gap-1.5 text-[11px] font-bold px-4 py-2 rounded-xl transition-all btn-purple-shimmer"
          style={{
            background: isCompleted
              ? "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)"
              : "rgba(255,255,255,0.015)",
            border: isCompleted
              ? "1px solid rgba(168,85,247,0.45)"
              : "1px solid rgba(255,255,255,0.04)",
            color: isCompleted ? "#fff" : "rgba(255,255,255,0.18)",
            pointerEvents: isCompleted ? "auto" : "none",
            boxShadow: isCompleted ? "0 4px 18px rgba(168,85,247,0.35), inset 0 1px 0 rgba(255,255,255,0.1)" : "none",
          }}
        >
          <Layout size={12} />
          Open Workspace
        </Link>
      </div>
    </header>
  );
}
