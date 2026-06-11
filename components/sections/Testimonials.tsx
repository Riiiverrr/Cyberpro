"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { TESTIMONIALS } from "@/lib/videos";
import styles from "./Testimonials.module.css";

// The whole stage reproduces the Figma "customer voice" frame (node 1:793),
// which is 1911×1046. Every size is expressed in Figma units and converted to
// container-query units (1cqw = 1911/100 = 19.11 units) so the section scales
// exactly like the design at any width.
const FRAME_W = 1911;
const FRAME_H = 1046;
const U = FRAME_W / 100; // Figma units per 1cqw

// Each note is a 564×190 (one 658×190) landscape glass card that HANGS from a
// colored dot on the curve. `ox`/`oy` are the card's exact Figma ORIGIN CORNER
// (the node's local 0,0) in frame coords, read straight from the plugin API —
// no reverse-engineering. The card is pinned there with transform-origin 0 0
// and rotated by its Figma angle, so the dot on the curve lands precisely on
// the card's corner (both live in the same frame coordinate space). The corner
// that touches the line is the cyan/light-blue/purple/pale-yellow dot per card.
// Clicking a card swings it upright (rotate 0). i maps to TESTIMONIALS.
const NOTES = [
  { i: 0, ox: 156.0, oy: 748.8, w: 564, rot: -45 }, // AI can generate
  { i: 1, ox: 392.0, oy: 896.0, w: 564, rot: -73 }, // I never had
  { i: 2, ox: 887.9, oy: 996.6, w: 658, rot: -99 }, // They didn't
  { i: 3, ox: 1275.4, oy: 830.4, w: 564, rot: -113 }, // What stood out
  { i: 4, ox: 1338.0, oy: 976.4, w: 564, rot: -73 }, // I came in
];

/**
 * Customer voice — glass note cards hang from colored dots on a single sweeping
 * multi-color gradient curve (the real Figma "line with dots" asset). Each card
 * is a 564×190 (one 658×190) frosted landscape card pinned by its exact Figma
 * origin corner and rotated to its Figma angle, so a dot on the curve sits right
 * on each card's corner and the quotes fan diagonally down across the stage
 * exactly as designed. Clicking a card swings it upright (rotate 0) so the quote
 * reads horizontally; clicking again re-hangs it. On mobile the cards stack
 * upright and readable.
 */
export default function Testimonials() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-shell px-6 py-28 md:px-12">
      {/* desktop: notes hanging on the gradient curve */}
      <div className={`hidden md:block ${styles.stage}`}>
        {/* the gradient curve + colored dots, placed at its exact frame coords */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/customer-voice-line.svg"
          alt=""
          aria-hidden
          className={styles.curve}
        />

        {NOTES.map((n) => (
          <button
            key={n.i}
            type="button"
            onClick={() => setOpen(open === n.i ? null : n.i)}
            aria-expanded={open === n.i}
            className={`${styles.note} ${open === n.i ? styles.open : ""}`}
            style={
              {
                left: `${(n.ox / FRAME_W) * 100}%`,
                top: `${(n.oy / FRAME_H) * 100}%`,
                width: `${n.w / U}cqw`,
                "--rot": `${n.rot}deg`,
              } as React.CSSProperties
            }
          >
            <p className={styles.quote}>{TESTIMONIALS[n.i]}</p>
          </button>
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
