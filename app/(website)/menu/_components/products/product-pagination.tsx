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
import { Prisma } from '@/lib';
import { useFilterStore } from '../../../../store/filter-store';
import { ProductType } from '@/app/types/Product.type';

/**
 * Type definition for a Product with its relations
 * @typedef {Object} Product
 * @property {string} id - Unique identifier of the product
 * @property {string} name - Product name
 * @property {string} description - Product description
 * @property {number} price - Product price
 * @property {string} image - Product image URL
 * @property {Review[]} reviews - Array of product reviews
 */
type Product = Prisma.ProductGetPayload<{
  include: {
    reviews: true;
  };
}>;

/**
 * Props for the ProductPagination component
 * @typedef {Object} ProductPaginationProps
 * @property {Object} initialData - Initial data for the products and pagination
 * @property {Product[]} initialData.data - Array of products
 * @property {Object} initialData.pagination - Pagination metadata
 */
export type ProductPaginationProps = {
  initialData: {
    data: Product[];
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

/**
 * Fetches products from the API with pagination and category filtering
 * @param {number} page - Current page number
 * @param {string[]} categories - Array of category names for filtering
 * @returns {Promise<Object>} Products data with pagination metadata
 */
const fetchProducts = async (page: number, categories?: string[]) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/product`);
  url.searchParams.set('page', page.toString());
  if (categories && categories.length > 0) {
    url.searchParams.set('categories', categories.join(','));
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

/**
 * ProductPagination Component
 *
 * A client-side component that displays a paginated grid of products with category filtering.
 * Uses React Query for data fetching and caching, and nuqs for URL state management.
 *
 * @param {ProductPaginationProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
export function ProductPagination({ initialData }: ProductPaginationProps) {
  const productsContainerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useQueryState('page', {
    defaultValue: '1',
    parse: (value) => value,
    serialize: (value) => value,
  });
  const { selectedCategories } = useFilterStore();

  const currentPage = parseInt(page);

  // Fetch products with React Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', currentPage, selectedCategories],
    queryFn: () => fetchProducts(currentPage, selectedCategories),
    initialData: selectedCategories.length === 0 ? initialData : undefined,
    placeholderData: initialData,
  });

  /**
   * Handles page change with smooth scroll to products container
   * @param {number} newPage - New page number
   */
  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage.toString());
      if (productsContainerRef.current) {
        const offset = 100;
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

  // Generate pagination items array
  const paginationItems = useMemo(() => {
    if (!data?.pagination) return [];
    return Array.from({ length: data.pagination.totalPages }, (_, i) => i + 1);
  }, [data?.pagination]);

  return (
    <div ref={productsContainerRef} className="space-y-8">
      {isLoading ? (
        <div className="space-y-4">
          <div role="status" className="sr-only">Loading products...</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-200 rounded-lg h-64"
              />
            ))}
          </div>
        </div>
      ) : isError ? (
        <div className="text-center text-red-500">
          Error loading products. Please try again later.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.data.map((product: ProductType) => (
              <DefaultCard key={product.id} product={product} />
            ))}
          </div>

          {data.pagination.totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (data.pagination.hasPreviousPage) {
                        handlePageChange(currentPage - 1);
                      }
                    }}
                    className={
                      !data.pagination.hasPreviousPage
                        ? 'pointer-events-none opacity-50'
                        : ''
                    }
                  />
                </PaginationItem>

                {paginationItems.map((pageNumber) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(pageNumber);
                      }}
                      isActive={pageNumber === currentPage}>
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (data.pagination.hasNextPage) {
                        handlePageChange(currentPage + 1);
                      }
                    }}
                    className={
                      !data.pagination.hasNextPage
                        ? 'pointer-events-none opacity-50'
                        : ''
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
}
