import { db } from "../db/index.js";
import type { Appointment } from "../types.js";
import { slotMinutes, workingHours } from "./catalog.js";

const DAY_NAMES = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export interface Slot {
  start: string; // "YYYY-MM-DD HH:MM"
  end: string;
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function fromMinutes(mins: number): string {
  const h = Math.floor(mins / 60)
    .toString()
    .padStart(2, "0");
  const m = (mins % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

/** Pure function: generates all slots for a given date, independent of bookings. */
export function generateSlotsForDate(dateStr: string): Slot[] {
  const date = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(date.getTime())) return [];

  const dayName = DAY_NAMES[date.getDay()];
  const hours = workingHours[dayName];
  if (!hours) return [];

  const startMin = toMinutes(hours.start);
  const endMin = toMinutes(hours.end);
  const slots: Slot[] = [];

  for (let t = startMin; t + slotMinutes <= endMin; t += slotMinutes) {
    slots.push({
      start: `${dateStr} ${fromMinutes(t)}`,
      end: `${dateStr} ${fromMinutes(t + slotMinutes)}`,
    });
  }
  return slots;
}

/** Pure function: filters out slots that overlap an existing booked appointment. */
export function filterAvailableSlots(slots: Slot[], booked: Pick<Appointment, "slot_start" | "slot_end">[]): Slot[] {
  return slots.filter(
    (slot) =>
      !booked.some((b) => slot.start < b.slot_end && b.slot_start < slot.end),
  );
}

export function getAvailableSlots(dateStr: string): Slot[] {
  const all = generateSlotsForDate(dateStr);
  if (all.length === 0) return [];

  const booked = db
    .prepare<[string, string], Appointment>(
      "SELECT * FROM appointments WHERE status = 'booked' AND slot_start >= ? AND slot_start < ?",
    )
    .all(`${dateStr} 00:00`, `${dateStr} 23:59`);

  return filterAvailableSlots(all, booked);
}

export function isSlotFree(start: string, end: string): boolean {
  const conflict = db
    .prepare<[string, string], Appointment>(
      "SELECT * FROM appointments WHERE status = 'booked' AND slot_start < ? AND slot_end > ?",
    )
    .get(end, start);
  return !conflict;
}

export function bookAppointment(
  leadId: number,
  service: string,
  start: string,
  end: string,
): Appointment {
  if (!isSlotFree(start, end)) {
    throw new Error("slot_unavailable");
  }
  const result = db
    .prepare(
      "INSERT INTO appointments (lead_id, service, slot_start, slot_end) VALUES (?, ?, ?, ?)",
    )
    .run(leadId, service, start, end);
  return db
    .prepare<[number], Appointment>("SELECT * FROM appointments WHERE id = ?")
    .get(result.lastInsertRowid as number)!;
}
