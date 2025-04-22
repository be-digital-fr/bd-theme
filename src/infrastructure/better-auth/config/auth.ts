'use server';

import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@/generated/prisma';

import { getSocialProviders } from './socialProviders';
import { getPlugins } from './plugins';

const prisma = new PrismaClient();

export async function getAuth() {
  const [socialProviders, plugins] = await Promise.all([
    getSocialProviders(),
    getPlugins(),
  ]);

  return betterAuth({
    database: prismaAdapter(prisma, {
      provider: 'postgresql',
    }),
    emailAndPassword: {
      enabled: true,
    },
    socialProviders,
    plugins,
  });
}
