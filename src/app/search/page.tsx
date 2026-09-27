import { Suspense } from "react";
import { PageTransition } from "@/components/layout/PageTransition";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductGridSkeleton, Skeleton } from "@/components/ui/Skeleton";
import { SearchResults } from "@/components/search/SearchResults";
import { buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata({ title: "Search", path: "/search" }),
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <PageTransition>
      <div className="container-vv pt-4 sm:pt-6">
        <Breadcrumbs items={[{ label: "Search" }]} />
        <div className="mt-8">
          <Suspense
            fallback={
              <div>
                <Skeleton className="h-11 w-72" />
                <Skeleton className="mt-6 h-12 w-full max-w-2xl rounded-full" />
                <ProductGridSkeleton className="mt-10" />
              </div>
            }
          >
            <SearchResults />
          </Suspense>
        </div>
      </div>
    </PageTransition>
  );
}
