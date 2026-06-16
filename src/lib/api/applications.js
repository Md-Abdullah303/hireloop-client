import { serverFetch } from "../core/server";

export const getApplicationBySeekerId = async (seekerId) => {
  return await serverFetch(`/api/applications?applicantId=${seekerId}`);
};
