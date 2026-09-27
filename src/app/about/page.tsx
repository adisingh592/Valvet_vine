import Image from "next/image";
import Link from "next/link";
import { ContentPage } from "@/components/layout/ContentPage";
import { PHOTO } from "@/data/photos";
import { unsplash } from "@/lib/images";
import { buildMetadata } from "@/lib/seo";

const intro =
  "Velvet Vine is a fashion discovery platform for everyone — women, men and everyone in between. We find great style across India's favourite retailers and bring it together in one calm, inspiring place.";

export const metadata = buildMetadata({ title: "Our Story", description: intro, path: "/about", image: unsplash(PHOTO.about) });

export default function AboutPage() {
  return (
    <ContentPage eyebrow="About Velvet Vine" title="Our Story" intro={intro}>
      <div className="skeleton relative mt-8 aspect-[16/9] overflow-hidden rounded-[var(--radius-hero)]">
        <Image src={unsplash(PHOTO.about)} alt="Neutral-toned clothing hanging in a boutique window" fill preload sizes="(min-width: 768px) 672px, 100vw" className="object-cover" />
      </div>

      <h2>Discover, get inspired, then shop where you like</h2>
      <p>
        Shopping for clothes online means jumping between apps and tabs. Velvet Vine is the step before: a place to
        browse edits, save ideas and compare where a piece is available — then head to the retailer to buy.
      </p>

      <h2>How it works</h2>
      <ul>
        <li>We curate products and style guides from partner retailers such as Myntra, AJIO, Amazon and Flipkart.</li>
        <li>When you find something you love, the “View on …” button takes you to that retailer.</li>
        <li>You check out on the retailer&apos;s site. They handle payment, delivery and returns.</li>
      </ul>

      <h2>How we make money</h2>
      <p>
        Some links are affiliate links: if you buy something after clicking one, the retailer may pay us a small
        commission at no extra cost to you. It never changes the price you pay. Read our{" "}
        <Link href="/affiliate-disclosure">affiliate disclosure</Link> for details.
      </p>

      <h2>Fashion for every you</h2>
      <p>
        Style isn&apos;t one thing. Some days it&apos;s a sharp blazer, some days a kurta for a family function, some days
        a hoodie and your favourite jeans. We want Velvet Vine to feel welcoming whoever you are and whatever you&apos;re
        dressing for.
      </p>
    </ContentPage>
  );
}
