/**
 * POST /api/export
 * ─────────────────────────────────────────────────────────────────────────
 * Packages the generated React/TSX components into a ready-to-run project
 * and writes it to /exports/<project-name>/ in the workspace.
 *
 * Supports two output formats:
 *   - "react"  → Vite + React + Tailwind project with one file per component
 *   - "html"   → Single-page static HTML combining all section previews
 *
 * Returns: { success, exportPath, files: Record<string, string> }
 * The `files` object contains path → content pairs for client-side ZIP download.
 */

import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import type { DesignSystem } from "@/lib/generation-engine";

export const runtime = "nodejs";

interface ExportSection {
  id: string;
  label: string;
  tsx: string;
  html: string;
}

interface ExportRequest {
  projectName: string;
  format: "react" | "html";
  designSystem: DesignSystem;
  sections: ExportSection[];
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as ExportRequest;
  const { projectName, format, designSystem, sections } = body;

  if (!projectName || !sections || sections.length === 0) {
    return NextResponse.json(
      { error: "projectName and sections are required" },
      { status: 400 }
    );
  }

  const safeName = projectName
    .toLowerCase()
    .replace(/[^a-z0-9-_\s]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 50) || "morphix-export";

  const exportDir = path.join(process.cwd(), "exports", safeName);

  let files: Record<string, string> = {};

  if (format === "react") {
    files = buildReactProject(safeName, sections, designSystem);
  } else {
    files = buildStaticHTML(safeName, sections, designSystem);
  }

  // Write files to disk
  try {
    for (const [filePath, content] of Object.entries(files)) {
      const fullPath = path.join(exportDir, filePath);
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      fs.writeFileSync(fullPath, content, "utf-8");
    }

    console.log(`[Export] Written ${Object.keys(files).length} files to ${exportDir}`);
  } catch (err) {
    console.error("[Export] Failed to write files:", err);
    // Return files for client-side download even if disk write fails
    return NextResponse.json({
      success: false,
      exportPath: exportDir,
      files,
      error: "Disk write failed — use Download ZIP instead",
    });
  }

  return NextResponse.json({
    success: true,
    exportPath: exportDir,
    files,
    fileCount: Object.keys(files).length,
    format,
  });
}

// ── React Project Builder ─────────────────────────────────────────────────

function buildReactProject(
  projectName: string,
  sections: ExportSection[],
  ds: DesignSystem
): Record<string, string> {
  const files: Record<string, string> = {};

  const headingFontParam = ds.headingFont.replace(/\s+/g, "+");
  const bodyFontParam = ds.bodyFont.replace(/\s+/g, "+");
  const sameFont = headingFontParam === bodyFontParam;
  const fontUrl = sameFont
    ? `https://fonts.googleapis.com/css2?family=${headingFontParam}:wght@400;500;600;700;800;900&display=swap`
    : `https://fonts.googleapis.com/css2?family=${headingFontParam}:wght@400;600;700;800;900&family=${bodyFontParam}:wght@400;500;600&display=swap`;

  // package.json
  files["package.json"] = JSON.stringify(
    {
      name: projectName,
      private: true,
      version: "0.1.0",
      type: "module",
      scripts: {
        dev: "vite",
        build: "tsc && vite build",
        preview: "vite preview",
      },
      dependencies: {
        react: "^18.3.1",
        "react-dom": "^18.3.1",
        "lucide-react": "^0.462.0",
      },
      devDependencies: {
        "@types/react": "^18.3.3",
        "@types/react-dom": "^18.3.0",
        "@vitejs/plugin-react": "^4.3.1",
        autoprefixer: "^10.4.19",
        postcss: "^8.4.38",
        tailwindcss: "^3.4.4",
        typescript: "^5.2.2",
        vite: "^5.3.1",
      },
    },
    null,
    2
  );

  // vite.config.ts
  files["vite.config.ts"] = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
`;

  // tsconfig.json
  files["tsconfig.json"] = JSON.stringify(
    {
      compilerOptions: {
        target: "ES2020",
        useDefineForClassFields: true,
        lib: ["ES2020", "DOM", "DOM.Iterable"],
        module: "ESNext",
        skipLibCheck: true,
        moduleResolution: "bundler",
        allowImportingTsExtensions: true,
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        jsx: "react-jsx",
        strict: false,
      },
      include: ["src"],
      references: [{ path: "./tsconfig.node.json" }],
    },
    null,
    2
  );

  // tsconfig.node.json
  files["tsconfig.node.json"] = JSON.stringify(
    {
      compilerOptions: {
        composite: true,
        skipLibCheck: true,
        module: "ESNext",
        moduleResolution: "bundler",
        allowSyntheticDefaultImports: true,
      },
      include: ["vite.config.ts"],
    },
    null,
    2
  );

  // tailwind.config.js
  files["tailwind.config.js"] = `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '${ds.primaryColor}',
        secondary: '${ds.secondaryColor}',
        accent: '${ds.accentColor}',
      },
      fontFamily: {
        heading: ['${ds.headingFont}', 'sans-serif'],
        body: ['${ds.bodyFont}', 'sans-serif'],
        sans: ['${ds.bodyFont}', 'sans-serif'],
      },
      borderRadius: {
        sm: '${ds.borderRadius.sm}',
        DEFAULT: '${ds.borderRadius.md}',
        lg: '${ds.borderRadius.lg}',
        xl: '${ds.borderRadius.xl}',
      },
    },
  },
  plugins: [],
};
`;

  // postcss.config.js
  files["postcss.config.js"] = `export default {
  plugins: { tailwindcss: {}, autoprefixer: {} },
};
`;

  // index.html
  files["index.html"] = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
    <link rel="stylesheet" href="${fontUrl}" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;

  // src/main.tsx
  files["src/main.tsx"] = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;

  // src/index.css
  files["src/index.css"] = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary: ${ds.primaryColor};
  --primary-rgb: ${ds.primaryRgb};
  --secondary: ${ds.secondaryColor};
  --accent: ${ds.accentColor};
  --bg: ${ds.bgColor};
  --card-bg: ${ds.cardBgColor};
  --text: ${ds.textColor};
  --muted: ${ds.mutedColor};
  --heading-font: '${ds.headingFont}', sans-serif;
  --body-font: '${ds.bodyFont}', sans-serif;
  --radius-sm: ${ds.borderRadius.sm};
  --radius-md: ${ds.borderRadius.md};
  --radius-lg: ${ds.borderRadius.lg};
  --shadow-glow: ${ds.shadows.glow};
  --duration: ${ds.motion.duration};
  --easing: ${ds.motion.easing};
}

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--body-font);
  background: var(--bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--heading-font);
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s var(--easing) forwards;
}
`;

  // Component imports for App.tsx
  const validSections = sections.filter((s) => s.tsx && s.tsx.trim().length > 0);
  const componentImports = validSections
    .map((s) => {
      const compName = toPascalCase(s.id) + "Section";
      return `import ${compName} from './components/${compName}';`;
    })
    .join("\n");

  const componentUsage = validSections
    .map((s) => `      <${toPascalCase(s.id)}Section />`)
    .join("\n");

  // src/App.tsx
  files["src/App.tsx"] = `import React from 'react';
${componentImports}

export default function App() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
${componentUsage}
    </div>
  );
}
`;

  // Individual component files
  for (const section of validSections) {
    const compName = toPascalCase(section.id) + "Section";
    const cleanTsx = section.tsx
      // Normalize the export name to match what App.tsx expects
      .replace(
        /export default function \w+/,
        `export default function ${compName}`
      );
    files[`src/components/${compName}.tsx`] = cleanTsx;
  }

  // README.md
  files["README.md"] = `# ${projectName}

Generated by **Morphix AI** — premium bespoke website builder.

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Build for Production

\`\`\`bash
npm run build
\`\`\`

## Design System

| Token | Value |
|-------|-------|
| Primary Color | ${ds.primaryColor} |
| Background | ${ds.bgColor} |
| Heading Font | ${ds.headingFont} |
| Body Font | ${ds.bodyFont} |
| Border Radius | ${ds.borderRadius.md} |

## Sections

${validSections.map((s) => `- **${s.label}** (\`src/components/${toPascalCase(s.id)}Section.tsx\`)`).join("\n")}
`;

  return files;
}

// ── Static HTML Builder ───────────────────────────────────────────────────

function buildStaticHTML(
  projectName: string,
  sections: ExportSection[],
  ds: DesignSystem
): Record<string, string> {
  const files: Record<string, string> = {};

  const headingFontParam = ds.headingFont.replace(/\s+/g, "+");
  const bodyFontParam = ds.bodyFont.replace(/\s+/g, "+");
  const sameFont = headingFontParam === bodyFontParam;
  const fontUrl = sameFont
    ? `https://fonts.googleapis.com/css2?family=${headingFontParam}:wght@400;500;600;700;800;900&display=swap`
    : `https://fonts.googleapis.com/css2?family=${headingFontParam}:wght@400;600;700;800;900&family=${bodyFontParam}:wght@400;500;600&display=swap`;

  // Combine all section HTML bodies (strip the outer html/head/body tags)
  const combinedBody = sections
    .map((s) => {
      const bodyContent = s.html
        .replace(/<!DOCTYPE html>[\s\S]*?<body[^>]*>/i, "")
        .replace(/<\/body>[\s\S]*$/i, "")
        .trim();
      return `<!-- Section: ${s.label} -->\n${bodyContent}`;
    })
    .join("\n\n");

  files["index.html"] = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${projectName}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
  <link rel="stylesheet" href="${fontUrl}" />
  <link rel="stylesheet" href="styles.css" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    window.tailwind && (window.tailwind.config = {
      theme: {
        extend: {
          colors: { primary: '${ds.primaryColor}', secondary: '${ds.secondaryColor}', accent: '${ds.accentColor}' },
          fontFamily: { heading: ['${ds.headingFont}', 'sans-serif'], body: ['${ds.bodyFont}', 'sans-serif'] },
        }
      }
    });
  </script>
</head>
<body>
${combinedBody}
</body>
</html>`;

  files["styles.css"] = `:root {
  --primary: ${ds.primaryColor};
  --primary-rgb: ${ds.primaryRgb};
  --secondary: ${ds.secondaryColor};
  --accent: ${ds.accentColor};
  --bg: ${ds.bgColor};
  --card-bg: ${ds.cardBgColor};
  --text: ${ds.textColor};
  --muted: ${ds.mutedColor};
  --heading-font: '${ds.headingFont}', sans-serif;
  --body-font: '${ds.bodyFont}', sans-serif;
  --shadow-glow: ${ds.shadows.glow};
}

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--body-font); background: var(--bg); color: var(--text); -webkit-font-smoothing: antialiased; }
h1, h2, h3, h4, h5, h6 { font-family: var(--heading-font); }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.25,0.46,0.45,0.94) forwards; }
`;

  return files;
}

// ── Helper ────────────────────────────────────────────────────────────────

function toPascalCase(str: string): string {
  return str
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}
