"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ContactCurves from "@/components/ContactCurves";
import { useReducedMotion } from "@/lib/useMedia";

const REASONS = [
  "New project",
  "Partnership",
  "Just saying hi",
  "Other",
];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[13px] text-muted">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "rounded-lg border border-line bg-transparent px-4 py-3 text-[15px] text-ink outline-none transition-all duration-200 placeholder:text-faint focus:border-white focus:shadow-[0_0_0_2px_rgba(255,255,255,0.1)]";

export default function ContactPage() {
  const reduced = useReducedMotion();
  const [sent, setSent] = useState(false);

  const cardAnim = reduced
    ? {}
    : {
        initial: { y: 30, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.5, delay: 0.3, ease: "easeOut" as const },
      };

  return (
    <div className="relative min-h-screen px-6 pb-32 pt-[140px] md:px-12">
      <ContactCurves />

      <div className="relative z-10 mx-auto max-w-shell">
        <p className="text-[13px] uppercase tracking-[0.3em] text-faint">
          We're here to help
        </p>
        <h1 className="mt-4 max-w-2xl text-[36px] font-bold leading-tight md:text-[56px]">
          Let's start with a conversation :)
        </h1>
        <p className="mt-4 max-w-xl text-[16px] text-muted">
          Got questions about Cyberpro or your plans? Send us a message and
          we'll reply soon.
        </p>

        <motion.form
          {...cardAnim}
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="mt-12 max-w-3xl rounded-2xl border border-line bg-card p-8 md:p-10"
        >
          <p className="mb-8 text-[13px] text-faint">
            Write us a message · Recipient: info@cyberpro.com
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field label="Full name*">
              <input required className={inputCls} placeholder="Your name" />
            </Field>
            <Field label="Email*">
              <input
                required
                type="email"
                className={inputCls}
                placeholder="you@email.com"
              />
            </Field>
            <Field label="Number">
              <input className={inputCls} placeholder="Optional" />
            </Field>
            <Field label="Reason for contact*">
              <select required className={inputCls} defaultValue="">
                <option value="" disabled>
                  Select a reason
                </option>
                {REASONS.map((r) => (
                  <option key={r} value={r} className="bg-card">
                    {r}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="mt-6">
            <Field label="How can we help you?*">
              <textarea
                required
                rows={5}
                className={`${inputCls} resize-none`}
                placeholder="Tell us about your project"
              />
            </Field>
          </div>

          <button
            type="submit"
            className="mt-8 rounded-full bg-white px-8 py-3 text-[15px] font-bold text-black transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,255,255,0.2)] active:translate-y-0 active:shadow-none"
          >
            {sent ? "Sent ✓" : "Send"}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
