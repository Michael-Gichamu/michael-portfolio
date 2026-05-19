"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { stats } from "@/lib/data";

const AmbientScene = dynamic(() => import("@/components/three/AmbientScene"), {
  ssr: false,
});

const ease = [0.22, 1, 0.36, 1] as const;

const focus = [
  "Internal tools",
  "AI-assisted workflows",
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
        <AmbientScene />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-ink-950 via-ink-950/85 to-ink-950" />

      <div className="container-page">
        <SectionHeader
          index="01"
          kicker="About"
          title={
            <>
              Engineering, automation, and the{" "}
              <em className="italic text-gradient-accent">space between them</em>.
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
        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr]">
          <div className="space-y-3 lg:sticky lg:top-32 lg:self-start">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
              A bit of background
            </p>
            <h3 className="font-display text-3xl text-balance text-bone-50 sm:text-4xl">
              Between <em className="italic">engineering</em> and operations.
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
              I studied biomedical engineering, but most of my time outside class
              ended up going into software. What started as small frontend
              projects gradually turned into backend systems, automation
              workflows, and AI tooling.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease, delay: 0.08 }}
              className="text-[17px]"
            >
              Most of the work I enjoy sits somewhere between engineering and
              operations — understanding how people actually work, where time
              gets wasted, and where software can make things simpler or more
              reliable.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease, delay: 0.16 }}
              className="pt-2"
            >
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-bone-300">
                What I mostly build
              </p>
              <ul className="grid grid-cols-1 gap-y-3 sm:grid-cols-2">
                {focus.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-[15px] text-bone-100"
                  >
                    <span className="h-px w-5 bg-accent/60" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
