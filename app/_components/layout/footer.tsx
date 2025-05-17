import React from 'react';
import { Container } from '../shared';
import { Clock, Facebook, Instagram, MapPin, X } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '../ui';
import { StaggerContainer, StaggerItem, FadeInUp } from '../animation';

export default function Footer() {
  return (
    <footer className="bg-primary-dark md:py-12 md:pt-24 py-8 rounded-2xl text-white md:space-y-18">
      <Container>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-4 gap-12">
          {/* Address section */}
          <StaggerItem as="section" className="flex flex-col gap-4">
            <div className="grid grid-cols-[0.1fr_1fr] gap-2">
              <MapPin fill="#12BD9B" className="w-6 h-6 text-primary" />
              <p>123 Broadway Street, New York, NY 10001, USA</p>
            </div>
            <div className="grid grid-cols-[0.1fr_1fr] gap-2">
              <Clock fill="#12BD9B" className="w-6 h-6 text-primary" />
              <p>Open: 09:00 AM-01:00PM</p>
            </div>
          </StaggerItem>

          {/* Utility links section */}
          <StaggerItem
            as="section"
            className="flex flex-col md:items-center gap-4">
            <h3 className="text-md font-semibold">Utility Links</h3>
            <ul className="flex flex-col gap-2 list-disc pl-4 md:pl-0">
              <li>Link 1</li>
              <li>Link 2</li>
              <li>Link 3</li>
            </ul>
          </StaggerItem>

          {/* Products section */}
          <StaggerItem
            as="section"
            className="flex flex-col md:items-center gap-4">
            <h3 className="text-md font-semibold">Legals</h3>
            <ul className="flex flex-col gap-2 list-disc pl-4 md:pl-0">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
            </ul>
          </StaggerItem>

          {/* Newsletter section */}
          <StaggerItem>
            <FadeInUp className="text-lg font-semibold">NEWSLETTER</FadeInUp>
          </StaggerItem>
        </StaggerContainer>
      </Container>

      <Separator className="bg-primary-light my-8 md:hidden" />

      <FadeInUp
        as="section"
        className="mx-8 md:bg-primary-light rounded-full py-4">
        <Container >
          <div className="flex flex-col gap-4 md:flex-row justify-between items-center">
            <p className="text-sm">2025 Eat a Box. All rights reserved</p>

            {/* Socials */}
            <div className="flex gap-2">
              <Link
                href="/"
                className="bg-primary rounded-full p-2 hover:scale-110 transition-transform"
                aria-label="Visit our Facebook page">
                <Facebook fill="white" className="w-4 h-4" />
              </Link>
              <Link
                href="/"
                className="bg-primary rounded-full p-2 hover:scale-110 transition-transform"
                aria-label="Visit our X (Twitter) page">
                <X className="w-4 h-4" />
              </Link>
              <Link
                href="/"
                className="bg-primary rounded-full p-2 hover:scale-110 transition-transform"
                aria-label="Visit our Instagram page">
                <Instagram className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Container>
      </FadeInUp>
    </footer>
  );
}
