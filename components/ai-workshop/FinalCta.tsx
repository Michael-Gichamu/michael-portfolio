import { FINAL, HERO } from '@/lib/aiWorkshop';
import { REGISTRATION_DEADLINE, WORKSHOP_DATES, FACILITATOR_SITE } from '@/lib/config';
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
        <p className="final__details">{HERO.price} | {WORKSHOP_DATES}</p>
        <CtaButton where="final" size="lg" />
        <p className="final__deadline">
          Register and complete payment by {REGISTRATION_DEADLINE} to secure your place.
        </p>
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
          A two-day workshop, {WORKSHOP_DATES}. In partnership with {HERO.partner}.
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
