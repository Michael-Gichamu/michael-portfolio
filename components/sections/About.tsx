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
    year: "School",
    title: "Biomedical engineering",
    body: "I studied biomedical engineering at university. First year I was interested in the equipment side. By the second I was spending most of my time outside class on software — building small things, helping out on group projects when the code part went sideways, reading more docs than coursework.",
  },
  {
    year: "Drift",
    title: "Where the interest moved",
    body: "The systems around the equipment ended up being more interesting than the equipment itself. Booking flows that broke on slow networks. Reports stitched together from three spreadsheets and a WhatsApp group. Tribal knowledge held together by a few patient people. A lot of it was just software work that nobody had gotten around to.",
  },
  {
    year: "Now",
    title: "What I work on",
    body: "Internal tools, AI-assisted workflows, automation pipelines. The users are usually small in number and they notice immediately when something breaks, so a lot of the effort goes into the parts that aren't fun — validation, retries, the edge cases.",
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
              A bit of{" "}
              <em className="italic text-gradient-accent">background</em>.
            </>
          }
          description="I didn't start in software. I started in biomedical engineering, and somewhere in school the interest bent toward the systems around the equipment instead of the equipment itself. Short version of that path is below."
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
              Biomedical engineering at school. <em className="italic">Software</em> in my spare time. Then most of the time.
            </h3>
            <p className="max-w-md text-bone-300">
              Three short notes on the path. They explain why I tend to care about the things I care about.
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
