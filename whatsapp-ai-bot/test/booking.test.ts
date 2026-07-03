import { beforeEach, describe, expect, it } from "vitest";
import {
  bookAppointment,
  filterAvailableSlots,
  generateSlotsForDate,
  getAvailableSlots,
  isSlotFree,
} from "../src/services/booking.js";
import { findOrCreateLead } from "../src/services/leads.js";
import { db } from "../src/db/index.js";

function nextWeekday(target: number): string {
  const date = new Date();
  date.setDate(date.getDate() + ((target + 7 - date.getDay()) % 7 || 7));
  return date.toISOString().slice(0, 10);
}

const MONDAY = nextWeekday(1); // has working hours 09:00-17:00
const SUNDAY = nextWeekday(0); // closed, per business.json

beforeEach(() => {
  db.exec("DELETE FROM appointments; DELETE FROM leads;");
});

describe("generateSlotsForDate", () => {
  it("generates 30-minute slots within working hours", () => {
    const slots = generateSlotsForDate(MONDAY);
    expect(slots[0]).toEqual({ start: `${MONDAY} 09:00`, end: `${MONDAY} 09:30` });
    expect(slots[slots.length - 1]).toEqual({ start: `${MONDAY} 16:30`, end: `${MONDAY} 17:00` });
  });

  it("returns no slots on a closed day", () => {
    expect(generateSlotsForDate(SUNDAY)).toEqual([]);
  });
});

describe("filterAvailableSlots", () => {
  it("excludes slots that overlap a booked appointment", () => {
    const slots = generateSlotsForDate(MONDAY);
    const booked = [{ slot_start: `${MONDAY} 09:00`, slot_end: `${MONDAY} 09:30` }];
    const available = filterAvailableSlots(slots, booked);
    expect(available.find((s) => s.start === `${MONDAY} 09:00`)).toBeUndefined();
    expect(available.length).toBe(slots.length - 1);
  });
});

describe("bookAppointment (DB integration)", () => {
  it("books a free slot and prevents double-booking", () => {
    const lead = findOrCreateLead("254700000001");
    const start = `${MONDAY} 10:00`;
    const end = `${MONDAY} 10:30`;

    expect(isSlotFree(start, end)).toBe(true);
    bookAppointment(lead.id, "Consultation", start, end);
    expect(isSlotFree(start, end)).toBe(false);

    expect(() => bookAppointment(lead.id, "Consultation", start, end)).toThrow(
      "slot_unavailable",
    );
  });

  it("excludes the booked slot from getAvailableSlots", () => {
    const lead = findOrCreateLead("254700000002");
    const before = getAvailableSlots(MONDAY);
    bookAppointment(lead.id, "Consultation", `${MONDAY} 11:00`, `${MONDAY} 11:30`);
    const after = getAvailableSlots(MONDAY);
    expect(after.length).toBe(before.length - 1);
  });
});
