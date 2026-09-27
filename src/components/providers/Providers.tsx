"use client";

import { MotionConfig } from "motion/react";
import { WishlistProvider } from "./WishlistProvider";
import { MorphScrollFix } from "./MorphScrollFix";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // reducedMotion="user": when the OS asks for less motion, Motion skips
    // transform animations and keeps opacity fades.
    <MotionConfig reducedMotion="user">
      <MorphScrollFix />
      <WishlistProvider>{children}</WishlistProvider>
    </MotionConfig>
  );
}
