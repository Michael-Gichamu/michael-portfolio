"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
}

export default function Marquee({ items, speed = 32, className }: MarqueeProps) {
  const doubled = [...items, ...items];
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className="flex w-max gap-12 whitespace-nowrap"
        style={{
          animation: `marqueeX ${speed}s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-mono text-xs uppercase tracking-[0.22em] text-bone-300/70"
          >
            {item}
            <span className="ml-12 text-white/15">●</span>
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marqueeX {
          0% { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-50%,0,0); }
        }
      `}</style>
    </div>
  );
}
