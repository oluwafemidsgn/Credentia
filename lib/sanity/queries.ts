import { client, writeClient } from "./client";

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
  checklists: {
    title: string;
    slug: string;
    count: number;
    updatedAt: string;
    updatedLabel: string | null;
  }[];
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
  /** Real last-modified timestamp from Sanity — used for sorting/filtering. */
  updatedAt: string;
  sortedCount: number;
  category: {
    label: string;
    id: string;
    color: string;
    textColor: string;
  };
  documents: SanityChecklistDocument[];
  relatedChecklists: { title: string; slug: string }[];
  relatedGuide: SanityBlogPostCard | null;
  /** Blog posts that point back at this checklist (via their CTA links). */
  taggedPosts: SanityBlogPostCard[];
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
  ctaChecklists?: { title: string; slug: string }[] | null;
};

export type SanityBlogPostCard = Omit<SanityBlogPost, "lead" | "sections" | "takeaways">;

/* ─── Shared projections ─────────────────────────────────── */

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

/* ─── Checklist queries ──────────────────────────────────── */

const checklistFields = `
  title,
  "slug": slug.current,
  location,
  updatedDate,
  "updatedAt": _updatedAt,
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
  relatedGuide-> { ${blogCardFields} },
  "taggedPosts": *[_type == "blogPost" && references(^._id)]
    | order(publishedDate desc) [0...6] { ${blogCardFields} },
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
        "updatedAt": _updatedAt,
        "updatedLabel": updatedDate,
      }
    }
  `);
}

/* ─── Blog post queries ──────────────────────────────────── */

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
      ctaChecklists[]-> { title, "slug": slug.current },
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
  categoryId: string;
  color: string;
  textColor: string;
  descColor: string;
  count: number;
  updatedAt: string;
  updatedLabel: string | null;
  /** The document inside the checklist that matched, when it wasn't the title. */
  matchedDoc?: string | null;
};
export type SearchBlog = {
  title: string;
  slug: string;
  postType: string;
  excerpt: string;
  readTime: string;
  publishedDate: string;
};

// Public card fields.
const CHECKLIST_SEARCH_PROJECTION = `
  title,
  "slug": slug.current,
  "category": category->label,
  "categoryId": category->id.current,
  "color": category->color,
  "textColor": category->textColor,
  "descColor": category->descColor,
  "count": count(documents),
  "updatedAt": _updatedAt,
  "updatedLabel": updatedDate
`;
// Extra text pulled only so results can be ranked, then dropped.
const CHECKLIST_RANK_PROJECTION = `
  ${CHECKLIST_SEARCH_PROJECTION},
  "docTitles": documents[].title,
  "docBodies": documents[].description,
  "docWhere": documents[].where
`;
const BLOG_SEARCH_PROJECTION = `
  title, "slug": slug.current, postType, excerpt, readTime, publishedDate
`;
const BLOG_RANK_PROJECTION = `
  ${BLOG_SEARCH_PROJECTION},
  lead,
  "bodies": sections[].body,
  "headings": sections[].heading,
  takeaways
`;

type RankableChecklist = SearchChecklist & {
  docTitles?: (string | null)[] | null;
  docBodies?: (string | null)[] | null;
  docWhere?: (string | null)[] | null;
};
type RankableBlog = SearchBlog & {
  lead?: string | null;
  bodies?: (string | null)[] | null;
  headings?: (string | null)[] | null;
  takeaways?: (string | null)[] | null;
};

/* ─── Relevance scoring ──────────────────────────────────── */

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
const STOP = new Set(["a", "an", "the", "of", "for", "and", "to", "in", "my", "i", "how", "do", "get", "need"]);

function tokens(q: string): string[] {
  const all = norm(q).split(" ").filter(Boolean);
  const kept = all.filter((t) => !STOP.has(t));
  return kept.length ? kept : all;
}

/** How well `text` matches the query: whole-phrase hits beat scattered words. */
function fieldScore(text: string | null | undefined, phrase: string, toks: string[]): number {
  if (!text) return 0;
  const t = norm(text);
  if (!t) return 0;
  if (t === phrase) return 1;                                      // exact
  if (t.startsWith(phrase)) return 0.9;                            // "passport renewal" ← "passport"
  if (new RegExp(`\\b${phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(t)) return 0.8; // phrase on a word boundary
  if (!toks.length) return 0;
  const hit = toks.filter((k) => new RegExp(`\\b${k}`).test(t)).length;
  if (!hit) return 0;
  return 0.6 * (hit / toks.length);                                // some of the words
}

function bestOf(list: (string | null)[] | null | undefined, phrase: string, toks: string[]) {
  let best = 0;
  let which: string | null = null;
  for (const item of list ?? []) {
    const s = fieldScore(item, phrase, toks);
    if (s > best) { best = s; which = item ?? null; }
  }
  return { score: best, match: which };
}

/*
 * Weights set the tier order the brief asks for: exact title, then titles
 * containing the words, then document names, then the intro / body text.
 */
const W = { title: 100, category: 30, docTitle: 20, docBody: 6, docWhere: 4 };

function scoreChecklist(c: RankableChecklist, phrase: string, toks: string[]) {
  const title = fieldScore(c.title, phrase, toks);
  const docTitle = bestOf(c.docTitles, phrase, toks);
  const docBody = bestOf(c.docBodies, phrase, toks);
  const docWhere = bestOf(c.docWhere, phrase, toks);
  const score =
    title * W.title +
    fieldScore(c.category, phrase, toks) * W.category +
    docTitle.score * W.docTitle +
    docBody.score * W.docBody +
    docWhere.score * W.docWhere;
  // Only name the matching document when the title itself didn't match.
  const matchedDoc = title >= 0.6 ? null : docTitle.match ?? null;
  return { score, matchedDoc };
}

function scoreBlog(b: RankableBlog, phrase: string, toks: string[]) {
  return (
    fieldScore(b.title, phrase, toks) * 100 +
    bestOf(b.headings, phrase, toks).score * 20 +
    fieldScore(b.excerpt, phrase, toks) * 12 +
    fieldScore(b.lead, phrase, toks) * 10 +
    bestOf(b.takeaways, phrase, toks).score * 8 +
    bestOf(b.bodies, phrase, toks).score * 5
  );
}

// The ranking fields are fetched for scoring only — they never reach the
// browser, so the card payload stays small.
function stripChecklist(c: RankableChecklist, matchedDoc: string | null): SearchChecklist {
  return {
    title: c.title,
    slug: c.slug,
    category: c.category,
    categoryId: c.categoryId,
    color: c.color,
    textColor: c.textColor,
    descColor: c.descColor,
    count: c.count,
    updatedAt: c.updatedAt,
    updatedLabel: c.updatedLabel,
    matchedDoc,
  };
}

function stripBlog(b: RankableBlog): SearchBlog {
  return {
    title: b.title,
    slug: b.slug,
    postType: b.postType,
    excerpt: b.excerpt,
    readTime: b.readTime,
    publishedDate: b.publishedDate,
  };
}

// Direct search: matches the query (as a word/prefix) across every text
// field that carries meaning, then ranks the hits by relevance so the most
// on-target checklist is first — not whichever one is alphabetically first.
export async function searchSanity(q: string): Promise<{ checklists: SearchChecklist[]; blogs: SearchBlog[] }> {
  const term = q.trim();
  if (!term) return { checklists: [], blogs: [] };
  const phrase = norm(term);
  const toks = tokens(term);

  // Match on each word, so "renew passport" finds "Passport Renewal".
  const params = {
    term: term + "*",
    terms: toks.map((t) => t + "*"),
  };

  const [rawChecklists, rawBlogs] = await Promise.all([
    client.fetch<RankableChecklist[]>(
      `*[_type == "checklist" && (
        title match $term || title match $terms ||
        category->label match $term ||
        count(documents[
          title match $term || title match $terms ||
          description match $term ||
          where match $term ||
          prereq match $term
        ]) > 0
      )][0...60] { ${CHECKLIST_RANK_PROJECTION} }`,
      params
    ),
    client.fetch<RankableBlog[]>(
      `*[_type == "blogPost" && (
        title match $term || title match $terms ||
        excerpt match $term ||
        lead match $term ||
        postType match $term ||
        count(sections[heading match $term || body match $term]) > 0 ||
        count(takeaways[@ match $term]) > 0
      )][0...30] { ${BLOG_RANK_PROJECTION} }`,
      params
    ),
  ]);

  // GROQ's `match` is generous — a single word buried in an article body is a
  // hit. The floor drops those so the ranked list stays on-topic.
  const FLOOR = 3;

  const checklists = rawChecklists
    .map((c) => ({ c, ...scoreChecklist(c, phrase, toks) }))
    .filter((x) => x.score >= FLOOR)
    .sort((a, b) => b.score - a.score || a.c.title.localeCompare(b.c.title))
    .slice(0, 24)
    .map((x) => stripChecklist(x.c, x.matchedDoc));

  const blogs = rawBlogs
    .map((b) => ({ b, s: scoreBlog(b, phrase, toks) }))
    .filter((x) => x.s >= FLOOR)
    .sort((a, b) => b.s - a.s || a.b.title.localeCompare(b.b.title))
    .slice(0, 10)
    .map((x) => stripBlog(x.b));

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

/* ─── Blog posts for a checklist page ────────────────────── */

/*
 * Which posts the "From the blog" strip on a checklist shows. Explicit CMS
 * tags come first (the Related Guide field, plus any post whose "Get the
 * checklist" CTA points back here). Where a checklist has not been tagged
 * yet, the gap is filled with the closest on-topic posts rather than
 * whatever was published most recently.
 */
export function pickChecklistPosts(
  checklist: SanityChecklist,
  allPosts: SanityBlogPostCard[],
  limit = 3
): SanityBlogPostCard[] {
  const picked: SanityBlogPostCard[] = [];
  const seen = new Set<string>();
  const add = (p?: SanityBlogPostCard | null) => {
    if (!p || seen.has(p.slug)) return;
    seen.add(p.slug);
    picked.push(p);
  };

  add(checklist.relatedGuide);
  (checklist.taggedPosts ?? []).forEach(add);
  if (picked.length >= limit) return picked.slice(0, limit);

  const titleToks = tokens(`${checklist.title} ${checklist.category?.label ?? ""}`);
  const docToks = tokens((checklist.documents ?? []).map((d) => d.title).join(" "));
  const hits = (toks: string[], hay: string) =>
    toks.filter((t) => t.length > 2 && new RegExp(`\\b${t}`, "i").test(hay)).length;

  const ranked = allPosts
    .filter((p) => !seen.has(p.slug))
    .map((p) => {
      const hay = `${p.title} ${p.excerpt}`;
      return { p, s: hits(titleToks, hay) * 3 + hits(docToks, hay) };
    })
    .sort((a, b) => b.s - a.s);

  for (const { p } of ranked) {
    add(p);
    if (picked.length >= limit) break;
  }
  return picked.slice(0, limit);
}

/* ─── Resources (email-gated downloads) ──────────────────── */

// Card metadata shown publicly on /resources. Deliberately excludes the
// actual file / link URL — that is only revealed by the API after an email
// is captured, so the gate can't be bypassed by reading the page source.
export type SanityResourceCard = {
  title: string;
  slug: string;
  description: string;
  category: string | null;
  coverImage: string | null;
  kind: "file" | "link";
  featured: boolean;
};

export async function getAllResources(): Promise<SanityResourceCard[]> {
  return client.fetch(`
    *[_type == "resource" && (defined(file.asset) || defined(externalUrl))]
      | order(featured desc, order asc, _createdAt desc) {
        title,
        "slug": slug.current,
        "description": coalesce(description, ""),
        category,
        "coverImage": coverImage.asset->url,
        "kind": select(defined(file.asset) => "file", "link"),
        "featured": coalesce(featured, false),
      }
  `);
}

// Server-side only: resolves the real download destination for a slug.
// Used by the /api/resource-lead route after the email has been stored.
export async function getResourceDownload(
  slug: string
): Promise<{ title: string; url: string } | null> {
  const r = await client.fetch<{ title: string; fileUrl: string | null; externalUrl: string | null } | null>(
    `*[_type == "resource" && slug.current == $slug][0] {
      title,
      "fileUrl": file.asset->url,
      externalUrl,
    }`,
    { slug }
  );
  if (!r) return null;
  const url = r.fileUrl || r.externalUrl;
  if (!url) return null;
  return { title: r.title, url };
}

// Records a captured email against the resource it unlocked.
export async function saveResourceLead(input: {
  name: string;
  email: string;
  resourceSlug: string;
  resourceTitle: string;
  createdAt: string;
}): Promise<void> {
  await writeClient.create({
    _type: "resourceLead",
    name: input.name,
    email: input.email,
    resourceSlug: input.resourceSlug,
    resourceTitle: input.resourceTitle,
    createdAt: input.createdAt,
  });
}
