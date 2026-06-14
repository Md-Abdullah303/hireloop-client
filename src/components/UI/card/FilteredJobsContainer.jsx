"use client";

import React, { useState, useCallback } from "react";
import JobCard from "./JobCard";
import JobFilterBar from "./JobFilterBar";

export default function FilteredJobsContainer({ initialJobs }) {
  const [filteredJobs, setFilteredJobs] = useState(initialJobs);

  const handleFilterChange = useCallback(
    (filters) => {
      const { search, jobType, workSetting, minSalary } = filters;

      const updatedList = initialJobs.filter((job) => {
        // ১. টেক্সট সার্চ (সার্চের পরিধি বাড়ানো হয়েছে)
        // টাইটেল, কোম্পানি, ক্যাটাগরি, শহর বা দেশ—যেকোনো এক জায়গায় মিললেই জবটি শো করবে।
        const matchesSearch =
          !search ||
          job.jobTitle?.toLowerCase().includes(search) ||
          job.companyName?.toLowerCase().includes(search) ||
          job.jobCategory?.toLowerCase().includes(search) ||
          job.city?.toLowerCase().includes(search) ||
          job.country?.toLowerCase().includes(search);

        // ২. জব টাইপ (Part-time, Full-time, Contract)
        const matchesType = jobType === "all" || job.jobType === jobType;

        // ৩. রিমোট নাকি অনসাইট (আপনার ডেটায় isRemote: false দেওয়া আছে)
        const matchesSetting =
          workSetting === "all" ||
          (workSetting === "remote" && job.isRemote === true) ||
          (workSetting === "onsite" && job.isRemote === false);

        // ৪. স্যালারি ম্যাচিং (স্ট্রিং থেকে নাম্বারে কনভার্ট করে চেক করা হচ্ছে)
        const maxSalaryOffered = parseFloat(job.salaryMax) || 0;
        const matchesSalary = !minSalary || maxSalaryOffered >= minSalary;

        // সবগুলো শর্ত পূরণ হলেই চাকরিটি লিস্টে থাকবে
        return matchesSearch && matchesType && matchesSetting && matchesSalary;
      });

      setFilteredJobs(updatedList);
    },
    [initialJobs],
  );

  return (
    <div className="space-y-8">
      {/* Search and Filter Bar Component */}
      <JobFilterBar onFilterChange={handleFilterChange} />

      {/* Grid for displaying jobs */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
          {filteredJobs.map((job) => (
            // আপনার ডেটাবেসের ফরম্যাট অনুযায়ী job._id.$oid ব্যবহার করা হলো
            <JobCard key={job._id?.$oid || job._id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
          <p className="text-zinc-500 font-medium">
            No jobs found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
