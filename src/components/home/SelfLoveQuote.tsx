import Image from "next/image";
import { Heart, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { PHOTO } from "@/data/photos";
import { unsplash } from "@/lib/images";

/** A soft pause between sections: a joyful portrait and a self-love quote. */
export function SelfLoveQuote() {
  return (
    <section aria-labelledby="self-love-title" className="container-vv mt-20 sm:mt-28">
      <Reveal>
        <div className="relative isolate grid items-center gap-8 overflow-hidden rounded-[var(--radius-hero)] bg-blush/70 p-6 sm:p-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-12 lg:p-14">
          {/* Soft glow behind the portrait */}
          <div aria-hidden className="absolute -left-24 -top-24 -z-10 size-80 rounded-full bg-white/50 blur-3xl" />

          <div className="relative mx-auto w-full max-w-[240px] md:max-w-[300px]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[var(--radius-card)] shadow-lift ring-8 ring-white/70">
              <Image
                src={unsplash(PHOTO.selfLove)}
                alt="Woman in a velvet-red top laughing"
                fill
                sizes="(min-width: 768px) 300px, 80vw"
                className="object-cover object-[50%_30%]"
              />
            </div>
            {/* Floating hearts */}
            <span aria-hidden className="vv-float absolute -right-3 top-10 grid size-11 place-items-center rounded-full bg-white text-velvet shadow-soft">
              <Heart className="size-5 fill-velvet" />
            </span>
            <span
              aria-hidden
              className="vv-float absolute -left-4 bottom-16 grid size-9 place-items-center rounded-full bg-white text-rose shadow-soft"
              style={{ animationDelay: "1.2s" }}
            >
              <Heart className="size-4 fill-rose" />
            </span>
            <span
              aria-hidden
              className="vv-float absolute -bottom-3 right-8 grid size-8 place-items-center rounded-full bg-white text-gold shadow-soft"
              style={{ animationDelay: "0.6s" }}
            >
              <Sparkles className="size-4" />
            </span>
          </div>

          <div className="text-center md:text-left">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-mocha">A little reminder</p>
            <h2 id="self-love-title" className="sr-only">
              Self-love
            </h2>
            <blockquote className="mt-4">
              <p className="font-serif text-3xl italic leading-[1.2] text-ink sm:text-4xl lg:text-5xl">
                &ldquo;To love oneself is the beginning of a lifelong romance.&rdquo;
              </p>
              <footer className="mt-4 text-sm text-muted">— Oscar Wilde</footer>
            </blockquote>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-ink/70 md:mx-0">
              Dress for the person you already are. You don&apos;t need a reason to feel beautiful today.
            </p>
            <div className="mt-7 flex justify-center md:justify-start">
              <ButtonLink href="/new-in">Treat yourself</ButtonLink>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
