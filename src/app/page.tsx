import Navbar               from "@/components/landing/Navbar";
import HeroSection           from "@/components/landing/HeroSection";
import MarqueeSection        from "@/components/landing/MarqueeSection";
import CapabilitiesSection   from "@/components/landing/CapabilitiesSection";
import DesignDNASection      from "@/components/landing/DesignDNASection";
import ComponentLibrarySection from "@/components/landing/ComponentLibrarySection";
import StyleMarketplace      from "@/components/landing/StyleMarketplace";
import TrustSection          from "@/components/landing/TrustSection";
import CTASection            from "@/components/landing/CTASection";
import Footer                from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#07070f]">
      <Navbar />
      <main className="flex-1">
        {/* 1. Dark hero with floating elements + workspace */}
        <HeroSection />

        {/* 2. Scrolling transformation marquee */}
        <MarqueeSection />

        {/* 3. Interactive bento capabilities (colorful) */}
        <CapabilitiesSection />

        {/* 4. Design DNA (dark purple section) */}
        <DesignDNASection />

        {/* 5. Component library browser */}
        <ComponentLibrarySection />

        {/* 6. Style marketplace (click to preview) */}
        <StyleMarketplace />

        {/* 7. Trust / stats (dark section with counters) */}
        <TrustSection />

        {/* 8. Final CTA (dark gradient with workspace prompt) */}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
