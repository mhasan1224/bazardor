import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProductById } from "@/services/product.service";
import type { Product } from "@/types/product";

interface ProductDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const formatNumber = (value: number) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  const { slug } = await params;
  const id = Number(slug);

  if (!Number.isInteger(id) || id <= 0) {
    notFound();
  }

  let product: Product;

  try {
    product = await getProductById(id);
  } catch {
    notFound();
  }

  const markets = product.markets
    .map((market) => ({
      ...market,
      average: (market.min + market.max) / 2,
    }))
    .sort((a, b) => a.average - b.average);

  const lowestMarket = product.markets.reduce(
    (lowest, market) =>
      market.min < lowest.min ? market : lowest,
    product.markets[0] ?? {
      market: "",
      division: "",
      min: product.today,
      max: product.today,
    },
  );

  const highestMarket = product.markets.reduce(
    (highest, market) =>
      market.max > highest.max ? market : highest,
    product.markets[0] ?? {
      market: "",
      division: "",
      min: product.today,
      max: product.today,
    },
  );

  const averagePrice =
    markets.length > 0
      ? markets.reduce(
          (total, market) => total + market.average,
          0,
        ) / markets.length
      : 0;

  const isUp = product.change.dir === "up";
  const isFlat = product.change.pct === 0;

  return (
    <main className="min-h-screen bg-[#f2f6f3] px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500"
        >
          <Link href="/" className="transition hover:text-green-700">
            হোম
          </Link>

          <span aria-hidden="true">/</span>

          <Link
            href={`/category/${product.category}`}
            className="transition hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>

          <span aria-hidden="true">/</span>

          <span className="font-medium text-gray-800">
            {product.nameBn}
          </span>
        </nav>

        <section className="rounded-2xl border border-[#dce6dd] bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-[#f0f5ef] text-5xl sm:size-24">
              {product.image || product.categoryIcon || "🛒"}
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {product.nameBn}
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                প্রতি {product.unit === "kg" ? "কেজি" : product.unit} ·{" "}
                {product.categoryNameBn}
              </p>

              <p
                className={`mt-4 text-sm font-medium ${
                  isFlat
                    ? "text-gray-500"
                    : isUp
                      ? "text-red-600"
                      : "text-green-700"
                }`}
              >
                গতকালের তুলনায় আজ দাম{" "}
                <strong>
                  {isFlat ? "অপরিবর্তিত" : isUp ? "বেড়েছে" : "কমেছে"}
                </strong>{" "}
                {formatNumber(product.change.pct)}%
              </p>
            </div>

            <div className="rounded-xl bg-[#f0f7f0] p-5 sm:min-w-48">
              <p className="text-sm text-gray-600">আজকের দাম</p>

              <p className="mt-1 text-3xl font-bold text-green-800">
                {formatNumber(product.today)}
              </p>

              <p className="mt-1 text-sm text-gray-600">
                টাকা / {product.unit === "kg" ? "কেজি" : product.unit}
              </p>

              <span
                className={`mt-3 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                  isFlat
                    ? "bg-gray-100 text-gray-600"
                    : isUp
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                }`}
              >
                {isFlat ? "—" : isUp ? "▲" : "▼"}{" "}
                {formatNumber(product.change.pct)}%
              </span>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-[#dce6dd] bg-white p-5">
              <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                {formatNumber(lowestMarket.min)} টাকা
              </p>

              <p className="mt-2 text-sm text-gray-500">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            <div className="rounded-xl border border-[#dce6dd] bg-white p-5">
              <p className="text-sm text-gray-500">সর্বাধিক দাম</p>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                {formatNumber(highestMarket.max)} টাকা
              </p>

              <p className="mt-2 text-sm text-gray-500">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            <div className="rounded-xl border border-[#dce6dd] bg-white p-5">
              <p className="text-sm text-gray-500">গড় দাম</p>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                {formatNumber(
                  markets.length > 0
                    ? Math.round(averagePrice)
                    : product.today,
                )}{" "}
                টাকা
              </p>

              <p className="mt-2 text-sm text-gray-500">
                প্রতি {product.unit === "kg" ? "কেজি" : product.unit}-এর হিসাবে
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 pb-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {markets.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-[#dce6dd] bg-white">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead className="bg-[#eaf1eb] text-gray-800">
                  <tr>
                    <th className="px-4 py-4 font-semibold">বাজার</th>
                    <th className="px-4 py-4 font-semibold">বিভাগ</th>
                    <th className="px-4 py-4 text-right font-semibold">
                      সর্বনিম্ন
                    </th>
                    <th className="px-4 py-4 text-right font-semibold">
                      সর্বাধিক
                    </th>
                    <th className="px-4 py-4 text-right font-semibold">
                      গড়
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market, index) => (
                    <tr
                      key={`${market.market}-${index}`}
                      className="border-t border-[#e5ece6] transition-colors hover:bg-[#f7faf7]"
                    >
                      <td className="px-4 py-4 font-semibold text-gray-800">
                        {market.market}
                      </td>

                      <td className="px-4 py-4 text-gray-600">
                        {market.division}
                      </td>

                      <td className="px-4 py-4 text-right text-gray-700">
                        {formatNumber(market.min)} টাকা
                      </td>

                      <td className="px-4 py-4 text-right text-gray-700">
                        {formatNumber(market.max)} টাকা
                      </td>

                      <td className="px-4 py-4 text-right font-bold text-gray-900">
                        {formatNumber(market.average)} টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="rounded-xl border border-[#dce6dd] bg-white p-5 text-gray-500">
              এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
            </p>
          )}
        </section>

        <div className="border-t border-[#dce6dd] py-6">
          <Link
            href={`/category/${product.category}`}
            className="inline-flex items-center gap-2 rounded-lg bg-[#008a45] px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-[#007038] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <span aria-hidden="true">{product.categoryIcon}</span>
            <span>{product.categoryNameBn}</span>
          </Link>
        </div>
      </div>
    </main>
  );
}