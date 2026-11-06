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

Optional, server-only:

```
# Slack Incoming Webhook — posts resource downloads, checklist contributions
# and contact messages into a channel. Leave it unset to disable.
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T000/B000/xxxxxxxx
```

To create the webhook, go to api.slack.com/apps → **Create New App**, then take
either path:

**From a manifest** (fastest): choose the workspace, paste the contents of
[`slack-app-manifest.json`](slack-app-manifest.json), review, and **Create**.
Incoming webhooks are already switched on in it.

**From scratch:** name the app and pick the workspace, then open **Incoming
Webhooks** in the sidebar and toggle *Activate Incoming Webhooks* on.

Either way, finish with **Add New Webhook to Workspace** → choose the channel →
**Allow**, then copy the URL under *Webhook URLs for Your Workspace*. Paste it
into `.env.local` and into the Vercel project's Environment Variables (all
environments), then redeploy.

The manifest requests one scope, `incoming-webhook`, which only allows posting
to the single channel you pick. It cannot read messages.

## Project structure

```
app/                    Next.js App Router pages
  page.tsx              Homepage
  browse/               Browse all categories
  checklist/[slug]/     Individual checklist pages
  blog/                 Blog index
  blog/[slug]/          Blog article pages
  guides/               Hand-built long-form guides (not CMS-driven)
  resources/            Email-gated PDF downloads
  contribute/           Community checklist submissions
  jollof/               Support page (/coffee redirects here)
  contact/              Contact form
  search/               Search results
  privacy/, terms/      Legal pages
  api/                  Route handlers
  studio/               Embedded Sanity Studio
  components/           Navbar, Footer, shared UI
  icon.png              Favicon source (192×192)
  favicon.ico           Multi-size browser favicon (16/32/48px)
  opengraph-image.png   Static OG share image (1200×630)

lib/
  escapeHtml.ts         Escapes user input used in email HTML
  sanity/client.ts      Sanity read + write clients
  sanity/queries.ts     GROQ queries and TypeScript types

sanity/schemas/
  category.ts           Document category schema
  checklist.ts          Checklist + documents schema
  blogPost.ts           Blog post schema
  adSlot.ts             Per-category sponsor banner
  resource.ts           Downloadable resource (PDF or link)
  resourceLead.ts       Captured email from a resource download

public/assets/
  blog-1.svg            Folder background (yellow)
  blog-2.svg            Folder background (blue)
  blog-3.svg            Folder background (purple)
```

## Content management

All content lives in Sanity. There are six document types:

- **Category** — defines a topic area (Education, Travel, etc.) with its color scheme
- **Checklist** — a list of documents needed for a specific task, linked to a category
- **Blog Post** — articles with sections, takeaways, and a cover image
- **Sponsor / Ad** — a banner shown on every checklist in one category
- **Resource** — a downloadable PDF or link, gated behind an email on `/resources`
- **Resource Lead** — an email captured by a download, written by the API, read-only in practice

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
