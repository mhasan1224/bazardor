import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[65vh] items-center justify-center bg-[#f2f6f3] px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-[#dce6dd] bg-white p-8 text-center shadow-sm sm:p-12">
        <div
          className="mx-auto flex size-20 items-center justify-center rounded-full bg-green-50 text-4xl"
          aria-hidden="true"
        >
          🛒
        </div>

        <p className="mt-6 text-sm font-semibold tracking-widest text-green-700">
          ERROR 404
        </p>

        <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
          পেজটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
          দুঃখিত! আপনি যে পেজটি খুঁজছেন, সেটি পাওয়া যায়নি।
          ঠিকানা যাচাই করুন অথবা হোম পেজে ফিরে যান।
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex items-center justify-center rounded-lg bg-[#008a45] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#007038] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}