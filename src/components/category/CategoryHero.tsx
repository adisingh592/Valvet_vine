import Image from "next/image";
import { MORPH_TARGET_SIZES, Morph, type MorphKind } from "@/components/ui/Morph";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";

interface CategoryHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  breadcrumbs: Crumb[];
  /** Morph target matching the card that linked here (side card, category circle, collection banner). */
  morph?: { kind: MorphKind; slug: string };
}

/** Editorial page header shared by section, subcategory and collection pages. */
export function CategoryHero({ eyebrow, title, description, image, imageAlt = "", breadcrumbs, morph }: CategoryHeroProps) {
  // The fade and the rounded corners live inside the morphing element, so the
  // image that flies in looks exactly like the one that lands.
  const media = (
    <div className="absolute inset-0 overflow-hidden rounded-b-[var(--radius-hero)] md:rounded-none md:rounded-r-[var(--radius-hero)]">
      <Image src={image} alt={imageAlt} fill preload sizes={MORPH_TARGET_SIZES[morph?.kind ?? "section"]} className="object-cover object-[50%_30%]" />
      <div aria-hidden className="absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-[#f5e6e0] to-transparent md:block" />
    </div>
  );

  return (
    <section className="container-vv pt-4 sm:pt-6">
      <Breadcrumbs items={breadcrumbs} />
      <div className="relative mt-4 grid min-h-[260px] overflow-hidden rounded-[var(--radius-hero)] bg-blush/70 md:min-h-[300px] md:grid-cols-[1fr_1.15fr]">
        <div className="relative z-10 flex flex-col justify-center p-6 sm:p-10 lg:p-12">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-mocha">{eyebrow}</p>
          <h1 className="mt-3 font-serif text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/70 sm:text-[0.95rem]">{description}</p>
        </div>
        {/* No shimmer here: the hero image is preloaded, and while a morph is
            landing this area should match the pink card, not flash a pale box. */}
        <div className="relative min-h-[220px] md:min-h-0">
          {morph ? (
            <Morph kind={morph.kind} slug={morph.slug}>
              {media}
            </Morph>
          ) : (
            media
          )}
        </div>
      </div>
    </section>
  );
}
