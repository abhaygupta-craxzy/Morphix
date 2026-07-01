import Sidebar from "./dashboard/Sidebar";
import Topbar from "./dashboard/Topbar";
import HeroSection from "./dashboard/HeroSection";
import ActionCards from "./dashboard/ActionCards";
import RecentProjects from "./dashboard/RecentProjects";
import TrendingComponents from "./dashboard/TrendingComponents";

export default function WorkspaceHome() {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#050816" }}>
      <Sidebar />

      <main
        className="flex-1 flex flex-col min-h-0"
        style={{
          /* Subtle radial gradient — center slightly lighter, edges deeper */
          background:
            "radial-gradient(ellipse 80% 55% at 50% 0%, #111827 0%, #0B1020 60%, #080d1a 100%)",
        }}
      >
        {/* Sticky topbar */}
        <Topbar />

        {/* Scrollable content — clear rhythm via gap instead of space-y */}
        <div className="flex-1 overflow-y-auto px-8" style={{ paddingTop: 32 }}>

          {/* Greeting — 32px from topbar */}
          <HeroSection />

          {/* Action cards — 28px below hero (resume banner is inside hero) */}
          <div style={{ marginTop: 28 }}>
            <ActionCards />
          </div>

          {/* Recent Projects — 56px below cards */}
          <div style={{ marginTop: 56 }}>
            <RecentProjects />
          </div>

          {/* Trending — 56px below recent */}
          <div style={{ marginTop: 56, paddingBottom: 64 }}>
            <TrendingComponents />
          </div>

        </div>
      </main>
    </div>
  );
}