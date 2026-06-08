"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@heroui/react";

gsap.registerPlugin(ScrollTrigger);

const NextroleSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.from(".cta-box", {
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          ".cta-title",
          {
            y: 40,
            opacity: 0,
            filter: "blur(10px)",
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.6",
        )
        .from(
          ".cta-text",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.4",
        )
        .from(
          ".cta-btn",
          {
            y: 20,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="bg-black pt-16 px-4 sm:px-6 md:pt-24 lg:pt-32 flex items-center justify-center overflow-hidden w-full antialiased"
    >
      {/* Container */}
      <div className="cta-box w-full max-w-6xl mx-auto min-h-[340px] md:min-h-[440px] bg-[url('@/assests/images/cta-bg.png')] bg-no-repeat bg-[center_top] bg-cover flex flex-col items-center justify-center text-center px-4 relative rounded-[2rem]">
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/90 rounded-[2rem] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <h1 className="cta-title text-white text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-medium tracking-tight leading-[1.15] mb-4 max-w-xl md:max-w-2xl">
            Your next role is <br className="hidden sm:inline" /> already
            looking for you
          </h1>

          <p className="cta-text text-neutral-400 text-xs sm:text-sm md:text-base font-normal tracking-wide max-w-md md:max-w-xl mb-8 leading-relaxed opacity-90">
            Build a profile in three minutes. The matches start arriving
            tomorrow morning.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-4 sm:px-0">
            <Button className="cta-btn bg-white text-black font-semibold text-sm h-11 px-6 rounded-xl w-full sm:w-auto shadow-sm hover:bg-neutral-200 transition-all duration-200">
              Create a free account
            </Button>

            <Button
              variant="bordered"
              className="cta-btn bg-[#0c0c0e]/40 text-neutral-300 border border-neutral-800/80 font-medium text-sm h-11 px-6 rounded-xl w-full sm:w-auto backdrop-blur-md hover:bg-neutral-900/80 hover:text-white hover:border-neutral-700 transition-all duration-200"
            >
              View pricing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextroleSection;
