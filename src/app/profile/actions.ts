
"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

export async function updateProfileName(name: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return {
      success: false,
      message: "আপনাকে প্রথমে সাইন ইন করতে হবে।",
    };
  }

  const trimmedName = name.trim();

  if (!trimmedName) {
    return {
      success: false,
      message: "নাম লিখুন।",
    };
  }

  if (trimmedName.length > 100) {
    return {
      success: false,
      message: "নাম ১০০ অক্ষরের মধ্যে হতে হবে।",
    };
  }

  try {
    await auth.api.updateUser({
      headers: await headers(),
      body: {
        name: trimmedName,
      },
    });

    revalidatePath("/profile");

    return {
      success: true,
      message: "নাম সফলভাবে আপডেট হয়েছে।",
      name: trimmedName,
    };
  } catch {
    return {
      success: false,
      message: "নাম আপডেট করা যায়নি। আবার চেষ্টা করুন।",
    };
  }
}
