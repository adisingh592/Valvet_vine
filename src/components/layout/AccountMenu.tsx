"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Heart, User } from "lucide-react";
import { cn } from "@/lib/format";

/** Accounts aren't built yet — this explains that and points to the device wishlist. */
export function AccountMenu({ className, buttonClassName }: { className?: string; buttonClassName?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Account"
        aria-expanded={open}
        aria-haspopup="dialog"
        className={buttonClassName}
      >
        <User aria-hidden className="size-5" strokeWidth={1.75} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Account"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-[calc(100%+10px)] z-50 w-72 rounded-2xl border border-line bg-white p-5 shadow-lift"
          >
            <p className="font-serif text-lg text-ink">Accounts are coming soon</p>
            <p className="mt-1.5 text-sm text-muted">
              For now, anything you save is kept on this device — no sign-in needed.
            </p>
            <Link
              href="/wishlist"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-blush"
            >
              <Heart aria-hidden className="size-4" />
              View saved items
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
