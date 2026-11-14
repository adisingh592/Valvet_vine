"use client";

import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";

export function RollText({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`roll-text ${className}`}>
      <span className="roll-text__a">{children}</span>
      <span className="roll-text__b" aria-hidden="true">{children}</span>
    </span>
  );
}

export function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let currX = 0;
    let currY = 0;
    let rafId: number;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      targetX = (e.clientX - (r.left + r.width / 2)) * 0.25;
      targetY = (e.clientY - (r.top + r.height / 2)) * 0.35;
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const update = () => {
      currX += (targetX - currX) * 0.15;
      currY += (targetY - currY) * 0.15;
      if (Math.abs(currX) > 0.01 || Math.abs(currY) > 0.01 || targetX !== 0) {
        el.style.transform = `translate3d(${currX.toFixed(2)}px, ${currY.toFixed(2)}px, 0)`;
      } else {
        el.style.transform = "";
      }
      rafId = requestAnimationFrame(update);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    rafId = requestAnimationFrame(update);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </div>
  );
}

export function SplitChars({
  text,
  className = "",
  baseDelay = 0.2,
  step = 0.04,
}: {
  text: string;
  className?: string;
  baseDelay?: number;
  step?: number;
}) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <h2 ref={ref} className={`split-chars ${className}`} aria-label={text}>
      {text.split("").map((char, i) => (
        <span key={i} className="inline-block overflow-hidden align-top pb-[0.06em]">
          <span
            className="inline-block transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: inView ? "none" : "translateY(110%) rotate(5deg)",
              transformOrigin: "0 100%",
              transitionDelay: `${baseDelay + i * step}s`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </h2>
  );
}
