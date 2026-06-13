import React from "react";
import CompanyProfileManager from "./CompanyProfileManager";
import { getUserSessionInServer } from "@/lib/core/session";
import { getRecruiterCompany } from "@/lib/api/companies";

const companyPage = async () => {
  const userData = await getUserSessionInServer();
  const company = await getRecruiterCompany(userData?.id);
  //   console.log(userData);
  return (
    <div>
      <CompanyProfileManager userData={userData} recruiterCompany={company} />
    </div>
  );
};

export default companyPage;
