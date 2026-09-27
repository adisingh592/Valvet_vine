import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { Reveal } from "@/components/ui/Reveal";
import { instagramPosts } from "@/data/inspiration";
import { socialLinks } from "@/data/navigation";

export function InstagramGrid() {
  return (
    <section aria-labelledby="instagram-title" className="container-vv mt-20 sm:mt-28">
      <Reveal className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-[0.7rem] font-medium uppercase tracking-[0.25em] text-mocha">On Instagram</p>
          <h2 id="instagram-title" className="font-serif text-[1.75rem] text-ink sm:text-4xl">
            @velvetvine
          </h2>
          <p className="mt-2 text-sm text-muted">Real outfits, styling ideas and behind-the-scenes edits.</p>
        </div>
        <a
          href={socialLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="group/ig inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/70 px-5 py-2.5 text-sm font-medium text-ink transition-[background-color,translate] duration-250 hover:-translate-y-0.5 hover:bg-white"
        >
          Follow us
          <ArrowRight aria-hidden className="size-4 transition-transform duration-250 group-hover/ig:translate-x-1" />
        </a>
      </Reveal>

      <Reveal>
        <ul className="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-6">
          {instagramPosts.map((post) => (
            <li key={post.id}>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram post: ${post.alt}`}
                className="group skeleton relative block aspect-square overflow-hidden rounded-xl"
              >
                <Image
                  src={post.image}
                  alt={post.alt}
                  fill
                  sizes="(min-width: 768px) 16vw, 33vw"
                  className="object-cover transition-[scale] duration-300 ease-[var(--ease-vv)] group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 grid place-items-center bg-ink/0 text-white opacity-0 transition-[background-color,opacity] duration-300 group-hover:bg-ink/25 group-hover:opacity-100">
                  <InstagramIcon className="size-6" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
