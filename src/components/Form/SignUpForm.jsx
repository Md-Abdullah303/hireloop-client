"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

import { Description, Radio, RadioGroup } from "@heroui/react";
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
import { useRouter, useSearchParams } from "next/navigation";

export default function SignUpForm() {
  const router = useRouter();
  const cardRef = useRef(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("seeker");

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

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
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const plan = role === "seeker" ? "seeker-free" : "recruiter-free";

    try {
      const res = await authClient.signUp.email({
        name,
        email,
        password,
        role,
        plan,
      });

      if (res?.error) {
        setError(res.error.message || "Signup failed");
      } else {
        e.target.reset();
        setSuccess("Account created successfully 🎉");
        console.log(Object.fromEntries(formData.entries()));

        gsap.to(cardRef.current, {
          scale: 1.01,
          duration: 0.15,
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            router.push(redirectTo);
          },
        });
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Reusable responsive input styles
  const inputStyles =
    "w-full bg-[#1c1c1f] hover:bg-[#242427] focus:bg-[#1c1c1f] border border-white/5 focus:border-white/20 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm transition-all outline-none";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4 py-10 relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-zinc-500/5 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />

      {/* Main Container */}
      <div
        ref={cardRef}
        className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#121214] shadow-2xl overflow-hidden relative z-10"
      >
        <Form className="flex flex-col h-full" onSubmit={onSubmit}>
          {/* HEADER SECTION - Responsive Padding & Text Size */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-8 sm:py-6 bg-[#161619]/50">
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
                Register New Account
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Enter your details to start hiring on HireLoop.
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

          {/* FORM BODY - Responsive Padding */}
          <div className="px-5 py-6 sm:px-8 sm:py-8 flex flex-col gap-5 sm:gap-6">
            {/* Status Notifications */}
            {error && (
              <div className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                <span className="break-words">{error}</span>
              </div>
            )}
            {success && (
              <div className="p-3 text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                <span className="break-words">{success}</span>
              </div>
            )}

            {/* NAME FIELD */}
            <TextField isRequired name="name" className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-zinc-300">Name</Label>
              <Input
                placeholder="e.g. Acme Corp or John Doe"
                className={inputStyles}
              />
              <FieldError className="text-xs text-red-400 mt-1" />
            </TextField>

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
              <Input
                placeholder="www.company.com or john@example.com"
                className={inputStyles}
              />
              <FieldError className="text-xs text-red-400 mt-1" />
            </TextField>

            {/* PASSWORD FIELD */}
            <TextField
              isRequired
              name="password"
              type="password"
              className="flex flex-col gap-2"
              minLength={8}
              validate={(value) => {
                if (value.length < 8)
                  return "Password must be at least 8 characters";
                if (!/[A-Z]/.test(value))
                  return "Must include 1 uppercase letter";
                if (!/[0-9]/.test(value)) return "Must include 1 number";
                return null;
              }}
            >
              <Label className="text-sm font-medium text-zinc-300">
                Password
              </Label>
              <Input
                placeholder="Enter secure password"
                className={inputStyles}
              />
              <Description className="text-xs text-zinc-500">
                8+ chars, 1 uppercase, 1 number
              </Description>
              <FieldError className="text-xs text-red-400 mt-1" />
            </TextField>

            {/* Redio Field */}
            <div className="flex  flex-col gap-4">
              <Label className="text-gray-400">{`What's your role?`}</Label>
              <RadioGroup
                onChange={(value) => setRole(value)}
                defaultValue="seeker"
                name="role"
                orientation="horizontal"
              >
                <Radio value="seeker">
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  <Radio.Content>
                    <Label>Job Seeker</Label>
                  </Radio.Content>
                </Radio>
                <Radio value="recruiter">
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  <Radio.Content>
                    <Label>Recruiter</Label>
                  </Radio.Content>
                </Radio>
              </RadioGroup>
            </div>
          </div>

          {/* FOOTER SECTION - Flex Direction updates for Mobile */}
          <div className="border-t border-white/10 px-5 py-5 sm:px-8 bg-[#161619]/40 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0 mt-auto">
            <p className="text-sm text-zinc-400 text-center sm:text-left">
              Already have an account?{" "}
              <Link
                href={`${redirectTo === "/" ? `/signin` : `/signin?redirect=${redirectTo}`}`}
                className="text-white hover:underline font-medium transition-all"
              >
                Sign In
              </Link>
            </p>

            <div className="flex items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">
              <Button
                type="reset"
                variant="light"
                className="text-zinc-400 hover:text-white hover:bg-white/5 font-medium px-4 h-10 rounded-xl transition-all flex-1 sm:flex-initial"
              >
                Reset
              </Button>

              <Button
                type="submit"
                isLoading={loading}
                className="bg-white text-black hover:bg-zinc-200 font-semibold px-5 h-10 rounded-xl shadow-lg flex items-center justify-center gap-1.5 transition-all flex-1 sm:flex-initial"
              >
                {!loading && <Check width={16} height={16} strokeWidth={2.5} />}
                Register Account
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
