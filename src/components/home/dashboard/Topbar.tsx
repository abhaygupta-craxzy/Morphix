"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  Search,
  Bell,
  Plus,
  User,
  CreditCard,
  Settings,
  LogOut,
  Sparkles,
  Globe,
  GitBranch,
  Upload,
  PenTool,
  ChevronDown,
  Clock,
} from "lucide-react";


const T = {
  bg:          "#0B1020",
  border:      "rgba(255,255,255,0.06)",
  searchBg:    "rgba(255,255,255,0.04)",
  searchHover: "rgba(255,255,255,0.06)",
  searchFocus: "rgba(59,130,246,0.08)",
  popupBg:     "#111827",
  popupBorder: "rgba(255,255,255,0.08)",
} as const;


interface ProjectItem {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  iconColor: string;
  iconBg: string;
  disabled?: boolean;
}

const NEW_PROJECT_ITEMS: ProjectItem[] = [
  {
    id: "create",
    label: "Create from Scratch",
    description: "Describe it, build with AI",
    icon: <Sparkles size={14} strokeWidth={1.8} />,
    href: "/create",
    iconColor: "#93C5FD",
    iconBg: "rgba(59,130,246,0.14)",
  },
  {
    id: "transform",
    label: "Transform a Website",
    description: "Paste any URL and redesign",
    icon: <Globe size={14} strokeWidth={1.8} />,
    href: "/transform",
    iconColor: "#C4B5FD",
    iconBg: "rgba(124,58,237,0.14)",
  },
  {
    id: "github",
    label: "Import from GitHub",
    description: "Connect a repository",
    icon: <GitBranch size={14} strokeWidth={1.8} />,
    href: "/import/github",
    iconColor: "#D1D5DB",
    iconBg: "rgba(255,255,255,0.08)",
  },
  {
    id: "upload",
    label: "Upload ZIP",
    description: "Upload a project archive",
    icon: <Upload size={14} strokeWidth={1.8} />,
    href: "/import/zip",
    iconColor: "#6EE7B7",
    iconBg: "rgba(16,185,129,0.14)",
  },
  {
    id: "figma",
    label: "Import from Figma",
    description: "Coming soon",
    icon: <PenTool size={14} strokeWidth={1.8} />,
    href: "#",
    iconColor: "#FDA4AF",
    iconBg: "rgba(244,63,94,0.12)",
    disabled: true,
  },
];

const PROFILE_ITEMS = [
  { id: "profile",  label: "Profile",          icon: <User       size={13} strokeWidth={1.8} />, href: "/settings/profile"       },
  { id: "settings", label: "Account Settings", icon: <Settings   size={13} strokeWidth={1.8} />, href: "/settings"               },
  { id: "billing",  label: "Billing",           icon: <CreditCard size={13} strokeWidth={1.8} />, href: "/settings/billing"       },
];


const MOCK_NOTIFICATIONS = [
  { id: 1, title: "AI transformation complete",   time: "2 min ago",  read: false },
  { id: 2, title: "Project exported successfully", time: "1 hr ago",   read: false },
  { id: 3, title: "New component pack available",  time: "Yesterday",  read: true  },
];

function useDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  return { open, setOpen, ref };
}

export default function Topbar() {
  const { data: session } = useSession();
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue,   setSearchValue  ] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  const newProject = useDropdown();
  const notif      = useDropdown();
  const profile    = useDropdown();

  const user     = session?.user;
  const initials = user?.name
    ? user.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  const unread = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  /* ⌘K / Ctrl+K opens search */
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("topbar-search")?.focus();
      }
      if (e.key === "Escape") {
        (document.getElementById("topbar-search") as HTMLInputElement)?.blur();
        setSearchFocused(false);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  /* Close search dropdown on outside click */
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    }
    if (searchFocused) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [searchFocused]);

  return (
    <header
      className="flex items-center gap-5 px-6 flex-shrink-0"
      style={{
        height: 64,
        background: T.bg,
        borderBottom: `1px solid ${T.border}`,
      }}
      aria-label="Topbar"
    >

      {/* ══════════════════
          SEARCH — command palette style
      ══════════════════ */}
      <div
        ref={searchRef}
        className="relative flex items-center flex-1"
        style={{ maxWidth: 900, width: "100%" }}
      >
        {/* Input wrapper with animated ring */}
        <div
          className="relative w-full"
          style={{
            borderRadius: 12,
            boxShadow: (searchFocused || searchValue.length > 0)
              ? "0 0 0 3px rgba(59,130,246,0.22)"
              : "none",
            transition: "box-shadow 200ms ease",
          }}
        >
          {/* Search icon — perfectly centred via inline style only */}
          <Search
            size={17}
            className="pointer-events-none transition-all duration-200 z-10"
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: `translateY(-50%) scale(${(searchFocused || searchValue.length > 0) ? 1.1 : 1})`,
              color: (searchFocused || searchValue.length > 0) ? "#60A5FA" : "rgba(255,255,255,0.40)",
              transition: "color 200ms ease, transform 200ms ease",
            }}
          />

          <input
            id="topbar-search"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={(searchFocused || searchValue.length > 0) ? "Type to search…" : "Search projects, components, templates…"}
            aria-label="Global search"
            aria-expanded={searchFocused || searchValue.length > 0}
            aria-haspopup="listbox"
            autoComplete="off"
            onFocus={() => setSearchFocused(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                // Prevent blurring or closing search
                e.preventDefault();
              }
            }}
            className="w-full text-[13px] outline-none transition-all duration-200"
            style={{
              height: 46,
              paddingLeft: 48,
              paddingRight: 62,
              borderRadius: 12,
              background: (searchFocused || searchValue.length > 0)
                ? "rgba(8,14,32,0.95)"
                : "rgba(255,255,255,0.04)",
              border: (searchFocused || searchValue.length > 0)
                ? "1px solid rgba(59,130,246,0.45)"
                : "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.90)",
              caretColor: "#60A5FA",
            }}
          />

          {/* Right side: Clear search button or hotkey badge */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            {searchValue.length > 0 ? (
              <button
                onClick={() => setSearchValue("")}
                className="text-[10px] px-2 py-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all duration-150"
                style={{ cursor: "pointer" }}
              >
                Clear
              </button>
            ) : searchFocused ? (
              <span
                className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  color: "rgba(255,255,255,0.30)",
                  fontFamily: "monospace",
                }}
              >
                ESC
              </span>
            ) : (
              <span
                className="text-[10px] px-1.5 py-0.5 rounded-md font-medium"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  color: "rgba(255,255,255,0.25)",
                  fontFamily: "monospace",
                  letterSpacing: "0.02em",
                }}
              >
                ⌘K
              </span>
            )}
          </div>
        </div>

        {/* ──────────────────────
            DROPDOWN — appears on focus or when search value exists
        ────────────────────── */}
        {(searchFocused || searchValue.length > 0) && (
          <div
            role="listbox"
            aria-label="Search suggestions"
            className="absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden z-50"
            style={{
              background: "#0d1427",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.65), 0 0 0 1px rgba(59,130,246,0.06)",
            }}
          >
            {/* Recent searches */}
            {!searchValue && (
              <>
                <div
                  className="px-4 pt-3 pb-1.5 flex items-center justify-between"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div className="flex items-center gap-2">
                    <Clock size={11} style={{ color: "rgba(255,255,255,0.28)" }} />
                    <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.28)" }}>
                      Recent Searches
                    </span>
                  </div>
                  <span className="text-[9px] text-[#60A5FA]/60 hover:text-[#60A5FA] cursor-pointer transition-colors">
                    Filter by Action
                  </span>
                </div>
                <div className="p-1 space-y-0.5">
                  {[
                    { label: "Stripe Landing Page", type: "Project",   icon: "📄", color: "#60A5FA" },
                    { label: "Button components",   type: "Component", icon: "🧩", color: "#34D399" },
                    { label: "SaaS template",        type: "Template",  icon: "🎨", color: "#A78BFA" },
                  ].map((item) => (
                    <button
                      key={item.label}
                      role="option"
                      onClick={() => setSearchValue(item.label)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-left rounded-lg transition-all duration-150 hover:bg-white/[0.04] group"
                      style={{ background: "transparent" }}
                    >
                      <span className="text-sm group-hover:scale-110 transition-transform">{item.icon}</span>
                      <span className="flex-1 text-[13px] group-hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.70)" }}>
                        {item.label}
                      </span>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full border transition-colors"
                        style={{
                          background: `${item.color}0a`,
                          borderColor: `${item.color}22`,
                          color: item.color
                        }}
                      >
                        {item.type}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Quick nav */}
                <div
                  className="px-4 pt-3 pb-1.5 flex items-center gap-2"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <Sparkles size={11} style={{ color: "rgba(255,255,255,0.28)" }} />
                  <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.28)" }}>
                    Quick Navigate
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1 p-2">
                  {[
                    { label: "Dashboard",        href: "/home",      emoji: "🏠" },
                    { label: "Projects",          href: "/projects",  emoji: "📁" },
                    { label: "Component Library", href: "/explore",   emoji: "🧩" },
                    { label: "Settings",           href: "/settings",  emoji: "⚙️" },
                  ].map((nav) => (
                    <a
                      key={nav.href}
                      href={nav.href}
                      role="option"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] transition-colors duration-100"
                      style={{ color: "rgba(255,255,255,0.50)", background: "transparent" }}
                      onClick={() => setSearchFocused(false)}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.50)";
                      }}
                    >
                      <span>{nav.emoji}</span>
                      {nav.label}
                    </a>
                  ))}
                </div>
              </>
            )}

            {/* Live results when typing */}
            {searchValue && (
              <div className="px-4 py-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-white/40">
                  <Search size={13} />
                  <span className="text-[12px]">
                    Search for <strong style={{ color: "#60A5FA" }}>&ldquo;{searchValue}&rdquo;</strong>
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-1 mt-2">
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center justify-between hover:bg-white/[0.04] transition-colors cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400">✨</span>
                      <div>
                        <div className="text-[13px] font-medium text-white/80">Generate new project &ldquo;{searchValue}&rdquo;</div>
                        <div className="text-[11px] text-white/40">Launch setup wizard directly with this prompt</div>
                      </div>
                    </div>
                    <span className="text-[11px] text-blue-400 font-semibold">Start &rarr;</span>
                  </div>
                </div>
              </div>
            )}

            {/* Footer hint */}
            <div
              className="px-4 py-2 flex items-center gap-3"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.20)" }}
            >
              <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.20)" }}>
                <kbd style={{ fontFamily: "monospace" }}>↑↓</kbd> navigate
              </span>
              <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.20)" }}>
                <kbd style={{ fontFamily: "monospace" }}>Enter</kbd> open
              </span>
              <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.20)" }}>
                <kbd style={{ fontFamily: "monospace" }}>Esc</kbd> close
              </span>
            </div>
          </div>
        )}
      </div>


      {/* ══════════════════
          RIGHT CONTROLS
          FIX: removed the sibling `<div className="flex-1" />` spacer
          that used to sit here. Added `ml-auto` to this group instead —
          it pushes itself to the edge without competing with the
          search bar for flex-grow space, so the search bar's max-w
          cap (900px / 980px on xl) is now actually reachable.
      ══════════════════ */}
      <div className="flex items-center gap-2 ml-auto">

        {/* ── Notifications ── */}
        <div className="relative" ref={notif.ref}>
          <button
            onClick={() => { notif.setOpen((o) => !o); profile.setOpen(false); newProject.setOpen(false); }}
            aria-label={`Notifications${unread ? ` — ${unread} unread` : ""}`}
            aria-expanded={notif.open}
            className="relative flex items-center justify-center rounded-xl transition-all duration-150 outline-none"
            style={{
              width: 36,
              height: 36,
              background: notif.open ? "rgba(255,255,255,0.08)" : "transparent",
              border: notif.open ? `1px solid ${T.border}` : "1px solid transparent",
              color: "rgba(255,255,255,0.55)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.88)"; }}
            onMouseLeave={(e) => { if (!notif.open) { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)"; } }}
          >
            <Bell size={16} strokeWidth={1.8} />
            {unread > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 flex items-center justify-center rounded-full text-[9px] font-bold text-white"
                style={{ width: 14, height: 14, background: "#3B82F6", boxShadow: "0 0 6px rgba(59,130,246,0.70)" }}
              >
                {unread}
              </span>
            )}
          </button>

          {/* Notifications dropdown */}
          {notif.open && (
            <div
              className="absolute top-full right-0 mt-2 rounded-xl overflow-hidden z-50"
              style={{
                width: 300,
                background: T.popupBg,
                border: `1px solid ${T.popupBorder}`,
                boxShadow: "0 8px 32px rgba(0,0,0,0.55)",
              }}
            >
              <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${T.popupBorder}` }}>
                <span className="text-[13px] font-semibold" style={{ color: "rgba(255,255,255,0.88)" }}>Notifications</span>
                {unread > 0 && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: "rgba(59,130,246,0.15)", color: "#93C5FD" }}>
                    {unread} new
                  </span>
                )}
              </div>

              <div className="py-1.5">
                {MOCK_NOTIFICATIONS.map((n) => (
                  <div
                    key={n.id}
                    className="flex items-start gap-3 px-4 py-2.5 cursor-pointer transition-colors duration-100"
                    style={{ background: "transparent" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                  >
                    {/* Unread dot */}
                    <div className="mt-1.5 flex-shrink-0">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: n.read ? "transparent" : "#3B82F6", boxShadow: n.read ? "none" : "0 0 4px rgba(59,130,246,0.70)" }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12.5px] leading-snug truncate" style={{ color: n.read ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.85)" }}>
                        {n.title}
                      </p>
                      <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.28)" }}>{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-4 py-2.5" style={{ borderTop: `1px solid ${T.popupBorder}` }}>
                <button className="w-full text-[12px] text-center transition-colors duration-100" style={{ color: "rgba(147,197,253,0.60)", background: "none", border: "none", cursor: "pointer" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(147,197,253,0.95)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(147,197,253,0.60)")}
                >
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── New Project ── */}
        <div className="relative" ref={newProject.ref}>
          <button
            onClick={() => { newProject.setOpen((o) => !o); notif.setOpen(false); profile.setOpen(false); }}
            aria-expanded={newProject.open}
            aria-haspopup="true"
            aria-label="New project"
            className="flex items-center gap-2 px-3.5 rounded-xl text-[13px] font-semibold transition-all duration-150 outline-none"
            style={{
              height: 36,
              background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
              color: "#fff",
              border: "1px solid rgba(59,130,246,0.50)",
              boxShadow: newProject.open
                ? "0 6px 20px rgba(59,130,246,0.45)"
                : "0 2px 10px rgba(59,130,246,0.30)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(59,130,246,0.50)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 10px rgba(59,130,246,0.30)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            <Plus size={15} strokeWidth={2.2} />
            New Project
            <ChevronDown
              size={13}
              strokeWidth={2}
              style={{
                opacity: 0.75,
                transform: newProject.open ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 200ms ease",
              }}
            />
          </button>

          {/* New Project dropdown */}
          {newProject.open && (
            <div
              className="absolute top-full right-0 mt-2 rounded-xl overflow-hidden z-50"
              style={{
                width: 256,
                background: T.popupBg,
                border: `1px solid ${T.popupBorder}`,
                boxShadow: "0 8px 32px rgba(0,0,0,0.55)",
              }}
            >
              <p className="px-4 pt-3 pb-1.5 text-[10px] font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.28)" }}>
                Create new
              </p>
              <div className="pb-2">
                {NEW_PROJECT_ITEMS.map((item) => (
                  item.disabled ? (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 px-4 py-2.5 cursor-not-allowed"
                      style={{ opacity: 0.38 }}
                    >
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: item.iconBg }}>
                        <span style={{ color: item.iconColor }}>{item.icon}</span>
                      </div>
                      <div>
                        <div className="text-[12.5px] font-medium" style={{ color: "rgba(255,255,255,0.60)" }}>{item.label}</div>
                        <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.28)" }}>{item.description}</div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => newProject.setOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 transition-colors duration-100"
                      style={{ color: "inherit" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                    >
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: item.iconBg }}>
                        <span style={{ color: item.iconColor }}>{item.icon}</span>
                      </div>
                      <div>
                        <div className="text-[12.5px] font-medium" style={{ color: "rgba(255,255,255,0.80)" }}>{item.label}</div>
                        <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.32)" }}>{item.description}</div>
                      </div>
                    </Link>
                  )
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Profile avatar ── */}
        <div className="relative" ref={profile.ref}>
          <button
            onClick={() => { profile.setOpen((o) => !o); notif.setOpen(false); newProject.setOpen(false); }}
            aria-expanded={profile.open}
            aria-haspopup="true"
            aria-label="Profile menu"
            className="flex items-center justify-center rounded-full transition-all duration-150 outline-none"
            style={{
              width: 34,
              height: 34,
              boxShadow: profile.open ? "0 0 0 2px rgba(59,130,246,0.50)" : "0 0 0 2px rgba(255,255,255,0.08)",
            }}
          >
            {user?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.image} alt={user.name ?? "Avatar"} className="w-full h-full rounded-full object-cover" />
            ) : (
              <div
                className="w-full h-full rounded-full flex items-center justify-center text-white text-[11px] font-bold"
                style={{ background: "linear-gradient(135deg, #1d4ed8, #3B82F6)" }}
              >
                {initials}
              </div>
            )}
          </button>

          {/* Profile dropdown */}
          {profile.open && (
            <div
              className="absolute top-full right-0 mt-2 rounded-xl overflow-hidden z-50"
              style={{
                width: 220,
                background: T.popupBg,
                border: `1px solid ${T.popupBorder}`,
                boxShadow: "0 8px 32px rgba(0,0,0,0.55)",
              }}
            >
              {/* Header */}
              <div className="px-4 py-3" style={{ borderBottom: `1px solid ${T.popupBorder}` }}>
                <div className="flex items-center gap-2.5">
                  {user?.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user.image} alt="" className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg, #1d4ed8, #3B82F6)" }}>
                      {initials}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="text-[13px] font-semibold truncate" style={{ color: "rgba(255,255,255,0.90)" }}>{user?.name ?? "User"}</div>
                    <div className="text-[11px] truncate" style={{ color: "rgba(255,255,255,0.35)" }}>{user?.email ?? ""}</div>
                  </div>
                </div>
              </div>

              {/* Menu */}
              <div className="py-1.5">
                {PROFILE_ITEMS.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => profile.setOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-[13px] transition-colors duration-100"
                    style={{ color: "rgba(255,255,255,0.50)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.88)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.50)")}
                  >
                    <span style={{ color: "rgba(255,255,255,0.28)" }}>{item.icon}</span>
                    {item.label}
                  </Link>
                ))}

                <div className="my-1.5" style={{ borderTop: `1px solid ${T.popupBorder}` }} />

                <button
                  onClick={() => { profile.setOpen(false); signOut({ callbackUrl: "/login" }); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-[13px] transition-colors duration-100"
                  style={{ color: "rgba(252,165,165,0.65)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(252,165,165,0.95)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(252,165,165,0.65)")}
                >
                  <LogOut size={13} strokeWidth={1.8} style={{ color: "rgba(252,165,165,0.45)" }} />
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
