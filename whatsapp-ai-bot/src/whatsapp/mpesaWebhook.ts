import type { Request, Response } from "express";
import { handleStkCallback } from "../services/mpesa.js";
import { markOrderStatus } from "../services/orders.js";
import { sendWhatsAppText } from "./client.js";
import { notifyOwner } from "../services/notify.js";
import { logger } from "../utils/logger.js";

export function receiveMpesaCallback(req: Request, res: Response): void {
  // Acknowledge Safaricom immediately; process asynchronously.
  res.status(200).json({ ResultCode: 0, ResultDesc: "Accepted" });

  try {
    const result = handleStkCallback(req.body);
    if (!result.payment) {
      logger.warn("mpesa_callback_unknown_checkout_request", {
        checkoutRequestId: result.checkoutRequestId,
      });
      return;
    }

    if (result.success && result.payment.order_id) {
      markOrderStatus(result.payment.order_id, "paid");
    }

    const customerMessage = result.success
      ? `Payment received! KES ${result.payment.amount} confirmed${result.mpesaReceipt ? ` (receipt ${result.mpesaReceipt})` : ""}. Thank you.`
      : "We didn't receive your M-Pesa payment. Reply here if you'd like to try again.";

    void sendWhatsAppText(result.payment.phone, customerMessage);
    void notifyOwner(
      `Payment ${result.success ? "succeeded" : "failed"}: KES ${result.payment.amount} from ${result.payment.phone} (lead #${result.payment.lead_id}).`,
    );
  } catch (err) {
    logger.error("mpesa_callback_processing_failed", { error: String(err) });
  }
}
