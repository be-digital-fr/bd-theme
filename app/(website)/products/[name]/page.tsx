// External dependencies
import { Star } from 'lucide-react';
import Image from 'next/image';

// Internal components
import { WordsPullUp } from '@/app/_components/animation';
import { AddToCartButton, Container, OrderViaApp, TestimonialSection } from '@/app/_components/shared';
import { Button, Separator } from '@/app/_components/ui';
import FavoriteButton from '@/app/_components/ui/product-cards/favorite-icon';

// Types and utilities
import { IProduct } from '@/app/types/Product.type';
import { catchError, unslugify } from '@/utils';
import { PickedForYou } from "@/features/picked-for-you";

/**
 * Generates metadata for the product page
 * @param {Object} params - Route parameters containing the product name
 * @returns {Object} Metadata object with title and description
 */
export async function generateMetadata({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  return {
    title: `Eat a Box - ${name}`,
    description: `Discover the delicious and unique features of ${name} on our product details page. Perfect for food enthusiasts looking for quality and taste.`,
  };
}

/**
 * Fetches product data from the API
 * @param {string} name - The name of the product to fetch
 * @returns {Promise<IProduct>} The product data
 * @throws {Error} If the API request fails
 */
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

/**
 * Product Details Page Component
 * Displays detailed information about a specific product including:
 * - Product image and basic details
 * - Price and ratings
 * - Add to cart functionality
 * - Product description and related items
 * 
 * @param {Object} props - Component props
 * @param {Promise<{ name: string }>} props.params - Route parameters
 * @returns {JSX.Element} The product details page
 */
export default async function page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const unslugifiedName = unslugify(name);
  const [error, result] = await catchError(getProduct(unslugifiedName));

  if (error) {
    return;
  }

  const product = result as IProduct;

  return (
    <main
      className="mt-20 space-y-10"
      aria-label={`Product details for ${product.name}`}
      role="main">
      {/* Hero Banner Section */}
      <header className="px-4" aria-label="Product banner">
        <div 
          className="relative h-40 sm:h-52 md:h-60 w-full rounded-2xl overflow-hidden"
          role="banner">
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
          aria-labelledby="product-title"
          role="article">
          {/* Product Image Section */}
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
              width={800}
              height={800}
              className="w-full h-auto"
              priority
            />
          </figure>

          {/* Product Information Section */}
          <div className="flex flex-col justify-between gap-4">
            <header className="space-y-4">
              <h1 id="product-title">
                <WordsPullUp
                  text={product.name}
                  containerClassName="justify-normal"
                  className="text-3xl md:text-5xl font-bold text-primary"
                />
              </h1>
              <p 
                className="text-gray-600 text-base" 
                role="doc-subtitle"
                aria-label="Product description">
                {product.shortDescription}

                <span 
                  className="text-primary-dark text-sm italic font-semibold block mt-2"
                  aria-label={`Calorie content: ${product.calories} calories`}>
                  {product.calories} calories
                </span>
              </p>
            </header>

            <div className="space-y-4">
              <Separator 
                className="my-4 md:my-8 bg-primary" 
                role="separator" 
                aria-hidden="true" />

              {/* Ratings and Delivery Time Section */}
              <div
                className="flex items-center space-x-2"
                role="contentinfo"
                aria-label="Product ratings and delivery time">
                <div
                  className="bg-primary-dark rounded-full p-1"
                  aria-hidden="true">
                  <Star className="h-6 w-6 text-white" fill="white" />
                </div>
                <span 
                  className="text-sm font-bold" 
                  aria-label={`Average rating: ${product.averageRating}`}>
                  {product.averageRating}
                </span>
                <span className="text-sm">
                  (
                  <span aria-label={`Total reviews: ${product.totalReviews}`}>
                    {product.totalReviews}
                  </span>{' '}
                  Reviews)
                </span>
                <span
                  className="ml-auto text-sm font-medium"
                  aria-label={`Estimated preparation time: ${product.preparationTime} minutes`}>
                  {product.preparationTime} min(s)
                </span>
              </div>

              <Separator 
                className="my-4 md:my-8 bg-primary" 
                role="separator" 
                aria-hidden="true" />

              <p
                className="text-3xl font-bold text-primary-dark"
                aria-label={`Product price: ${product.price.toFixed(2)} euros`}>
                {product.price.toFixed(2)} €
              </p>

              <AddToCartButton product={product}>
                <Button 
                  size="lg" 
                  className="w-full"
                  aria-label={`Add ${product.name} to cart`}>
                  Add to Cart
                </Button>
              </AddToCartButton>
            </div>
          </div>

          {/* Product Description Section */}
          <div 
            className="space-y-4 bg-white/40 md:col-span-2 rounded-2xl shadow-md p-16"
            role="complementary"
            aria-labelledby="about-dish-title">
            <h2 
              id="about-dish-title"
              className="text-2xl font-bold" 
              aria-label="About the dish">
              About the dish
            </h2>
            <p 
              className="text-gray-600 text-base" 
              role="doc-subtitle"
              aria-label="Detailed product description">
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
