"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Briefcase,
  Check,
  Clock3,
  Globe2,
  LayoutDashboard,
  Layers3,
  Rocket,
  Settings2,
  ShoppingBag,
  Sparkles,
  Zap,
} from "lucide-react";
import styles from "./NewProjectSetup.module.css";

interface NewProjectSetupProps {
  onCreate: (name: string, type: string, scope: string) => void;
}

const WEBSITE_TYPES = [
  {
    label: "Landing Page",
    description: "Marketing sites that convert",
    icon: Globe2,
    tone: "pink",
  },
  {
    label: "Dashboard",
    description: "Internal tools & admin panels",
    icon: LayoutDashboard,
    tone: "green",
  },
  {
    label: "Portfolio",
    description: "Personal sites & showcases",
    icon: Briefcase,
    tone: "orange",
  },
  {
    label: "SaaS",
    description: "Product sites & web apps",
    icon: Rocket,
    tone: "purple",
  },
  {
    label: "E-commerce",
    description: "Stores & product catalogs",
    icon: ShoppingBag,
    tone: "cyan",
  },
  {
    label: "Blog",
    description: "Editorial & content hubs",
    icon: BookOpen,
    tone: "blue",
  },
  {
    label: "Custom",
    description: "Start with your own idea",
    icon: Settings2,
    tone: "lime",
  },
] as const;

const SCOPE_BY_TYPE: Record<string, string> = {
  "Landing Page": "Single Page",
  Dashboard: "Full App",
  Portfolio: "Full Website",
  SaaS: "Full Website",
  "E-commerce": "Full Website",
  Blog: "Full Website",
  Custom: "Flexible Project",
};

const PREVIEW_COPY: Record<string, { eyebrow: string; title: string; copy: string }> = {
  "Landing Page": {
    eyebrow: "LAUNCH FASTER",
    title: "Turn a bold idea into your next big thing.",
    copy: "A focused, conversion-ready page assembled around your story.",
  },
  Dashboard: {
    eyebrow: "ONE CLEAR VIEW",
    title: "Your work, finally in focus.",
    copy: "A structured workspace for insights, actions, and momentum.",
  },
  Portfolio: {
    eyebrow: "SELECTED WORK",
    title: "Make the work impossible to overlook.",
    copy: "A cinematic home for your projects, process, and point of view.",
  },
  SaaS: {
    eyebrow: "BUILT TO SCALE",
    title: "The product story your launch deserves.",
    copy: "Show value quickly with a polished product-led experience.",
  },
  "E-commerce": {
    eyebrow: "NEW COLLECTION",
    title: "A storefront people want to explore.",
    copy: "Turn products into an elegant, frictionless shopping journey.",
  },
  Blog: {
    eyebrow: "LATEST STORIES",
    title: "Ideas deserve a beautiful place to live.",
    copy: "A readable, distinctive publication built around your voice.",
  },
  Custom: {
    eyebrow: "YOUR BLUEPRINT",
    title: "Start anywhere. Shape everything.",
    copy: "Bring your own direction and let Morphix build the foundation.",
  },
};

type TrailParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  hue: number;
};

function CometTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let lastX = -100;
    let lastY = -100;
    let pointerX = -100;
    let pointerY = -100;
    let lastSpawnAt = 0;
    let isAnimating = false;
    const particles: TrailParticle[] = [];
    const trailHues = [204, 258, 326, 154, 38];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerX = event.clientX;
      pointerY = event.clientY;

      const dx = pointerX - lastX;
      const dy = pointerY - lastY;
      const distance = Math.hypot(dx, dy);
      const now = performance.now();
      if (distance < 7 || now - lastSpawnAt < 14) return;

      const directionX = dx / distance;
      const directionY = dy / distance;
      const count = distance > 28 ? 2 : 1;

      for (let index = 0; index < count; index += 1) {
        const spread = (Math.random() - 0.5) * 1.1;
        const tailOffset = 18 + Math.random() * 24;
        particles.push({
          x: pointerX - directionX * tailOffset,
          y: pointerY - directionY * tailOffset,
          vx: -directionX * (0.45 + Math.random() * 1.1) - directionY * spread,
          vy: -directionY * (0.45 + Math.random() * 1.1) + directionX * spread,
          life: 1,
          size: 1.1 + Math.random() * 2.1,
          hue: trailHues[Math.floor(Math.random() * trailHues.length)],
        });
      }

      if (particles.length > 56) particles.splice(0, particles.length - 56);
      lastX = pointerX;
      lastY = pointerY;
      lastSpawnAt = now;

      if (!isAnimating) {
        isAnimating = true;
        frame = requestAnimationFrame(draw);
      }
    };

    const draw = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.globalCompositeOperation = "lighter";

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.94;
        particle.vy *= 0.94;
        particle.life -= 0.072;

        if (particle.life <= 0) {
          particles.splice(index, 1);
          continue;
        }

        const alpha = particle.life * 0.68;
        context.beginPath();
        context.fillStyle = `hsla(${particle.hue}, 95%, 68%, ${alpha})`;
        context.shadowBlur = 9 * particle.life;
        context.shadowColor = `hsla(${particle.hue}, 100%, 70%, ${alpha})`;
        context.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2);
        context.fill();
      }

      context.shadowBlur = 0;
      if (particles.length > 0) {
        frame = requestAnimationFrame(draw);
      } else {
        isAnimating = false;
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.cometCanvas} aria-hidden="true" />;
}

function BlueprintPreview({ projectName, type }: { projectName: string; type: string }) {
  const copy = PREVIEW_COPY[type] ?? PREVIEW_COPY.Custom;

  return (
    <section className={styles.previewPanel} aria-label="Live project blueprint preview">
      <div className={styles.previewTopline}>
        <span className={styles.previewPill}>
          <span className={styles.liveDot} /> Live blueprint
        </span>
        <span className={styles.cycleLabel}>Assembling section by section</span>
      </div>

      <div className={styles.stage}>
        <div className={styles.sourceRail} aria-hidden="true">
          <div className={`${styles.sourceChip} ${styles.navChip} ${styles.sourceOne}`}><Layers3 size={13} /> Navbar</div>
          <div className={`${styles.sourceChip} ${styles.sidebarChip} ${styles.sourceTwo}`}><LayoutDashboard size={13} /> Sidebar</div>
          <div className={`${styles.sourceChip} ${styles.heroChip} ${styles.sourceThree}`}><Sparkles size={13} /> Hero</div>
          <div className={`${styles.sourceChip} ${styles.featuresChip} ${styles.sourceFour}`}><BarChart3 size={13} /> Features</div>
          <div className={`${styles.sourceChip} ${styles.footerChip} ${styles.sourceFive}`}><Globe2 size={13} /> Footer</div>
        </div>

        <div className={styles.browserFrame}>
          <div className={styles.browserBar}>
            <div className={styles.trafficLights}><span /><span /><span /></div>
            <div className={styles.browserAddress}>morphix.site / preview</div>
            <Zap size={12} />
          </div>

          <div className={styles.siteCanvas}>
            <div className={`${styles.generatedSection} ${styles.navSection}`}>
              <div className={styles.previewBrand}>
                <div className={styles.previewLogo}>{projectName.trim().slice(0, 1) || "N"}</div>
                <strong>{projectName.trim() || "Northstar"}</strong>
              </div>
              <nav className={styles.previewNav} aria-label="Generated website navigation">
                <span>Product</span><span>Solutions</span><span>Pricing</span>
              </nav>
              <div className={styles.navButton}>Get started</div>
            </div>

            <div className={styles.siteBody}>
              <aside className={`${styles.generatedSection} ${styles.sidebarSection}`} aria-hidden="true">
                <div className={styles.sidebarBadge}><LayoutDashboard size={11} /></div>
                <div className={styles.sidebarItems}>
                  {["Overview", "Projects", "Analytics", "Settings"].map((label, index) => (
                    <span className={index === 0 ? styles.sidebarItemActive : ""} key={label}><i /><b>{label}</b></span>
                  ))}
                </div>
                <div className={styles.sidebarProfile}><i /><b>My workspace</b></div>
              </aside>

              <div className={styles.mainColumn}>
                <div className={`${styles.generatedSection} ${styles.heroSection}`}>
                  <span className={styles.heroEyebrow}>{copy.eyebrow}</span>
                  <h2>{copy.title}</h2>
                  <p>{copy.copy}</p>
                  <div className={styles.heroActions}><span>Start building</span><span>Watch demo</span></div>
                  <div className={styles.heroVisual} aria-label="Generated analytics card">
                    <div className={styles.visualTop}><span>Live growth</span><b>+24%</b></div>
                    <strong className={styles.visualValue}>12.8K</strong>
                    <div className={styles.visualChart} aria-hidden="true">
                      {[36, 54, 43, 72, 61, 88, 78].map((height, index) => <i key={`${height}-${index}`} style={{ height: `${height}%` }} />)}
                    </div>
                    <div className={styles.visualFoot}><i /><span>Updated just now</span></div>
                  </div>
                </div>

                <div className={`${styles.generatedSection} ${styles.featureSection}`}>
                  {[
                    ["01", "Launch faster", "From idea to first draft"],
                    ["02", "Smart layouts", "Built around your content"],
                    ["03", "Edit anything", "Stay in complete control"],
                  ].map(([number, title, description]) => (
                    <div className={styles.miniFeature} key={number}>
                      <span>{number}</span>
                      <strong>{title}</strong>
                      <p>{description}</p>
                    </div>
                  ))}
                </div>

                <div className={`${styles.generatedSection} ${styles.proofSection}`}>
                  <div className={styles.testimonialCard}>
                    <span>LOVED BY BUILDERS</span>
                    <strong>“From an idea to a polished first draft in minutes.”</strong>
                    <div><i>AK</i><p><b>Alex Kim</b><small>Product designer</small></p></div>
                  </div>
                  <div className={styles.previewCta}>
                    <span>READY TO CREATE?</span>
                    <strong>Build your next idea with AI.</strong>
                    <button type="button">Start for free</button>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.generatedSection} ${styles.footerSection}`}>
              <div className={styles.footerBrand}>
                <i>{projectName.trim().slice(0, 1) || "N"}</i>
                <span>&copy; 2026 {projectName.trim() || "Northstar"}</span>
              </div>
              <div className={styles.footerLinks}><b>Product</b><b>Resources</b><b>Contact</b></div>
              <div className={styles.footerReady}><i /> Site ready</div>
            </div>
            <div className={styles.scanLine} aria-hidden="true" />
          </div>
        </div>

        <div className={styles.buildStatus}>
          <span><Sparkles size={13} /> AI architect</span>
          <strong>Composing your {type.toLowerCase()}</strong>
          <div className={styles.statusTrack}><i /></div>
        </div>
      </div>

      <div className={styles.sectionLegend} aria-hidden="true">
        {[
          ["01", "Structure"],
          ["02", "Style"],
          ["03", "Polish"],
        ].map(([number, label]) => (
          <div key={number}><span>{number}</span><p>{label}</p></div>
        ))}
      </div>
    </section>
  );
}

export default function NewProjectSetup({ onCreate }: NewProjectSetupProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState("Landing Page");
  const [customType, setCustomType] = useState("");

  const submitProject = () => {
    const finalType = type === "Custom" ? customType.trim() || "Custom Site" : type;
    const inferredScope = SCOPE_BY_TYPE[type] || "Flexible Project";
    onCreate(name, finalType, inferredScope);
  };

  return (
    <div className={styles.overlay}>
      <CometTrail />
      <div className={styles.ambientOne} aria-hidden="true" />
      <div className={styles.ambientTwo} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />

      <main className={styles.shell}>
        <BlueprintPreview projectName={name} type={type} />

        <section className={styles.setupPanel} aria-labelledby="project-blueprint-title">
          <div className={styles.panelGlow} aria-hidden="true" />
          <div className={styles.setupHeader}>
            <div className={styles.brandMark}><Layers3 size={20} /></div>
            <button type="button" onClick={submitProject} className={styles.quickStart}>
              Quick start <ArrowRight size={13} />
            </button>
          </div>

          <div className={styles.intro}>
            <div className={styles.kicker}>PROJECT BLUEPRINT</div>
            <h1 id="project-blueprint-title">Let&apos;s build something <span>great.</span></h1>
            <p>Create your project. You&apos;ll design everything inside Create Studio.</p>
            <div className={styles.setupTime}><Clock3 size={14} /> Less than 10 seconds</div>
          </div>

          <div className={styles.formSection}>
            <div className={styles.sectionHeading}>
              <div><span>01</span><h2>Project name</h2></div>
              <p>Give your project a name. You can rename it anytime.</p>
            </div>
            <label className={styles.srOnly} htmlFor="project-name">Project name</label>
            <input
              id="project-name"
              data-testid="project-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") submitProject();
              }}
              placeholder="My Startup Website"
              autoComplete="off"
              className={styles.nameInput}
            />
          </div>

          <div className={styles.formSection}>
            <div className={styles.sectionHeading}>
              <div><span>02</span><h2>What are you building?</h2></div>
              <p>We&apos;ll choose the right page structure automatically.</p>
            </div>

            <div className={styles.typeGrid} role="radiogroup" aria-label="Website type">
              {WEBSITE_TYPES.map((item) => {
                const Icon = item.icon;
                const selected = type === item.label;
                const toneClass = styles[`type${item.tone[0].toUpperCase()}${item.tone.slice(1)}`];
                return (
                  <button
                    key={item.label}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    data-testid={`type-${item.label.toLowerCase().replaceAll(" ", "-")}`}
                    onClick={() => setType(item.label)}
                    className={`${styles.typeCard} ${toneClass} ${selected ? styles.typeCardSelected : ""}`}
                  >
                    <span className={styles.typeIcon}><Icon size={17} strokeWidth={1.8} /></span>
                    <span className={styles.typeCopy}><strong>{item.label}</strong><small>{item.description}</small></span>
                    <span className={styles.checkMark}><Check size={12} strokeWidth={3} /></span>
                  </button>
                );
              })}
            </div>

            {type === "Custom" && (
              <input
                value={customType}
                onChange={(event) => setCustomType(event.target.value)}
                placeholder="Describe what you're building"
                aria-label="Custom website type"
                className={styles.customInput}
                autoFocus
              />
            )}
          </div>

          <div className={styles.nextSection}>
            <div className={styles.nextTitle}><span>03</span><h2>What happens next</h2></div>
            <div className={styles.steps}>
              {[
                "Open Create Studio",
                "Describe your idea",
                "Watch AI build it live",
              ].map((step, index) => (
                <div className={styles.step} key={step}>
                  <span>{index + 1}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>

          <button type="button" data-testid="continue-create-studio" onClick={submitProject} className={styles.continueButton}>
            <span>Continue to Create Studio</span>
            <ArrowRight size={17} />
            <i aria-hidden="true" />
          </button>

          <p className={styles.defaultHint}>Not sure yet? Quick start uses smart defaults.</p>
        </section>
      </main>
    </div>
  );
}
