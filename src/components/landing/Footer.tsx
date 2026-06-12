"use client";

import { Zap, ArrowRight, GitBranch, MessageCircle, Video, Link2 } from "lucide-react";

const footerLinks = {
  Product: ["Transform Website", "Design DNA", "Component Library", "Style Marketplace", "Live Preview", "GitHub Export"],
  Developers: ["Documentation", "API Reference", "SDKs", "Changelog", "Status", "Open Source"],
  Company: ["About", "Blog", "Careers", "Press Kit", "Privacy Policy", "Terms of Service"],
  Resources: ["Templates", "Case Studies", "Community", "Support", "Contact", "Affiliate Program"],
};

const socials = [
  { icon: MessageCircle, label: "Twitter",  href: "#" },
  { icon: GitBranch,     label: "GitHub",   href: "#" },
  { icon: Video,         label: "YouTube",  href: "#" },
  { icon: Link2,         label: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#07070f] border-t border-white/5 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-40 orb-indigo blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-60 h-40 orb-purple blur-3xl opacity-15 pointer-events-none" />

      {/* Main footer grid */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight">Morphix</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed mb-5">
              The AI Website Transformation Studio. Transform, redesign, and remix any website with AI.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2">
              {socials.map(s => {
                const Icon = s.icon;
                return (
                  <a key={s.label} href={s.href}
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-white/15 transition-all"
                    aria-label={s.label}>
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">{category}</h3>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/40 hover:text-white/90 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-14 pt-8 border-t border-white/5">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-sm font-bold text-white mb-1">Stay in the loop</div>
              <div className="text-xs text-white/40">AI design updates, new components, and feature releases.</div>
            </div>
            <div className="flex gap-2 w-full lg:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 lg:w-64 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 transition-all"
              />
              <button className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all whitespace-nowrap">
                Subscribe <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-white/25">
            © 2025 Morphix. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/25">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-dot" />
            All systems operational
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-white/25 hover:text-white/60 transition-colors">Privacy</a>
            <a href="#" className="text-xs text-white/25 hover:text-white/60 transition-colors">Terms</a>
            <a href="#" className="text-xs text-white/25 hover:text-white/60 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
