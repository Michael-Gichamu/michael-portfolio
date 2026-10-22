import { PHILOSOPHY } from '@/lib/aiWorkshop';

const DOTS = [0, 1, 2, 3, 4];

/** Answer-only vs. a way of working: five tasks, with and without shared context. */
function CompareViz() {
  return (
    <figure className="compare" aria-label="Illustration: five tasks done as separate answers, then the same five tasks sharing one organised setup">
      <div className="compare__row compare__row--alone">
        <p className="compare__label">Just generating answers</p>
        <div className="compare__track" aria-hidden="true">
          {DOTS.map((d) => (
            <span key={d} className="compare__node">
              <i className="compare__stub" />
              <b className="compare__dot" />
            </span>
          ))}
        </div>
        <p className="compare__note">Each task starts from zero.</p>
      </div>

      <div className="compare__row compare__row--system">
        <p className="compare__label">Building a way of working</p>
        <div className="compare__track" aria-hidden="true">
          <span className="compare__bar">Context, instructions, routines</span>
          {DOTS.map((d) => (
            <span key={d} className="compare__node">
              <i className="compare__link" />
              <b className="compare__dot" />
            </span>
          ))}
        </div>
        <p className="compare__note">Each task builds on the last.</p>
      </div>
    </figure>
  );
}

export function Philosophy() {
  const [lead, ...rest] = PHILOSOPHY.paragraphs;
  return (
    <section className="section philosophy theme-dark" id="philosophy" aria-labelledby="philosophy-title">
      <div className="container philosophy__grid">
        <div className="philosophy__copy">
          <h2 id="philosophy-title">{PHILOSOPHY.title}</h2>
          <p className="philosophy__lead">{lead}</p>
          {rest.map((p) => (
            <p key={p} className="philosophy__p">
              {p}
            </p>
          ))}
        </div>
        <CompareViz />
      </div>
    </section>
  );
}
