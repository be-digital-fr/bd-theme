"use client"

import { Container } from '@/app/_components/shared';
import { Button } from '@/app/_components/ui';
import { Category } from '@/lib';
import React from 'react';
import { useFilterStore } from '../../../../store/filter-store';

export default function FilterMobile({
  categories,
}: {
  categories: Category[];
}) {
  const { selectedCategory, setSelectedCategory, resetFilter } = useFilterStore();

  return (
    <Container className="md:hidden flex gap-2 overflow-x-auto pb-2">
      <Button
        variant="outline"
        onClick={resetFilter}
        className={`border-primary-dark rounded-full ${
          selectedCategory === null
            ? 'bg-primary-dark text-white'
            : 'text-primary-dark'
        }`}>
        All
      </Button>

      {categories.map((category) => (
        <Button
          key={category.id}
          variant="outline"
          onClick={() => setSelectedCategory(category.name)}
          className={`border-primary-dark rounded-full ${
            selectedCategory === category.name
              ? 'bg-primary-dark text-white'
              : 'text-primary-dark'
          }`}>
          {category.name}
        </Button>
      ))}
    </Container>
  );
}
