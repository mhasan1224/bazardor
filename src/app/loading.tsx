export default function HomeLoading() {
  return (
    <main className="min-h-screen animate-pulse bg-[#f2f6f3]">
      <section className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
        <div className="grid items-center gap-8 rounded-2xl bg-white p-6 sm:p-8 lg:grid-cols-2 lg:p-12">
          <div className="space-y-4">
            <div className="h-4 w-32 rounded bg-gray-200" />
            <div className="h-9 w-full max-w-md rounded bg-gray-200" />
            <div className="h-5 w-full max-w-sm rounded bg-gray-100" />
            <div className="h-5 w-3/4 max-w-sm rounded bg-gray-100" />
            <div className="h-11 w-36 rounded-lg bg-gray-200" />
          </div>

          <div className="h-48 rounded-xl bg-gray-200 sm:h-64" />
        </div>
      </section>

      {[0, 1, 2].map((section) => (
        <section
          key={section}
          className="container mx-auto px-4 py-6 md:px-6"
        >
          <div className="mb-5 space-y-2">
            <div className="h-6 w-44 rounded bg-gray-200" />
            <div className="h-4 w-60 max-w-full rounded bg-gray-100" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={index}
                className="rounded-xl border border-[#dce6dd] bg-white p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-xl bg-gray-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 rounded bg-gray-200" />
                    <div className="h-3 w-1/3 rounded bg-gray-100" />
                  </div>
                </div>

                <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-3">
                  <div className="space-y-2">
                    <div className="h-3 w-16 rounded bg-gray-100" />
                    <div className="h-5 w-24 rounded bg-gray-200" />
                  </div>
                  <div className="h-6 w-14 rounded-full bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}