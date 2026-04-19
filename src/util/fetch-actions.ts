"use server";

import { prisma } from "../lib/prisma";
import { Product } from "@/types/product";

export async function getProduct(slug: string): Promise<Product | null> {
  const dbProduct = await prisma.product.findUnique({ where: { slug } });
  if (!dbProduct) return null;

  return {
    ...dbProduct,
    image: dbProduct.image as Product['image'],
    categoryImage: dbProduct.categoryImage as Product['categoryImage'],
    includes: dbProduct.includes as Product['includes'],
    gallery: dbProduct.gallery as Product['gallery'],
    others: (dbProduct as any).others as Product['others'], // if exists
  };
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const dbProducts = await prisma.product.findMany({ where: { category } });
  return dbProducts.map(dbProduct => ({
    ...dbProduct,
    image: dbProduct.image as Product['image'],
    categoryImage: dbProduct.categoryImage as Product['categoryImage'],
    includes: dbProduct.includes as Product['includes'],
    gallery: dbProduct.gallery as Product['gallery'],
    others: (dbProduct as any).others as Product['others'],
  }));
}

export async function getAllProducts(): Promise<Product[]> {
  const dbProducts = await prisma.product.findMany();
  return dbProducts.map(dbProduct => ({
    ...dbProduct,
    image: dbProduct.image as Product['image'],
    categoryImage: dbProduct.categoryImage as Product['categoryImage'],
    includes: dbProduct.includes as Product['includes'],
    gallery: dbProduct.gallery as Product['gallery'],
    others: (dbProduct as any).others as Product['others'],
  }));
}