"use client";

/*
 * Shared filter + sort controls for any list of checklists — used by /browse
 * and /search so both behave the same way. Native <select> elements keep this
 * usable at 375px wide and accessible without extra JS.
 */

export type Sort = "relevance" | "updated" | "az" | "most";
export type Filters = { size: "any" | "small" | "medium" | "large"; age: "any" | "90" | "180" | "365"; sort: Sort };

export type Filterable = { title: string; count: number; updatedAt?: string | null };

export const SIZE_LABELS: Record<Filters["size"], string> = {
  any: "Any size",
  small: "1–5 documents",
  medium: "6–10 documents",
  large: "11+ documents",
};

export const AGE_LABELS: Record<Filters["age"], string> = {
  any: "Updated any time",
  "90": "Updated in 3 months",
  "180": "Updated in 6 months",
  "365": "Updated in a year",
};

const SORT_LABELS: Record<Sort, string> = {
  relevance: "Best match",
  updated: "Recently updated",
  az: "A to Z",
  most: "Most documents",
};

export function defaultFilters(sort: Sort): Filters {
  return { size: "any", age: "any", sort };
}

export function isDefault(f: Filters, sort: Sort): boolean {
  return f.size === "any" && f.age === "any" && f.sort === sort;
}

function inSize(count: number, size: Filters["size"]): boolean {
  if (size === "small") return count <= 5;
  if (size === "medium") return count >= 6 && count <= 10;
  if (size === "large") return count >= 11;
  return true;
}

function inAge(updatedAt: string | null | undefined, age: Filters["age"]): boolean {
  if (age === "any") return true;
  if (!updatedAt) return false;
  const t = Date.parse(updatedAt);
  if (Number.isNaN(t)) return false;
  return Date.now() - t <= Number(age) * 86_400_000;
}

/** Filters and sorts in one pass. "Best match" keeps the order it was given. */
export function applyFilters<T extends Filterable>(items: T[], f: Filters): T[] {
  const kept = items
    .map((item, i) => ({ item, i }))
    .filter(({ item }) => inSize(item.count, f.size) && inAge(item.updatedAt, f.age));

  kept.sort((a, b) => {
    if (f.sort === "az") return a.item.title.localeCompare(b.item.title) || a.i - b.i;
    if (f.sort === "most") return b.item.count - a.item.count || a.item.title.localeCompare(b.item.title);
    if (f.sort === "updated") {
      const ta = Date.parse(a.item.updatedAt ?? "") || 0;
      const tb = Date.parse(b.item.updatedAt ?? "") || 0;
      return tb - ta || a.item.title.localeCompare(b.item.title);
    }
    return a.i - b.i;
  });

  return kept.map((x) => x.item);
}

/* ─── UI ─────────────────────────────────────────────────── */

const selectClass =
  "appearance-none rounded-full border border-[#e0e0e0] bg-white pl-4 pr-9 py-2 font-medium text-[#232323] tracking-[-0.02em] cursor-pointer transition-all hover:border-[#ccbaf8] hover:bg-[#f9f5ff] focus:outline-none focus:border-[#ccbaf8] text-[12px] sm:text-[13px]";

function Chevron() {
  return (
    <svg
      viewBox="0 0 12 8"
      aria-hidden="true"
      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-[9px] h-[6px] text-[#9b9b9b]"
      fill="none"
    >
      <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Select<V extends string>({
  label,
  value,
  options,
  onChange,
  active,
}: {
  label: string;
  value: V;
  options: Record<string, string>;
  onChange: (v: V) => void;
  active: boolean;
}) {
  return (
    <div className="relative shrink-0">
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value as V)}
        className={`${selectClass} ${active ? "!border-[#232323] !bg-[#f4f0ff]" : ""}`}
      >
        {Object.entries(options).map(([v, text]) => (
          <option key={v} value={v}>
            {text}
          </option>
        ))}
      </select>
      <Chevron />
    </div>
  );
}

export function FilterBar({
  filters,
  onChange,
  defaultSort,
  total,
  sorts,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
  defaultSort: Sort;
  /** Number of checklists currently showing. */
  total: number;
  /** Which sort options to offer (search adds "Best match"). */
  sorts: Sort[];
}) {
  const sortOptions = Object.fromEntries(sorts.map((s) => [s, SORT_LABELS[s]]));
  const dirty = !isDefault(filters, defaultSort);

  return (
    <div className="flex flex-wrap items-center gap-2 overflow-x-auto scrollbar-none">
      <Select
        label="Filter by number of documents"
        value={filters.size}
        options={SIZE_LABELS}
        active={filters.size !== "any"}
        onChange={(size) => onChange({ ...filters, size })}
      />
      <Select
        label="Filter by when it was last updated"
        value={filters.age}
        options={AGE_LABELS}
        active={filters.age !== "any"}
        onChange={(age) => onChange({ ...filters, age })}
      />
      <Select
        label="Sort results"
        value={filters.sort}
        options={sortOptions}
        active={filters.sort !== defaultSort}
        onChange={(sort) => onChange({ ...filters, sort })}
      />
      <span className="shrink-0 text-[#9b9b9b] tracking-[-0.02em] text-[12px] sm:text-[13px] ml-1">
        {total} checklist{total !== 1 ? "s" : ""}
      </span>
      {dirty && (
        <button
          onClick={() => onChange(defaultFilters(defaultSort))}
          className="shrink-0 font-medium text-[#6F00ED] underline underline-offset-2 tracking-[-0.02em] text-[12px] sm:text-[13px] hover:text-[#4c00a6]"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
