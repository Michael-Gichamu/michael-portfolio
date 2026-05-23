import { profile, nav } from "@/lib/data";

// Single-row footer: name left, nav center (hidden on small screens), copyright right.
// Compact py-5 keeps total height ~60px so it doesn't compete visually with the
// Contact section's link cards above it.
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/[0.06] bg-ink-950">
      <div className="container-page py-5">
        <div className="flex items-center justify-between gap-6">
          {/* Left — name */}
          <span className="shrink-0 font-display text-sm text-bone-100">
            {profile.name}
          </span>

          {/* Center — nav links (visible lg+) */}
          <nav aria-label="Footer navigation" className="hidden lg:block">
            <ul className="flex items-center gap-5">
              {nav.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-400 transition-colors duration-150 hover:text-bone-100"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right — copyright */}
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-400">
            © {year} · Nairobi
          </span>
        </div>
      </div>
    </footer>
  );
}
