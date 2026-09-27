import { products } from "@/data/products";
import { categoryFor, type SectionSlug } from "@/data/categories";
import type { Category, Product } from "@/types";

/*
 * Data-access layer. Pages and components only talk to these functions,
 * never to the mock arrays directly — so connecting Supabase later means
 * changing this file (e.g. `supabase.from("products").select()`), not the UI.
 */

export function getAllProducts() {
  return products;
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

function inSection(p: Product, section: SectionSlug) {
  switch (section) {
    case "women":
      return p.category === "Women" || (p.category === "Accessories" && p.gender !== "men");
    case "men":
      return p.category === "Men" || (p.category === "Accessories" && p.gender !== "women");
    case "accessories":
      return p.category === "Accessories";
  }
}

export function getSectionProducts(section: SectionSlug) {
  return byPopularity(products.filter((p) => inSection(p, section)));
}

/** Subcategories present in a section, most-stocked first. */
export function getSectionCategories(section: SectionSlug): (Category & { count: number })[] {
  const counts = new Map<string, number>();
  for (const p of getSectionProducts(section)) {
    counts.set(p.subcategorySlug, (counts.get(p.subcategorySlug) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([slug, count]) => {
      const category = categoryFor(slug, section);
      return category ? { ...category, count } : undefined;
    })
    .filter((c): c is Category & { count: number } => Boolean(c));
}

export function getSubcategoryProducts(section: SectionSlug, subcategorySlug: string) {
  return getSectionProducts(section).filter((p) => p.subcategorySlug === subcategorySlug);
}

export function getNewIn() {
  return byPopularity(products.filter((p) => p.isNew));
}

export function getDeals() {
  return products
    .filter((p) => p.originalPrice && p.originalPrice > p.price)
    .sort((a, b) => b.originalPrice! / b.price - a.originalPrice! / a.price);
}

/** Most popular picks, mixed so women's, men's and accessories are all represented. */
export function getTrending(limit = 8) {
  const queues: Record<Product["category"], Product[]> = {
    Women: byPopularity(products.filter((p) => p.category === "Women")),
    Men: byPopularity(products.filter((p) => p.category === "Men")),
    Accessories: byPopularity(products.filter((p) => p.category === "Accessories")),
  };
  const pattern: Product["category"][] = ["Women", "Men", "Accessories", "Women", "Men", "Women", "Men", "Accessories"];
  const picks: Product[] = [];
  for (let i = 0; picks.length < limit; i++) {
    const next = queues[pattern[i % pattern.length]].shift();
    if (next) picks.push(next);
    if (Object.values(queues).every((q) => q.length === 0)) break;
  }
  return picks;
}

export function getProductsByTag(tag: string) {
  return byPopularity(products.filter((p) => p.tags.includes(tag)));
}

export function getRelatedProducts(product: Product, limit = 5) {
  const others = products.filter((p) => p.id !== product.id);
  const same = others.filter((p) => p.subcategorySlug === product.subcategorySlug);
  const similar = others.filter(
    (p) =>
      p.subcategorySlug !== product.subcategorySlug &&
      p.category === product.category &&
      (p.gender === product.gender || p.gender === "unisex"),
  );
  return [...byPopularity(same), ...byPopularity(similar)].slice(0, limit);
}

/** Complementary pieces (different category, shared occasion). */
export function getStyleItWith(product: Product, exclude: Product[], limit = 4) {
  const excluded = new Set([product.id, ...exclude.map((p) => p.id)]);
  const compatibleGender = (p: Product) => {
    // Keep suggestions in the same section: no men's-section pieces for a women's dress, and vice versa.
    if (product.category === "Women" && p.category === "Men") return false;
    if (product.category === "Men" && p.category === "Women") return false;
    return p.gender === "unisex" || product.gender === "unisex" || p.gender === product.gender;
  };
  return byPopularity(
    products.filter(
      (p) =>
        !excluded.has(p.id) &&
        p.subcategorySlug !== product.subcategorySlug &&
        compatibleGender(p) &&
        p.occasions.some((o) => product.occasions.includes(o)),
    ),
  ).slice(0, limit);
}

export function getBrands() {
  const brands = new Map<string, { name: string; count: number; categories: Set<string> }>();
  for (const p of products) {
    const entry = brands.get(p.brand) ?? { name: p.brand, count: 0, categories: new Set<string>() };
    entry.count += 1;
    entry.categories.add(p.subcategory);
    brands.set(p.brand, entry);
  }
  return [...brands.values()]
    .map((b) => ({ name: b.name, count: b.count, categories: [...b.categories] }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Simple local relevance search across name, brand, category, colours and tags. */
export function searchProducts(query: string, list: Product[] = products) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  const scored = list
    .map((p) => {
      const fields = {
        name: p.name.toLowerCase(),
        brand: p.brand.toLowerCase(),
        category: `${p.category} ${p.subcategory} ${p.gender}`.toLowerCase(),
        extra: `${p.tags.join(" ")} ${p.colors.map((c) => c.name).join(" ")} ${p.retailer}`.toLowerCase(),
      };
      let score = 0;
      for (const term of terms) {
        const stem = term.replace(/(es|s)$/, "");
        let hit = 0;
        if (fields.name.includes(stem)) hit = 4;
        else if (fields.brand.includes(stem)) hit = 3;
        else if (fields.category.includes(stem)) hit = 2;
        else if (fields.extra.includes(stem)) hit = 1;
        if (hit === 0) return { p, score: 0 };
        score += hit;
      }
      return { p, score: score + p.popularity / 1000 };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.map((r) => r.p);
}

function byPopularity(list: Product[]) {
  return [...list].sort((a, b) => b.popularity - a.popularity);
}
