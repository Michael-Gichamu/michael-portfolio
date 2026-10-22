import type { ReactNode } from 'react';
import { PROGRAMME } from '@/lib/aiWorkshop';

const g = {
  width: 44,
  height: 44,
  viewBox: '0 0 44 44',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
};

/* One distinct mark per theme. */
const GLYPHS: Record<number, ReactNode> = {
  1: (
    <svg {...g}>
      <circle cx="8" cy="22" r="3.2" />
      <path d="M11.5 22h9.5l8-10h5M21 22l8 10h5" />
      <circle cx="38" cy="12" r="3" />
      <circle cx="38" cy="32" r="3" />
    </svg>
  ),
  2: (
    <svg {...g}>
      <path d="M6 12h32M6 22h32M6 32h32" />
      <circle cx="30" cy="12" r="3.6" fill="var(--paper)" />
      <circle cx="15" cy="22" r="3.6" fill="var(--paper)" />
      <circle cx="26" cy="32" r="3.6" fill="var(--paper)" />
    </svg>
  ),
  3: (
    <svg {...g}>
      <path d="M22 6l16 8-16 8-16-8z" />
      <path d="M6 22l16 8 16-8M6 30l16 8 16-8" />
    </svg>
  ),
  4: (
    <svg {...g}>
      <path d="M7 37V28M17 37V19M27 37V24M37 37V9" strokeWidth="5" />
      <path d="M4 40h37" />
    </svg>
  ),
  5: (
    <svg {...g}>
      <rect x="3" y="16" width="11" height="12" rx="2" />
      <rect x="30" y="16" width="11" height="12" rx="2" />
      <circle cx="22" cy="22" r="3.5" />
      <path d="M14 22h4.5M25.5 22H30M27.5 19l2.5 3-2.5 3" />
    </svg>
  ),
};

export function Curriculum() {
  return (
    <section className="section programme" id="programme" aria-labelledby="programme-title">
      <div className="container">
        <h2 id="programme-title" className="section__title">
          {PROGRAMME.title}
        </h2>

        <div className="programme__days">
          {PROGRAMME.days.map((day, di) => (
            <article key={day.label} className={`day day--${di + 1}`} aria-labelledby={`day-${di + 1}-title`}>
              <header className="day__head">
                <p className="day__label">{day.label}</p>
                <h3 id={`day-${di + 1}-title`}>{day.title}</h3>
                <p className="day__focus">{day.focus}</p>
              </header>

              <ol className="themes" role="list">
                {day.themes.map((t) => (
                  <li key={t.n} className="theme">
                    <span className="theme__glyph">{GLYPHS[t.n]}</span>
                    <div>
                      <p className="theme__n">Theme {t.n}</p>
                      <h4>{t.title}</h4>
                      <p>{t.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
