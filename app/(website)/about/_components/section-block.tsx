/**
 * SectionBlock Component
 * 
 * Displays a section with an image and textual content, with the ability to reverse the order
 * on desktop screens. The component includes animations and action buttons.
 * 
 * @param {SectionBlock} data - Section data (title, description, image)
 * @param {boolean} [reverse=false] - If true, reverses the order of elements on desktop
 */
import Image from 'next/image';
import * as z from '@zod/mini';

import { Container } from '@/app/_components/shared';
import { FadeIn, WordsPullUp, ScaleIn } from '@/app/_components/animation';
import type { SectionBlock } from './hero/types';
import { Button } from '@/app/_components/ui';
import Link from 'next/link';

interface SectionBlockProps {
  data: SectionBlock;
  reverse?: boolean;
}

export default function SectionBlock({ data, reverse }: SectionBlockProps) {
  return (
    <Container 
      className="grid grid-cols-1 md:grid-cols-2 gap-10"
      role="region"
      aria-labelledby={`section-title-${data.title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Section image with animation */}
      <ScaleIn className={`relative h-96 rounded-xl overflow-hidden ${reverse ? 'md:order-2' : ''}`}>
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </ScaleIn>

      {/* Textual content and action buttons */}
      <div className={`flex flex-col gap-4 justify-between ${reverse ? 'md:order-1' : ''}`}>
        <div className='flex flex-col gap-4'>
          <h2 
            id={`section-title-${data.title.toLowerCase().replace(/\s+/g, '-')}`}
            className="sr-only"
          >
            {data.title}
          </h2>
          <WordsPullUp
            containerClassName="justify-start"
            className="text-2xl md:text-4xl font-medium"
            text={data.title}
          />
          <FadeIn delay={0.3}>
            <p className="text-gray-600">{data.description}</p>
          </FadeIn>
        </div>

        {/* Action buttons with animation */}
        <FadeIn
          delay={0.6}
          aria-label="Main actions"
          className="hidden md:grid w-2/3 grid-cols-2 gap-4 max-w-md"
        >
          <Button
            size="lg"
            aria-label="Order Now"
            className="focus:ring-2 focus:ring-offset-2 focus:ring-primary min-w-[48px] min-h-[48px] hover:scale-105 transition-transform"
          >
            <Link href="/menu">Order Now</Link>
          </Button>

          <Button
            asChild
            variant="tertiary"
            size="lg"
            aria-label="Browse Menu"
            className="focus:ring-2 focus:ring-offset-2 focus:ring-primary min-w-[48px] min-h-[48px] hover:scale-105 transition-transform"
          >
            <Link href="/menu">Browse Menu</Link>
          </Button>
        </FadeIn>
      </div>
    </Container>
  );
}
