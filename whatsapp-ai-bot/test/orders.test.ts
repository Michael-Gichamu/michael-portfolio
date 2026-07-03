import { beforeEach, describe, expect, it } from "vitest";
import { addItemToOrder, calculateOrderTotal, getOrderSummary } from "../src/services/orders.js";
import { findOrCreateLead } from "../src/services/leads.js";
import { db } from "../src/db/index.js";

beforeEach(() => {
  db.exec("DELETE FROM order_items; DELETE FROM orders; DELETE FROM leads;");
});

describe("calculateOrderTotal", () => {
  it("sums price * quantity across items", () => {
    const total = calculateOrderTotal([
      { price: 2500, quantity: 1 },
      { price: 100, quantity: 3 },
    ]);
    expect(total).toBe(2800);
  });

  it("returns 0 for an empty cart", () => {
    expect(calculateOrderTotal([])).toBe(0);
  });
});

describe("addItemToOrder / getOrderSummary (DB integration)", () => {
  it("accumulates quantity when the same product is added twice", () => {
    const lead = findOrCreateLead("254700000003");
    addItemToOrder(lead.id, "sku-001", "Starter Package", 2500, 1);
    addItemToOrder(lead.id, "sku-001", "Starter Package", 2500, 2);

    const summary = getOrderSummary(lead.id);
    expect(summary.items).toHaveLength(1);
    expect(summary.items[0].quantity).toBe(3);
    expect(summary.total).toBe(7500);
  });

  it("keeps separate line items for different products", () => {
    const lead = findOrCreateLead("254700000004");
    addItemToOrder(lead.id, "sku-001", "Starter Package", 2500, 1);
    addItemToOrder(lead.id, "sku-002", "Standard Package", 5000, 1);

    const summary = getOrderSummary(lead.id);
    expect(summary.items).toHaveLength(2);
    expect(summary.total).toBe(7500);
  });
});
