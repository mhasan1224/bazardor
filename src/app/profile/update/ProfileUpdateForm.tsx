"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { updateProfileName } from "../actions";

interface ProfileUpdateFormProps {
  name: string;
}

export default function ProfileUpdateForm({
  name,
}: ProfileUpdateFormProps) {
  const router = useRouter();
  const [newName, setNewName] = useState(name);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      const result = await updateProfileName(newName);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.replace("/profile");
      router.refresh();
    });
  };

  return (
    <section className="mt-7 rounded-2xl border border-[#dce6dd] bg-white p-5 shadow-sm sm:p-7">
      <h2 className="text-lg font-bold text-gray-900">
        ব্যক্তিগত তথ্য
      </h2>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div>
          <label
            htmlFor="profile-name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            আপনার নাম
          </label>

          <input
            id="profile-name"
            type="text"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            placeholder="আপনার নাম লিখুন"
            minLength={3}
            maxLength={100}
            required
            autoComplete="name"
            className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#008a45] focus:ring-2 focus:ring-[#008a45]/20"
          />
        </div>

        <button
          type="submit"
          disabled={isPending || newName.trim().length < 3}
          className="w-full rounded-lg bg-[#008a45] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#007038] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "আপডেট হচ্ছে..." : "Update Information"}
        </button>

        <Link
          href="/profile"
          className="block rounded-lg border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          প্রোফাইলে ফিরে যান
        </Link>
      </form>
    </section>
  );
}