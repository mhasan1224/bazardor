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

export default function SignUpPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const passwordValue = password;

    if (name.length < 3) {
      setError("নাম কমপক্ষে ৩ অক্ষরের হতে হবে।");
      return;
    }

    if (passwordValue.length < 8) {
      setError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (passwordValue !== confirmPassword) {
      setError("পাসওয়ার্ড দুটি মিলছে না।");
      return;
    }

    try {
      await authClient.signUp.email(
        {
          name,
          email,
          password: passwordValue,
          callbackURL: "/",
        },
        {
          onRequest: () => {
            setLoading(true);
          },
          onSuccess: () => {
            router.replace("/");
            router.refresh();
          },
          onError: (ctx) => {
            setError(ctx.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
          },
        },
      );
    } catch {
      setError("অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।");
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
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f2f6f3] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <Form
          onSubmit={handleSubmit}
          className="w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <Fieldset className="w-full">
            <FieldGroup>
              <TextField
                isRequired
                name="name"
                validate={(value) =>
                  value.trim().length < 3
                    ? "নাম কমপক্ষে ৩ অক্ষরের হতে হবে"
                    : null
                }
              >
                <Label>নাম</Label>
                <Input autoComplete="name" placeholder="যেমন: রহিম উদ্দিন" />
                <FieldError />
              </TextField>

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
                  value.length < 8
                    ? "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে"
                    : null
                }
              >
                <Label>পাসওয়ার্ড</Label>
                <Input
                  autoComplete="new-password"
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FieldError />
              </TextField>

              <TextField
                isRequired
                name="confirmPassword"
                type="password"
                validate={(value) =>
                  value !== password ? "পাসওয়ার্ড দুটি মিলছে না" : null
                }
              >
                <Label>পাসওয়ার্ড নিশ্চিত করুন</Label>
                <Input
                  autoComplete="new-password"
                  placeholder="আবার লিখুন"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <FieldError />
              </TextField>
            </FieldGroup>

            {error && (
              <p role="alert" className="text-sm font-medium text-red-600">
                {error}
              </p>
            )}

            <Fieldset.Actions className="w-full">
              <Button
                type="submit"
                isDisabled={loading}
                className="w-full bg-[#008a45] text-white hover:bg-[#007038]"
              >
                {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
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
              অ্যাকাউন্ট আছে?{" "}
              <Link
                href="/signin"
                className="font-semibold text-green-700 hover:underline"
              >
                সাইন ইন করুন
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
