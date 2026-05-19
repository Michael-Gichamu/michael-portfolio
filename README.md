# Michael Gichamu — Portfolio

A cinematic, 3D-driven personal portfolio for a Software Engineer & AI Automation Specialist.

Built with Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion, GSAP, React Three Fiber, and Lenis smooth scrolling.

---

## Stack

- **Next.js 14** — App Router, server components for shell, dynamic imports for 3D
- **React 18 + TypeScript**
- **Tailwind CSS** — design tokens defined in `tailwind.config.ts`
- **Framer Motion** — scroll-triggered reveals, micro-interactions
- **React Three Fiber + drei** — hero scene and ambient lattice
- **Lenis** — smooth scrolling
- **GSAP** — available for future complex timelines

---

## Getting started

```bash
# 1. Install
npm install

# 2. Dev
npm run dev

# 3. Build
npm run build && npm start
```

Open <http://localhost:3000>.

---

## Project structure

```
app/
  layout.tsx          # Root layout: fonts, smooth scroll, cursor, loader
  page.tsx            # Single-page composition
  globals.css         # Design tokens, utilities, animations
  fonts.ts            # Inter, Instrument Serif, JetBrains Mono

components/
  layout/             # Navbar, Footer, SmoothScroll
  sections/           # Hero, About, Projects, Skills, Experience,
                      # Certifications, Contact
  three/              # HeroScene, AmbientScene (R3F)
  ui/                 # Primitives: MagneticButton, GlassCard,
                      # AnimatedCounter, Cursor, LoadingScreen,
                      # SectionHeader, ScrollIndicator, TextReveal, Marquee

hooks/
  useMagnetic.ts      # Cursor-magnet effect for buttons
  useMousePosition.ts # rAF-tracked, ref-based mouse position

lib/
  data.ts             # Single source of truth: profile, projects,
                      # skills, experience, certifications
  utils.ts            # cn() helper, section IDs
```

---

## Editing content

All copy is centralized in `lib/data.ts` — projects, stats, experience,
certifications, and the social links. Edit there and the site updates.

### Updating the hero headline
`components/sections/Hero.tsx` — `headlineWords` array.

### Tuning the 3D scene
`components/three/HeroScene.tsx` — adjust `Core`, `Orbiters`, `Starfield`.

### Theme tokens
`tailwind.config.ts` and `app/globals.css` — colors, fonts, gradients.

---

## Performance notes

- 3D canvases are loaded with `next/dynamic({ ssr: false })`.
- `dpr={[1, 1.6]}` caps device pixel ratio on R3F canvases.
- `prefers-reduced-motion` disables Lenis and clamps animation durations.
- Custom cursor only mounts on `hover: hover` + `pointer: fine` devices.
- Counters and reveals run only once via `viewport={{ once: true }}`.
- Fonts use `display: swap` and the Next.js font pipeline.

---

## Deploy

Optimized for **Vercel** — push to a Git repo and import. No env vars
required for the public site. The contact form uses a `mailto:` fallback;
swap it for an API route or third-party form provider when you want.

---

© Michael Gichamu — Designed and engineered in Nairobi.
