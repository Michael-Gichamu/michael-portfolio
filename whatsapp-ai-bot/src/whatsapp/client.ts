import { config } from "../config.js";
import { logger } from "../utils/logger.js";

function apiUrl(): string {
  return `https://graph.facebook.com/${config.whatsapp.apiVersion}/${config.whatsapp.phoneNumberId}/messages`;
}

export async function sendWhatsAppText(to: string, body: string): Promise<void> {
  const res = await fetch(apiUrl(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.whatsapp.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    logger.error("whatsapp_send_failed", { to, status: res.status, errText });
    throw new Error(`whatsapp_send_failed: ${res.status}`);
  }
}
