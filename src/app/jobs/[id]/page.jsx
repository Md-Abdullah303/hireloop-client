import { getJobByID } from "@/lib/api/jobs";
import React from "react";

const JobDetailsPage = async ({ params }) => {
  const { id } = await params;
  const job = await getJobByID(id);
  console.log(job);
  return (
    <div className="mt-20  md:mt-30">
      <h1>Job Details Page {id}</h1>
    </div>
  );
};

export default JobDetailsPage;
