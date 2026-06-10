// Video editing showcase — maps to the compressed files in /public/videos.
// Source files live in ~/Desktop/cyberpro for cc (originals) and are
// transcoded by scripts/compress-videos.mjs.

export type VideoItem = {
  id: string;
  title: string;
  tags: string[];
  description: string;
  src: string;
  poster: string;
  /** Tag labels shown on the card itself (from the Figma video cards). */
  cardTags: string[];
};

export const VIDEOS: VideoItem[] = [
  {
    id: "shanhai",
    title: "山海有灵",
    tags: ["自然", "宣传片", "混剪"],
    description:
      "国家地理 2024 中国野生生物影像年赛颁奖礼宣传片，主题「山海有灵」。",
    src: "/videos/shanhai-youling.mp4",
    poster: "/home/videos/brand-films.png",
    cardTags: ["Brand Films", "Free-form Editing"],
  },
  {
    id: "hiv",
    title: "了解 HIV",
    tags: ["访谈", "知识科普", "健康"],
    description: "四川大学华西第二医院妇产科主任医师讲解 HIV 知识。",
    src: "/videos/fangtan-hiv.mp4",
    poster: "/home/videos/interview.png",
    cardTags: ["Interview Series"],
  },
  {
    id: "longzhou",
    title: "中堂龙舟",
    tags: ["短视频", "传统文化", "建模", "知识讲解"],
    description: "介绍中国传统龙舟——中堂龙舟的结构与制作方法。",
    src: "/videos/zhongtang-longzhou.mp4",
    poster: "/home/videos/motion-graphics.png",
    cardTags: ["Motion Graphics"],
  },
];

export const TESTIMONIALS = [
  "\"AI can generate, but it can't judge. Having Cyberpro's team meant someone with real taste was making the final call — every time.\"",
  "\"I never had to over-explain myself. They got what I was trying to build before I even finished talking, and that saved us weeks.\"",
  "\"They didn't just design interfaces, they improved how users actually moved through the product. The experience became cleaner, faster, and easier to trust.\"",
  "\"What stood out wasn't just the visual quality, but the clarity behind every decision. Working with Cyberpro felt collaborative from day one.\"",
  "\"I came in with a clear brief. They came back with something better. I've learned to leave room for their ideas — it always pays off.\"",
];
