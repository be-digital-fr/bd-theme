'use server';

import { assertValue } from '@/utils';
import { SocialProviders } from 'better-auth/social-providers';

/* const googleClientId = assertValue(
  process.env.GOOGLE_CLIENT_ID,
  'Please set GOOGLE_CLIENT_ID'
);
const googleClientSecret = assertValue(
  process.env.GOOGLE_CLIENT_SECRET,
  'Please set GOOGLE_CLIENT_SECRET'
); */

export async function getSocialProviders(): Promise<SocialProviders> {
  return {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  };
}
