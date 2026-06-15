"use client";

import { useState } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

export default function SubscriptionPlan() {
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Data parsed from image_f3263d.png and text
  const pricingData = {
    seekers: [
      {
        name: "Free",
        id: "seeker-free",
        price: "$0",
        period: "/forever",
        description: "Perfect for getting started and exploring open roles.",
        features: [
          "Browse & save up to 10 jobs",
          "Apply to up to 3 jobs per month",
          "Basic profile visibility",
          "Email alerts for new matches",
        ],
      },
      {
        name: "Pro",
        id: "seeker-pro",
        price: "$19",
        period: "/month",
        description: "Designed for active job hunters who want an edge.",
        features: [
          "Apply to up to 30 jobs per month",
          "Unlimited saved jobs",
          "Application tracking dashboard",
          "Salary insights & trends",
        ],
        popular: true,
      },
      {
        name: "Premium",
        id: "seeker-premium",
        price: "$39",
        period: "/month",
        description: "Maximize your hiring potential with ultimate access.",
        features: [
          "Everything in Pro",
          "Unlimited applications",
          "Profile boost to top recruiters",
          "Early access to newly posted jobs",
          "Priority customer support",
        ],
      },
    ],
    recruiters: [
      {
        name: "Free",
        id: "recruiter-free",
        price: "$0",
        period: "/forever",
        description: "Great for a company's first year of scaling up.",
        features: [
          "Up to 3 active job posts",
          "Basic applicant management",
          "Standard listing visibility",
        ],
      },
      {
        name: "Growth",
        id: "recruiter-growth",
        price: "$49",
        period: "/month",
        description: "Built for growing teams with consistent hiring needs.",
        features: [
          "Up to 10 active job posts",
          "Full applicant tracking system (ATS)",
          "Basic performance analytics",
          "Email support response within 24h",
        ],
        popular: true,
      },
      {
        name: "Enterprise",
        id: "recruiter-enterprise",
        price: "$149",
        period: "/month",
        description: "For large organizations requiring scale and branding.",
        features: [
          "Up to 50 active job posts",
          "Advanced analytics dashboard",
          "Featured job listings boost",
          "Team collaboration tools",
          "Custom employer branding",
          "Dedicated priority support",
        ],
      },
    ],
  };

  const faqs = [
    {
      q: "Can I cancel my subscription anytime?",
      a: "Yes, absolutely. You can cancel your subscription at any point from your dashboard settings. You will retain access to your plan features until the end of your billing cycle.",
    },
    {
      q: "How do refunds work?",
      a: "We offer a 7-day money-back guarantee if you are unsatisfied with your upgraded plan. Please reach out to our support team to initiate a refund request.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit cards (Visa, Mastercard, American Express), Apple Pay, and Google Pay securely through our payment provider.",
    },
    {
      q: "Can I switch plans midway through the month?",
      a: "Yes! If you upgrade, the change happens instantly and you will be billed pro-rata. If you downgrade, your current plan remains active until the next billing cycle begins.",
    },
  ];

  const activePlans = isRecruiter
    ? pricingData.recruiters
    : pricingData.seekers;

  return (
    <div className="min-h-screen  text-slate-100  px-4 sm:px-6 lg:px-8">
      {/* Header section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        {/* Toggle Switch */}
        <div className="mt-10 flex justify-center">
          <div className="relative bg-[#161D30] p-1 rounded-xl flex items-center border border-slate-800">
            <button
              onClick={() => setIsRecruiter(false)}
              className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                !isRecruiter
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              For Job Seekers
            </button>
            <button
              onClick={() => setIsRecruiter(true)}
              className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                isRecruiter
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              For Recruiters
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-24">
        {activePlans.map((plan, idx) => (
          <div
            key={idx}
            className={`relative flex flex-col justify-between bg-[#111827] rounded-2xl border transition-all duration-300 p-8 ${
              plan.popular
                ? "border-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.15)] md:-translate-y-2"
                : "border-slate-800 hover:border-slate-700"
            }`}
          >
            {plan.popular && (
              <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                Most Popular
              </span>
            )}

            <div>
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-sm text-slate-400 min-h-[40px] mb-6">
                {plan.description}
              </p>

              <div className="flex items-baseline text-white mb-6">
                <span className="text-4xl font-extrabold tracking-tight">
                  {plan.price}
                </span>
                <span className="text-slate-400 ml-1 text-sm font-semibold">
                  {plan.period}
                </span>
              </div>

              <hr className="border-slate-800 mb-6" />

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fIdx) => (
                  <li
                    key={fIdx}
                    className="flex items-start text-sm text-slate-300"
                  >
                    <Check className="h-5 w-5 text-blue-500 shrink-0 mr-3 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <form action="/api/checkout_sessions" method="POST">
              <input type="hidden" name="plan-id" value={plan.id} />
              <section>
                <button
                  type="submit"
                  role="link"
                  className={`w-full py-3 px-4 rounded-xl font-medium tracking-wide transition-colors ${
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-500 text-white shadow-md"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                  }`}
                >
                  {plan.price === "$0" ? "Get Started" : "Upgrade Now"}
                </button>
              </section>
            </form>
          </div>
        ))}
      </div>

      <hr className="max-w-4xl mx-auto border-slate-800 mb-20" />

      {/* FAQ Accordion Section */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-[#111827] border border-slate-800 rounded-xl overflow-hidden transition-colors duration-200"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex justify-between items-center p-5 text-left font-medium text-slate-200 hover:text-white transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  )}
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-40 border-t border-slate-800" : "max-h-0"
                  }`}
                >
                  <p className="p-5 text-sm text-slate-400 leading-relaxed bg-[#141B2D]">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
