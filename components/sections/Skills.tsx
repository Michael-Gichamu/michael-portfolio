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
          description="Grouped by what I use them for. Not exhaustive: these are the ones I reach for most weeks."
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
            {/* Emil: blur bridges the visual gap during crossfade. Exit via variants so
                each state can carry its own duration — exit is faster than enter. */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                variants={{
                  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
                  visible: {
                    opacity: 1, y: 0, filter: "blur(0px)",
                    transition: { duration: 0.38, ease: [0.23, 1, 0.32, 1] },
                  },
                  exit: {
                    opacity: 0, y: -6, filter: "blur(3px)",
                    transition: { duration: 0.16, ease: "easeIn" as const },
                  },
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                  {active.name}
                </p>
                <h3 className="mt-2 font-display text-3xl text-balance text-bone-50 sm:text-4xl">
                  {active.blurb}
                </h3>

                {/* Emil: stagger 30-80ms between items, not 50ms+ per item which feels sluggish */}
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {active.skills.map((s, i) => (
                    <motion.div
                      key={s.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 + i * 0.04, duration: 0.4, ease }}
                      className="group rounded-xl border border-white/[0.06] bg-ink-900/60 p-4 transition-[border-color,box-shadow] duration-200 hover:border-accent/40 hover:shadow-[inset_0_1px_0_rgba(91,140,255,0.08)]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-bone-50">{s.name}</span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300">
                          {Math.round(s.level * 100)}
                        </span>
                      </div>
                      {/* Emil: never animate `width` — it causes layout recalculation.
                          Use scaleX (GPU transform) inside a container that sets the visual width. */}
                      <div className="mt-3 h-px w-full overflow-hidden rounded-full bg-white/8">
                        <div style={{ width: `${s.level * 100}%` }}>
                          <motion.span
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            style={{ transformOrigin: "left" }}
                            transition={{
                              delay: 0.12 + i * 0.04,
                              duration: 0.9,
                              ease: [0.23, 1, 0.32, 1],
                            }}
                            className="block h-px bg-gradient-to-r from-accent via-bone-100/80 to-accent"
                          />
                        </div>
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
