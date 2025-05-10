import Image from 'next/image';
import React from 'react';
import { StaggerContainer, StaggerItem } from '@/app/_components/animation';
import { Container } from '@/app/_components/shared';
import LogoPartners from './logo-partners';
import { HeroContent, PartnerLogo } from './types';

interface HeroMobileProps {
  content: HeroContent;
  partners: PartnerLogo[];
}

/**
 * HeroMobile Component
 * 
 * Displays the hero section for mobile devices with an adapted layout,
 * animations, and a partners section. The component includes:
 * - A title and description with animation
 * - A main image
 * - A secondary image with colored background
 * - A partners logos section
 * 
 * @param {HeroContent} content - Hero content (title, description, images)
 * @param {PartnerLogo[]} partners - List of partner logos
 */
export default function HeroMobile({ content, partners }: HeroMobileProps) {
  return (
    <header 
      className="space-y-10 md:hidden" 
      role="banner"
      aria-label="Mobile main section"
    >
      {/* Main container with title, description and image */}
      <Container>
        <StaggerContainer className="space-y-8">
          <div className="text-left text-white space-y-8">
            <StaggerItem
              as="h1"
              className="text-4xl font-bold leading-tight text-primary"
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
      </Container>

      {/* Section with secondary image and partners */}
      <section 
        className="space-y-24"
        aria-label="Secondary content"
      >
        {/* Secondary image with colored background */}
        <StaggerContainer className="h-60 bg-primary relative">
          <Container>
            <StaggerItem className="absolute max-w-8xl -bottom-16 left-1/2 -translate-x-1/2 w-[95vw] h-60 z-10 rounded-xl overflow-hidden">
              <Image
                src={content.secondaryImage.src}
                alt={content.secondaryImage.alt}
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 95vw, 50vw"
              />
            </StaggerItem>
          </Container>
        </StaggerContainer>

        {/* Partners section */}
        <Container className="px-0">
          <div 
            className="bg-white px-4 py-4 md:py-0 flex flex-col gap-4"
            role="complementary"
            aria-label="Our partners"
          >
            <h3 className="text-primary font-bold">As seen on:</h3>
            <LogoPartners partners={partners} title="As seen on" />
          </div>
        </Container>
      </section>
    </header>
  );
}
