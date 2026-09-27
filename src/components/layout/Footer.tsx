import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { FacebookIcon, InstagramIcon, PinterestIcon, TiktokIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { footerNav, socialLinks } from "@/data/navigation";

const SOCIALS = [
  { label: "Instagram", href: socialLinks.instagram, Icon: InstagramIcon },
  { label: "Pinterest", href: socialLinks.pinterest, Icon: PinterestIcon },
  { label: "YouTube", href: socialLinks.youtube, Icon: YoutubeIcon },
  { label: "Facebook", href: socialLinks.facebook, Icon: FacebookIcon },
  { label: "TikTok", href: socialLinks.tiktok, Icon: TiktokIcon },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-cream/70 sm:mt-24">
      <div className="container-vv grid gap-10 py-14 lg:grid-cols-[1.2fr_2fr]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-5 text-sm leading-relaxed text-muted">
            Velvet Vine is a fashion discovery platform. We curate styles from trusted retailers — you buy directly
            from them.
          </p>
          <ul className="mt-6 flex gap-2">
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Velvet Vine on ${label}`}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-white/60 text-ink/80 transition-colors duration-200 hover:border-rose hover:text-velvet"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {footerNav.map((group) => (
            <div key={group.title}>
              <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink">{group.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.label}`}>
                    <Link href={link.href} className="link-underline link-underline-fast text-sm text-muted hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="container-vv flex flex-col gap-2 py-5 text-[0.7rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Velvet Vine. Fashion for every you.</p>
          <p>
            We may earn a commission when you buy through links on this site.{" "}
            <Link href="/affiliate-disclosure" className="underline underline-offset-2 hover:text-ink">
              Learn more
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
