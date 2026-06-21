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

export async function searchSanity(q: string): Promise<{ checklists: SearchChecklist[]; blogs: SearchBlog[] }> {
  if (!q.trim()) return { checklists: [], blogs: [] };
  const [checklists, blogs] = await Promise.all([
    client.fetch<SearchChecklist[]>(
      `*[_type == "checklist" && title match $q + "*"][0...24] {
        title,
        "slug": slug.current,
        "category": category->label,
        "color": category->color,
        "textColor": category->textColor,
        "descColor": category->descColor,
        "count": count(documents)
      }`,
      { q }
    ),
    client.fetch<SearchBlog[]>(
      `*[_type == "blogPost" && title match $q + "*"][0...6] {
        title, "slug": slug.current, postType, excerpt, readTime, publishedDate
      }`,
      { q }
    ),
  ]);
  return { checklists, blogs };
}
