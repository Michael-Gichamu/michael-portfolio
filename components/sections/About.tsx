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

const story = [
  {
    year: "Background",
    title: "Biomedical engineering",
    body: "My first few years out of school were spent working with hospital equipment — calibrating it, repairing it, figuring out why it didn't behave. It's where I learned to think about systems carefully, because the consequences of getting something wrong aren't abstract.",
  },
  {
    year: "Shift",
    title: "Into software",
    body: "I moved into software because I kept seeing the same thing — clinics and field teams running operations out of spreadsheets, paper, and tribal knowledge. A lot of it didn't need to be that way. Software handled most of it more reliably, and LLMs handled some of the parts I used to think only people could do.",
  },
  {
    year: "Now",
    title: "What I work on",
    body: "Internal tools, AI-assisted workflows, automation pipelines. Most of what I build sits behind a small number of users who notice immediately if it breaks. So it can't break.",
  },
];

export default function About() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 30%"],
  });
  const lineProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Ambient scene parallax
  const sceneRef = useRef<HTMLElement>(null);
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sceneRef,
    offset: ["start end", "end start"],
  });
  const sceneY = useTransform(sectionProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={sceneRef}
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
              Good systems are usually{" "}
              <em className="italic text-gradient-accent">boring</em>. That's
              the kind I try to build.
            </>
          }
          description="They work, the people using them trust them, and after a week nobody thinks about them very much. Most of what I do is in that direction — software, automation, and a bit of AI where it genuinely helps."
        />

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] md:grid-cols-4">
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
              <div className="mt-3 max-w-[200px] text-sm text-bone-200">
                {s.label}
              </div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300">
                {s.caption}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Story timeline with scroll-scrubbed line */}
        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr]">
          <div className="space-y-4 lg:sticky lg:top-32 lg:self-start">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              How I got here
            </p>
            <h3 className="font-display text-4xl text-balance text-bone-50">
              Biomedical engineering, then software, then{" "}
              <em className="italic">a lot of operations work</em>.
            </h3>
            <p className="max-w-md text-bone-300">
              Three short notes on the path, because it explains why I tend to
              care about the things I care about.
            </p>
          </div>

          <div ref={timelineRef} className="relative">
            {/* Static rail */}
            <div className="absolute left-0 top-0 hidden h-full w-px bg-white/[0.06] md:block" />
            {/* Scroll-driven progress rail */}
            <motion.div
              style={{ height: lineProgress }}
              className="absolute left-0 top-0 hidden w-px bg-gradient-to-b from-accent via-bone-100/70 to-transparent md:block"
            />

            <ul className="space-y-12 md:pl-12">
              {story.map((item, i) => (
                <motion.li
                  key={item.year}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease }}
                  className="relative"
                >
                  <span className="absolute -left-12 top-2 hidden h-2 w-2 rounded-full bg-accent shadow-[0_0_0_4px_rgba(91,140,255,0.12)] md:block" />
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-300">
                    {item.year}
                  </div>
                  <h4 className="mt-1 font-display text-2xl text-bone-50">
                    {item.title}
                  </h4>
                  <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-bone-200">
                    {item.body}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
