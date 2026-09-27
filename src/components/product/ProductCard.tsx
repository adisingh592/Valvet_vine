"use client";

import Image from "next/image";
import { WishlistButton } from "./WishlistButton";
import { RetailerButton } from "./RetailerButton";
import { RetailerMark } from "@/components/ui/RetailerMark";
import { Morph } from "@/components/ui/Morph";
import { MorphLink } from "@/components/ui/MorphLink";
import { cn, discountPercent, formatPrice } from "@/lib/format";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  /**
   * Morph the image into the product page on click. Names must be unique
   * on a page, so turn this off when the same product may appear twice.
   */
  morph?: boolean;
  priority?: boolean;
  sizes?: string;
}

export function ProductCard({
  product,
  morph = true,
  priority = false,
  sizes = "(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 46vw",
}: ProductCardProps) {
  const href = `/products/${product.slug}`;
  const discount = discountPercent(product.price, product.originalPrice);
  const hoverImage = product.gallery[1];
  const morphTarget = { kind: "product" as const, slug: product.slug, image: product.image };

  const media = (
    <div className="absolute inset-0 overflow-hidden rounded-[0.9rem]">
      <div className="relative size-full transition-[scale] duration-[400ms] ease-[var(--ease-vv)] group-hover:scale-[1.04]">
        <Image
          src={product.image}
          alt={`${product.name} by ${product.brand}`}
          fill
          sizes={sizes}
          loading={priority ? "eager" : undefined}
          className="object-cover"
        />
        {hoverImage && (
          <Image
            src={hoverImage}
            alt=""
            aria-hidden
            fill
            sizes={sizes}
            className="object-cover opacity-0 transition-opacity duration-[400ms] ease-out group-hover:opacity-100"
          />
        )}
      </div>
    </div>
  );

  return (
    <article className="group relative flex h-full flex-col rounded-[var(--radius-card)] bg-white p-1.5 shadow-soft transition-[translate,box-shadow] duration-300 ease-[var(--ease-vv)] hover:-translate-y-1 hover:shadow-lift sm:p-2">
      <div className="skeleton relative aspect-[4/5] overflow-hidden rounded-[0.9rem]">
        {/* Image link is a duplicate of the title link, so skip it for keyboard/screen-reader users */}
        <MorphLink href={href} morph={morphTarget} tabIndex={-1} aria-hidden className="absolute inset-0">
          {morph ? (
            <Morph kind="product" slug={product.slug}>
              {media}
            </Morph>
          ) : (
            media
          )}
        </MorphLink>

        {product.badge && (
          <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wider text-ink backdrop-blur-sm">
            {product.badge}
          </span>
        )}
        <WishlistButton slug={product.slug} name={product.name} className="absolute right-2 top-2" />

        {/* Desktop: CTA slides up over the image on hover / keyboard focus */}
        <div className="absolute inset-x-2 bottom-2 translate-y-2 opacity-0 transition-[opacity,translate] duration-300 ease-[var(--ease-vv)] group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 [@media(hover:none)]:hidden">
          <RetailerButton product={product} variant="overlay" />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-1 pb-1 pt-2.5 sm:px-1.5 sm:pt-3">
        <p className="truncate text-[0.65rem] uppercase tracking-[0.12em] text-muted">
          {product.brand} · {product.subcategory}
        </p>
        <h3 className="mt-1 text-[0.82rem] font-medium leading-snug text-ink sm:text-sm">
          <MorphLink href={href} morph={morphTarget} className="line-clamp-1 hover:text-velvet">
            {product.name}
          </MorphLink>
        </h3>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
          <span className="text-sm font-semibold text-ink">{formatPrice(product.price)}</span>
          {discount > 0 && (
            <>
              <s className="text-xs text-muted">{formatPrice(product.originalPrice!)}</s>
              <span className="text-xs font-medium text-velvet">{discount}% off</span>
            </>
          )}
        </div>
        <div className="mt-2 flex items-center justify-between gap-2">
          <ul className="flex items-center gap-1" aria-label={`Colours: ${product.colors.map((c) => c.name).join(", ")}`}>
            {product.colors.slice(0, 4).map((color) => (
              <li
                key={color.name}
                className="size-2.5 rounded-full ring-1 ring-ink/15 ring-offset-1"
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </ul>
          <span className="flex items-center gap-1 text-[0.68rem] text-muted">
            <RetailerMark retailer={product.retailer} />
            <span className="hidden min-[380px]:inline">on {product.retailer}</span>
          </span>
        </div>

        {/* Touch: CTA always visible (no hover available) */}
        <div className={cn("mt-2.5 hidden [@media(hover:none)]:block")}>
          <RetailerButton product={product} variant="card" />
        </div>
      </div>
    </article>
  );
}
