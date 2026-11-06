"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { SearchChecklist } from "../../lib/sanity/queries";
import {
  applyFilters,
  defaultFilters,
  FilterBar,
  type Filters,
} from "../components/ChecklistFilters";

/* ─── Checklist result card (folder style) ───────────────── */
export function ResultCard({
  title,
  slug,
  category,
  color,
  textColor,
  descColor,
  count,
  matchedDoc,
}: SearchChecklist) {
  return (
    <Link
      href={`/checklist/${slug}`}
      className="relative select-none group block h-[150px] sm:h-[clamp(190px,14vw,240px)]"
    >
      <div className="absolute inset-0 transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:drop-shadow-xl">
        {/* Tab */}
        <div
          className="absolute top-0 left-7 z-10 h-10 flex items-center px-4 rounded-tl-2xl rounded-tr-2xl"
          style={{ backgroundColor: color }}
        >
          <span
            className="font-medium tracking-wide uppercase whitespace-nowrap"
            style={{ color: textColor, fontSize: "clamp(9px, 0.75vw, 12px)" }}
          >
            {category}
          </span>
        </div>
        {/* Body */}
        <div
          className="absolute inset-x-0 top-6 bottom-0 rounded-[20px] overflow-hidden"
          style={{ backgroundColor: color }}
        >
          <div className="absolute bottom-5 left-8 right-8 transition-transform duration-300 group-hover:-translate-y-1.5">
            <h3
              className="font-display leading-tight tracking-[-0.04em] mb-2"
              style={{ color: textColor, fontSize: "clamp(13px, 1.2vw, 18px)" }}
            >
              {title}
            </h3>
            <p className="tracking-[-0.02em]" style={{ color: descColor, fontSize: "clamp(11px, 0.85vw, 14px)" }}>
              {count} document{count !== 1 ? "s" : ""}
            </p>
            {/* Why this result is here, when the title alone doesn't show it */}
            {matchedDoc && (
              <p
                className="tracking-[-0.02em] mt-1 line-clamp-1"
                style={{ color: descColor, fontSize: "clamp(10px, 0.75vw, 12px)" }}
              >
                Includes: {matchedDoc}
              </p>
            )}
            <div className="mt-3 flex items-center gap-1.5 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              <span className="font-medium" style={{ color: textColor, fontSize: "clamp(11px, 0.8vw, 13px)" }}>
                View checklist
              </span>
              <span style={{ color: textColor }}>→</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── Filterable checklist results ──────────────────────── */
export default function SearchResults({ checklists }: { checklists: SearchChecklist[] }) {
  const [active, setActive] = useState("all");
  const [filters, setFilters] = useState<Filters>(() => defaultFilters("relevance"));

  // Pills come from the results themselves, so there is never an empty filter.
  const categories = useMemo(() => {
    const seen = new Map<string, { id: string; label: string; n: number }>();
    for (const c of checklists) {
      const id = c.categoryId || c.category;
      const row = seen.get(id);
      if (row) row.n++;
      else seen.set(id, { id, label: c.category, n: 1 });
    }
    return [...seen.values()].sort((a, b) => b.n - a.n || a.label.localeCompare(b.label));
  }, [checklists]);

  const visible = useMemo(() => {
    const byCategory =
      active === "all" ? checklists : checklists.filter((c) => (c.categoryId || c.category) === active);
    return applyFilters(byCategory, filters);
  }, [checklists, active, filters]);

  return (
    <section className="mb-16 md:mb-20">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 md:mb-6">
        <h2
          className="font-medium text-[#232323] tracking-[-0.04em]"
          style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.75rem)" }}
        >
          Checklists
        </h2>
        <span
          className="border border-[#e0e0e0] text-[#232323] font-medium tracking-[-0.02em] px-4 py-2 rounded-full"
          style={{ fontSize: "clamp(11px, 0.85vw, 14px)" }}
        >
          {visible.length} found
        </span>
      </div>

      {/* Category pills */}
      {categories.length > 1 && (
        <div className="flex gap-2 items-center overflow-x-auto pb-1 mb-3 scrollbar-none">
          <button
            onClick={() => setActive("all")}
            className={`shrink-0 font-medium tracking-[-0.02em] px-4 py-2 rounded-full transition-all active:scale-95 text-[12px] sm:text-[13px] ${
              active === "all"
                ? "bg-[#232323] text-white"
                : "border border-[#e0e0e0] text-[#232323] hover:border-[#ccbaf8] hover:bg-[#f9f5ff]"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(active === cat.id ? "all" : cat.id)}
              className={`shrink-0 font-medium tracking-[-0.02em] px-4 py-2 rounded-full transition-all active:scale-95 text-[12px] sm:text-[13px] ${
                active === cat.id
                  ? "bg-[#232323] text-white"
                  : "border border-[#e0e0e0] text-[#232323] hover:border-[#ccbaf8] hover:bg-[#f9f5ff]"
              }`}
            >
              {cat.label}
              <span className={active === cat.id ? "text-[#b8b8b8] ml-1.5" : "text-[#9b9b9b] ml-1.5"}>{cat.n}</span>
            </button>
          ))}
        </div>
      )}

      {/* Document count / last updated filters + sort */}
      <div className="mb-8 md:mb-10">
        <FilterBar
          filters={filters}
          onChange={setFilters}
          defaultSort="relevance"
          sorts={["relevance", "updated", "az", "most"]}
          total={visible.length}
        />
      </div>

      {visible.length === 0 ? (
        <div className="bg-[#f4f4f4] rounded-[20px] px-8 py-10 max-w-[720px]">
          <p
            className="font-display text-[#232323] tracking-[-0.03em] mb-2"
            style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)" }}
          >
            No results match those filters
          </p>
          <p className="text-[#9b9b9b] tracking-[-0.02em]" style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}>
            Try a wider document count or a longer time range.
          </p>
          <button
            onClick={() => {
              setFilters(defaultFilters("relevance"));
              setActive("all");
            }}
            className="mt-5 bg-[#232323] hover:bg-[#111] text-white font-medium tracking-[-0.02em] px-5 py-2.5 rounded-full transition-all active:scale-95 text-[13px]"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {visible.map((item) => (
            <ResultCard key={item.slug} {...item} />
          ))}
        </div>
      )}
    </section>
  );
}
