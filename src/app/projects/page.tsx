"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/home/dashboard/Sidebar";
import Topbar from "@/components/home/dashboard/Topbar";
import { Folder, Play, ArrowRight, ExternalLink, Trash2, Plus } from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  type: string;
  lastEdited: string;
  status: "completed" | "generating" | "idle";
  theme: string;
  prompt?: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  // Load projects from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("morphix_projects");
    const defaultProjects: Project[] = [
      {
        id: "1",
        name: "Stripe Landing Page",
        type: "Landing Page",
        lastEdited: "12 minutes ago",
        status: "completed",
        theme: "Glass",
        prompt: "A beautiful glassmorphic stripe landing page redesign."
      },
      {
        id: "2",
        name: "Developer Portfolio",
        type: "Portfolio",
        lastEdited: "2 hours ago",
        status: "completed",
        theme: "Minimal",
        prompt: "A clean developer portfolio page."
      }
    ];

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Combine default and user created projects
        const combined = [...parsed];
        // Ensure no duplicate IDs
        defaultProjects.forEach(dp => {
          if (!combined.some(p => p.id === dp.id)) {
            combined.push(dp);
          }
        });
        setProjects(combined);
      } catch (e) {
        setProjects(defaultProjects);
      }
    } else {
      setProjects(defaultProjects);
      localStorage.setItem("morphix_projects", JSON.stringify(defaultProjects));
    }
  }, []);

  const handleDeleteProject = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem("morphix_projects", JSON.stringify(updated));
  };

  return (
    <div className="flex h-screen overflow-hidden text-white" style={{ background: "#050816" }}>
      {/* Shared Dashboard Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main 
        className="flex-1 flex flex-col min-h-0"
        style={{
          background: "radial-gradient(ellipse 80% 55% at 50% 0%, #111827 0%, #0B1020 60%, #080d1a 100%)",
        }}
      >
        {/* Sticky topbar */}
        <Topbar />

        {/* Scrollable projects container */}
        <div className="flex-1 overflow-y-auto px-8 py-8" style={{ scrollbarWidth: "none" }}>
          
          {/* Header row */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                My Projects
              </h1>
              <p className="text-xs text-white/40 mt-1 font-medium">
                Manage and open your generated blueprints and workspaces
              </p>
            </div>

            <Link 
              href="/create"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
                boxShadow: "0 4px 16px rgba(59, 130, 246, 0.3)",
                border: "1px solid rgba(59, 130, 246, 0.4)"
              }}
            >
              <Plus size={14} />
              Create Project
            </Link>
          </div>

          {/* Projects Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, idx) => (
              <div 
                key={project.id}
                className="group relative flex flex-col rounded-2xl border transition-all duration-350 hover:-translate-y-1.5"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  borderColor: "rgba(255,255,255,0.06)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
                  animation: `dashFadeUp 0.4s ${idx * 0.05}s ease both`
                }}
              >
                {/* Visual Glow overlay depending on index */}
                <div 
                  className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300 opacity-30 group-hover:opacity-70"
                  style={{
                    background: `radial-gradient(circle 120px at 50% 0%, ${
                      project.type === "Landing Page" ? "rgba(59,130,246,0.15)" : "rgba(139,92,246,0.15)"
                    } 0%, transparent 100%)`
                  }}
                />

                <div className="p-5 flex-1 relative z-10">
                  {/* Category Badge & Status */}
                  <div className="flex items-center justify-between mb-3">
                    <span 
                      className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        borderColor: "rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.5)"
                      }}
                    >
                      {project.type}
                    </span>

                    <span className="text-[10px] text-white/30 font-medium">
                      {project.lastEdited}
                    </span>
                  </div>

                  {/* Title & Prompt details */}
                  <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                    {project.name}
                  </h3>
                  
                  <p className="text-[11.5px] text-white/35 mt-1.5 line-clamp-2 leading-relaxed">
                    {project.prompt || "No custom prompt guidelines specified."}
                  </p>
                </div>

                {/* Footer Actions */}
                <div 
                  className="px-5 py-3.5 border-t flex items-center justify-between relative z-10 bg-black/10 rounded-b-2xl"
                  style={{ borderColor: "rgba(255,255,255,0.04)" }}
                >
                  <button 
                    onClick={(e) => handleDeleteProject(project.id, e)}
                    className="p-2 rounded-lg bg-red-500/5 hover:bg-red-500/15 border border-red-500/10 hover:border-red-500/20 text-red-400/80 hover:text-red-400 transition-all"
                    title="Delete project"
                    style={{ cursor: "pointer" }}
                  >
                    <Trash2 size={13} />
                  </button>

                  <div className="flex gap-2">
                    <Link
                      href="/create"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08] hover:bg-white/[0.04] text-[10.5px] font-bold text-white/70 hover:text-white transition-all"
                    >
                      <span>Architect</span>
                    </Link>

                    <Link
                      href="/home"
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[10.5px] font-bold text-white transition-all hover:scale-[1.02]"
                      style={{
                        background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
                        boxShadow: "0 2px 8px rgba(59, 130, 246, 0.25)"
                      }}
                    >
                      <span>Open Workspace</span>
                      <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {projects.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <span className="text-3xl mb-3">📁</span>
              <h3 className="text-base font-bold text-white/70">No projects found</h3>
              <p className="text-xs text-white/30 max-w-xs mt-1">Create your first AI website generation container to get started</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
