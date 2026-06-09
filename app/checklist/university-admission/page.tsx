"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

/* ─── Data ─────────────────────────────────────────────── */

const checklist = {
  category: "Education",
  categoryColor: "#efd536",
  categoryTextColor: "#292929",
  title: "University Admission",
  totalDocs: 5,
  sorted: 2,
  updated: "May 2026",
  location: "Lagos",
};

type Document = {
  title: string;
  description: string;
  where: string;
  cost: string;
  time: string;
  prereq: string;
};

const documents: Document[] = [
  {
    title: "WAEC / NECO result",
    description:
      "Proves you completed secondary school. Both JAMB and the university verify it directly, so the result must match your other names exactly.",
    where: "waecdirect.org",
    cost: "Free – ₦5,000",
    time: "Instant (online)",
    prereq: "Exam already sat",
  },
  {
    title: "JAMB result slip",
    description:
      "Your JAMB score determines which course and university you qualify for. Download the slip from the JAMB portal after results are released.",
    where: "jamb.gov.ng",
    cost: "Free",
    time: "Instant (online)",
    prereq: "JAMB exam taken",
  },
  {
    title: "Birth certificate",
    description:
      "Used to verify your age and identity during the admission process. Ensure the name matches exactly what's on your WAEC and JAMB results.",
    where: "NPC office or hospital of birth",
    cost: "₦2,500 – ₦5,000",
    time: "1–4 weeks",
    prereq: "None",
  },
  {
    title: "Certificate of origin",
    description:
      "Required by most federal universities for state quota purposes. Issued by your local government office or your state government liaison office.",
    where: "Local Government Secretariat",
    cost: "₦1,000 – ₦5,000",
    time: "1–2 weeks",
    prereq: "Valid ID",
  },
  {
    title: "Passport photographs",
    description:
      "White background, recent (within 3 months). Most universities require 4–6 copies in different sizes for various forms during registration.",
    where: "Any photo studio",
    cost: "₦500 – ₦2,000",
    time: "Same day",
    prereq: "None",
  },
];

const relatedTags = [
  { label: "University admission", slug: "university-admission" },
  { label: "International passport", slug: "international-passport" },
  { label: "PVC registration", slug: "pvc-registration" },
  { label: "First job", slug: "first-job" },
  { label: "Car papers", slug: "car-papers" },
];

const blogPosts = [
  {
    type: "Guide",
    readTime: "6 MIN",
    date: "MAY 2026",
    title: "How to renew your passport in 2026",
    excerpt: "The new NIS process, step by step.",
    img: "/assets/blog-1.svg",
  },
  {
    type: "Explainer",
    readTime: "6 MIN",
    date: "MAY 2026",
    title: "NIN vs BVN: what's the difference?",
    excerpt: "And why you need both.",
    img: "/assets/blog-2.svg",
  },
  {
    type: "News",
    readTime: "6 MIN",
    date: "MAY 2026",
    title: "JAMB changes its 2026 requirements",
    excerpt: "What's new for admission this year.",
    img: "/assets/blog-3.svg",
  },
];

/* ─── Info Card ──────────────────────────────────────────── */
function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#f4f4f4] rounded-2xl p-8 md:p-10 flex flex-col gap-2">
      <p
        className="text-[#505050] uppercase tracking-wider"
        style={{ fontSize: "clamp(10px, 0.8vw, 13px)" }}
      >
        {label}
      </p>
      <p
        className="font-display text-[#292929] leading-tight tracking-[-0.02em]"
        style={{ fontSize: "clamp(16px, 1.4vw, 22px)" }}
      >
        {value}
      </p>
    </div>
  );
}

/* ─── Blog Card ──────────────────────────────────────────── */
function BlogCard({ type, readTime, date, title, excerpt, img }: (typeof blogPosts)[0]) {
  return (
    <article className="bg-[#f4f4f4] rounded-2xl flex-1 flex flex-col cursor-pointer group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
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
    </article>
  );
}

/* ─── Page ──────────────────────────────────────────────── */
export default function UniversityAdmission() {
  const [activeDoc, setActiveDoc] = useState(0);
  const doc = documents[activeDoc];

  return (
    <main className="bg-white overflow-x-hidden pt-[70px]">
      <Navbar />

      {/* ── Hero card ───────────────────────────────────── */}
      <div className="px-5 sm:px-10 lg:px-20 pt-8 pb-0 max-w-[1920px] mx-auto">
        <div className="relative" style={{ height: "clamp(200px, 16vw, 292px)" }}>
          {/* Tab */}
          <div
            className="absolute top-0 left-7 z-10 h-10 flex items-center px-4 rounded-tl-2xl rounded-tr-2xl"
            style={{ backgroundColor: checklist.categoryColor }}
          >
            <span
              className="font-medium tracking-wide uppercase"
              style={{ color: checklist.categoryTextColor, fontSize: "clamp(10px, 0.8vw, 13px)" }}
            >
              {checklist.category.toUpperCase()}
            </span>
          </div>
          {/* Body */}
          <div
            className="absolute inset-x-0 top-6 bottom-0 rounded-[20px] flex flex-col justify-end px-10 md:px-16 pb-10 md:pb-14 gap-4 md:gap-6"
            style={{ backgroundColor: checklist.categoryColor }}
          >
            <p
              className="text-[#505050] tracking-[-0.02em]"
              style={{ fontSize: "clamp(11px, 0.85vw, 16px)" }}
            >
              <Link href="/browse" className="hover:underline">Browse</Link>
              {" → "}
              <Link href={`/browse#${checklist.category.toLowerCase()}`} className="hover:underline">{checklist.category}</Link>
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
              <span>{checklist.totalDocs} documents</span>
              <span className="w-1 h-1 rounded-full bg-[#505050] shrink-0" />
              <span>{checklist.sorted} of {checklist.totalDocs} sorted</span>
              <span className="w-1 h-1 rounded-full bg-[#505050] shrink-0" />
              <span>Updated {checklist.updated}</span>
              <span className="w-1 h-1 rounded-full bg-[#505050] shrink-0" />
              <span>{checklist.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Two-column body ─────────────────────────────── */}
      <div className="px-5 sm:px-10 lg:px-20 max-w-[1920px] mx-auto mt-12 md:mt-16 pb-16 md:pb-24">
        <div className="flex gap-0 items-start">

          {/* Sidebar — documents list */}
          <aside className="hidden lg:flex flex-col w-[260px] shrink-0">
            <p
              className="text-[#9b9b9b] uppercase tracking-widest px-6 py-2.5"
              style={{ fontSize: "clamp(10px, 0.75vw, 12px)" }}
            >
              Documents
            </p>
            {documents.map((d, i) => (
              <button
                key={d.title}
                onClick={() => setActiveDoc(i)}
                className={`flex items-center gap-4 px-6 py-3 text-left w-full transition-colors rounded-xl ${
                  i === activeDoc
                    ? "text-[#232323] bg-[#f4f4f4]"
                    : "text-[#505050] hover:text-[#232323] hover:bg-[#fafafa]"
                }`}
              >
                <div
                  className="w-6 h-6 rounded-[4px] shrink-0 transition-colors"
                  style={{ backgroundColor: i === activeDoc ? checklist.categoryColor : "#d9d9d9" }}
                />
                <span style={{ fontSize: "clamp(13px, 0.9vw, 16px)" }}>{d.title}</span>
              </button>
            ))}
          </aside>

          {/* Vertical divider */}
          <div className="hidden lg:block w-px bg-[#ebebeb] self-stretch mx-10" />

          {/* Document detail */}
          <div className="flex-1 min-w-0">
            {/* Breadcrumb + title */}
            <p
              className="text-[#505050] tracking-[-0.02em] mb-5"
              style={{ fontSize: "clamp(11px, 0.85vw, 16px)" }}
            >
              <Link href="/browse" className="hover:underline">Browse</Link>
              {" → "}
              <Link href={`/browse#${checklist.category.toLowerCase()}`} className="hover:underline">{checklist.category}</Link>
              {" → "}
              {checklist.title}
            </p>
            <h2
              className="font-display text-[#292929] leading-none tracking-[-0.04em] mb-8 md:mb-10"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
            >
              {doc.title}
            </h2>

            {/* Info cards — 2×2 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <InfoCard label="Where" value={doc.where} />
              <InfoCard label="Cost" value={doc.cost} />
              <InfoCard label="Time" value={doc.time} />
              <InfoCard label="You'll need first" value={doc.prereq} />
            </div>

            {/* Description */}
            <p
              className="text-[#505050] leading-[1.6] tracking-[-0.02em] mb-8"
              style={{ fontSize: "clamp(13px, 0.95vw, 16px)" }}
            >
              {doc.description}
            </p>

            {/* Mobile document list */}
            <div className="lg:hidden mb-8">
              <p className="text-[#9b9b9b] uppercase tracking-widest text-xs mb-3">
                All documents in this checklist
              </p>
              <div className="flex flex-col gap-1">
                {documents.map((d, i) => (
                  <button
                    key={d.title}
                    onClick={() => setActiveDoc(i)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                      i === activeDoc
                        ? "bg-[#f4f4f4] text-[#232323]"
                        : "text-[#505050] hover:bg-[#fafafa]"
                    }`}
                  >
                    <div
                      className="w-5 h-5 rounded-[3px] shrink-0"
                      style={{ backgroundColor: i === activeDoc ? checklist.categoryColor : "#d9d9d9" }}
                    />
                    <span className="text-sm">{d.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content placeholder */}
            <div className="bg-[#f4f4f4] rounded-2xl w-full" style={{ height: "clamp(160px, 20vw, 312px)" }} />
          </div>
        </div>
      </div>

      {/* ── Flag an issue CTA ───────────────────────────── */}
      <div className="px-5 sm:px-10 lg:px-20 pb-16 md:pb-24 max-w-[1920px] mx-auto">
        <div
          className="flex items-center justify-between rounded-[20px] px-10 md:px-16 py-10 md:py-14 gap-6"
          style={{ backgroundColor: checklist.categoryColor }}
        >
          <p
            className="font-display text-[#292929] leading-tight tracking-[-0.02em] max-w-[600px]"
            style={{ fontSize: "clamp(1.125rem, 1.6vw, 1.5rem)" }}
          >
            Address changed? Cost different? Office moved? Help the next person.
          </p>
          <button className="bg-white text-[#232323] font-medium px-6 py-4 rounded-3xl whitespace-nowrap hover:bg-[#f4f4f4] active:scale-95 transition-all shrink-0 tracking-[-0.05em]" style={{ fontSize: "clamp(13px, 1vw, 16px)" }}>
            Flag an issue
          </button>
        </div>
      </div>

      {/* ── People also checked ─────────────────────────── */}
      <div className="px-5 sm:px-10 lg:px-20 pb-16 md:pb-24 max-w-[1920px] mx-auto">
        <h2
          className="font-medium text-[#232323] tracking-[-0.04em] mb-6"
          style={{ fontSize: "clamp(1.25rem, 2vw, 2rem)" }}
        >
          People also checked
        </h2>
        <div className="flex flex-wrap gap-2">
          {relatedTags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/checklist/${tag.slug}`}
              className="border border-[#e0e0e0] font-medium text-[#232323] tracking-[-0.02em] px-6 py-4 rounded-full hover:border-[#ccbaf8] hover:bg-[#f9f5ff] transition-all whitespace-nowrap"
              style={{ fontSize: "clamp(11px, 0.9vw, 14px)" }}
            >
              {tag.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── From the blog ───────────────────────────────── */}
      <section className="px-5 sm:px-10 lg:px-20 pb-16 md:pb-24 max-w-[1920px] mx-auto">
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <h2
            className="font-medium text-[#232323] tracking-[-0.04em]"
            style={{ fontSize: "clamp(1.25rem, 2vw, 2rem)" }}
          >
            From the blog
          </h2>
          <button
            className="border border-[#e0e0e0] font-medium text-[#232323] tracking-[-0.02em] px-4 py-2 rounded-full hover:border-[#ccbaf8] hover:bg-[#f9f5ff] transition-all whitespace-nowrap"
            style={{ fontSize: "clamp(11px, 0.9vw, 14px)" }}
          >
            ALL POST
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10">
          {blogPosts.map((post) => (
            <BlogCard key={post.title} {...post} />
          ))}
        </div>
      </section>

      {/* ── Watermark ───────────────────────────────────── */}
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
