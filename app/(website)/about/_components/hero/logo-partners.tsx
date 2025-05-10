/**
 * LogoPartners Component
 * 
 * Displays a list of partner logos with animations and hover effects.
 * The component is responsive and optimized for performance with lazy loading.
 * 
 * @param {PartnerLogo[]} partners - List of partner logos with source and alt text
 * @param {string} title - Section title for partners
 */
import Image from 'next/image';
import React from 'react';
import { PartnerLogo } from './types';
import { LogoAnimation } from '@/app/_components/animation';

interface LogoPartnersProps {
  partners: PartnerLogo[];
  title: string;
}

export default function LogoPartners({ partners, title }: LogoPartnersProps) {
  return (
    <div 
      className="flex md:gap-20 gap-4 justify-normal" 
      role="list" 
      aria-label={`Partner logos - ${title}`}
    >
      {partners.map((partner, index) => (
        <LogoAnimation 
          key={partner.alt}
          index={index}
          className="w-20 h-20 md:w-24 md:h-24"
        >
          <Image
            src={partner.src}
            alt={partner.alt}
            fill
            sizes="(max-width: 768px) 100px, 200px"
            className="object-contain transition-opacity hover:opacity-80"
            loading="lazy"
            priority={false}
            aria-label={`${partner.alt} logo`}
          />
        </LogoAnimation>
      ))}
    </div>
  );
}

