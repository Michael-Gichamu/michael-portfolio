import { profile } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/[0.06] bg-ink-950 py-10">
      <div className="container-page flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-1">
          <span className="font-display text-lg text-bone-100">{profile.name}</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-300">
            {profile.role}
          </span>
        </div>

        <div className="flex flex-col items-start gap-2 text-xs text-bone-300 sm:items-end">
          <span>© {year} — Designed and engineered in Nairobi.</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em]">
            Built with Next.js · R3F · GSAP · Lenis
          </span>
        </div>
      </div>
    </footer>
  );
}
