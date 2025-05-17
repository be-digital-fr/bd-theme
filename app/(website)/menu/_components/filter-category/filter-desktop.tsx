'use client';

import { Container } from '@/app/_components/shared';
import { CustomCarousel } from '@/app/_components/ui';
import { CarouselItem } from '@/app/_components/ui/carousel';
import { Category } from '@/lib';
import Image from 'next/image';
import React from 'react';
import { useFilterStore } from '../../../../store/filter-store';
import { Button } from '@/app/_components/ui';
import { cn } from '@/app/_lib';
import { WordsPullUp } from '@/app/_components/animation';

/**
 * FilterDesktop Component
 *
 * A responsive component that displays category filters in a carousel format for desktop view.
 * Optimized with React.memo to prevent unnecessary re-renders when props haven't changed.
 *
 * @param {Object} props
 * @param {Category[]} props.categories - Array of category objects to display
 */
const FilterDesktop = React.memo(
  ({ categories }: { categories: Category[] }) => {
    const { selectedCategories, toggleCategory, resetFilter } =
      useFilterStore();

    return (
      <Container className="hidden md:block space-y-4">
        <div className="flex justify-between items-center">
          <CustomCarousel
            buttonSize="md:size-6 lg:size-6"
            iconSize="md:size-8/10 lg:size-8/10">
            {categories?.map((category) => (
              <CarouselItem
                key={category.id}
                className="basis-1/10 cursor-pointer">
                <FilterItem
                  className="w-10"
                  key={category.id}
                  category={category}
                  isSelected={selectedCategories.includes(category.name)}
                  onClick={() => toggleCategory(category.name)}
                />
              </CarouselItem>
            ))}
          </CustomCarousel>

          {selectedCategories.length > 0 && (
            <Button
              variant="outline"
              onClick={resetFilter}
              className="text-sm text-primary-dark hover:bg-primary-dark hover:text-white">
              Reset Filter
            </Button>
          )}
        </div>
      </Container>
    );
  }
);

FilterDesktop.displayName = 'FilterDesktop';

/**
 * FilterItem Component
 *
 * A memoized component that renders individual category items in the filter carousel.
 * Each item displays a category image and name.
 *
 * @param {Object} props
 * @param {Category} props.category - Category object containing image and name
 * @param {string} props.className - Additional CSS classes for styling
 * @param {boolean} props.isSelected - Indicates if the item is selected
 * @param {function} props.onClick - Callback function to handle item selection
 */
const FilterItem = React.memo(
  ({
    category,
    className,
    isSelected,
    onClick,
  }: {
    category: Category;
    className: string;
    isSelected: boolean;
    onClick: () => void;
  }) => {
    return (
      <div
        data-testid={`filter-item-${category.name}`}
        className={`ml-2 py-4 flex flex-col items-center gap-2 ${className}`}
        onClick={onClick}>
        <div
          data-testid={`filter-item-child-${category.name}`}
          className={cn(isSelected && 'ring-2 ring-accent rounded-full p-1')}>
          <div className={'relative h-10 w-10'}>
            <Image
              src={category.image as string}
              alt={category.name}
              fill
              className={cn('object-cover')}
            />
          </div>
        </div>

        <h3
          aria-label={category.name}
          aria-level={3}
          title={`category-${category.name}`}
          className={cn('text-sm', isSelected && 'text-accent font-medium')}>
          {category.name}
        </h3>
      </div>
    );
  }
);

FilterItem.displayName = 'FilterItem';

export default FilterDesktop;
