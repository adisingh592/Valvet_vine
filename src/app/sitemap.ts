import type { MetadataRoute } from "next";
import { collections } from "@/data/collections";
import { inspiration } from "@/data/inspiration";
import { getAllProducts, getSectionCategories } from "@/lib/catalog";
import { SITE } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE.url}${path}`;
  const staticPaths = [
    "/",
    "/women",
    "/men",
    "/accessories",
    "/new-in",
    "/deals",
    "/collections",
    "/inspiration",
    "/pinterest",
    "/brands",
    "/about",
    "/contact",
    "/business",
    "/privacy",
    "/terms",
    "/affiliate-disclosure",
  ];

  return [
    ...staticPaths.map((path) => ({ url: url(path) })),
    ...(["women", "men", "accessories"] as const).flatMap((section) =>
      getSectionCategories(section).map((c) => ({ url: url(c.href) })),
    ),
    ...collections.map((c) => ({ url: url(`/collections/${c.slug}`) })),
    ...inspiration.map((i) => ({ url: url(`/inspiration/${i.slug}`) })),
    ...getAllProducts().map((p) => ({ url: url(`/products/${p.slug}`) })),
  ];
}
