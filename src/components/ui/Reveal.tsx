"use client";

import { motion } from "motion/react";
import { DURATION, EASE_OUT } from "@/lib/motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "header";
}

/** Fades a block up once as it enters the viewport (25px, ~550ms). */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
      transition={{ duration: DURATION.medium, ease: EASE_OUT, delay }}
    >
      {children}
    </Component>
  );
}
