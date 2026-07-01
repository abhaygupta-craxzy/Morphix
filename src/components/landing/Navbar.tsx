"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";


const NAV_LINKS = [
  { label: "Product",    href: "#" },
  { label: "Components", href: "#explore" },
  { label: "Pricing",    href: "#" },
  { label: "Docs",       href: "#" },
];

interface NavbarProps { onOpenWorkspace?: () => void; }

export default function Navbar({ onOpenWorkspace }: NavbarProps) {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    h(); // run once on mount
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      {/* ── Fixed outer shell — full viewport width, pointer-events none so page is still clickable behind it ── */}
      <div
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
        style={{ padding: scrolled ? "8px 20px" : "14px 20px", transition: "padding 400ms cubic-bezier(0.16,1,0.3,1)" }}
      >
        {/* ── The floating island pill ── */}
        <div
          className="pointer-events-auto mx-auto"
          style={{
            maxWidth: scrolled ? "880px" : "1060px",

            background: scrolled
              ? "rgba(4,6,18,0.88)"
              : "rgba(6,8,22,0.72)",
            backdropFilter: "blur(20px) saturate(1.8)",
            WebkitBackdropFilter: "blur(20px) saturate(1.8)",

            border: scrolled
              ? "1px solid rgba(59,130,246,0.18)"
              : "1px solid rgba(255,255,255,0.07)",

            borderRadius: "999px", // full pill

            boxShadow: scrolled
              ? "0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(59,130,246,0.06), inset 0 1px 0 rgba(255,255,255,0.04)"
              : "0 2px 20px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.03)",

            transition: [
              "max-width 500ms cubic-bezier(0.16,1,0.3,1)",
              "background 350ms ease",
              "border-color 350ms ease",
              "box-shadow 350ms ease",
              "border-radius 350ms ease",
            ].join(", "),
          }}
        >
          <div
            className="flex items-center justify-between"
            style={{
              height: scrolled ? "48px" : "56px",
              padding: "0 18px",
              transition: "height 400ms cubic-bezier(0.16,1,0.3,1), padding 400ms ease",
            }}
          >

            {/* ── Logo ── */}
            <Link
              href="/"
              aria-label="Morphix — home"
              style={{ textDecoration: "none", flexShrink: 0 }}
            >
              {/*
                PNG is 1320×1050. Logo content (mark + MORPHIX text) sits at roughly:
                  x: 26%–74%  y: 27%–53%
                Render at height 320px → image width = 320×(1320/1050) = 402px
                  Logo y start: 27% × 320 = 86px   → top: -86px
                  Logo x start: 26% × 402 = 105px  → left: -105px
                  Logo height:  26% × 320 = 83px   → clip to 56px
                  Logo width:   48% × 402 = 193px  → container 185px
              */}
              <div
                style={{
                  position: "relative",
                  width: "185px",
                  height: "56px",
                  overflow: "hidden",
                  flexShrink: 0,
                  cursor: "pointer",
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.opacity = "0.75"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.opacity = "1"; }}
              >
                <Image
                  src="/morphix-logo.png"
                  alt="Morphix"
                  width={1320}
                  height={1050}
                  priority
                  style={{
                    position: "absolute",
                    height: "320px",
                    width: "auto",
                    top: "-86px",
                    left: "-105px",
                    mixBlendMode: "screen",
                    filter: "brightness(1.80) contrast(1.05) saturate(1.1)",
                  }}
                />
              </div>
            </Link>

            {/* ── Desktop nav — centered ── */}
            <nav className="hidden md:flex items-center gap-0.5">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-all duration-200"
                  style={{ color: "rgba(255,255,255,0.50)" }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.92)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.50)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* ── Right actions ── */}
            <div className="hidden md:flex items-center gap-1.5">
              {/* Login */}
              <Link
                href="/login"
                className="px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-all duration-200"
                style={{ color: "rgba(255,255,255,0.45)" }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                Login
              </Link>

              {/* Sign Up */}
              <Link
                href="/login"
                className="px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-all duration-200"
                style={{
                  color: "rgba(147,197,253,0.85)",
                  border: "1px solid rgba(59,130,246,0.30)",
                  background: "rgba(59,130,246,0.10)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(59,130,246,0.18)";
                  e.currentTarget.style.borderColor = "rgba(59,130,246,0.50)";
                  e.currentTarget.style.color = "rgba(147,197,253,1)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 4px 14px rgba(59,130,246,0.25)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(59,130,246,0.10)";
                  e.currentTarget.style.borderColor = "rgba(59,130,246,0.30)";
                  e.currentTarget.style.color = "rgba(147,197,253,0.85)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Sign Up
              </Link>

              {/* Primary CTA — white pill */}
              <button
                onClick={onOpenWorkspace}
                className="flex items-center gap-1.5 px-4 py-1.5 text-[13px] font-semibold rounded-full transition-all duration-200"
                style={{ background: "#ffffff", color: "#000000" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "0.88";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 16px rgba(255,255,255,0.20)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                }}
              >
                Open Workspace
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </button>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full transition-all"
              style={{ color: "rgba(255,255,255,0.60)", background: "rgba(255,255,255,0.06)" }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.10)"}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)"}
            >
              {mobileOpen ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile dropdown — appears below the pill ── */}
        {mobileOpen && (
          <div
            className="pointer-events-auto mx-auto mt-2"
            style={{
              maxWidth: "380px",
              background: "rgba(4,6,18,0.92)",
              backdropFilter: "blur(24px) saturate(1.8)",
              WebkitBackdropFilter: "blur(24px) saturate(1.8)",
              border: "1px solid rgba(59,130,246,0.16)",
              borderRadius: "24px",
              padding: "16px",
              boxShadow: "0 16px 60px rgba(0,0,0,0.60), 0 0 0 1px rgba(59,130,246,0.06)",
            }}
          >
            <div className="space-y-1 mb-4">
              {NAV_LINKS.map(l => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="flex items-center px-4 py-2.5 text-sm rounded-xl transition-all"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                  onClick={() => setMobileOpen(false)}
                  onMouseEnter={e => { e.currentTarget.style.color = "rgba(255,255,255,0.90)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; e.currentTarget.style.background = "transparent"; }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
              <Link href="/login" className="flex items-center justify-center py-2.5 text-sm rounded-xl transition-all" style={{ color: "rgba(255,255,255,0.50)" }}>
                Login
              </Link>
              <Link
                href="/login"
                className="flex items-center justify-center py-2.5 text-sm font-medium rounded-xl transition-all"
                style={{ background: "rgba(59,130,246,0.10)", border: "1px solid rgba(59,130,246,0.25)", color: "rgba(147,197,253,0.90)" }}
                onClick={() => setMobileOpen(false)}
              >
                Sign Up
              </Link>
              <button
                onClick={() => { setMobileOpen(false); onOpenWorkspace?.(); }}
                className="w-full flex items-center justify-center py-3 text-sm font-semibold text-black rounded-xl"
                style={{ background: "#ffffff" }}
              >
                Open Workspace →
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
