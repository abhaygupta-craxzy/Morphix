import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  title: "Morphix — AI Website Transformation Studio",
  description:
    "Transform existing websites, extract design DNA, discover components, remix layouts, and export production-ready code through one intelligent AI-powered platform.",
  keywords: [
    "AI website builder",
    "website transformation",
    "design DNA extraction",
    "component library",
    "website redesign",
    "AI design tools",
  ],
  openGraph: {
    title: "Morphix — AI Website Transformation Studio",
    description:
      "Build, Redesign, Customize & Animate Websites with AI. Transform your website with intelligent design tools.",
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
      <body className="min-h-full flex flex-col bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
