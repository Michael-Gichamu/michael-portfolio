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
            rel="noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.7, ease }}
            className="group block focus-visible:outline-none md:row-span-2"
          >
            <GlassCard className="flex h-full flex-col justify-between p-7 sm:p-9 transition-transform duration-300 group-hover:-translate-y-1 group-active:scale-[0.99] group-focus-visible:ring-2 group-focus-visible:ring-accent/60">
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
              rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.7, ease, delay: (i + 1) * 0.07 }}
              className="group block focus-visible:outline-none"
            >
              <GlassCard className="h-full p-6 transition-transform duration-300 group-hover:-translate-y-0.5 group-active:scale-[0.99] group-focus-visible:ring-2 group-focus-visible:ring-accent/60">
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
