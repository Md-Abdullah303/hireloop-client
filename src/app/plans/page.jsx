import HomaPageHeading from "@/components/HomePage/HomaPageHeading";
import { SubscriptionPlan } from "@/components/HomePage/SubscriptionPlan";
import React from "react";

const PlansPage = () => {
  const headingData = {
    top: "PRICING",
    p1: "Pay for the leverage,",
    p2: "not the listings",
  };

  return (
    <div className="bg-black pt-20 md:pt-30">
      <div className="bg-black pt-20">
        <div className="pricing-animate space-y-7 w-[90%] md:w-[70%] mx-auto">
          <HomaPageHeading data={headingData} />

          <div className="pricing-animate">
            <SubscriptionPlan />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansPage;
