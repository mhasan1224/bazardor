"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      setError("ইমেইল ও পাসওয়ার্ড লিখুন।");
      return;
    }

    setLoading(true);

    try {
      const { error: signInError } = await authClient.signIn.email(
        {
          email,
          password,
          callbackURL: "/",
        },
        {
          onSuccess: () => {
            router.replace("/");
            router.refresh();
          },
          onError: (context) => {
            setError(
              context.error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।",
            );
          },
        },
      );

      if (signInError) {
        setError(signInError.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।");
      }
    } catch {
      setError("সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      setError("Google দিয়ে সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
    }
  };

  const handleGitHubSignIn = async () => {
    setError("");

    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });
    } catch {
      setError("GitHub দিয়ে সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
    }
  };

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f2f6f3] px-4 py-10 sm:py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            সাইন ইন
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <Form
          onSubmit={handleSubmit}
          className="w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8"
        >
          <Fieldset className="w-full">
            <FieldGroup>
              <TextField isRequired name="email" type="email">
                <Label>ইমেইল</Label>
                <Input autoComplete="email" placeholder="you@example.com" />
                <FieldError />
              </TextField>

              <TextField
                isRequired
                name="password"
                type="password"
                validate={(value) =>
                  value.length === 0 ? "পাসওয়ার্ড লিখুন" : null
                }
              >
                <Label>পাসওয়ার্ড</Label>
                <Input
                  autoComplete="current-password"
                  placeholder="আপনার পাসওয়ার্ড"
                />
                <FieldError />
              </TextField>
            </FieldGroup>

            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}

            <Fieldset.Actions className="w-full">
              <Button
                type="submit"
                isDisabled={loading}
                className="w-full bg-[#008a45] text-white hover:bg-[#007038]"
              >
                {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
              </Button>
            </Fieldset.Actions>

            <div className="my-1 flex w-full items-center gap-3">
              <span className="h-px flex-1 bg-gray-200" />
              <span className="text-sm text-gray-500">অথবা</span>
              <span className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="grid w-full grid-cols-2 gap-3">
              <Button
                type="button"
                onClick={handleGoogleSignIn}
                variant="tertiary"
                className="w-full min-w-0 border border-gray-200 bg-white px-2 text-sm hover:bg-gray-50"
              >
                <Icon icon="devicon:google" width="18" height="18" />
                Google
              </Button>

              <Button
                type="button"
                onClick={handleGitHubSignIn}
                variant="tertiary"
                className="w-full min-w-0 border border-gray-200 bg-white px-2 text-sm hover:bg-gray-50"
              >
                <Icon icon="mdi:github" width="20" height="20" />
                GitHub
              </Button>
            </div>

            <p className="w-full text-center text-sm text-gray-600">
              অ্যাকাউন্ট নেই?{" "}
              <Link
                href="/signup"
                className="font-semibold text-green-700 hover:underline"
              >
                সাইন আপ করুন
              </Link>
            </p>
          </Fieldset>
        </Form>

        <div className="mt-5 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-white hover:text-[#008a45]"
          >
            <Icon icon="lucide:arrow-left" width="18" height="18" />
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
