import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactForm } from "@/components/layout/ContactForm";
import { buildMetadata } from "@/lib/seo";

const description = "Questions, partnership ideas or feedback — we'd love to hear from you.";

export const metadata = buildMetadata({ title: "Contact & FAQ", description, path: "/contact" });

const FAQ = [
  {
    q: "Do you sell the products on Velvet Vine?",
    a: "No. Velvet Vine is a discovery platform. Every product links to a partner retailer, and you buy directly from them.",
  },
  {
    q: "Who handles my order, delivery and returns?",
    a: "The retailer you buy from. Payments, shipping, sizing, returns and refunds all follow that retailer's policies — please contact them for order questions.",
  },
  {
    q: "Are prices on Velvet Vine accurate?",
    a: "We show the price we last saw, but retailers change prices and stock often. The price on the retailer's site is always the final one.",
  },
  {
    q: "How does Velvet Vine make money?",
    a: "Some links are affiliate links. If you buy after clicking one, the retailer may pay us a commission — at no extra cost to you.",
  },
  {
    q: "Where is my wishlist saved?",
    a: "On this device, in your browser. Accounts that sync across devices are coming later.",
  },
];

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="container-vv pt-4 sm:pt-6">
        <Breadcrumbs items={[{ label: "Contact" }]} />
        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <section aria-labelledby="contact-title">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-mocha">Get in touch</p>
            <h1 id="contact-title" className="mt-3 font-serif text-4xl text-ink sm:text-5xl">
              Contact Us
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {description} For questions about an order, please contact the retailer you bought from.
            </p>
            <Link
              href="/business"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-blush/70 px-4 py-2 text-sm font-medium text-velvet transition-colors hover:bg-blush"
            >
              Brand or business enquiry? Work with us →
            </Link>
            <div className="mt-8">
              <ContactForm />
            </div>
          </section>

          <section id="faq" aria-labelledby="faq-title" className="scroll-mt-28">
            <h2 id="faq-title" className="font-serif text-3xl text-ink">
              Frequently Asked Questions
            </h2>
            <div className="mt-6 divide-y divide-line border-y border-line">
              {FAQ.map((item) => (
                <details key={item.q} className="group py-1">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-medium text-ink [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <ChevronDown aria-hidden className="size-4 shrink-0 text-muted transition-transform duration-250 group-open:rotate-180" />
                  </summary>
                  <p className="pb-4 text-sm leading-relaxed text-muted">{item.a}</p>
                </details>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted">
              More on how links work in our{" "}
              <Link href="/affiliate-disclosure" className="text-velvet underline underline-offset-2">
                affiliate disclosure
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}
