import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-06-01",
  useCdn: true,
  // Pass the token for authenticated (non-CDN) requests when needed
  token: process.env.SANITY_API_READ_TOKEN,
});
