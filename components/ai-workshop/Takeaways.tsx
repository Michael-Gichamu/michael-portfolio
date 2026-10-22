import type { ReactNode } from 'react';
import { TAKEAWAYS } from '@/lib/aiWorkshop';

/* Paper-sheet previews. They illustrate the described materials; they are not the finished documents. */
const SHEET_ART: ReactNode[] = [
  <div className="art art--aios" key="a">
    <i /><i /><i /><i />
  </div>,
  <div className="art art--prompt" key="b">
    <b /><span /><span /><span className="short" />
  </div>,
  <ul className="art art--list" key="c">
    <li /><li /><li /><li />
  </ul>,
  <div className="art art--sheet" key="d">
    <p><i /><span /></p>
    <p><i className="on" /><span /></p>
    <p><i /><span /></p>
    <p><i className="on" /><span /></p>
  </div>,
  <div className="art art--map" key="e">
    <i /><em /><i /><em /><i />
  </div>,
];

const TILTS = ['-1.2deg', '0.9deg', '0.6deg', '-0.8deg', '1deg'];

export function Takeaways() {
  const { sheets, handsOn } = TAKEAWAYS;
  return (
    <section className="section takeaways" id="takeaways" aria-labelledby="takeaways-title">
      <div className="container takeaways__grid">
        <div className="takeaways__intro">
          <h2 id="takeaways-title">{TAKEAWAYS.title}</h2>
          <p className="takeaways__lead">{TAKEAWAYS.intro}</p>
          <p className="takeaways__closing">{TAKEAWAYS.closing}</p>
        </div>

        <div className="desk">
          <ul className="desk__sheets" role="list">
            {sheets.map((s, i) => (
              <li key={s.title} className="sheet" style={{ ['--tilt' as string]: TILTS[i] }}>
                <div className="sheet__art" aria-hidden="true">
                  {SHEET_ART[i]}
                </div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
            <li className="handson">
              <svg className="handson__art" viewBox="0 0 220 64" aria-hidden="true" focusable={false}>
                <g fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect x="3" y="20" width="44" height="24" rx="4" />
                  <rect x="88" y="6" width="44" height="24" rx="4" />
                  <rect x="88" y="36" width="44" height="24" rx="4" />
                  <rect x="173" y="20" width="44" height="24" rx="4" fill="var(--saffron)" stroke="var(--saffron)" />
                  <path d="M47 32h20l8-14h13M67 32l8 14h13M132 18h20l7 14h14M132 48h20l7-16" />
                </g>
              </svg>
              <div>
                <h3>{handsOn.title}</h3>
                <p>{handsOn.body}</p>
              </div>
            </li>
          </ul>

          <p className="desk__note">Sheet designs are illustrations of the materials described.</p>
        </div>
      </div>
    </section>
  );
}
