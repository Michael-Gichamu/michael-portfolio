import { describe, expect, it } from "vitest";
import { buildStkPushPayload, generatePassword, generateTimestamp } from "../src/services/mpesa.js";

describe("generateTimestamp", () => {
  it("formats as YYYYMMDDHHmmss", () => {
    const ts = generateTimestamp(new Date(2026, 6, 3, 9, 5, 7)); // July 3 2026, 09:05:07
    expect(ts).toBe("20260703090507");
  });
});

describe("generatePassword", () => {
  it("base64-encodes shortcode + passkey + timestamp", () => {
    const password = generatePassword("174379", "mykey", "20260703090507");
    expect(password).toBe(Buffer.from("174379mykey20260703090507").toString("base64"));
  });
});

describe("buildStkPushPayload", () => {
  it("builds a well-formed STK push request", () => {
    const payload = buildStkPushPayload({
      phone: "254742909700",
      amount: 2500.6,
      accountReference: "LEAD-12345678",
      transactionDesc: "Starter Package purchase",
      timestamp: "20260703090507",
    });

    expect(payload.BusinessShortCode).toBe("174379");
    expect(payload.PartyA).toBe("254742909700");
    expect(payload.PhoneNumber).toBe("254742909700");
    expect(payload.Amount).toBe(2501); // rounded
    expect(payload.AccountReference).toBe("LEAD-1234567".slice(0, 12));
    expect(payload.AccountReference.length).toBeLessThanOrEqual(12);
    expect(payload.TransactionDesc.length).toBeLessThanOrEqual(13);
    expect(payload.TransactionType).toBe("CustomerPayBillOnline");
  });
});
