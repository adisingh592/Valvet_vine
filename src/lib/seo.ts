import type { Metadata } from "next";

export const SITE = {
  name: "Velvet Vine",
  tagline: "Fashion for every you",
  description:
    "Discover modern fashion for men and women from India's favourite retailers. Curated edits, style guides and outfit inspiration from Velvet Vine.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage:
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&h=630&q=75",
};

interface PageMeta {
  title: string;
  description?: string;
  path: string;
  image?: string;
}

export function buildMetadata({ title, description, path, image }: PageMeta): Metadata {
  const desc = description ?? SITE.description;
  const ogImage = image ? `${image}&w=1200&h=630&q=75` : SITE.ogImage;
  return {
    title,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description: desc,
      url: path,
      siteName: SITE.name,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE.name}`,
      description: desc,
      images: [ogImage],
    },
  };
}
