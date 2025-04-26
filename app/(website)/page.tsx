import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Separator } from '../_components/ui';
import { Container, FeatureWithIcon } from '../_components/shared';
import { cn } from '../_lib';

export const metadata: Metadata = {
  title: 'Eat a Box - The best way to eat a box',
  description: 'Eat a Box is the best way to eat a box',
};

export default function Home() {
  return (
    <>
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute z-50 bg-white text-primary px-4 py-2 rounded shadow"
        tabIndex={0}>
        Skip to main content
      </a>
      <main id="main-content" role="main">
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
            <div className=" text-center md:text-left text-white space-y-4">
              <h1 className="text-5xl md:text-[6vw] lg:text-7xl font-bold leading-tight">
                Healthy Food Made Easy!
              </h1>
              <p className="text-lg text-primary-foreground">
                Fresh meals from your favorite restaurants, delivered to your
                door or ready for pickup.
              </p>
            </div>

            <nav
              aria-label="Main actions"
              className="w-full grid grid-cols-2 gap-4 max-w-md ">
              <Button
                asChild
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
            </nav>
          </Container>
        </section>

        {/* Features section */}
        <Container className="grid grid-cols-2 gap-4 md:grid-cols-5 mt-10">
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
        </Container>

        {/* Separator */}
        <Separator className="my-10 bg-card data-[orientation=horizontal]:h-[0.1rem]" />

        {/* Testimonials section */}
        <Container>
          <h2 className="text-2xl font-bold">Testimonials</h2>
        </Container>
      </main>
    </>
  );
}
