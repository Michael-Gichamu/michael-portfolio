/**
 * Normalizes a phone number to MSISDN format (country code + number, no
 * leading "+", no spaces) as required by both the WhatsApp Cloud API and
 * the M-Pesa Daraja API. Defaults to Kenya (254) for local numbers, since
 * that's this bot's target market — pass a different defaultCountryCode
 * for other markets.
 */
export function normalizePhone(raw: string, defaultCountryCode = "254"): string {
  const digits = raw.replace(/[^\d]/g, "");

  if (digits.startsWith("0")) {
    return defaultCountryCode + digits.slice(1);
  }
  if (digits.startsWith(defaultCountryCode)) {
    return digits;
  }
  if (digits.length === 9) {
    return defaultCountryCode + digits;
  }
  return digits;
}

export function isValidMsisdn(phone: string): boolean {
  return /^\d{10,15}$/.test(phone);
}
