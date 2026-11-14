"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Heart } from "lucide-react";
import { PHOTO } from "@/data/photos";
import { unsplash } from "@/lib/images";
import { cn } from "@/lib/format";
import { WELCOMED_KEY } from "@/lib/welcome";

const rise = (delay: number) => ({ style: { animationDelay: `${delay}ms` } });

/**
 * Brand splash. `overlay` covers the homepage on a first visit; `page` is the
 * standalone /welcome route.
 */
export function WelcomeScreen({ mode }: { mode: "overlay" | "page" }) {
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);

  const dismiss = () => {
    try {
      window.localStorage.setItem(WELCOMED_KEY, "1");
    } catch {
      // Private mode: the splash simply shows again next visit.
    }

    if (typeof document !== "undefined") {
      document.documentElement.removeAttribute("data-welcome");
      try {
        delete document.documentElement.dataset.welcome;
      } catch {}
      document.body.style.overflow = "";
    }

    if (mode === "page") {
      router.push("/");
      return;
    }

    setLeaving(true);
    setDismissed(true);
  };

  useEffect(() => {
    const btn = buttonRef.current;
    const skip = skipRef.current;

    const handleNativeClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dismiss();
    };

    btn?.addEventListener("click", handleNativeClick);
    skip?.addEventListener("click", handleNativeClick);

    if (mode === "page" || document.documentElement.dataset.welcome) {
      btn?.focus({ preventScroll: true, focusVisible: false } as FocusOptions);
    }

    return () => {
      btn?.removeEventListener("click", handleNativeClick);
      skip?.removeEventListener("click", handleNativeClick);
    };
  }, [mode]);

  if (dismissed && mode === "overlay") return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
      className={cn(
        "fixed inset-0 z-[70] items-center justify-center overflow-y-auto transition-[opacity,scale] duration-[350ms] ease-[var(--ease-vv)]",
        mode === "overlay" ? "vv-splash" : "flex",
        leaving && "pointer-events-none scale-[1.02] opacity-0",
      )}
    >
      {/* Silk: layered sheen gradients on warm ivory */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[#f6efe6]"
        style={{
          backgroundImage: [
            "radial-gradient(120% 60% at 15% 10%, rgb(255 255 255 / 0.9), transparent 60%)",
            "radial-gradient(90% 50% at 90% 35%, rgb(235 220 204 / 0.9), transparent 65%)",
            "radial-gradient(110% 55% at 20% 75%, rgb(255 250 244 / 0.95), transparent 60%)",
            "linear-gradient(160deg, transparent 35%, rgb(226 208 190 / 0.45) 50%, transparent 65%)",
            "linear-gradient(200deg, transparent 55%, rgb(255 255 255 / 0.7) 68%, transparent 80%)",
          ].join(","),
        }}
      />
      {/* Gold ribbon strokes */}
      <svg aria-hidden viewBox="0 0 400 800" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 size-full text-gold/60">
        <path d="M-20 90 C 90 20, 200 160, 420 40" fill="none" stroke="currentColor" strokeWidth="1.2" pathLength={1} vectorEffect="non-scaling-stroke" className="vv-draw" />
        <path d="M-20 110 C 110 50, 210 190, 420 70" fill="none" stroke="currentColor" strokeWidth="0.6" pathLength={1} vectorEffect="non-scaling-stroke" className="vv-draw" style={{ animationDelay: "150ms" }} />
        <path d="M-20 700 C 120 640, 260 780, 420 690" fill="none" stroke="currentColor" strokeWidth="0.9" pathLength={1} vectorEffect="non-scaling-stroke" className="vv-draw" style={{ animationDelay: "300ms" }} />
      </svg>

      {/* Editorial arches on wide screens */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[6%] hidden items-center lg:flex">
        <div {...rise(350)} className="vv-rise relative h-[56vh] max-h-[520px] w-[22vw] max-w-[300px] overflow-hidden rounded-t-full shadow-lift">
          <Image src={unsplash(PHOTO.heroWoman, { y: 0.35 })} alt="" fill loading="eager" sizes="22vw" className="object-cover object-[50%_25%]" />
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-[6%] hidden items-center lg:flex">
        <div {...rise(450)} className="vv-rise relative h-[56vh] max-h-[520px] w-[22vw] max-w-[300px] overflow-hidden rounded-t-full shadow-lift">
          <Image src={unsplash(PHOTO.heroMan, { y: 0.3 })} alt="" fill loading="eager" sizes="22vw" className="object-cover object-[50%_20%]" />
        </div>
      </div>

      {mode === "overlay" && (
        <button
          ref={skipRef}
          type="button"
          onClick={dismiss}
          className="absolute right-5 top-5 z-30 sm:right-8 sm:top-8 cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-white/60 hover:text-ink"
        >
          Skip
        </button>
      )}

      <div className="relative z-20 flex min-h-full w-full max-w-sm flex-col items-center justify-center px-8 py-14 text-center">

        {/* Crest */}
        <svg {...rise(0)} aria-hidden viewBox="0 0 40 16" className="vv-rise h-9 w-24 text-gold" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
          <path d="M20 15V5" />
          <path d="M20 10c-2.5-3.5-6-4-9-2.5M20 10c2.5-3.5 6-4 9-2.5" />
          <path d="M11 7.5c-1.5 1.8-4 2.2-6.5 1.5M29 7.5c1.5 1.8 4 2.2 6.5 1.5" />
          <path d="M14 4l2 2 4-4 4 4 2-2" />
          <circle cx="20" cy="2" r="1" fill="currentColor" stroke="none" />
        </svg>

        <h1 id="welcome-title" {...rise(100)} className="vv-rise mt-3 font-serif text-5xl text-ink sm:text-6xl">
          Velvet Vine
        </h1>
        <p {...rise(200)} className="vv-rise mt-4 text-[0.7rem] font-medium uppercase leading-relaxed tracking-[0.32em] text-mocha">
          Your style
          <br />
          a brighter tomorrow
        </p>
        <span {...rise(260)} aria-hidden className="vv-rise mt-7 h-px w-10 bg-ink/40" />
        <p {...rise(320)} className="vv-rise mt-7 font-serif text-lg text-ink">
          Discover · Save · Shop
        </p>
        <p {...rise(360)} className="vv-rise mt-1 text-sm text-muted">
          Curated fashion from India&apos;s favourite stores
        </p>

        <button
          ref={buttonRef}
          type="button"
          onClick={dismiss}
          {...rise(440)}
          className="vv-rise group relative z-30 mt-10 inline-flex w-full max-w-64 cursor-pointer items-center justify-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-medium text-white shadow-[0_14px_30px_-12px_rgb(184_155_106/0.95)] transition-[background-color,translate] duration-250 hover:-translate-y-0.5 hover:bg-mocha"
        >
          Get Started
          <ArrowRight aria-hidden className="size-4 transition-transform duration-250 group-hover:translate-x-1" />
        </button>

        <p {...rise(560)} className="vv-rise mt-12 font-serif text-[0.95rem] italic leading-relaxed text-ink/70">
          &ldquo;Collect beautiful things
          <br />
          and wear them beautifully.&rdquo;
        </p>
        <Heart {...rise(620)} aria-hidden strokeWidth={1.25} className="vv-rise mt-3 size-5 text-velvet/70" />
      </div>
    </div>
  );
}
