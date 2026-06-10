import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import { searchSanity } from "../../lib/sanity/queries";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const { checklists, blogs } = query ? await searchSanity(query) : { checklists: [], blogs: [] };
  const total = checklists.length + blogs.length;

  return (
    <main className="bg-white overflow-x-hidden pt-[70px]">
      <Navbar />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="pt-16 md:pt-20 pb-10 md:pb-12 px-5 max-w-[834px] mx-auto">
        <h1
          className="font-display leading-none text-[#232323] tracking-[-0.04em] mb-8"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
        >
          {query ? (
            <>
              Results for{" "}
              <span className="text-[#9b9b9b]">&ldquo;{query}&rdquo;</span>
            </>
          ) : (
            "Search"
          )}
        </h1>
        <SearchBar placeholder="Search for a document, checklist, or topic" />
      </section>

      {/* ── Results ────────────────────────────────────────── */}
      <div className="px-5 sm:px-10 lg:px-20 max-w-[1920px] mx-auto pb-24">

        {/* No query */}
        {!query && (
          <p className="text-[#9b9b9b] tracking-[-0.02em]" style={{ fontSize: "clamp(14px, 1vw, 16px)" }}>
            Enter a search term above to find checklists and articles.
          </p>
        )}

        {/* No results */}
        {query && total === 0 && (
          <div className="max-w-[480px]">
            <p className="text-[#232323] font-medium tracking-[-0.02em] mb-2" style={{ fontSize: "clamp(15px, 1.1vw, 18px)" }}>
              Nothing found for &ldquo;{query}&rdquo;
            </p>
            <p className="text-[#9b9b9b] tracking-[-0.02em]" style={{ fontSize: "clamp(13px, 0.9vw, 15px)" }}>
              Try a different term — for example the document name, life situation, or category.
            </p>
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 mt-6 border border-[#e0e0e0] font-medium text-[#232323] tracking-[-0.02em] px-5 py-2.5 rounded-full hover:border-[#ccbaf8] hover:bg-[#f9f5ff] transition-all"
              style={{ fontSize: "clamp(12px, 0.9vw, 14px)" }}
            >
              Browse all checklists →
            </Link>
          </div>
        )}

        {/* Checklists */}
        {checklists.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h2 className="font-medium text-[#232323] tracking-[-0.04em]" style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)" }}>
                Checklists
              </h2>
              <span className="border border-[#e0e0e0] text-[#232323] font-medium tracking-[-0.02em] px-4 py-1.5 rounded-full" style={{ fontSize: "clamp(11px, 0.8vw, 13px)" }}>
                {checklists.length} found
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {checklists.map((item) => (
                <Link
                  key={item.slug}
                  href={`/checklist/${item.slug}`}
                  className="bg-[#f4f4f4] rounded-2xl px-6 py-5 flex flex-col gap-3 hover:bg-[#f0ecfe] transition-colors group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3
                      className="font-display text-[#232323] leading-tight tracking-[-0.03em] flex-1"
                      style={{ fontSize: "clamp(14px, 1.1vw, 17px)" }}
                    >
                      {item.title}
                    </h3>
                    <span className="text-[#232323] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5">→</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {item.category && (
                      <span
                        className="bg-[#ccbaf8] text-[#292929] font-medium px-2.5 py-1 rounded-full uppercase tracking-[0.04em]"
                        style={{ fontSize: "clamp(9px, 0.7vw, 11px)" }}
                      >
                        {item.category}
                      </span>
                    )}
                    <span className="text-[#9b9b9b] tracking-[-0.01em]" style={{ fontSize: "clamp(11px, 0.8vw, 13px)" }}>
                      {item.count} document{item.count !== 1 ? "s" : ""}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Blog posts */}
        {blogs.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h2 className="font-medium text-[#232323] tracking-[-0.04em]" style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)" }}>
                From the blog
              </h2>
              <span className="border border-[#e0e0e0] text-[#232323] font-medium tracking-[-0.02em] px-4 py-1.5 rounded-full" style={{ fontSize: "clamp(11px, 0.8vw, 13px)" }}>
                {blogs.length} found
              </span>
            </div>
            <div className="flex flex-col gap-3 max-w-[720px]">
              {blogs.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="bg-[#f4f4f4] rounded-2xl px-6 py-5 flex items-start justify-between gap-4 hover:bg-[#f0ecfe] transition-colors group"
                >
                  <div className="flex flex-col gap-2 flex-1 min-w-0">
                    <h3
                      className="font-display text-[#232323] leading-tight tracking-[-0.03em]"
                      style={{ fontSize: "clamp(14px, 1.1vw, 17px)" }}
                    >
                      {item.title}
                    </h3>
                    {item.excerpt && (
                      <p className="text-[#9b9b9b] leading-[1.5] tracking-[-0.01em] line-clamp-1" style={{ fontSize: "clamp(12px, 0.85vw, 14px)" }}>
                        {item.excerpt}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {item.postType && (
                      <span
                        className="bg-[#8bcef7] text-[#292929] font-medium px-2.5 py-1 rounded-full uppercase tracking-[0.04em]"
                        style={{ fontSize: "clamp(9px, 0.7vw, 11px)" }}
                      >
                        {item.postType}
                      </span>
                    )}
                    <span className="text-[#232323] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </main>
  );
}
