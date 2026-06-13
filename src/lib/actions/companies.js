"use server";

import { postServerMutation } from "../core/server";

export const createCompany = async (newCompanyData) => {
  return await postServerMutation("/api/companies", newCompanyData);
};
