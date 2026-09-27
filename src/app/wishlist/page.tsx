import { PageTransition } from "@/components/layout/PageTransition";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { WishlistView } from "@/components/search/WishlistView";
import { buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata({ title: "Saved Items", path: "/wishlist" }),
  robots: { index: false, follow: true },
};

export default function WishlistPage() {
  return (
    <PageTransition>
      <div className="container-vv pt-4 sm:pt-6">
        <Breadcrumbs items={[{ label: "Saved items" }]} />
        <header className="mb-8 mt-8">
          <h1 className="font-serif text-4xl text-ink sm:text-5xl">Saved Items</h1>
          <p className="mt-3 text-sm text-muted">Your wishlist, saved on this device.</p>
        </header>
        <WishlistView />
      </div>
    </PageTransition>
  );
}
