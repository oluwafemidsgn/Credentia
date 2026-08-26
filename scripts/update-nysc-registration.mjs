import { createClient } from "next-sanity";
import { readFileSync } from "node:fs";

const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
const get = (k) => {
  const m = env.match(new RegExp("^" + k + "=(.*)$", "m"));
  return m ? m[1].trim().replace(/^["']|["']$/g, "") : "";
};

const client = createClient({
  projectId: get("SANITY_PROJECT_ID") || get("NEXT_PUBLIC_SANITY_PROJECT_ID"),
  dataset: get("SANITY_DATASET") || get("NEXT_PUBLIC_SANITY_DATASET") || "production",
  apiVersion: "2025-06-01",
  token: get("SANITY_API_WRITE_TOKEN"),
  useCdn: false,
});

const REG_ID = "checklist-nysc-registration";

const NERD_DOC = {
  _key: "doc-nysc-nerd",
  _type: "checklistDocument",
  title: "NERD clearance slip",
  description:
    "Mandatory since October 2025 — no NERD slip, no camp registration. You upload your final-year project to the Nigeria Education Repository and Databank (NERD), pass the plagiarism check, get supervisor and HOD approval, then print the clearance slip. It's also required (via a separate route) for foreign-trained graduates. Don't assume your school did it for you — confirm in person that your slip was generated.",
  where: "NERD portal, via your institution or an accredited NERD Digital Service Centre",
  cost: "Free (self-upload) – ₦20,000 (accredited agent)",
  time: "Days to weeks (needs supervisor + HOD approval)",
  prereq: "Completed final-year project",
};

// Fetch current doc keys so we only insert NERD once (idempotent).
const cur = await client.fetch(
  `*[_id == $id][0]{ "keys": documents[]._key }`,
  { id: REG_ID }
);
const keys = cur?.keys || [];

let p = client
  .patch(REG_ID)
  // Fix the medical certificate: government/military only, signed AND stamped.
  .set({
    "documents[_key==\"doc-nysc-6\"].where": "Government or military hospital (not private clinics)",
    "documents[_key==\"doc-nysc-6\"].cost": "₦5,000 – ₦20,000",
    "documents[_key==\"doc-nysc-6\"].time": "Often same day if you arrive early",
    "documents[_key==\"doc-nysc-6\"].description":
      "From a government or military hospital only — private clinics are NOT accepted. It must be both signed and stamped by a doctor employed at that hospital, and is generally treated as valid for about three months. Take two passport photos with you. Required before orientation camp admission.",
    // Passport photos: bring about 12 (8 for registration, 4 spare).
    "documents[_key==\"doc-nysc-4\"].title": "Passport photographs (white background)",
    "documents[_key==\"doc-nysc-4\"].cost": "₦2,000 – ₦5,000 (for 12)",
    "documents[_key==\"doc-nysc-4\"].description":
      "Recent photos on a white background — print about 12 (8 for registration, 4 spare). Plain top, no jewellery. You'll be asked for passports repeatedly throughout the service year.",
    updatedDate: "Aug 2026",
  });

// Insert NERD after the online-registration-form item (doc-nysc-7) if not already present.
if (!keys.includes("doc-nysc-nerd")) {
  const anchor = keys.includes("doc-nysc-7")
    ? 'documents[_key=="doc-nysc-7"]'
    : "documents[-1]";
  p = p.insert("before", anchor, [NERD_DOC]);
}

const res = await p.commit();
console.log(
  "Updated NYSC Registration:",
  res._id,
  "| NERD",
  keys.includes("doc-nysc-nerd") ? "already present" : "added",
  "| medical + photos fixed | date bumped"
);
