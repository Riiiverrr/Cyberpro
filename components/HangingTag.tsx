"use client";

import type { ReactNode } from "react";
import styles from "./HangingTag.module.css";

type HangingTagProps = {
  children: ReactNode;
  /** Initial hanging angle in degrees (negative = tilted left). */
  angle?: number;
  color?: string;
};

/**
 * A label that hangs at a tilted angle and swings to horizontal on hover
 * with a springy overshoot. On mobile it renders horizontal with no hover
 * rotation (handled in the CSS module via media query).
 */
export default function HangingTag({
  children,
  angle = -75,
  color = "#F4F4F4",
}: HangingTagProps) {
  return (
    <span className={styles.wrap}>
      <span className={styles.string} aria-hidden />
      <span
        className={styles.tag}
        style={
          {
            backgroundColor: color,
            "--angle": `${angle}deg`,
          } as React.CSSProperties
        }
      >
        {children}
      </span>
    </span>
  );
}
