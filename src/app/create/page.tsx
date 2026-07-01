"use client";

import { useEffect, useState } from "react";
import Centre from "@/components/create/Centre";
import NewProjectSetup from "@/components/create/NewProjectSetup";
import Right from "@/components/create/Right";
import Sidebar from "@/components/create/Sidebar";
import Topbar from "@/components/create/Topbar";

export interface ProjectData {
  projectName: string;
  websiteType: string;
  projectScope: string;
  prompt: string;
  referenceUrl: string;
  logo: File | null;
  selectedComponents: string[];
}

export type GenerationStatus = "idle" | "generating" | "paused" | "completed";

export interface TimelineStep {
  id: string;
  icon: string;
  label: string;
  status: "pending" | "generating" | "completed";
}

const TIMELINE_STEPS: TimelineStep[] = [
  { id: "planning", icon: "🧠", label: "Planning", status: "pending" },
  { id: "design_system", icon: "🎨", label: "Theme", status: "pending" },
  { id: "navbar", icon: "🧩", label: "Navbar", status: "pending" },
  { id: "hero", icon: "🖼️", label: "Hero", status: "pending" },
  { id: "features", icon: "📦", label: "Features", status: "pending" },
  { id: "pricing", icon: "💳", label: "Pricing", status: "pending" },
  { id: "footer", icon: "📞", label: "Footer", status: "pending" },
];

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
  const [currentProgressIndex, setCurrentProgressIndex] = useState(0);
  const [sectionPercent, setSectionPercent] = useState(0);
  const [estimatedSecs, setEstimatedSecs] = useState(12);
  const [steps, setSteps] = useState<TimelineStep[]>(TIMELINE_STEPS);

  useEffect(() => {
    if (generationStatus !== "generating") return;

    const stepDuration = 6000;
    const tickInterval = 100;
    const totalTicks = stepDuration / tickInterval;
    let tickCount = 0;

    const timer = window.setInterval(() => {
      tickCount += 1;
      const currentPercent = Math.min(Math.floor((tickCount / totalTicks) * 100), 100);
      const remainingSecs = Math.max(Math.ceil(((totalTicks - tickCount) * tickInterval) / 1000), 0);

      setSectionPercent(currentPercent);
      setEstimatedSecs(remainingSecs);

      if (tickCount >= totalTicks) {
        setSteps((previousSteps) => {
          const nextSteps = previousSteps.map((step) => ({ ...step }));
          const currentStep = nextSteps[currentProgressIndex];
          if (currentStep) currentStep.status = "completed";

          const nextIndex = currentProgressIndex + 1;
          if (nextIndex < nextSteps.length) {
            nextSteps[nextIndex].status = "generating";
            setCurrentProgressIndex(nextIndex);
            tickCount = 0;
          } else {
            setGenerationStatus("completed");
            window.clearInterval(timer);
          }
          return nextSteps;
        });
      }
    }, tickInterval);

    return () => window.clearInterval(timer);
  }, [generationStatus, currentProgressIndex]);

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

    setProjectData((previous) => ({
      ...previous,
      projectName: finalName,
      websiteType: type,
      projectScope: scope,
    }));

    try {
      const stored = localStorage.getItem("morphix_projects");
      const projects = stored ? JSON.parse(stored) : [];
      projects.unshift(newProject);
      localStorage.setItem("morphix_projects", JSON.stringify(projects));
    } catch (error) {
      console.error(error);
    }

    setShowSetup(false);
  };

  const handleStartGeneration = () => {
    setGenerationStatus("generating");
    setCurrentProgressIndex(0);
    setSectionPercent(0);
    setEstimatedSecs(6);
    setSteps(
      TIMELINE_STEPS.map((step, index) => ({
        ...step,
        status: index === 0 ? "generating" : "pending",
      })),
    );

    try {
      const stored = localStorage.getItem("morphix_projects");
      if (stored) {
        const projects = JSON.parse(stored);
        if (projects.length > 0) {
          projects[0].prompt = projectData.prompt;
          projects[0].status = "generating";
          localStorage.setItem("morphix_projects", JSON.stringify(projects));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (generationStatus !== "completed") return;

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
    } catch (error) {
      console.error(error);
    }
  }, [generationStatus]);

  const handlePause = () => {
    if (generationStatus === "generating") setGenerationStatus("paused");
  };

  const handleResume = () => {
    if (generationStatus === "paused") setGenerationStatus("generating");
  };

  const handleCancel = () => {
    setGenerationStatus("idle");
    setCurrentProgressIndex(0);
    setSteps(TIMELINE_STEPS.map((step) => ({ ...step, status: "pending" })));
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#050816] text-white">
      {showSetup && <NewProjectSetup onCreate={handleCreateProject} />}

      <Topbar
        projectName={projectData.projectName || "Untitled Project"}
        generationStatus={generationStatus}
        activeSection={steps[currentProgressIndex]?.label || "Website"}
        sectionPercent={sectionPercent}
        estimatedSecs={estimatedSecs}
        onPause={handlePause}
        onResume={handleResume}
        onCancel={handleCancel}
      />

      <div className="relative flex min-h-0 flex-1">
        <div
          className="pointer-events-none absolute left-1/2 top-[10%] z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />

        <Sidebar steps={steps} projectData={projectData} setProjectData={setProjectData} />
        <Centre
          steps={steps}
          projectData={projectData}
          generationStatus={generationStatus}
          currentProgressIndex={currentProgressIndex}
          sectionPercent={sectionPercent}
        />
        <Right
          projectData={projectData}
          setProjectData={setProjectData}
          generationStatus={generationStatus}
          onGenerate={handleStartGeneration}
        />
      </div>
    </div>
  );
}
