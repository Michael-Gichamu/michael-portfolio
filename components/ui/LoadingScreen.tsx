"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1400;

    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 2.5);
      setProgress(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => setVisible(false), 320);
      }
    };

    if (document.readyState === "complete") {
      raf = requestAnimationFrame(tick);
    } else {
      const onLoad = () => (raf = requestAnimationFrame(tick));
      window.addEventListener("load", onLoad, { once: true });
      // Fallback safety net
      setTimeout(() => (raf ||= requestAnimationFrame(tick)), 400);
      return () => window.removeEventListener("load", onLoad);
    }
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[200] flex items-end justify-between bg-ink-950 p-6 sm:p-10"
        >
          {/* Name + tagline */}
          <div className="flex flex-col gap-3 overflow-hidden">
            <motion.span
              initial={{ y: "120%", opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-300"
            >
              Michael Gichamu · Profile
            </motion.span>
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0, transition: { delay: 0.2, duration: 0.75, ease: [0.22, 1, 0.36, 1] } }}
                className="block font-display text-3xl italic text-bone-100 sm:text-4xl"
              >
                One moment.
              </motion.span>
            </div>
          </div>

          {/* Progress counter + bar */}
          <div className="flex w-full max-w-[260px] flex-col items-end gap-3">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.4 } }}
              className="font-mono text-[11px] tabular-nums text-bone-300"
            >
              {progress.toString().padStart(3, "0")} / 100
            </motion.span>
            <div className="relative h-px w-full overflow-hidden bg-white/10">
              <motion.div
                className="absolute inset-y-0 left-0 origin-left bg-gradient-to-r from-accent via-bone-100 to-accent"
                style={{ scaleX: progress / 100, transformOrigin: "left" }}
                transition={{ ease: "easeOut", duration: 0.18 }}
              />
            </div>
          </div>

          {/* Background texture */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 mesh-bg opacity-40" />
            <div className="absolute inset-0 bg-noise opacity-[0.04]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
