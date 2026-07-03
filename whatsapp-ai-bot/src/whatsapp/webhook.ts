import type { Request, Response } from "express";
import { config } from "../config.js";
import { logger } from "../utils/logger.js";
import { normalizePhone } from "../utils/phone.js";
import { findOrCreateLead, appendMessage } from "../services/leads.js";
import { generateReply } from "../ai/agent.js";
import { sendWhatsAppText } from "./client.js";

const processedMessageIds = new Set<string>();

interface WhatsAppWebhookBody {
  entry?: {
    changes?: {
      value?: {
        messages?: {
          id: string;
          from: string;
          type: string;
          text?: { body: string };
        }[];
        contacts?: { profile?: { name?: string } }[];
      };
    }[];
  }[];
}

export function verifyWebhook(req: Request, res: Response): void {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === config.whatsapp.verifyToken) {
    res.status(200).send(challenge);
    return;
  }
  res.sendStatus(403);
}

export function receiveWebhook(req: Request, res: Response): void {
  // Acknowledge immediately — Meta expects a fast response and will retry
  // on timeout, which would otherwise cause duplicate processing.
  res.sendStatus(200);

  const body = req.body as WhatsAppWebhookBody;
  const change = body.entry?.[0]?.changes?.[0]?.value;
  const message = change?.messages?.[0];
  if (!message || message.type !== "text" || !message.text) return;

  if (processedMessageIds.has(message.id)) return;
  processedMessageIds.add(message.id);
  if (processedMessageIds.size > 5000) processedMessageIds.clear();

  handleIncomingMessage(normalizePhone(message.from), message.text.body).catch((err) => {
    logger.error("webhook_processing_failed", { error: String(err) });
  });
}

async function handleIncomingMessage(phone: string, text: string): Promise<void> {
  const lead = findOrCreateLead(phone);
  appendMessage(lead.id, "user", text);

  const reply = await generateReply({ leadId: lead.id, phone });

  appendMessage(lead.id, "assistant", reply);
  await sendWhatsAppText(phone, reply);
}
