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

const GUIDE = "blogPost-nysc-honestly";
const CHECKLISTS = ["checklist-nysc-registration", "checklist-nysc-camp-day"];

for (const id of CHECKLISTS) {
  await client
    .patch(id)
    .set({ relatedGuide: { _type: "reference", _ref: GUIDE } })
    .commit();
  console.log(`Linked ${id} → guide ${GUIDE}`);
}
