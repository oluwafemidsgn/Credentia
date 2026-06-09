import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const team = [
  {
    name: "Ade",
    role: "Product & Research",
    bio: "Ade spent years watching friends and family lose time and money to outdated document information — wrong offices, wrong fees, wrong forms. Credentia is his answer to that problem.",
    color: "#ccbaf8",
  },
  {
    name: "Your Partner",
    role: "Design & Content",
    bio: "Behind every clear explanation and every well-structured checklist is someone who cares deeply about getting the details right. That's the other half of this project.",
    color: "#efd536",
  },
];

export default function Coffee() {
  return (
    <main className="bg-white overflow-x-hidden pt-[70px]">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="pt-16 md:pt-24 pb-16 md:pb-20 px-5 text-center max-w-[760px] mx-auto">
        <p
          className="font-medium text-[#9b9b9b] uppercase tracking-[0.1em] mb-5"
          style={{ fontSize: "clamp(10px, 0.85vw, 13px)" }}
        >
          The people behind it
        </p>
        <h1
          className="font-display leading-none text-[#232323] tracking-[-0.04em] mb-6"
          style={{ fontSize: "clamp(2.5rem, 6.5vw, 6rem)" }}
        >
          Built for Lagos,<br />by us
        </h1>
        <p
          className="font-medium leading-[1.6] text-[#505050] tracking-[-0.02em] max-w-[560px] mx-auto"
          style={{ fontSize: "clamp(0.875rem, 1.1vw, 1.05rem)" }}
        >
          Credentia is free and independent. No ads, no agents, no affiliate links.
          If it has saved you a trip, a phone call, or a bribe — buying us a coffee helps keep it that way.
        </p>
      </section>

      {/* ── Team cards ────────────────────────────────────── */}
      <section className="px-5 sm:px-10 lg:px-20 pb-16 md:pb-24 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-[900px] mx-auto">
          {team.map((person) => (
            <div key={person.name} className="rounded-[24px] overflow-hidden flex flex-col" style={{ backgroundColor: person.color }}>
              {/* Avatar placeholder */}
              <div className="h-[200px] md:h-[240px] bg-white/30 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/60 flex items-center justify-center">
                  <span className="font-display text-[#292929] tracking-[-0.04em]" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                    {person.name[0]}
                  </span>
                </div>
              </div>
              {/* Text */}
              <div className="p-8 md:p-10 flex flex-col gap-3">
                <div>
                  <h2
                    className="font-display text-[#292929] leading-none tracking-[-0.04em]"
                    style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.5rem)" }}
                  >
                    {person.name}
                  </h2>
                  <p
                    className="text-[#505050] font-medium uppercase tracking-[0.06em] mt-1"
                    style={{ fontSize: "clamp(10px, 0.8vw, 12px)" }}
                  >
                    {person.role}
                  </p>
                </div>
                <p
                  className="text-[#505050] leading-[1.6] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(13px, 0.95vw, 16px)" }}
                >
                  {person.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why we built it ───────────────────────────────── */}
      <section className="px-5 sm:px-10 lg:px-20 pb-16 md:pb-24 max-w-[1920px] mx-auto">
        <div className="bg-[#f4f4f4] rounded-[24px] px-8 md:px-20 py-14 md:py-20 max-w-[900px] mx-auto flex flex-col gap-8">
          <h2
            className="font-display text-[#232323] leading-tight tracking-[-0.04em]"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 3.5rem)" }}
          >
            Why we built this
          </h2>
          <div className="flex flex-col gap-5 text-[#505050] leading-[1.75] tracking-[-0.01em]" style={{ fontSize: "clamp(14px, 1vw, 17px)" }}>
            <p>
              The information you need to get a passport, register your NIN, or get into university exists — it is just scattered across government websites that are rarely updated, WhatsApp groups passing around outdated screenshots, and agents who charge you for access to things that are supposed to be public.
            </p>
            <p>
              We wanted one place where you could type what you are trying to do and get a straight answer: what you need, what it costs, how long it takes, and where to go. No sign-up, no subscription, no middleman.
            </p>
            <p>
              Lagos first because we know it best. The rest of Nigeria next. Everything verified by people who have actually done the process recently.
            </p>
          </div>
        </div>
      </section>

      {/* ── Coffee CTA ────────────────────────────────────── */}
      <section className="px-5 sm:px-10 lg:px-20 pb-16 md:pb-24 max-w-[1920px] mx-auto">
        <div className="bg-[#351459] rounded-[24px] px-8 md:px-20 py-14 md:py-20 max-w-[900px] mx-auto text-center flex flex-col items-center gap-8">
          <p className="text-5xl">☕</p>
          <h2
            className="font-display text-white leading-tight tracking-[-0.04em]"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 3rem)" }}
          >
            Buy us a coffee
          </h2>
          <p
            className="text-[#ccbaf8] leading-[1.6] tracking-[-0.02em] max-w-[480px]"
            style={{ fontSize: "clamp(14px, 1vw, 17px)" }}
          >
            Credentia costs money to run — hosting, domain, and the hours we spend keeping every checklist accurate. A coffee goes a long way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <a
              href="https://buymeacoffee.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#ccbaf8] hover:bg-[#b8a0f5] text-[#232323] font-medium tracking-[-0.03em] px-8 py-4 rounded-full transition-all active:scale-95 whitespace-nowrap"
              style={{ fontSize: "clamp(14px, 1vw, 16px)" }}
            >
              Buy us a coffee →
            </a>
            <Link
              href="/contact"
              className="text-[#ccbaf8] hover:text-white font-medium tracking-[-0.02em] transition-colors"
              style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}
            >
              Or just say hello
            </Link>
          </div>
        </div>
      </section>

      {/* ── Watermark ─────────────────────────────────────── */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <p
          aria-hidden
          className="absolute bottom-0 left-0 right-0 text-center font-bold text-[#f4f4f4] leading-none pointer-events-none select-none whitespace-nowrap translate-y-[45%]"
          style={{ fontSize: "clamp(80px, 23vw, 432px)", letterSpacing: "clamp(-4px, -1.2vw, -21.6px)" }}
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
