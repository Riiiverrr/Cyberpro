"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

type VideoModalProps = {
  open: boolean;
  src: string;
  title?: string;
  onClose: () => void;
};

/**
 * Fullscreen video popup. Overlay fades in (200ms); content scales
 * 0.9 -> 1 + fades (250ms). Closing reverses, and the <video> element
 * unmounts on exit so playback stops. Esc and overlay click close it.
 */
export default function VideoModal({ open, src, title, onClose }: VideoModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={title ?? "Video player"}
        >
          <motion.div
            className="relative w-full max-w-5xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close video"
              className="absolute -top-12 right-0 text-3xl leading-none text-white transition-transform duration-200 hover:rotate-90"
            >
              ×
            </button>
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
              <video
                src={src}
                controls
                autoPlay
                playsInline
                className="h-full w-full"
              />
            </div>
            {title && (
              <p className="mt-4 text-center text-[14px] text-muted">{title}</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
