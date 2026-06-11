import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getBlogPostBySlug, getAllBlogSlugs, getRelatedBlogPosts } from "../../../lib/sanity/queries";

export const revalidate = 30;
import type { SanityBlogPostCard } from "../../../lib/sanity/queries";

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  guides: { bg: "#ccbaf8", text: "#292929" },
  explainers: { bg: "#8bcef7", text: "#292929" },
  "documents-news": { bg: "#efd536", text: "#292929" },
};

function RelatedCard({ slug, postType, readTime, publishedDate, title, excerpt, image }: SanityBlogPostCard) {
  return (
    <Link href={`/blog/${slug}`} className="bg-[#f4f4f4] rounded-2xl flex flex-col group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative shrink-0" style={{ height: "clamp(180px, 22vw, 300px)" }}>
        <div className="absolute top-[22px] inset-x-[11px] bottom-[52px] bg-white rounded-2xl overflow-hidden">
          {image
            ? <img src={image} alt="" className="w-full h-full object-cover" />
            : <div className="w-full h-full bg-[#e8e8e8]" />}
        </div>
        <div className="absolute bottom-[6px] left-7 z-10">
          <span
            className="flex items-center bg-white/90 backdrop-blur-sm text-[#444] uppercase font-medium px-3 py-1.5 rounded-full"
            style={{ fontSize: "clamp(10px, 0.8vw, 12px)", letterSpacing: "0.05em" }}
          >
            {postType}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-7 md:p-8 flex-1">
        <div className="flex items-center gap-3 text-[#505050]">
          <span className="uppercase tracking-[-0.02em]" style={{ fontSize: "clamp(10px, 0.8vw, 12px)" }}>{readTime}</span>
          <span className="w-1 h-1 rounded-full bg-[#505050] shrink-0" />
          <span className="uppercase tracking-[-0.02em]" style={{ fontSize: "clamp(10px, 0.8vw, 12px)" }}>{publishedDate}</span>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <h3 className="font-display text-[#292929] leading-tight tracking-[-0.04em]" style={{ fontSize: "clamp(17px, 2vw, 26px)" }}>{title}</h3>
          <p className="text-[#505050] leading-[1.4] tracking-[-0.02em]" style={{ fontSize: "clamp(12px, 0.9vw, 15px)" }}>{excerpt}</p>
        </div>
        <div className="flex items-center gap-2 text-[#232323] opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <span className="font-medium" style={{ fontSize: "clamp(11px, 0.8vw, 13px)" }}>Read article</span>
          <span>→</span>
        </div>
      </div>
    </Link>
  );
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, related] = await Promise.all([
    getBlogPostBySlug(slug),
    getRelatedBlogPosts(slug, 3),
  ]);

  if (!post) notFound();

  const colors = categoryColors[post.category] ?? { bg: "#ccbaf8", text: "#292929" };

  return (
    <main className="bg-white overflow-x-hidden pt-[70px]">
      <Navbar />

      {/* ── Hero card ──────────────────────────────────────── */}
      <div className="px-5 sm:px-10 lg:px-20 pt-8 pb-0 max-w-[1920px] mx-auto">
        <div className="relative" style={{ height: "clamp(200px, 18vw, 320px)" }}>
          <div
            className="absolute top-0 left-7 z-10 h-10 flex items-center px-4 rounded-tl-2xl rounded-tr-2xl"
            style={{ backgroundColor: colors.bg }}
          >
            <span className="font-medium tracking-wide uppercase" style={{ color: colors.text, fontSize: "clamp(10px, 0.8vw, 13px)" }}>
              {post.postType}
            </span>
          </div>
          <div
            className="absolute inset-x-0 top-6 bottom-0 rounded-[20px] flex flex-col justify-end px-10 md:px-16 pb-10 md:pb-14 gap-3 md:gap-5"
            style={{ backgroundColor: colors.bg }}
          >
            <p className="text-[#505050] tracking-[-0.02em]" style={{ fontSize: "clamp(11px, 0.85vw, 15px)" }}>
              <Link href="/blog" className="hover:underline">Blog</Link>
              {" → "}
              <span className="capitalize">{post.category.replace("-", " ")}</span>
              {" → "}
              {post.title}
            </p>
            <h1 className="font-display text-[#292929] leading-none tracking-[-0.04em]" style={{ fontSize: "clamp(1.6rem, 3vw, 3rem)" }}>
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-[#505050]" style={{ fontSize: "clamp(11px, 0.85vw, 15px)" }}>
              <span className="uppercase">{post.readTime}</span>
              <span className="w-1 h-1 rounded-full bg-[#505050] shrink-0" />
              <span className="uppercase">{post.publishedDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Article ────────────────────────────────────────── */}
      <div className="px-5 sm:px-10 lg:px-20 max-w-[1920px] mx-auto mt-16 md:mt-24">
        <div className="max-w-[760px] mx-auto">
          <p
            className="text-[#232323] leading-[1.7] tracking-[-0.02em] mb-12 md:mb-16"
            style={{ fontSize: "clamp(15px, 1.15vw, 20px)" }}
          >
            {post.lead}
          </p>

          <div
            className="relative rounded-[20px] overflow-hidden mb-12 md:mb-16"
            style={{ height: "clamp(200px, 28vw, 460px)" }}
          >
            <div className="absolute top-[24px] inset-x-[14px] bottom-[56px] bg-white rounded-2xl overflow-hidden">
              {post.image
                ? <img src={post.image} alt="" className="w-full h-full object-cover" />
                : <div className="w-full h-full bg-[#e8e8e8]" />}
            </div>
            <div className="absolute bottom-[8px] left-8 z-10">
              <span
                className="flex items-center text-[#444] uppercase font-medium px-3 py-1.5 rounded-full"
                style={{ backgroundColor: colors.bg, fontSize: "clamp(10px, 0.8vw, 12px)", letterSpacing: "0.05em" }}
              >
                {post.postType}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-12 md:gap-16 mb-12 md:mb-16">
            {post.sections.map((section) => (
              <div key={section.heading}>
                <h2
                  className="font-display text-[#232323] leading-tight tracking-[-0.04em] mb-5"
                  style={{ fontSize: "clamp(1.2rem, 2vw, 2rem)" }}
                >
                  {section.heading}
                </h2>
                {section.body.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    className="text-[#505050] leading-[1.75] tracking-[-0.01em] mb-4 last:mb-0"
                    style={{ fontSize: "clamp(14px, 1vw, 17px)" }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div
            className="rounded-[20px] px-8 md:px-12 py-8 md:py-10 mb-16 md:mb-24"
            style={{ backgroundColor: colors.bg }}
          >
            <h3
              className="font-display text-[#292929] tracking-[-0.04em] mb-6"
              style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)" }}
            >
              Key takeaways
            </h3>
            <ul className="flex flex-col gap-3">
              {post.takeaways.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-[#505050] shrink-0" />
                  <span
                    className="text-[#505050] leading-[1.6] tracking-[-0.01em]"
                    style={{ fontSize: "clamp(13px, 0.95vw, 16px)" }}
                  >
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Flag an issue ──────────────────────────────────── */}
      <div className="px-5 sm:px-10 lg:px-20 pb-16 md:pb-24 max-w-[1920px] mx-auto">
        <div className="bg-[#efd536] rounded-[20px] flex flex-col sm:flex-row items-center justify-between gap-6 px-8 md:px-16 py-10 md:py-12">
          <p className="font-display text-[#292929] leading-tight tracking-[-0.04em]" style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)" }}>
            Something outdated? Help the next person.
          </p>
          <Link href="/contact" className="shrink-0 bg-[#292929] hover:bg-[#111] text-white font-medium tracking-[-0.03em] px-6 py-3 rounded-full transition-all active:scale-95 whitespace-nowrap" style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}>
            Flag an issue →
          </Link>
        </div>
      </div>

      {/* ── Related posts ──────────────────────────────────── */}
      {related.length > 0 && (
        <section className="px-5 sm:px-10 lg:px-20 pb-16 md:pb-24 max-w-[1920px] mx-auto">
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <h2 className="font-medium text-[#232323] tracking-[-0.04em]" style={{ fontSize: "clamp(1.25rem, 2vw, 2rem)" }}>
              From the blog
            </h2>
            <Link href="/blog" className="border border-[#e0e0e0] font-medium text-[#232323] tracking-[-0.02em] px-4 py-2 rounded-full hover:border-[#ccbaf8] hover:bg-[#f9f5ff] transition-all whitespace-nowrap" style={{ fontSize: "clamp(11px, 0.9vw, 14px)" }}>
              All posts
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {related.map((p) => (
              <RelatedCard key={p.slug} {...p} />
            ))}
          </div>
        </section>
      )}


      <Footer />
    </main>
  );
}
