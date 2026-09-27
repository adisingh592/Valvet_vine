"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ShieldCheck, Sparkles, Store } from "lucide-react";

const MESSAGES = [
  "New Season Collection Live",
  "Discover styles from Myntra, AJIO, Amazon & more",
  "Fresh style guides every week",
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % MESSAGES.length), 5000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="border-b border-line/70 bg-cream text-[0.7rem] text-muted"
    >
      <div className="container-vv flex h-9 items-center justify-between gap-4">
        <p className="hidden items-center gap-1.5 md:flex">
          <Store aria-hidden className="size-3.5 text-mocha" />
          Shop via trusted partner retailers
        </p>

        <div className="relative grid flex-1 place-items-center md:flex-none" aria-live="polite">
          <AnimatePresence initial={false}>
            <motion.p
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="col-start-1 row-start-1 flex items-center gap-1.5 whitespace-nowrap text-ink/80"
            >
              <Sparkles aria-hidden className="size-3 text-gold" />
              {MESSAGES[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <p className="hidden items-center gap-1.5 lg:flex">
            <ShieldCheck aria-hidden className="size-3.5 text-mocha" />
            Easy returns &amp; secure payments with our partners
          </p>
          <label className="sr-only" htmlFor="region">
            Country and currency
          </label>
          <select
            id="region"
            defaultValue="IN"
            className="rounded-md border border-transparent bg-transparent py-0.5 pr-1 text-[0.7rem] text-ink hover:border-line focus:border-line"
          >
            <option value="IN">India · ₹ INR</option>
            <option value="soon" disabled>
              More regions coming soon
            </option>
          </select>
        </div>
      </div>
    </motion.div>
  );
}
