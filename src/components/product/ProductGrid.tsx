"use client";

import { motion } from "motion/react";
import { ProductCard } from "./ProductCard";
import { DURATION, EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/format";
import type { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  className?: string;
  /** Stagger the first visible cards in (50ms apart). */
  stagger?: boolean;
  morph?: boolean;
  priorityCount?: number;
}

const STAGGERED = 8;

export function ProductGrid({ products, className, stagger = true, morph = true, priorityCount = 0 }: ProductGridProps) {
  return (
    <ul className={cn("grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4", className)}>
      {products.map((product, index) => (
        <motion.li
          key={product.id}
          initial={stagger ? { opacity: 0, y: 12 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: DURATION.normal,
            ease: EASE_OUT,
            delay: index < STAGGERED ? index * 0.05 : 0,
          }}
        >
          <ProductCard product={product} morph={morph} priority={index < priorityCount} />
        </motion.li>
      ))}
    </ul>
  );
}
