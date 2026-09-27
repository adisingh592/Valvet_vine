import { PageTransition } from "@/components/layout/PageTransition";
import { CategoryHero } from "@/components/category/CategoryHero";
import { CategoryView } from "@/components/category/CategoryView";
import { PHOTO } from "@/data/photos";
import { getNewIn } from "@/lib/catalog";
import { unsplash } from "@/lib/images";
import { buildMetadata } from "@/lib/seo";

const description = "The latest arrivals from our partner retailers — fresh styles for women and men, added every week.";

export const metadata = buildMetadata({ title: "New In", description, path: "/new-in", image: unsplash(PHOTO.newInSection) });

export default function NewInPage() {
  return (
    <PageTransition>
      <CategoryHero
        eyebrow="Just landed"
        title="New In"
        description={description}
        image={unsplash(PHOTO.newInSection)}
        breadcrumbs={[{ label: "New In" }]}
      />
      <CategoryView products={getNewIn()} defaultSort="newest" />
    </PageTransition>
  );
}
