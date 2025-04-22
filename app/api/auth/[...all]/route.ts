import { getAuth } from '@/infrastructure/better-auth/config/auth';
import { toNextJsHandler } from 'better-auth/next-js';

const auth = await getAuth();

export const { POST, GET } = toNextJsHandler(auth.handler);
