"use client";

import { useEffect, useState } from "react";

const TIERS = [
  { amount: "₦2k", label: "ONE PLATE", value: 2000 },
  { amount: "₦5k", label: "A FEW PLATES", value: 5000, default: true },
  { amount: "₦10k", label: "GENEROUS", value: 10000 },
];

export default function CoffeeTiers() {
  const [selected, setSelected] = useState(5000);
  const [custom, setCustom] = useState("");
  const [customActive, setCustomActive] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<
    "idle" | "redirecting" | "verifying" | "success" | "failed"
  >("idle");

  // When Paystack redirects back here after payment, confirm the reference.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reference = params.get("reference") ?? params.get("trxref");
    if (!reference) return;
    // Strip the reference from the URL so a refresh doesn't re-verify.
    window.history.replaceState({}, "", window.location.pathname + "#support");
    verifyPayment(reference);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleTierClick(value: number) {
    setSelected(value);
    setCustomActive(false);
    setCustom("");
    setError("");
  }

  function handleCustomClick() {
    setCustomActive(true);
    setSelected(0);
    setError("");
  }

  async function handlePay() {
    const amount = customActive ? Number(custom) : selected;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email for your receipt.");
      return;
    }
    if (!amount || amount < 100) {
      setError("Please choose or enter an amount of at least ₦100.");
      return;
    }

    setError("");
    setStatus("redirecting");
    try {
      const res = await fetch("/api/donate/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, amount }),
      });
      const data = await res.json();
      if (res.ok && data.authorization_url) {
        // Hand off to Paystack's hosted checkout page.
        window.location.href = data.authorization_url;
      } else {
        setStatus("idle");
        setError(data.error || "Couldn't start the payment. Please try again.");
      }
    } catch {
      setStatus("idle");
      setError(
        "Couldn't start the payment. Please check your connection and try again."
      );
    }
  }

  async function verifyPayment(reference: string) {
    setStatus("verifying");
    setError("");
    try {
      const res = await fetch("/api/donate/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference }),
      });
      const data = await res.json();
      if (res.ok && data.verified) {
        setStatus("success");
      } else {
        setStatus("failed");
        setError(
          data.error ||
            "We couldn't confirm your payment. If you were charged, email us and we'll sort it out."
        );
      }
    } catch {
      setStatus("failed");
      setError(
        "We couldn't confirm your payment. If you were charged, please contact us and we'll sort it out."
      );
    }
  }

  return (
    <section
      id="support"
      className="px-4 sm:px-8 lg:px-20 pb-14 md:pb-24 max-w-[1920px] mx-auto scroll-mt-[90px]"
    >
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
                Buy us jollof
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

            {/* Email */}
            <input
              type="email"
              inputMode="email"
              placeholder="Your email (for the receipt)"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className="rounded-[16px] border border-[#d8d8d8] bg-white text-[#232323] placeholder-[#9b9b9b] px-5 py-4 outline-none focus:border-[#3a6b4c] transition-colors text-[14px] sm:text-[15px]"
            />

            {error && (
              <p className="text-[#c0392b] text-[13px] tracking-[-0.01em]">{error}</p>
            )}

            {status === "success" ? (
              <div className="rounded-full bg-[#3a6b4c] text-white font-medium tracking-[-0.02em] px-8 py-4 text-center text-[14px] sm:text-[15px]">
                🎉 Thank you for the jollof! Check your email for a receipt.
              </div>
            ) : (
              /* CTA */
              <button
                onClick={handlePay}
                disabled={status === "redirecting" || status === "verifying"}
                className="bg-[#232323] hover:bg-[#111] disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium tracking-[-0.02em] px-8 py-4 rounded-full transition-all active:scale-95 text-center text-[14px] sm:text-[15px]"
              >
                {status === "redirecting"
                  ? "Opening Paystack…"
                  : status === "verifying"
                    ? "Confirming payment…"
                    : "Support Credentia →"}
              </button>
            )}
          </div>

          {/* Right — where the money goes */}
          <div className="w-full lg:w-1/2 rounded-[20px] bg-[#351459] text-white p-7 sm:p-9 flex flex-col gap-6 min-h-[280px] sm:min-h-[340px]">
            <p className="font-medium uppercase tracking-[0.12em] text-[#ccbaf8] text-[10px] sm:text-[11px]">
              Where your jollof goes
            </p>

            <ul className="flex flex-col gap-5 flex-1">
              {[
                { icon: "🌐", text: "Hosting & the credentia.site domain" },
                { icon: "🔍", text: "Hours spent verifying every checklist by hand" },
                { icon: "🍚", text: "The occasional plate that keeps us coding" },
              ].map((item) => (
                <li key={item.text} className="flex items-start gap-3">
                  <span className="text-[1.25rem] leading-none mt-0.5">{item.icon}</span>
                  <span className="text-[14px] sm:text-[15px] leading-[1.5] tracking-[-0.01em] text-white/90">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>

            <div className="pt-5 border-t border-white/15">
              <p className="font-display text-white leading-snug tracking-[-0.03em] text-[1.1rem] sm:text-[1.35rem]">
                Free for everyone, always.
              </p>
              <p className="text-[#ccbaf8] text-[13px] sm:text-[14px] mt-1.5 tracking-[-0.01em]">
                Built with care in Lagos — and secured by Paystack.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
