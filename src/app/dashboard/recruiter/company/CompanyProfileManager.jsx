"use client";

import React, { useState, useRef } from "react";
import {
  Form,
  Fieldset,
  FieldGroup,
  TextField,
  Label,
  Input,
  TextArea,
  FieldError,
  Dropdown,
  Button,
} from "@heroui/react";
import {
  ChevronDown,
  ArrowUpFromLine,
  Pencil,
  Factory,
  Globe,
  Xmark,
} from "@gravity-ui/icons";
import { createCompany } from "@/lib/actions/companies";
import toast from "react-hot-toast";

// --- IMGBB UPLOAD HELPER ---
async function uploadToImgbb(file) {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY; // আপনার .env ফাইলে কীটি রাখুন
  if (!apiKey) {
    console.error("Imgbb API Key is missing");
    return null;
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      },
    );
    const data = await response.json();
    if (data.success) {
      return data.data.url;
    }
    return null;
  } catch (error) {
    console.error("Error uploading to imgbb:", error);
    return null;
  }
}

// ==================== MAIN COMPONENT ====================
export default function CompanyProfileManager({ userData, recruiterCompany }) {
  // --- STATES ---
  const [company, setCompany] = useState(recruiterCompany);

  // ডেটা স্ট্রাকচার: { name, websiteUrl, logo, industry, location, employeeCount, description, status }

  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // ড্রপডাউন এবং লোগো কন্ট্রোলের জন্য লোকাল স্টেট
  const [industry, setIndustry] = useState("Technology");
  const [employeeCount, setEmployeeCount] = useState("1-10 employees");
  const [logoUrl, setLogoUrl] = useState("");

  const fileInputRef = useRef(null);

  // --- LOGO UPLOAD HANDLER ---
  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const uploadedUrl = await uploadToImgbb(file);
    if (uploadedUrl) {
      setLogoUrl(uploadedUrl);
    }
    setIsUploading(false);
  };

  // --- FORM SUBMIT HANDLER ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // ডোমেইন প্রিফিক্স ক্লিনআপ (প্রয়োজন হলে)
    let rawUrl = formData.get("websiteUrl") || "";
    const websiteUrl = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;

    const companyData = {
      name: formData.get("companyName"),
      websiteUrl: websiteUrl,
      location: formData.get("location"),
      description: formData.get("description"),
      industry: industry,
      employeeCount: employeeCount,
      logo: logoUrl || (company ? company.logo : ""),
      status: company ? company.status : "Pending", // নতুন রেজিস্ট্রেশনে ডিফল্ট 'Pending'
      recruiterId: userData?.id,
    };

    const response = await createCompany(companyData);
    if (response.insertedId) {
      toast.success("company was added successfully");
    }

    // console.log(companyData);
    setCompany(companyData);
    setIsEditing(false);
  };

  console.log(company?.status);

  // --- DYNAMIC STATUS BADGE STYLING ---
  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Rejected":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default:
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    }
  };

  // ==================== STATE ১: কোনো কোম্পানি রেজিস্টার্ড নেই ====================
  if (!company?._id && !isEditing) {
    return (
      <div className="max-w-4xl mx-auto my-12 bg-[#111112] border border-[#222224] p-8 rounded-2xl shadow-xl text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 bg-[#18181b] border border-[#27272a] rounded-full">
            <Factory className="size-10 text-zinc-400" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-white text-xl font-bold">
            No Company Registered
          </h3>
          <p className="text-zinc-400 text-sm max-w-sm mx-auto">
            {`You haven't registered your company profile yet. Build your company profile to start posting job opportunities.`}
          </p>
        </div>
        <Button
          type="button"
          onPress={() => {
            setIndustry("Technology");
            setEmployeeCount("1-10 employees");
            setLogoUrl("");
            setIsEditing(true);
          }}
          className="bg-white text-black font-semibold hover:bg-zinc-200 transition px-6 py-2.5 rounded-xl text-sm"
        >
          Register Company
        </Button>
      </div>
    );
  }

  // ==================== STATE ২: রেজিস্ট্রেশন / এডিট ফর্ম (UI ইমেজ অনুযায়ী) ====================
  if (isEditing) {
    return (
      <div className="max-w-2xl mx-auto my-12 bg-[#111112] border border-[#222224] rounded-2xl overflow-hidden shadow-2xl">
        {/* Header Block */}
        <div className="p-6 md:p-8 pb-4 flex items-start justify-between">
          <div>
            <h3 className="text-white text-xl font-bold tracking-tight">
              {company ? "Edit Company Details" : "Register New Company"}
            </h3>
            <p className="text-zinc-400 text-xs mt-1">
              Enter your business details to start hiring on HireLoop.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="text-zinc-500 hover:text-white p-1 transition"
          >
            <Xmark className="size-5" />
          </button>
        </div>

        {/* Form Body */}
        <Form className="p-6 md:p-8 pt-2 space-y-6" onSubmit={handleSubmit}>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <TextField
              isRequired
              name="companyName"
              defaultValue={company?.name}
            >
              <Label className="text-zinc-300 font-medium text-sm mb-1.5">
                Company Name
              </Label>
              <Input
                placeholder="e.g. Acme Corp"
                className="bg-[#18181b] border border-[#27272a] rounded-xl text-white w-full"
              />
              <FieldError />
            </TextField>

            {/* Industry Category Dropdown */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-zinc-300 font-medium text-sm">
                Industry / Category
              </Label>
              <Dropdown>
                <Button
                  aria-label="Industry Dropdown"
                  variant="secondary"
                  className="w-full justify-between bg-[#18181b] border border-[#27272a] hover:bg-[#27272a] text-zinc-300 rounded-xl"
                >
                  {industry}
                  <ChevronDown className="size-4 text-zinc-500" />
                </Button>
                <Dropdown.Popover className="bg-[#18181b] border border-[#27272a]">
                  <Dropdown.Menu onAction={(key) => setIndustry(String(key))}>
                    {[
                      "Technology",
                      "Finance",
                      "Healthcare",
                      "Design",
                      "Marketing",
                    ].map((ind) => (
                      <Dropdown.Item
                        key={ind}
                        id={ind}
                        textValue={ind}
                        className="text-zinc-300 hover:bg-[#27272a]"
                      >
                        <Label>{ind}</Label>
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </div>

            {/* Website URL Input matching attached layout */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-zinc-300 font-medium text-sm">
                Website URL
              </Label>
              <div className="flex items-center bg-[#18181b] border border-[#27272a] rounded-xl overflow-hidden focus-within:border-zinc-500 transition">
                <span className="bg-[#1e1e21] px-4 py-2.5 text-zinc-500 text-sm border-r border-[#27272a] h-full select-none">
                  https://
                </span>
                <input
                  name="websiteUrl"
                  type="text"
                  placeholder="www.company.com"
                  defaultValue={
                    company?.websiteUrl
                      ? company.websiteUrl.replace(/^https?:\/\//, "")
                      : ""
                  }
                  className="bg-transparent px-3 py-2 text-white w-full text-sm outline-none placeholder-zinc-600"
                  required
                />
              </div>
            </div>

            {/* Location */}
            <TextField
              isRequired
              name="location"
              defaultValue={company?.location}
            >
              <Label className="text-zinc-300 font-medium text-sm mb-1.5">
                Location
              </Label>
              <div className="flex items-center bg-[#18181b] border border-[#27272a] rounded-xl px-3 focus-within:border-zinc-500 transition">
                <Globe className="size-4 text-zinc-500 mr-2" />
                <input
                  name="location"
                  type="text"
                  placeholder="City, Country"
                  defaultValue={company?.location}
                  className="bg-transparent py-2.5 text-white w-full text-sm outline-none placeholder-zinc-600"
                  required
                />
              </div>
              <FieldError />
            </TextField>

            {/* Employee Count Range Dropdown */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-zinc-300 font-medium text-sm">
                Employee Count Range
              </Label>
              <Dropdown>
                <Button
                  aria-label="Employee Count Dropdown"
                  variant="secondary"
                  className="w-full justify-between bg-[#18181b] border border-[#27272a] hover:bg-[#27272a] text-zinc-300 rounded-xl"
                >
                  {employeeCount}
                  <ChevronDown className="size-4 text-zinc-500" />
                </Button>
                <Dropdown.Popover className="bg-[#18181b] border border-[#27272a]">
                  <Dropdown.Menu
                    onAction={(key) => setEmployeeCount(String(key))}
                  >
                    {[
                      "1-10 employees",
                      "11-50 employees",
                      "51-200 employees",
                      "201-500 employees",
                      "500+ employees",
                    ].map((range) => (
                      <Dropdown.Item
                        key={range}
                        id={range}
                        textValue={range}
                        className="text-zinc-300 hover:bg-[#27272a]"
                      >
                        <Label>{range}</Label>
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </div>

            {/* Imgbb Logo Uploader UI Block */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-zinc-300 font-medium text-sm">
                Company Logo
              </Label>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleLogoChange}
                className="hidden"
              />
              <div
                onClick={() => !isUploading && fileInputRef.current?.click()}
                className="flex items-center gap-4 bg-[#18181b] border border-[#27272a] border-dashed rounded-xl p-2.5 cursor-pointer hover:bg-[#222224] transition group"
              >
                <div className="bg-[#222224] group-hover:bg-[#27272a] p-2.5 rounded-xl border border-[#27272a] text-zinc-400 flex items-center justify-center size-11 shrink-0">
                  {logoUrl || company?.logo ? (
                    <img
                      src={logoUrl || company?.logo}
                      alt="Preview"
                      className="size-full object-contain rounded"
                    />
                  ) : (
                    <ArrowUpFromLine className="size-5" />
                  )}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs text-zinc-200 font-medium truncate">
                    {isUploading
                      ? "Uploading to Imgbb..."
                      : logoUrl || company?.logo
                        ? "Change logo image"
                        : "Upload image"}
                  </p>
                  <p className="text-[11px] text-zinc-500">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </div>
            </div>

            {/* Brief Description */}
            <TextField
              isRequired
              name="description"
              className="md:col-span-2"
              defaultValue={company?.description}
            >
              <Label className="text-zinc-300 font-medium text-sm mb-1.5">
                Brief Description
              </Label>
              <TextArea
                placeholder="Tell us about your company's mission and culture..."
                className="bg-[#18181b] border border-[#27272a] rounded-xl text-white min-h-[100px]"
              />
              <FieldError />
            </TextField>
          </FieldGroup>

          {/* Bottom Action Footer */}
          <div className="pt-6 border-t border-[#222224] flex items-center justify-end gap-3">
            <Button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-transparent border border-[#27272a] hover:bg-[#18181b] text-zinc-400 px-5 py-2 rounded-xl text-sm transition"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUploading}
              className="bg-white text-black font-bold hover:bg-zinc-200 disabled:opacity-50 px-6 py-2 rounded-xl text-sm transition"
            >
              {company ? "Update Profiles" : "Register Company"}
            </Button>
          </div>
        </Form>
      </div>
    );
  }

  // ==================== STATE ৩: ডেটা ভিউ বা ডিটেইলস স্ক্রিন ====================
  return (
    <div className="max-w-4xl mx-auto my-12 bg-[#111112] border border-[#222224] p-6 md:p-8 rounded-2xl shadow-xl space-y-8">
      {/* Dynamic Upper Panel Banner */}
      <div className="p-4 bg-[#18181b] border border-[#27272a] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="size-14 bg-[#222224] rounded-xl border border-[#27272a] flex items-center justify-center overflow-hidden shrink-0">
            {company.logo ? (
              <img
                src={company.logo}
                alt={`${company.name} Logo`}
                className="size-full object-contain p-1.5"
              />
            ) : (
              <Factory className="size-7 text-zinc-500" />
            )}
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-0.5">
              Registered Profile
            </span>
            <h4 className="text-white text-xl font-black">{company.name}</h4>
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3">
          <div
            className={`text-xs px-3 py-1 rounded-full font-semibold border ${getStatusStyle(company.status)}`}
          >
            {company.status}
          </div>
          <Button
            size="sm"
            onPress={() => {
              setIndustry(company.industry);
              setEmployeeCount(company.employeeCount);
              setLogoUrl(company.logo);
              setIsEditing(true);
            }}
            className="bg-[#18181b] border border-[#27272a] text-zinc-300 hover:bg-[#222224] flex items-center gap-2 rounded-xl px-4 text-xs h-9 transition"
          >
            <Pencil className="size-3.5" />
            Edit Info
          </Button>
        </div>
      </div>

      {/* Profile Details Structural Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-[#222224] pb-8">
        <div className="space-y-5">
          <div>
            <h5 className="text-zinc-500 text-xs uppercase font-bold tracking-wider">
              Website URL
            </h5>
            <a
              href={company.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 text-sm font-medium hover:underline flex items-center gap-1.5 mt-1.5"
            >
              <Globe className="size-4 text-zinc-400" />
              {company.websiteUrl}
            </a>
          </div>

          <div>
            <h5 className="text-zinc-500 text-xs uppercase font-bold tracking-wider">
              Industry / Category
            </h5>
            <p className="text-zinc-200 text-sm font-medium mt-1.5">
              {company.industry}
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <h5 className="text-zinc-500 text-xs uppercase font-bold tracking-wider">
              Location
            </h5>
            <p className="text-zinc-200 text-sm font-medium mt-1.5">
              {company.location}
            </p>
          </div>

          <div>
            <h5 className="text-zinc-500 text-xs uppercase font-bold tracking-wider">
              Employee Count Range
            </h5>
            <p className="text-zinc-200 text-sm font-medium mt-1.5">
              {company.employeeCount}
            </p>
          </div>
        </div>
      </div>

      {/* Description Context Summary Block */}
      <div className="space-y-3">
        <h5 className="text-zinc-500 text-xs uppercase font-bold tracking-wider">
          Brief Description
        </h5>
        <p className="text-zinc-300 text-sm leading-relaxed bg-[#18181b]/50 p-5 border border-[#27272a]/60 rounded-xl whitespace-pre-wrap">
          {company.description}
        </p>
      </div>
    </div>
  );
}
