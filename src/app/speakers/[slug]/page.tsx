import ProductHero from "@/components/Details/ProductHero";
import ProductFeatures from "@/components/Details/ProductFeatures";
import { fetchProductBySlug } from "@/util/fetchSim";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/Details/ProductGallery";
import ProdRec from "@/components/Details/ProdRec";
import Assurance from "@/components/Assurance";
import Category from "@/components/Category";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <ProductHero product={product} />
      <ProductFeatures product={product} />
      <ProductGallery product={product} />
      <ProdRec product={product} />
      <Category />
      <Assurance />
    </>
  );
}