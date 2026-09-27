import { cn } from "@/lib/format";

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn("skeleton rounded-md", className)} />;
}

export function ProductCardSkeleton() {
  return (
    <div aria-hidden className="rounded-[var(--radius-card)] bg-white p-2 shadow-soft">
      <Skeleton className="aspect-[4/5] w-full rounded-[14px]" />
      <div className="space-y-2 px-1.5 pb-2 pt-3">
        <Skeleton className="h-2.5 w-1/3" />
        <Skeleton className="h-3.5 w-4/5" />
        <Skeleton className="h-3.5 w-1/4" />
        <div className="flex gap-1.5 pt-1">
          <Skeleton className="size-3 rounded-full" />
          <Skeleton className="size-3 rounded-full" />
          <Skeleton className="size-3 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8, className }: { count?: number; className?: string }) {
  return (
    <div
      role="status"
      aria-label="Loading products"
      className={cn("grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4", className)}
    >
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
