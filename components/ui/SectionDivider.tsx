"use client";

import { motion } from "framer-motion";

/**
 * A thin horizontal rule that draws across as it enters the viewport.
 * Sits between sections to create deliberate pacing — each section feels
 * like a separate scene rather than a continuous scroll.
 */
export default function SectionDivider() {
  return (
    <div className="container-page py-2">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="h-px w-full origin-left bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
    </div>
  );
}
