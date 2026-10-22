import './styles/hero.css';
import { HERO } from '../../lib/aiWorkshop';
import { CtaButton } from './CtaButton';
import { Check } from './Icons';

function HeroFlow() {
  return (
    <figure className="flow theme-dark" aria-labelledby="flow-caption">
      <figcaption id="flow-caption" className="flow__head">
        <span>How good work moves through an AI system</span>
        <span>An illustration of the approach taught in the workshop</span>
      </figcaption>

      <ol className="flow__stages">
        <li className="stage">
          <div className="stage__viz stage__viz--ghost" aria-hidden="true">
            <span style={{ width: '92%' }} />
            <span style={{ width: '58%' }} />
            <span style={{ width: '76%' }} />
          </div>
          <p className="stage__title">Request</p>
          <p className="stage__text">What you need done, as it first comes to mind.</p>
        </li>

        <li className="stage">
          <div className="stage__viz stage__viz--tags" aria-hidden="true">
            <span>Role</span>
            <span>Goals</span>
            <span>Standards</span>
            <span>Projects</span>
          </div>
          <p className="stage__title">Your context</p>
          <p className="stage__text">Organised once, so you stop explaining it again.</p>
        </li>

        <li className="stage">
          <div className="stage__viz stage__viz--ai" aria-hidden="true">
            <span className="aibox">
              <i />
              <i />
              <i />
            </span>
          </div>
          <p className="stage__title">Your AI tool</p>
          <p className="stage__text">ChatGPT, Claude and others, working from your context.</p>
        </li>

        <li className="stage stage--end">
          <div className="stage__viz stage__viz--out" aria-hidden="true">
            <span className="doc">
              <b />
              <b />
              <b />
            </span>
            <span className="tick">
              <Check size={16} />
            </span>
          </div>
          <p className="stage__title">Checked result</p>
          <p className="stage__text">Evaluated against the standard you set.</p>
        </li>
      </ol>

      <p className="flow__loop">
        <span>Repeat it without starting from scratch. Automation takes over the routine steps.</span>
      </p>
    </figure>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero__grid">
          <div className="hero__head">
            <h1 id="hero-title" className="hero__title">
              {HERO.headlineLines.map((line) => (
                <span key={line} className="hero__line">
                  {line}{' '}
                </span>
              ))}
            </h1>
            <p className="hero__sub">{HERO.subheading}</p>
          </div>

          <aside className="ticket" aria-label="Workshop dates, fee and registration">
            <p className="ticket__label">Paid two-day workshop</p>
            <p className="ticket__when">{HERO.dates}</p>
            <p className="ticket__price">
              <span className="sr-only"> | </span>
              {HERO.price}
            </p>
            <CtaButton where="hero" size="lg" />
            <p className="ticket__deadline">
              Registration and payment deadline: <strong>{HERO.deadline}</strong>
            </p>
            <p className="ticket__partner">
              In partnership with <strong>{HERO.partner}</strong>
            </p>
          </aside>

          <div className="hero__support">
            {HERO.support.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <HeroFlow />
      </div>
    </section>
  );
}
