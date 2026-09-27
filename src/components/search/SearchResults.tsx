"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { SearchBar } from "@/components/layout/SearchBar";
import { ProductGrid } from "@/components/product/ProductGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CategoryScroller } from "@/components/home/CategoryScroller";
import { homeCategories } from "@/data/categories";
import { inspiration } from "@/data/inspiration";
import { searchProducts } from "@/lib/catalog";

export function SearchResults() {
  const params = useSearchParams();
  const query = (params.get("q") ?? "").trim();
  const results = useMemo(() => searchProducts(query), [query]);
  const guides = useMemo(() => {
    const q = query.toLowerCase();
    return q ? inspiration.filter((i) => `${i.title} ${i.subtitle} ${i.productTag}`.toLowerCase().includes(q)) : [];
  }, [query]);

  return (
    <div>
      <header className="max-w-2xl">
        <h1 className="font-serif text-4xl text-ink sm:text-5xl">{query ? <>Results for “{query}”</> : "Search"}</h1>
        {query && (
          <p className="mt-3 text-sm text-muted" aria-live="polite">
            {results.length} {results.length === 1 ? "style" : "styles"} found
          </p>
        )}
        {/* key resets the input when the URL query changes */}
        <SearchBar key={query} defaultQuery={query} size="lg" className="mt-6" />
      </header>

      {guides.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted">Style guides:</span>
          {guides.map((g) => (
            <Link key={g.slug} href={`/inspiration/${g.slug}`} className="rounded-full bg-cream px-3 py-1 text-ink transition-colors hover:bg-blush">
              {g.title}
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10">
        {!query ? (
          <>
            <p className="mb-2 text-sm text-muted">Or browse a category:</p>
            <CategoryScroller categories={homeCategories} morph={false} />
          </>
        ) : results.length === 0 ? (
          <EmptyState
            title="No products found"
            message={`We couldn't find anything for “${query}”. Try a colour, a brand or a simpler word like “dress”.`}
            action={<ButtonLink href="/new-in">Browse new arrivals</ButtonLink>}
          />
        ) : (
          <ProductGrid key={query} products={results} priorityCount={4} />
        )}
      </div>
    </div>
  );
}
