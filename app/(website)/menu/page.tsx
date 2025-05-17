// React and Next.js imports
import Image from 'next/image';

// Components imports
import { WordsPullUp } from '@/app/_components/animation';
import {
  BlogSection,
  Container,
  TestimonialSection,
} from '@/app/_components/shared';
import { Button } from '@/app/_components/ui';
import {
  ProductPagination,
  ProductPaginationProps,
} from './_components/products/product-pagination';

// Data imports
import { partners } from '../about/_components/hero/data';
import { catchError } from '@/utils';
import { Category } from '@/lib';
import { Metadata } from 'next';
import { FilterCategory } from './_components/filter-category';
import { Suspense } from 'react';
import LoadingFilter from './_components/filter-category/loading-filter';

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
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/category`, {
      next: { revalidate: 3600 },
      cache: 'force-cache'
    });
    
    if (!response.ok) {
      console.error('Error fetching categories:', response.statusText);
      return [];
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

const fetchProducts = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/product`, {
      next: { revalidate: 3600 },
      cache: 'force-cache'
    });
    
    if (!response.ok) {
      console.error('Error fetching products:', response.statusText);
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
    
    return response.json();
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
  const products = productsData || {
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

      <Container className="space-y-4 flex flex-col justify-center items-center text-center">
        <WordsPullUp
          text="Order via app"
          className="text-2xl md:text-4xl font-medium text-primary-dark"
          aria-level={2}
        />

        <p className="text-base max-w-md" role="contentinfo">
          Lorem ipsum dolor sit amet consectetur adipiscing elit ugue quam diam
          vitae velit bibendum elementum dolor.
        </p>

        <ul
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-10"
          aria-label="Food delivery partners">
          {partners.map((partner) => (
            <li key={partner.alt}>
              <Button
                variant="outline"
                aria-label={partner.alt}
                className="w-full h-24 bg-white">
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={100}
                  height={100}
                />
              </Button>
            </li>
          ))}
        </ul>
      </Container>

      <TestimonialSection />

      <BlogSection />
    </main>
  );
}
