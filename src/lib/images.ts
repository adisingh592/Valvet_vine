/**
 * Editorial/placeholder imagery from Unsplash (free under the Unsplash
 * License). These are stand-ins: they illustrate a style and are not the
 * retailer's actual product photos. Swap for licensed partner imagery or
 * the affiliate programme's product feed images before launch.
 */

interface CropOptions {
  /** Focal point 0–1 and zoom (>1 zooms in) — used for detail views. */
  x?: number;
  y?: number;
  zoom?: number;
}

export function unsplash(id: string, crop?: CropOptions) {
  const base = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop`;
  if (!crop) return base;
  const { x = 0.5, y = 0.5, zoom = 1 } = crop;
  return `${base}&crop=focalpoint&fp-x=${x}&fp-y=${y}&fp-z=${zoom}`;
}

/** Main view + two detail crops of the same photo. */
export function galleryFor(id: string) {
  return [
    unsplash(id),
    unsplash(id, { y: 0.35, zoom: 1.6 }),
    unsplash(id, { y: 0.7, zoom: 1.8 }),
    unsplash(id, { x: 0.45, y: 0.5, zoom: 1.3 }),
  ];
}
