"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { experiences } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="section-pad relative">
      <div className="container-page">
        <SectionHeader
          index="04"
          kicker="Experience"
          title={
            <>
              Where I've{" "}
              <em className="italic text-gradient-accent">worked</em>.
            </>
          }
          description="Short list, four teams, four very different setups. A few notes on what the work actually was."
        />

        <div ref={ref} className="relative mt-14">
          {/* Vertical line */}
          <div className="absolute left-3 top-0 hidden h-full w-px bg-white/[0.08] md:left-[120px] md:block" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-3 top-0 hidden w-px bg-gradient-to-b from-accent via-bone-100/70 to-transparent md:left-[120px] md:block"
          />

          <ul className="space-y-12">
            {experiences.map((e, i) => (
              <motion.li
                key={e.company}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.8, ease, delay: i * 0.05 }}
                className="relative grid grid-cols-1 gap-6 pl-10 md:grid-cols-[120px_1fr] md:gap-12 md:pl-0"
              >
                {/* Period column */}
                <div className="md:relative md:flex md:items-start md:justify-end md:pr-10">
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-300">
                    {e.period}
                  </div>
                </div>

                {/* Node */}
                <span className="absolute left-2 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_0_6px_rgba(91,140,255,0.12)] md:left-[120px]" />

                {/* Content */}
                <div className="md:pl-12">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="font-display text-3xl text-bone-50 sm:text-4xl">
                      {e.company}
                    </h3>
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-300">
                      {e.location}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-accent">{e.role}</p>
                  <p className="mt-4 max-w-2xl leading-relaxed text-bone-200">
                    {e.summary}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {e.outcomes.map((o) => (
                      <li
                        key={o}
                        className="rounded-full border border-white/8 bg-white/[0.02] px-3 py-1.5 text-xs text-bone-200"
                      >
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
