"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { UserRound, LogOut } from "lucide-react";

const UserInfo = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState("");

  const handleSignOut = async () => {
    setSigningOut(true);
    setError("");

    try {
      const result = await authClient.signOut();

      if (result.error) {
        setError("Logout failed. Please try again.");
        return;
      }

      setIsOpen(false);
      router.replace("/");
      router.refresh();
    } catch {
      setError("Logout failed. Please try again.");
    } finally {
      setSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <div
        className="h-10 w-10 animate-pulse rounded-full bg-gray-100"
        aria-label="Loading account"
      />
    );
  }

  if (!session?.user) {
    return (
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/signin"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 sm:px-4"
        >
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          className="rounded-lg bg-[#008a45] px-3 py-2 text-sm font-semibold text-white hover:bg-[#007038] sm:px-5"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const user = session.user;
  const displayName = user.name?.trim() || "ব্যবহারকারী";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label="Open profile menu"
        aria-expanded={isOpen}
        className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-[#e6f4ec] font-bold text-[#008a45] hover:ring-2 hover:ring-[#008a45]/30"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        ) : (
          initial
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-[60] mt-3 w-72 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <div className="border-b border-gray-100 px-4 py-4">
            <p className="truncate text-sm font-semibold text-gray-900">
              {displayName}
            </p>
            <p className="mt-1 break-all text-xs text-gray-500">{user.email}</p>
          </div>

          <div className="p-2">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-[#e6f4ec] hover:text-[#008a45]"
            >
              <UserRound size={18} />
              আমার প্রোফাইল
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
            >
              <LogOut size={18} />
              {signingOut ? "অপেক্ষা করুন..." : "সাইন আউট"}
            </button>

            {error && (
              <p role="alert" className="px-3 py-2 text-xs text-red-600">
                {error}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
