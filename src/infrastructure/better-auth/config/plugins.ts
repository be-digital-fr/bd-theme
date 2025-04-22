'use server';

import { nextCookies } from "better-auth/next-js";

export async function getPlugins() {
  return [nextCookies()];
}
