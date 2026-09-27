"use client";

import Image from "next/image";
import { useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { DURATION, EASE_OUT } from "@/lib/motion";
import { Morph } from "@/components/ui/Morph";
import { MorphLink, warmMorphTarget } from "@/components/ui/MorphLink";

interface HeroSideCardProps {
  href: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  /** Section slug — the image morphs into that section page's hero. */
  section: string;
  delay?: number;
}

export function HeroSideCard({ href, title, description, image, alt, section, delay = 0 }: HeroSideCardProps) {
  // These are the homepage's main entry points: warm their destination hero
  // images once the page is idle so the morph lands on a ready image, even on touch.
  useEffect(() => {
    const warm = () => warmMorphTarget({ kind: "section", image });
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(warm, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(warm, 1500);
    return () => clearTimeout(id);
  }, [image]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.medium, ease: EASE_OUT, delay }}
    >
      <MorphLink
        href={href}
        morph={{ kind: "section", slug: section, image }}
        className="group relative flex h-full min-h-[150px] overflow-hidden rounded-[var(--radius-card)] bg-cream shadow-soft transition-shadow duration-[400ms] hover:shadow-lift"
      >
        <div className="relative z-10 flex w-[52%] flex-col justify-center p-4 sm:p-5">
          <div className="transition-[translate] duration-[400ms] ease-[var(--ease-vv)] group-hover:translate-x-1">
            <h2 className="font-serif text-xl leading-tight text-ink xl:text-2xl">{title}</h2>
            <p className="mt-1.5 text-xs leading-relaxed text-muted sm:hidden lg:block">{description}</p>
          </div>
          <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-ink">
            Explore
            <ArrowRight
              aria-hidden
              className="size-3.5 transition-transform duration-[400ms] ease-[var(--ease-vv)] group-hover:translate-x-[5px]"
            />
          </span>
        </div>
        <div className="skeleton absolute inset-y-0 right-0 w-[48%] overflow-hidden">
          <Morph kind="section" slug={section}>
            <div className="absolute inset-0 overflow-hidden rounded-r-[var(--radius-card)]">
              <Image
                src={image}
                alt={alt}
                fill
                loading="eager"
                sizes="(min-width: 1024px) 170px, (min-width: 640px) 16vw, 48vw"
                className="object-cover transition-[scale] duration-[400ms] ease-[var(--ease-vv)] group-hover:scale-105"
              />
            </div>
          </Morph>
        </div>
      </MorphLink>
    </motion.div>
  );
}
