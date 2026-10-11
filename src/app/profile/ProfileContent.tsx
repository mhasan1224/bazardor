"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { LogOut, Pencil } from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface ProfileContentProps {
  name: string;
  email: string;
  image: string | null;
}

export default function ProfileContent({
  name,
  email,
  image,
}: ProfileContentProps) {
  const router = useRouter();
  const [isLoggingOut, startLogoutTransition] = useTransition();
  const [message, setMessage] = useState("");

  const handleSignOut = () => {
    setMessage("");

    startLogoutTransition(async () => {
      try {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              toast.success("সফলভাবে সাইন আউট হয়েছে।");
              router.replace("/");
              router.refresh();
            },
            onError: () => {
              setMessage("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
            },
          },
        });
      } catch {
        setMessage("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
      }
    });
  };

  return (
    <section className="mt-7 rounded-2xl border border-[#dce6dd] bg-white p-5 shadow-sm sm:p-7">
      <div className="flex flex-col justify-between gap-5 border-b border-gray-100 pb-6 sm:flex-row sm:items-center">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          {image ? (
            <img
              src={image}
              alt="Profile"
              className="h-20 w-20 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#e5f3e9] text-3xl font-bold text-[#008a45]">
              {name.trim().charAt(0).toUpperCase() || "U"}
            </div>
          )}

          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-gray-900">
              {name || "ব্যবহারকারী"}
            </h2>
            <p className="mt-1 break-all text-sm text-gray-600">
              {email}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          disabled={isLoggingOut}
          className="flex shrink-0 items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LogOut size={18} />
          {isLoggingOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold text-gray-900">
          ব্যক্তিগত তথ্য
        </h3>

        <p className="mt-2 text-sm text-gray-600">
          আপনার অ্যাকাউন্টের নাম পরিবর্তন করতে নিচের বাটনে ক্লিক করুন।
        </p>

        <Link
          href="/profile/update"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#008a45] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#007038]"
        >
          <Pencil size={18} />
          Update Information
        </Link>
      </div>

      {message && (
        <p role="alert" className="mt-4 text-sm text-red-600">
          {message}
        </p>
      )}
    </section>
  );
}