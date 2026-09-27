import { PageTransition } from "@/components/layout/PageTransition";
import { CollectionCard } from "@/components/collections/CollectionCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { collections } from "@/data/collections";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/format";

const description = "Seasonal edits, wardrobe essentials and occasion dressing — curated collections from our partner retailers.";

export const metadata = buildMetadata({ title: "Collections", description, path: "/collections" });

export default function CollectionsPage() {
  return (
    <PageTransition>
      <div className="container-vv pt-4 sm:pt-6">
        <Breadcrumbs items={[{ label: "Collections" }]} />
        <header className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-mocha">Curated edits</p>
          <h1 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">Collections</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{description}</p>
        </header>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection, i) => (
            <li key={collection.slug} className={cn(i % 5 === 0 && "sm:col-span-2")}>
              <Reveal delay={(i % 3) * 0.06} className="h-full">
                <CollectionCard
                  collection={collection}
                  className="h-full min-h-[280px] sm:min-h-[320px]"
                  sizes={i % 5 === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
                  cta="Explore the edit"
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </PageTransition>
  );
}
