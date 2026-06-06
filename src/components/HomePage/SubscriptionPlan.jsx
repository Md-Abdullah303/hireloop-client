"use client";
import React, { useState } from "react";
import { Card, Button } from "@heroui/react";
import {
  CrownDiamond,
  ChartLineArrowUp,
  ThunderboltFill,
  Plus,
  ArrowRight,
} from "@gravity-ui/icons";

// Data Structure
const pricingData = [
  {
    id: "starter",
    icon: <CrownDiamond className="text-fuchsia-400 size-5" />,
    title: "Starter",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    id: "growth",
    icon: <ChartLineArrowUp className="text-fuchsia-400 size-5" />,
    title: "Growth",
    monthlyPrice: 17,
    yearlyPrice: 12.75,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    id: "premium",
    icon: <ThunderboltFill className="text-fuchsia-400 size-5" />,
    title: "Premium",
    monthlyPrice: 99,
    yearlyPrice: 74.25,
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
  },
];

export function SubscriptionPlan() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="bg-black text-white p-6 sm:p-10 flex flex-col items-center gap-8 font-sans ">
      {/* --- Toggle Switch Header --- */}
      <div className="flex items-center bg-[#1c1c1e] p-1.5 rounded-full border border-neutral-800">
        <button
          onClick={() => setIsYearly(false)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            !isYearly ? "bg-white text-black font-semibold" : "text-neutral-400"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setIsYearly(true)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all ${
            isYearly ? "bg-white text-black font-semibold" : "text-neutral-400"
          }`}
        >
          Yearly
          <span className="bg-fuchsia-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
            25%
          </span>
        </button>
      </div>

      {/* --- Cards Grid Layout (Fixed Jala) --- */}
      {/* max-w layout bound controls set kora hoyeche jeno layout track bhenge na jay */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl justify-center items-stretch">
        {pricingData.map((plan) => {
          const currentPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
          const isGrowthPlan = plan.id === "growth";

          return (
            <Card
              key={plan.id}
              /* w-[360px] soriye w-full kora hoyeche jeno grid column fill up kore thake 
                 ebong card niche-upore soman unchu thake tar jonno h-full are stretch deya holo */
              className={`w-full h-full p-6 bg-[#0f0f11] text-white flex flex-col justify-between transition-all border ${
                isGrowthPlan
                  ? "border-neutral-700 ring-1 ring-neutral-700 shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                  : "border-neutral-900"
              }`}
            >
              <div>
                <Card.Header className="flex flex-col items-stretch p-0 pb-6 overflow-hidden">
                  <div className="flex justify-between items-start w-full">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-neutral-900 border border-neutral-800 rounded-lg">
                        {plan.icon}
                      </div>
                      <Card.Title className="text-xl font-semibold tracking-tight text-white m-0 p-0">
                        {plan.title}
                      </Card.Title>
                    </div>
                    <div className="flex items-baseline text-white">
                      <span className="text-3xl font-bold">
                        ${currentPrice}
                      </span>
                      <span className="text-neutral-500 text-xs ml-1">
                        /month
                      </span>
                    </div>
                  </div>
                </Card.Header>

                <p className="text-neutral-300 text-sm font-medium mb-4">
                  Start building your insights hub:
                </p>

                {/* Features List */}
                <ul className="space-y-3.5 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-neutral-400 text-sm"
                    >
                      <div className="p-1 bg-neutral-900 rounded-md border border-neutral-800 flex items-center justify-center shrink-0">
                        <Plus className="size-3.5 text-neutral-500" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Card.Footer className="p-0 mt-auto">
                <Button
                  endContent={<ArrowRight className="size-4" />}
                  className={`w-full justify-between px-5 py-6 font-medium rounded-xl transition-all ${
                    isGrowthPlan
                      ? "bg-white text-black hover:bg-neutral-200"
                      : "bg-[#27272a] text-white hover:bg-neutral-700"
                  }`}
                >
                  Choose This Plan
                </Button>
              </Card.Footer>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
