import { requireRole } from "@/lib/core/session";

const SeekerLayoutPage = async ({ children }) => {
  await requireRole("seeker");
  return children;
};

export default SeekerLayoutPage;
