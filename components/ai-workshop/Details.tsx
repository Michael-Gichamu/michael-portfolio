import { DETAILS } from '@/lib/aiWorkshop';
import { REGISTRATION_DEADLINE, WORKSHOP_DATES } from '@/lib/config';
import { CtaButton } from './CtaButton';

export function Details() {
  return (
    <section className="section details" id="details" aria-labelledby="details-title">
      <div className="container">
        <h2 id="details-title" className="section__title">
          {DETAILS.title}
        </h2>

        <div className="pass">
          <div className="pass__stub">
            <p className="pass__label">Fee</p>
            <p className="pass__fee">{DETAILS.fee}</p>
            <p className="pass__per">{DETAILS.feeNote}</p>
          </div>

          <dl className="pass__main">
            <div>
              <dt>Dates</dt>
              <dd className="pass__big">{WORKSHOP_DATES}</dd>
            </div>
            <div>
              <dt>Included</dt>
              <dd>{DETAILS.included}</dd>
            </div>
            <div>
              <dt>Registration and payment deadline</dt>
              <dd className="pass__big">{REGISTRATION_DEADLINE}</dd>
            </div>
          </dl>

          <div className="pass__action">
            <p>{DETAILS.secured}</p>
            <CtaButton where="details" size="lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
