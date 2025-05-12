'use client';

import { useQuery } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';
import { useCallback, useMemo, useRef } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/app/_components/ui';
import { DefaultCard } from '@/app/_components/ui';
import { ProductType } from '@/app/types/Product.type';



type ProductPaginationProps = {
  initialData?: {
    data: ProductType[];
    pagination: {
      total: number;
      totalPages: number;
      currentPage: number;
      limit: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
};

const fetchProducts = async (page: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product?page=${page}`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export function ProductPaginationClient({
  initialData,
}: ProductPaginationProps) {
  const productsContainerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useQueryState('page', {
    defaultValue: '1',
    parse: (value) => value,
    serialize: (value) => value,
  });

  const currentPage = parseInt(page);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', currentPage],
    queryFn: () => fetchProducts(currentPage),
    initialData,
    placeholderData: initialData,
  });

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage.toString());
      // Scroll to top of products container with smooth behavior and offset
      if (productsContainerRef.current) {
        const offset = 100; // Ajustez cette valeur selon vos besoins
        const elementPosition =
          productsContainerRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    },
    [setPage]
  );

  const paginationItems = useMemo(() => {
    if (!data?.pagination) return [];
    return Array.from({ length: data.pagination.totalPages }, (_, i) => i + 1);
  }, [data?.pagination]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <div className="space-y-8">
      <div
        ref={productsContainerRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.data.map((product: ProductType) => (
          <DefaultCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination className="mt-8 justify-normal">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(currentPage - 1)}
              className={
                !data.pagination.hasPreviousPage
                  ? 'pointer-events-none opacity-50'
                  : ''
              }
            />
          </PaginationItem>

          {paginationItems.map((pageNum) => (
            <PaginationItem key={pageNum}>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(pageNum)}
                isActive={pageNum === currentPage}>
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
              className={
                !data.pagination.hasNextPage
                  ? 'pointer-events-none opacity-50'
                  : ''
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
