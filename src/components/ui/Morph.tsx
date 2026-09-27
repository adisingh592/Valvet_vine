import { ViewTransition } from "react";

/*
 * Shared-element morphs between routes (React <ViewTransition> on top of the
 * browser View Transition API).
 *
 * The same product or category often appears on both the old and the new
 * page (e.g. a trending card on Home and a "Style it with" card on the
 * product page). To stop those from flying around, a morph only runs when
 * the navigation carries a transition type naming *that exact item* — set by
 * the <Link> the shopper clicked via `transitionTypes={[morphType(kind, slug)]}`.
 */

export type MorphKind = "product" | "category" | "section" | "collection" | "inspiration";

/**
 * `sizes` of the image each morph lands on. The destination components use
 * these, and <MorphLink> preloads the same candidate on hover/touch, so the
 * target image is already decoded when the transition captures the new page.
 */
export const MORPH_TARGET_SIZES: Record<MorphKind, string> = {
  product: "(min-width: 1024px) 45vw, 100vw",
  category: "(min-width: 768px) 55vw, 100vw",
  section: "(min-width: 768px) 55vw, 100vw",
  collection: "(min-width: 768px) 55vw, 100vw",
  inspiration: "(min-width: 1024px) 42vw, 100vw",
};

export function morphType(kind: MorphKind, slug: string) {
  return `morph-${kind}-${slug}`;
}

export function Morph({ kind, slug, children }: { kind: MorphKind; slug: string; children: React.ReactElement }) {
  return (
    <ViewTransition name={`${kind}-${slug}`} share={{ [morphType(kind, slug)]: "morph", default: "none" }} default="none">
      {children}
    </ViewTransition>
  );
}
