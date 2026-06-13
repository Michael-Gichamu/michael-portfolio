"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
              className="group -ml-3 flex items-center gap-2.5"
              aria-label="Michael Gichamu — home"
            >
              <Image
                src="/aia-logo.png"
                alt="Michael Gichamu logo"
                width={36}
                height={36}
                priority
                className="h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-bone-200 sm:inline">
                Michael Gichamu
              </span>
            </a>

            <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="group relative rounded-full px-4 py-2 text-sm text-bone-200 transition-colors duration-150 hover:text-bone-50"
                >
                  {n.label}
                  {/* Underline that scales in from left on hover */}
                  <span className="absolute bottom-1.5 left-4 right-4 h-px origin-left scale-x-0 bg-accent/60 transition-transform duration-200 ease-out group-hover:scale-x-100" />
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

      {/* Mobile menu — clips in from top-right corner */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0 round 0px)" }}
            animate={{ clipPath: "inset(0 0 0% 0 round 0px)" }}
            exit={{ clipPath: "inset(0 100% 0 0 round 0px)" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-ink-950 md:hidden"
            onClick={() => setOpen(false)}
          >
            {/* Subtle noise layer */}
            <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.03]" />

            {/* Vertical accent strip */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
              style={{ transformOrigin: "top" }}
              className="absolute left-6 top-24 h-[55vh] w-px bg-gradient-to-b from-accent/60 via-accent/20 to-transparent sm:left-10"
            />

            <nav className="container-page flex h-full flex-col justify-center gap-1 pt-16">
              {nav.map((n, i) => (
                <div key={n.href} className="overflow-hidden py-1">
                  <motion.a
                    href={n.href}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{
                      y: "0%",
                      opacity: 1,
                      transition: {
                        delay: 0.18 + i * 0.07,
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }}
                    exit={{
                      y: "110%",
                      opacity: 0,
                      transition: {
                        delay: i * 0.03,
                        duration: 0.25,
                        ease: [0.76, 0, 0.24, 1],
                      },
                    }}
                    className="group flex items-baseline gap-5 font-display text-[11vw] leading-none text-bone-50 sm:text-6xl"
                    onClick={() => setOpen(false)}
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent opacity-70 transition-opacity group-hover:opacity-100">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="transition-[color,transform] duration-200 group-hover:translate-x-1 group-hover:text-bone-50/70">
                      {n.label}
                    </span>
                  </motion.a>
                </div>
              ))}

              {/* Contact info — slides up after links */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.18 + nav.length * 0.07 + 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="mt-12 flex flex-col gap-1 pl-[calc(11px+20px)] font-mono text-xs uppercase tracking-[0.2em] text-bone-400 sm:pl-[calc(11px+20px)]"
              >
                <span>{profile.email}</span>
                <span>{profile.location}</span>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
