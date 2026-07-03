import express from "express";
import { config } from "./config.js";
import { logger } from "./utils/logger.js";
import { verifyWebhook, receiveWebhook } from "./whatsapp/webhook.js";
import { receiveMpesaCallback } from "./whatsapp/mpesaWebhook.js";
import "./db/index.js";

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/webhook/whatsapp", verifyWebhook);
app.post("/webhook/whatsapp", receiveWebhook);
app.post("/webhook/mpesa/callback", receiveMpesaCallback);

app.listen(config.port, () => {
  logger.info("server_started", { port: config.port });
});
