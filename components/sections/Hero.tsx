"use client";

import HeroBG from "@/components/HeroBG";
import WordRoller from "@/components/WordRoller";

export default function Hero() {
  return (
    <section className="relative flex min-h-[78vh] items-center justify-center overflow-hidden pt-[88px]">
      <HeroBG />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h1 className="text-[28px] leading-[1.35] text-ink md:text-[32px]">
          The studio behind your next <WordRoller />
        </h1>
        <p className="mt-2 text-[28px] leading-[1.35] text-ink md:text-[32px]">
          One team. End to end.
        </p>
      </div>
    </section>
  );
}
