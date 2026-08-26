import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-06-01",
  useCdn: true,
  // Pass the token for authenticated (non-CDN) requests when needed
  token: process.env.SANITY_API_READ_TOKEN,
});

// Write client — SERVER ONLY. Uses the write token (no NEXT_PUBLIC_ prefix, so
// it is never bundled to the browser). Used by API routes to store leads etc.
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-06-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});
