"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { nav, profile } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "pt-3" : "pt-5"
        )}
      >
        <div className="container-page">
          <div
            className={cn(
              "flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500",
              scrolled
                ? "border border-white/10 bg-ink-950/85 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl backdrop-saturate-150"
                : "border border-transparent"
            )}
          >
            <a
              href="#top"
              className="group flex items-center gap-2.5 px-2"
              aria-label="Michael Gichamu — home"
            >
              <span className="relative flex h-7 w-7 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-gradient-to-br from-accent via-bone-100 to-accent opacity-90 blur-[0.5px]" />
                <span className="absolute inset-[2px] rounded-full bg-ink-950" />
                <span className="relative font-display text-sm italic text-bone-50">m</span>
              </span>
              <span className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-bone-200 sm:inline">
                Michael Gichamu
              </span>
            </a>

            <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="rounded-full px-4 py-2 text-sm text-bone-200 transition-colors hover:text-bone-50"
                >
                  {n.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-bone-50 px-4 py-2 text-sm text-ink-950 transition-colors hover:bg-white"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/60" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                Available
              </a>
            </div>

            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((s) => !s)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-bone-100 md:hidden"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d={open ? "M3 3L13 13M13 3L3 13" : "M2 5h12M2 11h12"}
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ink-950/95 backdrop-blur-xl md:hidden"
            onClick={() => setOpen(false)}
          >
            <nav className="container-page flex h-full flex-col justify-center gap-2 pt-20">
              {nav.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.05 + i * 0.05, duration: 0.45 },
                  }}
                  className="font-display text-5xl text-bone-50"
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </motion.a>
              ))}
              <div className="mt-10 flex flex-col gap-1 font-mono text-xs uppercase tracking-[0.2em] text-bone-300">
                <span>{profile.email}</span>
                <span>{profile.location}</span>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
