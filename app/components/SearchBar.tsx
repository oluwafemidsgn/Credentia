"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { searchItems, type SearchResult } from "../lib/search";

export default function SearchBar({
  placeholder = "e.g first passport, uni admission, travel",
}: {
  placeholder?: string;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (query.trim()) {
      setResults(searchItems(query));
      setOpen(true);
    } else {
      setResults([]);
      setOpen(false);
    }
  }, [query]);

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  function handleSearch() {
    if (!query.trim()) return;
    setOpen(false);
    router.push(`/browse`);
  }

  const checklists = results.filter((r) => r.type === "checklist");
  const blogs = results.filter((r) => r.type === "blog");

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Input row */}
      <div className="bg-[#f4f4f4] flex items-center justify-between px-5 md:px-6 py-3 md:py-4 rounded-full w-full gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder={placeholder}
          className="flex-1 min-w-0 bg-transparent font-medium text-[#232323] placeholder:text-[#9b9b9b] tracking-[-0.02em] outline-none"
          style={{ fontSize: "clamp(13px, 1vw, 16px)" }}
        />
        <button
          onClick={handleSearch}
          className="bg-[#ccbaf8] px-4 py-2 rounded-3xl font-medium text-[#232323] tracking-[-0.05em] whitespace-nowrap hover:bg-[#b8a0f5] active:scale-95 transition-all shrink-0"
          style={{ fontSize: "clamp(13px, 1vw, 16px)" }}
        >
          Search
        </button>
      </div>

      {/* Suggestions dropdown */}
      {open && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-[#f0f0f0] overflow-hidden z-50">
          {checklists.length > 0 && (
            <>
              <p className="px-5 pt-4 pb-2 text-[10px] font-medium text-[#9b9b9b] uppercase tracking-[0.08em]">
                Checklists
              </p>
              {checklists.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => { setOpen(false); setQuery(""); }}
                  className="flex items-center justify-between px-5 py-3 hover:bg-[#f9f5ff] transition-colors"
                >
                  <span className="font-medium text-[#232323] tracking-[-0.02em] text-[14px]">
                    {item.title}
                  </span>
                  <span className="text-[10px] font-medium text-[#9b9b9b] uppercase tracking-[0.06em] shrink-0 ml-4">
                    {item.tag}
                  </span>
                </Link>
              ))}
            </>
          )}

          {blogs.length > 0 && (
            <>
              <p
                className={`px-5 pb-2 text-[10px] font-medium text-[#9b9b9b] uppercase tracking-[0.08em] ${
                  checklists.length > 0 ? "pt-3 border-t border-[#f4f4f4]" : "pt-4"
                }`}
              >
                From the blog
              </p>
              {blogs.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => { setOpen(false); setQuery(""); }}
                  className="flex items-center justify-between px-5 py-3 hover:bg-[#f9f5ff] transition-colors last:pb-4"
                >
                  <span className="font-medium text-[#232323] tracking-[-0.02em] text-[14px]">
                    {item.title}
                  </span>
                  <span className="text-[10px] font-medium text-[#9b9b9b] uppercase tracking-[0.06em] shrink-0 ml-4">
                    {item.tag}
                  </span>
                </Link>
              ))}
            </>
          )}

          {/* No results */}
          {results.length === 0 && (
            <p className="px-5 py-5 text-[14px] text-[#9b9b9b] tracking-[-0.02em]">
              No results for &ldquo;{query}&rdquo;
            </p>
          )}
        </div>
      )}
    </div>
  );
}
