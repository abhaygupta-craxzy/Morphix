"use client";

import { useEffect, useRef, useState } from "react";
import Centre from "@/components/create/Centre";
import NewProjectSetup from "@/components/create/NewProjectSetup";
import Right from "@/components/create/Right";
import Sidebar from "@/components/create/Sidebar";
import Topbar from "@/components/create/Topbar";
import ExportModal from "@/components/create/ExportModal";
import type { DesignSystem } from "@/lib/generation-engine";

export interface ProjectData {
  projectName: string;
  websiteType: string;
  projectScope: string;
  prompt: string;
  referenceUrl: string;
  logo: File | null;
  selectedComponents: string[];
}

export type GenerationStatus = "idle" | "generating" | "paused" | "completed" | "error";

export interface TimelineStep {
  id: string;
  icon: string;
  label: string;
  status: "pending" | "generating" | "completed";
}

// Default timeline steps — will be replaced dynamically once blueprint arrives
const DEFAULT_TIMELINE_STEPS: TimelineStep[] = [
  { id: "intent", icon: "🧠", label: "Understanding", status: "pending" },
  { id: "blueprint", icon: "📐", label: "Blueprint", status: "pending" },
];

export interface GeneratedSection {
  id: string;
  label: string;
  html: string;
  tsx: string;       // TSX source — single source of truth
  componentId: string;
}

export interface Intent {
  websiteType: string;
  industry: string;
  theme: string;
  style: string;
  primaryColor: string;
  bgColor: string;
}

export interface DesignTokens {
  primaryColor: string;
  bgColor: string;
  fontFamily: string;
  borderRadius: string;
}

export type { DesignSystem };

export default function CreateStudioPage() {
  const [showSetup, setShowSetup] = useState(true);
  const [projectData, setProjectData] = useState<ProjectData>({
    projectName: "",
    websiteType: "Landing Page",
    projectScope: "Single Page",
    prompt: "",
    referenceUrl: "",
    logo: null,
    selectedComponents: [],
  });

  const [generationStatus, setGenerationStatus] = useState<GenerationStatus>("idle");
  const [steps, setSteps] = useState<TimelineStep[]>(DEFAULT_TIMELINE_STEPS);
  const [currentStepId, setCurrentStepId] = useState<string>("");
  const [generatedSections, setGeneratedSections] = useState<GeneratedSection[]>([]);
  const [intent, setIntent] = useState<Intent | null>(null);
  const [designTokens, setDesignTokens] = useState<DesignTokens | null>(null);
  const [designSystem, setDesignSystem] = useState<DesignSystem | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [timeTaken, setTimeTaken] = useState<number>(0);
  const [showExportModal, setShowExportModal] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

  const handleCreateProject = (name: string, type: string, scope: string) => {
    const finalName = name.trim() || `Untitled ${type}`;
    const newProject = {
      id: Math.random().toString(36).slice(2, 11),
      name: finalName,
      type,
      scope,
      lastEdited: "Just now",
      status: "idle" as const,
      theme: "Glass",
      prompt: "",
    };

    setProjectData((prev) => ({ ...prev, projectName: finalName, websiteType: type, projectScope: scope }));

    try {
      const stored = localStorage.getItem("morphix_projects");
      const projects = stored ? JSON.parse(stored) : [];
      projects.unshift(newProject);
      localStorage.setItem("morphix_projects", JSON.stringify(projects));
    } catch (e) {
      console.error(e);
    }

    setShowSetup(false);
  };

  const handleStartGeneration = async () => {
    if (!projectData.prompt.trim()) return;

    // Reset state
    setGenerationStatus("generating");
    setGeneratedSections([]);
    setErrorMessage("");
    setTimeTaken(0);
    setIntent(null);
    setDesignTokens(null);
    setDesignSystem(null);
    setSteps([
      { id: "intent", icon: "🧠", label: "Understanding", status: "generating" },
      { id: "design_system", icon: "🎨", label: "Design System", status: "pending" },
      { id: "blueprint", icon: "📐", label: "Blueprint", status: "pending" },
    ]);
    setCurrentStepId("intent");

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          prompt: projectData.prompt,
          websiteType: projectData.websiteType,
          projectName: projectData.projectName,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to connect to generation API");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // SSE events are separated by double newlines — parse block by block
        const blocks = buffer.split("\n\n");
        // Keep the last (potentially incomplete) block in the buffer
        buffer = blocks.pop() ?? "";

        for (const block of blocks) {
          if (!block.trim()) continue;

          let currentEvent = "";
          const dataLines: string[] = [];

          for (const line of block.split("\n")) {
            if (line.startsWith("event: ")) {
              currentEvent = line.slice(7).trim();
            } else if (line.startsWith("data: ")) {
              dataLines.push(line.slice(6));
            }
          }

          if (!currentEvent || dataLines.length === 0) continue;

          // Join multi-line data fields (standard SSE spec)
          const rawData = dataLines.join("\n");
          try {
            const data = JSON.parse(rawData);
            handleSSEEvent(currentEvent, data);
          } catch {
            // Skip malformed events
            console.warn("SSE parse error for event:", currentEvent);
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      const msg = err instanceof Error ? err.message : "Generation failed. Please try again.";
      setErrorMessage(msg);
      setGenerationStatus("error");
    }
  };

  const handleSSEEvent = (event: string, data: unknown) => {
    const d = data as Record<string, unknown>;

    switch (event) {
      case "intent": {
        const intentData = d as unknown as Intent;
        setIntent(intentData);
        setSteps((prev) =>
          prev.map((s) =>
            s.id === "intent"
              ? { ...s, status: "completed" }
              : s.id === "design_system"
              ? { ...s, status: "generating" }
              : s
          )
        );
        setCurrentStepId("design_system");
        break;
      }

      case "design_system": {
        const ds = d as unknown as DesignSystem;
        setDesignSystem(ds);
        setDesignTokens({
          primaryColor: ds.primaryColor,
          bgColor: ds.bgColor,
          fontFamily: ds.headingFont,
          borderRadius: ds.borderRadius.md,
        });
        setSteps((prev) =>
          prev.map((s) =>
            s.id === "design_system"
              ? { ...s, status: "completed" }
              : s.id === "blueprint"
              ? { ...s, status: "generating" }
              : s
          )
        );
        setCurrentStepId("blueprint");
        break;
      }

      case "blueprint": {
        const bp = d as { sections: Array<{ id: string; label: string }>; designTokens: DesignTokens };
        setDesignTokens(bp.designTokens);

        // Build dynamic timeline from blueprint sections
        const sectionSteps: TimelineStep[] = bp.sections.map((s, i) => ({
          id: s.id,
          icon: getSectionIcon(s.id),
          label: s.label,
          status: i === 0 ? "generating" : "pending",
        }));

        setSteps([
          { id: "intent", icon: "🧠", label: "Understanding", status: "completed" },
          { id: "blueprint", icon: "📐", label: "Blueprint", status: "completed" },
          ...sectionSteps,
        ]);
        setCurrentStepId(sectionSteps[0]?.id ?? "");
        break;
      }

      case "section_start": {
        const { id, label } = d as { id: string; label: string };
        setCurrentStepId(id);
        setSteps((prev) =>
          prev.map((s) => (s.id === id ? { ...s, status: "generating" } : s))
        );
        console.log(`Building section: ${label}`);
        break;
      }

      case "section_html": {
        const { id, label, html, tsx } = d as { id: string; label: string; html: string; tsx: string };
        setGeneratedSections((prev) => {
          const exists = prev.find((s) => s.id === id);
          if (exists) return prev.map((s) => (s.id === id ? { ...s, html, tsx: tsx || "" } : s));
          return [...prev, { id, label, html, tsx: tsx || "", componentId: "" }];
        });
        break;
      }

      case "section_complete": {
        const { id } = d as { id: string };
        setSteps((prev) =>
          prev.map((s) => (s.id === id ? { ...s, status: "completed" } : s))
        );
        break;
      }

      case "done": {
        const { timeTaken: tt } = d as { totalSections: number; timeTaken: number };
        setTimeTaken(tt);
        setGenerationStatus("completed");
        setCurrentStepId("");
        // Update localStorage
        try {
          const stored = localStorage.getItem("morphix_projects");
          if (stored) {
            const projects = JSON.parse(stored);
            if (projects.length > 0) {
              projects[0].status = "completed";
              projects[0].lastEdited = "Just completed";
              localStorage.setItem("morphix_projects", JSON.stringify(projects));
            }
          }
        } catch (e) {
          console.error(e);
        }
        break;
      }

      case "error": {
        const { message } = d as { message: string };
        setErrorMessage(message);
        setGenerationStatus("error");
        break;
      }
    }
  };

  const handleCancel = () => {
    abortRef.current?.abort();
    setGenerationStatus("idle");
    setCurrentStepId("");
    setSteps(DEFAULT_TIMELINE_STEPS.map((s) => ({ ...s, status: "pending" })));
    setGeneratedSections([]);
  };

  const handleGenerateAgain = () => {
    handleStartGeneration();
  };

  const [isPromptFocused, setIsPromptFocused] = useState(false);

  // Current step label for topbar
  const currentStep = steps.find((s) => s.id === currentStepId);

  // Cleanup on unmount
  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const isGenerating = generationStatus === "generating";

  return (
    <div className="h-screen w-screen bg-[#030407] p-5 flex items-center justify-center overflow-hidden">
      <div 
        className="h-full w-full bg-[#06070B] border border-white/[0.04] rounded-[24px] shadow-[0_24px_80px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden relative transition-all duration-500"
        style={{
          boxShadow: isGenerating 
            ? `0 24px 80px rgba(59,130,246,0.12), 0 0 1px rgba(255,255,255,0.06)`
            : `0 24px 80px rgba(0,0,0,0.85), 0 0 1px rgba(255,255,255,0.04)`
        }}
      >
        {showSetup && <NewProjectSetup onCreate={handleCreateProject} />}

        <Topbar
          projectName={projectData.projectName || "Untitled Project"}
          generationStatus={generationStatus}
          activeSection={currentStep?.label || "Website"}
          timeTaken={timeTaken}
          onCancel={handleCancel}
          onExport={() => setShowExportModal(true)}
        />

        <div className="relative flex min-h-0 flex-1">
          <div
            className="pointer-events-none absolute left-1/2 top-[10%] z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2"
            style={{
              background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
              filter: "blur(70px)",
            }}
          />

          {/* Left panel: Timeline/Library (dimmed if prompt is focused) */}
          <div 
            className="transition-all duration-500 ease-out"
            style={{
              opacity: isPromptFocused ? 0.35 : 1,
              filter: isPromptFocused ? "blur(0.5px)" : "none",
              transform: isPromptFocused ? "scale(0.99)" : "scale(1)"
            }}
          >
            <Sidebar
              steps={steps}
              projectData={projectData}
              setProjectData={setProjectData}
              intent={intent}
            />
          </div>

          {/* Center panel: Canvas (dimmed if prompt is focused, highlighted during generation) */}
          <div 
            className="flex-1 flex flex-col h-full transition-all duration-500 ease-out"
            style={{
              opacity: isPromptFocused ? 0.35 : 1,
              filter: isPromptFocused ? "blur(0.5px)" : "none",
              transform: isPromptFocused ? "scale(0.995)" : "scale(1)"
            }}
          >
            <Centre
              steps={steps}
              projectData={projectData}
              generationStatus={generationStatus}
              generatedSections={generatedSections}
              designTokens={designTokens}
              errorMessage={errorMessage}
            />
          </div>

          {/* Right panel: Controls (dimmed during active generation to focus on canvas) */}
          <div 
            className="transition-all duration-500 ease-out"
            style={{
              opacity: isGenerating ? 0.35 : 1,
              filter: isGenerating ? "blur(0.5px)" : "none",
              transform: isGenerating ? "scale(0.99)" : "scale(1)"
            }}
          >
            <Right
              projectData={projectData}
              setProjectData={setProjectData}
              generationStatus={generationStatus}
              onGenerate={handleStartGeneration}
              onGenerateAgain={handleGenerateAgain}
              timeTaken={timeTaken}
              sectionsCount={generatedSections.length}
              setIsPromptFocused={setIsPromptFocused}
            />

          {/* Export Modal */}
          <ExportModal
            isOpen={showExportModal}
            onClose={() => setShowExportModal(false)}
            projectName={projectData.projectName || "Morphix Project"}
            sections={generatedSections}
            designSystem={designSystem}
          />
          </div>
        </div>
      </div>
    </div>
  );
}

function getSectionIcon(id: string): string {
  const map: Record<string, string> = {
    navbar: "🧩",
    nav: "🧩",
    hero: "🖼️",
    features: "📦",
    feature: "📦",
    pricing: "💳",
    footer: "📞",
    products: "🛍️",
    product: "🛍️",
    categories: "🗂️",
    testimonials: "💬",
    faq: "❓",
    cta: "🚀",
    about: "ℹ️",
    contact: "📧",
    gallery: "🖼️",
    team: "👥",
    stats: "📊",
    banner: "📣",
    search: "🔍",
  };
  const lower = id.toLowerCase();
  for (const [key, icon] of Object.entries(map)) {
    if (lower.includes(key)) return icon;
  }
  return "🔲";
}
