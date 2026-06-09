"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ─── Data ─────────────────────────────────────────────── */

const filters = [
  { label: "All", value: "all" },
  { label: "Guides", value: "guides" },
  { label: "Explainers", value: "explainers" },
  { label: "Documents news", value: "documents-news" },
] as const;

type FilterValue = (typeof filters)[number]["value"];

type Post = {
  type: string;
  readTime: string;
  date: string;
  title: string;
  excerpt: string;
  img: string;
  category: Exclude<FilterValue, "all">;
};

const featured: Post = {
  type: "Guide",
  readTime: "6 MIN",
  date: "MAY 2026",
  title: "How to renew your passport in 2026",
  excerpt:
    "The new NIS process, step by step — what changed, what stayed the same, and how to avoid the common mistakes that send applications back.",
  img: "/assets/blog-1.svg",
  category: "guides",
};

const allPosts: Post[] = [
  {
    type: "Step-by-step",
    readTime: "8 MIN",
    date: "JUN 2026",
    title: "Mastering remote work tools",
    excerpt: "The tools every remote worker needs in 2026.",
    img: "/assets/blog-1.svg",
    category: "guides",
  },
  {
    type: "Insight",
    readTime: "5 MIN",
    date: "JUN 2026",
    title: "The future of electric vehicles",
    excerpt: "What Nigerian roads will look like in five years.",
    img: "/assets/blog-2.svg",
    category: "explainers",
  },
  {
    type: "Interview",
    readTime: "7 MIN",
    date: "JUN 2026",
    title: "ChatGPT and the new AI wave",
    excerpt: "How AI is changing document processing.",
    img: "/assets/blog-3.svg",
    category: "explainers",
  },
  {
    type: "Guide",
    readTime: "6 MIN",
    date: "MAY 2026",
    title: "How to renew your passport in 2026",
    excerpt: "The new NIS process, step by step.",
    img: "/assets/blog-1.svg",
    category: "guides",
  },
  {
    type: "Explainer",
    readTime: "6 MIN",
    date: "MAY 2026",
    title: "NIN vs BVN: what's the difference?",
    excerpt: "And why you need both.",
    img: "/assets/blog-2.svg",
    category: "explainers",
  },
  {
    type: "News",
    readTime: "6 MIN",
    date: "MAY 2026",
    title: "JAMB changes its 2026 requirements",
    excerpt: "What's new for admission this year.",
    img: "/assets/blog-3.svg",
    category: "documents-news",
  },
  {
    type: "Analysis",
    readTime: "7 MIN",
    date: "JUL 2026",
    title: "The rise of sustainable fashion",
    excerpt: "How Lagos designers are going green.",
    img: "/assets/blog-1.svg",
    category: "explainers",
  },
  {
    type: "Review",
    readTime: "6 MIN",
    date: "JUL 2026",
    title: "Top 5 smart home devices in 2026",
    excerpt: "The gadgets worth your naira.",
    img: "/assets/blog-2.svg",
    category: "guides",
  },
  {
    type: "Case Study",
    readTime: "8 MIN",
    date: "JUL 2026",
    title: "Revamping urban transport systems",
    excerpt: "What Lagos can learn from Nairobi.",
    img: "/assets/blog-3.svg",
    category: "explainers",
  },
];

/* ─── Blog Card (grid) ──────────────────────────────────── */
function BlogCard({ type, readTime, date, title, excerpt, img }: Post) {
  return (
    <article className="bg-[#f4f4f4] rounded-2xl flex flex-col cursor-pointer group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image area */}
      <div className="relative shrink-0" style={{ height: "clamp(160px, 18vw, 260px)" }}>
        <div className="absolute inset-[11px_11px_0]">
          <img src={img} alt="" className="w-full h-full" />
        </div>
        <div className="absolute top-[22px] inset-x-[22px] bottom-[52px] bg-white rounded-2xl" />
        <div className="absolute bottom-[6px] left-7 z-10">
          <span
            className="flex items-center bg-white/90 backdrop-blur-sm text-[#444] uppercase font-medium px-3 py-1.5 rounded-full"
            style={{ fontSize: "clamp(10px, 0.75vw, 12px)", letterSpacing: "0.05em" }}
          >
            {type}
          </span>
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-4 p-6 md:p-8 flex-1">
        <div className="flex items-center gap-3 text-[#505050]">
          <span className="uppercase tracking-[-0.02em]" style={{ fontSize: "clamp(10px, 0.8vw, 12px)" }}>
            {readTime}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#505050] shrink-0" />
          <span className="uppercase tracking-[-0.02em]" style={{ fontSize: "clamp(10px, 0.8vw, 12px)" }}>
            {date}
          </span>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <h3
            className="font-display text-[#292929] leading-tight tracking-[-0.04em]"
            style={{ fontSize: "clamp(17px, 2vw, 28px)" }}
          >
            {title}
          </h3>
          <p
            className="text-[#505050] leading-[1.4] tracking-[-0.02em]"
            style={{ fontSize: "clamp(12px, 0.9vw, 15px)" }}
          >
            {excerpt}
          </p>
        </div>
        <div className="flex items-center gap-2 text-[#232323] opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <span className="font-medium" style={{ fontSize: "clamp(11px, 0.8vw, 13px)" }}>
            Read article
          </span>
          <span style={{ fontSize: "clamp(11px, 0.8vw, 14px)" }}>→</span>
        </div>
      </div>
    </article>
  );
}

/* ─── Page ──────────────────────────────────────────────── */
export default function Blog() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

  const visiblePosts =
    activeFilter === "all" ? allPosts : allPosts.filter((p) => p.category === activeFilter);

  return (
    <main className="bg-white overflow-x-hidden pt-[70px]">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="pt-16 md:pt-24 pb-12 md:pb-16 px-5 text-center max-w-[900px] mx-auto">
        <h1
          className="font-display leading-none text-[#232323] tracking-[-0.04em] mb-6"
          style={{ fontSize: "clamp(2.5rem, 6.5vw, 6rem)" }}
        >
          The Credentia Blog
        </h1>
        <p
          className="font-medium leading-[1.5] text-[#505050] tracking-[-0.02em] max-w-[640px] mx-auto mb-10"
          style={{ fontSize: "clamp(0.875rem, 1.1vw, 1.05rem)" }}
        >
          Guides, explainers, and updates on Nigerian documents — so the news reaches you before the queue does.
        </p>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 items-center justify-center">
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
      </section>

      {/* ── Featured post ─────────────────────────────────── */}
      <section className="px-5 sm:px-10 lg:px-20 pb-16 md:pb-24 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-[#f4f4f4] rounded-[24px] overflow-hidden">
          {/* Left — folder image */}
          <div
            className="relative"
            style={{ minHeight: "clamp(320px, 34vw, 560px)" }}
          >
            <div className="absolute inset-[16px]">
              <img src={featured.img} alt="" className="w-full h-full" />
            </div>
            {/* White frame — 12px gap from folder on top and sides, strip at bottom for tag */}
            <div className="absolute top-[28px] inset-x-[28px] bottom-[88px] bg-white rounded-2xl" />
            {/* Tag sits in the coloured folder strip below the white frame */}
            <div className="absolute bottom-[20px] left-9 z-10">
              <span
                className="flex items-center bg-white/90 backdrop-blur-sm text-[#444] uppercase font-medium px-3 py-1.5 rounded-full"
                style={{ fontSize: "clamp(10px, 0.8vw, 12px)", letterSpacing: "0.05em" }}
              >
                {featured.type}
              </span>
            </div>
          </div>

          {/* Right — content */}
          <div className="flex flex-col justify-center gap-6 px-8 py-10 lg:px-10 lg:py-12 lg:pr-14">
            <div className="flex items-center gap-3 text-[#505050]">
              <span className="uppercase tracking-[-0.02em]" style={{ fontSize: "clamp(11px, 0.85vw, 13px)" }}>
                {featured.readTime}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#505050] shrink-0" />
              <span className="uppercase tracking-[-0.02em]" style={{ fontSize: "clamp(11px, 0.85vw, 13px)" }}>
                {featured.date}
              </span>
            </div>
            <h2
              className="font-display text-[#232323] leading-tight tracking-[-0.04em]"
              style={{ fontSize: "clamp(1.5rem, 3vw, 3.5rem)" }}
            >
              {featured.title}
            </h2>
            <p
              className="text-[#505050] leading-[1.5] tracking-[-0.02em]"
              style={{ fontSize: "clamp(13px, 1vw, 16px)" }}
            >
              {featured.excerpt}
            </p>
            <div>
              <Link
                href="#"
                className="inline-flex items-center gap-2 bg-[#ccbaf8] hover:bg-[#b8a0f5] text-[#232323] font-medium tracking-[-0.03em] px-6 py-3 rounded-full transition-all active:scale-95"
                style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}
              >
                Read the guide
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Flag an issue CTA ─────────────────────────────── */}
      <section className="px-5 sm:px-10 lg:px-20 pb-16 md:pb-20 max-w-[1920px] mx-auto">
        <div className="bg-[#efd536] rounded-[20px] flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-7 md:px-12 md:py-8">
          <div className="flex flex-col gap-1.5">
            <p
              className="font-display text-[#292929] leading-tight tracking-[-0.04em]"
              style={{ fontSize: "clamp(1.1rem, 2.2vw, 2rem)" }}
            >
              Flag an issue
            </p>
            <p
              className="text-[#505050] tracking-[-0.02em]"
              style={{ fontSize: "clamp(12px, 0.95vw, 15px)" }}
            >
              Spotted outdated info or a wrong document? Let us know.
            </p>
          </div>
          <Link
            href="#"
            className="shrink-0 bg-[#292929] hover:bg-[#111] text-white font-medium tracking-[-0.03em] px-6 py-3 rounded-full transition-all active:scale-95 whitespace-nowrap"
            style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}
          >
            Flag an issue →
          </Link>
        </div>
      </section>

      {/* ── From the blog (grid) ───────────────────────────── */}
      <section className="px-5 sm:px-10 lg:px-20 pb-16 md:pb-24 max-w-[1920px] mx-auto">
        <h2
          className="font-medium text-[#232323] tracking-[-0.04em] mb-8 md:mb-12"
          style={{ fontSize: "clamp(1.25rem, 2vw, 2rem)" }}
        >
          From the blog
        </h2>

        {visiblePosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {visiblePosts.map((post) => (
              <BlogCard key={`${post.title}-${post.date}`} {...post} />
            ))}
          </div>
        ) : (
          <p className="text-[#9b9b9b] tracking-[-0.02em]" style={{ fontSize: "clamp(14px, 1vw, 16px)" }}>
            No posts in this category yet.
          </p>
        )}
      </section>

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
