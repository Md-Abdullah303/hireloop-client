"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { submitUserApplication } from "@/lib/actions/applications";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ApplyJobForm = ({ applyingJob, user }) => {
  const router = useRouter();
  // console.log(user);
  const containerRef = useRef(null);

  // GSAP Animations
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Animate the parent component's Job Header
      gsap.from(".job-header-anim", {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Animate form fields one by one (Stagger effect)
      gsap.from(".form-item", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2, // Starts slightly after the header
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extract data from the form
    const formData = new FormData(e.target);
    const applicationData = Object.fromEntries(formData.entries());

    // Add Job ID to the submission data implicitly
    applicationData.jobId = applyingJob?._id;
    applicationData.applicantId = user?.id;
    applicationData.status = "applied";

    const res = await submitUserApplication(applicationData);
    if (res.insertedId) {
      toast.success("applying successfully.");
      router.refresh();
    } else {
      toast.error("Something was wrong");
    }

    // Log the Form Data
    console.log("📝 Application Submitted Data:", applicationData);

    // Optional: Reset form after checking the console
    e.target.reset();
  };

  return (
    <div
      ref={containerRef}
      className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 shadow-sm border border-zinc-200 dark:border-zinc-800"
    >
      <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 form-item flex items-center gap-2">
        <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
        Submit Your Application
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name & Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="form-item">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Full Name
            </label>
            <input
              required
              type="text"
              name="fullName"
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all dark:text-white"
            />
          </div>
          <div className="form-item">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Email Address
            </label>
            <input
              required
              type="email"
              name="email"
              placeholder="john@example.com"
              className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all dark:text-white"
            />
          </div>
        </div>

        {/* Phone & Portfolio Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="form-item">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Phone Number
            </label>
            <input
              required
              type="tel"
              name="phone"
              placeholder="+880 1..."
              className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all dark:text-white"
            />
          </div>
          <div className="form-item">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Portfolio / LinkedIn
            </label>
            <input
              type="url"
              name="portfolio"
              placeholder="https://"
              className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all dark:text-white"
            />
          </div>
        </div>

        {/* Cover Letter */}
        <div className="form-item">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
            Cover Letter
          </label>
          <textarea
            required
            name="coverLetter"
            rows="5"
            placeholder="Tell us why you're a great fit for this role..."
            className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all dark:text-white resize-none"
          ></textarea>
        </div>

        {/* Resume Link */}
        <div className="form-item">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
            Resume / CV Link
          </label>
          <input
            required
            type="url"
            name="resumeLink"
            placeholder="Google Drive or Dropbox link"
            className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all dark:text-white"
          />
        </div>

        {/* Submit Button */}
        <div className="form-item pt-4">
          <button
            type="submit"
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-10 rounded-xl transition-all shadow-md shadow-blue-600/20 active:scale-95"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyJobForm;
