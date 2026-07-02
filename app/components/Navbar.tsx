"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Browse", href: "/browse" },
  { label: "Blog", href: "/blog" },
  { label: "Buy us jollof", href: "/jollof" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Close the search overlay on Escape.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSearchOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-2xl border-b border-white/20">
        <div className="flex items-center justify-between px-6 py-4 max-w-[1100px] mx-auto w-full">
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

          {/* Desktop links — centered between logo and actions */}
          <div
            className="hidden md:flex flex-1 items-center justify-center gap-5 lg:gap-6 font-medium text-[#232323] tracking-[-0.02em]"
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

          {/* Desktop actions — search + contribute pill at the far end */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="text-[#232323] hover:text-[#351459] transition-colors"
            >
              <SearchIcon />
            </button>
            <Link
              href="/contribute"
              className="bg-[#351459] hover:bg-[#4a1d7d] text-white font-medium tracking-[-0.02em] px-5 py-2.5 rounded-full transition-all active:scale-95 whitespace-nowrap"
              style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}
            >
              Contribute
            </Link>
          </div>

          {/* Mobile controls — search + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => {
                setSearchOpen(true);
                setOpen(false);
              }}
              aria-label="Search"
              className="w-9 h-9 flex items-center justify-center text-[#351459]"
            >
              <SearchIcon />
            </button>
            <button
              className="flex flex-col justify-center items-center w-9 h-9 gap-[5px] shrink-0"
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
            <Link
              href="/contribute"
              onClick={() => setOpen(false)}
              className="bg-[#351459] hover:bg-[#4a1d7d] text-white font-medium tracking-[-0.02em] text-[15px] text-center px-5 py-3.5 rounded-full transition-all active:scale-95 mt-4 mb-2"
            >
              Contribute
            </Link>
          </div>
        </div>
      </div>

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-24 sm:pt-28">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          />
          <div className="relative w-full max-w-[640px]">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-white font-medium tracking-[-0.02em] text-[13px]">
                Search Credentia
              </span>
              <button
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                className="text-white/80 hover:text-white text-[18px] leading-none"
              >
                ✕
              </button>
            </div>
            <SearchBar white autoFocus onNavigate={() => setSearchOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
