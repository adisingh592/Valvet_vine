import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { Morph } from "@/components/ui/Morph";
import { MorphLink } from "@/components/ui/MorphLink";
import { inspiration } from "@/data/inspiration";
import { buildMetadata } from "@/lib/seo";

const description = "Style guides and outfit ideas for every occasion — from office dressing to wedding season and weekend denim.";

export const metadata = buildMetadata({ title: "Style Guides & Inspiration", description, path: "/inspiration" });

export default function InspirationPage() {
  const [featured, ...rest] = inspiration;

  return (
    <PageTransition>
      <div className="container-vv pt-4 sm:pt-6">
        <Breadcrumbs items={[{ label: "Inspiration" }]} />
        <header className="mt-8 max-w-2xl">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-mocha">The style journal</p>
          <h1 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">Style Guides</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{description}</p>
        </header>

        {/* Featured guide */}
        <MorphLink
          href={`/inspiration/${featured.slug}`}
          morph={{ kind: "inspiration", slug: featured.slug, image: featured.image }}
          className="group mt-10 grid overflow-hidden rounded-[var(--radius-hero)] bg-cream shadow-soft md:grid-cols-2"
        >
          <div className="skeleton relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[420px]">
            <Morph kind="inspiration" slug={featured.slug}>
              <div className="absolute inset-0 overflow-hidden rounded-t-[var(--radius-hero)] md:rounded-none md:rounded-l-[var(--radius-hero)]">
                <Image
                  src={featured.image}
                  alt=""
                  fill
                  preload
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-[scale] duration-[550ms] ease-[var(--ease-vv)] group-hover:scale-[1.04]"
                />
              </div>
            </Morph>
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.25em] text-mocha">Featured guide</p>
            <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">{featured.title}</h2>
            <p className="mt-2 text-sm italic text-mocha">{featured.subtitle}</p>
            <p className="mt-4 text-sm leading-relaxed text-ink/75">{featured.description}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-velvet">
              Read the guide
              <ArrowRight aria-hidden className="size-4 transition-transform duration-250 group-hover:translate-x-[5px]" />
            </span>
          </div>
        </MorphLink>

        <ul className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((item, i) => (
            <li key={item.slug}>
              <Reveal delay={(i % 3) * 0.06}>
                <MorphLink
                  href={`/inspiration/${item.slug}`}
                  morph={{ kind: "inspiration", slug: item.slug, image: item.image }}
                  className="group block">
                  <div className="skeleton relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] shadow-soft">
                    <Morph kind="inspiration" slug={item.slug}>
                      <div className="absolute inset-0 overflow-hidden rounded-[var(--radius-card)]">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                          className="object-cover transition-[scale] duration-[350ms] ease-[var(--ease-vv)] group-hover:scale-[1.04]"
                        />
                      </div>
                    </Morph>
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wider text-ink">
                      {item.audience === "Everyone" ? "For everyone" : `For ${item.audience.toLowerCase()}`}
                    </span>
                  </div>
                  <h2 className="mt-4 font-serif text-2xl text-ink">{item.title}</h2>
                  <p className="mt-1 text-sm text-muted">{item.subtitle}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                    <span className="link-underline">Read the guide</span>
                    <ArrowRight aria-hidden className="size-4 transition-transform duration-250 group-hover:translate-x-[5px]" />
                  </span>
                </MorphLink>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </PageTransition>
  );
}
