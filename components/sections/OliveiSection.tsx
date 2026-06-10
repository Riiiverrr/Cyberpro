import ScrollReveal from "@/components/ScrollReveal";
import GlassChip from "@/components/GlassChip";

const TAGS = ["UI/UX", "Brand Identity", "Marketing", "Visual Strategy"];

/**
 * Olivei — the in-house design studio block. Full-bleed olive photo behind an
 * ~83% black overlay. Per the Figma layout: the Olivei wordmark is centered in
 * the frame, while the descriptive line and the four capability chips are
 * anchored to the bottom-left of the content shell.
 */
export default function OliveiSection() {
  return (
    <section className="relative isolate flex min-h-[760px] flex-col overflow-hidden">
      {/* full-bleed background photo + dark overlay */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/home/olivei-bg.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/[0.83]" />
      </div>

      {/* centered wordmark — Figma: 565px logo in a 1920 frame (~29.4% of
          width), vertical center ~42% down. Scale with viewport, cap at 565px. */}
      <div className="flex flex-1 items-center justify-center px-6 pt-24">
        <ScrollReveal>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/home/olivei-logo.png"
            alt="Olivei"
            className="mx-auto w-[29.4vw] max-w-[565px] select-none"
            draggable={false}
          />
        </ScrollReveal>
      </div>

      {/* bottom-left: description + capability chips */}
      <div className="mx-auto w-full max-w-shell px-6 pb-16 md:px-12">
        <ScrollReveal index={1}>
          <p className="max-w-[1100px] text-left text-[20px] leading-[1.5] text-ink md:text-[24px]">
            Our in-house design studio
            <br />
            where strategy meets craft, and every pixel has a purpose.
          </p>
        </ScrollReveal>

        <ScrollReveal index={2}>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            {TAGS.map((t) => (
              <GlassChip key={t}>{t}</GlassChip>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
