"use client";

import React, { useState } from "react";
import { 
  History, 
  Layers, 
  CheckCircle2, 
  Loader2, 
  Plus, 
  Search,
  Check
} from "lucide-react";
import { ProjectData } from "@/app/create/page";

interface SidebarProps {
  steps: { id: string; icon: string; label: string; status: string }[];
  projectData: ProjectData;
  setProjectData: React.Dispatch<React.SetStateAction<ProjectData>>;
}

export default function Sidebar({ steps, projectData, setProjectData }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<"timeline" | "library">("timeline");
  const [searchQuery, setSearchQuery] = useState("");

  const libraryComponents = [
    { name: "Glass Hero", category: "Hero", desc: "Translucent container with custom blue glows" },
    { name: "Split Screen Hero", category: "Hero", desc: "Interactive media grid next to header text" },
    { name: "Stripe Navbar", category: "Navbar", desc: "Clean alignment with animated links" },
    { name: "Glassmorphic Footer", category: "Footer", desc: "Frosted row layout with copyright columns" },
    { name: "SaaS Pricing Grid", category: "Pricing", desc: "Structured 3-column cards with visual checkmarks" },
    { name: "Interactive FAQ Accordion", category: "FAQ", desc: "Clean list layout with smooth toggle states" },
    { name: "Grid Features Panel", category: "Features", desc: "Vibrant icon columns outlining capabilities" },
  ];

  const handleUseComponent = (name: string) => {
    if (!projectData.selectedComponents.includes(name)) {
      setProjectData({
        ...projectData,
        selectedComponents: [...projectData.selectedComponents, name],
      });
    }
  };

  const handleRemoveComponent = (name: string) => {
    setProjectData({
      ...projectData,
      selectedComponents: projectData.selectedComponents.filter((c) => c !== name),
    });
  };

  const filteredLibrary = libraryComponents.filter(
    (c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside
      className="w-[330px] border-r flex flex-col h-full bg-[#080c18] z-10 relative flex-shrink-0"
      style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}
    >
      <div className="p-5 border-b border-white/[0.06]">
        <h2 className="text-base font-extrabold bg-gradient-to-r from-blue-400 via-indigo-400 to-[#93C5FD] bg-clip-text text-transparent">Build Panel</h2>
        <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold mt-0.5">Website blueprint</p>
      </div>

      {/* Tabs - Only Two Tabs: Timeline & Library */}
      <div className="flex p-2 border-b border-white/[0.05] bg-white/[0.01]">
        <button
          onClick={() => setActiveTab("timeline")}
          className="flex-1 flex flex-col items-center gap-1 py-2 text-[11px] font-semibold uppercase tracking-wider rounded-xl transition-all"
          style={{
            background: activeTab === "timeline" ? "rgba(59,130,246,0.1)" : "transparent",
            color: activeTab === "timeline" ? "#93C5FD" : "rgba(255,255,255,0.40)",
            cursor: "pointer"
          }}
        >
          <History size={14} className={activeTab === "timeline" ? "text-blue-400" : ""} />
          Timeline
        </button>

        <button
          onClick={() => setActiveTab("library")}
          className="flex-1 flex flex-col items-center gap-1 py-2 text-[11px] font-semibold uppercase tracking-wider rounded-xl transition-all"
          style={{
            background: activeTab === "library" ? "rgba(59,130,246,0.1)" : "transparent",
            color: activeTab === "library" ? "#93C5FD" : "rgba(255,255,255,0.40)",
            cursor: "pointer"
          }}
        >
          <Layers size={14} className={activeTab === "library" ? "text-blue-400" : ""} />
          Library
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollbarWidth: "none" }}>
        
        {/* Timeline Tab */}
        {activeTab === "timeline" && (
          <div className="space-y-3.5">
            <p className="text-[11px] text-white/40 font-medium tracking-wide uppercase">AI Generation Progress</p>
            
            <div className="space-y-3 mt-2 pl-1">
              {steps.map((s) => (
                <div 
                  key={s.id} 
                  className="flex items-center gap-3.5 p-2.5 rounded-xl border transition-all duration-300"
                  style={{
                    background: s.status === "generating" 
                      ? "rgba(59, 130, 246, 0.04)" 
                      : s.status === "completed"
                        ? "rgba(255, 255, 255, 0.01)"
                        : "transparent",
                    borderColor: s.status === "generating" 
                      ? "rgba(59, 130, 246, 0.25)" 
                      : s.status === "completed"
                        ? "rgba(255, 255, 255, 0.04)"
                        : "transparent"
                  }}
                >
                  {/* Persona Emoji Icon */}
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-base border relative"
                    style={{
                      background: s.status === "generating"
                        ? "rgba(59, 130, 246, 0.12)"
                        : s.status === "completed"
                          ? "rgba(52, 211, 153, 0.06)"
                          : "rgba(255, 255, 255, 0.02)",
                      borderColor: s.status === "generating"
                        ? "rgba(59, 130, 246, 0.4)"
                        : s.status === "completed"
                          ? "rgba(52, 211, 153, 0.25)"
                          : "rgba(255, 255, 255, 0.06)",
                      opacity: s.status === "pending" ? 0.35 : 1
                    }}
                  >
                    <span>{s.icon}</span>
                    {s.status === "completed" && (
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#34D399] rounded-full border border-[#080c18] flex items-center justify-center text-[8px] text-black font-extrabold">
                        ✓
                      </span>
                    )}
                  </div>

                  {/* Step details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-col">
                        <span 
                          className="text-xs font-bold tracking-tight transition-colors duration-200"
                          style={{
                            color: s.status === "completed" 
                              ? "rgba(255, 255, 255, 0.85)" 
                              : s.status === "generating" 
                                ? "#60A5FA" 
                                : "rgba(255, 255, 255, 0.30)"
                          }}
                        >
                          {s.label}
                        </span>
                        <span className="text-[9px] text-white/30 font-medium tracking-wide uppercase mt-0.5">
                          {s.status === "completed" && "Built"}
                          {s.status === "generating" && "Constructing..."}
                          {s.status === "pending" && "Waiting"}
                        </span>
                      </div>
                      
                      <span>
                        {s.status === "generating" && (
                          <Loader2 size={12} className="text-blue-400 animate-spin" />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Library Tab */}
        {activeTab === "library" && (
          <div className="space-y-4">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35" />
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 transition-all font-medium"
              />
            </div>

            <div className="space-y-2">
              <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Selected Blueprint components</p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {projectData.selectedComponents.length === 0 ? (
                  <span className="text-xs text-white/30 italic">No custom components specified</span>
                ) : (
                  projectData.selectedComponents.map((c) => (
                    <span 
                      key={c} 
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold border"
                      style={{
                        background: "rgba(59,130,246,0.06)",
                        borderColor: "rgba(59,130,246,0.2)",
                        color: "#93C5FD"
                      }}
                    >
                      {c}
                      <button 
                        onClick={() => handleRemoveComponent(c)}
                        className="hover:text-red-400 font-bold ml-1 text-xs"
                        style={{ cursor: "pointer" }}
                      >
                        &times;
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>

            <div className="space-y-2.5">
              <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Available Library</p>
              <div className="space-y-2">
                {filteredLibrary.map((comp) => {
                  const isSelected = projectData.selectedComponents.includes(comp.name);
                  return (
                    <div 
                      key={comp.name} 
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-all flex items-center justify-between"
                    >
                      <div className="min-w-0 flex-1 pr-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-bold text-white/80 truncate">{comp.name}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/40">{comp.category}</span>
                        </div>
                        <p className="text-[10px] text-white/30 mt-0.5 leading-snug truncate">{comp.desc}</p>
                      </div>
                      <button
                        onClick={() => handleUseComponent(comp.name)}
                        disabled={isSelected}
                        className={`text-[10px] px-2.5 py-1.5 rounded-lg border font-bold transition-all ${
                          isSelected 
                            ? "bg-white/[0.01] border-white/[0.04] text-white/20 cursor-default"
                            : "bg-blue-500/10 border-blue-500/25 hover:border-blue-500/40 text-blue-400 hover:text-white"
                        }`}
                        style={{ cursor: isSelected ? "default" : "pointer" }}
                      >
                        {isSelected ? "Used" : "Use"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </div>
    </aside>
  );
}
