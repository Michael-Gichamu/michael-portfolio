import { profile, nav } from "@/lib/data";

// High-end-visual-design: macro whitespace, deliberate structure, hairline dividers.
// Taste Skill: no generic centered copyright line — use editorial column layout.
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/[0.06] bg-ink-950">
      {/* Top strip — name + nav links */}
      <div className="container-page py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Identity */}
          <div className="flex flex-col gap-1">
            <span className="font-display text-xl text-bone-50">{profile.name}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone-300">
              {profile.role}
            </span>
          </div>

          {/* Nav links — right aligned on desktop */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {nav.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300 transition-colors duration-150 hover:text-bone-50"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/[0.04]" />

      {/* Bottom strip — copyright + stack */}
      <div className="container-page py-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-400">
            © {year} — Designed &amp; engineered in Nairobi.
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-400">
            Next.js · R3F · Framer Motion · Lenis
          </span>
        </div>
      </div>
    </footer>
  );
}
