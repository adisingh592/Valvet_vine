"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/format";
import type { Product } from "@/types";

export interface TrendingTab {
  id: string;
  label: string;
  products: Product[];
}

export function TrendingNow({ tabs }: { tabs: TrendingTab[] }) {
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <section aria-labelledby="trending-title" className="container-vv mt-14 sm:mt-20">
      <SectionHeading
        id="trending-title"
        title={
          <span className="inline-flex items-center gap-2">
            Trending Now <Heart aria-hidden strokeWidth={1.25} className="size-6 text-velvet/70" />
          </span>
        }
        subtitle="Most-loved styles from top brands"
        action={{ label: "View all", href: "/new-in" }}
        className="mb-5"
      />

      <div role="tablist" aria-label="Filter trending products" className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        {tabs.map((tab) => {
          const selected = tab.id === current.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="trending-panel"
              onClick={() => setActive(tab.id)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-1.5 text-xs font-medium transition-[background-color,border-color,color] duration-200",
                selected
                  ? "border-velvet bg-velvet text-white"
                  : "border-line bg-white/70 text-ink/80 hover:border-rose hover:text-ink",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div id="trending-panel" role="tabpanel" aria-label={current.label}>
        <ProductGrid key={current.id} products={current.products} className="lg:grid-cols-4" />
      </div>
    </section>
  );
}
