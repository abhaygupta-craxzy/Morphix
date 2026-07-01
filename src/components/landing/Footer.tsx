"use client";

import Link from "next/link";



const footerLinks = {
  Product:    ["Create Website", "Transform Website", "Design DNA", "Component Library", "Live Preview", "GitHub Export"],
  Developers: ["Documentation", "API Reference", "Changelog", "Status", "Open Source"],
  Company:    ["About", "Blog", "Careers", "Privacy Policy", "Terms of Service"],
  Resources:  ["Templates", "Community", "Support", "Contact"],
};

interface FooterProps {
  onNavClick?: (tab: "explore" | "transform" | "create") => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  return (
    <footer
      className="relative border-t"
      style={{ background: "#050816", borderColor: "rgba(255,255,255,0.06)" }}
    >
      {/* Blue top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.30) 50%, transparent 100%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">

        {/* Main grid */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-16">

          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(13,20,40,0.80) 100%)",
                  border: "1px solid rgba(59,130,246,0.25)",
                }}>
                <span className="font-black text-sm"
                  style={{
                    background: "linear-gradient(135deg, #93C5FD 0%, #3B82F6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>
                  M
                </span>
              </div>
              <span className="font-semibold text-white text-sm tracking-tight">Morphix</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "rgba(255,255,255,0.35)", fontWeight: 400 }}>
              Create, customize, and launch websites — all inside one AI workspace.
            </p>
            {/* Status */}
            <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#4ade80", animation: "pulseGreen 2s ease-in-out infinite" }} />
              All systems operational
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              {["Twitter", "GitHub", "Discord"].map(s => (
                <a
                  key={s}
                  href="#"
                  className="text-[10px] px-2.5 py-1.5 rounded-lg transition-all duration-200"
                  style={{ color: "rgba(255,255,255,0.28)", border: "1px solid rgba(255,255,255,0.07)", background: "transparent" }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = "rgba(147,197,253,0.80)";
                    e.currentTarget.style.borderColor = "rgba(59,130,246,0.28)";
                    e.currentTarget.style.background = "rgba(59,130,246,0.06)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.28)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-[10px] font-bold uppercase tracking-widest mb-4"
                style={{ color: "rgba(255,255,255,0.28)" }}>
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-all duration-200"
                      style={{ color: "rgba(255,255,255,0.35)", fontWeight: 400 }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = "rgba(255,255,255,0.80)";
                        e.currentTarget.style.paddingLeft = "4px";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = "rgba(255,255,255,0.35)";
                        e.currentTarget.style.paddingLeft = "0";
                      }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="text-xs" style={{ color: "rgba(255,255,255,0.22)" }}>
            © 2026 Morphix. All rights reserved.
          </div>
          <div className="flex items-center gap-5">
            {["Privacy", "Terms", "Cookies"].map(item => (
              <a
                key={item}
                href="#"
                className="text-xs transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.22)" }}
                onMouseEnter={e => e.currentTarget.style.color = "rgba(147,197,253,0.65)"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.22)"}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes pulseGreen{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(16,185,129,0.4)}50%{opacity:0.75;box-shadow:0 0 0 5px rgba(16,185,129,0)}}`}</style>
    </footer>
  );
}
