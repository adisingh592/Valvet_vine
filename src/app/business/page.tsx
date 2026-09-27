import Image from "next/image";
import { Handshake, Mail, Megaphone, Sparkles, Store } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { BusinessForm } from "@/components/business/BusinessForm";
import { LinkedinIcon, WhatsappIcon } from "@/components/ui/SocialIcons";
import { contactChannels, whatsappUrl } from "@/data/navigation";
import { PHOTO } from "@/data/photos";
import { unsplash } from "@/lib/images";
import { buildMetadata } from "@/lib/seo";

const description =
  "Brand partnerships, affiliate programmes, sponsored edits and creator collaborations — let's build something beautiful together.";

export const metadata = buildMetadata({ title: "Work With Us", description, path: "/business" });

const OFFERS = [
  {
    Icon: Handshake,
    title: "Brand partnerships",
    body: "Feature your label in curated edits, collections and seasonal campaigns across Velvet Vine.",
  },
  {
    Icon: Store,
    title: "Affiliate & retail",
    body: "Retailers and marketplaces: list your catalogue and reach shoppers who are ready to buy.",
  },
  {
    Icon: Megaphone,
    title: "Sponsored content",
    body: "Style guides, lookbooks and Pinterest boards built around your products and story.",
  },
  {
    Icon: Sparkles,
    title: "Creator collabs",
    body: "Stylists, photographers and creators — co-curate an edit or a moodboard with our team.",
  },
];

const STEPS = [
  { title: "Tell us your idea", body: "Share your goals, timelines and the products you'd like to feature." },
  { title: "We shape a proposal", body: "Our team suggests formats, placements and a plan that fits your budget." },
  { title: "Launch together", body: "We build, publish and share how the campaign performs." },
];

export default function BusinessPage() {
  const direct = [
    { label: "Email", value: contactChannels.businessEmail, href: `mailto:${contactChannels.businessEmail}`, Icon: Mail },
    {
      label: "WhatsApp",
      value: contactChannels.phone,
      href: whatsappUrl("Hi Velvet Vine! I have a business enquiry."),
      Icon: WhatsappIcon,
    },
    { label: "LinkedIn", value: "Velvet Vine", href: contactChannels.linkedin, Icon: LinkedinIcon },
  ];

  return (
    <PageTransition>
      <div className="container-vv pt-4 sm:pt-6">
        <Breadcrumbs items={[{ label: "Work with us" }]} />

        {/* Hero */}
        <section className="relative mt-4 grid overflow-hidden rounded-[var(--radius-hero)] bg-blush/70 md:grid-cols-[1.1fr_1fr]">
          <div className="relative z-10 flex flex-col justify-center p-6 sm:p-10 lg:p-14">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-mocha">Business & partnerships</p>
            <h1 className="mt-3 font-serif text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
              Let&apos;s create
              <br />
              <em className="text-velvet">something beautiful</em>
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/70 sm:text-[0.95rem]">{description}</p>
            <a
              href="#enquiry"
              className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-velvet px-6 py-3 text-sm font-medium text-white transition-[background-color,translate] duration-250 hover:-translate-y-0.5 hover:bg-velvet-dark"
            >
              Start an enquiry
            </a>
          </div>
          <div className="relative min-h-[240px]">
            <Image
              src={unsplash(PHOTO.brands)}
              alt="Clothing rail in a bright boutique"
              fill
              preload
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
            <div aria-hidden className="absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-[#f5e6e0] to-transparent md:block" />
          </div>
        </section>

        {/* What we offer */}
        <section aria-labelledby="offers-title" className="mt-16 sm:mt-24">
          <h2 id="offers-title" className="font-serif text-3xl text-ink sm:text-4xl">
            Ways to work together
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {OFFERS.map(({ Icon, title, body }, i) => (
              <li key={title}>
                <Reveal delay={i * 0.06} className="h-full">
                  <div className="h-full rounded-[var(--radius-card)] border border-line bg-white/70 p-6 shadow-soft transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift">
                    <span className="grid size-11 place-items-center rounded-full bg-blush text-velvet">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <h3 className="mt-4 font-serif text-xl text-ink">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        {/* How it works */}
        <section aria-labelledby="steps-title" className="mt-16 rounded-[var(--radius-hero)] bg-cream/80 p-6 sm:mt-24 sm:p-10">
          <h2 id="steps-title" className="font-serif text-3xl text-ink">
            How it works
          </h2>
          <ol className="mt-8 grid gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white font-serif text-lg text-velvet shadow-soft">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-medium text-ink">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Enquiry */}
        <section id="enquiry" aria-labelledby="enquiry-title" className="mt-16 scroll-mt-28 sm:mt-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
            <div>
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-mocha">Get in touch</p>
              <h2 id="enquiry-title" className="mt-3 font-serif text-3xl text-ink sm:text-4xl">
                Business enquiry
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Fill in the form, or reach our partnerships team directly. For order questions, please contact the
                retailer you bought from.
              </p>
              <ul className="mt-8 space-y-3">
                {direct.map(({ label, value, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 rounded-2xl border border-line bg-white/70 p-4 transition-[border-color,translate] duration-250 hover:-translate-y-0.5 hover:border-rose"
                    >
                      <span className="grid size-11 place-items-center rounded-full bg-blush text-velvet">
                        <Icon aria-hidden className="size-5" />
                      </span>
                      <span>
                        <span className="block text-xs text-muted">{label}</span>
                        <span className="block text-sm font-medium text-ink">{value}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <BusinessForm />
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
