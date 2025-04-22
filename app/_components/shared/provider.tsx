import React, { PropsWithChildren } from 'react';
import { Toaster as ToasterReactHotToast } from 'react-hot-toast';

import { Toaster } from '@/app/_components/ui';
import { AuthProvider } from '@/infrastructure/better-auth/provider';

export default function Provider({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      {children}

      {/* Toaster */}
      <Toaster />
      <ToasterReactHotToast />
    </AuthProvider>
  );
}
