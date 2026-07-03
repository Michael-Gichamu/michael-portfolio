import { describe, expect, it } from "vitest";
import { isValidMsisdn, normalizePhone } from "../src/utils/phone.js";

describe("normalizePhone", () => {
  it("converts a leading-zero local number to MSISDN", () => {
    expect(normalizePhone("0742909700")).toBe("254742909700");
  });

  it("leaves an already-normalized number unchanged", () => {
    expect(normalizePhone("254742909700")).toBe("254742909700");
  });

  it("strips spaces and punctuation", () => {
    expect(normalizePhone("+254 742 909 700")).toBe("254742909700");
  });

  it("adds the country code to a bare 9-digit number", () => {
    expect(normalizePhone("742909700")).toBe("254742909700");
  });
});

describe("isValidMsisdn", () => {
  it("accepts a valid MSISDN", () => {
    expect(isValidMsisdn("254742909700")).toBe(true);
  });

  it("rejects a too-short number", () => {
    expect(isValidMsisdn("12345")).toBe(false);
  });
});
