"use client";

import { useEffect } from "react";

/**
 * Makes shared-element morphs work from anywhere on a scrolled page.
 *
 * React only pairs a morph if the destination element is inside the viewport
 * when it measures the new page — but at that moment the window is still at
 * the old scroll position (Next resets scroll a little later), so a hero at
 * the top of the new page counts as "off-screen" and the morph is dropped.
 *
 * For morph navigations only (transition types starting with "morph-"), we
 * jump to the top inside the transition's update callback: after the browser
 * has captured the old snapshot, before React measures the new page. Normal
 * and back/forward navigations are untouched.
 */
export function MorphScrollFix() {
  useEffect(() => {
    if (typeof document.startViewTransition !== "function") return;
    const original = document.startViewTransition.bind(document);

    const patched = (arg?: ViewTransitionUpdateCallback | StartViewTransitionOptions) => {
      const isMorph =
        typeof arg === "object" &&
        arg !== null &&
        typeof arg.update === "function" &&
        Array.from(arg.types ?? []).some((type) => type.startsWith("morph-"));
      if (!isMorph) return original(arg);
      const update = arg.update!;
      return original({
        ...arg,
        update: () => {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
          return update();
        },
      });
    };

    document.startViewTransition = patched as typeof document.startViewTransition;
    return () => {
      document.startViewTransition = original;
    };
  }, []);

  return null;
}
