"use client";

import React, { useState } from "react";
import {
  Eye,
  Briefcase,
  MapPin,
  Calendar,
  CircleDollar,
  Layers,
} from "@gravity-ui/icons";
import { Button, Modal, Chip } from "@heroui/react";

export function ViewJobModal({ companyJob }) {
  if (!companyJob) return null;

  // Destructuring the data
  const {
    jobTitle,
    companyName,
    city,
    country,
    isRemote,
    jobType,
    salaryMin,
    salaryMax,
    currency,
    applicationDeadline,
    requirements,
    responsibilities,
    status,
  } = companyJob;

  // Helper function to split text by newline into an array for beautiful lists
  const formatList = (text) => {
    if (!text) return [];
    return text.split("\n").filter((item) => item.trim() !== "");
  };

  return (
    <Modal>
      {/* Trigger Button */}
      <Button
        className="rounded-full min-w-10 w-10 h-10 p-0"
        variant="ghost"
        color="primary"
      >
        <Eye className="size-5" />
      </Button>

      {/* HeroUI Backdrop & Modal Layout */}
      <Modal.Backdrop
        className="bg-linear-to-t from-black/80 via-black/40 to-transparent dark:from-zinc-800/80 dark:via-zinc-800/40"
        variant="blur"
      >
        <Modal.Container>
          {/* Max-w-2xl makes it wide enough for a split info grid layout */}
          <Modal.Dialog className="sm:max-w-[650px] w-full">
            {/* Header Section */}
            <Modal.Header className="flex flex-col gap-1 items-start text-left pt-6 pb-2">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <Chip
                  size="sm"
                  color={status === "active" ? "success" : "default"}
                  variant="flat"
                  className="capitalize"
                >
                  {status}
                </Chip>
                <Chip
                  size="sm"
                  color="secondary"
                  variant="flat"
                  className="capitalize"
                >
                  {jobType}
                </Chip>
                {isRemote && (
                  <Chip size="sm" color="warning" variant="flat">
                    Remote
                  </Chip>
                )}
              </div>

              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                {jobTitle}
              </h2>
              <p className="text-medium font-medium text-primary flex items-center gap-1">
                <Briefcase className="size-4" /> {companyName}
              </p>
            </Modal.Header>

            {/* Body Section */}
            <Modal.Body className="py-4 gap-6 overflow-y-auto max-h-[60vh]">
              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 dark:bg-zinc-900/50 rounded-xl w-full">
                <div className="flex items-start gap-2">
                  <MapPin className="size-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-400 font-medium">
                      Location
                    </p>
                    {isRemote || (
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {city}, {country}
                      </p>
                    )}
                    {isRemote && (
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Any ware
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CircleDollar className="size-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-400 font-medium">
                      Salary Range
                    </p>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {salaryMin} - {salaryMax} {currency}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Calendar className="size-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-400 font-medium">
                      Deadline
                    </p>
                    <p className="text-sm font-semibold text-danger dark:text-danger-400">
                      {new Date(applicationDeadline).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        },
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Requirements Section */}
              {requirements && (
                <div className="w-full text-left">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
                    <Layers className="size-4 text-primary" /> Requirements
                  </h3>
                  <ul className="list-disc pl-5 space-y-1.5">
                    {formatList(requirements).map((req, index) => (
                      <li
                        key={index}
                        className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed"
                      >
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Responsibilities Section */}
              {responsibilities && (
                <div className="w-full text-left">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
                    <Briefcase className="size-4 text-secondary" /> Key
                    Responsibilities
                  </h3>
                  <ul className="list-disc pl-5 space-y-1.5">
                    {formatList(responsibilities).map((res, index) => (
                      <li
                        key={index}
                        className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed"
                      >
                        {res}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Modal.Body>

            {/* Footer Section */}
            <Modal.Footer className="border-t border-slate-100 dark:border-zinc-800 flex justify-end gap-2 pt-4">
              <Button slot="close" color="danger" variant="light">
                Close
              </Button>
              <Button slot="close" color="primary">
                Apply Now
              </Button>
            </Modal.Footer>

            <Modal.CloseTrigger />
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
