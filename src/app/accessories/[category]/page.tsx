import { SubcategoryPage, subcategoryMetadata, subcategoryParams } from "@/components/category/CategoryPages";

type Props = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return subcategoryParams("accessories");
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  return subcategoryMetadata("accessories", category);
}

export default async function Page({ params }: Props) {
  const { category } = await params;
  return <SubcategoryPage section="accessories" slug={category} />;
}
