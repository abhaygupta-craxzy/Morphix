"use client";

import { useState } from "react";
import {
  Monitor,
  Tablet,
  Smartphone,
  RefreshCw,
  Eye,
  Code2,
  Sliders,
  ArrowLeftRight,
} from "lucide-react";

const viewportOptions = [
  { id: "desktop", icon: Monitor, label: "Desktop", width: "100%" },
  { id: "tablet", icon: Tablet, label: "Tablet", width: "768px" },
  { id: "mobile", icon: Smartphone, label: "Mobile", width: "375px" },
];

export default function LivePreviewSection() {
  const [activeViewport, setActiveViewport] = useState("desktop");
  const [showTransformed, setShowTransformed] = useState(true);

  return (
    <section
      id="live-preview"
      className="py-24 lg:py-32 bg-slate-950 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-semibold mb-4">
            <Eye className="w-3.5 h-3.5" />
            Live Preview Studio
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-5">
            See every change{" "}
            <span className="text-blue-400">instantly</span>
          </h2>
          <p className="text-lg text-slate-400">
            Real-time preview with side-by-side comparison. See exactly how
            your design looks before you export a single line of code.
          </p>
        </div>

        {/* Preview studio */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900">
            {/* Left controls */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="w-px h-4 bg-slate-700" />
              <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-1">
                {viewportOptions.map((v) => {
                  const Icon = v.icon;
                  return (
                    <button
                      key={v.id}
                      id={`viewport-${v.id}`}
                      onClick={() => setActiveViewport(v.id)}
                      className={`p-1.5 rounded-md transition-all duration-200 ${
                        activeViewport === v.id
                          ? "bg-blue-600 text-white"
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Center URL */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-lg border border-slate-700">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-xs font-mono text-slate-400">
                preview.morphix.ai/studio/demo
              </span>
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              <button
                id="toggle-comparison"
                onClick={() => setShowTransformed(!showTransformed)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:border-slate-600 transition-all"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
                Compare
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 rounded-lg text-xs font-semibold text-white hover:bg-blue-500 transition-colors">
                <Code2 className="w-3.5 h-3.5" />
                Export Code
              </button>
            </div>
          </div>

          {/* Main content area */}
          <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[500px]">
            {/* Left panel - Controls */}
            <div className="border-r border-slate-800 p-5 space-y-5 bg-slate-900/50">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <Sliders className="w-3.5 h-3.5" />
                Style Controls
              </div>

              {/* Color controls */}
              <div className="space-y-3">
                <div className="text-xs font-medium text-slate-400">Brand Colors</div>
                <div className="space-y-2">
                  {[
                    { label: "Primary", color: "#2563eb" },
                    { label: "Secondary", color: "#7c3aed" },
                    { label: "Accent", color: "#0d9488" },
                  ].map((c) => (
                    <div key={c.label} className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-lg border border-white/10 cursor-pointer hover:scale-110 transition-transform"
                        style={{ backgroundColor: c.color }}
                      />
                      <span className="text-xs text-slate-500 flex-1">{c.label}</span>
                      <span className="text-[10px] font-mono text-slate-600">
                        {c.color}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-slate-400">Typography</div>
                <div className="bg-slate-800 rounded-lg p-2 border border-slate-700">
                  <div className="text-sm font-bold text-white">Inter</div>
                  <div className="text-xs text-slate-500">Variable font · 100–900</div>
                </div>
              </div>

              {/* Radius */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-slate-400">Border Radius</div>
                <div className="flex gap-1.5">
                  {["sm", "md", "lg", "xl"].map((r) => (
                    <button
                      key={r}
                      className={`flex-1 py-1.5 text-[10px] font-medium rounded border transition-all ${
                        r === "xl"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "text-slate-500 border-slate-700 hover:border-slate-500"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Animation */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-slate-400">Animations</div>
                <div className="space-y-1.5">
                  {["Fade In", "Slide Up", "Scale"].map((anim) => (
                    <div key={anim} className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">{anim}</span>
                      <div className="w-8 h-4 bg-blue-600 rounded-full flex items-center justify-end px-0.5">
                        <div className="w-3 h-3 rounded-full bg-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Refresh */}
              <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:border-slate-600 transition-all">
                <RefreshCw className="w-3.5 h-3.5" />
                Regenerate
              </button>
            </div>

            {/* Preview area */}
            <div className="lg:col-span-3 bg-slate-950/50 p-6 flex items-start justify-center overflow-hidden">
              <div
                className="w-full transition-all duration-500 ease-out"
                style={{
                  maxWidth: activeViewport === "desktop"
                    ? "100%"
                    : activeViewport === "tablet"
                    ? "600px"
                    : "320px",
                }}
              >
                {/* Before/After comparison */}
                <div className={`grid gap-4 ${showTransformed ? "grid-cols-2" : "grid-cols-1"}`}>
                  {/* Original */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                      Original
                    </div>
                    <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
                      {/* Mockup old design */}
                      <div className="h-6 bg-slate-700 flex items-center px-3 gap-2">
                        <div className="w-10 h-1.5 rounded bg-slate-600" />
                        <div className="ml-auto flex gap-1.5">
                          <div className="w-6 h-1 rounded bg-slate-600" />
                          <div className="w-6 h-1 rounded bg-slate-600" />
                        </div>
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="h-5 w-3/4 bg-slate-700 rounded" />
                        <div className="h-2.5 w-full bg-slate-700/60 rounded" />
                        <div className="h-2.5 w-5/6 bg-slate-700/60 rounded" />
                        <div className="h-7 w-20 bg-slate-600 rounded-md" />
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className="h-16 bg-slate-700/50 rounded-md" />
                          <div className="h-16 bg-slate-700/50 rounded-md" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Transformed */}
                  {showTransformed && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-xs text-blue-400 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        Morphix Version
                        <span className="bg-blue-500/20 text-blue-400 text-[10px] px-1.5 py-0.5 rounded font-bold">
                          New
                        </span>
                      </div>
                      <div className="bg-white rounded-xl overflow-hidden border border-blue-200/30 shadow-lg shadow-blue-500/10">
                        {/* Mockup new design */}
                        <div className="h-6 bg-gradient-to-r from-blue-600 to-violet-600 flex items-center px-3 gap-2">
                          <div className="w-4 h-4 rounded-lg bg-white/25" />
                          <div className="ml-auto flex gap-1.5">
                            <div className="w-6 h-1 rounded bg-white/40" />
                            <div className="w-6 h-1 rounded bg-white/40" />
                          </div>
                        </div>
                        <div className="p-4 space-y-3">
                          <div className="h-5 w-3/4 bg-gradient-to-r from-blue-200 to-violet-200 rounded-xl" />
                          <div className="h-2.5 w-full bg-slate-100 rounded-lg" />
                          <div className="h-2.5 w-5/6 bg-slate-100 rounded-lg" />
                          <div className="h-7 w-20 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl shadow-sm" />
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="h-16 bg-gradient-to-br from-blue-50 to-violet-50 rounded-xl border border-blue-100" />
                            <div className="h-16 bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl border border-teal-100" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
