// React and Next.js imports
import Image from 'next/image';

// Components imports
import { WordsPullUp } from '@/app/_components/animation';
import {
  BlogSection,
  Container,
  OrderViaApp,
  TestimonialSection,
} from '@/app/_components/shared';
import { Button } from '@/app/_components/ui';
import {
  ProductPagination,
  ProductPaginationProps,
} from './_components/products/product-pagination';

// Data imports
import { catchError } from '@/utils';
import { Category } from '@/lib';
import { Metadata } from 'next';
import { FilterCategory } from './_components/filter-category';
import { Suspense } from 'react';
import LoadingFilter from './_components/filter-category/loading-filter';
import Link from 'next/link';

/**
 * MenuPage Component
 *
 * Renders the main menu page with:
 * - Hero section with title and description
 * - Category filters (desktop and mobile versions)
 * - Paginated product list
 * - Order via app section with partner logos
 * - Testimonials and blog sections
 */

export const metadata: Metadata = {
  title: 'Eat a Box - Menu',
  description:
    'Discover our delicious menu featuring fresh burgers, pizzas, desserts and more. Order online for delivery or pickup from Eat a Box - Your favorite local restaurant.',
};

const fetchCategories = async () => {
  const [error, data] = await catchError(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/category`).then(
      async (res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      }
    )
  );

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data as Category[];
};

interface ProductResponse {
  data: any[];
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

const fetchProducts = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product`,
      {
        next: { revalidate: 3600 },
        cache: 'force-cache',
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as ProductResponse;

    return {
      data: data?.data || [],
      pagination: {
        total: data?.pagination?.total || 0,
        totalPages: data?.pagination?.totalPages || 0,
        currentPage: data?.pagination?.currentPage || 1,
        limit: data?.pagination?.limit || 10,
        hasNextPage: data?.pagination?.hasNextPage || false,
        hasPreviousPage: data?.pagination?.hasPreviousPage || false,
      },
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      data: [],
      pagination: {
        total: 0,
        totalPages: 0,
        currentPage: 1,
        limit: 10,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }
};

export default async function MenuPage() {
  // Fetch categories and products data in parallel
  const [categoriesData, productsData] = await Promise.all([
    fetchCategories(),
    fetchProducts(),
  ]);

  // Ensure we have default values
  const categories = categoriesData || [];
  const products = {
    data: productsData?.data || [],
    pagination: {
      total: productsData?.pagination?.total || 0,
      totalPages: productsData?.pagination?.totalPages || 0,
      currentPage: productsData?.pagination?.currentPage || 1,
      limit: productsData?.pagination?.limit || 10,
      hasNextPage: productsData?.pagination?.hasNextPage || false,
      hasPreviousPage: productsData?.pagination?.hasPreviousPage || false,
    },
  };

  return (
    <main className="mt-28 space-y-10" role="main" aria-label="Menu page">
      <Container
        maxWidth="md"
        className="space-y-4 flex flex-col justify-center items-center text-center">
        <h1>
          <WordsPullUp
            text="Our menu"
            className="text-2xl md:text-4xl font-medium text-primary-dark"
            aria-level={1}
          />
        </h1>

        <p className="text-base" role="contentinfo">
          Lorem ipsum dolor sit amet consectetur adipiscing elit ugue quam diam
          vitae velit bibendum elementum dolor.
        </p>
      </Container>

      <Suspense fallback={<LoadingFilter />}>
        <FilterCategory categories={categories} />
      </Suspense>

      <Container>
        <ProductPagination initialData={products} />
      </Container>

      <OrderViaApp />

      <TestimonialSection />

      <BlogSection />
    </main>
  );
}
