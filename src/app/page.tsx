import Navbar                    from "@/components/landing/Navbar";
import HeroSection                from "@/components/landing/HeroSection";
import ChooseStartingPoint        from "@/components/landing/ChooseStartingPoint";
import LiveTransformationWall     from "@/components/landing/LiveTransformationWall";
import AnalyzeWorkflowSection     from "@/components/landing/AnalyzeWorkflowSection";
import TransformationShowcaseSection from "@/components/landing/TransformationShowcaseSection";
import ComponentIntelligenceSection from "@/components/landing/ComponentIntelligenceSection";
import CTASection                 from "@/components/landing/CTASection";
import Footer                     from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#07070f]">
      <Navbar />
      <main className="flex-1">

        {/* 1. HERO — Dark premium. Workspace dominant. Clear value prop. */}
        <HeroSection />

        {/* 2. CHOOSE YOUR STARTING POINT — Light. Three equal entry doors. */}
        <ChooseStartingPoint />

        {/* 3. WATCH WEBSITES TRANSFORM LIVE — Dark. Infinite transformation wall. */}
        <LiveTransformationWall />

        {/* 4. ANALYZE. UNDERSTAND. TRANSFORM. — Dark purple. Merged workflow + Design DNA. */}
        <AnalyzeWorkflowSection />

        {/* 5. PICK A STYLE. SEE THE TRANSFORMATION. — Dark. Merged drag slider + style selector. */}
        <TransformationShowcaseSection />

        {/* 6. COMPONENT ECOSYSTEM — Light. Scrolling columns + theme sandbox. */}
        <ComponentIntelligenceSection />

        {/* 7. CHOOSE YOUR PATH — Dark premium. Final three-gateway CTA. */}
        <CTASection />

      </main>
      <Footer />
    </div>
  );
}
