import Anthropic from "@anthropic-ai/sdk";
import { config } from "../config.js";
import { buildSystemPrompt } from "./prompt.js";
import { executeTool, tools, type ToolContext } from "./tools.js";
import { getRecentHistory } from "../services/leads.js";
import { logger } from "../utils/logger.js";

const client = new Anthropic({ apiKey: config.anthropic.apiKey });

const MAX_TOOL_ITERATIONS = 6;

/**
 * Runs the agentic conversation loop for a single inbound message: reloads
 * recent history, calls Claude, executes any requested tools, and repeats
 * until Claude produces a final text reply.
 */
export async function generateReply(ctx: ToolContext): Promise<string> {
  const history = getRecentHistory(ctx.leadId, 20);
  const messages: Anthropic.MessageParam[] = history.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  for (let i = 0; i < MAX_TOOL_ITERATIONS; i++) {
    const response = await client.messages.create({
      model: config.anthropic.model,
      max_tokens: 1024,
      system: buildSystemPrompt(),
      thinking: { type: "adaptive" },
      tools,
      messages,
    });

    if (response.stop_reason === "refusal") {
      logger.warn("agent_refusal", { leadId: ctx.leadId });
      return "Sorry, I can't help with that. Let me connect you with a member of our team.";
    }

    if (response.stop_reason !== "tool_use") {
      return extractText(response.content);
    }

    messages.push({ role: "assistant", content: response.content });

    const toolResults: Anthropic.ToolResultBlockParam[] = [];
    for (const block of response.content) {
      if (block.type !== "tool_use") continue;
      const result = await executeTool(block.name, block.input as Record<string, unknown>, ctx);
      toolResults.push({ type: "tool_result", tool_use_id: block.id, content: result });
    }
    messages.push({ role: "user", content: toolResults });
  }

  logger.warn("agent_tool_loop_exhausted", { leadId: ctx.leadId });
  return "Sorry, I'm having trouble processing that right now — a team member will follow up with you shortly.";
}

function extractText(content: Anthropic.ContentBlock[]): string {
  return content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("\n")
    .trim();
}
