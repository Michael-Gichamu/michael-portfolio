import type { ReactNode } from 'react';
import { OUTCOMES } from '@/lib/aiWorkshop';

/* Five small, purpose-built diagrams: one idea each. All are decorative; the headings and copy carry the meaning. */

function ReworkViz() {
  return (
    <div className="viz viz--rework" aria-hidden="true">
      <div>
        <p className="viz__cap">Unclear brief</p>
        <svg viewBox="0 0 360 44" preserveAspectRatio="none" className="viz__svg">
          <path
            d="M4 22 L50 8 L82 36 L124 10 L156 34 L196 12 L232 32 L270 14 L300 30 L330 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeDasharray="5 5"
            strokeLinejoin="round"
            opacity=".55"
          />
          <circle cx="346" cy="22" r="9" fill="none" stroke="currentColor" strokeWidth="2.4" opacity=".55" />
        </svg>
      </div>
      <div>
        <p className="viz__cap">Clear context and instructions</p>
        <svg viewBox="0 0 360 44" preserveAspectRatio="none" className="viz__svg">
          <path d="M4 22 H326" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
          <circle cx="346" cy="22" r="11" fill="var(--saffron)" stroke="currentColor" strokeWidth="2.4" />
          <path d="M340.5 22.5l4 4 7-8" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="square" />
        </svg>
      </div>
    </div>
  );
}

function ToolsViz() {
  return (
    <div className="viz viz--tools" aria-hidden="true">
      <div className="tools__names">
        <span>ChatGPT</span>
        <span>Claude</span>
        <span className="tools__more">and the tools you already use</span>
      </div>
      <svg viewBox="0 0 40 120" className="tools__bridge" preserveAspectRatio="none">
        <path d="M2 60 H18 M18 12 V108 M18 12 H38 M18 44 H38 M18 76 H38 M18 108 H38" fill="none" stroke="currentColor" strokeWidth="2.2" />
      </svg>
      <ul className="tools__caps">
        <li>Ongoing projects</li>
        <li>Research &amp; Analysis</li>
        <li>Complex tasks</li>
        <li>Recurring work</li>
      </ul>
    </div>
  );
}

function OsViz() {
  const layers = ['Projects', 'Instructions', 'Reference material', 'Routines'];
  return (
    <div className="viz viz--os" aria-hidden="true">
      <ul className="os__stack">
        {layers.map((l, i) => (
          <li key={l} style={{ ['--i' as string]: i }}>
            {l}
          </li>
        ))}
      </ul>
      <p className="os__note">Built once. Not rebuilt every time.</p>
    </div>
  );
}

function CapacityViz() {
  return (
    <div className="viz viz--capacity" aria-hidden="true">
      <div className="cap__row">
        <p className="viz__cap">Done by hand</p>
        <div className="cap__blocks">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <i key={i} className="cap__block" />
          ))}
        </div>
      </div>
      <div className="cap__row">
        <p className="viz__cap">With automation</p>
        <div className="cap__blocks">
          <i className="cap__block cap__block--auto" />
          <i className="cap__block cap__block--auto" />
          <i className="cap__free">Capacity for higher-value work</i>
        </div>
      </div>
    </div>
  );
}

function WorkflowViz() {
  const nodes = ['Opportunity', 'Mapped process', 'Working workflow'];
  return (
    <div className="viz viz--workflow" aria-hidden="true">
      <ol className="wf__nodes">
        {nodes.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ol>
      <p className="wf__note">Built together, from a practical example.</p>
    </div>
  );
}

const VISUALS: ReactNode[] = [<ReworkViz />, <ToolsViz />, <OsViz />, <CapacityViz />, <WorkflowViz />];

export function Gain() {
  return (
    <section className="section gain" id="gain" aria-labelledby="gain-title">
      <div className="container">
        <h2 id="gain-title" className="section__title">
          What You&apos;ll Gain
        </h2>
        <ol className="gain__grid" role="list">
          {OUTCOMES.map((o, i) => (
            <li key={o.title} className={`outcome outcome--${i + 1}`}>
              <div className="outcome__text">
                <span className="outcome__n" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{o.title}</h3>
                <p>{o.body}</p>
              </div>
              <div className="outcome__viz">{VISUALS[i]}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
