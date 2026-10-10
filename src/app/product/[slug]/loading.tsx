export default function ProductDetailsLoading() {
  return (
    <main className="min-h-screen animate-pulse bg-[#f2f6f3] px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb skeleton */}
        <div className="mb-6 flex gap-3">
          <div className="h-4 w-16 rounded bg-gray-200" />
          <div className="h-4 w-4 rounded bg-gray-200" />
          <div className="h-4 w-24 rounded bg-gray-200" />
        </div>

        {/* Product summary skeleton */}
        <section className="rounded-2xl border border-[#dce6dd] bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="size-20 shrink-0 rounded-2xl bg-gray-200 sm:size-24" />

            <div className="flex-1 space-y-3">
              <div className="h-7 w-48 max-w-full rounded bg-gray-200" />
              <div className="h-4 w-36 max-w-full rounded bg-gray-200" />
              <div className="h-4 w-44 max-w-full rounded bg-gray-200" />
            </div>

            <div className="rounded-xl bg-[#f0f7f0] p-5 sm:min-w-48">
              <div className="h-4 w-20 rounded bg-gray-200" />
              <div className="mt-3 h-9 w-28 rounded bg-gray-200" />
              <div className="mt-3 h-4 w-24 rounded bg-gray-200" />
            </div>
          </div>
        </section>

        {/* Price summary skeleton */}
        <section className="mt-8">
          <div className="mb-4 h-6 w-40 rounded bg-gray-200" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="rounded-xl border border-[#dce6dd] bg-white p-5"
              >
                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="mt-3 h-8 w-32 rounded bg-gray-200" />
                <div className="mt-3 h-4 w-36 max-w-full rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </section>

        {/* Market table skeleton */}
        <section className="mt-8 pb-8">
          <div className="mb-4 h-6 w-48 rounded bg-gray-200" />

          <div className="overflow-hidden rounded-xl border border-[#dce6dd] bg-white">
            <div className="h-12 bg-[#eaf1eb]" />

            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className="flex h-14 items-center gap-4 border-t border-[#e5ece6] px-4"
              >
                <div className="h-4 flex-1 rounded bg-gray-200" />
                <div className="h-4 flex-1 rounded bg-gray-200" />
                <div className="h-4 w-16 rounded bg-gray-200" />
                <div className="h-4 w-16 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}