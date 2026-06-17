"use client";

import React, { useState, useCallback } from "react";
import JobCard from "./JobCard";
import JobFilterBar from "./JobFilterBar";

export default function FilteredJobsContainer({ jobs, filter }) {
  return (
    <div className="space-y-8">
      {/* Search and Filter Bar Component */}
      <JobFilterBar jobs={jobs} filter={filter} />
      <small>Jobs count : {jobs.length}</small>

      {/* Grid for displaying jobs */}
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
          {jobs.map((job) => (
            // আপনার ডেটাবেসের ফরম্যাট অনুযায়ী job._id.$oid ব্যবহার করা হলো
            <JobCard key={job._id} job={job} />
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
