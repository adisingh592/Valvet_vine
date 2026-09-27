import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { RetailerMark } from "@/components/ui/RetailerMark";
import { PHOTO } from "@/data/photos";
import { getAllProducts, getBrands } from "@/lib/catalog";
import { unsplash } from "@/lib/images";
import { buildMetadata } from "@/lib/seo";
import type { RetailerName } from "@/types";

const description = "The labels in our edit and the retailers you can buy them from.";

export const metadata = buildMetadata({ title: "Brands", description, path: "/brands" });

export default function BrandsPage() {
  const brands = getBrands();
  const retailers = [...new Set(getAllProducts().flatMap((p) => p.offers.map((o) => o.retailer)))].sort() as RetailerName[];

  return (
    <PageTransition>
      <div className="container-vv pt-4 sm:pt-6">
        <Breadcrumbs items={[{ label: "Brands" }]} />

        <div className="relative mt-4 grid overflow-hidden rounded-[var(--radius-hero)] bg-cream md:grid-cols-2">
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-mocha">Labels &amp; partners</p>
            <h1 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">Brands</h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{description}</p>
          </div>
          <div className="skeleton relative min-h-[220px]">
            <Image src={unsplash(PHOTO.brands)} alt="Clothing rails in a bright boutique" fill preload sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>

        <section aria-labelledby="brands-title" className="mt-14">
          <h2 id="brands-title" className="font-serif text-3xl text-ink">Brands in our edit</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand, i) => (
              <li key={brand.name}>
                <Reveal delay={(i % 3) * 0.05}>
                  <Link
                    href={`/search?q=${encodeURIComponent(brand.name)}`}
                    className="group flex items-center justify-between rounded-[var(--radius-card)] border border-line bg-white/70 p-5 transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-rose hover:shadow-soft"
                  >
                    <div>
                      <h3 className="font-serif text-xl text-ink">{brand.name}</h3>
                      <p className="mt-1 text-xs text-muted">
                        {brand.count} {brand.count === 1 ? "style" : "styles"} · {brand.categories.slice(0, 3).join(", ")}
                      </p>
                    </div>
                    <ArrowRight aria-hidden className="size-4 text-ink transition-transform duration-250 group-hover:translate-x-[5px]" />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="retailers-title" className="mt-16">
          <h2 id="retailers-title" className="font-serif text-3xl text-ink">Where you&apos;ll shop</h2>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Velvet Vine doesn&apos;t sell anything directly. Every product links to one of these partner retailers, who
            handle payment, delivery and returns.
          </p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {retailers.map((r) => (
              <li key={r} className="flex items-center gap-2.5 rounded-full border border-line bg-white/70 py-2 pl-2 pr-4 text-sm text-ink">
                <RetailerMark retailer={r} size="md" />
                {r}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageTransition>
  );
}
