import { FAQS } from '@/lib/aiWorkshop';
import { REGISTRATION_DEADLINE } from '@/lib/config';

/** Native <details>/<summary>: keyboard, touch and screen-reader support, with no JavaScript required. */
export function Faq() {
  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title">
      <div className="container faq__grid">
        <h2 id="faq-title" className="faq__title">
          Frequently Asked Questions
        </h2>
        <div className="faq__list">
          {FAQS.map((f) => (
            <details key={f.q} className="faq__item">
              <summary>
                <span>{f.q}</span>
                <span className="faq__icon" aria-hidden="true" />
              </summary>
              <div className="faq__a">
                {f.a.map((p) => (
                  <p key={p}>
                    {p.replace(/22 November 2026/g, REGISTRATION_DEADLINE)}
                  </p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
