/**
 * HeroDesktop Component
 * 
 * Displays the hero section for desktop devices with a grid layout,
 * animations, and a partners section. The component includes:
 * - A title and description with animation
 * - A main image
 * - A secondary image with carpet animation
 * - A partners logos section
 * 
 * @param {HeroContent} content - Hero content (title, description, images)
 * @param {PartnerLogo[]} partners - List of partner logos
 */
import Image from 'next/image';
import React from 'react';
import { StaggerContainer, StaggerItem, CarpetAnimation, FadeIn, WordsPullUp } from '@/app/_components/animation';
import { Container } from '@/app/_components/shared';
import LogoPartners from './logo-partners';
import { HeroContent, PartnerLogo } from './types';

interface HeroDesktopProps {
  content: HeroContent;
  partners: PartnerLogo[];
}

export default function HeroDesktop({ content, partners }: HeroDesktopProps) {
  return (
    <Container 
      as="header" 
      className="hidden md:block h-[80vh] relative md:mb-10" 
      role="banner"
      aria-label="Main section"
    >
      {/* Main grid with title, description and image */}
      <StaggerContainer className="grid grid-cols-[1.5fr_1.2fr] justify-items-center gap-10">
        <div className="text-left text-white space-y-8">
          <StaggerItem
            as="h1"
            className="text-4xl lg:text-5xl font-bold leading-tight text-primary"
            aria-label={content.title}
          >
            {content.title}
          </StaggerItem>
          <StaggerItem 
            as="p" 
            className="text-lg text-black"
            aria-label={content.description}
          >
            {content.description}
          </StaggerItem>
        </div>

        {/* Main image with animation */}
        <StaggerItem className="relative w-full h-96 rounded-xl overflow-hidden z-10">
          <Image
            src={content.mainImage.src}
            alt={content.mainImage.alt}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </StaggerItem>
      </StaggerContainer>

      {/* Secondary image with carpet animation */}
      <CarpetAnimation>
        <FadeIn>
          <StaggerItem className="absolute max-w-8xl bottom-20 left-28 w-[500px] h-80 z-10 rounded-xl overflow-hidden">
            <Image
              src={content.secondaryImage.src}
              alt={content.secondaryImage.alt}
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </StaggerItem>
        </FadeIn>
      </CarpetAnimation>

      {/* Partners section */}
      <div className="absolute -bottom-10 left-0 w-full">
        <Container className="px-0">
          <div 
            className="bg-white px-16 py-4 md:py-0 rounded-xl flex justify-between items-center"
            role="complementary"
            aria-label="Our partners"
          >
            <WordsPullUp 
              text="As seen on:" 
              className="text-primary font-bold md:text-lg" 
            />
            <LogoPartners partners={partners} title="As seen on" />
          </div>
        </Container>
      </div>
    </Container>
  );
}
