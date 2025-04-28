"use client";

import * as React from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/_components/ui/carousel";
import { Prisma } from "@/lib";
import { DefaultCard } from "@/app/_components/ui";

// Enhance components with motion capabilities
const MotionCarouselItem = motion.create(CarouselItem);
const MotionDiv = motion.create("div");

/**
 * DishCarousel Component
 *
 * A carousel displaying popular dishes with smooth animations and full accessibility support.
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
  const [api, setApi] = React.useState<any>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);

  const scrollPrev = React.useCallback(() => {
    if (api) api.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    if (api) api.scrollNext();
  }, [api]);

  const onSelect = React.useCallback(() => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, [api]);

  React.useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  return (
    <section className="space-y-4" aria-label="Popular dishes carousel">
      <MotionDiv
        className="flex justify-end space-x-4 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex space-x-4" role="group" aria-label="Carousel navigation">
          <button
            onClick={scrollPrev}
            className={`rounded-full w-10 h-10 md:w-16 md:h-16 flex justify-center items-center ${
              canScrollPrev ? "bg-primary" : "bg-gray-300 cursor-not-allowed"
            }`}
            aria-label="Previous slide"
            tabIndex={0}
            disabled={!canScrollPrev}
          >
            <ChevronLeft className="md:h-10 md:w-10 h-6 w-6 text-white" aria-hidden="true" />
          </button>
          <button
            onClick={scrollNext}
            className={`rounded-full w-10 h-10 md:w-16 md:h-16 flex justify-center items-center ${
              canScrollNext ? "bg-primary" : "bg-gray-300 cursor-not-allowed"
            }`}
            aria-label="Next slide"
            tabIndex={0}
            disabled={!canScrollNext}
          >
            <ChevronRight className="md:h-10 md:w-10 h-6 w-6 text-white" aria-hidden="true" />
          </button>
        </div>
      </MotionDiv>
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: false,
        }}
        aria-labelledby="carousel-heading"
        role="region"
      >
        <CarouselContent className="-ml-4">
          {products.map((product, index) => (
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
        </CarouselContent>
        <CarouselPrevious className="hidden" />
        <CarouselNext className="hidden" />
      </Carousel>
    </section>
  );
}
