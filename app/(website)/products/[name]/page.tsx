import { Star } from 'lucide-react';
import Image from 'next/image';

import { WordsPullUp } from '@/app/_components/animation';
import { Container, OrderViaApp, TestimonialSection } from '@/app/_components/shared';
import { Button, Separator } from '@/app/_components/ui';
import FavoriteButton from '@/app/_components/ui/product-cards/favorite-icon';
import { IProduct } from '@/app/types/Product.type';
import { catchError, unslugify } from '@/utils';
import { PickedForYou } from "@/features/picked-for-you";

async function getProduct(name: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/${name}`,
    {
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }

  return response.json();
}

export default async function page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  // unslugify the product name
  const unslugifiedName = unslugify(name);

  const [error, result] = await catchError(getProduct(unslugifiedName));

  if (error) {
    return;
  }

  const product = result as IProduct;
  console.log('====================================');
  console.log(product);
  console.log('====================================');

  return (
    <main
      className="mt-20 space-y-10"
      aria-label={`Product details for ${product.name}`}>
      {/* Hero Banner */}
      <header className="px-4" aria-label="Product banner">
        <div className="relative h-40 sm:h-52 md:h-60 w-full rounded-2xl overflow-hidden">
          <Image
            src={'/images/breadcrumb.png'}
            alt={`Banner image for ${product.name}`}
            fill
            className="object-cover"
            priority
          />
        </div>
      </header>

      <Container>
        <article
          className="grid md:grid-cols-2 gap-8"
          aria-labelledby="product-title">
          {/* Product Image */}
          <figure
            className="relative bg-card flex items-center justify-center rounded-lg p-4"
            role="img"
            aria-label={`Image of ${product.name}`}>
            <FavoriteButton
              productId={product.id}
              className="absolute top-4 right-4"
              aria-label={`Add ${product.name} to favorites`}
            />
            <Image
              src={product.image}
              alt={`Detailed view of ${product.name}`}
              width={400}
              height={400}
              className="w-full h-auto"
            />
          </figure>

          {/* Product Info */}
          <div className="flex flex-col justify-between gap-4">
            <header className="space-y-4">
              <h1 id="product-title">
                <WordsPullUp
                  text={product.name}
                  containerClassName="justify-normal"
                  className="text-4xl md:text-5xl font-bold text-primary"
                />
              </h1>
              <p className="text-gray-600 text-base" role="doc-subtitle">
                {product.shortDescription}

                <span className="text-primary-dark text-sm italic font-semibold block mt-2">
                  {product.calories} calories
                </span>
              </p>
            </header>
            <div className="space-y-4">
              <Separator className="my-4 md:my-8 bg-primary" role="separator" />

              <div
                className="flex items-center space-x-2"
                role="contentinfo"
                aria-label="Product ratings and delivery time">
                <div
                  className="bg-primary-dark rounded-full p-1"
                  aria-hidden="true">
                  <Star className="h-6 w-6 text-white" fill="white" />
                </div>
                <span className="text-sm font-bold" aria-label="Average rating">
                  {product.averageRating}
                </span>
                <span className="text-sm">
                  (
                  <span aria-label="Number of reviews">
                    {product.totalReviews}
                  </span>{' '}
                  Reviews)
                </span>
                <span
                  className="ml-auto text-sm font-medium"
                  aria-label="Estimated delivery time">
                  {product.preparationTime} min(s)
                </span>
              </div>

              <Separator className="my-4 md:my-8 bg-primary" role="separator" />

              <h3
                className="text-3xl font-bold text-primary-dark"
                aria-label="Product price">
                {product.price.toFixed(2)} €
              </h3>

              <Button
                className="w-full rounded-full bg-primary"
                size="lg"
                aria-label={`Add ${product.name} to cart`}>
                Add to Cart
              </Button>
            </div>
          </div>

          {/* About the dish */}
          <div className="space-y-4 bg-white/40 md:col-span-2 rounded-2xl shadow-md p-16">
            <h2 className="text-2xl font-bold" aria-label="About the dish">
              About the dish
            </h2>
            <p className="text-gray-600 text-base" role="doc-subtitle">
              {product.description}
            </p>
          </div>
        </article>
      </Container>

      <TestimonialSection />
      <OrderViaApp />
      <PickedForYou currentProductId={product.id} limit={4} />
    </main>
  );
}
