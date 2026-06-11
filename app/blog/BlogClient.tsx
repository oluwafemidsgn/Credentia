"use client";
import { useState } from "react";
import Link from "next/link";
import type { SanityBlogPostCard } from "../../lib/sanity/queries";

const FOLDER_SVGS = ["/assets/blog-1.svg", "/assets/blog-2.svg", "/assets/blog-3.svg"];
function folderBg(slug: string) {
  const n = slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return FOLDER_SVGS[n % FOLDER_SVGS.length];
}

const filters = [
  { label: "All", value: "all" },
  { label: "Guides", value: "guides" },
  { label: "Explainers", value: "explainers" },
  { label: "Documents news", value: "documents-news" },
] as const;

type FilterValue = (typeof filters)[number]["value"];

function BlogCard({ slug, postType, readTime, publishedDate, title, excerpt, image }: SanityBlogPostCard) {
  return (
    <Link href={`/blog/${slug}`} className="bg-[#f4f4f4] rounded-2xl flex flex-col group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative shrink-0" style={{ height: "clamp(160px, 18vw, 260px)" }}>
        {/* Coloured folder background */}
        <div className="absolute inset-[11px_11px_0]">
          <img src={folderBg(slug)} alt="" className="w-full h-full" />
        </div>
        {/* White image container */}
        <div className="absolute top-[22px] inset-x-[22px] bottom-[52px] bg-white rounded-2xl overflow-hidden">
          {image
            ? <img src={image} alt="" className="w-full h-full object-cover" />
            : <div className="w-full h-full bg-white" />}
        </div>
        <div className="absolute bottom-[6px] left-7 z-10">
          <span
            className="flex items-center bg-white/90 backdrop-blur-sm text-[#444] uppercase font-medium px-3 py-1.5 rounded-full"
            style={{ fontSize: "clamp(10px, 0.75vw, 12px)", letterSpacing: "0.05em" }}
          >
            {postType}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-8 flex-1">
        <div className="flex items-center gap-3 text-[#505050]">
          <span className="uppercase tracking-[-0.02em]" style={{ fontSize: "clamp(10px, 0.8vw, 12px)" }}>{readTime}</span>
          <span className="w-1 h-1 rounded-full bg-[#505050] shrink-0" />
          <span className="uppercase tracking-[-0.02em]" style={{ fontSize: "clamp(10px, 0.8vw, 12px)" }}>{publishedDate}</span>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <h3 className="font-display text-[#292929] leading-tight tracking-[-0.04em]" style={{ fontSize: "clamp(17px, 2vw, 28px)" }}>{title}</h3>
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

export default function BlogClient({
  posts,
  featured,
}: {
  posts: SanityBlogPostCard[];
  featured: SanityBlogPostCard;
}) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

  const visiblePosts =
    activeFilter === "all" ? posts : posts.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* Filter pills */}
      <div className="px-5 pb-12 md:pb-16 flex flex-wrap gap-2 items-center justify-center">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`font-medium tracking-[-0.02em] px-5 py-2.5 rounded-full border transition-all whitespace-nowrap ${
              activeFilter === f.value
                ? "bg-[#351459] text-white border-[#351459]"
                : "border-[#e0e0e0] text-[#232323] hover:border-[#ccbaf8] hover:bg-[#f9f5ff]"
            }`}
            style={{ fontSize: "clamp(12px, 0.9vw, 14px)" }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Featured post */}
      <section className="px-5 sm:px-10 lg:px-20 pb-16 md:pb-24 max-w-[1920px] mx-auto mt-12 md:mt-16">
        <Link href={`/blog/${featured.slug}`} className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-[#f4f4f4] rounded-[24px] overflow-hidden group">
          <div className="relative" style={{ minHeight: "clamp(320px, 34vw, 560px)" }}>
            {/* Coloured folder background */}
            <div className="absolute inset-[16px_16px_0]">
              <img src={folderBg(featured.slug)} alt="" className="w-full h-full" />
            </div>
            {/* White image container */}
            <div className="absolute top-[28px] inset-x-[28px] bottom-[88px] bg-white rounded-2xl overflow-hidden">
              {featured.image
                ? <img src={featured.image} alt="" className="w-full h-full object-cover" />
                : <div className="w-full h-full bg-white" />}
            </div>
            <div className="absolute bottom-[20px] left-9 z-10">
              <span
                className="flex items-center bg-white/90 backdrop-blur-sm text-[#444] uppercase font-medium px-3 py-1.5 rounded-full"
                style={{ fontSize: "clamp(10px, 0.8vw, 12px)", letterSpacing: "0.05em" }}
              >
                {featured.postType}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-6 px-8 py-10 lg:px-10 lg:py-12 lg:pr-14">
            <div className="flex items-center gap-3 text-[#505050]">
              <span className="uppercase tracking-[-0.02em]" style={{ fontSize: "clamp(11px, 0.85vw, 13px)" }}>{featured.readTime}</span>
              <span className="w-1 h-1 rounded-full bg-[#505050] shrink-0" />
              <span className="uppercase tracking-[-0.02em]" style={{ fontSize: "clamp(11px, 0.85vw, 13px)" }}>{featured.publishedDate}</span>
            </div>
            <h2 className="font-display text-[#232323] leading-tight tracking-[-0.04em]" style={{ fontSize: "clamp(1.5rem, 3vw, 3.5rem)" }}>
              {featured.title}
            </h2>
            <p className="text-[#505050] leading-[1.5] tracking-[-0.02em]" style={{ fontSize: "clamp(13px, 1vw, 16px)" }}>
              {featured.excerpt}
            </p>
            <div>
              <span className="inline-flex items-center gap-2 bg-[#ccbaf8] group-hover:bg-[#b8a0f5] text-[#232323] font-medium tracking-[-0.03em] px-6 py-3 rounded-full transition-all" style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}>
                Read the guide <span>→</span>
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* Flag an issue CTA */}
      <section className="px-5 sm:px-10 lg:px-20 pb-16 md:pb-20 max-w-[1920px] mx-auto">
        <div className="bg-[#efd536] rounded-[20px] flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-7 md:px-12 md:py-8">
          <div className="flex flex-col gap-1.5">
            <p className="font-display text-[#292929] leading-tight tracking-[-0.04em]" style={{ fontSize: "clamp(1.1rem, 2.2vw, 2rem)" }}>
              Flag an issue
            </p>
            <p className="text-[#505050] tracking-[-0.02em]" style={{ fontSize: "clamp(12px, 0.95vw, 15px)" }}>
              Spotted outdated info or a wrong document? Let us know.
            </p>
          </div>
          <Link href="/contact" className="shrink-0 bg-[#292929] hover:bg-[#111] text-white font-medium tracking-[-0.03em] px-6 py-3 rounded-full transition-all active:scale-95 whitespace-nowrap" style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}>
            Flag an issue →
          </Link>
        </div>
      </section>

      {/* Grid */}
      <section className="px-5 sm:px-10 lg:px-20 pb-16 md:pb-24 max-w-[1920px] mx-auto">
        <h2 className="font-medium text-[#232323] tracking-[-0.04em] mb-8 md:mb-12" style={{ fontSize: "clamp(1.25rem, 2vw, 2rem)" }}>
          From the blog
        </h2>
        {visiblePosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {visiblePosts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        ) : (
          <p className="text-[#9b9b9b] tracking-[-0.02em]" style={{ fontSize: "clamp(14px, 1vw, 16px)" }}>
            No posts in this category yet.
          </p>
        )}
      </section>
    </>
  );
}
