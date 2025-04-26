import { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '../_components/shared';
import { Button } from '../_components/ui';

export const metadata: Metadata = {
  title: 'Eat a Box - The best way to eat a box',
  description: 'Eat a Box is the best way to eat a box',
};

export default function Home() {
  return (
    <main>
      <section className="min-h-[550px] sm:min-h-[600px] bg-primary-light flex justify-center items-center">
        <Container className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-20 sm:items-center">
          {/* Text content section */}

          <div className="space-y-6 text-center sm:text-left pt-12 sm:pt-0 text-white">
            <h1 className="text-4xl font-bold">Healthy Food Made Easy!</h1>
            <p className="text-lg">
              Fresh meals from your favorite restaurants, delivered to your door
              or ready for pickup.
            </p>

            <div className="space-x-4">
              <Button>Order Now</Button>
              <Button variant="secondary">Learn More</Button>
            </div>
          </div>

          {/* Image section */}
          <div>
            <Image
              src="/images/banner/burger-mobile.png"
              alt="Eat a Box"
              width={500}
              height={500}
              className="sm:hidden"
            />

            <Image
              src="/images/banner/burger-desktop.png"
              alt="Eat a Box"
              width={800}
              height={800}
              className="hidden sm:block"
            />
          </div>
        </Container>
      </section>
    </main>
  );
}
