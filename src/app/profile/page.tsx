
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileContent from "./ProfileContent";


export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          আমার প্রোফাইল
        </h1>

        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          আপনার অ্যাকাউন্টের তথ্য দেখুন।
        </p>

        <ProfileContent
          name={session.user.name ?? ""}
          email={session.user.email}
          image={session.user.image ?? null}
        />
      </div>
    </main>
  );
}
