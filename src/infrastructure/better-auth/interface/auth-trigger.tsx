import { SignedIn, SignedOut, UserButton } from '@daveyplate/better-auth-ui';
import { Settings, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function AuthTrigger() {
  return (
    <>
      <SignedIn>
        <UserButton
          disableDefaultLinks
          additionalLinks={[
            {
              label: 'Settings',
              href: '/profile',
              icon: <Settings />,
            },
          ]}
        />
      </SignedIn>
      <SignedOut>
        <Link href="/auth/sign-in" className="flex items-center gap-2">
          <User className="w-5 h-5" aria-hidden="true" />
          <span className="sr-only">Sign in</span>
        </Link>
      </SignedOut>
    </>
  );
}
