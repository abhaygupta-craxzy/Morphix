"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FolderOpen,
  Blocks,
  LayoutTemplate,
  Star,
  History,
  HelpCircle,
  Settings,
  LogOut,
  User,
  CreditCard,
  Bell,
  ChevronUp,
} from "lucide-react";

/* ─────────────────────────────────────────
   Design tokens
───────────────────────────────────────── */
const T = {
  bg:            "#0B1020",
  border:        "rgba(255,255,255,0.06)",
  sectionLabel:  "rgba(255,255,255,0.28)",
  navText:       "rgba(255,255,255,0.50)",
  navHoverText:  "rgba(255,255,255,0.80)",
  navHoverBg:    "rgba(255,255,255,0.05)",
  navActiveBg:   "rgba(59,130,246,0.14)",
  navActiveText: "rgba(255,255,255,0.95)",
  navActiveIcon: "#93C5FD",
  navIcon:       "rgba(255,255,255,0.28)",
  profileText:   "rgba(255,255,255,0.80)",
  profileSub:    "rgba(255,255,255,0.35)",
  popupBg:       "#111827",
  popupBorder:   "rgba(255,255,255,0.08)",
} as const;

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  description?: string;
}

/* ─────────────────────────────────────────
   Nav config
───────────────────────────────────────── */
const MAIN_NAV: NavItem[] = [
  { id: "dashboard", label: "Dashboard",       href: "/home",      icon: <LayoutDashboard size={15} strokeWidth={1.8} />, description: "Your control center" },
  { id: "projects",  label: "Projects",         href: "/projects",  icon: <FolderOpen      size={15} strokeWidth={1.8} />, description: "All your websites"   },
];

const DISCOVER_NAV: NavItem[] = [
  { id: "components", label: "Component Library", href: "/explore",    icon: <Blocks        size={15} strokeWidth={1.8} />, description: "10,000+ UI components"   },
  { id: "templates",  label: "Templates",          href: "/templates",  icon: <LayoutTemplate size={15} strokeWidth={1.8} />, description: "Pre-built starter sites" },
  { id: "favorites",  label: "Favorites",           href: "/favorites",  icon: <Star          size={15} strokeWidth={1.8} />, description: "Saved items"             },
  { id: "history",    label: "History",             href: "/history",    icon: <History       size={15} strokeWidth={1.8} />, description: "Recently viewed"         },
];

const UTILITY_NAV: NavItem[] = [
  { id: "help",     label: "Help & Feedback", href: "/help",     icon: <HelpCircle size={15} strokeWidth={1.8} /> },
  { id: "settings", label: "Settings",        href: "/settings", icon: <Settings   size={15} strokeWidth={1.8} /> },
];

const PROFILE_MENU = [
  { id: "profile",       label: "Profile",       icon: <User       size={13} strokeWidth={1.8} />, href: "/settings/profile"       },
  { id: "billing",       label: "Billing",        icon: <CreditCard size={13} strokeWidth={1.8} />, href: "/settings/billing"       },
  { id: "notifications", label: "Notifications",  icon: <Bell       size={13} strokeWidth={1.8} />, href: "/settings/notifications" },
];

/* ─────────────────────────────────────────
   SectionLabel
───────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="px-3 mb-1 select-none"
      style={{
        fontSize: 10,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.10em",
        color: T.sectionLabel,
      }}
    >
      {children}
    </p>
  );
}

/* ─────────────────────────────────────────
   NavLink
───────────────────────────────────────── */
function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={item.href}
      title={item.description}
      aria-current={active ? "page" : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-2.5 px-3 py-[7px] rounded-xl text-[13px] font-medium transition-all duration-150 outline-none"
      style={{
        background: active ? T.navActiveBg : hovered ? T.navHoverBg : "transparent",
        color:      active ? T.navActiveText : hovered ? T.navHoverText : T.navText,
      }}
    >
      {/* Icon */}
      <span
        className="flex-shrink-0 transition-colors duration-150"
        style={{ color: active ? T.navActiveIcon : hovered ? T.navHoverText : T.navIcon }}
      >
        {item.icon}
      </span>

      {/* Label */}
      <span className="truncate flex-1">{item.label}</span>
    </Link>
  );
}

/* ─────────────────────────────────────────
   Sidebar
───────────────────────────────────────── */
export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [profileOpen, setProfileOpen] = useState(false);

  const user = session?.user;
  const initials = user?.name
    ? user.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  const isActive = (item: NavItem) =>
    item.href === "/home"
      ? pathname === "/home"
      : !!pathname?.startsWith(item.href);

  return (
    <>
      {/* ══════════════════════════════════════
          SIDEBAR
      ══════════════════════════════════════ */}
      <aside
        className="flex flex-col h-screen flex-shrink-0"
        style={{
          width: 260,
          background: T.bg,
          borderRight: `1px solid ${T.border}`,
        }}
        aria-label="Main navigation"
      >

        {/* ── Logo ── */}
        <div
          className="px-5 pt-6 pb-5 flex-shrink-0"
          style={{ borderBottom: `1px solid ${T.border}` }}
        >
          <Link
            href="/home"
            className="flex items-center gap-3 rounded-xl outline-none"
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.30) 0%, rgba(10,14,30,0.95) 100%)",
                border: "1px solid rgba(59,130,246,0.35)",
                boxShadow: "0 0 14px rgba(59,130,246,0.18)",
              }}
            >
              <span
                className="font-black text-sm"
                style={{
                  background: "linear-gradient(135deg, #93C5FD 0%, #3B82F6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                M
              </span>
            </div>
            <div>
              <div
                className="font-semibold text-sm leading-tight tracking-tight"
                style={{ color: "rgba(255,255,255,0.92)" }}
              >
                Morphix
              </div>
              <div
                className="text-[11px] leading-tight"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                AI Website Studio
              </div>
            </div>
          </Link>
        </div>

        {/* ── Scrollable nav ── */}
        <nav
          className="flex-1 overflow-y-auto px-3 py-5 space-y-6"
          aria-label="Sidebar navigation"
          style={{ scrollbarWidth: "none" }}
        >
          {/* Main */}
          <div>
            <SectionLabel>Navigation</SectionLabel>
            <div className="space-y-px">
              {MAIN_NAV.map((item) => (
                <NavLink key={item.id} item={item} active={isActive(item)} />
              ))}
            </div>
          </div>

          {/* Discover */}
          <div>
            <SectionLabel>Discover</SectionLabel>
            <div className="space-y-px">
              {DISCOVER_NAV.map((item) => (
                <NavLink key={item.id} item={item} active={isActive(item)} />
              ))}
            </div>
          </div>

          {/* Utilities */}
          <div>
            <SectionLabel>Utilities</SectionLabel>
            <div className="space-y-px">
              {UTILITY_NAV.map((item) => (
                <NavLink key={item.id} item={item} active={isActive(item)} />
              ))}
            </div>
          </div>
        </nav>

        {/* ── Profile (pinned bottom) ── */}
        <div
          className="flex-shrink-0 p-3 relative"
          style={{ borderTop: `1px solid ${T.border}` }}
        >

          {/* Profile popup */}
          {profileOpen && (
            <div
              className="absolute bottom-full left-3 right-3 mb-2 rounded-xl overflow-hidden z-50"
              style={{
                background: T.popupBg,
                border: `1px solid ${T.popupBorder}`,
                boxShadow: "0 -8px 32px rgba(0,0,0,0.55)",
              }}
            >
              {/* Header */}
              <div
                className="px-4 py-3"
                style={{ borderBottom: `1px solid ${T.popupBorder}` }}
              >
                <div className="text-[13px] font-semibold truncate" style={{ color: "rgba(255,255,255,0.90)" }}>
                  {user?.name ?? "User"}
                </div>
                <div className="text-[11px] truncate" style={{ color: T.profileSub }}>
                  {user?.email ?? ""}
                </div>
              </div>

              {/* Menu items */}
              <div className="py-1.5">
                {PROFILE_MENU.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm transition-colors duration-100 group"
                    style={{ color: "rgba(255,255,255,0.50)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.88)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.50)")}
                  >
                    <span style={{ color: "rgba(255,255,255,0.30)" }}>{item.icon}</span>
                    {item.label}
                  </Link>
                ))}

                <div className="my-1.5" style={{ borderTop: `1px solid ${T.popupBorder}` }} />

                <button
                  onClick={() => { setProfileOpen(false); signOut({ callbackUrl: "/login" }); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-sm transition-colors duration-100"
                  style={{ color: "rgba(252,165,165,0.65)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(252,165,165,0.95)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(252,165,165,0.65)")}
                >
                  <LogOut size={13} style={{ color: "rgba(252,165,165,0.45)" }} />
                  Log out
                </button>
              </div>
            </div>
          )}

          {/* Profile trigger */}
          <button
            onClick={() => setProfileOpen((o) => !o)}
            aria-expanded={profileOpen}
            aria-haspopup="true"
            aria-label="Open profile menu"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150"
            style={{
              background: profileOpen ? "rgba(255,255,255,0.06)" : "transparent",
            }}
            onMouseEnter={(e) => {
              if (!profileOpen) (e.currentTarget as HTMLElement).style.background = T.navHoverBg;
            }}
            onMouseLeave={(e) => {
              if (!profileOpen) (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            {/* Avatar */}
            {user?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt={user.name ?? "Avatar"}
                className="w-7 h-7 rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[11px] font-bold"
                style={{ background: "linear-gradient(135deg, #1d4ed8, #3B82F6)" }}
              >
                {initials}
              </div>
            )}

            {/* Name + plan */}
            <div className="flex-1 min-w-0 text-left">
              <div className="text-[13px] font-medium truncate leading-tight" style={{ color: T.profileText }}>
                {user?.name ?? "User"}
              </div>
              <div className="text-[11px] truncate leading-tight flex items-center gap-1.5" style={{ color: T.profileSub }}>
                <span className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#34D399" }} />
                Free Plan
              </div>
            </div>

            <ChevronUp
              size={13}
              style={{
                color: "rgba(255,255,255,0.22)",
                flexShrink: 0,
                transform: profileOpen ? "rotate(0deg)" : "rotate(180deg)",
                transition: "transform 200ms ease",
              }}
            />
          </button>
        </div>
      </aside>

      {/* Click-outside */}
      {profileOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} aria-hidden />
      )}
    </>
  );
}