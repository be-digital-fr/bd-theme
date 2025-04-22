"use server";

import { auth } from "../config";

import { headers } from "next/headers";

export const authSession = async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
};
