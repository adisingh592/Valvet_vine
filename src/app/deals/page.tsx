import { PageTransition } from "@/components/layout/PageTransition";
import { CategoryHero } from "@/components/category/CategoryHero";
import { CategoryView } from "@/components/category/CategoryView";
import { PHOTO } from "@/data/photos";
import { getDeals } from "@/lib/catalog";
import { unsplash } from "@/lib/images";
import { buildMetadata } from "@/lib/seo";

const description =
  "Markdowns spotted across our partner retailers. Prices are set by each retailer and can change — always check the final price on their site.";

export const metadata = buildMetadata({ title: "Deals", description, path: "/deals", image: unsplash(PHOTO.dealsSection) });

export default function DealsPage() {
  return (
    <PageTransition>
      <CategoryHero
        eyebrow="Price drops"
        title="Deals Worth Loving"
        description={description}
        image={unsplash(PHOTO.dealsSection)}
        breadcrumbs={[{ label: "Deals" }]}
      />
      <CategoryView products={getDeals()} defaultSort="discount" />
    </PageTransition>
  );
}
