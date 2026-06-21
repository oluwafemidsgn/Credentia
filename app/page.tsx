import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import {
  getAllBlogPosts,
  getFeaturedChecklists,
  getHomeCategories,
} from "../lib/sanity/queries";

export const revalidate = 30;

/* ─── Data ─────────────────────────────────────────────── */

const FOLDER_SVGS = ["/assets/blog-1.svg", "/assets/blog-2.svg", "/assets/blog-3.svg"];
function folderBg(slug: string) {
  const n = slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return FOLDER_SVGS[n % FOLDER_SVGS.length];
}

/* ─── Category Card ─────────────────────────────────────── */
/*
 * Hover animation: the inner wrapper (tab + card body) moves as one unit —
 * lifts up, casts a drop-shadow on the whole shape (including tab), and the
 * text content slides up to reveal an "Explore →" affordance.
 */
function CategoryCard({
  name,
  label,
  description,
  bg,
  textColor,
  descColor,
  href,
}: {
  name: string;
  label: string;
  description: string;
  bg: string;
  textColor: string;
  descColor: string;
  href: string;
}) {
  return (
    <Link href={href} className="relative select-none group block" style={{ height: "clamp(220px, 18vw, 280px)" }}>
      {/* Inner wrapper — BOTH tab and card body live here so they move together */}
      <div className="absolute inset-0 transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:drop-shadow-xl">
        {/* Tab label */}
        <div
          className="absolute top-0 left-7 z-10 h-10 flex items-center px-4 rounded-tl-2xl rounded-tr-2xl"
          style={{ backgroundColor: bg }}
        >
          <span
            className="font-medium tracking-wide uppercase whitespace-nowrap"
            style={{ color: textColor, fontSize: "clamp(10px, 0.85vw, 13px)" }}
          >
            {label}
          </span>
        </div>
        {/* Card body */}
        <div
          className="absolute inset-x-0 top-6 bottom-0 rounded-[20px] overflow-hidden"
          style={{ backgroundColor: bg }}
        >
          {/* Text block slides up on hover, revealing "Explore →" */}
          <div className="absolute bottom-7 left-8 right-8 lg:left-10 lg:right-10 transition-transform duration-300 group-hover:-translate-y-2">
            <h3
              className="font-display leading-tight tracking-[-0.04em] mb-2"
              style={{ color: textColor, fontSize: "clamp(18px, 2vw, 32px)" }}
            >
              {name}
            </h3>
            <p
              className="leading-[1.4] tracking-[-0.02em]"
              style={{ color: descColor, fontSize: "clamp(12px, 0.95vw, 16px)" }}
            >
              {description}
            </p>
            {/* Appears from below on hover */}
            <div
              className="mt-3 flex items-center gap-1.5 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
            >
              <span
                className="font-medium"
                style={{ color: textColor, fontSize: "clamp(11px, 0.85vw, 13px)" }}
              >
                Explore
              </span>
              <span style={{ color: textColor, fontSize: "clamp(11px, 0.85vw, 14px)" }}>→</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── Checklist Card ────────────────────────────────────── */
function ChecklistCard({ title, category, count, slug }: {
  title: string;
  category: string;
  count: number;
  slug: string;
}) {
  return (
    <Link
      href={`/checklist/${slug}`}
      className="bg-[#f4f4f4] rounded-2xl flex items-center px-8 md:px-16 py-8 md:py-12 group transition-all duration-300 hover:bg-[#ebebeb] hover:shadow-sm"
    >
      <div className="flex flex-col gap-2 flex-1">
        <h3
          className="font-display tracking-[-0.04em] text-[#292929] leading-tight"
          style={{ fontSize: "clamp(18px, 2.2vw, 32px)" }}
        >
          {title}
        </h3>
        <div className="flex items-center gap-3 md:gap-4">
          <span
            className="text-[#505050] uppercase tracking-[-0.02em]"
            style={{ fontSize: "clamp(11px, 0.95vw, 16px)" }}
          >
            {category}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#505050] shrink-0" />
          <span
            className="text-[#505050] uppercase tracking-[-0.02em]"
            style={{ fontSize: "clamp(11px, 0.95vw, 16px)" }}
          >
            {count} {count === 1 ? "document" : "documents"}
          </span>
        </div>
      </div>
      <span className="text-[#292929] opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-xl ml-4 shrink-0">
        →
      </span>
    </Link>
  );
}

/* ─── Blog Card ─────────────────────────────────────────── */
/*
 * Three layers: coloured folder SVG, a white box holding the uploaded
 * photo (if any), and the post-type pill on the exposed folder strip.
 * Links to the article page at /blog/[slug].
 */
function BlogCard({
  type,
  readTime,
  date,
  title,
  excerpt,
  image,
  slug,
}: {
  type: string;
  readTime: string;
  date: string;
  title: string;
  excerpt: string;
  image: string | null;
  slug: string;
}) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="bg-[#f4f4f4] rounded-2xl flex-1 flex flex-col group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >

      {/* ── Image area ───────────────────────────────── */}
      <div className="relative shrink-0" style={{ height: "clamp(200px, 24vw, 340px)" }}>
        {/* Layer 1 — coloured folder SVG */}
        <div className="absolute inset-[11px_11px_0]">
          <img src={folderBg(slug)} alt="" className="w-full h-full" />
        </div>

        {/* Layer 2 — white image-container frame (holds the uploaded photo) */}
        <div className="absolute top-[22px] inset-x-[22px] bottom-[52px] bg-white rounded-2xl overflow-hidden">
          {image
            ? <img src={image} alt="" className="w-full h-full object-cover" />
            : <div className="w-full h-full bg-white" />}
        </div>

        {/* Layer 3 — tag on the exposed folder strip */}
        <div className="absolute bottom-[6px] left-7 z-10">
          <span
            className="flex items-center bg-white/90 backdrop-blur-sm text-[#444] uppercase font-medium px-3 py-1.5 rounded-full"
            style={{ fontSize: "clamp(10px, 0.8vw, 12px)", letterSpacing: "0.05em" }}
          >
            {type}
          </span>
        </div>
      </div>

      {/* ── Text content ─────────────────────────────── */}
      <div className="flex flex-col gap-5 p-7 md:p-9 flex-1">
        {/* Date meta */}
        <div className="flex items-center gap-3 text-[#505050]">
          <span className="uppercase tracking-[-0.02em]" style={{ fontSize: "clamp(10px, 0.85vw, 13px)" }}>
            {readTime}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#505050] shrink-0" />
          <span className="uppercase tracking-[-0.02em]" style={{ fontSize: "clamp(10px, 0.85vw, 13px)" }}>
            {date}
          </span>
        </div>

        {/* Title + excerpt */}
        <div className="flex flex-col gap-3 flex-1">
          <h3
            className="font-display text-[#292929] leading-tight tracking-[-0.04em]"
            style={{ fontSize: "clamp(20px, 2.6vw, 40px)" }}
          >
            {title}
          </h3>
          <p
            className="text-[#505050] leading-[1.4] tracking-[-0.02em]"
            style={{ fontSize: "clamp(12px, 0.95vw, 16px)" }}
          >
            {excerpt}
          </p>
        </div>

        {/* Read more affordance — fades in on hover */}
        <div className="flex items-center gap-2 text-[#232323] opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <span className="font-medium" style={{ fontSize: "clamp(11px, 0.85vw, 13px)" }}>
            Read article
          </span>
          <span style={{ fontSize: "clamp(11px, 0.85vw, 14px)" }}>→</span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Page ──────────────────────────────────────────────── */
export default async function Home() {
  const [allPosts, featuredChecklists, homeCategories] = await Promise.all([
    getAllBlogPosts(),
    getFeaturedChecklists(),
    getHomeCategories(),
  ]);
  const blogPosts = allPosts.slice(0, 3);
  const mostViewed = featuredChecklists.slice(0, 4);
  const quickTags = featuredChecklists.slice(4, 10);

  return (
    <main className="bg-white overflow-x-hidden pt-[70px]">

      <Navbar />

      {/* ── Hero ───────────────────────────────────────── */}
      {/*
       * No overflow-hidden — blobs are allowed to breathe past the section
       * boundary into the search area below, creating a soft colour fade.
       * Horizontal overflow is handled by overflow-x-hidden on <main>.
       */}
      <section className="relative pt-16 md:pt-24 pb-12 md:pb-16 px-5 text-center">

        {/* ── Background colour blobs ──────────────────── */}
        <div className="blob-hero-1 absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full bg-[#ccbaf8] opacity-50 blur-[130px] pointer-events-none" />
        <div className="blob-hero-2 absolute -top-24 -right-32 w-[480px] h-[480px] rounded-full bg-[#efd536] opacity-[0.22] blur-[110px] pointer-events-none" />
        {/* blob-3 intentionally extends below the section for a smooth colour bleed */}
        <div className="blob-hero-3 absolute bottom-[-120px] left-[38%] -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-[#8bcef7] opacity-[0.22] blur-[100px] pointer-events-none" />

        {/* ── Floating document chips ───────────────────── */}
        {/*
         * Visible at xl (≥1280px) — at that width the centred 834px heading
         * leaves ~223px each side, so chips are kept within that safe zone.
         * --chip-rotate is read inside @keyframes float-chip so the tilt
         * stays consistent throughout the animation cycle.
         */}

        {/* Left side — tucked within the first ~210 px from the edge */}
        <div
          className="chip-1 hidden xl:flex absolute top-[22%] left-[1%] items-center gap-2.5 bg-white/85 backdrop-blur-md border border-white/60 shadow-lg px-4 py-3 rounded-full pointer-events-none select-none"
          style={{ "--chip-rotate": "-10deg" } as React.CSSProperties}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#8bcef7] shrink-0" />
          <span className="text-[13px] font-medium text-[#444]">International Passport</span>
        </div>

        <div
          className="chip-3 hidden xl:flex absolute top-[53%] left-[3%] items-center gap-2.5 bg-white/85 backdrop-blur-md border border-white/60 shadow-lg px-4 py-2.5 rounded-full pointer-events-none select-none"
          style={{ "--chip-rotate": "8deg" } as React.CSSProperties}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#efd536] shrink-0" />
          <span className="text-[13px] font-medium text-[#444]">Birth Certificate</span>
        </div>

        <div
          className="chip-5 hidden xl:flex absolute top-[75%] left-[4%] items-center gap-2.5 bg-white/85 backdrop-blur-md border border-white/60 shadow-lg px-4 py-2.5 rounded-full pointer-events-none select-none"
          style={{ "--chip-rotate": "-16deg" } as React.CSSProperties}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#be3738] shrink-0" />
          <span className="text-[13px] font-medium text-[#444]">NIN Slip</span>
        </div>

        {/* Right side */}
        <div
          className="chip-2 hidden xl:flex absolute top-[20%] right-[1%] items-center gap-2.5 bg-white/85 backdrop-blur-md border border-white/60 shadow-lg px-4 py-3 rounded-full pointer-events-none select-none"
          style={{ "--chip-rotate": "12deg" } as React.CSSProperties}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#6f00ed] shrink-0" />
          <span className="text-[13px] font-medium text-[#444]">NYSC Certificate</span>
        </div>

        <div
          className="chip-4 hidden xl:flex absolute top-[51%] right-[3%] items-center gap-2.5 bg-white/85 backdrop-blur-md border border-white/60 shadow-lg px-4 py-2.5 rounded-full pointer-events-none select-none"
          style={{ "--chip-rotate": "-8deg" } as React.CSSProperties}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#efd536] shrink-0" />
          <span className="text-[13px] font-medium text-[#444]">Transcript</span>
        </div>

        <div
          className="chip-6 hidden xl:flex absolute top-[74%] right-[5%] items-center gap-2.5 bg-white/85 backdrop-blur-md border border-white/60 shadow-lg px-4 py-2.5 rounded-full pointer-events-none select-none"
          style={{ "--chip-rotate": "18deg" } as React.CSSProperties}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#be3738] shrink-0" />
          <span className="text-[13px] font-medium text-[#444]">PVC</span>
        </div>

        {/* ── Hero copy ────────────────────────────────── */}
        <div className="relative z-10 max-w-[834px] mx-auto flex flex-col gap-6 md:gap-8 items-center">
          <h1
            className="font-display leading-none text-[#232323] tracking-[-0.04em]"
            style={{ fontSize: "clamp(2.5rem, 6.5vw, 6rem)" }}
          >
            Every document for
            <br />
            every step of life.
          </h1>
          <p
            className="font-medium leading-[1.4] text-[#232323] tracking-[-0.02em] max-w-[500px]"
            style={{ fontSize: "clamp(0.875rem, 1.1vw, 1rem)" }}
          >
            Search, and find every document you need, why you need, and where to get them.
          </p>
        </div>
      </section>

      {/* ── Search ─────────────────────────────────────── */}
      <section className="flex flex-col gap-4 items-center px-5 pb-16 md:pb-20 w-full max-w-[720px] mx-auto">
        <SearchBar white />

        {/* Pills — single line, scrolls on narrow viewports */}
        <div className="flex gap-2 items-center w-full overflow-x-auto scrollbar-none pb-0.5">
          {quickTags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/checklist/${tag.slug}`}
              className="border border-[#e0e0e0] font-medium text-[#232323] tracking-[-0.02em] px-4 py-2 rounded-full hover:border-[#ccbaf8] hover:bg-[#f9f5ff] active:scale-95 transition-all whitespace-nowrap shrink-0"
              style={{ fontSize: "clamp(11px, 0.9vw, 14px)" }}
            >
              {tag.title}
            </Link>
          ))}
        </div>
      </section>

      {/* ── Most viewed checklist ──────────────────────── */}
      <section className="px-5 sm:px-10 lg:px-20 pb-16 md:pb-24 max-w-[1920px] mx-auto">
        <h2
          className="font-medium text-[#232323] tracking-[-0.04em] mb-8 md:mb-12"
          style={{ fontSize: "clamp(1.125rem, 2.2vw, 2rem)" }}
        >
          Most viewed checklist this month
        </h2>
        {/* 1 col → 2 col */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          {mostViewed.map((item) => (
            <ChecklistCard key={item.slug} {...item} />
          ))}
        </div>
      </section>

      {/* ── Browse by category ─────────────────────────── */}
      <section className="px-5 sm:px-10 lg:px-20 pb-16 md:pb-24 max-w-[1920px] mx-auto">
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <h2
            className="font-medium text-[#232323] tracking-[-0.04em]"
            style={{ fontSize: "clamp(1.125rem, 2.2vw, 2rem)" }}
          >
            Browse by category
          </h2>
          <Link
            href="/browse"
            className="border border-[#e0e0e0] font-medium text-[#232323] tracking-[-0.02em] px-4 py-2 rounded-full hover:border-[#ccbaf8] hover:bg-[#f9f5ff] transition-all whitespace-nowrap"
            style={{ fontSize: "clamp(11px, 0.9vw, 14px)" }}
          >
            SEE ALL
          </Link>
        </div>
        {/* 1 col → 2 col → 4 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 overflow-visible">
          {homeCategories.map((cat) => (
            <CategoryCard
              key={cat.id}
              name={cat.name}
              label={cat.label}
              description={cat.description}
              bg={cat.color}
              textColor={cat.textColor}
              descColor={cat.descColor}
              href={`/browse#${cat.id}`}
            />
          ))}
        </div>
      </section>

      {/* ── From the blog ──────────────────────────────── */}
      <section className="px-5 sm:px-10 lg:px-20 pb-16 md:pb-24 max-w-[1920px] mx-auto">
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <h2
            className="font-medium text-[#232323] tracking-[-0.04em]"
            style={{ fontSize: "clamp(1.125rem, 2.2vw, 2rem)" }}
          >
            From the blog
          </h2>
          <Link
            href="/blog"
            className="border border-[#e0e0e0] font-medium text-[#232323] tracking-[-0.02em] px-4 py-2 rounded-full hover:border-[#ccbaf8] hover:bg-[#f9f5ff] transition-all whitespace-nowrap"
            style={{ fontSize: "clamp(11px, 0.9vw, 14px)" }}
          >
            ALL POST
          </Link>
        </div>
        {/* Stacked on mobile, side-by-side on desktop */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10">
          {blogPosts.map((post) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              type={post.postType}
              readTime={post.readTime}
              date={post.publishedDate}
              title={post.title}
              excerpt={post.excerpt}
              image={post.image}
            />
          ))}
        </div>
      </section>


      <Footer />
    </main>
  );
}
