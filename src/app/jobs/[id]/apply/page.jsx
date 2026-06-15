import { getJobByID } from "@/lib/api/jobs";
import { getUserSessionInServer } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";
import ApplyJobForm from "./ApplyJobForm";
import Image from "next/image";
import { getApplicationBySeekerId } from "@/lib/api/applications";
import Link from "next/link";
import { getPlanById } from "@/lib/api/plans";

const ApplyJobPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSessionInServer();

  if (!user) {
    redirect(`/signin?redirect=/jobs/${id}/apply`);
  }

  if (user.role !== "seeker") {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="max-w-md w-full text-center p-8 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-2xl">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600 dark:text-red-400 font-bold text-xl">
            !
          </div>
          <h2 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">
            Access Denied
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            Please continue with a seeker account. This page is only accessible
            for job seekers.
          </p>
        </div>
      </div>
    );
  }

  const applyingJob = await getJobByID(id);

  if (!applyingJob) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-zinc-500 dark:text-zinc-400 text-lg font-medium">
            Job not found.
          </p>
          <Link
            href="/jobs"
            className="mt-4 inline-block text-sm text-blue-500 hover:underline"
          >
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  const plan = (await getPlanById(user.plan)) || "seeker-free";
  // console.log(plan1);

  // const plan = {
  //   name: "Free",
  //   maxApplicationsPerMonth: 3,
  // };
  const seekerApplicant = await getApplicationBySeekerId(user.id);
  const currentApplicationsCount = seekerApplicant?.length || 0;
  const hasRemainingApplications =
    currentApplicationsCount < plan.maxApplicationsPerMonth;

  // Calculate usage percentage for the visual progress bar
  const usagePercentage = Math.min(
    (currentApplicationsCount / plan.maxApplicationsPerMonth) * 100,
    100,
  );

  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-20 transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-4">
        {/* Usage Tracker Banner */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800/80 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded">
                  {plan.name} Plan
                </span>
              </div>
              <h2 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Monthly Usage:{" "}
                <span className="font-bold text-zinc-900 dark:text-white">
                  {currentApplicationsCount}
                </span>{" "}
                out of{" "}
                <span className="font-bold text-zinc-900 dark:text-white">
                  {plan.maxApplicationsPerMonth}
                </span>{" "}
                applications this month
              </h2>
            </div>

            {!hasRemainingApplications && (
              <Link
                href="/plans"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-xl shadow-sm transition-colors shrink-0"
              >
                Upgrade Plan
              </Link>
            )}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full mt-4 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ease-out rounded-full ${
                usagePercentage >= 100 ? "bg-amber-500" : "bg-blue-500"
              }`}
              style={{ width: `${usagePercentage}%` }}
            />
          </div>

          {hasRemainingApplications && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-3">
              Need more submissions?{" "}
              <Link
                href="/plans"
                className="text-blue-500 hover:text-blue-600 font-medium hover:underline"
              >
                Explore our premium plans
              </Link>
            </p>
          )}
        </div>

        {/* Dynamic Content Body */}
        {hasRemainingApplications ? (
          <>
            {/* Job Info Header */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 shadow-sm border border-zinc-200 dark:border-zinc-800/80 mb-6 job-header-anim">
              <div className="flex items-start sm:items-center gap-5 mb-6">
                <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-700">
                  {applyingJob.companyLogo ? (
                    <Image
                      width={600}
                      height={500}
                      src={applyingJob.companyLogo}
                      alt={applyingJob.companyName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xl font-bold text-zinc-400 uppercase">
                      {applyingJob.companyName?.[0]}
                    </span>
                  )}
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white mb-1.5 tracking-tight">
                    Apply for {applyingJob.jobTitle}
                  </h1>
                  <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-medium flex flex-wrap items-center gap-1.5">
                    <span>{applyingJob.companyName}</span>
                    <span className="text-zinc-300 dark:text-zinc-700">•</span>
                    <span>{applyingJob.jobType}</span>
                    <span className="text-zinc-300 dark:text-zinc-700">•</span>
                    <span className="px-2 py-0.5 rounded text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                      {applyingJob.isRemote ? "Remote" : "On-site"}
                    </span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div className="bg-blue-50/50 dark:bg-blue-950/20 px-4 py-3 rounded-xl border border-blue-100/60 dark:border-blue-900/30">
                  <span className="block text-xs font-medium text-blue-600 dark:text-blue-400 mb-0.5">
                    Salary Range
                  </span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {applyingJob.salaryMin} - {applyingJob.salaryMax}{" "}
                    {applyingJob.currency}
                  </span>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-900/50 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800/60">
                  <span className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-0.5">
                    Deadline
                  </span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {new Date(
                      applyingJob.applicationDeadline,
                    ).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-900/50 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800/60">
                  <span className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-0.5">
                    Category
                  </span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 capitalize truncate block">
                    {applyingJob.jobCategory}
                  </span>
                </div>
              </div>
            </div>

            {/* The Application Form Wrapper */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 shadow-sm border border-zinc-200 dark:border-zinc-800/80">
              <ApplyJobForm applyingJob={applyingJob} user={user} />
            </div>
          </>
        ) : (
          /* Locked State View */
          <div className="bg-amber-50/50 dark:bg-amber-950/10 rounded-2xl p-8 border border-amber-200/60 dark:border-amber-900/30 text-center">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
              Application Limit Reached
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto mb-6">
              You have used all {plan.maxApplicationsPerMonth} free job
              applications allocated for this month. Upgrade your account plan
              to submit unlimited proposals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/plans"
                className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-sm"
              >
                View Pricing Plans
              </Link>
              <Link
                href="/jobs"
                className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700/80 border border-zinc-200 dark:border-zinc-700 rounded-xl transition-all"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyJobPage;
