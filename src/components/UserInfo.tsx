"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const UserInfo = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState("");

  const handleSignOut = async () => {
    setSigningOut(true);
    setError("");

    try {
      const result = await authClient.signOut();

      if (result.error) {
        setError("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setError("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <div
        className="h-10 w-24 animate-pulse rounded-lg bg-gray-100"
        aria-label="অ্যাকাউন্ট লোড হচ্ছে"
      />
    );
  }

  if (!session?.user) {
    return (
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <Link
          href="/signin"
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 sm:px-4"
        >
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          className="inline-flex items-center justify-center rounded-lg bg-[#008a45] px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#007038] sm:px-5"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
      <Link
        href="/profile"
        className="min-w-0 max-w-36 rounded-lg px-2 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-100 sm:max-w-48 sm:px-3"
        title={session.user.name || "আমার প্রোফাইল"}
      >
        <span className="block truncate">
          {session.user.name || "আমার প্রোফাইল"}
        </span>
      </Link>

      <button
        type="button"
        onClick={handleSignOut}
        disabled={signingOut}
        className="inline-flex shrink-0 items-center justify-center rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 sm:px-4"
      >
        {signingOut ? "অপেক্ষা করুন..." : "সাইন আউট"}
      </button>

      {error && (
        <p
          role="alert"
          className="absolute right-4 top-full mt-1 rounded-md bg-white p-2 text-xs text-red-600 shadow"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default UserInfo;