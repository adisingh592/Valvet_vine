"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Search, X } from "lucide-react";
import { getAllProducts, searchProducts } from "@/lib/catalog";
import { cn, formatPrice } from "@/lib/format";
import { DURATION } from "@/lib/motion";

interface SearchBarProps {
  className?: string;
  autoFocus?: boolean;
  onNavigate?: () => void;
  size?: "sm" | "lg";
  defaultQuery?: string;
}

const POPULAR = ["Dresses", "White shirt", "Sneakers", "Kurta", "Watches"];

/** Local search with live suggestions. Enter opens the full results page. */
export function SearchBar({ className, autoFocus, onNavigate, size = "sm", defaultQuery = "" }: SearchBarProps) {
  const router = useRouter();
  const listId = useId();
  const [query, setQuery] = useState(defaultQuery);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => searchProducts(query, getAllProducts()).slice(0, 5), [query]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    onNavigate?.();
    router.push(href);
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const q = query.trim();
    if (q) go(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div ref={wrapperRef} className={cn("relative", className)}>
      <form role="search" onSubmit={submit}>
        <label htmlFor={`${listId}-input`} className="sr-only">
          Search for outfits, brands or styles
        </label>
        <div
          className={cn(
            "flex items-center gap-2 rounded-full border border-line bg-white/80 transition-[border-color,box-shadow] duration-200 focus-within:border-rose focus-within:shadow-[0_0_0_4px_rgb(201_143_140/0.15)]",
            size === "lg" ? "h-12 px-4" : "h-10 px-3.5",
          )}
        >
          <Search aria-hidden className="size-4 shrink-0 text-muted" />
          <input
            id={`${listId}-input`}
            type="search"
            value={query}
            autoFocus={autoFocus}
            autoComplete="off"
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
            placeholder="Search for outfits, brands or styles..."
            aria-controls={`${listId}-list`}
            aria-expanded={open}
            className="w-full min-w-0 bg-transparent text-sm text-ink placeholder:text-muted/80 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="rounded-full p-0.5 text-muted hover:text-ink"
            >
              <X aria-hidden className="size-3.5" />
            </button>
          )}
        </div>
      </form>

      <AnimatePresence>
        {open && (
          <motion.div
            id={`${listId}-list`}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-[calc(100%+8px)] z-50 min-w-72 overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-lift"
          >
            {query.trim() === "" ? (
              <div className="p-2">
                <p className="mb-2 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-muted">Popular searches</p>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => go(`/search?q=${encodeURIComponent(term)}`)}
                      className="rounded-full bg-cream px-3 py-1 text-xs text-ink transition-colors hover:bg-blush"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              <p className="p-3 text-sm text-muted">No matches for “{query}”. Try a colour, brand or category.</p>
            ) : (
              <ul>
                {results.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/products/${p.slug}`}
                      onClick={() => {
                        setOpen(false);
                        onNavigate?.();
                      }}
                      className="flex items-center gap-3 rounded-xl p-2 transition-colors duration-200 hover:bg-cream"
                    >
                      <span className="skeleton relative size-11 shrink-0 overflow-hidden rounded-lg">
                        <Image src={p.image} alt="" fill sizes="44px" className="object-cover" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm text-ink">{p.name}</span>
                        <span className="block text-xs text-muted">
                          {formatPrice(p.price)} · on {p.retailer}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
                <li className="mt-1 border-t border-line pt-1">
                  <button
                    type="button"
                    onClick={() => go(`/search?q=${encodeURIComponent(query.trim())}`)}
                    className="group/all flex w-full items-center justify-between rounded-xl p-2 text-sm font-medium text-velvet hover:bg-cream"
                  >
                    See all results for “{query.trim()}”
                    <ArrowRight
                      aria-hidden
                      className="size-4 transition-transform group-hover/all:translate-x-1"
                      style={{ transitionDuration: `${DURATION.micro}s` }}
                    />
                  </button>
                </li>
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
