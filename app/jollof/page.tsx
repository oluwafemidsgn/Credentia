import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CoffeeTiers from "../components/CoffeeTiers";

const team = [
  {
    name: "Ade",
    role: "Product & Research",
    bio: "Ade spent years watching friends and family lose time and money to outdated document information: wrong offices, wrong fees, wrong forms. Credentia is his answer to that problem.",
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
      <section className="pt-12 md:pt-24 pb-12 md:pb-20 px-4 text-center max-w-[760px] mx-auto">
        <p className="font-medium text-[#9b9b9b] uppercase tracking-[0.1em] mb-4 text-[10px] sm:text-[11px]">
          The people behind it
        </p>
        <h1 className="font-display leading-none text-[#232323] tracking-[-0.04em] mb-5 text-[2rem] sm:text-[2.75rem] md:text-[4rem] lg:text-[5.5rem]">
          Built for Lagos,<br />by us
        </h1>
        <p className="font-medium leading-[1.6] text-[#505050] tracking-[-0.02em] max-w-[560px] mx-auto text-[13px] sm:text-[15px] md:text-[16px]">
          Credentia is free for everyone in Lagos.
          If it has saved you a trip, a phone call, or a bribe, buying us jollof helps keep it that way.
        </p>
      </section>

      {/* ── Team cards ────────────────────────────────────── */}
      <section className="px-4 sm:px-8 lg:px-20 pb-12 md:pb-24 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 max-w-[900px] mx-auto">
          {team.map((person) => (
            <div key={person.name} className="rounded-[20px] overflow-hidden flex flex-col" style={{ backgroundColor: person.color }}>
              {/* Avatar placeholder */}
              <div className="h-[160px] sm:h-[200px] md:h-[240px] bg-white/30 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/60 flex items-center justify-center">
                  <span className="font-display text-[#292929] tracking-[-0.04em] text-[1.25rem] sm:text-[1.75rem]">
                    {person.name[0]}
                  </span>
                </div>
              </div>
              {/* Text */}
              <div className="p-5 sm:p-8 md:p-10 flex flex-col gap-2 sm:gap-3">
                <div>
                  <h2 className="font-display text-[#292929] leading-none tracking-[-0.04em] text-[1.25rem] sm:text-[1.75rem] md:text-[2.25rem]">
                    {person.name}
                  </h2>
                  <p className="text-[#505050] font-medium uppercase tracking-[0.06em] mt-1 text-[9px] sm:text-[10px]">
                    {person.role}
                  </p>
                </div>
                <p className="text-[#505050] leading-[1.6] tracking-[-0.02em] text-[12px] sm:text-[14px] md:text-[15px]">
                  {person.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Support amounts ───────────────────────────────── */}
      <CoffeeTiers />

      {/* ── Why we built it ───────────────────────────────── */}
      <section className="px-4 sm:px-8 lg:px-20 pb-12 md:pb-24 max-w-[1920px] mx-auto">
        <div className="bg-[#f4f4f4] rounded-[20px] sm:rounded-[24px] px-5 sm:px-10 md:px-20 py-10 md:py-20 max-w-[900px] mx-auto flex flex-col gap-6 md:gap-8">
          <h2 className="font-display text-[#232323] leading-tight tracking-[-0.04em] text-[1.5rem] sm:text-[2rem] md:text-[3rem]">
            Why we built this
          </h2>
          <div className="flex flex-col gap-4 text-[#505050] leading-[1.75] tracking-[-0.01em] text-[13px] sm:text-[15px] md:text-[16px]">
            <p>
              The information you need to get a passport, register your NIN, or get into university exists. It is just scattered across government websites that are rarely updated, WhatsApp groups passing around outdated screenshots, and agents who charge you for access to things that are supposed to be public.
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
      <section className="px-4 sm:px-8 lg:px-20 pb-12 md:pb-24 max-w-[1920px] mx-auto">
        <div className="bg-[#351459] rounded-[20px] sm:rounded-[24px] px-5 sm:px-10 md:px-20 py-10 md:py-20 max-w-[900px] mx-auto text-center flex flex-col items-center gap-5 md:gap-8">
          <p className="text-[2.5rem] sm:text-[3rem]">🍚</p>
          <h2 className="font-display text-white leading-tight tracking-[-0.04em] text-[1.5rem] sm:text-[2rem] md:text-[2.75rem]">
            Buy us jollof
          </h2>
          <p className="text-[#ccbaf8] leading-[1.6] tracking-[-0.02em] max-w-[480px] text-[13px] sm:text-[15px] md:text-[16px]">
            Credentia costs money to run: hosting, domain, and the hours we spend keeping every checklist accurate. A plate of jollof goes a long way.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center w-full sm:w-auto">
            <a
              href="#support"
              className="bg-[#ccbaf8] hover:bg-[#b8a0f5] text-[#232323] font-medium tracking-[-0.03em] px-7 py-3.5 rounded-full transition-all active:scale-95 whitespace-nowrap text-[13px] sm:text-[15px] w-full sm:w-auto text-center"
            >
              Buy us jollof →
            </a>
            <Link
              href="/contact"
              className="text-[#ccbaf8] hover:text-white font-medium tracking-[-0.02em] transition-colors text-[13px] sm:text-[14px]"
            >
              Or just say hello
            </Link>
          </div>
        </div>
      </section>


      <Footer />
    </main>
  );
}
