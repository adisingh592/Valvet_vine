import Link from "next/link";
import { ContentPage } from "@/components/layout/ContentPage";
import { buildMetadata } from "@/lib/seo";

const intro = "Velvet Vine is free to use. Here's how we earn money, and how that affects (and doesn't affect) what you see.";

export const metadata = buildMetadata({ title: "Affiliate Disclosure", description: intro, path: "/affiliate-disclosure" });

export default function AffiliateDisclosurePage() {
  return (
    <ContentPage eyebrow="Transparency" title="Affiliate Disclosure" intro={intro} updated="September 2026">
      <h2>We don&apos;t sell products</h2>
      <p>
        Velvet Vine is a fashion discovery platform. We don&apos;t stock, sell, ship or process payments for any product.
        Every “View on …” button takes you to a partner retailer&apos;s website, where you complete your purchase with them.
      </p>

      <h2>Affiliate links</h2>
      <p>
        Some links on Velvet Vine are affiliate links. If you click one and then buy something, the retailer may pay
        Velvet Vine a commission. This costs you nothing extra — the price is the same as going to the retailer directly.
      </p>
      <ul>
        <li>Outbound retailer links are clearly labelled with the retailer&apos;s name and open in a new tab.</li>
        <li>They are marked as sponsored links for search engines.</li>
        <li>Commissions never change the price you pay.</li>
      </ul>

      <h2>How we choose what to feature</h2>
      <p>
        We pick products and write style guides because we think they&apos;re worth your time — not because of commission
        rates. Where a product is sold by several retailers, we show them side by side so you can choose.
      </p>

      <h2>Prices and availability</h2>
      <p>
        Prices, sizes and stock are set by each retailer and change often. The information on the retailer&apos;s site at
        checkout is always the final word.
      </p>

      <p>
        Questions? <Link href="/contact">Get in touch</Link>.
      </p>
    </ContentPage>
  );
}
