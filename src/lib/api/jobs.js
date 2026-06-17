import { serverFetch } from "../core/server";

export const getCompanyJob = async (companyId, status = "active") => {
  return await serverFetch(`/api/jobs?companyId=${companyId}&status=${status}`);
};

export const getAllJob = async (queryString) => {
  return await serverFetch(`/api/all/jobs?${queryString}`);
};

export const getJobByID = async (jobId) => {
  return await serverFetch(`/api/jobs/${jobId}`);
};
