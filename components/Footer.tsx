"use client";

import Link from "next/link";
import { FOOTER } from "@/lib/site";

function FooterLink({ href, label }: { href: string; label: string }) {
  const external = href.startsWith("http") || href === "#";
  if (external) {
    return (
      <a href={href} className="footer-link text-[18px]">
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className="footer-link text-[18px]">
      {label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="bg-black">
      <div className="mx-auto max-w-shell px-6 pt-20 pb-16 md:px-12">
        {/* top: tagline + Work together CTA */}
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <p className="max-w-[420px] text-[32px] leading-[1.25] text-ink">
            {FOOTER.tagline}
          </p>
          <Link
            href={FOOTER.cta.href}
            className="cta-link group inline-flex items-center gap-4 text-[24px] text-ink"
          >
            {FOOTER.cta.label}
            {/* Figma node 1:670: thin full-white circle (r≈16.8, stroke 0.412)
                with a slim horizontal arrow — matches the dev-mode asset 1:1. */}
            <svg
              className="cta-arrow h-[36px] w-[34px] shrink-0"
              viewBox="0 0 34.6654 36"
              fill="none"
              aria-hidden
            >
              <circle cx="17" cy="17.335" r="16.7939" stroke="currentColor" strokeWidth="0.412175" />
              <path
                d="M23.2915 17.6264C23.4524 17.4654 23.4524 17.2045 23.2915 17.0435L20.6684 14.4204C20.5074 14.2595 20.2464 14.2595 20.0855 14.4204C19.9245 14.5814 19.9245 14.8424 20.0855 15.0033L22.4171 17.335L20.0855 19.6666C19.9245 19.8275 19.9245 20.0885 20.0855 20.2495C20.2464 20.4104 20.5074 20.4104 20.6684 20.2495L23.2915 17.6264ZM8 17.335V17.7471H23V17.335V16.9228H8V17.335Z"
                fill="currentColor"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* full-bleed rule — Figma Line 39 (x=0, width=1920): spans the full
          viewport width, not just the content shell. Body has overflow-x:hidden
          so this never introduces horizontal scroll. */}
      <div className="border-t border-white" />

      {/* middle: link columns. Two VERTICAL dividers between the three columns
          (Figma Line 40 at x=741 ≈31.75%, Line 41 at x=1152 ≈66%) span the gap
          between the two horizontal rules (~93px: Line 39 y=155 → Line 38
          y=248). The grid sits flush against both full-bleed rules, so the
          divide-x dividers run the full link-section height. */}
      <div className="mx-auto max-w-shell px-6 md:px-12">
        <div className="grid grid-cols-2 gap-x-10 md:grid-cols-[31.75%_34.25%_34%] md:gap-0 md:divide-x md:divide-white">
          <div className="flex flex-col gap-3 pb-5 pt-6 md:pr-6">
            <p className="text-[16px] text-white/60">{FOOTER.social.title}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-3">
              {FOOTER.social.links.map((l) => (
                <FooterLink key={l.label} {...l} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-5 pt-6 md:px-6">
            <p className="text-[16px] text-white/60">{FOOTER.goto.title}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-3">
              {FOOTER.goto.links.map((l) => (
                <FooterLink key={l.label} {...l} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-5 pt-6 md:px-6">
            <p className="text-[16px] text-white/60">{FOOTER.contact.title}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-3">
              {FOOTER.contact.emails.map((e) => (
                <a
                  key={e}
                  href={`mailto:${e}`}
                  className="footer-link text-[16px]"
                >
                  {e}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* full-bleed rule — Figma Line 38 (x=0, width=1920). */}
      <div className="border-t border-white" />

      {/* bottom: copyright — no vertical dividers: just the year (Figma x=360 →
          col start) and the legal text (Figma x=827 → ≈38.9%). */}
      <div className="mx-auto max-w-shell px-6 pb-20 pt-8 md:px-12">
        <div className="grid grid-cols-1 gap-y-2 text-[14px] text-white md:grid-cols-[38.9%_auto] md:gap-0">
          <span>{FOOTER.copyright.year}</span>
          <span>{FOOTER.copyright.text}</span>
        </div>
      </div>
    </footer>
  );
}
