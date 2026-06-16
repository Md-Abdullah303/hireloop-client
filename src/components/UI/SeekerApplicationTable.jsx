import { Eye, Pencil, TrashBin } from "@gravity-ui/icons";
import { Button, Chip, Table } from "@heroui/react";
import { ViewJobModal } from "./RecruiterModals/ViewJobModal";
import { EditJobModal } from "./RecruiterModals/EditJobModal";
import { DeleteJobModal } from "./RecruiterModals/DeleteJobModal";
import { getJobByID } from "@/lib/api/jobs";
// import { editJob } from "@/lib/actions/jobs";

export function SeekerApplicationTable({ appliedJobs }) {
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Team members" className="min-w-[600px]">
          <Table.Header>
            <Table.Column isRowHeader>Job Title</Table.Column>
            <Table.Column>Company</Table.Column>
            <Table.Column>Applied</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Action</Table.Column>
          </Table.Header>
          <Table.Body>
            {appliedJobs.map(async (appliedJob) => {
              const { applicantId, jobId } = appliedJob;
              const jobRelatedInfo = await getJobByID(jobId);
              //   console.log("Job Related Info", appliedJob);

              return (
                <Table.Row key={appliedJob._id}>
                  <Table.Cell>{jobRelatedInfo?.jobTitle}</Table.Cell>
                  <Table.Cell>{jobRelatedInfo?.companyName}</Table.Cell>
                  <Table.Cell>
                    {new Date(appliedJob.applyingAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <Chip variant="soft">Applied</Chip>
                  </Table.Cell>
                  <Table.Cell>
                    {/* <ViewJobModal companyJob={companyJob} />
                  <EditJobModal companyJob={companyJob} />
                  <DeleteJobModal companyJob={companyJob} /> */}
                    Details
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
