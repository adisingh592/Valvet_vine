import type { Product, RetailerName, RetailerOffer } from "@/types";

/**
 * Placeholder retailer URLs.
 *
 * These are plain search links on each retailer so buttons work during
 * development. They carry NO affiliate/tracking IDs. Replace them with the
 * deep links issued by each affiliate programme (Amazon Associates,
 * Myntra/AJIO/Flipkart partner networks, etc.) when products come from
 * Supabase.
 */
const SEARCH_URL: Record<RetailerName, (q: string) => string> = {
  Myntra: (q) => `https://www.myntra.com/${q.replace(/\s+/g, "-")}`,
  Amazon: (q) => `https://www.amazon.in/s?k=${encodeURIComponent(q)}`,
  AJIO: (q) => `https://www.ajio.com/search/?text=${encodeURIComponent(q)}`,
  Flipkart: (q) => `https://www.flipkart.com/search?q=${encodeURIComponent(q)}`,
  Titan: (q) => `https://www.titan.co.in/search?q=${encodeURIComponent(q)}`,
  Nykaa: (q) => `https://www.nykaa.com/search/result/?q=${encodeURIComponent(q)}`,
};

export function placeholderRetailerUrl(retailer: RetailerName, query: string) {
  return SEARCH_URL[retailer](query.toLowerCase());
}

export interface AffiliateClickEvent {
  productId: number;
  productSlug: string;
  retailer: RetailerName;
  price: number;
  url: string;
  timestamp: string;
}

/**
 * Called whenever a shopper leaves Velvet Vine for a retailer.
 *
 * Today it only emits a browser event (handy for debugging or plugging in
 * an analytics script). Later it can POST to a `clicks` table in Supabase
 * before the browser follows the link — the link itself opens natively in
 * a new tab, so tracking never blocks the redirect.
 */
export function handleAffiliateClick(product: Product, offer?: RetailerOffer): AffiliateClickEvent {
  const target = offer ?? product.offers[0];
  const event: AffiliateClickEvent = {
    productId: product.id,
    productSlug: product.slug,
    retailer: target.retailer,
    price: target.price,
    url: target.affiliateUrl,
    timestamp: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("vv:affiliate-click", { detail: event }));
  }

  return event;
}

/** rel for outbound partner links (tells search engines the link is paid). */
export const AFFILIATE_REL = "sponsored noopener noreferrer";
