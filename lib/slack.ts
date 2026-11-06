// Slack notifications for inbound site events (resource downloads, checklist
// contributions, contact messages).
//
// Every notification here is a SIDE EFFECT. A download or a form submission
// must succeed whether or not Slack does, so nothing in this file is allowed
// to throw or to delay the response:
//
//   - the POST is scheduled with `after()` so it runs once the response has
//     already been sent (a bare floating promise can be killed when the
//     serverless function returns),
//   - every failure path is caught and logged,
//   - a missing SLACK_WEBHOOK_URL is a no-op, not an error.
//
// The webhook URL is server-only. Never prefix it with NEXT_PUBLIC_.

import { after } from "next/server";

/** A short label/value pair, rendered two-up in a Slack fields section. */
export type SlackField = { label: string; value: string };

/** A long free-text body, rendered as its own block with the text verbatim. */
export type SlackBody = { label: string; value: string };

export type SlackNotification = {
  /** Header line, e.g. "New resource download". Keep it short. */
  heading: string;
  /** Plain-text fallback used in notifications and unfurls. */
  summary: string;
  /** Short facts: who, what, when. */
  fields?: SlackField[];
  /** Long user-supplied text (a message, a list of documents). */
  bodies?: SlackBody[];
  /** Small footer line, e.g. where on the site this came from. */
  footer?: string;
};

// Slack's own limits, applied defensively so an oversized submission degrades
// into a truncated message instead of a rejected one.
const MAX_HEADER = 150;
const MAX_TEXT = 2800;
const MAX_FIELDS = 10;

/**
 * Escape text for Slack.
 *
 * Slack requires exactly three replacements, and only these three — see
 * https://docs.slack.dev/messaging/formatting-message-text. Do NOT use
 * `escapeHtml` here: its `&quot;` / `&#39;` entities are not interpreted by
 * Slack and would show up literally in the channel.
 *
 * Escaping `<` and `>` is the part that matters for safety: it stops a
 * submission from smuggling Slack's own link syntax (`<https://evil|click>`)
 * or a special mention (`<!channel>`) into a message we read.
 */
export function escapeSlackText(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function truncate(value: string, max: number): string {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

/** Build the Block Kit payload. Exported so it can be tested without a webhook. */
export function buildSlackPayload(notification: SlackNotification) {
  const { heading, summary, fields = [], bodies = [], footer } = notification;

  const blocks: unknown[] = [
    {
      type: "header",
      text: { type: "plain_text", text: truncate(heading, MAX_HEADER), emoji: true },
    },
  ];

  const usable = fields.filter((f) => f.value).slice(0, MAX_FIELDS);
  if (usable.length > 0) {
    blocks.push({
      type: "section",
      fields: usable.map((f) => ({
        type: "mrkdwn",
        // Label is ours, so it can be bold mrkdwn. Value is the submitter's,
        // so it gets escaped.
        text: truncate(`*${f.label}*\n${escapeSlackText(f.value)}`, MAX_TEXT),
      })),
    });
  }

  for (const body of bodies) {
    if (!body.value) continue;
    blocks.push({ type: "divider" });
    blocks.push({
      type: "section",
      text: { type: "mrkdwn", text: truncate(`*${body.label}*`, MAX_TEXT) },
    });
    blocks.push({
      type: "section",
      // plain_text, not mrkdwn: asterisks, underscores and backticks in a
      // submission render literally instead of reformatting the message.
      text: {
        type: "plain_text",
        text: truncate(escapeSlackText(body.value), MAX_TEXT),
        emoji: false,
      },
    });
  }

  if (footer) {
    blocks.push({
      type: "context",
      elements: [{ type: "mrkdwn", text: truncate(escapeSlackText(footer), MAX_TEXT) }],
    });
  }

  return { text: truncate(escapeSlackText(summary), MAX_TEXT), blocks };
}

let warnedMissingWebhook = false;

async function post(url: string, notification: SlackNotification): Promise<void> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildSlackPayload(notification)),
      // Slack returns a short "ok" almost immediately; don't hang a function
      // slot on a stalled connection.
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(`Slack notification failed: ${response.status} ${detail.slice(0, 200)}`);
    }
  } catch (error) {
    console.error("Slack notification failed:", error);
  }
}

/**
 * Send a Slack notification. Fire and forget: this never throws, never
 * rejects, and never blocks the response.
 *
 * @param webhookUrl Optional override, for routing an event to its own
 *   channel later without touching the call sites' shape.
 */
export function notifySlack(
  notification: SlackNotification,
  webhookUrl = process.env.SLACK_WEBHOOK_URL
): void {
  if (!webhookUrl) {
    if (!warnedMissingWebhook) {
      warnedMissingWebhook = true;
      console.warn("SLACK_WEBHOOK_URL is not set — skipping Slack notifications.");
    }
    return;
  }

  try {
    // Runs after the response is flushed, so a slow Slack never slows a
    // download. `after` throws if called outside a request scope, hence the
    // fallback below.
    after(() => post(webhookUrl, notification));
  } catch {
    void post(webhookUrl, notification);
  }
}
