import { FINAL, HERO } from '@/lib/aiWorkshop';
import { FACILITATOR_SITE } from '@/lib/config';
import { CtaButton } from './CtaButton';

export function FinalCta() {
  return (
    <section className="section final theme-dark" id="reserve" aria-labelledby="final-title">
      <div className="container final__inner">
        <div className="final__line" aria-hidden="true">
          <span />
        </div>
        <h2 id="final-title">{FINAL.title}</h2>
        <p className="final__body">{FINAL.body}</p>
        <p className="final__details">{FINAL.details}</p>
        <CtaButton where="final" size="lg" />
        <p className="final__deadline">{FINAL.deadline}</p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer theme-dark">
      <div className="container footer__inner">
        <p className="footer__brand">AI at Work</p>
        <p>
          A two-day workshop, {HERO.dates}. In partnership with {HERO.partner}.
        </p>
        <p>
          Facilitator: Michael Gichamu.{' '}
          <a href={FACILITATOR_SITE} target="_blank" rel="noopener noreferrer">
            michaelgichamu.tech<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      </div>
    </footer>
  );
}
