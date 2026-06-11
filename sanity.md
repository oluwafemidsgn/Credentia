# Credentia — Sanity CMS Decisions

All content modeling, schema, and GROQ decisions made for this project.

---

## Studio access

The Sanity Studio is embedded in the Next.js app at the `/studio` route:
- Local: `http://localhost:3000/studio`
- Production: `https://credentia.site/studio`

This keeps the CMS accessible to editors without a separate Sanity-hosted studio URL, and keeps auth within the same domain.

---

## Document types

Three schemas, each with a clear, non-overlapping responsibility:

| Schema | Purpose |
|---|---|
| `category` | Topic areas (Education, Travel, etc.) with color system |
| `checklist` | Document checklists linked to a category |
| `blogPost` | Editorial content: guides, explainers, news |

---

## Category schema

### Why `id` is a slug type (not a plain string)
The `id` field uses `type: "slug"` with `options: { source: "label" }`. This auto-generates a URL-safe identifier from the category label. It's used for:
- Browse page anchor links: `/browse#education`
- GROQ queries that filter by category ID
- Frontend `key` props

A plain string would require editors to manually type URL-safe values and stay consistent. Slug type enforces the format automatically.

### Why colors are stored in the CMS
`color`, `textColor`, and `descColor` are string fields on the category document. This means changing a category's color scheme requires no code deploy — an editor updates the CMS and the change is live within 30 seconds (ISR revalidation window).

All category-colored UI elements (hero cards, tabs, breadcrumb accents) receive their colors via props from the GROQ query result, not from hardcoded values in components.

### `homepageName` vs `label`
- `label` is the full display name ("Business Registration")
- `homepageName` is a shorter version for the compact homepage category grid card ("Business")

This avoids truncation hacks in the UI.

---

## Checklist schema

### Why documents are inline objects, not references
Each `document` in a checklist is stored as an inline array object with fields: `title`, `description`, `where`, `cost`, `time`, `prereq`. They are NOT a separate `checklistDocument` document type.

Rationale: documents only exist in the context of their parent checklist. They have no identity outside of it, are never shared between checklists, and there's no editorial workflow that treats them as standalone items. Inline objects give a better CMS editing experience (add/reorder in one place) and a simpler GROQ query (no `->` dereference needed).

### `sortedCount` is a manual field
The `sortedCount` field tracks how many documents in the checklist have been fully verified. It's a manual number field rather than a computed `count(documents)` because "verified" is a human judgment — a document can exist in the list without having been confirmed accurate yet. Editors increment this as they verify each entry.

### `relatedChecklists` are references
Related checklists at the bottom of a detail page ARE references to other `checklist` documents. Unlike inline documents, these need to point to real, independent checklists that editors maintain separately. The GROQ projection follows the reference with `->` to get `title` and `slug`.

### `location` defaults to "Lagos"
The site is Lagos-focused for now. The field is stored in the CMS so it can be extended to other cities in the future without a schema change.

---

## Blog post schema

### `image` field: `type: "image"` not a string
The cover image field was intentionally changed from a string (SVG radio picker) to `type: "image"` with `options: { hotspot: true }`. This gives editors:
- A proper upload UI in the Studio
- Hotspot/crop controls for responsive focus point
- Sanity CDN delivery (automatic format and size optimization)

The GROQ projection to get the URL: `"image": image.asset->url`

TypeScript type is `string | null` — the field is optional and `image.asset->url` returns null if no image has been uploaded.

### `category` is a string enum, not a reference
Blog category (`guides`, `explainers`, `documents-news`) is a string field with a radio list, not a reference to the `category` document type.

Rationale: blog categories are a fixed, small editorial taxonomy specific to the blog (not the same as document checklist categories). They don't have colors, icons, or any other attributes — they're purely for filtering. A reference would add schema complexity with no benefit. The frontend filter pills map directly to these three values.

### `postType` is separate from `category`
- `category` controls filter pills and routing logic (`guides`, `explainers`, `documents-news`)
- `postType` is the display label shown on the card pill (`Guide`, `Explainer`, `Step-by-step`, `Insight`, etc.)

This separation lets the editorial label on the card be more specific ("Step-by-step") while the filter category remains broad ("guides").

### `featured` boolean flag
One post per page is shown as the large hero card above the grid. The `featured` boolean field marks which post gets that slot. In code: `posts.find((p) => p.featured) ?? posts[0]` — if no post is marked featured, the most recent post is used as fallback.

### Article content structure
Blog articles are structured as:
- `lead` — opening paragraph (displayed large above the image)
- `sections[]` — array of `{ heading, body }` objects (each body separated by `\n\n` for paragraph breaks)
- `takeaways[]` — bullet point strings for the key takeaways box at the end

This is intentionally NOT rich text (Portable Text). The content is simple enough that structured fields give a more consistent rendering without needing a block content renderer. This reduces implementation complexity and avoids needing `@portabletext/react`.

---

## GROQ patterns

### Blog card fields projection
```groq
title,
"slug": slug.current,
postType,
category,
readTime,
publishedDate,
excerpt,
"image": image.asset->url,
featured,
```

This is extracted as a constant `blogCardFields` in `queries.ts` and reused in all blog queries (list, detail, related) to keep projections DRY.

### Image URL projection
```groq
"image": image.asset->url
```
Never project `image` directly — Sanity image fields are objects with `asset`, `hotspot`, and `crop` sub-fields. The `->` dereference follows the asset reference to the CDN URL string.

### Category dereference on checklist
```groq
category-> {
  label,
  "id": id.current,
  color,
  textColor,
}
```
The `->` is needed because `category` on a checklist is a reference to a `category` document. `id.current` extracts the slug string from the slug object.

### Ordering
- Blog posts: `| order(publishedDate desc)` — newest first
- Categories: `| order(order asc)` — manual sort order field
- Checklists within a category: `| order(title asc)` — alphabetical

---

## ISR revalidation

All pages use `export const revalidate = 30` (30 seconds). This means:
- Pages are statically generated at build time
- After 30 seconds, the next request triggers a background regeneration
- Editors see their CMS changes live within ~30 seconds without a full redeploy

This is appropriate for a content site where near-real-time is good enough. If faster updates are needed, Sanity webhook-triggered revalidation can be added later.

---

## Seeding

79 Lagos document checklists across 15 categories were seeded via script in `scripts/`. The seed data covers the full range of Lagos life milestones. Scripts are in the `scripts/` directory and were run once to populate the initial dataset.
