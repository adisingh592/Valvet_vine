import { WelcomeScreen } from "@/components/welcome/WelcomeScreen";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Welcome",
  description: "Discover, save and shop curated fashion from India's favourite stores.",
  path: "/welcome",
});

export default function WelcomePage() {
  return <WelcomeScreen mode="page" />;
}
