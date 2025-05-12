import React, { PropsWithChildren } from 'react';
import { Toaster as ToasterReactHotToast } from 'react-hot-toast';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

// Components
import { Toaster } from '@/app/_components/ui';
import { AuthProvider } from '@/infrastructure/better-auth/provider';
import { ReactQueryProvider } from '@/infrastructure/react-query';

export default function Provider({ children }: PropsWithChildren) {
  
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <NuqsAdapter>{children}</NuqsAdapter>

        {/* Toaster */}
        <Toaster />
        <ToasterReactHotToast />
      </AuthProvider>
    </ReactQueryProvider>
  );
}
