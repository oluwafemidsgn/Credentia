"use client";

import { useState } from "react";
import Link from "next/link";
import type { SanityCategory } from "../../lib/sanity/queries";

/* ─── Browse Card ────────────────────────────────────────── */
function BrowseCard({
  title,
  count,
  slug,
  label,
  bg,
  textColor,
  descColor,
}: {
  title: string;
  count: number;
  slug: string;
  label: string;
  bg: string;
  textColor: string;
  descColor: string;
}) {
  return (
    <Link
      href={`/checklist/${slug}`}
      className="relative select-none group block"
      style={{ height: "clamp(200px, 16vw, 266px)" }}
    >
      <div className="absolute inset-0 transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:drop-shadow-xl">
        {/* Tab */}
        <div
          className="absolute top-0 left-7 z-10 h-10 flex items-center px-4 rounded-tl-2xl rounded-tr-2xl"
          style={{ backgroundColor: bg }}
        >
          <span
            className="font-medium tracking-wide uppercase whitespace-nowrap"
            style={{ color: textColor, fontSize: "clamp(10px, 0.8vw, 13px)" }}
          >
            {label}
          </span>
        </div>
        {/* Card body */}
        <div
          className="absolute inset-x-0 top-6 bottom-0 rounded-[20px] overflow-hidden"
          style={{ backgroundColor: bg }}
        >
          <div className="absolute bottom-5 left-8 right-8 transition-transform duration-300 group-hover:-translate-y-1.5">
            <h3
              className="font-display leading-tight tracking-[-0.04em] mb-2"
              style={{ color: textColor, fontSize: "clamp(13px, 1.2vw, 18px)" }}
            >
              {title}
            </h3>
            <p
              className="tracking-[-0.02em]"
              style={{ color: descColor, fontSize: "clamp(11px, 0.85vw, 14px)" }}
            >
              {count} document{count !== 1 ? "s" : ""}
            </p>
            <div className="mt-3 flex items-center gap-1.5 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              <span
                className="font-medium"
                style={{ color: textColor, fontSize: "clamp(11px, 0.8vw, 13px)" }}
              >
                View checklist
              </span>
              <span style={{ color: textColor, fontSize: "clamp(11px, 0.8vw, 14px)" }}>→</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── Category Section ───────────────────────────────────── */
function CategorySection({ id, label, color, textColor, descColor, checklists }: SanityCategory) {
  return (
    <section id={id} className="px-5 sm:px-10 lg:px-20 pb-16 md:pb-24 max-w-[1920px] mx-auto scroll-mt-20">
      <div className="flex items-center justify-between mb-8 md:mb-12">
        <h2
          className="font-medium text-[#232323] tracking-[-0.04em]"
          style={{ fontSize: "clamp(1.25rem, 2vw, 2rem)" }}
        >
          {label}
          <span className="text-[#9b9b9b]"> · all checklists</span>
        </h2>
        <span
          className="border border-[#e0e0e0] font-medium text-[#232323] tracking-[-0.02em] px-4 py-2 rounded-full whitespace-nowrap"
          style={{ fontSize: "clamp(11px, 0.85vw, 14px)" }}
        >
          {checklists.length} total
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
        {checklists.map((item) => (
          <BrowseCard
            key={item.slug}
            title={item.title}
            count={item.count}
            slug={item.slug}
            label={label.toUpperCase()}
            bg={color}
            textColor={textColor}
            descColor={descColor}
          />
        ))}
      </div>
    </section>
  );
}

/* ─── Client wrapper: filter pills + sections ────────────── */
export default function BrowseClient({ categories }: { categories: SanityCategory[] }) {
  const [active, setActive] = useState<string>("all");

  const visible = active === "all" ? categories : categories.filter((c) => c.id === active);

  return (
    <>
      {/* Filter pills — wrap to show everything at once */}
      <section className="px-5 sm:px-10 lg:px-20 pb-12 md:pb-16 max-w-[1100px] mx-auto">
        <div className="flex flex-wrap gap-2 items-center justify-center w-full">
          <button
            onClick={() => setActive("all")}
            className={`font-medium tracking-[-0.02em] px-4 py-2 rounded-full transition-all active:scale-95 ${
              active === "all"
                ? "bg-[#232323] text-white"
                : "border border-[#e0e0e0] text-[#232323] hover:border-[#ccbaf8] hover:bg-[#f9f5ff]"
            }`}
            style={{ fontSize: "clamp(11px, 0.9vw, 14px)" }}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(active === cat.id ? "all" : cat.id)}
              className={`font-medium tracking-[-0.02em] px-4 py-2 rounded-full transition-all active:scale-95 ${
                active === cat.id
                  ? "bg-[#232323] text-white"
                  : "border border-[#e0e0e0] text-[#232323] hover:border-[#ccbaf8] hover:bg-[#f9f5ff]"
              }`}
              style={{ fontSize: "clamp(11px, 0.9vw, 14px)" }}
            >
              {cat.label}
              <span className={active === cat.id ? "text-[#b8b8b8] ml-1.5" : "text-[#9b9b9b] ml-1.5"}>
                {cat.checklists.length}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Category sections */}
      {visible.map((cat) => (
        <CategorySection key={cat.id} {...cat} />
      ))}
    </>
  );
}
