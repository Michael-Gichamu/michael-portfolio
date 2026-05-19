import type { Metadata, Viewport } from "next";
import { sans, display, mono } from "./fonts";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/ui/Cursor";
import LoadingScreen from "@/components/ui/LoadingScreen";

export const metadata: Metadata = {
  title: "Michael Gichamu — Software Engineer & AI Automation Specialist",
  description:
    "Software engineer in Nairobi. I build internal tools, AI-assisted workflows, and automation for small operational teams.",
  metadataBase: new URL("https://michaelgichamu.dev"),
  openGraph: {
    title: "Michael Gichamu — Software Engineer & AI Automation",
    description:
      "Internal tools, AI-assisted workflows, and automation for small operational teams.",
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
        <LoadingScreen />
        <Cursor />
        <SmoothScroll>
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
