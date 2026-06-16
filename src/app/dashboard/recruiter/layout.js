import { requireRole } from "@/lib/core/session";
import React from "react";

const RecruiterLayoutPage = async ({ children }) => {
  await requireRole("recruiter");
  return children;
};

export default RecruiterLayoutPage;
