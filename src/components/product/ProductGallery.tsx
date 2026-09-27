"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MORPH_TARGET_SIZES, Morph } from "@/components/ui/Morph";
import { cn } from "@/lib/format";
import { DURATION, EASE_OUT } from "@/lib/motion";
import type { Product } from "@/types";

/**
 * Main image is the morph target for the product card image. Switching
 * thumbnails crossfades (300ms) while the new image settles from 1.02 → 1.
 */
export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const images = product.gallery;
  const altFor = (i: number) => (i === 0 ? `${product.name} by ${product.brand}` : `${product.name} — detail view ${i + 1}`);
  const go = (delta: number) => setActive((i) => (i + delta + images.length) % images.length);

  return (
    <div className="flex flex-col-reverse gap-3 lg:grid lg:grid-cols-[76px_minmax(0,1fr)] lg:gap-4">
      <ul className="no-scrollbar flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible" aria-label="Product images">
        {images.map((src, i) => (
          <li key={src} className="shrink-0">
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              aria-current={i === active}
              className={cn(
                "skeleton relative block aspect-[4/5] w-16 overflow-hidden rounded-xl ring-offset-2 ring-offset-ivory transition-[box-shadow,opacity] duration-200 lg:w-full",
                i === active ? "ring-2 ring-velvet" : "opacity-70 ring-1 ring-line hover:opacity-100",
              )}
            >
              <Image src={src} alt="" fill sizes="80px" loading="eager" className="object-cover" />
            </button>
          </li>
        ))}
      </ul>

      <div className="skeleton relative aspect-[4/5] overflow-hidden rounded-[var(--radius-hero)] shadow-soft">
        <Morph kind="product" slug={product.slug}>
          <div className="absolute inset-0 overflow-hidden rounded-[var(--radius-hero)]">
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 0.3, ease: "easeOut" },
                  scale: { duration: DURATION.medium, ease: EASE_OUT },
                }}
              >
                <Image
                  src={images[active]}
                  alt={altFor(active)}
                  fill
                  preload={active === 0}
                  sizes={MORPH_TARGET_SIZES.product}
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </Morph>

        {images.length > 1 && (
          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="inline-flex size-9 items-center justify-center rounded-full bg-white/90 text-ink shadow-soft backdrop-blur transition-colors hover:bg-white"
            >
              <ChevronLeft aria-hidden className="size-4" />
            </button>
            <span className="rounded-full bg-white/85 px-2.5 py-1 text-[0.68rem] font-medium text-ink backdrop-blur" aria-live="polite">
              {active + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="inline-flex size-9 items-center justify-center rounded-full bg-white/90 text-ink shadow-soft backdrop-blur transition-colors hover:bg-white"
            >
              <ChevronRight aria-hidden className="size-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
