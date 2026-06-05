"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

import {
  Button,
  Form,
  Input,
  Label,
  TextField,
  FieldError,
} from "@heroui/react";

import { Check, Xmark } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const router = useRouter();
  const cardRef = useRef(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // GSAP Entrance Animation
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" },
    );
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      // Better Auth Sign In Method
      const res = await authClient.signIn.email({
        email,
        password,
      });

      if (res?.error) {
        setError(res.error.message || "Invalid email or password");
      } else {
        setSuccess("Logged in successfully! Redirecting... 🚀");

        // Success animation pop
        gsap.to(cardRef.current, {
          scale: 1.01,
          duration: 0.15,
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            router.push("/"); // লগইন সফল হলে হোমপেজে বা ড্যাশবোর্ডে পাঠাবে
          },
        });
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Input fields এর রিইউজেবল স্টাইল
  const inputStyles =
    "w-full bg-[#1c1c1f] hover:bg-[#242427] focus:bg-[#1c1c1f] border border-white/5 focus:border-white/20 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm transition-all outline-none";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4 relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-zinc-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Sign In Card Container */}
      <div
        ref={cardRef}
        className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#121214] shadow-2xl overflow-hidden relative z-10"
      >
        <Form className="flex flex-col h-full" onSubmit={onSubmit}>
          {/* HEADER SECTION */}
          <div className="flex items-center justify-between border-b border-white/10 px-8 py-6 bg-[#161619]/50">
            <div>
              <h1 className="text-xl font-semibold text-white tracking-tight">
                Welcome Back
              </h1>
              <p className="text-sm text-zinc-400 mt-1">
                Sign in to manage your account on HireLoop.
              </p>
            </div>
            <Button
              isIconOnly
              variant="light"
              radius="full"
              className="text-zinc-500 hover:text-white transition-colors"
              onClick={() => router.push("/")}
            >
              <Xmark width={18} height={18} />
            </Button>
          </div>

          {/* FORM BODY */}
          <div className="px-8 py-8 flex flex-col gap-6">
            {/* Error & Success Messages */}
            {error && (
              <div className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                {success}
              </div>
            )}

            {/* EMAIL FIELD */}
            <TextField
              isRequired
              name="email"
              type="email"
              className="flex flex-col gap-2"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label className="text-sm font-medium text-zinc-300">
                Email Address
              </Label>
              <Input placeholder="john@example.com" className={inputStyles} />
              <FieldError className="text-xs text-red-400 mt-1" />
            </TextField>

            {/* PASSWORD FIELD */}
            <TextField
              isRequired
              name="password"
              type="password"
              className="flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-zinc-300">
                  Password
                </Label>
                {/* অপশনাল: ফরগট পাসওয়ার্ড লিংক এড করতে পারেন */}
                <Link
                  href="/forgot-password"
                  className="text-xs text-zinc-500 hover:text-white transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                placeholder="Enter your password"
                className={inputStyles}
              />
              <FieldError className="text-xs text-red-400 mt-1" />
            </TextField>
          </div>

          {/* FOOTER SECTION */}
          <div className="border-t border-white/10 px-8 py-5 bg-[#161619]/40 flex items-center justify-between mt-auto">
            <p className="text-sm text-zinc-400">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-white hover:underline font-medium transition-all"
              >
                Sign Up
              </Link>
            </p>

            <div className="flex items-center gap-3">
              <Button
                type="submit"
                isLoading={loading}
                className="bg-white text-black hover:bg-zinc-200 font-semibold px-6 h-10 rounded-xl shadow-lg flex items-center gap-1.5 transition-all"
              >
                {!loading && <Check width={16} height={16} strokeWidth={2.5} />}
                Sign In
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
