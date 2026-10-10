import { notFound } from "next/navigation";
import CategoryProductList from "@/components/CategoryProductList";
import productService from "@/services/product.service";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  const products = await productService(slug);

  if (products.length === 0) {
    notFound();
  }

  return (
  <main className="min-h-screen bg-[#f2f6f3] px-4 py-6 md:px-6">
    <section className="container mx-auto py-5">
      <CategoryProductList products={products} />
    </section>
  </main>
);
}