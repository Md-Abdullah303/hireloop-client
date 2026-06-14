"use client";

import React, { useState, useEffect } from "react";
import { InputGroup, Label, TextField, Select, ListBox } from "@heroui/react";

// Search Icon SVG
const SearchIcon = () => (
  <svg
    className="size-4 text-muted"
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

export default function JobFilterBar({ onFilterChange }) {
  // State for all filter fields
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("all");
  const [workSetting, setWorkSetting] = useState("all");
  const [minSalary, setMinSalary] = useState("");

  // Trigger the parent filter function whenever any state changes
  useEffect(() => {
    onFilterChange({
      search: search.trim().toLowerCase(),
      jobType,
      workSetting,
      minSalary: minSalary ? parseFloat(minSalary) : 0,
    });
  }, [search, jobType, workSetting, minSalary, onFilterChange]);

  return (
    <div className="w-full bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row gap-4 items-end">
      {/* 1. Text Search Input */}
      <TextField className="w-full md:max-w-[300px]" name="search">
        <Label className="text-sm font-medium mb-1.5 block">Search Jobs</Label>
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

      {/* 2. Job Type Dropdown */}
      <div className="w-full md:w-[180px]">
        <Label className="text-sm font-medium mb-1.5 block">Job Type</Label>
        <Select
          className="w-full"
          placeholder="All Types"
          selectedKeys={new Set([jobType])}
          onSelectionChange={(keys) => setJobType(Array.from(keys)[0])}
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

      {/* 3. Remote vs On-Site Dropdown */}
      <div className="w-full md:w-[180px]">
        <Label className="text-sm font-medium mb-1.5 block">Work Setting</Label>
        <Select
          className="w-full"
          placeholder="All Settings"
          selectedKeys={new Set([workSetting])}
          onSelectionChange={(keys) => setWorkSetting(Array.from(keys)[0])}
        >
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="all" textValue="All Settings">
                All Settings
              </ListBox.Item>
              <ListBox.Item id="remote" textValue="Remote Only">
                Remote Only
              </ListBox.Item>
              <ListBox.Item id="onsite" textValue="On-site / Hybrid">
                On-site / Hybrid
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      {/* 4. Minimum Salary Input */}
      <TextField className="w-full md:max-w-[160px]" name="minSalary">
        <Label className="text-sm font-medium mb-1.5 block">
          Min Salary (USD)
        </Label>
        <InputGroup>
          <InputGroup.Prefix>
            <span className="text-sm text-muted">$</span>
          </InputGroup.Prefix>
          <InputGroup.Input
            type="number"
            className="w-full"
            placeholder="e.g. 10000"
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
          />
        </InputGroup>
      </TextField>

      {/* Clear Filters Button */}
      {(search || jobType !== "all" || workSetting !== "all" || minSalary) && (
        <button
          onClick={() => {
            setSearch("");
            setJobType("all");
            setWorkSetting("all");
            setMinSalary("");
          }}
          className="text-sm text-danger hover:underline h-10 px-2 transition-all self-center md:self-end"
        >
          Clear
        </button>
      )}
    </div>
  );
}
