import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type TocItem = { id: string; label: string };

/* ── Page shell ─────────────────────────────────────────────
   Shared layout for long-form legal pages (privacy, terms).
   Hero mirrors /contact; body is a centred prose column with a
   sticky "on this page" nav on large screens. */
export function LegalShell({
  eyebrow,
  title,
  lastUpdated,
  intro,
  toc,
  children,
}: {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  intro: ReactNode;
  toc: TocItem[];
  children: ReactNode;
}) {
  return (
    <main className="bg-white overflow-x-hidden pt-[70px]">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="pt-16 md:pt-24 pb-10 md:pb-14 px-5 max-w-[860px] mx-auto">
        <p
          className="font-medium text-[#9b9b9b] uppercase tracking-[0.1em] mb-5"
          style={{ fontSize: "clamp(10px, 0.85vw, 13px)" }}
        >
          {eyebrow}
        </p>
        <h1
          className="font-display leading-none text-[#232323] tracking-[-0.04em] mb-5"
          style={{ fontSize: "clamp(2.25rem, 6vw, 5rem)" }}
        >
          {title}
        </h1>
        <p className="inline-flex items-center gap-2 bg-[#f4f4f4] rounded-full px-4 py-1.5 font-medium text-[#505050] tracking-[-0.01em] mb-6 text-[12px] sm:text-[13px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ccbaf8]" />
          Last updated: {lastUpdated}
        </p>
        <div className="font-medium leading-[1.7] text-[#505050] tracking-[-0.02em] text-[14px] sm:text-[15px] md:text-[16px] flex flex-col gap-3">
          {intro}
        </div>
      </section>

      {/* ── Body ──────────────────────────────────────────── */}
      <section className="px-5 sm:px-10 lg:px-20 pb-16 md:pb-24 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-10 lg:gap-16 max-w-[1040px] mx-auto items-start">
          {/* Content */}
          <article className="flex flex-col gap-12 md:gap-16 max-w-[720px] order-2 lg:order-1">
            {children}
          </article>

          {/* On this page (desktop) */}
          <aside className="hidden lg:block sticky top-[100px] order-1 lg:order-2">
            <p
              className="font-medium text-[#9b9b9b] uppercase tracking-[0.08em] mb-4"
              style={{ fontSize: "clamp(10px, 0.8vw, 12px)" }}
            >
              On this page
            </p>
            <nav className="flex flex-col gap-1 border-l border-[#ececec]">
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-[#9b9b9b] hover:text-[#351459] hover:border-[#ccbaf8] transition-colors -ml-px border-l border-transparent pl-4 py-1.5 leading-snug tracking-[-0.01em] text-[13px]"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ── Section ────────────────────────────────────────────── */
export function Section({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-[100px] flex flex-col gap-5">
      <div className="flex items-baseline gap-3">
        <span
          className="font-display text-[#ccbaf8] tracking-[-0.04em] leading-none shrink-0"
          style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
        >
          {String(number).padStart(2, "0")}
        </span>
        <h2
          className="font-display text-[#232323] tracking-[-0.04em] leading-tight"
          style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.25rem)" }}
        >
          {title}
        </h2>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

/* ── Sub-heading (e.g. "2a. When you search") ───────────── */
export function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h3
      className="font-medium text-[#232323] tracking-[-0.02em] mt-2"
      style={{ fontSize: "clamp(1.05rem, 1.5vw, 1.2rem)" }}
    >
      {children}
    </h3>
  );
}

/* ── Paragraph ──────────────────────────────────────────── */
export function P({ children }: { children: ReactNode }) {
  return (
    <p className="text-[#505050] leading-[1.75] tracking-[-0.01em] text-[14px] sm:text-[15px] md:text-[16px]">
      {children}
    </p>
  );
}

/* ── Bulleted list ──────────────────────────────────────── */
export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex gap-3 text-[#505050] leading-[1.7] tracking-[-0.01em] text-[14px] sm:text-[15px] md:text-[16px]"
        >
          <span className="mt-[0.6em] w-1.5 h-1.5 rounded-full bg-[#ccbaf8] shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ── Why / Legal-basis callout ──────────────────────────── */
export function Note({ label, children }: { label: string; children: ReactNode }) {
  return (
    <p className="text-[#505050] leading-[1.7] tracking-[-0.01em] text-[14px] sm:text-[15px] md:text-[16px]">
      <span className="font-medium text-[#351459]">{label}:</span> {children}
    </p>
  );
}

/* ── Highlighted callout block ──────────────────────────── */
export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#f4f4f4] rounded-[18px] px-6 py-5 sm:px-8 sm:py-6 text-[#505050] leading-[1.7] tracking-[-0.01em] text-[14px] sm:text-[15px] md:text-[16px]">
      {children}
    </div>
  );
}

/* ── Data table ─────────────────────────────────────────── */
export function DataTable({
  head,
  rows,
}: {
  head: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="overflow-hidden rounded-[18px] border border-[#ececec]">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-[#351459]">
            {head.map((h) => (
              <th
                key={h}
                className="font-medium text-[#ccbaf8] uppercase tracking-[0.06em] px-5 py-3.5 text-[10px] sm:text-[11px]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-[#ececec] even:bg-[#fafafa] align-top">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-5 py-4 leading-[1.6] tracking-[-0.01em] text-[13px] sm:text-[14px] ${
                    j === 0 ? "font-medium text-[#232323]" : "text-[#505050]"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
