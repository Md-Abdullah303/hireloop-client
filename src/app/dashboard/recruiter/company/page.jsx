import React from "react";
import CompanyProfileManager from "./CompanyProfileManager";
import { getUserSessionInServer } from "@/lib/core/session";

const companyPage = async () => {
  const userData = await getUserSessionInServer();
  //   console.log(userData);
  return (
    <div>
      <CompanyProfileManager userData={userData} />
    </div>
  );
};

export default companyPage;
