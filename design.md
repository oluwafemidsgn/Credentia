# Credentia — Design Decisions

All design decisions made during this project. Source of truth for the visual system.

---

## Typography

### Typefaces
- **Faculty Glyphic** — display font for all headings, hero text, card titles, article titles. Loaded via `next/font/google`, mapped to `--font-display` and the `font-display` Tailwind class.
- **Inter** — body font for all UI text, descriptions, metadata, navigation. Loaded via `next/font/google`, mapped to `--font-sans`.

### Scale approach
Two strategies are used depending on context:

**`clamp()` for fluid desktop-to-large-screen scaling:**
```
style={{ fontSize: "clamp(min, vw, max)" }}
```
Used for headings that should scale smoothly as the viewport grows (e.g. hero title, article heading).

**Explicit Tailwind breakpoint steps for mobile-critical text:**
```
className="text-[1.35rem] sm:text-[1.75rem] md:text-[2.5rem]"
```
Used where `clamp()` on small phones would still produce text that is too large. The explicit `text-[Xrem]` base step guarantees a safe size even on 360px-wide screens.

The rule: if the text appears in a hero or primary heading on a mobile page, use explicit steps. If it's only visible on medium+ screens, `clamp()` is fine.

---

## Color palette

Defined as CSS custom properties in `globals.css` via Tailwind v4's `@theme inline`:

| Token | Hex | Usage |
|---|---|---|
| `--color-brand-purple` | `#351459` | Primary CTA buttons, active filter pills, logo |
| `--color-brand-lavender` | `#ccbaf8` | Hover states, guides category accent, CTA hover |
| `--color-text-primary` | `#232323` | All primary headings and body text |
| `--color-text-secondary` | `#505050` | Subtitles, meta text, descriptions |
| `--color-text-muted` | `#9b9b9b` | Empty states, placeholder text |
| `--color-surface` | `#f4f4f4` | Card backgrounds, input backgrounds |

### Category colors (stored in Sanity)
Category colors are not hardcoded in components — they live in the Sanity `category` document and are fetched at build time. This lets the CMS editor change a category's color without a code deploy.

Approximate values for the current Lagos categories:
- Education: `#efd536` (yellow)
- Travel: `#8bcef7` (blue)
- Civic: `#be3738` (red)
- Work: `#6f00ed` (purple)

Blog post category accents (hardcoded in blog article page since they map 1:1 to a fixed enum):
- `guides` → `#ccbaf8` (lavender)
- `explainers` → `#8bcef7` (sky blue)
- `documents-news` → `#efd536` (yellow)

---

## Card visual system

### Checklist / hero cards (browse, homepage)
Cards use a tab-and-body structure:
- A small colored tab sits at the top-left corner of the card (`rounded-tl-2xl rounded-tr-2xl`)
- The card body fills from below the tab, using the same category color
- The tab label shows the category name in uppercase small caps

### Blog cards — three-layer system
All blog cards (grid cards, featured hero, related cards, checklist page blog section) use the same three-layer absolute positioning:

```
[relative container]
  Layer 1 — Colored folder SVG background
    absolute inset-[11px_11px_0]  (or 16px/14px for larger cards)
    <img src={folderBg(slug)} />

  Layer 2 — White image container (midground)
    absolute top-[22px] inset-x-[22px] bottom-[52px]
    bg-white rounded-2xl overflow-hidden
    → uploaded cover photo goes INSIDE here (object-cover)
    → white fallback if no image uploaded

  Layer 3 — Category pill (foreground)
    absolute bottom-[6px] left-7 z-10
    bg-white/90 backdrop-blur-sm, rounded-full
```

The uploaded photo lives INSIDE the white box, not behind it. The white box clips and rounds the image.

### Folder background rotation
`folderBg(slug)` deterministically assigns one of three folder SVGs to a post based on its slug:
```ts
const n = slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
return FOLDER_SVGS[n % FOLDER_SVGS.length]; // blog-1, blog-2, blog-3
```
This gives visual variety across the blog grid without requiring a CMS field. The same slug always gets the same folder color.

---

## Layout and spacing

- Max content width: `max-w-[1920px] mx-auto` for full-bleed sections
- Standard horizontal padding: `px-5 sm:px-10 lg:px-20`
- Navbar height: `70px` — all pages have `pt-[70px]` on the `<main>` element
- Sections are separated with `pb-16 md:pb-24` bottom padding

---

## Navigation

- Sticky navbar at `pt-[70px]` offset
- Active states use brand purple (`#351459`)
- Filter pills: inactive = `border-[#e0e0e0]`, hover = `border-[#ccbaf8] bg-[#f9f5ff]`, active = `bg-[#351459] text-white`

---

## Blog page filter behavior

- "All" view: featured post hero (full-width 2-col card) + post grid below
- Category filter active: featured hero hidden, filtered grid only fills the space
- Featured post is always excluded from the grid (lives only in the hero slot) to avoid duplication
- Empty state message if a filter returns no posts

---

## Responsive design rules

- Desktop and laptop views are never changed when fixing mobile — all responsive work targets mobile-only
- Browse page filter pills: `flex md:flex-wrap overflow-x-auto` — horizontal scroll on mobile, wraps on desktop
- Each filter pill has `shrink-0` so they never compress on small screens
- Breadcrumbs hidden on xs: `hidden sm:block`
- Info cards on checklist detail page always `grid-cols-2` (never stack to 1 column)
- On checklist detail page, "All documents in this checklist" sidebar appears BEFORE the document content on mobile

---

## Favicon and social sharing

### Favicon
- Source file: `app/icon.png` (192×192px, purple folder icon, light background)
- `app/favicon.ico` is a proper multi-size ICO file with 16px, 32px, and 48px frames
- Both files are required: browsers prefer `.ico`, but Next.js App Router uses `icon.png` as the canonical source
- The ICO was built using raw Python struct binary writing (Pillow's `save()` only produced a single 16px frame)

### OG share image
- Static PNG at `app/opengraph-image.png` (1200×630px)
- Exported directly from Figma (node 77:5199 — yellow card with stacked document tabs)
- Static PNG is used instead of dynamic `ImageResponse` — dynamic rendering had issues with HTML entity encoding (`&apos;` is invalid in edge JSX) and font loading on the edge runtime
- `metadataBase` is set to `https://credentia.site` so relative OG image URLs resolve correctly

---

## Figma source

Design source: `https://www.figma.com/design/M4HS0gWSNzvTCS0Ieo2BJG/Ade-brain-child`

Key nodes:
- `94:5448` — brand icon variations (used for favicon selection)
- `77:5199` — OG share sheet card (exported as static PNG)

Implementation follows the Figma design screen-by-screen. When in doubt about a spacing or color decision, the Figma file is the source of truth.

---

## Animations

- Blog cards and checklist cards: `hover:-translate-y-1 hover:shadow-lg transition-all duration-300`
- "Read article" link inside blog cards: fades in on hover via `opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0`
- Homepage hero chips float using `@keyframes float-chip` defined in `globals.css`

---

## No watermark policy

The grey "Credentia" text watermark in the footer was removed from all pages. The brand is expressed through the logo, colors, and favicon — not a background text mark.
