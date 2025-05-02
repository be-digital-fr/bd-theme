"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { CarouselItem } from "@/app/_components/ui/carousel";
import { CustomCarousel } from "@/app/_components/ui";
import { DefaultCard } from "@/app/_components/ui";
import { Prisma } from "@/lib";

// Enhance components with motion capabilities
const MotionCarouselItem = motion.create(CarouselItem);

/**
 * ProductCarousel Component
 *
 * A carousel displaying products with smooth animations and full accessibility support.
 * Features:
 * - Responsive design
 * - Keyboard navigation
 * - Screen reader support
 * - Motion animations
 */
type Product = Prisma.ProductGetPayload<{
  include: {
    reviews: true;
  };
}>;

export default function ProductCarousel({ products }: { products: Product[] }) {
  return (
    <CustomCarousel>
      {products?.map((product, index) => (
        <MotionCarouselItem
          key={product.id}
          className="pl-4 basis-full md:basis-1/3"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          role="group"
          aria-label={`product ${index + 1} of ${products.length}`}
        >
          <DefaultCard product={product} />
        </MotionCarouselItem>
      ))}
    </CustomCarousel>
  );
}
