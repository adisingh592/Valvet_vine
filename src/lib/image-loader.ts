"use client";

import type { ImageLoaderProps } from "next/image";

/**
 * next/image loader for Unsplash URLs (resized by Unsplash's CDN) and local
 * files in /public (served as-is).
 */
export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  if (src.startsWith("/")) return src;
  const separator = src.includes("?") ? "&" : "?";
  return `${src}${separator}w=${width}&q=${quality ?? 75}`;
}
