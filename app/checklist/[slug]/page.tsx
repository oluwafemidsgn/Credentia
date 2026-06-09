import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ChecklistContent from "./ChecklistContent";
import { getChecklistBySlug, getAllChecklistSlugs, getAllBlogPosts } from "../../../lib/sanity/queries";

export async function generateStaticParams() {
  const slugs = await getAllChecklistSlugs();
  return slugs.map((slug) => ({ slug }));
}

function BlogCard({
  type,
  readTime,
  date,
  title,
  excerpt,
  img,
  slug,
}: {
  type: string;
  readTime: string;
  date: string;
  title: string;
  excerpt: string;
  img: string;
  slug: string;
}) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="bg-[#f4f4f4] rounded-2xl flex-1 flex flex-col group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative shrink-0" style={{ height: "clamp(180px, 22vw, 320px)" }}>
        <div className="absolute inset-[11px_11px_0]">
          <img src={img} alt="" className="w-full h-full" />
        </div>
        <div className="absolute top-[22px] inset-x-[22px] bottom-[52px] bg-white rounded-2xl" />
        <div className="absolute bottom-[6px] left-7 z-10">
          <span
            className="flex items-center bg-white/90 backdrop-blur-sm text-[#444] uppercase font-medium px-3 py-1.5 rounded-full"
            style={{ fontSize: "clamp(10px, 0.8vw, 12px)", letterSpacing: "0.05em" }}
          >
            {type}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-7 md:p-9 flex-1">
        <div className="flex items-center justify-between text-[#505050]">
          <span className="uppercase tracking-[-0.02em]" style={{ fontSize: "clamp(10px, 0.85vw, 13px)" }}>
            {type}
          </span>
          <div className="flex items-center gap-3">
            <span className="uppercase tracking-[-0.02em]" style={{ fontSize: "clamp(10px, 0.85vw, 13px)" }}>
              {readTime}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#505050] shrink-0" />
            <span className="uppercase tracking-[-0.02em]" style={{ fontSize: "clamp(10px, 0.85vw, 13px)" }}>
              {date}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3 flex-1">
          <h3
            className="font-display text-[#292929] leading-tight tracking-[-0.04em]"
            style={{ fontSize: "clamp(18px, 2.2vw, 36px)" }}
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

export default async function ChecklistPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [checklist, allPosts] = await Promise.all([
    getChecklistBySlug(slug),
    getAllBlogPosts(),
  ]);

  if (!checklist) notFound();

  const blogPosts = allPosts.slice(0, 3);

  return (
    <main className="bg-white overflow-x-hidden pt-[70px]">
      <Navbar />

      {/* ── Hero card ─────────────────────────────────────── */}
      <div className="px-5 sm:px-10 lg:px-20 pt-8 pb-0 max-w-[1920px] mx-auto">
        <div className="relative" style={{ height: "clamp(200px, 16vw, 292px)" }}>
          {/* Tab */}
          <div
            className="absolute top-0 left-7 z-10 h-10 flex items-center px-4 rounded-tl-2xl rounded-tr-2xl"
            style={{ backgroundColor: checklist.category.color }}
          >
            <span
              className="font-medium tracking-wide uppercase"
              style={{ color: checklist.category.textColor, fontSize: "clamp(10px, 0.8vw, 13px)" }}
            >
              {checklist.category.label.toUpperCase()}
            </span>
          </div>
          {/* Body */}
          <div
            className="absolute inset-x-0 top-6 bottom-0 rounded-[20px] flex flex-col justify-end px-10 md:px-16 pb-10 md:pb-14 gap-4 md:gap-6"
            style={{ backgroundColor: checklist.category.color }}
          >
            <p
              className="text-[#505050] tracking-[-0.02em]"
              style={{ fontSize: "clamp(11px, 0.85vw, 16px)" }}
            >
              <Link href="/browse" className="hover:underline">Browse</Link>
              {" → "}
              <Link href={`/browse#${checklist.category.id}`} className="hover:underline">
                {checklist.category.label}
              </Link>
              {" → "}
              {checklist.title}
            </p>
            <h1
              className="font-display text-[#292929] leading-none tracking-[-0.04em]"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
            >
              {checklist.title}
            </h1>
            <div
              className="flex flex-wrap items-center gap-3 md:gap-4 text-[#505050]"
              style={{ fontSize: "clamp(11px, 0.85vw, 16px)" }}
            >
              <span>{checklist.documents.length} documents</span>
              <span className="w-1 h-1 rounded-full bg-[#505050] shrink-0" />
              <span>{checklist.sortedCount} of {checklist.documents.length} sorted</span>
              <span className="w-1 h-1 rounded-full bg-[#505050] shrink-0" />
              <span>Updated {checklist.updatedDate}</span>
              <span className="w-1 h-1 rounded-full bg-[#505050] shrink-0" />
              <span>{checklist.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Interactive content (client component) ────────── */}
      <ChecklistContent checklist={checklist} />

      {/* ── From the blog ─────────────────────────────────── */}
      {blogPosts.length > 0 && (
        <section className="px-5 sm:px-10 lg:px-20 pb-16 md:pb-24 max-w-[1920px] mx-auto">
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <h2
              className="font-medium text-[#232323] tracking-[-0.04em]"
              style={{ fontSize: "clamp(1.25rem, 2vw, 2rem)" }}
            >
              From the blog
            </h2>
            <Link
              href="/blog"
              className="border border-[#e0e0e0] font-medium text-[#232323] tracking-[-0.02em] px-4 py-2 rounded-full hover:border-[#ccbaf8] hover:bg-[#f9f5ff] transition-all whitespace-nowrap"
              style={{ fontSize: "clamp(11px, 0.9vw, 14px)" }}
            >
              ALL POSTS
            </Link>
          </div>
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
                img={post.image}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── Watermark ─────────────────────────────────────── */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <p
          aria-hidden
          className="absolute bottom-0 left-0 right-0 text-center font-bold text-[#f4f4f4] leading-none pointer-events-none select-none whitespace-nowrap translate-y-[45%]"
          style={{
            fontSize: "clamp(80px, 23vw, 432px)",
            letterSpacing: "clamp(-4px, -1.2vw, -21.6px)",
          }}
        >
          Credentia
        </p>
        <p
          className="relative z-10 text-center font-display text-[#232323] leading-[1.2] max-w-[1260px] mx-auto px-5 md:px-8 tracking-[-0.04em]"
          style={{ fontSize: "clamp(2rem, 5.5vw, 6rem)" }}
        >
          No agent. No guessing. Free, and built for Lagos first.
        </p>
      </section>

      <Footer />
    </main>
  );
}
