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

/*
 * The "how it works" cards lean on the brand palette and sit slightly
 * tilted — they straighten up on hover, like documents being tidied.
 */
const howItWorks = [
  {
    num: "01",
    title: "You spill the gist",
    desc: "The documents, the steps, the fees, the office that actually answers — everything you wish someone had told you.",
    bg: "#efd536",
    text: "#232323",
    tilt: "-2deg",
  },
  {
    num: "02",
    title: "We fact-check it",
    desc: "Our team verifies every requirement before it goes anywhere near the site. No rumours, no expired info.",
    bg: "#8bcef7",
    text: "#232323",
    tilt: "1.5deg",
  },
  {
    num: "03",
    title: "You take the glory",
    desc: "Your checklist goes live with your name on it. Thousands of people skip the wahala because of you.",
    bg: "#ccbaf8",
    text: "#351459",
    tilt: "-1deg",
  },
];

const inputClass =
  "bg-[#f4f4f4] rounded-2xl px-5 py-4 font-medium text-[#232323] placeholder:text-[#9b9b9b] tracking-[-0.02em] outline-none focus:ring-2 focus:ring-[#ccbaf8] transition-all w-full";
const labelClass = "font-medium text-[#232323] tracking-[-0.02em]";

/* Numbered section header inside the form */
function SectionTag({ n, color, title, hint }: { n: string; color: string; title: string; hint?: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="w-8 h-8 rounded-full flex items-center justify-center font-display text-[13px] shrink-0"
        style={{ backgroundColor: color, color: color === "#351459" ? "#fff" : "#232323" }}
      >
        {n}
      </span>
      <p className="font-display text-[#232323] tracking-[-0.03em]" style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.35rem)" }}>
        {title}
        {hint && <span className="text-[#9b9b9b] font-sans font-normal text-[13px] ml-2">{hint}</span>}
      </p>
    </div>
  );
}

export default function Contribute() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [documents, setDocuments] = useState("");
  const [process, setProcess] = useState("");
  const [notes, setNotes] = useState("");
  const [story, setStory] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — hidden from real users
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const creditName = name.trim() || "you";

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
          story,
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
    setStory("");
  }

  return (
    <main className="bg-white overflow-x-hidden pt-[70px]">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative pt-16 md:pt-24 pb-14 md:pb-20 px-5 text-center">

        {/* Background colour blobs — same treatment as the homepage */}
        <div className="blob-hero-1 absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full bg-[#ccbaf8] opacity-50 blur-[130px] pointer-events-none" />
        <div className="blob-hero-2 absolute -top-24 -right-32 w-[480px] h-[480px] rounded-full bg-[#efd536] opacity-[0.22] blur-[110px] pointer-events-none" />
        <div className="blob-hero-3 absolute bottom-[-120px] left-[38%] -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-[#8bcef7] opacity-[0.22] blur-[100px] pointer-events-none" />

        {/* Floating chips — the community version of the homepage documents */}
        <div
          className="chip-1 hidden xl:flex absolute top-[20%] left-[2%] items-center gap-2.5 bg-white/85 backdrop-blur-md border border-white/60 shadow-lg px-4 py-3 rounded-full pointer-events-none select-none"
          style={{ "--chip-rotate": "-10deg" } as React.CSSProperties}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#efd536] shrink-0" />
          <span className="text-[13px] font-medium text-[#444]">&ldquo;Come back tomorrow&rdquo; 🙄</span>
        </div>

        <div
          className="chip-3 hidden xl:flex absolute top-[52%] left-[4%] items-center gap-2.5 bg-white/85 backdrop-blur-md border border-white/60 shadow-lg px-4 py-2.5 rounded-full pointer-events-none select-none"
          style={{ "--chip-rotate": "8deg" } as React.CSSProperties}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#8bcef7] shrink-0" />
          <span className="text-[13px] font-medium text-[#444]">Photocopy in triplicate 📄</span>
        </div>

        <div
          className="chip-5 hidden xl:flex absolute top-[76%] left-[3%] items-center gap-2.5 bg-white/85 backdrop-blur-md border border-white/60 shadow-lg px-4 py-2.5 rounded-full pointer-events-none select-none"
          style={{ "--chip-rotate": "-14deg" } as React.CSSProperties}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#be3738] shrink-0" />
          <span className="text-[13px] font-medium text-[#444]">The queue at 6am 😩</span>
        </div>

        <div
          className="chip-2 hidden xl:flex absolute top-[18%] right-[2%] items-center gap-2.5 bg-white/85 backdrop-blur-md border border-white/60 shadow-lg px-4 py-3 rounded-full pointer-events-none select-none"
          style={{ "--chip-rotate": "12deg" } as React.CSSProperties}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#6f00ed] shrink-0" />
          <span className="text-[13px] font-medium text-[#444]">Contributed by you ⭐</span>
        </div>

        <div
          className="chip-4 hidden xl:flex absolute top-[50%] right-[4%] items-center gap-2.5 bg-white/85 backdrop-blur-md border border-white/60 shadow-lg px-4 py-2.5 rounded-full pointer-events-none select-none"
          style={{ "--chip-rotate": "-8deg" } as React.CSSProperties}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#efd536] shrink-0" />
          <span className="text-[13px] font-medium text-[#444]">Verified ✓</span>
        </div>

        <div
          className="chip-6 hidden xl:flex absolute top-[74%] right-[3%] items-center gap-2.5 bg-white/85 backdrop-blur-md border border-white/60 shadow-lg px-4 py-2.5 rounded-full pointer-events-none select-none"
          style={{ "--chip-rotate": "16deg" } as React.CSSProperties}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#8bcef7] shrink-0" />
          <span className="text-[13px] font-medium text-[#444]">Someone&apos;s shortcut 💜</span>
        </div>

        {/* Hero copy */}
        <div className="relative z-10 max-w-[834px] mx-auto flex flex-col gap-6 md:gap-8 items-center">
          <p
            className="font-medium text-[#351459] uppercase tracking-[0.12em] bg-[#ccbaf8]/40 px-4 py-2 rounded-full"
            style={{ fontSize: "clamp(10px, 0.85vw, 13px)" }}
          >
            ✦ Built by people who&apos;ve been through it
          </p>
          <h1
            className="font-display leading-[1.08] text-[#232323] tracking-[-0.04em]"
            style={{ fontSize: "clamp(1.85rem, 4.6vw, 4.25rem)" }}
          >
            <span className="block whitespace-nowrap">You know the wahala.</span>
            <span className="block whitespace-nowrap text-[#351459]">Share the shortcut.</span>
          </h1>
          <p
            className="font-medium leading-[1.5] text-[#505050] tracking-[-0.02em] max-w-[560px]"
            style={{ fontSize: "clamp(0.875rem, 1.1vw, 1.05rem)" }}
          >
            You&apos;ve queued. You&apos;ve photocopied. You&apos;ve been told &ldquo;come back
            tomorrow.&rdquo; Turn all that stress into someone else&apos;s easy day — write
            the checklist you wish you&apos;d had, and we&apos;ll put your name on it.
          </p>
          <a
            href="#form"
            className="bg-[#351459] hover:bg-[#4a1d7d] text-white font-medium tracking-[-0.03em] px-8 py-4 rounded-full transition-all active:scale-95"
            style={{ fontSize: "clamp(14px, 1vw, 16px)" }}
          >
            Start writing ↓
          </a>
        </div>
      </section>

      {/* ── How it works — tilted colour cards ─────────────── */}
      <section className="px-5 sm:px-10 lg:px-20 pb-16 md:pb-24 max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {howItWorks.map((step) => (
            <div
              key={step.num}
              className="rounded-[24px] p-8 flex flex-col gap-4 transition-transform duration-300 hover:rotate-0 hover:-translate-y-1 hover:shadow-lg"
              style={{ backgroundColor: step.bg, transform: `rotate(${step.tilt})` }}
            >
              <span
                className="font-display leading-none tracking-[-0.04em] opacity-40"
                style={{ color: step.text, fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}
              >
                {step.num}
              </span>
              <h3
                className="font-display leading-tight tracking-[-0.03em]"
                style={{ color: step.text, fontSize: "clamp(1.25rem, 1.8vw, 1.6rem)" }}
              >
                {step.title}
              </h3>
              <p
                className="leading-[1.55] tracking-[-0.02em]"
                style={{ color: step.text, opacity: 0.75, fontSize: "clamp(13px, 0.95vw, 15px)" }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Form ──────────────────────────────────────────── */}
      <section id="form" className="px-5 sm:px-10 lg:px-20 pb-16 md:pb-24 max-w-[1920px] mx-auto scroll-mt-[90px]">
        <div className="max-w-[760px] mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {/* 01 — The gist */}
            <div className="bg-white border border-[#e9e9e9] rounded-[24px] p-7 sm:p-9 flex flex-col gap-5 shadow-sm">
              <SectionTag n="01" color="#efd536" title="What's the checklist?" />
              <div className="flex flex-col gap-2">
                <label className={labelClass} style={{ fontSize: "clamp(12px, 0.9vw, 14px)" }}>
                  The milestone or process
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
            </div>

            {/* 02 — The receipts */}
            <div className="bg-white border border-[#e9e9e9] rounded-[24px] p-7 sm:p-9 flex flex-col gap-5 shadow-sm">
              <SectionTag n="02" color="#8bcef7" title="The documents" hint="the receipts, please" />
              <div className="flex flex-col gap-2">
                <label className={labelClass} style={{ fontSize: "clamp(12px, 0.9vw, 14px)" }}>
                  Every document they&apos;ll ask for — one per line
                </label>
                <textarea
                  required
                  maxLength={5000}
                  value={documents}
                  onChange={(e) => setDocuments(e.target.value)}
                  rows={6}
                  placeholder={"e.g.\nValid means of ID (NIN slip or passport)\nTwo passport photographs\nProof of address"}
                  className={`${inputClass} resize-none`}
                  style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}
                />
              </div>
            </div>

            {/* 03 — The journey */}
            <div className="bg-white border border-[#e9e9e9] rounded-[24px] p-7 sm:p-9 flex flex-col gap-5 shadow-sm">
              <SectionTag n="03" color="#ccbaf8" title="The journey" hint="optional, but gold" />
              <div className="flex flex-col gap-2">
                <label className={labelClass} style={{ fontSize: "clamp(12px, 0.9vw, 14px)" }}>
                  Step by step — where do you go first, what happens next, how long, how much?
                </label>
                <textarea
                  maxLength={5000}
                  value={process}
                  onChange={(e) => setProcess(e.target.value)}
                  rows={5}
                  placeholder="Step 1: Go to the registry at… Step 2: Pay the fee of…"
                  className={`${inputClass} resize-none`}
                  style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClass} style={{ fontSize: "clamp(12px, 0.9vw, 14px)" }}>
                  Insider gist <span className="text-[#9b9b9b] font-normal">(optional — tips, traps, which office is fastest)</span>
                </label>
                <textarea
                  maxLength={2000}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Go early on Tuesdays. Don't pay anyone outside the gate…"
                  className={`${inputClass} resize-none`}
                  style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}
                />
              </div>
            </div>

            {/* 04 — Your story */}
            <div className="bg-white border border-[#e9e9e9] rounded-[24px] p-7 sm:p-9 flex flex-col gap-5 shadow-sm">
              <SectionTag n="04" color="#be3738" title="Gist us your story" hint="optional — how did it really go?" />
              <div className="flex flex-col gap-2">
                <label className={labelClass} style={{ fontSize: "clamp(12px, 0.9vw, 14px)" }}>
                  Your experience, in your own words. The drama, the wins, the plot twists — with
                  your permission we might share it on our socials (credited to you, of course).
                </label>
                <textarea
                  maxLength={3000}
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  rows={5}
                  placeholder={"e.g. I got to the office at 7am thinking I was early. The queue had queues…"}
                  className={`${inputClass} resize-none`}
                  style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}
                />
              </div>
            </div>

            {/* 05 — Take your credit */}
            <div className="bg-[#351459] rounded-[24px] p-7 sm:p-9 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#efd536] flex items-center justify-center font-display text-[13px] text-[#232323] shrink-0">
                  05
                </span>
                <p className="font-display text-white tracking-[-0.03em]" style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.35rem)" }}>
                  Take your credit
                </p>
              </div>

              {/* Live credit-badge preview — updates as they type */}
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="inline-flex items-center gap-2 bg-[#efd536] text-[#232323] font-medium tracking-[-0.02em] px-4 py-2 rounded-full"
                  style={{ fontSize: "clamp(12px, 0.9vw, 14px)" }}
                >
                  ⭐ Contributed by {creditName}
                </span>
                <span className="text-[#ccbaf8] tracking-[-0.02em]" style={{ fontSize: "clamp(11px, 0.85vw, 13px)" }}>
                  ← this goes on the checklist
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-[#ccbaf8] tracking-[-0.02em]" style={{ fontSize: "clamp(12px, 0.9vw, 14px)" }}>
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="bg-white/10 border border-white/20 rounded-2xl px-5 py-4 font-medium text-white placeholder:text-white/40 tracking-[-0.02em] outline-none focus:ring-2 focus:ring-[#ccbaf8] transition-all w-full"
                    style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-[#ccbaf8] tracking-[-0.02em]" style={{ fontSize: "clamp(12px, 0.9vw, 14px)" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    maxLength={200}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="bg-white/10 border border-white/20 rounded-2xl px-5 py-4 font-medium text-white placeholder:text-white/40 tracking-[-0.02em] outline-none focus:ring-2 focus:ring-[#ccbaf8] transition-all w-full"
                    style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-[#ccbaf8] tracking-[-0.02em]" style={{ fontSize: "clamp(12px, 0.9vw, 14px)" }}>
                  Phone <span className="text-white/40 font-normal">(optional)</span>
                </label>
                <input
                  type="tel"
                  maxLength={30}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+234 800 000 0000"
                  className="bg-white/10 border border-white/20 rounded-2xl px-5 py-4 font-medium text-white placeholder:text-white/40 tracking-[-0.02em] outline-none focus:ring-2 focus:ring-[#ccbaf8] transition-all w-full"
                  style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}
                />
              </div>
              <p className="text-white/50 tracking-[-0.02em] leading-[1.5]" style={{ fontSize: "clamp(11px, 0.85vw, 13px)" }}>
                We only use these to credit you and to reach you if we need to clarify something. Never shared, never spammed.
              </p>
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

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className={`bg-[#351459] hover:bg-[#4a1d7d] text-white font-medium tracking-[-0.03em] px-10 py-5 rounded-full transition-all active:scale-95 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                style={{ fontSize: "clamp(15px, 1.1vw, 17px)" }}
              >
                {loading ? "Sending…" : "Send it in 🚀"}
              </button>
            </div>
            <p className="text-center text-[#9b9b9b] tracking-[-0.02em] -mt-2" style={{ fontSize: "clamp(11px, 0.85vw, 13px)" }}>
              Spotted an error in an existing checklist instead?{" "}
              <Link href="/contact" className="text-[#351459] underline underline-offset-2 hover:no-underline">
                Flag it here
              </Link>
            </p>
          </form>
        </div>
      </section>

      {/* ── Success pop-up ────────────────────────────────── */}
      {sent && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-5">
          <div
            className="absolute inset-0 bg-[#351459]/40 backdrop-blur-sm"
            onClick={resetForm}
          />
          <div className="relative bg-white rounded-[28px] px-8 sm:px-12 py-12 flex flex-col items-center gap-5 text-center max-w-[460px] w-full shadow-2xl overflow-hidden">
            {/* Confetti dots */}
            <span className="absolute top-6 left-8 w-3 h-3 rounded-full bg-[#efd536]" />
            <span className="absolute top-12 right-10 w-2 h-2 rounded-full bg-[#8bcef7]" />
            <span className="absolute top-20 left-16 w-2 h-2 rounded-full bg-[#be3738]" />
            <span className="absolute top-8 right-24 w-2.5 h-2.5 rounded-full bg-[#ccbaf8]" />

            <div className="w-20 h-20 rounded-full bg-[#efd536] flex items-center justify-center text-3xl">
              🎉
            </div>
            <h2
              className="font-display text-[#232323] tracking-[-0.04em] leading-tight"
              style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.4rem)" }}
            >
              Oya! You&apos;re in.
            </h2>
            <span
              className="inline-flex items-center gap-2 bg-[#351459] text-white font-medium tracking-[-0.02em] px-4 py-2 rounded-full"
              style={{ fontSize: "clamp(12px, 0.9vw, 14px)" }}
            >
              ⭐ Contributed by {creditName}
            </span>
            <p className="text-[#505050] leading-[1.6] tracking-[-0.02em]" style={{ fontSize: "clamp(14px, 1vw, 16px)" }}>
              We&apos;ll verify every detail, and once your checklist is live, that badge
              goes on it. We may email you if anything needs clarifying.
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
