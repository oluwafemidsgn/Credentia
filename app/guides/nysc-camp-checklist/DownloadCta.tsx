"use client";

import { useState } from "react";
import { PDF_RESOURCE_SLUG } from "./content";

/*
 * The email capture for the printable PDF. Three placements, one message:
 *
 *   "banner"  — small, dismissible, above the contents
 *   "inline"  — mid-page, after the costs section
 *   "primary" — full-width footer CTA, the one that converts
 *
 * The page itself is never gated. Only the artefact is: the PDF fits in a
 * bag, has tick boxes, and works with no data, which is a genuinely
 * different thing from the web page.
 *
 * Posts to /api/resource-lead, which stores the lead in Sanity and resolves
 * the real file URL server-side. Note that route hands the file straight
 * back rather than emailing it, so the copy here promises a download, not an
 * inbox.
 */

type Variant = "banner" | "inline" | "primary";
type Status = "idle" | "loading" | "success" | "error";

function DownloadIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export default function DownloadCta({ variant }: { variant: Variant }) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");
  const [dismissed, setDismissed] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/resource-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, slug: PDF_RESOURCE_SLUG, website }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setUrl(data.url);
      setStatus("success");
      window.open(data.url, "_blank", "noopener,noreferrer");
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  /* ── Top banner ───────────────────────────────────────── */
  if (variant === "banner") {
    if (dismissed) return null;
    return (
      <div className="relative flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 bg-[#f4f4f4] rounded-2xl pl-6 pr-12 sm:pr-14 py-4 sm:py-4">
        <p
          className="text-[#232323] leading-[1.5] tracking-[-0.02em] flex-1"
          style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}
        >
          <span aria-hidden="true">↓ </span>
          Reading this on your way to camp?{" "}
          <span className="text-[#505050]">
            The printable version has tick boxes and needs no data.
          </span>
        </p>
        <a
          href="#download"
          className="shrink-0 inline-flex items-center justify-center gap-2 bg-[#351459] hover:bg-[#4a1d7d] text-white font-medium tracking-[-0.02em] px-5 py-2.5 rounded-full transition-all active:scale-95 whitespace-nowrap"
          style={{ fontSize: "clamp(12px, 0.9vw, 14px)" }}
        >
          Get the PDF
        </a>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="absolute top-3 right-4 sm:top-1/2 sm:-translate-y-1/2 text-[#9b9b9b] hover:text-[#232323] text-[18px] leading-none transition-colors"
        >
          ✕
        </button>
      </div>
    );
  }

  /* ── Mid-page ─────────────────────────────────────────── */
  if (variant === "inline") {
    return (
      <div className="bg-[#efd536] rounded-[20px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 px-7 md:px-10 py-7 md:py-8">
        <div className="flex flex-col gap-1">
          <p
            className="font-display text-[#292929] leading-tight tracking-[-0.04em]"
            style={{ fontSize: "clamp(1.05rem, 1.5vw, 1.4rem)" }}
          >
            Prefer paper?
          </p>
          <p
            className="text-[#505050] tracking-[-0.02em] leading-[1.5]"
            style={{ fontSize: "clamp(12px, 0.9vw, 15px)" }}
          >
            Same checklist, laid out for A4 with tick boxes.
          </p>
        </div>
        <a
          href="#download"
          className="shrink-0 inline-flex items-center gap-2 bg-[#292929] hover:bg-[#111] text-white font-medium tracking-[-0.03em] px-6 py-3 rounded-full transition-all active:scale-95 whitespace-nowrap"
          style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}
        >
          <DownloadIcon />
          Get the printable version
        </a>
      </div>
    );
  }

  /* ── Footer CTA (primary, carries the form) ───────────── */
  return (
    <div className="bg-[#351459] rounded-[24px] px-7 sm:px-10 md:px-16 py-10 md:py-14">
      <div className="max-w-[560px]">
        {status === "success" ? (
          <div className="flex flex-col gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center text-white">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2
              className="font-display text-white leading-tight tracking-[-0.04em]"
              style={{ fontSize: "clamp(1.4rem, 2.4vw, 2.2rem)" }}
            >
              Your checklist is ready
            </h2>
            <p
              className="text-white/75 leading-[1.6] tracking-[-0.01em]"
              style={{ fontSize: "clamp(13px, 0.95vw, 16px)" }}
            >
              It should have opened in a new tab. If your browser blocked it, use the
              button below. Print it, put it in your folder, and stop scrolling.
            </p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-2 bg-white hover:bg-[#f4f4f4] text-[#351459] font-medium tracking-[-0.02em] px-6 py-3.5 rounded-full transition-all active:scale-95"
              style={{ fontSize: "clamp(14px, 1vw, 16px)" }}
            >
              <DownloadIcon />
              Download the PDF
            </a>
          </div>
        ) : (
          <>
            <h2
              className="font-display text-white leading-tight tracking-[-0.04em] mb-4"
              style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.4rem)" }}
            >
              Get the printable checklist
            </h2>
            <p
              className="text-white/75 leading-[1.65] tracking-[-0.01em] mb-7"
              style={{ fontSize: "clamp(13px, 1vw, 16px)" }}
            >
              Same content, laid out for A4 with tick boxes, so you can print it, put it
              in your folder, and stop scrolling on camp Wi-Fi that does not exist.
            </p>

            <form onSubmit={onSubmit} className="flex flex-col gap-3">
              {/* Honeypot, hidden from real users */}
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div className="flex flex-col sm:flex-row gap-3">
                <label htmlFor="nysc-pdf-email" className="sr-only">
                  Your email address
                </label>
                <input
                  id="nysc-pdf-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your email"
                  className="flex-1 w-full rounded-full bg-white border border-transparent focus:border-[#ccbaf8] focus:ring-2 focus:ring-[#ccbaf8]/50 outline-none px-5 py-3.5 text-[#232323] placeholder:text-[#9b9b9b] transition-all"
                  style={{ fontSize: "clamp(14px, 1vw, 16px)" }}
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="shrink-0 inline-flex items-center justify-center gap-2 bg-[#ccbaf8] hover:bg-white disabled:opacity-60 disabled:cursor-not-allowed text-[#351459] font-medium tracking-[-0.02em] px-6 py-3.5 rounded-full transition-all active:scale-95"
                  style={{ fontSize: "clamp(14px, 1vw, 16px)" }}
                >
                  {status === "loading" ? "Sending…" : "Send it to me"}
                </button>
              </div>

              {status === "error" && (
                <p
                  className="text-[#ffb4b4]"
                  style={{ fontSize: "clamp(12px, 0.85vw, 14px)" }}
                >
                  {error}
                </p>
              )}

              <p
                className="text-white/55 leading-[1.5]"
                style={{ fontSize: "clamp(11px, 0.78vw, 13px)" }}
              >
                One download, and we only write again when the checklist is updated for a
                new batch. Unsubscribe any time.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
