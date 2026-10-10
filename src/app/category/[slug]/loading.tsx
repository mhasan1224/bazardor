export default function CategoryLoading() {
  return (
    <main className="min-h-screen animate-pulse bg-[#f2f6f3] px-4 py-6 md:px-6">
      <section className="container mx-auto py-5">
        <div className="mb-6">
          <div className="h-8 w-40 rounded-lg bg-gray-200 sm:h-9" />
          <div className="mt-3 h-4 w-64 max-w-full rounded bg-gray-200" />
        </div>

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="h-4 w-36 rounded bg-gray-200" />
          <div className="h-10 w-full rounded-lg bg-gray-200 sm:w-52" />
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
    </main>
  );
}