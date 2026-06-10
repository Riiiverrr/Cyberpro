import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "public", "videos");

// Map the original (Chinese-named) source files to clean output names.
// Sources live in the project root alongside this app.
const MAP = [
  { match: "山海有灵", out: "shanhai-youling.mp4" },
  { match: "中堂龙舟", out: "zhongtang-longzhou.mp4" },
  { match: "HIV", out: "fangtan-hiv.mp4" },
];

function findSource(match) {
  const entries = readdirSync(ROOT);
  return entries.find((f) => f.includes(match) && f.endsWith(".mp4"));
}

function main() {
  if (!ffmpegPath) {
    console.error("ffmpeg-static binary not found. Run `npm install` first.");
    process.exit(1);
  }
  mkdirSync(OUT_DIR, { recursive: true });

  for (const { match, out } of MAP) {
    const src = findSource(match);
    if (!src) {
      console.warn(`! source not found for "${match}" — skipping`);
      continue;
    }
    const inPath = join(ROOT, src);
    const outPath = join(OUT_DIR, out);
    if (existsSync(outPath)) {
      console.log(`= ${out} already exists — skipping`);
      continue;
    }
    console.log(`> compressing ${src}\n    -> public/videos/${out}`);
    const args = [
      "-i", inPath,
      "-vf", "scale=-2:720",
      "-c:v", "libx264",
      "-preset", "medium",
      "-crf", "26",
      "-c:a", "aac",
      "-b:a", "128k",
      "-movflags", "+faststart",
      "-y", outPath,
    ];
    const res = spawnSync(ffmpegPath, args, { stdio: "inherit" });
    if (res.status !== 0) {
      console.error(`! ffmpeg failed for ${src} (exit ${res.status})`);
    } else {
      console.log(`  done: ${out}`);
    }
  }
  console.log("\nAll done. Compressed videos are in public/videos/");
}

main();
