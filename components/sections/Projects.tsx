"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";
import Slideshow from "@/components/ui/Slideshow";
import { projects, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";

const medappointSlides = [
  { src: "/medappoint/01-home.png", label: "Home" },
  { src: "/medappoint/02-search.png", label: "Search" },
  { src: "/medappoint/03-filters.png", label: "Filters" },
  { src: "/medappoint/04-doctor-profile.png", label: "Doctor profile" },
  { src: "/medappoint/05-appointments.png", label: "Appointments" },
  { src: "/medappoint/06-schedule.png", label: "Practice schedule" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Projects() {
  return (
    <section id="work" className="section-pad relative">
      <div className="container-page">
        <SectionHeader
          index="02"
          kicker="Selected work"
          title={
            <>
              Software, AI, and{" "}
              <em className="italic text-gradient-accent">automation</em>.
            </>
          }
          description="A few projects from the last two years. The work spans frontend engineering, AI systems, and operational automation."
        />

        <div className="mt-16 space-y-24">
          {projects.map((p, i) => (
            <ProjectCase key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCase({ project, index }: { project: Project; index: number }) {
  const reverse = index % 2 === 1;
  const ref = useRef<HTMLElement>(null);

  // Scroll-tied parallax — visual moves slower than text
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);

  return (
    <article
      ref={ref}
      className={cn(
        "grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-20",
        reverse && "lg:[&>*:first-child]:order-2"
      )}
    >
      {/* Visual with parallax */}
      <motion.div
        style={{ y: visualY }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 1, ease }}
        className="will-change-transform"
      >
        <ProjectVisual project={project} />
      </motion.div>

      {/* Copy with subtle parallax */}
      <motion.div
        style={{ y: textY }}
        className="flex flex-col gap-6 will-change-transform"
      >
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-300">
          <span className="text-accent">{project.index}</span>
          <span className="h-px w-6 bg-white/15" />
          <span>{project.tag}</span>
          <span className="ml-auto">{project.year}</span>
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.8, ease, delay: 0.05 }}
          className="font-display text-4xl text-balance text-bone-50 sm:text-5xl"
        >
          {project.title}
        </motion.h3>

        <p className="max-w-xl leading-relaxed text-bone-200">{project.description}</p>

        <div className="rounded-xl border border-accent/25 bg-accent/[0.06] px-4 py-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
            Impact
          </div>
          <div className="mt-1 text-[15px] text-bone-50">{project.impact}</div>
        </div>

        <ul className="grid grid-cols-1 gap-2 text-sm text-bone-200 sm:grid-cols-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 leading-relaxed">
              <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-2 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/8 bg-white/[0.02] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-bone-200"
            >
              {s}
            </span>
          ))}
        </div>
      </motion.div>
    </article>
  );
}

/* ── Visual variants ────────────────────────────────────────────────── */

function ProjectVisual({ project }: { project: Project }) {
  // MedAppoint shows real product screenshots in a slideshow — no synthetic mockup.
  if (project.visual === "medtech") {
    return (
      <div className="w-full">
        <Slideshow items={medappointSlides} caption="MedAppoint · UI" />
      </div>
    );
  }

  return (
    <GlassCard className="aspect-[5/4] p-8 sm:p-10">
      <div className="absolute inset-0 mesh-bg opacity-60" />
      <div className="absolute inset-0 stroke-grid opacity-50" />
      <div className="relative flex h-full flex-col justify-between">
        {project.visual === "ai-graph" && <AiGraphVisual />}
        {project.visual === "automation" && <AutomationVisual />}
      </div>
    </GlassCard>
  );
}

type LabelSide = "right" | "left" | "above" | "below";

function AiGraphVisual() {
  const nodes: Array<{
    id: string;
    label: string;
    x: number;
    y: number;
    side: LabelSide;
  }> = [
    { id: "in", label: "Symptom intake", x: 14, y: 78, side: "right" },
    { id: "route", label: "Router", x: 36, y: 50, side: "above" },
    { id: "diag", label: "Diagnose", x: 60, y: 22, side: "above" },
    { id: "verify", label: "Verify", x: 60, y: 78, side: "below" },
    { id: "out", label: "Action plan", x: 84, y: 50, side: "left" },
  ];
  const edges: Array<[string, string]> = [
    ["in", "route"],
    ["route", "diag"],
    ["route", "verify"],
    ["diag", "out"],
    ["verify", "out"],
  ];
  const pos = Object.fromEntries(nodes.map((n) => [n.id, n]));

  const labelClass = (side: LabelSide) => {
    switch (side) {
      case "right":
        return "left-3 top-1/2 -translate-y-1/2";
      case "left":
        return "right-3 top-1/2 -translate-y-1/2";
      case "above":
        return "left-1/2 -translate-x-1/2 bottom-full mb-2";
      case "below":
        return "left-1/2 -translate-x-1/2 top-full mt-2";
    }
  };

  return (
    <>
      <header className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300">
          LangGraph / diagnostic-pipeline
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300">
          5 nodes · 5 edges
        </span>
      </header>

      <div className="relative my-3 min-h-[180px] flex-1">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
        >
          {edges.map(([a, b], i) => (
            <g key={`${a}-${b}`}>
              <line
                x1={pos[a].x}
                y1={pos[a].y}
                x2={pos[b].x}
                y2={pos[b].y}
                stroke="rgba(91,140,255,0.45)"
                strokeWidth="0.3"
                vectorEffect="non-scaling-stroke"
              />
              <circle r="0.9" fill="#9CBEFF">
                <animateMotion
                  dur={`${2.4 + i * 0.2}s`}
                  begin={`${i * 0.4}s`}
                  repeatCount="indefinite"
                  path={`M ${pos[a].x},${pos[a].y} L ${pos[b].x},${pos[b].y}`}
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  dur={`${2.4 + i * 0.2}s`}
                  begin={`${i * 0.4}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))}
        </svg>

        {nodes.map((n) => (
          <div
            key={n.id}
            className="absolute h-0 w-0"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            {/* Dot exactly on (x, y) */}
            <div className="absolute -left-[5px] -top-[5px]">
              <span className="absolute -inset-1 rounded-full bg-accent/25 blur-md" />
              <span className="relative block h-2.5 w-2.5 rounded-full bg-accent" />
            </div>
            {/* Label oriented inward */}
            <div
              className={cn(
                "absolute whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] text-bone-200",
                labelClass(n.side)
              )}
            >
              {n.label}
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-auto grid grid-cols-3 gap-3 border-t border-white/8 pt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300">
        <div>
          before <span className="block text-bone-100">18 min</span>
        </div>
        <div>
          after <span className="block text-accent">3 min</span>
        </div>
        <div>
          gain <span className="block text-bone-100">6×</span>
        </div>
      </footer>
    </>
  );
}

function AutomationVisual() {
  const lanes = [
    { label: "Telegram intake", color: "from-accent/60 to-accent/0" },
    { label: "Validation", color: "from-bone-100/40 to-bone-100/0" },
    { label: "Google Sheets sync", color: "from-accent/60 to-accent/0" },
  ];
  return (
    <>
      <header className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300">
          n8n / finance-pipeline
        </span>
        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300">
          0 errors / 30d
        </span>
      </header>

      <div className="my-6 space-y-3">
        {lanes.map((l, i) => (
          <div key={l.label}>
            <div className="mb-1 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300">
              <span>{l.label}</span>
              <span className="text-bone-100">stream {i + 1}</span>
            </div>
            <div className="relative h-2 overflow-hidden rounded-full bg-white/6">
              <motion.span
                className={`absolute inset-y-0 left-0 w-1/3 rounded-full bg-gradient-to-r ${l.color}`}
                animate={{ x: ["-30%", "230%"] }}
                transition={{
                  duration: 3.6 + i * 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-auto grid grid-cols-3 gap-3 border-t border-white/8 pt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300">
        <div>
          before <span className="block text-bone-100">15 min</span>
        </div>
        <div>
          after <span className="block text-accent">&lt; 1 min</span>
        </div>
        <div>
          reduction <span className="block text-bone-100">90%</span>
        </div>
      </footer>
    </>
  );
}
