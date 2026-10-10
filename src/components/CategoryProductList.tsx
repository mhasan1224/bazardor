"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";

interface CategoryProductListProps {
  products: Product[];
}

type SortOption = "default" | "price-asc" | "price-desc";

const formatBengaliNumber = (value: number): string => {
  return new Intl.NumberFormat("bn-BD").format(value);
};

const CategoryProductList = ({ products }: CategoryProductListProps) => {
  const [sortOption, setSortOption] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sortOption === "price-asc") {
      result.sort((a, b) => a.today - b.today);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sortOption]);

  const categoryName = products[0]?.categoryNameBn ?? "পণ্য";

  return (
    <section className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Category Header Box */}
      <div className="mb-8 rounded-2xl border border-gray-100 bg-[#f8f9f8] p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Rice/Category Icon */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-2xl shadow-inner">
            🍚
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {categoryName}
            </h1>
            <p className="mt-1 text-sm text-gray-500 sm:text-base">
              {formatBengaliNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </div>

      {/* Control & Sorting Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm font-medium text-gray-600">
          মোট {formatBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="flex items-center gap-3">
          <label
            htmlFor="product-sort"
            className="shrink-0 text-sm font-medium text-gray-700"
          >
            সাজান
          </label>

          <div className="relative">
            <select
              id="product-sort"
              value={sortOption}
              onChange={(event) =>
                setSortOption(event.target.value as SortOption)
              }
              className="appearance-none rounded-xl border border-gray-200 bg-white py-2 pl-4 pr-9 text-sm font-medium text-gray-800 shadow-sm outline-none transition hover:border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-100 cursor-pointer"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-asc">দাম: কম থেকে বেশি</option>
              <option value="price-desc">দাম: বেশি থেকে কম</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
              ▼
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-4 py-16 text-center">
          <p className="font-medium text-gray-600">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>
        </div>
      )}
    </section>
  );
};

export default CategoryProductList;