"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Small blend-difference dot cursor that grows into a hollow ring over
 * clickable elements. Disabled when the pointer is coarse (touch) or the
 * user prefers reduced motion.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    setActive(true);
    document.body.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      const el = dotRef.current;
      if (el) {
        el.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
      const target = e.target as HTMLElement | null;
      setHovering(
        !!target?.closest('a, button, [role="button"], input, textarea, select, label')
      );
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!active) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full transition-[width,height,background-color,border-width] duration-200 ease-out"
      style={{
        mixBlendMode: "difference",
        width: hovering ? 32 : 8,
        height: hovering ? 32 : 8,
        backgroundColor: hovering ? "transparent" : "#fff",
        border: hovering ? "1.5px solid #fff" : "0px solid #fff",
      }}
    />
  );
}
