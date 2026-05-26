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

const ease = [0.23, 1, 0.32, 1] as const;

export default function Projects() {
  return (
    <section id="work" className="section-pad relative">
      <div className="container-page">
        <SectionHeader
          index="02"
          kicker="Selected work"
          title={
            <>
              Three projects,{" "}
              <em className="italic text-gradient-accent">real results</em>.
            </>
          }
          description="Diagnostic systems, appointment platforms, field automation. Each one cut real time off a real workflow."
        />

        <div className="mt-10 space-y-16">
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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["-1.5%", "1.5%"]);

  return (
    <article
      ref={ref}
      className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16"
    >
      {/* Copy — mobile: first (above demo); desktop: col position varies with reverse */}
      <motion.div
        style={{ y: textY }}
        initial={{ opacity: 0, x: reverse ? -24 : 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        className={cn(
          "order-1 flex flex-col gap-5 will-change-transform",
          reverse ? "lg:order-1" : "lg:order-2"
        )}
      >
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-300">
          <span className="text-accent">{project.index}</span>
          <span className="h-px w-6 bg-white/15" />
          <span>{project.tag}</span>
          <span className="ml-auto">{project.year}</span>
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 0.7, ease, delay: 0.06 }}
          className="font-display text-4xl text-balance text-bone-50 sm:text-5xl"
        >
          {project.title}
        </motion.h3>

        <p className="max-w-xl text-[15px] leading-relaxed text-bone-200">
          {project.description}
        </p>

        {/* Impact pill */}
        <div className="rounded-xl border border-accent/25 bg-accent/[0.06] px-4 py-3 shadow-[inset_0_1px_0_rgba(91,140,255,0.12)]">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
            Result
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

        <div className="mt-1 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-bone-200 transition-[border-color,background-color] duration-200 hover:border-accent/30 hover:bg-accent/[0.06]"
            >
              {s}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Visual — mobile: second (below copy); desktop: col position varies with reverse */}
      <motion.div
        style={{ y: visualY }}
        initial={{ opacity: 0, clipPath: "inset(100% 0 0 0 round 16px)" }}
        whileInView={{ opacity: 1, clipPath: "inset(0% 0 0 0 round 16px)" }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "order-2 will-change-transform",
          reverse ? "lg:order-2" : "lg:order-1"
        )}
      >
        <ProjectVisual project={project} />
      </motion.div>
    </article>
  );
}

/* ─── Visual variants ───────────────────────────────────────────────────── */

function ProjectVisual({ project }: { project: Project }) {
  if (project.visual === "medtech") {
    return (
      <div className="w-full">
        <Slideshow items={medappointSlides} caption="MedAppoint · UI" />
      </div>
    );
  }

  return (
    <GlassCard tilt className="overflow-hidden p-0">
      {/* Terminal chrome bar */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-ink-900/80 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-300">
          {project.visual === "ai-graph"
            ? "diagnostic-pipeline · active"
            : "finance-automation · running"}
        </span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-400">
            live
          </span>
        </span>
      </div>

      <div className="p-5 sm:p-7">
        {project.visual === "ai-graph" && <AiDiagnosticVisual />}
        {project.visual === "automation" && <AutomationVisual />}
      </div>
    </GlassCard>
  );
}

/* ─── AI Diagnostic: rich terminal-style panel ──────────────────────── */
function AiDiagnosticVisual() {
  const steps = [
    { id: "intake",   label: "Symptom intake",    status: "done",    time: "0.2s"  },
    { id: "classify", label: "Fault classification", status: "done", time: "0.8s"  },
    { id: "diagnose", label: "LLM diagnosis",      status: "active",  time: "1.4s"  },
    { id: "verify",   label: "Operator confirm",   status: "waiting", time: "--"    },
    { id: "action",   label: "Action plan",        status: "waiting", time: "--"    },
  ];

  const edges = [
    { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4 },
  ];

  return (
    <div className="space-y-5">
      {/* Pipeline graph */}
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-[11px] top-4 h-[calc(100%-2rem)] w-px bg-white/[0.06]" />
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: "60%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
          className="absolute left-[11px] top-4 w-px origin-top bg-gradient-to-b from-accent to-accent/0"
        />

        <ul className="space-y-3">
          {steps.map((step, i) => (
            <motion.li
              key={step.id}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease, delay: 0.1 + i * 0.08 }}
              className="relative flex items-center gap-4 pl-8"
            >
              {/* Node dot */}
              <span
                className={cn(
                  "absolute left-0 flex h-[23px] w-[23px] items-center justify-center rounded-full border",
                  step.status === "done"
                    ? "border-accent/60 bg-accent/15"
                    : step.status === "active"
                    ? "border-accent bg-accent/20 shadow-[0_0_12px_rgba(91,140,255,0.4)]"
                    : "border-white/[0.1] bg-white/[0.03]"
                )}
              >
                {step.status === "done" && (
                  <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 2.5" stroke="#5B8CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {step.status === "active" && (
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                )}
                {step.status === "waiting" && (
                  <span className="h-1 w-1 rounded-full bg-bone-400/40" />
                )}
              </span>

              <span
                className={cn(
                  "flex-1 text-[13px]",
                  step.status === "done"
                    ? "text-bone-200"
                    : step.status === "active"
                    ? "font-medium text-bone-50"
                    : "text-bone-400"
                )}
              >
                {step.label}
              </span>

              <span className="font-mono text-[10px] text-bone-400">
                {step.time}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Streaming output */}
      <div className="rounded-lg border border-white/[0.06] bg-ink-950/70 px-4 py-3">
        <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-bone-400">
          llm output · streaming
        </p>
        <div className="font-mono text-[12px] leading-relaxed text-bone-200">
          <TypewriterLine
            text="Fault pattern matches: power-supply undervoltage on Module B."
            delay={0.6}
          />
          <TypewriterLine
            text="Recommended: check rail voltage at TP7. Expected 12V, likely 9–10V."
            delay={1.4}
          />
          <span className="inline-block h-3 w-0.5 animate-pulse bg-accent/70 align-middle" />
        </div>
      </div>

      {/* Metrics footer */}
      <div className="grid grid-cols-3 gap-3 border-t border-white/[0.06] pt-4 font-mono text-[10px] uppercase tracking-[0.2em]">
        <div className="text-bone-400">
          Before
          <span className="mt-0.5 block text-[13px] normal-case text-bone-100">18 min</span>
        </div>
        <div className="text-bone-400">
          After
          <span className="mt-0.5 block text-[13px] normal-case text-accent">3 min</span>
        </div>
        <div className="text-bone-400">
          Speed-up
          <span className="mt-0.5 block text-[13px] normal-case text-bone-100">6×</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Automation: workflow diagram ───────────────────────────────────── */
function AutomationVisual() {
  const nodes = [
    { icon: "✈", label: "Telegram", sub: "field operator", color: "text-sky-300" },
    { icon: "⟳", label: "Validate", sub: "format · range · dedup", color: "text-yellow-300" },
    { icon: "▦", label: "Sheets sync", sub: "idempotent write", color: "text-emerald-300" },
  ];

  return (
    <div className="space-y-5">
      {/* Node flow */}
      <div className="flex items-start gap-0">
        {nodes.map((node, i) => (
          <div key={node.label} className="flex flex-1 flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease, delay: 0.1 + i * 0.14 }}
              className="flex w-full flex-col items-center"
            >
              {/* Node box */}
              <div className="relative w-full max-w-[110px] rounded-xl border border-white/[0.08] bg-ink-900/70 px-3 py-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <div className={cn("text-xl leading-none", node.color)}>{node.icon}</div>
                <div className="mt-1.5 text-[12px] font-medium text-bone-50">{node.label}</div>
                <div className="mt-0.5 font-mono text-[9px] leading-tight text-bone-400">{node.sub}</div>

                {/* Live pulse on last node */}
                {i === 2 && (
                  <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                )}
              </div>

              {/* Arrow connector */}
              {i < nodes.length - 1 && (
                <div className="absolute" style={{ left: `${(i + 1) * 33.33}%`, top: "50%", transform: "translate(-50%, -50%)" }} />
              )}
            </motion.div>

            {/* Arrow between nodes */}
            {i < nodes.length - 1 && (
              <div className="flex w-full items-center justify-end pr-0">
                {/* handled by connector below */}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Connector arrows — drawn as a separate row for precision */}
      <div className="-mt-10 flex items-center">
        {nodes.map((_, i) => (
          <div key={i} className="flex flex-1 items-center justify-center">
            {i < nodes.length - 1 && (
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease, delay: 0.3 + i * 0.15 }}
                style={{ transformOrigin: "left" }}
                className="flex w-full items-center justify-end pr-2"
              >
                <div className="h-px flex-1 bg-gradient-to-r from-accent/40 to-accent/80" />
                <svg width="8" height="8" viewBox="0 0 8 8" className="text-accent/80 flex-shrink-0">
                  <path d="M1 4h6M4 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Live log */}
      <div className="mt-2 rounded-lg border border-white/[0.06] bg-ink-950/70 px-4 py-3">
        <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-bone-400">
          execution log · last 30d
        </p>
        <div className="space-y-1.5">
          {[
            { time: "09:14:03", msg: "Intake validated · operator @james_m", status: "ok" },
            { time: "09:14:04", msg: "Idempotency check passed · writing row 847", status: "ok" },
            { time: "09:14:04", msg: "Sheets sync complete · 0 duplicates", status: "ok" },
          ].map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
              className="flex gap-3 font-mono text-[11px]"
            >
              <span className="text-bone-400">{log.time}</span>
              <span className="text-emerald-400">✓</span>
              <span className="text-bone-200">{log.msg}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-3 border-t border-white/[0.06] pt-4 font-mono text-[10px] uppercase tracking-[0.2em]">
        <div className="text-bone-400">
          Before
          <span className="mt-0.5 block text-[13px] normal-case text-bone-100">15 min</span>
        </div>
        <div className="text-bone-400">
          After
          <span className="mt-0.5 block text-[13px] normal-case text-accent">&lt; 1 min</span>
        </div>
        <div className="text-bone-400">
          Errors / 30d
          <span className="mt-0.5 block text-[13px] normal-case text-bone-100">0</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Typewriter helper ─────────────────────────────────────────────── */
function TypewriterLine({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.01, delay }}
      className="block"
    >
      {text}
    </motion.span>
  );
}
