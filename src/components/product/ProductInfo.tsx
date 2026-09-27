"use client";

import Link from "next/link";
import { useState } from "react";
import { Leaf, Pin, Sparkles, Star, Tag } from "lucide-react";
import { WishlistButton } from "./WishlistButton";
import { RetailerComparison } from "./RetailerComparison";
import { cn, discountPercent, formatPrice } from "@/lib/format";
import { OCCASION_LABELS } from "@/lib/filters";
import type { Product } from "@/types";

export function ProductInfo({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState<string | null>(product.sizes.length === 1 ? product.sizes[0] : null);
  const discount = discountPercent(product.price, product.originalPrice);

  const highlights = [
    product.badge && { icon: Sparkles, label: product.badge === "Deal" ? "Great value" : `${product.badge} pick` },
    { icon: Leaf, label: product.details[0] },
    product.occasions[0] && { icon: Tag, label: `Perfect for ${OCCASION_LABELS[product.occasions[0]].toLowerCase()}` },
  ].filter(Boolean) as { icon: typeof Leaf; label: string }[];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-mocha">{product.brand}</p>
        <div className="mt-2 flex items-start justify-between gap-4">
          <h1 className="font-serif text-3xl leading-tight text-ink sm:text-4xl">{product.name}</h1>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href={`/create?${new URLSearchParams({ image: product.image, title: product.name, link: `/products/${product.slug}` })}`}
              aria-label={`Pin ${product.name} to a board`}
              title="Pin to a board"
              className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-rose hover:text-velvet"
            >
              <Pin aria-hidden className="size-[18px]" />
            </Link>
            <WishlistButton slug={product.slug} name={product.name} size="md" />
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-2xl font-semibold text-ink">{formatPrice(product.price)}</span>
          {discount > 0 && (
            <>
              <s className="text-sm text-muted">{formatPrice(product.originalPrice!)}</s>
              <span className="rounded-full bg-blush px-2 py-0.5 text-xs font-semibold text-velvet">{discount}% off</span>
            </>
          )}
        </div>
        <p className="mt-1 text-xs text-muted">
          Price on {product.retailer}
          {product.offers.length > 1 && " · compare retailers below"}
        </p>

        <div className="mt-3 flex items-center gap-2 text-sm">
          <span className="flex" aria-hidden>
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={cn("size-3.5", i < Math.round(product.rating) ? "fill-gold text-gold" : "text-line")}
              />
            ))}
          </span>
          <span className="text-ink">{product.rating.toFixed(1)}</span>
          <span className="text-muted">({product.reviewCount.toLocaleString("en-IN")} ratings)</span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-ink/75">{product.description}</p>
      </div>

      <fieldset>
        <legend className="text-sm text-ink">
          Colour: <span className="font-medium">{color.name}</span>
        </legend>
        <div className="mt-2.5 flex flex-wrap gap-2.5">
          {product.colors.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setColor(c)}
              aria-pressed={c.name === color.name}
              aria-label={c.name}
              title={c.name}
              className={cn(
                "size-8 rounded-full ring-offset-2 ring-offset-ivory transition-[box-shadow,scale] duration-200 hover:scale-[1.08]",
                c.name === color.name ? "ring-2 ring-velvet" : "ring-1 ring-ink/15",
              )}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </fieldset>

      {product.sizes.length > 1 && (
        <fieldset>
          <legend className="text-sm text-ink">
            Size: <span className="font-medium">{size ?? "Select to note your size"}</span>
          </legend>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                aria-pressed={s === size}
                className={cn(
                  "min-w-12 rounded-full border px-3 py-2 text-xs font-medium transition-[background-color,border-color,color] duration-200",
                  s === size ? "border-velvet bg-velvet text-white" : "border-line bg-white text-ink hover:border-rose",
                )}
              >
                {s}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">Size availability is confirmed on the retailer&apos;s site.</p>
        </fieldset>
      )}

      <RetailerComparison product={product} />

      <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink/80">
        {highlights.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-1.5">
            <Icon aria-hidden className="size-3.5 text-mocha" />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
