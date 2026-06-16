import { SeekerApplicationTable } from "@/components/UI/SeekerApplicationTable";
import { getApplicationBySeekerId } from "@/lib/api/applications";
import { getUserSessionInServer } from "@/lib/core/session";
import React from "react";

const SeekerApplicationPage = async () => {
  const user = await getUserSessionInServer();
  const job = await getApplicationBySeekerId(user.id);

  return (
    <div className="min-h-screen  text-[#ededed] py-12 px-6 sm:px-12 lg:px-16 space-y-8 font-sans">
      {/* Header Section */}
      <div className="border-b border-[#222] pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
            Your Applications
            <span className="text-sm font-medium bg-[#1a1a1a] text-gray-400 border border-[#333] px-3 py-1 rounded-full shadow-inner">
              {job.length} {job.length === 1 ? "Job" : "Jobs"} Total
            </span>
          </h1>
          <p className="text-gray-400 text-sm mt-2 max-w-xl">
            Track, monitor, and manage the status of your submitted job
            applications all in one clean space.
          </p>
        </div>
      </div>

      {/* Table Section Wrap */}
      <div className="  border-[#222] rounded-xl  shadow-2xl backdrop-blur-md">
        {job.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-4xl">💼</span>
            <p className="text-gray-400 mt-4 text-base font-medium">
              {`You haven't applied to any jobs yet.`}
            </p>
          </div>
        ) : (
          <SeekerApplicationTable appliedJobs={job} />
        )}
      </div>
    </div>
  );
};

export default SeekerApplicationPage;
