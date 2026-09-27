"use client";

import { useMemo } from "react";
import { useWishlist } from "@/components/providers/WishlistProvider";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getProductBySlug } from "@/lib/catalog";
import type { Product } from "@/types";

export function WishlistView() {
  const { slugs, ready, clear } = useWishlist();
  const products = useMemo(
    () => slugs.map((slug) => getProductBySlug(slug)).filter((p): p is Product => Boolean(p)),
    [slugs],
  );

  if (!ready) return <ProductGridSkeleton count={4} />;

  if (products.length === 0) {
    return (
      <EmptyState
        title="Nothing saved yet"
        message="Tap the heart on any product to keep it here. Your saved items stay on this device."
        action={<ButtonLink href="/new-in">Discover new arrivals</ButtonLink>}
      />
    );
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-muted">
          <span className="font-medium text-ink">{products.length}</span> saved {products.length === 1 ? "item" : "items"}
        </p>
        <button type="button" onClick={clear} className="link-underline link-underline-fast text-sm text-velvet">
          Clear all
        </button>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
