"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SlideshowItem {
  src: string;
  label: string;
}

interface SlideshowProps {
  items: SlideshowItem[];
  className?: string;
  /** ms between auto-advances. Pass 0 to disable. */
  interval?: number;
  caption?: string;
  /** "cover" crops to fill (good for tall UI shots); "contain" shows the whole
   * image letterboxed (good for wide desktop screenshots). Defaults to "cover". */
  fit?: "cover" | "contain";
}

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Slideshow — crossfades through a set of product screenshots with subtle
 * scale, paused on hover. Dot navigation lets the user step manually.
 */
export default function Slideshow({
  items,
  className,
  interval = 4000,
  caption,
  fit = "cover",
}: SlideshowProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!interval || paused || items.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [interval, paused, items.length]);

  if (items.length === 0) return null;
  const current = items[index];

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden",
        className
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Frame */}
      <div className="relative aspect-[5/4] w-full overflow-hidden rounded-xl border border-white/[0.08] bg-ink-900">
        <AnimatePresence mode="sync">
          <motion.div
            key={current.src}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.9, ease }}
            className="absolute inset-0"
          >
            <Image
              src={current.src}
              alt={current.label}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={fit === "contain" ? "object-contain" : "object-cover"}
              priority={index === 0}
            />
            {/* Bottom gradient for caption legibility */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-950/85 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Caption */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-4 py-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-200">
            {current.label}
          </span>
          <span className="font-mono text-[10px] tabular-nums text-bone-300">
            {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
        </div>

        {/* Top gradient overlay for premium feel */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-ink-950/40 to-transparent" />
      </div>

      {/* Dot navigation */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-1.5" aria-label="Slideshow navigation">
          {items.map((it, i) => (
            <button
              key={it.src}
              onClick={() => setIndex(i)}
              aria-label={`Show ${it.label}`}
              className={cn(
                "h-1 rounded-full transition-all duration-500",
                i === index ? "w-8 bg-accent" : "w-4 bg-white/15 hover:bg-white/30"
              )}
            />
          ))}
        </div>
        {caption && (
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300">
            {caption}
          </span>
        )}
      </div>
    </div>
  );
}
