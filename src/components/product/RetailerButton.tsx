"use client";

import { ArrowUpRight } from "lucide-react";
import { AFFILIATE_REL, handleAffiliateClick } from "@/lib/affiliate";
import { cn } from "@/lib/format";
import type { Product, RetailerOffer } from "@/types";
import { RetailerMark } from "@/components/ui/RetailerMark";

type Variant = "card" | "overlay" | "solid" | "row";

const VARIANTS: Record<Variant, string> = {
  card: "w-full justify-center border border-velvet/25 bg-blush/40 px-3 py-2 text-xs text-velvet hover:bg-blush/70",
  overlay: "w-full justify-center bg-white/95 px-3 py-2.5 text-xs text-ink shadow-soft backdrop-blur hover:bg-white",
  solid: "justify-center bg-velvet px-5 py-3 text-sm text-white hover:bg-velvet-dark",
  row: "justify-center bg-velvet px-4 py-2 text-xs text-white hover:bg-velvet-dark",
};

interface RetailerButtonProps {
  product: Product;
  offer?: RetailerOffer;
  variant?: Variant;
  label?: string;
  showMark?: boolean;
  className?: string;
}

/**
 * Outbound link to a partner retailer. Always says where the shopper is
 * going ("View on Myntra"), opens in a new tab and is marked sponsored.
 */
export function RetailerButton({
  product,
  offer = product.offers[0],
  variant = "card",
  label,
  showMark = false,
  className,
}: RetailerButtonProps) {
  const text = label ?? `View on ${offer.retailer}`;
  return (
    <a
      href={offer.affiliateUrl}
      target="_blank"
      rel={AFFILIATE_REL}
      onClick={() => handleAffiliateClick(product, offer)}
      aria-label={`${text}: ${product.name} (opens ${offer.retailer} in a new tab)`}
      className={cn(
        "group/rb inline-flex items-center gap-1.5 rounded-full font-medium transition-[background-color,translate,box-shadow] duration-250 ease-[var(--ease-vv)] hover:-translate-y-0.5",
        VARIANTS[variant],
        className,
      )}
    >
      {showMark && <RetailerMark retailer={offer.retailer} />}
      <span>{text}</span>
      <ArrowUpRight
        aria-hidden
        className="size-3.5 transition-transform duration-250 ease-[var(--ease-vv)] group-hover/rb:translate-x-[5px]"
      />
    </a>
  );
}
