"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Two thin SVG curves that "draw" themselves on mount via stroke-dashoffset
 * animating from full length to 0. Skipped for reduced motion (shown drawn).
 */
export default function ContactCurves() {
  const leftRef = useRef<SVGPathElement>(null);
  const rightRef = useRef<SVGPathElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    [leftRef.current, rightRef.current].forEach((path) => {
      if (!path) return;
      const len = path.getTotalLength();
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = reduce ? "0" : `${len}`;
      if (!reduce) {
        path.style.transition = "stroke-dashoffset 2s ease";
      }
    });

    if (!reduce) {
      // next frame -> trigger the draw
      requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
    } else {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    [leftRef.current, rightRef.current].forEach((path) => {
      if (path) path.style.strokeDashoffset = "0";
    });
  }, [ready]);

  return (
    <svg
      className="pointer-events-none absolute inset-x-0 top-0 h-[320px] w-full"
      viewBox="0 0 1280 320"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        ref={leftRef}
        d="M -40 80 C 280 40, 460 200, 640 150"
        fill="none"
        stroke="#FF7BAC"
        strokeWidth="1.5"
      />
      <path
        ref={rightRef}
        d="M 1320 90 C 1000 50, 820 210, 640 150"
        fill="none"
        stroke="#6CA8FF"
        strokeWidth="1.5"
      />
    </svg>
  );
}
