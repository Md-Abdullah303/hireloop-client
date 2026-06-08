"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HomaPageHeading from "./HomaPageHeading";
import { SubscriptionPlan } from "./SubscriptionPlan";

gsap.registerPlugin(ScrollTrigger);

const SubscriptionPlanSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pricing-animate", {
        y: 40,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1,
        stagger: 0.15,
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
    top: "PRICING",
    p1: "Pay for the leverage,",
    p2: "not the listings",
  };

  return (
    <div ref={sectionRef} className="bg-black pt-20">
      <div className="pricing-animate space-y-7 w-[90%] md:w-[70%] mx-auto">
        <HomaPageHeading data={headingData} />

        <div className="pricing-animate">
          <SubscriptionPlan />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlanSection;
