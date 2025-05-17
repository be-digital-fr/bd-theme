'use client';

import FilterDesktop from './filter-desktop';
import FilterMobile from './filter-mobile';
import useMediaQuery from '@/app/_hooks/use-media-query';
import { Category } from '@/lib';

export function FilterCategory({ categories }: { categories: Category[] }) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    return <FilterMobile categories={categories} />;
  }

  return <FilterDesktop categories={categories} />;
}

export { FilterDesktop, FilterMobile };
