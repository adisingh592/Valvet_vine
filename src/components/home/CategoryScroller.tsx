import Image from "next/image";
import { Morph } from "@/components/ui/Morph";
import { MorphLink } from "@/components/ui/MorphLink";
import type { Category } from "@/types";
import { cn } from "@/lib/format";

interface CategoryScrollerProps {
  categories: Category[];
  className?: string;
  /** Morph the circle image into the subcategory page hero. */
  morph?: boolean;
  label?: string;
}

/** Circular category shortcuts. Scrolls horizontally on small screens. */
export function CategoryScroller({ categories, className, morph = true, label = "Shop by category" }: CategoryScrollerProps) {
  return (
    <nav aria-label={label} className={cn("relative", className)}>
      <ul className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-3 pt-2 sm:gap-5 lg:mx-0 lg:justify-between lg:px-0">
        {categories.map((category) => {
          const circle = (
            <div className="relative size-full overflow-hidden rounded-full">
              <Image
                src={category.image}
                alt=""
                fill
                sizes="88px"
                className="object-cover transition-[scale] duration-250 ease-[var(--ease-vv)] group-hover:scale-[1.07]"
              />
            </div>
          );
          return (
            <li key={category.slug} className="shrink-0 snap-start">
              <MorphLink
                href={category.href}
                morph={morph ? { kind: "category", slug: category.slug, image: category.image } : undefined}
                className="group flex w-[72px] flex-col items-center gap-2 sm:w-[84px]">
                <span className="skeleton relative block size-[68px] rounded-full shadow-soft ring-1 ring-line transition-[translate,box-shadow] duration-250 ease-[var(--ease-vv)] group-hover:-translate-y-1 group-hover:shadow-lift sm:size-20">
                  {morph ? (
                    <Morph kind="category" slug={category.slug}>
                      <span className="absolute inset-0 block">{circle}</span>
                    </Morph>
                  ) : (
                    <span className="absolute inset-0 block">{circle}</span>
                  )}
                </span>
                <span className="text-center text-[0.72rem] font-medium text-ink opacity-80 transition-opacity duration-250 group-hover:opacity-100">
                  {category.name}
                </span>
              </MorphLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
