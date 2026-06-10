import type { ReactNode } from "react";

/**
 * Glass chip — the site-wide pill used across Who We Are, Olivei, video tags,
 * and the before/after rows. Per the Figma spec: transparent fill, a white
 * gradient stroke (100% -> 20% top to bottom), a soft white outer glow, and
 * a small leading icon. Label text is tinted #E8E8F6.
 *
 * Visual styling lives in `.glass-chip` / `.glass-chip__icon` in globals.css.
 */
export default function GlassChip({
  children,
  icon = true,
  className = "",
  style,
}: {
  children: ReactNode;
  icon?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={`glass-chip px-[24px] py-[11px] text-[20px] leading-[30.883px] ${className}`}
      style={style}
    >
      {icon && <span className="glass-chip__icon" aria-hidden />}
      <span>{children}</span>
    </span>
  );
}
