import Navbar                       from "@/components/landing/Navbar";
import HeroSection                   from "@/components/landing/HeroSection";
import ChooseStartingPoint           from "@/components/landing/ChooseStartingPoint";
import LiveTransformationWall        from "@/components/landing/LiveTransformationWall";
import WebsiteTransformationShowcase from "@/components/landing/WebsiteTransformationShowcase";
import DesignDNASection              from "@/components/landing/DesignDNASection";
import ComponentIntelligenceSection  from "@/components/landing/ComponentIntelligenceSection";
import ComponentLibrarySection      from "@/components/landing/ComponentLibrarySection";
import StyleMarketplace              from "@/components/landing/StyleMarketplace";
import TrustSection                  from "@/components/landing/TrustSection";
import CTASection                    from "@/components/landing/CTASection";
import Footer                        from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#070B14]">
      <Navbar />
      <main className="flex-1">
        {/* 1. Dark hero — workspace dominant (30% text / 70% product) */}
        <HeroSection />

        {/* 2. Light — Choose your starting point (3 premium entry cards) */}
        <ChooseStartingPoint />

        {/* 3. Dark — Live Transformation Wall (signature section) */}
        <LiveTransformationWall />

        {/* 4. Light — Website Transformation Showcase (before/after slider) */}
        <WebsiteTransformationShowcase />

        {/* 5. Dark — Design DNA Engine */}
        <DesignDNASection />

        {/* 6. Light — Component Intelligence Engine (6 scrolling columns + theme sandbox) */}
        <ComponentIntelligenceSection />

        {/* 7. Light — Component Library Browser */}
        <ComponentLibrarySection />

        {/* 8. Light — Style Marketplace (click any style to preview) */}
        <StyleMarketplace />

        {/* 9. Dark — Trust / Stats counters */}
        <TrustSection />

        {/* 10. Light — Final CTA workspace prompt */}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
