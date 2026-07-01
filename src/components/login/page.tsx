"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import "./login.css";

/* ── OAuth providers ── */
const OAuthProviders = [
  {
    id: "google",
    label: "Google",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
    hoverBg: "rgba(66,133,244,0.14)",
    hoverBorder: "rgba(66,133,244,0.38)",
  },
  {
    id: "microsoft",
    label: "Microsoft",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24">
        <path fill="#f25022" d="M1 1h10v10H1z"/>
        <path fill="#00a4ef" d="M13 1h10v10H13z"/>
        <path fill="#7fba00" d="M1 13h10v10H1z"/>
        <path fill="#ffb900" d="M13 13h10v10H13z"/>
      </svg>
    ),
    hoverBg: "rgba(0,164,239,0.12)",
    hoverBorder: "rgba(0,164,239,0.32)",
  },
  {
    id: "github",
    label: "GitHub",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
    hoverBg: "rgba(255,255,255,0.08)",
    hoverBorder: "rgba(255,255,255,0.24)",
  },
  {
    id: "apple",
    label: "Apple",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
      </svg>
    ),
    hoverBg: "rgba(255,255,255,0.08)",
    hoverBorder: "rgba(255,255,255,0.24)",
  },
];

const FEATURES = [
  { icon: "✨", title: "Create with AI Prompts",  desc: "Describe it, watch it appear",      bg: "rgba(59,130,246,0.10)",  border: "rgba(59,130,246,0.18)" },
  { icon: "🌐", title: "Transform Any Website",   desc: "Paste a URL, redesign instantly",   bg: "rgba(124,58,237,0.09)",  border: "rgba(124,58,237,0.18)" },
  { icon: "🧩", title: "10,000+ Components",      desc: "Ready-to-use UI building blocks",   bg: "rgba(20,184,166,0.09)",  border: "rgba(20,184,166,0.18)" },
];

export default function LoginPage() {
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState("");

  async function handleOAuth(providerId: string) {
    setError("");
    try {
      await signIn(providerId, { callbackUrl: "/home" });
    } catch {
      setError(`Failed to sign in with ${providerId}. Please try again.`);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/home",
      });
      if (result?.error) {
        setError("Invalid email or password.");
      } else if (result?.url) {
        window.location.href = result.url;
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="lgn-root">

      {/* ── LEFT PANEL ── */}
      <div className="lgn-left">
        <div className="lgn-left-bg" />
        <div className="lgn-orb1" />
        <div className="lgn-orb2" />
        <div className="lgn-grid" />
        <div className="lgn-sep" />

        {/* Logo */}
        <Link href="/" className="lgn-logo-link">
          <div className="lgn-logo-icon">
            <span className="lgn-logo-letter">M</span>
          </div>
          <span className="lgn-logo-name">Morphix</span>
        </Link>

        {/* Feature bullets */}
        <div className="lgn-features">
          <div className="lgn-chip">
            <div className="lgn-pulse" />
            AI-POWERED WORKSPACE
          </div>
          <h2 className="lgn-headline">
            Build smarter,<br />
            <span className="lgn-headline-gradient">ship faster.</span>
          </h2>
          <p className="lgn-subtext">
            A unified AI workspace — create websites, transform any URL, and
            explore 10,000+ components.
          </p>
          {FEATURES.map((f) => (
            <div key={f.title} className="lgn-feature-item">
              <div className="lgn-feature-icon" style={{ background: f.bg, border: `1px solid ${f.border}` }}>
                {f.icon}
              </div>
              <div>
                <div className="lgn-feature-title">{f.title}</div>
                <div className="lgn-feature-desc">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <p className="lgn-tagline">
          Morphix — AI website creation &amp; customization.<br />
          <span className="lgn-tagline-url">morphix.app</span>
        </p>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="lgn-right">
        <div className="lgn-card">

          <div className="lgn-heading">
            <h1 className="lgn-title">Welcome back 🤝</h1>
            <p className="lgn-subtitle">Sign in to your Morphix workspace.</p>
          </div>

          {/* OAuth 2×2 */}
          <div className="lgn-oauth-grid">
            {OAuthProviders.map((p) => (
              <button
                key={p.id}
                id={`lgn-oauth-${p.id}`}
                type="button"
                className="lgn-oauth-btn"
                aria-label={`Continue with ${p.label}`}
                onClick={() => handleOAuth(p.id)}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background   = p.hoverBg;
                  (e.currentTarget as HTMLButtonElement).style.borderColor  = p.hoverBorder;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background   = "rgba(255,255,255,0.03)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor  = "rgba(255,255,255,0.08)";
                }}
              >
                {p.icon}
                <span>{p.label}</span>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="lgn-divider">
            <div className="lgn-divider-line" />
            <span className="lgn-divider-txt">or continue with email</span>
            <div className="lgn-divider-line" />
          </div>

          {/* Error */}
          {error && (
            <div className="lgn-error" role="alert" style={{ marginBottom: 12 }}>
              <span>⚠</span><span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form id="lgn-email-form" className="lgn-form" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="lgn-email" className="lgn-label">Email</label>
              <input
                id="lgn-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="lgn-input"
                autoComplete="email"
              />
            </div>

            <div>
              <div className="lgn-pw-row">
                <label htmlFor="lgn-password" className="lgn-label" style={{ marginBottom: 0 }}>Password</label>
                <a href="#" className="lgn-forgot">Forgot password?</a>
              </div>
              <div className="lgn-pw-wrap">
                <input
                  id="lgn-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  className="lgn-input"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="lgn-pw-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button id="lgn-submit" type="submit" className="lgn-submit" disabled={loading}>
              {loading && <span className="lgn-spinner" />}
              {loading ? "Signing in…" : "Sign In →"}
            </button>
          </form>

          <p className="lgn-bottom-text">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="lgn-switch-btn">Sign up </Link>
          </p>

          <p className="lgn-terms">
            By continuing you agree to our{" "}
            <a href="#">Terms</a> &amp; <a href="#">Privacy Policy</a>.
          </p>

        </div>
      </div>

    </div>
  );
}
