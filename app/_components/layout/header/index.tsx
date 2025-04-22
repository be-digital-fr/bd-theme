// External libraries imports
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';

// Internal components imports
/* import { StoreSelectorTrigger } from "@/features/store-selector/components"; */
import { Container } from '@/app/_components/shared';
import { Navigation } from './navigation';
import { MobileNavigation } from './mobile-navigation';

// Types and schemas
import { NavigationLinksSchema } from './types';
import { AuthTrigger } from "@/infrastructure/better-auth/interface";
import { SearchTrigger } from "@/features/search-product/components"; 

/**
 * Navigation links configuration with SEO-friendly labels and descriptions
 */
const navigationLinks = NavigationLinksSchema.parse([
  {
    href: '/',
    label: 'Home',
    description: 'Accueil - Bienvenue dans notre restaurant',
  },
  {
    href: '/menu',
    label: 'Menu',
    description: 'Découvrez notre délicieux menu',
  },
  {
    href: '/about',
    label: 'About',
    description: 'En savoir plus sur notre histoire',
  },
  {
    href: '/blogs',
    label: 'Blogs',
    description: 'Découvrez nos derniers articles',
  },
  { href: '/contact', label: 'Contact', description: 'Contactez-nous' },
]);

/**
 * Header component containing navigation, logo and action buttons
 * Implements accessibility features and semantic HTML
 */
export default function Header() {
  return (
    <header role="banner" aria-label="En-tête principal du site">
      {/* <StoreSelectorTrigger /> */}

      <nav className="w-full py-4" aria-label="Navigation principale">
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <section aria-label="Logo de l'entreprise">
              <Link href="/" aria-label="Retour à l'accueil">
                <div className="relative w-28 h-10">
                  <Image
                    src="/images/logo.png"
                    alt="Logo de l'entreprise"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 112px, 112px"
                    priority
                  />
                </div>
              </Link>
            </section>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden lg:block ">
              <Navigation links={navigationLinks} />
            </div>

            {/* Actions Section */}
            <section
              className="flex items-center gap-4"
              aria-label="Actions utilisateur">
              {/* Search Trigger */}
              <SearchTrigger />
              {/* Authentication Trigger */}
              <div aria-label="Authentification">
                <AuthTrigger />
              </div>
              {/* Shopping Cart */}
              <div className="relative">
                <Link
                  href="/cart"
                  className="text-foreground/80 hover:text-foreground transition-colors"
                  aria-label="Panier d'achat - 2 articles">
                  <ShoppingBag className="w-5 h-5" aria-hidden="true" />
                  <span
                    className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center"
                    role="status">
                    2
                  </span>
                </Link>
              </div>
              {/* Mobile Navigation Menu */}
              <div className="lg:hidden">
                <MobileNavigation links={navigationLinks} />
              </div>
            </section>
          </div>
        </Container>
      </nav>
    </header>
  );
}
