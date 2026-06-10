"use client";

import { motion } from "framer-motion";
import GlassChip from "@/components/GlassChip";
import { useIsMobile, useReducedMotion } from "@/lib/useMedia";

const BEFORE = [
  "Prompting AI and hoping for the best",
  "A brand that looked like everyone else's",
  "Cheap quote, expensive mistake",
  "Delivered to brief. Nothing more",
  "Shipped and ghosted",
];

// Figma: each after-row sparkle icon has its own accent fill.
const AFTER = [
  { text: "A clear design direction from day one", icon: "#4AD5FF" },
  { text: "Something we're finally proud to show off", icon: "#9DA4FF" },
  { text: "Done right the first time", icon: "#F594E2" },
  { text: "More than we asked for", icon: "#FFF9CD" },
  { text: "A team that sticks around after launch", icon: "#AEF17E" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/** Framed "Before"/"After" header pill with 4 corner crop-mark squares. */
function HeaderPill({ label, dotColor }: { label: string; dotColor: string }) {
  return (
    <div className="relative mx-auto w-[201px]">
      <div className="flex h-[53px] items-center justify-center border border-white/90 text-[32px] leading-none text-ink">
        {label}
      </div>
      {[
        "left-0 top-0 -translate-x-1/2 -translate-y-1/2",
        "right-0 top-0 translate-x-1/2 -translate-y-1/2",
        "left-0 bottom-0 -translate-x-1/2 translate-y-1/2",
        "right-0 bottom-0 translate-x-1/2 translate-y-1/2",
      ].map((pos) => (
        <span
          key={pos}
          className={`absolute h-[7.885px] w-[7.885px] border border-white ${pos}`}
          style={{ background: dotColor }}
          aria-hidden
        />
      ))}
    </div>
  );
}

export default function WhatChanges() {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const dist = mobile ? 30 : 60;

  const col = (fromLeft: boolean, delay: number) =>
    reduced
      ? {}
      : {
          initial: { x: fromLeft ? -dist : dist, opacity: 0 },
          whileInView: { x: 0, opacity: 1 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.6, ease: EASE, delay },
        };

  return (
    <section className="mx-auto max-w-shell px-6 py-28 md:px-12">
      <h2 className="mb-16 text-center text-[32px] leading-[1.2] text-ink">
        What Changes with Cyberpro
      </h2>

      <div className="mx-auto grid max-w-[1215px] grid-cols-1 gap-x-14 gap-y-16 md:grid-cols-2">
        <motion.div {...col(true, 0)}>
          <HeaderPill label="Before" dotColor="#FFFFFF" />
          <ul className="mt-[85px] flex flex-col gap-10">
            {BEFORE.map((b) => (
              <li key={b}>
                {/* Figma: before-row sparkle icon is white */}
                <GlassChip
                  className="w-full !justify-start"
                  style={{ ["--chip-icon" as string]: "#ffffff" }}
                >
                  {b}
                </GlassChip>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div {...col(false, 0.15)}>
          <HeaderPill label="After" dotColor="#299DFF" />
          <ul className="mt-[85px] flex flex-col gap-10">
            {AFTER.map((a) => (
              <li key={a.text}>
                {/* Figma: each after-row sparkle icon has its own accent fill */}
                <GlassChip
                  className="w-full !justify-start"
                  style={{ ["--chip-icon" as string]: a.icon }}
                >
                  {a.text}
                </GlassChip>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
