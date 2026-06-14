import { getJobByID } from "@/lib/api/jobs";
import React from "react";
import JobDetailsClient from "./JobDetailsClient";
import { getUserSessionInServer } from "@/lib/core/session";

const JobDetailsPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSessionInServer();
  const job = await getJobByID(id);
  console.log(user, "user Seesion");
  if (!job) {
    return (
      <div className="mt-20 md:mt-30 text-center text-zinc-500">
        Job not found
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* UI এবং Animation এর দায়িত্ব Client Component এর */}
      <JobDetailsClient job={job} jobId={id} user={user} />
    </div>
  );
};

export default JobDetailsPage;
