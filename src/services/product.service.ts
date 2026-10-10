import type { Product } from "@/types/product";

const productService = async (
  category?: string,
): Promise<Product[]> => {
  const url = new URL(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );

  if (category) {
    url.searchParams.set("category", category);
  }

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  const products: Product[] = await res.json();

  return products;
};

export const getProductById = async (
  id: number,
): Promise<Product> => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${id}`,
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.status}`);
  }

  const product: Product = await res.json();

  return product;
};

export default productService;