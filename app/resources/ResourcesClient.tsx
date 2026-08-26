"use client";

import { useState, useEffect, useCallback } from "react";
import type { SanityResourceCard } from "../../lib/sanity/queries";

type Status = "idle" | "loading" | "success" | "error";

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function ResourceCard({ resource, onDownload }: { resource: SanityResourceCard; onDownload: () => void }) {
  return (
    <div className="bg-[#f4f4f4] rounded-2xl flex flex-col overflow-hidden group">
      {/* Cover */}
      <div className="relative shrink-0 overflow-hidden" style={{ height: "clamp(150px, 18vw, 220px)" }}>
        {resource.coverImage ? (
          <img
            src={resource.coverImage}
            alt=""
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#ccbaf8] to-[#8bcef7]">
            <div className="text-[#351459]">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
          </div>
        )}
        {resource.category && (
          <span
            className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-[#444] uppercase font-medium px-3 py-1.5 rounded-full"
            style={{ fontSize: "clamp(10px, 0.8vw, 12px)", letterSpacing: "0.05em" }}
          >
            {resource.category}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 p-6 md:p-7 flex-1">
        <h3
          className="font-display text-[#292929] leading-tight tracking-[-0.04em]"
          style={{ fontSize: "clamp(17px, 1.8vw, 24px)" }}
        >
          {resource.title}
        </h3>
        {resource.description && (
          <p
            className="text-[#505050] leading-[1.5] tracking-[-0.02em] flex-1"
            style={{ fontSize: "clamp(13px, 0.9vw, 15px)" }}
          >
            {resource.description}
          </p>
        )}
        <button
          onClick={onDownload}
          className="mt-2 inline-flex items-center justify-center gap-2 bg-[#351459] hover:bg-[#4a1d7d] text-white font-medium tracking-[-0.02em] px-5 py-3 rounded-full transition-all active:scale-95"
          style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}
        >
          <DownloadIcon />
          {resource.kind === "file" ? "Download" : "Get it"}
        </button>
      </div>
    </div>
  );
}

export default function ResourcesClient({ resources }: { resources: SanityResourceCard[] }) {
  const [active, setActive] = useState<SanityResourceCard | null>(null);
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  const close = useCallback(() => {
    setActive(null);
    setEmail("");
    setWebsite("");
    setStatus("idle");
    setError("");
    setDownloadUrl("");
  }, []);

  // Close on Escape.
  useEffect(() => {
    if (!active) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, close]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!active || status === "loading") return;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/resource-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, slug: active.slug, title: active.title, website }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setDownloadUrl(data.url);
      setStatus("success");
      // Open the resource straight away (new tab so we don't lose the page).
      window.open(data.url, "_blank", "noopener,noreferrer");
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  return (
    <>
      <section className="px-5 sm:px-10 lg:px-20 pb-20 md:pb-28 max-w-[1920px] mx-auto">
        {resources.length === 0 ? (
          <div className="rounded-2xl bg-[#f4f4f4] px-8 py-16 text-center">
            <p className="font-display text-[#292929] tracking-[-0.03em] mb-2" style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)" }}>
              No resources yet
            </p>
            <p className="text-[#505050]" style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}>
              Check back soon — the first downloads are on the way.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {resources.map((r) => (
              <ResourceCard key={r.slug} resource={r} onDownload={() => setActive(r)} />
            ))}
          </div>
        )}
      </section>

      {/* ── Email-gate modal ───────────────────────────────── */}
      {active && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={close} />
          <div className="relative w-full max-w-[440px] bg-white rounded-[24px] p-7 md:p-9 shadow-2xl">
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-5 right-5 text-[#9b9b9b] hover:text-[#232323] text-[20px] leading-none"
            >
              ✕
            </button>

            {status === "success" ? (
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-[#e9f7ee] flex items-center justify-center text-[#1a8f4c]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-display text-[#232323] tracking-[-0.03em]" style={{ fontSize: "clamp(1.25rem, 2vw, 1.6rem)" }}>
                  Your download is ready
                </h3>
                <p className="text-[#505050] leading-[1.6]" style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}>
                  It should have opened in a new tab. If it didn&apos;t, use the button below.
                </p>
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#351459] hover:bg-[#4a1d7d] text-white font-medium tracking-[-0.02em] px-5 py-3.5 rounded-full transition-all active:scale-95"
                  style={{ fontSize: "clamp(14px, 1vw, 16px)" }}
                >
                  <DownloadIcon />
                  Download “{active.title}”
                </a>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-[#232323] tracking-[-0.03em]" style={{ fontSize: "clamp(1.25rem, 2vw, 1.6rem)" }}>
                    Get the resource
                  </h3>
                  <p className="text-[#505050] leading-[1.55]" style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}>
                    Enter your email and we&apos;ll unlock <span className="text-[#232323] font-medium">{active.title}</span>. One email, no spam — we only write again if it&apos;s updated.
                  </p>
                </div>

                {/* Honeypot — hidden from real users */}
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

                <input
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-full border border-[#e0e0e0] focus:border-[#ccbaf8] focus:ring-2 focus:ring-[#ccbaf8]/40 outline-none px-5 py-3.5 text-[#232323] placeholder:text-[#9b9b9b] transition-all"
                  style={{ fontSize: "clamp(14px, 1vw, 16px)" }}
                />

                {status === "error" && (
                  <p className="text-[#c0392b]" style={{ fontSize: "clamp(12px, 0.85vw, 14px)" }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center gap-2 bg-[#351459] hover:bg-[#4a1d7d] disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium tracking-[-0.02em] px-5 py-3.5 rounded-full transition-all active:scale-95"
                  style={{ fontSize: "clamp(14px, 1vw, 16px)" }}
                >
                  {status === "loading" ? "Unlocking…" : "Done — download it"}
                </button>

                <p className="text-[#9b9b9b] text-center" style={{ fontSize: "clamp(11px, 0.75vw, 12px)" }}>
                  We&apos;ll never share your email. Unsubscribe any time.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
