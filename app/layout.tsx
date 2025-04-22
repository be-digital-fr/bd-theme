import React, { PropsWithChildren } from 'react';
import { Provider } from '@/app/_components/shared';
import * as z from '@zod/mini';

const RootLayoutSchema = z.object({
  modal: z.custom<React.ReactNode>(),
});

type RootLayoutProps = z.infer<typeof RootLayoutSchema>;

export default function RootLayout({
  children,
  modal,
}: PropsWithChildren<RootLayoutProps>) {
  return (
    <html>
      <head />
      <body>
        <Provider>
          {children}

          {/* Modal */}
          {modal}
        </Provider>
      </body>
    </html>
  );
}
