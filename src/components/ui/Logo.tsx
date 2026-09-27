import Link from "next/link";
import { cn } from "@/lib/format";

/** Wordmark with a small vine crest. Hover gently widens the letter-spacing. */
export function Logo({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Velvet Vine — home"
      className={cn("group inline-flex flex-col items-center leading-none text-ink", className)}
    >
      <svg
        aria-hidden
        viewBox="0 0 40 12"
        className={cn("mb-0.5 h-2.5 w-8 text-gold transition-opacity duration-300", compact && "opacity-80")}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      >
        <path d="M20 11V3" />
        <path d="M20 7c-2.5-3.5-6-4-9-2.5M20 7c2.5-3.5 6-4 9-2.5" />
        <path d="M11 4.5c-1.5 1.8-4 2.2-6.5 1.5M29 4.5c1.5 1.8 4 2.2 6.5 1.5" />
        <circle cx="20" cy="2" r="1" fill="currentColor" stroke="none" />
      </svg>
      <span
        className={cn(
          "font-serif font-medium uppercase tracking-[0.14em] transition-[letter-spacing] duration-300 ease-[var(--ease-vv)] group-hover:tracking-[0.18em]",
          compact ? "text-xl" : "text-[1.35rem] sm:text-2xl",
        )}
      >
        Velvet Vine
      </span>
      {!compact && (
        <span className="mt-1 hidden text-[0.5rem] font-medium uppercase tracking-[0.32em] text-muted sm:block">
          Fashion for every you
        </span>
      )}
    </Link>
  );
}
