'use client';

import React from 'react';
import CartMobile from './cart-mobile';
import CartDesktop from './cart-desktop';
import useMediaQuery from '@/app/_hooks/use-media-query';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/app/_components/ui/sheet';
import { useCartStore } from '@/app/store/cart-store';
import { ShoppingBag } from 'lucide-react';
import ContentCart from './content-cart';

export default function ShoppingIcon() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const totalItems = useCartStore((state) => state.totalItems());
  const products = useCartStore((state) => state.items);
  // State to track component mount status for hydration
  const [mounted, setMounted] = React.useState(false);

  // Set mounted state after component mounts on client
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const cartLabel = mounted
    ? `Cart - ${totalItems} article${totalItems > 1 ? 's' : ''}`
    : 'Cart';

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative cursor-pointer">
          <div
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
          </div>
        </div>
      </SheetTrigger>
      {isMobile ? <CartMobile /> : <CartDesktop />}
    </Sheet>
  );
}
