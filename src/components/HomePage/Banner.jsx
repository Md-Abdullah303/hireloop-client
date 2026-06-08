"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import { Button, Input, Card } from "@heroui/react";
import { Magnifier, Briefcase, Factory, Person, Star } from "@gravity-ui/icons";

export default function Banner() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".hero-item", {
        y: 20,
        opacity: 0,
        filter: "blur(8px)",
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
      }).from(
        ".stat-item",
        {
          y: 30,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: "back.out(1.4)",
          stagger: 0.12,
        },
        "-=0.5",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Briefcase, value: "50K", label: "Active Jobs" },
    { icon: Factory, value: "12K", label: "Companies" },
    { icon: Person, value: "2M", label: "Job Seekers" },
    { icon: Star, value: "97%", label: "Satisfaction Rate" },
  ];

  const trending = ["Product Designer", "AI Engineering", "DevOps Engineer"];

  return (
    <section
      ref={sectionRef}
      className="
        relative overflow-hidden bg-black
        lg:pt-70 md:pt-65 sm:pt-60 pt-55 pb-20
        bg-[url('@/assests/images/globe.png')]
        bg-no-repeat bg-center bg-cover
      "
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* ================= HERO ================= */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6">
        {/* Badge */}
        <div className="hero-item flex justify-center">
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-300 backdrop-blur-md">
            💼 50,000+ NEW JOBS THIS MONTH
          </div>
        </div>

        {/* Heading */}
        <div className="hero-item mx-auto mt-10 max-w-5xl text-center">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight">
            Find Your Dream Job Today
          </h1>

          <p className="mt-6 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
            HireLoop connects top talent with world-class companies. Browse
            thousands of curated opportunities and land your next role faster.
          </p>
        </div>

        {/* Search */}
        <div className="hero-item mx-auto mt-10 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-3 p-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
            <Input
              placeholder="Job title, skill or company"
              variant="bordered"
              className="w-full"
            />

            <Input
              placeholder="Location or Remote"
              variant="bordered"
              className="w-full"
            />

            <Button color="secondary" size="lg" className="w-full md:w-auto">
              <Magnifier />
            </Button>
          </div>
        </div>

        {/* Trending */}
        <div className="hero-item mt-5 flex flex-wrap justify-center gap-3">
          <span className="text-xs text-zinc-500">Trending:</span>

          {trending.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-zinc-300"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ================= TEXT + STATS ================= */}
      <div className="relative z-20 mt-50 sm:mt-70 md:mt-90 lg:mt-120 flex flex-col items-center gap-10 px-4 sm:px-6 text-center">
        {/* Text */}
        <div className="hero-item">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-white">
            Assisting over 15,000 job seekers
          </h2>

          <p className="mt-3 text-lg sm:text-2xl md:text-3xl text-zinc-300">
            find their dream positions.
          </p>
        </div>

        {/* Stats */}
        <div className="w-full max-w-7xl">
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item, i) => {
              const Icon = item.icon;

              return (
                <Card
                  key={i}
                  className="stat-item border border-white/10 bg-black/60 backdrop-blur-2xl"
                >
                  <div className="p-7 text-center">
                    <Icon className="mb-6 mx-auto text-white" />

                    <h3 className="text-4xl font-bold text-white">
                      {item.value}
                    </h3>

                    <p className="mt-2 text-zinc-400">{item.label}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
