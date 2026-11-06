import type { MetadataRoute } from "next";
import {
  getChecklistsForSitemap,
  getBlogPostsForSitemap,
} from "@/lib/sanity/queries";
import { LAST_UPDATED_ISO as NYSC_LAST_UPDATED_ISO } from "./guides/nysc-camp-checklist/content";

const BASE = "https://credentia.site";

// Match the rest of the site's ISR cadence so new checklists/posts
// appear in the sitemap shortly after publishing.
export const revalidate = 30;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [checklists, posts] = await Promise.all([
    getChecklistsForSitemap(),
    getBlogPostsForSitemap(),
  ]);

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/browse`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    {
      // Long-form guide. Its own last-updated date is the one that matters
      // here, not the build time, so it is pinned to the content constant.
      url: `${BASE}/guides/nysc-camp-checklist`,
      lastModified: new Date(NYSC_LAST_UPDATED_ISO),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    { url: `${BASE}/resources`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/contribute`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/jollof`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const checklistRoutes: MetadataRoute.Sitemap = checklists.map((c) => ({
    url: `${BASE}/checklist/${c.slug}`,
    lastModified: c.updatedAt ? new Date(c.updatedAt) : now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...checklistRoutes, ...blogRoutes];
}
