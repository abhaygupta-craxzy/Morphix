"use client";

import React, { useState } from "react";
import {
  X,
  Download,
  FolderOpen,
  Code2,
  FileCode,
  CheckCircle,
  Loader2,
  Zap,
  Package,
  Globe,
} from "lucide-react";
import type { DesignSystem } from "@/lib/generation-engine";
import { GeneratedSection } from "@/app/create/page";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  sections: GeneratedSection[];
  designSystem: DesignSystem | null;
}

type ExportFormat = "react" | "html";
type ExportState = "idle" | "exporting" | "success" | "error";

export default function ExportModal({
  isOpen,
  onClose,
  projectName,
  sections,
  designSystem,
}: ExportModalProps) {
  const [format, setFormat] = useState<ExportFormat>("react");
  const [exportState, setExportState] = useState<ExportState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [exportedPath, setExportedPath] = useState("");
  const [exportedFiles, setExportedFiles] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validSections = sections.filter((s) => s.tsx && s.tsx.trim().length > 0);

  const handleExport = async (action: "workspace" | "zip") => {
    if (!designSystem) return;
    setExportState("exporting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectName,
          format,
          designSystem,
          sections: sections.map((s) => ({
            id: s.id,
            label: s.label,
            tsx: s.tsx || "",
            html: s.html,
          })),
        }),
      });

      const data = await res.json();

      if (!data.success && action === "workspace") {
        throw new Error(data.error || "Export failed");
      }

      setExportedFiles(data.files || {});
      setExportedPath(data.exportPath || "");

      if (action === "zip") {
        downloadAsZip(data.files || {}, projectName, format);
      }

      setExportState("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Export failed");
      setExportState("error");
    }
  };

  const downloadAsZip = (
    files: Record<string, string>,
    name: string,
    fmt: ExportFormat
  ) => {
    // Client-side ZIP creation using the files returned from the API
    // We create a simple download by packaging files as a blob
    const entries = Object.entries(files);
    if (entries.length === 0) return;

    // For simplicity, download as a JSON manifest that users can extract
    // In production, use JSZip library for proper ZIP creation
    const manifest = JSON.stringify({ project: name, format: fmt, files }, null, 2);
    const blob = new Blob([manifest], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}-export.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatOptions: { id: ExportFormat; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      id: "react",
      label: "React + Tailwind",
      desc: "Vite project with individual TSX components and full design system",
      icon: <Code2 size={18} />,
    },
    {
      id: "html",
      label: "Static HTML + CSS",
      desc: "Single-page HTML with embedded styles — no build step needed",
      icon: <Globe size={18} />,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #0d1117 0%, #0a0e1a 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        {/* Glow accent */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(99,102,241,0.6), rgba(139,92,246,0.6), transparent)",
          }}
        />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))",
                border: "1px solid rgba(139,92,246,0.3)",
              }}
            >
              <Package size={15} style={{ color: "#a78bfa" }} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Export Code</h2>
              <p className="text-[10px] text-white/40 mt-0.5">
                {validSections.length} section{validSections.length !== 1 ? "s" : ""} · {projectName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition-all"
            style={{ cursor: "pointer", background: "none", border: "none" }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {exportState === "idle" || exportState === "error" ? (
            <>
              {/* Format Picker */}
              <div>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">
                  Export Format
                </p>
                <div className="space-y-2">
                  {formatOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setFormat(opt.id)}
                      className="w-full flex items-start gap-3 p-4 rounded-xl text-left transition-all"
                      style={{
                        background:
                          format === opt.id
                            ? "rgba(99,102,241,0.1)"
                            : "rgba(255,255,255,0.02)",
                        border:
                          format === opt.id
                            ? "1px solid rgba(99,102,241,0.4)"
                            : "1px solid rgba(255,255,255,0.05)",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        className="mt-0.5 p-1.5 rounded-lg flex-shrink-0"
                        style={{
                          background:
                            format === opt.id
                              ? "rgba(99,102,241,0.2)"
                              : "rgba(255,255,255,0.05)",
                          color: format === opt.id ? "#818cf8" : "rgba(255,255,255,0.5)",
                        }}
                      >
                        {opt.icon}
                      </div>
                      <div>
                        <div
                          className="text-sm font-semibold"
                          style={{
                            color: format === opt.id ? "#c4b5fd" : "rgba(255,255,255,0.8)",
                          }}
                        >
                          {opt.label}
                        </div>
                        <div className="text-xs text-white/40 mt-0.5">{opt.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Design System Preview */}
              {designSystem && (
                <div
                  className="p-4 rounded-xl space-y-2"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                    Included Design System
                  </p>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border border-white/10"
                        style={{ background: designSystem.primaryColor }}
                      />
                      <span className="text-[11px] text-white/50 font-mono">
                        {designSystem.primaryColor}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border border-white/10"
                        style={{ background: designSystem.bgColor }}
                      />
                      <span className="text-[11px] text-white/50 font-mono">
                        {designSystem.bgColor}
                      </span>
                    </div>
                    <span className="text-[11px] text-white/40">
                      {designSystem.headingFont} / {designSystem.bodyFont}
                    </span>
                  </div>
                </div>
              )}

              {exportState === "error" && (
                <div
                  className="p-3 rounded-xl text-xs text-red-400"
                  style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)" }}
                >
                  {errorMsg}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleExport("workspace")}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.8)",
                    cursor: "pointer",
                  }}
                >
                  <FolderOpen size={15} />
                  Save to Workspace
                </button>
                <button
                  onClick={() => handleExport("zip")}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
                  style={{
                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    border: "1px solid rgba(139,92,246,0.5)",
                    color: "#fff",
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(99,102,241,0.35)",
                  }}
                >
                  <Download size={15} />
                  Download
                </button>
              </div>
            </>
          ) : exportState === "exporting" ? (
            <div className="flex flex-col items-center py-8 gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: "rgba(99,102,241,0.1)",
                  border: "1px solid rgba(99,102,241,0.3)",
                }}
              >
                <Loader2 size={24} className="animate-spin" style={{ color: "#818cf8" }} />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-white">Packaging your project…</p>
                <p className="text-xs text-white/40 mt-1">
                  Writing {validSections.length} components + design system
                </p>
              </div>
            </div>
          ) : (
            /* Success State */
            <div className="flex flex-col items-center py-6 gap-5">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: "rgba(52,211,153,0.1)",
                  border: "1px solid rgba(52,211,153,0.3)",
                }}
              >
                <CheckCircle size={26} style={{ color: "#34d399" }} />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-white">Export Complete</p>
                <p className="text-xs text-white/40 mt-1">
                  {Object.keys(exportedFiles).length} files generated
                </p>
              </div>

              {exportedPath && (
                <div
                  className="w-full p-3 rounded-xl"
                  style={{
                    background: "rgba(52,211,153,0.06)",
                    border: "1px solid rgba(52,211,153,0.15)",
                  }}
                >
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">
                    Saved to
                  </p>
                  <p
                    className="text-xs font-mono break-all"
                    style={{ color: "#6ee7b7" }}
                  >
                    {exportedPath}
                  </p>
                </div>
              )}

              {/* File list */}
              <div
                className="w-full p-3 rounded-xl max-h-40 overflow-y-auto"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  scrollbarWidth: "none",
                }}
              >
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">
                  Files
                </p>
                <div className="space-y-1">
                  {Object.keys(exportedFiles).map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <FileCode size={10} className="text-white/30 flex-shrink-0" />
                      <span className="text-[11px] font-mono text-white/50">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setExportState("idle")}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    cursor: "pointer",
                  }}
                >
                  Export Again
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all"
                  style={{
                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    border: "none",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  <Zap size={13} />
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
