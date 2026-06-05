"use client";

import { useState } from "react";
import { Link, Button } from "@heroui/react";
import logo from "@/assests/images/logo.png";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    {
      label: "Browse Jobs",
      href: "/jobs",
    },
    {
      label: "Company",
      href: "/companies",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
  ];

  return (
    <div className="fixed top-0 left-0 z-50 w-full px-4 py-5">
      <nav className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-[#222222] backdrop-blur-xl">
        <div className="flex h-20 items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {/* <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Hire<span className="text-primary">Loop</span>
            </h1> */}
            <Image
              src={logo}
              alt="website logo"
              width={200}
              height={100}
              className="lg:w-38 md:w-30 sm:20  "
            />
          </Link>

          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-12">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-zinc-300 transition-all duration-300 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-5">
              <div className="h-6 w-px bg-white/10" />

              <Link
                href="/login"
                className="text-sm font-medium text-indigo-400 hover:text-indigo-300"
              >
                Sign In
              </Link>

              <Button className={"bg-indigo-400"}>
                <Link
                  href="/register"
                  className="px-2 py-4 font-medium shadow-lg"
                >
                  Get Started
                </Link>
              </Button>
            </div>

            {/* Mobile Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white"
            >
              {isMenuOpen ? (
                <svg
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6L18 18"
                  />
                </svg>
              ) : (
                <svg
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6H20M4 12H20M4 18H20"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 lg:hidden ${
            isMenuOpen ? "max-h-[400px]" : "max-h-0"
          }`}
        >
          <div className="border-t border-white/10 px-6 py-6">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="py-2 text-zinc-300 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-4 flex flex-col gap-3">
                <Link href="/login" variant="bordered" fullWidth>
                  Sign In
                </Link>

                <Button color="primary" fullWidth>
                  <Link href="/register">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
