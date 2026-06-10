"use client";

import { useState } from "react";

const TIERS = [
  { amount: "₦1k", label: "ONE COFFEE", value: 1000 },
  { amount: "₦3k", label: "A FEW COFFEES", value: 3000, default: true },
  { amount: "₦5k", label: "GENEROUS", value: 5000 },
];

export default function CoffeeTiers() {
  const [selected, setSelected] = useState(3000);
  const [custom, setCustom] = useState("");
  const [customActive, setCustomActive] = useState(false);

  function handleTierClick(value: number) {
    setSelected(value);
    setCustomActive(false);
    setCustom("");
  }

  function handleCustomClick() {
    setCustomActive(true);
    setSelected(0);
  }

  return (
    <section className="px-4 sm:px-8 lg:px-20 pb-14 md:pb-24 max-w-[1920px] mx-auto">
      <div className="max-w-[900px] mx-auto">
        {/* Label */}
        <p className="font-medium uppercase tracking-[0.12em] text-[#232323] mb-4 text-[10px] sm:text-[11px]">
          Support amounts
        </p>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Left — amount picker */}
          <div className="w-full lg:w-1/2 flex flex-col gap-5">
            <div>
              <h2 className="font-display text-[#232323] leading-none tracking-[-0.04em] text-[1.75rem] sm:text-[2.25rem]">
                Buy us a coffee
              </h2>
              <p className="text-[#505050] mt-2 text-[13px] sm:text-[14px] tracking-[-0.01em]">
                One-off, no account needed.
              </p>
            </div>

            {/* Tier grid */}
            <div className="grid grid-cols-3 gap-3">
              {TIERS.map((tier) => {
                const active = selected === tier.value && !customActive;
                return (
                  <button
                    key={tier.value}
                    onClick={() => handleTierClick(tier.value)}
                    className={`rounded-[16px] border py-5 px-3 flex flex-col items-center gap-1 transition-all active:scale-95 ${
                      active
                        ? "bg-[#3a6b4c] border-[#3a6b4c] text-white"
                        : "bg-white border-[#d8d8d8] text-[#232323] hover:border-[#aaa]"
                    }`}
                  >
                    <span className="font-display leading-none tracking-[-0.04em] text-[1.3rem] sm:text-[1.6rem]">
                      {tier.amount}
                    </span>
                    <span
                      className={`font-medium uppercase tracking-[0.07em] text-[9px] sm:text-[10px] ${
                        active ? "text-white/80" : "text-[#9b9b9b]"
                      }`}
                    >
                      {tier.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom tile */}
            <button
              onClick={handleCustomClick}
              className={`rounded-[16px] border py-5 px-6 flex flex-col items-start gap-1 transition-all active:scale-95 ${
                customActive
                  ? "bg-[#3a6b4c] border-[#3a6b4c] text-white"
                  : "bg-white border-[#d8d8d8] text-[#232323] hover:border-[#aaa]"
              }`}
            >
              {customActive ? (
                <input
                  autoFocus
                  type="number"
                  placeholder="Enter amount"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-transparent font-display text-white placeholder-white/60 leading-none tracking-[-0.04em] outline-none w-full text-[1.3rem] sm:text-[1.6rem]"
                />
              ) : (
                <span className="font-display leading-none tracking-[-0.04em] text-[1.3rem] sm:text-[1.6rem]">
                  Custom
                </span>
              )}
              <span
                className={`font-medium uppercase tracking-[0.07em] text-[9px] sm:text-[10px] ${
                  customActive ? "text-white/80" : "text-[#9b9b9b]"
                }`}
              >
                You choose
              </span>
            </button>

            {/* CTA */}
            <a
              href="https://buymeacoffee.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#232323] hover:bg-[#111] text-white font-medium tracking-[-0.02em] px-8 py-4 rounded-full transition-all active:scale-95 text-center text-[14px] sm:text-[15px]"
            >
              Support Credentia →
            </a>
          </div>

          {/* Right — payment embed placeholder */}
          <div className="w-full lg:w-1/2 rounded-[20px] border-2 border-dashed border-[#c8c8c8] bg-[#f4f4f4] flex items-center justify-center min-h-[280px] sm:min-h-[340px]">
            <p className="font-medium uppercase tracking-[0.1em] text-[#b0b0b0] text-[10px] sm:text-[11px] text-center px-4">
              Buy me a coffee / Paystack embed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
