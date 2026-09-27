import { notFound } from "next/navigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { CategoryHero } from "./CategoryHero";
import { CategoryView } from "./CategoryView";
import { CategoryScroller } from "@/components/home/CategoryScroller";
import { categoryFor, sections, type SectionSlug } from "@/data/categories";
import { getSectionCategories, getSectionProducts, getSubcategoryProducts } from "@/lib/catalog";
import { buildMetadata } from "@/lib/seo";

/* Shared renderers for /women, /men, /accessories and their /[category] pages. */

export function sectionMetadata(section: SectionSlug) {
  const info = sections[section];
  return buildMetadata({
    title: section === "accessories" ? "Accessories" : `${info.title}'s Fashion`,
    description: info.description,
    path: `/${section}`,
    image: info.image,
  });
}

export function SectionPage({ section }: { section: SectionSlug }) {
  const info = sections[section];
  return (
    <PageTransition>
      <CategoryHero
        eyebrow={info.eyebrow}
        title={section === "accessories" ? "Accessories" : `${info.title}'s Fashion`}
        description={info.description}
        image={info.image}
        breadcrumbs={[{ label: info.title }]}
        morph={{ kind: "section", slug: section }}
      />
      <div className="container-vv mt-6">
        <CategoryScroller categories={getSectionCategories(section)} label={`${info.title} categories`} className="lg:[&_ul]:justify-start lg:[&_ul]:gap-7" />
      </div>
      <CategoryView products={getSectionProducts(section)} />
    </PageTransition>
  );
}

export function subcategoryParams(section: SectionSlug) {
  return getSectionCategories(section).map((c) => ({ category: c.slug }));
}

export function subcategoryMetadata(section: SectionSlug, slug: string) {
  const category = categoryFor(slug, section);
  if (!category) return {};
  const info = sections[section];
  const title = section === "accessories" ? category.name : `${info.title}'s ${category.name}`;
  return buildMetadata({
    title,
    description: `Discover ${title.toLowerCase()} from Myntra, AJIO, Amazon, Flipkart and more — curated by Velvet Vine.`,
    path: `/${section}/${slug}`,
    image: category.image,
  });
}

export function SubcategoryPage({ section, slug }: { section: SectionSlug; slug: string }) {
  const category = categoryFor(slug, section);
  const products = getSubcategoryProducts(section, slug);
  if (!category || products.length === 0) notFound();

  const info = sections[section];
  const title = section === "accessories" ? category.name : `${info.title}'s ${category.name}`;
  const siblings = getSectionCategories(section).filter((c) => c.slug !== slug);

  return (
    <PageTransition>
      <CategoryHero
        eyebrow={info.eyebrow}
        title={title}
        description="Find your perfect look — hand-picked styles from our partner retailers."
        image={category.image}
        breadcrumbs={[{ label: info.title, href: `/${section}` }, { label: category.name }]}
        morph={{ kind: "category", slug }}
      />
      {siblings.length > 0 && (
        <div className="container-vv mt-6">
          <CategoryScroller categories={siblings} label={`More ${info.title.toLowerCase()} categories`} className="lg:[&_ul]:justify-start lg:[&_ul]:gap-7" />
        </div>
      )}
      <CategoryView products={products} hideFilters={["category"]} />
    </PageTransition>
  );
}
