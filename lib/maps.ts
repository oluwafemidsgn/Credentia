/*
 * Turns a checklist document's free-text "Where to get it" value into a
 * Google Maps link — version 1 of the maps fix: a deep link, not an embed,
 * so there is no Maps API key and no billing.
 *
 * The field is plain text written for humans, so values range from a real
 * office ("Lands Bureau, Alausa, Ikeja") to a website ("CAC portal
 * (cac.gov.ng)") to a non-place ("Already with you"). Only clear physical
 * locations get a link — a link to "Any market" is worse than none.
 */

// Named Nigerian institutions. An acronym alone is enough to identify a place.
const INSTITUTIONS = [
  "nimc", "nis", "frsc", "vio", "vis", "lasrra", "lasdri", "laspppa", "lawma",
  "lasema", "laswa", "lashma", "npc", "cac", "firs", "lirs", "nhia", "nafdac",
  "ekedc", "ikedc", "inec", "nysc", "waec", "neco", "jamb", "luth", "lasu",
  "unilag", "nipost", "lsdpc", "nerd",
];

// Generic words that still name a kind of building you can walk into.
const PLACE_WORDS = [
  "office", "registry", "secretariat", "bureau", "court", "hospital", "clinic",
  "centre", "center", "commission", "ministry", "corporation", "agency",
  "department", "embassy", "consulate", "station", "authority", "command",
  "headquarters", "hq", "registrar", "probate", "school", "university",
  "cashier", "zonal", "branch",
];

// Clauses that describe a website, a person, a private vendor, or something
// the applicant already holds.
const NOT_A_PLACE = [
  "portal", "online", "website", "download", "dashboard", "custody",
  "possession", "employer", "landlord", "family", "market", "pharmacy",
  "supermarket", "store", "agent", "lawyer", "solicitor", "contact",
  "guarantor", "newspaper", "airline", "telecom", "network", "shareholder",
  "board", "transfer", "e-portal", "self", "insurer", "insurance",
  "contractor", "consultant", "valuer", "hmo", "polytechnic", "respective",
  "previous", "attended", "administration", "political party", "of origin",
  "that issued", "occurred", "photo studio", "electronics",
];

// Whole-value giveaways that the applicant already has the document.
const ALREADY = ["already", "as issued", "n/a", "issued at", "issued with", "with you", "with applicant"];

// "NAICOM-licensed insurer", "FRSC-accredited driving school": a private
// operator holding a licence, not the licensing body's office.
const LICENSEE = /-\s?(registered|licensed|accredited|approved|certified)\b/i;

/** Splits on separators outside parentheses, so "(Ikoyi or Ikeja)" stays whole. */
function topLevelSplit(s: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let buf = "";
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "(") depth++;
    if (ch === ")") depth = Math.max(0, depth - 1);
    if (depth === 0) {
      if (s.slice(i, i + 4).toLowerCase() === " or ") { parts.push(buf); buf = ""; i += 3; continue; }
      if (s.slice(i, i + 3) === " / ") { parts.push(buf); buf = ""; i += 2; continue; }
      if (ch === "/") { parts.push(buf); buf = ""; continue; }
      if (s.slice(i, i + 2) === ", ") { parts.push(buf); buf = ""; i += 1; continue; }
    }
    buf += ch;
  }
  parts.push(buf);
  return parts.map((p) => p.trim()).filter(Boolean);
}

function hasWord(lower: string, words: string[]): boolean {
  return words.some((w) => new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(lower));
}

function isAcronym(clause: string): boolean {
  return INSTITUTIONS.includes(clause.replace(/[^A-Za-z]/g, "").toLowerCase());
}

/** True when the clause names somewhere you can physically go. */
function isPlace(clause: string): boolean {
  const lower = clause.toLowerCase();
  if (/[a-z0-9-]+\.(com|org|net|gov|ng|io|co|site)\b/.test(lower)) return false;
  if (LICENSEE.test(clause)) return false;
  if (hasWord(lower, NOT_A_PLACE)) return false;
  if (/^your\b/i.test(clause.trim())) return false;

  // A single bare word is only specific enough if it names an institution.
  const words = lower.replace(/\(.*?\)/g, "").trim().split(/\s+/).filter(Boolean);
  if (words.length < 2 && !isAcronym(clause)) return false;

  if (hasWord(lower, INSTITUTIONS)) return true;
  // A generic building word only counts with a proper noun beside it.
  if (!hasWord(lower, PLACE_WORDS)) return false;
  return /\b[A-Z][a-zA-Z]{2,}/.test(clause.replace(/^(?:(?:Any|Each|The|Designated|Approved|Issuing|Registered|Accredited|An?|Via)\s+)+/i, ""));
}

function cleanQuery(clause: string): string {
  return clause
    // Keep bracketed text only when it names a place ("(Ikoyi, Lagos)"), not
    // when it is a note to the reader ("(appointment required)").
    .replace(/\(([^)]*)\)/g, (_m, inner: string) => (/[A-Z][a-z]{2,}/.test(inner) ? ` ${inner} ` : " "))
    .replace(/\b(etc|e\.g|i\.e)\.?/gi, " ")
    .replace(/^(?:(?:Any|Each|The|Designated|Approved|Issuing|Registered|Accredited|An?|Via)\s+)+/i, "")
    .replace(/\s*\b(nearest to|familiar with|approved by)\b.*$/i, "")
    .replace(/\s*\b(in|at|to|from)\s+your\b.*$/i, "")
    // One place per link: cut the alternatives and the address tail.
    .split(/\s+or\s+/i)[0]
    .split(/,/)[0]
    .replace(/[^\w\s&'’-]/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/**
 * Returns a Google Maps search URL for a "where to get it" value, or null
 * when the value isn't a physical location.
 */
export function mapsUrl(where?: string | null, city = "Lagos"): string | null {
  if (!where) return null;
  if (hasWord(where.toLowerCase(), ALREADY)) return null;

  const clause = topLevelSplit(where).find(isPlace);
  if (!clause) return null;

  let query = cleanQuery(clause);
  if (query.length < 4) return null;

  // Anchor the search to a city so a generic office name lands in the right place.
  const place = /\babuja\b/i.test(query) ? "Abuja" : city || "Lagos";
  if (!new RegExp(`\\b${place}\\b`, "i").test(query)) query += `, ${place}`;
  if (!/nigeria/i.test(query)) query += ", Nigeria";

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
