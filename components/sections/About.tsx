"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { stats } from "@/lib/data";

const AmbientScene = dynamic(() => import("@/components/three/AmbientScene"), {
  ssr: false,
});

const ease = [0.22, 1, 0.36, 1] as const;

const focus = [
  "Internal tools",
  "AI-augmented workflows",
  "Automation systems",
  "Modern web applications",
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const sceneY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  // Only mount the ambient 3D scene once the section is near the viewport,
  // so it doesn't run a second WebGL context during the initial page load.
  const sceneInView = useInView(ref, { once: true, margin: "300px" });

  return (
    <section
      ref={ref}
      id="about"
      className="section-pad relative overflow-hidden"
    >
      <motion.div
        style={{ y: sceneY }}
        className="absolute inset-0 -z-10 opacity-50 will-change-transform"
      >
        {sceneInView && <AmbientScene />}
      </motion.div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-ink-950 via-ink-950/85 to-ink-950" />

      <div className="container-page">
        <SectionHeader
          index="01"
          kicker="About"
          title={
            <>
              Built on curiosity,{" "}
              <em className="italic text-gradient-accent">sharpened by work</em>.
            </>
          }
        />

        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] md:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ delay: i * 0.08, duration: 0.7, ease }}
              className="relative bg-ink-950 p-6 sm:p-8"
            >
              <div className="font-display text-5xl text-bone-50 sm:text-6xl">
                <AnimatedCounter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-sm text-bone-50">{s.label}</div>
              <div className="mt-2 max-w-[280px] text-[13px] leading-relaxed text-bone-300">
                {s.caption}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Body — single block + focus list */}
        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr]">
          <div className="space-y-3 lg:sticky lg:top-32 lg:self-start">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
              Background
            </p>
            <h3 className="font-display text-3xl text-balance text-bone-50 sm:text-4xl">
              Biomedical roots,{" "}
              <em className="italic">software career</em>.
            </h3>
          </div>

          <div className="space-y-6 leading-relaxed text-bone-200">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease }}
              className="text-[17px]"
            >
              I studied biomedical engineering. Most of my time outside class
              went into software — frontend first, then backend systems,
              then automation workflows, then AI tooling.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease, delay: 0.08 }}
              className="text-[17px]"
            >
              The work I keep coming back to lives at the edge of engineering
              and operations. Finding where teams lose capacity or leave revenue
              on the table, then building the systems that recover both.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease, delay: 0.16 }}
              className="pt-2"
            >
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-bone-300">
                What I build
              </p>
              <ul className="grid grid-cols-1 gap-y-3 sm:grid-cols-2">
                {focus.map((f, i) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.22 + i * 0.07 }}
                    className="flex items-center gap-3 text-[15px] text-bone-100"
                  >
                    <motion.span
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, margin: "-10% 0px" }}
                      transition={{ duration: 0.35, ease: "easeOut", delay: 0.3 + i * 0.07 }}
                      style={{ transformOrigin: "left" }}
                      className="block h-px w-5 flex-shrink-0 bg-accent/60"
                    />
                    {f}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
