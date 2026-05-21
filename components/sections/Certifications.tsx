"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";
import { certifications } from "@/lib/data";

// Taste Skill: NO generic 3-column equal cards — banned. Use asymmetric grid:
// one featured card left (spans full height), two compact cards stacked right.
// Emil: hover transition ≤300ms; add active:scale feedback on pressable elements.
const ease = [0.23, 1, 0.32, 1] as const;

export default function Certifications() {
  const [featured, ...rest] = certifications;

  return (
    <section id="credentials" className="section-pad relative">
      <div className="container-page">
        <SectionHeader
          index="05"
          kicker="Training"
          title={
            <>
              Training and{" "}
              <em className="italic text-gradient-accent">credentials</em>.
            </>
          }
          description="Programs that actually changed how I work. Verifiable, if you want to follow the links."
        />

        {/* Asymmetric 2-col grid: featured card left, 2 compact cards stacked right */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* Featured — spans both rows on md+ */}
          <motion.a
            href={featured.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, clipPath: "inset(0 100% 0 0 round 16px)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0 round 16px)" }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.85, ease }}
            className="group block focus-visible:outline-none md:row-span-2"
          >
            <GlassCard tilt className="flex h-full flex-col justify-between p-7 sm:p-9 group-active:scale-[0.99] group-focus-visible:ring-2 group-focus-visible:ring-accent/60">
              {/* Top */}
              <div>
                <div className="flex items-start justify-between">
                  <Seal color={featured.accent} size="lg" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300">
                    {featured.year}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-3xl text-balance text-bone-50 sm:text-4xl">
                  {featured.title}
                </h3>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  {featured.issuer}
                </p>
                <p className="mt-5 text-[15px] leading-relaxed text-bone-200">
                  {featured.blurb}
                </p>

                {/* Coding visual — mini 3-D floating editor */}
                <CertCodeVisual />
              </div>

              {/* Bottom — verify link row */}
              <div>
                <div className="mt-8 h-px w-full bg-white/[0.06]" />
                <div className="mt-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300">
                  <span className="transition-colors duration-200 group-hover:text-bone-100">
                    View certificate
                  </span>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-bone-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-accent/30 group-hover:text-bone-50">
                    ↗
                  </span>
                </div>
              </div>
            </GlassCard>
          </motion.a>

          {/* Two compact cards stacked */}
          {rest.map((c, i) => (
            <motion.a
              key={c.title}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, clipPath: "inset(100% 0 0 0 round 16px)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0% 0 0 0 round 16px)" }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.7, ease, delay: 0.12 + i * 0.1 }}
              className="group block focus-visible:outline-none"
            >
              <GlassCard tilt className="h-full p-6 group-active:scale-[0.99] group-focus-visible:ring-2 group-focus-visible:ring-accent/60">
                <div className="flex items-start justify-between">
                  <Seal color={c.accent} size="sm" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300">
                    {c.year}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl text-balance text-bone-50">
                  {c.title}
                </h3>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  {c.issuer}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-bone-200">{c.blurb}</p>
                <div className="mt-5 h-px w-full bg-white/[0.06]" />
                <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300">
                  <span className="transition-colors duration-200 group-hover:text-bone-100">
                    View certificate
                  </span>
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-bone-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-accent/30 group-hover:text-bone-50">
                    ↗
                  </span>
                </div>
              </GlassCard>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Certificate coding visual ─────────────────────────────────────────── */

/**
 * A 3-D perspective-tilted mini code editor that lives inside the
 * ALX featured certificate card. Shows a TypeScript full-stack snippet
 * with syntax highlighting + a gentle float animation.
 */
function CertCodeVisual() {
  return (
    <motion.div
      className="mt-7 select-none"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transform: "perspective(800px) rotateX(3deg) rotateY(-5deg)" }}
      >
        {/* Editor chrome */}
        <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-ink-950/90 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]">
          {/* Title bar */}
          <div className="flex items-center gap-1.5 border-b border-white/[0.05] bg-ink-900/60 px-3.5 py-2">
            <span className="h-2 w-2 rounded-full bg-red-500/70" />
            <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
            <span className="h-2 w-2 rounded-full bg-green-500/70" />
            <span className="ml-2.5 font-mono text-[9px] uppercase tracking-[0.18em] text-bone-400">
              AppointmentCard.tsx
            </span>
            <span className="ml-auto flex items-center gap-1">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              <span className="font-mono text-[8px] text-emerald-400">compiled</span>
            </span>
          </div>

          {/* Code lines */}
          <div className="space-y-0 px-3.5 py-3">
            {[
              [
                <span key="k" className="text-[#7AA5FF]">import </span>,
                <span key="b" className="text-bone-200">{"{ useState } "}</span>,
                <span key="k2" className="text-[#7AA5FF]">from </span>,
                <span key="s" className="text-[#A3BE8C]">&quot;react&quot;</span>,
              ],
              [],
              [
                <span key="k" className="text-[#7AA5FF]">export default function </span>,
                <span key="fn" className="text-[#9CBEFF]">AppointmentCard</span>,
                <span key="p" className="text-bone-200">{"({ doctor }) {"}</span>,
              ],
              [
                <span key="i" className="text-bone-200">{"  "}</span>,
                <span key="k" className="text-[#7AA5FF]">const </span>,
                <span key="v" className="text-bone-200">[booked, setBooked] = </span>,
                <span key="fn" className="text-[#9CBEFF]">useState</span>,
                <span key="p" className="text-bone-200">(</span>,
                <span key="b2" className="text-[#7AA5FF]">false</span>,
                <span key="cp" className="text-bone-200">)</span>,
              ],
              [
                <span key="sp" className="text-bone-200">{"  "}</span>,
                <span key="k" className="text-[#7AA5FF]">return </span>,
                <span key="p" className="text-bone-200">booked ? </span>,
                <span key="c" className="text-[#88C0D0]">{"<Confirmed />"}</span>,
                <span key="c2" className="text-bone-200"> : (</span>,
              ],
              [
                <span key="sp" className="text-bone-200">{"    "}</span>,
                <span key="c" className="text-[#88C0D0]">{"<BookButton "}</span>,
                <span key="p" className="text-[#9CBEFF]">onClick</span>,
                <span key="eq" className="text-bone-200">{"={() => "}</span>,
                <span key="fn" className="text-[#9CBEFF]">setBooked</span>,
                <span key="a" className="text-bone-200">{"(true)} />"}</span>,
              ],
              [<span key="c" className="text-bone-200">{"  )"}</span>],
              [<span key="c" className="text-bone-200">{"}"}</span>],
            ].map((tokens, i) => (
              <div key={i} className="flex gap-2.5 font-mono text-[10.5px] leading-[1.75]">
                <span className="w-4 flex-shrink-0 select-none text-right text-bone-400/35">
                  {i + 1}
                </span>
                <span>{tokens}</span>
              </div>
            ))}
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between border-t border-white/[0.04] bg-[#5b8cff]/[0.05] px-3.5 py-1.5 font-mono text-[8.5px] uppercase tracking-[0.15em]">
            <span className="text-bone-400">TypeScript · React</span>
            <span className="text-bone-400">Next.js · Tailwind</span>
            <span className="text-emerald-400">✓ 0 errors</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Seal({ color, size = "sm" }: { color: string; size?: "sm" | "lg" }) {
  const outer = size === "lg" ? "h-16 w-16" : "h-12 w-12";
  const inner1 = size === "lg" ? "inset-1.5" : "inset-1";
  const inner2 = size === "lg" ? "inset-3.5" : "inset-2.5";
  const iconSize = size === "lg" ? 18 : 14;

  return (
    <div className={`relative ${outer}`}>
      <motion.div
        className="absolute inset-0 rounded-full border"
        style={{ borderColor: color, opacity: 0.4 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
      />
      <motion.div
        className={`absolute ${inner1} rounded-full border`}
        style={{ borderColor: color, opacity: 0.7, borderStyle: "dashed" }}
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
      />
      <div
        className={`absolute ${inner2} flex items-center justify-center rounded-full bg-ink-900`}
      >
        <svg width={iconSize} height={iconSize} viewBox="0 0 18 18" fill="none">
          <path
            d="M3 9.5l3.5 3.5L15 5"
            stroke={color}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
