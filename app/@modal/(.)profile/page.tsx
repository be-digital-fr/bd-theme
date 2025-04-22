import React, { Suspense } from 'react';
import CustomLoader from '@/app/_components/ui/custom-loader';
import { SettingsCards } from '@daveyplate/better-auth-ui';
import ModalDialogContainer from '../_components/dialog-container';

export default function ProfilePage() {
  return (
    <Suspense fallback={<CustomLoader />}>
      <ModalDialogContainer ariaLabel="Profile" ariaDescription="Profile">
        <SettingsCards className="flex flex-col gap-4 justify-center items-center" />
      </ModalDialogContainer>
    </Suspense>
  );
}
