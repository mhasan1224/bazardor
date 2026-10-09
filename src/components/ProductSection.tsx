import type { Product } from "@/types/product";
import ProductCard from "./ProductCard";


interface ProductSectionProps {
  title: string;
  products: Product[];
  subtitle?: string;
  id?: string;
}

const ProductSection = ({
  title,
  products,
  subtitle,
  id,
}: ProductSectionProps) => {
  return (
    <section id={id} className="container mx-auto py-5">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-sm text-gray-500">
            {subtitle}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;