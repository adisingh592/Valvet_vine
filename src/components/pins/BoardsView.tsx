"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarClock, Plus, Trash2 } from "lucide-react";
import { usePins } from "@/lib/pins";
import { EmptyState } from "@/components/ui/EmptyState";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { useWishlist } from "@/components/providers/WishlistProvider";
import { cn } from "@/lib/format";

/** Profile-style overview: board chips, then the pins on the selected board. */
export function BoardsView() {
  const { pins, boards, ready, removePin } = usePins();
  const { slugs } = useWishlist();
  const [active, setActive] = useState<string>("all");

  const counts = Object.fromEntries(boards.map((b) => [b, pins.filter((p) => p.board === b).length]));
  const shown = active === "all" ? pins : pins.filter((p) => p.board === active);

  return (
    <div>
      <header className="mt-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl text-ink sm:text-5xl">My Boards</h1>
          <p className="mt-3 text-sm text-muted">
            {ready ? `${pins.length} pins · ${boards.length} boards · ${slugs.length} saved products` : "Loading your boards…"}
          </p>
        </div>
        <Link
          href="/create"
          className="inline-flex items-center gap-2 rounded-full bg-velvet px-5 py-2.5 text-sm font-medium text-white transition-[background-color,translate] duration-250 hover:-translate-y-0.5 hover:bg-velvet-dark"
        >
          <Plus aria-hidden className="size-4" /> Create pin
        </Link>
      </header>

      <div role="tablist" aria-label="Boards" className="no-scrollbar -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        {[{ id: "all", label: "All pins", count: pins.length }, ...boards.map((b) => ({ id: b, label: b, count: counts[b] }))].map(
          (tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active === tab.id}
              onClick={() => setActive(tab.id)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-1.5 text-xs font-medium transition-[background-color,border-color,color] duration-200",
                active === tab.id ? "border-velvet bg-velvet text-white" : "border-line bg-white/70 text-ink/80 hover:border-rose",
              )}
            >
              {tab.label} <span className="opacity-70">{tab.count}</span>
            </button>
          ),
        )}
      </div>

      <div className="mt-6">
        {ready && shown.length === 0 ? (
          <EmptyState
            title={active === "all" ? "No pins yet" : "This board is empty"}
            message="Save looks you love to boards — pick a photo, add a title and tags, and it's pinned."
            action={<ButtonLink href="/create">Create your first pin</ButtonLink>}
          />
        ) : (
          <ul className="columns-2 gap-3 sm:gap-5 md:columns-3 lg:columns-4">
            <AnimatePresence initial={false}>
              {shown.map((pin, i) => {
                const card = (
                  <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-cream shadow-soft">
                    <Image
                      src={pin.image}
                      alt=""
                      width={600}
                      height={800}
                      loading={i < 4 ? "eager" : undefined}
                      unoptimized={pin.image.startsWith("data:")}
                      sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 48vw"
                      className="h-auto w-full object-cover"
                    />
                    {pin.scheduledFor && (
                      <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[0.65rem] font-medium text-ink">
                        <CalendarClock aria-hidden className="size-3" />
                        {new Date(pin.scheduledFor).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </span>
                    )}
                  </div>
                );
                return (
                  <motion.li
                    key={pin.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="group relative mb-5 break-inside-avoid"
                  >
                    {pin.link ? <Link href={pin.link}>{card}</Link> : card}
                    <button
                      type="button"
                      onClick={() => removePin(pin.id)}
                      aria-label={`Delete pin ${pin.title}`}
                      className="absolute right-2 top-2 inline-flex size-8 items-center justify-center rounded-full bg-white/90 text-ink opacity-100 transition-opacity hover:text-velvet lg:opacity-0 lg:group-focus-within:opacity-100 lg:group-hover:opacity-100"
                    >
                      <Trash2 aria-hidden className="size-3.5" />
                    </button>
                    <div className="px-1 pt-2.5">
                      <h2 className="text-sm font-semibold text-ink">{pin.title}</h2>
                      <p className="mt-0.5 text-xs text-muted">{pin.board}</p>
                      {pin.tags.length > 0 && (
                        <p className="mt-1 truncate text-[0.7rem] text-mocha">{pin.tags.map((t) => `#${t}`).join(" ")}</p>
                      )}
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </div>
  );
}
