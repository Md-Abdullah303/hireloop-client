import HomaPageHeading from "@/components/HomePage/HomaPageHeading";
import SubscriptionPlan from "@/components/HomePage/SubscriptionPlan";
import React from "react";

const PlansPage = () => {
  return (
    <div className="bg-black pt-20 md:pt-30">
      <div className="mt-10 md:mt-15">
        <div className="pricing-animate space-y-7 w-[90%] md:w-[70%] mx-auto">
          <div className="pricing-animate">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
                Simple, Transparent Pricing
              </h1>
              <p className="text-lg text-slate-400">
                Choose the plan that fits your goals. Upgrade, downgrade, or
                cancel at any time.
              </p>
            </div>
            <SubscriptionPlan />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansPage;
