"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import Marquee from "@/components/ui/Marquee";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 mesh-bg" />,
});

const ease = [0.22, 1, 0.36, 1] as const;

// Headline broken into deliberate lines. Each line animates in sequence;
// inside a line, the words stagger. The italic accent sits on the closing line.
const headlineLines: { words: string[]; accent?: boolean; muted?: boolean }[] = [
  { words: ["Software", "Engineer"] },
  { words: ["&"], muted: true },
  { words: ["AI", "Automation", "Specialist."], accent: true },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Scene fades and drifts as the page scrolls past the hero
  const sceneY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // Headline parallaxes faster than scroll, then fades out
  const headlineY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Marquee parallax — slight upward drift
  const marqueeY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100svh] overflow-hidden"
    >
      {/* 3D scene with scroll parallax */}
      <motion.div
        style={{ y: sceneY, scale: sceneScale, opacity: sceneOpacity }}
        className="absolute inset-0 will-change-transform"
      >
        <HeroScene />
      </motion.div>

      {/* Layered overlays */}
      <div className="pointer-events-none absolute inset-0 stroke-grid opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/40 via-transparent to-ink-950" />
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.04]" />

      {/* Main content — top meta + headline pushed to center-bottom */}
      <div className="container-page relative z-10 flex min-h-[100svh] flex-col justify-between pt-28 pb-40 sm:pt-32 sm:pb-44">
        {/* Top meta strip */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.55, duration: 0.7, ease }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-bone-300">
            <span className="text-accent">M.G.</span>
            <span className="h-px w-8 bg-white/15" />
            <span>Software · AI Automation</span>
          </div>
          <div className="hidden font-mono text-[11px] uppercase tracking-[0.24em] text-bone-300 sm:block">
            Nairobi, Kenya
          </div>
        </motion.div>

        {/* Headline block — parallax + fade as user scrolls */}
        <motion.div
          style={{ y: headlineY, opacity: headlineOpacity }}
          className="max-w-5xl will-change-transform"
        >
          <h1 className="font-display text-display-xl leading-[0.95] text-bone-50">
            {headlineLines.map((line, li) => {
              const lineDelay = 1.55 + li * 0.18;
              return (
                <span key={li} className="block">
                  {line.words.map((word, wi) => (
                    <span
                      key={wi}
                      className="inline-block overflow-hidden pb-[0.06em] align-bottom"
                    >
                      <motion.span
                        initial={{ y: "110%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        transition={{
                          delay: lineDelay + wi * 0.045,
                          duration: 0.9,
                          ease,
                        }}
                        className="inline-block will-change-transform"
                      >
                        {line.accent ? (
                          <em className="italic text-gradient-accent">{word}</em>
                        ) : line.muted ? (
                          <span className="text-bone-300/80">{word}</span>
                        ) : (
                          word
                        )}
                        {wi < line.words.length - 1 ? " " : ""}
                      </motion.span>
                    </span>
                  ))}
                </span>
              );
            })}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.8, ease }}
            className="mt-8 max-w-md text-base leading-relaxed text-bone-300 sm:text-lg"
          >
            Nairobi-based. I build the systems that cut manual work —
            AI agents, automation pipelines, and the web products that run on top of them.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.7, duration: 0.7, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="#work" variant="primary">
              View Projects
              <Arrow />
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Contact Me
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator — pinned just above the marquee, never crowded */}
      <div className="pointer-events-none absolute inset-x-0 bottom-20 z-10 flex justify-center sm:bottom-24">
        <ScrollIndicator />
      </div>

      {/* Marquee — pinned bottom edge with parallax drift */}
      <motion.div
        style={{ y: marqueeY }}
        className="absolute inset-x-0 bottom-0 z-10 border-t border-white/[0.06] bg-ink-950/70 py-3 backdrop-blur-md"
      >
        <Marquee
          items={[
            "Python",
            "TypeScript",
            "LangGraph",
            "FastAPI",
            "n8n",
            "React",
            "Three.js",
            "Docker",
            "Postgres",
            "OpenAI",
            "Claude",
            "GCP",
          ]}
          speed={42}
        />
      </motion.div>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="-mr-1">
      <path
        d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

