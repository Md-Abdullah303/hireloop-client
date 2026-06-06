import React from "react";
import HomaPageHeading from "./HomaPageHeading";
import {
  Bell,
  ChartLineArrowUp,
  Globe,
  ListCheck,
  Magnifier,
  PaperPlane,
  Rocket,
  Star,
} from "@gravity-ui/icons";

const SomeThingYouNeeded = () => {
  const headingData = {
    top: "FEATURES JOB",
    p1: "Everything you need",
    p2: "to succeed",
  };

  const cards = [
    {
      name: "Smart Search",
      description: "Find your ideal job with advanced filters",
      icon: Magnifier,
    },
    {
      name: "Salary Insights",
      description: "Get real salary data to negotiate confidently",
      icon: ChartLineArrowUp,
    },

    {
      name: "Remote Jobs",
      description: "Discover remote opportunities from companies worldwide",
      icon: Globe,
    },
    {
      name: "Instant Applications",
      description: "Apply to multiple jobs quickly with a streamlined process",
      icon: PaperPlane,
    },
    {
      name: "Company Reviews",
      description: "Learn about company culture and employee experiences",
      icon: Star,
    },
    {
      name: "Application Tracking",
      description: "Track your job applications and interview progress",
      icon: ListCheck,
    },
    {
      name: "Job Alerts",
      description: "Receive notifications when matching jobs are posted",
      icon: Bell,
    },
    {
      name: "Career Growth",
      description: "Access resources and opportunities to advance your career",
      icon: Rocket,
    },
  ];

  return (
    <div className="py-20 w-[90%] mx-auto space-y-10">
      <HomaPageHeading data={headingData} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {cards.map((card, ind) => (
          <div className="flex items-center gap-3" key={ind}>
            <div className="border p-4 rounded-2xl bg-linear-to-b from-black to-white/25">
              <card.icon className="w-7 h-7 text-purple-400" />
            </div>
            <div className="space-y-1">
              <h1 className="font-bold">{card.name}</h1>
              <p className="text-gray-400">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SomeThingYouNeeded;
