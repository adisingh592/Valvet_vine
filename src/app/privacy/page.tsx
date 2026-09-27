import Link from "next/link";
import { ContentPage } from "@/components/layout/ContentPage";
import { buildMetadata } from "@/lib/seo";

const intro = "A plain-language summary of what Velvet Vine collects and why.";

export const metadata = buildMetadata({ title: "Privacy Policy", description: intro, path: "/privacy" });

export default function PrivacyPage() {
  return (
    <ContentPage eyebrow="Legal" title="Privacy Policy" intro={intro} updated="September 2026">
      <p>
        <strong>Draft notice:</strong> this page is placeholder copy for the prototype and must be reviewed by a legal
        professional before launch.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Wishlist:</strong> saved items are stored in your browser on this device. We don&apos;t receive them.
        </li>
        <li>
          <strong>Newsletter and contact forms:</strong> in this prototype, nothing you type is sent anywhere.
        </li>
        <li>
          <strong>Retailer clicks:</strong> in future we may record which product and retailer you clicked (not who you
          are) to understand what&apos;s popular.
        </li>
      </ul>

      <h2>Partner retailers</h2>
      <p>
        When you leave Velvet Vine for a retailer, their privacy policy applies. Retailers and affiliate networks may use
        cookies to attribute your purchase to Velvet Vine.
      </p>

      <h2>Your choices</h2>
      <p>
        You can clear your wishlist at any time from the <Link href="/wishlist">saved items</Link> page or by clearing
        your browser storage. Questions? <Link href="/contact">Contact us</Link>.
      </p>
    </ContentPage>
  );
}
