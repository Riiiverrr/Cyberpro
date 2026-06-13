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
// the card's corner (both live in the same frame coordinate space).
// `dot` is the dot's color; `dotx`/`doty` are the dot's position in the card's
// OWN local space (% of the card's width/height), computed by inverse-rotating
// the dot's frame point into card coords. Rendering the dot as a child of the
// card means it travels with the card — it stays nailed on while the card sways
// and rides along when the card swings upright. Clicking swings it upright
// (rotate 0). i maps to TESTIMONIALS.
const NOTES = [
  { i: 0, ox: 156.0, oy: 748.8, w: 564, rot: -45, dot: "#50D8FF", dotx: 95.5, doty: 14.0 }, // AI can generate
  { i: 1, ox: 392.0, oy: 896.0, w: 564, rot: -73, dot: "#50D8FF", dotx: 95.0, doty: 11.0 }, // I never had
  { i: 2, ox: 887.9, oy: 996.6, w: 658, rot: -99, dot: "#90E2FF", dotx: 95.5, doty: 10.5 }, // They didn't
  { i: 3, ox: 1275.4, oy: 830.4, w: 564, rot: -113, dot: "#B2A0F8", dotx: 94.5, doty: 10.0 }, // What stood out
  { i: 4, ox: 1338.0, oy: 976.4, w: 564, rot: -73, dot: "#FEF9CC", dotx: 95.0, doty: 11.0 }, // I came in
];

// The gradient curve asset (customer-voice-curve.svg) as its three cubic Bézier
// segments, in the SVG's own viewBox space. We sample the path in JS and snap
// each card so the DOT it hangs from lands exactly on the nearest point of the
// line — the curve passes through the dots BY CONSTRUCTION, instead of relying
// on the rotation math happening to land on the line (which drifts a few px once
// the curve goes through the SVG's preserveAspectRatio="none" stretch).
const CURVE_VB_W = 1845.65;
const CURVE_VB_H = 494.606;
const CURVE_SEGS = [
  [0.49616, 0.0618476, 9.39382, 71.4416, 121.007, 260.506, 348.496, 346.562],
  [348.496, 346.562, 632.858, 454.132, 935.63, 288.795, 1142, 333.562],
  [1142, 333.562, 1331, 374.562, 1546, 564.062, 1845.5, 466.562],
];
// Curve container in frame coords (matches .curve in the CSS): left 33 (1.727%),
// top 0, width 1845 (96.546%), height 494.044 (47.232% of 1046). Pre-sample the
// path into a dense polyline in frame coordinates.
const CURVE_PTS_F: [number, number][] = (() => {
  const left = 33;
  const csx = 1845 / CURVE_VB_W;
  const csy = 494.044 / CURVE_VB_H;
  const pts: [number, number][] = [];
  for (const s of CURVE_SEGS) {
    const [p0x, p0y, c1x, c1y, c2x, c2y, p3x, p3y] = s;
    const N = 140;
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const u = 1 - t;
      const x = u * u * u * p0x + 3 * u * u * t * c1x + 3 * u * t * t * c2x + t * t * t * p3x;
      const y = u * u * u * p0y + 3 * u * u * t * c1y + 3 * u * t * t * c2y + t * t * t * p3y;
      pts.push([left + x * csx, y * csy]);
    }
  }
  return pts;
})();

// The card is 190 frame units tall (.card height: 9.943cqw). Snap a card's
// origin corner so its dot — rotated into frame space — sits on the curve.
function snapToCurve(n: (typeof NOTES)[number]) {
  const dotLocalX = (n.dotx / 100) * n.w;
  const dotLocalY = (n.doty / 100) * 190;
  const rad = (n.rot * Math.PI) / 180;
  const rx = dotLocalX * Math.cos(rad) - dotLocalY * Math.sin(rad);
  const ry = dotLocalX * Math.sin(rad) + dotLocalY * Math.cos(rad);
  const tx = n.ox + rx;
  const ty = n.oy + ry;
  let best = CURVE_PTS_F[0];
  let bd = Infinity;
  for (const p of CURVE_PTS_F) {
    const dx = p[0] - tx;
    const dy = p[1] - ty;
    const d = dx * dx + dy * dy;
    if (d < bd) {
      bd = d;
      best = p;
    }
  }
  return { ...n, ox: best[0] - rx, oy: best[1] - ry };
}
// Origin corners pre-snapped to the curve; left/top below read these.
const NOTES_SNAPPED = NOTES.map(snapToCurve);

/**
 * Customer voice — glass note cards hang from colored dots on a single sweeping
 * multi-color gradient curve (the real Figma "line with dots" asset). Each card
 * is a 564×190 (one 658×190) frosted landscape card pinned by its exact Figma
 * origin corner and rotated to its Figma angle, so a dot on the curve sits right
 * on each card's corner and the quotes fan diagonally down across the stage
 * exactly as designed.
 *
 * Interaction: at rest, every card sways gently from its dot like a wind chime.
 * Clicking a card swings it upright IN PLACE around that same dot so the quote
 * reads horizontally without leaving its spot on the curve; clicking the dimmed
 * backdrop (any blank area) hangs it back. On mobile the cards stack upright.
 */
export default function Testimonials() {
  const [open, setOpen] = useState<number | null>(null);

  const handleClick = (n: (typeof NOTES)[number]) => () => {
    setOpen((cur) => (cur === n.i ? null : n.i));
  };

  return (
    <section className="mx-auto max-w-shell px-6 py-28 md:px-12">
      {/* desktop: notes hanging on the gradient curve */}
      <div className={`hidden md:block ${styles.stage}`}>
        {/* the gradient curve + colored dots, placed at its exact frame coords */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/customer-voice-curve.svg"
          alt=""
          aria-hidden
          className={styles.curve}
        />

        {/* dimmed backdrop — clicking any blank area re-hangs the open card */}
        {open !== null && (
          <div
            className={styles.backdrop}
            onClick={() => setOpen(null)}
            aria-hidden
          />
        )}

        {NOTES_SNAPPED.map((n) => (
          <button
            key={n.i}
            type="button"
            onClick={handleClick(n)}
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
            {/* Two stacked layers, both pivoting at the dot so it never leaves
                the curve, but each owning a DIFFERENT transform so they never
                fight over one property (the reason the open motion can be truly
                silky):
                  .swing — only the open rotation lives here, driven purely by a
                    transition (never touched by the sway animation), so swinging
                    to horizontal and back glides with no snap.
                  .card  — the glass visual + the always-on wind-chime sway. */}
            <span
              className={styles.swing}
              style={
                {
                  // both layers pivot at the dot the card hangs from (custom
                  // props inherit down to .card), so the bottom-left corner
                  // travels the most and the dot stays nailed on the curve
                  "--dotx": `${n.dotx}%`,
                  "--doty": `${n.doty}%`,
                } as React.CSSProperties
              }
            >
              <span className={styles.card}>
                <p className={styles.quote}>{TESTIMONIALS[n.i]}</p>
                <i
                  className={styles.dot}
                  aria-hidden
                  style={
                    {
                      "--dot": n.dot,
                      left: `${n.dotx}%`,
                      top: `${n.doty}%`,
                    } as React.CSSProperties
                  }
                />
              </span>
            </span>
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
