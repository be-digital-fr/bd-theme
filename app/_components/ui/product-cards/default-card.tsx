import Image from "next/image";
import { Star } from "lucide-react";
import { z } from "@zod/mini";

import { Prisma } from "@/lib";
import { Card, CardContent, CardFooter } from "../card";
import { Button } from "../button";
import FavoriteButton from "./favorite-icon";

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
type Product = z.infer<typeof ProductSchema>;

/**
 * DefaultCard Component - Displays a product card with image, rating and price
 * @param {Product} product - The product data to display
 * @throws {Error} If product doesn't match validation schema
 */
export default function DefaultCard({ product }: Product) {
  // Validate product with Zod schema
  if (!ProductSchema.safeParse(product).success) {
    throw new Error("Invalid product");
  }

  // Calculate average rating (rounded to 1 decimal place)
  const averageRating =
    product.reviews?.length > 0
      ? (
          product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <Card className="max-w-80 bg-transparent border-none shadow-none">
      <CardContent className="p-0">
        {/* Main container with image and information */}
        <div className="relative bg-card rounded-2xl w-full py-4 pb-10 px-4">
          {/* Product image */}
          <div className="relative w-full h-56">
            <Image src={product.image} alt={product.name} fill objectFit="contain" />
          </div>

          {/* Favorite button in top right corner */}
          <FavoriteButton productId={product.id} className="absolute top-2 right-2" />

          {/* Information bar at bottom of image */}
          <div className="w-full px-4 flex items-center justify-between absolute bottom-4 left-1/2 -translate-x-1/2">
            {/* Display average rating and number of reviews */}
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="bg-primary rounded-full size-5 p-3">
                <Star fill="white" className="text-white" />
              </Button>
              <span className="text-sm font-medium">{averageRating}</span>
              <span className="text-xs text-muted-foreground">
                ({product.reviews?.length || 0})
              </span>
            </div>

            {/* Preparation time */}
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">~{product.preparationTime}</span>
              <span className="text-xs text-muted-foreground"> mins</span>
            </div>
          </div>
        </div>

        {/* Card footer with name and actions */}
        <CardFooter className="flex flex-col gap-2 items-start p-0 mt-4">
          <h2 className="text-md font-medium">{product.name}</h2>

          {/* Action buttons and price display */}
          <div className="w-full flex items-center justify-between gap-1">
            <Button size={"sm"} className="rounded-full">
              Add to cart
            </Button>
            <Button variant={"ghost"} className="text-primary">
              {product.price} €
            </Button>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
