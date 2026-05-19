"use client";

import { useEffect, useRef } from "react";

/**
 * Returns a normalized mouse position (-1..1) via a ref, updated on rAF.
 * Avoids re-renders for high-frequency input.
 */
export function useMousePosition() {
  const ref = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      ref.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      ref.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return ref;
}
