"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useMedia";

const WORDS = [
  { text: "vision", color: "#AEF17E" },
  { text: "product", color: "#299DFF" },
  { text: "story", color: "#9DA4FF" },
];

const TYPE_MS = 90; // per character while typing
const ERASE_MS = 45; // per character while erasing
const HOLD_MS = 1400; // dwell once fully typed
const GAP_MS = 350; // pause after erasing, before next word

/**
 * Typewriter effect for the cycling colored word. Each word types in one
 * character at a time, holds, erases, then the next word types in. A blinking
 * caret trails the text. Reduced-motion users get the static first word.
 */
export default function WordRoller() {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "erasing">("typing");
  const reduced = useReducedMotion();

  const current = WORDS[wordIndex];

  useEffect(() => {
    if (reduced) return;
    let t: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.text.length) {
        t = setTimeout(
          () => setText(current.text.slice(0, text.length + 1)),
          TYPE_MS
        );
      } else {
        t = setTimeout(() => setPhase("holding"), HOLD_MS);
      }
    } else if (phase === "holding") {
      t = setTimeout(() => setPhase("erasing"), 0);
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(current.text.slice(0, text.length - 1)), ERASE_MS);
      } else {
        t = setTimeout(() => {
          setWordIndex((p) => (p + 1) % WORDS.length);
          setPhase("typing");
        }, GAP_MS);
      }
    }

    return () => clearTimeout(t);
  }, [text, phase, current.text, reduced]);

  if (reduced) {
    return (
      <span style={{ color: current.color }} className="inline-block">
        {current.text}
      </span>
    );
  }

  return (
    <span className="inline-block whitespace-nowrap" style={{ color: current.color }}>
      {text}
      <span className="cursor-caret" aria-hidden>
        |
      </span>
    </span>
  );
}
