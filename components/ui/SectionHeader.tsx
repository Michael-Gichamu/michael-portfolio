"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  index: string;
  kicker: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

const ease = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, margin: "-15% 0px" } as const;

/**
 * SectionHeader — three-stage cinematic reveal:
 *   1. Eyebrow: index, animated rule that scales in, and kicker label.
 *   2. Title: clip-path mask reveal, like a film title card.
 *   3. Description: late, quiet fade up.
 *
 * Uses direct `initial` props (not variants) so SSR/CSR render identically
 * and hydration stays clean.
 */
export default function SectionHeader({
  index,
  kicker,
  title,
  description,
  className,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-7",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {/* Eyebrow */}
      <div
        className={cn(
          "flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-bone-300",
          align === "center" && "justify-center"
        )}
      >
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6, ease }}
          className="text-accent"
        >
          {index}
        </motion.span>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease, delay: 0.08 }}
          className="h-px w-12 origin-left bg-white/20"
        />
        <motion.span
          initial={{ opacity: 0, x: -6 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewport}
          transition={{ duration: 0.55, ease, delay: 0.16 }}
        >
          {kicker}
        </motion.span>
      </div>

      {/* Title — slides up from beneath a crop edge.
          pb-[0.3em] gives descenders (y, g, p) room so they're never clipped. */}
      <div className="overflow-hidden pb-[0.3em]">
        <motion.h2
          initial={{ y: "100%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1], delay: 0.18 }}
          className="text-display-md text-balance text-gradient max-w-3xl"
        >
          {title}
        </motion.h2>
      </div>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.75, ease, delay: 0.42 }}
          className="max-w-2xl text-base leading-relaxed text-bone-300 sm:text-[17px]"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
