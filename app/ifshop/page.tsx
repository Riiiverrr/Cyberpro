import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IFshop — Coming Soon | Cyberpro",
  description: "IFshop is on its way. Coming soon.",
};

const STARS = [
  { top: "18%", left: "20%", size: 22, delay: "0s" },
  { top: "30%", left: "78%", size: 16, delay: "0.3s" },
  { top: "62%", left: "14%", size: 18, delay: "0.6s" },
  { top: "70%", left: "82%", size: 24, delay: "0.9s" },
  { top: "12%", left: "55%", size: 14, delay: "1.2s" },
  { top: "48%", left: "88%", size: 20, delay: "1.5s" },
  { top: "80%", left: "44%", size: 16, delay: "1.8s" },
];

export default function IFshopPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-[88px]">
      {/* twinkling + stars */}
      {STARS.map((s, i) => (
        <span
          key={i}
          aria-hidden
          className="pointer-events-none absolute animate-twinkle select-none font-bold text-ink"
          style={{
            top: s.top,
            left: s.left,
            fontSize: s.size,
            animationDelay: s.delay,
          }}
        >
          +
        </span>
      ))}

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* floating gift box */}
        <div className="animate-float text-[96px] leading-none md:text-[140px]" aria-hidden>
          🎁
        </div>
        <h1 className="mt-10 text-[40px] font-bold md:text-[64px]">
          Coming Soon..
        </h1>
        <p className="mt-4 max-w-md text-[16px] text-muted">
          IFshop is on its way. We're wrapping it up — check back soon.
        </p>
      </div>
    </div>
  );
}
