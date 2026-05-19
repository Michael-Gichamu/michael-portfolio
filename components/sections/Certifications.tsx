"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";
import { certifications } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Certifications() {
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

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {certifications.map((c, i) => (
            <motion.a
              key={c.title}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.7, ease, delay: i * 0.08 }}
              className="group block focus-visible:outline-none"
            >
              <GlassCard className="h-full p-6 sm:p-7 transition-transform duration-500 group-hover:-translate-y-1 group-focus-visible:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-accent/60">
                <div className="flex items-start justify-between">
                  <Seal color={c.accent} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300">
                    {c.year}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl text-balance text-bone-50">
                  {c.title}
                </h3>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  {c.issuer}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-bone-200">{c.blurb}</p>

                <div className="mt-6 h-px w-full bg-white/[0.06]" />
                <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300">
                  <span className="transition-colors group-hover:text-bone-100">
                    View certificate
                  </span>
                  <span className="text-bone-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-bone-50">
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

function Seal({ color }: { color: string }) {
  return (
    <div className="relative h-14 w-14">
      <motion.div
        className="absolute inset-0 rounded-full border"
        style={{ borderColor: color, opacity: 0.4 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-1.5 rounded-full border"
        style={{ borderColor: color, opacity: 0.7, borderStyle: "dashed" }}
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
      />
      <div className="absolute inset-3 flex items-center justify-center rounded-full bg-ink-900">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
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
