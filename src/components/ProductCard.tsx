import type { Product } from "@/types/product";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

const formatBengaliNumber = (value: number): string => {
  return new Intl.NumberFormat("bn-BD").format(value);
};

const ProductCard = ({ product }: ProductCardProps) => {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  const isFlat = product.change.pct === 0;

  const priceChangeClass = isFlat
    ? "bg-gray-100 text-gray-600"
    : isUp
      ? "bg-red-50 text-red-600"
      : "bg-green-50 text-green-700";

  const priceChangeLabel = isFlat
    ? "দাম অপরিবর্তিত"
    : isUp
      ? "দাম বেড়েছে"
      : "দাম কমেছে";

  return (
    <Link
      href={`/product/${product.id}`}
      aria-label={`${product.nameBn}, আজকের দাম ${formatBengaliNumber(product.today)} টাকা প্রতি ${product.unit}`}
      className="group block rounded-xl border border-[#dce6dd] bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
    >
      <div className="flex items-center gap-3">
        <div
          className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#f0f5ef] text-2xl"
          aria-hidden="true"
        >
          {product.categoryIcon || "🛒"}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-[#202b23] transition-colors group-hover:text-green-700 sm:text-base">
            {product.nameBn}
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            প্রতি {product.unit}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-2 border-t border-gray-100 pt-3">
        <div className="min-w-0">
          <p className="text-xs text-gray-500">আজকের দাম</p>

          <p className="mt-1 text-base font-bold text-[#17231a] sm:text-lg">
            {formatBengaliNumber(product.today)} টাকা
          </p>
        </div>

        <span
          aria-label={`${priceChangeLabel}, ${formatBengaliNumber(product.change.pct)} শতাংশ`}
          className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${priceChangeClass}`}
        >
          {isFlat ? (
            <span aria-hidden="true">—</span>
          ) : (
            <span aria-hidden="true">{isUp ? "▲" : "▼"}</span>
          )}

          {formatBengaliNumber(product.change.pct)}%
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;