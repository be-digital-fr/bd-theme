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
 * CustomCarousel Component
 *
 * A reusable carousel component with smooth animations and full accessibility support.
 *
 * Features:
 * - Responsive design with mobile-first approach
 * - Keyboard navigation support
 * - Screen reader compatibility
 * - Motion animations for enhanced UX
 * - Custom navigation controls
 * - Auto-hiding navigation based on scroll position
 *
 * Props:
 * @param {React.PropsWithChildren} children - Content to be displayed in carousel slides
 */
type Product = Prisma.ProductGetPayload<{
  include: {
    reviews: true;
  };
}>;

export default function CustomCarousel({ children }: React.PropsWithChildren) {
  // State for carousel API and navigation controls
  const [api, setApi] = React.useState<any>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);

  // Navigation handlers
  const scrollPrev = React.useCallback(() => {
    if (api) api.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    if (api) api.scrollNext();
  }, [api]);

  // Update navigation state based on carousel position
  const onSelect = React.useCallback(() => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, [api]);

  // Setup carousel event listeners
  React.useEffect(() => {
    if (!api) return;

    // Initial state setup
    onSelect();

    // Add event listeners for carousel navigation
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    // Cleanup event listeners on unmount
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  return (
    <section className="space-y-4" aria-label="Popular dishes carousel">
      {/* Navigation Controls - Only shown when scrolling is possible */}

      <MotionDiv
        className="flex justify-end space-x-4 mb-4 z-[100] relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex space-x-4" role="group" aria-label="Carousel navigation">
          {/* Previous Button */}
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
          {/* Next Button */}
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

      {/* Main Carousel Component */}
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
        {/* Carousel Content */}
        <CarouselContent className="-ml-4">{children}</CarouselContent>
        {/* Hidden default navigation buttons */}
        <CarouselPrevious className="hidden" />
        <CarouselNext className="hidden" />
      </Carousel>
    </section>
  );
}
