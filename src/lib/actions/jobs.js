"use server";

import { postServerMutation } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
// console.log(baseUrl);
export const createJob = async (newJobData) => {
  return await postServerMutation("/api/jobs", newJobData);
};

export const editJob = async (jobId, editJobData) => {
  const res = await fetch(`${baseUrl}/api/jobs?jobId=${jobId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editJobData),
  });
  return await res.json();
};

export const deleteJob = async (jobId) => {
  const res = await fetch(`${baseUrl}/api/jobs?jobId=${jobId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};
