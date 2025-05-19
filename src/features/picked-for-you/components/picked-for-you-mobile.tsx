'use client';

import { memo } from 'react';
import { DefaultCard, Skeleton } from '@/app/_components/ui';
import { IProduct } from '@/app/types/Product.type';
import { z } from '@zod/mini';
import { Container } from '@/app/_components/shared';
import CustomCarousel from '@/app/_components/ui/custom-carousel';
import { usePickedForYou } from './picked-for-you-desktiop';
import { CarouselItem } from '@/app/_components/ui/carousel';

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
 * Memoized product card component to prevent unnecessary re-renders
 * @param {Object} props - Component props
 * @param {IProduct} props.product - Product data to display
 */
const ProductCard = memo(({ product }: { product: IProduct }) => (
  <DefaultCard product={product} />
));

ProductCard.displayName = 'ProductCard';

/**
 * Mobile version of the PickedForYou component
 * Displays recommended products in a carousel layout optimized for mobile devices
 *
 * @param {PickedForYouProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
export function PickedForYouMobile({
  currentProductId,
  limit = 4,
}: PickedForYouProps) {
  const {
    data: products,
    isLoading,
    error,
  } = usePickedForYou(currentProductId, limit);

  if (error) {
    return (
      <div role="alert" aria-live="polite">
        An error occurred while loading the recommended products
      </div>
    );
  }

  if (isLoading) {
    return (
      <Container className="space-y-4">
        <h2 className="text-2xl font-bold">Picked for you</h2>
        <div
          className="grid grid-cols-1 gap-4"
          role="status"
          aria-label="Loading recommended products">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-48" />
          ))}
        </div>
      </Container>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <Container className="space-y-4">
      <h2 className="text-2xl font-bold">Picked for you</h2>
      <CustomCarousel
        buttonSize="size-8"
        iconSize="size-4"
        aria-label="Recommended products carousel">
        {products.map((product: IProduct) => (
          <CarouselItem
            key={product.id}
            className="pl-4"
            aria-label={`Product ${product.name}`}>
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CustomCarousel>
    </Container>
  );
}
