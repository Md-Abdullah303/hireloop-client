import React from "react";
import { getAllJob } from "@/lib/api/jobs";
import FilteredJobsContainer from "@/components/UI/card/FilteredJobsContainer";

const JobsPage = async ({ searchParams }) => {
  const filter = await searchParams;
  const filterObj = {
    ...filter,
    isRemote: filter.isRemote === "true" ? true : false,
  };

  const querySearch = new URLSearchParams(filter);
  const queryString = querySearch.toString();
  // console.log("wanted ", queryString);

  // Fetching data on the server safely
  const { jobs, total } = (await getAllJob(queryString)) || [];

  return (
    <div className="w-[90%] max-w-7xl mx-auto">
      <div className="mt-20 md:mt-30 space-y-6 py-10">
        <div className="space-y-2">
          <h1 className="font-bold text-3xl tracking-tight">
            Explore Opportunities
          </h1>
          <p className="text-muted text-sm">
            Find the perfect position matching your skill set.
          </p>
        </div>

        {/* Client side container handles interactive searching & filtering */}
        <FilteredJobsContainer total={total} filter={filterObj} jobs={jobs} />
      </div>
    </div>
  );
};

export default JobsPage;
