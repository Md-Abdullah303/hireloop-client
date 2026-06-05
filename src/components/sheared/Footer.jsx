import Image from "next/image";
import Link from "next/link";
import logo from "@/assests/images/logo.png";

import { LogoFacebook, LogoLinkedin, LogoGithub } from "@gravity-ui/icons";

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.8fr_1fr_1fr_1fr]">
          {/* Left */}
          <div>
            <Link href="/">
              <Image
                src={logo}
                alt="HireLoop Logo"
                width={170}
                priority
                className="object-contain"
              />
            </Link>

            <p className="mt-8 max-w-[280px] text-sm leading-8 text-zinc-500">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-8 text-sm font-medium text-indigo-400">
              Product
            </h3>

            <ul className="space-y-5">
              <li>
                <Link
                  href="/jobs"
                  className="text-sm text-zinc-500 transition hover:text-white"
                >
                  Job discovery
                </Link>
              </li>

              <li>
                <Link
                  href="/worker-ai"
                  className="text-sm text-zinc-500 transition hover:text-white"
                >
                  Worker AI
                </Link>
              </li>

              <li>
                <Link
                  href="/companies"
                  className="text-sm text-zinc-500 transition hover:text-white"
                >
                  Companies
                </Link>
              </li>

              <li>
                <Link
                  href="/salary-data"
                  className="text-sm text-zinc-500 transition hover:text-white"
                >
                  Salary data
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-8 text-sm font-medium text-indigo-400">
              Navigations
            </h3>

            <ul className="space-y-5">
              <li>
                <Link
                  href="/help-center"
                  className="text-sm text-zinc-500 transition hover:text-white"
                >
                  Help center
                </Link>
              </li>

              <li>
                <Link
                  href="/career-library"
                  className="text-sm text-zinc-500 transition hover:text-white"
                >
                  Career library
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-sm text-zinc-500 transition hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-8 text-sm font-medium text-indigo-400">
              Resources
            </h3>

            <ul className="space-y-5">
              <li>
                <Link
                  href="/brand-guideline"
                  className="text-sm text-zinc-500 transition hover:text-white"
                >
                  Brand Guideline
                </Link>
              </li>

              <li>
                <Link
                  href="/newsroom"
                  className="text-sm text-zinc-500 transition hover:text-white"
                >
                  Newsroom
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          {/* Socials */}
          <div className="flex items-center gap-3">
            <Link
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-md bg-[#111111] text-zinc-400 transition hover:text-white"
            >
              <LogoFacebook className="h-5 w-5" />
            </Link>

            <Link
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-md bg-[#111111] text-zinc-400 transition hover:text-white"
            >
              <LogoGithub className="h-5 w-5" />
            </Link>

            <Link
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-md bg-[#111111] text-zinc-400 transition hover:text-white"
            >
              <LogoLinkedin className="h-5 w-5" />
            </Link>
          </div>

          {/* Copyright */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-600">
            <span>Copyright {new Date().getFullYear()} — HireLoop</span>

            <span>-</span>

            <Link href="/terms" className="transition hover:text-white">
              Terms & Policy
            </Link>

            <span>-</span>

            <Link href="/privacy" className="transition hover:text-white">
              Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
