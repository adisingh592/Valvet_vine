import { unsplash } from "@/lib/images";
import { PHOTO } from "./photos";
import type { Inspiration, StyleCard } from "@/types";

export const inspiration: Inspiration[] = [
  {
    slug: "summer-outfits",
    title: "Summer Outfits",
    subtitle: "Sun-soaked and effortless",
    description:
      "Bright tones, playful accessories and breathable fabrics. Summer dressing is about ease — pick one statement and keep everything else light.",
    image: unsplash(PHOTO.inspSummer),
    aspect: "tall",
    audience: "Everyone",
    tips: [
      { title: "Choose natural fabrics", body: "Cotton, linen and viscose breathe in the heat and drape beautifully." },
      { title: "One bold accessory", body: "Statement sunglasses or a woven bag are enough to make the outfit." },
      { title: "Keep the palette light", body: "Whites, blush and sky blue reflect the sun and photograph well." },
    ],
    productTag: "summer",
  },
  {
    slug: "office-wear",
    title: "Office Wear",
    subtitle: "Sharp, comfortable, confident",
    description:
      "Modern workwear is relaxed tailoring and crisp basics. Invest in a great shirt and a blazer and the rest falls into place.",
    image: unsplash(PHOTO.inspOffice),
    aspect: "portrait",
    audience: "Everyone",
    tips: [
      { title: "Tailoring first", body: "A well-fitted blazer instantly elevates jeans or trousers." },
      { title: "Crisp shirts", body: "White and pale blue oxford shirts work with everything." },
      { title: "Quiet accessories", body: "A minimal watch and a structured bag finish the look." },
    ],
    productTag: "office",
  },
  {
    slug: "date-night",
    title: "Date Night",
    subtitle: "Evening looks with intent",
    description:
      "Rich textures, a hint of drama and pieces that feel special. Think velvet, leather and a perfect heel or a sharp printed shirt.",
    image: unsplash(PHOTO.inspDateNight),
    aspect: "tall",
    audience: "Everyone",
    tips: [
      { title: "Play with texture", body: "Velvet, satin and leather catch the light after dark." },
      { title: "Deep colours", body: "Plum, burgundy and black feel instantly evening-ready." },
      { title: "Finish with jewellery", body: "A pendant or drop earrings adds just enough sparkle." },
    ],
    productTag: "date-night",
  },
  {
    slug: "street-style",
    title: "Street Style",
    subtitle: "Layers with attitude",
    description:
      "Oversized outerwear, relaxed denim and chunky sneakers. Street style is personal — mix proportions and wear it with confidence.",
    image: unsplash(PHOTO.inspStreet),
    aspect: "portrait",
    audience: "Everyone",
    tips: [
      { title: "Play with proportions", body: "Pair a roomy jacket with a slimmer jean, or the reverse." },
      { title: "Sneakers are the anchor", body: "A retro runner ties casual layers together." },
      { title: "Layer a hoodie", body: "Under a leather or denim jacket for easy contrast." },
    ],
    productTag: "street-style",
  },
  {
    slug: "accessories-styling",
    title: "Accessories",
    subtitle: "Small details, big difference",
    description:
      "Layered necklaces, a great watch, the right bag. Accessories turn simple outfits into considered ones.",
    image: unsplash(PHOTO.inspAccessories),
    aspect: "square",
    audience: "Everyone",
    tips: [
      { title: "Layer fine chains", body: "Three lengths of delicate necklace create easy interest." },
      { title: "Mix metals thoughtfully", body: "Keep one metal dominant and let the other accent." },
      { title: "A bag with structure", body: "Instantly polishes a relaxed outfit." },
    ],
    productTag: "accessories",
  },
  {
    slug: "travel-looks",
    title: "Travel Looks",
    subtitle: "Pack light, look lovely",
    description:
      "Comfortable pieces that still look put-together — perfect for airports, city breaks and slow days exploring.",
    image: unsplash(PHOTO.inspTravel),
    aspect: "tall",
    audience: "Everyone",
    tips: [
      { title: "Build a capsule", body: "Pick a colour palette so every piece works with every other." },
      { title: "One great coat or jacket", body: "It's the piece people see in every photo." },
      { title: "Comfortable shoes", body: "Sneakers or flats you can walk in all day." },
    ],
    productTag: "vacation",
  },
  {
    slug: "wedding-guest",
    title: "Wedding Guest",
    subtitle: "Celebrate in style",
    description:
      "From sangeet to reception: jewel tones, fine fabrics and a little sparkle, without upstaging the couple.",
    image: unsplash(PHOTO.inspWedding),
    aspect: "portrait",
    audience: "Everyone",
    tips: [
      { title: "Respect the dress code", body: "Day events suit pastels; evenings welcome deeper tones." },
      { title: "Statement jewellery", body: "Let earrings or a necklace do the talking." },
      { title: "Tailoring for men", body: "A slim navy suit works for almost every function." },
    ],
    productTag: "wedding-guest",
  },
  {
    slug: "festive",
    title: "Festive Glow",
    subtitle: "Colour and craft",
    description: "Marigold, emerald and ivory — festive dressing celebrates craft, texture and colour.",
    image: unsplash(PHOTO.inspFestive),
    aspect: "tall",
    audience: "Women",
    tips: [
      { title: "Embrace colour", body: "Marigold, emerald and rose feel instantly celebratory." },
      { title: "Look for handwork", body: "Embroidery and zari add richness without heaviness." },
      { title: "Balance the look", body: "With a statement kurta, keep jewellery simple — and vice versa." },
    ],
    productTag: "festive",
  },
  {
    slug: "minimal",
    title: "Minimal Wardrobe",
    subtitle: "Fewer, better pieces",
    description: "A tight palette of neutrals and a focus on fit. The minimal wardrobe is calm, versatile and timeless.",
    image: unsplash(PHOTO.inspMinimal),
    aspect: "portrait",
    audience: "Men",
    tips: [
      { title: "Stick to a palette", body: "White, black, navy and camel mix endlessly." },
      { title: "Prioritise fit", body: "A perfect tee beats ten average ones." },
      { title: "Quality basics", body: "Heavyweight cotton and rigid denim age well." },
    ],
    productTag: "minimal",
  },
  {
    slug: "casual-weekend",
    title: "Casual Weekend",
    subtitle: "Easy, relaxed, you",
    description: "Graphic tees, great jeans and zero effort. Weekend dressing should feel as good as it looks.",
    image: unsplash(PHOTO.inspCasual),
    aspect: "square",
    audience: "Everyone",
    tips: [
      { title: "Denim you love", body: "Start with the pair that fits perfectly." },
      { title: "Soft layers", body: "A chambray shirt or hoodie handles changing weather." },
      { title: "Clean sneakers", body: "They make relaxed look intentional." },
    ],
    productTag: "casual",
  },
  {
    slug: "modern-menswear",
    title: "Modern Menswear",
    subtitle: "Tailoring, relaxed",
    description: "Suits and blazers without the stiffness. Modern menswear mixes sharp tailoring with everyday essentials.",
    image: unsplash(PHOTO.inspMenswear),
    aspect: "tall",
    audience: "Men",
    tips: [
      { title: "Blazer + tee", body: "The easiest way to look sharp without trying too hard." },
      { title: "Invest in a watch", body: "A steel or leather-strap watch works every day." },
      { title: "Mind the break", body: "Trousers that just touch the shoe look modern." },
    ],
    productTag: "essentials",
  },
  {
    slug: "denim-days",
    title: "Denim Days",
    subtitle: "Blue, head to toe",
    description: "Denim on denim, done right: vary the washes, keep the fits clean and let the texture carry the look.",
    image: unsplash(PHOTO.inspDenim),
    aspect: "portrait",
    audience: "Everyone",
    tips: [
      { title: "Contrast your washes", body: "Pair a light jacket with dark jeans (or vice versa)." },
      { title: "Break it up", body: "A white tee between denim layers keeps it fresh." },
      { title: "Neutral shoes", body: "White sneakers or tan boots ground the look." },
    ],
    productTag: "jeans",
  },
];

export function getInspiration(slug: string) {
  return inspiration.find((i) => i.slug === slug);
}

/** "Shop by Style" tiles on the homepage — each opens a style guide. */
export const styleCards: StyleCard[] = [
  { slug: "casual", name: "Casual", image: unsplash(PHOTO.styleCasual), href: "/inspiration/casual-weekend" },
  { slug: "office", name: "Office", image: unsplash(PHOTO.styleOffice), href: "/inspiration/office-wear" },
  { slug: "date-night", name: "Date Night", image: unsplash(PHOTO.styleDateNight), href: "/inspiration/date-night" },
  { slug: "wedding-guest", name: "Wedding Guest", image: unsplash(PHOTO.styleWedding), href: "/inspiration/wedding-guest" },
  { slug: "vacation", name: "Vacation", image: unsplash(PHOTO.styleVacation), href: "/inspiration/travel-looks" },
  { slug: "street-style", name: "Street Style", image: unsplash(PHOTO.styleStreet), href: "/inspiration/street-style" },
  { slug: "minimal", name: "Minimal", image: unsplash(PHOTO.styleMinimal), href: "/inspiration/minimal" },
  { slug: "festive", name: "Festive", image: unsplash(PHOTO.styleFestive), href: "/inspiration/festive" },
];

export const instagramPosts = [
  { id: "ig1", image: unsplash(PHOTO.ig1), alt: "Woman in striped wide-leg trousers against a teal wall" },
  { id: "ig2", image: unsplash(PHOTO.ig2), alt: "Man in a black leather jacket and sunglasses sitting on a ledge" },
  { id: "ig3", image: unsplash(PHOTO.ig3), alt: "Portrait of a woman in a denim jacket" },
  { id: "ig4", image: unsplash(PHOTO.ig4), alt: "Woman in a plaid coat on a city street" },
  { id: "ig5", image: unsplash(PHOTO.ig5), alt: "Woman in a patterned sweater and boots by the water" },
  { id: "ig6", image: unsplash(PHOTO.ig6), alt: "Man in a green jacket seated in front of a circular window" },
];
