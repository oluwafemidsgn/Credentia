# Credentia

> The document directory for Lagos. Find exactly which documents you need for any life milestone — free, no agent required.

Live at **[credentia.site](https://credentia.site)**

---

## What it is

Credentia is a public-good website that answers one question: "What documents do I actually need for this?" — covering passport renewals, school admissions, marriage registration, business registration, and dozens of other Lagos life milestones. Every checklist is free, no signup required.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| CMS | Sanity (hosted) |
| Fonts | Inter + Faculty Glyphic (Google Fonts) |
| Hosting | Vercel |
| Domain | credentia.site |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The Sanity Studio is embedded at [http://localhost:3000/studio](http://localhost:3000/studio).

## Environment variables

Create a `.env.local` file:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

## Project structure

```
app/                    Next.js App Router pages
  page.tsx              Homepage
  browse/               Browse all categories
  checklist/[slug]/     Individual checklist pages
  blog/                 Blog index
  blog/[slug]/          Blog article pages
  coffee/               Support page
  contact/              Contact form
  search/               Search results
  studio/               Embedded Sanity Studio
  components/           Navbar, Footer, shared UI
  icon.png              Favicon source (192×192)
  favicon.ico           Multi-size browser favicon (16/32/48px)
  opengraph-image.png   Static OG share image (1200×630)

lib/sanity/
  client.ts             Sanity client
  queries.ts            GROQ queries and TypeScript types

sanity/schemas/
  category.ts           Document category schema
  checklist.ts          Checklist + documents schema
  blogPost.ts           Blog post schema

public/assets/
  blog-1.svg            Folder background (yellow)
  blog-2.svg            Folder background (blue)
  blog-3.svg            Folder background (purple)
```

## Content management

All content lives in Sanity. There are three document types:

- **Category** — defines a topic area (Education, Travel, etc.) with its color scheme
- **Checklist** — a list of documents needed for a specific task, linked to a category
- **Blog Post** — articles with sections, takeaways, and a cover image

Access the Studio at `/studio` (local) or `credentia.site/studio` (production).

## Deployment

Vercel auto-deploys on push to `main`. To trigger a manual production deploy:

```bash
vercel --prod
```

## Design

See [design.md](design.md) for all design decisions and the visual system.

## Sanity CMS decisions

See [sanity.md](sanity.md) for schema decisions, GROQ patterns, and content modeling choices.
