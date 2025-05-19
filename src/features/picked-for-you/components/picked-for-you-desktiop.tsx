'use client';

import { memo } from 'react';
import { DefaultCard, Skeleton } from '@/app/_components/ui';
import { IProduct } from '@/app/types/Product.type';
import { z } from '@zod/mini';
import { Container } from '@/app/_components/shared';
import { useQuery } from '@tanstack/react-query';

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
 * Fetches recommended products from the API
 * @param {string} currentProductId - The ID of the current product
 * @param {number} limit - Number of products to fetch
 * @returns {Promise<IProduct[]>} Array of recommended products
 */
async function fetchProducts(currentProductId: string, limit: number = 4) {
  const response = await fetch(
    `/api/v1/product/picked-for-you?productId=${currentProductId}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch recommended products');
  }

  return response.json();
}

/**
 * Custom hook for fetching and managing picked for you products
 * @param {string} currentProductId - The ID of the current product
 * @param {number} limit - Number of products to fetch
 * @returns {Object} Query result containing products, loading state, and error state
 */
export function usePickedForYou(currentProductId: string, limit: number = 4) {
  return useQuery({
    queryKey: ['pickedForYou', currentProductId, limit],
    queryFn: () => fetchProducts(currentProductId, limit),
  });
}

/**
 * Desktop version of the PickedForYou component
 * Displays recommended products in a responsive grid layout
 * 
 * @param {PickedForYouProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
export function PickedForYouDesktop({ currentProductId, limit = 4 }: PickedForYouProps) {
  const { data: products, isLoading, error } = usePickedForYou(currentProductId, limit);

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
        <h3 className="text-2xl font-bold">Picked for you</h3>
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4"
          role="status"
          aria-label="Loading recommended products"
        >
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
      <h3 className="text-2xl font-bold">Picked for you</h3>
      <ul 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4"
        aria-label="Recommended products"
      >
        {products.map((product: IProduct) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </Container>
  );
}
