import type Anthropic from "@anthropic-ai/sdk";
import { getAvailableSlots, bookAppointment } from "../services/booking.js";
import { catalog, findProduct, findService } from "../services/catalog.js";
import { addItemToOrder, getOrderSummary } from "../services/orders.js";
import { initiateStkPush } from "../services/mpesa.js";
import { updateLeadName, updateLeadStatus } from "../services/leads.js";
import { notifyOwner } from "../services/notify.js";
import { logger } from "../utils/logger.js";

export const tools: Anthropic.Tool[] = [
  {
    name: "check_availability",
    description:
      "Look up open appointment slots for a given service on a given date. Call this before booking so you can offer the customer real options.",
    input_schema: {
      type: "object",
      properties: {
        date: { type: "string", description: "Date to check, format YYYY-MM-DD." },
      },
      required: ["date"],
    },
  },
  {
    name: "book_appointment",
    description:
      "Book a confirmed appointment slot for the customer. Only call this after the customer has picked an exact date and time returned by check_availability.",
    input_schema: {
      type: "object",
      properties: {
        service: { type: "string", description: "Name of the service being booked." },
        date: { type: "string", description: "Date, format YYYY-MM-DD." },
        time: { type: "string", description: "Start time, 24h format HH:MM." },
        customer_name: { type: "string", description: "The customer's name, if known." },
      },
      required: ["service", "date", "time"],
    },
  },
  {
    name: "list_products",
    description: "List all products/packages available for purchase, with prices.",
    input_schema: { type: "object", properties: {} },
  },
  {
    name: "add_to_order",
    description: "Add a product to the customer's current order (cart).",
    input_schema: {
      type: "object",
      properties: {
        product_name: { type: "string", description: "Product name or ID." },
        quantity: { type: "integer", description: "Quantity to add. Defaults to 1." },
      },
      required: ["product_name"],
    },
  },
  {
    name: "get_order_summary",
    description: "Get the customer's current order items and total price.",
    input_schema: { type: "object", properties: {} },
  },
  {
    name: "request_payment",
    description:
      "Trigger an M-Pesa STK push prompt on the customer's phone to collect payment. Use the current order total unless an explicit amount is given.",
    input_schema: {
      type: "object",
      properties: {
        amount: { type: "number", description: "Amount in KES. Omit to use the current order total." },
        reason: { type: "string", description: "Short description of what the payment is for." },
      },
      required: [],
    },
  },
  {
    name: "escalate_to_human",
    description:
      "Flag this conversation for a human team member to take over. Use for complaints, refunds, or anything outside your scope, or if the customer asks for a human.",
    input_schema: {
      type: "object",
      properties: {
        reason: { type: "string", description: "Why this needs a human." },
      },
      required: ["reason"],
    },
  },
];

export interface ToolContext {
  leadId: number;
  phone: string;
}

export async function executeTool(
  name: string,
  input: Record<string, unknown>,
  ctx: ToolContext,
): Promise<string> {
  try {
    switch (name) {
      case "check_availability": {
        const date = String(input.date);
        const slots = getAvailableSlots(date);
        if (slots.length === 0) {
          return JSON.stringify({ date, available: [], note: "No open slots this day." });
        }
        return JSON.stringify({ date, available: slots.map((s) => s.start.split(" ")[1]) });
      }

      case "book_appointment": {
        const service = findService(String(input.service))?.name ?? String(input.service);
        const date = String(input.date);
        const time = String(input.time);
        const start = `${date} ${time}`;
        const [h, m] = time.split(":").map(Number);
        const endMinutes = h * 60 + m + 30;
        const end = `${date} ${Math.floor(endMinutes / 60)
          .toString()
          .padStart(2, "0")}:${(endMinutes % 60).toString().padStart(2, "0")}`;

        if (input.customer_name) {
          updateLeadName(ctx.leadId, String(input.customer_name));
        }
        const appointment = bookAppointment(ctx.leadId, service, start, end);
        updateLeadStatus(ctx.leadId, "qualified");
        void notifyOwner(
          `New booking: ${service} on ${start} for lead #${ctx.leadId} (${ctx.phone}).`,
        );
        return JSON.stringify({ booked: true, appointment });
      }

      case "list_products":
        return JSON.stringify({ products: catalog });

      case "add_to_order": {
        const product = findProduct(String(input.product_name));
        if (!product) {
          return JSON.stringify({ added: false, error: "product_not_found" });
        }
        const quantity = Number(input.quantity ?? 1) || 1;
        addItemToOrder(ctx.leadId, product.id, product.name, product.price, quantity);
        const summary = getOrderSummary(ctx.leadId);
        return JSON.stringify({ added: true, order: summary });
      }

      case "get_order_summary": {
        const summary = getOrderSummary(ctx.leadId);
        return JSON.stringify(summary);
      }

      case "request_payment": {
        const summary = getOrderSummary(ctx.leadId);
        const amount = Number(input.amount ?? summary.total);
        if (!amount || amount <= 0) {
          return JSON.stringify({ initiated: false, error: "no_amount_to_charge" });
        }
        const { checkoutRequestId } = await initiateStkPush({
          leadId: ctx.leadId,
          orderId: summary.items.length > 0 ? summary.order.id : null,
          phone: ctx.phone,
          amount,
          accountReference: `LEAD-${ctx.leadId}`,
          transactionDesc: String(input.reason ?? "Payment"),
        });
        return JSON.stringify({ initiated: true, checkoutRequestId, amount });
      }

      case "escalate_to_human": {
        updateLeadStatus(ctx.leadId, "human_handoff");
        void notifyOwner(
          `Escalation needed for lead #${ctx.leadId} (${ctx.phone}): ${String(input.reason)}`,
        );
        return JSON.stringify({ escalated: true });
      }

      default:
        return JSON.stringify({ error: `unknown_tool:${name}` });
    }
  } catch (err) {
    logger.error("tool_execution_failed", { name, error: String(err) });
    return JSON.stringify({ error: String(err instanceof Error ? err.message : err) });
  }
}
