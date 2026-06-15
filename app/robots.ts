import type { MetadataRoute } from "next";

const BASE = "https://credentia.site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Search + AI crawlers: full access, except the CMS and API routes
      { userAgent: "*", allow: "/", disallow: ["/studio", "/api"] },
      { userAgent: "GPTBot", allow: "/", disallow: ["/studio", "/api"] },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
