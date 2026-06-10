"use client";
import { useSession } from "@/lib/auth-client";
import { Skeleton, Spinner } from "@heroui/react";
import React from "react";
import { File, Persons, ThunderboltFill, CircleCheck } from "@gravity-ui/icons";
import StatCard from "@/components/dashboard/DashboardStatsCard";
import { RecruiterHomapageTable } from "@/components/dashboard/recruiterSideComponet/RecruiterHomePageTable";

const RecruiterDashboardHomePage = () => {
  const { data: session, isPending } = useSession();
  const userData = session?.user;

  if (isPending) {
    return (
      <div className="p-20 space-y-10">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-36 rounded-lg" />
            <Skeleton className="h-3 w-24 rounded-lg" />
          </div>
        </div>
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
          <Skeleton className="h-44 rounded-xl" />
          <Skeleton className="h-44 rounded-xl" />
          <Skeleton className="h-44 rounded-xl" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <div className="shadow-panel w-[250px] space-y-5 rounded-lg bg-transparent p-4">
            <Skeleton className="h-32 rounded-lg" />
            <div className="space-y-3">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
              <Skeleton className="h-3 w-2/5 rounded-lg" />
            </div>
          </div>
          <div className="shadow-panel w-[250px] space-y-5 rounded-lg bg-transparent p-4">
            <Skeleton className="h-32 rounded-lg" />
            <div className="space-y-3">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
              <Skeleton className="h-3 w-2/5 rounded-lg" />
            </div>
          </div>
          <div className="shadow-panel w-[250px] space-y-5 rounded-lg bg-transparent p-4">
            <Skeleton className="h-32 rounded-lg" />
            <div className="space-y-3">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
              <Skeleton className="h-3 w-2/5 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const statsData = [
    {
      id: "total-posts",
      title: "Total Job Posts",
      value: "48",
      icon: File,
    },
    {
      id: "total-applicants",
      title: "Total Applicants",
      value: "1,284",
      icon: Persons,
    },
    {
      id: "active-jobs",
      title: "Active Jobs",
      value: "18",
      icon: ThunderboltFill,
    },
    {
      id: "jobs-closed",
      title: "Jobs Closed",
      value: "32",
      icon: CircleCheck,
    },
  ];

  console.log(userData);
  return (
    <div className="px-15 py-10 space-y-10">
      <h1 className="text-3xl font-bold">Welcome back, {userData?.name}</h1>
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {statsData.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* recent application */}
      <div className="space-y-3.5">
        <h1 className="text-3xl font-bold">Recent Applications</h1>
        <RecruiterHomapageTable />
      </div>
    </div>
  );
};

export default RecruiterDashboardHomePage;
