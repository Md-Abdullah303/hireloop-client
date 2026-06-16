//
//
//

import { serverFetch } from "../core/server";
import { getUserSessionInServer } from "../core/session";

export const getCompanies = async () => {
  return await serverFetch(`/api/companies`);
};

export const getRecruiterCompany = async (recruiterID) => {
  return await serverFetch(`/api/my/companies?recruiterId=${recruiterID}`);
};

export const getLoggedIdRecruiterCompany = async () => {
  const user = await getUserSessionInServer();
  return await getRecruiterCompany(user?.id);
};
