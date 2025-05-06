import React, { PropsWithChildren } from 'react';
import { Header, Footer } from '@/app/_components/layout';

export default function WebsiteLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
