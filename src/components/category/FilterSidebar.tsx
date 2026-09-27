"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown } from "lucide-react";
import { Checkbox } from "./Checkbox";
import { activeFilterCount, type FacetOption, type FilterKey, type FilterState } from "@/lib/filters";
import { cn } from "@/lib/format";

const GROUPS: { key: FilterKey; label: string }[] = [
  { key: "category", label: "Category" },
  { key: "brand", label: "Brand" },
  { key: "price", label: "Price" },
  { key: "color", label: "Colour" },
  { key: "size", label: "Size" },
  { key: "occasion", label: "Occasion" },
  { key: "retailer", label: "Retailer" },
];

interface FilterSidebarProps {
  facets: Record<FilterKey, FacetOption[]>;
  filters: FilterState;
  onToggle: (key: FilterKey, value: string) => void;
  onClear: () => void;
  hide?: FilterKey[];
}

export function FilterSidebar({ facets, filters, onToggle, onClear, hide = [] }: FilterSidebarProps) {
  const [open, setOpen] = useState<Record<string, boolean>>({ category: true, price: true, brand: false });
  const groups = GROUPS.filter((g) => !hide.includes(g.key) && facets[g.key].length > 0);
  const count = activeFilterCount(filters);
  const idPrefix = useId();

  return (
    <div>
      <div className="flex items-center justify-between pb-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink">Filter by</h2>
        {count > 0 && (
          <button type="button" onClick={onClear} className="link-underline link-underline-fast text-xs text-velvet">
            Clear all ({count})
          </button>
        )}
      </div>

      <div className="divide-y divide-line border-y border-line">
        {groups.map(({ key, label }) => {
          const isOpen = open[key] ?? filters[key].length > 0;
          const panelId = `${idPrefix}-${key}`;
          return (
            <div key={key} className="py-1">
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen((o) => ({ ...o, [key]: !isOpen }))}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between py-2.5 text-sm font-medium text-ink"
                >
                  <span>
                    {label}
                    {filters[key].length > 0 && <span className="ml-1.5 text-xs text-velvet">({filters[key].length})</span>}
                  </span>
                  <ChevronDown
                    aria-hidden
                    className={cn("size-4 text-muted transition-transform duration-250", isOpen && "rotate-180")}
                  />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5, transition: { duration: 0.12 } }}
                    transition={{ duration: 0.2 }}
                    className="pb-3"
                  >
                    <FilterOptions
                      kind={key}
                      options={facets[key]}
                      selected={filters[key]}
                      onToggle={(value) => onToggle(key, value)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FilterOptions({
  kind,
  options,
  selected,
  onToggle,
}: {
  kind: FilterKey;
  options: FacetOption[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  if (kind === "color") {
    return (
      <ul className="flex flex-wrap gap-2 pt-1">
        {options.map((o) => {
          const active = selected.includes(o.value);
          return (
            <li key={o.value}>
              <button
                type="button"
                onClick={() => onToggle(o.value)}
                aria-pressed={active}
                aria-label={`${o.label} (${o.count})`}
                title={o.label}
                disabled={o.count === 0 && !active}
                className={cn(
                  "relative grid size-7 place-items-center rounded-full ring-1 ring-ink/15 ring-offset-2 ring-offset-ivory transition-[box-shadow,scale] duration-200 hover:scale-[1.08] disabled:opacity-30",
                  active && "ring-2 ring-velvet",
                )}
                style={{ backgroundColor: o.swatch }}
              >
                {active && (
                  <Check aria-hidden className="size-3.5 text-white mix-blend-difference" strokeWidth={3} />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    );
  }

  if (kind === "size") {
    return (
      <ul className="flex flex-wrap gap-1.5 pt-1">
        {options.map((o) => {
          const active = selected.includes(o.value);
          return (
            <li key={o.value}>
              <button
                type="button"
                onClick={() => onToggle(o.value)}
                aria-pressed={active}
                disabled={o.count === 0 && !active}
                className={cn(
                  "min-w-10 rounded-full border px-2.5 py-1 text-xs transition-[background-color,border-color,color] duration-200 disabled:opacity-30",
                  active ? "border-velvet bg-velvet text-white" : "border-line bg-white text-ink hover:border-rose",
                )}
              >
                {o.label}
              </button>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul>
      {options.map((o) => (
        <li key={o.value}>
          <Checkbox
            checked={selected.includes(o.value)}
            onChange={() => onToggle(o.value)}
            label={o.label}
            count={o.count}
            disabled={o.count === 0 && !selected.includes(o.value)}
          />
        </li>
      ))}
    </ul>
  );
}
