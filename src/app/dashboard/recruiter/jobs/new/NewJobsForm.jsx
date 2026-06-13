"use client";

import React, { useState } from "react";
import {
  Briefcase,
  ChevronDown,
  Flame,
  Globe,
  PaperPlane,
  Xmark,
} from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
  Dropdown,
} from "@heroui/react";
import toast from "react-hot-toast";
import { createJob } from "@/lib/actions/jobs";
import { useRouter } from "next/navigation"; // redirect এর বদলে useRouter ব্যবহার করা ভালো

export default function NewJobsForm({ company }) {
  const router = useRouter();

  // ১. আপনার ডাটাবেজের স্ট্যাটাস চেক ("Approved" হলে পোস্ট করতে পারবে)
  // const isApproved = company?.status === "Approved";
  const isApproved = true;

  // ২. সেফটি চেক (যদি ডেটাতে plan বা activeJobsCount না থাকে তবে ডিফল্ট ভ্যালু)
  const companyPlan = company?.plan || "Free";
  const activeJobs = company?.activeJobsCount || 0;

  // Limits lookup dictionary
  const planLimits = { Free: 3, Growth: 10, Enterprise: 50 };
  const currentLimit = planLimits[companyPlan] || 0;
  const isLimitReached = activeJobs >= currentLimit;

  // কন্ডিশন: অনুমোদিত হতে হবে এবং কোটা খালি থাকতে হবে
  const canPost = isApproved && !isLimitReached;

  // Form states
  const [jobType, setJobType] = useState("Full-time");
  const [currency, setCurrency] = useState("USD");
  const [isRemote, setIsRemote] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canPost) {
      toast.error("You are not allowed to post a job right now.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const createNewData = {};

    formData.forEach((value, key) => {
      createNewData[key] = value.toString();
    });

    // মেটাডাটা অ্যাসাইন (আপনার ডাটার আইডি ফিল্ড হচ্ছে _id)
    createNewData.jobType = jobType;
    createNewData.currency = currency;
    createNewData.isRemote = isRemote;
    createNewData.companyName = company?.name;
    createNewData.companyId = company?._id; // এখানে _id ব্যবহার করা হয়েছে
    createNewData.companyLogo = company?.logo;
    createNewData.status = "active";
    createNewData.isPubliclyVisible = true;

    try {
      const res = await createJob(createNewData);
      if (res?.insertedId) {
        e.target.reset();
        toast.success(`Job Saved Successfully!`);
        router.push(`/dashboard/recruiter/jobs`);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 text-zinc-100 min-h-screen">
      {/* স্ট্যাটাস পেন্ডিং হলে ব্যানার দেখাবে */}
      {!isApproved ? (
        <div className="mb-6 p-4 bg-danger-500/10 border border-danger-500/20 text-danger-400 rounded-xl text-sm flex gap-3 items-center">
          <Xmark className="size-5" />
          <span>
            Your company profile is pending approval ({company?.status}). You
            can only post publicly visible listings once approved.
          </span>
        </div>
      ) : isLimitReached ? (
        <div className="mb-6 p-4 bg-warning-500/10 border border-warning-500/20 text-warning-400 rounded-xl text-sm flex gap-3 items-center">
          <Flame className="size-5" />
          <span>
            Plan quota reached! Your <strong>{companyPlan} Plan</strong> allows
            up to {currentLimit} active jobs ({activeJobs} live). Upgrade to
            post more.
          </span>
        </div>
      ) : null}

      <Form
        className="space-y-8 bg-[#111112] border border-[#222224] p-6 md:p-8 rounded-2xl shadow-xl"
        onSubmit={handleSubmit}
      >
        {/* SECTION 1: Company Profile Info */}
        <div className="p-4 bg-[#18181b] border border-[#27272a] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Posting Organization
            </span>
            <h4 className="text-white text-lg font-bold">
              {company?.name || "N/A"}
            </h4>
          </div>
          <div className="text-sm text-zinc-400 sm:text-right">
            <div>
              Current Tier:{" "}
              <span className="text-primary font-medium">{companyPlan}</span>
            </div>
            <div>
              Usage:{" "}
              <span className="text-zinc-200">
                {activeJobs} / {currentLimit} Jobs
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 2: Job Info */}
        <Fieldset disabled={!canPost}>
          <Fieldset.Legend className="text-xl font-bold tracking-tight text-white flex items-center gap-2 mb-1">
            <Briefcase className="size-5 text-zinc-400" />
            Job Information
          </Fieldset.Legend>
          <Description className="text-zinc-400 mb-6 text-sm">
            Provide foundational structural realities regarding this open role.
          </Description>

          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField isRequired name="jobTitle" className="md:col-span-2">
              <Label>Job Title</Label>
              <Input placeholder="e.g. Senior Product Designer" />
              <FieldError />
            </TextField>

            <TextField isRequired name="jobCategory">
              <Label>Job Category</Label>
              <Input placeholder="e.g. Design, Engineering, Marketing" />
              <FieldError />
            </TextField>

            {/* Job Type Dropdown */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium">Job Type</Label>
              <Dropdown>
                <Button
                  aria-label="Job Type Dropdown"
                  variant="secondary"
                  className="w-full justify-between bg-[#18181b] border border-[#27272a] hover:bg-[#27272a]"
                >
                  {jobType}
                  <ChevronDown className="size-4 text-zinc-500" />
                </Button>
                <Dropdown.Popover className="bg-[#18181b] border border-[#27272a]">
                  <Dropdown.Menu onAction={(key) => setJobType(String(key))}>
                    {["Full-time", "Part-time", "Contract", "Internship"].map(
                      (type) => (
                        <Dropdown.Item
                          key={type}
                          id={type}
                          textValue={type}
                          className="text-zinc-300 hover:bg-[#27272a]"
                        >
                          <Label>{type}</Label>
                        </Dropdown.Item>
                      ),
                    )}
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </div>

            {/* Salary Breakdown Block */}
            <div className="grid grid-cols-3 gap-3 md:col-span-2 items-end">
              <TextField isRequired name="salaryMin" type="number">
                <Label>Minimum Salary</Label>
                <Input placeholder="45000" min={0} />
                <FieldError />
              </TextField>

              <TextField isRequired name="salaryMax" type="number">
                <Label>Maximum Salary</Label>
                <Input placeholder="85000" min={0} />
                <FieldError />
              </TextField>

              {/* Currency Selector */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium">Currency</Label>
                <Dropdown>
                  <Button
                    aria-label="Currency Menu"
                    variant="secondary"
                    className="w-full justify-between bg-[#18181b] border border-[#27272a] hover:bg-[#27272a]"
                  >
                    {currency}
                    <ChevronDown className="size-4 text-zinc-500" />
                  </Button>
                  <Dropdown.Popover className="bg-[#18181b] border border-[#27272a]">
                    <Dropdown.Menu onAction={(key) => setCurrency(String(key))}>
                      {["USD", "EUR", "GBP", "BDT", "CAD"].map((curr) => (
                        <Dropdown.Item
                          key={curr}
                          id={curr}
                          textValue={curr}
                          className="text-zinc-300 hover:bg-[#27272a]"
                        >
                          <Label>{curr}</Label>
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown>
              </div>
            </div>

            {/* Location block */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center justify-between p-3 bg-[#18181b]/50 border border-[#27272a] rounded-xl">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">
                    Remote Position
                  </span>
                  <span className="text-xs text-zinc-400">
                    This role can be fulfilled outside geographical
                    dependencies.
                  </span>
                </div>
                <Button
                  type="button"
                  variant={isRemote ? "primary" : "secondary"}
                  onPress={() => setIsRemote(!isRemote)}
                  className="w-24 text-xs font-semibold"
                >
                  {isRemote ? "Remote On" : "Remote Off"}
                </Button>
              </div>

              {!isRemote && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn">
                  <TextField isRequired={!isRemote} name="city">
                    <Label>City</Label>
                    <Input placeholder="San Francisco" />
                    <FieldError />
                  </TextField>
                  <TextField isRequired={!isRemote} name="country">
                    <Label>Country</Label>
                    <Input placeholder="United States" />
                    <FieldError />
                  </TextField>
                </div>
              )}
            </div>

            <TextField
              isRequired
              name="applicationDeadline"
              type="date"
              className="md:col-span-2"
            >
              <Label>Application Deadline</Label>
              <Input type="date" className="w-full text-zinc-300" />
              <FieldError />
            </TextField>
          </FieldGroup>
        </Fieldset>

        <hr className="border-[#222224]" />

        {/* SECTION 3: Descriptions & Details */}
        <Fieldset disabled={!canPost}>
          <Fieldset.Legend className="text-xl font-bold tracking-tight text-white flex items-center gap-2 mb-1">
            <Globe className="size-5 text-zinc-400" />
            Job Description
          </Fieldset.Legend>
          <Description className="text-zinc-400 mb-6 text-sm">
            Deeply define expectations and responsibilities associated with the
            role.
          </Description>

          <FieldGroup className="space-y-6">
            <TextField
              isRequired
              name="responsibilities"
              validate={(v) =>
                v.length < 20
                  ? "Please outline responsibilities thoroughly (min 20 characters)."
                  : null
              }
            >
              <Label>Responsibilities</Label>
              <TextArea placeholder="Outline day-to-day work parameters and technical projects..." />
              <Description>Minimum 20 characters</Description>
              <FieldError />
            </TextField>

            <TextField
              isRequired
              name="requirements"
              validate={(v) =>
                v.length < 20
                  ? "Please outline specific expectations/requirements."
                  : null
              }
            >
              <Label>Requirements</Label>
              <TextArea placeholder="Outline expected skillsets, tools, certifications, or workflows..." />
              <Description>Minimum 20 characters</Description>
              <FieldError />
            </TextField>

            <TextField name="benefits">
              <Label>
                Benefits{" "}
                <span className="text-zinc-500 font-normal text-xs">
                  (Optional)
                </span>
              </Label>
              <TextArea placeholder="List health benefits, equity options, wellness allocations, offsites..." />
              <FieldError />
            </TextField>
          </FieldGroup>

          <Fieldset.Actions className="pt-6 border-t border-[#222224] flex items-center justify-end gap-3">
            <Button type="reset" variant="secondary" disabled={!canPost}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!canPost}
              className="px-6"
            >
              <PaperPlane className="size-4" />
              Publish Job Listing
            </Button>
          </Fieldset.Actions>
        </Fieldset>
      </Form>
    </div>
  );
}
