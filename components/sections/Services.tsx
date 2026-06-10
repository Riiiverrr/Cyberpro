import ScrollReveal from "@/components/ScrollReveal";

// 2x2 grid order matches Figma: Presence | Panel  /  Product | Platform.
// Each body splits into a colored lead clause (accent blue) + a white tail,
// matching the two-tone description text in the design.
const SERVICES = [
  {
    title: "Presence",
    lead: "Websites, brand sites, and landing pages.",
    rest: " Built to communicate clearly and convert naturally.",
  },
  {
    title: "Panel",
    lead: "Internal systems, SaaS, and web applications.",
    rest: " Designed for clarity, scalability, and daily efficiency.",
  },
  {
    title: "Product",
    lead: "Mini programs and lightweight web products.",
    rest: " Fast, intuitive experiences from idea to launch.",
  },
  {
    title: "Platform",
    lead: "Complex B2B / B2C platforms.",
    rest: " Structured systems for products that grow and evolve.",
  },
];

/**
 * "We don't just make things look good / We make them work" — a 2x2 service
 * grid split by a dashed cross (one horizontal + one vertical divider),
 * matching the Figma `Group 948` lines.
 */
export default function Services() {
  return (
    <section className="mx-auto max-w-shell px-6 py-28 md:px-12">
      <ScrollReveal>
        <h2 className="text-center text-[32px] leading-[1.3] text-ink">
          We don&apos;t just make things look good
          <br />
          We make them work
        </h2>
      </ScrollReveal>

      <div className="relative mx-auto mt-20 max-w-[1100px]">
        {/* cross dividers (Figma Group 948: Line 43 horizontal + Line 44
            vertical) — dashed 4/4 strokes, 0.6px, each dash filled with a
            linear gradient #000 → #FFF 50.48% → #000 (black ends fade into
            the dark page, leaving white dashes brightest at the center) */}
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 md:block"
          style={{
            height: "0.6px",
            background: "linear-gradient(90deg, #000 0%, #FFF 50.48%, #000 100%)",
            WebkitMaskImage:
              "repeating-linear-gradient(90deg, #000 0 4px, transparent 4px 8px)",
            maskImage:
              "repeating-linear-gradient(90deg, #000 0 4px, transparent 4px 8px)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden -translate-x-1/2 md:block"
          style={{
            width: "0.6px",
            background: "linear-gradient(180deg, #000 0%, #FFF 50.48%, #000 100%)",
            WebkitMaskImage:
              "repeating-linear-gradient(180deg, #000 0 4px, transparent 4px 8px)",
            maskImage:
              "repeating-linear-gradient(180deg, #000 0 4px, transparent 4px 8px)",
          }}
          aria-hidden
        />

        <div className="grid grid-cols-1 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <ScrollReveal key={s.title} index={i}>
              <article className="px-4 py-10 md:px-16 md:py-14">
                <h3 className="text-[24px] leading-[1.2] text-ink">{s.title}</h3>
                <p className="mt-5 max-w-[460px] text-[18px] leading-[1.6]">
                  <span style={{ color: "#299DFF" }}>{s.lead}</span>
                  <span className="text-ink">{s.rest}</span>
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
