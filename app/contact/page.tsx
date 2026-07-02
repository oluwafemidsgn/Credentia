"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const reasons = [
  { label: "Flag an issue", desc: "Outdated info, wrong fee, office moved" },
  { label: "Suggest a checklist", desc: "A milestone we haven't covered yet" },
  { label: "Say hello", desc: "Just want to reach out" },
  { label: "Press / media", desc: "Writing about Credentia" },
];

export default function Contact() {
  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setSent(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
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
          Get in touch
        </p>
        <h1
          className="font-display leading-none text-[#232323] tracking-[-0.04em] mb-6"
          style={{ fontSize: "clamp(2.5rem, 6.5vw, 6rem)" }}
        >
          Say hello
        </h1>
        <p
          className="font-medium leading-[1.6] text-[#505050] tracking-[-0.02em]"
          style={{ fontSize: "clamp(0.875rem, 1.1vw, 1.05rem)" }}
        >
Found something wrong? Want a checklist we haven&apos;t built? Just want to talk?
            We read every message and reply within a day or two.
        </p>
      </section>

      {/* ── Body ──────────────────────────────────────────── */}
      <section className="px-5 sm:px-10 lg:px-20 pb-16 md:pb-24 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 max-w-[1000px] mx-auto items-start">

          {/* ── Form ────────────────────────────────── */}
          {sent ? (
            <div className="bg-[#f4f4f4] rounded-[24px] px-10 py-16 flex flex-col items-center gap-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#ccbaf8] flex items-center justify-center text-2xl">✓</div>
              <h2
                className="font-display text-[#232323] tracking-[-0.04em] leading-tight"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
              >
                Message sent
              </h2>
              <p className="text-[#505050] leading-[1.6] tracking-[-0.02em] max-w-[360px]" style={{ fontSize: "clamp(14px, 1vw, 16px)" }}>
                Thanks for reaching out. We will get back to you within 1–2 business days.
              </p>
              <button
                onClick={() => setSent(false)}
                className="border border-[#e0e0e0] font-medium text-[#232323] tracking-[-0.02em] px-6 py-3 rounded-full hover:border-[#ccbaf8] hover:bg-[#f9f5ff] transition-all"
                style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name + email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-[#232323] tracking-[-0.02em]" style={{ fontSize: "clamp(12px, 0.9vw, 14px)" }}>
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="bg-[#f4f4f4] rounded-2xl px-5 py-4 font-medium text-[#232323] placeholder:text-[#9b9b9b] tracking-[-0.02em] outline-none focus:ring-2 focus:ring-[#ccbaf8] transition-all"
                    style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-[#232323] tracking-[-0.02em]" style={{ fontSize: "clamp(12px, 0.9vw, 14px)" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="bg-[#f4f4f4] rounded-2xl px-5 py-4 font-medium text-[#232323] placeholder:text-[#9b9b9b] tracking-[-0.02em] outline-none focus:ring-2 focus:ring-[#ccbaf8] transition-all"
                    style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}
                  />
                </div>
              </div>

              {/* Subject pills */}
              <div className="flex flex-col gap-2">
                <label className="font-medium text-[#232323] tracking-[-0.02em]" style={{ fontSize: "clamp(12px, 0.9vw, 14px)" }}>
                  Subject
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Flag an issue", "Suggest a checklist", "Say hello", "Press / media", "Other"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSubject(s)}
                      className={`font-medium tracking-[-0.02em] px-4 py-2.5 rounded-full border transition-all whitespace-nowrap ${
                        subject === s
                          ? "bg-[#351459] text-white border-[#351459]"
                          : "border-[#e0e0e0] text-[#232323] hover:border-[#ccbaf8] hover:bg-[#f9f5ff]"
                      }`}
                      style={{ fontSize: "clamp(12px, 0.85vw, 14px)" }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="font-medium text-[#232323] tracking-[-0.02em]" style={{ fontSize: "clamp(12px, 0.9vw, 14px)" }}>
                  Message
                </label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  placeholder="Tell us what's on your mind…"
                  className="bg-[#f4f4f4] rounded-2xl px-5 py-4 font-medium text-[#232323] placeholder:text-[#9b9b9b] tracking-[-0.02em] outline-none focus:ring-2 focus:ring-[#ccbaf8] transition-all resize-none"
                  style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}
                />
              </div>

              {error && (
                <p className="text-[#be3738] text-sm mb-3" role="alert">
                  {error}
                </p>
              )}
              <div>
                <button
                  type="submit"
                  disabled={loading || !subject}
                  className={`bg-[#ccbaf8] hover:bg-[#b8a0f5] text-[#232323] font-medium tracking-[-0.03em] px-8 py-4 rounded-full transition-all active:scale-95 ${
                    loading || !subject
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  style={{ fontSize: "clamp(14px, 1vw, 16px)" }}
                >
                  {loading ? "Sending…" : "Send message →"}
                </button>
              </div>
            </form>
          )}

          {/* ── Sidebar ──────────────────────────────── */}
          <div className="flex flex-col gap-6">
            {/* Reasons */}
            <div className="bg-[#f4f4f4] rounded-[20px] p-8 flex flex-col gap-5">
              <p className="font-medium text-[#9b9b9b] uppercase tracking-[0.08em]" style={{ fontSize: "clamp(10px, 0.8vw, 12px)" }}>
                Common reasons
              </p>
              {reasons.map((r) => (
                <div key={r.label} className="flex flex-col gap-0.5">
                  <p className="font-medium text-[#232323] tracking-[-0.02em]" style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}>
                    {r.label}
                  </p>
                  <p className="text-[#9b9b9b] tracking-[-0.02em]" style={{ fontSize: "clamp(12px, 0.85vw, 13px)" }}>
                    {r.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Email fallback */}
            <div className="bg-[#351459] rounded-[20px] p-8 flex flex-col gap-3">
              <p className="font-medium text-[#ccbaf8] uppercase tracking-[0.08em]" style={{ fontSize: "clamp(10px, 0.8vw, 12px)" }}>
                Prefer email?
              </p>
              <a
                href="mailto:credentia.online@gmail.com"
                className="font-display text-white leading-tight tracking-[-0.04em] hover:text-[#ccbaf8] transition-colors break-all"
                style={{ fontSize: "clamp(1rem, 1.6vw, 1.4rem)" }}
              >
                credentia.online<br />@gmail.com
              </a>
            </div>

            {/* Contribute link */}
            <Link
              href="/contribute"
              className="border border-[#e0e0e0] rounded-[20px] p-8 flex flex-col gap-2 hover:border-[#ccbaf8] hover:bg-[#f9f5ff] transition-all group"
            >
              <p className="font-medium text-[#232323] tracking-[-0.02em]" style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}>
                📋 Have a full checklist to share?
              </p>
              <p className="text-[#9b9b9b] tracking-[-0.02em]" style={{ fontSize: "clamp(12px, 0.85vw, 13px)" }}>
                Know the documents and steps for a process we haven&apos;t covered? Add it — we&apos;ll credit you.
              </p>
              <p className="text-[#351459] font-medium tracking-[-0.02em] opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontSize: "clamp(12px, 0.85vw, 13px)" }}>
                Add a checklist →
              </p>
            </Link>

            {/* Support link */}
            <Link
              href="/jollof"
              className="border border-[#e0e0e0] rounded-[20px] p-8 flex flex-col gap-2 hover:border-[#ccbaf8] hover:bg-[#f9f5ff] transition-all group"
            >
              <p className="font-medium text-[#232323] tracking-[-0.02em]" style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}>
                🍚 Buy us jollof
              </p>
              <p className="text-[#9b9b9b] tracking-[-0.02em]" style={{ fontSize: "clamp(12px, 0.85vw, 13px)" }}>
                Credentia is free. Support helps keep it running.
              </p>
              <p className="text-[#351459] font-medium tracking-[-0.02em] opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontSize: "clamp(12px, 0.85vw, 13px)" }}>
                Learn more →
              </p>
            </Link>
          </div>
        </div>
      </section>


      <Footer />
    </main>
  );
}
