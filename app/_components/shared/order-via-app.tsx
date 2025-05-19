import React from 'react';
import Container from './container';
import { WordsPullUp } from '../animation';
import { Button } from '../ui';
import Link from 'next/link';
import Image from 'next/image';
import { partners } from '@/app/(website)/about/_components/hero/data';

export default function OrderViaApp() {
  return (
    <Container className="space-y-4 flex flex-col justify-center items-center text-center">
      <WordsPullUp
        text="Order via app"
        className="text-2xl md:text-4xl font-medium text-primary-dark"
        aria-level={2}
      />

      <p className="text-base max-w-md" role="contentinfo">
        Lorem ipsum dolor sit amet consectetur adipiscing elit ugue quam diam
        vitae velit bibendum elementum dolor.
      </p>

      <ul
        className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-10"
        aria-label="Food delivery partners">
        {partners?.map((partner) => (
          <li key={partner.alt}>
            <Button
              variant="outline"
              aria-label={partner.alt}
              asChild
              className="w-full h-24 bg-white">
              <Link
                href={partner.href}
                target="_blank"
                aria-label={partner.alt}
                rel="noopener noreferrer">
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={100}
                  height={100}
                />
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </Container>
  );
}
