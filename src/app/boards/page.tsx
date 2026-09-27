import { PageTransition } from "@/components/layout/PageTransition";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BoardsView } from "@/components/pins/BoardsView";
import { buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata({ title: "My Boards", path: "/boards" }),
  robots: { index: false, follow: true },
};

export default function BoardsPage() {
  return (
    <PageTransition>
      <div className="container-vv pt-4 sm:pt-6">
        <Breadcrumbs items={[{ label: "My boards" }]} />
        <BoardsView />
      </div>
    </PageTransition>
  );
}
