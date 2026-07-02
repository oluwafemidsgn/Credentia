"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const categories = [
  "Civil Identity",
  "Travel & Immigration",
  "Education",
  "Marriage & Family",
  "Employment",
  "Other",
];

const steps = [
  { label: "You write it", desc: "Tell us the milestone, the documents, and the process as you know it" },
  { label: "We verify it", desc: "We cross-check every requirement before anything goes live" },
  { label: "It goes live", desc: "Published on Credentia — with your name in the credits" },
];

const inputClass =
  "bg-[#f4f4f4] rounded-2xl px-5 py-4 font-medium text-[#232323] placeholder:text-[#9b9b9b] tracking-[-0.02em] outline-none focus:ring-2 focus:ring-[#ccbaf8] transition-all";
const labelClass = "font-medium text-[#232323] tracking-[-0.02em]";

export default function Contribute() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [documents, setDocuments] = useState("");
  const [process, setProcess] = useState("");
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — hidden from real users
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/contribute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          documents,
          steps: process,
          notes,
          name,
          email,
          phone,
          website,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send your contribution");
      }

      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setSent(false);
    setTitle("");
    setCategory("");
    setDocuments("");
    setProcess("");
    setNotes("");
  }

  return (
    <main className="bg-white overflow-x-hidden pt-[70px]">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="pt-16 md:pt-24 pb-12 md:pb-16 px-5 max-w-[760px] mx-auto">
        <p
          className="font-medium text-[#9b9b9b] uppercase tracking-[0.1em] mb-5"
          style={{ fontSize: "clamp(10px, 0.85vw, 13px)" }}
        >
          Community
        </p>
        <h1
          className="font-display leading-none text-[#232323] tracking-[-0.04em] mb-6"
          style={{ fontSize: "clamp(2.5rem, 6.5vw, 6rem)" }}
        >
          Add a checklist
        </h1>
        <p
          className="font-medium leading-[1.6] text-[#505050] tracking-[-0.02em]"
          style={{ fontSize: "clamp(0.875rem, 1.1vw, 1.05rem)" }}
        >
          Know a document process we haven&apos;t covered? Been through it yourself?
          Write it down here — we&apos;ll verify every detail, publish it, and credit
          you by name.
        </p>
      </section>

      {/* ── Body ──────────────────────────────────────────── */}
      <section className="px-5 sm:px-10 lg:px-20 pb-16 md:pb-24 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 max-w-[1000px] mx-auto items-start">

          {/* ── Form ────────────────────────────────── */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Checklist title */}
            <div className="flex flex-col gap-2">
              <label className={labelClass} style={{ fontSize: "clamp(12px, 0.9vw, 14px)" }}>
                What is the checklist for?
              </label>
              <input
                type="text"
                required
                maxLength={150}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Registering a small business in Lagos"
                className={inputClass}
                style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}
              />
            </div>

            {/* Category pills */}
            <div className="flex flex-col gap-2">
              <label className={labelClass} style={{ fontSize: "clamp(12px, 0.9vw, 14px)" }}>
                Category <span className="text-[#9b9b9b] font-normal">(optional)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(category === c ? "" : c)}
                    className={`font-medium tracking-[-0.02em] px-4 py-2.5 rounded-full border transition-all whitespace-nowrap ${
                      category === c
                        ? "bg-[#351459] text-white border-[#351459]"
                        : "border-[#e0e0e0] text-[#232323] hover:border-[#ccbaf8] hover:bg-[#f9f5ff]"
                    }`}
                    style={{ fontSize: "clamp(12px, 0.85vw, 14px)" }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="flex flex-col gap-2">
              <label className={labelClass} style={{ fontSize: "clamp(12px, 0.9vw, 14px)" }}>
                Documents needed
              </label>
              <textarea
                required
                maxLength={5000}
                value={documents}
                onChange={(e) => setDocuments(e.target.value)}
                rows={6}
                placeholder={"List every document, one per line…\ne.g.\nValid means of ID (NIN slip or passport)\nTwo passport photographs\nProof of address"}
                className={`${inputClass} resize-none`}
                style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}
              />
            </div>

            {/* Process / steps */}
            <div className="flex flex-col gap-2">
              <label className={labelClass} style={{ fontSize: "clamp(12px, 0.9vw, 14px)" }}>
                The process, step by step <span className="text-[#9b9b9b] font-normal">(optional)</span>
              </label>
              <textarea
                maxLength={5000}
                value={process}
                onChange={(e) => setProcess(e.target.value)}
                rows={5}
                placeholder={"Where do you go first? What happens next? How long does it take? What does it cost?"}
                className={`${inputClass} resize-none`}
                style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}
              />
            </div>

            {/* Notes */}
            <div className="flex flex-col gap-2">
              <label className={labelClass} style={{ fontSize: "clamp(12px, 0.9vw, 14px)" }}>
                Anything else? <span className="text-[#9b9b9b] font-normal">(optional)</span>
              </label>
              <textarea
                maxLength={2000}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Insider tips, things to avoid, which office is fastest…"
                className={`${inputClass} resize-none`}
                style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}
              />
            </div>

            {/* Contributor details */}
            <div className="border-t border-[#e0e0e0] pt-5 mt-2 flex flex-col gap-5">
              <p className={labelClass} style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}>
                About you <span className="text-[#9b9b9b] font-normal">— so we can credit you</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className={labelClass} style={{ fontSize: "clamp(12px, 0.9vw, 14px)" }}>
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className={inputClass}
                    style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelClass} style={{ fontSize: "clamp(12px, 0.9vw, 14px)" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    maxLength={200}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className={inputClass}
                    style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClass} style={{ fontSize: "clamp(12px, 0.9vw, 14px)" }}>
                  Phone <span className="text-[#9b9b9b] font-normal">(optional)</span>
                </label>
                <input
                  type="tel"
                  maxLength={30}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+234 800 000 0000"
                  className={inputClass}
                  style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}
                />
              </div>
            </div>

            {/* Honeypot — invisible to people, tempting to bots */}
            <div className="absolute -left-[9999px] top-auto" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-[#be3738] text-sm" role="alert">
                {error}
              </p>
            )}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`bg-[#ccbaf8] hover:bg-[#b8a0f5] text-[#232323] font-medium tracking-[-0.03em] px-8 py-4 rounded-full transition-all active:scale-95 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                style={{ fontSize: "clamp(14px, 1vw, 16px)" }}
              >
                {loading ? "Sending…" : "Submit checklist →"}
              </button>
            </div>
          </form>

          {/* ── Sidebar ──────────────────────────────── */}
          <div className="flex flex-col gap-6">
            {/* How it works */}
            <div className="bg-[#f4f4f4] rounded-[20px] p-8 flex flex-col gap-5">
              <p className="font-medium text-[#9b9b9b] uppercase tracking-[0.08em]" style={{ fontSize: "clamp(10px, 0.8vw, 12px)" }}>
                How it works
              </p>
              {steps.map((s, i) => (
                <div key={s.label} className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#ccbaf8] text-[#351459] flex items-center justify-center font-medium shrink-0 text-[12px]">
                    {i + 1}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <p className="font-medium text-[#232323] tracking-[-0.02em]" style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}>
                      {s.label}
                    </p>
                    <p className="text-[#9b9b9b] tracking-[-0.02em]" style={{ fontSize: "clamp(12px, 0.85vw, 13px)" }}>
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Why contribute */}
            <div className="bg-[#351459] rounded-[20px] p-8 flex flex-col gap-3">
              <p className="font-medium text-[#ccbaf8] uppercase tracking-[0.08em]" style={{ fontSize: "clamp(10px, 0.8vw, 12px)" }}>
                Why it matters
              </p>
              <p
                className="font-display text-white leading-tight tracking-[-0.04em]"
                style={{ fontSize: "clamp(1rem, 1.6vw, 1.4rem)" }}
              >
                One checklist can save thousands of people a wasted trip.
              </p>
              <p className="text-[#ccbaf8] tracking-[-0.02em] leading-[1.6]" style={{ fontSize: "clamp(12px, 0.85vw, 13px)" }}>
                Credentia is built by people who&apos;ve been through the queue.
                Your experience is the product.
              </p>
            </div>

            {/* Contact fallback */}
            <Link
              href="/contact"
              className="border border-[#e0e0e0] rounded-[20px] p-8 flex flex-col gap-2 hover:border-[#ccbaf8] hover:bg-[#f9f5ff] transition-all group"
            >
              <p className="font-medium text-[#232323] tracking-[-0.02em]" style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}>
                Spotted an error instead?
              </p>
              <p className="text-[#9b9b9b] tracking-[-0.02em]" style={{ fontSize: "clamp(12px, 0.85vw, 13px)" }}>
                If an existing checklist is outdated or wrong, flag it through the contact form.
              </p>
              <p className="text-[#351459] font-medium tracking-[-0.02em] opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontSize: "clamp(12px, 0.85vw, 13px)" }}>
                Go to contact →
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Success pop-up ────────────────────────────────── */}
      {sent && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-5">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={resetForm}
          />
          <div className="relative bg-white rounded-[24px] px-8 sm:px-12 py-12 flex flex-col items-center gap-5 text-center max-w-[440px] w-full shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#ccbaf8] flex items-center justify-center text-2xl">✓</div>
            <h2
              className="font-display text-[#232323] tracking-[-0.04em] leading-tight"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
            >
              Checklist received
            </h2>
            <p className="text-[#505050] leading-[1.6] tracking-[-0.02em]" style={{ fontSize: "clamp(14px, 1vw, 16px)" }}>
              Thank you! We&apos;ll verify every detail, and once it&apos;s live
              you&apos;ll get the credit you deserve. We may email you if we need
              to clarify anything.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <button
                onClick={resetForm}
                className="border border-[#e0e0e0] font-medium text-[#232323] tracking-[-0.02em] px-6 py-3 rounded-full hover:border-[#ccbaf8] hover:bg-[#f9f5ff] transition-all"
                style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}
              >
                Add another
              </button>
              <Link
                href="/browse"
                className="bg-[#ccbaf8] hover:bg-[#b8a0f5] font-medium text-[#232323] tracking-[-0.02em] px-6 py-3 rounded-full transition-all"
                style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}
              >
                Browse checklists
              </Link>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
