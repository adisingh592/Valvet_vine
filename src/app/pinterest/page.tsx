import { PageTransition } from "@/components/layout/PageTransition";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PinterestMasonry } from "@/components/inspiration/PinterestCard";
import { PinterestIcon } from "@/components/ui/SocialIcons";
import { inspiration } from "@/data/inspiration";
import { socialLinks } from "@/data/navigation";
import { buildMetadata } from "@/lib/seo";

const description = "Handpicked ideas for your next look — our moodboard of outfits, colours and styling ideas.";

export const metadata = buildMetadata({ title: "Pinterest Inspiration", description, path: "/pinterest" });

export default function PinterestPage() {
  return (
    <PageTransition>
      <div className="container-vv pt-4 sm:pt-6">
        <Breadcrumbs items={[{ label: "Inspiration", href: "/inspiration" }, { label: "Pinterest board" }]} />
        <header className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-mocha">Moodboard</p>
          <h1 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">Pinterest Inspiration</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{description}</p>
          <a
            href={socialLinks.pinterest}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-velvet px-5 py-2.5 text-sm font-medium text-white transition-[background-color,translate] duration-250 hover:-translate-y-0.5 hover:bg-velvet-dark"
          >
            <PinterestIcon className="size-4" />
            Follow on Pinterest
          </a>
        </header>

        <PinterestMasonry items={inspiration} className="mt-12" />
      </div>
    </PageTransition>
  );
}
