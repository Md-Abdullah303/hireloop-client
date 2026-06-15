"use server";

import { postServerMutation } from "../core/server";

export const createSubscriptions = async (subsInfo) => {
  return await postServerMutation("/api/subscriptions", subsInfo);
};
