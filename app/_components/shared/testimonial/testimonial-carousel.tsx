'use client';

import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/app/_components/ui/carousel';
import { WordsPullUp } from '@/app/_components/animation/pull-up';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

// TestimonialCarousel component displays client testimonials in a carousel with navigation
// Implements keyboard navigation, ARIA roles, and responsive design for accessibility

// Données fictives pour les témoignages
const testimonials = [
  {
    author: 'Alice Dupont',
    content: 'Service exceptionnel, je recommande vivement !',
    job: 'CEO, Entreprise X',
    image: '/images/testimonials/avatar1.jpg',
  },
  {
    author: 'Jean Martin',
    content: "Une équipe à l'écoute et très professionnelle.",
    job: 'CTO, Startup Y',
    image: '/images/testimonials/avatar2.jpg',
  },
  {
    author: 'Sophie Bernard',
    content: 'Résultats impressionnants en un temps record.',
    job: 'CMO, Agence Z',
    image: '/images/testimonials/avatar3.jpg',
  },
];

export default function TestimonialCarousel() {
  // State for carousel API and navigation controls
  const [api, setApi] = React.useState<any>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);

  // Handlers for carousel navigation
  const scrollPrev = React.useCallback(() => {
    if (api) api.scrollPrev();
  }, [api]);
  const scrollNext = React.useCallback(() => {
    if (api) api.scrollNext();
  }, [api]);

  // Update navigation state on carousel events
  const onSelect = React.useCallback(() => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, [api]);

  React.useEffect(() => {
    if (!api) return;
    onSelect();
    api.on('select', onSelect);
    api.on('reInit', onSelect);
    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api, onSelect]);

  // Current testimonial index for indicator
  const currentTestimonial = api?.selectedScrollSnap() + 1;

  // Format indicator number with leading zero
  function formatNumber(n: number | undefined) {
    if (n && n >= 1 && n <= 9) {
      return '0' + n;
    }
    return n?.toString();
  }

  return (
    <section
      className="w-full space-y-6"
      aria-label="Témoignages clients carousel">
      {/* Animated title and navigation controls */}
      <div className="flex items-center justify-between gap-4 mb-2">
        <WordsPullUp
          text="Customer Testimonials"
          containerClassName="justify-start mb-6 md:mb-0 max-w-xs"
          className="text-2xl md:text-4xl font-medium"
        />
        <div
          className="flex items-center gap-4"
          role="group"
          aria-label="Navigation du carousel">
          {/* Previous slide button, disabled if at start */}
          <button
            onClick={scrollPrev}
            className={`rounded-full w-14 h-10 flex justify-center items-center focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
              canScrollPrev ? 'bg-primary' : 'bg-gray-300 cursor-not-allowed'
            }`}
            aria-label="Slide précédente"
            tabIndex={0}
            disabled={!canScrollPrev}>
            <ChevronLeft className="h-6 w-6 text-white" aria-hidden="true" />
          </button>

          {/* Indicator for current testimonial number */}
          <div className="hidden md:block text-xs text-muted-foreground font-semibold">
            <span className="text-primary">
              {formatNumber(currentTestimonial)}
            </span>{' '}
            / {formatNumber(testimonials.length)}
          </div>

          {/* Next slide button, disabled if at end */}
          <button
            onClick={scrollNext}
            className={`rounded-full w-14 h-10 flex justify-center items-center focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
              canScrollNext ? 'bg-primary' : 'bg-gray-300 cursor-not-allowed'
            }`}
            aria-label="Slide suivante"
            tabIndex={0}
            disabled={!canScrollNext}>
            <ChevronRight className="h-6 w-6 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>
      {/* Carousel content with testimonials */}
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{ align: 'start', loop: false }}
        aria-labelledby="carousel-heading"
        role="region">
        <CarouselContent>
          {testimonials.map((t, i) => (
            <CarouselItem
              key={i}
              className="flex flex-col justify-center p-6 min-h-52">
              {/* Testimonial text and author info */}
              <p className="text-xl font-medium mb-4 font-plus-jakarta-sans">
                “{t.content}”
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full overflow-hidden relative">
                  <Image
                    src={t.image}
                    alt={`Photo de ${t.author}`}
                    fill
                    className="object-cover"
                    sizes="100%"
                  />
                </div>
                <h4 className="text-sm font-semibold">
                  {t.author}
                </h4>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
