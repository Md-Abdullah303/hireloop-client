import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const getUserSessionInServer = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  return session?.user || null;
};

export const getToken = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  return session?.session?.token || null;
};

export const requireRole = async (role) => {
  const user = await getUserSessionInServer();
  if (!user) {
    redirect("/signin");
  }
  if (user.role !== role) {
    redirect("/unauthorized");
  }
  return user;
};
