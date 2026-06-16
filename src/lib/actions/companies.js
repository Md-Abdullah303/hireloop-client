"use server";

import { revalidatePath } from "next/cache";
import { postServerMutation } from "../core/server";

export const updateCompanyStatus = async (id, data) => {
  const res = await postServerMutation(`/api/companies/${id}`, data, "PATCH");
  revalidatePath("/dashboard/admin/companies");
  return res;
};

export const createCompany = async (newCompanyData) => {
  return await postServerMutation("/api/companies", newCompanyData);
};
