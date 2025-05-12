'use client';

import * as React from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@/app/_components/ui/carousel';
import { Button } from '@/app/_components/ui';
import { Progress } from '@/app/_components/ui/progress';

// Enhance components with motion capabilities
const MotionDiv = motion.create('div');

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

export default function CustomCarousel({
  children,
  buttonSize,
  iconSize,
}: React.PropsWithChildren<{ buttonSize?: string, iconSize?: string }>) {
  // State for carousel API and navigation controls
  const [api, setApi] = React.useState<any>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);
  const [progress, setProgress] = React.useState(0);

  // Navigation handlers
  const scrollPrev = React.useCallback(() => {
    if (api) api.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    if (api) api.scrollNext();
  }, [api]);

  // Update progress based on carousel position
  const onSelect = React.useCallback(() => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());

    // Calculate progress using available API methods
    const currentSlide = api.selectedScrollSnap();
    const totalSlides = React.Children.count(children);

    // Special handling for progress calculation
    let progressValue = 0;
    if (totalSlides > 1) {
      if (!api.canScrollNext()) {
        // If we can't scroll next, we're at the end
        progressValue = 100;
      } else {
        // Calculate normal progress
        const step = 100 / (totalSlides - 1);
        progressValue = Math.round(currentSlide * step);
      }
    }

    setProgress(progressValue);
  }, [api, children]);

  // Setup carousel event listeners
  React.useEffect(() => {
    if (!api) return;

    // Initial state setup
    onSelect();

    // Add event listeners for carousel navigation
    api.on('select', onSelect);
    api.on('reInit', onSelect);

    // Cleanup event listeners on unmount
    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api, onSelect]);

  return (
    <section className="space-y-4 w-full" aria-label="Popular dishes carousel">
      {/* Main Carousel Component */}
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: 'start',
          loop: false,
        }}
        aria-labelledby="carousel-heading"
        role="region">
        {/* Carousel Content */}
        <CarouselContent className="-ml-4">{children}</CarouselContent>
        {/* Hidden default navigation buttons */}
        <CarouselPrevious className="hidden" />
        <CarouselNext className="hidden" />
      </Carousel>

      {/* Navigation Controls - Only shown when scrolling is possible */}

      <MotionDiv
        className="flex justify-end space-x-4 mb-4 z-10 relative px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <div
          className="flex items-center justify-between w-full"
          role="group"
          aria-label="Carousel navigation">
          {/* Previous Button */}
          <Button
            onClick={scrollPrev}
            variant={canScrollPrev ? 'default' : 'ghost'}
            size="icon"
            className={`rounded-full size-10 lg:size-14 bg-[#12BD9B] ${buttonSize} ${
              !canScrollPrev && 'bg-gray-300 cursor-not-allowed'
            }`}
            aria-label="Previous slide"
            tabIndex={0}
            disabled={!canScrollPrev}>
            <ChevronLeft
              className={`text-white size-6 lg:size-8 ${iconSize}`}
              aria-hidden="true"
            />
          </Button>

          {/* Progress Bar */}
          <div className="flex-1 mx-4">
            <Progress value={progress} className="h-1.5 bg-card/60" />
          </div>

          {/* Next Button */}
          <Button
            onClick={scrollNext}
            variant={canScrollNext ? 'default' : 'ghost'}
            size="icon"
            className={`rounded-full size-10 lg:size-14 bg-[#12BD9B] ${buttonSize} ${
              !canScrollNext && 'bg-gray-300 cursor-not-allowed'
            }`}
            aria-label="Next slide"
            disabled={!canScrollNext}>
            <ChevronRight
              className={`text-white size-6 lg:size-8 ${iconSize}`}
              aria-hidden="true"
            />
          </Button>
        </div>
      </MotionDiv>
    </section>
  );
}
