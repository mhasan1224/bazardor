
import type { Product } from "@/types/product";

const productService = async (): Promise<Product[]> => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  const products: Product[] = await res.json();

  return products;
};

export default productService;