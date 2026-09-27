"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { HeroSideCard } from "./HeroSideCard";
import { sections } from "@/data/categories";
import { PHOTO } from "@/data/photos";
import { unsplash } from "@/lib/images";
import { DURATION, EASE_OUT } from "@/lib/motion";

const textItem = (order: number) => ({
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DURATION.medium, ease: EASE_OUT, delay: 0.25 + order * 0.1 },
});


export function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className="container-vv pt-3 sm:pt-5">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="relative isolate min-h-[560px] overflow-hidden rounded-[var(--radius-hero)] bg-blush sm:min-h-[600px] lg:min-h-[620px]">
          {/* Editorial image pair — her and him, side by side */}
          <motion.div
            className="absolute inset-0 -z-10"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: DURATION.slow, ease: EASE_OUT }}
          >
            <div className="absolute inset-y-0 right-0 grid w-full grid-cols-2 md:w-[70%]">
              <div className="relative">
                <Image
                  src={unsplash(PHOTO.heroWoman, { y: 0.35 })}
                  alt="Woman in a blush ruffled dress in a sunlit field"
                  fill
                  preload
                  sizes="(min-width: 768px) 35vw, 50vw"
                  className="object-cover object-[50%_25%]"
                />
              </div>
              <div className="relative">
                <Image
                  src={unsplash(PHOTO.heroMan, { y: 0.3 })}
                  alt="Man in a camel blazer seated on a stool"
                  fill
                  preload
                  sizes="(min-width: 768px) 35vw, 50vw"
                  className="object-cover object-[50%_20%]"
                />
              </div>
            </div>
            {/* Soft wash so the headline stays readable */}
            <div className="absolute inset-0 bg-[linear-gradient(0deg,#f6e8e1_0%,#f6e8e1_30%,rgb(246_232_225/0.75)_50%,transparent_75%)] md:bg-[linear-gradient(90deg,#f6e8e1_0%,#f6e8e1_31%,rgb(246_232_225/0.8)_42%,rgb(246_232_225/0.25)_58%,transparent_68%)]" />
          </motion.div>

          <div className="flex h-full min-h-[inherit] flex-col justify-end p-6 pb-8 sm:p-10 md:max-w-[55%] md:justify-center lg:p-14">
            <motion.p
              {...textItem(0)}
              className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-mocha"
            >
              New Season
            </motion.p>
            <motion.h1
              id="hero-title"
              {...textItem(1)}
              className="mt-3 font-serif text-[3.4rem] leading-[0.95] text-ink sm:text-7xl xl:text-[5.4rem]"
            >
              Style
              <br />
              Without
              <br />
              <span className="inline-flex items-center gap-3">
                Limits
                <Heart aria-hidden strokeWidth={1} className="size-8 text-velvet/70 sm:size-11" />
              </span>
            </motion.h1>
            <motion.p {...textItem(2)} className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-ink/75">
              Modern fashion for everyone.
              <br />
              Men. Women. Everyday style.
            </motion.p>
            <motion.div {...textItem(3)} className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/women">Shop Women</ButtonLink>
              <ButtonLink href="/men" variant="outline">
                Shop Men
              </ButtonLink>
            </motion.div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          <HeroSideCard
            href="/women"
            title="Women's Collection"
            description="Trendy, elegant and always you."
            image={sections.women.image}
            alt="Woman in a pink coat walking through an arcade"
            section="women"
            delay={0.4}
          />
          <HeroSideCard
            href="/men"
            title="Men's Collection"
            description="Timeless styles for modern men."
            image={sections.men.image}
            alt="Man in a bomber jacket and jeans on a cobbled street"
            section="men"
            delay={0.5}
          />
          <HeroSideCard
            href="/accessories"
            title="Accessories"
            description="The little details make a big difference."
            image={sections.accessories.image}
            alt="Woven wicker handbag with a leather handle"
            section="accessories"
            delay={0.6}
          />
        </div>
      </div>
    </section>
  );
}
