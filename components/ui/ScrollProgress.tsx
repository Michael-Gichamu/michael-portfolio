"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

type Chapter = { id: string; label: string };

const chapters: Chapter[] = [
  { id: "top", label: "Index" },
  { id: "about", label: "Background" },
  { id: "work", label: "Selected work" },
  { id: "skills", label: "Tools" },
  { id: "experience", label: "Experience" },
  { id: "credentials", label: "Training" },
  { id: "contact", label: "Contact" },
];

/**
 * Quiet right-edge chapter marker. A single thin progress line and the
 * label of the current section. Updates as the user scrolls.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });
  const lineHeight = useTransform(smoothed, [0, 1], ["0%", "100%"]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const targets = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => !!el);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let bestIdx = -1;
        let bestRatio = 0;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = chapters.findIndex((c) => c.id === entry.target.id);
          if (idx === -1) return;
          if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestIdx = idx;
          }
        });
        if (bestIdx !== -1) setActiveIndex(bestIdx);
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.15, 0.4, 0.7, 1],
      }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  const active = chapters[activeIndex];

  return (
    <>
      {/* Top progress bar — 2px accent line tracking scroll depth */}
      <motion.div
        aria-hidden
        style={{ scaleX: smoothed, transformOrigin: "left" }}
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-accent via-bone-100/80 to-accent"
      />

      {/* Right-edge chapter marker */}
      <div
        aria-hidden
        className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 sm:right-6 md:flex"
      >
        <motion.span
          key={active.id}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone-300"
        >
          {active.label}
        </motion.span>

        <div className="relative h-[22vh] w-px overflow-hidden bg-white/[0.07]">
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-0 top-0 w-px bg-gradient-to-b from-bone-100/0 via-accent/70 to-accent"
          />
        </div>
      </div>
    </>
  );
}
