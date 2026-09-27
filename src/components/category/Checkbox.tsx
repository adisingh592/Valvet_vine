"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { DURATION } from "@/lib/motion";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  count?: number;
  disabled?: boolean;
}

/** Custom checkbox: tick scales + fades in (native input kept for a11y). */
export function Checkbox({ checked, onChange, label, count, disabled }: CheckboxProps) {
  return (
    <label className="group/cb flex cursor-pointer items-center gap-2.5 py-1 text-sm text-ink/85 has-[:disabled]:cursor-default has-[:disabled]:opacity-40">
      <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} className="peer sr-only" />
      <span className="grid size-4 shrink-0 place-items-center rounded-[5px] border border-ink/25 bg-white transition-[background-color,border-color] duration-200 group-hover/cb:border-velvet peer-checked:border-velvet peer-checked:bg-velvet peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-velvet">
        <AnimatePresence initial={false}>
          {checked && (
            <motion.span
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: DURATION.micro }}
            >
              <Check aria-hidden className="size-3 text-white" strokeWidth={3} />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span className="flex-1">{label}</span>
      {count !== undefined && <span className="text-xs text-muted">({count})</span>}
    </label>
  );
}
