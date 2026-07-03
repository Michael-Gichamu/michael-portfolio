import catalogData from "../data/catalog.json" with { type: "json" };
import businessData from "../data/business.json" with { type: "json" };
import type { Product, Service } from "../types.js";

export const catalog: Product[] = catalogData;

export const services: Service[] = businessData.services;

export const workingHours = businessData.workingHours as Record<
  string,
  { start: string; end: string } | null
>;

export const slotMinutes: number = businessData.slotMinutes;

export function findProduct(nameOrId: string): Product | undefined {
  const needle = nameOrId.trim().toLowerCase();
  return catalog.find(
    (p) => p.id.toLowerCase() === needle || p.name.toLowerCase() === needle,
  ) ?? catalog.find((p) => p.name.toLowerCase().includes(needle));
}

export function findService(nameOrId: string): Service | undefined {
  const needle = nameOrId.trim().toLowerCase();
  return services.find(
    (s) => s.id.toLowerCase() === needle || s.name.toLowerCase() === needle,
  ) ?? services.find((s) => s.name.toLowerCase().includes(needle));
}
