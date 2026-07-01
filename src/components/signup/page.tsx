"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import "./signup.css";

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

const STEPS = [
  { num: "1", title: "Create your account",   desc: "Sign up with email or a social provider" },
  { num: "2", title: "Set up your workspace", desc: "Name your project and pick your stack"    },
  { num: "3", title: "Start building",        desc: "Prompt AI, import a URL, or browse components" },
];

/* ── Password strength helper ── */
function getStrength(pw: string): { score: number; label: string } {
  if (!pw) return { score: 0, label: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  return { score, label: labels[score] };
}

const BAR_CLASSES: Record<number, string> = {
  1: "active-weak",
  2: "active-fair",
  3: "active-good",
  4: "active-strong",
};

export default function SignupPage() {
  const [name, setName]                   = useState("");
  const [email, setEmail]                 = useState("");
  const [password, setPassword]           = useState("");
  const [showPassword, setShowPassword]   = useState(false);
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState("");
  const [success, setSuccess]             = useState(false);

  const pwStrength = useMemo(() => getStrength(password), [password]);

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

    if (!name.trim())    { setError("Please enter your full name."); return; }
    if (!email)          { setError("Please enter your email address."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }

    setLoading(true);
    try {
      // TODO: call your registration API / NextAuth signUp
      await new Promise((r) => setTimeout(r, 1400));
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="sgn-root">

      {/* ── LEFT PANEL ── */}
      <div className="sgn-left">
        <div className="sgn-left-bg" />
        <div className="sgn-orb1" />
        <div className="sgn-orb2" />
        <div className="sgn-orb3" />
        <div className="sgn-grid" />
        <div className="sgn-sep" />

        {/* Logo */}
        <Link href="/" className="sgn-logo-link">
          <div className="sgn-logo-icon">
            <span className="sgn-logo-letter">M</span>
          </div>
          <span className="sgn-logo-name">Morphix</span>
        </Link>

        {/* Onboarding steps */}
        <div className="sgn-features">
          <div className="sgn-chip">
            <div className="sgn-pulse" />
            GET STARTED IN MINUTES
          </div>
          <h2 className="sgn-headline">
            Your AI workspace,<br />
            <span className="sgn-headline-gradient">starts here.</span>
          </h2>
          <p className="sgn-subtext">
            Join thousands of builders creating stunning websites with AI — no
            coding required.
          </p>
          {STEPS.map((s) => (
            <div key={s.num} className="sgn-step-item">
              <div className="sgn-step-num">{s.num}</div>
              <div>
                <div className="sgn-step-title">{s.title}</div>
                <div className="sgn-step-desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <p className="sgn-tagline">
          Morphix — AI website creation &amp; customization.<br />
          <span className="sgn-tagline-url">morphix.app</span>
        </p>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="sgn-right">
        <div className="sgn-card">

          <div className="sgn-heading">
            <h1 className="sgn-title">Create your account </h1>
            <p className="sgn-subtitle">
              Start building with AI — it&apos;s free.
            </p>
          </div>

          {/* OAuth 2×2 */}
          <div className="sgn-oauth-grid">
            {OAuthProviders.map((p) => (
              <button
                key={p.id}
                id={`sgn-oauth-${p.id}`}
                type="button"
                className="sgn-oauth-btn"
                aria-label={`Continue with ${p.label}`}
                onClick={() => handleOAuth(p.id)}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background  = p.hoverBg;
                  (e.currentTarget as HTMLButtonElement).style.borderColor = p.hoverBorder;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background  = "rgba(255,255,255,0.03)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                {p.icon}
                <span>{p.label}</span>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="sgn-divider">
            <div className="sgn-divider-line" />
            <span className="sgn-divider-txt">or sign up with email</span>
            <div className="sgn-divider-line" />
          </div>

          {/* Error / Success */}
          {error && (
            <div className="sgn-error" role="alert" style={{ marginBottom: 12 }}>
              <span>⚠</span><span>{error}</span>
            </div>
          )}
          {success && (
            <div className="sgn-success" role="status" style={{ marginBottom: 12 }}>
              <span>✓</span>
              <span>Account created! Check your email to verify and get started.</span>
            </div>
          )}

          {/* Form */}
          <form id="sgn-email-form" className="sgn-form" onSubmit={handleSubmit} noValidate>
            {/* Full name */}
            <div>
              <label htmlFor="sgn-name" className="sgn-label">Full Name</label>
              <input
                id="sgn-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="sgn-input"
                autoComplete="name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="sgn-email" className="sgn-label">Email</label>
              <input
                id="sgn-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="sgn-input"
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="sgn-password" className="sgn-label">Password</label>
              <div className="sgn-pw-wrap">
                <input
                  id="sgn-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="sgn-input"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="sgn-pw-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {/* Strength bars */}
              {password && (
                <>
                  <div className="sgn-pw-strength" aria-label={`Password strength: ${pwStrength.label}`}>
                    {[1, 2, 3, 4].map((n) => (
                      <div
                        key={n}
                        className={`sgn-pw-bar ${pwStrength.score >= n ? BAR_CLASSES[pwStrength.score] : ""}`}
                      />
                    ))}
                  </div>
                  <p className="sgn-pw-hint">{pwStrength.label}</p>
                </>
              )}
            </div>

            <button
              id="sgn-submit"
              type="submit"
              className="sgn-submit"
              disabled={loading || success}
            >
              {loading && <span className="sgn-spinner" />}
              {loading ? "Creating account…" : success ? "Account Created ✓" : "Create Account →"}
            </button>
          </form>

          <p className="sgn-bottom-text">
            Already have an account?{" "}
            <Link href="/login" className="sgn-switch-btn">Log in</Link>
          </p>

          <p className="sgn-terms">
            By creating an account you agree to our{" "}
            <a href="#">Terms of Service</a> &amp; <a href="#">Privacy Policy</a>.
          </p>

        </div>
      </div>

    </div>
  );
}
