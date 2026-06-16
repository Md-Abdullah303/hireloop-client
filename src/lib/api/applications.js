import { protectedFetch } from "../core/server";

export const getApplicationBySeekerId = async (seekerId) => {
  return await protectedFetch(`/api/applications?applicantId=${seekerId}`);
};
