"use client";

import { useMemo } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";


function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

interface ResumeProject {
  id: string;
  name: string;
  lastEdited: string;
  href: string;
}

const RESUME_PROJECT: ResumeProject | null = {
  id: "1",
  name: "Stripe Landing Page",
  lastEdited: "12 min ago",
  href: "/projects/1",
};


export default function HeroSection() {
  const { data: session } = useSession();
  const greeting = useMemo(() => getGreeting(), []);
  const firstName = session?.user?.name?.split(" ")[0] ?? null;

  return (
    <section aria-label="Dashboard welcome" className="hero-section">

      {/* ── Subtle radial glow behind the hero ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2"
        style={{
          width: 600,
          height: 300,
          top: 0,
          transform: "translateX(-50%)",
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(59,130,246,0.07) 0%, rgba(11,16,32,0) 70%)",
          zIndex: 0,
        }}
      />

      {/* ── One-line greeting ── */}
      <div className="relative flex flex-col items-center text-center" style={{ zIndex: 1 }}>
        <p
          className="hero-greeting"
          style={{
            fontSize: 38,
            fontWeight: 400,
            color: "rgba(255,255,255,0.80)",
            letterSpacing: "-0.02em",
            lineHeight: 1.3,
          }}
        >
          {greeting},{" "}
          <span
            style={{
              fontSize: 44,
              fontWeight: 600,
              background: "linear-gradient(135deg, #ffffff 0%, #93C5FD 60%, #3B82F6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {firstName ?? "Abhay"}
          </span>{" "}
          <span style={{ WebkitTextFillColor: "initial" }}>👋</span>
        </p>

        <p
          style={{
            fontSize: 16,
            fontWeight: 400,
            color: "rgba(255,255,255,0.34)",
            marginTop: 10,
            letterSpacing: "0.01em",
          }}
        >
          Choose how you&apos;d like to begin today.
        </p>
      </div>

      {/* ── Resume banner — thin horizontal strip ── */}
      {RESUME_PROJECT && (
        <div className="relative flex justify-center" style={{ zIndex: 1, marginTop: 20 }}>
          <Link
            href={RESUME_PROJECT.href}
            className="resume-banner group flex items-center gap-3"
            aria-label={`Continue working on ${RESUME_PROJECT.name}`}
            style={{
              background: "rgba(255,255,255,0.028)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 10,
              padding: "8px 16px",
              width: "100%",
              maxWidth: 540,
              transition: "background 200ms ease, border-color 200ms ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.028)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
            }}
          >
            {/* Clock icon */}
            <div
              className="flex items-center justify-center rounded-lg flex-shrink-0"
              style={{
                width: 26,
                height: 26,
                background: "rgba(59,130,246,0.10)",
                border: "1px solid rgba(59,130,246,0.18)",
              }}
            >
              <Clock size={12} strokeWidth={1.8} style={{ color: "#93C5FD" }} />
            </div>

            {/* Label */}
            <span
              className="text-[11px] font-semibold uppercase tracking-widest flex-shrink-0"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Continue editing
            </span>

            {/* Project name */}
            <span
              className="text-[13px] font-medium truncate flex-1"
              style={{ color: "rgba(255,255,255,0.72)" }}
            >
              &ldquo;{RESUME_PROJECT.name}&rdquo;
            </span>

            {/* Time */}
            <span
              className="text-[11px] flex-shrink-0"
              style={{ color: "rgba(255,255,255,0.28)" }}
            >
              {RESUME_PROJECT.lastEdited}
            </span>

            {/* Arrow */}
            <ArrowRight
              size={13}
              strokeWidth={1.8}
              className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
              style={{ color: "rgba(255,255,255,0.22)" }}
            />
          </Link>
        </div>
      )}
    </section>
  );
}