import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Morphix — AI Website Creation & Customization Workspace",
  description:
    "Create, transform, and customize websites with AI. Explore 10,000+ components, import any existing site, or build entirely new experiences inside one intelligent workspace.",
  keywords: [
    "AI website builder",
    "website transformation",
    "design DNA extraction",
    "component library",
    "AI website creation",
    "website customization",
    "AI design tools",
  ],
  openGraph: {
    title: "Morphix — AI Website Creation & Customization Workspace",
    description:
      "Create, customize, and launch websites — all inside one AI workspace. 10,000+ components, transform any URL, or build from scratch.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased" style={{ background: "#050816", color: "rgba(255,255,255,0.92)" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
