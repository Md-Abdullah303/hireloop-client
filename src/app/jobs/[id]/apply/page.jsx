import { getJobByID } from "@/lib/api/jobs";
import { getUserSessionInServer } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";
import ApplyJobForm from "./ApplyJobForm";

const ApplyJobPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSessionInServer();

  if (!user) {
    redirect(`/signin?redirect=/jobs/${id}/apply`);
  }

  if (user.role !== "seeker") {
    return (
      <div className="mt-20 md:mt-30 text-center text-red-500 py-20 text-2xl font-bold">
        Please continue with a seeker account. This page is only for job
        seekers.
      </div>
    );
  }

  const applyingJob = await getJobByID(id);

  if (!applyingJob) {
    return <div className="mt-20 text-center">Job not found.</div>;
  }

  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Job Info Header - (Animated by GSAP from the Client Component) */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 shadow-sm border border-zinc-200 dark:border-zinc-800 mb-8 job-header-anim">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-700">
              {applyingJob.companyLogo ? (
                <img
                  src={applyingJob.companyLogo}
                  alt={applyingJob.companyName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xl font-bold text-zinc-400">
                  {applyingJob.companyName?.[0]}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white mb-1">
                Apply for {applyingJob.jobTitle}
              </h1>
              <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-medium">
                {applyingJob.companyName} • {applyingJob.jobType} •{" "}
                {applyingJob.isRemote ? "Remote" : "On-site"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2.5 rounded-lg border border-blue-100 dark:border-blue-900/30">
              <span className="block text-blue-600 dark:text-blue-400 mb-0.5">
                Salary Range
              </span>
              <span className="font-semibold text-zinc-900 dark:text-white">
                {applyingJob.salaryMin} - {applyingJob.salaryMax}{" "}
                {applyingJob.currency}
              </span>
            </div>
            <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700">
              <span className="block text-zinc-500 mb-0.5">Deadline</span>
              <span className="font-semibold text-zinc-900 dark:text-white">
                {new Date(applyingJob.applicationDeadline).toLocaleDateString()}
              </span>
            </div>
            <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700">
              <span className="block text-zinc-500 mb-0.5">Category</span>
              <span className="font-semibold text-zinc-900 dark:text-white capitalize">
                {applyingJob.jobCategory}
              </span>
            </div>
          </div>
        </div>

        {/* The Application Form */}
        <ApplyJobForm applyingJob={applyingJob} />
      </div>
    </div>
  );
};

export default ApplyJobPage;
