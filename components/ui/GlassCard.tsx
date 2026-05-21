"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  spotlight?: boolean;
  tilt?: boolean;
  intensity?: number;
}

/**
 * Premium glass surface with optional cursor-following spotlight and 3-D tilt.
 * Mouse effects are driven by direct DOM style mutations — zero React re-renders.
 */
export default function GlassCard({
  className,
  children,
  spotlight = true,
  tilt = false,
  intensity = 0.22,
  ...rest
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (spotlight) {
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    }

    if (tilt) {
      const rotX = (0.5 - y / 100) * 7;  // ±3.5 deg
      const rotY = (x / 100 - 0.5) * 7;
      // Use a very short transition so tilt tracks cursor smoothly
      el.style.transition = "transform 60ms linear, border-color 300ms, box-shadow 300ms";
      el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-2px)`;
    }
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    if (tilt) {
      // Ease back to flat with a smooth spring feel
      el.style.transition = "transform 400ms cubic-bezier(0.22, 1, 0.36, 1), border-color 300ms, box-shadow 300ms";
      el.style.transform = "";
    }
  };

  return (
    // Taste Skill: liquid glass = backdrop-blur + inner refraction border (inset shadow) + hairline outer border.
    // Emil: reduce all UI transitions to ≤300ms. 500ms felt sluggish.
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(
        "group relative overflow-hidden rounded-2xl glass",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
        tilt
          // Tilt cards: JS manages transform transition directly; only CSS-transition the shadow/border
          ? "transition-[border-color,box-shadow] duration-300 hover:border-white/[0.15] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.13),0_24px_60px_-16px_rgba(0,0,0,0.55)]"
          : "transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-white/[0.15] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.13),0_20px_60px_-16px_rgba(0,0,0,0.5)]",
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
