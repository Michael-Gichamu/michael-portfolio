"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-bone-300/80"
    >
      <span>Scroll</span>
      <div className="relative h-10 w-px overflow-hidden bg-white/12">
        <span className="absolute inset-x-[-0.5px] top-0 h-3 animate-scroll-cue bg-bone-100" />
      </div>
    </motion.div>
  );
}
