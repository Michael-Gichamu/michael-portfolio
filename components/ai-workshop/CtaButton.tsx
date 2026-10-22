import { registrationHref } from '../../lib/config';

type Props = {
  /** Where on the page the button sits (kept in a data attribute for analytics or debugging). */
  where: string;
  size?: 'sm' | 'md' | 'lg';
};

/** The single registration button used everywhere. Its destination comes from config.ts. */
export function CtaButton({ where, size = 'md' }: Props) {
  return (
    <a className={`cta cta--${size}`} href={registrationHref} data-cta={where}>
      RESERVE YOUR PLACE
    </a>
  );
}
