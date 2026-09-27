"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/format";
import { OCCASION_LABELS } from "@/lib/filters";
import type { Product } from "@/types";

export function ProductTabs({ product }: { product: Product }) {
  const id = useId();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tabs = [
    {
      label: "Description",
      content: (
        <div className="space-y-3">
          <p>{product.description}</p>
          <dl className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
            <div className="flex gap-2">
              <dt className="text-muted">Category:</dt>
              <dd>{product.subcategory}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted">Brand:</dt>
              <dd>{product.brand}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted">Occasion:</dt>
              <dd>{product.occasions.map((o) => OCCASION_LABELS[o]).join(", ")}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted">Colours:</dt>
              <dd>{product.colors.map((c) => c.name).join(", ")}</dd>
            </div>
          </dl>
        </div>
      ),
    },
    {
      label: "Details & Care",
      content: (
        <ul className="list-disc space-y-1 pl-5 marker:text-rose">
          {product.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      ),
    },
    {
      label: "Shipping & Returns",
      content: (
        <p>
          Velvet Vine doesn&apos;t sell or ship products. Delivery, returns and payments are handled by the retailer you
          buy from — check their policies on the product page before you order.
        </p>
      ),
    },
  ];

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (index + delta + tabs.length) % tabs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Product information" className="no-scrollbar flex gap-6 overflow-x-auto border-b border-line">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            id={`${id}-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls={`${id}-panel`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              "relative shrink-0 pb-3 text-sm transition-colors duration-200",
              i === active ? "font-medium text-ink" : "text-muted hover:text-ink",
            )}
          >
            {tab.label}
            {i === active && (
              <motion.span layoutId={`${id}-underline`} className="absolute inset-x-0 -bottom-px h-0.5 bg-velvet" />
            )}
          </button>
        ))}
      </div>
      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        className="relative pt-5 text-sm leading-relaxed text-ink/80"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {tabs[active].content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
