import { db } from "../db/index.js";
import type { ConversationMessage, Lead } from "../types.js";

export function findOrCreateLead(phone: string): Lead {
  const existing = db.prepare<[string], Lead>("SELECT * FROM leads WHERE phone = ?").get(phone);
  if (existing) return existing;

  const result = db.prepare("INSERT INTO leads (phone) VALUES (?)").run(phone);
  return db
    .prepare<[number], Lead>("SELECT * FROM leads WHERE id = ?")
    .get(result.lastInsertRowid as number)!;
}

export function updateLeadStatus(leadId: number, status: Lead["status"]): void {
  db.prepare("UPDATE leads SET status = ?, updated_at = datetime('now') WHERE id = ?").run(
    status,
    leadId,
  );
}

export function updateLeadName(leadId: number, name: string): void {
  db.prepare("UPDATE leads SET name = ?, updated_at = datetime('now') WHERE id = ?").run(
    name,
    leadId,
  );
}

export function getLead(leadId: number): Lead | undefined {
  return db.prepare<[number], Lead>("SELECT * FROM leads WHERE id = ?").get(leadId);
}

export function appendMessage(
  leadId: number,
  role: ConversationMessage["role"],
  content: string,
): void {
  db.prepare("INSERT INTO conversations (lead_id, role, content) VALUES (?, ?, ?)").run(
    leadId,
    role,
    content,
  );
}

export function getRecentHistory(leadId: number, limit = 20): ConversationMessage[] {
  const rows = db
    .prepare<[number, number], ConversationMessage>(
      "SELECT * FROM conversations WHERE lead_id = ? ORDER BY id DESC LIMIT ?",
    )
    .all(leadId, limit);
  return rows.reverse();
}
