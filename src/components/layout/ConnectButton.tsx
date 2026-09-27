"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Briefcase, Mail, MessageCircleHeart, Phone, X } from "lucide-react";
import { InstagramIcon, WhatsappIcon } from "@/components/ui/SocialIcons";
import { contactChannels, socialLinks, whatsappUrl } from "@/data/navigation";
import { DURATION, EASE_OUT } from "@/lib/motion";

const OPTIONS = [
  { label: "WhatsApp", href: whatsappUrl(), Icon: WhatsappIcon, tint: "bg-[#e7f6ec] text-[#1f8f4e]", external: true },
  { label: "Email us", href: `mailto:${contactChannels.email}`, Icon: Mail, tint: "bg-blush text-velvet", external: true },
  { label: "Call", href: `tel:${contactChannels.phone.replace(/\s/g, "")}`, Icon: Phone, tint: "bg-cream text-mocha", external: true },
  { label: "Instagram", href: socialLinks.instagram, Icon: InstagramIcon, tint: "bg-[#fbe9f1] text-[#b83a73]", external: true },
  { label: "Business enquiries", href: "/business", Icon: Briefcase, tint: "bg-sand text-ink", external: false },
];

/**
 * Floating "Connect" button. Hovering (or tapping / focusing) fans out the
 * direct contact options. Sits above the mobile tab bar.
 */
export function ConnectButton() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Hover only on devices that really hover; touch uses the tap toggle.
  const hoverOpen = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hoverClose = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    closeTimer.current = setTimeout(() => setOpen(false), 220);
  };

  if (pathname === "/welcome") return null;

  return (
    <div
      ref={ref}
      onPointerEnter={hoverOpen}
      onPointerLeave={hoverClose}
      style={{ viewTransitionName: "connect-fab" }}
      className="fixed bottom-[calc(76px+env(safe-area-inset-bottom))] right-4 z-40 flex flex-col items-end gap-2 lg:bottom-8 lg:right-8"
    >
      <AnimatePresence>
        {open && (
          <motion.ul
            id="connect-options"
            aria-label="Contact options"
            initial="closed"
            animate="open"
            exit="closed"
            variants={{ open: { transition: { staggerChildren: 0.04, staggerDirection: -1 } }, closed: {} }}
            className="flex flex-col items-end gap-2 pb-1"
          >
            {OPTIONS.map(({ label, href, Icon, tint, external }) => {
              const inner = (
                <>
                  <span className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-ink shadow-soft transition-colors group-hover/opt:bg-ivory">
                    {label}
                  </span>
                  <span className={`grid size-11 place-items-center rounded-full shadow-lift ring-1 ring-white ${tint}`}>
                    <Icon aria-hidden className="size-5" />
                  </span>
                </>
              );
              const className = "group/opt flex items-center gap-2 transition-[translate] duration-200 hover:-translate-x-1";
              return (
                <motion.li
                  key={label}
                  variants={{ open: { opacity: 1, y: 0, scale: 1 }, closed: { opacity: 0, y: 12, scale: 0.9 } }}
                  transition={{ duration: DURATION.fast, ease: EASE_OUT }}
                >
                  {external ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={className}>
                      {inner}
                    </a>
                  ) : (
                    <Link href={href} className={className}>
                      {inner}
                    </Link>
                  )}
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="connect-options"
        aria-label={open ? "Close contact options" : "Connect with us"}
        className="group relative inline-flex h-12 w-12 items-center justify-center gap-2 rounded-full bg-velvet lg:w-auto lg:pl-3.5 lg:pr-4 text-sm font-medium text-white shadow-[0_12px_28px_-10px_rgb(157_69_82/0.8)] transition-[background-color,translate] duration-250 hover:-translate-y-0.5 hover:bg-velvet-dark"
      >
        {/* Gentle attention ring while closed */}
        {!open && <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-velvet/40 [animation-duration:2.4s] [animation-iteration-count:3] motion-reduce:hidden" />}
        <span className="relative grid size-6 place-items-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "x" : "chat"}
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: DURATION.micro }}
              className="grid place-items-center"
            >
              {open ? <X aria-hidden className="size-5" /> : <MessageCircleHeart aria-hidden className="size-5" />}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="relative hidden lg:inline">Connect</span>
      </button>
    </div>
  );
}
