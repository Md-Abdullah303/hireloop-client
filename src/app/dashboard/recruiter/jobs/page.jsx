import { ShowJobsInTable } from "@/components/UI/ShowJobsInTable";
import { getCompanyJob } from "@/lib/api/jobs";
import React from "react";

const RecruiterJobsPage = async () => {
  const companyId = "companyId_123";
  const companyJobs = await getCompanyJob(companyId);
  // console.log(companyJobs, "Company Jobs");

  return (
    <div className="p-7 space-y-6">
      <div className="space-y-2">
        <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold">
          Manage All Jobs
        </h1>
        <p className="text-gray-400">
          View, Update and manage your current job posting
        </p>
      </div>
      {/* job table */}
      <ShowJobsInTable companyJobs={companyJobs} />
    </div>
  );
};

export default RecruiterJobsPage;
