/**
 * Animation timing system. Keep every Motion animation on these values so
 * the site feels consistent (CSS equivalents live in globals.css @theme).
 */
export const DURATION = {
  micro: 0.19, // icons, checkboxes, links
  fast: 0.25, // nav, dropdowns, buttons
  normal: 0.35, // product cards, menus, filters, image hover
  medium: 0.55, // section reveal, gallery, banners
  slow: 1.2, // hero and major editorial entrances
} as const;

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
