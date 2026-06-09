"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Browse", href: "/browse" },
  { label: "Blog", href: "/blog" },
  { label: "Buy me a coffee", href: "#" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-2xl border-b border-white/20">
        <div className="flex items-center justify-between px-6 py-5 max-w-[860px] mx-auto w-full">
          <Link
            href="/"
            className="flex items-center gap-1.5 shrink-0 hover:opacity-80 transition-opacity"
            onClick={() => setOpen(false)}
          >
            <div className="w-9 h-6 shrink-0">
              <img src="/assets/logo-icon.svg" alt="Credentia logo" className="w-full h-full" />
            </div>
            <span className="font-bold text-lg md:text-xl text-[#351459] tracking-[-1px]">
              Credentia
            </span>
          </Link>

          {/* Desktop links */}
          <div
            className="hidden md:flex items-center gap-5 lg:gap-6 font-medium text-[#232323] tracking-[-0.02em]"
            style={{ fontSize: "clamp(13px, 1vw, 16px)" }}
          >
            {navLinks.map(({ label, href }) => {
              const active = href !== "#" && (href === "/" ? pathname === "/" : pathname.startsWith(href));
              return (
                <Link
                  key={label}
                  href={href}
                  className={`transition-colors whitespace-nowrap ${
                    active ? "text-[#351459]" : "hover:text-[#351459]"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] shrink-0"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span
              className={`block h-[2px] w-5 bg-[#351459] rounded-full transition-all duration-300 origin-center ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-5 bg-[#351459] rounded-full transition-all duration-300 ${
                open ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-5 bg-[#351459] rounded-full transition-all duration-300 origin-center ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute top-[70px] left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-[#e0e0e0] transition-all duration-300 ${
            open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          <div className="flex flex-col px-6 py-4">
            {navLinks.map(({ label, href }) => {
              const active = href !== "#" && (href === "/" ? pathname === "/" : pathname.startsWith(href));
              return (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`font-medium py-4 border-b border-[#f0f0f0] last:border-0 tracking-[-0.02em] transition-colors text-[15px] ${
                    active ? "text-[#351459]" : "text-[#232323] hover:text-[#351459]"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
