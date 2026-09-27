import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { StyleCard } from "@/types";

export function StyleGuideCard({ style }: { style: StyleCard }) {
  return (
    <Link
      href={style.href}
      className="group block transition-[translate] duration-[350ms] ease-[var(--ease-vv)] hover:-translate-y-[3px]"
    >
      <div className="skeleton relative aspect-[3/4] overflow-hidden rounded-[var(--radius-card)] shadow-soft transition-shadow duration-[350ms] group-hover:shadow-lift">
        <Image
          src={style.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 12vw, (min-width: 640px) 24vw, 46vw"
          className="object-cover transition-[scale] duration-[350ms] ease-[var(--ease-vv)] group-hover:scale-[1.04]"
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#2a1f1b]/60 to-transparent" />
        <span className="absolute inset-x-3 bottom-3 flex items-center justify-between text-sm font-medium text-white">
          {style.name}
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-[350ms] ease-[var(--ease-vv)] group-hover:translate-x-[5px]"
          />
        </span>
      </div>
    </Link>
  );
}
