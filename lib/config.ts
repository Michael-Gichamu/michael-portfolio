/**
 * AI Workshop – site configuration.
 *
 * REGISTRATION_URL
 *   The registration / payment destination. It has NOT been supplied yet.
 *   Set it with the NEXT_PUBLIC_REGISTRATION_URL environment variable.
 *   Every "RESERVE YOUR PLACE" button reads this single value.
 *   While it is empty, buttons scroll to the workshop details block instead.
 */
export const REGISTRATION_URL: string = (
  process.env.NEXT_PUBLIC_REGISTRATION_URL ?? ''
).trim();

export const isRegistrationConfigured = REGISTRATION_URL.length > 0;

/** Where every registration button points. */
export const registrationHref = isRegistrationConfigured
  ? REGISTRATION_URL
  : '#details';

export const FACILITATOR_SITE = 'https://michaelgichamu.tech';

/**
 * Facilitator photograph.
 * Place the image at /public/ai-workshop/facilitator.jpg (or .png / .webp).
 * Next.js serves files from /public at the root path, e.g. /ai-workshop/facilitator.jpg.
 * Set NEXT_PUBLIC_FACILITATOR_PHOTO to that path to enable the photo.
 * If not set, a portrait placeholder is shown.
 */
export const FACILITATOR_PHOTO: string | null =
  process.env.NEXT_PUBLIC_FACILITATOR_PHOTO ?? '/ai-workshop/facilitator.jpg';
