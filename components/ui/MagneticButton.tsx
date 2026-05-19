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

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm tracking-tight transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60";

const variants: Record<Variant, string> = {
  primary:
    "bg-bone-50 text-ink-950 hover:bg-white shadow-[0_8px_32px_-12px_rgba(91,140,255,0.45)]",
  ghost:
    "text-bone-100 border border-white/12 hover:border-white/25 bg-white/[0.02] hover:bg-white/[0.05]",
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
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 hover:opacity-100"
              style={{
                background:
                  "radial-gradient(120% 80% at 50% 0%, rgba(91,140,255,0.35), transparent 70%)",
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
