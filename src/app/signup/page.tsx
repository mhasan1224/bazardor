"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  Description,
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const passwordValue = String(formData.get("password") ?? "");
    const confirmPasswordValue = String(formData.get("confirmPassword") ?? "");

    if (passwordValue !== confirmPasswordValue) {
      setError("পাসওয়ার্ড দুটি মিলছে না।");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password: passwordValue,
      });

      if (result.error) {
        setError(result.error.message ?? "অ্যাকাউন্ট তৈরি করা যায়নি।");
        return;
      }

      router.push("/signin");
    } catch {
      setError("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
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
          className="w-full max-w-md rounded border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
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
                minLength={8}
                validate={(value) => {
                  if (value.length < 8) {
                    return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
                  }

                  return null;
                }}
              >
                <Label>পাসওয়ার্ড</Label>
                <Input
                  autoComplete="new-password"
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
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
                  onChange={(event) => setConfirmPassword(event.target.value)}
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
                className="w-full bg-success text-white"
              >
                {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
              </Button>
            </Fieldset.Actions>

            <p className="text-sm text-gray-600">
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
      </div>
    </main>
  );
}
