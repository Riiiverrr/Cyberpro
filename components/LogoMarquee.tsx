"use client";

// Real brand logos (PNGs supplied in the project's "home 页图片/logo 图" folder,
// copied into /public/home/logos). Each logo keeps its native aspect ratio —
// only the height is set, width stays `auto`, so nothing is stretched. Heights
// are tuned per-logo so the optically-different marks read at an even weight.
const LOGOS = [
  { src: "/home/logos/transpio.png", alt: "Transpio", h: 30 },
  { src: "/home/logos/nationalpark.png", alt: "National Geographic", h: 24 },
  { src: "/home/logos/bnct.png", alt: "BNCT-HUB", h: 40 },
  { src: "/home/logos/zoom.png", alt: "Zoom", h: 22 },
  { src: "/home/logos/ms.png", alt: "Microsoft", h: 26 },
  { src: "/home/logos/peoplesdaily.png", alt: "People's Daily", h: 28 },
  { src: "/home/logos/phibi.png", alt: "Phibi", h: 20 },
  { src: "/home/logos/bokk.png", alt: "Bokk", h: 30 },
];

/**
 * Seamless marquee: the logo list is duplicated and the track translates
 * -50% over 22s linear infinite. Hover pauses. Edges fade via a mask. Each
 * logo sits at grayscale/50% opacity and lights up on hover.
 */
export default function LogoMarquee() {
  const track = [...LOGOS, ...LOGOS];

  return (
    <div
      className="logo-wrapper w-full overflow-hidden py-8"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <div className="logo-track flex w-max items-center gap-[67px] animate-marquee hover:[animation-play-state:paused]">
        {track.map((logo, i) => (
          <span
            key={`${logo.alt}-${i}`}
            className="logo-item flex shrink-0 items-center transition-[filter] duration-300"
            style={{ filter: "grayscale(1) opacity(0.5)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "grayscale(0) opacity(1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "grayscale(1) opacity(0.5)";
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={logo.alt}
              style={{ height: logo.h }}
              className="w-auto select-none"
              draggable={false}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
