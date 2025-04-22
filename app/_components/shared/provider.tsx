import React, { PropsWithChildren } from 'react';
import { Toaster as ToasterReactHotToast } from 'react-hot-toast';

import { Toaster } from '@/app/_components/ui';

export default function Provider({ children }: PropsWithChildren) {
  return (
    <>
      {children}

      {/* Toaster */}
      <Toaster />
      <ToasterReactHotToast />
    </>
  );
}
