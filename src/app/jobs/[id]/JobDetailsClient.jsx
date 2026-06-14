"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

export default function JobDetailsClient({ job, jobId }) {
  const containerRef = useRef(null);

  // GSAP Animation Logic
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero সেকশনের এলিমেন্টগুলো উপর থেকে নিচে আসবে
      gsap.from(".hero-anim", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      // কার্ডগুলো নিচ থেকে উপরে আসবে
      gsap.from(".card-anim", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.3,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  if (!job) return null;

  return (
    <div ref={containerRef} className="max-w-5xl mx-auto px-4 pb-20">
      {/* 1. Hero Section (Header) */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-10 shadow-sm border border-zinc-200 dark:border-zinc-800 mb-8 hero-anim">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-700">
              {job.companyLogo ? (
                <Image
                  src={job.companyLogo}
                  alt={job.companyName}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-zinc-400">
                  {job.companyName?.[0]}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
                {job.jobTitle}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-zinc-600 dark:text-zinc-400 font-medium">
                <span className="text-blue-600 dark:text-blue-400">
                  {job.companyName}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-sm">
                  {job.jobType}
                </span>
                <span className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-sm">
                  {job.isRemote ? "Remote" : "On-site"}
                </span>
                <span className="flex items-center gap-1 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full text-sm">
                  {job.jobCategory}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-auto mt-4 md:mt-0">
            <Link
              href={`/jobs/${jobId}/apply`}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-md shadow-blue-600/20 active:scale-95"
            >
              Apply Now
            </Link>
            <p className="text-sm text-zinc-500 text-center md:text-right">
              Deadline:{" "}
              <span className="font-semibold text-zinc-800 dark:text-zinc-300">
                {new Date(job.applicationDeadline).toLocaleDateString()}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* 2. Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Responsibilities */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 shadow-sm border border-zinc-200 dark:border-zinc-800 card-anim">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
              Responsibilities
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap">
              {job.responsibilities}
            </p>
          </div>

          {/* Requirements */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 shadow-sm border border-zinc-200 dark:border-zinc-800 card-anim">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-purple-500 rounded-full"></span>
              Requirements
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap">
              {job.requirements}
            </p>
          </div>

          {/* Benefits */}
          {job.benefits && (
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 shadow-sm border border-zinc-200 dark:border-zinc-800 card-anim">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-green-500 rounded-full"></span>
                Benefits
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap">
                {job.benefits}
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Salary & Overview Widget */}
        <div className="space-y-8">
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 card-anim">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-5">
              Job Overview
            </h3>

            <div className="space-y-5">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-zinc-500">Salary Range</span>
                <span className="font-semibold text-zinc-900 dark:text-white text-lg">
                  {job.salaryMin} - {job.salaryMax}{" "}
                  <span className="text-sm font-medium text-zinc-500">
                    {job.currency}
                  </span>
                </span>
              </div>

              <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800"></div>

              <div className="flex flex-col gap-1">
                <span className="text-sm text-zinc-500">Job Type</span>
                <span className="font-medium text-zinc-900 dark:text-white">
                  {job.jobType}
                </span>
              </div>

              <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800"></div>

              <div className="flex flex-col gap-1">
                <span className="text-sm text-zinc-500">Work Setting</span>
                <span className="font-medium text-zinc-900 dark:text-white">
                  {job.isRemote ? "Remote (Work from Anywhere)" : "On-site"}
                </span>
              </div>

              <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800"></div>

              <div className="flex flex-col gap-1">
                <span className="text-sm text-zinc-500">Posted On</span>
                <span className="font-medium text-zinc-900 dark:text-white">
                  {new Date(job.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
