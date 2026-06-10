"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useIsMobile, useReducedMotion } from "@/lib/useMedia";

type ScrollRevealProps = {
  children: ReactNode;
  /** Index for stagger delay (0.1s per step). */
  index?: number;
  /** Override the vertical travel distance. */
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Generic scroll-reveal wrapper.
 * initial { opacity: 0, y: 40 } -> { opacity: 1, y: 0 }, 0.6s ease [0.22,1,0.36,1].
 * Mobile reduces travel from 40px -> 20px; reduced-motion disables it entirely.
 */
export default function ScrollReveal({
  children,
  index = 0,
  y,
  className,
  as = "div",
}: ScrollRevealProps) {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const MotionTag = motion[as];

  const travel = y ?? (mobile ? 20 : 40);

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: travel }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      }}
    >
      {children}
    </MotionTag>
  );
}
