import { notFound } from "next/navigation";
import ProductSection from "@/components/ProductSection";
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
      <ProductSection
        title={products[0].categoryNameBn}
        subtitle={`${products.length}টি পণ্য পাওয়া গেছে`}
        products={products}
      />
    </main>
  );
}