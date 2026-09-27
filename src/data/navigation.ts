export interface NavLink {
  label: string;
  href: string;
  highlight?: boolean;
}

export const mainNav: NavLink[] = [
  { label: "Men", href: "/men" },
  { label: "Women", href: "/women" },
  { label: "New In", href: "/new-in" },
  { label: "Collections", href: "/collections" },
  { label: "Accessories", href: "/accessories" },
  { label: "Brands", href: "/brands" },
  { label: "Inspiration", href: "/inspiration" },
  { label: "Deals", href: "/deals", highlight: true },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "Men", href: "/men" },
      { label: "Women", href: "/women" },
      { label: "New In", href: "/new-in" },
      { label: "Collections", href: "/collections" },
      { label: "Accessories", href: "/accessories" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQ", href: "/contact#faq" },
      { label: "Contact", href: "/contact" },
      { label: "Work with us", href: "/business" },
      { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Style Journal", href: "/inspiration" },
      { label: "Pinterest Board", href: "/pinterest" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
    ],
  },
];

/**
 * Social profile links. PLACEHOLDERS pointing at each platform's homepage —
 * replace with Velvet Vine's real profile URLs once they exist.
 */
export const socialLinks = {
  instagram: "https://www.instagram.com/",
  pinterest: "https://www.pinterest.com/",
  youtube: "https://www.youtube.com/",
  facebook: "https://www.facebook.com/",
  tiktok: "https://www.tiktok.com/",
} as const;

/**
 * Direct contact channels used by the Connect button and the business page.
 * PLACEHOLDERS — replace the number and addresses with Velvet Vine's real ones.
 * `whatsapp` is the full international number, digits only (wa.me format).
 */
export const contactChannels = {
  whatsapp: "910000000000",
  whatsappMessage: "Hi Velvet Vine! I'd like to get in touch.",
  email: "hello@velvetvine.in",
  businessEmail: "partners@velvetvine.in",
  phone: "+91 00000 00000",
  linkedin: "https://www.linkedin.com/",
} as const;

export function whatsappUrl(message: string = contactChannels.whatsappMessage) {
  return `https://wa.me/${contactChannels.whatsapp}?text=${encodeURIComponent(message)}`;
}
