import ScrollReveal from "@/components/ScrollReveal";
import GlassChip from "@/components/GlassChip";

const ROW_ONE = ["AI-native", "Experience First", "Clean Code", "Full Stack"];
const ROW_TWO = ["Craft-led", "On Air", "Visual Story"];

/** Per-tag icon accent colors, taken from the Figma `Union` fills (node 1:139). */
const CHIP_ICON: Record<string, string> = {
  "AI-native": "#8BF6FF",
  "Experience First": "#AEF17E",
  "Clean Code": "#299DFF",
  "Full Stack": "#0062FB",
  "Craft-led": "#FFF9CD",
  "On Air": "#F594E2",
  "Visual Story": "#9DA4FF",
};

/**
 * "Who We Are" — heading, descriptive paragraph, two centered rows of glass
 * chips, and a soft decorative curve running behind the content (matching the
 * Figma `LINE` vectors).
 */
export default function Intro() {
  return (
    <section className="relative overflow-hidden px-6 py-28 md:px-12">
      {/* decorative gradient curve (Figma: LINE / Vector 4 + 5) — the exact
          dev-mode path + multi-stop gradient, with a soft blur glow underlay.
          In the design the curve sits in the upper-middle of the section
          (center ≈36% of height), weaving behind the heading + description.
          The SVG keeps its native 1914×269 aspect ratio so it scales
          uniformly — a fixed height would vertically stretch the arc on
          narrower viewports and distort the curvature. */}
      <svg
        className="pointer-events-none absolute inset-x-0 top-[36%] mx-auto aspect-[1914/269] w-full max-w-[1914px] -translate-y-1/2"
        viewBox="0 0 1914.26 269.002"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="whoCurve" x1="10.47" y1="133.1" x2="1903.88" y2="133.1" gradientUnits="userSpaceOnUse">
            <stop offset="0.0096" stopColor="#000000" />
            <stop offset="0.077" stopColor="#0062FB" />
            <stop offset="0.173" stopColor="#299DFF" />
            <stop offset="0.284" stopColor="#4AD5FF" />
            <stop offset="0.399" stopColor="#8BF6FF" />
            <stop offset="0.534" stopColor="#9DA4FF" />
            <stop offset="0.654" stopColor="#F594E2" />
            <stop offset="0.755" stopColor="#FFF9CD" />
            <stop offset="0.861" stopColor="#AEF17E" />
            <stop offset="1" stopColor="#000000" />
          </linearGradient>
          <filter id="whoCurveBlur" x="0" y="0" width="1914.26" height="269.002" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="2.56" />
          </filter>
        </defs>
        <path
          d="M10.4747 153.024C118.285 80.6502 385.534 -43.2382 614.177 36.5042C899.981 136.182 1088.92 348.135 1464.78 216.383C1765.47 110.981 1910.76 186.085 1903.29 237.898"
          stroke="url(#whoCurve)"
          strokeWidth="0.986"
          filter="url(#whoCurveBlur)"
        />
        <path
          d="M10.4747 153.024C118.285 80.6502 385.534 -43.2382 614.177 36.5042C899.981 136.182 1088.92 348.135 1464.78 216.383C1765.47 110.981 1910.76 186.085 1903.29 237.898"
          stroke="url(#whoCurve)"
          strokeWidth="0.986"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-shell text-center">
        <ScrollReveal>
          <h2 className="text-[32px] leading-[1] text-ink">Who We Are</h2>
        </ScrollReveal>
        <ScrollReveal index={1}>
          <p className="mx-auto mt-10 max-w-[857.5px] text-[24px] leading-[1.2] text-ink">
            We don&apos;t just deliver services. We build brands, ship products,
            and create things we&apos;re proud to put our name on, whether
            that&apos;s yours or ours.
          </p>
        </ScrollReveal>

        <ScrollReveal index={2}>
          <div className="mt-[95px] flex flex-col items-center gap-6">
            <div className="flex flex-wrap items-center justify-center gap-6">
              {ROW_ONE.map((t) => (
                <GlassChip
                  key={t}
                  style={{ "--chip-icon": CHIP_ICON[t] } as React.CSSProperties}
                >
                  {t}
                </GlassChip>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {ROW_TWO.map((t) => (
                <GlassChip
                  key={t}
                  style={{ "--chip-icon": CHIP_ICON[t] } as React.CSSProperties}
                >
                  {t}
                </GlassChip>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
