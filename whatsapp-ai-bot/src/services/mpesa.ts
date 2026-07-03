import { config, mpesaBaseUrl } from "../config.js";
import { db } from "../db/index.js";
import { logger } from "../utils/logger.js";
import type { Payment } from "../types.js";

/** Pure function: M-Pesa timestamp format is YYYYMMDDHHmmss. */
export function generateTimestamp(date = new Date()): string {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    date.getFullYear().toString() +
    pad(date.getMonth() + 1) +
    pad(date.getDate()) +
    pad(date.getHours()) +
    pad(date.getMinutes()) +
    pad(date.getSeconds())
  );
}

/** Pure function: STK push password is base64(shortcode + passkey + timestamp). */
export function generatePassword(shortcode: string, passkey: string, timestamp: string): string {
  return Buffer.from(shortcode + passkey + timestamp).toString("base64");
}

export interface StkPushPayload {
  BusinessShortCode: string;
  Password: string;
  Timestamp: string;
  TransactionType: string;
  Amount: number;
  PartyA: string;
  PartyB: string;
  PhoneNumber: string;
  CallBackURL: string;
  AccountReference: string;
  TransactionDesc: string;
}

/** Pure function: builds the STK push request body sent to Safaricom. */
export function buildStkPushPayload(params: {
  phone: string;
  amount: number;
  accountReference: string;
  transactionDesc: string;
  timestamp?: string;
}): StkPushPayload {
  const timestamp = params.timestamp ?? generateTimestamp();
  const shortcode = config.mpesa.shortcode;
  return {
    BusinessShortCode: shortcode,
    Password: generatePassword(shortcode, config.mpesa.passkey, timestamp),
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: Math.round(params.amount),
    PartyA: params.phone,
    PartyB: shortcode,
    PhoneNumber: params.phone,
    CallBackURL: config.mpesa.callbackUrl,
    AccountReference: params.accountReference.slice(0, 12),
    TransactionDesc: params.transactionDesc.slice(0, 13),
  };
}

async function getAccessToken(): Promise<string> {
  const credentials = Buffer.from(
    `${config.mpesa.consumerKey}:${config.mpesa.consumerSecret}`,
  ).toString("base64");

  const res = await fetch(`${mpesaBaseUrl()}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${credentials}` },
  });
  if (!res.ok) {
    throw new Error(`mpesa_auth_failed: ${res.status} ${await res.text()}`);
  }
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export async function initiateStkPush(params: {
  leadId: number;
  orderId: number | null;
  phone: string;
  amount: number;
  accountReference: string;
  transactionDesc: string;
}): Promise<{ payment: Payment; checkoutRequestId: string }> {
  const token = await getAccessToken();
  const payload = buildStkPushPayload(params);

  const res = await fetch(`${mpesaBaseUrl()}/mpesa/stkpush/v1/processrequest`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await res.json()) as {
    CheckoutRequestID?: string;
    ResponseCode?: string;
    errorMessage?: string;
  };

  if (!res.ok || !data.CheckoutRequestID) {
    logger.error("mpesa_stk_push_failed", { status: res.status, data });
    throw new Error(data.errorMessage ?? "mpesa_stk_push_failed");
  }

  const insertResult = db
    .prepare(
      "INSERT INTO payments (order_id, lead_id, amount, phone, mpesa_checkout_request_id) VALUES (?, ?, ?, ?, ?)",
    )
    .run(params.orderId, params.leadId, params.amount, params.phone, data.CheckoutRequestID);

  const payment = db
    .prepare<[number], Payment>("SELECT * FROM payments WHERE id = ?")
    .get(insertResult.lastInsertRowid as number)!;

  return { payment, checkoutRequestId: data.CheckoutRequestID };
}

interface MpesaCallbackBody {
  Body: {
    stkCallback: {
      CheckoutRequestID: string;
      ResultCode: number;
      ResultDesc: string;
      CallbackMetadata?: {
        Item: { Name: string; Value?: string | number }[];
      };
    };
  };
}

export interface CallbackResult {
  checkoutRequestId: string;
  success: boolean;
  mpesaReceipt: string | null;
  payment: Payment | undefined;
}

/** Handles the Daraja STK push callback: updates the payment row and returns the outcome. */
export function handleStkCallback(body: MpesaCallbackBody): CallbackResult {
  const callback = body.Body.stkCallback;
  const success = callback.ResultCode === 0;
  const items = callback.CallbackMetadata?.Item ?? [];
  const receiptItem = items.find((i) => i.Name === "MpesaReceiptNumber");
  const mpesaReceipt = receiptItem ? String(receiptItem.Value) : null;

  db.prepare(
    "UPDATE payments SET status = ?, mpesa_receipt = ?, updated_at = datetime('now') WHERE mpesa_checkout_request_id = ?",
  ).run(success ? "success" : "failed", mpesaReceipt, callback.CheckoutRequestID);

  const payment = db
    .prepare<[string], Payment>("SELECT * FROM payments WHERE mpesa_checkout_request_id = ?")
    .get(callback.CheckoutRequestID);

  return {
    checkoutRequestId: callback.CheckoutRequestID,
    success,
    mpesaReceipt,
    payment,
  };
}
