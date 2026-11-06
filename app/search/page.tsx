import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import { searchSanity, getCloseMatches, getAllCategories } from "../../lib/sanity/queries";
import type { SearchBlog } from "../../lib/sanity/queries";
import SearchResults, { ResultCard } from "./SearchResults";

export const dynamic = "force-dynamic";

/* ─── Blog result row ────────────────────────────────────── */
function BlogResult({ title, slug, postType, excerpt, readTime, publishedDate }: SearchBlog) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="bg-[#f4f4f4] rounded-2xl px-7 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#f0ecfe] hover:-translate-y-0.5 transition-all duration-300 group"
    >
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <div className="flex items-center gap-3 text-[#9b9b9b]">
          <span className="uppercase tracking-[0.04em]" style={{ fontSize: "clamp(9px, 0.75vw, 11px)" }}>{readTime}</span>
          <span className="w-1 h-1 rounded-full bg-[#9b9b9b] shrink-0" />
          <span className="uppercase tracking-[0.04em]" style={{ fontSize: "clamp(9px, 0.75vw, 11px)" }}>{publishedDate}</span>
        </div>
        <h3 className="font-display text-[#232323] leading-tight tracking-[-0.03em]" style={{ fontSize: "clamp(15px, 1.2vw, 19px)" }}>
          {title}
        </h3>
        {excerpt && (
          <p className="text-[#9b9b9b] leading-[1.5] tracking-[-0.01em]" style={{ fontSize: "clamp(12px, 0.85vw, 14px)" }}>
            {excerpt}
          </p>
        )}
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span
          className="bg-[#8bcef7] text-[#292929] font-medium px-3 py-1.5 rounded-full uppercase tracking-[0.04em]"
          style={{ fontSize: "clamp(9px, 0.7vw, 11px)" }}
        >
          {postType}
        </span>
        <span className="text-[#232323] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
      </div>
    </Link>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const { checklists, blogs } = query ? await searchSanity(query) : { checklists: [], blogs: [] };
  const total = checklists.length + blogs.length;

  // No direct hits? Try the closest matches (typos / different wording).
  const close = query && total === 0 ? await getCloseMatches(query) : { checklists: [], blogs: [] };
  const closeTotal = close.checklists.length + close.blogs.length;

  // Popular suggestions only when we have nothing at all to show
  const categories = total === 0 && closeTotal === 0 ? await getAllCategories() : [];
  const popular = categories.flatMap((c) => c.checklists.slice(0, 1)).slice(0, 8);

  return (
    <main className="bg-white overflow-x-hidden pt-[70px]">
      <Navbar />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="pt-16 md:pt-20 pb-10 md:pb-14 px-5 text-center max-w-[834px] mx-auto">
        <h1
          className="font-display leading-none text-[#232323] tracking-[-0.04em] mb-4"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
        >
          {query ? (
            <>Results for <span className="text-[#9b9b9b]">&ldquo;{query}&rdquo;</span></>
          ) : (
            "Search everything"
          )}
        </h1>
        {query && (
          <p className="font-medium text-[#9b9b9b] tracking-[-0.02em] mb-8" style={{ fontSize: "clamp(13px, 1vw, 16px)" }}>
            {total} result{total !== 1 ? "s" : ""} found
            {checklists.length > 0 && ` · ${checklists.length} checklist${checklists.length !== 1 ? "s" : ""}`}
            {blogs.length > 0 && ` · ${blogs.length} article${blogs.length !== 1 ? "s" : ""}`}
          </p>
        )}
        {!query && (
          <p className="font-medium text-[#9b9b9b] tracking-[-0.02em] mb-8" style={{ fontSize: "clamp(13px, 1vw, 16px)" }}>
            Find any checklist or article. Type the document, life situation, or category.
          </p>
        )}
        <div className="max-w-[720px] mx-auto">
          <SearchBar placeholder="Search for a document, checklist, or topic" />
        </div>
      </section>

      <div className="px-5 sm:px-10 lg:px-20 max-w-[1920px] mx-auto pb-24">

        {/* ── Closest matches (typos / different wording) ───── */}
        {total === 0 && closeTotal > 0 && (
          <>
            <div className="max-w-[720px] mx-auto text-center mb-10 md:mb-12">
              <p className="font-display text-[#232323] tracking-[-0.03em] mb-2" style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)" }}>
                No exact match for &ldquo;{query}&rdquo;
              </p>
              <p className="text-[#9b9b9b] tracking-[-0.02em]" style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}>
                Here are the closest things we found. Did you mean one of these?
              </p>
            </div>
            {close.checklists.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-12">
                {close.checklists.map((item) => (
                  <ResultCard key={item.slug} {...item} />
                ))}
              </div>
            )}
            {close.blogs.length > 0 && (
              <div className="flex flex-col gap-4 max-w-[900px]">
                {close.blogs.map((item) => (
                  <BlogResult key={item.slug} {...item} />
                ))}
              </div>
            )}
          </>
        )}

        {/* ── No results / empty ────────────────────────────── */}
        {total === 0 && closeTotal === 0 && (
          <div className="max-w-[720px] mx-auto text-center">
            {query && (
              <div className="bg-[#f4f4f4] rounded-[20px] px-8 py-10 mb-12">
                <p className="font-display text-[#232323] tracking-[-0.03em] mb-2" style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)" }}>
                  Nothing found for &ldquo;{query}&rdquo;
                </p>
                <p className="text-[#9b9b9b] tracking-[-0.02em]" style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}>
                  Try the document name, life situation, or category, e.g. &ldquo;passport&rdquo;, &ldquo;NIN&rdquo;, or &ldquo;marriage&rdquo;.
                </p>
              </div>
            )}

            {popular.length > 0 && (
              <>
                <p className="font-medium text-[#232323] tracking-[-0.02em] mb-5" style={{ fontSize: "clamp(14px, 1vw, 16px)" }}>
                  Popular checklists
                </p>
                <div className="flex flex-wrap gap-2 items-center justify-center">
                  {popular.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/checklist/${item.slug}`}
                      className="border border-[#e0e0e0] font-medium text-[#232323] tracking-[-0.02em] px-4 py-2 rounded-full hover:border-[#ccbaf8] hover:bg-[#f9f5ff] transition-all"
                      style={{ fontSize: "clamp(11px, 0.9vw, 14px)" }}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/browse"
                  className="inline-flex items-center gap-2 mt-10 bg-[#232323] hover:bg-[#111] text-white font-medium tracking-[-0.02em] px-6 py-3 rounded-full transition-all active:scale-95"
                  style={{ fontSize: "clamp(12px, 0.95vw, 15px)" }}
                >
                  Browse all checklists →
                </Link>
              </>
            )}
          </div>
        )}

        {/* ── Checklist results (filterable + sortable) ─────── */}
        {checklists.length > 0 && <SearchResults checklists={checklists} />}

        {/* ── Blog results ──────────────────────────────────── */}
        {blogs.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8 md:mb-10">
              <h2 className="font-medium text-[#232323] tracking-[-0.04em]" style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.75rem)" }}>
                From the blog
              </h2>
              <span className="border border-[#e0e0e0] text-[#232323] font-medium tracking-[-0.02em] px-4 py-2 rounded-full" style={{ fontSize: "clamp(11px, 0.85vw, 14px)" }}>
                {blogs.length} found
              </span>
            </div>
            <div className="flex flex-col gap-4 max-w-[900px]">
              {blogs.map((item) => (
                <BlogResult key={item.slug} {...item} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </main>
  );
}
