import type { Product } from "@/types/product";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

const formatBengaliNumber = (value: number) => {
  return new Intl.NumberFormat("bn-BD").format(value);
};

const ProductCard = ({ product }: ProductCardProps) => {
  const isUp = product.change.dir === "up";
  const isFlat = product.change.pct === 0;

  return (
    <Link
      href={`/product/${product.slug}`}
      aria-label={`${product.nameBn} — আজকের দাম ${formatBengaliNumber(product.today)} টাকা`}
      className="group block rounded-xl border border-[#dce6dd] bg-[#fbfdfb] p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
    >
      {/* Product Information */}
      <div className="flex items-center gap-2.5">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#f0f5ef] text-xl">
          <span role="img" aria-label={product.nameBn}>
            {product.image || product.categoryIcon || "🛒"}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-[#202b23] transition-colors group-hover:text-green-700">
            {product.nameBn}
          </h3>

          <p className="mt-0.5 text-xs text-gray-500">প্রতি {product.unit}</p>
        </div>
      </div>

      {/* Price Information */}
      <div className="mt-3 flex items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[10px] text-gray-500 sm:text-xs">
            আজকের দাম
          </p>

          <p className="mt-0.5 text-sm font-bold text-[#17231a] sm:text-base">
            {formatBengaliNumber(product.today)} টাকা
          </p>
        </div>

        {/* Price Change Badge */}
        <span
          className={`inline-flex shrink-0 items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold sm:text-xs ${
            isFlat
              ? "bg-gray-100 text-gray-500"
              : isUp
                ? "bg-red-50 text-red-600"
                : "bg-green-50 text-green-600"
          }`}
        >
          {isFlat ? "—" : isUp ? "▲" : "▼"}
          {formatBengaliNumber(product.change.pct)}%
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
