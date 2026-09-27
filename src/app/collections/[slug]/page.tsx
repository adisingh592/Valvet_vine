import { notFound } from "next/navigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { CategoryHero } from "@/components/category/CategoryHero";
import { CategoryView } from "@/components/category/CategoryView";
import { CollectionCard } from "@/components/collections/CollectionCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { collections, getCollection } from "@/data/collections";
import { getProductsByTag } from "@/lib/catalog";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return {};
  return buildMetadata({
    title: collection.title,
    description: collection.description,
    path: `/collections/${collection.slug}`,
    image: collection.image,
  });
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const products = getProductsByTag(collection.tag);
  const more = collections.filter((c) => c.slug !== collection.slug).slice(0, 3);

  return (
    <PageTransition>
      <CategoryHero
        eyebrow={collection.eyebrow}
        title={collection.title}
        description={collection.description}
        image={collection.image}
        breadcrumbs={[{ label: "Collections", href: "/collections" }, { label: collection.title }]}
        morph={{ kind: "collection", slug: collection.slug }}
      />
      <CategoryView products={products} />

      <section aria-labelledby="more-collections" className="container-vv mt-20">
        <SectionHeading id="more-collections" title="More Collections" action={{ label: "All collections", href: "/collections" }} />
        <ul className="grid gap-4 md:grid-cols-3">
          {more.map((c) => (
            <li key={c.slug}>
              <CollectionCard collection={c} className="h-full min-h-[240px]" />
            </li>
          ))}
        </ul>
      </section>
    </PageTransition>
  );
}
