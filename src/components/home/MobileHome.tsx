"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BadgePercent, Crown, Flower2, Gem, Heart, Shirt, SlidersHorizontal, Sparkles, Watch } from "lucide-react";
import { SearchBar } from "@/components/layout/SearchBar";
import { collections } from "@/data/collections";
import { inspiration } from "@/data/inspiration";
import { cn } from "@/lib/format";
import { DURATION, EASE_OUT } from "@/lib/motion";

/*
 * Phone-first homepage block in the style of a pin app: search, feed tabs,
 * a swipeable hero, icon shortcuts and a "Trending Pins" board.
 * Links here are plain (no shared-element morph) because the same items also
 * appear further down the homepage, and morph names must be unique.
 */

const FEEDS: { id: string; label: string; slugs?: string[] }[] = [
  { id: "for-you", label: "For You" },
  { id: "aesthetic", label: "Aesthetic", slugs: ["minimal", "date-night", "street-style", "denim-days", "accessories-styling"] },
  { id: "work", label: "Work", slugs: ["office-wear", "modern-menswear", "minimal"] },
  { id: "travel", label: "Travel", slugs: ["travel-looks", "summer-outfits", "casual-weekend"] },
  { id: "occasion", label: "Occasion", slugs: ["wedding-guest", "festive", "date-night"] },
];

const SHORTCUTS = [
  { label: "Women", href: "/women", Icon: Flower2 },
  { label: "Men", href: "/men", Icon: Shirt },
  { label: "Accessories", href: "/accessories", Icon: Watch },
  { label: "New In", href: "/new-in", Icon: Sparkles },
  { label: "Deals", href: "/deals", Icon: BadgePercent },
  { label: "Brands", href: "/brands", Icon: Crown },
  { label: "Collections", href: "/collections", Icon: Gem },
];

const SLIDES = collections.slice(0, 4);
const LIKES_KEY = "vv-liked-pins";

/** Stable, believable save counts for the demo board. */
function baseSaves(slug: string) {
  let hash = 0;
  for (const ch of slug) hash = (hash * 31 + ch.charCodeAt(0)) % 9973;
  return 900 + (hash % 4200);
}

function formatCount(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K` : String(n);
}

export function MobileHome() {
  const [feed, setFeed] = useState(FEEDS[0].id);
  const [slide, setSlide] = useState(0);
  const [liked, setLiked] = useState<string[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const touching = useRef(false);

  useEffect(() => {
    try {
      setLiked(JSON.parse(window.localStorage.getItem(LIKES_KEY) ?? "[]"));
    } catch {
      // No storage: likes last for this visit only.
    }
  }, []);

  // Gentle auto-advance; pauses while the shopper is swiping, off for reduced motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      const track = trackRef.current;
      if (!track || touching.current || track.offsetParent === null) return;
      const next = (Math.round(track.scrollLeft / track.clientWidth) + 1) % SLIDES.length;
      track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const toggleLike = (slug: string) => {
    setLiked((current) => {
      const next = current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug];
      try {
        window.localStorage.setItem(LIKES_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const active = FEEDS.find((f) => f.id === feed)!;
  const pins = active.slugs ? inspiration.filter((i) => active.slugs!.includes(i.slug)) : inspiration.slice(0, 8);

  return (
    <section aria-labelledby="mobile-home-title" className="md:hidden">
      <h1 id="mobile-home-title" className="sr-only">
        Velvet Vine — discover fashion you love
      </h1>

      {/* Search + filters */}
      <div className="container-vv flex items-center gap-2 pt-3">
        <SearchBar size="lg" className="min-w-0 flex-1" />
        <Link
          href="/new-in"
          aria-label="Browse with filters"
          className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-line bg-white/80 text-ink transition-colors hover:border-rose"
        >
          <SlidersHorizontal aria-hidden className="size-[18px]" />
        </Link>
      </div>

      {/* Feed tabs */}
      <div role="tablist" aria-label="Feeds" className="no-scrollbar container-vv mt-4 flex gap-2 overflow-x-auto">
        {FEEDS.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={feed === f.id}
            aria-controls="mobile-pins"
            onClick={() => setFeed(f.id)}
            className={cn(
              "relative shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors duration-200",
              feed === f.id ? "font-medium text-white" : "text-ink/75 hover:text-ink",
            )}
          >
            {feed === f.id && (
              <motion.span
                layoutId="feed-pill"
                aria-hidden
                transition={{ duration: DURATION.fast, ease: EASE_OUT }}
                className="absolute inset-0 rounded-full bg-mocha"
              />
            )}
            <span className="relative">{f.label}</span>
          </button>
        ))}
      </div>

      {/* Swipeable hero */}
      <div className="container-vv mt-4">
        <div
          ref={trackRef}
          onTouchStart={() => (touching.current = true)}
          onTouchEnd={() => (touching.current = false)}
          onScroll={(e) => {
            const t = e.currentTarget;
            setSlide(Math.round(t.scrollLeft / t.clientWidth));
          }}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-[var(--radius-hero)] shadow-soft"
          aria-roledescription="carousel"
          aria-label="Featured edits"
        >
          {SLIDES.map((c, i) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${SLIDES.length}: ${c.title}`}
              className="relative block aspect-[16/11] w-full shrink-0 snap-center overflow-hidden bg-blush"
            >
              <Image src={c.image} alt="" fill loading={i === 0 ? "eager" : undefined} sizes="(min-width: 768px) 1px, 100vw" className="object-cover" />
              <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgb(245_230_224/0.92)_0%,rgb(245_230_224/0.6)_45%,transparent_75%)]" />
              <div className="absolute inset-y-0 left-0 flex w-3/5 flex-col justify-center p-5">
                <p className="text-[0.6rem] font-medium uppercase tracking-[0.25em] text-mocha">{c.eyebrow}</p>
                <p className="mt-1.5 font-serif text-[1.65rem] italic leading-[1.1] text-ink">{c.title}</p>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink/70">{c.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-2.5 flex justify-center gap-1.5" aria-hidden>
          {SLIDES.map((c, i) => (
            <span
              key={c.slug}
              className={cn("h-1.5 rounded-full transition-[width,background-color] duration-300", i === slide ? "w-4 bg-mocha" : "w-1.5 bg-line")}
            />
          ))}
        </div>
      </div>

      {/* Icon shortcuts */}
      <nav aria-label="Shop by section" className="mt-5">
        <ul className="no-scrollbar container-vv flex gap-4 overflow-x-auto pb-1">
          {SHORTCUTS.map(({ label, href, Icon }, i) => (
            <li key={href} className="shrink-0">
              <Link href={href} className="group flex w-16 flex-col items-center gap-1.5">
                <span
                  className={cn(
                    "grid size-14 place-items-center rounded-full ring-1 transition-[background-color,scale] duration-200 group-active:scale-95",
                    i === 0 ? "bg-mocha text-white ring-mocha" : "bg-cream text-mocha ring-line group-hover:bg-blush",
                  )}
                >
                  <Icon aria-hidden className="size-6" strokeWidth={1.6} />
                </span>
                <span className="text-[0.7rem] font-medium text-ink/85">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Trending pins */}
      <div className="container-vv mt-7">
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-2xl text-ink">Trending Pins</h2>
          <Link href="/pinterest" className="text-sm font-medium text-mocha">
            See all →
          </Link>
        </div>
        <div id="mobile-pins" role="tabpanel" aria-label={active.label} className="mt-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.ul
              key={feed}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DURATION.normal, ease: EASE_OUT }}
              className="columns-2 gap-3"
            >
              {pins.map((pin, i) => {
                const isLiked = liked.includes(pin.slug);
                const count = baseSaves(pin.slug) + (isLiked ? 1 : 0);
                return (
                  <li key={pin.slug} className="mb-4 break-inside-avoid">
                    <Link href={`/inspiration/${pin.slug}`} className="block">
                      <span
                        className={cn(
                          "relative block overflow-hidden rounded-[var(--radius-card)] bg-cream shadow-soft",
                          i % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/5]",
                        )}
                      >
                        <Image src={pin.image} alt="" fill loading={i < 2 ? "eager" : undefined} sizes="(min-width: 768px) 1px, 48vw" className="object-cover" />
                      </span>
                      <span className="mt-2 block px-0.5 text-[0.8rem] font-medium leading-snug text-ink">{pin.subtitle}</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleLike(pin.slug)}
                      aria-pressed={isLiked}
                      aria-label={`${isLiked ? "Unlike" : "Like"} ${pin.title}, ${count} likes`}
                      className="mt-1 inline-flex items-center gap-1 rounded-full px-0.5 py-0.5 text-xs text-muted"
                    >
                      <motion.span key={String(isLiked)} initial={{ scale: 0.6 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 15 }}>
                        <Heart aria-hidden className={cn("size-3.5", isLiked ? "fill-velvet text-velvet" : "text-velvet")} />
                      </motion.span>
                      {formatCount(count)}
                    </button>
                  </li>
                );
              })}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
