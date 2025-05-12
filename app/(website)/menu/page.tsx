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
import { FilterDesktop, FilterMobile } from './_components/filter-category';
import { ProductPagination } from './_components/products/product-pagination';

// Data imports
import { partners } from '../about/_components/hero/data';

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
export default async function MenuPage() {
  // Fetch categories and products data in parallel
  const [categoriesData, productsData] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/category`).then(
      (res) => res.json()
    ),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/product`).then((res) =>
      res.json()
    ),
  ]);

  return (
    <main className="mt-28 space-y-10" role="main" aria-label="Menu page">
      <Container
        maxWidth="md"
        className="space-y-4 flex flex-col justify-center items-center text-center">
        <WordsPullUp
          text="Our menu"
          className="text-2xl md:text-4xl font-medium text-primary-dark"
          aria-level={1}
        />

        <p className="text-base" role="contentinfo">
          Lorem ipsum dolor sit amet consectetur adipiscing elit ugue quam diam
          vitae velit bibendum elementum dolor.
        </p>
      </Container>

      <FilterDesktop categories={categoriesData} />
      <FilterMobile categories={categoriesData} />

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
