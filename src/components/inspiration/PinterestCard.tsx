import Image from "next/image";
import { Morph } from "@/components/ui/Morph";
import { MorphLink } from "@/components/ui/MorphLink";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/format";
import type { Inspiration } from "@/types";

const ASPECT: Record<Inspiration["aspect"], string> = {
  tall: "aspect-[2/3]",
  portrait: "aspect-[4/5]",
  square: "aspect-square",
};

/** Masonry pin: image with hover overlay + CTA, caption underneath. */
export function PinterestCard({ item, className }: { item: Inspiration; className?: string }) {
  return (
    <MorphLink
      href={`/inspiration/${item.slug}`}
      morph={{ kind: "inspiration", slug: item.slug, image: item.image }}
      className={cn("group block", className)}>
      <div className={cn("skeleton relative overflow-hidden rounded-[var(--radius-card)] shadow-soft", ASPECT[item.aspect])}>
        <Morph kind="inspiration" slug={item.slug}>
          <div className="absolute inset-0 overflow-hidden rounded-[var(--radius-card)]">
            <Image
              src={item.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 48vw"
              className="object-cover transition-[scale] duration-[350ms] ease-[var(--ease-vv)] group-hover:scale-[1.04]"
            />
          </div>
        </Morph>
        <div aria-hidden className="absolute inset-0 bg-ink/0 transition-colors duration-[350ms] group-hover:bg-ink/20" />
        <span className="absolute bottom-3 left-3 inline-flex translate-y-2.5 items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-medium text-ink opacity-0 transition-[opacity,translate] duration-[350ms] ease-[var(--ease-vv)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          View ideas <ArrowRight aria-hidden className="size-3.5" />
        </span>
      </div>
      <div className="px-1 pt-2.5">
        <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
        <p className="mt-0.5 text-xs text-muted">{item.subtitle}</p>
      </div>
    </MorphLink>
  );
}

export function PinterestMasonry({ items, className }: { items: Inspiration[]; className?: string }) {
  return (
    <ul className={cn("columns-2 gap-3 sm:gap-5 md:columns-3 lg:columns-4", className)}>
      {items.map((item) => (
        <li key={item.slug} className="mb-5 break-inside-avoid sm:mb-6">
          <PinterestCard item={item} />
        </li>
      ))}
    </ul>
  );
}
