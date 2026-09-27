"use client";

import { motion } from "motion/react";
import { DURATION } from "@/lib/motion";

interface EmptyStateProps {
  title: string;
  message: string;
  action?: React.ReactNode;
}

/** Friendly empty result with a small hanger illustration. */
export function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: DURATION.normal }}
      className="flex flex-col items-center rounded-[var(--radius-card)] border border-dashed border-line bg-white/60 px-6 py-14 text-center"
    >
      <svg aria-hidden viewBox="0 0 120 80" className="mb-5 h-20 w-28 text-rose" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M60 22c0-4 3-6 6-6s6 2.5 6 6c0 4-4 5-8 8L14 58c-3 2-2 6 2 6h88c4 0 5-4 2-6L64 30" />
        <circle cx="96" cy="20" r="3" className="text-gold" stroke="currentColor" />
        <path d="M22 18l3 3m0-3l-3 3" className="text-gold" stroke="currentColor" />
      </svg>
      <h3 className="font-serif text-2xl text-ink">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted">{message}</p>
      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  );
}
