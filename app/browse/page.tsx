import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import { getAllCategories } from "../../lib/sanity/queries";
import type { SanityCategory } from "../../lib/sanity/queries";

export const revalidate = 30;

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

/* ─── Page ──────────────────────────────────────────────── */
export default async function Browse() {
  const categories = await getAllCategories();

  const quickTags = categories
    .flatMap((c) => c.checklists.slice(0, 2))
    .slice(0, 6);

  return (
    <main className="bg-white overflow-x-hidden pt-[70px]">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="pt-16 md:pt-24 pb-12 md:pb-16 px-5 text-center max-w-[834px] mx-auto">
        <h1
          className="font-display leading-none text-[#232323] tracking-[-0.04em] mb-6"
          style={{ fontSize: "clamp(2.5rem, 6.5vw, 6rem)" }}
        >
          Browse everything
        </h1>
        <p
          className="font-medium leading-[1.4] text-[#232323] tracking-[-0.02em]"
          style={{ fontSize: "clamp(0.875rem, 1.1vw, 1rem)" }}
        >
          Pick a category, or search for the exact step you&apos;re on.
        </p>
      </section>

      {/* ── Search ───────────────────────────────────── */}
      <section className="flex flex-col gap-4 items-center px-5 pb-16 md:pb-20 w-full max-w-[720px] mx-auto">
        <SearchBar />
        <div className="flex gap-2 items-center w-full overflow-x-auto scrollbar-none pb-0.5">
          {quickTags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/checklist/${tag.slug}`}
              className="border border-[#e0e0e0] font-medium text-[#232323] tracking-[-0.02em] px-4 py-2 rounded-full hover:border-[#ccbaf8] hover:bg-[#f9f5ff] transition-all whitespace-nowrap shrink-0"
              style={{ fontSize: "clamp(11px, 0.9vw, 14px)" }}
            >
              {tag.title}
            </Link>
          ))}
        </div>
      </section>

      {/* ── Category sections ────────────────────────── */}
      {categories.map((cat) => (
        <CategorySection key={cat.id} {...cat} />
      ))}

      {/* ── Watermark ────────────────────────────────── */}
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
