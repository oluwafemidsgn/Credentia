"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Suggestion = { title: string; slug: string; category?: string; postType?: string };
type Results = { checklists: Suggestion[]; blogs: Suggestion[] };

export default function SearchBar({
  placeholder = "e.g first passport, uni admission, travel",
  white = false,
  autoFocus = false,
  onNavigate,
}: {
  placeholder?: string;
  white?: boolean;
  autoFocus?: boolean;
  onNavigate?: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Results>({ checklists: [], blogs: [] });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  const fetchSuggestions = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setResults({ checklists: [], blogs: [] });
      setOpen(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data: Results = await res.json();
      setResults(data);
      setOpen(data.checklists.length > 0 || data.blogs.length > 0);
    } catch {
      // silently fail — suggestions are non-critical
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(query), 220);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query, fetchSuggestions]);

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
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    onNavigate?.();
  }

  const hasResults = results.checklists.length > 0 || results.blogs.length > 0;
  const showEmpty = open === false && query.trim().length >= 2 && !loading && !hasResults;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Input row */}
      <div
        className={`flex items-center justify-between px-5 md:px-6 py-3 md:py-4 rounded-full w-full gap-3 ${
          white ? "bg-white border border-[#e0e0e0]" : "bg-[#f4f4f4]"
        }`}
      >
        <input
          type="text"
          autoFocus={autoFocus}
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

      {/* Dropdown */}
      {(open && hasResults) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-[#f0f0f0] overflow-hidden z-50">
          {results.checklists.length > 0 && (
            <>
              <p className="px-5 pt-4 pb-2 text-[10px] font-medium text-[#9b9b9b] uppercase tracking-[0.08em]">
                Checklists
              </p>
              {results.checklists.slice(0, 6).map((item) => (
                <Link
                  key={item.slug}
                  href={`/checklist/${item.slug}`}
                  onClick={() => { setOpen(false); setQuery(""); onNavigate?.(); }}
                  className="flex items-center justify-between px-5 py-3 hover:bg-[#f9f5ff] transition-colors"
                >
                  <span className="font-medium text-[#232323] tracking-[-0.02em] text-[14px]">
                    {item.title}
                  </span>
                  {item.category && (
                    <span className="text-[10px] font-medium text-[#9b9b9b] uppercase tracking-[0.06em] shrink-0 ml-4">
                      {item.category}
                    </span>
                  )}
                </Link>
              ))}
            </>
          )}

          {results.blogs.length > 0 && (
            <>
              <p className={`px-5 pb-2 text-[10px] font-medium text-[#9b9b9b] uppercase tracking-[0.08em] ${
                results.checklists.length > 0 ? "pt-3 border-t border-[#f4f4f4]" : "pt-4"
              }`}>
                From the blog
              </p>
              {results.blogs.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  onClick={() => { setOpen(false); setQuery(""); onNavigate?.(); }}
                  className="flex items-center justify-between px-5 py-3 hover:bg-[#f9f5ff] transition-colors last:pb-4"
                >
                  <span className="font-medium text-[#232323] tracking-[-0.02em] text-[14px]">
                    {item.title}
                  </span>
                  {item.postType && (
                    <span className="text-[10px] font-medium text-[#9b9b9b] uppercase tracking-[0.06em] shrink-0 ml-4">
                      {item.postType}
                    </span>
                  )}
                </Link>
              ))}
            </>
          )}

          <Link
            href={`/search?q=${encodeURIComponent(query)}`}
            onClick={() => { setOpen(false); onNavigate?.(); }}
            className="flex items-center gap-2 px-5 py-3 border-t border-[#f4f4f4] text-[#9b9b9b] hover:text-[#232323] hover:bg-[#f9f9f9] transition-colors"
            style={{ fontSize: "clamp(11px, 0.85vw, 13px)" }}
          >
            <span className="font-medium">See all results for &ldquo;{query}&rdquo;</span>
            <span>→</span>
          </Link>
        </div>
      )}

      {/* No results state */}
      {showEmpty && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-[#f0f0f0] z-50 px-5 py-5">
          <p className="text-[14px] text-[#9b9b9b] tracking-[-0.02em]">
            No results for &ldquo;{query}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}
