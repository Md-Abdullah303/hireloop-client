import { Eye, Pencil, TrashBin } from "@gravity-ui/icons";
import { Button, Table } from "@heroui/react";
import { ViewJobModal } from "./RecruiterModals/ViewJobModal";

export function ShowJobsInTable({ companyJobs }) {
  //   console.log(companyJobs);
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Team members" className="min-w-[600px]">
          <Table.Header>
            <Table.Column isRowHeader>Job Title</Table.Column>
            <Table.Column>Type/Category</Table.Column>
            <Table.Column>Location</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Actions</Table.Column>
          </Table.Header>
          <Table.Body>
            {companyJobs.map((companyJob) => (
              <Table.Row key={companyJob._id}>
                <Table.Cell>{companyJob.jobTitle}</Table.Cell>
                <Table.Cell>
                  <div className="flex flex-col items-center ">
                    <p>{`${companyJob.isRemote ? "Remote" : "Onsite"}`}</p>
                    <p>Technology</p>
                  </div>
                </Table.Cell>
                <Table.Cell>{`${companyJob.isRemote ? "Any were" : `${companyJob.city}, ${companyJob.country}`}`}</Table.Cell>
                <Table.Cell>{companyJob.status}</Table.Cell>
                <Table.Cell>
                  <ViewJobModal companyJob={companyJob} />
                  <Button className={" rounded-full"} variant="ghost">
                    <Pencil />
                  </Button>
                  <Button
                    className={"text-red-500 rounded-full"}
                    variant="ghost"
                  >
                    <TrashBin />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
