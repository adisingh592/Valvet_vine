"use client";

import { Heart } from "lucide-react";
import { motion, useAnimationControls } from "motion/react";
import { useWishlist } from "@/components/providers/WishlistProvider";
import { cn } from "@/lib/format";

interface WishlistButtonProps {
  slug: string;
  name: string;
  className?: string;
  size?: "sm" | "md";
}

/** Heart toggle: 1 → 1.12 → 1 pop and outline → filled colour change. */
export function WishlistButton({ slug, name, className, size = "sm" }: WishlistButtonProps) {
  const { has, toggle } = useWishlist();
  const saved = has(slug);
  const controls = useAnimationControls();

  return (
    <motion.button
      type="button"
      animate={controls}
      onClick={() => {
        toggle(slug);
        controls.start({ scale: [1, 1.12, 1], transition: { duration: 0.2 } });
      }}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-white/90 text-ink shadow-soft backdrop-blur-sm transition-colors duration-200 hover:bg-white",
        size === "sm" ? "size-8" : "size-11 border border-line",
        className,
      )}
    >
      <Heart
        aria-hidden
        className={cn(
          "transition-[color,fill] duration-200",
          size === "sm" ? "size-4" : "size-5",
          saved ? "fill-velvet text-velvet" : "fill-transparent",
        )}
        strokeWidth={1.75}
      />
    </motion.button>
  );
}
