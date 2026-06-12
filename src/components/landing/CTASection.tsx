"use client";

import { useState } from "react";
import {
  Sparkles, Globe, LayoutGrid, ArrowRight, Zap, Check,
  Code2, Download, Eye
} from "lucide-react";

const quickActions = [
  { id:"transform", icon:Globe,       label:"Transform a website", color:"from-blue-600 to-violet-600",   placeholder:"https://website-you-want-to-transform.com" },
  { id:"browse",    icon:LayoutGrid,  label:"Browse components",   color:"from-amber-500 to-orange-500",  placeholder:"Search navbars, heroes, pricing, dashboards…" },
  { id:"generate",  icon:Sparkles,    label:"Generate from scratch",color:"from-teal-600 to-emerald-600", placeholder:"Describe your dream website…" },
];

const prompts = [
  "Redesign my e-commerce store in Stripe style",
  "Build a SaaS dashboard for healthcare",
  "Extract design DNA from Figma export",
  "Transform my portfolio into Linear style",
  "Generate a fintech landing page",
  "Browse navbar components for B2B SaaS",
];

export default function CTASection() {
  const [activeAction, setActiveAction] = useState("transform");
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const active = quickActions.find(a => a.id === activeAction)!;

  function handleSubmit() {
    if (!input) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <section id="cta" className="py-20 lg:py-32 relative overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white">
      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none"/>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-gradient-to-r from-blue-100/40 via-violet-100/30 to-teal-100/40 blur-3xl pointer-events-none"/>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-semibold text-slate-600 mb-8 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-dot"/>
          Morphix Studio is ready
        </div>

        {/* Headline */}
        <h2 className="text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-5 leading-[1.05]">
          What will you{" "}
          <span className="gradient-text">transform</span>
          {" "}today?
        </h2>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join 50,000 designers and developers using Morphix to build extraordinary websites.
          Start free. No credit card needed.
        </p>

        {/* The studio input card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/60 overflow-hidden mb-8">
          {/* Action type switcher */}
          <div className="flex border-b border-slate-100">
            {quickActions.map(action => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => { setActiveAction(action.id); setInput(""); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-all border-b-2 ${
                    activeAction === action.id
                      ? "border-blue-600 text-blue-700 bg-blue-50/50"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-4 h-4"/>
                  <span className="hidden sm:inline">{action.label}</span>
                </button>
              );
            })}
          </div>

          {/* Input area */}
          <div className="p-5">
            {submitted ? (
              <div className="flex flex-col items-center gap-3 py-6 animate-scale-in">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-600"/>
                </div>
                <p className="font-bold text-slate-800">Opening in Morphix Studio…</p>
                <div className="flex gap-1">
                  {[0,1,2].map(i=>(
                    <div key={i} className="w-2 h-2 rounded-full bg-blue-400 animate-pulse-dot" style={{animationDelay:`${i*0.2}s`}}/>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="flex gap-3 mb-4">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleSubmit()}
                      placeholder={active.placeholder}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-400 transition-all text-base"
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={!input}
                    className={`flex items-center gap-2 px-6 py-4 bg-gradient-to-r ${active.color} text-white font-bold rounded-2xl hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm whitespace-nowrap`}
                  >
                    <Zap className="w-4 h-4"/>
                    <span className="hidden sm:inline">Launch Studio</span>
                    <span className="sm:hidden">Go</span>
                  </button>
                </div>

                {/* Quick prompt chips */}
                <div className="flex flex-wrap gap-2">
                  {prompts.map(p => (
                    <button
                      key={p}
                      onClick={() => setInput(p)}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium rounded-xl hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-t border-slate-100">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Check className="w-3.5 h-3.5 text-green-500"/> Free plan available
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Check className="w-3.5 h-3.5 text-green-500"/> Export React + Tailwind
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-colors">
                <Eye className="w-3 h-3"/> Docs
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-colors">
                <Code2 className="w-3 h-3"/> API
              </button>
            </div>
          </div>
        </div>

        {/* Social proof strip */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {[
            "No credit card",
            "Free tier forever",
            "Export clean code",
            "Ship in minutes",
          ].map(p => (
            <div key={p} className="flex items-center gap-1.5 text-sm text-slate-500">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0"/>
              <span>{p}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
