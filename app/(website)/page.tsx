import { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '../_components/shared';

export const metadata: Metadata = {
  title: 'Eat a Box - The best way to eat a box',
  description: 'Eat a Box is the best way to eat a box',
};

export default function Home() {
  return (
    <main>
      <section className="w-full min-h-[80vh] py-12 md:py-24 lg:py-32 bg-primary">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Texte à gauche */}
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Votre titre principal ici
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Votre texte descriptif ici. Ajoutez une description
                  convaincante de votre produit ou service.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <a
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  Commencer
                </a>
                <a
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  En savoir plus
                </a>
              </div>
            </div>
            {/* Image à droite */}
            <div className="flex items-center justify-center">
              <div className="relative h-[400px] w-full overflow-hidden rounded-lg sm:h-[350px] md:h-[400px] lg:h-[450px]">
                <Image
                  src="/images/banner/burger-mobile.png"
                  alt="Hero image"
                  fill
                  className="object-contain scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
