import React, { PropsWithChildren } from 'react';
import { Header } from '@/app/_components/layout';

export default function WebsiteLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
