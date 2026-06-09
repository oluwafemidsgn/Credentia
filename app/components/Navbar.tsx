"use client";

import Link from "next/link";
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-2xl border-b border-white/20">
      <div className="flex items-center justify-between px-6 py-5 max-w-[860px] mx-auto w-full">
        <Link href="/" className="flex items-center gap-1.5 shrink-0 hover:opacity-80 transition-opacity">
          <div className="w-9 h-6 shrink-0">
            <img src="/assets/logo-icon.svg" alt="Credentia logo" className="w-full h-full" />
          </div>
          <span className="font-bold text-lg md:text-xl text-[#351459] tracking-[-1px]">
            Credentia
          </span>
        </Link>
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
      </div>
    </nav>
  );
}
