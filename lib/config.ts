export const WORKSHOP_DATES = '3–4 December 2026';
export const REGISTRATION_DEADLINE = '3 December 2026';

/** AI workshop registration destination used by every "RESERVE YOUR PLACE" button. */
export const REGISTRATION_URL = 'https://forms.gle/9qPUcF9amHfyX2M57';
export const isRegistrationConfigured = true;
export const registrationHref = REGISTRATION_URL;

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
