import { PageTransition } from "@/components/layout/PageTransition";
import { HeroSection } from "@/components/home/HeroSection";
import { MobileHome } from "@/components/home/MobileHome";
import { SelfLoveQuote } from "@/components/home/SelfLoveQuote";
import { WelcomeScreen } from "@/components/welcome/WelcomeScreen";
import { CategoryScroller } from "@/components/home/CategoryScroller";
import { StyleGuideCard } from "@/components/home/StyleGuideCard";
import { InstagramGrid } from "@/components/home/InstagramGrid";
import { CollectionCard } from "@/components/collections/CollectionCard";
import { PinterestMasonry } from "@/components/inspiration/PinterestCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PinterestIcon } from "@/components/ui/SocialIcons";
import { homeCategories } from "@/data/categories";
import { getCollection } from "@/data/collections";
import { inspiration, styleCards } from "@/data/inspiration";
import { socialLinks } from "@/data/navigation";

const PINTEREST_SLUGS = ["summer-outfits", "office-wear", "date-night", "street-style", "accessories-styling", "travel-looks", "modern-menswear", "festive"];

export default function HomePage() {
  const promos = ["summer-edit", "mens-essentials", "accessories-edit"].map((slug) => getCollection(slug)!);
  const pins = PINTEREST_SLUGS.map((slug) => inspiration.find((i) => i.slug === slug)!);

  return (
    <PageTransition>
      {/* First-visit splash (shown by the boot script in the root layout) */}
      <WelcomeScreen mode="overlay" />

      {/* Phones get an app-style home; tablets and desktops the editorial hero */}
      <MobileHome />
      <div className="hidden md:block">
        <HeroSection />
      </div>

      <section aria-label="Categories" className="container-vv mt-8 hidden sm:mt-10 md:block">
        <CategoryScroller categories={homeCategories} />
      </section>

      {/* Editorial promotional banners */}
      <SelfLoveQuote />

      <section aria-labelledby="collections-title" className="container-vv mt-14 sm:mt-20">
        <SectionHeading
          id="collections-title"
          eyebrow="Curated for you"
          title="Shop the Edits"
          subtitle="Handpicked collections for every season and style."
          action={{ label: "All collections", href: "/collections" }}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {promos.map((collection, i) => (
            <Reveal key={collection.slug} delay={i * 0.08}>
              <CollectionCard collection={collection} className="h-full min-h-[240px] sm:min-h-[280px]" />
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="pinterest-title" className="container-vv mt-20 sm:mt-28">
        <SectionHeading
          id="pinterest-title"
          eyebrow="Moodboard"
          title="Pinterest Inspiration"
          subtitle="Handpicked ideas for your next look."
          action={{ label: "Open the board", href: "/pinterest" }}
        />
        <Reveal>
          <PinterestMasonry items={pins} />
        </Reveal>
        <div className="mt-4 flex justify-center">
          <a
            href={socialLinks.pinterest}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/70 px-5 py-2.5 text-sm font-medium text-ink transition-[background-color,translate] duration-250 hover:-translate-y-0.5 hover:bg-white"
          >
            <PinterestIcon className="size-4 text-velvet" />
            Follow us on Pinterest
          </a>
        </div>
      </section>

      <section aria-labelledby="style-title" className="container-vv mt-20 sm:mt-28">
        <SectionHeading
          id="style-title"
          eyebrow="Style guides"
          title="Shop by Style"
          subtitle="Outfit ideas for every occasion."
          action={{ label: "All style guides", href: "/inspiration" }}
        />
        <Reveal>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-8">
            {styleCards.map((style) => (
              <li key={style.slug}>
                <StyleGuideCard style={style} />
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <InstagramGrid />
    </PageTransition>
  );
}
