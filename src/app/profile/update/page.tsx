import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileUpdateForm from "./ProfileUpdateForm";

export default async function ProfileUpdatePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <main className="min-h-screen bg-[#f2f6f3] px-4 py-10">
      <div className="mx-auto max-w-xl">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          তথ্য আপডেট করুন
        </h1>

        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          আপনার অ্যাকাউন্টের নাম পরিবর্তন করতে নিচের ফর্মটি ব্যবহার করুন।
        </p>

        <ProfileUpdateForm name={session.user.name ?? ""} />
      </div>
    </main>
  );
}