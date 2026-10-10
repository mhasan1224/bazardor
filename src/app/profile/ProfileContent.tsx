"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { updateProfileName } from "./actions";
import Image from "next/image";
import { LogOut } from "lucide-react";

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
  const [currentName, setCurrentName] = useState(name);
  const [newName, setNewName] = useState(name);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const displayName = currentName.trim() || "ব্যবহারকারী";

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    startTransition(async () => {
      const result = await updateProfileName(newName);

      setMessage(result.message);

      if (result.success && result.name) {
        setCurrentName(result.name);
        setNewName(result.name);
        router.refresh();
      }
    });
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        setMessage("Logout করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setMessage("Logout করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="mt-7 space-y-6">
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-[#e6f4ec] text-xl font-bold text-[#008a45] sm:h-20 sm:w-20">
            {image ? (
              <Image
                src={image}
                alt="Profile avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              displayName.charAt(0).toUpperCase()
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-base font-bold text-gray-900 sm:text-lg">
              {displayName}
            </h2>
            <p className="mt-1 break-all text-sm text-gray-500">{email}</p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-red-500 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 shadow-sm transition-colors hover:text-white hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:px-5"
          >
            <LogOut size={17} />
            {isLoggingOut ? "অপেক্ষা করুন..." : "সাইন আউট"}
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="text-lg font-bold text-gray-900">তথ্য</h2>

        <form onSubmit={handleUpdate} className="mt-5 space-y-3">
          <label
            htmlFor="profile-name"
            className="block text-sm font-medium text-gray-700"
          >
            নাম
          </label>

          <input
            id="profile-name"
            type="text"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            placeholder="আপনার নাম লিখুন"
            maxLength={100}
            required
            className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#008a45] focus:ring-2 focus:ring-[#008a45]/20"
          />

          <button
            type="submit"
            disabled={isPending || !newName.trim()}
            className="block w-full rounded-lg bg-[#008a45] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#007038] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "আপডেট হচ্ছে..." : "Update"}
          </button>

          {message && (
            <p
              role="status"
              className={`text-sm ${
                message.includes("সফলভাবে") ? "text-green-700" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </section>
    </div>
  );
}
