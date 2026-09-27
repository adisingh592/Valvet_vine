import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/format";

type Variant = "primary" | "outline" | "light" | "text";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-velvet text-white hover:bg-velvet-dark shadow-[0_8px_20px_-10px_rgb(157_69_82/0.7)]",
  outline: "border border-ink/15 bg-white/70 text-ink hover:border-ink/30 hover:bg-white",
  light: "bg-white text-ink hover:bg-cream",
  text: "px-0! py-0! text-ink",
};

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: "sm" | "md";
  className?: string;
  arrow?: boolean;
}

/**
 * Internal CTA link: slight lift on hover and the arrow slides right.
 * (Outbound retailer links use <RetailerButton> instead.)
 */
export function ButtonLink({ href, children, variant = "primary", size = "md", className, arrow = true }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group/btn inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[background-color,border-color,translate,box-shadow] duration-250 ease-[var(--ease-vv)]",
        variant !== "text" && "hover:-translate-y-0.5",
        size === "md" ? "px-6 py-3 text-sm" : "px-4 py-2 text-xs",
        VARIANTS[variant],
        className,
      )}
    >
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden
          className={cn(
            "transition-transform duration-250 ease-[var(--ease-vv)] group-hover/btn:translate-x-[5px]",
            size === "md" ? "size-4" : "size-3.5",
          )}
        />
      )}
    </Link>
  );
}
