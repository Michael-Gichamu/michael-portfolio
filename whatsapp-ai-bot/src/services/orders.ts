import { db } from "../db/index.js";
import type { Order, OrderItem } from "../types.js";

function getOpenOrder(leadId: number): Order | undefined {
  return db
    .prepare<[number], Order>("SELECT * FROM orders WHERE lead_id = ? AND status = 'open' ORDER BY id DESC LIMIT 1")
    .get(leadId);
}

function createOrder(leadId: number): Order {
  const result = db.prepare("INSERT INTO orders (lead_id) VALUES (?)").run(leadId);
  return db
    .prepare<[number], Order>("SELECT * FROM orders WHERE id = ?")
    .get(result.lastInsertRowid as number)!;
}

export function getOrCreateOpenOrder(leadId: number): Order {
  return getOpenOrder(leadId) ?? createOrder(leadId);
}

export function addItemToOrder(
  leadId: number,
  productId: string,
  name: string,
  price: number,
  quantity: number,
): Order {
  const order = getOrCreateOpenOrder(leadId);
  const existing = db
    .prepare<[number, string], OrderItem>(
      "SELECT * FROM order_items WHERE order_id = ? AND product_id = ?",
    )
    .get(order.id, productId);

  if (existing) {
    db.prepare("UPDATE order_items SET quantity = quantity + ? WHERE id = ?").run(
      quantity,
      existing.id,
    );
  } else {
    db.prepare(
      "INSERT INTO order_items (order_id, product_id, name, price, quantity) VALUES (?, ?, ?, ?, ?)",
    ).run(order.id, productId, name, price, quantity);
  }
  db.prepare("UPDATE orders SET updated_at = datetime('now') WHERE id = ?").run(order.id);
  return order;
}

export function getOrderItems(orderId: number): OrderItem[] {
  return db
    .prepare<[number], OrderItem>("SELECT * FROM order_items WHERE order_id = ?")
    .all(orderId);
}

/** Pure function: sums (price * quantity) across order items. */
export function calculateOrderTotal(items: Pick<OrderItem, "price" | "quantity">[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function getOrderSummary(leadId: number): {
  order: Order;
  items: OrderItem[];
  total: number;
} {
  const order = getOrCreateOpenOrder(leadId);
  const items = getOrderItems(order.id);
  return { order, items, total: calculateOrderTotal(items) };
}

export function markOrderStatus(orderId: number, status: Order["status"]): void {
  db.prepare("UPDATE orders SET status = ?, updated_at = datetime('now') WHERE id = ?").run(
    status,
    orderId,
  );
}
