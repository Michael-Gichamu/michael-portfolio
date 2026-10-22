import { AUDIENCE } from '@/lib/aiWorkshop';

export function Audience() {
  return (
    <section className="section audience" id="audience" aria-labelledby="audience-title">
      <div className="container">
        <div className="audience__intro">
          <h2 id="audience-title">{AUDIENCE.title}</h2>
          <p className="audience__lead">{AUDIENCE.intro}</p>
        </div>

        <ul className="audience__list" role="list">
          {AUDIENCE.groups.map((g) => (
            <li key={g.who} className="audience__row">
              <h3>{g.who}</h3>
              <p>{g.need}</p>
            </li>
          ))}
        </ul>

        <div className="nocode" role="note">
          <p className="nocode__lead">{AUDIENCE.noCodeLead}</p>
          <p className="nocode__rest">{AUDIENCE.noCodeRest}</p>
        </div>
      </div>
    </section>
  );
}
