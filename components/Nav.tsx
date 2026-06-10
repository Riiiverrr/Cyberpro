"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/site";

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex h-[88px] max-w-shell items-center justify-between px-6 md:px-12">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Cyberpro home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/home/logos/cyberpro.png"
            alt="Cyberpro"
            className="h-[40px] w-auto select-none"
            draggable={false}
          />
        </Link>

        <nav className="hidden items-center gap-12 text-[18px] md:flex">
          {NAV_LINKS.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link text-ink/90 hover:text-ink"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                data-active={pathname === link.href}
                className="nav-link text-ink/90 hover:text-ink"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <Link
          href="/contact"
          className="nav-contact-btn hidden items-center justify-center rounded-[22.67px] px-[26px] py-[10px] text-[18px] md:inline-flex"
        >
          <span className="nav-contact-label">Contact</span>
        </Link>
      </div>
    </header>
  );
}
