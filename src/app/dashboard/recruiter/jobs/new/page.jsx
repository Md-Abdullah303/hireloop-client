import React from "react";
import NewJobsForm from "./NewJobsForm";
import { getLoggedIdRecruiterCompany } from "@/lib/api/companies";

const NewJobsPage = async () => {
  const company = await getLoggedIdRecruiterCompany();

  return (
    <div>
      <NewJobsForm company={company} />
    </div>
  );
};

export default NewJobsPage;
