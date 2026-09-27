"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Briefcase, ChevronRight, Heart, Info, LayoutGrid, Mail, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { SearchBar } from "./SearchBar";
import { InstagramIcon, PinterestIcon } from "@/components/ui/SocialIcons";
import { mainNav, socialLinks } from "@/data/navigation";
import { DURATION, EASE_OUT } from "@/lib/motion";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/** Slide-in panel from the right with a 40% overlay. */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
      // Keep focus inside the panel
      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const secondary = [
    { label: "Saved items", href: "/wishlist", icon: Heart },
    { label: "My boards", href: "/boards", icon: LayoutGrid },
    { label: "Pinterest board", href: "/pinterest", icon: PinterestIcon },
    { label: "About Velvet Vine", href: "/about", icon: Info },
    { label: "Contact", href: "/contact", icon: Mail },
    { label: "Work with us", href: "/business", icon: Briefcase },
  ];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            aria-hidden
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.normal }}
            className="absolute inset-0 bg-ink"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: DURATION.normal, ease: EASE_OUT }}
            className="absolute inset-y-0 right-0 flex w-[min(88vw,380px)] flex-col overflow-y-auto bg-ivory shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <Logo compact />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="inline-flex size-10 items-center justify-center rounded-full hover:bg-cream"
              >
                <X aria-hidden className="size-5" />
              </button>
            </div>

            <div className="px-5 pt-4">
              <SearchBar onNavigate={onClose} />
            </div>

            <nav aria-label="Mobile" className="px-3 py-3">
              <ul>
                <li>
                  <Link href="/" className="flex items-center justify-between rounded-xl px-3 py-3 text-[0.95rem] font-medium text-ink hover:bg-cream">
                    Home
                    <ChevronRight aria-hidden className="size-4 text-muted" />
                  </Link>
                </li>
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center justify-between rounded-xl px-3 py-3 text-[0.95rem] font-medium hover:bg-cream ${
                        item.highlight ? "text-velvet" : "text-ink"
                      }`}
                    >
                      {item.label}
                      <ChevronRight aria-hidden className="size-4 text-muted" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mx-5 border-t border-line py-3">
              <ul>
                {secondary.map(({ label, href, icon: Icon }) => (
                  <li key={href}>
                    <Link href={href} className="flex items-center gap-3 rounded-xl px-1 py-2.5 text-sm text-ink/85 hover:text-ink">
                      <Icon aria-hidden className="size-4 text-mocha" />
                      {label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl px-1 py-2.5 text-sm text-ink/85 hover:text-ink"
                  >
                    <InstagramIcon className="size-4 text-mocha" />
                    Instagram
                  </a>
                </li>
              </ul>
            </div>

            <p className="mt-auto px-5 pb-6 pt-2 text-[0.7rem] leading-relaxed text-muted">
              Velvet Vine helps you discover fashion. Purchases are completed on our partner retailers&apos; websites.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
