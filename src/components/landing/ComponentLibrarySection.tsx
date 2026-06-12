"use client";

import { useState } from "react";
import { Search, ArrowRight, Star, Grid3X3, SlidersHorizontal, Zap } from "lucide-react";

const categories = [
  { id: "all",       label: "All",         count: "10K+" },
  { id: "navbar",    label: "Navbars",     count: "240" },
  { id: "hero",      label: "Hero",        count: "380" },
  { id: "pricing",   label: "Pricing",     count: "120" },
  { id: "dashboard", label: "Dashboard",   count: "175" },
  { id: "forms",     label: "Forms",       count: "210" },
  { id: "footer",    label: "Footers",     count: "160" },
  { id: "login",     label: "Auth",        count: "95" },
  { id: "settings",  label: "Settings",    count: "88" },
];

const styleFilters = ["All Styles","Minimal","SaaS","Enterprise","Dark","Colorful","Brutalist"];

interface CompCard {
  id: string;
  name: string;
  style: string;
  cat: string;
  rating: number;
  uses: string;
  colors: string[];
  preview: React.ReactNode;
}

const components: CompCard[] = [
  {
    id:"c1", name:"Gradient Hero", style:"Modern SaaS", cat:"hero", rating:4.9, uses:"12.4k",
    colors:["#2563eb","#7c3aed"],
    preview:(
      <div className="w-full h-full bg-gradient-to-br from-blue-600 to-violet-700 flex flex-col items-center justify-center gap-1.5 p-3">
        <div className="w-16 h-1.5 rounded-full bg-white/50"/>
        <div className="w-24 h-3 rounded bg-white/80"/>
        <div className="w-14 h-1.5 rounded bg-white/40"/>
        <div className="flex gap-1.5 mt-1">
          <div className="h-4 w-12 rounded-lg bg-white text-[6px] font-bold text-blue-700 flex items-center justify-center">Start</div>
          <div className="h-4 w-12 rounded-lg border border-white/40 text-[6px] text-white flex items-center justify-center">Demo</div>
        </div>
      </div>
    ),
  },
  {
    id:"c2", name:"Glass Navbar", style:"Minimal", cat:"navbar", rating:4.8, uses:"9.1k",
    colors:["#0f172a","#3b82f6"],
    preview:(
      <div className="w-full h-full bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
        <div className="flex items-center justify-between px-2.5 py-2 bg-white/80 backdrop-blur border-b border-slate-100">
          <div className="flex items-center gap-1.5"><div className="w-3.5 h-3.5 rounded-lg bg-blue-600"/><div className="w-8 h-1.5 rounded bg-slate-800"/></div>
          <div className="flex items-center gap-2"><div className="w-4 h-1 rounded bg-slate-300"/><div className="w-4 h-1 rounded bg-slate-300"/><div className="w-8 h-3.5 rounded-lg bg-blue-600"/></div>
        </div>
        <div className="flex-1"/>
      </div>
    ),
  },
  {
    id:"c3", name:"3-Tier Pricing", style:"SaaS", cat:"pricing", rating:4.9, uses:"6.8k",
    colors:["#2563eb","#7c3aed","#0f172a"],
    preview:(
      <div className="w-full h-full bg-slate-50 p-2 flex gap-1.5 items-center">
        {[{bg:"bg-white",t:"text-slate-700"},{bg:"bg-gradient-to-b from-blue-600 to-violet-600",t:"text-white",ring:true},{bg:"bg-white",t:"text-slate-700"}].map((tier,i)=>(
          <div key={i} className={`flex-1 rounded-xl ${tier.bg} ${tier.ring?"ring-1 ring-blue-400 shadow-lg":""} p-1.5 flex flex-col items-center gap-0.5`}>
            <div className={`text-[7px] font-bold ${tier.t}`}>{["Starter","Pro","Team"][i]}</div>
            <div className={`text-[9px] font-black ${tier.t}`}>$29</div>
            {[0,1,2].map(j=><div key={j} className={`w-full h-0.5 rounded ${tier.ring?"bg-white/25":"bg-slate-200"}`}/>)}
          </div>
        ))}
      </div>
    ),
  },
  {
    id:"c4", name:"Analytics Dashboard", style:"Enterprise", cat:"dashboard", rating:4.7, uses:"5.2k",
    colors:["#0f172a","#3b82f6","#7c3aed"],
    preview:(
      <div className="w-full h-full bg-slate-900 p-2 flex flex-col gap-1.5">
        <div className="grid grid-cols-3 gap-1">
          {["bg-blue-500/20","bg-violet-500/20","bg-teal-500/20"].map((c,i)=>(
            <div key={i} className={`${c} rounded-lg p-1`}><div className="w-4 h-0.5 rounded bg-white/30 mb-0.5"/><div className="text-[8px] font-bold text-white">{["24K","89%","2.4s"][i]}</div></div>
          ))}
        </div>
        <div className="flex-1 bg-slate-800 rounded-lg p-1.5">
          <div className="flex items-end gap-0.5 h-8">
            {[35,60,45,75,55,70,85].map((h,i)=><div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-blue-600 to-blue-400" style={{height:`${h}%`}}/>)}
          </div>
        </div>
      </div>
    ),
  },
  {
    id:"c5", name:"Auth Form", style:"Minimal", cat:"login", rating:4.6, uses:"8.9k",
    colors:["#2563eb","#f8fafc"],
    preview:(
      <div className="w-full h-full bg-slate-50 flex items-center justify-center">
        <div className="w-20 bg-white rounded-xl border border-slate-200 p-2 shadow-lg space-y-1.5">
          <div className="text-[7px] font-bold text-slate-800 text-center">Sign in</div>
          <div className="h-3.5 rounded-lg border border-slate-200 px-1.5 flex items-center"><div className="w-8 h-0.5 rounded bg-slate-200"/></div>
          <div className="h-3.5 rounded-lg border border-slate-200 px-1.5 flex items-center"><div className="w-6 h-0.5 rounded bg-slate-200"/></div>
          <div className="h-4 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center"><div className="text-[6px] font-bold text-white">Sign In</div></div>
        </div>
      </div>
    ),
  },
  {
    id:"c6", name:"Bento Features", style:"SaaS", cat:"hero", rating:4.8, uses:"7.3k",
    colors:["#2563eb","#0d9488","#f59e0b"],
    preview:(
      <div className="w-full h-full bg-white p-2 grid grid-cols-3 grid-rows-2 gap-1">
        {[{bg:"from-blue-50 to-violet-50",b:"border-blue-100",c:"bg-blue-600",span:"col-span-2"},{bg:"from-teal-50 to-emerald-50",b:"border-teal-100",c:"bg-teal-600",span:""},{bg:"from-amber-50 to-orange-50",b:"border-amber-100",c:"bg-amber-500",span:""},{bg:"from-violet-50 to-pink-50",b:"border-violet-100",c:"bg-violet-600",span:"col-span-2"}].map((f,i)=>(
          <div key={i} className={`${f.span} bg-gradient-to-br ${f.bg} rounded-xl border ${f.b} p-1 flex gap-1 items-start`}>
            <div className={`w-3 h-3 rounded-md ${f.c} flex-shrink-0`}/>
            <div className="space-y-0.5"><div className="w-6 h-0.5 rounded bg-slate-600"/></div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id:"c7", name:"Settings Panel", style:"Enterprise", cat:"settings", rating:4.5, uses:"3.8k",
    colors:["#2563eb","#f1f5f9"],
    preview:(
      <div className="w-full h-full bg-white flex">
        <div className="w-16 border-r border-slate-100 p-1.5 space-y-1">
          {[0,1,2,3].map(i=><div key={i} className={`h-4 rounded-lg ${i===1?"bg-blue-50 border border-blue-200":"bg-slate-50"} flex items-center px-1 gap-1`}><div className={`w-2 h-2 rounded ${i===1?"bg-blue-500":"bg-slate-300"}`}/><div className="flex-1 h-0.5 rounded bg-slate-200"/></div>)}
        </div>
        <div className="flex-1 p-1.5 space-y-1">
          {[24,18,20].map((w,i)=><div key={i} className="space-y-0.5"><div className="h-0.5 rounded bg-slate-300" style={{width:`${w/24*100}%`}}/><div className="h-3 rounded-lg border border-slate-200 bg-white"/></div>)}
        </div>
      </div>
    ),
  },
  {
    id:"c8", name:"Sidebar Layout", style:"SaaS", cat:"dashboard", rating:4.7, uses:"4.5k",
    colors:["#0f172a","#2563eb"],
    preview:(
      <div className="w-full h-full bg-slate-50 flex">
        <div className="w-12 bg-slate-900 p-1.5 flex flex-col gap-1">
          <div className="w-4 h-4 rounded-lg bg-blue-600 mx-auto"/>
          {[0,1,2,3,4].map(i=><div key={i} className={`h-3 rounded-md ${i===1?"bg-blue-600":"bg-slate-700"}`}/>)}
        </div>
        <div className="flex-1 p-1.5 space-y-1">
          <div className="h-4 bg-white rounded-lg border border-slate-200"/>
          <div className="grid grid-cols-2 gap-1">
            <div className="h-8 bg-white rounded-lg border border-slate-200"/>
            <div className="h-8 bg-white rounded-lg border border-slate-200"/>
          </div>
          <div className="h-10 bg-white rounded-lg border border-slate-200"/>
        </div>
      </div>
    ),
  },
  {
    id:"c9", name:"Contact Form", style:"Minimal", cat:"forms", rating:4.6, uses:"6.1k",
    colors:["#2563eb","#f8fafc"],
    preview:(
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-violet-50 p-3 flex items-center justify-center">
        <div className="w-full bg-white rounded-xl border border-slate-100 p-2.5 shadow-sm space-y-1.5">
          <div className="grid grid-cols-2 gap-1.5">
            <div className="h-4 rounded-lg border border-slate-200"/>
            <div className="h-4 rounded-lg border border-slate-200"/>
          </div>
          <div className="h-4 rounded-lg border border-slate-200"/>
          <div className="h-8 rounded-lg border border-slate-200"/>
          <div className="h-5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center">
            <div className="text-[6px] font-bold text-white">Send Message</div>
          </div>
        </div>
      </div>
    ),
  },
];

export default function ComponentLibrarySection() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const [activeStyle, setActiveStyle] = useState("All Styles");

  const filtered = components.filter(c => {
    const matchCat   = activeCat === "all" || c.cat === activeCat;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section id="components" className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="badge badge-amber mb-4">
              <Grid3X3 className="w-3.5 h-3.5"/> Component Library
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
              10,000+ production-ready
              <br />
              <span className="gradient-text">components</span>
            </h2>
            <p className="text-lg text-slate-600">Search, filter, preview, and drop any component directly into your design.</p>
          </div>
          <a href="#" className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all text-sm whitespace-nowrap self-start lg:self-end">
            Browse Full Library <ArrowRight className="w-4 h-4"/>
          </a>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 space-y-4 shadow-sm">
          {/* Search row */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search components…"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-200 transition-colors">
              <SlidersHorizontal className="w-4 h-4"/> Filters
            </button>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeCat === cat.id
                    ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.label}
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                  activeCat === cat.id ? "bg-white/20 text-white" : "bg-slate-200 text-slate-500"
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Style filters */}
          <div className="flex gap-2 flex-wrap border-t border-slate-100 pt-3">
            <span className="text-xs font-semibold text-slate-400 self-center mr-1">Style:</span>
            {styleFilters.map(sf => (
              <button
                key={sf}
                onClick={() => setActiveStyle(sf)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  activeStyle === sf
                    ? "bg-slate-800 text-white"
                    : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {sf}
              </button>
            ))}
          </div>
        </div>

        {/* Component grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {(filtered.length > 0 ? filtered : components).map(comp => (
            <div
              key={comp.id}
              className="group rounded-2xl border border-slate-200 overflow-hidden hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 cursor-pointer bg-white"
            >
              {/* Preview */}
              <div className="h-28 relative overflow-hidden bg-slate-50">
                <div className="absolute inset-0">{comp.preview}</div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-end justify-center pb-3">
                  <div className="flex gap-1.5">
                    <button className="px-2.5 py-1 bg-white text-[9px] font-bold text-slate-800 rounded-lg hover:bg-blue-50 transition-colors">Preview</button>
                    <button className="px-2.5 py-1 bg-blue-600 text-[9px] font-bold text-white rounded-lg">Use</button>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <div className="flex items-start justify-between gap-1 mb-1">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 leading-tight">{comp.name}</h3>
                    <span className="text-[10px] text-slate-400">{comp.style}</span>
                  </div>
                  <div className="flex items-center gap-0.5 flex-shrink-0">
                    <Star className="w-2.5 h-2.5 text-amber-400 fill-current"/>
                    <span className="text-[9px] font-semibold text-slate-600">{comp.rating}</span>
                  </div>
                </div>
                {/* Color dots */}
                <div className="flex items-center gap-1 mt-1.5">
                  {comp.colors.map(c => (
                    <div key={c} className="w-3 h-3 rounded-full border border-white shadow-sm" style={{backgroundColor:c}} />
                  ))}
                  <span className="ml-auto text-[9px] text-slate-400">{comp.uses} uses</span>
                </div>
              </div>
            </div>
          ))}

          {/* Load more card */}
          <div className="rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-4 cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-all group min-h-[160px]">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center mb-2 transition-colors">
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors"/>
            </div>
            <span className="text-xs font-semibold text-slate-500 group-hover:text-blue-600 text-center transition-colors">
              9,991 more<br/>components
            </span>
          </div>
        </div>

        {/* Bottom stats */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
          {[
            { n:"10,000+", l:"Components", c:"text-blue-600" },
            { n:"50+",     l:"Categories", c:"text-violet-600" },
            { n:"100%",    l:"Production Ready", c:"text-teal-600" },
            { n:"Weekly",  l:"New Additions", c:"text-amber-600" },
          ].map(s => (
            <div key={s.l} className="text-center">
              <div className={`text-2xl font-extrabold ${s.c}`}>{s.n}</div>
              <div className="text-sm text-slate-500 font-medium">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
