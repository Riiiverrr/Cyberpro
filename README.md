# Cyberpro Website

Production-ready implementation of the Cyberpro brand site, translated 1:1 from the Figma design.

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** + **CSS Modules** (for the chip-stagger and hanging-tag effects)
- **Framer Motion** (page transitions, scroll reveal, word roller, before/after slide-in)
- Hand-written **Canvas** particle field for the hero
- **Courier Prime** (via `next/font/google`)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Videos

The Video Editing section streams three clips from `public/videos/`. The
originals (large, Chinese-named) live in the project root; the build script
transcodes them to ~720p web-optimized H.264:

```bash
npm run compress:videos
```

This uses the bundled `ffmpeg-static` binary — no system ffmpeg or Homebrew
required. Output files (`shanhai-youling.mp4`, `zhongtang-longzhou.mp4`,
`fangtan-hiv.mp4`) are git-ignored. Re-run after adding/replacing originals.

## Pages

| Route             | Content                                              |
| ----------------- | ---------------------------------------------------- |
| `/`               | Home — hero, marquee, services, projects, Olivei, video, before/after, testimonials |
| `/gallery`        | Project index                                        |
| `/gallery/[slug]` | Case studies: `bokk`, `phibi`, `bnct`                |
| `/contact`        | Contact form with animated SVG curves                |
| `/ifshop`         | Coming Soon                                          |

`Olivei` in the nav is an external link (no dedicated page, per the design).

## Animation map

Component-level animations live in `components/`:

- `HeroBG.tsx` — Canvas particle field (radial drift + mouse repulse; 60 on mobile)
- `WordRoller.tsx` — cycling colored word (vision / product / story)
- `LogoMarquee.tsx` — seamless marquee, hover-pause, edge fade
- `ProjectCard.tsx` — card lift + staggered chip float (CSS module)
- `VideoModal.tsx` — scale-in popup, rotating close, unmounts video on exit
- `HangingTag.tsx` — hanging tags that swing horizontal on hover (spring)
- `ScrollReveal.tsx` — site-wide reveal wrapper with stagger
- `ContactCurves.tsx` — stroke-dashoffset draw-in
- `CustomCursor.tsx` — blend-difference dot that grows over clickables
- `PageTransition.tsx` — route fade/rise via AnimatePresence

## Accessibility & performance

- `prefers-reduced-motion` disables every transition/animation (global CSS + per-component guards).
- Mobile reduces particle count, scroll-reveal travel, and rests hanging tags horizontal.
- Custom cursor only activates on fine pointers.
