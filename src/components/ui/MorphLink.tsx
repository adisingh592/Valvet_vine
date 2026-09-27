"use client";

import Link from "next/link";
import { getImageProps } from "next/image";
import { MORPH_TARGET_SIZES, morphType, type MorphKind } from "./Morph";

const warmed = new Set<string>();

/**
 * Downloads and decodes the exact image candidate the destination page will
 * request (same src, srcset and sizes), so the morph lands on a ready image
 * instead of an empty placeholder.
 */
function warmImage(src: string, sizes: string) {
  if (typeof window === "undefined") return;
  const key = `${src}|${sizes}`;
  if (warmed.has(key)) return;
  warmed.add(key);
  const { props } = getImageProps({ src, alt: "", fill: true, sizes });
  const img = new window.Image();
  img.sizes = props.sizes ?? sizes;
  if (props.srcSet) img.srcset = props.srcSet;
  img.src = props.src;
  img.decode().catch(() => warmed.delete(key));
}

/** Pre-warm a morph target without waiting for hover (for the most likely clicks). */
export function warmMorphTarget(morph: { kind: MorphKind; image: string }) {
  warmImage(morph.image, MORPH_TARGET_SIZES[morph.kind]);
}

type MorphLinkProps = Omit<React.ComponentProps<typeof Link>, "transitionTypes"> & {
  /** Omit to render a plain link (no morph, no warm-up). */
  morph?: { kind: MorphKind; slug: string; image: string };
};

/** A <Link> that triggers one specific shared-element morph and pre-warms its target image. */
export function MorphLink({ morph, onPointerEnter, onFocus, onTouchStart, ...props }: MorphLinkProps) {
  const warm = () => morph && warmImage(morph.image, MORPH_TARGET_SIZES[morph.kind]);
  return (
    <Link
      {...props}
      transitionTypes={morph ? [morphType(morph.kind, morph.slug)] : undefined}
      onPointerEnter={(e) => {
        warm();
        onPointerEnter?.(e);
      }}
      onFocus={(e) => {
        warm();
        onFocus?.(e);
      }}
      onTouchStart={(e) => {
        warm();
        onTouchStart?.(e);
      }}
    />
  );
}
