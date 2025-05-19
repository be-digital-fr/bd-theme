'use client';

import { z } from '@zod/mini';

import { PickedForYouDesktop } from './picked-for-you-desktiop';
import { PickedForYouMobile } from './picked-for-you-mobile';
import useMediaQuery from '@/app/_hooks/use-media-query';

/**
 * Schema definition for PickedForYou component props
 * @property {string} currentProductId - The ID of the current product
 * @property {number} [limit] - Optional number of products to display (default: 4)
 */
const PickedForYouSchema = z.object({
  currentProductId: z.string(),
  limit: z.optional(z.number()),
});

type PickedForYouProps = z.infer<typeof PickedForYouSchema>;

/**
 * PickedForYou Component
 * 
 * A responsive component that displays recommended products based on the current product.
 * It automatically switches between mobile and desktop layouts based on screen size.
 * 
 * @param {PickedForYouProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
export default function PickedForYou({ currentProductId, limit = 4 }: PickedForYouProps) {
  // Use media query hook to determine if we're on mobile
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <section 
      aria-label="Recommended products for you"
      role="region"
    >
      {isMobile ? (
        <PickedForYouMobile currentProductId={currentProductId} limit={limit} />
      ) : (
        <PickedForYouDesktop currentProductId={currentProductId} limit={limit} />
      )}
    </section>
  );
}
