import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DownloadCta from "./DownloadCta";
import {
  LAST_UPDATED,
  LAST_UPDATED_ISO,
  BATCH_COVERAGE,
  PAGE_TITLE,
  INTRO,
  contents,
  gates,
  GATES_KICKER,
  sequence,
  SEQUENCE_KICKER,
  DOCS_INTRO,
  gateDocs,
  conditionalDocs,
  DOCS_KICKER,
  sourcing,
  SOURCING_WARNING,
  COSTS_INTRO,
  costs,
  COSTS_TOTAL,
  costNotes,
  ISSUED_KIT,
  clothing,
  packGroups,
  BANNED_INTRO,
  banned,
  bannedSometimes,
  BANNED_KICKER,
  arrival,
  arrivalNotes,
  mistakes,
  faqs,
  relatedChecklists,
  RELATED_GUIDE,
  SOURCE_NOTE,
} from "./content";

const URL = "https://credentia.site/guides/nysc-camp-checklist";

export const metadata: Metadata = {
  title: "NYSC Camp Checklist 2026: Documents, Costs & Packing List",
  description:
    "Every document you need for NYSC camp registration, where to get it, what it costs, and what to pack. Updated August 2026. Free printable checklist.",
  keywords: [
    "nysc camp checklist",
    "documents needed for nysc camp",
    "what to take to nysc camp",
    "nysc camp requirements 2026",
    "nerd clearance slip",
    "nysc medical fitness certificate",
    "nysc registration requirements",
  ],
  alternates: { canonical: "/guides/nysc-camp-checklist" },
  openGraph: {
    title: "NYSC Camp Checklist: Everything You Need Before You Report",
    description:
      "The full pre-camp checklist: documents, sourcing, costs and packing. Free to download and print.",
    url: URL,
    siteName: "Credentia",
    locale: "en_NG",
    type: "article",
    modifiedTime: LAST_UPDATED_ISO,
  },
  twitter: {
    card: "summary_large_image",
    title: "NYSC Camp Checklist: Everything You Need Before You Report",
    description:
      "The full pre-camp checklist: documents, sourcing, costs and packing. Free to download and print.",
  },
};

/* ─── Structured data ─────────────────────────────────────── */
/*
 * Built from the same exports the page renders, so the markup and the
 * structured data cannot drift apart when the content is updated.
 */
function structuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        "@id": `${URL}#howto`,
        name: "How to register for NYSC camp",
        description:
          "The full NYSC mobilisation sequence, from school clearance to reporting at camp.",
        dateModified: LAST_UPDATED_ISO,
        totalTime: "P90D",
        step: sequence.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.name,
          text: s.body,
          url: `${URL}#sequence`,
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${URL}#documents`,
        name: "Documents to carry to the NYSC camp gate",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: gateDocs.length,
        itemListElement: gateDocs.map((d, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: d.document,
          description: `${d.carry}. ${d.notes}`,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${URL}#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

/* ─── Shared bits ─────────────────────────────────────────── */

const SECTION = "scroll-mt-[90px]";

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className={`${SECTION} font-display text-[#232323] leading-tight tracking-[-0.04em] mb-5`}
      style={{ fontSize: "clamp(1.35rem, 2.2vw, 2.1rem)" }}
    >
      {children}
    </h2>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[#505050] leading-[1.75] tracking-[-0.01em] mb-4 last:mb-0"
      style={{ fontSize: "clamp(14px, 1vw, 17px)" }}
    >
      {children}
    </p>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="font-display text-[#232323] leading-tight tracking-[-0.03em] mb-4"
      style={{ fontSize: "clamp(1.05rem, 1.5vw, 1.4rem)" }}
    >
      {children}
    </h3>
  );
}

/* A pull-quote style warning box. */
function Callout({ children, color = "#efd536" }: { children: React.ReactNode; color?: string }) {
  return (
    <div
      className="rounded-[20px] px-7 md:px-9 py-6 md:py-7 border-l-[6px]"
      style={{ backgroundColor: `${color}1f`, borderColor: color }}
    >
      <p
        className="text-[#232323] leading-[1.65] tracking-[-0.01em] font-medium"
        style={{ fontSize: "clamp(13px, 0.95vw, 16px)" }}
      >
        {children}
      </p>
    </div>
  );
}

/*
 * Tables keep their columns on mobile and scroll sideways inside their own
 * container (the same pattern as the browse page filter pills) rather than
 * stacking. The hint is there because these tables carry the page's core
 * value, and a cut-off column with no affordance is easy to miss on a phone.
 */
function Table({ head, children }: { head: string[]; children: React.ReactNode }) {
  return (
    <>
      <p
        className="sm:hidden text-[#9b9b9b] tracking-[-0.01em] mb-2"
        style={{ fontSize: "11.5px" }}
      >
        Scroll sideways to see every column
        <span aria-hidden="true"> →</span>
      </p>
      <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[520px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#e0e0e0]">
              {head.map((h, i) => (
                <th
                  key={h}
                  scope="col"
                  className={`pb-3 font-medium uppercase tracking-[0.05em] text-[#9b9b9b] ${i > 0 ? "pl-4" : ""}`}
                  style={{ fontSize: "clamp(10px, 0.72vw, 12px)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </>
  );
}

const TD = "py-3.5 align-top leading-[1.55] tracking-[-0.01em]";
const TD_SIZE = { fontSize: "clamp(12.5px, 0.92vw, 15px)" } as const;

export default function NyscCampChecklist() {
  return (
    <main className="bg-white overflow-x-hidden pt-[70px]">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
      />

      {/* ── Hero card ────────────────────────────────────── */}
      <div className="px-5 sm:px-10 lg:px-20 pt-8 max-w-[1920px] mx-auto">
        <div className="relative" style={{ height: "clamp(220px, 19vw, 330px)" }}>
          <div className="absolute top-0 left-7 z-10 h-10 flex items-center px-4 rounded-tl-2xl rounded-tr-2xl bg-[#ccbaf8]">
            <span
              className="font-medium tracking-wide uppercase text-[#292929]"
              style={{ fontSize: "clamp(10px, 0.8vw, 13px)" }}
            >
              Guide
            </span>
          </div>
          <div className="absolute inset-x-0 top-6 bottom-0 rounded-[20px] bg-[#ccbaf8] flex flex-col justify-center px-7 sm:px-10 md:px-16 py-8 md:py-10 gap-3 md:gap-5">
            <p
              className="text-[#505050] tracking-[-0.02em]"
              style={{ fontSize: "clamp(11px, 0.85vw, 15px)" }}
            >
              <Link href="/" className="hover:underline">
                Home
              </Link>
              {" → "}
              <span>Guides</span>
              {" → "}
              NYSC camp checklist
            </p>
            <h1
              className="font-display text-[#292929] leading-none tracking-[-0.04em]"
              style={{ fontSize: "clamp(1.9rem, 4vw, 3.6rem)" }}
            >
              {PAGE_TITLE}
            </h1>
            <div
              className="flex flex-wrap items-center gap-3 text-[#505050]"
              style={{ fontSize: "clamp(11px, 0.85vw, 15px)" }}
            >
              <span className="font-medium text-[#292929]">
                Last updated: {LAST_UPDATED}
              </span>
              {/* The dot would dangle at the end of a wrapped line on phones. */}
              <span className="hidden sm:block w-1 h-1 rounded-full bg-[#505050] shrink-0" />
              <span className="w-full sm:w-auto">{BATCH_COVERAGE}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────── */}
      <div className="px-5 sm:px-10 lg:px-20 max-w-[1920px] mx-auto mt-12 md:mt-20">
        <div className="max-w-[820px] mx-auto">
          {/* Intro */}
          <div className="mb-8">
            {INTRO.map((p, i) => (
              <p
                key={i}
                className="text-[#232323] leading-[1.7] tracking-[-0.02em] mb-5 last:mb-0"
                style={{ fontSize: "clamp(15px, 1.12vw, 19px)" }}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Soft CTA, non-blocking */}
          <div className="mb-12 md:mb-14">
            <DownloadCta variant="banner" />
          </div>

          {/* Contents */}
          <nav aria-label="On this page" className="mb-14 md:mb-20">
            <p
              className="font-medium uppercase tracking-[0.06em] text-[#9b9b9b] mb-4"
              style={{ fontSize: "clamp(10px, 0.72vw, 12px)" }}
            >
              Contents
            </p>
            <ul className="flex flex-wrap gap-2.5">
              {contents.map((c) => (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    className="inline-block border border-[#e0e0e0] font-medium text-[#232323] tracking-[-0.02em] px-4 py-2 rounded-full hover:border-[#ccbaf8] hover:bg-[#f9f5ff] transition-all"
                    style={{ fontSize: "clamp(11.5px, 0.88vw, 14px)" }}
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-16 md:gap-24">
            {/* ── 1. Three gates ──────────────────────────── */}
            <section>
              <SectionHeading id="three-gates">
                There are three gates, not one
              </SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mb-7">
                {gates.map((g) => (
                  <div
                    key={g.n}
                    className="rounded-[18px] p-6 flex flex-col gap-3"
                    style={{ backgroundColor: g.color }}
                  >
                    <span
                      className="font-display text-[#292929]/55 leading-none tracking-[-0.04em]"
                      style={{ fontSize: "clamp(1.5rem, 2.2vw, 2rem)" }}
                    >
                      {g.n}
                    </span>
                    <h3
                      className="font-display text-[#292929] leading-tight tracking-[-0.03em]"
                      style={{ fontSize: "clamp(1rem, 1.35vw, 1.3rem)" }}
                    >
                      {g.name}
                    </h3>
                    <p
                      className="text-[#292929]/75 leading-[1.6] tracking-[-0.01em]"
                      style={{ fontSize: "clamp(12.5px, 0.9vw, 15px)" }}
                    >
                      {g.body}
                    </p>
                  </div>
                ))}
              </div>
              <Callout color="#be3738">{GATES_KICKER}</Callout>
            </section>

            {/* ── 2. The full sequence ────────────────────── */}
            <section>
              <SectionHeading id="sequence">The full sequence</SectionHeading>
              <ol className="flex flex-col gap-6 md:gap-7 mb-8">
                {sequence.map((s, i) => (
                  <li key={s.name} className="flex gap-4 md:gap-5">
                    <span
                      className="shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#351459] text-white font-medium flex items-center justify-center tracking-[-0.02em]"
                      style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}
                    >
                      {i + 1}
                    </span>
                    <div className="pt-1">
                      <h3
                        className="font-medium text-[#232323] tracking-[-0.02em] mb-1.5"
                        style={{ fontSize: "clamp(15px, 1.1vw, 18px)" }}
                      >
                        {s.name}
                      </h3>
                      <p
                        className="text-[#505050] leading-[1.7] tracking-[-0.01em]"
                        style={{ fontSize: "clamp(13.5px, 0.98vw, 16px)" }}
                      >
                        {s.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <Callout>{SEQUENCE_KICKER}</Callout>
            </section>

            {/* ── 3. Documents to carry ───────────────────── */}
            <section>
              <SectionHeading id="documents">
                Documents to carry to the camp gate
              </SectionHeading>
              <Para>{DOCS_INTRO}</Para>

              <div className="mt-7 mb-10">
                <Table head={["Document", "Carry", "Notes"]}>
                  {gateDocs.map((d) => (
                    <tr key={d.document} className="border-b border-[#f0f0f0]">
                      <th
                        scope="row"
                        className={`${TD} pr-4 font-medium text-[#232323] text-left`}
                        style={TD_SIZE}
                      >
                        {d.document}
                      </th>
                      <td className={`${TD} pl-4 text-[#232323] whitespace-nowrap`} style={TD_SIZE}>
                        {d.carry}
                      </td>
                      <td className={`${TD} pl-4 text-[#505050]`} style={TD_SIZE}>
                        {d.notes}
                      </td>
                    </tr>
                  ))}
                </Table>
              </div>

              <SubHeading>Depending on who you are</SubHeading>
              <ul className="flex flex-col gap-4 mb-8">
                {conditionalDocs.map((c) => (
                  <li key={c.who} className="bg-[#f4f4f4] rounded-2xl px-6 py-5">
                    <p
                      className="font-medium text-[#232323] tracking-[-0.02em] mb-1"
                      style={{ fontSize: "clamp(13.5px, 1vw, 16px)" }}
                    >
                      {c.who}
                    </p>
                    <p
                      className="text-[#505050] leading-[1.6] tracking-[-0.01em]"
                      style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}
                    >
                      {c.needs}
                    </p>
                  </li>
                ))}
              </ul>
              <Callout>{DOCS_KICKER}</Callout>
            </section>

            {/* ── 4. Sourcing ─────────────────────────────── */}
            <section>
              <SectionHeading id="sourcing">Where to get each document</SectionHeading>
              <div className="flex flex-col gap-5 md:gap-6 mb-8">
                {sourcing.map((s) => (
                  <article key={s.title} className="rounded-[20px] bg-[#f4f4f4] p-6 md:p-8">
                    <h3
                      className="font-display text-[#232323] leading-tight tracking-[-0.03em] mb-5"
                      style={{ fontSize: "clamp(1.05rem, 1.45vw, 1.35rem)" }}
                    >
                      {s.title}
                    </h3>
                    <dl className="flex flex-col gap-4">
                      {(
                        [
                          ["From", s.from],
                          ["Cost", s.cost],
                          ["Time", s.time],
                          ["Watch out", s.watch],
                        ] as const
                      )
                        .filter(([, value]) => Boolean(value))
                        .map(([label, value]) => (
                          <div
                            key={label}
                            className="grid grid-cols-1 sm:grid-cols-[88px_1fr] gap-1 sm:gap-4"
                          >
                            <dt
                              className="font-medium uppercase tracking-[0.05em] text-[#9b9b9b] sm:pt-[3px]"
                              style={{ fontSize: "clamp(10px, 0.7vw, 11.5px)" }}
                            >
                              {label}
                            </dt>
                            <dd
                              className="text-[#505050] leading-[1.6] tracking-[-0.01em]"
                              style={{ fontSize: "clamp(13px, 0.95vw, 15.5px)" }}
                            >
                              {value}
                            </dd>
                          </div>
                        ))}
                    </dl>
                  </article>
                ))}
              </div>
              <Callout color="#be3738">{SOURCING_WARNING}</Callout>
            </section>

            {/* ── 5. Costs ────────────────────────────────── */}
            <section>
              <SectionHeading id="costs">What it costs</SectionHeading>
              <Para>{COSTS_INTRO}</Para>

              <div className="mt-7 mb-10">
                <Table head={["", "Lean", "Comfortable"]}>
                  {costs.map((c) => (
                    <tr key={c.item} className="border-b border-[#f0f0f0]">
                      <th
                        scope="row"
                        className={`${TD} pr-4 font-normal text-[#505050] text-left`}
                        style={TD_SIZE}
                      >
                        {c.item}
                      </th>
                      <td className={`${TD} pl-4 text-[#232323] whitespace-nowrap`} style={TD_SIZE}>
                        {c.lean}
                      </td>
                      <td className={`${TD} pl-4 text-[#232323] whitespace-nowrap`} style={TD_SIZE}>
                        {c.comfortable}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-[#232323]">
                    <th
                      scope="row"
                      className={`${TD} pr-4 font-medium text-[#232323] text-left`}
                      style={TD_SIZE}
                    >
                      Total
                    </th>
                    <td
                      className={`${TD} pl-4 font-medium text-[#232323] whitespace-nowrap`}
                      style={TD_SIZE}
                    >
                      {COSTS_TOTAL.lean}
                    </td>
                    <td
                      className={`${TD} pl-4 font-medium text-[#232323] whitespace-nowrap`}
                      style={TD_SIZE}
                    >
                      {COSTS_TOTAL.comfortable}
                    </td>
                  </tr>
                </Table>
              </div>

              <SubHeading>Three things to know</SubHeading>
              <div className="flex flex-col gap-5">
                {costNotes.map((n) => (
                  <div key={n.heading}>
                    <p
                      className="font-medium text-[#232323] tracking-[-0.02em] mb-1"
                      style={{ fontSize: "clamp(13.5px, 1vw, 16px)" }}
                    >
                      {n.heading}
                    </p>
                    <p
                      className="text-[#505050] leading-[1.7] tracking-[-0.01em]"
                      style={{ fontSize: "clamp(13px, 0.95vw, 16px)" }}
                    >
                      {n.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Mid-page CTA, after the reader has hit real value */}
            <DownloadCta variant="inline" />

            {/* ── 6. Packing ──────────────────────────────── */}
            <section>
              <SectionHeading id="packing">What to pack</SectionHeading>

              <div className="rounded-[20px] bg-[#8bcef7] px-7 md:px-9 py-6 md:py-7 mb-10">
                <p
                  className="font-medium text-[#292929] tracking-[-0.02em] mb-2"
                  style={{ fontSize: "clamp(13.5px, 1vw, 16px)" }}
                >
                  What NYSC issues you
                </p>
                <p
                  className="text-[#292929]/80 leading-[1.65] tracking-[-0.01em]"
                  style={{ fontSize: "clamp(13px, 0.95vw, 16px)" }}
                >
                  {ISSUED_KIT}
                </p>
              </div>

              <SubHeading>Clothing</SubHeading>
              <div className="mb-10">
                <Table head={["Item", "Quantity", "Note"]}>
                  {clothing.map((c) => (
                    <tr key={c.item} className="border-b border-[#f0f0f0]">
                      <th
                        scope="row"
                        className={`${TD} pr-4 font-normal text-[#232323] text-left`}
                        style={TD_SIZE}
                      >
                        {c.item}
                      </th>
                      <td className={`${TD} pl-4 text-[#232323] whitespace-nowrap`} style={TD_SIZE}>
                        {c.qty}
                      </td>
                      <td className={`${TD} pl-4 text-[#505050]`} style={TD_SIZE}>
                        {c.note}
                      </td>
                    </tr>
                  ))}
                </Table>
              </div>

              <div className="flex flex-col gap-9">
                {packGroups.map((g) => (
                  <div key={g.heading}>
                    <SubHeading>{g.heading}</SubHeading>
                    {g.intro && (
                      <p
                        className="text-[#505050] leading-[1.7] tracking-[-0.01em] mb-4"
                        style={{ fontSize: "clamp(13px, 0.95vw, 16px)" }}
                      >
                        {g.intro}
                      </p>
                    )}
                    <ul className="flex flex-wrap gap-2 mb-3">
                      {g.items.map((item) => (
                        <li
                          key={item}
                          className="bg-[#f4f4f4] text-[#505050] rounded-full px-4 py-2 tracking-[-0.01em]"
                          style={{ fontSize: "clamp(12px, 0.88vw, 14.5px)" }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                    {g.emphasis?.map((e) => (
                      <p
                        key={e}
                        className="mt-3 font-medium text-[#232323] leading-[1.6] tracking-[-0.01em] border-l-[5px] border-[#efd536] pl-4 py-1"
                        style={{ fontSize: "clamp(13px, 0.95vw, 16px)" }}
                      >
                        {e}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </section>

            {/* ── 7. Banned items ─────────────────────────── */}
            <section>
              <SectionHeading id="banned">Banned items</SectionHeading>
              <Para>{BANNED_INTRO}</Para>
              <ul className="flex flex-wrap gap-2 mt-6 mb-8">
                {banned.map((b) => (
                  <li
                    key={b}
                    className="bg-[#be3738]/10 text-[#8d2526] font-medium rounded-full px-4 py-2 tracking-[-0.01em]"
                    style={{ fontSize: "clamp(12px, 0.88vw, 14.5px)" }}
                  >
                    {b}
                  </li>
                ))}
              </ul>

              <SubHeading>Often seized or disallowed, camp by camp</SubHeading>
              <ul className="flex flex-wrap gap-2 mb-8">
                {bannedSometimes.map((b) => (
                  <li
                    key={b}
                    className="bg-[#f4f4f4] text-[#505050] rounded-full px-4 py-2 tracking-[-0.01em]"
                    style={{ fontSize: "clamp(12px, 0.88vw, 14.5px)" }}
                  >
                    {b}
                  </li>
                ))}
              </ul>
              <Callout>{BANNED_KICKER}</Callout>
            </section>

            {/* ── 8. Arrival day ──────────────────────────── */}
            <section>
              <SectionHeading id="arrival">Arrival day</SectionHeading>
              <Para>The sequence at most camps:</Para>
              <ol className="flex flex-col gap-2.5 mt-6 mb-9">
                {arrival.map((a, i) => (
                  <li key={a} className="flex items-start gap-4">
                    <span
                      className="shrink-0 w-7 h-7 rounded-full bg-[#f4f4f4] text-[#505050] font-medium flex items-center justify-center"
                      style={{ fontSize: "clamp(11px, 0.8vw, 13px)" }}
                    >
                      {i + 1}
                    </span>
                    <span
                      className="text-[#505050] leading-[1.75] tracking-[-0.01em]"
                      style={{ fontSize: "clamp(13.5px, 0.98vw, 16px)" }}
                    >
                      {a}
                    </span>
                  </li>
                ))}
              </ol>
              <div className="flex flex-col gap-5">
                {arrivalNotes.map((n) => (
                  <div key={n.heading}>
                    <p
                      className="font-medium text-[#232323] tracking-[-0.02em] mb-1"
                      style={{ fontSize: "clamp(13.5px, 1vw, 16px)" }}
                    >
                      {n.heading}
                    </p>
                    <p
                      className="text-[#505050] leading-[1.7] tracking-[-0.01em]"
                      style={{ fontSize: "clamp(13px, 0.95vw, 16px)" }}
                    >
                      {n.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── 9. Mistakes ─────────────────────────────── */}
            <section>
              <SectionHeading id="mistakes">
                Mistakes that send people home
              </SectionHeading>
              <ul className="flex flex-col gap-4">
                {mistakes.map((m) => (
                  <li
                    key={m.title}
                    className="flex gap-4 border-b border-[#f0f0f0] pb-4 last:border-0 last:pb-0"
                  >
                    <span
                      className="shrink-0 mt-[7px] w-2 h-2 rounded-full bg-[#be3738]"
                      aria-hidden="true"
                    />
                    <div>
                      <p
                        className="font-medium text-[#232323] leading-[1.55] tracking-[-0.02em]"
                        style={{ fontSize: "clamp(13.5px, 1vw, 16.5px)" }}
                      >
                        {m.title}
                      </p>
                      {m.body && (
                        <p
                          className="text-[#505050] leading-[1.65] tracking-[-0.01em] mt-1"
                          style={{ fontSize: "clamp(13px, 0.93vw, 15.5px)" }}
                        >
                          {m.body}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* ── FAQ ─────────────────────────────────────── */}
            <section>
              <SectionHeading id="faq">FAQ</SectionHeading>
              <div className="flex flex-col">
                {faqs.map((f) => (
                  <details
                    key={f.q}
                    className="group border-b border-[#e8e8e8] py-5 first:border-t first:border-[#e8e8e8]"
                  >
                    <summary className="flex items-start justify-between gap-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                      <span
                        className="font-medium text-[#232323] leading-[1.5] tracking-[-0.02em]"
                        style={{ fontSize: "clamp(14px, 1.02vw, 17px)" }}
                      >
                        {f.q}
                      </span>
                      <span
                        className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-[#f4f4f4] text-[#505050] flex items-center justify-center transition-transform duration-300 group-open:rotate-45"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </summary>
                    <p
                      className="text-[#505050] leading-[1.7] tracking-[-0.01em] mt-3 pr-11"
                      style={{ fontSize: "clamp(13px, 0.95vw, 16px)" }}
                    >
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* ── Footer CTA (primary) ───────────────────────── */}
          <div id="download" className={`${SECTION} mt-16 md:mt-24`}>
            <DownloadCta variant="primary" />
          </div>

          {/* ── Source and disclaimer ──────────────────────── */}
          <div className="mt-14 md:mt-20 border-t border-[#e8e8e8] pt-7">
            <p
              className="text-[#9b9b9b] leading-[1.7] tracking-[-0.01em]"
              style={{ fontSize: "clamp(11.5px, 0.8vw, 13px)" }}
            >
              {SOURCE_NOTE}
            </p>
            <p
              className="text-[#9b9b9b] leading-[1.7] tracking-[-0.01em] mt-3"
              style={{ fontSize: "clamp(11.5px, 0.8vw, 13px)" }}
            >
              Something wrong or changed in your batch?{" "}
              <Link href="/contact" className="text-[#505050] underline hover:text-[#232323]">
                Tell us
              </Link>
              , and we update this page every batch.
            </p>
          </div>
        </div>
      </div>

      {/* ── Related on Credentia ─────────────────────────── */}
      <section className="px-5 sm:px-10 lg:px-20 mt-16 md:mt-24 pb-16 md:pb-24 max-w-[1920px] mx-auto">
        <div className="max-w-[820px] mx-auto">
          <div className="flex items-center justify-between mb-7 md:mb-9">
            <h2
              className="font-medium text-[#232323] tracking-[-0.04em]"
              style={{ fontSize: "clamp(1.2rem, 1.9vw, 1.9rem)" }}
            >
              Related on Credentia
            </h2>
            <Link
              href="/browse"
              className="border border-[#e0e0e0] font-medium text-[#232323] tracking-[-0.02em] px-4 py-2 rounded-full hover:border-[#ccbaf8] hover:bg-[#f9f5ff] transition-all whitespace-nowrap"
              style={{ fontSize: "clamp(11px, 0.9vw, 14px)" }}
            >
              Browse all
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {relatedChecklists.map((r) => (
              <Link
                key={r.slug}
                href={`/checklist/${r.slug}`}
                className="group bg-[#f4f4f4] rounded-2xl px-6 py-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <p
                  className="font-display text-[#232323] leading-tight tracking-[-0.03em] mb-1.5"
                  style={{ fontSize: "clamp(15px, 1.15vw, 18px)" }}
                >
                  {r.title}
                </p>
                <p
                  className="text-[#505050] leading-[1.55] tracking-[-0.01em]"
                  style={{ fontSize: "clamp(12.5px, 0.9vw, 14.5px)" }}
                >
                  {r.blurb}
                </p>
                <span
                  className="inline-flex items-center gap-1.5 text-[#232323] font-medium mt-3 opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                  style={{ fontSize: "clamp(11px, 0.8vw, 13px)" }}
                >
                  See the checklist <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>

          <Link
            href={`/blog/${RELATED_GUIDE.slug}`}
            className="mt-5 md:mt-6 block bg-[#ccbaf8] rounded-2xl px-6 py-6 md:px-8 md:py-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <p
              className="font-medium uppercase tracking-[0.06em] text-[#292929]/60 mb-2"
              style={{ fontSize: "clamp(10px, 0.72vw, 12px)" }}
            >
              From the blog
            </p>
            <p
              className="font-display text-[#292929] leading-tight tracking-[-0.03em]"
              style={{ fontSize: "clamp(16px, 1.3vw, 21px)" }}
            >
              {RELATED_GUIDE.title}
            </p>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
