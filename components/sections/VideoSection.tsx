"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import VideoModal from "@/components/VideoModal";
import GlassChip from "@/components/GlassChip";
import { VIDEOS, type VideoItem } from "@/lib/videos";

const byId = (id: string) => VIDEOS.find((v) => v.id === id)!;

// Divider geometry from the Figma `grid lines` frame. The box (cell area) is
// 1177.26x655.45; the mid vertical sits at x=981.34 and the mid horizontal at
// y=621.25 — i.e. 67.95% across and 61.65% down the box.
const COL = 67.95; // %
const ROW = 61.65; // %
// 3x3 corner marks sit at every divider intersection — this covers all four
// corners of all four regions at once.
const MARKS: [number, number][] = [
  [0, 0], [COL, 0], [100, 0],
  [0, ROW], [COL, ROW], [100, ROW],
  [0, 100], [COL, 100], [100, 100],
];

/** Play button — translucent glass disc (76.88px) with a centered play triangle. In Figma it is the right-aligned element of the card's top "button" row (a flow child of the card's auto-layout), not an absolutely-positioned overlay. Triangle white @ 33% opacity. */
function PlayButton() {
  return (
    <span className="glass-play relative h-[77px] w-[77px] shrink-0 transition-transform duration-[250ms] group-hover:scale-[1.12]">
      <svg width="26" height="28" viewBox="0 0 22 24" fill="none" aria-hidden className="ml-[3px]">
        <path
          d="M2 2.6v18.8a1 1 0 0 0 1.51.86l15.49-9.4a1 1 0 0 0 0-1.72L3.51 1.74A1 1 0 0 0 2 2.6Z"
          fill="rgba(255,255,255,0.33)"
        />
      </svg>
    </span>
  );
}

/** A video tile that fills its positioned parent. The poster sits as a
 * background layer; on top, an auto-layout column (Figma card frame:
 * px-24 py-32, justify-center) pushes the play disc to the top-right row and
 * the tag chips to the bottom-left row — mirroring the Figma vertical stack. */
function Card({ video, onOpen }: { video: VideoItem; onOpen: (v: VideoItem) => void }) {
  return (
    <button
      onClick={() => onOpen(video)}
      aria-label={`Play ${video.title}`}
      className="group relative block h-full w-full overflow-hidden rounded-[28px] text-left"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={video.poster}
        alt={video.title}
        className="absolute inset-0 h-full w-full object-cover transition-[filter] duration-[250ms] group-hover:brightness-125"
      />
      <div className="absolute inset-0 bg-black/[0.45]" />
      {/* auto-layout content column */}
      <div className="relative flex h-full w-full flex-col justify-between px-6 py-8">
        <div className="flex w-full justify-end">
          <PlayButton />
        </div>
        <div className="flex flex-wrap gap-3">
          {video.cardTags.map((t) => (
            <GlassChip
              key={t}
              className="!py-[12px] !text-[18px]"
              style={{ ["--chip-icon" as string]: "rgba(157, 164, 255, 1)" }}
            >
              {t}
            </GlassChip>
          ))}
        </div>
      </div>
    </button>
  );
}

/**
 * The Figma `grid lines` overlay, reproduced as inline SVG so the exact stroke
 * geometry survives: each of the 6 hairlines OVERSHOOTS past the cell box and
 * fades to transparent at the protruding tip (left vertical fades in from the
 * top; mid/right verticals fade out below; top horizontal fades out to the
 * right; mid/bottom horizontals fade in from the left). viewBox matches the
 * Figma frame (1545.48x1052.48); preserveAspectRatio="none" stretches it so the
 * inner box (x:181.36-1358.62, y:217.14-872.59) maps onto the cell container.
 */
function GridLines() {
  return (
    <svg
      className="pointer-events-none absolute z-10 overflow-visible"
      style={{ left: "-15.41%", top: "-33.13%", width: "131.27%", height: "160.58%" }}
      viewBox="0 0 1545.48 1052.48"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      <line x1="181.66" x2="181.66" y2="872.29" stroke="url(#vg0)" strokeWidth="0.59" />
      <line x1="1358.62" y1="214.69" x2="1358.62" y2="1052.48" stroke="url(#vg1)" strokeWidth="0.59" />
      <line x1="981.34" y1="214.69" x2="981.34" y2="1052.48" stroke="url(#vg2)" strokeWidth="0.59" />
      <line x1="1545.48" y1="217.14" x2="181.36" y2="217.14" stroke="url(#vg3)" strokeWidth="0.59" />
      <line x1="1364.12" y1="872.59" y2="872.59" stroke="url(#vg4)" strokeWidth="0.59" />
      <line x1="1364.12" y1="621.25" y2="621.25" stroke="url(#vg5)" strokeWidth="0.59" />
      <defs>
        <linearGradient id="vg0" x1="180.86" y1="0" x2="180.86" y2="872.29" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="0.25" stopColor="white" />
        </linearGradient>
        <linearGradient id="vg1" x1="1357.83" y1="214.69" x2="1357.83" y2="1052.48" gradientUnits="userSpaceOnUse">
          <stop offset="0.7775" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="vg2" x1="980.54" y1="214.69" x2="980.54" y2="1052.48" gradientUnits="userSpaceOnUse">
          <stop offset="0.7358" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="vg3" x1="181.36" y1="216.34" x2="1545.48" y2="216.34" gradientUnits="userSpaceOnUse">
          <stop offset="0.8714" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="vg4" x1="0" y1="871.79" x2="1364.12" y2="871.79" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="0.1346" stopColor="white" />
        </linearGradient>
        <linearGradient id="vg5" x1="0" y1="620.45" x2="1364.12" y2="620.45" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="0.1346" stopColor="white" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * Video Editing — a framed irregular grid (one column divider + one row
 * divider, matching the Figma `grid lines` frame). Small rectangle marks sit
 * at every region corner. The wide top-left cell holds the hero video, the
 * bottom-left cell the caption, and the right column stacks two videos.
 */
export default function VideoSection() {
  const [active, setActive] = useState<VideoItem | null>(null);

  // Corner marks are hollow squares — black fill + a hairline white border
  // (Figma Rectangle 1020: bg-black, 0.394px white stroke, 17.74px square).
  const mark = (
    <span
      className="absolute z-20 h-[17.74px] w-[17.74px] -translate-x-1/2 -translate-y-1/2 rounded-[2px] bg-black"
      style={{ border: "0.394px solid #ffffff" }}
      aria-hidden
    />
  );

  return (
    <section className="mx-auto max-w-shell px-6 py-28 md:px-12">
      <ScrollReveal>
        {/* In Figma the title (x=209) aligns with the hero card's left edge
         * (`ng park` poster at x=208.955), i.e. indented past the grid's left
         * line by the same inset the cells use (p-5 = 20px) — not flush to the
         * section margin. */}
        <h2 className="pl-5 text-[32px] leading-[1.2] text-ink">Video Editing</h2>
      </ScrollReveal>

      <ScrollReveal index={1}>
        <div className="relative mt-10 aspect-[1177/656] w-full">
          {/* grid lines — gradient-faded strokes that overshoot the box */}
          <GridLines />
          {/* corner marks at every divider intersection */}
          {MARKS.map(([x, y], i) => (
            <span key={i} style={{ position: "absolute", left: `${x}%`, top: `${y}%` }}>
              {mark}
            </span>
          ))}

          {/* cells */}
          <div className="absolute" style={{ inset: 0, left: 0, top: 0, width: `${COL}%`, height: `${ROW}%` }}>
            <div className="h-full w-full p-5">
              <Card video={byId("shanhai")} onOpen={setActive} />
            </div>
          </div>
          <div className="absolute" style={{ left: 0, top: `${ROW}%`, width: `${COL}%`, bottom: 0 }}>
            <div className="flex h-full w-full items-center p-5 md:p-8">
              <p className="max-w-[640px] text-[22px] leading-[1.5] text-ink md:text-[24px]">
                Every frame tells part of the story. We make sure the whole
                thing lands.
              </p>
            </div>
          </div>
          <div className="absolute" style={{ left: `${COL}%`, top: 0, right: 0, height: `${ROW}%` }}>
            <div className="h-full w-full p-5">
              <Card video={byId("hiv")} onOpen={setActive} />
            </div>
          </div>
          <div className="absolute" style={{ left: `${COL}%`, top: `${ROW}%`, right: 0, bottom: 0 }}>
            <div className="h-full w-full p-5">
              <Card video={byId("longzhou")} onOpen={setActive} />
            </div>
          </div>
        </div>
      </ScrollReveal>

      <VideoModal
        open={!!active}
        src={active?.src ?? ""}
        title={active?.title}
        onClose={() => setActive(null)}
      />
    </section>
  );
}
