import type { Product } from "@/types";

/* Pure filter/sort helpers used by the category view (client side). */

export type SortKey = "popular" | "newest" | "price-asc" | "price-desc" | "discount";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "popular", label: "Popular" },
  { value: "newest", label: "New arrivals" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "discount", label: "Biggest discount" },
];

export const PRICE_RANGES = [
  { value: "under-1000", label: "Under ₹1,000", min: 0, max: 999 },
  { value: "1000-1999", label: "₹1,000 – ₹1,999", min: 1000, max: 1999 },
  { value: "2000-3999", label: "₹2,000 – ₹3,999", min: 2000, max: 3999 },
  { value: "4000-plus", label: "₹4,000 & above", min: 4000, max: Infinity },
] as const;

export const OCCASION_LABELS: Record<string, string> = {
  casual: "Casual",
  office: "Office",
  "date-night": "Date Night",
  "wedding-guest": "Wedding Guest",
  vacation: "Vacation",
  "street-style": "Street Style",
  minimal: "Minimal",
  festive: "Festive",
};

export interface FilterState {
  category: string[];
  brand: string[];
  price: string[];
  color: string[];
  size: string[];
  occasion: string[];
  retailer: string[];
}

export type FilterKey = keyof FilterState;

export const EMPTY_FILTERS: FilterState = {
  category: [],
  brand: [],
  price: [],
  color: [],
  size: [],
  occasion: [],
  retailer: [],
};

export function activeFilterCount(filters: FilterState) {
  return Object.values(filters).reduce((sum, values) => sum + values.length, 0);
}

function matches(p: Product, filters: FilterState, skip?: FilterKey) {
  const has = (key: FilterKey, test: (value: string) => boolean) =>
    key === skip || filters[key].length === 0 || filters[key].some(test);

  return (
    has("category", (v) => p.subcategorySlug === v) &&
    has("brand", (v) => p.brand === v) &&
    has("price", (v) => {
      const range = PRICE_RANGES.find((r) => r.value === v);
      return !!range && p.price >= range.min && p.price <= range.max;
    }) &&
    has("color", (v) => p.colors.some((c) => c.name === v)) &&
    has("size", (v) => p.sizes.includes(v)) &&
    has("occasion", (v) => p.occasions.includes(v as Product["occasions"][number])) &&
    has("retailer", (v) => p.offers.some((o) => o.retailer === v))
  );
}

export function applyFilters(list: Product[], filters: FilterState) {
  return list.filter((p) => matches(p, filters));
}

export function sortProducts(list: Product[], sort: SortKey) {
  const sorted = [...list];
  switch (sort) {
    case "newest":
      return sorted.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew) || b.id - a.id);
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "discount":
      return sorted.sort((a, b) => (b.originalPrice ?? b.price) / b.price - (a.originalPrice ?? a.price) / a.price);
    default:
      return sorted.sort((a, b) => b.popularity - a.popularity);
  }
}

export interface FacetOption {
  value: string;
  label: string;
  count: number;
  swatch?: string;
}

/**
 * Options for each filter group, with counts that reflect the other active
 * filters (so users can see how many results a choice will give).
 */
export function buildFacets(list: Product[], filters: FilterState): Record<FilterKey, FacetOption[]> {
  const count = (key: FilterKey, values: Map<string, FacetOption>, getValues: (p: Product) => FacetOption[]) => {
    for (const p of list) {
      const inScope = matches(p, filters, key);
      for (const option of getValues(p)) {
        const existing = values.get(option.value) ?? { ...option, count: 0 };
        if (inScope) existing.count += 1;
        values.set(option.value, existing);
      }
    }
    return [...values.values()];
  };

  const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL"];

  return {
    category: count("category", new Map(), (p) => [{ value: p.subcategorySlug, label: p.subcategory, count: 0 }]).sort(
      (a, b) => a.label.localeCompare(b.label),
    ),
    brand: count("brand", new Map(), (p) => [{ value: p.brand, label: p.brand, count: 0 }]).sort((a, b) =>
      a.label.localeCompare(b.label),
    ),
    price: PRICE_RANGES.map((range) => ({
      value: range.value,
      label: range.label,
      count: list.filter((p) => matches(p, filters, "price") && p.price >= range.min && p.price <= range.max).length,
    })),
    color: count("color", new Map(), (p) => p.colors.map((c) => ({ value: c.name, label: c.name, count: 0, swatch: c.hex }))),
    size: count("size", new Map(), (p) => p.sizes.map((s) => ({ value: s, label: s, count: 0 }))).sort((a, b) => {
      const ia = sizeOrder.indexOf(a.value);
      const ib = sizeOrder.indexOf(b.value);
      if (ia !== -1 && ib !== -1) return ia - ib;
      return a.value.localeCompare(b.value, undefined, { numeric: true });
    }),
    occasion: count("occasion", new Map(), (p) =>
      p.occasions.map((o) => ({ value: o, label: OCCASION_LABELS[o] ?? o, count: 0 })),
    ),
    retailer: count("retailer", new Map(), (p) => p.offers.map((o) => ({ value: o.retailer, label: o.retailer, count: 0 }))).sort(
      (a, b) => a.label.localeCompare(b.label),
    ),
  };
}
