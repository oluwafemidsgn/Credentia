"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/*
 * "What's new" tour. Home page only — checklist pages stay free of pop-ups,
 * which is part of the promise.
 *
 * Shown once per visitor. Bump TOUR_VERSION when a major feature ships and
 * everyone sees it once more; leave it alone for small changes.
 */
const TOUR_VERSION = "2026-11-relevance-filters-maps";
const STORAGE_KEY = "credentia:whats-new";

type Step = { tag: string; title: string; body: string; bg: string };

const STEPS: Step[] = [
  {
    tag: "Search",
    title: "Search that reads your mind",
    body: "Results are ranked by how well they match, not alphabetically. Type “passport” and passport checklists come first — and we now show you which document inside a checklist matched.",
    bg: "#ccbaf8",
  },
  {
    tag: "Browse",
    title: "Narrow it down fast",
    body: "Filter any list by category, number of documents, or how recently it was updated — then sort by newest, A to Z, or size. Works on your phone too.",
    bg: "#8bcef7",
  },
  {
    tag: "Checklists",
    title: "Tap the office, not the address",
    body: "Every web address in a checklist is now a real link, and anywhere with a physical office has an “Open in Google Maps” button that takes you straight there.",
    bg: "#f9e07f",
  },
  {
    tag: "Reading",
    title: "The guide that goes with it",
    body: "Each checklist now points to the articles written about it, and every article links back to the checklist you need. Free, always — no account, no paywall.",
    bg: "#f3b7d8",
  },
];

export default function WhatsNewTour() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  // Decide on the client only, so the server render never differs.
  useEffect(() => {
    let seen: string | null = null;
    try {
      seen = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // Private mode / blocked storage: skip the tour rather than nag.
      return;
    }
    if (seen === TOUR_VERSION) return;
    const t = setTimeout(() => setOpen(true), 900);
    return () => clearTimeout(t);
  }, []);

  const dismiss = useCallback(() => {
    setOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, TOUR_VERSION);
    } catch {
      /* nothing to do — the tour just shows again next visit */
    }
  }, []);

  // Escape closes; the page behind stays put while it's open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, dismiss]);

  if (!open) return null;

  const s = STEPS[step];
  const last = step === STEPS.length - 1;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-3 sm:p-5"
      role="presentation"
      onClick={dismiss}
    >
      <div className="absolute inset-0 bg-[#232323]/50 backdrop-blur-[2px]" aria-hidden="true" />

      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="whats-new-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[460px] overflow-hidden rounded-[22px] bg-white shadow-2xl outline-none"
      >
        {/* Coloured header, one colour per step */}
        <div className="px-6 pt-6 pb-5 sm:px-8 sm:pt-8" style={{ backgroundColor: s.bg }}>
          <div className="flex items-center justify-between gap-4">
            <span className="rounded-full bg-white/80 px-3 py-1.5 font-medium uppercase tracking-[0.06em] text-[#292929] text-[10px]">
              {s.tag}
            </span>
            <button
              onClick={dismiss}
              aria-label="Close what's new"
              className="rounded-full bg-white/70 px-3 py-1.5 font-medium text-[#292929] tracking-[-0.02em] transition-all hover:bg-white active:scale-95 text-[12px]"
            >
              Skip
            </button>
          </div>
          <h2
            id="whats-new-title"
            className="font-display mt-4 leading-tight tracking-[-0.04em] text-[#292929] text-[1.35rem] sm:text-[1.6rem]"
          >
            {s.title}
          </h2>
        </div>

        <div className="px-6 py-6 sm:px-8">
          <p className="text-[#505050] leading-[1.6] tracking-[-0.02em] text-[13px] sm:text-[15px]">{s.body}</p>

          <div className="mt-7 flex items-center justify-between gap-4">
            {/* Step dots */}
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {STEPS.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === step ? "w-5 bg-[#232323]" : "w-1.5 bg-[#e0e0e0]"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              {step > 0 && (
                <button
                  onClick={() => setStep((n) => n - 1)}
                  className="rounded-full border border-[#e0e0e0] px-4 py-2.5 font-medium text-[#232323] tracking-[-0.02em] transition-all hover:border-[#ccbaf8] hover:bg-[#f9f5ff] active:scale-95 text-[13px]"
                >
                  Back
                </button>
              )}
              <button
                onClick={() => (last ? dismiss() : setStep((n) => n + 1))}
                className="rounded-full bg-[#232323] px-5 py-2.5 font-medium text-white tracking-[-0.02em] transition-all hover:bg-[#111] active:scale-95 text-[13px]"
              >
                {last ? "Got it" : "Next"}
              </button>
            </div>
          </div>

          <p className="mt-4 text-center text-[#9b9b9b] tracking-[-0.02em] text-[11px]">
            Step {step + 1} of {STEPS.length} · we only show this once
          </p>
        </div>
      </div>
    </div>
  );
}
