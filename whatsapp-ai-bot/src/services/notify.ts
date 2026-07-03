import { config } from "../config.js";
import { sendWhatsAppText } from "../whatsapp/client.js";
import { logger } from "../utils/logger.js";

/** Notifies the business owner of a new lead, order, or payment event. Never throws. */
export async function notifyOwner(message: string): Promise<void> {
  if (!config.ownerWhatsappNumber) {
    logger.warn("owner_notification_skipped_no_number", { message });
    return;
  }
  try {
    await sendWhatsAppText(config.ownerWhatsappNumber, message);
  } catch (err) {
    logger.error("owner_notification_failed", { error: String(err) });
  }
}
