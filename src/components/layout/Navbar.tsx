"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Heart, Menu, Search, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { SearchBar } from "./SearchBar";
import { AccountMenu } from "./AccountMenu";
import { MobileMenu } from "./MobileMenu";
import { useWishlist } from "@/components/providers/WishlistProvider";
import { mainNav } from "@/data/navigation";
import { collections } from "@/data/collections";
import { inspiration } from "@/data/inspiration";
import { cn } from "@/lib/format";

const DROPDOWNS: Record<string, { label: string; href: string }[]> = {
  Collections: collections.slice(0, 6).map((c) => ({ label: c.title, href: `/collections/${c.slug}` })),
  Inspiration: [
    ...inspiration.slice(0, 5).map((i) => ({ label: i.title, href: `/inspiration/${i.slug}` })),
    { label: "Pinterest Board", href: "/pinterest" },
  ],
};

const iconButton =
  "relative inline-flex size-10 items-center justify-center rounded-full text-ink transition-[background-color] duration-200 hover:bg-cream [&>svg]:transition-transform [&>svg]:duration-200 hover:[&>svg]:scale-[1.08]";

export function Navbar() {
  const pathname = usePathname();
  const { slugs, ready } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close overlays after navigating
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        style={{ viewTransitionName: "site-header" }}
        className={cn(
          "sticky top-0 z-40 border-b transition-[background-color,box-shadow,border-color] duration-300",
          scrolled
            ? "border-line/70 bg-ivory/85 shadow-[0_6px_24px_-16px_rgb(42_31_27/0.35)] backdrop-blur-md"
            : "border-transparent bg-ivory",
        )}
      >
        <div
          className={cn(
            "container-vv flex items-center gap-3 transition-[height] duration-300 ease-[var(--ease-vv)]",
            scrolled ? "h-14 lg:h-[70px]" : "h-16 lg:h-[90px]",
          )}
        >
          {/* Mobile: hamburger */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className={cn(iconButton, "-ml-2 lg:hidden")}
          >
            <Menu aria-hidden className="size-5" />
          </button>

          <div className="flex flex-1 justify-center lg:flex-none lg:justify-start">
            <Logo compact={scrolled} />
          </div>

          <nav aria-label="Main" className="hidden flex-1 justify-center lg:flex">
            <ul className="flex items-center gap-5 xl:gap-7">
              {mainNav.map((item) => {
                const dropdown = DROPDOWNS[item.label];
                return (
                  <li key={item.href} className="group/nav relative">
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "link-underline flex items-center gap-1 py-2 text-[0.82rem] font-medium",
                        item.highlight ? "text-velvet" : "text-ink/85 hover:text-ink",
                      )}
                    >
                      {item.label}
                      {dropdown && (
                        <ChevronDown
                          aria-hidden
                          className="size-3.5 transition-transform duration-250 group-hover/nav:rotate-180"
                        />
                      )}
                    </Link>
                    {dropdown && (
                      <div className="invisible absolute left-1/2 top-full z-50 -ml-28 w-56 pt-3 opacity-0 transition-[opacity,visibility] duration-200 group-focus-within/nav:visible group-focus-within/nav:opacity-100 group-hover/nav:visible group-hover/nav:opacity-100">
                        <ul className="-translate-y-[5px] rounded-2xl border border-line bg-white p-2 shadow-lift transition-transform duration-200 group-focus-within/nav:translate-y-0 group-hover/nav:translate-y-0">
                          {dropdown.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                className="block rounded-lg px-3 py-2 text-sm text-ink/85 transition-colors duration-200 hover:bg-cream hover:text-ink"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-0.5 lg:gap-1">
            <SearchBar className="hidden w-60 xl:block 2xl:w-72" />
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label={searchOpen ? "Close search" : "Open search"}
              aria-expanded={searchOpen}
              className={cn(iconButton, "xl:hidden")}
            >
              {searchOpen ? <X aria-hidden className="size-5" /> : <Search aria-hidden className="size-5" />}
            </button>
            <Link href="/wishlist" aria-label={`Wishlist${ready && slugs.length ? `, ${slugs.length} saved` : ""}`} className={iconButton}>
              <Heart aria-hidden className="size-5" strokeWidth={1.75} />
              {ready && slugs.length > 0 && (
                <span className="absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-velvet text-[0.6rem] font-semibold text-white">
                  {slugs.length}
                </span>
              )}
            </Link>
            <AccountMenu className="hidden lg:block" buttonClassName={iconButton} />
          </div>
        </div>

        {/* Compact search panel (mobile, tablet, small desktop) */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="border-t border-line/70 bg-ivory xl:hidden"
            >
              <div className="container-vv py-3">
                <SearchBar autoFocus size="lg" onNavigate={() => setSearchOpen(false)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => {
          setMenuOpen(false);
          menuButtonRef.current?.focus();
        }}
      />
    </>
  );
}
