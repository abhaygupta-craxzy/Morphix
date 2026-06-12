"use client";

import { useState, useEffect } from "react";
import { Zap, Menu, X, ChevronDown, ArrowRight } from "lucide-react";

const navLinks = [
  {
    label: "Product",
    children: [
      { label: "Transform Website", desc: "Turn any URL into a new design" },
      { label: "Design DNA",        desc: "Extract design systems from anything" },
      { label: "Component Library", desc: "10,000+ production components" },
      { label: "Live Preview",      desc: "See changes across all devices" },
    ],
  },
  { label: "Components", href: "#components" },
  { label: "Styles",     href: "#styles" },
  { label: "Pricing",    href: "#" },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown]     = useState<string | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#07070f]/90 backdrop-blur-xl border-b border-white/5 shadow-xl shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-8 h-8">
                {/* Animated ring */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 animate-glow-shift" />
                <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/40">
                  <Zap className="w-4 h-4 text-white" />
                </div>
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight">
                Morphix
              </span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <div key={link.label} className="relative">
                  {link.children ? (
                    <button
                      onMouseEnter={() => setDropdown(link.label)}
                      onMouseLeave={() => setDropdown(null)}
                      className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors rounded-xl hover:bg-white/5"
                    >
                      {link.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdown === link.label ? "rotate-180" : ""}`} />
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors rounded-xl hover:bg-white/5 block"
                    >
                      {link.label}
                    </a>
                  )}

                  {/* Dropdown */}
                  {link.children && dropdown === link.label && (
                    <div
                      onMouseEnter={() => setDropdown(link.label)}
                      onMouseLeave={() => setDropdown(null)}
                      className="absolute top-full left-0 pt-2 w-64 animate-scale-in"
                    >
                      <div className="bg-[#0d0d20]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl shadow-black/50">
                        {link.children.map((child) => (
                          <a
                            key={child.label}
                            href="#"
                            className="flex flex-col px-3 py-2.5 rounded-xl hover:bg-white/8 transition-all group"
                          >
                            <span className="text-sm font-semibold text-white/90 group-hover:text-white">{child.label}</span>
                            <span className="text-xs text-white/40 group-hover:text-white/60 mt-0.5">{child.desc}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right side CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a href="#" className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors">
                Log in
              </a>
              <a
                href="#"
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all"
              >
                Get Started <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-white/60 hover:text-white transition-colors rounded-xl hover:bg-white/5"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#07070f]/98 backdrop-blur-xl border-b border-white/5 animate-slide-in-up">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href ?? "#"}
                  className="block px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 flex flex-col gap-2 border-t border-white/5 mt-3">
                <a href="#" className="px-4 py-3 text-sm font-medium text-white/60 hover:text-white text-center transition-colors">Log in</a>
                <a href="#" className="px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-bold rounded-xl text-center hover:opacity-90 transition-opacity">
                  Get Started Free
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
