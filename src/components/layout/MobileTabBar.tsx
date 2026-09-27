"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Heart, Home, LayoutGrid, Plus, Search } from "lucide-react";
import { useWishlist } from "@/components/providers/WishlistProvider";
import { cn } from "@/lib/format";

const TABS = [
  { label: "Home", href: "/", Icon: Home },
  { label: "Search", href: "/search", Icon: Search },
  { label: "Create", href: "/create", Icon: Plus, primary: true },
  { label: "Saved", href: "/wishlist", Icon: Heart },
  { label: "Boards", href: "/boards", Icon: LayoutGrid },
];

/** App-style bottom navigation for phones and tablets. */
export function MobileTabBar() {
  const pathname = usePathname();
  const { slugs, ready } = useWishlist();
  if (pathname === "/welcome") return null;

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <nav
      aria-label="Quick navigation"
      style={{ viewTransitionName: "tab-bar" }}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line/70 bg-ivory/90 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_-18px_rgb(42_31_27/0.35)] backdrop-blur-md lg:hidden"
    >
      <ul className="mx-auto grid h-16 max-w-md grid-cols-5 items-center px-2">
        {TABS.map(({ label, href, Icon, primary }) => {
          const active = isActive(href);
          if (primary) {
            return (
              <li key={href} className="flex justify-center">
                <Link
                  href={href}
                  aria-label="Create a pin"
                  aria-current={active ? "page" : undefined}
                  className="-mt-7 grid size-14 place-items-center rounded-full bg-gold text-white shadow-[0_10px_24px_-8px_rgb(184_155_106/0.95)] ring-4 ring-ivory transition-[background-color,scale] duration-200 active:scale-95 hover:bg-mocha"
                >
                  <Icon aria-hidden className="size-6" strokeWidth={2.2} />
                </Link>
              </li>
            );
          }
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex flex-col items-center gap-1 py-1 text-[0.65rem] font-medium transition-colors duration-200",
                  active ? "text-velvet" : "text-muted hover:text-ink",
                )}
              >
                <span className="relative">
                  <Icon aria-hidden className="size-[22px]" strokeWidth={active ? 2.1 : 1.7} fill={active && label === "Saved" ? "currentColor" : "none"} />
                  {label === "Saved" && ready && slugs.length > 0 && (
                    <span className="absolute -right-2 -top-1.5 grid size-4 place-items-center rounded-full bg-velvet text-[0.55rem] font-semibold text-white">
                      {slugs.length}
                    </span>
                  )}
                </span>
                {label}
                {active && (
                  <motion.span layoutId="tabbar-dot" aria-hidden className="absolute -bottom-1 h-1 w-1 rounded-full bg-velvet" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
