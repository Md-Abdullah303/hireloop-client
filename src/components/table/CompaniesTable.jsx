// CompaniesTable.jsx
"use client";

import { Table, Chip, Button } from "@heroui/react";
import { CircleCheck, CircleXmark, Eye } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";

export default function CompaniesTable({ companies = [] }) {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "success";
      case "rejected":
        return "danger";
      default:
        return "warning";
    }
  };

  // ক্লিক হ্যান্ডলার ফাংশনসমূহ (আইডি রিসিভ করে কনসোল লগ করবে)
  const handleView = (id) => {
    console.log("View button clicked for Company ID:", id);
  };

  const handleApprove = (id) => {
    console.log("Approve button clicked for Company ID:", id);
  };

  const handleReject = (id) => {
    console.log("Reject button clicked for Company ID:", id);
  };

  return (
    <Table>
      {/* আপনার রেফারেন্স অনুযায়ী সঠিক HeroUI সাব-কম্পোনেন্ট স্ট্রাকচার */}
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Companies review table"
          className="min-w-[800px]"
        >
          <Table.Header>
            <Table.Column isRowHeader>Company</Table.Column>
            <Table.Column>Industry</Table.Column>
            <Table.Column>Location</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Created</Table.Column>
            <Table.Column className="text-center">Actions</Table.Column>
          </Table.Header>

          <Table.Body>
            {companies.map((company) => {
              const statusLower = company.status?.toLowerCase();
              const isApproved = statusLower === "approved";
              const isRejected = statusLower === "rejected";

              return (
                <Table.Row key={company._id} id={company._id}>
                  {/* Company Column */}
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={company.logo || "/placeholder.png"}
                        alt={company.name}
                        width={40}
                        height={40}
                        className="rounded-full w-8 h-8 object-cover"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-xs">
                          {company.name}
                        </span>
                        <Link
                          href={company.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-500 hover:underline"
                        >
                          Visit Website
                        </Link>
                      </div>
                    </div>
                  </Table.Cell>

                  {/* Industry */}
                  <Table.Cell>{company.industry}</Table.Cell>

                  {/* Location */}
                  <Table.Cell>{company.location}</Table.Cell>

                  {/* Status */}
                  <Table.Cell>
                    <Chip
                      size="sm"
                      variant="flat"
                      color={getStatusColor(company.status)}
                    >
                      {company.status}
                    </Chip>
                  </Table.Cell>

                  {/* Created At */}
                  <Table.Cell>
                    {new Date(company.createdAt).toLocaleDateString()}
                  </Table.Cell>

                  {/* Actions (Buttons) */}
                  <Table.Cell>
                    <div className="flex items-center justify-center gap-2">
                      {/* View Button */}
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        color="primary"
                        onClick={() => handleView(company._id)}
                      >
                        <Eye className="size-4" />
                      </Button>

                      {/* UI Condition: স্ট্যাটাস approved হলে এই বাটনটি দেখাবে না */}
                      {!isApproved && (
                        <Button
                          className="bg-green-600 text-white flex items-center gap-1 px-3"
                          size="sm"
                          onClick={() => handleApprove(company._id)}
                        >
                          <CircleCheck className="size-4" />
                          <span className="text-xs">Approved</span>
                        </Button>
                      )}

                      {/* UI Condition: স্ট্যাটাস rejected হলে এই বাটনটি দেখাবে না */}
                      {!isRejected && (
                        <Button
                          className="flex items-center gap-1 px-3"
                          size="sm"
                          color="danger"
                          variant="flat"
                          onClick={() => handleReject(company._id)}
                        >
                          <CircleXmark className="size-4" />
                          <span className="text-xs">Reject</span>
                        </Button>
                      )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
