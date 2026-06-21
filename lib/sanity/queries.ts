import { client } from "./client";

/* ─── Types ──────────────────────────────────────────────── */

export type SanityCategory = {
  label: string;
  id: string;
  color: string;
  textColor: string;
  descColor: string;
  description: string;
  homepageName: string;
  order: number;
  checklists: { title: string; slug: string; count: number }[];
};

export type SanityChecklistDocument = {
  title: string;
  description: string;
  where: string;
  cost: string;
  time: string;
  prereq: string;
};

export type SanityChecklist = {
  title: string;
  slug: string;
  location: string;
  updatedDate: string;
  sortedCount: number;
  category: {
    label: string;
    id: string;
    color: string;
    textColor: string;
  };
  documents: SanityChecklistDocument[];
  relatedChecklists: { title: string; slug: string }[];
  ad: { image: string | null; link: string; alt: string | null } | null;
};

export type SanityBlogPost = {
  title: string;
  slug: string;
  postType: string;
  category: string;
  readTime: string;
  publishedDate: string;
  excerpt: string;
  image: string | null;
  featured?: boolean;
  lead: string;
  sections: { heading: string; body: string }[];
  takeaways: string[];
};

export type SanityBlogPostCard = Omit<SanityBlogPost, "lead" | "sections" | "takeaways">;

/* ─── Checklist queries ──────────────────────────────────── */

const checklistFields = `
  title,
  "slug": slug.current,
  location,
  updatedDate,
  sortedCount,
  category-> {
    label,
    "id": id.current,
    color,
    textColor,
  },
  documents[] {
    title,
    description,
    where,
    cost,
    time,
    prereq,
  },
  relatedChecklists[]-> {
    title,
    "slug": slug.current,
  },
  "ad": *[_type == "adSlot" && active == true && category._ref == ^.category._ref][0] {
    "image": image.asset->url,
    link,
    alt,
  }
`;

export async function getAllChecklistSlugs(): Promise<string[]> {
  const results = await client.fetch<{ slug: string }[]>(
    `*[_type == "checklist"]{ "slug": slug.current }`
  );
  return results.map((r) => r.slug);
}

export async function getChecklistBySlug(slug: string): Promise<SanityChecklist | null> {
  return client.fetch(
    `*[_type == "checklist" && slug.current == $slug][0] { ${checklistFields} }`,
    { slug }
  );
}

/* ─── Homepage queries ──────────────────────────────────── */

export type HomeChecklist = {
  title: string;
  slug: string;
  category: string;
  count: number;
};

// Most recently updated checklists — used for the homepage feature cards
// and the quick-search pills.
export async function getFeaturedChecklists(): Promise<HomeChecklist[]> {
  return client.fetch(`
    *[_type == "checklist"] | order(_updatedAt desc) [0...12] {
      title,
      "slug": slug.current,
      "category": category->label,
      "count": count(documents)
    }
  `);
}

export type HomeCategory = {
  name: string;
  label: string;
  description: string;
  color: string;
  textColor: string;
  descColor: string;
  id: string;
};

// First N categories (by order) for the homepage "Browse by category" teaser.
export async function getHomeCategories(): Promise<HomeCategory[]> {
  return client.fetch(`
    *[_type == "category"] | order(order asc) [0...6] {
      "name": coalesce(homepageName, label),
      label,
      description,
      color,
      textColor,
      descColor,
      "id": id.current
    }
  `);
}

/* ─── Browse / category queries ─────────────────────────── */

export async function getAllCategories(): Promise<SanityCategory[]> {
  return client.fetch(`
    *[_type == "category"] | order(order asc) {
      label,
      "id": id.current,
      color,
      textColor,
      descColor,
      description,
      homepageName,
      order,
      "checklists": *[_type == "checklist" && references(^._id)] | order(title asc) {
        title,
        "slug": slug.current,
        "count": count(documents),
      }
    }
  `);
}

/* ─── Blog post queries ──────────────────────────────────── */

const blogCardFields = `
  title,
  "slug": slug.current,
  postType,
  category,
  readTime,
  publishedDate,
  excerpt,
  "image": image.asset->url,
  featured,
`;

export async function getAllBlogPosts(): Promise<SanityBlogPostCard[]> {
  return client.fetch(`*[_type == "blogPost"] | order(publishedDate desc) { ${blogCardFields} }`);
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const results = await client.fetch<{ slug: string }[]>(
    `*[_type == "blogPost"]{ "slug": slug.current }`
  );
  return results.map((r) => r.slug);
}

export async function getBlogPostBySlug(slug: string): Promise<SanityBlogPost | null> {
  return client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      ${blogCardFields}
      lead,
      sections[] { heading, body },
      takeaways,
    }`,
    { slug }
  );
}

export async function getRelatedBlogPosts(slug: string, count = 3): Promise<SanityBlogPostCard[]> {
  return client.fetch(
    `*[_type == "blogPost" && slug.current != $slug] | order(publishedDate desc) [0...$count] { ${blogCardFields} }`,
    { slug, count }
  );
}

/* ─── Sitemap ────────────────────────────────────────────── */

export type SitemapEntry = { slug: string; updatedAt: string };

export async function getChecklistsForSitemap(): Promise<SitemapEntry[]> {
  return client.fetch(
    `*[_type == "checklist" && defined(slug.current)]{ "slug": slug.current, "updatedAt": _updatedAt }`
  );
}

export async function getBlogPostsForSitemap(): Promise<SitemapEntry[]> {
  return client.fetch(
    `*[_type == "blogPost" && defined(slug.current)]{ "slug": slug.current, "updatedAt": _updatedAt }`
  );
}

/* ─── Search ─────────────────────────────────────────────── */

export type SearchChecklist = {
  title: string;
  slug: string;
  category: string;
  color: string;
  textColor: string;
  descColor: string;
  count: number;
};
export type SearchBlog = { title: string; slug: string; postType: string; excerpt: string; readTime: string; publishedDate: string };

const CHECKLIST_SEARCH_PROJECTION = `
  title,
  "slug": slug.current,
  "category": category->label,
  "color": category->color,
  "textColor": category->textColor,
  "descColor": category->descColor,
  "count": count(documents)
`;
const BLOG_SEARCH_PROJECTION = `
  title, "slug": slug.current, postType, excerpt, readTime, publishedDate
`;

// Direct search: matches the query (as a word/prefix) across every text
// field that carries meaning — not just the title.
export async function searchSanity(q: string): Promise<{ checklists: SearchChecklist[]; blogs: SearchBlog[] }> {
  const term = q.trim();
  if (!term) return { checklists: [], blogs: [] };
  const params = { term: term + "*" };
  const [checklists, blogs] = await Promise.all([
    client.fetch<SearchChecklist[]>(
      `*[_type == "checklist" && (
        title match $term ||
        category->label match $term ||
        count(documents[
          title match $term ||
          description match $term ||
          where match $term ||
          prereq match $term
        ]) > 0
      )][0...24] { ${CHECKLIST_SEARCH_PROJECTION} }`,
      params
    ),
    client.fetch<SearchBlog[]>(
      `*[_type == "blogPost" && (
        title match $term ||
        excerpt match $term ||
        lead match $term ||
        postType match $term ||
        count(sections[heading match $term || body match $term]) > 0 ||
        count(takeaways[@ match $term]) > 0
      )][0...10] { ${BLOG_SEARCH_PROJECTION} }`,
      params
    ),
  ]);
  return { checklists, blogs };
}

/* ─── Fuzzy "did you mean" fallback ──────────────────────── */

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  const dp = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j];
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return dp[n];
}

function wordSim(q: string, w: string): number {
  if (!w) return 0;
  if (w.startsWith(q) || q.startsWith(w)) return 0.95;
  return 1 - levenshtein(q, w) / Math.max(q.length, w.length);
}

// How close is the query to a piece of text (best word match or whole-string).
function similarity(q: string, text: string): number {
  const t = text.toLowerCase();
  if (!t) return 0;
  if (t.includes(q)) return 1;
  let best = 1 - levenshtein(q, t) / Math.max(q.length, t.length);
  for (const w of t.split(/[^a-z0-9]+/)) best = Math.max(best, wordSim(q, w));
  return best;
}

// When a direct search finds nothing, surface the closest titles instead —
// catches typos and "I didn't know that's what it's called" cases.
export async function getCloseMatches(q: string): Promise<{ checklists: SearchChecklist[]; blogs: SearchBlog[] }> {
  const norm = q.trim().toLowerCase();
  if (norm.length < 2) return { checklists: [], blogs: [] };
  const [allC, allB] = await Promise.all([
    client.fetch<SearchChecklist[]>(`*[_type == "checklist"] { ${CHECKLIST_SEARCH_PROJECTION} }`),
    client.fetch<SearchBlog[]>(`*[_type == "blogPost"] { ${BLOG_SEARCH_PROJECTION} }`),
  ]);
  const THRESH = 0.5;
  const checklists = allC
    .map((c) => ({ c, s: Math.max(similarity(norm, c.title), similarity(norm, c.category ?? "")) }))
    .filter((x) => x.s >= THRESH)
    .sort((a, b) => b.s - a.s)
    .slice(0, 6)
    .map((x) => x.c);
  const blogs = allB
    .map((b) => ({ b, s: similarity(norm, b.title) }))
    .filter((x) => x.s >= THRESH)
    .sort((a, b) => b.s - a.s)
    .slice(0, 3)
    .map((x) => x.b);
  return { checklists, blogs };
}
