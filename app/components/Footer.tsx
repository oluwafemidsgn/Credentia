import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#ccbaf8]">
      <div className="max-w-[1920px] mx-auto px-5 sm:px-10 lg:px-20 py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-16">

          <div className="col-span-2 lg:col-span-1 flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
              <img src="/assets/logo-icon.svg" alt="" className="w-8 h-5" />
              <span
                className="font-bold text-[#351459] tracking-[-0.05em]"
                style={{ fontSize: "clamp(14px, 1.1vw, 18px)" }}
              >
                Credentia
              </span>
            </div>
            <p className="text-[#505050] leading-[1.5]" style={{ fontSize: "clamp(12px, 0.9vw, 15px)" }}>
              Know what you need. The documents of your life, decoded.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-medium text-[#292929] uppercase tracking-wider mb-2">
              Categories
            </span>
            {[
              { label: "Civil Identity", href: "/browse#civil-identity" },
              { label: "Travel & Immigration", href: "/browse#travel-immigration" },
              { label: "Education", href: "/browse#education" },
              { label: "Marriage & Family", href: "/browse#marriage-family" },
              { label: "Employment", href: "/browse#employment" },
              { label: "Browse all", href: "/browse" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-[#505050] hover:text-[#292929] transition-colors py-1.5 leading-none"
                style={{ fontSize: "clamp(12px, 0.9vw, 15px)" }}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-medium text-[#292929] uppercase tracking-wider mb-2">
              Pages
            </span>
            {[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: "Contribute", href: "/contribute" },
              { label: "Buy us jollof", href: "/jollof" },
              { label: "Contact", href: "/contact" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-[#505050] hover:text-[#292929] transition-colors py-1.5 leading-none"
                style={{ fontSize: "clamp(12px, 0.9vw, 15px)" }}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-medium text-[#292929] uppercase tracking-wider mb-2">
              Follow
            </span>
            {[
              {
                label: "Instagram",
                href: "https://www.instagram.com/credentia.site?igsh=MXZoODlhZ3Jzc2s1YQ==",
              },
              { label: "X/Twitter", href: "https://x.com/Credentia_site" },
            ].map(({ label, href }) => {
              const external = href.startsWith("http");
              return (
                <Link
                  key={label}
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="text-[#505050] hover:text-[#292929] transition-colors py-1.5 leading-none"
                  style={{ fontSize: "clamp(12px, 0.9vw, 15px)" }}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>

        <div
          className="mt-10 md:mt-14 pt-6 border-t border-[#b5a0ee] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          style={{ fontSize: "clamp(10px, 0.8vw, 12px)" }}
        >
          <span className="text-[#505050]">© 2026 Credentia. Built for Lagos.</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-[#505050] hover:text-[#292929] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-[#505050] hover:text-[#292929] transition-colors">
              Terms
            </Link>
            <span className="text-[#505050]">Clear. Accurate. Free.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
