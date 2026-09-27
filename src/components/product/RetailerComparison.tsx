import Link from "next/link";
import { Info } from "lucide-react";
import { RetailerButton } from "./RetailerButton";
import { RetailerMark } from "@/components/ui/RetailerMark";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types";

/** "Available at" list — every row leaves Velvet Vine for the retailer. */
export function RetailerComparison({ product }: { product: Product }) {
  const offers = [...product.offers].sort((a, b) => a.price - b.price);
  const best = offers[0].price;

  return (
    <section aria-labelledby="available-at" className="rounded-[var(--radius-card)] border border-line bg-white/70 p-4 sm:p-5">
      <h2 id="available-at" className="text-sm font-semibold text-ink">
        Available at {offers.length} {offers.length === 1 ? "retailer" : "retailers"}
      </h2>
      <ul className="mt-3 divide-y divide-line">
        {offers.map((offer) => (
          <li key={offer.retailer} className="flex items-center gap-3 py-3">
            <RetailerMark retailer={offer.retailer} size="md" />
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-center gap-2 text-sm font-medium text-ink">
                {offer.retailer}
                {offer.price === best && offers.length > 1 && (
                  <span className="rounded-full bg-blush px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wide text-velvet">
                    Best price
                  </span>
                )}
              </p>
              <p className="text-sm text-muted">{formatPrice(offer.price)}</p>
            </div>
            <RetailerButton product={product} offer={offer} variant="row" label="View product" />
          </li>
        ))}
      </ul>
      <p className="mt-3 flex gap-2 text-[0.72rem] leading-relaxed text-muted">
        <Info aria-hidden className="mt-0.5 size-3.5 shrink-0" />
        <span>
          You&apos;ll complete your purchase on the retailer&apos;s website. Prices, sizes and stock are set by each
          retailer and may change. Velvet Vine may earn a commission.{" "}
          <Link href="/affiliate-disclosure" className="underline underline-offset-2 hover:text-ink">
            How we earn
          </Link>
        </span>
      </p>
    </section>
  );
}
