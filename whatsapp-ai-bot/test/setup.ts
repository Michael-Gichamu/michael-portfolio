process.env.NODE_ENV = "test";
process.env.DATABASE_PATH = ":memory:";
process.env.MPESA_SHORTCODE = process.env.MPESA_SHORTCODE || "174379";
process.env.MPESA_PASSKEY = process.env.MPESA_PASSKEY || "test-passkey";
process.env.MPESA_CALLBACK_URL =
  process.env.MPESA_CALLBACK_URL || "https://example.com/webhook/mpesa/callback";
