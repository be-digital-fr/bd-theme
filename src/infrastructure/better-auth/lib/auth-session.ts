'use server';

import { headers } from 'next/headers';
import { getAuth } from '../config';

export const authSession = async () => {
  const auth = await getAuth();
  return await auth.api.getSession({
    headers: await headers(),
  });
};
