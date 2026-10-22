'use client';

import { useEffect, useState } from 'react';
import { CtaButton } from './CtaButton';

const LINKS = [
  { href: '#gain', label: "What You'll Gain" },
  { href: '#programme', label: 'Programme' },
  { href: '#facilitator', label: 'Facilitator' },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className="nav">
      <div className="container nav__inner">
        <a className="wordmark" href="#top" onClick={() => setOpen(false)}>
          AI at Work
        </a>

        <nav className="nav__links" aria-label="Primary">
          <ul>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__actions">
          <CtaButton where="nav" size="sm" />
          <button
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="nav-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <span className={`burger${open ? ' is-open' : ''}`} aria-hidden="true" />
          </button>
        </div>
      </div>

      <nav id="nav-menu" className="nav__menu" aria-label="Sections" hidden={!open}>
        <ul className="container">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
