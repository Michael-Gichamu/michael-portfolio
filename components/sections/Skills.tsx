"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { skillCategories } from "@/lib/data";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Skills() {
  const [activeId, setActiveId] = useState(skillCategories[0].id);
  const active = skillCategories.find((c) => c.id === activeId)!;

  return (
    <section id="skills" className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-fade opacity-50" />

      <div className="container-page">
        <SectionHeader
          index="03"
          kicker="Tools"
          title={
            <>
              The tools I{" "}
              <em className="italic text-gradient-accent">actually use</em>.
            </>
          }
          description="Grouped by what I use them for. Not exhaustive — these are the ones I reach for most weeks."
        />

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr]">
          {/* Category list */}
          <div className="flex flex-col">
            {skillCategories.map((c, i) => {
              const isActive = c.id === activeId;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className={cn(
                    "group relative flex items-baseline justify-between border-b border-white/[0.06] py-5 text-left transition-colors duration-300",
                    isActive ? "text-bone-50" : "text-bone-300 hover:text-bone-100"
                  )}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-2xl">{c.name}</span>
                  </span>
                  <motion.span
                    aria-hidden
                    initial={false}
                    animate={{ width: isActive ? "100%" : "0%" }}
                    transition={{ duration: 0.6, ease }}
                    className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-accent via-bone-100 to-transparent"
                  />
                </button>
              );
            })}
          </div>

          {/* Active panel */}
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 sm:p-10">
            <div className="absolute inset-0 mesh-bg opacity-40" />
            <div className="absolute inset-0 stroke-grid opacity-40" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease }}
                className="relative"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                  {active.name}
                </p>
                <h3 className="mt-2 font-display text-3xl text-balance text-bone-50 sm:text-4xl">
                  {active.blurb}
                </h3>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {active.skills.map((s, i) => (
                    <motion.div
                      key={s.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease }}
                      className="group rounded-xl border border-white/[0.06] bg-ink-900/60 p-4 transition-colors hover:border-accent/40"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-bone-50">{s.name}</span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300">
                          {Math.round(s.level * 100)}
                        </span>
                      </div>
                      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/6">
                        <motion.span
                          initial={{ width: 0 }}
                          animate={{ width: `${s.level * 100}%` }}
                          transition={{
                            delay: 0.15 + i * 0.05,
                            duration: 1.1,
                            ease,
                          }}
                          className="block h-full bg-gradient-to-r from-accent via-bone-100 to-accent"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
