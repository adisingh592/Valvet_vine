import Image from "next/image";
import { notFound } from "next/navigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MORPH_TARGET_SIZES, Morph } from "@/components/ui/Morph";
import { ProductGrid } from "@/components/product/ProductGrid";
import { PinterestMasonry } from "@/components/inspiration/PinterestCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getInspiration, inspiration } from "@/data/inspiration";
import { getProductsByTag } from "@/lib/catalog";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return inspiration.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = getInspiration(slug);
  if (!item) return {};
  return buildMetadata({
    title: `${item.title} — Style Guide`,
    description: item.description,
    path: `/inspiration/${item.slug}`,
    image: item.image,
  });
}

export default async function InspirationDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getInspiration(slug);
  if (!item) notFound();

  const products = getProductsByTag(item.productTag).slice(0, 8);
  const more = inspiration.filter((i) => i.slug !== item.slug).slice(0, 4);

  return (
    <PageTransition>
      <article className="container-vv pt-4 sm:pt-6">
        <Breadcrumbs items={[{ label: "Inspiration", href: "/inspiration" }, { label: item.title }]} />

        <div className="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14">
          <div className="skeleton relative aspect-[4/5] overflow-hidden rounded-[var(--radius-hero)] shadow-soft lg:sticky lg:top-28">
            <Morph kind="inspiration" slug={item.slug}>
              <div className="absolute inset-0 overflow-hidden rounded-[var(--radius-hero)]">
                <Image src={item.image} alt={`${item.title} outfit inspiration`} fill preload sizes={MORPH_TARGET_SIZES.inspiration} className="object-cover" />
              </div>
            </Morph>
          </div>

          <div className="lg:py-6">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-mocha">
              Style guide · {item.audience === "Everyone" ? "For everyone" : `For ${item.audience.toLowerCase()}`}
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-ink sm:text-5xl">{item.title}</h1>
            <p className="mt-2 font-serif text-lg italic text-mocha">{item.subtitle}</p>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-ink/75">{item.description}</p>

            <h2 className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-ink">How to wear it</h2>
            <ol className="mt-4 space-y-5">
              {item.tips.map((tip, i) => (
                <li key={tip.title} className="flex gap-4">
                  <span className="font-serif text-2xl leading-none text-rose">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">{tip.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{tip.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10">
              <ButtonLink href="#shop-the-look">Shop the look</ButtonLink>
            </div>
          </div>
        </div>
      </article>

      {products.length > 0 && (
        <section id="shop-the-look" aria-labelledby="shop-look-title" className="container-vv mt-20 scroll-mt-28">
          <SectionHeading
            id="shop-look-title"
            title="Shop the Look"
            subtitle="Pieces from our partner retailers that fit this guide."
          />
          <ProductGrid products={products} stagger={false} />
        </section>
      )}

      <section aria-labelledby="more-ideas" className="container-vv mt-20">
        <SectionHeading id="more-ideas" title="More Inspiration" action={{ label: "See the board", href: "/pinterest" }} />
        <PinterestMasonry items={more} />
      </section>
    </PageTransition>
  );
}
