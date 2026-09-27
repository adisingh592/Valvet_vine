import { unsplash } from "@/lib/images";
import { PHOTO } from "./photos";
import type { Collection } from "@/types";

export const collections: Collection[] = [
  {
    slug: "summer-edit",
    title: "Summer Edit",
    eyebrow: "Seasonal",
    subtitle: "Light fabrics. Breezy fits. Endless possibilities.",
    description:
      "Airy dresses, easy shirts and sun-ready accessories picked from our partner retailers for long, warm days.",
    image: unsplash(PHOTO.colSummer),
    tag: "summer",
  },
  {
    slug: "mens-essentials",
    title: "Men's Essentials",
    eyebrow: "Wardrobe Staples",
    subtitle: "Everyday style, made better.",
    description:
      "The white tee, the good jeans, the watch you never take off. The foundations of a wardrobe that works hard.",
    image: unsplash(PHOTO.colMensEssentials),
    tag: "essentials",
  },
  {
    slug: "accessories-edit",
    title: "Accessories",
    eyebrow: "The Details",
    subtitle: "The little details make a big difference.",
    description: "Bags, watches, sunglasses and jewellery to finish every look.",
    image: unsplash(PHOTO.colAccessories),
    tag: "accessories",
  },
  {
    slug: "office-edit",
    title: "The Office Edit",
    eyebrow: "Workwear",
    subtitle: "Polished pieces for the 9-to-5 and beyond.",
    description: "Tailored blazers, crisp shirts and refined accessories that move from desk to dinner.",
    image: unsplash(PHOTO.colOffice),
    tag: "office",
  },
  {
    slug: "wedding-guest",
    title: "Wedding Guest",
    eyebrow: "Occasion",
    subtitle: "Dressed for every celebration.",
    description: "Sarees, Anarkalis, sharp suits and statement jewellery for the wedding season.",
    image: unsplash(PHOTO.colWedding),
    tag: "wedding-guest",
  },
  {
    slug: "street-style",
    title: "Street Style",
    eyebrow: "Trend",
    subtitle: "Bold layers and easy attitude.",
    description: "Leather jackets, chunky sneakers, hoodies and denim with a city edge.",
    image: unsplash(PHOTO.colStreet),
    tag: "street-style",
  },
  {
    slug: "vacation-mode",
    title: "Vacation Mode",
    eyebrow: "Travel",
    subtitle: "Pack light, look lovely.",
    description: "Resort shirts, flowing maxis, sunglasses and woven bags for your next getaway.",
    image: unsplash(PHOTO.colVacation),
    tag: "vacation",
  },
  {
    slug: "festive-edit",
    title: "Festive Edit",
    eyebrow: "Celebration",
    subtitle: "Colour, craft and a little sparkle.",
    description: "Kurtas, sarees and jewellery in rich festive tones.",
    image: unsplash(PHOTO.colFestive),
    tag: "festive",
  },
  {
    slug: "date-night",
    title: "Date Night",
    eyebrow: "Evening",
    subtitle: "Effortless evening looks.",
    description: "Velvet gowns, printed shirts, heels and sleek jackets for nights out.",
    image: unsplash(PHOTO.colDateNight),
    tag: "date-night",
  },
  {
    slug: "minimal-wardrobe",
    title: "Minimal Wardrobe",
    eyebrow: "Capsule",
    subtitle: "Fewer, better pieces.",
    description: "Neutral, versatile pieces that mix and match all year round.",
    image: unsplash(PHOTO.colMinimal),
    tag: "minimal",
  },
];

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}
