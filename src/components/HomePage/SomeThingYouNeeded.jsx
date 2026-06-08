"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

gsap.registerPlugin(ScrollTrigger);

const SomeThingYouNeeded = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        y: 40,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
    <div ref={sectionRef} className="py-20 w-[90%] mx-auto space-y-10">
      <HomaPageHeading data={headingData} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {cards.map((card, ind) => {
          const Icon = card.icon;

          return (
            <div className="feature-card flex items-center gap-3" key={ind}>
              <div className="border p-4 rounded-2xl bg-linear-to-b from-black to-white/25">
                <Icon className="w-7 h-7 text-purple-400" />
              </div>

              <div className="space-y-1">
                <h1 className="font-bold">{card.name}</h1>
                <p className="text-gray-400">{card.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SomeThingYouNeeded;
