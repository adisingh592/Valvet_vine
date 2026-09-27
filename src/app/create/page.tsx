import { Suspense } from "react";
import { PageTransition } from "@/components/layout/PageTransition";
import { CreatePinForm } from "@/components/pins/CreatePinForm";
import { Skeleton } from "@/components/ui/Skeleton";
import { buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata({ title: "Create Pin", description: "Save a look to one of your boards.", path: "/create" }),
  robots: { index: false, follow: true },
};

export default function CreatePinPage() {
  return (
    <PageTransition>
      <div className="container-vv pt-4 sm:pt-8">
        <Suspense fallback={<Skeleton className="mx-auto h-[520px] max-w-5xl rounded-[var(--radius-hero)]" />}>
          <CreatePinForm />
        </Suspense>
      </div>
    </PageTransition>
  );
}
