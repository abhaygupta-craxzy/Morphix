"use client";

import { useState, useRef } from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ChooseStartingPoint from "@/components/landing/ChooseStartingPoint";
import WatchMorphixWork from "@/components/landing/WatchMorphixWork";
import MetricsStrip from "@/components/landing/MetricsStrip";
import ExploreMorphix from "@/components/landing/ExploreMorphix";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export type ExploreTab = "explore" | "transform" | "create";

export default function Home() {
  const [activeExploreTab, setActiveExploreTab] = useState<ExploreTab>("explore");
  const exploreRef = useRef<HTMLElement>(null);

  function goToExplore(tab: ExploreTab) {
    setActiveExploreTab(tab);
    setTimeout(() => {
      exploreRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#050816" }}>
      <Navbar onOpenWorkspace={() => goToExplore("explore")} />
      <main className="flex-1">
        {/* 01 — Hero */}
        <HeroSection onPillClick={goToExplore} />

        {/* 02 — Choose Your Starting Point */}
        <ChooseStartingPoint onCardClick={goToExplore} />

        {/* 03 — Watch Morphix Work (cinematic transformation) */}
        <WatchMorphixWork />

        {/* 04 — Metrics Strip (credibility after the demo) */}
        <MetricsStrip />

        {/* 05 — One Workspace. Three Workflows. */}
        <ExploreMorphix
          ref={exploreRef}
          activeTab={activeExploreTab}
          onTabChange={setActiveExploreTab}
        />

        {/* 06 — Final CTA */}
        <CTASection onOpen={() => goToExplore("explore")} />
      </main>
      <Footer onNavClick={goToExplore} />
    </div>
  );
}
