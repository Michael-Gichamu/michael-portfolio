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
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.7, ease }}
        className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-300"
      >
        <span className="text-accent">{index}</span>
        <span className="h-px w-8 bg-white/15" />
        <span>{kicker}</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.8, ease, delay: 0.06 }}
        className="text-display-md text-balance text-gradient max-w-3xl"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.7, ease, delay: 0.14 }}
          className="max-w-2xl text-balance text-base leading-relaxed text-bone-300 sm:text-lg"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
