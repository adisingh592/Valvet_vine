import { unsplash } from "@/lib/images";
import { PHOTO } from "./photos";
import type { Category } from "@/types";

export type SectionSlug = "women" | "men" | "accessories";

/** Every subcategory that can appear in a /[section]/[subcategory] URL. */
const CATEGORY_IMAGES: Record<string, { name: string; photo: string }> = {
  dresses: { name: "Dresses", photo: PHOTO.catDresses },
  tops: { name: "Tops", photo: PHOTO.catTops },
  kurtas: { name: "Kurtas", photo: PHOTO.catKurtas },
  sarees: { name: "Sarees", photo: PHOTO.catSarees },
  "ethnic-sets": { name: "Ethnic Sets", photo: PHOTO.catEthnicSets },
  "co-ords-and-playsuits": { name: "Co-ords", photo: PHOTO.catPlaysuits },
  jeans: { name: "Jeans", photo: PHOTO.catJeans },
  shirts: { name: "Shirts", photo: PHOTO.catShirts },
  "t-shirts": { name: "T-Shirts", photo: PHOTO.catTShirts },
  blazers: { name: "Blazers", photo: PHOTO.catBlazers },
  suits: { name: "Suits", photo: PHOTO.catSuits },
  jackets: { name: "Jackets", photo: PHOTO.catJackets },
  hoodies: { name: "Hoodies", photo: PHOTO.catHoodies },
  footwear: { name: "Footwear", photo: PHOTO.catFootwear },
  bags: { name: "Bags", photo: PHOTO.catBags },
  watches: { name: "Watches", photo: PHOTO.catWatches },
  sunglasses: { name: "Sunglasses", photo: PHOTO.catSunglasses },
  jewellery: { name: "Jewellery", photo: PHOTO.catJewellery },
  beauty: { name: "Beauty", photo: PHOTO.catBeauty },
  sportswear: { name: "Sportswear", photo: PHOTO.catSportswear },
  "lounge-wear": { name: "Lounge Wear", photo: PHOTO.catLoungeWear },
};

export function categoryFor(slug: string, section: SectionSlug): Category | undefined {
  const entry = CATEGORY_IMAGES[slug];
  if (!entry) return undefined;
  return { slug, name: entry.name, image: unsplash(entry.photo), href: `/${section}/${slug}` };
}

/** Homepage shortcut row, in the order shown in the design. */
export const homeCategories: Category[] = (
  [
    ["dresses", "women"],
    ["tops", "women"],
    ["kurtas", "women"],
    ["jeans", "men"],
    ["shirts", "men"],
    ["t-shirts", "men"],
    ["footwear", "accessories"],
    ["bags", "accessories"],
    ["watches", "accessories"],
    ["sunglasses", "accessories"],
    ["jewellery", "accessories"],
    ["beauty", "accessories"],
    ["sportswear", "women"],
    ["lounge-wear", "women"],
  ] as [string, SectionSlug][]
).map(([slug, section]) => categoryFor(slug, section)!);

export interface SectionInfo {
  slug: SectionSlug;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
}

export const sections: Record<SectionSlug, SectionInfo> = {
  women: {
    slug: "women",
    title: "Women",
    eyebrow: "Women's Collection",
    description: "Dresses, ethnic wear, denim and everyday edits — trendy, elegant and always you.",
    image: unsplash(PHOTO.womenSection),
  },
  men: {
    slug: "men",
    title: "Men",
    eyebrow: "Men's Collection",
    description: "Timeless tailoring, easy essentials and weekend staples for the modern man.",
    image: unsplash(PHOTO.menSection),
  },
  accessories: {
    slug: "accessories",
    title: "Accessories",
    eyebrow: "The Finishing Touch",
    description: "Bags, watches, jewellery, footwear and beauty — the little details make a big difference.",
    image: unsplash(PHOTO.accessoriesSection),
  },
};
