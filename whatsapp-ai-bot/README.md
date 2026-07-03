# WhatsApp AI Bot

An AI-powered WhatsApp assistant that engages inbound leads 24/7: it answers
questions, qualifies leads, books appointments, takes product orders, and
collects payment via M-Pesa — all inside a WhatsApp conversation, with zero
manual replies.

Built for businesses that get a high volume of WhatsApp inquiries and can't
staff instant responses around the clock. The bot uses Claude with tool use
to hold a real conversation while calling into real business logic (a
calendar, a product catalog, an M-Pesa STK push) rather than following a
rigid decision tree.

## How it works

```
WhatsApp message ──▶ Cloud API webhook ──▶ Claude (tool use) ──▶ reply
                                               │
                        ┌──────────────────────┼──────────────────────┐
                        ▼                      ▼                      ▼
                 check_availability      add_to_order           request_payment
                 book_appointment        get_order_summary            │
                        │                      │                      ▼
                        ▼                      ▼               M-Pesa STK push
                   appointments            orders/order_items         │
                        │                                             ▼
                        └──────────────── SQLite ◀── M-Pesa callback webhook
```

Every inbound message is appended to the lead's conversation history, sent
to Claude along with a system prompt describing the business and a set of
tools, and the agent loop runs until Claude produces a final reply (calling
as many tools as it needs along the way — checking availability, booking a
slot, adding items to a cart, or kicking off an M-Pesa STK push). The
business owner gets a WhatsApp notification on new bookings, escalations,
and payment results.

## Stack

- **Node.js + TypeScript + Express** — webhook server
- **WhatsApp Cloud API** (Meta) — official Business API, not an unofficial/
  reverse-engineered client, so it won't get the number banned
- **Claude (`@anthropic-ai/sdk`)** — conversation + tool-use agent
- **better-sqlite3** — leads, conversations, appointments, orders, payments
- **Safaricom Daraja API (STK Push)** — M-Pesa payment collection

## Setup

1. **Install dependencies**

   ```sh
   npm install
   ```

2. **Copy the env file and fill in credentials**

   ```sh
   cp .env.example .env
   ```

   - `ANTHROPIC_API_KEY` — from [console.anthropic.com](https://console.anthropic.com/)
   - `WHATSAPP_ACCESS_TOKEN` / `WHATSAPP_PHONE_NUMBER_ID` — from a
     [Meta WhatsApp Business App](https://developers.facebook.com/docs/whatsapp/cloud-api/get-started)
   - `WHATSAPP_VERIFY_TOKEN` — any string you choose; must match what you
     enter in the Meta webhook configuration
   - `MPESA_*` — from the [Safaricom Daraja portal](https://developer.safaricom.co.ke/);
     start with `MPESA_ENV=sandbox` and the default sandbox shortcode `174379`
   - `OWNER_WHATSAPP_NUMBER` — where booking/order/escalation notifications go

3. **Edit the business config**

   - `src/data/business.json` — services, working hours, slot length
   - `src/data/catalog.json` — products/packages and prices

4. **Run locally**

   ```sh
   npm run dev
   ```

   Expose it publicly (e.g. `ngrok http 3000`) and point the Meta app's
   webhook at `https://<your-url>/webhook/whatsapp` and the M-Pesa
   `MPESA_CALLBACK_URL` at `https://<your-url>/webhook/mpesa/callback`.

5. **Verify the webhook** in the Meta App dashboard — it calls
   `GET /webhook/whatsapp` with a challenge token that must match
   `WHATSAPP_VERIFY_TOKEN`.

## Project layout

```
src/
  ai/            system prompt, tool definitions, agentic loop (Claude)
  whatsapp/      Cloud API client + inbound webhook + M-Pesa callback route
  services/      leads, booking, catalog, orders, mpesa, owner notifications
  db/            SQLite schema + connection
  data/          business.json (hours/services) and catalog.json (products)
  config.ts      env var loading/validation
  server.ts      Express entrypoint
test/            vitest unit + DB-integration tests for the pure/business logic
```

## Testing

```sh
npm test          # run once
npm run test:watch
npm run typecheck
```

## Notes on going to production

- Swap `CLAUDE_MODEL` to a faster/cheaper model (e.g. `claude-haiku-4-5`) if
  message volume is very high and latency/cost matters more than the
  highest-quality replies — the default (`claude-opus-4-8`) prioritizes
  conversation quality.
- SQLite is fine for a single instance; move to Postgres if you need to run
  more than one server process behind a load balancer.
- Set `MPESA_ENV=production` and switch to your paybill/till shortcode once
  you're out of the Daraja sandbox.
- The in-memory `processedMessageIds` de-dupe set in
  `src/whatsapp/webhook.ts` is per-process — fine for one instance, but swap
  for a shared store (Redis) if you scale horizontally.
