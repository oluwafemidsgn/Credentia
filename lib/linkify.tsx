import type { ReactNode } from "react";

/*
 * Turns plain-text web addresses and email addresses inside CMS copy into real
 * links. Sanity fields are plain strings, so a value like
 * "Approved bank or frsc.gov.ng" arrives as text — this makes the address
 * tappable without asking editors to write HTML.
 *
 * Handles:
 *   https://nimc.gov.ng/enrol   → full URLs
 *   frsc.gov.ng                 → bare domains (no scheme)
 *   portal.nysc.org.ng/login    → multi-level domains with a path
 *   hello@credentia.site        → emails (mailto:)
 */

// Recognised endings. Bare words only become links when they end in one of
// these, so "e.g" or "etc." never turn into a link by accident.
const TLD = [
  "com", "org", "net", "gov", "edu", "int", "mil",
  "ng", "io", "co", "info", "biz", "app", "dev", "site", "online", "africa",
].join("|");

const PATTERN = new RegExp(
  [
    // 1. email
    String.raw`[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}`,
    // 2. explicit scheme
    String.raw`https?:\/\/[^\s<>"']+`,
    // 3. bare domain, optional path/query
    String.raw`(?:www\.)?[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)*\.(?:${TLD})(?:\.ng)?(?:\/[^\s<>"']*)?`,
  ].join("|"),
  "gi"
);

// Trailing sentence punctuation belongs to the sentence, not the address.
const TRAILING = /[.,;:!?)\]'"»]+$/;

export function hrefFor(raw: string): string {
  if (raw.includes("@") && !raw.includes("/")) return `mailto:${raw}`;
  if (/^https?:\/\//i.test(raw)) return raw;
  return `https://${raw}`;
}

/** Splits text into plain strings and link nodes. */
export function linkify(text: string, className?: string): ReactNode[] {
  if (!text) return [];
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;

  for (const m of text.matchAll(PATTERN)) {
    const start = m.index ?? 0;
    let token = m[0];

    // Give trailing punctuation back to the surrounding text.
    const tail = token.match(TRAILING)?.[0] ?? "";
    if (tail) token = token.slice(0, -tail.length);
    if (!token) continue;

    // An unbalanced closing paren is part of the sentence: "(cac.gov.ng)".
    let trail = tail;
    while (token.endsWith(")") && (token.match(/\(/g) ?? []).length < (token.match(/\)/g) ?? []).length) {
      trail = ")" + trail;
      token = token.slice(0, -1);
    }

    if (start > last) out.push(text.slice(last, start));
    out.push(
      <a
        key={`l${key++}`}
        href={hrefFor(token)}
        target="_blank"
        rel="noopener noreferrer"
        className={className ?? "underline decoration-[#ccbaf8] decoration-2 underline-offset-2 hover:text-[#6F00ED] hover:decoration-[#6F00ED] transition-colors break-words"}
      >
        {token}
      </a>
    );
    if (trail) out.push(trail);
    last = start + m[0].length;
  }

  if (last < text.length) out.push(text.slice(last));
  return out.length ? out : [text];
}

/** Drop-in replacement for rendering a plain-text CMS string. */
export function Linkify({ text, className }: { text?: string | null; className?: string }) {
  if (!text) return null;
  return <>{linkify(text, className)}</>;
}
