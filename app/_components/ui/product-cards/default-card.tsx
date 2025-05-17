import Image from 'next/image';
import { Star } from 'lucide-react';
import { z } from '@zod/mini';

import { Prisma } from '@/lib';
import { Card, CardContent, CardFooter } from '../card';
import { Button } from '../button';
import FavoriteButton from './favorite-icon';
import AddToCartButton from './add-to-cart-button';

// Validation schema for product with included reviews
const ProductSchema = z.object({
  product: z.custom<
    Prisma.ProductGetPayload<{
      include: {
        reviews: true;
      };
    }>
  >(),
});

// Inferred type from schema for TypeScript typing
export type Product = z.infer<typeof ProductSchema>;

/**
 * DefaultCard Component - Displays a product card with image, rating and price
 * @param {Product} product - The product data to display
 * @throws {Error} If product doesn't match validation schema
 */
export default function DefaultCard({ product }: Product) {
  // Validate product with Zod schema
  if (!ProductSchema.safeParse(product).success) {
    throw new Error('Invalid product');
  }

  // Calculate average rating (rounded to 1 decimal place)
  const averageRating =
    product.reviews?.length > 0
      ? (
          product.reviews.reduce((acc, review) => acc + review.rating, 0) /
          product.reviews.length
        ).toFixed(1)
      : '0.0';

  return (
    <Card
      className="md:max-w-80 bg-transparent border-none shadow-none"
      role="article"
      aria-label={`Product card for ${product.name}`}>
      <CardContent className="p-0">
        {/* Main container with image and information */}
        <div className="relative bg-card rounded-2xl w-full py-4 pb-10 px-4">
          {/* Product image */}
          <div className="relative w-full h-56">
            <Image
              src={product.image}
              alt={`Image of ${product.name}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 320px"
              className="object-contain"
              priority
            />
          </div>

          {/* Favorite button in top right corner */}
          <FavoriteButton
            productId={product.id}
            className="absolute top-2 right-2"
            aria-label={`Add ${product.name} to favorites`}
          />

          {/* Information bar at bottom of image */}
          <div
            className="w-full px-4 flex items-center justify-between absolute bottom-4 left-1/2 -translate-x-1/2"
            role="group"
            aria-label="Product information">
            {/* Display average rating and number of reviews */}
            <div
              className="flex items-center gap-1"
              role="group"
              aria-label="Rating information">
              <Button
                variant="ghost"
                size="icon"
                className="bg-primary-dark rounded-full size-5 p-3"
                aria-label="Rating star">
                <Star fill="white" className="text-white" />
              </Button>
              <span
                className="text-sm font-medium"
                aria-label={`Rating: ${averageRating} out of 5`}>
                {averageRating}
              </span>
              <span
                className="text-xs text-black/60"
                aria-label={`${product.reviews?.length || 0} reviews`}>
                ({product.reviews?.length || 0})
              </span>
            </div>

            {/* Preparation time */}
            <div
              className="flex items-center gap-1"
              role="group"
              aria-label="Preparation time">
              <span className="text-sm font-medium">
                ~{product.preparationTime}
              </span>
              <span className="text-xs text-black/60"> mins</span>
            </div>
          </div>
        </div>

        {/* Card footer with name and actions */}
        <CardFooter className="flex flex-col gap-2 items-start p-0 mt-4">
          <h2 className="text-md font-medium" id={`product-name-${product.id}`}>
            {product.name}
          </h2>

          {/* Action buttons and price display */}
          <div
            className="w-full flex items-center justify-between gap-1"
            role="group"
            aria-label="Product actions">
            <AddToCartButton product={product} />
            <Button
              data-testid={`product-price-${product.name}`}
              variant={'ghost'}
              className="text-primary-dark"
              aria-label={`Price: ${product.price} euros`}>
              {product.price} €
            </Button>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
