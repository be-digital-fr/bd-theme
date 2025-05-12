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
type ProductPaginationProps = {
  initialData?: {
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
 * @param {string|null} categorySlug - Optional category slug for filtering
 * @returns {Promise<Object>} Products data with pagination metadata
 */
const fetchProducts = async (page: number, categorySlug?: string | null) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/product`);
  url.searchParams.set('page', page.toString());
  if (categorySlug) {
    url.searchParams.set('category', categorySlug);
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
  const { selectedCategory } = useFilterStore();

  const currentPage = parseInt(page);

  // Fetch products with React Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', currentPage, selectedCategory],
    queryFn: () => fetchProducts(currentPage, selectedCategory),
    initialData: selectedCategory === null ? initialData : undefined,
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
        const elementPosition = productsContainerRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    },
    [setPage]
  );

  // Generate pagination items array
  const paginationItems = useMemo(() => {
    if (!data?.pagination) return [];
    return Array.from(
      { length: data.pagination.totalPages },
      (_, i) => i + 1
    );
  }, [data?.pagination]);

  if (isLoading) {
    return (
      <div role="status" aria-label="Loading products">
        <div className="animate-pulse space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div role="alert" className="text-center py-10">
        <p className="text-lg text-red-600">
          Une erreur est survenue lors du chargement des produits
        </p>
      </div>
    );
  }

  if (data.data.length === 0) {
    return (
      <div role="status" className="text-center py-10">
        <p className="text-lg text-gray-600">
          Aucun produit trouvé pour cette catégorie
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8" role="region" aria-label="Liste des produits">
      <div 
        ref={productsContainerRef} 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        role="list"
        aria-label="Grille de produits">
        {data.data.map((product: Product) => (
          <div key={product.id} role="listitem">
            <DefaultCard product={product} />
          </div>
        ))}
      </div>

      <nav aria-label="Pagination des produits">
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
                aria-disabled={!data.pagination.hasPreviousPage}
                aria-label="Page précédente"
              />
            </PaginationItem>

            {paginationItems.map((pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(pageNum)}
                  isActive={pageNum === currentPage}
                  aria-current={pageNum === currentPage ? 'page' : undefined}
                  aria-label={`Page ${pageNum}`}>
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
                aria-disabled={!data.pagination.hasNextPage}
                aria-label="Page suivante"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </nav>
    </div>
  );
}
