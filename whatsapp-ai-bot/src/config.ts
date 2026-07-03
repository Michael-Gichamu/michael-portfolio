import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value && process.env.NODE_ENV !== "test") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value ?? "";
}

function optional(name: string, fallback: string): string {
  return process.env[name] || fallback;
}

export const config = {
  port: Number(optional("PORT", "3000")),
  nodeEnv: optional("NODE_ENV", "development"),

  anthropic: {
    apiKey: required("ANTHROPIC_API_KEY"),
    model: optional("CLAUDE_MODEL", "claude-opus-4-8"),
  },

  whatsapp: {
    accessToken: required("WHATSAPP_ACCESS_TOKEN"),
    phoneNumberId: required("WHATSAPP_PHONE_NUMBER_ID"),
    verifyToken: optional("WHATSAPP_VERIFY_TOKEN", "change-me"),
    apiVersion: optional("WHATSAPP_API_VERSION", "v21.0"),
  },

  ownerWhatsappNumber: optional("OWNER_WHATSAPP_NUMBER", ""),

  mpesa: {
    env: optional("MPESA_ENV", "sandbox") as "sandbox" | "production",
    consumerKey: required("MPESA_CONSUMER_KEY"),
    consumerSecret: required("MPESA_CONSUMER_SECRET"),
    shortcode: optional("MPESA_SHORTCODE", "174379"),
    passkey: required("MPESA_PASSKEY"),
    callbackUrl: required("MPESA_CALLBACK_URL"),
  },

  business: {
    name: optional("BUSINESS_NAME", "Your Business"),
    timezone: optional("BUSINESS_TIMEZONE", "Africa/Nairobi"),
  },

  databasePath: optional("DATABASE_PATH", "./data.sqlite"),
};

export function mpesaBaseUrl(): string {
  return config.mpesa.env === "production"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke";
}
