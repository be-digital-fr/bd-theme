import { useCartStore } from '@/app/store/cart-store';
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/app/_components/ui/sheet';
import ContentCart from './content-cart';

/**
 * CartDesktop Component
 * 
 * Desktop version of the shopping cart that appears as a side panel.
 * Displays the cart content in a slide-in panel optimized for desktop devices.
 * 
 * Features:
 * - Side panel layout
 * - Scrollable content
 * - Fixed header
 * - Responsive width
 */
export default function ShoppingCart() {
  const products = useCartStore((state) => state.items);

  return (
    <SheetContent
      side="right"
      className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart">
      <SheetHeader>
        <SheetTitle className="sr-only">Your Cart</SheetTitle>
        <SheetDescription className="sr-only">
          Here you can see the products you have added to your cart.
        </SheetDescription>
      </SheetHeader>
      <main 
        className="flex-1 overflow-y-auto"
        role="main"
        aria-label="Cart content">
        <ContentCart products={products} />
      </main>
    </SheetContent>
  );
}
