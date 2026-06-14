import React from "react";
import { ArrowRight, Briefcase, Display, Gear, Globe } from "@gravity-ui/icons"; // আপনার পছন্দমতো আইকন নিন
import Image from "next/image";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function JobCard({ job }) {
  // কারেন্সি সিম্বল ঠিক করার জন্য ছোট্ট একটা লজিক
  const getCurrencySymbol = (curr) => {
    switch (curr) {
      case "USD":
        return "$";
      case "EUR":
        return "€";
      case "GBP":
        return "£";
      case "BDT":
        return "৳";
      default:
        return curr + " ";
    }
  };

  return (
    <div className="bg-[#121212] border border-[#222224] rounded-3xl p-6 md:p-8 flex flex-col justify-between h-full text-zinc-100 max-w-xl shadow-xl transition-all hover:border-zinc-700">
      {/* কোম্পানির লোগো এবং নাম (ঐচ্ছিক, কার্ড সুন্দর দেখানোর জন্য যোগ করা হয়েছে) */}
      {job.companyLogo && (
        <div className="flex items-center gap-3 mb-4">
          <Image
            src={job.companyLogo}
            alt={job.companyName}
            width={400}
            height={300}
            className="w-8 h-8 rounded-lg object-contain bg-[#18181b] p-1 border border-[#27272a]"
          />
          <span className="text-xs text-zinc-400 font-medium">
            {job.companyName}
          </span>
        </div>
      )}

      {/* টাইটেল এবং বিবরণ */}
      <div className="space-y-3">
        <h3 className="text-2xl font-semibold text-white tracking-tight">
          {job.jobTitle}
        </h3>
        <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">
          {job.responsibilities}
        </p>
      </div>

      {/* ব্যাজ/ট্যাগস এরিয়া (লোকেশন, টাইপ, স্যালারি) */}
      <div className="flex flex-wrap gap-2 my-6">
        {/* লোকেশন বা রিমোট স্ট্যাটাস */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1c1c1e] text-zinc-300 rounded-full text-xs font-medium">
          <span className="text-purple-400 text-sm">📍</span>
          <span>
            {job.isRemote
              ? "Remote"
              : `${job.city || "Dhaka"}, ${job.country || "BD"}`}
          </span>
        </div>

        {/* জব টাইপ */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1c1c1e] text-zinc-300 rounded-full text-xs font-medium">
          <span className="text-purple-400 text-sm">💼</span>
          <span>{job.jobType}</span>
        </div>

        {/* স্যালারি রেঞ্জ */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1c1c1e] text-zinc-300 rounded-full text-xs font-medium">
          <span className="text-purple-400 text-sm">🪙</span>
          <span>
            {getCurrencySymbol(job.currency)}
            {Number(job.salaryMin).toLocaleString()} –{" "}
            {getCurrencySymbol(job.currency)}
            {Number(job.salaryMax).toLocaleString()}
          </span>
        </div>
      </div>

      {/* অ্যাকশন বাটন */}
      <Link href={`/jobs/${job._id}`}>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-white hover:text-blue-400 text-sm font-medium mt-auto group transition-colors w-fit"
        >
          Apply Now
          <ArrowRight className="size-4 transform group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </div>
  );
}
