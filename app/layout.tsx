import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { sans, display, mono } from "./fonts";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/ui/Cursor";
import ScrollProgress from "@/components/ui/ScrollProgress";

export const metadata: Metadata = {
  title: "Michael Gichamu — Software Engineer & AI Automation Specialist",
  description:
    "Software engineer specialising in AI-augmented workflows and automation systems. I build the tools that drive operational efficiency for small and mid-sized teams.",
  metadataBase: new URL("https://michaelgichamu.tech"),
  openGraph: {
    title: "Michael Gichamu — Software Engineer & AI Automation",
    description:
      "AI-augmented workflows, automation systems, and the software that drives operational efficiency.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05060A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
    >
      <body className="bg-ink-950 text-bone-100 antialiased">
        <Cursor />
        <ScrollProgress />
        <SmoothScroll>
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
        </SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
