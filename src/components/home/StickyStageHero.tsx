"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export interface LookCard {
  slot: number;
  id: string;
  alt: string;
}

const defaultCards: LookCard[] = [
  { slot: -2, id: "1558769132-cb1aea458c5e", alt: "Neutral knitwear hanging on a rail" },
  { slot: -1, id: "1566174053879-31528523f8ae", alt: "Model in a plum off-shoulder gown" },
  { slot: 1, id: "1539109136881-3be0616acf4b", alt: "Woman in a long pale blue coat" },
  { slot: 2, id: "1594938298603-c8148c4dae35", alt: "Blue check three-piece suit" },
];

const mainLook = {
  id: "1595777457583-95e059d581b8",
  alt: "Woman in a flowing red silk gown, turning on a stone terrace",
};

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function StickyStageHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const geo = useRef<{ w: number; h: number; left: number; top: number } | null>(null);

  useEffect(() => {
    const layout = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const mobile = vw < 640;
      const w = mobile ? vw * 0.34 : clamp(vw * 0.15, 150, 250);
      const h = w * 1.38;
      const gap = Math.max(12, vw * 0.014);
      const cy = Math.min(vh * 0.7, vh - h / 2 - 70);
      const left = vw / 2 - w / 2;
      const top = cy - h / 2;
      geo.current = { w, h, left, top };

      defaultCards.forEach(({ slot }, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        const a = Math.abs(slot);
        el.style.setProperty("--w", `${w}px`);
        el.style.setProperty("--h", `${h}px`);
        el.style.setProperty("--x", `${left + slot * (w + gap)}px`);
        el.style.setProperty("--y", `${top + (a === 1 ? h * 0.07 : h * 0.16)}px`);
        el.style.display = mobile && a === 2 ? "none" : "";
      });
    };

    layout();
    window.addEventListener("resize", layout, { passive: true });
    return () => window.removeEventListener("resize", layout);
  }, []);

  useEffect(() => {
    let rafId: number;

    const onScroll = () => {
      if (!heroRef.current || !stickyRef.current || !mainRef.current || !overlayRef.current || !geo.current) {
        return;
      }
      const r = heroRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const span = r.height - vh;
      const p = span > 0 ? clamp(-r.top / span) : 0;

      if (r.bottom < 0 || r.top > vh) return;

      const { w, h, left, top } = geo.current;
      const e = easeInOut(clamp(p / 0.62));
      const main = mainRef.current;

      stickyRef.current.style.setProperty("--p", p.toFixed(4));
      main.style.setProperty("--ct", `${top * (1 - e)}px`);
      main.style.setProperty("--cb", `${(vh - top - h) * (1 - e)}px`);
      main.style.setProperty("--cl", `${left * (1 - e)}px`);
      main.style.setProperty("--cr", `${left * (1 - e)}px`);
      main.style.setProperty("--cr-r", `${14 * (1 - e)}px`);
      main.style.setProperty("--is", (1.28 - 0.2 * e - 0.08 * clamp((p - 0.62) / 0.38)).toFixed(4));

      const ov = clamp((p - 0.6) / 0.22);
      main.style.setProperty("--ov", ov.toFixed(3));
      overlayRef.current.classList.toggle("is-active", ov > 0.6);

      defaultCards.forEach(({ slot }, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        const a = Math.abs(slot);
        const dir = Math.sign(slot);
        el.style.setProperty("--tx", `${dir * (left * e + a * e * w * 0.5)}px`);
        el.style.setProperty("--ty", `${-e * h * 0.25 * a}px`);
        el.style.setProperty("--rot", `${slot * 1.6 * (1 - e) + dir * e * 4}deg`);
        el.style.setProperty("--o", clamp(1 - e * 1.5).toFixed(3));
      });
    };

    const loop = () => {
      onScroll();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section ref={heroRef} className="hero-stage relative h-[300vh]" aria-label="Velvet Vine Cinematic Stage">
      <div ref={stickyRef} className="hero-stage__sticky sticky top-0 h-screen overflow-hidden">
        {/* Intro Copy */}
        <div className="hero-stage__copy absolute inset-x-0 top-[clamp(4.5rem,12vh,8rem)] z-10 text-center px-4">
          <p className="font-serif italic text-rose text-lg sm:text-xl tracking-wide flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4" /> Welcome to Velvet Vine
          </p>
          <h1 className="font-serif font-light text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-ink mt-2 mb-3">
            Velvet Vine
          </h1>
          <p className="max-w-xl mx-auto text-muted text-sm sm:text-base md:text-lg">
            A sanctuary for slow fashion, curated edits, and hand-finished craftsmanship.
          </p>
        </div>

        {/* Fan Cards Strip */}
        <div className="hero-stage__strip absolute inset-0 z-[1] pointer-events-none">
          {defaultCards.map((c, i) => (
            <figure
              key={c.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="hero-stage__card absolute overflow-hidden rounded-2xl shadow-lift bg-cream"
            >
              <div className="relative w-full h-full">
                <Image
                  src={`https://images.unsplash.com/photo-${c.id}?auto=format&fit=crop&w=700&q=80`}
                  alt={c.alt}
                  fill
                  sizes="260px"
                  className="object-cover"
                />
              </div>
            </figure>
          ))}
        </div>

        {/* Centered Main Card that expands full bleed */}
        <figure ref={mainRef} className="hero-stage__main absolute inset-0 z-[2]">
          <div className="relative w-full h-full">
            <Image
              src={`https://images.unsplash.com/photo-${mainLook.id}?auto=format&fit=crop&w=1800&q=85`}
              alt={mainLook.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover hero-stage__main-img"
            />
          </div>
          <figcaption
            ref={overlayRef}
            className="hero-stage__overlay absolute inset-x-6 sm:inset-x-12 bottom-12 sm:bottom-16 z-20 flex flex-col items-start gap-4 max-w-2xl text-ivory"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-rose font-medium">
              Autumn â€” Winter 2026
            </span>
            <h2 className="font-serif font-light text-3xl sm:text-5xl lg:text-6xl leading-tight">
              The Collection <em className="italic text-rose">has arrived.</em>
            </h2>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 rounded-full bg-ivory px-6 py-3 text-sm font-medium text-ink transition-transform hover:scale-105"
              >
                Explore Collection
                <ArrowRight className="h-4 w-4 text-velvet" />
              </Link>
              <Link
                href="/women"
                className="inline-flex items-center gap-2 rounded-full border border-ivory/40 bg-black/20 backdrop-blur-md px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-black/40"
              >
                Shop New Arrivals
              </Link>
            </div>
          </figcaption>
        </figure>

        {/* Scroll down prompt */}
        <div className="hero-stage__hint absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted pointer-events-none">
          <span>Scroll to unveil</span>
          <span className="w-px h-8 bg-current/30 relative overflow-hidden">
            <span className="absolute inset-0 bg-velvet animate-bounce" />
          </span>
        </div>
      </div>
    </section>
  );
}
