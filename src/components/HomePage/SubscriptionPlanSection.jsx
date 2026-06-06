import React from "react";
import HomaPageHeading from "./HomaPageHeading";
import { SubscriptionPlan } from "./SubscriptionPlan";

const SubscriptionPlanSection = () => {
  const headingData = {
    top: "PRICING",
    p1: "Pay for the leverage,",
    p2: "not the listings",
  };

  return (
    <div className="bg-black pt-20">
      <div className="space-y-7 w-[90%] md:w-[70%] mx-auto">
        <HomaPageHeading data={headingData} />

        <SubscriptionPlan />
      </div>
    </div>
  );
};

export default SubscriptionPlanSection;
