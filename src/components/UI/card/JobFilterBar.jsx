"use client";

import React, { useEffect, useState } from "react";
import {
  InputGroup,
  Label,
  TextField,
  Select,
  ListBox,
  RadioGroup,
  Radio,
} from "@heroui/react";
import { useRouter } from "next/navigation";

// Search Icon SVG
const SearchIcon = () => (
  <svg
    className="size-4 text-zinc-400 dark:text-zinc-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

export default function JobFilterBar({ jobs, filter }) {
  // State variables
  const [search, setSearch] = useState(filter.search);
  const [jobType, setJobType] = useState(filter.jobType || "all");
  const [onRemote, setOnRemote] = useState(filter.isRemote || false);

  const handleJobTypeChange = (keys) => {
    const selectedValue = keys || "all";
    setJobType(selectedValue);
  };
  const handleRemoteToggle = (e) => {
    e.preventDefault();
    setOnRemote((prev) => !prev);
  };

  const router = useRouter();

  useEffect(() => {
    const sp = new URLSearchParams();
    if (search) {
      sp.set("search", search);
    }
    if (jobType !== "all") {
      sp.set("jobType", jobType);
    }
    if (onRemote) {
      sp.set("isRemote", true);
    }

    const path = `?${sp.toString()}`;
    router.push(path);
  }, [jobType, router, search, onRemote]);

  return (
    <div className="w-full bg-white dark:bg-zinc-900 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-end">
      {/* ১. Text Search Input */}
      <div className="w-full md:max-w-[300px]">
        <Label className="text-sm font-medium mb-1.5 block text-zinc-700 dark:text-zinc-300">
          Search Jobs
        </Label>
        <TextField name="search" aria-label="Search Jobs">
          <InputGroup>
            <InputGroup.Prefix>
              <SearchIcon />
            </InputGroup.Prefix>
            <InputGroup.Input
              className="w-full"
              placeholder="Title, keywords, or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </TextField>
      </div>

      {/* ২. Job Type Dropdown */}
      <div className="w-full md:w-[180px]">
        <Label className="text-sm font-medium mb-1.5 block text-zinc-700 dark:text-zinc-300">
          Job Type
        </Label>
        <Select
          className="w-full"
          placeholder="All Types"
          selectedKeys={new Set([jobType])}
          onSelectionChange={handleJobTypeChange}
          aria-label="Job Type"
        >
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="all" textValue="All Types">
                All Types
              </ListBox.Item>
              <ListBox.Item id="Full-time" textValue="Full-time">
                Full-time
              </ListBox.Item>
              <ListBox.Item id="Part-time" textValue="Part-time">
                Part-time
              </ListBox.Item>
              <ListBox.Item id="Contract" textValue="Contract">
                Contract
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      {/* ৩. Remote Filter (Your Exact HeroUI Sub-component structure) */}
      <div className="w-full md:w-auto">
        <RadioGroup
          value={onRemote ? "remote" : ""}
          aria-label="Location Filter"
        >
          <Radio
            value="remote"
            onClick={handleRemoteToggle}
            className="border-zinc-200 dark:border-zinc-800 group cursor-pointer rounded-xl border-2 p-3 hover:border-blue-300 data-[selected=true]:border-blue-500 data-[selected=true]:bg-blue-500/10 transition-all select-none"
          >
            <Radio.Content className="flex flex-row items-center gap-2">
              <Radio.Control>
                <Radio.Indicator className="border-zinc-300 border-2 group-hover:border-blue-400 group-data-[selected=true]:border-blue-500 group-data-[selected=true]:bg-blue-500" />
              </Radio.Control>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Remote Jobs
              </span>
            </Radio.Content>
          </Radio>
        </RadioGroup>
      </div>
    </div>
  );
}
