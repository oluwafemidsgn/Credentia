"use client";
import { useState } from "react";
import Link from "next/link";
import type { SanityChecklist } from "../../../lib/sanity/queries";

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#f4f4f4] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col gap-1.5">
      <p className="text-[#505050] uppercase tracking-wider text-[9px] sm:text-[10px]">
        {label}
      </p>
      <p className="font-display text-[#292929] leading-tight tracking-[-0.02em] text-[13px] sm:text-[16px] md:text-[18px]">
        {value}
      </p>
    </div>
  );
}

export default function ChecklistContent({ checklist }: { checklist: SanityChecklist }) {
  const [activeDoc, setActiveDoc] = useState(0);
  const { category, title, location, updatedDate, sortedCount, documents, relatedChecklists } = checklist;
  const doc = documents[activeDoc];

  return (
    <>
      {/* ── Two-column body ───────────────────────────────── */}
      <div className="px-4 sm:px-8 lg:px-20 max-w-[1920px] mx-auto mt-8 sm:mt-12 md:mt-16 pb-12 md:pb-24">
        <div className="flex gap-0 items-start">

          {/* Sidebar — desktop only */}
          <aside className="hidden lg:flex flex-col w-[260px] shrink-0">
            <p className="text-[#9b9b9b] uppercase tracking-widest px-6 py-2.5 text-[10px]">
              Documents
            </p>
            {documents.map((d, i) => (
              <button
                key={d.title}
                onClick={() => setActiveDoc(i)}
                className={`flex items-center gap-4 px-6 py-3 text-left w-full transition-colors rounded-xl ${
                  i === activeDoc ? "text-[#232323] bg-[#f4f4f4]" : "text-[#505050] hover:text-[#232323] hover:bg-[#fafafa]"
                }`}
              >
                <div
                  className="w-6 h-6 rounded-[4px] shrink-0 transition-colors"
                  style={{ backgroundColor: i === activeDoc ? category.color : "#d9d9d9" }}
                />
                <span className="text-[13px] sm:text-[14px]">{d.title}</span>
              </button>
            ))}
          </aside>

          <div className="hidden lg:block w-px bg-[#ebebeb] self-stretch mx-10" />

          {/* Document detail */}
          <div className="flex-1 min-w-0">

            {/* Mobile document list — ABOVE content */}
            <div className="lg:hidden mb-6">
              <p className="text-[#9b9b9b] uppercase tracking-widest text-[10px] mb-2 px-1">All documents in this checklist</p>
              <div className="flex flex-col gap-1">
                {documents.map((d, i) => (
                  <button
                    key={d.title}
                    onClick={() => setActiveDoc(i)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-colors ${
                      i === activeDoc ? "bg-[#f4f4f4] text-[#232323]" : "text-[#505050] hover:bg-[#fafafa]"
                    }`}
                  >
                    <div className="w-4 h-4 rounded-[3px] shrink-0" style={{ backgroundColor: i === activeDoc ? category.color : "#d9d9d9" }} />
                    <span className="text-[13px]">{d.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <p className="text-[#505050] tracking-[-0.02em] mb-4 text-[11px] sm:text-[13px] hidden sm:block">
              <Link href="/browse" className="hover:underline">Browse</Link>
              {" → "}
              <Link href={`/browse#${category.id}`} className="hover:underline">{category.label}</Link>
              {" → "}{title}
            </p>
            <h2 className="font-display text-[#292929] leading-none tracking-[-0.04em] mb-5 sm:mb-8 md:mb-10 text-[1.25rem] sm:text-[1.75rem] md:text-[2.5rem]">
              {doc.title}
            </h2>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
              <InfoCard label="Where" value={doc.where} />
              <InfoCard label="Cost" value={doc.cost} />
              <InfoCard label="Time" value={doc.time} />
              <InfoCard label="You'll need first" value={doc.prereq} />
            </div>

            <p className="text-[#505050] leading-[1.6] tracking-[-0.02em] mb-6 sm:mb-8 text-[13px] sm:text-[14px] md:text-[15px]">
              {doc.description}
            </p>

            <div className="bg-[#f4f4f4] rounded-2xl w-full" style={{ height: "clamp(140px, 20vw, 312px)" }} />
          </div>
        </div>
      </div>

      {/* ── Flag an issue ─────────────────────────────────── */}
      <div className="px-4 sm:px-8 lg:px-20 pb-12 md:pb-24 max-w-[1920px] mx-auto">
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-[16px] sm:rounded-[20px] px-5 sm:px-10 md:px-16 py-6 sm:py-10 md:py-14 gap-4 sm:gap-6"
          style={{ backgroundColor: category.color }}
        >
          <p className="font-display text-[#292929] leading-tight tracking-[-0.02em] max-w-[600px] text-[1rem] sm:text-[1.2rem] md:text-[1.4rem]">
            Address changed? Cost different? Office moved? Help the next person.
          </p>
          <Link href="/contact" className="bg-white text-[#232323] font-medium px-5 py-3 sm:px-6 sm:py-4 rounded-3xl whitespace-nowrap hover:bg-[#f4f4f4] active:scale-95 transition-all shrink-0 tracking-[-0.05em] text-[13px] sm:text-[14px]">
            Flag an issue
          </Link>
        </div>
      </div>

      {/* ── People also checked ───────────────────────────── */}
      {relatedChecklists?.length > 0 && (
        <div className="px-4 sm:px-8 lg:px-20 pb-12 md:pb-24 max-w-[1920px] mx-auto">
          <h2 className="font-medium text-[#232323] tracking-[-0.04em] mb-4 sm:mb-6 text-[1.1rem] sm:text-[1.4rem] md:text-[1.75rem]">
            People also checked
          </h2>
          <div className="flex flex-wrap gap-2">
            {relatedChecklists.map((tag) => (
              <Link
                key={tag.slug}
                href={`/checklist/${tag.slug}`}
                className="border border-[#e0e0e0] font-medium text-[#232323] tracking-[-0.02em] px-4 py-2.5 sm:px-6 sm:py-4 rounded-full hover:border-[#ccbaf8] hover:bg-[#f9f5ff] transition-all whitespace-nowrap text-[12px] sm:text-[13px]"
              >
                {tag.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
