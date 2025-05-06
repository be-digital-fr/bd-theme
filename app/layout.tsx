import React, { PropsWithChildren } from 'react';
import { Provider } from '@/app/_components/shared';
import * as z from '@zod/mini';

// Fonts : DM Sans and Poppins
import { DM_Sans, Poppins, Plus_Jakarta_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

const poppins = Poppins({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});
// Style
import './globals.css';

const RootLayoutSchema = z.object({
  modal: z.custom<React.ReactNode>(),
});

type RootLayoutProps = z.infer<typeof RootLayoutSchema>;

export const dynamic = 'force-static';

export default function RootLayout({
  children,
  modal,
}: PropsWithChildren<RootLayoutProps>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} ${poppins.className} ${plusJakartaSans.className}`}>
        <Provider>
          {children}

          {/* Modal */}
          {modal}
        </Provider>
      </body>
    </html>
  );
}
