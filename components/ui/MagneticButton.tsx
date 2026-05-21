"use client";

import { forwardRef } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: Variant;
  strength?: number;
}

// Emil Kowalski: buttons MUST have active:scale feedback — users need to feel the press.
// Taste Skill: inner inset border simulates physical edge refraction on the primary CTA.
const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm tracking-tight transition-[transform,background-color,border-color,box-shadow,opacity] duration-[160ms] ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60";

const variants: Record<Variant, string> = {
  primary:
    "bg-bone-50 text-ink-950 hover:bg-white shadow-[0_8px_32px_-12px_rgba(91,140,255,0.45),inset_0_1px_0_rgba(255,255,255,0.9)]",
  ghost:
    "text-bone-100 border border-white/[0.12] hover:border-white/25 bg-white/[0.02] hover:bg-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
};

const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, className, variant = "primary", strength = 0.32, href, onClick, ...rest }, _ref) => {
    const magnetRef = useMagnetic<HTMLDivElement>(strength);

    const content = (
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    );

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      onClick?.(e);
    };

    return (
      <div ref={magnetRef} className="magnet inline-flex">
        <button
          className={cn(base, variants[variant], className)}
          onClick={handleClick}
          {...rest}
        >
          {content}
          {variant === "primary" && (
            // Cursor-warm glow — fades in on hover, invisible at rest
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(100% 70% at 50% 100%, rgba(91,140,255,0.28), transparent 70%)",
              }}
            />
          )}
        </button>
      </div>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

export default MagneticButton;
