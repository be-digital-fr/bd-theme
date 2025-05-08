'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

import { useCartStore } from '@/app/store/cart-store';

/**
 * ShoppingCart Component
 *
 * A header component that displays the cart icon with a badge showing
 * the total number of items in the cart. Handles hydration mismatch
 * by only showing dynamic content after client-side mount.
 *
 * @returns {JSX.Element} Cart icon with optional item count badge
 */
export default function ShoppingCart() {
  // State to track component mount status for hydration
  const [mounted, setMounted] = React.useState(false);

  // Get total items count from cart store
  const totalItems = useCartStore((state) => state.totalItems());

  // Set mounted state after component mounts on client
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering dynamic content until mounted
  const cartLabel = mounted
    ? `Cart - ${totalItems} article${totalItems > 1 ? 's' : ''}`
    : 'Cart';

  return (
    <div className="relative">
      <Link
        href="/cart"
        className="text-foreground/80 hover:text-foreground transition-colors"
        aria-label={cartLabel}>
        <ShoppingBag className="w-5 h-5" aria-hidden="true" />
        {/* Only show badge after mount and if there are items */}
        {mounted && totalItems > 0 && (
          <span
            className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center"
            role="status">
            {totalItems}
          </span>
        )}
      </Link>
    </div>
  );
}
