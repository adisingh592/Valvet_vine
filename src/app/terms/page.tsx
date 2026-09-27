import Link from "next/link";
import { ContentPage } from "@/components/layout/ContentPage";
import { buildMetadata } from "@/lib/seo";

const intro = "The ground rules for using Velvet Vine.";

export const metadata = buildMetadata({ title: "Terms of Use", description: intro, path: "/terms" });

export default function TermsPage() {
  return (
    <ContentPage eyebrow="Legal" title="Terms of Use" intro={intro} updated="September 2026">
      <p>
        <strong>Draft notice:</strong> this page is placeholder copy for the prototype and must be reviewed by a legal
        professional before launch.
      </p>

      <h2>What Velvet Vine is</h2>
      <p>
        Velvet Vine is a discovery service that links to products sold by third-party retailers. We are not a party to
        any purchase you make. Your contract of sale is with the retailer.
      </p>

      <h2>Information on the site</h2>
      <p>
        We try to keep product information, prices and availability accurate, but retailers update them constantly. Always
        confirm details on the retailer&apos;s site before buying.
      </p>

      <h2>Images and content</h2>
      <p>
        Editorial images are used for inspiration and may not show the exact product sold by a retailer. Style guides are
        our opinion, offered for fun and ideas.
      </p>

      <h2>External links</h2>
      <p>
        Links to retailers and social networks take you to sites we don&apos;t control. Their terms and privacy policies
        apply. See our <Link href="/affiliate-disclosure">affiliate disclosure</Link>.
      </p>
    </ContentPage>
  );
}
