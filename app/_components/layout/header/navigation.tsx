'use client';

import React from 'react';
import Link from 'next/link';
import * as z from '@zod/mini';
import { usePathname } from 'next/navigation';

import { cn } from '@/app/_lib/utils';
import { NavigationLinksSchema } from './types';

const NavigationSchema = z.object({
  links: NavigationLinksSchema,
});

type NavigationProps = z.infer<typeof NavigationSchema>;

/**
 * Navigation component displaying the main navigation links
 * @param {NavigationProps} props - The navigation properties
 * @returns {JSX.Element} Navigation component
 */
export function Navigation({ links }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Navigation principale">
      <ul className="flex items-center gap-4 md:gap-8">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={pathname === link.href ? 'page' : undefined}
              title={link.description}
              className={cn(
                'transition-colors duration-200 text-foreground',
                pathname === link.href
                  ? 'text-primary font-bold'
                  : 'hover:text-primary/80'
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
