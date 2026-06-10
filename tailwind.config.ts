import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#000000",
        ink: "#FFFFFF",
        // Chip / button label tint from Figma (#e8e8f6)
        chipink: "#E8E8F6",
        muted: "rgba(255,255,255,0.5)",
        faint: "rgba(255,255,255,0.3)",
        line: "rgba(255,255,255,0.12)",
        card: "rgba(0,0,0,0.2)",
        // Hero word-roller accents (per spec)
        accent: {
          green: "#AEF17E",
          blue: "#299DFF",
          purple: "#9DA4FF",
        },
      },
      fontFamily: {
        mono: ["var(--font-courier-prime)", "Courier New", "monospace"],
      },
      maxWidth: {
        shell: "1440px",
      },
      borderRadius: {
        chip: "49.282px",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
        float: "float 3s ease-in-out infinite",
        twinkle: "twinkle 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
