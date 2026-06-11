@AGENTS.md

# Credentia — AI Agent Context

## What this project is
Credentia (`credentia.site`) is a document directory for Lagos, Nigeria. It tells people exactly which documents they need for any life milestone — passport renewal, school admission, marriage registration, etc. — completely free. Content is managed in Sanity CMS. The site is deployed on Vercel.

## Tech stack
- **Next.js 16** App Router, TypeScript, Tailwind CSS v4
- **Sanity CMS** for all content (categories, checklists, blog posts)
- **Vercel** for hosting; custom domain `credentia.site`
- **next/font** for fonts (Inter + Faculty Glyphic from Google Fonts)
- **ISR** — all pages use `export const revalidate = 30`

## Project structure
```
app/
  layout.tsx          — root layout, metadata, OG tags, fonts
  page.tsx            — homepage
  browse/             — browse all categories
  checklist/[slug]/   — individual checklist detail pages
  blog/               — blog index (filter pills, featured post, grid)
  blog/[slug]/        — blog article pages
  coffee/             — support / buy-us-a-coffee page
  contact/            — contact form
  search/             — search results
  studio/             — embedded Sanity Studio at /studio
  components/         — Navbar, Footer, shared components
  icon.png            — auto-served as favicon (192×192)
  favicon.ico         — multi-size ICO (16/32/48px), overrides browser default
  opengraph-image.png — static 1200×630 OG share image

lib/sanity/
  client.ts           — Sanity client config
  queries.ts          — all GROQ queries + TypeScript types

sanity/
  schemas/            — category, checklist, blogPost schemas
  sanity.config.ts    — Studio config

public/assets/        — blog-1.svg, blog-2.svg, blog-3.svg (folder backgrounds)
```

## Key patterns and conventions

### Fonts
- `font-display` class → Faculty Glyphic (headings, hero text)
- `font-sans` / default → Inter (body, UI)
- Defined in `globals.css` via `@theme inline`

### Responsive typography
- Use `clamp()` for fluid type that scales with viewport: `style={{ fontSize: "clamp(min, vw, max)" }}`
- Use explicit Tailwind breakpoint steps for layout: `text-[1.35rem] sm:text-[1.75rem] md:text-[2.5rem]`
- Never use raw `clamp()` for mobile-critical headings — use explicit steps so small phones get a safe size

### Blog card visual hierarchy
Three absolute layers inside a relative container:
1. Coloured folder SVG background: `absolute inset-[11px_11px_0]`
2. White rounded image box: `absolute top-[22px] inset-x-[22px] bottom-[52px] bg-white rounded-2xl overflow-hidden` — uploaded photo goes INSIDE this div
3. Category pill: `absolute bottom-[6px] left-7 z-10`

`folderBg(slug)` deterministically rotates `blog-1.svg / blog-2.svg / blog-3.svg` based on slug char sum mod 3 — so different posts get different brand colours without a CMS field.

### Category color system
Colors live in Sanity (`category.color`, `category.textColor`, `category.descColor`). Hero cards, tabs, and breadcrumbs all pull colors from the CMS. Never hardcode category colors in components.

### Blog filters
- Filter state is client-side in `BlogClient.tsx`
- When "All": show featured hero + grid (featured excluded from grid to avoid duplicate)
- When a category is active: hide featured hero, show only matching posts in grid
- `gridPosts` = filtered posts minus the featured slug

### OG / social sharing
- Static PNG at `app/opengraph-image.png` (1200×630) — Next.js App Router auto-serves it
- Do not use `ImageResponse` / dynamic OG — it has known issues with HTML entities and edge rendering
- `metadataBase` is set to `https://credentia.site` in `layout.tsx`

### Favicon
- `app/icon.png` (192×192 purple folder) is the primary source
- `app/favicon.ico` is a proper multi-size ICO (16/32/48px) built from `icon.png` — browsers always prefer `.ico`, so both files must exist and be correct

### Sanity image fields
- Image fields use `type: "image"` with `options: { hotspot: true }` — NOT string URL fields
- GROQ projection: `"image": image.asset->url` to get the CDN URL
- TypeScript type: `image: string | null` (asset URL can be absent if no image uploaded)

### Sanity Studio
- Embedded at `/studio` route via `app/studio/[[...tool]]/page.tsx`
- Access in production at `credentia.site/studio`

## Deployment
```bash
vercel --prod
```
Vercel auto-deploys on push to `main`. The `credentia.site` custom domain is configured in Vercel dashboard.

## Environment variables
- `NEXT_PUBLIC_SANITY_PROJECT_ID` — Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` — usually `production`
- `SANITY_API_TOKEN` — write token for Sanity mutations (if needed)
