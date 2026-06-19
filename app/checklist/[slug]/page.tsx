import { notFound } from "next/navigation";

const FOLDER_SVGS = ["/assets/blog-1.svg", "/assets/blog-2.svg", "/assets/blog-3.svg"];
function folderBg(slug: string) {
  const n = slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return FOLDER_SVGS[n % FOLDER_SVGS.length];
}
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ChecklistContent from "./ChecklistContent";

export const revalidate = 30;
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
  img: string | null;
  slug: string;
}) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="bg-[#f4f4f4] rounded-2xl flex-1 flex flex-col group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative shrink-0" style={{ height: "clamp(180px, 22vw, 320px)" }}>
        <div className="absolute inset-[11px_11px_0]">
          <img src={folderBg(slug)} alt="" className="w-full h-full" />
        </div>
        <div className="absolute top-[22px] inset-x-[22px] bottom-[52px] bg-white rounded-2xl overflow-hidden">
          {img
            ? <img src={img} alt="" className="w-full h-full object-cover" />
            : <div className="w-full h-full bg-white" />}
        </div>
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
      <div className="px-4 sm:px-8 lg:px-20 pt-6 sm:pt-8 pb-0 max-w-[1920px] mx-auto">
        <div className="relative" style={{ height: "clamp(180px, 16vw, 292px)" }}>
          {/* Tab */}
          <div
            className="absolute top-0 left-5 sm:left-7 z-10 h-8 sm:h-10 flex items-center px-3 sm:px-4 rounded-tl-2xl rounded-tr-2xl"
            style={{ backgroundColor: checklist.category.color }}
          >
            <span
              className="font-medium tracking-wide uppercase text-[10px] sm:text-[11px]"
              style={{ color: checklist.category.textColor }}
            >
              {checklist.category.label.toUpperCase()}
            </span>
          </div>
          {/* Body */}
          <div
            className="absolute inset-x-0 top-6 bottom-0 rounded-[20px] flex flex-col justify-center px-5 sm:px-10 md:px-16 py-5 sm:py-8 md:py-10 gap-2 sm:gap-4 md:gap-6"
            style={{ backgroundColor: checklist.category.color }}
          >
            <p className="text-[#505050] tracking-[-0.02em] text-[11px] sm:text-[13px] md:text-[15px] hidden sm:block">
              <Link href="/browse" className="hover:underline">Browse</Link>
              {" → "}
              <Link href={`/browse#${checklist.category.id}`} className="hover:underline">
                {checklist.category.label}
              </Link>
              {" → "}
              {checklist.title}
            </p>
            <h1 className="font-display text-[#292929] leading-none tracking-[-0.04em] text-[1.35rem] sm:text-[1.75rem] md:text-[2.5rem]">
              {checklist.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-[#505050] text-[10px] sm:text-[12px] md:text-[14px]">
              <span>{checklist.documents.length} documents</span>
              <span className="w-1 h-1 rounded-full bg-[#505050] shrink-0" />
              <span>Updated {checklist.updatedDate}</span>
              <span className="w-1 h-1 rounded-full bg-[#505050] shrink-0 hidden sm:block" />
              <span className="hidden sm:inline">{checklist.location}</span>
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


      <Footer />
    </main>
  );
}
