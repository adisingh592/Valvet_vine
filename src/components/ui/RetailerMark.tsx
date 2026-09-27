import type { RetailerName } from "@/types";
import { cn } from "@/lib/format";

/*
 * Neutral monogram for each retailer (we don't reproduce partner logos
 * without brand-asset permission from the affiliate programme).
 */
const TINTS: Record<RetailerName, string> = {
  Myntra: "bg-[#fbe4e6] text-[#b53a55]",
  Amazon: "bg-[#fdf0d8] text-[#8a5a12]",
  AJIO: "bg-[#e9e6e3] text-[#2a2522]",
  Flipkart: "bg-[#e3ecfa] text-[#2455a4]",
  Titan: "bg-[#efe6dc] text-[#6b4a2b]",
  Nykaa: "bg-[#fbe3ee] text-[#b1306d]",
};

export function RetailerMark({ retailer, size = "sm" }: { retailer: RetailerName; size?: "sm" | "md" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-[5px] font-bold",
        TINTS[retailer],
        size === "sm" ? "size-4 text-[0.55rem]" : "size-8 text-xs",
      )}
    >
      {retailer === "AJIO" ? "A" : retailer[0]}
    </span>
  );
}
