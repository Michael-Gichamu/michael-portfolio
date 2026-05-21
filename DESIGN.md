# DESIGN.md — Michael Gichamu Portfolio

> Generated for Impeccable skill context. Run `/impeccable teach` to create PRODUCT.md.

## Identity

**Project:** Personal portfolio — Michael Gichamu, Software Engineer & AI Automation Specialist  
**Register:** Brand (design IS the product — the site communicates competence directly)  
**Tone:** Precise, dark, editorial. Quiet confidence. No startup-slop language.

## Color System

| Token | Value | Usage |
|---|---|---|
| `ink-950` | `#05060A` | Page background |
| `ink-900` | `#0A0B10` | Elevated surfaces, cards |
| `ink-800` | `#0F1117` | Subtler elevation |
| `bone-50` | `#F7F8FA` | Primary text / headings |
| `bone-100` | `#EDEFF3` | Secondary text |
| `bone-200` | `#D8DCE5` | Body copy |
| `bone-300` | `#A8AEBD` | Muted labels, timestamps |
| `accent` | `#5B8CFF` | Primary interactive accent |
| `accent-400` | `#7AA5FF` | Lighter accent variant |
| `accent-300` | `#9CBEFF` | Gradient / decorative |

**Color strategy:** Restrained — deep neutrals (ink family), one accent (electric blue `#5B8CFF`).  
No purple glows. No neon. Accent saturation kept below 80%.

## Typography

| Role | Font family | Usage |
|---|---|---|
| Display | `var(--font-display)` — serif | Headlines, section titles |
| Sans | `var(--font-sans)` | Body copy, UI text |
| Mono | `var(--font-mono)` | Labels, tags, metadata, code |

- Headlines: `font-display text-display-xl` (clamp 3.5rem→8rem), `leading-[0.95]`, `tracking-[-0.04em]`
- Section heads: `font-display text-display-lg`
- Labels: `font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em]`
- Body: `text-[15px]-text-[17px] leading-relaxed text-bone-200`

**Never use:** Inter, Roboto, Arial, system-ui for display text.

## Spacing & Layout

- Container: `max-w-[1280px] mx-auto px-[clamp(1.25rem,4vw,2.5rem)]` → `.container-page`
- Section padding: `py-[clamp(3rem,7vw,6rem)]` → `.section-pad`
- Full-height hero: `min-h-[100svh]` (never `h-screen`)

## Glass Surfaces

Two glass utilities in globals.css:

```
.glass       — blur(14px) sat(140%), 1px hairline border, inset 1px top highlight
.glass-strong — blur(22px) sat(160%), stronger border + inset highlight
```

**Liquid glass rule (Taste Skill):** Glass must include `box-shadow: inset 0 1px 0 rgba(255,255,255,0.07-0.1)` for the edge refraction effect. Backdrop-blur alone looks flat.

## Motion

- **Easing (entrance):** `cubic-bezier(0.23, 1, 0.32, 1)` — strong ease-out, fast initial movement
- **Easing (UI interactions):** `ease-out` at 150–250ms
- **Easing (on-screen movement):** `cubic-bezier(0.77, 0, 0.175, 1)` — strong ease-in-out
- **Spring (mouse-tracking, drag):** `{ type: "spring", duration: 0.5, bounce: 0.15 }`
- **Stagger:** 30–60ms between items (never 100ms+ for lists)
- **Exit animations:** faster than entry — 150–200ms vs 350–450ms

**Emil's non-negotiables:**
- Every pressable element: `active:scale-[0.97]` at 160ms ease-out
- Never animate `width`/`height` → use `scaleX`/`scaleY`
- Never animate from `scale(0)` → start from `scale(0.95) opacity(0)`
- UI animations stay under 300ms
- Exit uses `ease-in`, entry uses `ease-out`

## Component Patterns

### MagneticButton
- Primary: bone-50 bg, ink-950 text, accent glow shadow + inset top highlight
- Ghost: hairline border, slight bg, inset top highlight
- Both: `active:scale-[0.97] transition-[transform,...] duration-[160ms] ease-out`
- Magnetic: `useMagnetic` hook with rAF lerp — no useState

### GlassCard
- Base `.glass` + `shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]`
- Spotlight: cursor-following radial gradient via CSS custom properties (no re-renders)
- Hover border: `border-white/[0.15]` at 300ms

### Section labels
```
<p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-300">
  <span className="text-accent">01</span>
  <span className="h-px w-8 bg-white/15" />
  Section name
</p>
```

## Anti-Patterns (Forbidden)
- ❌ 3-column equal card grids — use asymmetric layouts
- ❌ Neon outer glows / box-shadow glows
- ❌ `transition: all` — specify exact properties
- ❌ Animating `width` / `height` / `top` / `left`
- ❌ Gradient text on large headlines (small italic accents only)
- ❌ `ease-in` on entering UI elements
- ❌ Animations > 300ms for UI interactions
- ❌ `h-screen` — always `min-h-[100svh]`
- ❌ `z-50` spam — use `z-10` (nav), `z-20` (overlays), `z-30` (modals)
