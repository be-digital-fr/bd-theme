import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Separator } from '../_components/ui';
import {
  BlogSection,
  Container,
  FeatureWithIcon,
  SectionHeading,
  TestimonialSection,
} from '../_components/shared';
import { cn } from '../_lib';
import { Category, Prisma } from '@/lib';
import ProductCarousel from './_components/product-carrousel';
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from '../_components/animation/fade-in';
import { ScaleIn } from '../_components/animation';
import CategoryCarrousel from './_components/category-carrousel';
import CategoryCard from './_components/category-card';
import { WordsPullUp } from '../_components/animation';

export const metadata: Metadata = {
  title: 'Eat a Box - The best way to eat a box',
  description: 'Eat a Box is the best way to eat a box',
};

async function fetchData(url: string) {
  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });
    if (!response.ok) {
      console.error(`Error fetching ${url}:`, response.statusText);
      return null;
    }
    return response.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return null;
  }
}

export default async function Home() {
  const [productsData, vegetarianProductsData, categoriesData] = await Promise.all([
    fetchData(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/product`),
    fetchData(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/filter?categoryName=vegetarian`),
    fetchData(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/category`),
  ]);

  console.log(productsData);
  return (
    <>
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute z-50 bg-white text-primary px-4 py-2 rounded shadow"
        tabIndex={0}>
        Skip to main content
      </a>
      <main
        id="main-content"
        role="main"
        className="space-y-16 md:space-y-24 mt-20">
        {/* Hero section */}
        <section
          className="relative overflow-hidden mt-4 md:rounded-2xl max-[380px]:h-[120vh] h-screen md:h-[70vh]"
          role="banner"
          aria-label="Hero section showcasing healthy food">
          {/* Image responsive en background */}
          <Image
            src="/images/banner/background-mobile.png"
            alt="Burger eating a box"
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover object-center md:hidden"
            priority
            aria-hidden="true"
          />
          <Image
            src="/images/banner/background-desktop.png"
            alt="Burger eating a box"
            fill
            sizes="(min-width: 768px) 100vw, 100vw"
            className="object-cover object-center hidden md:block"
            priority
            aria-hidden="true"
          />
          <Container
            className={cn(
              'absolute flex flex-col items-center justify-center md:items-start md:justify-start gap-10 max-w-lg sm:max-w-xl lg:max-w-4xl',
              'top-10 left-1/2 -translate-x-1/2',
              'sm:top-1/2 sm:-translate-y-1/2 sm:left-72',
              'lg:top-1/2 lg:-translate-y-1/2 lg:left-[28rem]'
            )}
            role="presentation">
            <StaggerContainer className=" text-center md:text-left text-white space-y-4">
              <StaggerItem
                as="h1"
                className="text-5xl md:text-[6vw] lg:text-7xl font-bold leading-tight">
                Healthy Food Made Easy!
              </StaggerItem>
              <StaggerItem as="p" className="text-lg text-primary-foreground">
                Fresh meals from your favorite restaurants, delivered to your
                door or ready for pickup.
              </StaggerItem>
            </StaggerContainer>

            <FadeIn
              delay={1.2}
              aria-label="Main actions"
              className="w-full grid grid-cols-2 gap-4 max-w-md ">
              <Button
                size="lg"
                aria-label="Order Now"
                className="focus:ring-2 focus:ring-offset-2 focus:ring-primary min-w-[48px] min-h-[48px]">
                <Link href="/menu">Order Now</Link>
              </Button>

              <Button
                asChild
                variant="tertiary"
                size="lg"
                aria-label="Browse Menu"
                className="focus:ring-2 focus:ring-offset-2 focus:ring-primary min-w-[48px] min-h-[48px]">
                <Link href="/menu">Browse Menu</Link>
              </Button>
            </FadeIn>
          </Container>
        </section>

        {/* Features section */}
        <Container>
          <StaggerContainer className="grid grid-cols-2 gap-4 md:grid-cols-5 mt-10">
            <FeatureWithIcon
              icon="/icons/fast.svg"
              title="Fast & Reliable Delivery"
            />
            <FeatureWithIcon
              icon="/icons/secure.svg"
              title="Secure Multiple Payment"
              className="md:hidden"
            />
            <FeatureWithIcon
              icon="/icons/secure.svg"
              title="Secure Payment"
              className="hidden md:flex"
            />
            <FeatureWithIcon
              icon="/icons/healthy.svg"
              title="Healthy & Fresh Ingredients"
            />
            <FeatureWithIcon
              icon="/icons/click-and-collect.svg"
              title="Click & Collect"
            />
            <FeatureWithIcon
              icon="/icons/card.svg"
              title="Multiple Payment"
              className="hidden md:flex"
            />
          </StaggerContainer>
        </Container>

        {/* Separator */}
        <Separator className="my-10 bg-card data-[orientation=horizontal]:h-[0.1rem]" />

        {/* Best sellers section */}
        <Container className="space-y-10">
          <SectionHeading
            title="Explore Top Restaurants & Trending Meals"
            link="/menu"
          />

          <ProductCarousel products={productsData || []} />
        </Container>

        {/* Vegetarian section */}
        <Container className="space-y-10">
          <SectionHeading
            title="Explore Top Vegetarian Meals"
            link="/menu?categoryName=vegetarian"
          />

          <ProductCarousel products={vegetarianProductsData?.products || []} />
        </Container>

        {/* Categories section */}
        <section className="bg-section-background md:rounded-4xl p-4 py-16 relative">
          <Container as="div">
            <WordsPullUp
              containerClassName="justify-start mb-6 md:mb-0"
              className="text-2xl md:text-4xl font-medium "
              text="Best Categories We Have"
            />

            <div className="hidden md:grid grid-cols-2 gap-4 lg:grid-cols-4 mt-10">
              {categoriesData?.map((category: Category, index: number) => (
                <ScaleIn key={category.id} delay={index * 0.1}>
                  <CategoryCard category={category} />
                </ScaleIn>
              ))}
            </div>

            <div className="md:hidden">
              <CategoryCarrousel categories={categoriesData || []} />
            </div>
          </Container>

          <Image
            src="/images/decoration-left-shape.svg"
            sizes="(max-width: 768px) 100vw, 100vw"
            alt="Decoration left shape"
            width={200}
            height={200}
            className="absolute bottom-20 -left-6"
          />
          <Image
            src="/images/decoration-right-shape.svg"
            sizes="(max-width: 768px) 100vw, 100vw"
            alt="Decoration right shape"
            width={400}
            height={400}
            className="absolute top-16 right-0"
          />
        </section>

        {/* Promotional section */}
        <Container className="h-[500px]">
          <div className="h-full flex flex-col-reverse text-center md:text-left md:grid md:grid-cols-[0.7fr_1fr] gap-4 bg-[#D7E5D6] rounded-4xl p-4 md:p-8 ">
            <div className="flex flex-col gap-4 justify-between items-center md:items-start pl-6">
              <h2 className="text-2xl text-primary md:text-4xl font-medium leading-snug">
                Delicious Healthy. & Affordable Meals Delivered.
              </h2>

              <Button size="lg" className="w-fit px-8 rounded-full" asChild>
                <Link href="/menu">View Our Menu</Link>
              </Button>
            </div>

            <div className="relative w-full h-full rounded-4xl overflow-hidden ">
              <Image
                src="/images/promotional-image.png"
                sizes="(max-width: 768px) 100vw, 100vw"
                alt="Promotional image"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Container>

        {/* Testimonials section */}
        <TestimonialSection />

        {/* Blog section */}
        <BlogSection />
      </main>
    </>
  );
}
