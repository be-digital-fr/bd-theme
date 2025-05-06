import React from 'react';
import { Container } from '../shared';
import { Clock, Facebook, Instagram, MapPin, X } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '../ui';

export default function Footer() {
  return (
    <Container as="footer" className="bg-primary md:py-12 md:pt-24 py-8 rounded-2xl text-white md:space-y-18">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-4 gap-12">
        {/* Address section */}
        <section className="flex flex-col gap-4">
          <div className="grid grid-cols-[0.1fr_1fr] gap-2">
            <MapPin fill="#12BD9B" className="w-6 h-6 text-primary" />
            <p>123 Broadway Street, New York, NY 10001, USA</p>
          </div>
          <div className="grid grid-cols-[0.1fr_1fr] gap-2">
            <Clock fill="#12BD9B" className="w-6 h-6 text-primary" />
            <p>Open: 09:00 AM-01:00PM</p>
          </div>
        </section>

        {/* Utility links section */}
        <section className="flex flex-col md:items-center gap-4">
          <h3 className="text-md font-semibold">Utility Links</h3>
          <ul className="flex flex-col md:items-center gap-2">
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
          </ul>
        </section>

        {/* Products section */}
        <section className="flex flex-col md:items-center gap-4">
          <h3 className="text-md font-semibold">Legals</h3>
          <ul className="flex flex-col md:items-center gap-2">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Cookie Policy</li>
          </ul>
        </section>

        {/* Newsletter section */}
        <div>NEWSLETTER</div>
      </div>

      <Separator className="bg-primary-light my-8 md:hidden" />

      <section className="px-4">
        <div className="md:bg-primary-light p-4 rounded-full">
          <Container className="flex flex-col gap-4 md:flex-row justify-between items-center">
            <p className="text-sm">2025 Eat a Box. All rights reserved</p>

            {/* Socials */}
            <div className="flex gap-2">
              <Link href="/" className="bg-primary rounded-full p-2">
                <Facebook fill="white" className="w-4 h-4" />
              </Link>
              <Link href="/" className="bg-primary rounded-full p-2">
                <X className="w-4 h-4" />
              </Link>
              <Link href="/" className="bg-primary rounded-full p-2">
                <Instagram className="w-4 h-4" />
              </Link>
            </div>
          </Container>
        </div>
      </section>
    </Container>
  );
}
