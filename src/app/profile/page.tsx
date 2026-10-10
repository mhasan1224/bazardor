import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <main className="min-h-[70vh] bg-[#f2f6f3] px-4 py-12">
      <section className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900">
          আমার প্রোফাইল
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>

        <div className="mt-8 space-y-5">
          <div>
            <p className="text-sm font-medium text-gray-500">
              নাম
            </p>
            <p className="mt-1 break-words font-semibold text-gray-900">
              {session.user.name || "নাম দেওয়া হয়নি"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              ইমেইল
            </p>
            <p className="mt-1 break-all font-semibold text-gray-900">
              {session.user.email}
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex min-h-10 items-center justify-center rounded-lg bg-[#008a45] px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-[#007038]"
        >
          হোমপেজে ফিরে যান
        </Link>
      </section>
    </main>
  );
}