"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { TESTIMONIALS } from "@/lib/videos";
import styles from "./Testimonials.module.css";

// Each note strip hangs diagonally from a colored dot pinned to the curve.
// x is the % position along the stage; topPct is where the dot sits on the
// curve (dips in the middle, rises at the ends). tilt is the strip's diagonal
// angle (matching the Figma design — strips fan downward across the stage).
// Colors cycle blue / purple / green like the curve.
const NOTES = [
  { x: 7, topPct: 14, tilt: 62, color: "#299DFF" },
  { x: 24, topPct: 30, tilt: 78, color: "#9DA4FF" },
  { x: 45, topPct: 33, tilt: 96, color: "#9DA4FF" },
  { x: 64, topPct: 24, tilt: 108, color: "#9DA4FF" },
  { x: 82, topPct: 20, tilt: 122, color: "#AEF17E" },
];

/**
 * Customer voice — glass note cards hang vertically from a colored gradient
 * curve, pinned at colored dots, with their text rotated 90°. Clicking a card
 * rotates it upright (landscape) so the quote reads horizontally; clicking
 * again re-hangs it. On mobile the cards stack upright and readable.
 */
export default function Testimonials() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-shell px-6 py-28 md:px-12">
      {/* desktop: notes hanging on the gradient curve */}
      <div className={`relative hidden md:block ${styles.stage}`}>
        <svg
          className={styles.curve}
          viewBox="0 0 1845 300"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="voiceCurve" x1="0" y1="0" x2="1845" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#299DFF" />
              <stop offset="50%" stopColor="#9DA4FF" />
              <stop offset="100%" stopColor="#AEF17E" />
            </linearGradient>
          </defs>
          <path
            d="M0 40 C 360 250, 720 250, 1010 150 C 1300 60, 1560 90, 1845 230"
            stroke="url(#voiceCurve)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        {NOTES.map((n, i) => (
          <div
            key={i}
            className={styles.pin}
            style={{ left: `${n.x}%`, top: `${n.topPct}%`, color: n.color }}
          >
            <span className={styles.dot} aria-hidden />
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className={`${styles.note} ${open === i ? styles.open : ""}`}
              style={{ "--tilt": `${n.tilt}deg` } as React.CSSProperties}
            >
              <span className={styles.quoteWrap}>
                <p className={styles.quote}>{TESTIMONIALS[i]}</p>
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* mobile: simple upright stack */}
      <div className="grid grid-cols-1 gap-6 md:hidden">
        {TESTIMONIALS.map((quote, i) => (
          <ScrollReveal key={i} index={i % 3}>
            <blockquote className="rounded-[26px] border border-white/15 bg-black/20 p-7 text-[20px] leading-[1.5] text-ink backdrop-blur-sm">
              {quote}
            </blockquote>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
