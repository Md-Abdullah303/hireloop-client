"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HomaPageHeading from "./HomaPageHeading";
import { DeafultPostCard } from "../UI/DeafultPostCard";
import { Button } from "@heroui/react";

gsap.registerPlugin(ScrollTrigger);

const TopPostedJobs = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".jobs-animate", {
        y: 40,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // section viewport এর 80% এ আসলে start হবে
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingData = {
    top: "Smart job discovery",
    p1: "The roles you'd never",
    p2: "find by searching",
  };

  const jobs = [
    {
      role: "MERN Stack Developer",
      description:
        "Looking for a mid-level MERN developer to build and maintain scalable web applications. Must be proficient in React, Node.js, and MongoDB.",
      location: "Austin, TX",
      type: "remote",
      salary: 115000,
      per: "year",
    },
    {
      role: "Frontend Engineer",
      description:
        "Join our design-focused team to build beautiful, responsive user interfaces using Next.js, Tailwind CSS, and TypeScript.",
      location: "San Francisco, CA",
      type: "hybrid",
      salary: 90,
      per: "hour",
    },
    {
      role: "Full Stack Developer (MERN)",
      description:
        "Seeking a senior developer to lead the migration of a legacy platform to a modern MERN stack architecture.",
      location: "New York, NY",
      type: "onsite",
      salary: 140000,
      per: "year",
    },
    {
      role: "UI/UX Frontend Developer",
      description:
        "Contract role for a frontend specialist to implement complex animations and pixel-perfect layouts using React and Framer Motion.",
      location: "Remote (US/Canada)",
      type: "remote",
      salary: 3500,
      per: "week",
    },
    {
      role: "Junior Backend Engineer",
      description:
        "Great opportunity for a junior Node.js/Express developer to assist in building robust RESTful APIs and managing database schemas.",
      location: "Chicago, IL",
      type: "hybrid",
      salary: 6500,
      per: "month",
    },
    {
      role: "Lead MERN Instructor",
      description:
        "Part-time role to mentor and teach aspiring developers the fundamentals of JavaScript, React, Node, and database management.",
      location: "Los Angeles, CA",
      type: "onsite",
      salary: 500,
      per: "day",
    },
  ];

  return (
    <div ref={sectionRef} className="bg-black pt-20 pb-15">
      <div className="jobs-animate mx-auto w-[90%] md:w-[80%]">
        <HomaPageHeading data={headingData} />

        <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-8">
          {jobs.map((job, ind) => (
            <div key={ind} className="jobs-animate">
              <DeafultPostCard job={job} />
            </div>
          ))}
        </div>
      </div>

      <div className="jobs-animate mx-auto w-fit mt-10">
        <Button className="rounded-lg bg-white text-black">
          View all job open
        </Button>
      </div>
    </div>
  );
};

export default TopPostedJobs;
