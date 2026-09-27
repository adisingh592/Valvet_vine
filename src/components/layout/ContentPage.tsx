import { PageTransition } from "./PageTransition";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

interface ContentPageProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  updated?: string;
  children: React.ReactNode;
}

/** Simple long-form layout for about / legal pages. */
export function ContentPage({ eyebrow, title, intro, updated, children }: ContentPageProps) {
  return (
    <PageTransition>
      <div className="container-vv pt-4 sm:pt-6">
        <Breadcrumbs items={[{ label: title }]} />
        <article className="mx-auto mt-10 max-w-2xl">
          <header>
            {eyebrow && <p className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-mocha">{eyebrow}</p>}
            <h1 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">{title}</h1>
            {intro && <p className="mt-5 text-base leading-relaxed text-ink/75 sm:text-lg">{intro}</p>}
            {updated && <p className="mt-4 text-xs text-muted">Last updated: {updated}</p>}
          </header>
          <div className="prose-vv mt-4">{children}</div>
        </article>
      </div>
    </PageTransition>
  );
}
