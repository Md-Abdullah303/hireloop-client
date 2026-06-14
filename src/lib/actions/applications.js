"use server";

import { postServerMutation } from "../core/server";

export const submitUserApplication = async (applicationData) => {
  return await postServerMutation("/api/applications", applicationData);
};
