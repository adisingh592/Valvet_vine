"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SlidersHorizontal, X } from "lucide-react";
import { FilterSidebar } from "./FilterSidebar";
import { SortDropdown } from "./SortDropdown";
import { ProductGrid } from "@/components/product/ProductGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  EMPTY_FILTERS,
  activeFilterCount,
  applyFilters,
  buildFacets,
  sortProducts,
  type FilterKey,
  type FilterState,
  type SortKey,
} from "@/lib/filters";
import { DURATION, EASE_OUT } from "@/lib/motion";
import type { Product } from "@/types";

const PAGE_SIZE = 12;

interface CategoryViewProps {
  products: Product[];
  /** Filter groups that don't make sense on this page (e.g. category on /women/dresses). */
  hideFilters?: FilterKey[];
  defaultSort?: SortKey;
}

/** Product listing with local filtering, sorting and "load more". */
export function CategoryView({ products, hideFilters = [], defaultSort = "popular" }: CategoryViewProps) {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [sort, setSort] = useState<SortKey>(defaultSort);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const facets = useMemo(() => buildFacets(products, filters), [products, filters]);
  const results = useMemo(() => sortProducts(applyFilters(products, filters), sort), [products, filters, sort]);
  const shown = results.slice(0, visible);
  const filterCount = activeFilterCount(filters);

  const toggle = (key: FilterKey, value: string) => {
    setFilters((f) => ({
      ...f,
      [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value],
    }));
    setVisible(PAGE_SIZE);
  };
  const clear = () => {
    setFilters(EMPTY_FILTERS);
    setVisible(PAGE_SIZE);
  };

  const chips = (Object.keys(filters) as FilterKey[]).flatMap((key) =>
    filters[key].map((value) => ({
      key,
      value,
      label: facets[key].find((o) => o.value === value)?.label ?? value,
    })),
  );

  const sidebar = (
    <FilterSidebar facets={facets} filters={filters} onToggle={toggle} onClear={clear} hide={hideFilters} />
  );

  return (
    <div className="container-vv mt-8 grid gap-8 lg:grid-cols-[230px_minmax(0,1fr)] xl:gap-10">
      <aside aria-label="Filters" className="hidden lg:block">
        <div className="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto pr-2 [scrollbar-width:thin]">{sidebar}</div>
      </aside>

      <div>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted" aria-live="polite">
            <span className="font-medium text-ink">{results.length}</span> {results.length === 1 ? "style" : "styles"}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white/80 px-4 text-xs font-medium text-ink lg:hidden"
            >
              <SlidersHorizontal aria-hidden className="size-3.5" />
              Filters{filterCount > 0 && ` (${filterCount})`}
            </button>
            <SortDropdown value={sort} onChange={setSort} />
          </div>
        </div>

        {chips.length > 0 && (
          <ul className="mb-5 flex flex-wrap gap-2" aria-label="Active filters">
            {chips.map((chip) => (
              <li key={`${chip.key}-${chip.value}`}>
                <button
                  type="button"
                  onClick={() => toggle(chip.key, chip.value)}
                  aria-label={`Remove filter ${chip.label}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-blush/70 px-3 py-1 text-xs text-ink transition-colors hover:bg-blush"
                >
                  {chip.label}
                  <X aria-hidden className="size-3" />
                </button>
              </li>
            ))}
          </ul>
        )}

        {results.length === 0 ? (
          <EmptyState
            title="No products found"
            message="Nothing matches all of those filters. Try removing one or two."
            action={
              <button
                type="button"
                onClick={clear}
                className="rounded-full bg-velvet px-6 py-3 text-sm font-medium text-white transition-[background-color,translate] duration-250 hover:-translate-y-0.5 hover:bg-velvet-dark"
              >
                Clear filters
              </button>
            }
          />
        ) : (
          <>
            <ProductGrid key={`${JSON.stringify(filters)}-${sort}`} products={shown} priorityCount={4} />
            {visible < results.length && (
              <div className="mt-10 flex flex-col items-center gap-3">
                <p className="text-xs text-muted">
                  Showing {shown.length} of {results.length}
                </p>
                <button
                  type="button"
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="rounded-full border border-ink/15 bg-white px-6 py-3 text-sm font-medium text-ink transition-[background-color,translate] duration-250 hover:-translate-y-0.5 hover:bg-cream"
                >
                  Load more
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <FilterDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} resultCount={results.length}>
        {sidebar}
      </FilterDrawer>
    </div>
  );
}

function FilterDrawer({
  open,
  onClose,
  resultCount,
  children,
}: {
  open: boolean;
  onClose: () => void;
  resultCount: number;
  children: React.ReactNode;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onCloseRef.current();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            aria-hidden
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.normal }}
            className="absolute inset-0 bg-ink"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: DURATION.normal, ease: EASE_OUT }}
            className="absolute inset-y-0 left-0 flex w-[min(88vw,360px)] flex-col bg-ivory shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <p className="font-serif text-xl text-ink">Filters</p>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close filters"
                className="inline-flex size-10 items-center justify-center rounded-full hover:bg-cream"
              >
                <X aria-hidden className="size-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
            <div className="border-t border-line p-4">
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-full bg-velvet py-3 text-sm font-medium text-white hover:bg-velvet-dark"
              >
                Show {resultCount} {resultCount === 1 ? "style" : "styles"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
