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

const fetchProducts = async () => {
  const [error, data] = await catchError(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/product`).then(
      async (res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      }
    )
  );

  if (error) {
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

  return data as ProductPaginationProps['initialData'];
};

export default async function MenuPage() {
  // Fetch categories and products data in parallel
  const [categoriesData, productsData] = await Promise.all([
    fetchCategories(),
    fetchProducts(),
  ]);

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
        <FilterCategory categories={categoriesData} />
      </Suspense>

      <Container>
        <ProductPagination initialData={productsData} />
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

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-10"
          role="list"
          aria-label="Food delivery partners">
          {partners.map((partner) => (
            <Button
              variant="outline"
              aria-label={partner.alt}
              role="listitem"
              key={partner.alt}
              className="w-full h-24 bg-white">
              <Image
                src={partner.src}
                alt={partner.alt}
                width={100}
                height={100}
              />
            </Button>
          ))}
        </div>
      </Container>

      <TestimonialSection />

      <BlogSection />
    </main>
  );
}
