"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  spotlight?: boolean;
  intensity?: number;
}

/**
 * Premium glass surface with optional cursor-following spotlight.
 * Implemented with CSS custom properties — no React re-renders on mouse move.
 */
export default function GlassCard({
  className,
  children,
  spotlight = true,
  intensity = 0.22,
  ...rest
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!spotlight) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  };

  return (
    // Taste Skill: liquid glass = backdrop-blur + inner refraction border (inset shadow) + hairline outer border.
    // Emil: reduce all UI transitions to ≤300ms. 500ms felt sluggish.
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl glass",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
        "transition-[border-color,box-shadow,transform] duration-300",
        "hover:border-white/[0.15] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.13)]",
        className
      )}
      {...rest}
    >
      {spotlight && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(91,140,255,${intensity}), transparent 55%)`,
          }}
        />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}
