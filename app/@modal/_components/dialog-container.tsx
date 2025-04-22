'use client';

// External imports
import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

// UI Components imports
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/app/_components/ui/dialog';
import * as z from '@zod/mini';

/**
 * DialogContainer Component
 *
 * A reusable dialog container component that handles modal display and navigation
 *
 * Features:
 * - Modal dialog with header and content sections
 * - Back navigation on close
 * - Accessible dialog structure
 * - SEO-friendly headings and descriptions
 *
 * @param {PropsWithChildren} props - React children to render inside dialog
 * @returns {JSX.Element} Dialog container component
 */

const DialogSchema = z.object({
  ariaLabel: z.string(),
  ariaDescription: z.string(),
});

type DialogContainerProps = PropsWithChildren<z.infer<typeof DialogSchema>>;

export default function ModalDialogContainer({
  children,
  ariaLabel,
  ariaDescription,
}: DialogContainerProps) {
  const { ariaLabel: labelledby, ariaDescription: describedby } =
    DialogSchema.parse({
      ariaLabel,
      ariaDescription,
    });

  const router = useRouter();

  return (
    <Dialog
      open
      onOpenChange={() => router.back()}
      aria-labelledby={labelledby}
      aria-describedby={describedby}>
      <DialogContent className="pt-10 bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{ariaLabel}</DialogTitle>
          <DialogDescription>{ariaDescription}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
