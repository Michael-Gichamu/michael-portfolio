export interface Lead {
  id: number;
  phone: string;
  name: string | null;
  status: "new" | "qualified" | "customer" | "human_handoff";
  created_at: string;
  updated_at: string;
}

export interface ConversationMessage {
  id: number;
  lead_id: number;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export interface Appointment {
  id: number;
  lead_id: number;
  service: string;
  slot_start: string;
  slot_end: string;
  status: "booked" | "cancelled";
  created_at: string;
}

export interface Order {
  id: number;
  lead_id: number;
  status: "open" | "awaiting_payment" | "paid" | "cancelled";
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Payment {
  id: number;
  order_id: number | null;
  lead_id: number;
  amount: number;
  phone: string;
  status: "pending" | "success" | "failed";
  mpesa_checkout_request_id: string | null;
  mpesa_receipt: string | null;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface Service {
  id: string;
  name: string;
  durationMinutes: number;
}
