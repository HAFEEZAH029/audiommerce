import data from "@/data/data.json";
import { Product } from "@/types/product";

export const fetchProductBySlug = (slug: string): Product | undefined => {
  return data.find((product) => product.slug === slug);
};