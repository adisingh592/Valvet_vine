import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/format";

interface SectionHeadingProps {
  title: React.ReactNode;
  subtitle?: string;
  eyebrow?: string;
  action?: { label: string; href: string };
  align?: "left" | "center";
  className?: string;
  id?: string;
}

export function SectionHeading({ title, subtitle, eyebrow, action, align = "left", className, id }: SectionHeadingProps) {
  return (
    <Reveal
      as="header"
      className={cn(
        "mb-6 flex gap-4 sm:mb-8",
        align === "center" ? "flex-col items-center text-center" : "items-end justify-between",
        className,
      )}
    >
      <div>
        {eyebrow && (
          <p className="mb-2 text-[0.7rem] font-medium uppercase tracking-[0.25em] text-mocha">{eyebrow}</p>
        )}
        <h2 id={id} className="font-serif text-[1.75rem] leading-tight text-ink sm:text-4xl">
          {title}
        </h2>
        {subtitle && <p className="mt-2 text-sm text-muted sm:text-[0.95rem]">{subtitle}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group/va hidden shrink-0 items-center gap-1.5 text-sm font-medium text-ink sm:inline-flex"
        >
          <span className="link-underline">{action.label}</span>
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-250 group-hover/va:translate-x-1"
          />
        </Link>
      )}
    </Reveal>
  );
}
