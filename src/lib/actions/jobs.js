"use server";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
// console.log(baseUrl);
export const createJob = async (newJobData) => {
  const res = await fetch(`${baseUrl}/api/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newJobData),
  });

  return res.json();
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
