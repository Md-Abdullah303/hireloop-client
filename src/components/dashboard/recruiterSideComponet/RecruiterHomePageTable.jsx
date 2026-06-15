import React from "react";
import { Chip, Table } from "@heroui/react";

// Mock Data representing the image
const candidatesData = [
  {
    id: 1,
    name: "Julianne Moore",
    avatarInitial: "J", // Placeholder logic for the profile circle
    role: "Senior Product Designer",
    dateApplied: "Oct 24, 2023",
    experience: "6 years",
    status: "Interviewing",
  },
  {
    id: 2,
    name: "Robert Downey",
    avatarInitial: "R",
    role: "Backend Engineer",
    dateApplied: "Oct 23, 2023",
    experience: "4 years",
    status: "New",
  },
  {
    id: 3,
    name: "Emma Stone",
    avatarInitial: "E",
    role: "Marketing Lead",
    dateApplied: "Oct 22, 2023",
    experience: "8 years",
    status: "Reviewing",
  },
  {
    id: 4,
    name: "Chris Pratt",
    avatarInitial: "C",
    role: "Product Manager",
    dateApplied: "Oct 21, 2023",
    experience: "5 years",
    status: "Rejected",
  },
];

export function RecruiterHomapageTable() {
  // Helper to map statuses to HeroUI Chip color configurations
  const getStatusConfig = (status) => {
    switch (status.toLowerCase()) {
      case "interviewing":
        return { color: "success", variant: "flat" };
      case "new":
        return { color: "default", variant: "flat" };
      case "reviewing":
        return { color: "warning", variant: "flat" };
      case "rejected":
        return { color: "danger", variant: "flat" };
      default:
        return { color: "default", variant: "flat" };
    }
  };

  return (
    // Outer wrapper matching the container aesthetics from your mockup
    <div className="w-full bg-[#111112]  rounded-xl py-4 overflow-hidden">
      {/* Horizontal scrolling wrapper for smaller screens */}
      <div className="overflow-x-auto w-full">
        <Table
          aria-label="Recruiter Candidates Dashboard Table"
          className="min-w-[800px] text-zinc-300 selection:bg-zinc-800"
        >
          <Table.ResizableContainer>
            <Table.Content>
              {/* Table Headers */}
              <Table.Header>
                <Table.Column
                  isRowHeader
                  defaultWidth="1.5fr"
                  id="name"
                  minWidth={200}
                  className="text-zinc-400 font-semibold bg-transparent border-b border-[#222224] py-4"
                >
                  Candidate Name
                  <Table.ColumnResizer />
                </Table.Column>
                <Table.Column
                  defaultWidth="1.5fr"
                  id="role"
                  minWidth={200}
                  className="text-zinc-400 font-semibold bg-transparent border-b border-[#222224] py-4"
                >
                  Role
                  <Table.ColumnResizer />
                </Table.Column>
                <Table.Column
                  defaultWidth="1fr"
                  id="date_applied"
                  minWidth={140}
                  className="text-zinc-400 font-semibold bg-transparent border-b border-[#222224] py-4"
                >
                  Date Applied
                  <Table.ColumnResizer />
                </Table.Column>
                <Table.Column
                  defaultWidth="1fr"
                  id="experience"
                  minWidth={120}
                  className="text-zinc-400 font-semibold bg-transparent border-b border-[#222224] py-4"
                >
                  Experience
                  <Table.ColumnResizer />
                </Table.Column>
                <Table.Column
                  defaultWidth="1fr"
                  id="status"
                  minWidth={120}
                  className="text-zinc-400 font-semibold bg-transparent border-b border-[#222224] py-4"
                >
                  Status
                </Table.Column>
              </Table.Header>

              {/* Table Body rows mapping the data */}
              <Table.Body>
                {candidatesData.map((candidate) => {
                  const chipConfig = getStatusConfig(candidate.status);

                  return (
                    <Table.Row
                      key={candidate.id}
                      className="border-b border-[#1b1b1c] last:border-0 hover:bg-[#161617]/50 transition-colors"
                    >
                      {/* Candidate Name with Avatar Placeholder */}
                      <Table.Cell className="py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-9 h-9 rounded-full bg-[#2a2a2c] flex items-center justify-center text-zinc-400 font-medium text-sm flex-shrink-0">
                            {candidate.avatarInitial}
                          </div>
                          <span className="text-white font-semibold text-base tracking-wide">
                            {candidate.name}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* Role */}
                      <Table.Cell className="text-zinc-400 text-sm font-medium">
                        {candidate.role}
                      </Table.Cell>

                      {/* Date Applied */}
                      <Table.Cell className="text-zinc-400 text-sm">
                        {candidate.dateApplied}
                      </Table.Cell>

                      {/* Experience */}
                      <Table.Cell className="text-zinc-400 text-sm">
                        {candidate.experience}
                      </Table.Cell>

                      {/* Status Chip */}
                      <Table.Cell>
                        <Chip
                          color={chipConfig.color}
                          variant={chipConfig.variant}
                          size="sm"
                          className="px-3 py-1 font-medium capitalize bg-opacity-10 border-none font-semibold text-xs tracking-wide"
                          // classNames={{
                          //   base: "bg-opacity-10 border-none", // Keeps soft background matching dark themes
                          //   content: "font-semibold text-xs tracking-wide",
                          // }}
                        >
                          {candidate.status}
                        </Chip>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Content>
          </Table.ResizableContainer>
        </Table>
      </div>
    </div>
  );
}
