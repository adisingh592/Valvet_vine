/**
 * Core data types. These mirror the shape the Supabase tables will have
 * later (products, collections, collection_products, clicks), so the UI
 * does not need to change when the data source does.
 */

export type RetailerName = "Myntra" | "Amazon" | "AJIO" | "Flipkart" | "Titan" | "Nykaa";

export type Gender = "women" | "men" | "unisex";

export type ProductCategory = "Women" | "Men" | "Accessories";

export type Occasion =
  | "casual"
  | "office"
  | "date-night"
  | "wedding-guest"
  | "vacation"
  | "street-style"
  | "minimal"
  | "festive";

export interface ProductColor {
  name: string;
  hex: string;
}

/** One place a product can be bought. Every CTA leaves Velvet Vine. */
export interface RetailerOffer {
  retailer: RetailerName;
  price: number;
  /** Tracked partner link. PLACEHOLDER until the affiliate programme issues real links. */
  affiliateUrl: string;
  /** Plain retailer URL without tracking. */
  originalUrl: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: ProductCategory;
  subcategory: string;
  subcategorySlug: string;
  gender: Gender;
  price: number;
  originalPrice?: number;
  currency: "INR";
  image: string;
  /** Extra views; gallery[0] is always `image`. */
  gallery: string[];
  brand: string;
  /** Primary retailer (used on product cards). */
  retailer: RetailerName;
  affiliateUrl: string;
  originalUrl: string;
  /** All retailers carrying the product, primary first. */
  offers: RetailerOffer[];
  badge?: "Trending" | "New" | "Bestseller" | "Editor's Pick" | "Deal";
  colors: ProductColor[];
  sizes: string[];
  tags: string[];
  occasions: Occasion[];
  description: string;
  details: string[];
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  /** Higher = more popular; used for the "Popular" sort. */
  popularity: number;
}

export interface Category {
  slug: string;
  name: string;
  image: string;
  /** Section route the category lives under, e.g. /women/dresses */
  href: string;
}

export interface Collection {
  slug: string;
  title: string;
  eyebrow: string;
  subtitle: string;
  description: string;
  image: string;
  /** Products whose tags include this tag belong to the collection. */
  tag: string;
}

export interface Inspiration {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  /** Aspect used by the masonry board. */
  aspect: "tall" | "portrait" | "square";
  audience: "Women" | "Men" | "Everyone";
  tips: { title: string; body: string }[];
  /** Products with this tag make up "Shop the look". */
  productTag: string;
}

export interface StyleCard {
  slug: string;
  name: string;
  image: string;
  href: string;
}
