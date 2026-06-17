"use client";

import { useState, useEffect, useRef } from "react";
import {
  Globe, Wand2, Sparkles, ArrowRight, Zap,
  Check, Download, Code2, GitBranch, RefreshCw,
  FileImage, Folder, ChevronRight, Monitor,
  LayoutGrid, Search, Star
} from "lucide-react";

const CYCLE_WORDS = ["Transform", "Redesign", "Rebuild", "Remix", "Reimagine"];

const STYLES = [
  { id: "stripe",  label: "Stripe",       accent: "#5B7FFF", navBg: "bg-indigo-700",  heroBg: "bg-indigo-950",  btnColor: "bg-indigo-500"  },
  { id: "apple",   label: "Apple",        accent: "#ffffff", navBg: "bg-zinc-950",    heroBg: "bg-zinc-900",    btnColor: "bg-zinc-700"    },
  { id: "linear",  label: "Linear",       accent: "#7C5CFF", navBg: "bg-purple-950",  heroBg: "bg-slate-900",   btnColor: "bg-purple-600"  },
  { id: "saas",    label: "Modern SaaS",  accent: "#14B8A6", navBg: "bg-blue-700",    heroBg: "bg-blue-950",    btnColor: "bg-blue-500"    },
  { id: "framer",  label: "Framer",       accent: "#0099ff", navBg: "bg-sky-600",     heroBg: "bg-sky-950",     btnColor: "bg-sky-500"     },
  { id: "notion",  label: "Notion",       accent: "#e3e3e3", navBg: "bg-slate-50",    heroBg: "bg-white",       btnColor: "bg-slate-900"   },
];

const STAGES = [
  { key: "idle",       label: "Ready",                    pct: 0   },
  { key: "crawling",   label: "Crawling layout nodes…",   pct: 15  },
  { key: "extracting", label: "Extracting design DNA…",   pct: 35  },
  { key: "matching",   label: "Matching components…",     pct: 55  },
  { key: "styling",    label: "Applying style preset…",   pct: 78  },
  { key: "building",   label: "Compiling bundle…",        pct: 92  },
  { key: "ready",      label: "Transformation complete!", pct: 100 },
] as const;
type Stage = typeof STAGES[number]["key"];

const TABS = [
  { id: "url",     icon: Globe,      label: "Import Website"    },
  { id: "image",   icon: FileImage,  label: "Upload Screenshot" },
  { id: "repo",    icon: GitBranch,  label: "GitHub Repo"       },
  { id: "scratch", icon: Sparkles,   label: "Start Fresh"       },
  { id: "browse",  icon: LayoutGrid, label: "Browse Components" },
] as const;
type TabId = typeof TABS[number]["id"];

const BROWSE_COMPONENTS = [
  {
    id: "c1",
    name: "Gradient Hero",
    style: "Modern SaaS",
    cat: "Hero",
    rating: 4.9,
    uses: "12.4k",
    colors: ["#5B7FFF", "#7C5CFF"],
    preview: (
      <div className="w-full h-full bg-gradient-to-br from-[#5B7FFF] to-[#7C5CFF] flex flex-col items-center justify-center gap-1 p-2 text-white">
        <div className="w-12 h-1 rounded-full bg-white/40" />
        <div className="w-16 h-2 rounded bg-white/70" />
        <div className="w-10 h-1 rounded bg-white/30" />
        <div className="flex gap-1 mt-1">
          <div className="h-3 w-8 rounded-sm bg-white text-[4px] font-bold text-[#5B7FFF] flex items-center justify-center">Start</div>
          <div className="h-3 w-8 rounded-sm border border-white/30 text-[4px] text-white flex items-center justify-center">Demo</div>
        </div>
      </div>
    ),
  },
  {
    id: "c2",
    name: "Glass Navbar",
    style: "Minimal",
    cat: "Navbar",
    rating: 4.8,
    uses: "9.1k",
    colors: ["#070B14", "#5B7FFF"],
    preview: (
      <div className="w-full h-full bg-[#0d1220]/60 flex flex-col">
        <div className="flex items-center justify-between px-2.5 py-1.5 bg-white/5 backdrop-blur border-b border-white/5">
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded bg-[#5B7FFF]" />
            <div className="w-6 h-1 rounded bg-white/50" />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-0.5 rounded bg-white/30" />
            <div className="w-3 h-0.5 rounded bg-white/30" />
            <div className="w-6 h-2 rounded bg-[#5B7FFF]" />
          </div>
        </div>
        <div className="flex-1" />
      </div>
    ),
  },
  {
    id: "c3",
    name: "3-Tier Pricing",
    style: "Stripe",
    cat: "Pricing",
    rating: 4.9,
    uses: "6.8k",
    colors: ["#5B7FFF", "#7C5CFF", "#14B8A6"],
    preview: (
      <div className="w-full h-full bg-[#070B14]/40 p-1 flex gap-1 items-center justify-center">
        {[{ bg: "bg-[#0d1220]/80", t: "text-white/70" }, { bg: "bg-gradient-to-b from-[#5B7FFF] to-[#7C5CFF]", t: "text-white", ring: true }, { bg: "bg-[#0d1220]/80", t: "text-white/70" }].map((tier, i) => (
          <div key={i} className={`flex-1 rounded ${tier.bg} ${tier.ring ? "ring-1 ring-[#5B7FFF]/40 shadow-lg" : "border border-white/5"} p-1 flex flex-col items-center gap-0.5`}>
            <div className="text-[4px] font-bold scale-90">{["Starter", "Pro", "Team"][i]}</div>
            <div className="text-[6px] font-black leading-none">$29</div>
            <div className="w-full h-0.5 rounded bg-white/10" />
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "c4",
    name: "Analytics Dashboard",
    style: "Enterprise",
    cat: "Dashboard",
    rating: 4.7,
    uses: "5.2k",
    colors: ["#14B8A6", "#7C5CFF"],
    preview: (
      <div className="w-full h-full bg-[#0d1220] p-1.5 flex flex-col gap-1">
        <div className="grid grid-cols-3 gap-0.5">
          {["bg-[#5B7FFF]/20", "bg-[#7C5CFF]/20", "bg-[#14B8A6]/20"].map((c, i) => (
            <div key={i} className={`${c} rounded p-0.5`}>
              <div className="w-3 h-0.5 rounded bg-white/30 mb-0.5" />
              <div className="text-[5px] font-bold text-white/80 leading-none">{["24K", "89%", "2.4s"][i]}</div>
            </div>
          ))}
        </div>
        <div className="flex-1 bg-white/5 rounded p-0.5">
          <div className="flex items-end gap-0.5 h-4">
            {[35, 60, 45, 75, 55, 70, 85].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-[#5B7FFF] to-[#7C5CFF]" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "c5",
    name: "Auth Form",
    style: "Minimal",
    cat: "Auth",
    rating: 4.6,
    uses: "8.9k",
    colors: ["#5B7FFF", "#FAFBFC"],
    preview: (
      <div className="w-full h-full bg-[#070B14]/40 flex items-center justify-center">
        <div className="w-16 bg-[#0d1220] rounded border border-white/5 p-1 shadow-lg space-y-0.5">
          <div className="text-[5px] font-bold text-white/70 text-center scale-90">Sign in</div>
          <div className="h-1.5 rounded border border-white/5 px-1 flex items-center"><div className="w-8 h-0.5 bg-white/20" /></div>
          <div className="h-1.5 rounded border border-white/5 px-1 flex items-center"><div className="w-6 h-0.5 bg-white/20" /></div>
          <div className="h-2.5 rounded bg-gradient-to-r from-[#5B7FFF] to-[#7C5CFF] flex items-center justify-center"><div className="text-[4px] font-bold text-white">Sign In</div></div>
        </div>
      </div>
    ),
  },
  {
    id: "c6",
    name: "Bento Features",
    style: "Modern SaaS",
    cat: "Hero",
    rating: 4.8,
    uses: "7.3k",
    colors: ["#5B7FFF", "#14B8A6"],
    preview: (
      <div className="w-full h-full bg-[#070B14]/60 p-1 grid grid-cols-3 grid-rows-2 gap-0.5">
        {[{ bg: "from-[#5B7FFF]/10 to-[#7C5CFF]/10", b: "border-[#5B7FFF]/10", c: "bg-[#5B7FFF]", span: "col-span-2" },
          { bg: "from-[#14B8A6]/10 to-emerald-500/10", b: "border-[#14B8A6]/10", c: "bg-[#14B8A6]", span: "" },
          { bg: "from-amber-500/10 to-orange-500/10", b: "border-amber-500/10", c: "bg-amber-500", span: "" },
          { bg: "from-[#7C5CFF]/10 to-pink-500/10", b: "border-[#7C5CFF]/10", c: "bg-[#7C5CFF]", span: "col-span-2" }].map((f, i) => (
            <div key={i} className={`${f.span} bg-gradient-to-br ${f.bg} rounded border ${f.b} p-0.5 flex gap-0.5 items-start`}>
              <div className={`w-1 h-1 rounded-full ${f.c} flex-shrink-0`} />
              <div className="w-4 h-0.5 bg-white/20 rounded" />
            </div>
          ))}
      </div>
    ),
  },
  {
    id: "c7",
    name: "Settings Panel",
    style: "Enterprise",
    cat: "Settings",
    rating: 4.5,
    uses: "3.8k",
    colors: ["#5B7FFF", "#FAFBFC"],
    preview: (
      <div className="w-full h-full bg-[#0d1220] flex">
        <div className="w-10 border-r border-white/5 p-1 space-y-0.5">
          {[0, 1, 2].map(i => (
            <div key={i} className={`h-2.5 rounded ${i === 1 ? "bg-[#5B7FFF]/10 border border-[#5B7FFF]/20" : "bg-white/5"} flex items-center px-0.5 gap-0.5`}>
              <div className={`w-1 h-1 rounded-full ${i === 1 ? "bg-[#5B7FFF]" : "bg-white/30"}`} />
              <div className="flex-1 h-0.5 rounded bg-white/10" />
            </div>
          ))}
        </div>
        <div className="flex-1 p-1 space-y-0.5">
          {[12, 8, 10].map((w, i) => (
            <div key={i} className="space-y-0.5">
              <div className="h-0.5 rounded bg-white/20" style={{ width: `${w / 12 * 100}%` }} />
              <div className="h-1.5 rounded border border-white/5 bg-[#070B14]/40" />
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "c8",
    name: "Sidebar Layout",
    style: "Modern SaaS",
    cat: "Dashboard",
    rating: 4.7,
    uses: "4.5k",
    colors: ["#070B14", "#5B7FFF"],
    preview: (
      <div className="w-full h-full bg-[#070B14]/40 flex">
        <div className="w-8 bg-[#0d1220] p-0.5 flex flex-col gap-0.5 border-r border-white/5">
          <div className="w-2 h-2 rounded bg-[#5B7FFF] mx-auto" />
          {[0, 1, 2].map(i => (
            <div key={i} className={`h-1.5 rounded ${i === 1 ? "bg-[#5B7FFF]" : "bg-white/10"}`} />
          ))}
        </div>
        <div className="flex-1 p-0.5 space-y-0.5">
          <div className="h-2 bg-[#0d1220] rounded border border-white/5" />
          <div className="grid grid-cols-2 gap-0.5">
            <div className="h-3 bg-[#0d1220] rounded border border-white/5" />
            <div className="h-3 bg-[#0d1220] rounded border border-white/5" />
          </div>
          <div className="h-3.5 bg-[#0d1220] rounded border border-white/5" />
        </div>
      </div>
    ),
  },
  {
    id: "c9",
    name: "Contact Form",
    style: "Minimal",
    cat: "Forms",
    rating: 4.6,
    uses: "6.1k",
    colors: ["#5B7FFF", "#7C5CFF"],
    preview: (
      <div className="w-full h-full bg-gradient-to-br from-[#5B7FFF]/10 to-[#7C5CFF]/10 p-1 flex items-center justify-center">
        <div className="w-full bg-[#0d1220] rounded border border-white/5 p-1 shadow-sm space-y-0.5">
          <div className="grid grid-cols-2 gap-0.5">
            <div className="h-2 rounded border border-white/5 bg-white/5" />
            <div className="h-2 rounded border border-white/5 bg-white/5" />
          </div>
          <div className="h-2 rounded border border-white/5 bg-white/5" />
          <div className="h-3 rounded border border-white/5 bg-white/5" />
          <div className="h-2.5 rounded bg-gradient-to-r from-[#5B7FFF] to-[#7C5CFF] flex items-center justify-center">
            <div className="text-[4px] font-bold text-white scale-90">Send</div>
          </div>
        </div>
      </div>
    ),
  },
];

/* ── mini site previews ─────────────────────────── */
function OldSite() {
  return (
    <div className="w-full h-full flex flex-col bg-slate-100 font-mono text-[#1a1a1a]">
      <div className="bg-slate-700 px-3 py-2 flex items-center justify-between">
        <span className="font-bold text-white text-[10px] tracking-wide">OLDCORP™</span>
        <div className="flex gap-3 text-[9px] text-blue-300 underline">
          <span>Home</span><span>Products</span><span>Contact</span>
        </div>
      </div>
      <div className="flex-1 p-3 space-y-2">
        <div className="text-sm font-serif font-bold text-slate-800 leading-tight">Best Products Since 1998</div>
        <p className="text-[9px] text-slate-600 leading-relaxed">
          Welcome! We sell quality widgets at competitive prices. Click below to view our catalog or call us at 1-800-WIDGETS.
        </p>
        <button className="bg-slate-600 text-white text-[9px] px-3 py-1.5 rounded cursor-default font-bold">VIEW CATALOG</button>
        <div className="grid grid-cols-3 gap-1.5 pt-1">
          {[1,2,3].map(i => (
            <div key={i} className="h-12 bg-slate-200 border border-slate-300 flex items-center justify-center text-[7px] text-slate-500">
              Product {i}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NewSite({ style }: { style: typeof STYLES[number] }) {
  const isDark = style.id !== "notion";
  return (
    <div className={`w-full h-full flex flex-col ${isDark ? "bg-[#070B14]" : "bg-white"}`}>
      <div className={`${style.navBg} px-3 py-2 flex items-center justify-between`}>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-md bg-white/30 flex items-center justify-center">
            <Zap className="w-2 h-2 text-white fill-current" />
          </div>
          <span className={`font-extrabold text-[10px] tracking-tight ${isDark || style.id !== "notion" ? "text-white" : "text-slate-900"}`}>
            {style.label === "Notion" ? "Workspace" : "MORPHIX"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[8px] text-white/60">Products</span>
          <span className="text-[8px] text-white/60">Pricing</span>
          <span className={`text-[8px] font-bold text-white px-2 py-0.5 rounded-lg ${style.btnColor}`}>Launch</span>
        </div>
      </div>
      <div className={`${style.heroBg} flex-1 p-3 flex flex-col justify-between`}>
        <div className="space-y-1.5">
          <div className={`text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded text-white/60 bg-white/10 inline-block`}>
            {style.label} Style
          </div>
          <div className="text-xs font-black text-white leading-tight">
            Redefine digital presence.
          </div>
          <div className="text-[9px] text-white/50 leading-relaxed">
            Premium AI-powered redesign. Ships in seconds.
          </div>
          <div className="flex gap-1.5 pt-1">
            <button className={`text-[8px] font-bold text-white px-2.5 py-1 rounded-lg ${style.btnColor} cursor-default`}>
              Get Started
            </button>
            <button className="text-[8px] font-semibold text-white/70 px-2.5 py-1 rounded-lg border border-white/10 cursor-default">
              Live Demo
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[0,1,2].map(i => (
            <div key={i} className="h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <div className="w-4 h-1 rounded bg-white/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── BlueprintBackground HTML5 Canvas Component for Butter-Smooth 60FPS Performance ── */
function BlueprintBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Color palettes definitions
    const THEMES = [
      { name: "indigo", border: "rgba(91, 127, 255, 1)", accent: "rgba(91, 127, 255, 0.6)", fill: "rgba(91, 127, 255, 0.04)" },
      { name: "teal", border: "rgba(20, 184, 166, 1)", accent: "rgba(20, 184, 166, 0.6)", fill: "rgba(20, 184, 166, 0.04)" },
      { name: "purple", border: "rgba(124, 92, 255, 1)", accent: "rgba(124, 92, 255, 0.6)", fill: "rgba(124, 92, 255, 0.04)" },
      { name: "pink", border: "rgba(244, 63, 94, 1)", accent: "rgba(244, 63, 94, 0.6)", fill: "rgba(244, 63, 94, 0.04)" },
      { name: "amber", border: "rgba(245, 158, 11, 1)", accent: "rgba(245, 158, 11, 0.6)", fill: "rgba(245, 158, 11, 0.04)" },
      { name: "emerald", border: "rgba(16, 185, 129, 1)", accent: "rgba(16, 185, 129, 0.6)", fill: "rgba(16, 185, 129, 0.04)" }
    ];

    interface Wireframe {
      x: number;
      y: number;
      w: number;
      h: number;
      vx: number;
      vy: number;
      type: "hero" | "bento" | "code" | "swatch" | "charts" | "device" | "pricing" | "profile" | "terminal" | "cursor" | "tag" | "sparkle" | "plus";
      opacity: number;
      rotation: number;
      rotSpeed: number;
      text?: string;
      colorIdx: number;
    }

    const wireframes: Wireframe[] = [];

    // Types of card wireframes
    const cardTypes: ("hero" | "bento" | "code" | "swatch" | "charts" | "device" | "pricing" | "profile" | "terminal")[] = [
      "hero", "bento", "code", "swatch", "charts", "device", "pricing", "profile", "terminal"
    ];

    // Detail elements
    const detailTypes: ("cursor" | "tag" | "sparkle" | "plus")[] = [
      "cursor", "tag", "sparkle", "plus"
    ];

    const codeTags = [
      "<section>", "flex-col", "grid-cols-3", "gap-6", "rounded-2xl", 
      "backdrop-blur", "animate-float", "use client", "dna.colors", "export default",
      "npm run dev", "next build", "git commit", "api.route"
    ];

    // 1. Populate 16 Major Blueprint layout cards - distributed evenly using a 4x4 grid with organic jitter
    for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 4; row++) {
        const i = col * 4 + row;
        const type = cardTypes[i % cardTypes.length];
        
        let w = 240;
        let h = 140;
        if (type === "hero") { w = 280; h = 160; }
        else if (type === "device") { w = 120; h = 200; }
        else if (type === "pricing") { w = 170; h = 210; }
        else if (type === "profile") { w = 160; h = 100; }
        else if (type === "swatch") { w = 190; h = 110; }
        else if (type === "code") { w = 220; h = 130; }
        else if (type === "terminal") { w = 200; h = 120; }
        else if (type === "charts") { w = 260; h = 150; }

        // Sector grid cell coordinates
        const cellW = width / 4;
        const cellH = height / 4;
        const cellX = col * cellW;
        const cellY = row * cellH;

        // Position inside cell with safety margin
        const jitterX = Math.random() * Math.max(10, cellW - w - 25) + 10;
        const jitterY = Math.random() * Math.max(10, cellH - h - 25) + 10;

        wireframes.push({
          x: cellX + jitterX,
          y: cellY + jitterY,
          w,
          h,
          vx: 0.12 + Math.random() * 0.12, // Slow, elegant diagonal movement (moving right and up at an angle)
          vy: -0.12 - Math.random() * 0.12,
          type,
          opacity: 0.5 + Math.random() * 0.3, // Brighter contrast
          rotation: (Math.random() - 0.5) * 0.16,
          rotSpeed: (Math.random() - 0.5) * 0.0004,
          colorIdx: i % THEMES.length // Assign themed color
        });
      }
    }

    // 2. Populate 16 Minor Details (sparkles, cursors, code tags) - interleaved cell positions for even spacing
    for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 4; row++) {
        const i = col * 4 + row;
        const type = detailTypes[i % detailTypes.length];
        let w = 12;
        let h = 12;
        if (type === "tag") { w = 90; h = 24; }
        else if (type === "cursor") { w = 70; h = 24; }

        // Sector grid cell coordinates offset by 50% to spawn between cards
        const cellW = width / 4;
        const cellH = height / 4;
        const cellX = ((col + 0.5) % 4) * cellW;
        const cellY = ((row + 0.5) % 4) * cellH;

        // Position inside cell with safety margin
        const jitterX = Math.random() * Math.max(10, cellW - w - 25) + 10;
        const jitterY = Math.random() * Math.max(10, cellH - h - 25) + 10;

        wireframes.push({
          x: cellX + jitterX,
          y: cellY + jitterY,
          w,
          h,
          vx: 0.16 + Math.random() * 0.16, // Slower details at an angle
          vy: -0.16 - Math.random() * 0.16,
          type,
          opacity: 0.6 + Math.random() * 0.25,
          rotation: (Math.random() - 0.5) * 0.25,
          rotSpeed: type === "sparkle" ? (Math.random() - 0.5) * 0.005 : (Math.random() - 0.5) * 0.001,
          text: type === "tag" ? codeTags[i % codeTags.length] : undefined,
          colorIdx: (i + 3) % THEMES.length
        });
      }
    }

    const drawCard = (ctx: CanvasRenderingContext2D, w: Wireframe) => {
      ctx.save();
      ctx.translate(w.x + w.w / 2, w.y + w.h / 2);
      ctx.rotate(w.rotation);
      
      const x = -w.w / 2;
      const y = -w.h / 2;
      
      const theme = THEMES[w.colorIdx];
      const borderClr = theme.border.replace("1)", `${w.opacity * 0.95})`);
      const fillClr = theme.border.replace("1)", `${w.opacity * 0.12})`);
      const accentClr = theme.accent.replace("0.6)", `${w.opacity * 0.75})`);
      const textClr = `rgba(255, 255, 255, ${w.opacity * 0.65})`;
      const subTextClr = `rgba(255, 255, 255, ${w.opacity * 0.45})`;
      const brightTextClr = `rgba(255, 255, 255, ${w.opacity * 0.9})`;

      // Draw detail elements
      if (w.type === "sparkle") {
        ctx.fillStyle = borderClr;
        ctx.beginPath();
        ctx.moveTo(0, -9);
        ctx.quadraticCurveTo(0, 0, 9, 0);
        ctx.quadraticCurveTo(0, 0, 0, 9);
        ctx.quadraticCurveTo(0, 0, -9, 0);
        ctx.quadraticCurveTo(0, 0, 0, -9);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        return;
      }
      
      if (w.type === "plus") {
        ctx.strokeStyle = borderClr;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(-5, 0); ctx.lineTo(5, 0);
        ctx.moveTo(0, -5); ctx.lineTo(0, 5);
        ctx.stroke();
        
        ctx.fillStyle = textClr;
        ctx.font = "8px monospace";
        ctx.fillText(`+ ${theme.name.toUpperCase()}`, 8, 3);
        ctx.restore();
        return;
      }
      
      if (w.type === "cursor") {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 11, y + 4);
        ctx.lineTo(x + 6, y + 6);
        ctx.lineTo(x + 10, y + 13);
        ctx.lineTo(x + 8, y + 14);
        ctx.lineTo(x + 4, y + 7);
        ctx.closePath();
        
        ctx.fillStyle = borderClr;
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
        
        ctx.fillStyle = "rgba(7, 11, 20, 0.8)";
        ctx.strokeStyle = borderClr;
        ctx.lineWidth = 1;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(x + 14, y + 2, 60, 15, 3); else ctx.rect(x + 14, y + 2, 60, 15);
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = borderClr;
        ctx.font = "bold 7.5px monospace";
        ctx.fillText("AI AGENT", x + 19, y + 12);
        
        ctx.restore();
        return;
      }
      
      if (w.type === "tag") {
        ctx.fillStyle = "rgba(7, 11, 20, 0.8)";
        ctx.strokeStyle = borderClr;
        ctx.lineWidth = 1;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(x, y, w.w, w.h, 5); else ctx.rect(x, y, w.w, w.h);
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = `rgba(255, 255, 255, ${w.opacity * 0.75})`;
        ctx.font = "bold 8.5px monospace";
        ctx.textAlign = "center";
        ctx.fillText(w.text || "div", 0, 4);
        
        ctx.restore();
        return;
      }
      
      // Major card backdrop fill
      ctx.fillStyle = "rgba(9, 13, 24, 0.85)";
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(x, y, w.w, w.h, 10); else ctx.rect(x, y, w.w, w.h);
      ctx.fill();

      // Card boundary outline
      ctx.strokeStyle = borderClr;
      ctx.lineWidth = 1.25;
      ctx.stroke();
      
      // Card inner fills
      ctx.fillStyle = fillClr;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(x + 2, y + 2, w.w - 4, w.h - 4, 8); else ctx.rect(x + 2, y + 2, w.w - 4, w.h - 4);
      ctx.fill();

      // Helper function for syntax highlighting in react editor
      const drawTokens = (tokens: { text: string; color: string }[], tx: number, ty: number) => {
        let currX = tx;
        ctx.font = "8px monospace";
        ctx.textAlign = "left";
        for (const token of tokens) {
          ctx.fillStyle = token.color;
          ctx.fillText(token.text, currX, ty);
          currX += ctx.measureText(token.text).width;
        }
      };

      // Reset text alignment to left for card components
      ctx.textAlign = "left";

      // ── TYPE DRAWINGS ──
      if (w.type === "hero") {
        // Dot controls
        ctx.fillStyle = accentClr;
        ctx.beginPath();
        ctx.arc(x + 12, y + 12, 2.5, 0, Math.PI * 2);
        ctx.arc(x + 20, y + 12, 2.5, 0, Math.PI * 2);
        ctx.arc(x + 28, y + 12, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Logo text
        ctx.fillStyle = borderClr;
        ctx.font = "bold 8.5px monospace";
        ctx.fillText("MORPHIX", x + 38, y + 15);

        // Header links
        ctx.font = "7px sans-serif";
        ctx.fillStyle = subTextClr;
        ctx.fillText("Docs", x + 160, y + 14);
        ctx.fillText("Styles", x + 195, y + 14);
        ctx.fillText("Pricing", x + 235, y + 14);

        // Navbar line
        ctx.strokeStyle = fillClr;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + 8, y + 22); ctx.lineTo(x + w.w - 8, y + 22);
        ctx.stroke();

        // Main Title
        ctx.fillStyle = brightTextClr;
        ctx.font = "bold 12px sans-serif";
        ctx.fillText("AI Site Transformation", x + 16, y + 42);

        // Subtext
        ctx.fillStyle = subTextClr;
        ctx.font = "7.5px sans-serif";
        ctx.fillText("Legacy HTML -> Tailored React + Tailwind.", x + 16, y + 55);

        // Button 1 (Filled CTA)
        ctx.fillStyle = borderClr;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(x + 16, y + 70, 56, 16, 4); else ctx.rect(x + 16, y + 70, 56, 16);
        ctx.fill();
        ctx.fillStyle = "rgba(7, 11, 20, 0.9)";
        ctx.font = "bold 7px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Transform", x + 16 + 28, y + 80);

        // Button 2 (Outlined CTA)
        ctx.strokeStyle = borderClr;
        ctx.lineWidth = 1;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(x + 80, y + 70, 48, 16, 4); else ctx.rect(x + 80, y + 70, 48, 16);
        ctx.stroke();
        ctx.fillStyle = borderClr;
        ctx.font = "bold 7px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Preview", x + 80 + 24, y + 80);

        // Version badge
        ctx.textAlign = "left";
        ctx.fillStyle = accentClr;
        ctx.font = "bold 6.5px monospace";
        ctx.fillText("morphix-studio v1.4.0", x + 16, y + 102);

        // Right side layout preview
        ctx.strokeStyle = accentClr;
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 145, y + 36, 118, 108);

        // Inner items inside layout mockup
        ctx.fillStyle = fillClr;
        ctx.fillRect(x + 151, y + 42, 106, 24);
        ctx.fillStyle = subTextClr;
        ctx.font = "bold 6.5px monospace";
        ctx.fillText("REMIX WORKSPACE", x + 156, y + 54);

        ctx.fillStyle = fillClr;
        ctx.fillRect(x + 151, y + 72, 50, 66);
        ctx.fillRect(x + 207, y + 72, 50, 66);

        ctx.fillStyle = subTextClr;
        ctx.font = "6px sans-serif";
      } 
      else if (w.type === "bento") {
        ctx.fillStyle = borderClr;
        ctx.font = "bold 8px monospace";
        ctx.fillText("DESIGN DNA SCROLLER", x + 12, y + 16);

        // Card Grid 1 (Large Panel)
        ctx.strokeStyle = accentClr;
        ctx.strokeRect(x + 12, y + 24, w.w - 24, w.h - 36);
        ctx.fillStyle = fillClr;
        ctx.fillRect(x + 13, y + 25, w.w - 26, w.h - 38);

        ctx.fillStyle = accentClr;
        ctx.font = "bold 7px monospace";
        ctx.fillText("DNA PRESET PARSER", x + 20, y + 42);

        ctx.fillStyle = brightTextClr;
        ctx.font = "bold 9.5px sans-serif";
        ctx.fillText("Extracted Specs", x + 20, y + 56);

        ctx.fillStyle = textClr;
        ctx.font = "7.5px sans-serif";
        ctx.fillText("✓ Colors: Stripe Blue, Canva Teal, Notion Gray", x + 20, y + 74);
        ctx.fillText("✓ Typography: 3 weights mapped", x + 20, y + 88);
        ctx.fillText("✓ Layout: 18 nodes converted", x + 20, y + 102);
      } 
      else if (w.type === "code") {
        // Code header text
        ctx.fillStyle = borderClr;
        ctx.font = "bold 8px monospace";
        ctx.fillText("src/components/Hero.tsx", x + 12, y + 16);
        
        // Window dots
        ctx.fillStyle = accentClr;
        ctx.beginPath();
        ctx.arc(x + 185, y + 12, 1.8, 0, Math.PI * 2);
        ctx.arc(x + 192, y + 12, 1.8, 0, Math.PI * 2);
        ctx.arc(x + 199, y + 12, 1.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = fillClr;
        ctx.beginPath(); ctx.moveTo(x + 8, y + 22); ctx.lineTo(x + w.w - 8, y + 22); ctx.stroke();

        // Line Numbers
        ctx.fillStyle = subTextClr;
        ctx.font = "7.5px monospace";
        ctx.textAlign = "right";
        for (let i = 1; i <= 4; i++) {
          ctx.fillText(i.toString(), x + 18, y + 22 + i * 15);
        }

        const stringColor = theme.name === "pink" ? "rgba(91, 127, 255, 1)" : "rgba(244, 63, 94, 1)";
        const keywordColor = accentClr;
        const mainColor = brightTextClr;
        const tagColor = borderClr;

        // Line 1: import { Transform } from '@morphix';
        drawTokens([
          { text: "import ", color: keywordColor },
          { text: "{ Transform } ", color: mainColor },
          { text: "from ", color: keywordColor },
          { text: "'@morphix';", color: stringColor }
        ], x + 26, y + 37);

        // Line 2: const Hero = () => (
        drawTokens([
          { text: "const ", color: keywordColor },
          { text: "Hero = () => (", color: mainColor }
        ], x + 26, y + 52);

        // Line 3:   <Transform.Canvas style="stripe" />
        drawTokens([
          { text: "  <", color: mainColor },
          { text: "Transform.Canvas ", color: tagColor },
          { text: "style=", color: mainColor },
          { text: "'stripe'", color: stringColor },
          { text: " />", color: mainColor }
        ], x + 26, y + 67);

        // Line 4: );
        drawTokens([
          { text: ");", color: mainColor }
        ], x + 26, y + 82);
      }
      else if (w.type === "swatch") {
        ctx.fillStyle = borderClr;
        ctx.font = "bold 8px monospace";
        ctx.fillText("GLASSMORPHIC NAVBAR", x + 12, y + 16);

        // Desktop nav capsule
        ctx.fillStyle = fillClr;
        ctx.strokeStyle = accentClr;
        ctx.lineWidth = 1;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(x + 12, y + 26, w.w - 24, 20, 6); else ctx.rect(x + 12, y + 26, w.w - 24, 20);
        ctx.fill();
        ctx.stroke();

        // Nav inner elements
        ctx.fillStyle = borderClr;
        ctx.font = "bold 6.5px monospace";
        ctx.fillText("MORPHIX", x + 20, y + 38);

        ctx.fillStyle = subTextClr;
        ctx.font = "5.5px sans-serif";
        ctx.fillText("Features", x + 58, y + 37);
        ctx.fillText("Styles", x + 84, y + 37);
        ctx.fillText("API", x + 106, y + 37);

        // Small CTA button in nav
        ctx.fillStyle = accentClr;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(x + w.w - 36, y + 30, 20, 12, 3); else ctx.rect(x + w.w - 36, y + 30, 20, 12);
        ctx.fill();
      }
      else if (w.type === "charts") {
        // Performance graph - no header text
        const cx = x + 12;
        const cy = y + 20;
        const cw = w.w - 24;
        const ch = w.h - 48;

        ctx.strokeStyle = accentClr;
        ctx.lineWidth = 1;
        ctx.strokeRect(cx, cy, cw, ch);

        // Dash grid lines
        ctx.strokeStyle = fillClr;
        ctx.lineWidth = 0.5;
        for (let i = 1; i <= 3; i++) {
          ctx.beginPath();
          ctx.moveTo(cx, cy + i * 25);
          ctx.lineTo(cx + cw, cy + i * 25);
          ctx.stroke();
        }

        // Bezier points (steep upward jump!)
        const points = [
          { px: 10, py: 85 },
          { px: 45, py: 80 },
          { px: 90, py: 70 },
          { px: 135, py: 30 },
          { px: 180, py: 15 },
          { px: 220, py: 8 }
        ];

        // Draw fill under curve
        ctx.fillStyle = fillClr;
        ctx.beginPath();
        ctx.moveTo(cx + points[0].px, cy + ch);
        ctx.lineTo(cx + points[0].px, cy + points[0].py);
        for (let i = 1; i < points.length; i++) {
          const prev = points[i - 1];
          const curr = points[i];
          const xc = (cx + prev.px + cx + curr.px) / 2;
          const yc = (cy + prev.py + cy + curr.py) / 2;
          ctx.quadraticCurveTo(cx + prev.px, cy + prev.py, xc, yc);
        }
        ctx.lineTo(cx + points[points.length - 1].px, cy + points[points.length - 1].py);
        ctx.lineTo(cx + points[points.length - 1].px, cy + ch);
        ctx.closePath();
        ctx.fill();

        // Draw line
        ctx.strokeStyle = borderClr;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(cx + points[0].px, cy + points[0].py);
        for (let i = 1; i < points.length; i++) {
          const prev = points[i - 1];
          const curr = points[i];
          const xc = (cx + prev.px + cx + curr.px) / 2;
          const yc = (cy + prev.py + cy + curr.py) / 2;
          ctx.quadraticCurveTo(cx + prev.px, cy + prev.py, xc, yc);
        }
        ctx.stroke();

        // Draw dots
        ctx.fillStyle = borderClr;
        for (const p of points) {
          ctx.beginPath();
          ctx.arc(cx + p.px, cy + p.py, 2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Timeline labels
        ctx.fillStyle = subTextClr;
        ctx.font = "6px monospace";
        ctx.textAlign = "center";
        const steps = ["Original", "Parse", "Crawl", "Align", "Style", "98/100 (Fast)"];
        for (let i = 0; i < steps.length; i++) {
          ctx.fillText(steps[i], cx + points[i].px, cy + ch + 12);
        }
      }
      else if (w.type === "device") {
        // MOBILE CREDENTIAL LOGIN SCREEN
        ctx.fillStyle = borderClr;
        ctx.font = "bold 7.5px monospace";
        ctx.fillText("CREDENTIAL SIGN IN", x + 12, y + 16);

        // Status bar
        ctx.fillStyle = subTextClr;
        ctx.font = "6px monospace";
        ctx.fillText("09:41", x + 15, y + 28);
        ctx.strokeStyle = subTextClr;
        ctx.lineWidth = 0.8;
        ctx.strokeRect(x + 93, y + 23, 10, 5); // Battery
        ctx.fillRect(x + 94, y + 24, 6, 3);

        // Welcome header
        ctx.fillStyle = brightTextClr;
        ctx.font = "bold 9.5px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Sign In", x + 60, y + 54);

        // Inputs
        ctx.textAlign = "left";
        ctx.lineWidth = 0.8;

        // Input 1: Email
        ctx.fillStyle = accentClr;
        ctx.font = "bold 5.5px monospace";
        ctx.fillText("EMAIL ADDRESS", x + 15, y + 74);
        ctx.strokeStyle = fillClr;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(x + 15, y + 78, 90, 14, 3); else ctx.rect(x + 15, y + 78, 90, 14);
        ctx.stroke();
        ctx.fillStyle = textClr;
        ctx.font = "7.5px sans-serif";
        ctx.fillText("alex@morphix.io", x + 20, y + 88);

        // Input 2: Password
        ctx.fillStyle = accentClr;
        ctx.font = "bold 5.5px monospace";
        ctx.fillText("PASSWORD", x + 15, y + 108);
        ctx.strokeStyle = fillClr;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(x + 15, y + 112, 90, 14, 3); else ctx.rect(x + 15, y + 112, 90, 14);
        ctx.stroke();
        ctx.fillStyle = textClr;
        ctx.font = "8px monospace";
        ctx.fillText("••••••••••••", x + 20, y + 122);

        // CTA Button login
        ctx.fillStyle = borderClr;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(x + 15, y + 144, 90, 16, 4); else ctx.rect(x + 15, y + 144, 90, 16);
        ctx.fill();

        ctx.fillStyle = "rgba(7, 11, 20, 0.9)";
        ctx.font = "bold 7.5px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("SIGN IN", x + 60, y + 155);
      }
      else if (w.type === "pricing") {
        ctx.fillStyle = borderClr;
        ctx.font = "bold 8px monospace";
        ctx.fillText("GIT PR INTEGRATION", x + 15, y + 20);

        ctx.fillStyle = brightTextClr;
        ctx.font = "bold 10px sans-serif";
        ctx.fillText("apply-stripe-theme", x + 15, y + 34);

        ctx.fillStyle = brightTextClr;
        ctx.font = "bold 14px monospace";
        ctx.fillText("PR #142", x + 15, y + 54);
        ctx.font = "7.5px sans-serif";
        ctx.fillStyle = subTextClr;
        ctx.fillText("morphix-bot", x + 72, y + 50);

        // Divider
        ctx.strokeStyle = fillClr;
        ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.moveTo(x + 15, y + 62); ctx.lineTo(x + w.w - 15, y + 62); ctx.stroke();

        ctx.fillStyle = accentClr;
        ctx.font = "bold 6px monospace";
        ctx.fillText("PULL REQUEST CHECKS:", x + 15, y + 74);

        const features = [
          "✓ 12 Components modified",
          "✓ Vercel preview build OK",
          "✓ Merge auto-approved"
        ];

        ctx.font = "7.5px sans-serif";
        for (let i = 0; i < features.length; i++) {
          const dy = y + 88 + i * 16;
          // Checkmark highlight
          ctx.fillStyle = accentClr;
          ctx.fillText("✓", x + 15, dy);
          // Label
          ctx.fillStyle = textClr;
          ctx.fillText(features[i].substring(2), x + 25, dy);
        }

        // CTA Button
        ctx.fillStyle = borderClr;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(x + 15, y + 172, w.w - 30, 20, 5); else ctx.rect(x + 15, y + 172, w.w - 30, 20);
        ctx.fill();

        ctx.fillStyle = "rgba(7, 11, 20, 0.9)";
        ctx.font = "bold 8px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("MERGE DESIGN PR", x + w.w / 2, y + 185);
      }
      else if (w.type === "profile") {
        ctx.fillStyle = borderClr;
        ctx.font = "bold 8px monospace";
        ctx.fillText("USER PROFILE SPEC", x + 58, y + 18);

        // Avatar draw
        ctx.strokeStyle = accentClr;
        ctx.lineWidth = 1;
        ctx.fillStyle = fillClr;
        ctx.beginPath();
        ctx.arc(x + 28, y + 50, 16, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();

        // Draw simple letter "A"
        ctx.fillStyle = accentClr;
        ctx.font = "bold 12px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("A", x + 28, y + 54);

        // Profile details
        ctx.textAlign = "left";
        ctx.fillStyle = brightTextClr;
        ctx.font = "bold 9.5px sans-serif";
        ctx.fillText("Abhay", x + 54, y + 38);
        ctx.fillStyle = subTextClr;
        ctx.font = "7px sans-serif";
        ctx.fillText("Morphix Owner", x + 54, y + 48);

        // Status badge
        ctx.fillStyle = accentClr;
        ctx.beginPath();
        ctx.arc(x + 57, y + 62, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = "bold 6.5px sans-serif";
        ctx.fillText("Pro License", x + 64, y + 65);
      }
      else if (w.type === "terminal") {
        // Console terminal chrome
        ctx.fillStyle = "rgba(17, 24, 39, 0.9)";
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(x + 2, y + 2, w.w - 4, 14, [8, 8, 0, 0]); else ctx.rect(x + 2, y + 2, w.w - 4, 14);
        ctx.fill();

        // Red, yellow, green window dots
        ctx.fillStyle = "rgba(239, 68, 68, 0.8)";
        ctx.beginPath(); ctx.arc(x + 10, y + 9, 2, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "rgba(245, 158, 11, 0.8)";
        ctx.beginPath(); ctx.arc(x + 16, y + 9, 2, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "rgba(16, 185, 129, 0.8)";
        ctx.beginPath(); ctx.arc(x + 22, y + 9, 2, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = subTextClr;
        ctx.font = "bold 6.5px monospace";
        ctx.textAlign = "center";
        ctx.fillText("bash — morphix deploy", x + w.w / 2, y + 11);

        // Logs
        ctx.textAlign = "left";
        ctx.fillStyle = brightTextClr;
        ctx.font = "8px monospace";
        ctx.fillText("user@morphix:~$ npx morphix deploy", x + 8, y + 36);

        ctx.fillStyle = accentClr;
        ctx.fillText("✔ Compiled Next.js production app", x + 8, y + 56);

        ctx.fillStyle = borderClr;
        ctx.font = "bold 8px monospace";
        ctx.fillText("🚀 Live: https://morphix.sh/abhay", x + 8, y + 76);
        ctx.fillStyle = brightTextClr;
        ctx.font = "8px monospace";
        ctx.fillText("user@morphix:~$ _", x + 8, y + 102);
      }
      
      ctx.restore();
    };

    let lastTime = performance.now();
    const updateAndDraw = (time: number) => {
      const elapsed = time - lastTime;
      lastTime = time;
      
      // Normalized delta-time relative to target 60FPS (16.667ms per frame)
      // Cap at 2.0 to avoid huge jumps if window loses focus or lags briefly
      const dt = Math.min(2.0, elapsed / 16.667);
      
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw each wireframe blueprint element
      for (const w of wireframes) {
        w.x += w.vx * dt;
        w.y += w.vy * dt;
        w.rotation += w.rotSpeed * dt;
        
        // Wrap around canvas margins cleanly
        if (w.x > width + 150) {
          w.x = -w.w - 100;
        } else if (w.x < -w.w - 150) {
          w.x = width + 100;
        }
        
        if (w.y < -w.h - 150) {
          w.y = height + 100;
        } else if (w.y > height + 150) {
          w.y = -w.h - 100;
        }
        
        drawCard(ctx, w);
      }
      
      animationId = requestAnimationFrame(updateAndDraw);
    };

    updateAndDraw(performance.now());

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Dynamic CSS Grid blueprint guidelines - 0% CPU, accelerated by GPU */}
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(91,127,255,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(91,127,255,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
      
      {/* Main vector elements Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
        style={{ opacity: 0.45 }}
      />
    </div>
  );
}

/* ── main hero ──────────────────────────────────── */
export default function HeroSection() {
  const [wordIdx, setWordIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<TabId>("url");
  const [url, setUrl] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("stripe");
  const [stage, setStage] = useState<Stage>("idle");
  const [progress, setProgress] = useState(0);
  const [browseSearch, setBrowseSearch] = useState("");
  const [browseCategory, setBrowseCategory] = useState("All");

  const filteredBrowseComponents = BROWSE_COMPONENTS.filter(c => {
    const matchesCategory = browseCategory === "All" || c.cat.toLowerCase() === browseCategory.toLowerCase();
    const matchesSearch = c.name.toLowerCase().includes(browseSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const iv = setInterval(() => setWordIdx(i => (i + 1) % CYCLE_WORDS.length), 2600);
    return () => clearInterval(iv);
  }, []);

  function runTransform() {
    if (stage !== "idle" && stage !== "ready") return;
    if (!url) setUrl("https://oldcorp-widgets.com");
    const stageKeys: Stage[] = ["crawling","extracting","matching","styling","building","ready"];
    let i = 0;
    setStage(stageKeys[0]);
    setProgress(15);
    const iv = setInterval(() => {
      i++;
      if (i >= stageKeys.length) { clearInterval(iv); return; }
      setStage(stageKeys[i]);
      setProgress(STAGES.find(s => s.key === stageKeys[i])?.pct ?? 100);
    }, 900);
  }

  const activeStyle = STYLES.find(s => s.id === selectedStyle)!;
  const isRunning = stage !== "idle" && stage !== "ready";
  const stageInfo = STAGES.find(s => s.key === stage)!;

  return (
    <section className="relative min-h-[100dvh] flex flex-col overflow-hidden bg-[#070B14]" style={{ paddingTop: "72px" }}>

      <BlueprintBackground />

      {/* Layer 3: Technical dot grids */}
      <div className="absolute inset-0 dot-grid pointer-events-none opacity-[0.08]" />

      {/* Layer 5: Floating code token chips */}
      <div className="absolute hidden lg:block top-48 left-10 z-[2] pointer-events-none animate-float-slow delay-1000">
        <div className="bg-[#0d1220]/80 backdrop-blur border border-[#5B7FFF]/15 rounded-xl px-3 py-2 font-mono text-[9px] shadow-lg">
          <span className="text-[#14B8A6]/70">const </span>
          <span className="text-white/50">theme</span>
          <span className="text-white/30"> = </span>
          <span className="text-[#5B7FFF]/70">&ldquo;stripe&rdquo;</span>
        </div>
      </div>
      <div className="absolute hidden lg:block bottom-40 right-10 z-[2] pointer-events-none animate-float-medium delay-700">
        <div className="bg-[#0d1220]/80 backdrop-blur border border-[#14B8A6]/15 rounded-xl px-3 py-2 font-mono text-[9px] shadow-lg">
          <span className="text-[#5B7FFF]/70">morphix</span>
          <span className="text-white/30">.transform(</span>
          <span className="text-[#14B8A6]/60">url</span>
          <span className="text-white/30">)</span>
        </div>
      </div>
      <div className="absolute hidden xl:block top-72 right-20 z-[2] pointer-events-none animate-float-slow delay-2000">
        <div className="bg-[#0d1220]/80 backdrop-blur border border-[#5B7FFF]/10 rounded-xl px-3 py-2 font-mono text-[9px] shadow-lg">
          <span className="text-[#14B8A6]/60">dna</span>
          <span className="text-white/25">.colors: </span>
          <span className="text-[#5B7FFF]/50">[&ldquo;#5B7FFF&rdquo;, ...]</span>
        </div>
      </div>


      {/* floating badges */}
      <div className="absolute hidden xl:block top-28 left-6 z-10 animate-float-slow">
        <div className="bg-[#111827]/90 backdrop-blur border border-white/10 rounded-2xl px-3 py-2.5 flex items-center gap-2.5 shadow-xl">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#5B7FFF] to-[#7C5CFF] flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-white">Transformation Done</div>
            <div className="text-[9px] text-white/40">Stripe style · 1.4s</div>
          </div>
        </div>
      </div>

      <div className="absolute hidden xl:block top-44 right-6 z-10 animate-float-medium delay-500">
        <div className="bg-[#111827]/90 backdrop-blur border border-white/10 rounded-2xl px-3 py-2.5 shadow-xl">
          <div className="text-[9px] font-bold text-white/40 uppercase mb-1.5">Design DNA Extracted</div>
          <div className="flex gap-1.5">
            {["#5B7FFF","#7C5CFF","#14B8A6","#111827","#FAFBFC"].map(c => (
              <div key={c} className="w-4 h-4 rounded-lg border border-white/10" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute hidden xl:block bottom-32 left-6 z-10 animate-drift-right delay-700">
        <div className="bg-[#111827]/90 backdrop-blur border border-white/10 rounded-2xl px-3 py-2.5 flex items-center gap-2 shadow-xl">
          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <div className="text-[10px] font-bold text-white">GitHub PR Created</div>
        </div>
      </div>

      {/* ── text header (compact / 25% viewport) */}
      <div className="relative z-10 pt-10 pb-6 text-center px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#5B7FFF]/30 bg-[#5B7FFF]/10 text-xs font-bold text-[#a5b4fc] mb-5">
          <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
          The Operating System for Redesigning Websites
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-black tracking-tight leading-none text-white mb-3">
          <span
            key={wordIdx}
            className="inline-block animate-scale-in bg-gradient-to-r from-[#5B7FFF] via-[#7C5CFF] to-[#14B8A6] text-transparent bg-clip-text"
          >
            {CYCLE_WORDS[wordIdx]}
          </span>{" "}
          any website
          <br />
          <span className="text-white/70 text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold">with AI, instantly</span>
        </h1>

        <p className="text-white/50 text-sm sm:text-base max-w-xl mx-auto">
          Import your site · Extract Design DNA · Transform the style · Export production code
        </p>

        {/* 4 entry tabs */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {TABS.map(t => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => { setActiveTab(t.id); setStage("idle"); setProgress(0); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                  active
                    ? "bg-[#111827] border-[#5B7FFF] text-white shadow-lg shadow-indigo-500/15"
                    : "bg-[#070B14]/60 border-white/8 text-white/50 hover:text-white/80 hover:border-white/15"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── GIANT WORKSPACE (75% viewport) */}
      <div className="relative z-10 flex-1 px-4 pb-8 max-w-[1200px] mx-auto w-full">
        <div className="rounded-3xl border border-white/10 bg-[#0c1018]/95 shadow-[0_30px_80px_rgba(0,0,0,0.7)] overflow-hidden h-full">

          {/* Window chrome */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/6 bg-[#070B14]/60 shrink-0">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="flex items-center gap-2 bg-[#111827] border border-white/8 rounded-lg px-4 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
              <span className="text-[11px] font-mono text-white/40">studio.morphix.ai — workspace</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Monitor className="w-3.5 h-3.5 text-white/30" />
              <span className="text-[10px] text-white/30 font-mono">Live Preview</span>
            </div>
          </div>

          {/* Body: left sidebar + canvas */}
          <div className="flex h-full min-h-[480px]">

            {/* Left sidebar */}
            <div className="w-72 lg:w-80 shrink-0 border-r border-white/6 bg-[#090d18]/80 flex flex-col p-5 gap-5 overflow-y-auto">

              {activeTab === "url" && (
                <>
                  <div>
                    <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1.5 flex justify-between">
                      <span>Website URL</span><span className="text-[#5B7FFF]">Step 1</span>
                    </div>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
                      <input
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        placeholder="https://your-website.com"
                        className="w-full pl-9 pr-3 py-2.5 bg-[#111827] border border-white/8 rounded-xl text-[11px] text-white placeholder:text-white/20 focus:outline-none focus:border-[#5B7FFF] transition-all font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2 flex justify-between">
                      <span>Target Style</span><span className="text-[#7C5CFF]">Step 2</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {STYLES.map(s => (
                        <button
                          key={s.id}
                          onClick={() => { setSelectedStyle(s.id); if(stage==="ready") { setStage("idle"); setProgress(0); }}}
                          className={`px-2.5 py-2.5 rounded-xl text-[10px] font-bold border text-left transition-all ${
                            selectedStyle === s.id
                              ? "bg-[#111827] border-[#5B7FFF] text-white"
                              : "bg-[#111827]/50 border-white/5 text-white/50 hover:text-white/80 hover:border-white/10"
                          }`}
                        >
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: s.accent === "#ffffff" ? "#888" : s.accent }} />
                            <span>{s.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === "image" && (
                <div className="space-y-4">
                  <div>
                    <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Upload Screenshot</div>
                    <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center gap-2 bg-[#111827]/40 hover:border-[#5B7FFF]/40 transition-colors cursor-pointer">
                      <FileImage className="w-8 h-8 text-white/20" />
                      <span className="text-xs font-bold text-white/60">Drop design file</span>
                      <span className="text-[9px] text-white/30">PNG, JPG, SVG</span>
                    </div>
                  </div>
                  <div className="bg-[#111827]/60 border border-white/5 rounded-xl p-3">
                    <div className="text-[9px] font-bold text-[#14B8A6] mb-1.5">AI will extract:</div>
                    {["Typography rules","Color palettes","Spacing ratios","Component patterns"].map(item => (
                      <div key={item} className="flex items-center gap-1.5 text-[9px] text-white/50 py-0.5">
                        <Check className="w-2.5 h-2.5 text-[#14B8A6]" />{item}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "repo" && (
                <div className="space-y-4">
                  <div>
                    <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Repository URL</div>
                    <div className="relative">
                      <GitBranch className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
                      <input
                        placeholder="github.com/user/project"
                        className="w-full pl-9 pr-3 py-2.5 bg-[#111827] border border-white/8 rounded-xl text-[11px] text-white placeholder:text-white/20 focus:outline-none focus:border-[#5B7FFF] transition-all font-mono"
                      />
                    </div>
                  </div>
                  <div className="bg-[#111827]/40 border border-white/5 rounded-xl p-3 space-y-1.5">
                    <div className="text-[9px] font-bold text-white/30 uppercase mb-1">Detected Structure</div>
                    {[
                      { icon: Folder, name: "src/components", color: "text-yellow-500" },
                      { icon: Code2,  name: "Navbar.tsx",      color: "text-[#5B7FFF]", indent: true },
                      { icon: Code2,  name: "HeroSection.tsx", color: "text-[#5B7FFF]", indent: true },
                    ].map((f, i) => {
                      const Icon = f.icon;
                      return (
                        <div key={i} className={`flex items-center gap-1.5 text-[10px] font-mono ${f.indent ? "pl-4" : ""}`}>
                          <Icon className={`w-3 h-3 ${f.color}`} />
                          <span className="text-white/60">{f.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === "scratch" && (
                <div className="space-y-4">
                  <div>
                    <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Describe Your Website</div>
                    <textarea
                      rows={4}
                      placeholder="A dark SaaS landing page for a developer tooling startup with bento grid features section..."
                      className="w-full px-3 py-2.5 bg-[#111827] border border-white/8 rounded-xl text-[11px] text-white placeholder:text-white/20 focus:outline-none focus:border-[#5B7FFF] resize-none leading-relaxed"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["SaaS Dashboard","AI Startup","Fintech Portal","Developer Tool"].map(ex => (
                      <button key={ex} className="px-2 py-1 bg-[#111827] border border-white/5 rounded-lg text-[9px] font-semibold text-white/40 hover:text-white hover:border-white/10 transition-colors">
                        + {ex}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "browse" && (
                <div className="space-y-4 flex-1 flex flex-col min-h-0">
                  <div>
                    <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1.5">Search Components</div>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
                      <input
                        value={browseSearch}
                        onChange={e => setBrowseSearch(e.target.value)}
                        placeholder="Search 10,000+ components…"
                        className="w-full pl-9 pr-3 py-2.5 bg-[#111827] border border-white/8 rounded-xl text-[11px] text-white placeholder:text-white/20 focus:outline-none focus:border-[#5B7FFF] transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Categories</div>
                    <div className="flex flex-col gap-1 overflow-y-auto pr-1">
                      {["All", "Navbar", "Hero", "Pricing", "Dashboard", "Forms", "Footer", "Auth", "Settings"].map(cat => (
                        <button
                          key={cat}
                          onClick={() => setBrowseCategory(cat)}
                          className={`px-3 py-2.5 rounded-xl text-[10px] font-bold border text-left transition-all ${
                            browseCategory === cat
                              ? "bg-[#111827] border-[#5B7FFF] text-white"
                              : "bg-[#111827]/50 border-white/5 text-white/50 hover:text-white/80 hover:border-white/10"
                          }`}
                        >
                          {cat === "All" ? "All Components" : cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab !== "browse" && (
                <>
                  {/* Transform button */}
                  <button
                    onClick={runTransform}
                    disabled={isRunning}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#5B7FFF] to-[#7C5CFF] text-white font-bold rounded-xl text-xs disabled:opacity-50 hover:opacity-90 transition-all shadow-lg shadow-indigo-500/20 mt-auto"
                  >
                    {isRunning ? (
                      <><RefreshCw className="w-3.5 h-3.5 animate-spin" />Transforming…</>
                    ) : (
                      <><Zap className="w-3.5 h-3.5 fill-current" />Transform Website</>
                    )}
                  </button>

                  {/* Progress bar */}
                  <div className="space-y-2 -mt-2">
                    <div className="flex justify-between text-[10px] text-white/30">
                      <span className="truncate">{stageInfo.label}</span>
                      <span>{stageInfo.pct}%</span>
                    </div>
                    <div className="h-1 bg-[#111827] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#5B7FFF] to-[#7C5CFF] transition-all duration-700"
                        style={{ width: `${stageInfo.pct}%` }}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Canvas */}
            <div className="flex-1 flex flex-col bg-[#080c14]/60 relative overflow-hidden">
              {/* scan beam */}
              {(stage === "crawling" || stage === "extracting") && (
                <div
                  className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#5B7FFF] to-transparent z-20 shadow-[0_0_12px_rgba(91,127,255,0.8)]"
                  style={{ animation: "scanBeam 1.8s ease-in-out infinite", top: "40%" }}
                />
              )}

              <div className="p-5 flex-1 flex flex-col gap-4">
                {/* canvas header */}
                <div className="flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                      {activeTab === "browse" ? "Component Browser" : "Transformation Canvas"}
                    </span>
                  </div>
                  {activeTab !== "browse" && stage === "ready" && (
                    <span className="text-[9px] text-[#14B8A6] font-bold bg-[#14B8A6]/10 border border-[#14B8A6]/20 px-2 py-0.5 rounded-full animate-scale-in">
                      ✓ Rebuilt in 1.6s
                    </span>
                  )}
                  {activeTab === "browse" && (
                    <span className="text-[9px] text-[#5B7FFF] font-bold bg-[#5B7FFF]/10 border border-[#5B7FFF]/20 px-2 py-0.5 rounded-full">
                      {filteredBrowseComponents.length} components found
                    </span>
                  )}
                </div>

                {activeTab === "browse" ? (
                  /* Component Grid Browser */
                  <div className="flex-1 flex flex-col overflow-y-auto pr-1">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {filteredBrowseComponents.map(comp => (
                        <div
                          key={comp.id}
                          className="group rounded-2xl border border-white/10 overflow-hidden hover:border-[#5B7FFF]/30 hover:shadow-xl hover:shadow-[#5B7FFF]/5 transition-all duration-300 cursor-pointer bg-[#0c1018]"
                        >
                          {/* Preview container */}
                          <div className="h-24 relative overflow-hidden bg-[#070B14]">
                            <div className="absolute inset-0">{comp.preview}</div>
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-[#070b14]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <button className="px-3 py-1.5 bg-[#5B7FFF] text-white text-[9px] font-bold rounded-lg shadow-lg hover:opacity-90 transition-opacity">
                                Insert Component
                              </button>
                            </div>
                          </div>

                          {/* Info panel */}
                          <div className="p-2.5">
                            <div className="flex items-start justify-between gap-1 mb-1">
                              <div>
                                <h3 className="text-[10px] font-bold text-white leading-tight">{comp.name}</h3>
                                <span className="text-[8px] text-white/40">{comp.style}</span>
                              </div>
                              <div className="flex items-center gap-0.5 flex-shrink-0 text-[#f59e0b]">
                                <Star className="w-2.5 h-2.5 fill-current" />
                                <span className="text-[8px] font-semibold text-white/70">{comp.rating}</span>
                              </div>
                            </div>
                            {/* Color specs + usage */}
                            <div className="flex items-center gap-1 mt-1.5">
                              <div className="flex gap-0.5">
                                {comp.colors.map(c => (
                                  <div key={c} className="w-2 h-2 rounded-full border border-white/10 shadow-sm" style={{ backgroundColor: c }} />
                                ))}
                              </div>
                              <span className="ml-auto text-[8px] text-white/30">{comp.uses} uses</span>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Infinite Load placeholder card */}
                      <div className="rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center p-4 cursor-pointer hover:border-[#5B7FFF]/40 hover:bg-[#5B7FFF]/5 transition-all group min-h-[140px]">
                        <div className="w-8 h-8 rounded-xl bg-white/5 group-hover:bg-[#5B7FFF]/10 flex items-center justify-center mb-1.5 transition-colors">
                          <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#5B7FFF] transition-colors" />
                        </div>
                        <span className="text-[10px] font-bold text-white/40 group-hover:text-white/70 text-center transition-colors">
                          Browse 9,991+<br />more components
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* before / after panels */}
                    <div className="grid grid-cols-2 gap-4 flex-1">
                      {/* BEFORE */}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/40">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                          Original
                        </div>
                        <div className="flex-1 bg-[#111827] rounded-2xl border border-white/5 overflow-hidden min-h-[200px] relative">
                          {(stage === "crawling" || stage === "extracting") && (
                            <div className="absolute inset-0 bg-[#5B7FFF]/5 z-10 pointer-events-none" />
                          )}
                          <OldSite />
                        </div>
                      </div>

                      {/* AFTER */}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#5B7FFF]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#5B7FFF] animate-pulse-dot" />
                          {stage === "ready" ? `${activeStyle.label} Version` : "AI Preview"}
                        </div>
                        <div className="flex-1 bg-[#111827] rounded-2xl border border-white/5 overflow-hidden min-h-[200px] relative">
                          {stage === "idle" && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#090d18]">
                              <Wand2 className="w-8 h-8 text-white/15 animate-float-medium" />
                              <div className="text-center">
                                <div className="text-xs font-bold text-white/40">Preview Window</div>
                                <div className="text-[10px] text-white/20 mt-0.5">Select style · click Transform</div>
                              </div>
                            </div>
                          )}
                          {isRunning && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#090d18] z-10">
                              <RefreshCw className="w-6 h-6 text-[#7C5CFF] animate-spin" />
                              <div className="text-[10px] font-mono text-white/40 capitalize">{stage}…</div>
                              <div className="w-16 h-0.5 bg-[#111827] rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-[#5B7FFF] to-[#7C5CFF] animate-shimmer" style={{ width: "60%" }} />
                              </div>
                            </div>
                          )}
                          {stage === "ready" && <NewSite style={activeStyle} />}
                        </div>
                      </div>
                    </div>

                    {/* Action bar */}
                    {stage === "ready" && (
                      <div className="flex items-center justify-between pt-3 border-t border-white/5 shrink-0 animate-slide-in-up">
                        <div className="flex gap-2">
                          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/8 text-white/60 hover:text-white rounded-lg text-[10px] font-bold transition-all">
                            <Code2 className="w-3 h-3" />View Code
                          </button>
                          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/8 text-white/60 hover:text-white rounded-lg text-[10px] font-bold transition-all">
                            <Download className="w-3 h-3" />Export Bundle
                          </button>
                        </div>
                        <button className="flex items-center gap-1.5 px-4 py-1.5 bg-[#14B8A6] text-white rounded-lg text-[10px] font-bold shadow-lg shadow-[#14B8A6]/20 hover:opacity-90 transition-all">
                          <GitBranch className="w-3 h-3" />Create GitHub PR
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* footer hint */}
      <div className="relative z-10 text-center pb-5 text-[11px] text-white/25">
        <ChevronRight className="w-3 h-3 text-[#5B7FFF] inline mr-1" />
        No credit card · Free plan · Export React + Tailwind + Next.js
      </div>

      <style>{`
        @keyframes scanBeam {
          0%   { top: 10%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 90%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
