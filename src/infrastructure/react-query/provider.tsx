'use client';

import React, { PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import getQueryClient from './utils/get-query-client';

/**
 * ReactQueryProvider component
 *
 * This component provides React Query functionality to the application.
 * It initializes a QueryClient instance and wraps children with QueryClientProvider.
 *
 * The QueryClient is created using getQueryClient() which handles:
 * - Server-side: Creates new QueryClient instance each time
 * - Client-side: Reuses single QueryClient instance
 *
 * @param {PropsWithChildren} props - React component props containing children
 * @returns {JSX.Element} QueryClientProvider wrapped around children
 */
export default function ReactQueryProvider({ children }: PropsWithChildren) {
  // Get QueryClient instance (shared on client, new on server)
  const queryClient = getQueryClient();

  // Wrap children with React Query's QueryClientProvider
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
