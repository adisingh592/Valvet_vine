import Image from "next/image";
import { Morph } from "@/components/ui/Morph";
import { MorphLink } from "@/components/ui/MorphLink";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/format";
import type { Collection } from "@/types";

interface CollectionCardProps {
  collection: Collection;
  className?: string;
  sizes?: string;
  cta?: string;
}

/** Editorial banner: image, title, line of copy and a CTA pill. */
export function CollectionCard({
  collection,
  className,
  sizes = "(min-width: 768px) 33vw, 100vw",
  cta = "Explore now",
}: CollectionCardProps) {
  return (
    <MorphLink
      href={`/collections/${collection.slug}`}
      morph={{ kind: "collection", slug: collection.slug, image: collection.image }}
      className={cn(
        "group relative isolate flex min-h-[230px] overflow-hidden rounded-[var(--radius-card)] bg-sand shadow-soft",
        className,
      )}
    >
      <Morph kind="collection" slug={collection.slug}>
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-[var(--radius-card)]">
          <Image
            src={collection.image}
            alt=""
            fill
            sizes={sizes}
            className="object-cover transition-[scale] duration-[400ms] ease-[var(--ease-vv)] group-hover:scale-[1.04]"
          />
        </div>
      </Morph>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(42_31_27/0.78)_0%,rgb(42_31_27/0.55)_45%,rgb(42_31_27/0.05)_90%)]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/0 transition-colors duration-[400ms] group-hover:bg-ink/10" />

      <div className="flex max-w-[70%] flex-col justify-end p-5 text-white sm:p-6">
        <p className="text-[0.62rem] font-medium uppercase tracking-[0.25em] text-white/80">{collection.eyebrow}</p>
        <h3 className="mt-1.5 font-serif text-2xl leading-tight sm:text-[1.7rem]">{collection.title}</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-white/85 sm:text-sm">{collection.subtitle}</p>
        <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-xs font-medium text-ink">
          {cta}
          <ArrowRight
            aria-hidden
            className="size-3.5 transition-transform duration-[400ms] ease-[var(--ease-vv)] group-hover:translate-x-1"
          />
        </span>
      </div>
    </MorphLink>
  );
}
