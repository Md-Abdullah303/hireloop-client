"use client";
import React from "react";
import { Button } from "@heroui/react";

const NextroleSection = () => {
  return (
    <div className="bg-black py-16 px-4 sm:px-6 md:py-24 lg:py-32 flex items-center justify-center overflow-hidden w-full antialiased selection:bg-neutral-800">
      {/* Container Frame: Exact width & height control overlay setup 
        Image er moto semi-circle radial effect container layer logic
      */}
      <div className="w-full max-w-6xl mx-auto min-h-[340px] md:min-h-[440px] bg-[url('@/assests/images/cta-bg.png')] bg-no-repeat bg-[center_top] bg-cover flex flex-col items-center justify-center text-center px-4 relative rounded-[2rem]">
        {/* Subtle dark-glow gradient layer overlay inside background mesh wireframe */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/90 rounded-[2rem] pointer-events-none" />

        {/* Content Box */}
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          {/* Main Title Banner Heading */}
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-medium tracking-tight leading-[1.15] mb-4 max-w-xl md:max-w-2xl font-sans">
            Your next role is <br className="hidden sm:inline" /> already
            looking for you
          </h1>

          {/* Subtitle description line spacing adjustment */}
          <p className="text-neutral-400 text-xs sm:text-sm md:text-base font-normal tracking-wide max-w-md md:max-w-xl mb-8 leading-relaxed opacity-90">
            Build a profile in three minutes. The matches start arriving
            tomorrow morning.
          </p>

          {/* Button Layout - Responsive Breakpoint Trigger */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-4 sm:px-0">
            {/* White Active Controller Action Button */}
            <Button className="bg-white text-black font-semibold text-sm h-11 px-6 rounded-xl w-full sm:w-auto shadow-sm hover:bg-neutral-200 transition-all duration-200 active:scale-98">
              Create a free account
            </Button>

            {/* Custom Transparent Ghost / Dark Border Button to match mock screen */}
            <Button
              variant="bordered"
              className="bg-[#0c0c0e]/40 text-neutral-300 border border-neutral-800/80 font-medium text-sm h-11 px-6 rounded-xl w-full sm:w-auto backdrop-blur-md hover:bg-neutral-900/80 hover:text-white hover:border-neutral-700 transition-all duration-200 active:scale-98"
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
