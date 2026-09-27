import { notFound } from "next/navigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductTabs } from "@/components/product/ProductTabs";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getAllProducts, getProductBySlug, getRelatedProducts, getStyleItWith } from "@/lib/catalog";
import { buildMetadata, SITE } from "@/lib/seo";
import type { Product } from "@/types";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return buildMetadata({
    title: `${product.name} by ${product.brand}`,
    description: `${product.description.slice(0, 140)} Available on ${product.offers.map((o) => o.retailer).join(", ")}.`,
    path: `/products/${product.slug}`,
    image: product.image,
  });
}

function sectionFor(product: Product) {
  if (product.category === "Accessories") return { label: "Accessories", href: "/accessories" };
  return product.category === "Men" ? { label: "Men", href: "/men" } : { label: "Women", href: "/women" };
}

function productJsonLd(product: Product) {
  const prices = product.offers.map((o) => o.price);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.gallery.map((src) => `${src}&w=1200&q=75`),
    brand: { "@type": "Brand", name: product.brand },
    category: product.subcategory,
    url: `${SITE.url}/products/${product.slug}`,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: product.currency,
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: product.offers.length,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const section = sectionFor(product);
  const subcategoryHref = `${section.href}/${product.subcategorySlug}`;
  const related = getRelatedProducts(product, 5);
  const styleWith = getStyleItWith(product, related, 4);

  return (
    <PageTransition>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)).replace(/</g, "\\u003c") }}
      />
      <div className="container-vv pt-4 sm:pt-6">
        <Breadcrumbs
          items={[section, { label: product.subcategory, href: subcategoryHref }, { label: product.name }]}
        />

        <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12 xl:gap-16">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </div>

        <div className="mt-14 max-w-3xl">
          <ProductTabs product={product} />
        </div>
      </div>

      {styleWith.length > 0 && (
        <section aria-labelledby="style-with" className="container-vv mt-16 sm:mt-20">
          <SectionHeading id="style-with" title="Style It With" subtitle="Pieces that complete the look." />
          <ProductGrid products={styleWith} stagger={false} />
        </section>
      )}

      {related.length > 0 && (
        <section aria-labelledby="related" className="container-vv mt-16 sm:mt-20">
          <SectionHeading id="related" title="You May Also Like" action={{ label: `More ${product.subcategory.toLowerCase()}`, href: subcategoryHref }} />
          <ProductGrid products={related} stagger={false} className="lg:grid-cols-5 xl:grid-cols-5" />
        </section>
      )}
    </PageTransition>
  );
}
