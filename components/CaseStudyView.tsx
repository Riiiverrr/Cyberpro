import ScrollReveal from "@/components/ScrollReveal";
import type { CaseStudy } from "@/lib/case-studies-types";

/** Shared long-form layout for a Gallery case-study detail page. */
export default function CaseStudyView({ study }: { study: CaseStudy }) {
  return (
    <article className="pt-[88px]">
      {/* Hero */}
      <header className="mx-auto max-w-shell px-6 py-24 md:px-12">
        <div className="flex flex-wrap gap-3">
          {study.tags.map((t) => (
            <span key={t} className="text-[13px] text-muted">
              {t}
            </span>
          ))}
        </div>
        <h1
          className="mt-10 text-[64px] font-bold leading-none md:text-[120px]"
          style={{ color: study.accent }}
        >
          {study.name}
        </h1>
        <p className="mt-4 text-[15px] text-faint">{study.industry}</p>

        <div className="mt-14 grid grid-cols-1 gap-8 border-t border-line pt-10 md:grid-cols-3">
          <Meta label="CORE FEATURES" value={study.core} />
          <Meta label="MISSION" value={study.mission} />
          <Meta label="DELIVERABLES" value={study.deliverables} />
        </div>
      </header>

      {/* Intro */}
      <section className="mx-auto max-w-shell px-6 pb-20 md:px-12">
        <ScrollReveal>
          <p className="text-[12px] uppercase tracking-[0.3em] text-faint">
            Introduction
          </p>
        </ScrollReveal>
        <ScrollReveal index={1}>
          <p className="mt-6 max-w-3xl text-[24px] leading-relaxed md:text-[34px]">
            {study.intro}
          </p>
        </ScrollReveal>
        {study.introExtra && (
          <ScrollReveal index={2}>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-muted">
              {study.introExtra}
            </p>
          </ScrollReveal>
        )}
        {study.quote && (
          <ScrollReveal index={3}>
            <figure className="mt-12 max-w-2xl border-l-2 border-line pl-6">
              <blockquote className="text-[20px] italic leading-relaxed">
                {study.quote.text}
              </blockquote>
              <figcaption className="mt-3 text-[14px] text-faint">
                — {study.quote.author}
              </figcaption>
            </figure>
          </ScrollReveal>
        )}
      </section>

      {/* Features */}
      <section className="mx-auto max-w-shell space-y-px overflow-hidden border-y border-line bg-line px-0 md:px-0">
        {study.features.map((f, i) => (
          <ScrollReveal key={f.label} index={i % 2}>
            <div className="bg-bg px-6 py-20 md:px-12">
              <p
                className="text-[13px] font-bold uppercase tracking-widest"
                style={{ color: study.accent }}
              >
                {f.label}
              </p>
              <h2 className="mt-4 max-w-3xl text-[28px] font-bold leading-tight md:text-[44px]">
                {f.heading}
              </h2>
              <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-muted">
                {f.body}
              </p>
              <div
                className="mt-10 aspect-[16/7] w-full rounded-2xl border border-line"
                style={{
                  background: `linear-gradient(135deg, ${study.accent}14, transparent)`,
                }}
                aria-hidden
              />
            </div>
          </ScrollReveal>
        ))}
      </section>

      {study.note && (
        <p className="mx-auto max-w-shell px-6 py-14 text-center text-[14px] text-faint md:px-12">
          {study.note}
        </p>
      )}
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[12px] uppercase tracking-widest text-faint">{label}</p>
      <p className="mt-2 text-[15px]">{value}</p>
    </div>
  );
}
